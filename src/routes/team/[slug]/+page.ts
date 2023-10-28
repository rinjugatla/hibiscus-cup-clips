import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	const match = params.slug.match('^[A-I]$');
	const result = { team: match ? params.slug : '' };
	return result;
};
