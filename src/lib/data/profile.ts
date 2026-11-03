// From the CV (CV-Farhan Ikhsan.pdf) and the Notion portfolio page.
import type { Profile } from '#lib/types/index.ts';
import { companies, showcaseClients } from './clients.ts';

// Studio builds shown on the Twonity milestone (screens from the Work section).
const studio = {
	name: 'Twonity',
	tagline: 'Design & dev studio · 10+ clients',
	logo: companies.twonity.logo,
	shots: ['pims-pertamina', 'iconplus', 'dataroom'].map(
		(slug) => `/images/work/${slug}/shot-1.webp`
	),
	logos: Object.values(showcaseClients)
		.map((c) => c.logo)
		.slice(0, 8)
};

export const profile: Profile = {
	fullName: 'Farhan Ikhsan',
	nickname: 'Hans',
	headline: 'Product designer who turns interaction design into code.',
	summary: [
		'I’m Farhan Ikhsan (Hans), a product designer based in Bogor, Indonesia, and open to working from anywhere. Over the past 9+ years I’ve led design in retail, fintech and aquaculture at Warung Pintar, Fazz, eFishery and now Nikel. Along the way I’ve built design systems such as Renceng, replaced manual processes with internal tools, and grown a design team from zero to more than twelve designers. These days I use AI tools to ship prototypes straight into the repo, so handoff takes hours instead of days, and I run Twonity, a small design and development studio, on the side.'
	],
	portrait: '/images/profile/portrait.webp',
	portraitCutout: '/images/profile/portrait-cutout.webp',
	cv: 'https://drive.google.com/file/d/1TzTitPqrE28xl__0q5sH_yt5omj5WM5L/view?usp=sharing',
	facts: [
		{ icon: 'pin', label: 'Based in', value: 'Bogor, Indonesia' },
		{ icon: 'briefcase', label: 'Experience', value: '9+ years' },
		{ icon: 'package', label: 'Products led', value: '16 products' },
		{ icon: 'check', label: 'Status', value: 'Open to work', tone: 'green', live: true }
	],
	experience: [
		{
			role: 'UX Designer',
			company: companies.nikel,
			period: 'Oct 2025 - Present',
			location: 'Indonesia',
			type: 'Full-time',
			scope: 'Leading design across the LMS, Borrower Portal and Lender Portal',
			summary:
				'Designing the KlikA2C lending marketplace as one product across the Lender Portal, Borrower Portal and Back Office, and shipping design systems and prototypes straight into the repo with AI tools so stakeholders see design intent early.',
			highlights: [
				'Unified 3 portals and 4 loan products (invoice, purchase order, employee loan and EWA) under one design language',
				'Designed the back office: 4 core modules plus 10 supporting ones, from leads and funding to workflow configuration',
				'Replaced manual review with back-office tooling for 30+ ops staff',
				'Cut design handoff from days to hours',
				'Initiated EWA and Employee Loan products from concept to launch'
			]
		},
		{
			role: 'Interaction Designer',
			company: companies.efishery,
			period: 'Mar 2023 - Feb 2025',
			location: 'Indonesia',
			type: 'Full-time',
			scope: 'Led design across FAT, PRF, CRM, FDS, CMS and the company profile',
			summary:
				'Specialised in internal tools, replacing manual processes with centralised systems across 6 products, from enterprise payments and CRM to farmer support.',
			highlights: [
				'Cut payment reconciliation lead time from 203h to 18.91h (−90% against a −50% target), and receipts from 7 manual steps to 3',
				'Lifted field-visit success from 20.4% to 30% and doubled campaign-driven app visits through a CRM used by 800+ staff',
				'Turned the FAQ into level-0 support as monthly complaints grew from 31 to 671, reaching 71.16% on-time resolution',
				'Moved the product team from execution to strategy, making cross-stakeholder work visible',
				'Helped design ops build OneFish, a design system run as a product'
			]
		},
		{
			role: 'UI Designer',
			company: companies.fazz,
			period: 'Oct 2021 - Mar 2023',
			location: 'Indonesia',
			type: 'Full-time',
			scope: 'Led design across Modal Rakyat, Fazz Agen and Master Agen',
			summary:
				'Drove discovery and product design for P2P lending, bookkeeping and digital-product sales across Fazz Agen and Modal Rakyat, working with product and engineering and grounding decisions in surveys, interviews and usability tests; contributed to the Fazz super-app rebrand.',
			highlights: [
				'Ran four research studies with 1,800+ agents and lenders, from debt reports to package selection',
				'Redesigned the Catat Utang debt report around the 79.5% of agents who preferred a table, reaching 100% task completion in testing',
				'Simplified a catalogue of 170 data and pulsa packages after 51.4% of low raters found it too complex',
				'Worked with product and engineering on metrics, roadmap priorities and team culture'
			]
		},
		{
			role: 'Interaction Designer',
			company: companies.warungPintar,
			period: 'Oct 2018 - Oct 2021',
			location: 'Indonesia',
			type: 'Full-time',
			scope: 'Led design across the Warung Pintar app, Grosir Pintar and the Renceng design system',
			summary:
				'Built the design team and Renceng, a design system covering customer-facing and internal products on mobile and web, and drove research-driven work on the ordering, wholesale and retail apps warung owners use every day.',
			highlights: [
				'Grew the design team from zero to 12+ designers in three years, mentoring each through an individual development plan',
				'Raised the ordering flow’s usability score from 74 to 91 and halved the time to add a product, from 8.1s to 4.1s',
				'Launched Grosir Pintar with 11 wholesalers serving 146 retailers, delivering Rp 170.6 jt in GMV',
				'Led persona research with 49 in-depth interviews and ~25.7k mitra segmented by wallet share'
			]
		},
		{
			role: 'Web Designer',
			company: companies.immobi,
			period: 'May 2017 - Oct 2018',
			location: 'Indonesia',
			type: 'Full-time',
			scope: 'Designed and coded network and field tools for Telkomsel and the Indonesian Navy',
			summary:
				'Took products from design to front-end code, and to back-end work when needed: capacity, complaint and speed-test dashboards for Telkomsel, a command system for the Indonesian Navy, and Immobi’s own data, survey and reporting tools.',
			highlights: [
				'Built 7 products for Telkomsel, the Indonesian Navy and Immobi, from design through front-end code',
				'Artemis: capacity forecasting across 43,500+ BTS and eNodeB sites and 284 core network elements, in 3 modules behind one login',
				'Customer Complaint Management: 8 weekly KPIs drilled down through 5 levels, from nationwide to city, across 11 regions',
				'SIMAL: one command system for 6 naval bases, 136 personnel, 42 remotely controlled rooms and 8 tracked vessels',
				'Presented working builds to clients through demos and site visits'
			]
		},
		{
			role: 'Founder',
			company: companies.twonity,
			period: 'Sep 2021 - Present',
			location: 'Remote',
			type: 'Side hustle',
			scope: 'Design & development studio',
			summary:
				'Founded and run a design and development studio delivering websites, internal tools and data dashboards for 10+ clients across government, cultural institutions, legal, fintech and B2B.',
			highlights: [
				'Government and cultural platforms for Ibu Kota Nusantara, Kemendikbud and Museum Kebangkitan Nasional, from a secure data room to an online exhibition',
				'Business systems: a timesheet app for Jardin Legal with 5 firm modules and 6 billing views, a bulk SMS platform across 4 mobile operators, a catalogue and CMS for 3 partner brands, and a security company’s website and back office',
				'Product sites and prototypes: Kee Platforms’ AI-native lending site presenting 4 products, and a SparQ prototype covering 13 product areas in 368 KB, with no servers needed to demo',
				'Own each engagement end to end, from scoping, proposals and contracts to design, development and handover, in collaboration with designers and developers'
			]
		}
	],
	education: [
		{
			school: 'Universitas Nasional',
			logo: companies.unas.logo,
			degree: 'Bachelor of Computer Engineering',
			major: 'Teknik Informatika',
			period: '2023',
			gpa: '3.6',
			gpaOf: '4.0'
		}
	],
	recognitions: [
		{
			kind: 'award',
			title: 'Best Product Design Employee',
			summary: 'For taking on several tasks at once with high efficiency.',
			from: 'eFishery',
			logos: [companies.efishery.logo],
			year: '2024',
			stat: { value: '6', label: 'products led' },
			visual: { src: '/images/recognition/best-employee-efishery.webp' }
		},
		{
			kind: 'mentor',
			title: 'UI/UX Mentor at Kampus Merdeka',
			summary: 'Daily classes, guiding mentees to certification.',
			from: 'MyEduSolve',
			logos: [companies.myEduSolve.logo],
			year: '2023',
			stat: { value: '5', label: 'months' },
			visual: { src: '/images/recognition/myedusolve-mentor.webp', fit: 'contain' }
		},
		{
			kind: 'milestone',
			title: 'One loop from design to code',
			summary: 'Figma, Figma Make, Git and AI tools.',
			from: 'Nikel',
			logos: [companies.nikel.logo],
			year: 'Since 2025',
			stat: { value: 'Hours', label: 'from design to handoff' },
			visual: { src: '/images/recognition/handoff-flow.svg' }
		},
		{
			kind: 'milestone',
			title: 'Design systems, built and evolved',
			summary: 'Renceng, Fazz DS, OneFish and Ulysses (Nikel).',
			from: '',
			logos: [
				companies.warungPintar.logo,
				companies.fazz.logo,
				companies.efishery.logo,
				companies.nikel.logo
			],
			year: 'Since 2018',
			stat: { value: '4', label: 'systems' },
			visual: { src: '/images/recognition/design-systems.svg' }
		},
		{
			kind: 'milestone',
			title: 'Led and grew design teams',
			summary: 'Managed teams at Warung Pintar and Fazz. Solo designer at Nikel.',
			from: '',
			logos: [
				companies.warungPintar.logo,
				companies.fazz.logo,
				companies.efishery.logo,
				companies.nikel.logo
			],
			year: 'Since 2018',
			stat: { value: '12+', label: 'designers' },
			visual: { src: '/images/recognition/design-teams.svg' }
		},
		{
			kind: 'milestone',
			title: 'Design and dev studio',
			summary: 'Scope, contracts and small teams, end to end.',
			from: 'Twonity',
			logos: [companies.twonity.logo],
			year: '2025',
			stat: { value: '10+', label: 'clients' },
			visual: { studio }
		}
	],
	certifications: [
		{
			title: 'Graphic Design & Illustration using Adobe Illustrator',
			credential: 'Adobe Certified Professional',
			issuer: 'Adobe · Certiport',
			date: 'Aug 2023',
			credentialId: 'H29V-XMcd',
			verifyUrl: 'https://verify.certiport.com',
			file: '/docs/adobe-illustrator-certificate.pdf',
			image: '/images/recognition/adobe-illustrator-certificate.webp',
			score: 757,
			required: 700,
			maxScore: 1000,
			sections: [
				{ name: 'Working in the design industry', score: 100 },
				{ name: 'Project setup and interface', score: 42 },
				{ name: 'Organizing documents', score: 25 },
				{ name: 'Creating and modifying visual elements', score: 68 },
				{ name: 'Publishing digital media', score: 67 }
			]
		},
		{
			title: 'Visual Communication using Adobe Photoshop CS6',
			credential: 'Adobe Certified Associate',
			issuer: 'Adobe · Certiport',
			date: 'Apr 2017',
			credentialId: '6Mue-XV99',
			verifyUrl: 'https://verify.certiport.com',
			file: '/docs/adobe-photoshop-cs6-certificate.pdf',
			image: '/images/recognition/adobe-photoshop-certificate.webp',
			score: 854,
			required: 700,
			maxScore: 1000,
			sections: [
				{ name: 'Setting project requirements', score: 100 },
				{ name: 'Identifying design elements when preparing images', score: 80 },
				{ name: 'Understanding Adobe Photoshop CS6', score: 67 },
				{ name: 'Manipulating images', score: 94 },
				{ name: 'Publishing digital images', score: 100 }
			]
		}
	],
	// LinkedIn recommendations, newest first.
	testimonials: [
		{
			name: 'Tewi Bowo',
			role: 'Design Manager',
			company: companies.fazz,
			avatar: '/images/people/tewi-bowo.webp',
			highlight: 'Farhan is a critical-thinking product designer.',
			headline: 'Leadership, People Manager, Product Management, Product Design',
			relation: 'Direct manager',
			date: 'Mar 2023',
			quote:
				'Farhan is a critical-thinking product designer. This trait lets him approach complex problems with a thoughtful, analytical mindset that has been invaluable to our team. He consistently shows a deep understanding of user needs and works tirelessly to make sure the product is of the highest quality.'
		},
		{
			name: 'Apolos Avrialdo',
			role: 'Senior Designer',
			company: companies.fazz,
			avatar: '/images/people/apolos-avrialdo.webp',
			highlight:
				'Not only an outstanding product designer in terms of craftsmanship but also a mentor.',
			headline: 'Senior Designer at Mitrais · DesignOps, Design System',
			relation: 'Different team',
			date: 'Mar 2023',
			quote:
				'Hans is an exceptional product designer with critical thinking skills. He is able to think of possibilities that others may not consider when it comes to identifying the root cause of a problem and finding the appropriate solutions as a product designer. Although he may appear difficult to approach from the outside, in reality, he is always ready to assist and share his thoughts and experiences. I believe that he is not only an outstanding product designer in terms of craftsmanship but also a mentor who can lead his team to become their best…'
		},
		{
			name: 'Faiz Anggoro Mukti',
			role: 'Associate PM',
			company: companies.warungPintar,
			avatar: '/images/people/faiz-anggoro-mukti.webp',
			highlight: 'Always thinking about the user when proposing a solution.',
			headline: 'Assistant Manager at Central Bank of Indonesia',
			relation: 'Same team',
			date: 'Aug 2022',
			quote:
				'I worked with Farhan during my tenure as Associate Product Manager at Warung Pintar. What immediately shines through is his quality as a human being. As he joined before me, he helped me settle into the team and the company. He also has the determination to better himself through continuous learning from peers and superiors. He strikes me as a customer-driven person, always thinking about the user when proposing a solution. This shows in his willingness and ability to always do user research before designing a solution.'
		},
		{
			name: 'Mahira Falevy',
			role: 'UI/UX Designer',
			company: companies.fazz,
			avatar: '/images/people/mahira-falevy.webp',
			highlight: 'Having Hans on a team is definitely a blessing.',
			headline: 'UI/UX Designer at Shopee · Master of Interaction Design at USYD',
			relation: 'Same team',
			date: 'Aug 2022',
			quote:
				'Hans was a great UI designer to work with. We collaborated in the Warung Tools domain, and he gave a lot of recommendations and feedback during the UX design process. Beyond that, he came up with many initiatives that helped us grow as a team. He also likes to share his experience and knowledge, which is really helpful and inspiring. Having Hans on a team is definitely a blessing. I truly believe Hans will excel in any job he takes on!'
		},
		{
			name: 'Arief Naufal Pramudito',
			role: 'UX Researcher',
			company: companies.warungPintar,
			avatar: '/images/people/arief-naufal-pramudito.webp',
			highlight:
				'He’s not afraid to do activities that would fall outside of traditional design work.',
			headline: 'Product Discovery · UX Research · Design Leadership',
			relation: 'Different team',
			date: 'Nov 2021',
			quote:
				'One of our first Interaction Designers, Hans knows all about Warung Pintar’s products, and has worked on almost every aspect of our product offering. He’s an eager, fast learner, and he’s not afraid to do activities that would fall outside of traditional design work: he and his team spent weeks in East Java to immerse themselves while incubating a new line of business, for which Hans went on to design the app. He’s a native of the Jakarta IXD community, and he knows what it’s like to be a designer at a startup going through its growing pains, which speaks to his mental fortitude.'
		},
		{
			name: 'Nabilah B Gelshirani',
			role: 'Data Analyst',
			company: companies.warungPintar,
			avatar: '/images/people/nabilah-gelshirani.webp',
			highlight: 'He is always passionate about everything that he designs.',
			headline: 'Grab Senior Data Analyst · Cognitive Science MSc, University of Edinburgh',
			relation: 'Same team',
			date: 'Aug 2021',
			quote:
				'I have worked with Hans for more than a year in the same squad. He is always passionate about everything that he designs. Working on the same projects with him, I could see his outstanding knowledge across many areas of tech. Although his focus is design, he never hesitates to explore other things, and he consistently delivers superb work.'
		}
	],
	// Shown as a bento grid; each skill has a small drawing (`art`) made in CSS.
	skills: [
		{
			name: 'Design System',
			group: 'Design & Research',
			proof: 'Renceng, Fazz DS, OneFish and Ulysses (Nikel)',
			art: 'systems'
		},
		{
			name: 'AI-Assisted Design',
			group: 'Design & Research',
			proof: 'GPT, Gemini and Paper across research, design and code',
			art: 'flow'
		},
		{
			name: 'People Management',
			group: 'Leadership & Strategy',
			proof: 'Grew a team to 12+ through mentoring and feedback',
			art: 'team'
		},
		{
			name: 'Information Architecture',
			group: 'Design & Research',
			proof: 'Users, context and content behind 6 internal tools',
			art: 'tree'
		},
		{
			name: 'Product Analytics',
			group: 'Leadership & Strategy',
			proof: 'Google Analytics, CleverTap and BI dashboards',
			art: 'bars'
		},
		{
			name: 'Experience Mapping',
			group: 'Design & Research',
			proof: 'Double Diamond, grounded in psychology and design principles',
			art: 'journey'
		},
		{
			name: 'Design Strategy',
			group: 'Leadership & Strategy',
			proof: 'OKRs and metrics in a build, measure, learn loop',
			art: 'strategy'
		},
		{
			name: 'Growth Design',
			group: 'Leadership & Strategy',
			proof: 'Growth-driven: launch fast, then plan, build, learn and transfer',
			art: 'growth'
		}
	],
	tools: [
		{ name: 'Figma', brand: 'figma', category: 'Design' },
		{ name: 'Paper', category: 'Design' },
		{ name: 'Webflow', brand: 'webflow', category: 'Design' },
		{ name: 'Adobe', brand: 'adobe', category: 'Design' },
		{ name: 'Claude', brand: 'claude', category: 'AI' },
		{ name: 'GPT', brand: 'openai', category: 'AI' },
		{ name: 'Replit', brand: 'replit', category: 'AI' },
		{ name: 'React', brand: 'react', category: 'Code' },
		{ name: 'Vue', brand: 'vue', category: 'Code' },
		{ name: 'Laravel', brand: 'laravel', category: 'Code' }
	],
	// Not on the CV: add yours here and they'll show under the tools.
	languages: []
};
