import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: LayoutServerLoad = async ({ locals }) => {
	if (!locals.user) {
		throw redirect(303, '/get-started?redirectTo=/dashboard/overview');
	}

	if (locals.user.user_role !== 'user') {
		throw redirect(303, '/admin');
	}

	return {
		user: locals.user
	};
};
