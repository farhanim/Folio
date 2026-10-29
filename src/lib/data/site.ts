// Site-wide details (from the CV and Notion portfolio).
import type { DockItem, NavLink, Principle } from '#lib/types/index.ts';

export const site = {
	name: 'Farhan Ikhsan',
	shortName: 'Farhan',
	role: 'Product Designer',
	/** Cycled in the top bar after the main role: 'Product Designer, ___'. Each reads as a full phrase. */
	roles: [
		'also a design engineer',
		'leading design systems',
		'mentoring new designers',
		'running a design studio',
		'wearing multiple hats'
	],
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

/** The "Now" card on the desk: what I'm working on at the moment. */
export const now = {
	where: 'Nikel',
	title: 'Shipping EWA & Employee Loan',
	body: 'Taking two lending products from concept to launch, as the only designer.',
	tags: ['LMS', 'Borrower Portal', 'Lender Portal']
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
	{
		title: 'Systems over screens',
		body: 'Design the rules once, so a hundred screens follow. Renceng and OneFish started there.'
	},
	{
		title: 'Research before pixels',
		body: 'Talk to the people who use it first: shop owners, agents, fish farmers, ops teams.'
	},
	{
		title: 'Prototype in code',
		body: 'Ship to the repo early, so the team reacts to real behaviour, not a picture of it.'
	}
];
