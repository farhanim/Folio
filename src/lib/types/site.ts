import type { IconName } from '#lib/components/ui/icons.ts';

export interface NavLink {
	label: string;
	href: string;
	external?: boolean;
}

export interface DockItem {
	/** Section id on the home page this item tracks, or a page key when `href` is set. */
	id: string;
	label: string;
	icon: IconName;
	/** A separate page instead of a home section. */
	href?: string;
}

export interface Principle {
	title: string;
	body: string;
}
