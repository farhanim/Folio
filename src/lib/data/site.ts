// Sample content — replace with your own. Everything the home page renders lives here.
import type { BioLink, NavLink, WorkItem } from '#lib/types/index.ts';

export const site = {
	name: 'Farhan',
	email: 'hello@example.com',
	year: new Date().getFullYear()
};

export const pages: NavLink[] = [
	{ label: 'Work', href: '/work' },
	{ label: 'Notes', href: '/notes' },
	{ label: 'About', href: '/about' }
];

export const socials: NavLink[] = [
	{ label: 'Email', href: `mailto:${site.email}` },
	{ label: 'LinkedIn', href: 'https://linkedin.com', external: true },
	{ label: 'GitHub', href: 'https://github.com', external: true },
	{ label: 'Dribbble', href: 'https://dribbble.com', external: true }
];

/** Words cycled in the glass pill: "I build ___ for teams…" */
export const roles = ['interfaces', 'products', 'design systems', 'web apps'];

export const bioLinks: Record<'pos' | 'studio' | 'labs', BioLink> = {
	pos: { label: 'Cyclone POS', href: '/work#cyclone', image: '/images/sample/photo-1.svg' },
	studio: { label: 'Kala Studio', href: '/work#kala', image: '/images/sample/photo-2.svg' },
	labs: { label: 'Nusa Labs', href: '/work#nusa', image: '/images/sample/photo-3.svg' }
};

export const work: WorkItem[] = [
	{
		title: 'Cyclone POS',
		subtitle: 'Point of sale',
		href: '/work#cyclone',
		art: { kind: 'image', src: '/images/work/pos.svg' }
	},
	{
		title: 'Folio',
		subtitle: 'Wordmark',
		href: '/work#folio',
		art: { kind: 'type', word: 'Folio' }
	},
	{
		title: 'Kala Studio',
		subtitle: 'Brand identity',
		href: '/work#kala',
		art: { kind: 'image', src: '/images/work/brand.svg' }
	},
	{
		title: 'Nusa Labs',
		subtitle: 'Mobile app',
		href: '/work#nusa',
		art: { kind: 'image', src: '/images/work/mobile.svg' }
	},
	{
		title: 'Tokens',
		subtitle: 'Design system',
		href: '/work#tokens',
		art: { kind: 'image', src: '/images/work/system.svg' }
	},
	{
		title: 'Dunes',
		subtitle: 'Generative art',
		href: '/work#dunes',
		art: { kind: 'image', src: '/images/work/dunes.svg' }
	}
];
