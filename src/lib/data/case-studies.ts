// Real design & research case studies. Illustrations live in
// static/images/work/<slug>/ — SVG redraws of the key slides from each deck.
//
// Facts come from the source decks (Warung Pintar 2020–21, Fazz 2022–23, eFishery 2023–24). Participant names
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
const utang = art('catat-utang');
const modal = art('modal-terms');
const loyal = art('loyal-users');
const dataPulsa = art('data-pulsa');
const faq = art('efishery-faq');
const saldo = art('saldo-panen');
const martech = art('martech-crm');
const payment = art('enterprise-payment');
const arap = art('crm-arap');
const home = art('home-revamp');
const reskin = art('tokosmart-reskin');
const noFeedback = { likes: 0, dislikes: 0, comments: [] };

export const caseStudies: Project[] = [
	// ───────────────────────────────────────────── Mitra User Persona
	{
		slug: 'mitra-persona',
		type: 'design',
		title: 'Mitra User Persona',
		tagline: 'Who actually runs a warung, and what they need from us.',
		summary:
			'A year of research at Warung Pintar into the shop owners (mitra) and buyers behind the platform: how they learn, keep books, shop for stock and choose a warung, turned into personas, archetypes and journey maps that product teams could build on.',
		client: companies.warungPintar,
		role: 'Design lead · UX research',
		year: 2021,
		duration: 'Dec 2019 - Jan 2021',
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
		tagline: 'Fixing the ordering flow mitra use every day: tested, not guessed.',
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
					'The redesign started from a heuristic evaluation of the same flow, written up in full as its own case study.',
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
			'A heuristic evaluation of the new Aplikasi Warung Pintar (AWP) ordering flow (from the homepage to order tracking) scoring every problem against Nielsen’s heuristics so the team could fix the worst first.',
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
					'The only sign a product came from a grosir was a small store name: the most important fact on the page, shown least.',
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
					'Hidden state (applied filters, voucher scope, sources in the cart) forced mitra to go back and check',
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
					'Three evaluators saw different things: one flagged copy and contrast, another missing information, another the flow between screens. Scoring each finding twice (how bad, and how hard to fix) made it easy to agree on what went into the redesign, which we then tested with mitra.'
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
		year: 2021,
		duration: 'Q1 - Q2 2020',
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
					'First open, verifying registration, product in cart, order tracking and both notification tabs: one layout, one swapped card.',
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
		tagline: 'Two retail apps become one, in 594 screens.',
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
					'On top of that came the hard part: merging two user journeys, with multi-seller orders, multi-catalog shopping, vouchers and cumulative discounts.'
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
					'Registration grows from one step to three, tracking from three to five, navigation shrinks from five tabs to four: each a change AWP users must relearn.',
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
					'AWP users must now add to cart before checkout: a likely broken experience without guidance',
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
					'A reskin sounds cosmetic until two user bases meet. Writing down the impact on each group, screen by screen, turned a visual task into a change-management plan, and made the case for onboarding and a campaign before launch.'
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
		year: 2021,
		duration: 'Feb - Aug 2020',
		team: 'Venom squad, Growth squad, team leaders',
		facts: [
			{ label: 'Methods', value: 'Field interviews, pilot, service blueprint' },
			{ label: 'City', value: 'Surabaya' }
		],
		tools: ['Figma', 'Miro', 'Google Sheets', 'WhatsApp'],
		cover: '/images/work/grosir-pintar/cover.svg',
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
	},
	// ───────────────────────────────────────────── Fazz · Catat Utang report
	{
		slug: 'catat-utang-report',
		type: 'design',
		title: 'Catat Utang Report',
		tagline: 'We assumed agents wanted charts. 79.5% asked for a table.',
		summary:
			'Research for Fazz Agen’s debt book (catat utang): a survey of 377 agents on what a debt report should hold, then a Maze usability test of a visual report and two “record as debt” shortcuts with five agents.',
		client: companies.fazz,
		role: 'UI designer · UX research',
		year: 2022,
		duration: 'May - Jun 2022',
		team: 'Experience team',
		facts: [
			{ label: 'Methods', value: 'Survey, usability testing, heatmaps, SEQ' },
			{ label: 'Product', value: 'Fazz Agen · Catat Utang' }
		],
		tools: ['Figma', 'Maze', 'Google Forms'],
		cover: '/images/work/catat-utang/cover.svg',
		isNew: true,
		blocks: [
			{
				kind: 'text',
				id: 'overview',
				title: 'Overview',
				body: [
					'Agents use catat utang to record what their customers owe. Adoption and retention were low, and earlier research suggested “agent diaries”. We proposed a visual debt report, but first needed to know what agents wanted in it, and whether they’d use it.',
					'A survey ran from 18 to 27 May 2022, followed by concept validation in Maze: viewing the report, and recording a sale as debt through two different shortcuts.'
				]
			},
			{
				kind: 'stats',
				id: 'numbers',
				title: 'By the numbers',
				items: [
					{ value: '377', label: 'Agents surveyed' },
					{ value: '90.2%', label: 'Of agents who give credit want a debt report' },
					{ value: '79.5%', label: 'Prefer a table over a visual report' },
					{ value: '100%', label: 'Completed the task with shortcut B' }
				]
			},
			{
				kind: 'gallery',
				id: 'survey',
				title: 'Who keeps a debt book',
				caption:
					'Most respondents were PFA agents; 62.2% accept customer debt, 90.2% of those want a report, and 90.6% record debt right after the sale.',
				layout: 'wide',
				images: [
					utang('survey', 'Donut charts of respondents and a bar chart of when debt is recorded')
				]
			},
			{
				kind: 'gallery',
				id: 'needs',
				title: 'What goes in the report',
				caption:
					'A report is wanted mainly as a reminder (42.2%), and the number agents need first is the total customers’ debt (84.2%).',
				layout: 'wide',
				images: [utang('needs', 'Reasons for needing a report and the information agents want')]
			},
			{
				kind: 'gallery',
				id: 'preference',
				title: 'Table vs visual',
				caption:
					'The visual report was our bet; 79.5% chose a table because it’s easier to understand. Graphs added cognitive load for less-confident readers.',
				layout: 'wide',
				images: [utang('preference', 'Preference donut and reasons for table vs visual views')]
			},
			{
				kind: 'gallery',
				id: 'usability',
				title: 'Concept validation',
				caption:
					'Completion rose from 66.7% (viewing the report) to 100% with the success-screen shortcut, which scored 6.8/7 on the single ease question.',
				layout: 'wide',
				images: [utang('usability', 'Completion grid, ease scores and Maze results for shortcut B')]
			},
			{
				kind: 'gallery',
				id: 'heatmaps',
				title: 'Where they looked',
				caption:
					'No one noticed “Laporan Utang”; on the transaction page a red dot pulled attention from the shortcut; on the success screen it worked.',
				layout: 'wide',
				images: [
					utang(
						'heatmaps',
						'Three heatmapped screens: debt list, transaction detail, success screen'
					)
				]
			},
			{
				kind: 'impact',
				id: 'insights',
				title: 'What we learned',
				items: [
					'Agents value detail over visuals: the table is what they trust',
					'They already reach their goal with filters, so the report itself went unseen',
					'Recording debt without typing a number worried them: is it the base or the selling price?',
					'Agents used to the cashier’s “Cetak dan Catat” want to see every field before saving'
				]
			},
			{
				kind: 'gallery',
				id: 'recommendations',
				title: 'Recommendations',
				caption:
					'Copy and hierarchy fixes on the existing screens, and one combined “Performa Agen” report instead of a chart in every warung tool.',
				layout: 'wide',
				images: [utang('recommendations', 'Before and after screens with six recommendations')]
			}
		],
		seed: noFeedback
	},
	// ───────────────────────────────────────────── Fazz · Terms of Modal
	{
		slug: 'modal-terms',
		type: 'design',
		title: 'Terms of Modal',
		tagline: 'Letting 816 lending users name the words in their own app.',
		summary:
			'A survey for Modal Agen, Fazz’s working-capital loan for agents, to replace finance jargon with the words users actually understand, and the product problems their answers surfaced along the way.',
		client: companies.fazz,
		role: 'UI designer · UX research',
		year: 2022,
		duration: 'Oct - Nov 2022',
		team: 'Experience team, marketing',
		facts: [
			{ label: 'Method', value: 'In-app survey, 851 responses' },
			{ label: 'Product', value: 'Modal Agen (Modal Rakyat)' }
		],
		tools: ['Google Forms', 'Figma', 'Sheets'],
		cover: '/images/work/modal-terms/cover.svg',
		isNew: true,
		blocks: [
			{
				kind: 'text',
				id: 'overview',
				title: 'Overview',
				body: [
					'Modal Agen screens used lending terms such as “Tenor” and “Sisa Plafon” that agents don’t say. We wanted one vocabulary, chosen by users, that every team could align on.',
					'Active PMA users of Modal Agen (including those paying for Grosir orders with Modal) got the survey as an in-app notification. Each term came with its definition, and users picked the name they’d use.'
				]
			},
			{
				kind: 'stats',
				id: 'numbers',
				title: 'By the numbers',
				items: [
					{ value: '851', label: 'Responses in one week' },
					{ value: '816', label: 'Valid: had used Modal' },
					{ value: '8.5%', label: 'Found the information very hard' },
					{ value: '2 of 4', label: 'Terms renamed' }
				]
			},
			{
				kind: 'gallery',
				id: 'method',
				title: 'Survey setup',
				caption: 'Background, target and the timeline from preparation (26 Oct) to report (7 Nov).',
				layout: 'wide',
				images: [modal('method', 'Background, method, responses donut and timeline')]
			},
			{
				kind: 'gallery',
				id: 'understanding',
				title: 'Is Modal easy to understand?',
				caption:
					'71.7% found it very easy, but 8.5% very hard, and the same two terms kept coming up: Tenor and Sisa Plafon.',
				layout: 'wide',
				images: [modal('understanding', 'Five-point rating distribution with callouts')]
			},
			{
				kind: 'gallery',
				id: 'terms',
				title: 'Four terms, users’ words',
				caption:
					'Tenor → Jangka Waktu (40.9%), Sisa Plafon → Limit Modal (44.5%); Perpanjangan Modal Otomatis (61.8%) and Modal Grosir (55.6%) stay.',
				layout: 'wide',
				images: [modal('terms', 'Votes for each candidate term, four panels')]
			},
			{
				kind: 'gallery',
				id: 'issues',
				title: 'Beyond the words',
				caption:
					'Open answers pointed at rejections without reasons, short limits and tenors, Pulsa-only usage and repayment pain: product issues no rename fixes.',
				layout: 'wide',
				images: [modal('issues', 'Grouped product issues and the Modal screen with new terms')]
			},
			{
				kind: 'impact',
				id: 'outcome',
				title: 'Recommendations',
				items: [
					'Adopt Jangka Waktu, Limit Modal, Perpanjangan Modal Otomatis and Modal Grosir everywhere',
					'Align every stakeholder on the validated vocabulary',
					'Follow up the product issues users raised alongside the terms',
					'Publish clearer information about Modal: FAQ and blog posts'
				]
			}
		],
		seed: noFeedback
	},
	// ───────────────────────────────────────────── Fazz · Top loyal users
	{
		slug: 'loyal-users',
		type: 'design',
		title: 'Top Loyal Users',
		tagline: 'Why our best agents stay without a single coupon.',
		summary:
			'Interviews with Fazz Agen’s most loyal new agents (profitable, and never touching a coupon) to find what keeps them, distilled into a proto persona and four recommendations to grow more agents like them.',
		client: companies.fazz,
		role: 'UI designer · UX research',
		year: 2023,
		duration: 'Jan 2023',
		team: 'Experience team, data analysts',
		facts: [
			{ label: 'Method', value: 'In-depth interviews, internal data' },
			{ label: 'Product', value: 'Fazz Agen' }
		],
		tools: ['WhatsApp', 'Figma', 'Sheets'],
		cover: '/images/work/loyal-users/cover.svg',
		featured: true,
		isNew: true,
		blocks: [
			{
				kind: 'text',
				id: 'overview',
				title: 'Overview',
				body: [
					'Data showed a group of agents who were profitable and already hooked with almost no coupon or marketing spend. If we understood what kept them, we could grow more of them.',
					'We interviewed seven agents who registered between October and December 2022 and used no coupon in their first 30 days, by WhatsApp call on 19–20 January 2023, and checked what they said against internal data.'
				]
			},
			{
				kind: 'stats',
				id: 'numbers',
				title: 'By the numbers',
				items: [
					{ value: '7', label: 'In-depth interviews' },
					{ value: '54.55%', label: 'Of top loyal users live outside Java' },
					{ value: '41.67%', label: 'Of their sales are Telkomsel Pulsa' },
					{ value: '170', label: 'Telkomsel data SKUs on our list' }
				]
			},
			{
				kind: 'gallery',
				id: 'participants',
				title: 'Who we talked to',
				caption:
					'Seven agents, anonymised, with their first months on Fazz Agen: from Rp 4.2 jt to Rp 172.3 jt GMV.',
				layout: 'wide',
				images: [loyal('participants', 'Method, rationale and seven anonymised agent cards')]
			},
			{
				kind: 'gallery',
				id: 'profile',
				title: 'Where they live and work',
				caption:
					'Tier-2 towns in Java and tier-3 areas beyond it, where banks and competitors are rare: most run Fazz Agen alongside another business.',
				layout: 'wide',
				images: [loyal('profile', 'Dot map of Indonesia with agent locations and profile facts')]
			},
			{
				kind: 'gallery',
				id: 'behaviour',
				title: 'What they sell',
				caption:
					'Small prepaid Pulsa dominates (80% of Telkomsel sales are Rp 10k). Coupons go unused: agents don’t know what they are, or are too busy to add them.',
				layout: 'wide',
				images: [loyal('behaviour', 'Top product chart, price score and coupon habits')]
			},
			{
				kind: 'gallery',
				id: 'motivations',
				title: 'Why they stay',
				caption:
					'Cheap, easy, fast and a big deposit limit, plus the apps they use alongside Fazz Agen, and why.',
				layout: 'wide',
				images: [loyal('motivations', 'Eight motivations and six competing apps')]
			},
			{
				kind: 'gallery',
				id: 'persona',
				title: 'Proto persona',
				caption: 'A composite counter owner: behaviour, motivations, frustrations and goals.',
				layout: 'wide',
				images: [loyal('persona', 'Proto persona card with four quadrants')]
			},
			{
				kind: 'gallery',
				id: 'recommendations',
				title: 'Recommendations',
				caption:
					'A local-first, filterable data package list (Fazz showed 170 Telkomsel SKUs; competitors 43–91), game vouchers by name, “Top Up Digital”, and a well-kept website.',
				layout: 'wide',
				images: [
					loyal(
						'recommendations',
						'SKU comparison chart, a local package list and three recommendations'
					)
				]
			}
		],
		seed: noFeedback
	},
	// ───────────────────────────────────────────── Fazz · Data & Pulsa improvements
	{
		slug: 'data-pulsa-improvements',
		type: 'design',
		title: 'Data & Pulsa Improvements',
		tagline: '170 packages in one list, and four ways agents actually choose.',
		summary:
			'Discovery research on Fazz Agen’s Data and Pulsa pages: a survey of 623 agents, competitor benchmarking and sales interviews that traced the complaints to one cause (a list too complex to use) and reshaped it around how customers ask.',
		client: companies.fazz,
		role: 'UI designer · UX research',
		year: 2023,
		duration: 'Jan - Feb 2023',
		team: 'Experience team, 3 researchers',
		facts: [
			{ label: 'Methods', value: 'Survey, competitor analysis, SE interviews' },
			{ label: 'Product', value: 'Fazz Agen · Data & Pulsa' }
		],
		tools: ['Typeform', 'Figma', 'Sheets'],
		cover: '/images/work/data-pulsa/cover.svg',
		isNew: true,
		blocks: [
			{
				kind: 'text',
				id: 'overview',
				title: 'Overview',
				body: [
					'Pulsa and Data are two of Fazz Agen’s top recharge features, yet agents called the pages unfriendly, and sales said the “Penawaran Terbaik” (best offer) section confused them. We set out to confirm the real problems before redesigning anything.',
					'Because the two pages share one design, we focused on Data first so the fixes could carry over to Pulsa. A push-notification survey went out on 5 February 2023, backed by competitor analysis and insights from three sales executives.'
				]
			},
			{
				kind: 'stats',
				id: 'numbers',
				title: 'By the numbers',
				items: [
					{ value: '623', label: 'Survey responses' },
					{ value: '389', label: 'Active Data users analysed' },
					{ value: '51.4%', label: 'Of low raters found the page too complex' },
					{ value: '170', label: 'Telkomsel packages in one list' }
				]
			},
			{
				kind: 'gallery',
				id: 'method',
				title: 'Method',
				caption:
					'623 responses filtered to 490 Fazz Agen users, 389 active Data sellers, and 70 answers rated 1–4 that explained why.',
				layout: 'wide',
				images: [dataPulsa('method', 'Response funnel, timeline and research methods')]
			},
			{
				kind: 'gallery',
				id: 'users',
				title: 'Who uses Data',
				caption:
					'Agents of every tenure, 79.4% of them selling Data. The average ease rating was 5.5/7, but 22.1% rated it 1–4.',
				layout: 'wide',
				images: [dataPulsa('users', 'Tenure donut, Data usage bar and seven-point ease rating')]
			},
			{
				kind: 'gallery',
				id: 'pain-points',
				title: 'The main problem',
				caption:
					'At every low score, “less organised” and “too many package types” led. Together they make up 51.4%: the page is too complex for agents.',
				layout: 'wide',
				images: [dataPulsa('pain-points', 'Pain points per score and the combined main problem')]
			},
			{
				kind: 'impact',
				id: 'insights',
				title: 'What we learned',
				items: [
					'Agents want internet packages separated from phone and SMS packages',
					'Long paragraph descriptions make every package slow to compare',
					'Complaints about price may come from comparing with resellers and consumer apps: our Indosat 100GB price beat most direct competitors',
					'Longer-tenured agents complained most: they remember a simpler, cheaper list'
				]
			},
			{
				kind: 'gallery',
				id: 'choosing',
				title: 'How customers choose',
				caption:
					'Customers ask for price (42.7%) and quota (38.3%) first. Competitors show 43–57 Telkomsel packages with visible filters; we showed 170 with none.',
				layout: 'wide',
				images: [dataPulsa('choosing', 'Buying factors chart and competitor comparison table')]
			},
			{
				kind: 'gallery',
				id: 'best-offer',
				title: 'Penawaran Terbaik',
				caption:
					'74.6% had used the best offer, most 1–3 times a week. Of those who hadn’t, a third simply didn’t know it existed.',
				layout: 'wide',
				images: [dataPulsa('best-offer', 'Best-offer usage donut and reasons for not using it')]
			},
			{
				kind: 'gallery',
				id: 'recommendations',
				title: 'Recommendations',
				caption:
					'A compact list with Harga · Kuota · Paket Data · Masa Aktif tabs in the order customers ask, a simpler best-offer row, and more promotion of the offer.',
				layout: 'wide',
				images: [
					dataPulsa(
						'recommendations',
						'Current, recommended and filtered list screens with four recommendations'
					)
				]
			}
		],
		seed: noFeedback
	},
	// ───────────────────────────────────────────── eFishery · FAQ (Level 0 support)
	{
		slug: 'efishery-faq',
		type: 'design',
		title: 'FAQ as Level 0 Support',
		tagline: 'Answering farmers before they need to file a ticket.',
		summary:
			'A Design Ops initiative for eFisheryKu: complaint data analysed with N-grams to find the questions farmers actually ask, turned into a self-service FAQ that comes before every “submit a complaint” option.',
		client: companies.efishery,
		role: 'Interaction designer',
		year: 2024,
		duration: 'Q4 2024',
		team: 'Design Ops, CX, data team, PM',
		facts: [
			{ label: 'Methods', value: 'Complaint data, N-gram analysis, CS workshop' },
			{ label: 'Product', value: 'eFisheryKu · Bantuan' }
		],
		tools: ['Figma', 'Miro', 'N-gram analysis', 'BI dashboard'],
		cover: '/images/work/efishery-faq/cover.svg',
		isNew: true,
		blocks: [
			{
				kind: 'text',
				id: 'overview',
				title: 'Overview',
				body: [
					'Every issue a farmer had in eFisheryKu became a complaint ticket for the Level 1 customer service team. Many of those tickets were the same few questions, and the team struggled to reach the data they needed to answer them quickly.',
					'The idea: put an FAQ in front of the ticket, a “Level 0” where farmers can solve common problems themselves, so CX can focus on complex and urgent cases.'
				]
			},
			{
				kind: 'stats',
				id: 'numbers',
				title: 'By the numbers',
				items: [
					{ value: '31 → 671', label: 'Monthly complaints, Feb → Sep 2024' },
					{ value: '71.16%', label: 'On-time resolution in October' },
					{ value: '1 day', label: 'Target resolution time' },
					{ value: '3', label: 'Levels of N-gram analysis' }
				]
			},
			{
				kind: 'gallery',
				id: 'context',
				title: 'Context',
				caption:
					'Situation, complication and aim, and the existing flow, where every problem became a ticket for Level 1 and sometimes Level 2.',
				layout: 'wide',
				images: [faq('context', 'Situation, complication, aim and the existing support flow')]
			},
			{
				kind: 'gallery',
				id: 'problem',
				title: 'Volume up, resolution down',
				caption:
					'Complaints grew more than twentyfold in seven months while on-time resolution fell from 87.66% to 71.16%, and retained farmers fell with it.',
				layout: 'wide',
				images: [faq('problem', 'Monthly complaints and on-time resolution charts')]
			},
			{
				kind: 'gallery',
				id: 'ngram',
				title: 'Finding the questions',
				caption:
					'Single words, word pairs, then pairs combined with the complaint category: the third pass surfaced the real issues, like changing a phone number.',
				layout: 'wide',
				images: [faq('ngram', 'Top words and frequencies for three N-gram levels')]
			},
			{
				kind: 'gallery',
				id: 'solution',
				title: 'FAQ as Level 0',
				caption:
					'A help landing page that shows most of the FAQ first, topic and article pages that end with further help, and a “Butuh Bantuan?” entry point in the transaction funnel.',
				layout: 'wide',
				images: [faq('solution', 'Four app screens of the new help flow with design principles')]
			},
			{
				kind: 'impact',
				id: 'principles',
				title: 'Design decisions',
				items: [
					'Show about 80% of FAQ content before any contact option',
					'Search with topic chips, so farmers find answers in their own words',
					'Keep complaint and call-centre buttons at the end of every article, not the start',
					'Ask “Was this helpful?” to learn which answers work',
					'Keep the funnel complaint path for transaction tracking, still under discussion with the PM'
				]
			}
		],
		seed: noFeedback
	},
	// ───────────────────────────────────────────── eFishery · Saldo Panen
	{
		slug: 'saldo-panen',
		type: 'design',
		title: 'Saldo Panen',
		tagline: 'Testing a harvest wallet with the farmers who would use it.',
		summary:
			'Concept testing for Saldo Panen, a balance in eFisheryKu where fish farmers receive surplus from harvest settlement and withdraw it to their bank, with seven farmers in Subang and Bandung Barat.',
		client: companies.efishery,
		role: 'Product designer · UX research',
		year: 2024,
		duration: 'Mar 2024',
		team: 'Product design, Core Fintech',
		facts: [
			{ label: 'Methods', value: 'In-depth interviews, prototype concept test' },
			{ label: 'Product', value: 'eFisheryKu · Saldo Panen' }
		],
		tools: ['Figma', 'Maze', 'Miro'],
		cover: '/images/work/saldo-panen/cover.svg',
		featured: true,
		isNew: true,
		blocks: [
			{
				kind: 'text',
				id: 'overview',
				title: 'Overview',
				body: [
					'When eFishery buys a farmer’s harvest (Tarik Ikan), any surplus after settling their feed debt was transferred manually, with little visibility. Saldo Panen would hold that surplus in the app so farmers can track it and withdraw it themselves.',
					'Before launch we needed to know who would adopt it and what would stop them. We interviewed seven farmers and tested a prototype covering the entry point, onboarding, withdrawal and admin fee.'
				]
			},
			{
				kind: 'stats',
				id: 'numbers',
				title: 'By the numbers',
				items: [
					{ value: '7', label: 'Farmers in Subang and Bandung Barat' },
					{ value: '6.7/10', label: 'Score for finding Saldo Panen' },
					{ value: '5 of 7', label: 'Didn’t understand it after onboarding' },
					{ value: 'Rp1.500', label: 'Admin fee every farmer noticed' }
				]
			},
			{
				kind: 'gallery',
				id: 'context',
				title: 'Context and participants',
				caption:
					'What Saldo Panen is, the five research aims, and seven farmers split by tech savviness and AR/AP history.',
				layout: 'wide',
				images: [saldo('context', 'Project context, research aims and participant groups')]
			},
			{
				kind: 'gallery',
				id: 'archetypes',
				title: 'Half-hearted acceptance',
				caption:
					'Most farmers accepted with help from the field team but stayed skeptical. Three archetypes explain why, through motivation, ability and opportunity.',
				layout: 'wide',
				images: [
					saldo('archetypes', 'Resist-to-accept scale, three archetypes and their mental model')
				]
			},
			{
				kind: 'gallery',
				id: 'testing',
				title: 'Concept test results',
				caption:
					'Farmers looked for the balance on Home or in Lapak Ikan, skipped onboarding, confused the history list with the withdraw button, but understood the fee.',
				layout: 'wide',
				images: [saldo('testing', 'Four heatmapped prototype screens with task results')]
			},
			{
				kind: 'impact',
				id: 'insights',
				title: 'What we learned',
				items: [
					'Farmers trust the field team (FBDO) more than the app, and confirm every step with them',
					'They expect Saldo Panen to be tied to Tarik Ikan, showing where the money came from',
					'They imagine it as a full e-wallet: savings, feed purchases and bank transfers',
					'Admin fees are accepted, but compared with BI-Fast and DANA',
					'A step-by-step test script guided them better than our onboarding screens'
				]
			},
			{
				kind: 'gallery',
				id: 'strategy',
				title: 'Adoption strategy',
				caption:
					'A strategy per archetype, four design principles, and the verdict: a closely monitored pilot with tech-savvy independent farmers first.',
				layout: 'wide',
				images: [
					saldo('strategy', 'Adoption strategy per archetype, design principles and verdict')
				]
			}
		],
		seed: noFeedback
	},
	// ───────────────────────────────────────────── eFishery · Marketing & growth
	{
		slug: 'martech-crm',
		type: 'design',
		title: 'Marketing Tech & Growth',
		tagline: 'One CRM so 800+ field staff reach the right farmer.',
		summary:
			'Discovery and design for eFishery’s marketing and growth products: a CRM with self-segmentation, a promotion engine with budget control, and a journey that decides whether a farmer gets a campaign, a call or a visit.',
		client: companies.efishery,
		role: 'Product designer',
		year: 2023,
		duration: 'Q2 2023 - Q1 2024',
		team: 'Enterprise, PMM, BD, data & engineering',
		facts: [
			{ label: 'Methods', value: 'Stakeholder interviews, JTBD, journey mapping' },
			{ label: 'Product', value: 'CRM · Promotion Management System' }
		],
		tools: ['Figma', 'Miro', 'CleverTap', 'ClickUp'],
		cover: '/images/work/martech-crm/cover.svg',
		isNew: true,
		blocks: [
			{
				kind: 'text',
				id: 'overview',
				title: 'Overview',
				body: [
					'Indonesia has more than 2.5 million fish farmers, and eFishery had over 800 people reaching them directly. Marketing, telesales and field sales coordinated in spreadsheets, personalised promos happened outside the promo system, and nobody could easily see who should handle which farmer next.',
					'We set one objective (engage the right farmers, with the right needs, using the right approach) and measured it through campaign engagement, field-visit success and self-transacting farmers.'
				]
			},
			{
				kind: 'stats',
				id: 'numbers',
				title: 'By the numbers',
				items: [
					{ value: '+9.7%', label: 'Field-visit success (30% vs 20.4%)' },
					{ value: '2×', label: 'App visits from campaigns, QoQ' },
					{ value: '800+', label: 'Staff reaching farmers directly' },
					{ value: '3', label: 'Products in one CRM universe' }
				]
			},
			{
				kind: 'gallery',
				id: 'voice',
				title: 'Voice of the internal customer',
				caption:
					'Pain points from campaign, promo, growth and telesales leads, mapped to jobs to be done and five product bets.',
				layout: 'wide',
				images: [
					martech('voice', 'Quotes from four internal roles and the jobs-to-be-done mapping')
				]
			},
			{
				kind: 'gallery',
				id: 'journey',
				title: 'CRM-enabled O2O journey',
				caption:
					'Acquisition, retention and churn paths: a farmer moves from digital campaign to telesales to field visit only when they don’t transact.',
				layout: 'wide',
				images: [
					martech(
						'journey',
						'Online-to-offline journey across campaigns, telesales and field visits'
					)
				]
			},
			{
				kind: 'gallery',
				id: 'roadmap',
				title: 'Universe & roadmap',
				caption:
					'Enablement in Q2, customer-data enhancement in Q3, predictive in Q4, across customer experience, engagement and promotion management.',
				layout: 'wide',
				images: [martech('roadmap', 'Three-phase roadmap and the product universe')]
			},
			{
				kind: 'gallery',
				id: 'impact',
				title: 'Products & impact',
				caption:
					'Self-segmentation in the CRM, a promo budget limit that stops overspend at checkout, and the results after launch.',
				layout: 'wide',
				images: [
					martech('impact', 'CRM segmentation table, promo limit message and impact metrics')
				]
			},
			{
				kind: 'impact',
				id: 'learnings',
				title: 'What we learned',
				items: [
					'Project-based syncs work for users, but the whole team needs its own cadence',
					'Product, marketing and martech must plan together from the start',
					'Shared “contribute-able” products need regular showcases to cut discovery time',
					'Any new customer-facing feature should loop marketing tech in early'
				]
			}
		],
		seed: noFeedback
	},
	// ───────────────────────────────────────────── eFishery · Enterprise payment
	{
		slug: 'enterprise-payment',
		type: 'design',
		title: 'Enterprise Payment',
		tagline: 'From Slack screenshots to automated reconciliation.',
		summary:
			'Designing eFishery’s internal payment products (a finance app, AR/AP settlement and payment services in and out) so finance could process growing volumes on time and farmers could pay by themselves.',
		client: companies.efishery,
		role: 'Product designer',
		year: 2023,
		duration: 'Q1 - Q3 2023',
		team: 'Enterprise Payment team',
		facts: [
			{ label: 'Methods', value: 'User interviews, value proposition, metrics' },
			{ label: 'Product', value: 'FAT App · Payment services' }
		],
		tools: ['Figma', 'Notion', 'ClickUp'],
		cover: '/images/work/enterprise-payment/cover.svg',
		isNew: true,
		blocks: [
			{
				kind: 'text',
				id: 'overview',
				title: 'Overview',
				body: [
					'Payments started as field staff posting receipt photos in Slack for finance to key into Odoo. As transactions grew, finance hit its limits: payments arrived around the clock, about 200 records a day per business unit came in manually, and treasury reconciled ~18 bank accounts in spreadsheets.',
					'The team built finance services and payment services together, with each step replacing a manual one.'
				]
			},
			{
				kind: 'stats',
				id: 'numbers',
				title: 'By the numbers',
				items: [
					{ value: '18.91h', label: 'Lead time to reconcile, down from 203h' },
					{ value: '−90%', label: 'Against a −50% target' },
					{ value: '7 → 3', label: 'Manual steps to get a payment receipt' },
					{ value: '4', label: 'Product groups shipped' }
				]
			},
			{
				kind: 'gallery',
				id: 'users',
				title: 'Who we were serving',
				caption:
					'Accounts receivable, accounts payable, treasury and product managers: each blocked by a payment system that didn’t scale.',
				layout: 'wide',
				images: [payment('users', 'Four user personas with quotes and needs')]
			},
			{
				kind: 'gallery',
				id: 'products',
				title: 'Products & services',
				caption:
					'FAT App, AR/AP settlement, and payment services in and out: from transfer recaps and bank statements to VA payments and payout status.',
				layout: 'wide',
				images: [payment('products', 'Four product groups with their features')]
			},
			{
				kind: 'gallery',
				id: 'metrics',
				title: 'Metrics',
				caption:
					'Reconciliation lead time fell from 190.8h in January to 18.91h in May; getting a payment receipt went from seven manual steps to three.',
				layout: 'wide',
				images: [
					payment('metrics', 'Reconciliation lead-time chart and receipt process before and after')
				]
			},
			{
				kind: 'gallery',
				id: 'roadmap',
				title: 'Learnings & roadmap',
				caption:
					'Drivers and blockers for the gateway, disbursement and bank reconciliation, and the quarterly roadmap for payment in and out.',
				layout: 'wide',
				images: [payment('roadmap', 'Drivers and blockers with a Q1–Q3 roadmap')]
			}
		],
		seed: noFeedback
	},
	// ───────────────────────────────────────────── eFishery · CRM AR/AP survey
	{
		slug: 'crm-arap-survey',
		type: 'design',
		title: 'CRM AR/AP Survey',
		tagline: 'Rating the tool sales use to settle farmer debts.',
		summary:
			'An evaluative survey of the CRM’s AR/AP settlement feature with 22 sales and FBDC staff: how they use it, how they rate it, and the double-entry flow they wanted gone.',
		client: companies.efishery,
		role: 'Product designer · UX research',
		year: 2023,
		duration: 'Feb 2023',
		team: 'Two researchers',
		facts: [
			{ label: 'Method', value: 'Evaluative survey, follow-up calls' },
			{ label: 'Product', value: 'CRM · AR/AP settlement' }
		],
		tools: ['Google Forms', 'Sheets', 'Figma'],
		cover: '/images/work/crm-arap/cover.svg',
		isNew: true,
		blocks: [
			{
				kind: 'text',
				id: 'overview',
				title: 'Overview',
				body: [
					'A year after the CRM launched, we checked how its AR/AP settlement feature (where sales settle farmers’ feed debts against their harvest) was working for the people using it every day in the field.',
					'All 22 respondents came from the fish business unit, mostly sales. We followed up with several of them to understand the reasons behind their scores.'
				]
			},
			{
				kind: 'stats',
				id: 'numbers',
				title: 'By the numbers',
				items: [
					{ value: '22', label: 'Respondents, all from fish' },
					{ value: '59.1%', label: 'Use AR/AP settlement in the CRM' },
					{ value: '92.9%', label: 'Rate it good or fair' },
					{ value: '8/10', label: 'Score given by half the users' }
				]
			},
			{
				kind: 'gallery',
				id: 'usage',
				title: 'Respondents & usage',
				caption:
					'90.9% sales, 9.1% FBDC; RMP is the most used CRM feature (90.9%), then AR/AP settlement (59.1%) and Farmers (45.5%).',
				layout: 'wide',
				images: [arap('usage', 'Business unit and role donuts with a feature usage chart')]
			},
			{
				kind: 'gallery',
				id: 'ratings',
				title: 'How it feels',
				caption:
					'92.9% use all three settlement features; most call it “cukup mudah” (easy enough), and errors were mostly about RMP.',
				layout: 'wide',
				images: [
					arap('ratings', 'Feature use, experience rating, word cloud and satisfaction histogram')
				]
			},
			{
				kind: 'gallery',
				id: 'actions',
				title: 'Issues & action plan',
				caption:
					'Double entry from GForms to GSheet to CRM, late vendor bills and weak field networks, turned into five action items with owners.',
				layout: 'wide',
				images: [arap('actions', 'Issues, the current input flow and five action items')]
			}
		],
		seed: noFeedback
	}
];
