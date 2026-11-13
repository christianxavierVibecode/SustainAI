import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { clearAuthCookie } from '$lib/server/auth';

export const load: PageServerLoad = async ({ cookies }) => {
	clearAuthCookie(cookies);
	throw redirect(303, '/get-started');
};

export const actions: Actions = {
	default: async ({ cookies }) => {
		clearAuthCookie(cookies);
		throw redirect(303, '/get-started');
	}
};
