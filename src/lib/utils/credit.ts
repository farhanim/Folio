import type { Project } from '#lib/types/index.ts';

/** The logo shown on a project's badge: the company it came from, else the client. */
export const source = (project: Project) => project.via ?? project.client;

/**
 * Who a project is credited to. Work done while employed somewhere reads as
 * experience ("From Immobi, for Telkomsel"); everything else names the client.
 */
export function credit(project: Project): { label: string; value: string } {
	const { via, client } = project;
	if (!via) return { label: 'Client', value: client.name };
	const own = via.logo === client.logo;
	return {
		label: 'Experience',
		value: own ? `From ${via.name}` : `From ${via.name}, for ${client.name}`
	};
}
