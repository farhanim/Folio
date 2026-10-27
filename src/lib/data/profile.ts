// From the CV (CV-Farhan Ikhsan.pdf) and the Notion portfolio page.
import type { Profile } from '#lib/types/index.ts';
import { companies } from './clients.ts';

export const profile: Profile = {
	fullName: 'Farhan Ikhsan',
	nickname: 'Hans',
	headline: 'Product designer who turns interaction design into code.',
	summary: [
		'I’m Farhan Ikhsan (Hans), a product designer based in Bogor, Indonesia, and open to working from anywhere.',
		'Over nine years I’ve led design across fintech, aquaculture and retail — building design systems, internal tools and design teams. I enjoy creating interaction design in code: delightful, human experiences.'
	],
	portrait: '/images/profile/portrait.webp',
	portraitCutout: '/images/profile/portrait-cutout.webp',
	cv: 'https://drive.google.com/file/d/1H7J3coTxXee_YdkYYTEZjJE-pHU-esPS/view?usp=sharing',
	facts: [
		{ label: 'Based in', value: 'Bogor, Indonesia' },
		{ label: 'Experience', value: '9+ years' },
		{ label: 'Focus', value: 'Design systems, internal tools' },
		{ label: 'Status', value: 'Open to work — full-time & freelance' }
	],
	experience: [
		{
			role: 'UX Designer',
			company: companies.nikel,
			period: 'Oct 2025 — Now',
			location: 'Indonesia',
			type: 'Full-time',
			scope: 'Lead design across LMS, Borrower and Lender Portal',
			summary:
				'Shipping design systems and prototypes straight into the repo with Claude, giving stakeholders an early view of design intent.',
			highlights: [
				'Cut design handoff from days to hours',
				'Replaced manual review with back-office tooling for 30+ ops staff',
				'Initiated EWA and Employee Loan products from concept to launch'
			]
		},
		{
			role: 'Interaction Designer',
			company: companies.efishery,
			period: 'Mar 2023 — Feb 2025',
			location: 'Indonesia',
			type: 'Full-time',
			scope: 'Lead design across FAT, PRF, CRM, FDS, CMS and Compro',
			summary:
				'Specialised in internal tools, replacing manual processes with centralised systems across 6 products.',
			highlights: [
				'Moved the product team from execution to strategy',
				'Made cross-stakeholder work visible',
				'Helped design ops build OneFish, a design system run as a product'
			]
		},
		{
			role: 'UI Designer',
			company: companies.fazz,
			period: 'Oct 2021 — Mar 2023',
			location: 'Indonesia',
			type: 'Full-time',
			scope: 'Lead design across Modal Rakyat, Fazz Agen and Master Agen',
			summary:
				'Discovery and product design across P2P lending and bookkeeping, including the Fazz super-app rebrand.',
			highlights: [
				'Designed scalable experiences that turned casual users into power users',
				'Worked with product and engineering on metrics, roadmap priorities and team culture'
			]
		},
		{
			role: 'Interaction Designer',
			company: companies.warungPintar,
			period: 'Oct 2018 — Oct 2021',
			location: 'Indonesia',
			type: 'Full-time',
			scope: 'Lead design across the Warung Pintar app and Renceng design system',
			summary:
				'Built the design team and Renceng, a design system covering customer-facing and internal products on mobile and web.',
			highlights: [
				'Grew the design team from zero to 12+ designers in three years',
				'Mentored designers through their individual development plans'
			]
		},
		{
			role: 'Web Designer',
			company: companies.immobi,
			period: 'May 2017 — Oct 2018',
			location: 'Indonesia',
			type: 'Full-time',
			scope: 'Designed and coded CRM and Telkomsel dashboard tools',
			summary:
				'Took designs through implementation — front-end, and back-end as a full-stack contributor when needed.',
			highlights: ['Presented working builds to clients through demos and site visits']
		},
		{
			role: 'Founder',
			company: companies.twonity,
			period: 'Sep 2021 — Now',
			location: 'Remote',
			type: 'Side hustle',
			scope: 'Design & development studio',
			summary: 'Running a design and dev studio for 10+ clients.',
			highlights: ['Lead scope, contracts and small teams end to end']
		}
	],
	education: [
		{
			school: 'Universitas Nasional',
			logo: companies.unas.logo,
			degree: 'Bachelor of Computer Engineering (Teknik Informatika)',
			period: '2023',
			note: 'GPA 3.6 / 4.0'
		}
	],
	achievements: [
		{
			year: '2023',
			title: 'UI/UX Mentor (MSIB) — 5 months of daily classes',
			issuer: 'MyEduSolve',
			kind: 'mentor'
		},
		{
			year: '2023 — 25',
			title: 'OneFish design system, run as a product',
			issuer: 'eFishery',
			kind: 'milestone'
		},
		{
			year: '2018 — 21',
			title: 'Built a design team from 0 to 12+ and the Renceng design system',
			issuer: 'Warung Pintar',
			kind: 'milestone'
		},
		{
			year: '2021 — Now',
			title: 'Design & dev studio for 10+ clients',
			issuer: 'Twonity',
			kind: 'milestone'
		}
	],
	capabilities: [
		{
			group: 'Design & Research',
			items: [
				'Design System',
				'Information Architecture',
				'Rapid Prototyping',
				'Experience Mapping'
			]
		},
		{
			group: 'Leadership & Strategy',
			items: ['People Management', 'Design Strategy', 'Product Analytics', 'Growth Design']
		},
		{
			group: 'Tools & Tech',
			items: [
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
			]
		}
	],
	// Not on the CV — add yours here and they'll show under Capabilities.
	languages: []
};
