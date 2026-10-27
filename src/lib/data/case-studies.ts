// Real design & research case studies. Illustrations live in
// static/images/work/<slug>/ — SVG redraws of the key slides from each deck.
//
// Facts come from the source decks (Warung Pintar, 2020–21). Participant names
// and photos are left out on purpose.
import type { ImageRef, Project } from '#lib/types/index.ts';
import { companies } from './clients.ts';

const art =
	(slug: string) =>
	(name: string, alt: string): ImageRef => ({
		src: `/images/work/${slug}/${name}.svg`,
		alt
	});

const mitra = art('mitra-persona');
const awp = art('awp-order-flow');
const heur = art('awp-heuristic');
const grosir = art('grosir-pintar');
const home = art('home-revamp');
const reskin = art('tokosmart-reskin');
const noFeedback = { likes: 0, dislikes: 0, comments: [] };

export const caseStudies: Project[] = [
	// ───────────────────────────────────────────── Mitra User Persona
	{
		slug: 'mitra-persona',
		type: 'design',
		title: 'Mitra User Persona',
		tagline: 'Who actually runs a warung — and what they need from us.',
		summary:
			'A year of research at Warung Pintar into the shop owners (mitra) and buyers behind the platform: how they learn, keep books, shop for stock and choose a warung, turned into personas, archetypes and journey maps that product teams could build on.',
		client: companies.warungPintar,
		role: 'Design lead · UX research',
		year: 2021,
		duration: 'Dec 2019 — Jan 2021',
		team: 'UXR Merchant, Growth team',
		facts: [
			{ label: 'Methods', value: 'In-depth interviews, surveys, data segmentation' },
			{ label: 'Cities', value: 'Jakarta, Bekasi, Surabaya, Semarang' }
		],
		tools: ['Interviews', 'Prompt cards', 'Google Forms', 'Data Studio', 'Miro'],
		cover: '/images/work/mitra-persona/cover.svg',
		featured: true,
		isNew: true,
		blocks: [
			{
				kind: 'text',
				id: 'overview',
				title: 'Overview',
				body: [
					'Warung Pintar serves thousands of small shops (warung) and their owners, the mitra. We had learned them through GMV segments and photos of their storefronts, but the profiles were too varied to design for. We didn’t really know who they were, or how to reach the right users for each product.',
					'This compilation brings together four studies: how mitra learn and keep books, how cooperative they are as partners, who our top users really are, and who buys from a warung. Each one ends in personas or archetypes that a product vertical could pick up and use.'
				]
			},
			{
				kind: 'stats',
				id: 'numbers',
				title: 'By the numbers',
				items: [
					{ value: '4', label: 'Research tracks in one compilation' },
					{ value: '49', label: 'Mitra interviewed in depth' },
					{ value: '~25.7k', label: 'Mitra segmented by wallet share' },
					{ value: '7', label: 'Buyer segments from the consumer survey' }
				]
			},
			{
				kind: 'gallery',
				id: 'at-a-glance',
				title: 'Research at a glance',
				caption:
					'Four studies, each with its own question, method and output: learning habits, bookkeeping, top users and warung buyers.',
				layout: 'wide',
				images: [
					mitra('overview', 'Four research tracks with their questions, methods and outputs')
				]
			},
			{
				kind: 'features',
				id: 'approach',
				title: 'How we worked',
				items: [
					{
						title: 'Human-centred interviews',
						body: 'In-depth interviews with 18 mitra and the Komunitas Pintar facilitators, aimed at the underlying needs rather than the symptoms.'
					},
					{
						title: 'Prompt cards & sacrificial concepts',
						body: 'Topic cards for the learning programme, gadget cards, and a rough Catatan Pintar concept tested in think-aloud sessions.'
					},
					{
						title: 'Quadrants from real data',
						body: 'With the data team we split users by physical segment (A–D) and wallet share, then compared age, gender, RFM, tenure and warehouse area.'
					},
					{
						title: 'Recruiting through outbound calls',
						body: 'The call team recruited 31 interviewees across four cities, covering online and offline acquisition and high and low GMV.'
					},
					{
						title: 'Surveys to back the stories',
						body: 'A Sobat Juragan survey checked the archetypes against 61 mitra. A consumer survey, piloted down to about 4 minutes, measured CES, CSAT and NPS.'
					},
					{
						title: 'Journey maps & HMWs',
						body: 'Every persona ends in a think–do–feel journey and “How might we” prompts, so findings arrive as design problems, not just observations.'
					}
				]
			},
			{
				kind: 'gallery',
				id: 'learners',
				title: 'Four kinds of learner',
				caption:
					'Mitra mapped by their vision to grow and their willingness to learn: the Busy Bee, Diva, Sustainer and Builder. The sliders show awareness of, effort for and vision behind learning.',
				layout: 'wide',
				images: [mitra('learners', 'Four persona cards placed on a vision × willingness quadrant')]
			},
			{
				kind: 'text',
				id: 'learning',
				title: 'Learning habits',
				body: [
					'Every mitra wants their business to improve, but they don’t all want the same thing from learning. The Sustainer is content and survival-focused. The Busy Bee knows learning is good but is too busy running the shop. The Builder wants to learn everything but has no clear goal. The Diva knows exactly what she wants and just needs relevant, short how-tos.',
					'The real finding was where each one gets stuck. Sustainers stall at awareness, Busy Bees at starting, Divas at finding relevant content, and Builders at turning ideas into action. That gave us four design briefs: design for motivation, for habit and stickiness, for relevance, and for real use cases.'
				]
			},
			{
				kind: 'gallery',
				id: 'journeys',
				title: 'Where they stall',
				caption:
					'Each learner’s main pain point along awareness → start → learn → reflect → implement, and the design brief it led to.',
				layout: 'wide',
				images: [
					mitra('journey', 'Learning journey with each persona marked at the stage they stall')
				]
			},
			{
				kind: 'gallery',
				id: 'bookkeeping',
				title: 'How mitra keep their books',
				caption:
					'Three bookkeeping personas from think-aloud sessions with a sacrificial Catatan Pintar concept: the Modest Amateur, Overconfident Manager and Commander.',
				layout: 'wide',
				images: [mitra('bookkeeping', 'Three bookkeeping persona cards with key insights')]
			},
			{
				kind: 'impact',
				id: 'insights',
				title: 'What we learned',
				intro: 'Insights that showed up across personas, each turned into a “How might we”:',
				items: [
					'Time for learning comes in scraps between customers, so materials have to be short and straightforward',
					'Mitra trust hands-on practice and relatable success stories more than theory',
					'WhatsApp needs no adoption, and its notification is the reminder that gets people learning',
					'Debt is the one thing everyone records, because unpaid debt is a loss, which makes it the entry point to bookkeeping',
					'Paper books win because a phone is personal and helpers can’t share it',
					'Logging every sale only feels worth it if there’s a recap at the end of the day'
				]
			},
			{
				kind: 'gallery',
				id: 'archetypes',
				title: 'Top-user archetypes',
				caption:
					'Revenue × business experience: the Progressive Merchant, Nimble Old Player, Struggle Survivalist and Slow Bloomer Retailer, each with the behaviours we saw (price-sensitive, app-savvy, grosir visitor, social butterfly…).',
				layout: 'wide',
				images: [
					mitra(
						'archetypes',
						'Four archetype cards on a revenue × experience grid, with who they really were'
					)
				]
			},
			{
				kind: 'text',
				id: 'top-users',
				title: 'Who our top users are',
				body: [
					'We expected the best fit to be big retailers (physical segment A/B). The interviews proved that wrong: 20 of 31 participants were semi-wholesalers serving other warung, only 9 were pure retailers, and 2 were traders. Some shops rated D from photos made up to IDR 15 million a day, so judging potential from storefront photos was unreliable.',
					'Price and delivery were still what brought mitra back. Stock-outs, cancelled orders and voucher limits were what pushed them away. And most mitra spent well under 20% of their stock budget with us, so there was far more potential GMV than we had assumed.'
				]
			},
			{
				kind: 'gallery',
				id: 'buyers',
				title: 'The people buying from a warung',
				caption:
					'The consumer survey across eight Kelontong Pintar shops: seven buyer segments (Price-Sensitive is 56%), then ease, satisfaction and recommendation against their targets.',
				layout: 'wide',
				images: [mitra('buyers', 'Buyer segment bar and CES, CSAT and NPS gauges against targets')]
			},
			{
				kind: 'stats',
				id: 'consumer',
				title: 'Consumer satisfaction',
				items: [
					{ value: '5.9 / 7', label: 'Customer effort score (target 5)' },
					{ value: '87%', label: 'Customer satisfaction (target 80%)' },
					{ value: '+22', label: 'Net promoter score (target +50)' },
					{ value: '56%', label: 'Buyers who are price-sensitive' }
				]
			},
			{
				kind: 'impact',
				id: 'outcome',
				title: 'What it changed',
				items: [
					'Physical-segment scoring flagged for a redesign, since it under-counted shops’ real potential',
					'Semi-wholesalers recognised as the strongest product fit, not just big retailers',
					'Learning programmes moved to short, WhatsApp-first, practice-led material with reminders',
					'Debt recording and an end-of-day recap proposed as the way into Catatan Pintar',
					'A year-end FMCG discount programme designed for the price-sensitive buyer'
				]
			},
			{
				kind: 'text',
				id: 'reflection',
				title: 'Reflection',
				body: [
					'Every sprint was tight. The top-user study ran 15 days and still left little time to synthesise, and only 61 of 408 targeted mitra answered the follow-up survey. The archetypes are a strong starting point, not the final word, and they deserve a larger quantitative pass.'
				]
			}
		],
		seed: noFeedback
	},
	// ───────────────────────────────────────────── AWP order flow
	{
		slug: 'awp-order-flow',
		type: 'design',
		title: 'AWP Order Flow',
		tagline: 'Fixing the ordering flow mitra use every day — tested, not guessed.',
		summary:
			'A heuristic evaluation of the Aplikasi Warung Pintar (AWP) ordering flow, a redesigned catalog built around who sells each product, and a Maze usability test that put both versions in front of mitra.',
		client: companies.warungPintar,
		role: 'Design lead · UX research',
		year: 2020,
		team: 'Growth team, 3 evaluators',
		facts: [
			{ label: 'Methods', value: 'Heuristic evaluation, crazy 8s, usability testing' },
			{ label: 'Platform', value: 'Android app' }
		],
		tools: ['Figma', 'Maze', 'Miro', 'Data Studio'],
		cover: '/images/work/awp-order-flow/cover.svg',
		isNew: true,
		links: [{ label: 'Heuristic evaluation', href: '/work/awp-heuristic-evaluation' }],
		blocks: [
			{
				kind: 'text',
				id: 'overview',
				title: 'Overview',
				body: [
					'AWP is where mitra restock their warung: they browse the catalog, pick products from Warung Pintar Distribusi (WPD) or a grosir partner, and track the order to their door. The new multi-seller flow had grown screen by screen, and mitra were missing who they were buying from, what was in stock and which vouchers applied.',
					'We audited the whole flow, sketched alternatives, prototyped the strongest one and tested it against the live app with mitra.'
				]
			},
			{
				kind: 'stats',
				id: 'numbers',
				title: 'By the numbers',
				items: [
					{ value: '12', label: 'Screens evaluated across the flow' },
					{ value: '74 → 91', label: 'Usability score on the main task' },
					{ value: '8.1s → 4.1s', label: 'Average time to add a grosir product' },
					{ value: '67%', label: 'Mitra who preferred the updated app' }
				]
			},
			{
				kind: 'impact',
				id: 'insights',
				title: 'What the evaluation found',
				intro:
					'The redesign started from a heuristic evaluation of the same flow — written up in full as its own case study.',
				items: [
					'Mitra choose by seller first: the store name has to be as visible as the product',
					'An item that disappears when it’s out of stock reads as a broken app, not an empty shelf',
					'Filters shown only as a count get forgotten, so applied filters must stay on screen',
					'“Grosir Pintar” meant nothing to mitra; they wanted to pick a store by name',
					'Vouchers that only work for WPD need to say so before checkout, not after'
				]
			},
			{
				kind: 'gallery',
				id: 'redesign',
				title: 'Proposed solution',
				caption:
					'Existing catalog next to the improvement, with twelve changes: clearer merchant icons, sort chips, a grid view, a lighter add button and no SKU code.',
				layout: 'wide',
				images: [
					awp('redesign', 'Existing and improved catalog screens with twelve numbered changes')
				]
			},
			{
				kind: 'gallery',
				id: 'testing',
				title: 'Usability testing',
				caption:
					'Maze test with 7 mitra: three tasks on each version. Scores rose on every task, misclicks and time fell, and two in three preferred the update.',
				layout: 'wide',
				images: [awp('testing', 'Usability scores, misclick rate and time for three tasks')]
			},
			{
				kind: 'gallery',
				id: 'data',
				title: 'Data and voices',
				caption:
					'Search logs backed the decision to drop the SKU code: almost no warung searched by it. Mitra described the update as clearer, tidier and more practical.',
				layout: 'wide',
				images: [awp('data', 'Monthly searches by name vs SKU, with three mitra quotes')]
			},
			{
				kind: 'text',
				id: 'reflection',
				title: 'Reflection',
				body: [
					'Seven participants is enough to find problems, not to prove a number. One mitra still preferred the old app because it was familiar, which is a reminder that every redesign costs the people who already learned the old one. The next step was a staged rollout with the same metrics.'
				]
			}
		],
		seed: noFeedback
	},
	// ───────────────────────────────────────────── AWP heuristic evaluation
	{
		slug: 'awp-heuristic-evaluation',
		type: 'design',
		title: 'AWP Heuristic Evaluation',
		tagline: 'Twelve screens, three evaluators, 46 findings.',
		summary:
			'A heuristic evaluation of the new Aplikasi Warung Pintar (AWP) ordering flow — from the homepage to order tracking — scoring every problem against Nielsen’s heuristics so the team could fix the worst first.',
		client: companies.warungPintar,
		role: 'Evaluator · UX research',
		year: 2020,
		duration: 'Oct 2020',
		team: 'Growth team, 3 evaluators',
		facts: [
			{ label: 'Method', value: 'Heuristic evaluation, severity rating' },
			{ label: 'Scope', value: 'Transaction vertical, Merchant tribe' }
		],
		tools: ['Google Slides', 'Nielsen’s 10 heuristics'],
		cover: '/images/work/awp-heuristic/cover.svg',
		featured: true,
		isNew: true,
		links: [{ label: 'The redesign it led to', href: '/work/awp-order-flow' }],
		blocks: [
			{
				kind: 'text',
				id: 'overview',
				title: 'Overview',
				body: [
					'AWP had just become a multi-seller app: mitra could order from Warung Pintar Distribusi (WPD) and from grosir partners in the same cart. Before redesigning anything, three of us inspected the new ordering flow screen by screen.',
					'Each evaluator wrote up what they saw on their own slides, giving every problem a problem weight, a fix weight (both 0–4) and the heuristic it broke. A recap then turned the findings into one set of recommendations per screen.'
				]
			},
			{
				kind: 'stats',
				id: 'numbers',
				title: 'By the numbers',
				items: [
					{ value: '12', label: 'Screens in the ordering flow' },
					{ value: '46', label: 'Scored findings' },
					{ value: '17', label: 'Rated major (3–4)' },
					{ value: '17', label: 'Broke “recognition rather than recall”' }
				]
			},
			{
				kind: 'gallery',
				id: 'method',
				title: 'Method',
				caption:
					'Nielsen’s ten heuristics, the 0–4 severity scale, the three evaluators (each with their own slide colour) and the twelve screens of the flow.',
				layout: 'wide',
				images: [heur('method', 'Heuristics, severity scale, evaluators and screen flow')]
			},
			{
				kind: 'gallery',
				id: 'matrix',
				title: 'Severity map',
				caption:
					'Every finding placed by screen and heuristic, coloured by its worst problem weight. Pesan, Detail Produk and Filter carried the most; recognition over recall broke everywhere.',
				layout: 'wide',
				images: [heur('matrix', 'Heat map of findings: 12 screens × 10 heuristics')]
			},
			{
				kind: 'gallery',
				id: 'pesan',
				title: 'Pesan catalog',
				caption:
					'The catalog had the most findings. Store names were small and pale, and the service labels made promises that onboarding contradicted.',
				layout: 'wide',
				images: [heur('pesan', 'Pesan catalog findings table with an annotated screen')]
			},
			{
				kind: 'gallery',
				id: 'filter',
				title: 'Filter produk',
				caption:
					'Two of the highest fix weights: applied filters showed only as a number, and “Grosir Pintar” meant nothing to mitra.',
				layout: 'wide',
				images: [heur('filter', 'Filter findings with the filter sheet and the filtered catalog')]
			},
			{
				kind: 'gallery',
				id: 'detail',
				title: 'Detail produk',
				caption:
					'The only sign a product came from a grosir was a small store name — the most important fact on the page, shown least.',
				layout: 'wide',
				images: [heur('detail', 'Product detail findings with an annotated screen')]
			},
			{
				kind: 'gallery',
				id: 'cart',
				title: 'Cart & checkout',
				caption:
					'Two sellers in one cart: pale seller banners, tiny subtotals, and vouchers that silently applied to WPD products only.',
				layout: 'wide',
				images: [heur('cart', 'Cart findings with an annotated Keranjang Pemesanan screen')]
			},
			{
				kind: 'impact',
				id: 'patterns',
				title: 'Patterns',
				items: [
					'Who sells the product was the weakest signal on every screen, from catalog to tracking',
					'Hidden state — applied filters, voucher scope, sources in the cart — forced mitra to go back and check',
					'Service labels (“Gratis Ongkir”, “24 Jam Dikirim”) compared unlike things and clashed with onboarding',
					'Missing product photos and long voucher terms made screens look busy but say little'
				]
			},
			{
				kind: 'gallery',
				id: 'recap',
				title: 'Evaluation recap',
				caption:
					'One recommendation per screen. Detail Lacak was the only screen with nothing recorded.',
				layout: 'wide',
				images: [heur('recap', 'Twelve recap cards with finding counts and recommendations')]
			},
			{
				kind: 'text',
				id: 'reflection',
				title: 'Reflection',
				body: [
					'Three evaluators saw different things: one flagged copy and contrast, another missing information, another the flow between screens. Scoring each finding twice — how bad, and how hard to fix — made it easy to agree on what went into the redesign, which we then tested with mitra.'
				]
			}
		],
		seed: noFeedback
	},
	// ───────────────────────────────────────────── Home screen revamp
	{
		slug: 'home-screen-revamp',
		type: 'design',
		title: 'Home Screen Revamp',
		tagline: 'A home that tells mitra where to start.',
		summary:
			'Redesigning the Warung Pintar app home for mitra who signed up online without a sales agent: competitor analysis and crazy 8s, three lo-fi layouts, two hi-fi revamps and every state the home can be in.',
		client: companies.warungPintar,
		role: 'Product designer',
		year: 2020,
		duration: 'Q1 — Q2 2020',
		team: 'Growth team, Commerce · Merchants',
		facts: [
			{ label: 'Methods', value: 'Competitor analysis, crazy 8s, CSAT, feedback sessions' },
			{ label: 'Platform', value: 'Android app' }
		],
		tools: ['Figma', 'Miro', 'Google Forms'],
		cover: '/images/work/home-revamp/cover.svg',
		isNew: true,
		blocks: [
			{
				kind: 'text',
				id: 'overview',
				title: 'Overview',
				body: [
					'The old home screen was confusing, especially for mitra who joined online without a seller to walk them through it. Products, services and promos all fought for the top of the screen.',
					'The goal was to find the strongest layouts for a revamp, test them in feedback sessions, and set up an A/B test before committing.'
				]
			},
			{
				kind: 'gallery',
				id: 'findings',
				title: 'Findings',
				caption:
					'Three hypotheses checked against seven competitor apps, and the top four ideas voted from six participants’ crazy 8s.',
				layout: 'wide',
				images: [home('findings', 'Competitor findings and the top four crazy 8s ideas')]
			},
			{
				kind: 'impact',
				id: 'principles',
				title: 'Design principles',
				items: [
					'Search bar always on top, whatever it can search',
					'Categories inside the first screen, no scrolling',
					'Several product-section formats to keep browsing interesting',
					'A sticky cart so mitra notice what’s waiting to check out',
					'Tailored picks by location, promo or best-seller'
				]
			},
			{
				kind: 'gallery',
				id: 'lofi',
				title: 'Lo-fi explorations',
				caption: 'Three layouts built from the crazy 8s and competitor patterns.',
				layout: 'wide',
				images: [home('lofi', 'Three grey lo-fi home screen layouts')]
			},
			{
				kind: 'gallery',
				id: 'revamp',
				title: 'Hi-fi revamp',
				caption:
					'Revamp I with its eight sections. Revamp II kept the same parts but moved categories above the promo and added Komunitas Pintar, to compare layouts in testing.',
				layout: 'wide',
				images: [home('revamp', 'Annotated hi-fi home screen with eight numbered sections')]
			},
			{
				kind: 'gallery',
				id: 'states',
				title: 'Other states',
				caption:
					'First open, verifying registration, product in cart, order tracking and both notification tabs — one layout, one swapped card.',
				layout: 'wide',
				images: [home('states', 'Six phone screens showing the home in different states')]
			},
			{
				kind: 'gallery',
				id: 'next',
				title: 'Metrics & timeline',
				caption:
					'CSAT, time to order and conversion, the steps to an MVP in Q2, and the homescreen iteration on the team roadmap (W12–W27).',
				layout: 'wide',
				images: [home('next', 'Metrics, next steps and a week-by-week timeline')]
			},
			{
				kind: 'text',
				id: 'reflection',
				title: 'Reflection',
				body: [
					'Engineering capacity shrank during the quarter, so release slid to the end of Q2. Designing the states up front paid off: each one was a card on the same layout, which kept the build small when time got tight.'
				]
			}
		],
		seed: noFeedback
	},
	// ───────────────────────────────────────────── Tokosmart reskin
	{
		slug: 'tokosmart-reskin',
		type: 'design',
		title: 'Tokosmart Reskin',
		tagline: 'Two retail apps become one — in 594 screens.',
		summary:
			'Reskinning Bizzy’s Tokosmart app as Warung Pintar: a new brand foundation on an existing product, merged user journeys, and a clear account of what changes for each app’s users.',
		client: companies.warungPintar,
		role: 'Design lead',
		year: 2021,
		duration: '2 weeks + extension',
		team: 'Warung Pintar × Bizzy',
		facts: [
			{ label: 'Scope', value: '12 modules · 594 screens' },
			{ label: 'Platform', value: 'Android app' }
		],
		tools: ['Figma', 'Miro', 'ClickUp'],
		cover: '/images/work/tokosmart-reskin/cover.svg',
		isNew: true,
		blocks: [
			{
				kind: 'text',
				id: 'overview',
				title: 'Overview',
				body: [
					'Warung Pintar and Bizzy combined their retail apps. Tokosmart’s layout and flows would stay; the Warung Pintar identity would carry over. To keep engineering changes small, the reskin touched only the foundation: brand colour, type, copy and illustration.',
					'On top of that came the hard part — merging two user journeys, with multi-seller orders, multi-catalog shopping, vouchers and cumulative discounts.'
				]
			},
			{
				kind: 'stats',
				id: 'numbers',
				title: 'By the numbers',
				items: [
					{ value: '594', label: 'Screens reskinned' },
					{ value: '12', label: 'Modules, from splash to POS' },
					{ value: '2', label: 'Weeks planned (waterfall)' },
					{ value: '5', label: 'Modules done in week one' }
				]
			},
			{
				kind: 'gallery',
				id: 'foundation',
				title: 'Brand foundation',
				caption:
					'Roboto and a multi-colour gradient style became Nunito Sans and Warung Pintar’s two-tone, outlined illustrations.',
				layout: 'wide',
				images: [
					reskin(
						'foundation',
						'Tokosmart and Warung Pintar colours, type and illustration side by side'
					)
				]
			},
			{
				kind: 'gallery',
				id: 'home',
				title: 'Homescreen merge',
				caption:
					'The AWP home, the Tokosmart home and the reskinned result. The Tokosmart layout stays: credit balance, digital goods, popular products and brands.',
				layout: 'wide',
				images: [reskin('home', 'Three home screens: AWP, Tokosmart and the reskin')]
			},
			{
				kind: 'gallery',
				id: 'impact',
				title: 'Impact on users',
				caption:
					'Registration grows from one step to three, tracking from three to five, navigation shrinks from five tabs to four — each a change AWP users must relearn.',
				layout: 'wide',
				images: [
					reskin(
						'impact',
						'Before and after counts for registration, tracking, navigation and digital products'
					)
				]
			},
			{
				kind: 'impact',
				id: 'concerns',
				title: 'What we flagged',
				items: [
					'AWP users must now add to cart before checkout — a likely broken experience without guidance',
					'Bundles, buy-one-get-one and cumulative discounts are new to AWP users',
					'Tokosmart users lose the look they know, and meet vouchers and multi-seller orders for the first time',
					'Three sign-up options will confuse without coaching, so we paired the product tour with a campaign'
				]
			},
			{
				kind: 'gallery',
				id: 'modules',
				title: 'Delivery plan',
				caption:
					'Part one (green) shipped five primary modules in week one. Part two (yellow) grew mid-sprint with POS, missions and cumulative discounts.',
				layout: 'wide',
				images: [reskin('modules', 'Module list with screen counts and completion')]
			},
			{
				kind: 'text',
				id: 'reflection',
				title: 'Reflection',
				body: [
					'A reskin sounds cosmetic until two user bases meet. Writing down the impact on each group, screen by screen, turned a visual task into a change-management plan — and made the case for onboarding and a campaign before launch.'
				]
			}
		],
		seed: noFeedback
	},
	// ───────────────────────────────────────────── Grosir Pintar
	{
		slug: 'grosir-pintar',
		type: 'design',
		title: 'Grosir Pintar',
		tagline: 'Turning neighbourhood wholesalers into delivery hubs.',
		summary:
			'Research and service design for Grosir Pintar (codename Venom) in Surabaya: closing the price gap with wholesalers, a logistics partnership that delivers for them, and the app roadmap that let wholesalers sell to and restock their own retailers.',
		client: companies.warungPintar,
		role: 'Product designer · UX research',
		year: 2020,
		duration: 'Feb — Aug 2020',
		team: 'Venom squad, Growth squad, team leaders',
		facts: [
			{ label: 'Methods', value: 'Field interviews, pilot, service blueprint' },
			{ label: 'City', value: 'Surabaya' }
		],
		tools: ['Figma', 'Miro', 'Google Sheets', 'WhatsApp'],
		cover: '/images/work/grosir-pintar/cover.svg',
		featured: true,
		isNew: true,
		blocks: [
			{
				kind: 'text',
				id: 'overview',
				title: 'Overview',
				body: [
					'Warungs in Surabaya restock from wholesalers they trust, often several times a day. We wanted those wholesalers as partners: buying from Warung Pintar Distribusi, and selling on to their own “downline” of retailers.',
					'Two things stood in the way. Our prices were higher than theirs on key SKUs, and small wholesalers had no logistics, so their market ended where their customers could ride to. The project tackled both, then piloted a delivery partnership and planned the app that would carry it.'
				]
			},
			{
				kind: 'stats',
				id: 'numbers',
				title: 'By the numbers',
				items: [
					{ value: '81', label: 'Retailers and wholesalers interviewed' },
					{ value: '11', label: 'Wholesalers live on the partnership' },
					{ value: '146', label: 'Retailers served through them' },
					{ value: 'Rp 170.6 jt', label: 'GMV delivered by our logistics' }
				]
			},
			{
				kind: 'gallery',
				id: 'landscape',
				title: 'Current condition',
				caption:
					'Small and medium retailers, the wholesalers they buy from, and why they choose a supplier: price first, then variety, then instant delivery.',
				layout: 'wide',
				images: [
					grosir(
						'landscape',
						'Retailer and wholesaler profiles with supply-source deciding factors'
					)
				]
			},
			{
				kind: 'gallery',
				id: 'price',
				title: 'Price fitness',
				caption:
					'Our gap to wholesaler prices per SKU, and the before/after of campaign 1 using weekly promos and Venom vouchers.',
				layout: 'wide',
				images: [grosir('price', 'Price gap per SKU with before and after campaign prices')]
			},
			{
				kind: 'gallery',
				id: 'campaign',
				title: 'Digital campaign',
				caption:
					'The “Harga Spesial” flyer, four bundles and the WhatsApp broadcast sent to agents.',
				layout: 'wide',
				images: [grosir('campaign', 'Price flyer, bundle packages and a WhatsApp message')]
			},
			{
				kind: 'gallery',
				id: 'ordering',
				title: 'Ordering methods',
				caption:
					'Two flows: agents ordering in Juragan App with a voucher, or a team leader ordering on their behalf.',
				layout: 'wide',
				images: [grosir('ordering', 'Two sequence diagrams for self-serve and assisted ordering')]
			},
			{
				kind: 'gallery',
				id: 'partnership',
				title: 'Logistic partnership',
				caption:
					'Retailers keep ordering from their wholesaler; Warung Pintar restocks the wholesaler and delivers for them. Rolled out in stages, with a lead funnel growing from 21 to 37.',
				layout: 'wide',
				images: [
					grosir('partnership', 'Partnership triangle, wholesaler lead funnels and rollout stages')
				]
			},
			{
				kind: 'gallery',
				id: 'pilot',
				title: 'Pilot in Surabaya',
				caption:
					'Two wholesalers in south Surabaya: 15 orders in three days at one, 3 in half a shift at the other. Small retailers felt guilty ordering small deliveries.',
				layout: 'wide',
				images: [grosir('pilot', 'District map with pilot results and challenges')]
			},
			{
				kind: 'impact',
				id: 'insights',
				title: 'What we learned',
				items: [
					'Price decides the supplier; same-day delivery to the alley is the gap no one filled',
					'Medium retailers adopt first but walk away over a 2–3% price difference',
					'Small retailers felt they were troubling the wholesaler with Rp 100–200K deliveries',
					'Wholesalers wanted stages, not a big-bang integration of their business',
					'A “delivery line” at the counter made the new service visible where people already queue'
				]
			},
			{
				kind: 'gallery',
				id: 'journey',
				title: 'New retailer journey',
				caption: 'Order at the counter or by chat, then wait under two hours and pay on delivery.',
				layout: 'wide',
				images: [grosir('journey', 'Retailer journey flow from store or home to delivery')]
			},
			{
				kind: 'gallery',
				id: 'metrics',
				title: 'Metrics & unit economics',
				caption:
					'138 orders, Rp 958K average order value, Rp 818K CAC per wholesaler and Rp 215K per retailer acquired.',
				layout: 'wide',
				images: [grosir('metrics', 'Traction metrics with acquisition and retention costs')]
			},
			{
				kind: 'gallery',
				id: 'roadmap',
				title: 'Roadmap',
				caption:
					'Phase 1 gave wholesalers a selling app with delivery as a toggle; phase 2 added wallet share and a digital downline, with orders assigned to a chosen warung.',
				layout: 'wide',
				images: [grosir('roadmap', 'March–August roadmap with wholesaler app screens')]
			},
			{
				kind: 'text',
				id: 'reflection',
				title: 'Reflection',
				body: [
					'Delivery solved the wholesaler’s problem but not the small retailer’s feeling of being a burden. The next design challenge was social, not logistical: making a Rp 150K order feel as welcome as a big one.'
				]
			}
		],
		seed: noFeedback
	}
];
