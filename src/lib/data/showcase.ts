// Real code projects. Each one ships a runnable build in static/projects/<slug>/
// (assets optimised for the web; untouched originals are kept in _originals/).
// Media lives in static/images/work/<slug>/: preview.mp4 + poster.webp (the
// designed motion piece) and shot-N.webp (screens).
//
// Facts come from the builds themselves — counts in "By the numbers" were
// counted from each build. Duration and team weren't stated anywhere in the
// files, so they're left out; add `duration` / `team` when you know them.
import type { ImageRef, Project } from '#lib/types/index.ts';
import { showcaseClients as c } from './clients.ts';

const media = (slug: string) => ({
	video: `/images/work/${slug}/preview.mp4`,
	poster: `/images/work/${slug}/poster.webp`,
	shots: (...list: [number, string][]): ImageRef[] =>
		list.map(([n, alt]) => ({ src: `/images/work/${slug}/shot-${n}.webp`, alt }))
});

const kee = media('kee-platforms');
const muskitnas = media('muskitnas');
const jardin = media('jardin-timesheet');
const derkei = media('derkei');
const sparq = media('sparq');
const blast = media('blast-hub');
const iconplus = media('iconplus');
const ielts = media('ielts-course');
const pims = media('pims-pertamina');
const dataroom = media('dataroom');
const silma = media('silma');

const noFeedback = { likes: 0, dislikes: 0, comments: [] };

export const showcase: Project[] = [
	// ───────────────────────────────────────────── Kee Platforms
	{
		slug: 'kee-platforms',
		type: 'code',
		title: 'Kee Platforms',
		tagline: 'An AI-native lending platform, explained in one scroll.',
		summary:
			'The company and product site for Kee Platforms: a credit-infrastructure startup whose stack (KeeScore™, KeeIgnite™, KeeIntelligence™ and Kee2Credit™) lets banks and fintechs score, originate and manage loans with AI.',
		client: c.kee,
		role: 'Front-end development',
		year: 2025,
		facts: [
			{ label: 'Industry', value: 'Fintech · Lending' },
			{ label: 'Platform', value: 'Web, responsive' }
		],
		tools: ['Next.js', 'React', 'Tailwind CSS', 'Framer Motion'],
		cover: kee.poster,
		featured: true,
		gallery: kee.shots(
			[1, 'Hero: Revolutionizing Lending with AI'],
			[2, 'Kee2Credit™ platform capabilities'],
			[3, 'SME credit products'],
			[4, 'Partnership network']
		),
		preview: { url: '/projects/kee-platforms/index.html', video: kee.video, poster: kee.poster },
		blocks: [
			{
				kind: 'text',
				id: 'overview',
				title: 'Overview',
				body: [
					'Kee sells infrastructure, not a consumer app, so the site has to make an abstract AI credit stack feel concrete to banks, fintechs and partners within a single scroll.',
					'It walks a visitor from the mission (credit for 100 million SMEs and a billion consumers) through the platform, how it works in three steps, the credit products it powers, partners, team and open roles.'
				]
			},
			{
				kind: 'text',
				id: 'purpose',
				title: 'Why it matters',
				body: [
					'For a B2B fintech the website is the first due-diligence document. Clear structure and confident motion signal the same reliability the product promises, and turn “AI lending” from a buzzword into four named products with defined jobs.'
				]
			},
			{
				kind: 'features',
				id: 'features',
				title: 'Key features',
				items: [
					{
						title: 'Product architecture, visualised',
						body: 'Layered, animated illustrations show how KeeScore, KeeIgnite, KeeIntelligence and Kee2Credit fit together.'
					},
					{
						title: 'Three-step story',
						body: '“From data to credit in three simple steps” turns orchestration, AI decisioning and embedded credit into a sequence anyone can follow.'
					},
					{
						title: 'Product catalogue',
						body: 'SME and retail credit products: revenue-based financing, revolving lines, working capital, personal loans, checkout financing.'
					},
					{
						title: 'Content-driven sections',
						body: 'Every section renders from one content object, so copy and offerings change without touching layout code.'
					},
					{
						title: 'Careers & legal',
						body: 'Team, open positions with apply flow, contact form and a full privacy policy in the same build.'
					},
					{
						title: 'Art-directed for mobile',
						body: 'Separate mobile artwork keeps the heavy hero imagery light on phones.'
					}
				]
			},
			{
				kind: 'stats',
				id: 'numbers',
				title: 'By the numbers',
				items: [
					{ value: '4', label: 'Platform products presented' },
					{ value: '6', label: 'Core capabilities explained' },
					{ value: '3', label: 'Steps from data to credit' },
					{ value: '4', label: 'Partner logos featured' }
				]
			},
			{
				kind: 'impact',
				id: 'impact',
				title: 'Impact & value',
				items: [
					'A single, credible front door for lenders, partners and candidates',
					'Complex AI infrastructure made legible to non-technical buyers',
					'Marketing can update products and copy without engineering',
					'Fast on mobile despite rich, layered visuals'
				]
			},
			{
				kind: 'stack',
				id: 'stack',
				title: 'Tech stack',
				groups: [
					{
						label: 'Framework',
						items: [
							{ name: 'Next.js', why: 'Static, SEO-friendly pages' },
							{ name: 'React', why: 'Component-driven sections' }
						]
					},
					{
						label: 'UI',
						items: [
							{ name: 'Tailwind CSS', why: 'Consistent spacing & responsive layout' },
							{ name: 'react-icons', why: 'One icon set across the site' }
						]
					},
					{
						label: 'Motion',
						items: [{ name: 'Framer Motion', why: 'Section reveals and layered platform art' }]
					}
				]
			}
		],
		seed: noFeedback
	},

	// ───────────────────────────────────────────── Pendar Cahaya
	{
		slug: 'muskitnas',
		type: 'code',
		title: 'Pendar Cahaya',
		tagline: 'A museum exhibition on Indonesian mental-health history, online.',
		summary:
			'A virtual exhibition for Museum Kebangkitan Nasional on the history of psychiatry in the Dutch East Indies and the STOVIA-trained doctors who pioneered mental-health care in Indonesia, with films, profiles, a recreation room and a bibliography.',
		client: c.muskitnas,
		role: 'Design & development',
		year: 2022,
		facts: [
			{ label: 'Industry', value: 'Culture · Museum' },
			{ label: 'Platform', value: 'Web, responsive' }
		],
		tools: ['Laravel', 'Bootstrap', 'jQuery', 'AOS', 'html2canvas'],
		cover: muskitnas.poster,
		gallery: muskitnas.shots(
			[1, 'Splash: Pendar Cahaya'],
			[2, 'About the exhibition, with film'],
			[3, 'Recreation room'],
			[4, 'Digital bibliography']
		),
		preview: {
			url: '/projects/muskitnas/index.html',
			video: muskitnas.video,
			poster: muskitnas.poster
		},
		blocks: [
			{
				kind: 'text',
				id: 'overview',
				title: 'Overview',
				body: [
					'“Pendar Cahaya” takes a physical museum exhibition online. Visitors enter through an atmospheric splash, then move through exhibition chapters, documentary films and the stories of seven STOVIA alumni who shaped mental-health care in Indonesia.',
					'A recreation room turns learning into play, and a digital bibliography points to the sources behind the exhibition.'
				]
			},
			{
				kind: 'text',
				id: 'purpose',
				title: 'Why it matters',
				body: [
					'Mental health is still stigmatised, and its history in Indonesia is little known. An online exhibition reaches students and the public far beyond the museum’s walls, and interactive pieces keep younger audiences engaged long enough for the story to land.'
				]
			},
			{
				kind: 'features',
				id: 'features',
				title: 'Key features',
				items: [
					{
						title: 'Story-led exhibition',
						body: 'Chapters on psychiatry in the Indies, mental-health services and the doctors behind them.'
					},
					{
						title: 'Documentary films',
						body: 'Five films and a Social Connect series, embedded in the narrative.'
					},
					{
						title: 'Pop quiz & puzzle',
						body: 'Short games that test and reinforce what visitors just learned.'
					},
					{
						title: 'Selfie corner',
						body: 'Uses the webcam to take a photo, frames it in an exhibition twibbon and lets visitors download it.'
					},
					{
						title: 'Feedback channel',
						body: 'Visitors can send suggestions straight to the museum.'
					},
					{
						title: 'Ambient experience',
						body: 'Background soundtrack and scroll-triggered animation set the mood.'
					}
				]
			},
			{
				kind: 'stats',
				id: 'numbers',
				title: 'By the numbers',
				items: [
					{ value: '7', label: 'STOVIA alumni profiled' },
					{ value: '5', label: 'Documentary films' },
					{ value: '4', label: 'Interactive activities' },
					{ value: '−90%', label: 'Asset weight after optimising for web' }
				]
			},
			{
				kind: 'impact',
				id: 'impact',
				title: 'Impact & value',
				items: [
					'The exhibition is open to anyone, anywhere, not only museum visitors',
					'Interactive learning instead of passive reading',
					'Shareable selfies spread the exhibition on social media',
					'A lasting digital archive with sources for further study'
				]
			},
			{
				kind: 'stack',
				id: 'stack',
				title: 'Tech stack',
				groups: [
					{
						label: 'Backend',
						items: [{ name: 'Laravel', why: 'Pages, feedback and content' }]
					},
					{
						label: 'Front-end',
						items: [
							{ name: 'Bootstrap', why: 'Responsive layout' },
							{ name: 'jQuery', why: 'Quiz, puzzle and media logic' },
							{ name: 'Owl Carousel', why: 'Profile and photo galleries' }
						]
					},
					{
						label: 'Interaction',
						items: [
							{ name: 'AOS', why: 'Scroll-triggered animation' },
							{ name: 'getUserMedia + html2canvas', why: 'Webcam twibbon capture' }
						]
					}
				]
			}
		],
		seed: noFeedback
	},

	// ───────────────────────────────────────────── Jardin Timesheet
	{
		slug: 'jardin-timesheet',
		type: 'code',
		title: 'Jardin Timesheet',
		tagline: 'Billable hours, matters and invoices for a law firm.',
		summary:
			'The internal operating system of Jardin Legal: lawyers log activities against client matters, partners manage access by role, and finance turns recorded time into invoices, tax invoices and official receipts.',
		client: c.jardin,
		role: 'Front-end development',
		year: 2025,
		facts: [
			{ label: 'Industry', value: 'Legal' },
			{ label: 'Platform', value: 'Web app (internal)' }
		],
		tools: ['React', 'Vite', 'Tailwind CSS', 'Redux', 'SheetJS'],
		cover: jardin.poster,
		gallery: jardin.shots(
			[1, 'Sign-in'],
			[3, 'Professional Service: Activities'],
			[4, 'Matters'],
			[5, 'Finance: Billing']
		),
		preview: {
			url: '/projects/jardin-timesheet/index.html',
			video: jardin.video,
			poster: jardin.poster,
			note: 'Demo credentials are prefilled. Press Sign In.'
		},
		blocks: [
			{
				kind: 'text',
				id: 'overview',
				title: 'Overview',
				body: [
					'Billable time is a law firm’s product. Jardin Timesheet gives lawyers one place to record what they did, for which client and matter, and gives partners and finance the views they need to bill accurately.',
					'It covers the whole firm in five modules (Global Administration, Professional Services, Business Development, Finance and Human Resources) behind role-based access.'
				]
			},
			{
				kind: 'text',
				id: 'purpose',
				title: 'Why it matters',
				body: [
					'When hours live in spreadsheets and chat, they get lost, and lost hours are lost revenue. A single, structured record of activities per matter makes billing traceable, approvals auditable and month-end far less painful.'
				]
			},
			{
				kind: 'features',
				id: 'features',
				title: 'Key features',
				items: [
					{
						title: 'Activity logging',
						body: 'Time entries per matter, personnel, date and description, with approval status.'
					},
					{
						title: 'Clients, matters & sub-matters',
						body: 'Work organised the way the firm bills it.'
					},
					{
						title: 'Billing suite',
						body: 'Invoice dashboard and register, tax invoices, official receipts, collection and payors.'
					},
					{
						title: 'Role-based access',
						body: 'Access lists per role decide who can see and change what.'
					},
					{
						title: 'Data tables that fit',
						body: 'Column settings, filters, search and pagination on every list; Excel export.'
					},
					{
						title: 'Documents from data',
						body: 'Printable invoices, receipts and bilingual CVs generated from records.'
					}
				]
			},
			{
				kind: 'stats',
				id: 'numbers',
				title: 'By the numbers',
				items: [
					{ value: '5', label: 'Firm modules' },
					{ value: '12', label: 'Workspaces in the sidebar' },
					{ value: '6', label: 'Billing views' },
					{ value: '1', label: 'Source of truth for billable time' }
				]
			},
			{
				kind: 'impact',
				id: 'impact',
				title: 'Impact & value',
				items: [
					'Every billable hour is recorded against a client and matter',
					'Invoices are built from approved time, not re-typed',
					'Clear approval trail for partners and finance',
					'One tool for legal, finance and HR instead of scattered sheets'
				]
			},
			{
				kind: 'stack',
				id: 'stack',
				title: 'Tech stack',
				groups: [
					{
						label: 'App',
						items: [
							{ name: 'React', why: 'Component-based screens' },
							{ name: 'Redux', why: 'Shared state across modules' },
							{ name: 'Vite', why: 'Fast builds and dev server' }
						]
					},
					{
						label: 'UI',
						items: [
							{ name: 'Tailwind CSS', why: 'Consistent, dense data UI' },
							{ name: 'Lottie & Framer Motion', why: 'Small moments of feedback' }
						]
					},
					{
						label: 'Data',
						items: [
							{ name: 'Axios', why: 'API layer' },
							{ name: 'SheetJS', why: 'Excel import and export' }
						]
					}
				]
			}
		],
		seed: noFeedback
	},

	// ───────────────────────────────────────────── Derkei Security
	{
		slug: 'derkei',
		type: 'code',
		title: 'Derkei Security',
		tagline: 'A security company’s public face and its back office, in one build.',
		summary:
			'A company website for PT. Wajracyena Derkei Sekuriti, a licensed security-services provider, joined to its internal management system for employees, accounting, company-profile content and users.',
		client: c.derkei,
		role: 'Design & development',
		year: 2021,
		facts: [
			{ label: 'Industry', value: 'Security services' },
			{ label: 'Platform', value: 'Website + web app' }
		],
		tools: ['Laravel', 'Bootstrap', 'JavaScript'],
		cover: derkei.poster,
		gallery: derkei.shots(
			[1, 'Hero: Kami Hadir Memberi Rasa Aman'],
			[2, 'Vision & mission'],
			[3, 'Services'],
			[4, 'Management system home']
		),
		preview: {
			url: '/projects/derkei/management-derkei.html',
			video: derkei.video,
			poster: derkei.poster,
			note: 'Click “Masuk Sistem”, then log in with admin / admin123.'
		},
		blocks: [
			{
				kind: 'text',
				id: 'overview',
				title: 'Overview',
				body: [
					'“Kami Hadir Memberi Rasa Aman”: the public site presents Derkei’s services, credentials, gallery and offices to prospective clients.',
					'Behind “Masuk Sistem” sits the company’s own back office: employee data by division, position and posting; accounting with income, expenses and giro records; a manager for the company-profile content; user management and an activity log.'
				]
			},
			{
				kind: 'text',
				id: 'purpose',
				title: 'Why it matters',
				body: [
					'Security companies sell trust. A professional public presence wins contracts, while a central back office replaces paper and spreadsheets for guards posted across many client sites, and both are maintained in one place.'
				]
			},
			{
				kind: 'features',
				id: 'features',
				title: 'Key features',
				items: [
					{
						title: 'Service catalogue',
						body: 'Certified guarding, bodyguards, security training, K9 units and escort.'
					},
					{
						title: 'Company story',
						body: 'About, vision & mission, why choose us, gallery and introduction video.'
					},
					{
						title: 'Offices & contact',
						body: 'Head and branch offices with maps, plus an enquiry form.'
					},
					{
						title: 'HR records',
						body: 'Employees by division, position, posting location and status.'
					},
					{ title: 'Accounting', body: 'Income and expense reports and giro ledgers, exportable.' },
					{
						title: 'Audit & guidance',
						body: 'Activity log of every change and an in-app usage guide.'
					}
				]
			},
			{
				kind: 'stats',
				id: 'numbers',
				title: 'By the numbers',
				items: [
					{ value: '5', label: 'Security services presented' },
					{ value: '4', label: 'Internal app modules' },
					{ value: '2', label: 'Offices on the map' },
					{ value: '−83%', label: 'Asset weight after optimising for web' }
				]
			},
			{
				kind: 'impact',
				id: 'impact',
				title: 'Impact & value',
				items: [
					'A credible public profile for winning security contracts',
					'One back office for staff, finance and website content',
					'Every change is logged, useful for audits',
					'Website content updated from the admin, without a developer'
				]
			},
			{
				kind: 'stack',
				id: 'stack',
				title: 'Tech stack',
				groups: [
					{ label: 'Backend', items: [{ name: 'Laravel', why: 'Auth, modules and content' }] },
					{
						label: 'Front-end',
						items: [
							{ name: 'Bootstrap', why: 'Responsive layout' },
							{ name: 'JavaScript', why: 'Tables, charts and app shell' }
						]
					},
					{ label: 'Services', items: [{ name: 'Google Maps', why: 'Office locations' }] }
				]
			}
		],
		seed: noFeedback
	},

	// ───────────────────────────────────────────── SparQ
	{
		slug: 'sparq',
		type: 'code',
		title: 'SparQ',
		tagline: 'One workspace for catalogs, workflows, notebooks and ML.',
		summary:
			'A clickable product prototype of a data platform (catalog, SQL and notebooks, workflow orchestration, dashboards, connectors, and ML experiments with a model registry) in one workspace that runs entirely in the browser.',
		client: c.sparq,
		role: 'Product design & prototype',
		year: 2025,
		facts: [
			{ label: 'Industry', value: 'Data & AI' },
			{ label: 'Platform', value: 'Web app prototype' }
		],
		tools: ['Vite', 'JavaScript', 'SVG'],
		cover: sparq.poster,
		gallery: sparq.shots(
			[1, 'Sign in to SparQ'],
			[2, 'Workspace'],
			[3, 'Workflow list'],
			[4, 'ML experiments']
		),
		preview: {
			url: '/projects/sparq/index.html',
			video: sparq.video,
			poster: sparq.poster,
			note: 'Demo account is prefilled. Press Sign In.'
		},
		blocks: [
			{
				kind: 'text',
				id: 'overview',
				title: 'Overview',
				body: [
					'“Turn your data into your next big idea.” SparQ brings the tools of a modern data team into one workspace, from browsing tables to shipping a model.',
					'It’s a high-fidelity prototype: realistic demo data and working flows (create a workflow, set task dependencies, inspect a failed run, compare experiments) with no backend required.'
				]
			},
			{
				kind: 'text',
				id: 'purpose',
				title: 'Why it matters',
				body: [
					'Data teams usually juggle separate tools for each step. A unified workspace cuts the context switching, and a prototype this complete lets stakeholders test the product idea before any platform is built.'
				]
			},
			{
				kind: 'features',
				id: 'features',
				title: 'Key features',
				items: [
					{
						title: 'Catalog explorer',
						body: 'Browse schemas and tables with recents and favourites.'
					},
					{
						title: 'Workflows',
						body: 'Scheduled jobs with run states, history, durations and a task graph.'
					},
					{ title: 'Notebooks & SQL', body: 'Workspace files, notebook tasks and query editor.' },
					{ title: 'Dashboards', body: 'Build charts like revenue by region from catalog data.' },
					{
						title: 'ML lifecycle',
						body: 'Experiments, parameters, accuracy curves and a model registry.'
					},
					{
						title: 'Compute & connectors',
						body: 'Clusters, libraries and running connectors in one place.'
					}
				]
			},
			{
				kind: 'stats',
				id: 'numbers',
				title: 'By the numbers',
				items: [
					{ value: '13', label: 'Product areas prototyped' },
					{ value: '0', label: 'Servers needed to demo' },
					{ value: '1', label: 'Workspace for the whole data lifecycle' },
					{ value: '368 KB', label: 'Entire prototype size' }
				]
			},
			{
				kind: 'impact',
				id: 'impact',
				title: 'Impact & value',
				items: [
					'Stakeholders can click through real flows, not static mockups',
					'Product ideas are validated before engineering starts',
					'One mental model for data, workflows and ML',
					'Runs anywhere, shareable as a single file'
				]
			},
			{
				kind: 'stack',
				id: 'stack',
				title: 'Tech stack',
				groups: [
					{ label: 'Build', items: [{ name: 'Vite', why: 'Bundled into a single file' }] },
					{
						label: 'App',
						items: [
							{ name: 'JavaScript', why: 'State-driven pages and flows' },
							{ name: 'Local demo data', why: 'Works offline, no backend' }
						]
					},
					{ label: 'Visuals', items: [{ name: 'SVG', why: 'Charts, graphs and icons' }] }
				]
			}
		],
		seed: noFeedback
	},

	// ───────────────────────────────────────────── Blast Hub
	{
		slug: 'blast-hub',
		type: 'code',
		title: 'Blast Hub',
		tagline: 'Bulk SMS campaigns, balances and delivery reports.',
		summary:
			'An admin panel for SMS campaigns: send manually or from Excel across Indonesia’s four major operators, reconcile operator result files, follow delivery per recipient, and manage client balances and users.',
		client: c.blastHub,
		role: 'Front-end development',
		year: 2023,
		facts: [
			{ label: 'Industry', value: 'Messaging · CRM' },
			{ label: 'Platform', value: 'Web admin' }
		],
		tools: ['Laravel', 'AdminLTE', 'Bootstrap 3', 'jQuery'],
		cover: blast.poster,
		gallery: blast.shots(
			[2, 'Campaign dashboard'],
			[3, 'Status data per recipient'],
			[4, 'SMS delivery report']
		),
		preview: {
			url: '/projects/blast-hub/index.html',
			video: blast.video,
			poster: blast.poster,
			note: 'Credentials are prefilled. Press Sign In.'
		},
		blocks: [
			{
				kind: 'text',
				id: 'overview',
				title: 'Overview',
				body: [
					'Blast Hub runs SMS campaigns end to end: compose a message with sender masking and a schedule, target recipients by hand or from an Excel file, then upload operator result files to reconcile what was actually delivered.',
					'Finance handles balance requests and top-ups per client; admins manage users and SMS preferences.'
				]
			},
			{
				kind: 'text',
				id: 'purpose',
				title: 'Why it matters',
				body: [
					'SMS is still the most reliable channel to reach customers in Indonesia, but delivery differs by operator. Seeing sent, delivered and failed per campaign (and what it cost) is what lets a business trust the channel and budget for it.'
				]
			},
			{
				kind: 'features',
				id: 'features',
				title: 'Key features',
				items: [
					{
						title: 'Campaign dashboard',
						body: 'Contacts, delivered, pending and spend, with a delivery trend.'
					},
					{
						title: 'Manual or Excel send',
						body: 'Single messages or bulk upload with a sample template.'
					},
					{
						title: 'Operator results',
						body: 'Upload result files from Telkomsel, Indosat, XL and Smartfren.'
					},
					{ title: 'Delivery reports', body: 'Per campaign and per recipient, exportable to CSV.' },
					{ title: 'Balance management', body: 'Top-up requests, approvals and client balances.' },
					{ title: 'Users & preferences', body: 'Role management and default SMS settings.' }
				]
			},
			{
				kind: 'stats',
				id: 'numbers',
				title: 'By the numbers',
				items: [
					{ value: '4', label: 'Mobile operators supported' },
					{ value: '9', label: 'Admin sections' },
					{ value: '2', label: 'Ways to send: manual or Excel' },
					{ value: '1', label: 'Place for campaigns, billing and users' }
				]
			},
			{
				kind: 'impact',
				id: 'impact',
				title: 'Impact & value',
				items: [
					'Clear view of what was delivered, per operator',
					'Bulk campaigns from a spreadsheet in minutes',
					'Prepaid balances keep spend under control',
					'Reports ready to export for clients'
				]
			},
			{
				kind: 'stack',
				id: 'stack',
				title: 'Tech stack',
				groups: [
					{ label: 'Backend', items: [{ name: 'Laravel', why: 'Campaigns, uploads, users' }] },
					{
						label: 'Admin UI',
						items: [
							{ name: 'AdminLTE', why: 'Dashboard shell and widgets' },
							{ name: 'Bootstrap 3', why: 'Layout and forms' }
						]
					},
					{
						label: 'Interaction',
						items: [
							{ name: 'jQuery', why: 'Forms, modals, tables' },
							{ name: 'DataTables', why: 'Sortable report tables' }
						]
					}
				]
			}
		],
		seed: noFeedback
	},

	// ───────────────────────────────────────────── ICON+ Analytics
	{
		slug: 'iconplus',
		type: 'code',
		title: 'ICON+ Analytics',
		tagline: 'Plan network growth from one map: POP sites, coverage, churn.',
		summary:
			'A location-intelligence workspace for ICON+, the telecom arm of PLN: plan new Points of Presence on a map, size fixed-wireless coverage, and track subscribers, revenue, availability and churn by region, with the stories and datasets behind every number.',
		client: c.iconplus,
		role: 'Front-end development',
		year: 2018,
		facts: [
			{ label: 'Industry', value: 'Telecom · Network planning' },
			{ label: 'Platform', value: 'Web app (internal)' }
		],
		tools: ['Laravel', 'Bootstrap', 'jQuery', 'Mapbox GL'],
		cover: iconplus.poster,
		gallery: iconplus.shots(
			[2, 'Dashboard: network KPIs by region'],
			[3, 'POP Planner: site scoring on the map'],
			[4, 'Customer Insight: churn and ARPU'],
			[5, 'Stories: published analyses']
		),
		preview: {
			url: '/projects/iconplus/index.html',
			video: iconplus.video,
			poster: iconplus.poster,
			note: 'The demo account is filled in. Press Sign in. Runs on sample data.'
		},
		blocks: [
			{
				kind: 'text',
				id: 'overview',
				title: 'Overview',
				body: [
					'Where should the next fiber Point of Presence go, and where is fixed wireless the faster answer? ICON+ Analytics puts the inputs for that decision on one map (building density, points of interest, competitor footprint and ICON+ pole availability) next to the business numbers that justify it.',
					'Around the planners sit a KPI dashboard, a customer-insight app for churn and ARPU, a layer catalog for every geospatial source, and a knowledge repository of the datasets, notebooks and queries behind each figure.'
				]
			},
			{
				kind: 'text',
				id: 'purpose',
				title: 'Why it matters',
				body: [
					'Network expansion is capital-heavy: a POP in the wrong place sits underused for years. Bringing location data, network health and customer behaviour into one workspace lets planning, sales and data teams argue from the same facts, and turns a site decision from a hunch into a ranked, explainable shortlist.'
				]
			},
			{
				kind: 'features',
				id: 'features',
				title: 'Key features',
				items: [
					{
						title: 'Network dashboard',
						body: 'Active subscribers, recurring revenue, POP health and availability, filterable by region and period.'
					},
					{
						title: 'POP Planner',
						body: 'Ranks candidate sites from buildings, POIs, competitor footprint and pole inventory, with radius analysis and site scoring.'
					},
					{
						title: 'Airnet Planner',
						body: 'Plans fixed-wireless towers, coverage radius and backhaul capacity where fiber can’t reach yet.'
					},
					{
						title: 'Customer Insight',
						body: 'Churn risk, ARPU and NPS by segment; at-risk accounts become retention tasks.'
					},
					{
						title: 'Layer Catalog',
						body: 'Every geospatial layer with its source, geometry and refresh schedule.'
					},
					{
						title: 'Stories & knowledge repos',
						body: 'Analyses published as stories, linked to the datasets, notebooks and queries behind them.'
					}
				]
			},
			{
				kind: 'stats',
				id: 'numbers',
				title: 'By the numbers',
				items: [
					{ value: '4', label: 'Planning & insight apps' },
					{ value: '6', label: 'Service regions to filter by' },
					{ value: '10', label: 'Knowledge-repo entries in the demo' },
					{ value: '1,146', label: 'POP sites in the demo dataset' }
				]
			},
			{
				kind: 'impact',
				id: 'impact',
				title: 'Impact & value',
				items: [
					'Site decisions backed by ranked, explainable location data',
					'Fiber and fixed-wireless planned side by side',
					'At-risk customers turned into concrete retention tasks',
					'Every published number traceable to its dataset or query'
				]
			},
			{
				kind: 'stack',
				id: 'stack',
				title: 'Tech stack',
				groups: [
					{ label: 'Backend', items: [{ name: 'Laravel', why: 'Auth, apps and data APIs' }] },
					{
						label: 'Front-end',
						items: [
							{ name: 'Bootstrap', why: 'Dashboard layout and components' },
							{ name: 'jQuery', why: 'Views, filters and tables' }
						]
					},
					{
						label: 'Maps',
						items: [{ name: 'Mapbox GL', why: 'Vector maps, markers and radius analysis' }]
					}
				]
			}
		],
		seed: noFeedback
	},

	// ───────────────────────────────────────────── Devfartha IELTS
	{
		slug: 'ielts-course',
		type: 'code',
		title: 'Devfartha IELTS',
		tagline: 'Real Cambridge IELTS practice with instant band estimates.',
		summary:
			'An IELTS preparation platform for Devfartha: learners sit full Cambridge-style tests with official timing, get instant Listening and Reading bands, study examiner guides and track their band toward a target, while admins manage tests, questions and learners.',
		client: c.devfartha,
		role: 'Design & development',
		year: 2019,
		facts: [
			{ label: 'Industry', value: 'Education · Test prep' },
			{ label: 'Platform', value: 'Web app, learner + admin' }
		],
		tools: ['Laravel', 'Bootstrap', 'jQuery', 'Chart.js'],
		cover: ielts.poster,
		gallery: ielts.shots(
			[2, 'Learner dashboard: band estimate'],
			[3, 'Test catalogue'],
			[4, 'Exam mode: Reading'],
			[5, 'Band history']
		),
		preview: {
			url: '/projects/ielts-course/index.html',
			video: ielts.video,
			poster: ielts.poster,
			note: 'A learner demo account is filled in. Press Sign in. Switch to Admin on the login screen.'
		},
		blocks: [
			{
				kind: 'text',
				id: 'overview',
				title: 'Overview',
				body: [
					'Devfartha has spent almost ten years teaching and researching in higher education. This platform takes its IELTS coaching online: real Cambridge-style tests across all four skills, short strategy guides written by examiners, and a dashboard that tells each learner where their band stands and what to practise next.',
					'Behind it, an admin side manages tests, sections, questions and answer keys, learners and their results.'
				]
			},
			{
				kind: 'text',
				id: 'purpose',
				title: 'Why it matters',
				body: [
					'For many Indonesian learners the IELTS gates a scholarship or a study visa, and a test is expensive to retake. Practising under real timing, seeing an honest band estimate and knowing the single skill that will lift the overall score turns anxious, unfocused study into a plan, with a countdown to exam day.'
				]
			},
			{
				kind: 'features',
				id: 'features',
				title: 'Key features',
				items: [
					{
						title: 'Full test simulations',
						body: 'Listening, Reading, Writing and Speaking with official timing and a question navigator.'
					},
					{
						title: 'Instant band estimates',
						body: 'Listening and Reading marked on submit; Writing and Speaking reviewed by examiners.'
					},
					{
						title: 'Progress dashboard',
						body: 'Overall band, skill breakdown, accuracy trend and exam countdown toward a target.'
					},
					{
						title: 'Study guides',
						body: 'Short strategy guides per question type, each ending in a practice link.'
					},
					{
						title: 'Test catalogue',
						body: 'Simulation, practice and scholarship tests, free and premium.'
					},
					{
						title: 'Admin console',
						body: 'Tests, questions, answer keys, learners and results in one place.'
					}
				]
			},
			{
				kind: 'stats',
				id: 'numbers',
				title: 'By the numbers',
				items: [
					{ value: '4', label: 'Skills in every test' },
					{ value: '6', label: 'Complete tests in the catalogue' },
					{ value: '8', label: 'Examiner study guides' },
					{ value: '2', label: 'Roles: learner and admin' }
				]
			},
			{
				kind: 'impact',
				id: 'impact',
				title: 'Impact & value',
				items: [
					'Learners rehearse under real exam conditions before paying for the test',
					'A clear next step: the skill that raises the overall band most',
					'Coaching reaches learners anywhere, not only in class',
					'Admins publish new tests without a developer'
				]
			},
			{
				kind: 'stack',
				id: 'stack',
				title: 'Tech stack',
				groups: [
					{
						label: 'Backend',
						items: [{ name: 'Laravel', why: 'Accounts, tests, scoring and results' }]
					},
					{
						label: 'Front-end',
						items: [
							{ name: 'Bootstrap', why: 'Learner and admin layouts' },
							{ name: 'jQuery', why: 'Exam timer, navigator and forms' }
						]
					},
					{
						label: 'Data viz',
						items: [
							{ name: 'Chart.js', why: 'Band history and skill charts' },
							{ name: 'ProgressBar.js', why: 'Progress toward the target band' }
						]
					}
				]
			}
		],
		seed: noFeedback
	},

	// ───────────────────────────────────────────── Pertamina PIMS
	{
		slug: 'pims-pertamina',
		type: 'code',
		title: 'Pertamina PIMS',
		tagline: 'Pipeline integrity across East Kalimantan, on one map.',
		summary:
			'The Pipeline Information Monitoring System for Pertamina Hulu Kalimantan Timur: platforms and pipelines on a satellite map, integrity metrics (ILI results, corrosion rate, pigging), leak incidents and repairs, and role-based access for every module.',
		client: c.pertamina,
		role: 'Front-end development',
		year: 2018,
		facts: [
			{ label: 'Industry', value: 'Oil & gas · Asset integrity' },
			{ label: 'Platform', value: 'Web app (internal)' }
		],
		tools: ['Laravel', 'Bootstrap', 'Leaflet', 'Turf.js'],
		cover: pims.poster,
		gallery: pims.shots(
			[2, 'Operations dashboard with asset map'],
			[3, 'Pipeline detail: integrity and route'],
			[4, 'Pipeline metric report'],
			[5, 'User privileges']
		),
		preview: {
			url: '/projects/pims-pertamina/index.html',
			video: pims.video,
			poster: pims.poster,
			note: 'Credentials are prefilled (admin / admin123). Press Login. Runs on sample data.'
		},
		blocks: [
			{
				kind: 'text',
				id: 'overview',
				title: 'Overview',
				body: [
					'PIMS gives Pertamina Hulu Kalimantan Timur one view of its offshore assets: every platform and the pipelines between them, drawn on a satellite map and coloured by health (healthy, warning or critical).',
					'Each pipeline opens to its specification, route and integrity history (in-line inspection results, corrosion rate and routine pigging) while incidents, repairs and highlight tasks keep operations and integrity teams working from the same record.'
				]
			},
			{
				kind: 'text',
				id: 'purpose',
				title: 'Why it matters',
				body: [
					'A leaking subsea pipeline is a safety, environmental and production risk at once. When inspection results live in reports and spreadsheets, a worsening trend is easy to miss. Putting integrity metrics on the map, with a watch list of what needs action, lets engineers act before a defect becomes an incident.'
				]
			},
			{
				kind: 'features',
				id: 'features',
				title: 'Key features',
				items: [
					{
						title: 'Asset map',
						body: 'Platforms, pipelines, leak incidents and repairs on a satellite map, coloured by health.'
					},
					{
						title: 'Operations dashboard',
						body: 'Platform and pipeline counts, health split, open incidents and a watch list.'
					},
					{
						title: 'Integrity metrics',
						body: 'ILI wall-loss results, corrosion rate and routine pigging per pipeline, with reports.'
					},
					{
						title: 'Incidents & repairs',
						body: 'Report a leak, track its repair and attach inspection documents.'
					},
					{
						title: 'Highlight tasks',
						body: 'Assign and follow up actions on the pipelines that need them.'
					},
					{
						title: 'User privileges',
						body: 'Role-based access matrix for every module, plus KML route import.'
					}
				]
			},
			{
				kind: 'stats',
				id: 'numbers',
				title: 'By the numbers',
				items: [
					{ value: '13', label: 'Platforms in the demo dataset' },
					{ value: '15', label: 'Pipelines mapped' },
					{ value: '445 km', label: 'Total pipeline length' },
					{ value: '3', label: 'Health levels on every asset' }
				]
			},
			{
				kind: 'impact',
				id: 'impact',
				title: 'Impact & value',
				items: [
					'Worsening pipelines surface on a watch list before they fail',
					'Inspection history in one place instead of scattered reports',
					'Every leak tracked from incident to completed repair',
					'Access controlled per role across operations and integrity teams'
				]
			},
			{
				kind: 'stack',
				id: 'stack',
				title: 'Tech stack',
				groups: [
					{
						label: 'Backend',
						items: [{ name: 'Laravel', why: 'Assets, metrics, incidents and users' }]
					},
					{
						label: 'Front-end',
						items: [
							{ name: 'Bootstrap', why: 'Dashboard layout and forms' },
							{ name: 'DataTables', why: 'Searchable metric tables' }
						]
					},
					{
						label: 'GIS',
						items: [
							{ name: 'Leaflet + Esri imagery', why: 'Satellite asset map' },
							{ name: 'Turf.js', why: 'Route lengths and geometry' }
						]
					}
				]
			}
		],
		seed: noFeedback
	},

	// ───────────────────────────────────────────── Data Room
	{
		slug: 'dataroom',
		type: 'code',
		title: 'Data Room',
		tagline: 'One secure home for every project document of Ibu Kota Nusantara.',
		summary:
			'A virtual data room for monitoring the development of Indonesia’s new capital, IKN Nusantara: documents organised into thematic rooms, previewed right in the browser, shared by role and traced in a full activity log.',
		client: c.dataroom,
		role: 'Front-end development',
		year: 2023,
		facts: [
			{ label: 'Industry', value: 'Government · Infrastructure' },
			{ label: 'Platform', value: 'Web app (internal)' }
		],
		tools: ['React', 'Vite', 'Tailwind CSS', 'Zustand'],
		cover: dataroom.poster,
		gallery: dataroom.shots(
			[2, 'All data rooms: recent and favourites'],
			[3, 'Room: folders and files'],
			[4, 'Document preview in the browser'],
			[6, 'Activity log']
		),
		preview: {
			url: '/projects/dataroom/index.html',
			video: dataroom.video,
			poster: dataroom.poster,
			note: 'The admin account is filled in. Press Login. Runs on sample data.'
		},
		blocks: [
			{
				kind: 'text',
				id: 'overview',
				title: 'Overview',
				body: [
					'Building a capital city produces an enormous paper trail: masterplans, land parcel data, detailed engineering designs, progress photos, studies, contracts and regulations. Data Room gives that material one structured, access-controlled home.',
					'Documents live in eight thematic rooms (planning, land, infrastructure, investment, environment, finance, legal and general documents) with folders, favourites and recent files. PDFs, Word files, spreadsheets and slide decks open in an in-app viewer, so nobody has to download a file just to read it.'
				]
			},
			{
				kind: 'text',
				id: 'purpose',
				title: 'Why it matters',
				body: [
					'Megaprojects involve many agencies, contractors and investors, and the cost of a wrong or leaked document is high. A single data room with clear permissions and a complete audit trail means everyone works from the latest version, and every upload, move or download can be accounted for.'
				]
			},
			{
				kind: 'features',
				id: 'features',
				title: 'Key features',
				items: [
					{
						title: 'Thematic rooms',
						body: 'Eight rooms from planning to legal, each with its own folders and access.'
					},
					{
						title: 'Recent & favourites',
						body: 'The files you used last and the ones you starred, on the home screen.'
					},
					{
						title: 'In-browser preview',
						body: 'PDF, Word, Excel and PowerPoint open in a viewer with page navigation and zoom.'
					},
					{
						title: 'Upload & organise',
						body: 'Create rooms and folders, upload, rename, move and search across the data room.'
					},
					{
						title: 'Users & roles',
						body: 'Admin, Editor and View Only roles, with room-level access and online status.'
					},
					{
						title: 'Activity log',
						body: 'A dated trail of logins, uploads, new folders and room changes, per user.'
					}
				]
			},
			{
				kind: 'stats',
				id: 'numbers',
				title: 'By the numbers',
				items: [
					{ value: '8', label: 'Thematic data rooms' },
					{ value: '3', label: 'Access roles' },
					{ value: '4', label: 'Office formats previewed in-app' },
					{ value: '−92%', label: 'Login artwork weight after optimising' }
				]
			},
			{
				kind: 'impact',
				id: 'impact',
				title: 'Impact & value',
				items: [
					'One source of truth for every IKN project document',
					'Read documents instantly, without downloading copies',
					'Access granted per role and per room',
					'A complete audit trail for accountability'
				]
			},
			{
				kind: 'stack',
				id: 'stack',
				title: 'Tech stack',
				groups: [
					{
						label: 'App',
						items: [
							{ name: 'React', why: 'Component-based screens' },
							{ name: 'Zustand', why: 'Lightweight app state' },
							{ name: 'Vite', why: 'Bundled single-page build' }
						]
					},
					{
						label: 'UI',
						items: [
							{ name: 'Tailwind CSS', why: 'Consistent, responsive layout' },
							{ name: 'GSAP', why: 'Interface motion' }
						]
					},
					{
						label: 'Documents',
						items: [
							{ name: 'PDF.js', why: 'In-browser PDF rendering' },
							{ name: 'SheetJS & docx preview', why: 'Spreadsheets and Word files' }
						]
					}
				]
			}
		],
		seed: noFeedback
	},

	// ───────────────────────────────────────────── SILMA
	{
		slug: 'silma',
		type: 'code',
		title: 'SILMA',
		tagline: 'State-asset services for the Directorate General of Culture.',
		summary:
			'Sistem Informasi dan Layanan Manajemen Aset, the asset-management system of the Secretariat of the Directorate General of Culture, Ministry of Education and Culture: procurement plans, procurement, borrowing and transfers of state property (BMN), each with its own approval workflow, handover documents and printable asset labels.',
		client: c.kemendikbud,
		role: 'Front-end development',
		year: 2023,
		facts: [
			{ label: 'Industry', value: 'Government · Asset management' },
			{ label: 'Platform', value: 'Web app (internal)' }
		],
		tools: ['Laravel', 'Bootstrap 4', 'jQuery', 'DataTables'],
		cover: silma.poster,
		gallery: silma.shots(
			[2, 'Dashboard: assets and requests'],
			[3, 'Procurement plans'],
			[4, 'Request detail with workflow steps'],
			[5, 'Asset register']
		),
		preview: {
			url: '/projects/silma/index.html',
			video: silma.video,
			poster: silma.poster,
			note: 'The Super Admin account is filled in. Press LOGIN. Every demo account uses the password “password”. Runs on sample data.'
		},
		blocks: [
			{
				kind: 'text',
				id: 'overview',
				title: 'Overview',
				body: [
					'Every chair, laptop and vehicle a ministry owns is state property (Barang Milik Negara) and must be planned, procured, recorded, lent, moved and eventually written off by the book. SILMA turns those paper-heavy procedures into services employees request online and administrators process step by step.',
					'A dashboard shows the value and condition of the asset base, open requests per service and a personal task queue; behind it sit the asset master data (KIB, PSP status, supervision or Wasdal, write-offs and stock-taking) and the documents each process requires.'
				]
			},
			{
				kind: 'text',
				id: 'purpose',
				title: 'Why it matters',
				body: [
					'Government asset records are audited, and a missing handover letter or an unlabelled item becomes a finding. When every request leaves a trail (who asked, who verified, which admin handled it and which BAST was signed) the directorate can show exactly where each asset is and how it got there.'
				]
			},
			{
				kind: 'features',
				id: 'features',
				title: 'Key features',
				items: [
					{
						title: 'Four request services',
						body: 'Procurement plans, procurement, borrowing and transfers: each with its own status flow.'
					},
					{
						title: 'Guided approval steps',
						body: 'Verify, assign an admin, analyse, accept or reject, with notes at every step.'
					},
					{
						title: 'Handover documents',
						body: 'BAST, room inventory lists (DBR) and identity cards (KIB) generated, printed or exported.'
					},
					{
						title: 'Asset labels',
						body: 'State-asset labels with barcodes and QR codes, ready to print.'
					},
					{
						title: 'Asset master data',
						body: 'Register, KIB, PSP, supervision, write-off and stock-taking in one place.'
					},
					{
						title: 'Dashboard & tasks',
						body: 'Asset value and condition, requests per service, and a queue of what needs you.'
					}
				]
			},
			{
				kind: 'stats',
				id: 'numbers',
				title: 'By the numbers',
				items: [
					{ value: '4', label: 'Request services' },
					{ value: '4', label: 'User roles, Super Admin to User' },
					{ value: '9', label: 'Asset-management modules' },
					{ value: '−62%', label: 'Build size after optimising for web' }
				]
			},
			{
				kind: 'impact',
				id: 'impact',
				title: 'Impact & value',
				items: [
					'Asset requests submitted and tracked online, not on paper',
					'Every approval step and handover document on record for audits',
					'Items labelled with barcodes and QR codes for fast stock-taking',
					'Administrators see exactly which requests are waiting on them'
				]
			},
			{
				kind: 'stack',
				id: 'stack',
				title: 'Tech stack',
				groups: [
					{
						label: 'Backend',
						items: [{ name: 'Laravel', why: 'Requests, workflows and documents' }]
					},
					{
						label: 'Front-end',
						items: [
							{ name: 'Bootstrap 4', why: 'Admin layout and forms' },
							{ name: 'jQuery & DataTables', why: 'Interactive lists and filters' },
							{ name: 'Select2 & Toastr', why: 'Pickers and notifications' }
						]
					},
					{
						label: 'Labels & documents',
						items: [
							{ name: 'JsBarcode', why: 'Barcodes on asset labels' },
							{ name: 'QRCode.js', why: 'QR codes for quick lookup' }
						]
					}
				]
			}
		],
		seed: noFeedback
	}
];
