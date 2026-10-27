import { error } from '@sveltejs/kit';
import { getProject, projects } from '#lib/data/projects.ts';
import type { EntryGenerator, PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	const found = getProject(params.slug);
	if (!found) error(404, 'Project not found');
	return found;
};

/** Every project page can be prerendered from the data file. */
export const entries: EntryGenerator = () => projects.map((p) => ({ slug: p.slug }));
