// KlikA2C lending platform (Nikel, 2026): lender portal, borrower portal and back
// office. Screens are captured from the working prototype; colours, type and
// proportions follow the KlikA2C design system (Geist, navy #274B9C, yellow #FFBD00).
import { blocks, frame, slideCss } from './kit.mjs';

const NAVY = '#274B9C';
const YEL = '#FFBD00';
const TEAL = '#0BC6C5';
const GREEN = '#1F7A45';
const ROSE = '#D23B4B';
const AMBER = '#B86E00';
const PURPLE = '#6A4BD8';

const t = {
	font: 'Geist',
	bg: '#F5F7FB',
	ink: '#1F2937',
	body: '#374151',
	muted: '#5B6474',
	accent: NAVY,
	soft: '#E7ECF6',
	shadow: 'rgba(31,41,55,.30)',
	logo: 'images/clients/nikel.webp',
	project: 'Nikel · KlikA2C Platform'
};
const css =
	slideCss(t) +
	`.mono{font-family:'Geist Mono',monospace}
	.shot{position:absolute;inset:0;background:#fff}
	.shot img{display:block;width:100%;height:100%;object-fit:cover;object-position:top left}`;
const { card, grid, eyebrow, ticks, flow, chips, h, p, numbered } = blocks(t);
const base = {
	slug: 'klika2c-platform',
	dir: 'klika2c-platform',
	fonts: ['Geist:wght@400;500;600;700;800;900', 'Geist+Mono:wght@500;600']
};
// Slides are numbered in deck order when exported, so they can be defined in any order.
const slide = (name, title, lede, content) => ({ name, title, lede, content });

const src = (name) => `images/work/klika2c-platform/screens/${name}.webp`;
/** A screenshot filling its card, cropped from the top-left. */
const shot = (name, { col = 'span 6', row = 'span 1', pos = 'top left', zoom = 1 } = {}) =>
	card(
		`<div class="shot"><img src="${src(name)}" style="object-position:${pos};${zoom !== 1 ? `transform:scale(${zoom});transform-origin:${pos}` : ''}"></div>`,
		{ col, row, pad: '0', style: 'box-shadow:0 0 0 1px #E7E9F1,0 22px 40px -28px rgba(31,41,55,.35)' }
	);
const tag = (text, bg, fg = '#fff') =>
	`<span style="display:inline-block;padding:6px 14px;border-radius:99px;background:${bg};color:${fg};font:700 18px Geist">${text}</span>`;

/* ── 01 The platform ── */
const portal = (img, name, who, color, pos = 'top left') =>
	card(
		`<div style="position:absolute;left:0;right:0;top:0;height:300px;overflow:hidden;border-bottom:1px solid #E7E9F1;background:#fff"><img src="${src(img)}" style="position:absolute;left:0;top:0;width:165%;max-width:none;height:auto"></div>
		<div style="position:absolute;left:30px;right:30px;bottom:26px">
			<div style="display:flex;align-items:center;gap:10px"><i style="width:14px;height:14px;border-radius:4px;background:${color}"></i>${eyebrow(who, color)}</div>
			${h(name, 32)}
		</div>`,
		{ col: 'span 4', pad: '0' }
	);
const platform = slide(
	'platform',
	'One marketplace, three portals',
	'Lenders fund loans, borrowers draw them, and an operations team keeps every rupiah accounted for.',
	grid(
		`${portal('lender-home', 'Lender Portal', 'For people who fund', NAVY)}
		${portal('backoffice-dashboard', 'Back Office', 'For the team in between', GREEN)}
		${portal('borrower-home', 'Borrower Portal', 'For people who borrow', '#0E8F8E')}
		${card(
			`${eyebrow('How money moves')}
			${flow(
				[
					'Lender funds a loan with an OTP-signed agreement',
					'Auto-clearing: lender RDL → KlikA2C escrow',
					'Auto-disbursement: escrow → borrower’s bank',
					'Repayment by payroll deduction or bullet',
					'Repayment distributed back to lenders'
				],
				{ size: 19 }
			)}`,
			{ col: 'span 12' }
		)}`,
		{ rows: '1fr 196px' }
	)
);

/* ── 02 Design process ── */
const phase = (no, name, what, items, color) =>
	card(
		`<div style="display:flex;justify-content:space-between;align-items:baseline">${eyebrow(name, color)}<span class="mono" style="font:600 20px 'Geist Mono';color:${t.muted}">${no}</span></div>
		${h(what, 26)}
		${ticks(items, { color, size: 20 })}`,
		{ col: 'span 3' }
	);
const process = slide(
	'process',
	'Design process, end to end',
	'Double Diamond: find the real problem first, then build the right solution across all three portals.',
	grid(
		`${phase('01', 'Discover', 'Audit what exists', ['Pain points in the old lender dashboard: metric noise, empty charts', 'Operational work behind each loan, with credit and operations', 'Regulatory steps: OJK agreement, OTP, KYC'], NAVY)}
		${phase('02', 'Define', 'Frame the problem', ['Three personas and their jobs', 'One loan lifecycle across all portals', 'Metric definitions: real-time, all-time, month-to-date'], '#0E8F8E')}
		${phase('03', 'Develop', 'Explore and prototype', ['Local kit: grade, loan card, status, repayment progress, fund input', 'Flows per portal and per loan product', 'A coded prototype to test flows end to end'], AMBER)}
		${phase('04', 'Deliver', 'Ship and iterate', ['Tokens shared by portal and back office', 'Bahasa Indonesia pass over every screen', 'Specs, handoff and an iteration backlog'], GREEN)}
		${card(
			`<div style="display:flex;align-items:center;gap:28px;height:100%">
				<div style="flex:none">${eyebrow('Working file')}${h('Ulyssestwo – Iteration', 28)}</div>
				<div style="flex:1">${chips(['Local kit', 'Lender: Home, Portfolio, Mutation', 'Back office: loan detail &amp; workbench', 'Multilanguage'], { size: 19 })}</div>
			</div>`,
			{ col: 'span 12' }
		)}`,
		{ rows: '1fr 150px' }
	)
);

/* ── 03 Personas ── */
const persona = (initials, color, role, name, line, goals, pains) =>
	card(
		`<div style="display:flex;gap:18px;align-items:center">
			<div style="flex:none;width:76px;height:76px;border-radius:22px;background:${color};color:#fff;display:grid;place-items:center;font:800 28px Geist">${initials}</div>
			<div>${eyebrow(role, color)}${h(name, 28)}</div>
		</div>
		${p(line, 20)}
		<div style="margin-top:20px;padding-top:16px;border-top:1px solid #E7E9F1">${eyebrow('Goals', t.muted)}${ticks(goals, { color, size: 19 })}</div>
		<div style="margin-top:18px">${eyebrow('Frustrations', t.muted)}${ticks(pains, { color: ROSE, size: 19 })}</div>`,
		{ col: 'span 4' }
	);
const personas = slide(
	'personas',
	'Who we design for',
	'Three people, one loan: each sees it from a different side.',
	grid(
		`${persona('L', NAVY, 'Lender', 'The funder', 'An individual or institution putting idle balance to work through single or batch funding.', ['Choose loans by grade, tenure and return', 'Know what was paid back, and when', 'Move money in and out with confidence'], ['Dense dashboards with unclear numbers', 'Charts that go empty when data is missing'])}
		${persona('B', '#0E8F8E', 'Borrower', 'The business or employee', 'An SME using invoice or PO financing, or an employee drawing EWA or an employee loan through their employer.', ['Get a limit without repeating paperwork', 'See the full cost before committing', 'Track every step until the money lands'], ['Re-uploading documents for each product', 'Not knowing where an application stands'])}
		${persona('O', GREEN, 'Operations', 'The credit analyst', 'Credit, risk, finance and collections staff who keep loans moving and money reconciled.', ['One queue for what needs attention', 'Validate KYC and documents quickly', 'Set each partner’s rules once'], ['Scattered tools and manual configuration', 'Failed transfers found too late'])}`,
		{ rows: 1 }
	)
);

/* ── 04 Experience map ── */
const stages = ['Onboard', 'Apply &amp; list', 'Assess', 'Fund', 'Disburse &amp; repay'];
const lanes = [
	['Borrower', '#0E8F8E', ['Pick a product, verify NIK, OTP on prefilled details', 'Amount and tenor, simulation, documents, sign', 'Follows a status timeline', 'Accepts the offer and signs (Privy)', 'Funds land in the primary bank; repays by payroll or bullet']],
	['Back office', GREEN, ['KYC check, document validation, blacklist', 'Submission templates built from legal rules', 'Assessment task list, approve or offer', 'Funding progress and lender list', 'Auto-clearing, auto-disbursement, reconciliation']],
	['Lender', NAVY, ['Registers and tops up the wallet', 'Browses loans and batches by grade, tenure, rate', 'Reads the executive summary and factsheet', 'Funds single or batch with an OTP agreement', 'Repayments appear in Mutation and Portfolio']]
];
const ideas = ['No re-onboarding for a new facility', 'Show the cost before the commitment', 'One queue for what needs attention', 'Fund many loans in one approval', 'Every number has a period and a source'];
const cell = (text, bg, fg = t.body, weight = 600) =>
	`<div style="padding:14px 16px;border-radius:14px;background:${bg};font:${weight} 18px/1.3 Geist;color:${fg}">${text}</div>`;
const journey = slide(
	'journey',
	'One loan, three journeys',
	'The experience map that kept the three portals in step, stage by stage.',
	`<div class="abs" style="left:72px;right:72px;top:282px;bottom:44px;display:grid;grid-template-columns:170px repeat(5,minmax(0,1fr));grid-template-rows:auto repeat(3,1fr) auto;gap:10px">
		<div></div>${stages.map((s, i) => `<div style="padding:10px 4px;font:800 21px Geist;color:${t.ink}"><span class="mono" style="color:${t.muted};font-size:17px;margin-right:8px">0${i + 1}</span>${s}</div>`).join('')}
		${lanes
			.map(
				([name, color, cells]) =>
					`<div style="display:flex;align-items:center;gap:10px;font:800 21px Geist;color:${color}"><i style="width:12px;height:40px;border-radius:6px;background:${color}"></i>${name}</div>${cells.map((c) => cell(c, '#fff')).join('')}`
			)
			.join('')}
		<div style="display:flex;align-items:center;font:800 19px Geist;color:${AMBER}">Opportunity</div>${ideas.map((c) => cell(c, '#FFF1CC', '#5A3D00', 700)).join('')}
	</div>`
);

/* ── 05 Lender portal ── */
const module_ = (name, line, color = NAVY) =>
	`<div style="padding:11px 0;border-bottom:1px solid #E7E9F1"><div style="font:800 22px Geist;color:${color}">${name}</div><div style="margin-top:4px;font:500 19px/1.4 Geist;color:${t.body}">${line}</div></div>`;
const lender = slide(
	'lender',
	'Lender Portal',
	'Balance first, then the loans to fund, then what the money is doing.',
	grid(
		`${shot('lender-home', { col: 'span 7' })}
		${card(
			`${eyebrow('Modules')}
			${module_('Home', 'Balance with top up and withdrawal, funding limit, available loans and batches')}
			${module_('Loan detail &amp; funding', 'Executive summary and factsheet; fund an amount, then sign with OTP')}
			${module_('Portfolio', 'Funded loans by status: active, closed, written off, overdue')}
			${module_('Mutation', 'Every credit and debit in the wallet, by period, exportable')}
			<div style="margin-top:18px">${eyebrow('Product states', t.muted)}<div style="margin-top:10px;font:500 19px/1.4 Geist;color:${t.body}"><b>Batch funding on:</b> Home lists loan batches to select whole or loan by loan. <b>Off:</b> single loans only.</div></div>`,
			{ col: 'span 5', row: 'span 2' }
		)}
		${shot('lender-agreement', { col: 'span 7', pos: 'top center' })}`,
		{ rows: 2 }
	)
);

/* ── 06 Borrower portal ── */
const borrower = slide(
	'borrower',
	'Borrower Portal',
	'Register once, hold limits for several products, and apply in four clear steps.',
	grid(
		`${card(
			`${eyebrow('Modules', '#0E8F8E')}
			${module_('Registration', 'Choose a product, verify NIK or NIP; employer data prefills the account', '#0E8F8E')}
			${module_('Home', 'Remaining limit by product, payroll deductions, add a facility', '#0E8F8E')}
			${module_('Apply', 'Amount &amp; tenor → simulation → account &amp; documents → review &amp; sign', '#0E8F8E')}
			${module_('Loan detail', 'Repayment schedule, documents and an activity timeline', '#0E8F8E')}
			${module_('Settings', 'Bank accounts for disbursement, with a primary account', '#0E8F8E')}
			<div style="margin-top:16px">${chips(['Invoice Financing', 'PO Financing', 'Employee Loan', 'EWA'], { bg: '#DDF5F4', fg: '#0B5E5D', size: 17 })}</div>`,
			{ col: 'span 5', row: 'span 2' }
		)}
		${shot('borrower-products', { col: 'span 7' })}
		${shot('borrower-amount', { col: 'span 7' })}`,
		{ rows: 2 }
	)
);

/* ── 07 Back office: the four focus modules ── */
const boModule = (img, name, items, pos = '-26%') =>
	card(
		`<div style="position:absolute;left:0;top:0;bottom:0;width:56%;overflow:hidden;border-right:1px solid #E7E9F1;background:#fff"><img src="${src(img)}" style="position:absolute;left:${pos};top:-4%;width:175%;max-width:none;height:auto"></div>
		<div style="position:absolute;left:calc(56% + 26px);right:26px;top:26px">${eyebrow('Module', GREEN)}${h(name, 30)}${ticks(items, { color: GREEN, size: 19 })}</div>`,
		{ col: 'span 6', pad: '0' }
	);
const backoffice = slide(
	'backoffice',
	'Back Office: where loans are run',
	'Four modules carry the lifecycle; each one opens on a list and drills into a tabbed detail.',
	grid(
		`${boModule('backoffice-borrowers', 'Borrower', ['KYC and legal documents', 'Products and facilities held', 'Comments for the review trail'], '-26%')}
		${boModule('backoffice-loan-detail', 'Loan', ['Summary, fees and late fees', 'Repayment and lender list', 'Assessment tasks and history'], '-26%')}
		${boModule('backoffice-anchor-detail', 'Anchor', ['Employers behind EWA and employee loans', 'Payroll, billing and accrual rules', 'Four-step setup with review'], '-26%')}
		${boModule('backoffice-transactions', 'Transaction', ['Funding, disbursement and repayments', 'Escrow balance, start to end', 'Auto-clearing with manual fallback'], '-26%')}`,
		{ rows: 2 }
	)
);

/* ── 08 Rules as product + the other modules ── */
const rule = (k, v, note) =>
	`<div style="display:grid;grid-template-columns:200px 1fr;gap:16px;padding:11px 0;border-bottom:1px solid #E7E9F1"><div style="font:700 19px Geist;color:${t.muted}">${k}</div><div><div style="font:800 20px Geist;color:${t.ink}">${v}</div><div style="font:500 17px Geist;color:${t.muted};margin-top:2px">${note}</div></div></div>`;
const others = [
	['Leads', 'Prospects before onboarding'],
	['Lender', 'Lender accounts and funding'],
	['Collection', 'Overdue follow-up'],
	['Funding Insurance', 'Cover on funded loans'],
	['Product Config', 'Products, fees, limits'],
	['Workflow Configuration', 'Submission templates from legal rules'],
	['Role &amp; User Management', 'Who can see and approve what'],
	['Blacklist', 'Blocked identities'],
	['Workbench &amp; Tasks', 'Assigned review work'],
	['Partners', 'Channels and integrations']
];
const rules = slide(
	'rules',
	'Rules become product',
	'Legal, regulatory and partner rules are set once in the back office, then drive every loan.',
	grid(
		`${card(
			`${eyebrow('Anchor configuration', GREEN)}${h('Payroll-based loans run on a calendar', 26)}
			<div style="margin-top:10px">
			${rule('Payroll date', 'Every 25th of the month', 'Due date for every EWA and employee loan')}
			${rule('Billing cut-off', '1 day before payroll', 'Billing file sent to the anchor')}
			${rule('Accrual start', '5 days before payroll', 'Accrual resets and starts')}
			${rule('Data freshness', '3-day grace period', 'Anchor frozen if the whitelist is late')}
			</div>`,
			{ col: 'span 6', row: 'span 2' }
		)}
		${card(
			`${eyebrow('Transfers', GREEN)}${h('Retry, then hand over to a person', 26)}
			${p('3 immediate retries, then every 10 minutes for an hour; then manual fallback with a Slack alert. Every transfer is idempotent, so a success is never sent twice.', 20)}`,
			{ col: 'span 6' }
		)}
		${card(
			`${eyebrow('Also in the back office, by function', t.muted)}
			<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px 22px;margin-top:12px">${others
				.map(([k, v]) => `<div style="font:500 17px/1.3 Geist;color:${t.body}"><b style="font-weight:800;color:${t.ink}">${k}</b> · ${v}</div>`)
				.join('')}</div>`,
			{ col: 'span 6' }
		)}`,
		{ rows: 2 }
	)
);

/* ── 09 Metrics ── */
const metricCol = (who, color, items) =>
	card(
		`<div style="display:flex;align-items:center;gap:10px"><i style="width:14px;height:14px;border-radius:4px;background:${color}"></i>${eyebrow(who, color)}</div>
		${items
			.map(
				([k, v]) =>
					`<div style="padding:13px 0;border-bottom:1px solid #E7E9F1"><div style="font:800 21px Geist;color:${t.ink}">${k}</div><div style="font:500 18px/1.35 Geist;color:${t.muted};margin-top:3px">${v}</div></div>`
			)
			.join('')}`,
		{ col: 'span 4' }
	);
const metrics = slide(
	'metrics',
	'Metrics of the product',
	'One north star, with the signals each portal is accountable for.',
	grid(
		`${card(
			`<div style="display:flex;align-items:center;gap:30px;height:100%">
				<div style="flex:none">${eyebrow('North star', YEL === '#FFBD00' ? '#8A5A00' : YEL)}<div style="font:800 34px/1.1 Geist;letter-spacing:-.02em;color:${t.ink};margin-top:6px">Healthy funded volume</div></div>
				<div style="flex:1;font:500 21px/1.4 Geist;color:${t.body}">Loans that are funded, disbursed on time and repaid on schedule. Volume alone could grow while quality falls.</div>
				<div style="flex:none">${tag('Guardrail: overdue &amp; written-off share', '#FDE2E5', '#8F1D2B')}</div>
			</div>`,
			{ col: 'span 12', bg: '#FFF6DB', flat: true }
		)}
		${metricCol('Lender', NAVY, [['Funding conversion', 'Loan viewed → funded'], ['Time to fully fund', 'From listing to 100%'], ['Idle balance ratio', 'Wallet money not yet funded'], ['Repeat funding', 'Lenders who fund again']])}
		${metricCol('Borrower', '#0E8F8E', [['Activation rate', 'Registered → active limit'], ['Application completion', 'Started → submitted'], ['Time to disbursement', 'Submitted → money in bank'], ['On-time repayment', 'Instalments paid by due date']])}
		${metricCol('Operations', GREEN, [['Review turnaround', 'Time in each queue'], ['Auto-transfer success', 'Clearing and disbursement'], ['Manual fallback rate', 'Transfers needing a person'], ['Data freshness', 'Anchor whitelists on time']])}`,
		{ rows: '130px 1fr' }
	)
);

/* ── 10 Design system ── */
const swatch = (hex, name, fg = '#fff') =>
	`<div style="flex:1;height:118px;border-radius:16px;background:${hex};color:${fg};padding:14px;display:flex;flex-direction:column;justify-content:flex-end"><div style="font:800 18px Geist">${name}</div><div class="mono" style="font:600 15px 'Geist Mono';opacity:.85">${hex}</div></div>`;
const grade = (l, label, c, bg) =>
	`<span style="display:inline-flex;align-items:center;gap:8px;padding:6px 12px 6px 6px;border-radius:0 10px 0 0;background:${bg};color:${c};font:600 18px Geist"><b style="display:grid;place-items:center;width:28px;height:28px;border-radius:6px;background:${c};color:#fff;font:800 17px Geist">${l}</b>${label}</span>`;
const status = (label, c) =>
	`<span style="display:inline-flex;align-items:center;gap:8px;padding:6px 14px;border:1.5px solid ${c};border-radius:99px;color:${c};font:600 18px Geist"><i style="width:8px;height:8px;border-radius:50%;background:${c}"></i>${label}</span>`;
const system = slide(
	'design-system',
	'One design system, two surfaces',
	'The portals and the back office share tokens, but each keeps its own density and tone.',
	grid(
		`${card(
			`${eyebrow('Colour')}
			<div style="display:flex;gap:12px;margin-top:14px">${swatch(NAVY, 'Portal navy')}${swatch(YEL, 'Klik yellow', '#3A2A00')}${swatch('#0075BD', 'Klik blue')}${swatch(TEAL, 'Progress', '#033')}${swatch('#54AA76', 'Brand green')}${swatch('#F5F7FB', 'Ground', t.ink)}</div>`,
			{ col: 'span 8' }
		)}
		${card(
			`${eyebrow('Type')}
			<div style="font:600 44px/1 Geist;letter-spacing:-.01em;color:${NAVY};margin-top:14px;white-space:nowrap">IDR 200.000.000</div>
			<div style="margin-top:12px;font:500 19px/1.5 Geist;color:${t.body}">Geist · 12 to 48px · weights stop at 600</div>
			<div class="mono" style="font:600 19px 'Geist Mono';color:${t.muted};margin-top:4px">IF-INVF-100425-01-011</div>`,
			{ col: 'span 4' }
		)}
		${card(
			`${eyebrow('Risk grade, A to E')}
			<div style="display:flex;flex-wrap:wrap;gap:12px;margin-top:16px">${grade('A', 'Very low risk', '#2E8B57', '#E3F4EA')}${grade('B', 'Low risk', '#2F6FDB', '#E3ECFB')}${grade('C', 'Moderate risk', '#C27C00', '#FFF1D6')}${grade('D', 'High risk', '#D23C8C', '#FBE3F0')}${grade('E', 'Very high risk', ROSE, '#FDE2E5')}</div>
			<div style="margin-top:22px">${eyebrow('Loan status')}</div>
			<div style="display:flex;flex-wrap:wrap;gap:12px;margin-top:12px">${status('Active', '#2E8B57')}${status('Closed', PURPLE)}${status('Written Off', AMBER)}${status('Overdue', ROSE)}</div>`,
			{ col: 'span 6' }
		)}
		${card(
			`${eyebrow('Components')}
			<div style="margin-top:14px;border-radius:12px;box-shadow:0 0 0 1px #E7E9F1;padding:18px 20px">
				<div style="display:flex;justify-content:space-between;align-items:center"><div><div class="mono" style="font:600 15px 'Geist Mono';color:${t.muted}">AGP</div><div style="font:600 22px Geist;color:${t.ink}">Invoice Financing - Agro Pangan</div></div>${grade('B', 'Low risk', '#2F6FDB', '#E3ECFB')}</div>
				<div style="display:flex;justify-content:space-between;margin-top:14px;padding:10px 14px;border-radius:6px;background:linear-gradient(90deg,#F1F1F1,#fff)"><span style="font:500 18px Geist;color:${t.muted}">Funding Amount</span><b style="font:600 22px Geist;color:${NAVY}">IDR 96.001.333</b></div>
				<div style="height:8px;border-radius:4px;background:#F1F1F1;margin-top:16px"><div style="width:58%;height:100%;border-radius:4px;background:${TEAL}"></div></div>
				<div style="display:flex;justify-content:space-between;margin-top:8px;font:500 17px Geist;color:${t.muted}"><span>Repayment Progress</span><span style="color:${t.ink}">7/12 month</span></div>
			</div>`,
			{ col: 'span 6' }
		)}
		${card(
			`<div style="display:flex;gap:26px;align-items:center;height:100%">
				<div style="flex:1">${eyebrow('Portals')}<div style="font:600 20px/1.4 Geist;color:${t.body};margin-top:6px">Geist, navy primary, 4 and 8px radii, white cards on a pale blue-grey ground</div></div>
				<div style="flex:1">${eyebrow('Back office', GREEN)}<div style="font:600 20px/1.4 Inter,Geist;color:${t.body};margin-top:6px">Inter at 11–14px, brand green primary, 2px radii, dense tables</div></div>
			</div>`,
			{ col: 'span 12' }
		)}`,
		{ rows: '190px 1fr 120px' }
	)
);

/* ── 11 Design values & proportion ── */
const values = slide(
	'values',
	'Design values and proportion',
	'Four rules kept every screen honest, on a grid built for dense financial data.',
	grid(
		`${card(
			`${eyebrow('Design values')}
			${numbered(
				[
					'<b>Lead with the decision.</b> Balance and limits come before analytics.',
					'<b>Every number explains itself:</b> its period, source and calculation.',
					'<b>One accent per component.</b> Colour carries status, never decoration.',
					'<b>Show the rule where it applies:</b> cut-offs, fees and OTP steps in context.'
				],
				{ size: 21 }
			)}`,
			{ col: 'span 6', row: 'span 2' }
		)}
		${card(
			`${eyebrow('Layout at 1440')}
			<div style="position:relative;height:150px;margin-top:14px;border-radius:10px;background:#fff;box-shadow:0 0 0 1px #E7E9F1;overflow:hidden">
				<div style="height:30px;background:${NAVY};display:flex;align-items:center;padding:0 12px;font:700 13px Geist;color:#fff">56px nav</div>
				<div style="height:44px;background:${NAVY};opacity:.85"></div>
				<div style="position:absolute;left:0;top:74px;bottom:0;width:22px;background:repeating-linear-gradient(45deg,#FFE8A3 0 6px,#FFF6DB 6px 12px)"></div>
				<div style="position:absolute;right:0;top:74px;bottom:0;width:22px;background:repeating-linear-gradient(45deg,#FFE8A3 0 6px,#FFF6DB 6px 12px)"></div>
				<div style="position:absolute;left:34px;right:34px;top:90px;bottom:14px;display:grid;grid-template-columns:repeat(3,1fr);gap:12px">${'<div style="border-radius:6px;box-shadow:0 0 0 1px #C9D3EA;background:#F5F7FB"></div>'.repeat(3)}</div>
			</div>
			<div style="margin-top:12px;font:600 19px/1.4 Geist;color:${t.body}">40px gutters, a 3-column loan grid, full-bleed navy band. The back office is denser, at 1180.</div>`,
			{ col: 'span 6' }
		)}
		${card(
			`${eyebrow('Spacing and radius')}
			<div style="display:flex;align-items:flex-end;gap:14px;margin-top:18px;height:70px">${[2, 4, 8, 12, 16, 24, 32, 40]
				.map((s) => `<div style="text-align:center"><div style="width:${s * 1.4}px;height:${s * 1.4}px;background:${NAVY};border-radius:3px;margin:0 auto"></div><div class="mono" style="font:600 15px 'Geist Mono';color:${t.muted};margin-top:6px">${s}</div></div>`)
				.join('')}</div>
			<div style="margin-top:14px;font:600 19px/1.4 Geist;color:${t.body}">Radius 2 for back-office controls, 4 for portal controls, 8 for cards, 16 for pills.</div>`,
			{ col: 'span 6' }
		)}`,
		{ rows: 2 }
	)
);

/* ── 12 Product value ── */
const valueCol = (who, color, headline, items) =>
	card(
		`<div style="display:flex;align-items:center;gap:10px"><i style="width:14px;height:14px;border-radius:4px;background:${color}"></i>${eyebrow(who, color)}</div>
		<div style="font:800 34px/1.1 Geist;letter-spacing:-.02em;color:${t.ink};margin-top:12px">${headline}</div>
		${ticks(items, { color, size: 20 })}`,
		{ col: 'span 4' }
	);
const value = slide(
	'value',
	'Product value',
	'What each side gets, and why the platform is worth more than three separate tools.',
	grid(
		`${valueCol('For lenders', NAVY, 'Fund with clarity', ['Balance, funded total and returns at a glance', 'Batch funding: many loans, one approval', 'Status-based portfolio and a full mutation trail'])}
		${valueCol('For borrowers', '#0E8F8E', 'Credit without the runaround', ['Four products from one profile', 'Cost shown in a simulation before signing', 'A timeline from submission to disbursement'])}
		${valueCol('For KlikA2C', GREEN, 'Operations that scale', ['Partner rules configured, not hard-coded', 'Automated clearing and disbursement', 'Compliance steps (KYC, OTP, agreements) built in'])}
		${card(
			`<div style="display:flex;align-items:center;gap:26px;height:100%"><div style="flex:none;font:800 30px Geist;color:#fff">One lifecycle, one language.</div><div style="flex:1;font:500 21px/1.4 Geist;color:#D9E2F5">The same loan, status and number mean the same thing to the lender, the borrower and the analyst.</div></div>`,
			{ col: 'span 12', bg: NAVY, flat: true }
		)}`,
		{ rows: '1fr 130px' }
	)
);


/* ── Screen anatomy: a real screen with numbered pins, and what each one is for ── */
const pin = (no, x, y, color) =>
	`<span style="position:absolute;left:${x}%;top:${y}%;transform:translate(-50%,-50%);width:42px;height:42px;border-radius:50%;background:${color};color:#fff;display:grid;place-items:center;font:800 20px Geist;box-shadow:0 0 0 4px #fff,0 10px 22px -6px rgba(0,0,0,.45)">${no}</span>`;
const anatomy = (name, title, lede, img, notes, color = NAVY) =>
	slide(
		name,
		title,
		lede,
		`<div class="abs" style="left:72px;top:282px;width:976px;aspect-ratio:16/10;border-radius:20px;overflow:hidden;background:#fff;box-shadow:0 0 0 1px #E7E9F1,0 30px 60px -36px rgba(31,41,55,.5)">
			<img src="${src(img)}" style="display:block;width:100%;height:100%;object-fit:cover">
			${notes.map(([x, y], i) => pin(i + 1, x, y, color)).join('')}
		</div>
		<div class="abs" style="left:1080px;right:72px;top:282px;bottom:44px;display:flex;flex-direction:column;justify-content:space-between">
			${notes
				.map(
					([, , head, body], i) =>
						`<div style="display:flex;gap:14px;align-items:flex-start"><span style="flex:none;width:34px;height:34px;border-radius:50%;background:${color};color:#fff;display:grid;place-items:center;font:800 17px Geist">${i + 1}</span><div><div style="font:800 20px/1.2 Geist;color:${t.ink}">${head}</div><div style="margin-top:3px;font:500 17px/1.35 Geist;color:${t.body}">${body}</div></div></div>`
				)
				.join('')}
		</div>`
	);
const TEALD = '#0E8F8E';

const aLenderHome = anatomy('anatomy-lender-home', 'Lender Home, piece by piece', 'The first screen answers the lender’s first question: how much can I put to work?', 'lender-home', [
	[29, 15, 'Balance, timestamped', 'Real-time balance with its last update, so the number is never ambiguous.'],
	[76, 16, 'Money in and out', 'Top Up and Withdrawal sit beside the balance they change.'],
	[22, 31, 'All-time performance', 'Total funded, interest received and return, labelled as all-time.'],
	[73.5, 41, 'Shortcut to funded loans', 'The count of funded loans links straight to Portfolio.'],
	[72, 52, 'Funding limit', 'How much of the limit is used, before the lender picks a loan.'],
	[40, 69, 'Batch funding', 'Select a whole batch or open it to choose loans one by one.']
]);
const aAgreement = anatomy('anatomy-agreement', 'Funding, signed properly', 'OJK requires lenders to read the agreement and confirm by OTP; the design makes that a clear step, not fine print.', 'lender-agreement', [
	[6, 14, 'Why this step exists', 'A plain note explains the regulation before anything is asked.'],
	[3, 30, 'What you are signing for', 'Amount, loan number, grade, interest, return, tenure, expiry.'],
	[88, 24, 'The agreement itself', 'The full contract, generated with both parties and the loan terms.'],
	[82, 62, 'Scroll to continue', 'A prompt to read to the end; Approve unlocks only after scrolling.'],
	[60, 71, 'OTP by channel', 'Choose SMS or another channel, then enter the code.'],
	[83, 88, 'Approve, last', 'Disabled until the agreement is read, the OTP entered and the box ticked.']
]);
const aPortfolio = anatomy('anatomy-portfolio', 'Portfolio: where the money is now', 'Funded loans grouped by status, each card showing grade, amount and progress.', 'lender-portfolio', [
	[57, 14, 'Outstanding and profit', 'Principal not yet repaid, and total interest earned.'],
	[22, 27, 'Four status buckets', 'Active, closed, written off and overdue, each with its count and amount.'],
	[90, 52, 'Risk grade', 'An A to E grade tag on every card, coloured by risk.'],
	[30, 61, 'Status and loan number', 'One hue per status; the loan number in mono for reference.'],
	[25, 74, 'Repayment progress', 'Months repaid of the total, with the next payment date.']
]);
const aMutation = anatomy('anatomy-mutation', 'Mutation: every rupiah accounted for', 'A wallet statement that reconciles: opening balance, credits, debits and closing balance.', 'lender-mutation', [
	[22, 27, 'The period in four numbers', 'Beginning balance, total credit, total debit, ending balance.'],
	[70, 13, 'Balance now', 'The real-time balance, with top up and withdrawal at hand.'],
	[66, 41, 'Period and export', 'Today, this month, last 3 months or custom; export for records.'],
	[13, 55, 'What each line is', 'Repayment, funding or withdrawal, with the loan number.'],
	[82, 55, 'Signed amounts, running balance', 'Credits in green, debits in red, and the balance after each.']
]);
const aRegister = anatomy('anatomy-register', 'Registration that knows the employer', 'For EWA and employee loans, the employer (anchor) has already sent the employee’s data.', 'borrower-register', [
	[35, 22, 'Product and employer', 'The account is created for one product and one anchor.'],
	[65, 40, 'Locked user type', 'Individual only for payroll products, with the reason below.'],
	[66, 61, 'Prefilled identity', 'The name comes from the employer’s data and cannot be edited.'],
	[69, 72, 'Verify each channel', 'Masked email and phone, each confirmed with its own OTP.'],
	[27, 77, 'Keep or change', 'The contact on file can be kept or replaced before the OTP.']
], TEALD);
const aAmount = anatomy('anatomy-apply', 'Apply, step one: amount and tenor', 'Four steps on the left, the limit on top, and the cost of each choice shown as you make it.', 'borrower-amount', [
	[3, 21, 'Where you are', 'Amount & tenor, simulation, account & documents, review & sign.'],
	[3, 45, 'How this product works', 'Bullet repayment explained in one line, beside the form.'],
	[55, 27, 'Limit in context', 'Available limit, how much is used, and that it revolves.'],
	[60, 42, 'Amount, three ways', 'Drag, tap 25–75% or max, or type the exact figure.'],
	[33, 67, 'Tenor as choices', '30, 60 or 90 days: no free typing, no invalid terms.'],
	[57, 73, 'Product-specific fields', 'Invoice number, payor and due dates only for invoice financing.']
], TEALD);
const aSimulation = anatomy('anatomy-simulation', 'Apply, step two: the cost before the commitment', 'The repayment is simulated before any document is uploaded.', 'borrower-simulation', [
	[6, 20, 'Progress kept', 'Completed steps are ticked; the current one is highlighted.'],
	[40, 25, 'Limit stays visible', 'The available limit stays on screen through every step.'],
	[50, 41, 'One bullet repayment', 'Due date, principal and interest on a single line.'],
	[62, 52, 'Totals in plain terms', 'Total repayment, total interest and the due date.'],
	[28, 61, 'Who collects', 'For payroll products: which employer deducts, and when.'],
	[58, 69, 'Back or continue', 'Equal-width actions; nothing is submitted yet.']
], TEALD);
const aLoan = anatomy('anatomy-borrower-loan', 'A loan the borrower can follow', 'Everything about one loan: what is owed, the schedule and where it has been.', 'borrower-loan-detail', [
	[91, 18, 'Repay from here', 'The main action sits with the loan it belongs to.'],
	[22, 29, 'What is owed', 'Disbursed, total repayment and outstanding amount.'],
	[70, 30, 'Terms in one place', 'Product, tenor, rate, fees, dates, employer and repayment source.'],
	[40, 49, 'See the calculation', 'A breakdown of how each instalment is calculated.'],
	[25, 72, 'Schedule with status', 'Each instalment: paid by payroll deduction, next, or scheduled.'],
	[82, 70, 'Timeline of activities', 'From submission and HR endorsement to disbursement.']
], TEALD);
const aBoLoan = anatomy('anatomy-bo-loan', 'Back Office: one loan, every angle', 'A fixed summary on the left; tabs for everything an analyst needs to decide.', 'backoffice-loan-detail', [
	[16, 19, 'Status first', 'Under review, offered, active: the pill leads the page.'],
	[55, 14, 'Six tabs', 'Summary, repayment, lender list, assessment, history, comments.'],
	[55, 25, 'Loan summary', 'Amount, calculation, interest and disbursement details.'],
	[55, 47, 'Admin fee', 'Method, calculation and rate, as configured for the product.'],
	[55, 66, 'Late fee', 'The penalty rule that applies if a payment is missed.'],
	[15.5, 52, 'Who the borrower is', 'Borrower ID, name and contact, one click from their record.']
], GREEN);
const aBoTxn = anatomy('anatomy-bo-transactions', 'Back Office: watching the money move', 'Finance sees the whole flow, and only the exceptions need a person.', 'backoffice-transactions', [
	[45, 16, 'The flow in four totals', 'Funding from lenders, disbursement, repayment in, repayment out.'],
	[60, 38, 'Escrow balance', 'Start, end and current balance of the KlikA2C escrow.'],
	[55, 72, 'Automation switches', 'Auto-clearing and auto-disbursement, each on or off.'],
	[30, 75, 'Today at a glance', 'Succeeded, retrying now, and manual fallback counts.'],
	[45, 82, 'Retry policy, stated', 'Retries, timing and the hand-over to a person, in plain words.'],
	[31, 93, 'Transaction list', 'All, clearing, disbursement and manual repayment queues.']
], GREEN);

/* ── Design decisions: what we chose, and why ── */
/** One whole component from a 1440×900 screen, scaled to fit the frame (never cut mid-text). */
const crop = (img, [x, y, w, h], height = 270) =>
	`<div style="height:${height}px;display:grid;place-items:center;overflow:hidden;border-radius:16px;background:#fff;box-shadow:0 0 0 1px #E7E9F1"><div style="position:relative;width:100%;aspect-ratio:${w}/${h};overflow:hidden"><img src="${src(img)}" style="position:absolute;max-width:none;width:${(1440 / w) * 100}%;left:${(-x / w) * 100}%;top:${(-y / h) * 100}%"></div></div>`;
const row = (label, text, color) =>
	`<div style="display:grid;grid-template-columns:118px 1fr;gap:14px;padding:9px 0;border-top:1px solid #E7E9F1"><div style="font:800 15px Geist;letter-spacing:.08em;text-transform:uppercase;color:${color};padding-top:3px">${label}</div><div style="font:500 18px/1.4 Geist;color:${t.body}">${text}</div></div>`;
/** A decision record: the screen it shaped, then problem → decision → why → trade-off. */
const decision = (no, img, region, title, { problem, decision: what, why, cost }, color) =>
	card(
		`${crop(img, region)}
		<div style="display:flex;align-items:baseline;gap:14px;margin:20px 0 8px">
			<span style="font:800 30px 'Geist Mono';color:${color}">${String(no).padStart(2, '0')}</span>
			<span style="font:800 27px/1.15 Geist;letter-spacing:-.015em;color:${t.ink}">${title}</span>
		</div>
		${row('Problem', problem, ROSE)}
		${row('Decision', what, color)}
		${row('Why', why, color)}
		${row('Trade-off', cost, AMBER)}`,
		{ col: 'span 6', pad: '22px 24px 18px' }
	);
const decisionSlide = (name, title, lede, a, b) => slide(name, title, lede, grid(`${a}${b}`, { top: 270, rows: 1 }));

const decisions1 = decisionSlide(
	'decisions-1',
	'Lead with what lenders can act on',
	'Two choices that turned the lender’s home from a report into a starting point.',
	decision(1, 'lender-home', [20, 85, 720, 300], 'Balance before analytics', {
		problem: 'The old dashboard opened on dense metrics, and charts went blank when a data source had no value.',
		decision: 'Home leads with the balance, top up and withdrawal, then all-time performance. Analytics move to Portfolio.',
		why: 'A lender’s first question is how much they can put to work, not how last quarter looked.',
		cost: 'Fewer charts on Home; the deeper view is one click away in Portfolio.'
	}, NAVY),
	decision(2, 'lender-home', [40, 590, 720, 300], 'Batch funding as a mode', {
		problem: 'Lenders funding many loans had to repeat the same steps, and the same OTP, loan by loan.',
		decision: 'Loans are grouped into batches: select a whole batch, or open it and pick loans, then sign once.',
		why: 'One selection, one agreement, one OTP for a whole decision.',
		cost: 'A batch hides per-loan detail until opened, so single-loan mode stays available.'
	}, NAVY)
);
const decisions2 = decisionSlide(
	'decisions-2',
	'Make every money movement provable',
	'Consent and reconciliation are where trust is won or lost in lending.',
	decision(3, 'lender-agreement', [430, 560, 910, 330], 'Approve unlocks at the end', {
		problem: 'A long agreement is easy to skip, and OJK requires lenders to read it and confirm.',
		decision: 'Approve stays disabled until the agreement is scrolled to the end, the OTP is entered and consent is ticked.',
		why: 'Informed consent becomes a visible step, not fine print.',
		cost: 'One more moment for experienced lenders, kept short with a remembered OTP channel.'
	}, NAVY),
	decision(4, 'lender-mutation', [20, 220, 800, 330], 'Statements that reconcile', {
		problem: 'A list of transactions doesn’t tell a lender whether their wallet adds up.',
		decision: 'Each period opens with beginning balance, credits, debits and ending balance; every line shows a signed amount and the running balance.',
		why: 'Opening + credits − debits = closing, so lenders can check the maths themselves.',
		cost: 'A denser table, kept manageable with period filters and export.'
	}, NAVY)
);
const decisions3 = decisionSlide(
	'decisions-3',
	'Never make borrowers repeat themselves',
	'Borrowers bring what the platform doesn’t know yet, and nothing it already does.',
	decision(5, 'borrower-register', [460, 500, 540, 230], 'Employer data, locked', {
		problem: 'For payroll loans, any mismatch with the employer’s records stops the loan later.',
		decision: 'Name and user type come from the anchor and are locked; email and phone are kept or changed, then verified by OTP.',
		why: 'The employer is the source of truth for payroll products.',
		cost: 'Less freedom to edit; corrections go through the employer’s data upload.'
	}, TEALD),
	decision(6, 'borrower-simulation', [340, 290, 1040, 300], 'Simulation before documents', {
		problem: 'Asking for documents before showing the cost makes people commit effort to a loan they may not want.',
		decision: 'Step two simulates the repayment: principal, interest, total and due date, before any upload.',
		why: 'Show the cost before asking for effort.',
		cost: 'One extra step, which is short and reversible.'
	}, TEALD)
);
const decisions4 = decisionSlide(
	'decisions-4',
	'Let exceptions find the analyst',
	'The back office should surface what needs a person, and handle the rest.',
	decision(7, 'backoffice-loan-detail', [570, 90, 860, 340], 'List, then tabbed detail', {
		problem: 'More than a dozen modules risked a dozen different layouts to learn.',
		decision: 'Every module opens on a searchable list and drills into a fixed summary with tabs for the detail.',
		why: 'Analysts scan many records, then go deep on one. One pattern, learned once.',
		cost: 'A uniform pattern can feel heavy for simple records.'
	}, GREEN),
	decision(8, 'backoffice-transactions', [250, 550, 880, 300], 'Automate, then hand over', {
		problem: 'A failed transfer is someone’s money in limbo, and it shouldn’t be found by a customer.',
		decision: 'Auto-clearing and auto-disbursement retry on a stated policy, then fall back to a manual queue with a Slack alert.',
		why: 'Exceptions find people; idempotency means a success is never sent twice.',
		cost: 'The manual queue needs clear ownership in operations.'
	}, GREEN)
);

const order = [
	platform, process, personas, journey, values,
	lender, aLenderHome, aAgreement, aPortfolio, aMutation,
	borrower, aRegister, aAmount, aSimulation, aLoan,
	backoffice, aBoLoan, aBoTxn, rules,
	decisions1, decisions2, decisions3, decisions4,
	metrics, system, value
];
export const klika2c = order.map((s, i) => ({
	...base,
	name: s.name,
	css,
	html: frame(t, { n: i + 1, total: order.length, title: s.title, lede: s.lede, content: s.content })
}));
