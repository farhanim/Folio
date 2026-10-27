import type { IconName } from '#lib/components/ui/icons.ts';

export interface NavLink {
	label: string;
	href: string;
	external?: boolean;
}

export interface DockItem {
	/** Section id on the home page this item tracks. */
	id: string;
	label: string;
	icon: IconName;
}

export type ProjectCategory = 'Product' | 'Brand' | 'Systems';

export interface Project {
	slug: string;
	title: string;
	discipline: string;
	category: ProjectCategory;
	year: number;
	/** Preview image shown beside the cursor (desktop) or inline (mobile). */
	image: string;
}

export interface Principle {
	title: string;
	body: string;
}
