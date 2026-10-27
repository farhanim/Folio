// Sample profile — replace with your own background.
import type { Profile } from '#lib/types/index.ts';
import { clients } from './clients.ts';

export const profile: Profile = {
	headline: 'Designer who writes code, engineer who sweats the pixels.',
	summary: [
		'I’ve spent eight years designing and building digital products — from a two-person startup’s first app to point-of-sale software used in 140 stores.',
		'I like small teams, clear writing and systems that make the next hundred screens easier than the first.'
	],
	portrait: '/images/profile/portrait.svg',
	cv: '#',
	facts: [
		{ label: 'Based in', value: 'Jakarta, Indonesia' },
		{ label: 'Experience', value: '8+ years' },
		{ label: 'Focus', value: 'Product design, front-end' },
		{ label: 'Status', value: 'Open to new projects' }
	],
	experience: [
		{
			role: 'Lead Product Designer',
			company: clients.cyclone,
			period: '2024 — Now',
			location: 'Jakarta',
			type: 'Full-time',
			summary: 'Leading design for the point of sale and internal tools.',
			highlights: [
				'Rebuilt checkout: 11 → 4 taps per sale',
				'Started the design system now used by 3 product teams',
				'Hired and mentor two product designers'
			]
		},
		{
			role: 'Product Designer',
			company: clients.nusa,
			period: '2022 — 2024',
			location: 'Remote',
			type: 'Full-time',
			summary: 'Patient-facing mobile app for lab results.',
			highlights: ['Shipped the 2.0 redesign', 'Ran 40+ usability sessions with patients']
		},
		{
			role: 'Design Engineer',
			company: clients.pasar,
			period: '2020 — 2022',
			location: 'Bandung',
			type: 'Contract',
			summary: 'Front-end and design tooling for a marketplace.',
			highlights: ['Built the Tokens CLI', 'Migrated the storefront to SvelteKit']
		},
		{
			role: 'Freelance Designer',
			company: clients.kala,
			period: '2018 — 2020',
			location: 'Bandung',
			type: 'Freelance',
			summary: 'Identities and websites for studios and small brands.',
			highlights: ['12 brand identities', '2 regional design awards']
		}
	],
	education: [
		{
			school: 'Institut Teknologi Bandung',
			degree: 'B.Des, Visual Communication Design',
			period: '2014 — 2018',
			note: 'Thesis on wayfinding in public transit.'
		},
		{
			school: 'Interaction Design Foundation',
			degree: 'UX Certification',
			period: '2021'
		}
	],
	achievements: [
		{ year: 2026, title: 'Best Retail Experience', issuer: 'Indonesia UX Awards', kind: 'award' },
		{ year: 2025, title: 'Speaker — Designing for the queue', issuer: 'UX Jakarta', kind: 'talk' },
		{ year: 2024, title: 'Featured project', issuer: 'Awwwards', kind: 'press' },
		{ year: 2021, title: 'Certified Accessibility Specialist', issuer: 'IAAP', kind: 'cert' }
	],
	capabilities: [
		{
			group: 'Design',
			items: ['Product design', 'Design systems', 'Prototyping', 'Brand identity']
		},
		{ group: 'Engineering', items: ['Svelte', 'TypeScript', 'CSS architecture', 'Accessibility'] },
		{ group: 'Process', items: ['User research', 'Workshops', 'Writing', 'Mentoring'] }
	],
	languages: [
		{ name: 'Indonesian', level: 'Native' },
		{ name: 'English', level: 'Professional' }
	]
};
