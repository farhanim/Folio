// Sample content — replace with your own. Everything the home page renders lives here.
import type { DockItem, NavLink, Principle, Project } from '#lib/types/index.ts';

export const site = {
	name: 'Farhan',
	role: 'Designer & engineer',
	email: 'hello@example.com',
	location: 'Jakarta',
	timeZone: 'Asia/Jakarta',
	available: true,
	year: new Date().getFullYear()
};

export const dock: DockItem[] = [
	{ id: 'index', label: 'Index', icon: 'home' },
	{ id: 'work', label: 'Work', icon: 'grid' },
	{ id: 'desk', label: 'Desk', icon: 'desk' },
	{ id: 'contact', label: 'Contact', icon: 'mail' }
];

export const socials: NavLink[] = [
	{ label: 'LinkedIn', href: 'https://linkedin.com', external: true },
	{ label: 'GitHub', href: 'https://github.com', external: true },
	{ label: 'Dribbble', href: 'https://dribbble.com', external: true },
	{ label: 'Read.cv', href: 'https://read.cv', external: true }
];

/** Cycled (with a scramble) in the hero: "Lately: ___" */
export const focus = [
	'design systems',
	'point-of-sale flows',
	'motion & micro-interactions',
	'web apps'
];

export const projects: Project[] = [
	{
		slug: 'cyclone',
		title: 'Cyclone POS',
		discipline: 'Product design, front-end',
		category: 'Product',
		year: 2026,
		image: '/images/work/pos.svg'
	},
	{
		slug: 'kala',
		title: 'Kala Studio',
		discipline: 'Identity, art direction',
		category: 'Brand',
		year: 2025,
		image: '/images/work/brand.svg'
	},
	{
		slug: 'nusa',
		title: 'Nusa Labs',
		discipline: 'Mobile app, prototyping',
		category: 'Product',
		year: 2025,
		image: '/images/work/mobile.svg'
	},
	{
		slug: 'tokens',
		title: 'Tokens',
		discipline: 'Design system, documentation',
		category: 'Systems',
		year: 2024,
		image: '/images/work/system.svg'
	},
	{
		slug: 'dunes',
		title: 'Dunes',
		discipline: 'Generative visuals',
		category: 'Brand',
		year: 2024,
		image: '/images/work/dunes.svg'
	}
];

export const now = {
	title: 'Building Folio',
	body: 'A quieter home for my work — set in a strict grid, lit by a sleepy lamp.',
	progress: 0.62
};

export const toolbox = [
	'Figma',
	'Svelte',
	'TypeScript',
	'Bun',
	'Tailwind',
	'Rive',
	'Framer',
	'Blender',
	'Notion',
	'Linear'
];

export const principles: Principle[] = [
	{ title: 'Calm by default', body: 'Interfaces should lower the noise, not add to it.' },
	{ title: 'Systems over screens', body: 'Design the rules once; let a hundred screens follow.' },
	{ title: 'Ship, then polish', body: 'Real feedback beats perfect guesses every time.' }
];
