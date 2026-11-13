import dotenv from 'dotenv';
import { WASTE_ANALYZER_PROMPT, PLANT_ANALYZER_PROMPT } from './prompts';

dotenv.config();

const MODEL_NAME = 'gemini-3.5-flash';

export interface WasteAnalysisResult {
	waste_name: string;
	classification: string;
	environmental_impact: string;
	recycling_tips: string;
	is_recyclable: boolean;
	isValidImage?: boolean;
}

export interface PlantAnalysisResult {
	plant_name: string;
	detected_pest_disease: string;
	symptoms: string;
	possible_cause: string;
	care_recommendation: string;
	prevention_tips: string;
	plant_impact: string;
	isValidImage?: boolean;
}

/**
 * Pembersih dan parser JSON tangguh dari output Gemini
 */
function cleanAndParseJson<T>(rawText: string): T {
	let text = rawText.trim();

	// Hapus markdown code fence jika disertakan (```json ... ```)
	if (text.startsWith('```json')) {
		text = text.substring(7);
	} else if (text.startsWith('```')) {
		text = text.substring(3);
	}

	if (text.endsWith('```')) {
		text = text.slice(0, -3);
	}

	text = text.trim();

	// Ekstrak objek JSON pertama jika masih terdapat teks lain
	const firstBrace = text.indexOf('{');
	const lastBrace = text.lastIndexOf('}');
	if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
		text = text.substring(firstBrace, lastBrace + 1);
	}

	return JSON.parse(text) as T;
}

/**
 * Mengirim request multimodal ke Google Gemini API dengan Inline Base64 Data
 */
async function callGeminiApi(
	apiKey: string,
	systemInstruction: string,
	base64Image: string,
	mimeType: string
): Promise<string> {
	const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${apiKey}`;

	const payload = {
		contents: [
			{
				parts: [
					{
						inline_data: {
							mime_type: mimeType,
							data: base64Image
						}
					},
					{
						text: systemInstruction
					}
				]
			}
		],
		generationConfig: {
			temperature: 0.2,
			responseMimeType: 'application/json'
		}
	};

	const response = await fetch(endpoint, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(payload)
	});

	if (!response.ok) {
		const errBody = await response.text();
		throw new Error(`Gemini API Error [${response.status}]: ${errBody}`);
	}

	const data = await response.json();
	const candidateText = data.candidates?.[0]?.content?.parts?.[0]?.text;

	if (!candidateText) {
		throw new Error('Gemini API tidak mengembalikan konten teks hasil analisis.');
	}

	return candidateText;
}

/**
 * Analisis Sampah Multimodal
 */
export async function analyzeWasteImage(
	base64Image: string,
	mimeType: string
): Promise<WasteAnalysisResult> {
	const apiKey =
		process.env.GEMINI_API_KEY_WASTE_ANALYZER || process.env.GEMINI_API_KEY_PLANT_ANALYZER || '';

	if (!apiKey) {
		throw new Error('Kunci GEMINI_API_KEY_WASTE_ANALYZER belum dikonfigurasi di environment.');
	}

	const rawJsonText = await callGeminiApi(apiKey, WASTE_ANALYZER_PROMPT, base64Image, mimeType);
	const parsed = cleanAndParseJson<WasteAnalysisResult>(rawJsonText);

	// Deteksi apakah gambar dinyatakan tidak valid oleh AI
	const invalidIndicators = [
		'tidak valid',
		'bukan merupakan sampah',
		'bukan sampah',
		'tidak relevan',
		'tidak dapat dianalisis'
	];
	const isInvalid = invalidIndicators.some(
		(phrase) =>
			parsed.waste_name?.toLowerCase().includes(phrase) ||
			parsed.classification?.toLowerCase().includes(phrase)
	);

	parsed.isValidImage = !isInvalid;
	parsed.is_recyclable = Boolean(parsed.is_recyclable);

	return parsed;
}

/**
 * Analisis Penyakit Tanaman Multimodal
 */
export async function analyzePlantImage(
	base64Image: string,
	mimeType: string
): Promise<PlantAnalysisResult> {
	const apiKey =
		process.env.GEMINI_API_KEY_PLANT_ANALYZER || process.env.GEMINI_API_KEY_WASTE_ANALYZER || '';

	if (!apiKey) {
		throw new Error('Kunci GEMINI_API_KEY_PLANT_ANALYZER belum dikonfigurasi di environment.');
	}

	const rawJsonText = await callGeminiApi(apiKey, PLANT_ANALYZER_PROMPT, base64Image, mimeType);
	const parsed = cleanAndParseJson<PlantAnalysisResult>(rawJsonText);

	// Deteksi apakah gambar dinyatakan bukan tanaman oleh AI
	const invalidIndicators = [
		'tidak valid',
		'bukan merupakan tanaman',
		'bukan tanaman',
		'tidak relevan',
		'tidak dapat dianalisis'
	];
	const isInvalid = invalidIndicators.some(
		(phrase) =>
			parsed.plant_name?.toLowerCase().includes(phrase) ||
			parsed.detected_pest_disease?.toLowerCase().includes(phrase)
	);

	parsed.isValidImage = !isInvalid;

	return parsed;
}
