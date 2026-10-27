// Site-wide details (from the CV and Notion portfolio). The Desk cards below are still sample copy.
import type { DockItem, NavLink, Principle } from '#lib/types/index.ts';

export const site = {
	name: 'Farhan Ikhsan',
	shortName: 'Farhan',
	role: 'Product Designer',
	email: 'farhanorscops@gmail.com',
	location: 'Bogor',
	country: 'Indonesia',
	timeZone: 'Asia/Jakarta',
	available: true,
	year: new Date().getFullYear()
};

export const dock: DockItem[] = [
	{ id: 'index', label: 'Home', icon: 'home' },
	{ id: 'work', label: 'Work', icon: 'grid' },
	{ id: 'desk', label: 'Desk', icon: 'desk' },
	{ id: 'contact', label: 'Contact', icon: 'mail' },
	{ id: 'about', label: 'Profile', icon: 'user', href: '/about' }
];

export const socials: NavLink[] = [
	{ label: 'LinkedIn', href: 'https://linkedin.com/in/farhanikhsanmaulidan', external: true },
	{ label: 'Dribbble', href: 'https://dribbble.com/farhanorscops', external: true },
	{ label: 'GitHub', href: 'https://github.com/farhanim', external: true },
	{ label: 'GitLab', href: 'https://gitlab.com/farhanorscops', external: true },
	{ label: 'Pinterest', href: 'https://id.pinterest.com/farhanorscops', external: true }
];

/** Cycled (with a scramble) in the hero: "Lately: ___" */
export const focus = [
	'design systems',
	'internal tools',
	'lending & fintech',
	'prototypes in code'
];

export const now = {
	title: 'Building Folio',
	body: 'A quieter home for my work — set in a strict grid, lit by a sleepy lamp.',
	progress: 0.62
};

export const toolbox = [
	'Figma',
	'Paper',
	'Webflow',
	'Adobe',
	'Claude',
	'GPT',
	'Replit',
	'React',
	'Vue',
	'Laravel'
];

export const principles: Principle[] = [
	{ title: 'Calm by default', body: 'Interfaces should lower the noise, not add to it.' },
	{ title: 'Systems over screens', body: 'Design the rules once; let a hundred screens follow.' },
	{ title: 'Ship, then polish', body: 'Real feedback beats perfect guesses every time.' }
];
