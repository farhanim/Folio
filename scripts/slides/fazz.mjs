// Fazz case-study slides (Catat Utang, Terms of Modal, Top Loyal Users, Data & Pulsa).
// Content is transcribed from each deck; layouts use the shared grid blocks.
import { appScreen, deckOf } from './kit.mjs';

const NAVY = '#0F2550';
const BLUE = '#1534E0';
const Y = '#F2C400';
const RED = '#E5484D';
const GREEN = '#2BB673';
const theme = (project) => ({
	font: 'Manrope',
	bg: '#F3F6FC',
	ink: NAVY,
	body: '#2E3B5C',
	muted: '#5B6A8C',
	accent: BLUE,
	soft: '#E3EAF8',
	shadow: 'rgba(15,37,80,.28)',
	logo: 'images/clients/fazz.webp',
	project: `Fazz Agen · ${project}`
});
const fonts = ['Manrope:wght@500;600;700;800'];
const deck = (project, slug, dir, slides) => deckOf(theme(project), fonts)(slug, dir, slides);
const stats = (b, items, color = BLUE, size = 58) =>
	`<div style="display:grid;grid-template-columns:repeat(${items.length},1fr);gap:20px;height:100%;align-items:center">${items.map(([v, l]) => `<div>${b.big(v, l, color, size)}</div>`).join('')}</div>`;
const dark = (b, eyebrow, title, text) =>
	b.eyebrow(eyebrow, Y) + b.h(title, 28, '#fff') + (text ? b.p(text, 20, '#C9D6F0') : '');

/* ── Catat Utang ── */
const ledger = (t, foot) =>
	appScreen(t, 'Catat Utang', [['Pelanggan A', 'Rp 10.000'], ['Pelanggan B', 'Rp 10.000'], ['Pelanggan C', 'Lunas'], ['Pelanggan D', 'Rp 10.000']], { foot });
const catatUtang = deck('Catat Utang', 'catat-utang-report', 'catat-utang', [
	{
		name: 'survey',
		title: 'Who keeps a debt book?',
		lede: '377 agents surveyed, 18–27 May 2022. Most catat utang users are PFA agents.',
		body: (b) =>
			b.grid(
				b.card(`<div class="row" style="gap:24px;height:100%">${b.donut(82.8, '377', { sub: 'agents', size: 180 })}<div>${b.eyebrow('Agents')}${b.p('PFA 82.8%<br>Both 11.7%<br>PMA 5.5%', 21)}</div></div>`, { col: 'span 4' }) +
					b.card(`<div class="row" style="gap:24px;height:100%">${b.donut(62.2, '62.2%', { sub: 'say yes', size: 180 })}<div>${b.eyebrow('Accept customer debt?')}</div></div>`, { col: 'span 4' }) +
					b.card(`<div class="row" style="gap:24px;height:100%">${b.donut(90.2, '90.2%', { sub: 'need it', size: 180, color: GREEN })}<div>${b.eyebrow('Need a debt report?', GREEN)}</div></div>`, { col: 'span 4' }) +
					b.card(b.eyebrow('When do you record a customer’s debt?') + b.hbars([['Right after the sale', '90.6%', 90.6], ['Once a day', '7.26%', 7.26], ['Others', '2.14%', 2.14]], { max: 100 }), { col: 'span 8' }) +
					b.card(dark(b, 'What it means', 'Debt is written down the moment it happens.', 'A report is wanted, but as a reminder, not an analysis tool.'), { col: 'span 4', bg: NAVY })
			)
	},
	{
		name: 'needs',
		title: 'What goes in the report?',
		lede: 'Why agents need a debt report, and the information they want in it.',
		body: (b) =>
			b.grid(
				b.card(b.eyebrow('Why agents need it · n=211') + b.hbars([['As a reminder', '42.2%', 42.2], ['As a record', '11.4%', 11.4], ['Agents’ behaviour', '10.4%', 10.4], ['Manage debt', '10%', 10], ['Financial management', '9%', 9]], { hl: [0] }), { col: 'span 6', row: 'span 2' }) +
					b.card(b.eyebrow('Information needed') + b.hbars([['Total customers’ debt', '84.2%', 84.2], ['Debt left', '61.5%', 61.5], ['Unpaid customers', '54.7%', 54.7], ['Total acceptance', '38.5%', 38.5]], { hl: [0], color: GREEN }), { col: 'span 6' }) +
					b.card(stats(b, [['42.2%', 'need it as a reminder'], ['84.2%', 'want the total debt first'], ['47.8%', 'of non-users still keep a book']], BLUE, 50), { col: 'span 6' })
			)
	},
	{
		name: 'preference',
		title: 'Table vs visual',
		lede: 'We assumed a visual report would win. Agents disagreed.',
		body: (b) =>
			b.grid(
				b.card(`<div class="row" style="gap:26px;height:100%">${b.donut(79.5, '79.5%', { sub: 'table view', size: 200 })}<div>${b.eyebrow('Preferred format')}${b.p('Table 79.5%<br>Visual 17.1%<br>Others 3.4%', 21)}${b.p('Usability test agreed: 4 of 5 picked the table.', 19)}</div></div>`, { col: 'span 5' }) +
					b.card(b.eyebrow('Why table') + b.hbars([['Easy to understand', '50.3%', 50.3], ['Simple, flexible', '15.2%', 15.2], ['Clearer, detailed', '11%', 11]], { max: 60 }), { col: 'span 7' }) +
					b.card(b.quote('For an ordinary person like me, a graph like this is hard to follow. Not everyone went to university. But the text next to it, I can read.', 'Participant · concept validation'), { col: 'span 7' }) +
					b.card(b.eyebrow('Why visual', '#B08A00') + b.hbars([['Easy to understand', '40%', 40], ['More attractive', '20%', 20], ['Clearer information', '12.5%', 12.5]], { max: 60, color: Y }), { col: 'span 5' })
			)
	},
	{
		name: 'usability',
		title: 'Concept validation',
		lede: 'Five participants in Maze: view the debt report, then record a sale as debt with two shortcuts.',
		body: (b) =>
			b.grid(
				b.card(b.eyebrow('Task completion · 5 participants') + b.hbars([['View Laporan Utang', '66.7%', 66.7], ['Shortcut A · transaction detail', '73.3%', 73.3], ['Shortcut B · success screen', '100%', 100]], { max: 100, hl: [2] }), { col: 'span 7' }) +
					b.card(b.eyebrow('Single ease question · out of 7') + b.vbars([['Task 1', '5.6', 5.6], ['Task 2', '6.6', 6.6], ['Task 3', '6.8', 6.8]], { hl: [2], height: 110 }), { col: 'span 5' }) +
					b.card(stats(b, [['100%', 'direct success'], ['0%', 'misclick rate'], ['8.5s', 'average time'], ['4 / 5', 'preferred B']], GREEN), { col: 'span 12', style: 'display:flex;flex-direction:column;justify-content:center' })
			)
	},
	{
		name: 'heatmaps',
		title: 'Where they looked',
		lede: 'Heatmaps from the test: the report and the first shortcut went unnoticed.',
		body: (b, t) =>
			b.grid(
				[
					['Laporan Utang', ledger(t, ''), 'All 5 missed the report and reached for “Filter & Urutkan” instead.', RED],
					['Shortcut A', appScreen(t, 'Detail Transaksi', [['Order ID', '#28567839'], ['Total', 'Rp 24.830'], 'Catat sebagai utang', 'Cetak dan lihat'], { hl: 3 }), '3 of 5 went back home; the red-dot button pulled attention away.', RED],
					['Shortcut B', appScreen(t, 'Pembayaran Berhasil', ['Catat sebagai utang', 'Cek pesanan', 'Kembali ke beranda'], { hl: 0 }), '4 of 5 preferred the success-screen shortcut: clearer and faster.', GREEN]
				]
					.map(([h, scr, note, c]) => b.card(b.eyebrow(h, c) + `<div style="height:330px;margin-top:12px">${scr}</div>` + b.p(note, 20), { col: 'span 4' }))
					.join(''),
				{ rows: 1 }
			)
	},
	{
		name: 'recommendations',
		title: 'What we recommended',
		lede: 'Small copy and hierarchy fixes now; a combined “Performa Agen” report next.',
		body: (b, t) =>
			b.grid(
				b.card(b.eyebrow('Six recommendations') + b.numbered(['Mark the phone number as “(opsional)”', 'Add a chevron: “Lihat Laporan Utang ›”', 'Walk-through for integrated warung tools', 'Shortcut on the success screen', 'Simplify the visual report', 'Combine reports into “Performa Agen”'], { size: 20 }), { col: 'span 5', row: 'span 2' }) +
					b.card(b.eyebrow('Next: Performa Agen') + `<div style="height:240px;margin-top:12px">${appScreen(t, 'Performa Agen', ['Transaksi Agen', 'Laporan Keuangan', 'Utang Pelanggan'], { hl: 2 })}</div>`, { col: 'span 4', row: 'span 2' }) +
					b.card(dark(b, 'Why', 'One performance feature', 'Transactions and customer debt together, instead of a chart in every warung tool. Table reports stay in Kasir and Catat Utang.'), { col: 'span 3', row: 'span 2', bg: NAVY })
			)
	}
]);

/* ── Terms of Modal ── */
const vote = (b, current, items) =>
	b.card(b.eyebrow(current) + b.hbars(items.map(([l, v, n]) => [l, v, n]), { max: 100, hl: [0] }), { col: 'span 6' });
const modalTerms = deck('Terms of Modal', 'modal-terms', 'modal-terms', [
	{
		name: 'method',
		title: 'Survey setup',
		lede: 'Standardise Modal’s terms around the words users already understand.',
		body: (b) =>
			b.grid(
				b.card(b.eyebrow('Background') + b.p('Modal’s screens mixed finance jargon (Tenor, Sisa Plafon) that agents don’t use. We wanted one vocabulary, chosen by users, for every stakeholder.', 22), { col: 'span 4' }) +
					b.card(b.eyebrow('Method & target') + b.p('A quantitative survey sent as an in-app notification, to all active PMA users of Modal Agen, including Modal as payment on Grosir.', 22), { col: 'span 4' }) +
					b.card(`<div class="row" style="gap:24px;height:100%">${b.donut(95.9, '816', { sub: 'valid', size: 180 })}<div>${b.p('851 responses<br>95.9% had used Modal', 21)}</div></div>`, { col: 'span 4' }) +
					b.card(b.eyebrow('Timeline · 26 Oct → 7 Nov 2022') + b.flow(['Preparation · 3 days', 'Target users & data · 3 days', 'Distribution · 1 day', 'Analysis · 1 day', 'Reporting · 1 day']), { col: 'span 12' })
			)
	},
	{
		name: 'understanding',
		title: 'Is Modal easy to understand?',
		lede: 'Most say yes, but one in ten struggles, and two terms keep coming up.',
		body: (b) =>
			b.grid(
				b.card(b.eyebrow('Rating · 816 respondents · 1 very hard → 5 very easy') + b.vbars([['1', '8.5%', 8.5], ['2', '1.5%', 1.5], ['3', '6.5%', 6.5], ['4', '11.9%', 11.9], ['5', '71.7%', 71.7]], { hl: [0, 4], height: 330 }), { col: 'span 8', row: 'span 2' }) +
					b.card(b.eyebrow('Still confusing', RED) + `<div style="margin-top:10px">${b.big('8.5%', 'found it very hard. The two terms named most:', RED, 64)}</div>` + b.chips(['Tenor', 'Sisa Plafon'], { bg: '#FDECEC', fg: '#9B1C1C' }), { col: 'span 4' }) +
					b.card(dark(b, 'Reading the chart', '83.6% rate it easy', 'The tail sits at the very-hard end, not the middle: users either get it or are lost.'), { col: 'span 4', bg: NAVY })
			)
	},
	{
		name: 'terms',
		title: 'Four terms, in users’ words',
		lede: 'Each term was shown with its definition; users picked the name they’d use.',
		body: (b) =>
			b.grid(
				vote(b, 'Current: Tenor → Jangka Waktu', [['Jangka Waktu', '40.9%', 40.9], ['Tenor', '22.3%', 22.3], ['Lama Pinjaman', '20.8%', 20.8], ['Durasi Modal', '14.8%', 14.8]]) +
					vote(b, 'Current: Sisa Plafon → Limit Modal', [['Limit Modal', '44.5%', 44.5], ['Jumlah Modal', '37.1%', 37.1], ['Sisa Plafon', '17.8%', 17.8]]) +
					vote(b, 'Keep: Perpanjangan Modal Otomatis', [['Perpanjangan Modal Otomatis', '61.8%', 61.8], ['Pengajuan Modal Otomatis', '26%', 26], ['Langganan Modal Otomatis', '6.4%', 6.4]]) +
					vote(b, 'Keep: Modal Grosir', [['Modal Grosir', '55.6%', 55.6], ['Modal Dagang', '30.6%', 30.6], ['Modal Barang', '12.4%', 12.4]])
			)
	},
	{
		name: 'issues',
		title: 'Beyond the words',
		lede: 'Open answers pointed at product problems no rename can fix, and a clearer Modal screen.',
		body: (b, t) =>
			b.grid(
				[
					['Applying', ['Rejected with no reason given', 'Stuck after filling in Alamat Toko']],
					['Limits & tenor', ['Tenor and limit too short', 'No way to see how to raise the limit']],
					['Using Modal', ['Only works for Pulsa; users want Transfer', 'Blocked accounts, held transfers']],
					['Paying back', ['Interest feels too high', 'No instalments']]
				]
					.map(([h, items], i) => b.card(b.eyebrow(`0${i + 1} · ${h}`, RED) + b.ticks(items, { color: RED, size: 20 }), { col: 'span 4' }))
					.join('') +
					b.card(b.eyebrow('With the validated terms') + `<div style="height:300px;margin-top:12px">${appScreen(t, 'Modal Agen', [['Limit Modal', 'Rp 20.000.000'], 'Jangka Waktu 7 hari', 'Perpanjangan Modal Otomatis', 'Bisa dipakai untuk Modal Grosir'], { hl: 0 })}</div>`, { col: 'span 4', row: 'span 2' }) +
					b.card(dark(b, 'Recommendations', 'Adopt the 4 terms everywhere', 'Follow up the product issues, and publish an FAQ explaining Modal.'), { col: 'span 4', bg: NAVY })
			)
	}
]);

/* ── Top loyal users ── */
const agents = [
	['Agent 1', 'Rp 17 jt', '523', 'PLN20'],
	['Agent 2', 'Rp 8.4 jt', '265', 'PLN20'],
	['Agent 3', 'Rp 11.3 jt', '174', 'TLKM10'],
	['Agent 4', 'Rp 172.3 jt', '714', 'DC_THREE300'],
	['Agent 5', 'Rp 7.5 jt', '240', 'PLN20'],
	['Agent 6', 'Rp 4.2 jt', '221', 'INDST10'],
	['Agent 7', 'Rp 12 jt', '267', 'TLKM100']
];
const loyalUsers = deck('Top Loyal Users', 'loyal-users', 'loyal-users', [
	{
		name: 'participants',
		title: 'Who we talked to',
		lede: 'Agents registered Oct–Dec 2022 who never used a coupon in their first 30 days.',
		body: (b) =>
			b.grid(
				b.card(b.eyebrow('Method') + b.p('In-depth interviews over WhatsApp call, 19–20 January 2023, with 7 participants.', 22), { col: 'span 6' }) +
					b.card(b.eyebrow('Why this group') + b.p('Profitable, and already loyal with almost no marketing spend. Learn what keeps them, and grow more like them.', 22), { col: 'span 6' }) +
					b.card(
						b.eyebrow('First months on Fazz Agen · internal data') +
							`<div style="display:grid;grid-template-columns:repeat(7,1fr);gap:12px;margin-top:16px">${agents
								.map(([a, g, o, top], i) => `<div style="padding:16px;border-radius:16px;background:${i === 3 ? NAVY : '#F3F6FC'};color:${i === 3 ? '#fff' : NAVY}"><div style="font:700 17px Manrope;opacity:.75">${a}</div><div style="font:800 26px Manrope;margin-top:6px">${g}</div><div style="font:600 17px Manrope;opacity:.8">GMV · ${o} orders</div><div style="margin-top:8px;font:700 15px 'JetBrains Mono';color:${i === 3 ? Y : BLUE}">${top}</div></div>`)
								.join('')}</div>`,
						{ col: 'span 12' }
					)
			)
	},
	{
		name: 'profile',
		title: 'Where they live & work',
		lede: 'Small-town counters, far from banks, matching the internal data.',
		body: (b) =>
			b.grid(
				b.card(`<div class="row" style="gap:26px;height:100%">${b.donut(54.55, '54.55%', { sub: 'outside Java', size: 200 })}<div>${b.eyebrow('Outside Java · tier 3')}${b.p('Few competitors and few banks. Agents often mix in the local dialect.', 21)}</div></div>`, { col: 'span 6' }) +
					b.card(`<div class="row" style="gap:26px;height:100%">${b.donut(45.45, '45.45%', { sub: 'Java', size: 200, color: NAVY })}<div>${b.eyebrow('Java · tier 2', NAVY)}${b.p('District areas with many PPOB shops but few ATMs or banks.', 21)}</div></div>`, { col: 'span 6' }) +
					b.card(stats(b, [['Rp 3 jt', 'average monthly income from Fazz Agen'], ['2 years', 'some re-registered after leaving'], ['2.59%', 'offline agents; most were online first'], ['Solo', 'run alongside a counter, stall or job']], BLUE, 50), { col: 'span 12' })
			)
	},
	{
		name: 'behaviour',
		title: 'What they sell',
		lede: 'Small prepaid Pulsa dominates, and coupons go unused.',
		body: (b) =>
			b.grid(
				b.card(b.eyebrow('Top products · internal data · n=323') + b.hbars([['Pulsa Telkomsel', '41.67%', 41.67], ['PLN', '21.05%', 21.05], ['Pulsa Three', '14.91%', 14.91], ['Pulsa Indosat', '7.89%', 7.89], ['DANA', '4.39%', 4.39]], { hl: [0] }) + b.p('80% of Telkomsel Pulsa is TLKM10: small denominations win.', 20), { col: 'span 7', row: 'span 2' }) +
					b.card(b.eyebrow('Coupons unused · 01', RED) + b.quote('What is a coupon? I’m worried it will drain my balance.', '', RED), { col: 'span 5' }) +
					b.card(b.eyebrow('Coupons unused · 02', RED) + b.quote('I know there are coupons, but I’m rushing to serve. I forget to add them.', '', RED), { col: 'span 5' })
			)
	},
	{
		name: 'motivations',
		title: 'Why they stay',
		lede: 'Reasons to join and to stay, and the apps they use alongside Fazz Agen.',
		body: (b) =>
			b.grid(
				[
					['Cheap', 'Pulsa and electricity cheaper than other apps'],
					['Easy to use', 'Learned from YouTube reviews'],
					['Fast', 'Transactions done in minutes'],
					['Big deposit limit', 'No daily cap, vital for big buyers']
				]
					.map(([h, p]) => b.card(b.h(h, 28, BLUE) + b.p(p, 20), { col: 'span 3' }))
					.join('') +
					b.card(
						b.eyebrow('Also on their phones') +
							`<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:14px 28px;margin-top:16px">${[
								['DigiPOS', 'Data packages: short list, local zones first'],
								['siDOMPUL', 'Backup when Fazz Agen has a problem'],
								['DANA', 'Top-ups ≈ Rp 2 jt/day, unaware Fazz does it'],
								['Flip', 'Personal transfers, no admin fee'],
								['BRILink', 'Left: daily top-up limit Rp 10 jt'],
								['Bukalapak', 'Left: daily limit Rp 5 jt']
							]
								.map(([a, n]) => `<div><div style="font:800 23px Manrope;color:${NAVY}">${a}</div><div style="font:500 19px/1.35 Manrope;color:#4A5675;margin-top:4px">${n}</div></div>`)
								.join('')}</div>`,
						{ col: 'span 12' }
					),
				{ rows: '1fr 1.3fr' }
			)
	},
	{
		name: 'persona',
		title: 'Proto persona',
		lede: 'A composite of the seven interviews, not a real person.',
		body: (b) =>
			b.grid(
				b.card(
					`<div style="width:110px;height:110px;border-radius:50%;background:${Y};display:grid;place-items:center;font:800 46px Manrope;color:${NAVY}">CO</div>` +
						b.h('The counter owner', 32, '#fff') +
						b.p('Top loyal agent · Manado, tier 3', 20, '#C9D6F0') +
						b.chips(['Runs it alone', '≈ Rp 3 jt / month', 'Found us on YouTube'], { bg: 'rgba(255,255,255,.12)', fg: '#fff', size: 18 }),
					{ col: 'span 4', row: 'span 2', bg: NAVY }
				) +
					[
						['Behaviour', ['Monthly active', 'Never uses coupons', 'Mostly small Telkomsel Pulsa'], BLUE],
						['Motivations', ['Cheap Pulsa & PLN', 'Fast, big deposit limit', 'Official sales, informative site'], GREEN],
						['Frustrations', ['Too many data packages', 'Doesn’t know coupons or DANA top-up', 'No reply from CS'], RED],
						['Goals & needs', ['Local packages first', 'Faster CS, product education', 'Best coupon suggested for them'], '#B08A00']
					]
						.map(([h, items, c]) => b.card(b.eyebrow(h, c) + b.ticks(items, { color: c, size: 20 }), { col: 'span 4' }))
						.join('')
			)
	},
	{
		name: 'recommendations',
		title: 'What to change',
		lede: 'Four recommendations, led by a shorter, local-first data package list.',
		body: (b) =>
			b.grid(
				b.card(b.eyebrow('01 · Revamp the data package list') + b.hbars([['Fazz Agen', '170', 170], ['OVO', '91', 91], ['DANA', '57', 57], ['Mitra Tokopedia', '53', 53], ['Mitra Bukalapak', '43', 43]], { hl: [0], color: RED }) + b.p('Telkomsel data SKUs on screen. Local packages first, fewer SKUs, filters by price, duration and quota.', 19), { col: 'span 6', row: 'span 2' }) +
					[
						['02', 'Game vouchers by name', 'Mobile Legends and Free Fire sit under Google Play, so agents never find them.'],
						['03', 'Rename e-money “Top Up Digital”', 'Agents didn’t know Fazz tops up DANA, worth ≈ Rp 2 jt a day each.'],
						['04', 'Show the advantages on the website', 'The website is what convinced agents prices are cheap.']
					]
						.map(([n, h, p]) => b.card(b.eyebrow(n) + b.h(h, 25) + b.p(p, 19), { col: 'span 3' }))
						.join('') +
					b.card(dark(b, 'Goal', 'Grow more agents like them', 'Without leaning on coupons.'), { col: 'span 3', bg: NAVY })
			)
	}
]);

/* ── Data & Pulsa ── */
const dataPulsa = deck('Data & Pulsa', 'data-pulsa-improvements', 'data-pulsa', [
	{
		name: 'method',
		title: 'From 623 answers to 70 that explain it',
		lede: 'A push-notification survey, backed by competitor analysis and three sales interviews.',
		body: (b) =>
			b.grid(
				b.card(
					b.eyebrow('Response funnel') +
						`<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-top:18px">${[
							['623', 'responses', 'Payfazz, Master Agen, Fazz Agen'],
							['490', 'Fazz Agen users', 'only Fazz Agen, or with PFA / PMA'],
							['389', 'active Data users', '1–10 Data sales a week'],
							['70', 'relevant answers', 'rated 1–4, with an open answer']
						]
							.map(([v, l, d], i) => `<div style="padding:22px;border-radius:20px;background:${i === 3 ? BLUE : '#F3F6FC'};color:${i === 3 ? '#fff' : NAVY}"><div style="font:800 64px/1 Manrope;letter-spacing:-.04em">${v}</div><div style="font:800 21px Manrope;margin-top:8px">${l}</div><div style="font:500 17px/1.35 Manrope;margin-top:6px;opacity:.8">${d}</div></div>`)
							.join('')}</div>`,
					{ col: 'span 12' }
				) +
					b.card(b.eyebrow('Timeline · 2023') + b.flow(['Prep · Jan 31', 'Script · Feb 1–3', 'Survey · Feb 5', 'Analysis · Feb 6–20', 'Report · Feb 21–27'], { size: 18 }), { col: 'span 8' }) +
					b.card(dark(b, 'Scope', 'Data first', 'Pulsa shares the same design, so fixes carry over.'), { col: 'span 4', bg: NAVY })
			)
	},
	{
		name: 'users',
		title: 'Who uses Data, and how easy it feels',
		lede: 'Fazz Agen users by tenure, how many sell Data, and their ease rating (1 → 7).',
		body: (b) =>
			b.grid(
				b.card(`<div class="row" style="gap:24px;height:100%">${b.donut(79.4, '79.4%', { sub: 'sell Data', size: 190 })}<div>${b.eyebrow('Of 490 users')}${b.p('389 sell Data packages<br>101 not yet', 21)}</div></div>`, { col: 'span 5' }) +
					b.card(b.eyebrow('Tenure') + b.hbars([['< 6 months', '32.7%', 32.7], ['6–12 months', '18%', 18], ['1–2 years', '24.5%', 24.5], ['3–4 years', '24.9%', 24.9]], { max: 40 }), { col: 'span 7' }) +
					b.card(b.eyebrow('Ease rating · 389 users · average 5.5 / 7') + b.vbars([['1', '3.9%', 3.9], ['2', '3.3%', 3.3], ['3', '5.4%', 5.4], ['4', '9.5%', 9.5], ['5', '18%', 18], ['6', '18%', 18], ['7', '41.9%', 41.9]], { hl: [0, 1, 2, 3], height: 120, color: RED }), { col: 'span 8' }) +
					b.card(dark(b, 'Read one by one', '22.1% scored 1–4', 'Their open answers explain the problem.'), { col: 'span 4', bg: NAVY })
			)
	},
	{
		name: 'pain-points',
		title: '“Our design is too complex for agents”',
		lede: 'Pain points among agents who rated Data 1–4, and how they add up to one problem.',
		body: (b) =>
			b.grid(
				[
					['Score 1 · 8 resp.', [['Expensive', '44.4%', 44.4], ['Less organised', '33.3%', 33.3], ['Too many types', '11.1%', 11.1]]],
					['Score 2 · 10 resp.', [['Less organised', '63.6%', 63.6], ['Expensive', '18.2%', 18.2], ['Too many types', '9.1%', 9.1]]],
					['Score 3 · 19 resp.', [['Less organised', '45%', 45], ['Too many types', '20%', 20], ['Expensive', '15%', 15]]],
					['Score 4 · 33 resp.', [['Works fine', '51.5%', 51.5], ['Less organised', '21.2%', 21.2], ['Too many types', '12.1%', 12.1]]]
				]
					.map(([h, items]) => b.card(b.eyebrow(h) + b.hbars(items.map((it) => [it[0], it[1], it[2]]), { max: 70, color: RED }), { col: 'span 3' }))
					.join('') +
					b.card(stats(b, [['51.4%', 'say the page is too complex'], ['37.1%', 'less organised, hard to read'], ['14.3%', 'too many package types']], RED), { col: 'span 8' }) +
					b.card(dark(b, 'Most asked fix', 'Separate internet from phone & SMS packages'), { col: 'span 4', bg: NAVY })
			)
	},
	{
		name: 'choosing',
		title: 'How customers choose a package',
		lede: 'What customers ask an agent for first, and how other apps lay out the same list.',
		body: (b) =>
			b.grid(
				b.card(b.eyebrow('Most requested · 389 agents') + b.hbars([['Price', '42.7%', 42.7], ['Internet quota', '38.3%', 38.3], ['Package type', '11.3%', 11.3], ['Active period', '6.7%', 6.7]], { hl: [0, 1] }), { col: 'span 5' }) +
					b.card(
						b.eyebrow('Telkomsel data list in other apps') +
							`<div style="margin-top:14px;border-radius:16px;overflow:hidden;border:2px solid #E3EAF8">${[
								['App', 'SKUs', 'Filters'],
								['Fazz Agen', '170', '—'],
								['Mitra Bukalapak', '43', 'Price, quota, period, type'],
								['DANA', '57', '—'],
								['Mitra Tokopedia', '53', 'Quota, feature, price'],
								['Mitra Shopee', '49', 'Price, promo, new']
							]
								.map((r, i) => `<div style="display:grid;grid-template-columns:1.2fr .5fr 1.6fr;padding:11px 16px;${i ? 'border-top:2px solid #EEF1F7' : 'background:#E3EAF8'};${i === 1 ? 'background:#FDECEC;' : ''}font:${i ? 600 : 800} 18px Manrope;color:${NAVY}"><span>${r[0]}</span><span style="font-weight:800">${r[1]}</span><span style="color:#4A5675">${r[2]}</span></div>`)
								.join('')}</div>`,
						{ col: 'span 7', row: 'span 2' }
					) +
					b.card(b.eyebrow('Patterns worth borrowing') + b.ticks(['Filters shown up front (Bukalapak)', 'Quota, period, price as separate fields (DANA)', 'Long descriptions in a detail sheet (Tokopedia)'], { size: 19 }), { col: 'span 5' })
			)
	},
	{
		name: 'best-offer',
		title: 'Penawaran Terbaik is used, just not by everyone',
		lede: 'Sales said the “best offer” section confused agents. The survey said most rely on it.',
		body: (b) =>
			b.grid(
				b.card(`<div class="row" style="gap:26px;height:100%">${b.donut(74.6, '74.6%', { sub: 'have used it', size: 200 })}<div>${b.eyebrow('Ever picked a best offer? · 389')}${b.p('Yes · 290 agents<br>Not yet · 99 agents<br>Of users: 74.1% use it 1–3× a week', 20)}</div></div>`, { col: 'span 5', row: 'span 2' }) +
					b.card(b.eyebrow('Why the other 99 haven’t used it', RED) + b.hbars([['Didn’t know it exists', '34.3%', 34.3], ['No customer demand', '27.3%', 27.3], ['Not used to it yet', '20.2%', 20.2], ['Price doesn’t suit', '8.1%', 8.1]], { hl: [0], color: RED }), { col: 'span 7' }) +
					b.card(dark(b, 'What it means', 'The problem is awareness and display, not the offer', 'Some thought it depended on their Fazz Level, which it doesn’t.'), { col: 'span 7', bg: NAVY })
			)
	},
	{
		name: 'recommendations',
		title: 'A shorter list, sorted the way customers ask',
		lede: 'Four recommendations: three for design, one for marketing, community and sales.',
		body: (b, t) =>
			b.grid(
				b.card(b.eyebrow('Current', RED) + `<div style="height:300px;margin-top:12px">${appScreen(t, 'Pilih Nominal', ['DC Telkomsel Data Gift 100 MB', 'DC Telkomsel Data Gift 1 GB', '… 170 packages'], { accent: '#6B7A99' })}</div>`, { col: 'span 3', row: 'span 2' }) +
					b.card(b.eyebrow('Recommended', GREEN) + `<div style="height:300px;margin-top:12px">${appScreen(t, 'Harga · Kuota · Paket · Aktif', [['Kuota A · 500MB / 1 hari', 'Rp 10.000'], ['Kuota B · 1GB / 1 hari', 'Rp 20.000'], ['Kuota C · 2GB / 1 hari', 'Rp 30.000'], ['Kuota D · 5GB / 7 hari', 'Rp 45.000']], { hl: 1 })}</div>`, { col: 'span 4', row: 'span 2' }) +
					b.card(b.eyebrow('Four recommendations') + b.numbered(['Revamp the list: compact rows of name, quota / period, price', 'Categories in the order customers ask', 'Simplify Penawaran Terbaik to the same row style', 'Socialise the offer; it isn’t tied to Fazz Level'], { size: 20 }), { col: 'span 5', row: 'span 2' })
			)
	}
]);

export const fazz = [...catatUtang, ...modalTerms, ...loyalUsers, ...dataPulsa];
