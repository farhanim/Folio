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
		'I’m Farhan Ikhsan (Hans), a product designer based in Bogor, Indonesia. Open to working from anywhere.',
		'For 9+ years I’ve led design in fintech, aquaculture and retail. I build design systems, internal tools and design teams.',
		'Now I ship prototypes straight into the repo with Claude, so handoff takes hours instead of days.'
	],
	portrait: '/images/profile/portrait.webp',
	portraitCutout: '/images/profile/portrait-cutout.webp',
	cv: 'https://drive.google.com/file/d/1H7J3coTxXee_YdkYYTEZjJE-pHU-esPS/view?usp=sharing',
	facts: [
		{ icon: 'pin', label: 'Based in', value: 'Bogor, Indonesia' },
		{ icon: 'clock', label: 'Experience', value: '9+ years' },
		{ icon: 'layers', label: 'Products led', value: '16 products' },
		{ icon: 'check', label: 'Status', value: 'Open to work' }
	],
	experience: [
		{
			role: 'UX Designer',
			company: companies.nikel,
			period: 'Oct 2025 - Present',
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
			period: 'Mar 2023 - Feb 2025',
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
			period: 'Oct 2021 - Mar 2023',
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
			period: 'Oct 2018 - Oct 2021',
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
			period: 'May 2017 - Oct 2018',
			location: 'Indonesia',
			type: 'Full-time',
			scope: 'Designed and coded CRM and Telkomsel dashboard tools',
			summary: 'Took designs through to front-end code, and to back-end work when needed.',
			highlights: ['Presented working builds to clients through demos and site visits']
		},
		{
			role: 'Founder',
			company: companies.twonity,
			period: 'Sep 2021 - Present',
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
			summary: 'Figma, Claude Design, Git and Figma Make.',
			from: 'Nikel',
			logos: [companies.nikel.logo],
			year: 'Since 2025',
			stat: { value: 'Hours', label: 'not days' },
			visual: { src: '/images/recognition/handoff-flow.svg' }
		},
		{
			kind: 'milestone',
			title: 'Design systems, built and evolved',
			summary: 'Renceng, Fazz DS, OneFish and Ulysses.',
			from: '',
			logos: [companies.warungPintar.logo, companies.fazz.logo, companies.efishery.logo],
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
			highlight: 'Farhan is a critical thinker product designer.',
			headline: 'Leadership, People Manager, Product Management, Product Design',
			relation: 'Direct manager',
			date: 'Mar 2023',
			quote:
				'Farhan is a critical thinker product designer. Having this special trait made him able to approach complex problems with a thoughtful and analytical mindset that has been invaluable to our team. Farhan consistently demonstrates a deep understanding of user needs and works tirelessly to ensure that the product delivers the highest quality work.'
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
			highlight: 'Always thinking about the user when giving a solution.',
			headline: 'Assistant Manager at Central Bank of Indonesia',
			relation: 'Same team',
			date: 'Aug 2022',
			quote:
				'I worked with Farhan during my tenure as Associate Product Manager at Warung Pintar. Immediately what shine through is his quality as a human being. As He joined before me, he helped me settle in the team and the company. He also has determination to better himself through continuous learning from peers and superiors. He also strikes me as a customer driven person, always thinking about the user when giving a solution. This is shown by his willingness and ability to always do user research before designing a solution.'
		},
		{
			name: 'Mahira Falevy',
			role: 'UI/UX Designer',
			company: companies.fazz,
			avatar: '/images/people/mahira-falevy.webp',
			highlight: 'Having Hans in a team is definitely a blessing.',
			headline: 'UI/UX Designer at Shopee · Master of Interaction Design at USYD',
			relation: 'Same team',
			date: 'Aug 2022',
			quote:
				'Hans was a good UI Designer to work with. We collaborated together in warung tools domain and he also give a lot of recommendation and feedback in the ux design process. Not limited to that, he came up with a lot of initiatives that helps us grow as a team. He also likes to share his experience and knowledge which is really helpful and inspiring. Having Hans in a team is definitely a blessing. I truly believe that Hans will excel in any job he gets!'
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
				'One of our first Interaction Designers, Hans knows all about Warung Pintar’s products, and has worked on almost every aspect of our product offering. He’s an eager, fast learner, and he’s not afraid to do activities that would fall outside of traditional design work - he and his team spent weeks in East Java to immerse themselves while incubating a new line of business, for which Hans went on to design the app. He’s a native of the Jakarta IXD community, and he knows what it’s like to be a designer at a startup going through its growing pains - which speaks to his mental fortitude.'
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
				'I have worked with Hans for more than a year in the same squad. He is always passionate about everything that he designs. By working on the same project with him, I can see that he has outstanding knowledge in the multi-area of tech. Although his focus is on design, he is not hesitant to explore other things. Furthermore, he also often delivers superb performance.'
		}
	],
	// Shown as a bento grid; each skill has a small drawing (`art`) made in CSS.
	skills: [
		{
			name: 'Design System',
			group: 'Design & Research',
			proof: 'Renceng, Fazz DS, OneFish and Ulysses',
			art: 'systems'
		},
		{
			name: 'AI-Assisted Design',
			group: 'Design & Research',
			proof: 'GPT, Gemini, Paper and Claude across research, design and code',
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
			proof: 'Double diamond, grounded in psychology and principles',
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
