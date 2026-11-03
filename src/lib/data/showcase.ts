// Real code projects. Each one ships a runnable build in static/projects/<slug>/
// (assets optimised for the web; untouched originals are kept in _originals/).
// Media lives in static/images/work/<slug>/: preview.mp4 + poster.webp (the
// designed motion piece) and shot-N.webp (screens).
//
// Facts come from the builds themselves — counts in "By the numbers" were
// counted from each build. Duration and team weren't stated anywhere in the
// files, so they're left out; add `duration` / `team` when you know them.
import type { ImageRef, Project } from '#lib/types/index.ts';
import { companies, showcaseClients as c } from './clients.ts';

const media = (slug: string) => ({
	video: `/images/work/${slug}/preview.mp4`,
	poster: `/images/work/${slug}/poster.webp`,
	/** Designed thumbnail, rendered by scripts/covers. */
	thumb: `/images/work/${slug}/thumb.webp`,
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
const gpp = media('gpp');
const ccm = media('ccm');
const repo = media('repo-muskitnas');
const rmp = media('royalmitrapersada');
const cy = media('cycoffee');
const art = media('artemis');
const navy = media('navy');
const pt = media('parsing-tools');
const rt = media('remote-task');
const ss = media('site-survey');
const sv = media('svreport');

const noFeedback = { likes: 0, dislikes: 0, comments: [] };

export const showcase: Project[] = [
	// ───────────────────────────────────────────── IPL Graha Pesona Pakansari
	{
		slug: 'gpp-ipl',
		type: 'code',
		title: 'IPL Kavling Tools',
		headline: 'A neighbourhood dues app, built entirely with AI',
		tagline:
			'No hand-written code, no hand-drawn screens: a real fix for how Graha Pesona Pakansari collects its monthly dues.',
		summary:
			'An exploration built entirely with AI tools to solve a real problem in my housing area: a mobile web app where the residents’ treasurer records monthly IPL dues for every kavling, tracks expenses and staff advances, keeps notes and the agenda, and shares a monthly cash report.',
		client: c.gpp,
		role: 'Concept & AI-assisted build',
		year: 2026,
		facts: [
			{ label: 'Industry', value: 'Community · Housing estate' },
			{ label: 'Platform', value: 'Mobile web app' }
		],
		tools: ['Bootstrap 5', 'JavaScript', 'SheetJS', 'Supabase'],
		cover: gpp.thumb,
		gallery: gpp.shots(
			[1, 'Home: cash balance, collection progress and the monthly report'],
			[2, 'Residents by kavling, and one household’s payment history'],
			[3, 'Recording a multi-month payment, and setting the fee components'],
			[4, 'Transactions, and logging a staff advance'],
			[5, 'Notes and the residents’ agenda']
		),
		preview: {
			url: '/projects/gpp/index.html',
			video: '/images/work/gpp/preview.webm',
			poster: gpp.poster,
			note: 'The admin login is prefilled: press Login, then Masuk to edit. Runs on sample data; changes reset when you reload.',
			device: 'mobile'
		},
		blocks: [
			{
				kind: 'text',
				id: 'overview',
				title: 'Overview',
				body: [
					'IPL (Iuran Pemeliharaan Lingkungan) is the monthly fee each household in a housing estate pays for security, rubbish collection and a shared cash fund. At Graha Pesona Pakansari it lived in chat messages and spreadsheets, so nobody could easily see who had paid, what the money was spent on, or how much was left.',
					'I set out to see how far AI tools could take a real problem without me writing code or drawing screens. I described the workflows, reviewed what came back and refined it by prompting. The result is a mobile web app the treasurer uses to run the estate’s books.'
				]
			},
			{
				kind: 'text',
				id: 'purpose',
				title: 'Why it matters',
				body: [
					'Dues only work when residents trust them. A shared view of who has paid, every expense with its date, and a monthly report anyone can open turns collecting from chasing people into showing them the numbers. Anyone can view the books without an account; only the treasurer can change them.'
				]
			},
			{
				kind: 'text',
				id: 'process',
				title: 'How it was built',
				body: [
					'Every screen and every line of code came from AI tools. My part was the product work: mapping how the treasurer actually collects and spends, writing the requirements as prompts, testing each version against real cases (part payments, months in arrears, advances to the security guard) and asking for fixes until it held up.'
				]
			},
			{
				kind: 'features',
				id: 'features',
				title: 'Key features',
				items: [
					{
						title: 'Home at a glance',
						body: 'Cash balance, the account to pay into, this month’s fee and due dates, and how many households have paid.'
					},
					{
						title: 'Dues per kavling',
						body: 'Each household shows paid or owed months; pay several months at once and arrears clear on their own.'
					},
					{
						title: 'Fee components by period',
						body: 'Security, rubbish and cash-fund amounts change from a chosen month, without rewriting past bills.'
					},
					{
						title: 'Transactions & advances',
						body: 'Expenses, extra income and staff advances (kasbon), tracked until they are repaid.'
					},
					{
						title: 'Notes & agenda',
						body: 'House rules, collection days and upcoming community events in one place.'
					},
					{
						title: 'Monthly report',
						body: 'Export the cash report as a PNG image or an Excel file, or share it to WhatsApp.'
					}
				]
			},
			{
				kind: 'stats',
				id: 'numbers',
				title: 'By the numbers',
				items: [
					{ value: '0', label: 'Lines of code written by hand' },
					{ value: '5', label: 'Sections: home, residents, transactions, notes, agenda' },
					{ value: '3', label: 'Fee components per period' },
					{ value: '2', label: 'Report formats: PNG and Excel' }
				]
			},
			{
				kind: 'impact',
				id: 'impact',
				title: 'Impact & value',
				items: [
					'Every household can check its own status without asking the treasurer',
					'Arrears are calculated, not remembered',
					'Each expense is dated and categorised, so the month adds up',
					'View-only by default; changing anything needs a login'
				]
			},
			{
				kind: 'stack',
				id: 'stack',
				title: 'Tech stack',
				groups: [
					{
						label: 'Front-end',
						items: [
							{ name: 'Bootstrap 5', why: 'Mobile layout, modals and forms' },
							{ name: 'JavaScript', why: 'Billing, arrears and report logic' },
							{ name: 'Font Awesome', why: 'Icons' }
						]
					},
					{
						label: 'Data',
						items: [
							{
								name: 'Supabase',
								why: 'Residents, payments and transactions in the live app; this demo runs on sample data'
							}
						]
					},
					{
						label: 'Reports',
						items: [
							{ name: 'SheetJS', why: 'Excel export' },
							{ name: 'Canvas', why: 'Report as a PNG image' }
						]
					},
					{
						label: 'Build',
						items: [
							{ name: 'AI tools', why: 'Generated and refined by prompting, no hand-written code' }
						]
					}
				]
			}
		],
		seed: noFeedback
	},
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
		cover: kee.thumb,
		special: true,
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
		cover: muskitnas.thumb,
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
		cover: jardin.thumb,
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
		cover: derkei.thumb,
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
		cover: sparq.thumb,
		special: true,
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
		cover: blast.thumb,
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
		cover: iconplus.thumb,
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
					'Where should the next fibre Point of Presence go, and where is fixed wireless the faster answer? ICON+ Analytics puts the inputs for that decision on one map (building density, points of interest, competitor footprint and ICON+ pole availability) next to the business numbers that justify it.',
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
						body: 'Plans fixed-wireless towers, coverage radius and backhaul capacity where fibre can’t reach yet.'
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
					'Fibre and fixed-wireless planned side by side',
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
		cover: ielts.thumb,
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
		cover: pims.thumb,
		special: true,
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
		cover: dataroom.thumb,
		special: true,
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
		cover: silma.thumb,
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
	},

	// ───────────────────────────────────────────── Telkomsel CCM
	{
		slug: 'ccm',
		type: 'code',
		title: 'Customer Complaint Management',
		tagline: 'Every complaint ticket in Indonesia, from nationwide down to the city.',
		summary:
			'A weekly command centre for Telkomsel’s customer complaints: remedy tickets, closed & resolved rates, SLA and the complaint index, drilled down from nationwide to region, department, sub-department and city, with twelve weeks of trends.',
		client: c.telkomsel,
		via: companies.immobi,
		role: 'Front-end development',
		year: 2018,
		facts: [
			{ label: 'Industry', value: 'Telecommunications · Customer care' },
			{ label: 'Platform', value: 'Web app (internal)' }
		],
		tools: ['Laravel', 'AngularJS', 'Bootstrap', 'Highcharts'],
		cover: ccm.thumb,
		special: true,
		gallery: ccm.shots(
			[1, 'Home: this week’s KPIs, closure gauge and regional summary'],
			[2, 'Nationwide summary by problem category'],
			[3, 'One region’s KPIs and problem types'],
			[4, 'City and regency view'],
			[5, 'Trends: volume, backlog and closed rate by region and week']
		),
		preview: {
			url: '/projects/ccm/index.html',
			video: '/images/work/ccm/preview.webm',
			poster: ccm.poster,
			note: 'Credentials are prefilled (admin@ccm.demo / password). Press Sign in. Runs on sample data.'
		},
		blocks: [
			{
				kind: 'text',
				id: 'overview',
				title: 'Overview',
				body: [
					'Customer Complaint Management (CCM) gives Telkomsel’s customer-care and network teams one weekly picture of complaints: how many remedy tickets were raised, how many were closed by the back-end support team (BES) or closed automatically, and how fast.',
					'The same set of KPIs runs through every level (nationwide, regional, department, sub-department and city), so a manager can start from the national gauge and drill down to the city where the SLA is slipping.'
				]
			},
			{
				kind: 'text',
				id: 'purpose',
				title: 'Why it matters',
				body: [
					'For a network that serves the whole country, complaints are an early warning: a rise in “network interrupt” tickets in one region usually means a problem on the ground. Putting closure rates, SLA and the complaint index per 10,000 customers side by side, week over week, shows where to send people before customers leave.'
				]
			},
			{
				kind: 'features',
				id: 'features',
				title: 'Key features',
				items: [
					{
						title: 'Weekly KPIs',
						body: 'Open ticket rate, remedy tickets, closed & resolved, auto-closed, closed by BES and SLA, each with its change from last week.'
					},
					{
						title: 'Closure gauge',
						body: 'The share of tickets closed and resolved, nationwide or for the selected area.'
					},
					{
						title: 'Five drill-down levels',
						body: 'Nationwide, regional, department, sub-department and city, all with the same KPIs.'
					},
					{
						title: 'Problem categories',
						body: 'Tier-2 causes (network, capacity, hardware, transmission) and voice vs. data problem types.'
					},
					{
						title: 'Trends',
						body: 'Twelve weeks of volume and backlog, closed rate, SLA and complaint index, plus a region × week heatmap.'
					},
					{
						title: 'Filters',
						body: 'Pick the week, region and area from one filter panel on every page.'
					}
				]
			},
			{
				kind: 'stats',
				id: 'numbers',
				title: 'By the numbers',
				items: [
					{ value: '11', label: 'Regions, Sumbagut to Puma' },
					{ value: '5', label: 'Drill-down levels' },
					{ value: '8', label: 'KPIs on the home screen' },
					{ value: '12', label: 'Weeks of trends' }
				]
			},
			{
				kind: 'impact',
				id: 'impact',
				title: 'Impact & value',
				items: [
					'One weekly view of complaints for the whole country',
					'Regions with slipping SLA or rising complaints stand out at once',
					'Causes are visible by category, so fixes go to the right team',
					'The same KPIs at every level, so national and city teams work from the same numbers'
				]
			},
			{
				kind: 'stack',
				id: 'stack',
				title: 'Tech stack',
				groups: [
					{
						label: 'Backend',
						items: [{ name: 'Laravel', why: 'Authentication and the KPI API' }]
					},
					{
						label: 'Front-end',
						items: [
							{ name: 'AngularJS', why: 'Single-page dashboard and routing' },
							{ name: 'Bootstrap', why: 'Grid, filters and forms' }
						]
					},
					{
						label: 'Charts',
						items: [{ name: 'Highcharts', why: 'Gauges, trend lines, drilldowns and the heatmap' }]
					}
				]
			}
		],
		seed: noFeedback
	},

	// ───────────────────────────────────────────── Repositori Arsip Digital
	{
		slug: 'repo-muskitnas',
		type: 'code',
		title: 'Repositori Arsip Digital',
		tagline: 'Museum Kebangkitan Nasional’s letters and archives, in one searchable place.',
		summary:
			'A digital repository for the letters and archives of Museum Kebangkitan Nasional: staff from 14 work units record administrative and technical archives with their letter number, date and file, then search, filter and download them, while administrators manage accounts and roles.',
		client: c.muskitnas,
		role: 'Design & development',
		year: 2020,
		facts: [
			{ label: 'Industry', value: 'Government · Museum archives' },
			{ label: 'Platform', value: 'Web app (internal)' }
		],
		tools: ['Laravel', 'Bootstrap', 'jQuery', 'MySQL'],
		cover: repo.thumb,
		gallery: repo.shots(
			[1, 'Login'],
			[2, 'Repository: search, date range and bulk download'],
			[3, 'Editing an archive record'],
			[4, 'Managing users and roles'],
			[5, 'About the museum and the app']
		),
		preview: {
			url: '/projects/repo-muskitnas/index.html',
			video: '/images/work/repo-muskitnas/preview.webm',
			poster: repo.poster,
			note: 'Credentials are prefilled. Press Login. Runs on sample data; changes stay in your browser.'
		},
		blocks: [
			{
				kind: 'text',
				id: 'overview',
				title: 'Overview',
				body: [
					'Museum Kebangkitan Nasional keeps decrees, minutes, reports, procurement documents and inventories from every part of the museum, from administration and finance to conservation and exhibitions. Most of it lived on paper or in personal folders.',
					'The repository gives each record a code, a letter number, a date, an author and its file, grouped as administrative (Tata Usaha) or technical archives. Staff find any document by title, code, letter number or author, narrow it by date, and download one or many at once.'
				]
			},
			{
				kind: 'text',
				id: 'purpose',
				title: 'Why it matters',
				body: [
					'Archives only help when people can find them. When a letter number is needed for a new decree, or an audit asks for last year’s procurement file, staff can look it up themselves instead of asking around. Roles keep it orderly: administrators manage accounts, staff look after their own unit’s records.'
				]
			},
			{
				kind: 'features',
				id: 'features',
				title: 'Key features',
				items: [
					{
						title: 'Archive repository',
						body: 'Every record with its code, title, category, date, letter number and author.'
					},
					{
						title: 'Search & date range',
						body: 'Find documents by title, code, letter number or author, between two dates.'
					},
					{
						title: 'Bulk download',
						body: 'Select several archives and download them in one go.'
					},
					{
						title: 'Archive form',
						body: 'Add or edit a record and upload its PDF, Word or Excel file.'
					},
					{
						title: 'Users & roles',
						body: 'Super admins add staff with their NIP and unit; staff manage their own archives.'
					},
					{
						title: 'About & guide',
						body: 'The museum’s story and how to use the app, inside the app.'
					}
				]
			},
			{
				kind: 'stats',
				id: 'numbers',
				title: 'By the numbers',
				items: [
					{ value: '14', label: 'Work units with their own archives' },
					{ value: '2', label: 'Archive groups: administrative and technical' },
					{ value: '2', label: 'Roles: super admin and user' },
					{ value: '5', label: 'File types accepted' }
				]
			},
			{
				kind: 'impact',
				id: 'impact',
				title: 'Impact & value',
				items: [
					'Letters and archives from every unit in one place',
					'Any record found in seconds by number, title or author',
					'Access controlled by role',
					'Less paper to store and search through'
				]
			},
			{
				kind: 'stack',
				id: 'stack',
				title: 'Tech stack',
				groups: [
					{
						label: 'Backend',
						items: [
							{ name: 'Laravel', why: 'Archives, uploads, users and roles' },
							{ name: 'MySQL', why: 'Archive records and accounts' }
						]
					},
					{
						label: 'Front-end',
						items: [
							{ name: 'Bootstrap', why: 'Layout, tables and modals' },
							{ name: 'jQuery', why: 'Search, filters and bulk selection' }
						]
					}
				]
			}
		],
		seed: noFeedback
	},

	// ───────────────────────────────────────────── Royal Mitra Persada
	{
		slug: 'royalmitrapersada',
		type: 'code',
		title: 'Royal Mitra Persada',
		tagline: 'A network-solutions storefront, and the CMS that runs it.',
		summary:
			'The company website and CMS for PT Royal Mitra Persada, a reseller of enterprise network and communication products: a public catalogue of Alcatel-Lucent, Aruba and Ruijie solutions with promos and an enquiry form, and an admin panel where the team manages products, brands, categories, promos, banners and incoming requests.',
		client: c.royalMitraPersada,
		role: 'Front-end development',
		year: 2023,
		facts: [
			{ label: 'Industry', value: 'IT & networking · B2B' },
			{ label: 'Platform', value: 'Website + CMS' }
		],
		tools: ['Laravel', 'AdminLTE', 'Bootstrap', 'MySQL'],
		cover: rmp.thumb,
		gallery: rmp.shots(
			[1, 'Home: banner, partner brands and featured products'],
			[2, 'Product detail with enquiry'],
			[3, 'Promos'],
			[4, 'CMS dashboard with new contact requests'],
			[5, 'Editing a product in the CMS']
		),
		preview: {
			url: '/projects/royalmitrapersada/index.html',
			video: '/images/work/royalmitrapersada/preview.webm',
			poster: rmp.poster,
			note: 'Opens on the website. Choose Login for the CMS (credentials are prefilled). Changes stay in your browser.'
		},
		blocks: [
			{
				kind: 'text',
				id: 'overview',
				title: 'Overview',
				body: [
					'Royal Mitra Persada sells business phone systems, switches and access points from Alcatel-Lucent Enterprise, Aruba and Ruijie. The website presents those products by brand and category, runs promotions, and turns visitors into sales enquiries.',
					'Behind it, a CMS lets the team keep the catalogue current without a developer: products with their price, description, advantages, features and physical specs; the brands and categories they belong to; promos and home-page banners; and every contact request that comes in.'
				]
			},
			{
				kind: 'text',
				id: 'purpose',
				title: 'Why it matters',
				body: [
					'For a B2B reseller, the website is the first sales conversation. Every product page ends with an enquiry button, and each request lands on the CMS dashboard with the customer’s company and the product they asked about, so sales can follow up the same day.'
				]
			},
			{
				kind: 'features',
				id: 'features',
				title: 'Key features',
				items: [
					{
						title: 'Product catalogue',
						body: 'Products filtered by brand, each with its own page, price and enquiry button.'
					},
					{
						title: 'Banners & promos',
						body: 'A rotating home banner and promo campaigns, all managed from the CMS.'
					},
					{
						title: 'Enquiry form',
						body: 'Visitors ask about a product or promo; requests land in the CMS.'
					},
					{
						title: 'CMS dashboard',
						body: 'Product, brand and promo counts, with the latest contact requests.'
					},
					{
						title: 'Product editor',
						body: 'Advantages, features and physical specs as repeatable fields, plus a cover image.'
					},
					{
						title: 'Brands & categories',
						body: 'Group products by source brand and category, used in the site’s filters.'
					}
				]
			},
			{
				kind: 'stats',
				id: 'numbers',
				title: 'By the numbers',
				items: [
					{ value: '3', label: 'Partner brands' },
					{ value: '5', label: 'Public pages' },
					{ value: '6', label: 'CMS modules' },
					{ value: '3', label: 'Spec lists per product' }
				]
			},
			{
				kind: 'impact',
				id: 'impact',
				title: 'Impact & value',
				items: [
					'The team updates products and promos without a developer',
					'Every enquiry arrives with its product and company attached',
					'One catalogue across three brands',
					'Promos go live from the CMS, on the home page and their own page'
				]
			},
			{
				kind: 'stack',
				id: 'stack',
				title: 'Tech stack',
				groups: [
					{
						label: 'Backend',
						items: [
							{ name: 'Laravel', why: 'Website, CMS and enquiries' },
							{ name: 'MySQL', why: 'Products, promos and contacts' }
						]
					},
					{
						label: 'Front-end',
						items: [
							{ name: 'Bootstrap', why: 'Responsive public website' },
							{ name: 'AdminLTE', why: 'CMS layout, sidebar and forms' }
						]
					}
				]
			}
		],
		seed: noFeedback
	},
	// ───────────────────────────────────────────── Cyclone Coffee
	{
		slug: 'cycoffee',
		type: 'code',
		title: 'Cyclone Coffee Ops',
		headline: 'Running a coffee business from one app, built entirely with AI',
		tagline:
			'Orders, staff tasks, stock and cash for Cyclone Coffee, with no hand-written code and no hand-drawn screens.',
		summary:
			'An exploration built entirely with AI tools to solve a real operational problem: Cyclone Coffee, a small bottled-coffee business, ran orders, production, stock and money through chats and notes. The app brings it into one place: a POS, orders that go through approval, production tasks staff pick up for a commission, inventory down to raw materials, and a ledger that adds up every day.',
		client: c.cycloneCoffee,
		role: 'Concept & AI-assisted build',
		year: 2026,
		isNew: true,
		facts: [
			{ label: 'Industry', value: 'F&B · Coffee' },
			{ label: 'Platform', value: 'Web app' }
		],
		tools: ['SvelteKit', 'TypeScript', 'Tailwind CSS', 'AI tools'],
		cover: cy.thumb,
		gallery: cy.shots(
			[1, 'Dashboard: cash balance, today’s money in and out, and what needs action'],
			[2, 'Activity management: orders, payments, tasks and wallet withdrawals'],
			[3, 'Point of sale with live stock and the cart'],
			[4, 'Inventory: finished products, raw materials and purchases'],
			[5, 'Ledger: every rupiah in and out, by day, week or month']
		),
		preview: {
			url: '/projects/cycoffee/index.html',
			video: '/images/work/cycoffee/preview.webm',
			poster: cy.poster,
			note: 'Username and PIN are prefilled: press Masuk. Runs on sample data; changes stay in your browser.'
		},
		blocks: [
			{
				kind: 'text',
				id: 'overview',
				title: 'Overview',
				body: [
					'Cyclone Coffee sells bottled coffee (kopi susu aren, cold brew, matcha) by order, through pre-order campaigns and over the counter. Every step used to live somewhere different: orders in chat, production on paper, stock in someone’s head and money in a spreadsheet that was rarely up to date.',
					'The app puts the whole operation in one place. The owner sees the cash balance and what is waiting for approval; staff pick up tasks (brew, pour, deliver, wash bottles) and earn a commission into their wallet; every sale, purchase and expense lands in the ledger.'
				]
			},
			{
				kind: 'text',
				id: 'purpose',
				title: 'Why it matters',
				body: [
					'Small food businesses lose money in the gaps: an order nobody confirmed, a bottle of milk nobody restocked, a payment nobody checked. Making each step a record with an owner and a status means the owner can run the business from the dashboard instead of chasing people.'
				]
			},
			{
				kind: 'text',
				id: 'process',
				title: 'How it was built',
				body: [
					'Every screen and every line of code came from AI tools; I didn’t touch the code or the design files. My part was the product work: mapping how the business actually runs, writing each workflow as a prompt, testing it against real days (part payments, stock running out mid-order, a staff member withdrawing their commission) and asking for fixes until it held up.'
				]
			},
			{
				kind: 'features',
				id: 'features',
				title: 'Key features',
				items: [
					{
						title: 'Dashboard',
						body: 'Cash balance, today’s and this month’s money in and out, and a list of everything that needs action.'
					},
					{
						title: 'Orders with approval',
						body: 'Orders move from waiting to accepted, in progress and done; payments are verified before they count.'
					},
					{
						title: 'Tasks & commission',
						body: 'Staff take production and delivery tasks from templates, get them reviewed, and earn into a wallet they can withdraw.'
					},
					{
						title: 'POS & pre-orders',
						body: 'Sell from live stock at the counter, or run pre-order campaigns with a manifest and couriers.'
					},
					{
						title: 'Inventory',
						body: 'Finished products, raw materials, purchases and a stock history, with low-stock warnings.'
					},
					{
						title: 'Ledger & reports',
						body: 'Every transaction by source and category, with weekly reports sent straight to the team’s Discord.'
					}
				]
			},
			{
				kind: 'stats',
				id: 'numbers',
				title: 'By the numbers',
				items: [
					{ value: '0', label: 'Lines of code written by hand' },
					{ value: '12', label: 'Modules, from POS to audit log' },
					{
						value: '5',
						label: 'Kinds of work logged: order, production, delivery, bottle wash, sticker'
					},
					{ value: '1', label: 'Ledger every sale, purchase and expense flows into' }
				]
			},
			{
				kind: 'impact',
				id: 'impact',
				title: 'Impact & value',
				items: [
					'The owner sees cash and pending work at a glance, without asking around',
					'Staff know what to do next and what they’ve earned',
					'Stock warnings arrive before a product runs out, not after',
					'An audit log shows who changed what, and when'
				]
			},
			{
				kind: 'stack',
				id: 'stack',
				title: 'Tech stack',
				groups: [
					{
						label: 'Front-end',
						items: [
							{ name: 'SvelteKit', why: 'App shell, routing and every module' },
							{ name: 'TypeScript', why: 'Orders, stock and ledger logic' },
							{ name: 'Tailwind CSS', why: 'Layout and components' }
						]
					},
					{
						label: 'Integrations',
						items: [
							{
								name: 'Discord webhooks',
								why: 'Weekly reports to the team; this demo runs on sample data'
							}
						]
					},
					{
						label: 'Build',
						items: [
							{
								name: 'AI tools',
								why: 'Designed, generated and refined by prompting, no hand-written code'
							}
						]
					}
				]
			}
		],
		seed: noFeedback
	},

	// ───────────────────────────────────────────── Artemis
	{
		slug: 'artemis',
		type: 'code',
		title: 'Artemis',
		headline: 'Seeing network capacity breaches months before they happen',
		tagline:
			'Capacity forecasts for core, transport and RAN, plus planning for the busiest days of the year.',
		summary:
			'Artemis brings a mobile operator’s network capacity into one place: end-to-end occupancy for core, transport and radio, a forecast that shows when each element will cross its threshold, anomaly detection, and capacity planning for events such as New Year’s Eve and Lebaran.',
		client: c.telkomsel,
		via: companies.immobi,
		role: 'Design & front-end development',
		year: 2018,
		facts: [
			{ label: 'Industry', value: 'Telecommunications · Network planning' },
			{ label: 'Platform', value: 'Web app (internal)' }
		],
		tools: ['Laravel', 'Bootstrap', 'jQuery', 'Highcharts', 'D3.js'],
		cover: art.thumb,
		gallery: art.shots(
			[1, 'E2E capacity: network elements and their occupancy, nationwide'],
			[2, 'Capacity forecast and anomaly detection'],
			[3, 'RAN capacity by area on the map'],
			[4, 'IP backbone and backhaul topology'],
			[5, 'Event capacity planning: traffic forecast and readiness checklist']
		),
		preview: {
			url: '/projects/artemis/index.html',
			video: '/images/work/artemis/preview.webm',
			poster: art.poster,
			note: 'Credentials are prefilled: press Login, then pick a module. Runs on sample data.'
		},
		blocks: [
			{
				kind: 'text',
				id: 'overview',
				title: 'Overview',
				body: [
					'Artemis (Application on Service, Network & Experience Matrix for Integrated Solutions) gives network planners one view of capacity across the whole chain: core (HLR, MSS, MGW, SGSN, GGSN, DNS and internet links), transport (backbone and backhaul) and the radio network of more than 43,000 sites.',
					'Three modules sit behind one login. E2E Network Capacity shows how full each element is, nationwide or by area and region. Artemis Analytic forecasts occupancy months ahead and flags anomalies. Event Management plans capacity for the days traffic spikes.'
				]
			},
			{
				kind: 'text',
				id: 'purpose',
				title: 'Why it matters',
				body: [
					'Adding capacity takes months of procurement, so finding out an element is full on the day it’s full is too late. A forecast that names the element, the month it breaches 80% and the action to take gives planners time to act, and event planning keeps the network up when a million people gather in one place.'
				]
			},
			{
				kind: 'features',
				id: 'features',
				title: 'Key features',
				items: [
					{
						title: 'E2E capacity status',
						body: 'Every core, transport and RAN indicator with its capacity, occupancy and month-on-month change.'
					},
					{
						title: 'Capacity forecast',
						body: 'Occupancy forecast 6 to 18 months ahead, with the month each element breaches its threshold.'
					},
					{
						title: 'Anomaly detection',
						body: 'A risk map of current occupancy against growth, so outliers stand out.'
					},
					{
						title: 'RAN map',
						body: 'Radio capacity by area and region on the map, by technology and week.'
					},
					{
						title: 'Transport topology',
						body: 'An interactive map of backbone and backhaul nodes and the links between them.'
					},
					{
						title: 'Event planning',
						body: 'Expected crowd, traffic uplift, sites impacted, mobile cells deployed and a readiness checklist per event.'
					}
				]
			},
			{
				kind: 'stats',
				id: 'numbers',
				title: 'By the numbers',
				items: [
					{ value: '43.5k', label: 'BTS and eNodeB sites covered' },
					{ value: '284', label: 'Core network elements tracked' },
					{ value: '18', label: 'E2E capacity indicators' },
					{ value: '3', label: 'Modules behind one login' }
				]
			},
			{
				kind: 'impact',
				id: 'impact',
				title: 'Impact & value',
				items: [
					'Capacity work is planned months before a breach, not after',
					'Core, transport and radio teams read the same numbers',
					'Big events go in with a checklist and extra capacity in place',
					'Charts export straight into reports and presentations'
				]
			},
			{
				kind: 'stack',
				id: 'stack',
				title: 'Tech stack',
				groups: [
					{
						label: 'Backend',
						items: [{ name: 'Laravel', why: 'Blade views and the capacity API' }]
					},
					{
						label: 'Front-end',
						items: [
							{ name: 'Bootstrap', why: 'Layout, filters and tables' },
							{ name: 'jQuery', why: 'Filters, drill-downs and views' }
						]
					},
					{
						label: 'Charts & maps',
						items: [
							{ name: 'Highcharts', why: 'Forecasts, trends and the risk map' },
							{ name: 'vis.js · D3.js', why: 'Transport topology and the area maps' },
							{ name: 'html2canvas', why: 'Export a view as an image' }
						]
					}
				]
			}
		],
		seed: noFeedback
	},

	// ───────────────────────────────────────────── SIMAL
	{
		slug: 'navy',
		type: 'code',
		title: 'SIMAL',
		headline: 'One command view for six naval bases',
		tagline:
			'Personnel calls, attendance and base facilities, monitored and controlled from one system.',
		summary:
			'SIMAL (Sistem Informasi Manajemen Angkatan Laut) brings three tools for naval command into one system: a call identifier that traces personnel calls and where they were made, personnel monitoring for attendance and leave across every base, and remote control of each base’s lights, air conditioning, power and CCTV, with the fleet on a live map.',
		client: c.simal,
		via: companies.immobi,
		role: 'Design & front-end development',
		year: 2019,
		special: true,
		facts: [
			{ label: 'Industry', value: 'Defence · Command & control' },
			{ label: 'Platform', value: 'Web app (internal)' }
		],
		tools: ['Vue.js', 'Vuetify', 'Vuex', 'Highcharts', 'Google Maps'],
		cover: navy.thumb,
		gallery: navy.shots(
			[1, 'Home: the three systems and their status'],
			[2, 'Smart Call Identifier: a base’s personnel and their calls'],
			[3, 'Smart Personal Monitoring: attendance and requests'],
			[4, 'Smart Remote Base: room control and energy use'],
			[5, 'Fleet tracking on the map']
		),
		preview: {
			url: '/projects/navy/index.html',
			video: '/images/work/navy/preview.webm',
			poster: navy.poster,
			note: 'Credentials are prefilled (admin / secret). Press Login. Runs on sample data.'
		},
		blocks: [
			{
				kind: 'text',
				id: 'overview',
				title: 'Overview',
				body: [
					'SIMAL connects headquarters with every base in one system. After signing in, commanders choose one of three tools and then a base: headquarters in Jakarta, the command centre, or the naval bases in Surabaya, Makassar, Medan and Bitung.',
					'Smart Call Identifier traces who called whom, for how long and from where. Smart Personal Monitoring shows who is present, late, sick or on leave. Smart Remote Base switches each room’s lights, air conditioning and electronics, tracks energy use and CCTV, and shows every vessel on the map.'
				]
			},
			{
				kind: 'text',
				id: 'purpose',
				title: 'Why it matters',
				body: [
					'Command depends on knowing where people are and what state each base is in. Before SIMAL that meant calls and reports from each base. One system with the same view for every base turns those calls into a screen anyone in command can read.'
				]
			},
			{
				kind: 'features',
				id: 'features',
				title: 'Key features',
				items: [
					{
						title: 'Call identifier',
						body: 'Personnel calls with caller, duration and the location of both parties on the map.'
					},
					{
						title: 'Personnel monitoring',
						body: 'Attendance by hour, late check-ins, and sick, leave and permit requests per base.'
					},
					{
						title: 'Remote base control',
						body: 'Switch lights, air conditioning and electronics room by room, or all at once.'
					},
					{
						title: 'Energy & climate',
						body: 'Power use today against yesterday, room temperature and humidity.'
					},
					{
						title: 'CCTV & fleet map',
						body: 'Camera feeds per base and live vessel positions, speed and heading.'
					},
					{
						title: 'Per-base drill-down',
						body: 'Every tool starts from the same list of bases with their status.'
					}
				]
			},
			{
				kind: 'stats',
				id: 'numbers',
				title: 'By the numbers',
				items: [
					{ value: '6', label: 'Bases in one system' },
					{ value: '136', label: 'Personnel monitored' },
					{ value: '42', label: 'Rooms under remote control' },
					{ value: '8', label: 'Vessels tracked' }
				]
			},
			{
				kind: 'impact',
				id: 'impact',
				title: 'Impact & value',
				items: [
					'Headquarters sees every base without calling it',
					'Attendance and leave are recorded, not reported',
					'Facilities left on are switched off from anywhere',
					'Calls and vessels are traced on one map'
				]
			},
			{
				kind: 'stack',
				id: 'stack',
				title: 'Tech stack',
				groups: [
					{
						label: 'Front-end',
						items: [
							{ name: 'Vue.js', why: 'Single-page app with Vue Router' },
							{ name: 'Vuex', why: 'Shared state for bases, personnel and devices' },
							{ name: 'Vuetify', why: 'Material components and layout' }
						]
					},
					{
						label: 'Data & maps',
						items: [
							{
								name: 'Adonis.js · PostgreSQL',
								why: 'API and data in the live system; this demo runs on sample data'
							},
							{ name: 'Firebase', why: 'Real-time notifications' },
							{ name: 'Google Maps', why: 'Call locations and the fleet' },
							{ name: 'Highcharts', why: 'Attendance and energy charts' }
						]
					}
				]
			}
		],
		seed: noFeedback
	},

	// ───────────────────────────────────────────── Parsing Data Immobi
	{
		slug: 'parsing-tools',
		type: 'code',
		title: 'Parsing Data',
		headline: 'Turning raw property feeds into clean, scheduled data',
		tagline: 'Connections, data sources and parsing jobs for property listings, in one console.',
		summary:
			'A data ingestion console for property data: connect FTP, SFTP, HTTP and SQL sources, describe each feed once with a step-by-step wizard, and let scheduled jobs extract, validate, parse, transform and load it into the warehouse, with every run, its tasks and its logs one click away.',
		client: companies.immobi,
		via: companies.immobi,
		role: 'Design & front-end development',
		year: 2018,
		facts: [
			{ label: 'Industry', value: 'Property · Data engineering' },
			{ label: 'Platform', value: 'Web app (internal)' }
		],
		tools: ['Bootstrap', 'MDB', 'jQuery', 'Font Awesome'],
		cover: pt.thumb,
		gallery: pt.shots(
			[1, 'Dashboard: records ingested, connection health and recent runs'],
			[2, 'Connections across FTP, SFTP, HTTP and SQL'],
			[3, 'Data sources with their format, size and schedule'],
			[4, 'A job’s tasks in tree view'],
			[5, 'The four-step wizard for a new data source']
		),
		preview: {
			url: '/projects/parsing-tools/index.html',
			video: '/images/work/parsing-tools/preview.webm',
			poster: pt.poster,
			note: 'Credentials are prefilled. Press Login. Runs on sample data.'
		},
		blocks: [
			{
				kind: 'text',
				id: 'overview',
				title: 'Overview',
				body: [
					'Property listings, agent leads and price indices arrive from many places: CSV exports on FTP servers, XML on SFTP, partner APIs and old SQL databases. Each one used to need its own script and someone to notice when it failed.',
					'Parsing Data puts all of it in one console. Engineers register a connection, describe a data source (name, connection, file pattern, format and schema) through a four-step wizard, and schedule a job. Each run is broken into tasks (extract, validate, parse, transform, load) with their status, timing and logs.'
				]
			},
			{
				kind: 'text',
				id: 'purpose',
				title: 'Why it matters',
				body: [
					'Listings only help buyers if they’re current. When a feed breaks quietly, the site shows yesterday’s prices. Connection health, success rates and failed runs on the first screen mean problems are fixed before anyone downstream notices.'
				]
			},
			{
				kind: 'features',
				id: 'features',
				title: 'Key features',
				items: [
					{
						title: 'Dashboard',
						body: 'Records ingested per day, connections online, success rate and the latest runs and events.'
					},
					{
						title: 'Connections',
						body: 'FTP, SFTP, HTTP and SQL endpoints with their latency and status, filtered by type.'
					},
					{
						title: 'Data sources',
						body: 'Each feed with its connection, format, record count, size and schedule.'
					},
					{
						title: 'Setup wizard',
						body: 'Name, connection, file profile and metadata profiling, with a live summary.'
					},
					{
						title: 'Job runs',
						body: 'Tree view, task duration, Gantt timeline and logs for every run.'
					},
					{
						title: 'Run now',
						body: 'Re-run a failed job on demand without waiting for the schedule.'
					}
				]
			},
			{
				kind: 'stats',
				id: 'numbers',
				title: 'By the numbers',
				items: [
					{ value: '4', label: 'Connection types: FTP, SFTP, HTTP, SQL' },
					{ value: '8.4M', label: 'Records in the sample warehouse' },
					{ value: '5', label: 'Tasks per run, extract to load' },
					{ value: '4', label: 'Steps to add a data source' }
				]
			},
			{
				kind: 'impact',
				id: 'impact',
				title: 'Impact & value',
				items: [
					'New feeds are added through a form, not a new script',
					'Failures show up on the first screen, with the logs to fix them',
					'Every source runs on a visible schedule',
					'One place to see what’s in the warehouse and where it came from'
				]
			},
			{
				kind: 'stack',
				id: 'stack',
				title: 'Tech stack',
				groups: [
					{
						label: 'Front-end',
						items: [
							{ name: 'Bootstrap', why: 'Layout, tables and forms' },
							{ name: 'MDB', why: 'Material Design components' },
							{ name: 'jQuery', why: 'Filters, wizard steps and job detail' },
							{ name: 'Font Awesome', why: 'Icons' }
						]
					}
				]
			}
		],
		seed: noFeedback
	},

	// ───────────────────────────────────────────── Remote Task
	{
		slug: 'remote-task',
		type: 'code',
		title: 'Remote Task',
		headline: 'Measuring real mobile network speed from the field',
		tagline: 'Measurement boxes across Indonesia run speed tests on schedule and report back.',
		summary:
			'Remote Task manages a fleet of measurement boxes placed across Indonesia: it schedules speed tests on each one, tracks every box’s heartbeat, signal, data quota and battery, and turns the results into download, upload and latency figures by hour, region, network and operator.',
		client: c.telkomsel,
		via: companies.immobi,
		role: 'Design & front-end development',
		year: 2018,
		special: true,
		facts: [
			{ label: 'Industry', value: 'Telecommunications · Network quality' },
			{ label: 'Platform', value: 'Web app (internal)' }
		],
		tools: ['Laravel', 'Bootstrap', 'jQuery', 'Highcharts'],
		cover: rt.thumb,
		gallery: rt.shots(
			[1, 'Dashboard: average speeds, tasks and alerts, nationwide'],
			[2, 'Download throughput per box, hour by hour'],
			[3, 'Box inventory with signal, quota, battery and uptime'],
			[4, 'Task queue: scheduled, running, done and failed tests'],
			[5, 'Notifications for offline boxes and missed targets']
		),
		preview: {
			url: '/projects/remote-task/index.html',
			video: '/images/work/remote-task/preview.webm',
			poster: rt.poster,
			note: 'Credentials are prefilled. Press Log in. Runs on sample data.'
		},
		blocks: [
			{
				kind: 'text',
				id: 'overview',
				title: 'Overview',
				body: [
					'Drive tests show how fast a network is for an afternoon. Measurement boxes left in place show it every hour. Remote Task is the web app that runs them: each box is registered with its site, device and SIM, and tasks tell it which test to run, on which network, and when.',
					'Results roll up into a nationwide dashboard (average 3G and 4G download, latency and the share of tests that met target), regional tables, and per-box charts by hour.'
				]
			},
			{
				kind: 'text',
				id: 'purpose',
				title: 'Why it matters',
				body: [
					'Customers judge a network by the speed they get, not by what the equipment reports. Measuring from the customer’s side, every hour, in every region shows where experience falls below target and how it compares with other operators.'
				]
			},
			{
				kind: 'features',
				id: 'features',
				title: 'Key features',
				items: [
					{
						title: 'Network dashboard',
						body: 'Average download and latency for 3G and 4G against target, with a 24-hour trend.'
					},
					{
						title: 'Performance per box',
						body: 'Hourly throughput by network, operator and test type, with best, worst and average.'
					},
					{
						title: 'Box inventory',
						body: 'Every box’s signal, data quota, battery, 30-day uptime and last heartbeat.'
					},
					{
						title: 'Task scheduling',
						body: 'Create tests, see them run, and re-run the ones that failed.'
					},
					{
						title: 'Operator benchmark',
						body: 'Average speeds side by side for the operators tested.'
					},
					{
						title: 'Alerts',
						body: 'Offline boxes, missed targets, failed tasks, high temperature and low quota.'
					}
				]
			},
			{
				kind: 'stats',
				id: 'numbers',
				title: 'By the numbers',
				items: [
					{ value: '14', label: 'Box sites in the sample fleet' },
					{ value: '11', label: 'Regions covered' },
					{ value: '24', label: 'Hourly readings per box per day' },
					{ value: '2', label: 'Networks tested: 3G and 4G' }
				]
			},
			{
				kind: 'impact',
				id: 'impact',
				title: 'Impact & value',
				items: [
					'Network speed is measured continuously, from the customer’s side',
					'Regions below target are visible the same day',
					'Broken or offline boxes are caught by their heartbeat',
					'Tests are scheduled from the office, not on site'
				]
			},
			{
				kind: 'stack',
				id: 'stack',
				title: 'Tech stack',
				groups: [
					{
						label: 'Backend',
						items: [{ name: 'Laravel', why: 'Boxes, tasks and the performance API' }]
					},
					{
						label: 'Front-end',
						items: [
							{ name: 'Bootstrap', why: 'Admin layout, tables and forms' },
							{ name: 'jQuery', why: 'Filters, task queue and refresh' },
							{ name: 'Moment.js', why: 'Dates, ranges and sync times' }
						]
					},
					{
						label: 'Charts',
						items: [{ name: 'Highcharts', why: 'Trends, throughput and benchmarks' }]
					}
				]
			}
		],
		seed: noFeedback
	},

	// ───────────────────────────────────────────── Smart Survey
	{
		slug: 'site-survey',
		type: 'code',
		title: 'Smart Survey',
		headline: 'From tower survey in the field to a signed-off report',
		tagline: 'Survey projects, field tasks and reports for telecom sites, from one dashboard.',
		summary:
			'Smart Survey runs telecom site surveys end to end: project managers set up a project with its sites and form templates, assign survey and audit tasks to field engineers, and follow progress on one dashboard, while engineers fill in the forms with photos on the mobile app and the results come back as reports ready to review and print.',
		client: companies.immobi,
		via: companies.immobi,
		role: 'Design & front-end development',
		year: 2019,
		facts: [
			{ label: 'Industry', value: 'Telecommunications · Field operations' },
			{ label: 'Platform', value: 'Web dashboard + mobile app' }
		],
		tools: ['Laravel', 'Bootstrap', 'jQuery', 'DataTables', 'Highcharts'],
		cover: ss.thumb,
		gallery: ss.shots(
			[1, 'Operations overview: sites, tasks, late work and engineers'],
			[2, 'A project with its sites, team and templates'],
			[3, 'Tasks for one project, with engineer and schedule'],
			[4, 'A finished tower audit report'],
			[5, 'Users and roles for the web and mobile apps']
		),
		preview: {
			url: '/projects/site-survey/index.html',
			video: '/images/work/site-survey/preview.webm',
			poster: ss.poster,
			note: 'Credentials are prefilled (admin@ss.com / 123456). Press Login. Runs on sample data.'
		},
		blocks: [
			{
				kind: 'text',
				id: 'overview',
				title: 'Overview',
				body: [
					'Before a tower is built, upgraded or audited, someone has to climb it: check the structure, the grounding and the line of sight, and take photos. Those surveys used to come back as paper forms and photo folders, weeks after the visit.',
					'Smart Survey gives each project its sites, its form templates and its team. Tasks go to riggers in the field, who fill in the form on the mobile app. Their answers and photos come back as a report the project manager can review, approve and print.'
				]
			},
			{
				kind: 'text',
				id: 'purpose',
				title: 'Why it matters',
				body: [
					'A late survey holds up everything after it: permits, construction, the site going live. A dashboard of late and on-going tasks, by project, region and engineer, shows where to step in, and reports arrive the day the work is done.'
				]
			},
			{
				kind: 'features',
				id: 'features',
				title: 'Key features',
				items: [
					{
						title: 'Operations dashboard',
						body: 'Sites, tasks, late work and engineers in the field, filtered by project, region, city or rigger.'
					},
					{
						title: 'Projects & sites',
						body: 'Each project with its customer, scope, dates, sites and the people assigned.'
					},
					{
						title: 'Form templates',
						body: 'Build survey and audit forms with a drag-and-drop form builder.'
					},
					{
						title: 'Field tasks',
						body: 'Assign tasks to engineers with a schedule; status moves from open to done in the field.'
					},
					{
						title: 'Reports',
						body: 'Answers, coordinates and photo evidence in one printable report.'
					},
					{
						title: 'Users & roles',
						body: 'Web access for managers, mobile access for riggers, with roles per module.'
					}
				]
			},
			{
				kind: 'stats',
				id: 'numbers',
				title: 'By the numbers',
				items: [
					{ value: '7', label: 'Survey projects in the sample' },
					{ value: '31', label: 'Sites across 7 regions' },
					{ value: '36', label: 'Field tasks tracked' },
					{ value: '2', label: 'Apps: web dashboard and mobile' }
				]
			},
			{
				kind: 'impact',
				id: 'impact',
				title: 'Impact & value',
				items: [
					'Reports arrive when the survey is done, not weeks later',
					'Late tasks surface on the first screen',
					'Every answer comes with its photo and location',
					'New survey types are a template, not a new app'
				]
			},
			{
				kind: 'stack',
				id: 'stack',
				title: 'Tech stack',
				groups: [
					{
						label: 'Backend',
						items: [{ name: 'Laravel', why: 'Projects, tasks, reports and the mobile API' }]
					},
					{
						label: 'Front-end',
						items: [
							{ name: 'Bootstrap', why: 'Layout and forms' },
							{ name: 'jQuery · DataTables', why: 'Sortable lists with fixed columns' },
							{ name: 'formBuilder', why: 'Drag-and-drop survey templates' },
							{ name: 'SweetAlert2', why: 'Confirmations' }
						]
					},
					{
						label: 'Charts',
						items: [{ name: 'Highcharts', why: 'Progress and activity trends' }]
					}
				]
			}
		],
		seed: noFeedback
	},

	// ───────────────────────────────────────────── SignalViewer reporting
	{
		slug: 'svreport',
		type: 'code',
		title: 'SignalViewer Report',
		headline: 'Network-quality testing, reported by month, country and map',
		tagline:
			'App installs, spot and route tests, and e-mail and social reach for the SignalViewer app.',
		summary:
			'The reporting dashboard for SignalViewer, an app that measures mobile network quality from users’ phones: monthly and daily summaries of installs, spot tests and route tests, installs by country and on the map, a daily input form for social media and e-mail figures, and user management.',
		client: companies.immobi,
		via: companies.immobi,
		role: 'Design & front-end development',
		year: 2018,
		special: true,
		facts: [
			{ label: 'Industry', value: 'Telecommunications · Analytics' },
			{ label: 'Platform', value: 'Web app (internal)' }
		],
		tools: ['Laravel', 'Bootstrap', 'jQuery', 'Highcharts'],
		cover: sv.thumb,
		gallery: sv.shots(
			[1, 'Monthly summary: installs, spot tests, route tests and e-mail'],
			[2, 'Installs on the map'],
			[3, 'Daily input for social media and e-mail figures'],
			[4, 'User management'],
			[5, 'Sign-in']
		),
		preview: {
			url: '/projects/svreport/index.html',
			video: '/images/work/svreport/preview.webm',
			poster: sv.poster,
			note: 'Credentials are prefilled. Press Login. Runs on sample data.'
		},
		blocks: [
			{
				kind: 'text',
				id: 'overview',
				title: 'Overview',
				body: [
					'SignalViewer lets people test their mobile network from their phone: spot tests for speed, web and video, and route tests while moving. This dashboard is where the team behind it reads the results.',
					'A monthly or daily summary shows installs, spot tests, route tests and e-mail activity against the previous period. Installs are broken down by country and placed on the map, social media and inbox figures are entered daily, and administrators manage who can see it.'
				]
			},
			{
				kind: 'text',
				id: 'purpose',
				title: 'Why it matters',
				body: [
					'An app grows through installs and is useful through tests. Seeing both by month, by country and on the map shows where the app is used, which tests people run, and whether marketing on social media is moving the numbers.'
				]
			},
			{
				kind: 'features',
				id: 'features',
				title: 'Key features',
				items: [
					{
						title: 'Monthly & daily summary',
						body: 'Installs, spot tests, route tests and e-mail, each against the previous period.'
					},
					{
						title: 'Test breakdown',
						body: 'Spot tests by speed, web and video; route tests by basic, upload, download and video.'
					},
					{
						title: 'Installs by country',
						body: 'Ranked countries with their share of installs, plus a cumulative trend.'
					},
					{
						title: 'Install map',
						body: 'Each device’s last location, with the top cities.'
					},
					{
						title: 'Daily input',
						body: 'Facebook, Twitter, Instagram and inbox figures entered per day.'
					},
					{
						title: 'User management',
						body: 'Accounts, roles and verification for everyone with access.'
					}
				]
			},
			{
				kind: 'stats',
				id: 'numbers',
				title: 'By the numbers',
				items: [
					{ value: '97.5k', label: 'App installs in the sample data' },
					{ value: '13', label: 'Countries reached' },
					{ value: '7', label: 'Test types reported' },
					{ value: '4', label: 'Channels entered daily' }
				]
			},
			{
				kind: 'impact',
				id: 'impact',
				title: 'Impact & value',
				items: [
					'One monthly report instead of figures gathered by hand',
					'Growth is visible by country and city',
					'Marketing and product read the same numbers',
					'Access is limited to the people who need it'
				]
			},
			{
				kind: 'stack',
				id: 'stack',
				title: 'Tech stack',
				groups: [
					{
						label: 'Backend',
						items: [{ name: 'Laravel', why: 'Reports, input and accounts' }]
					},
					{
						label: 'Front-end',
						items: [
							{ name: 'Bootstrap', why: 'Layout, cards and forms' },
							{ name: 'jQuery', why: 'Filters and the input form' },
							{ name: 'SweetAlert', why: 'Confirmations' }
						]
					},
					{
						label: 'Charts & maps',
						items: [
							{ name: 'Highcharts', why: 'Monthly trends and breakdowns' },
							{ name: 'ArcGIS', why: 'The install map' }
						]
					}
				]
			}
		],
		seed: noFeedback
	}
];
