export interface NavLink {
	label: string;
	href: string;
	external?: boolean;
}

export interface BioLink {
	label: string;
	href: string;
	/** Image shown in the polaroid preview on hover (desktop only). */
	image: string;
}

export type WorkArt =
	{ kind: 'image'; src: string; fit?: 'cover' | 'contain' } | { kind: 'type'; word: string };

export interface WorkItem {
	title: string;
	subtitle: string;
	href: string;
	art: WorkArt;
}
