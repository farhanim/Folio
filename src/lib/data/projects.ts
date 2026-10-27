// Projects. Real builds live in showcase.ts; the design entries below are still
// samples — replace them with your own. Order here is the order of the list and
// of the previous/next navigation on project pages.
import type { Project } from '#lib/types/index.ts';
import { clients } from './clients.ts';
import { showcase } from './showcase.ts';

const samples: Project[] = [
	{
		slug: 'cyclone-pos',
		type: 'design',
		title: 'Cyclone POS',
		tagline: 'A point of sale that gets out of the cashier’s way.',
		summary:
			'Redesigning checkout, inventory and reporting for 140 retail stores — fewer taps per sale, and a system the team can grow on.',
		client: clients.cyclone,
		role: 'Lead product designer',
		year: 2026,
		duration: '8 months',
		team: '2 designers, 6 engineers, 1 PM',
		tools: ['Figma', 'Svelte', 'Rive'],
		cover: '/images/work/pos.svg',
		featured: true,
		links: [{ label: 'Case study PDF', href: '#' }],
		blocks: [
			{
				kind: 'text',
				id: 'overview',
				title: 'Overview',
				body: [
					'Cyclone runs 140 stores across Indonesia on a point of sale built in 2014. Cashiers worked around it, not with it: a typical sale took 11 taps and two screens.',
					'I led design for the rebuild — from field research in six stores to a component library the engineering team now owns.'
				]
			},
			{
				kind: 'stats',
				id: 'impact',
				title: 'Impact',
				items: [
					{ value: '11 → 4', label: 'Taps for an average sale' },
					{ value: '−38%', label: 'Checkout time at peak hours' },
					{ value: '140', label: 'Stores rolled out in 10 weeks' },
					{ value: '4.7/5', label: 'Cashier satisfaction after launch' }
				]
			},
			{
				kind: 'text',
				id: 'challenge',
				title: 'The challenge',
				body: [
					'Stores are loud, queues are long and most cashiers are on their first job. Every extra decision on screen shows up as a longer line.',
					'We had to keep the old hardware, support offline mode, and avoid retraining 1,200 people.'
				]
			},
			{
				kind: 'gallery',
				id: 'screens',
				title: 'Key screens',
				caption:
					'Checkout, inventory and the end-of-day report share one grid and one set of tokens.',
				layout: 'row',
				images: [
					{ src: '/images/work/pos-checkout.svg', alt: 'Checkout screen with a large total' },
					{ src: '/images/work/pos.svg', alt: 'Dashboard with daily sales chart' },
					{ src: '/images/work/pos-inventory.svg', alt: 'Inventory list with stock levels' }
				]
			},
			{
				kind: 'quote',
				id: 'testimonial',
				title: 'In their words',
				quote:
					'The new checkout is the first system our cashiers didn’t need a training day for. They just started using it.',
				author: 'Dewi Pratama',
				role: 'Head of Store Operations, Cyclone Retail'
			},
			{
				kind: 'gallery',
				id: 'system',
				title: 'The system',
				caption: 'Tokens, components and documentation shipped alongside the product.',
				layout: 'wide',
				images: [{ src: '/images/work/system.svg', alt: 'Design tokens and type specimen' }]
			},
			{
				kind: 'text',
				id: 'outcome',
				title: 'Outcome',
				body: [
					'The rollout finished two weeks early. Support tickets about checkout dropped by half in the first month, and the component library now powers two more internal tools.'
				]
			}
		],
		seed: {
			likes: 128,
			dislikes: 3,
			comments: [
				{
					id: 'c1',
					name: 'Raka',
					body: 'Love how the tap count is the headline metric. Very clear.',
					date: '2026-09-14'
				},
				{
					id: 'c2',
					name: 'Maya',
					body: 'Would read a whole post on the offline-mode decisions.',
					date: '2026-10-02'
				}
			]
		}
	},
	{
		slug: 'nusa-app',
		type: 'design',
		title: 'Nusa Labs',
		tagline: 'Lab results people can actually read.',
		summary:
			'A mobile app that explains medical lab results in plain language, with a doctor one tap away.',
		client: clients.nusa,
		role: 'Product designer',
		year: 2025,
		duration: '5 months',
		team: '1 designer, 3 engineers',
		tools: ['Figma', 'Protopie'],
		cover: '/images/work/mobile.svg',
		isNew: true,
		blocks: [
			{
				kind: 'text',
				id: 'overview',
				title: 'Overview',
				body: [
					'Patients received their results as a PDF full of abbreviations. We turned each result into a short, honest explanation with a clear next step.'
				]
			},
			{
				kind: 'gallery',
				id: 'screens',
				title: 'Screens',
				layout: 'wide',
				images: [{ src: '/images/work/mobile.svg', alt: 'Two phone screens of the Nusa app' }]
			},
			{
				kind: 'text',
				id: 'outcome',
				title: 'Outcome',
				body: ['Follow-up questions to the call centre fell by 30% within a quarter of launch.']
			}
		],
		seed: { likes: 64, dislikes: 1, comments: [] }
	},
	{
		slug: 'kala-identity',
		type: 'design',
		title: 'Kala Studio',
		tagline: 'An identity built from three shapes.',
		summary: 'Brand identity and art direction for an architecture studio in Bandung.',
		client: clients.kala,
		role: 'Brand designer',
		year: 2025,
		duration: '3 months',
		team: 'Solo',
		tools: ['Figma', 'Illustrator'],
		cover: '/images/work/brand.svg',
		blocks: [
			{
				kind: 'text',
				id: 'overview',
				title: 'Overview',
				body: [
					'Kala designs houses from simple volumes. The identity does the same: a circle, a square and a triangle, recombined for every touchpoint.'
				]
			},
			{
				kind: 'gallery',
				id: 'identity',
				title: 'Identity',
				layout: 'wide',
				images: [{ src: '/images/work/brand.svg', alt: 'Kala logo built from geometric shapes' }]
			}
		],
		seed: { likes: 41, dislikes: 0, comments: [] }
	},
	{
		slug: 'dunes',
		type: 'design',
		title: 'Dunes',
		tagline: 'Generative posters for a music festival.',
		summary: 'A generative system producing 400 unique posters from one set of rules.',
		client: clients.arunika,
		role: 'Art direction',
		year: 2024,
		duration: '6 weeks',
		team: 'Solo',
		tools: ['p5.js', 'Figma'],
		cover: '/images/work/dunes.svg',
		blocks: [
			{
				kind: 'text',
				id: 'overview',
				title: 'Overview',
				body: [
					'Every ticket holder got a poster no one else has, generated from the time they bought it.'
				]
			},
			{
				kind: 'gallery',
				id: 'posters',
				title: 'Posters',
				layout: 'wide',
				images: [{ src: '/images/work/dunes.svg', alt: 'Layered dunes at sunset' }]
			}
		],
		seed: { likes: 22, dislikes: 2, comments: [] }
	},
	{
		slug: 'folio-site',
		type: 'code',
		title: 'Folio',
		tagline: 'This site — a strict grid and a sleepy lamp.',
		summary:
			'My portfolio, built with SvelteKit and Bun. Fluid 12-column grid, view-transition theme switch and zero UI libraries.',
		client: clients.folio,
		role: 'Design & development',
		year: 2026,
		duration: 'Ongoing',
		team: 'Solo',
		tools: ['SvelteKit', 'Bun', 'TypeScript'],
		cover: '/images/work/code-folio.svg',
		isNew: true,
		links: [
			{ label: 'Live site', href: '/' },
			{ label: 'Source', href: 'https://github.com' }
		],
		repo: { language: 'Svelte', stars: 86, license: 'MIT' },
		blocks: [
			{
				kind: 'text',
				id: 'overview',
				title: 'Overview',
				body: [
					'I wanted a portfolio that feels like a printed index: hairline grid, mono labels, and one playful object — a lamp you pull to switch themes.',
					'Everything is hand-written CSS on top of SvelteKit; content lives in typed data files.'
				]
			},
			{
				kind: 'stats',
				id: 'numbers',
				title: 'By the numbers',
				items: [
					{ value: '0', label: 'UI libraries' },
					{ value: '100', label: 'Lighthouse accessibility' },
					{ value: '< 60 kB', label: 'JS on the home page (gzip)' },
					{ value: '1', label: 'Lamp with feelings' }
				]
			},
			{
				kind: 'code',
				id: 'theme-switch',
				title: 'The theme switch',
				language: 'ts',
				caption: 'The new theme grows as a circle out of the lamp’s bulb.',
				code: `const transition = document.startViewTransition(() => apply());
transition.ready.then(() => {
  document.documentElement.animate(
    { clipPath: [\`circle(0 at \${x}px \${y}px)\`, \`circle(\${r}px at \${x}px \${y}px)\`] },
    { duration: 700, pseudoElement: '::view-transition-new(root)' }
  );
});`
			},
			{
				kind: 'gallery',
				id: 'screens',
				title: 'Screens',
				layout: 'wide',
				images: [{ src: '/images/work/code-folio.svg', alt: 'Folio home page in a browser' }]
			},
			{
				kind: 'text',
				id: 'next',
				title: 'What’s next',
				body: ['Real case studies, a notes section, and an RSS feed.']
			}
		],
		seed: {
			likes: 57,
			dislikes: 0,
			comments: [{ id: 'c1', name: 'Sinta', body: 'The lamp! 💡', date: '2026-10-20' }]
		}
	}
];

// Real projects first, then the design samples.
export const projects: Project[] = [...showcase, ...samples];

export const featuredProjects = projects.filter((p) => p.featured);

export function getProject(slug: string) {
	const index = projects.findIndex((p) => p.slug === slug);
	if (index === -1) return null;
	const at = (i: number) => projects[(i + projects.length) % projects.length];
	return { project: projects[index], prev: at(index - 1), next: at(index + 1) };
}

/** Rough reading time from the text in a project's blocks. */
export function readingTime(project: Project) {
	const words = project.blocks
		.flatMap((b) => (b.kind === 'text' ? b.body : b.kind === 'quote' ? [b.quote] : []))
		.join(' ')
		.split(/\s+/).length;
	return Math.max(1, Math.round((words + project.summary.split(' ').length) / 200 + 1));
}
