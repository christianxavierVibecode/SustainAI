import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import {
	getDashboardOverviewStats,
	getWastePriceTrends,
	getWasteCompositionStats,
	getRecentActivities
} from '$lib/server/db/dashboard';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) {
		throw redirect(303, '/get-started?redirectTo=/dashboard/overview');
	}

	if (locals.user.user_role !== 'user') {
		throw redirect(303, '/admin');
	}

	const userId = locals.user.id;

	// Jalankan pengambilan data secara paralel untuk performa optimal
	const [stats, priceTrends, composition, recentActivities] = await Promise.all([
		getDashboardOverviewStats(userId),
		getWastePriceTrends(),
		getWasteCompositionStats(userId),
		getRecentActivities(userId, 5)
	]);

	return {
		user: locals.user,
		stats,
		priceTrends,
		composition,
		recentActivities
	};
};
