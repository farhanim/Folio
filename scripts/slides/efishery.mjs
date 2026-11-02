// eFishery case-study slides (FAQ, Marketing tech, Enterprise payment, CRM AR/AP).
// Content is transcribed from each deck; layouts use the shared grid blocks.
import { blocks, frame, slideCss } from './kit.mjs';

const GREEN = '#1F8A66';
const DEEP = '#0E2F24';
const LEMON = '#FFE36E';
const BLUE = '#3A6FD8';
const RED = '#D9483B';
const theme = (project) => ({
	font: 'Figtree',
	bg: '#F3F8F5',
	ink: DEEP,
	body: '#2B4238',
	muted: '#5A7268',
	accent: GREEN,
	soft: '#E2F1EA',
	shadow: 'rgba(14,47,36,.28)',
	logo: 'images/clients/efishery.webp',
	project: `eFishery · ${project}`
});
const fonts = ['Figtree:wght@500;600;700;800;900'];

/** Build a deck: each slide is { name, title, lede, body(b) } → render entries. */
const deck = (slug, dir, project, slides) => {
	const t = theme(project);
	const b = blocks(t);
	const css = slideCss(t);
	return slides.map((s, i) => ({
		slug,
		dir,
		name: s.name,
		fonts,
		css,
		html: frame(t, { n: i + 1, total: slides.length, title: s.title, lede: s.lede, content: s.body(b, t) })
	}));
};

/* A phone-like screen drawn inside a card: header, then rows. */
const screen = (title, rows, { accent = GREEN, foot = '' } = {}) => `
	<div style="border-radius:22px;border:3px solid #DCE8E2;overflow:hidden;background:#fff;height:100%">
		<div style="padding:14px 18px;background:${accent};color:#fff;font:800 19px Figtree">${title}</div>
		<div style="padding:4px 18px">${rows.map((r) => `<div style="display:flex;justify-content:space-between;gap:10px;padding:11px 0;border-bottom:2px solid #EEF3F0;font:600 16px/1.3 Figtree;color:#24382f"><span>${r}</span><span style="color:${accent}">›</span></div>`).join('')}</div>
		${foot}
	</div>`;

/* ── FAQ as Level 0 ── */
const faq = deck('efishery-faq', 'efishery-faq', 'FAQ as Level 0', [
	{
		name: 'context',
		title: 'Why tickets kept piling up',
		lede: 'Situation, complication and aim, and the support flow the product team mapped.',
		body: (b) =>
			b.grid(
				[
					['Situation', 'Farmers must submit a report for every issue, and the Level 1 team struggles to reach the data quickly.'],
					['Complication', 'Many questions are common and could be answered upfront. With Odoo 17 and Mega in flight, was self-service still relevant?'],
					['Aim', 'Faster, lighter support: better data access, answers before tickets, less load on the team.']
				]
					.map(([e, p], i) => b.card(b.eyebrow(e, [BLUE, RED, GREEN][i]) + b.p(p, 22), { col: 'span 4' }))
					.join('') +
					b.card(
						b.eyebrow('Existing support flow') +
							b.flow(['Farmer hits a problem', 'Opens “Bantuan” in eFisheryKu', 'Submits a complaint ticket', 'Lv 1 · CS from CRM', 'Lv 2 · product owner', 'Ticket closed']) +
							b.p('Slow reports and hard-to-reach data delay every case, while many questions could be answered before a ticket exists.', 21),
						{ col: 'span 12' }
					)
			)
	},
	{
		name: 'problem',
		title: 'Volume up, resolution down',
		lede: 'Monthly complaints, on-time resolution, and what it cost in retained farmers (2024).',
		body: (b) =>
			b.grid(
				b.card(
					b.eyebrow('Monthly Level-1 complaints · Feb–Oct') +
						b.vbars(
							[['Feb', 31], ['Mar', 37], ['Apr', 221], ['May', 342], ['Jun', 264], ['Jul', 293], ['Aug', 488], ['Sep', 671], ['Oct', 452]].map(([m, v]) => [m, v, v]),
							{ hl: [7], height: 400, color: RED }
						),
					{ col: 'span 7', row: 'span 2' }
				) +
					b.card(
						b.eyebrow('On-time resolution · Jun–Nov') +
							b.vbars(
								[['Jun', 86.32], ['Jul', 87.66], ['Aug', 83.61], ['Sep', 76.22], ['Oct', 71.16], ['Nov', 77.82]].map(([m, v]) => [m, `${v}%`, v - 60]),
								{ hl: [4], height: 120, color: RED }
							),
						{ col: 'span 5' }
					) +
					b.card(
						`<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:18px"><div>${b.big('671', 'complaints in Sep, from 31 in Feb', RED, 58)}</div><div>${b.big('71%', 'on time in Oct, from 87.66%', RED, 58)}</div><div>${b.big('1 day', 'target the team was missing', GREEN, 58)}</div></div>`,
						{ col: 'span 5' }
					)
			)
	},
	{
		name: 'ngram',
		title: 'Finding the questions with N-grams',
		lede: 'Free-text complaints analysed in three passes with the data team.',
		body: (b) =>
			b.grid(
				[
					['Level 1 · single words', [['tani', '4,680', 4680], ['order', '3,675', 3675], ['pakan', '2,564', 2564], ['kabayan', '2,049', 2049], ['member', '1,783', 1783]]],
					['Level 2 · word pairs', [['member member', '900', 900], ['cancel order', '691', 691], ['member keluh', '564', 564], ['sales diary', '504', 504], ['order pakan', '447', 447]]],
					['Level 3 · + category', [['ganti nomor', '268', 268], ['nomor ganti', '160', 160], ['nomor tani', '141', 141], ['aplikasi', '113', 113], ['kontak darurat', '80', 80]]]
				]
					.map(([e, items], i) => b.card(b.eyebrow(e) + b.hbars(items, { color: [BLUE, BLUE, GREEN][i], hl: i === 2 ? [0] : [] }), { col: 'span 4' }))
					.join('') +
					b.card(
						b.eyebrow('How it reads') +
							b.numbered(['Top words are visible, but their meaning stays vague.', 'Pairs add clarity, with some redundancy.', 'Adding the category shows the real issues: changing a phone number, the app, emergency contacts.']),
						{ col: 'span 8' }
					) +
					b.card(b.eyebrow('Then', LEMON) + b.h('CS workshops turn top phrases into FAQ themes', 27, '#fff') + b.p('The PM writes the answers; design and engineering ship them into eFisheryKu.', 21, '#CFE4DA'), { col: 'span 4', bg: DEEP })
			)
	},
	{
		name: 'solution',
		title: 'FAQ as Level 0',
		lede: 'Show most of the FAQ before any contact option, and let every funnel help first.',
		body: (b) =>
			b.grid(
				[
					['Bantuan', ['Pertanyaan teratas', 'Akun', 'Gangguan aplikasi', 'Toko budidaya', 'Kabayan']],
					['Pertanyaan teratas', ['Kenapa saya ga bisa login?', 'Tidak bisa daftar kabayan', 'Dimana menu promo', 'Cara tarik ikan']],
					['Artikel', ['Biaya perjalanan saya tidak muncul', 'Apakah ini membantu? 👍 👎']],
					['Detail Transaksi', ['Total Belanja Rp2.150.000', 'Biaya Admin Rp20.000', 'Total Bayar Rp2.090.000']]
				]
					.map(([h, rows], i) =>
						b.card(
							`<div style="font:800 17px Figtree;letter-spacing:.08em;text-transform:uppercase;color:${GREEN};margin-bottom:10px">${['Landing page', 'Topic', 'Article', 'Entry in funnel'][i]}</div>` +
								screen(h, rows, {
									foot: i === 3 ? `<div style="margin:14px 18px;padding:12px;border-radius:12px;border:2px solid ${GREEN};text-align:center;font:800 17px Figtree;color:${GREEN}">Butuh Bantuan?</div>` : i === 0 ? '' : `<div style="margin:14px 18px;font:700 15px Figtree;color:#6b7c75">Butuh bantuan lebih lanjut? <b style="color:${GREEN}">Chat</b></div>`
								}),
							{ col: 'span 3', pad: '22px', style: 'display:flex;flex-direction:column' }
						)
					)
					.join('') +
					b.card(
						`<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:26px">${[
							['Learnability', 'Minimal cognitive load'],
							['Clarity', 'Distinct, easy-to-spot elements'],
							['Visibility', 'Help and rating always within reach']
						]
							.map(([h, p]) => `<div>${b.eyebrow('Principle')}${b.h(h, 30)}${b.p(p)}</div>`)
							.join('')}</div>`,
						{ col: 'span 8' }
					) +
					b.card(b.eyebrow('Problem before', RED) + b.p('“Submit a complaint” sat on every help screen as the most prominent option, so it became the default.', 22, DEEP), { col: 'span 4', bg: '#FDECEA' }),
				{ rows: '1.7fr 1fr' }
			)
	}
]);

/* ── Marketing tech & growth ── */
const martech = deck('martech-crm', 'martech-crm', 'Marketing Tech & Growth', [
	{
		name: 'voice',
		title: 'Voice of the internal customer',
		lede: '2.5M+ fish farmers, 800+ field staff, and marketers running campaigns from spreadsheets.',
		body: (b) =>
			b.grid(
				[
					['Campaign lead', 'Can’t give app users certain nudges', 'Measuring impact takes a long time'],
					['Promo lead', 'Promo budgets easily go over limit', 'Personalised promos happen outside the system'],
					['Growth', 'O2O journeys coordinated in Google Sheets', 'Personalising means BI queries + manual imports'],
					['Telesales', 'Lead data doesn’t fit the team’s needs', 'Sheet results don’t integrate with other systems']
				]
					.map(([who, a, c]) => b.card(b.eyebrow(who) + `<div style="display:grid;gap:14px;margin-top:14px">${[a, c].map((q) => `<div style="padding:14px 16px;border-radius:16px;background:#E2F1EA;font:700 19px/1.35 Figtree;color:${DEEP}">“${q}”</div>`).join('')}</div>`, { col: 'span 3' }))
					.join('') +
					b.card(
						b.eyebrow('Jobs to be done → product bets') +
							`<div style="display:grid;grid-template-columns:repeat(5,1fr);gap:14px;margin-top:18px">${[
								['Managing campaigns', 'Better campaign UX'],
								['Segmenting customers', 'Self-segmentation'],
								['Tracking engagement', 'Engagement management'],
								['Promotion', 'Promotion management'],
								['Customer voice', '2-way communication']
							]
								.map(([j, p]) => `<div><div style="padding:14px;border-radius:14px;background:#E2F1EA;font:700 19px/1.3 Figtree;color:${DEEP}">${j}</div><div style="text-align:center;font:900 24px Figtree;color:${GREEN};margin:4px 0">↓</div><div style="padding:14px;border-radius:14px;background:${GREEN};font:800 19px/1.3 Figtree;color:#fff">${p}</div></div>`)
								.join('')}</div>`,
						{ col: 'span 12' }
					),
				{ rows: '1.1fr 1fr' }
			)
	},
	{
		name: 'journey',
		title: 'CRM-enabled O2O journey',
		lede: 'Who handles each farmer next, a campaign, telesales or a field visit, decided by behaviour.',
		body: (b) =>
			b.grid(
				[
					['Acquisition', ['Digital activation · 14-day campaign', 'Telesales · 3× calls', 'Field BD · visit'], 'No transaction in 14 days → next channel', BLUE],
					['Retention', ['Digital activation · 21-day campaign', 'Telesales by tech-savviness score · 3× calls', 'Field BD · visit'], 'Score 3–4 → growth telesales · 1–2 → channel telesales', GREEN],
					['Churn', ['No transaction for 200+ days', 'Field BD · visit', 'Any app transaction → back to digital retention'], 'One journey replaces spreadsheet hand-offs between teams', RED]
				]
					.map(([lane, steps, rule, c]) =>
						b.card(
							`<div style="display:grid;grid-template-columns:220px 1fr;gap:24px;align-items:center;height:100%"><div><div style="font:900 32px Figtree;color:${c}">${lane}</div><div style="font:600 18px/1.35 Figtree;color:#5A7268;margin-top:6px">${rule}</div></div>${b.flow(steps, { color: c, size: 20 })}</div>`,
							{ col: 'span 12', style: `border-left:10px solid ${c}` }
						)
					)
					.join(''),
				{ rows: 3 }
			)
	},
	{
		name: 'roadmap',
		title: 'Product universe & roadmap',
		lede: 'Enablement → customer-data enhancement → predictive, across Q2–Q4 2023.',
		body: (b) =>
			b.grid(
				[
					['Q2 · Enablement', ['Route Management Planning for field sales', 'CleverTap as omnichannel platform', 'Centralised promotion services', 'Telesales tools', 'Self segmentation']],
					['Q3 · CDP enhancement', ['Route recommendations from a DS model', '100% omnichannel use', 'Promo services for all BUs', 'CRM × telecom integration', 'Unified interaction history']],
					['Q4 · Predictive', ['Interconnected marketing platforms', 'Product–customer mapping with predictive analytics']]
				]
					.map(([q, items], i) => b.card(b.eyebrow(q, [BLUE, GREEN, '#B07C00'][i]) + b.ticks(items, { color: [BLUE, GREEN, '#E0A800'][i], size: 20 }), { col: 'span 4' }))
					.join('') +
					[
						['Customer experience', '2-way telecommunication to reach customers'],
						['Engagement', 'Engage digitally and measure performance'],
						['Promotion system', 'Scalable, personalised promos across BU platforms']
					]
						.map(([h, p]) => b.card(b.eyebrow('Universe', LEMON) + b.h(h, 28, '#fff') + b.p(p, 20, '#CFE4DA'), { col: 'span 4', bg: DEEP }))
						.join(''),
				{ rows: '1.6fr 1fr' }
			)
	},
	{
		name: 'impact',
		title: 'The products & their impact',
		lede: 'Self-segmentation in the CRM, budget limits in the promo engine, and the numbers after launch.',
		body: (b) =>
			b.grid(
				b.card(
					b.eyebrow('Customer segmentation') +
						`<div style="margin-top:14px;border-radius:16px;overflow:hidden;border:2px solid #E2F1EA">${[
							['Name', 'Variables', 'Segments'],
							['RFM Segment Fish', 'mtu_segment', '9'],
							['RFM vs Tech savvy', 'rfm · tech_savvy_score', '44'],
							['Saldo × plafon', 'saldo · plafon', '5'],
							['Usia × recency', 'usia · recency', '10'],
							['Usia × cash trx', 'usia · cash_trx_value', '9']
						]
							.map((r, i) => `<div style="display:grid;grid-template-columns:1.3fr 1.6fr .6fr;padding:13px 18px;${i ? 'border-top:2px solid #EEF3F0' : 'background:#E2F1EA'};font:${i ? 600 : 800} 19px Figtree;color:${DEEP}"><span>${r[0]}</span><span style="color:#5A7268">${r[1]}</span><span style="text-align:right;font-weight:800">${r[2]}</span></div>`)
							.join('')}</div>`,
					{ col: 'span 7', row: 'span 2' }
				) +
					b.card(
						b.eyebrow('Promo budget constraint', RED) +
							`<div style="margin-top:14px;padding:16px 18px;border-radius:16px;background:#FDECEA;font:700 19px/1.35 Figtree;color:#8A2A20">Promo sudah melebihi limit. Silakan ubah detail order atau gunakan promo lainnya.</div>` +
							b.p('Budget Rp50.000 per promo code; checkout blocks overspend.', 19),
						{ col: 'span 5' }
					) +
					b.card(
						`<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px;height:100%;align-items:center">${b.big('+9.7%', 'field-visit success, 30% vs 20.4%', GREEN, 56)
							.replace(/^/, '<div>')
							.concat('</div>')}<div>${b.big('2×', 'app visits via campaigns, QoQ', GREEN, 56)}</div><div>${b.big('1:3', 'QA-to-engineer ratio', GREEN, 56)}</div></div>`,
						{ col: 'span 5' }
					)
			)
	}
]);

/* ── Enterprise payment ── */
const payment = deck('enterprise-payment', 'enterprise-payment', 'Enterprise Payment', [
	{
		name: 'users',
		title: 'Who we were serving',
		lede: 'Finance and product teams, each held back by a payment system that couldn’t scale.',
		body: (b) =>
			b.grid(
				[
					['Accounts receivable', 'Payments arrive 24/7, even on weekends. With limited people and manual steps, we hit our capacity.', 'Process every payment on time so farmers can buy again.'],
					['Accounts payable', 'About 200 records a day from each BU, all processed manually, and not all of the data is valid.', 'Pay farmers, agents and vendors on the same day.'],
					['Treasury', 'Every day we pull statements from ~18 accounts, recap them in a sheet, match and upload to Odoo.', 'Reconcile without manual matching.'],
					['Product manager', 'We want farmers to pay by themselves, but a conventional transfer took a long time to process.', 'A reliable payment system farmers trust.']
				]
					.map(([who, q, need], i) =>
						b.card(
							`<div style="display:flex;gap:18px;align-items:center"><div style="width:58px;height:58px;border-radius:18px;background:${[GREEN, BLUE, '#B07C00', RED][i]};display:grid;place-items:center;font:900 24px Figtree;color:#fff">${who[0]}</div><div style="font:800 27px Figtree;color:${DEEP}">${who}</div></div>` +
								b.p(`“${q}”`, 21, DEEP) +
								`<div style="margin-top:14px;padding:12px 16px;border-radius:14px;background:#E2F1EA;font:700 19px/1.35 Figtree;color:${DEEP}"><span style="color:${GREEN}">Needs:</span> ${need}</div>`,
							{ col: 'span 6' }
						)
					)
					.join('')
			)
	},
	{
		name: 'products',
		title: 'Products & services',
		lede: 'Two problem spaces, finance and product development, answered by four product groups.',
		body: (b) =>
			b.grid(
				[
					['FAT App', [['Transfer recaps dashboard', 'Field payment reports, automated into Odoo'], ['Bank statements', 'All statements in one place, with match suggestions']]],
					['AR/AP settlement', [['Pay AR with AP', 'Create a submission from the CRM or via API'], ['Write-off journals', 'Submissions flow from CRM AR/AP into Odoo']]],
					['Payment service · In', [['Payment page', 'One entrance to the payment gateway'], ['VA & payments', 'Kabayan invoices and online orders'], ['Real-time notifications', 'Customers and teams see the latest status']]],
					['Payment service · Out', [['Account validation', 'Check an account before paying'], ['Auto receipts', 'A receipt link for every payout'], ['Payout status', 'Processing, success and failed']]]
				]
					.map(([g, items], i) =>
						b.card(
							b.h(g, 30, [GREEN, BLUE, '#B07C00', RED][i]) +
								`<div style="display:grid;grid-template-columns:repeat(${items.length},1fr);gap:14px;margin-top:16px">${items.map(([h, p]) => `<div style="padding:16px;border-radius:16px;background:#F3F8F5"><div style="font:800 20px/1.25 Figtree;color:${DEEP}">${h}</div><div style="font:500 17px/1.35 Figtree;color:#4A6359;margin-top:6px">${p}</div></div>`).join('')}</div>`,
							{ col: 'span 6' }
						)
					)
					.join('')
			)
	},
	{
		name: 'metrics',
		title: 'Metrics',
		lede: 'Automated reconciliation and receipts, measured against the targets set for them.',
		body: (b) =>
			b.grid(
				b.card(b.eyebrow('Target') + b.h('Cut reconciliation time by 50%', 28) + `<div style="margin-top:22px">${b.big('18.91h', '−90% from February', GREEN, 84)}</div>`, { col: 'span 4' }) +
					b.card(
						b.eyebrow('Lead time to reconcile (payment out), hours · 2023') +
							b.vbars([['Jan', '190.8h', 190.8], ['Feb', '203.16h', 203.16], ['Mar', '38.5h', 38.5], ['Apr', '31.49h', 31.49], ['May', '18.91h', 18.91]], { hl: [4], height: 170 }),
						{ col: 'span 8' }
					) +
					b.card(
						`<div style="display:grid;grid-template-columns:120px 1fr;gap:12px 20px;align-items:center">
							<div style="font:900 24px Figtree;color:${RED}">BEFORE<div style="font:700 17px Figtree;color:#5A7268">7 steps</div></div>${b.flow(['Payment done', 'Email from provider', 'Find proof', 'Screenshot each', 'Save locally', 'Upload to Drive', 'Email + recap'], { color: RED, size: 16 })}
							<div style="font:900 24px Figtree;color:${GREEN}">AFTER<div style="font:700 17px Figtree;color:#5A7268">3 steps</div></div>${b.flow(['Payment complete', 'Find receipt on BI dashboard', 'Email receipt to principal'], { size: 18 })}
						</div>`,
						{ col: 'span 12' }
					)
			)
	},
	{
		name: 'roadmap',
		title: 'Learnings & roadmap',
		lede: 'What helped, what blocked, and what came next for payment in and out.',
		body: (b) =>
			b.grid(
				[
					['Payment gateway', 'Close collaboration with product teams from quarterly planning', 'VAs need order data first; new channels depend on third-party SLAs'],
					['Disbursement', 'Product + provider support for the API', 'Valid beneficiary data is hard to find; provider APIs are limited'],
					['Bank reconciliation', 'Having every statement in the FAT App moves work off spreadsheets', 'Only BNI and BRI fetch automatically; some fetch errors']
				]
					.map(([h, d, bl]) =>
						b.card(
							b.h(h, 28) +
								`<div style="margin-top:12px;padding:12px 14px;border-radius:14px;background:#E2F1EA;font:600 18px/1.35 Figtree;color:${DEEP}"><b style="color:${GREEN}">Driver</b> · ${d}</div><div style="margin-top:10px;padding:12px 14px;border-radius:14px;background:#FDECEA;font:600 18px/1.35 Figtree;color:${DEEP}"><b style="color:${RED}">Blocker</b> · ${bl}</div>`,
							{ col: 'span 4' }
						)
					)
					.join('') +
					[
						['Q1', 'Auto reconciliation Midtrans · statements via Brankas · VA BCA', 'Payout status visibility · auto reconciliation IRIS'],
						['Q2', 'Bank statement reconciliation · PG for shrimp & fish · payment page redesign', 'Receipt data · disbursement in FAT App · Odoo 2.0'],
						['Q3', 'Feedhub payment · custom PG dashboard · B2B checkout for shrimp', 'Auto reconciliation Durianpay · disbursement phase 2']
					]
						.map(([q, i, o]) => b.card(`<div style="font:900 40px Figtree;color:${LEMON}">${q}</div>` + b.p(`<b style="color:#fff">In</b> · ${i}`, 18, '#CFE4DA') + b.p(`<b style="color:#fff">Out</b> · ${o}`, 18, '#CFE4DA'), { col: 'span 4', bg: DEEP }))
						.join('')
			)
	}
]);

/* ── CRM AR/AP survey ── */
const arap = deck('crm-arap-survey', 'crm-arap', 'CRM AR/AP Survey', [
	{
		name: 'usage',
		title: 'Respondents & CRM usage',
		lede: '22 eFishery staff, all from the fish business unit, mostly sales.',
		body: (b) =>
			b.grid(
				b.card(`<div style="display:flex;gap:24px;align-items:center;height:100%">${b.donut(100, '100%', { sub: 'Fish', size: 170 })}<div>${b.eyebrow('Business unit')}${b.p('The shrimp team couldn’t join this round.', 20)}</div></div>`, { col: 'span 4' }) +
					b.card(`<div style="display:flex;gap:24px;align-items:center;height:100%">${b.donut(90.9, '90.9%', { sub: 'Sales', size: 170, color: BLUE })}<div>${b.eyebrow('Role', BLUE)}${b.p('Sales 90.9%<br>FBDC 9.1%', 20)}</div></div>`, { col: 'span 4' }) +
					b.card(`<div style="display:grid;gap:18px">${b.big('90%', 'use the CRM as a supporting tool', GREEN, 54)}${b.big('< 1 yr', 'most users have used it for under a year', GREEN, 54)}</div>`, { col: 'span 4' }) +
					b.card(
						b.eyebrow('Which CRM features do you use? · 22 responses') +
							b.hbars([['RMP', '90.9% · 20', 20], ['AR/AP Settlement', '59.1% · 13', 13], ['Farmers', '45.5% · 10', 10], ['Merchants', '13.6% · 3', 3], ['Buyers', '4.5% · 1', 1]], { max: 22, hl: [1] }),
						{ col: 'span 12' }
					)
			)
	},
	{
		name: 'ratings',
		title: 'How AR/AP settlement feels',
		lede: 'Of the 59% who settle AR/AP in the CRM: what they use and how they rate it.',
		body: (b) =>
			b.grid(
				b.card(b.eyebrow('Features used') + `<div style="margin-top:14px">${b.big('92.9%', 'use all three: simulation input, AR vs AP active list, settlement plan list', GREEN, 72)}</div>`, { col: 'span 4' }) +
					b.card(
						b.eyebrow('Experience') +
							`<div style="display:flex;gap:22px;align-items:center;margin-top:12px">${b.donut(92.9, '92.9%', { sub: 'fair or good', size: 170 })}<div style="display:grid;gap:10px;font:700 20px Figtree;color:${DEEP}"><span>🟢 Fair 64.3%</span><span>🔵 Good 28.6%</span><span>🔴 Poor 7.1%</span></div></div>`,
						{ col: 'span 4' }
					) +
					b.card(b.eyebrow('In their words') + b.chips(['cukup mudah', 'proses sangat mudah', 'tidak rumit dan simpel', 'membantu arap dan execute']) + b.chips(['lama menunggu vendor bill', 'kadang error'], { bg: '#FDECEA', fg: '#8A2A20' }), { col: 'span 4' }) +
					b.card(
						b.eyebrow('Satisfaction, 1–10 · half the users scored 8') + b.vbars([['4–5', 3, 3], ['5–6', 0, 0], ['6–7', 2, 2], ['8–9', 8, 8], ['10', 1, 1]], { hl: [3], height: 150 }),
						{ col: 'span 8' }
					) +
					b.card(b.eyebrow('Note', LEMON) + b.h('“Trouble and errors” were mostly about RMP', 28, '#fff') + b.p('not about AR/AP settlement itself.', 21, '#CFE4DA'), { col: 'span 4', bg: DEEP })
			)
	},
	{
		name: 'actions',
		title: 'Issues & action plan',
		lede: 'Most friction is operational: double entry, late vendor bills, weak signal in the field.',
		body: (b) =>
			b.grid(
				b.card(b.eyebrow('Issues found', RED) + b.ticks(['Settlement often takes a long time', 'Weak network in the field', 'Vendor bills arrive late, so sheets are filled in by hand', 'Bills only appear after payment completes'], { color: RED, size: 20 }), { col: 'span 5' }) +
					b.card(b.eyebrow('Today’s flow') + b.flow(['GForms', 'GSheet AR/AP', 'CRM'], { size: 24 }) + b.p('The same data is typed twice; vendor-bill delays with no ETA stall input and raise the risk of mistakes.', 21), { col: 'span 7' }) +
					b.card(
						b.eyebrow('Action items') +
							`<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px 30px;margin-top:14px">${[
								['Input from GForms straight into CRM AR/AP', 'Sales & FBDC'],
								['Show an ETA for vendor bills, then “report issue”', 'FAT → Sales'],
								['Announce every CRM improvement', 'All CRM users'],
								['Faster loading for weak field networks', 'Sales team'],
								['Simpler search and filters; narrower tables', 'All CRM users']
							]
								.map(([a, o], i) => `<div style="display:flex;gap:14px;align-items:flex-start"><span style="flex:none;width:36px;height:36px;border-radius:50%;background:${GREEN};color:#fff;display:grid;place-items:center;font:800 17px Figtree">${i + 1}</span><span style="font:600 20px/1.35 Figtree;color:#2B4238;padding-top:4px">${a} <span style="padding:3px 10px;border-radius:99px;background:#E2F1EA;font:700 15px Figtree;color:${GREEN};white-space:nowrap">${o}</span></span></div>`)
								.join('')}</div>`,
						{ col: 'span 12' }
					)
			)
	}
]);

export const efishery = [...faq, ...martech, ...payment, ...arap];
