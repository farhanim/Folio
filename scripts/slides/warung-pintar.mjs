// Warung Pintar case-study slides. Content is transcribed from each deck;
// layouts use the shared grid blocks, in the Warung Pintar palette.
import { appScreen, deckOf } from './kit.mjs';

const Y = '#FFD23F';
const INK = '#141414';
const AMBER = '#B57F00';
const RED = '#D9483B';
const GREEN = '#2E9E5B';
const BLUE = '#3A6FD8';
const theme = (project) => ({
	font: "'Plus Jakarta Sans'",
	bg: '#F7F3EA',
	ink: INK,
	body: '#3A3630',
	muted: '#6F6A60',
	accent: AMBER,
	soft: '#F1E8D2',
	shadow: 'rgba(80,60,10,.25)',
	logo: 'images/clients/warung-pintar.webp',
	project: `Warung Pintar · ${project}`
});
const fonts = ['Plus+Jakarta+Sans:wght@500;600;700;800'];
const deck = (project, slug, dir, slides) => deckOf(theme(project), fonts)(slug, dir, slides);
const F = "'Plus Jakarta Sans'";
const stats = (b, items, color = AMBER, size = 56) =>
	`<div style="display:grid;grid-template-columns:repeat(${items.length},1fr);gap:20px;height:100%;align-items:center">${items.map(([v, l]) => `<div>${b.big(v, l, color, size)}</div>`).join('')}</div>`;
const dark = (b, eyebrow, title, text) => b.eyebrow(eyebrow, Y) + b.h(title, 28, '#fff') + (text ? b.p(text, 20, '#D9D4C7') : '');
const yellow = (b, eyebrow, title, text) => b.eyebrow(eyebrow, INK) + b.h(title, 28, INK) + (text ? b.p(text, 20, INK) : '');
const screen = (t, title, rows, opts = {}) => appScreen(t, title, rows, { accent: INK, ...opts });
const tag = (text, bg = '#F1E8D2', fg = INK) =>
	`<span style="display:inline-block;padding:6px 14px;border-radius:99px;background:${bg};color:${fg};font:700 17px ${F}">${text}</span>`;
const findings = (b, problems, recs) =>
	b.card(b.eyebrow('Findings', RED) + `<div style="display:grid;gap:16px;margin-top:20px">${problems.map(([p, h]) => `<div style="display:flex;justify-content:space-between;gap:16px;align-items:center;padding:22px 22px;border-radius:16px;background:#FBF8F1"><span style="font:600 24px/1.3 ${F};color:${INK}">${p}</span>${tag(h)}</div>`).join('')}</div>`, { col: 'span 7', row: 'span 2' }) +
	b.card(b.eyebrow('Recommendations', GREEN) + b.numbered(recs, { color: GREEN, size: 24 }), { col: 'span 5', row: 'span 2' });

/* ── Mitra user persona ── */
const personaCard = (b, name, line, stall, levels, color) =>
	b.card(
		`<div class="row" style="gap:16px"><span style="width:56px;height:56px;border-radius:50%;background:${color};display:grid;place-items:center;font:800 24px ${F};color:#fff">${name.split(' ').pop()[0]}</span><div style="font:800 28px ${F};color:${INK}">${name}</div></div>` +
			b.p(line, 20) +
			`<div style="margin-top:12px;font:700 18px ${F};color:${color}">Stalls at: ${stall}</div>` +
			`<div style="display:grid;gap:8px;margin-top:12px">${levels.map(([l, v]) => `<div style="display:grid;grid-template-columns:200px 1fr;align-items:center;gap:12px;font:600 17px ${F};color:#6F6A60"><span>${l}</span><span style="height:10px;border-radius:6px;background:#F1E8D2"><span style="display:block;height:100%;width:${{ Low: 30, Mid: 60, High: 95 }[v]}%;border-radius:6px;background:${color}"></span></span></div>`).join('')}</div>`,
		{ col: 'span 6' }
	);
const mitra = deck('Mitra User Persona', 'mitra-persona', 'mitra-persona', [
	{
		name: 'overview',
		title: 'Research at a glance',
		lede: 'Four studies, one question: who are our mitra, and what do they need from us?',
		body: (b) =>
			b.grid(
				[
					['01', 'Learning habits', 'How do mitra want to learn to grow their business?', 'Interviews with 18 mitra and Komunitas Pintar facilitators', '4 learner personas'],
					['02', 'Bookkeeping', 'How do mitra record sales, stock and debt today?', 'Think-aloud sessions with a sacrificial Catatan Pintar concept', '3 bookkeeping personas'],
					['03', 'Top users', 'Who are the mitra that fit our product best?', '~25.7k mitra segmented; 31 interviews in 4 cities', '4 merchant archetypes'],
					['04', 'Warung buyers', 'Who buys from a warung, and are they happy?', 'Consumer survey across 8 Kelontong Pintar shops', '7 buyer segments']
				]
					.map(([n, h, q, m, o]) => b.card(b.eyebrow(n) + b.h(h, 28) + b.p(q, 20, INK) + b.p(m, 18) + `<div style="position:absolute;left:32px;right:32px;bottom:28px;padding:14px 16px;border-radius:14px;background:${Y};font:800 20px ${F};color:${INK}">${o}</div>`, { col: 'span 3' }))
					.join(''),
				{ rows: 1 }
			)
	},
	{
		name: 'learners',
		title: 'Meet the learners',
		lede: 'Mitra grouped by their vision to grow and their willingness to learn.',
		body: (b) =>
			b.grid(
				personaCard(b, 'The Busy Bee', 'Knows learning is good, but the shop keeps her too busy to start.', 'starting', [['Awareness of learning', 'Mid'], ['Effort to learn', 'Low']], '#E8743B') +
					personaCard(b, 'The Diva', 'Knows exactly what she wants. Needs short, relevant how-tos.', 'relevance', [['Awareness of learning', 'High'], ['Effort to learn', 'High']], '#C94F7C') +
					personaCard(b, 'The Sustainer', 'Content with how things are. Running the shop is about survival.', 'awareness', [['Awareness of learning', 'Low'], ['Effort to learn', 'Low']], GREEN) +
					personaCard(b, 'The Builder', 'Wants to learn everything, but has no clear goal to aim at.', 'implementing', [['Awareness of learning', 'High'], ['Effort to learn', 'High']], BLUE)
			)
	},
	{
		name: 'journey',
		title: 'Where each learner stalls',
		lede: 'The learning journey, with each persona’s main pain point and the design brief it led to.',
		body: (b) => {
			const stages = ['Awareness', 'Start', 'Learn', 'Reflect', 'Implement'];
			const rows = [
				['The Sustainer', 0, 'Doesn’t see why learning would help the shop', 'Design for motivation', GREEN],
				['The Busy Bee', 1, 'Learning loses to serving the next customer', 'Design for habit & stickiness', '#E8743B'],
				['The Diva', 2, 'Can’t find content that matches her goal', 'Design for relevance', '#C94F7C'],
				['The Builder', 4, 'Collects ideas, struggles to act on them', 'Design for real use cases', BLUE]
			];
			return b.grid(
				b.card(
					`<div style="display:grid;grid-template-columns:220px repeat(5,1fr) 300px;gap:10px;align-items:center;font:800 19px ${F};color:#6F6A60;margin-bottom:10px"><span></span>${stages.map((s) => `<span style="text-align:center">${s}</span>`).join('')}<span>Design brief</span></div>` +
						rows
							.map(
								([n, at, pain, brief, c]) => `<div style="display:grid;grid-template-columns:220px repeat(5,1fr) 300px;gap:10px;align-items:center;padding:14px 0;border-top:2px solid #F1E8D2">
						<span style="font:800 22px ${F};color:${c}">${n}</span>
						${stages.map((_, i) => `<span style="height:14px;border-radius:7px;background:${i < at ? c : i === at ? 'transparent' : '#F1E8D2'};${i === at ? `position:relative` : ''}">${i === at ? `<span style="position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:40px;height:40px;border-radius:50%;background:${c};color:#fff;display:grid;place-items:center;font:800 22px ${F}">!</span>` : ''}</span>`).join('')}
						<span><div style="font:700 18px/1.3 ${F};color:${INK}">${brief}</div><div style="font:500 16px/1.3 ${F};color:#6F6A60;margin-top:2px">${pain}</div></span></div>`
							)
							.join(''),
					{ col: 'span 12' }
				),
				{ rows: 1 }
			);
		}
	},
	{
		name: 'bookkeeping',
		title: 'How mitra keep their books',
		lede: 'Three bookkeeping personas, from think-aloud sessions with a sacrificial Catatan Pintar concept.',
		body: (b) =>
			b.grid(
				[
					['The Modest Amateur', 'I write it in my book, but I’m never sure I’m doing it right.', ['Records sales and stock on paper', 'Wants simple, guided steps'], 'Paper book'],
					['The Overconfident Manager', 'It’s all in my head; I only write down who owes me.', ['Relies on memory for daily sales', 'Debt is the one thing recorded'], 'Debt only'],
					['The Commander', 'My helpers run the counter. I need to see what happened today.', ['Runs the shop through helpers', 'Wants an end-of-day recap'], 'Team books']
				]
					.map(([n, q, t, tg]) => b.card(`<div class="row" style="justify-content:space-between">${b.h(n, 26)}${tag(tg, Y)}</div>` + b.p(`“${q}”`, 20, INK) + b.ticks(t, { size: 19 }), { col: 'span 4' }))
					.join('') +
					b.card(
						b.eyebrow('Key insights', Y) +
							`<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-top:14px">${['Debt is the one thing everyone records: unpaid debt is a loss.', 'Paper wins: a phone is personal, and helpers can’t share it.', 'Logging every sale only feels worth it with an end-of-day recap.'].map((s, i) => `<div><div style="font:800 34px ${F};color:${Y}">0${i + 1}</div><div style="font:600 21px/1.35 ${F};color:#fff;margin-top:6px">${s}</div></div>`).join('')}</div>`,
						{ col: 'span 12', bg: INK }
					),
				{ rows: '1.3fr 1fr' }
			)
	},
	{
		name: 'archetypes',
		title: 'Top-user archetypes',
		lede: 'Mitra mapped by revenue and business experience, from 31 interviews across four cities.',
		body: (b) =>
			b.grid(
				[
					['Progressive Merchant', 'High revenue, newer to the trade. Moves fast.', ['Price-sensitive', 'App-savvy', 'Semi-wholesaler']],
					['Nimble Old Player', 'Experienced. Adopts tools that clearly pay off.', ['App-savvy', 'Grosir visitor', 'Semi-wholesaler']],
					['Struggle Survivalist', 'Low revenue, new. Every rupiah counts.', ['Price-sensitive', 'Shops around']],
					['Slow Bloomer Retailer', 'Experienced, steady, grows slowly but loyally.', ['Grosir visitor', 'Loyal to suppliers']]
				]
					.map(([n, d, t], i) => b.card(b.h(n, 25, [AMBER, INK, RED, GREEN][i]) + b.p(d, 19) + b.chips(t, { size: 16 }), { col: 'span 3' }))
					.join('') +
					b.card(b.eyebrow('Who they really were') + b.hbars([['Semi-wholesalers', '20 / 31', 20], ['Retailers', '9 / 31', 9], ['Traders', '2 / 31', 2]], { max: 31, hl: [0] }) + b.p('We expected big retailers. Most were selling to other warung.', 20), { col: 'span 8' }) +
					b.card(yellow(b, 'GMV potential', '< 20% of their stock budget', 'was spent with Warung Pintar: far more potential than we assumed.'), { col: 'span 4', bg: Y, flat: true })
			)
	},
	{
		name: 'buyers',
		title: 'The people buying from a warung',
		lede: 'A consumer survey across 8 Kelontong Pintar shops: who buys, and how they rate it.',
		body: (b) =>
			b.grid(
				b.card(`<div class="row" style="gap:26px;height:100%">${b.donut(56, '56%', { sub: 'price-sensitive', size: 210 })}<div>${b.eyebrow('Buyer segments')}${b.p('Seven segments in total. The price-sensitive buyer is the majority, the reason for a year-end FMCG discount programme.', 21)}</div></div>`, { col: 'span 12' }) +
					[
						['CES', 'Customer effort', '5.9 / 7', 'Target 5 · above', GREEN],
						['CSAT', 'Customer satisfaction', '87%', 'Target 80% · above', GREEN],
						['NPS', 'Net promoter score', '+22', 'Target +50 · below', RED]
					]
						.map(([k, l, v, tg, c]) => b.card(b.eyebrow(`${k} · ${l}`, c) + `<div style="margin-top:10px">${b.big(v, tg, c, 64)}</div>`, { col: 'span 4' }))
						.join('')
			)
	}
]);

/* ── AWP order flow ── */
const awp = deck('AWP Order Flow', 'awp-order-flow', 'awp-order-flow', [
	{
		name: 'redesign',
		title: 'Proposed solution',
		lede: 'From crazy 8s to a prototype: the catalog rebuilt around who sells each product.',
		body: (b, t) =>
			b.grid(
				b.card(b.eyebrow('Existing', RED) + `<div style="height:340px;margin-top:12px">${screen(t, 'Pesan', ['ABC Kopi Susu · ABC001', 'Indomie Goreng · IND001', 'Sovia 2L · SOV001', 'Kapal Api · KKA001'], { accent: '#7A746A' })}</div>`, { col: 'span 3' }) +
					b.card(b.eyebrow('Improvement', GREEN) + `<div style="height:340px;margin-top:12px">${screen(t, 'Pesan · by seller', ['Warung Pintar Distribusi ✓', 'ABC Kopi Susu', 'Toko Narnia', 'Minyak Goreng Sovia'], { hl: 0 })}</div>`, { col: 'span 3' }) +
					b.card(
						b.eyebrow('Twelve changes') +
							`<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px 22px;margin-top:14px">${['Higher-contrast search field', 'Grid / list toggle', 'Even spacing in the category rail', 'Sort chips + one filter button', 'One colour for service labels', 'Clear WPD merchant icon', 'New Grosir merchant icon', 'Quieter discount badge', '“+” replaces “Tambah”', 'Darker text for contrast', 'SKU code removed', 'Collapsible category sidebar'].map((c, i) => `<div class="row" style="gap:12px;align-items:flex-start"><span style="flex:none;width:30px;height:30px;border-radius:50%;background:${Y};display:grid;place-items:center;font:800 15px ${F};color:${INK}">${i + 1}</span><span style="font:600 18px/1.3 ${F};color:${INK};padding-top:4px">${c}</span></div>`).join('')}</div>`,
						{ col: 'span 6' }
					),
				{ rows: 1 }
			)
	},
	{
		name: 'testing',
		title: 'Usability testing',
		lede: 'Maze test with 7 mitra: each task run on the existing app and on the prototype.',
		body: (b) =>
			b.grid(
				[
					['Task 1 · find a grosir product, add to cart', 74, 91, '26.5% → 15.6%', '8.1s → 4.1s'],
					['Task 2 · find a WPD product on discount', 91, 100, '16.7% → 0%', '5.6s → 3.3s'],
					['Task 3 · review the cart, remove a seller, pay', 90, 97, '16.7% → 4.1%', '7.1s → 6s']
				]
					.map(([h, a, z, mis, time]) =>
						b.card(
							b.eyebrow(h) +
								`<div class="row" style="gap:20px;align-items:flex-end;margin-top:16px"><span style="font:800 54px/1 ${F};color:#B9B2A3">${a}</span><span style="font:800 34px ${F};color:${AMBER}">→</span><span style="font:800 76px/1 ${F};letter-spacing:-.04em;color:${INK}">${z}</span></div>` +
								`<div style="margin-top:6px;font:600 18px ${F};color:#6F6A60">usability score</div>` +
								b.p(`Misclicks ${mis}<br>Time ${time}`, 20, INK),
							{ col: 'span 4' }
						)
					)
					.join('') +
					b.card(b.eyebrow('Which version did mitra prefer?') + b.hbars([['Updated app', '67%', 67], ['Current app', '17%', 17], ['No difference', '17%', 17]], { max: 100, hl: [0] }), { col: 'span 8' }) +
					b.card(yellow(b, 'Result', 'Scores rose on every task', 'Misclicks and time fell.'), { col: 'span 4', bg: Y, flat: true })
			)
	},
	{
		name: 'data',
		title: 'Data and voices',
		lede: 'Why the SKU code could go: warung searching by SKU vs by name, Mar–Nov 2020.',
		body: (b) =>
			b.grid(
				b.card(b.eyebrow('Unique warung searching by name · SKU searches near zero') + b.vbars([['Mar', '10.5k', 10487], ['Apr', '14.9k', 14924], ['May', '18.2k', 18203], ['Jun', '29.1k', 29063], ['Jul', '38.9k', 38900], ['Aug', '49.5k', 49498], ['Sep', '55.9k', 55947], ['Oct', '56.9k', 56906]], { hl: [7], height: 300 }), { col: 'span 8', row: 'span 3' }) +
					[
						['Happy with the update: clearer and tidier.', 'Mitra · WPHNT-B'],
						['The new look is more comfortable and practical.', 'Mitra · WPHNT-D'],
						['Still more used to the current app.', 'Mitra · WPHNT-S']
					]
						.map(([q, w]) => b.card(b.quote(q, w), { col: 'span 4' }))
						.join(''),
				{ rows: 3 }
			)
	}
]);

/* ── AWP heuristic evaluation ── */
const sevRow = (name, cells) => [name, cells];
const heuristic = deck('AWP Heuristic Evaluation', 'awp-heuristic-evaluation', 'awp-heuristic', [
	{
		name: 'method',
		title: 'What is a heuristic evaluation?',
		lede: 'A usability inspection: evaluators judge the interface against recognised principles.',
		body: (b) =>
			b.grid(
				b.card(b.eyebrow('Nielsen’s ten heuristics') + `<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px 24px;margin-top:14px">${['Visibility of system status', 'Match system & real world', 'User control & freedom', 'Consistency & standards', 'Error prevention', 'Recognition rather than recall', 'Flexibility & efficiency', 'Aesthetic & minimalist design', 'Recover from errors', 'Help & documentation'].map((h, i) => `<div class="row" style="gap:12px"><span style="font:800 18px 'JetBrains Mono';color:${AMBER}">${String(i + 1).padStart(2, '0')}</span><span style="font:600 19px ${F};color:${INK}">${h}</span></div>`).join('')}</div>`, { col: 'span 6', row: 'span 2' }) +
					b.card(b.eyebrow('Severity ratings') + `<div style="display:grid;gap:8px;margin-top:12px">${[['0', 'Not a problem', '#E6E0D2'], ['1', 'Cosmetic', '#E9D8A6'], ['2', 'Minor', '#E8C25A'], ['3', 'Major', Y], ['4', 'Catastrophe', '#FF6A3D']].map(([n, l, c]) => `<div class="row" style="gap:12px;font:600 19px ${F};color:${INK}"><span style="width:34px;height:34px;border-radius:9px;background:${c};display:grid;place-items:center;font:800 17px ${F}">${n}</span>${l}</div>`).join('')}</div>`, { col: 'span 3' }) +
					b.card(b.eyebrow('Evaluators') + b.hbars([['Hans', '21', 21], ['Atik', '16', 16], ['Rama', '9', 9]], { max: 21 }) + b.p('findings each', 18), { col: 'span 3' }) +
					b.card(b.eyebrow('Screen flow · 12 screens') + b.chips(['Homepage', 'Pesan', 'Search', 'Filter', 'Detail', 'Sticky cart', 'Keranjang', 'Konfirmasi', 'Voucher', 'Pembayaran', 'Lacak', 'Detail lacak'], { size: 16 }), { col: 'span 6' })
			)
	},
	{
		name: 'matrix',
		title: 'Severity map',
		lede: '46 findings: the worst problem weight per screen and heuristic.',
		body: (b) => {
			const H = ['Status', 'Real world', 'Control', 'Consistency', 'Errors', 'Recall', 'Efficiency', 'Minimal', 'Recovery', 'Help'];
			const R = [
				sevRow('Homepage', [3, 3, 0, 0, 0, 1, 0, 3, 0, 0]),
				sevRow('Pesan', [0, 3, 0, 4, 0, 3, 0, 4, 0, 0]),
				sevRow('Search', [3, 0, 2, 0, 0, 2, 0, 0, 0, 0]),
				sevRow('Filter', [3, 2, 3, 1, 0, 0, 0, 2, 0, 0]),
				sevRow('Detail', [0, 3, 0, 0, 2, 3, 0, 0, 0, 0]),
				sevRow('Sticky cart', [0, 0, 0, 0, 0, 2, 0, 2, 0, 0]),
				sevRow('Keranjang', [0, 0, 2, 0, 0, 3, 0, 0, 0, 3]),
				sevRow('Konfirmasi', [2, 0, 0, 1, 1, 3, 0, 0, 0, 0]),
				sevRow('Voucher', [0, 2, 0, 0, 0, 2, 0, 2, 0, 0]),
				sevRow('Pembayaran', [1, 0, 0, 1, 0, 0, 0, 0, 0, 0]),
				sevRow('Lacak', [0, 1, 0, 0, 0, 0, 0, 0, 0, 0])
			];
			const C = ['#F3EEE3', '#E9D8A6', '#E8C25A', Y, '#FF6A3D'];
			return b.grid(
				b.card(
					`<div style="display:grid;grid-template-columns:150px repeat(10,1fr);gap:5px;font:700 14px ${F};color:#6F6A60;text-align:center"><span></span>${H.map((h) => `<span>${h}</span>`).join('')}</div>` +
						R.map(([n, cells]) => `<div style="display:grid;grid-template-columns:150px repeat(10,1fr);gap:5px;margin-top:5px"><span style="font:700 16px ${F};color:${INK};align-self:center">${n}</span>${cells.map((v) => `<span style="height:34px;border-radius:7px;background:${C[v]};display:grid;place-items:center;font:800 15px ${F};color:${v > 2 ? INK : '#8a8170'}">${v || ''}</span>`).join('')}</div>`).join(''),
					{ col: 'span 9' }
				) + b.card(b.big('46', 'findings across 12 screens', AMBER, 80) + b.p('Pesan, Detail and Filter carried the most; recognition over recall broke everywhere.', 20), { col: 'span 3' }),
				{ rows: 1 }
			);
		}
	},
	{
		name: 'pesan',
		title: 'Pesan catalog',
		lede: 'Who sells it, and what the label promises.',
		body: (b) =>
			b.grid(
				findings(
					b,
					[
						['Store names too small and low-contrast', 'Aesthetic'],
						['Onboarding said free shipping, H+1; catalog differs', 'Consistency'],
						['“Gratis Ongkir” vs “24 Jam Dikirim” read as unequal', 'Aesthetic'],
						['The list-shaped filter icon is unclear', 'Consistency'],
						['Crowded info; blank product photos', 'Recall']
					],
					['Generic filter icon, next to search', 'An icon that marks grosir', 'Store name in yellow on dark blue', 'Rebalance the card; fill missing photos']
				)
			)
	},
	{
		name: 'filter',
		title: 'Filter produk',
		lede: 'Applied filters that nobody can see.',
		body: (b) =>
			b.grid(
				findings(
					b,
					[
						['Applied filters show only as a number badge', 'Control'],
						['“Grosir Pintar” is unfamiliar; mitra pick by store', 'Control'],
						['Active filter and sort not visible in the list', 'Visibility'],
						['A selected filter looks like a plain button', 'Consistency']
					],
					['Active filters as removable chips under search', 'Grosir by distance, or stores within 5–10 km', 'Add “harga tertinggi”; rename “termurah”', 'Selected state: yellow outline, light fill']
				)
			)
	},
	{
		name: 'detail',
		title: 'Detail produk',
		lede: 'The source of a product is its most important fact, shown least.',
		body: (b) =>
			b.grid(
				findings(
					b,
					[
						['Only the store name says it’s a grosir product', 'Recall'],
						['Is the SKU code needed next to photo and name?', 'Real world'],
						['Shipping cost and delivery time not shown', 'Errors'],
						['Unit info lacks min. order, category, weight', 'Real world']
					],
					['Bigger, higher-contrast provider name', 'Source with shipping cost and delivery time', 'Add minimum order, category and weight', 'Research whether the SKU code can go']
				)
			)
	},
	{
		name: 'cart',
		title: 'Keranjang & checkout',
		lede: 'Two sellers in one cart, and one total.',
		body: (b) =>
			b.grid(
				findings(
					b,
					[
						['Seller banner low-contrast; only option is delete', 'Control'],
						['Subtotal and shipping too small to notice', 'Recall'],
						['Vouchers work for WPD only, never explained', 'Help'],
						['The bill doesn’t split WPD and grosir payment', 'Recall']
					],
					['Contrasting seller banner, with a checkbox to keep items', '“2 produk dari 2 sumber” in the sticky cart', 'Alert: vouchers apply to WPD only', 'Medium-size subtotal and shipping']
				)
			)
	},
	{
		name: 'recap',
		title: 'Evaluation recap',
		lede: 'One recommendation per screen, from the team’s recap.',
		body: (b) =>
			b.grid(
				[
					['Homepage', 3, 'Split consumables; add special categories'],
					['Pesan', 10, 'Rebalance the card; a grosir icon'],
					['Search', 4, 'Hints, out-of-stock label, best-sellers'],
					['Filter', 6, 'Active filter chips; grosir by distance'],
					['Detail', 7, 'Highlight source, shipping and timing'],
					['Sticky cart', 2, '“2 produk dari 2 sumber”'],
					['Keranjang', 4, 'Contrasting seller banner; keep items'],
					['Konfirmasi', 4, 'Shipping in the total; voucher alert'],
					['Voucher', 3, 'Icon-led terms; name the voucher'],
					['Pembayaran', 2, 'Split the bill per seller'],
					['Lacak', 1, 'Make the sender obvious'],
					['Detail lacak', 0, 'Clean: no findings']
				]
					.map(([s, n, r]) => b.card(`<div class="row" style="justify-content:space-between"><span style="font:800 22px ${F};color:${INK}">${s}</span><span style="padding:4px 12px;border-radius:99px;background:${n >= 6 ? Y : '#F1E8D2'};font:800 17px ${F};color:${INK}">${n}</span></div>` + b.p(r, 18), { col: 'span 3', pad: '22px 24px' }))
					.join(''),
				{ rows: 3 }
			)
	}
]);

/* ── Home screen revamp ── */
const home = deck('Home Screen Revamp', 'home-screen-revamp', 'home-revamp', [
	{
		name: 'findings',
		title: 'Findings from competitors',
		lede: 'The old home confused mitra who signed up online, without a sales agent beside them.',
		body: (b) =>
			b.grid(
				[
					['Search on top', 'The fastest route to an item, even when search only finds products.'],
					['Banners, then categories', 'Categories stay inside the first screen: no scrolling to find them.'],
					['Tailored picks', 'By location, promotion or best-sellers, to cut search time.']
				]
					.map(([h, p]) => b.card(b.big('5/7', 'competitor apps', AMBER, 60) + b.h(h, 26) + b.p(p, 19), { col: 'span 4' }))
					.join('') +
					b.card(
						b.eyebrow('Crazy 8s · top 4 of 6 voters', Y) +
							`<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:18px;margin-top:14px">${[['Lacak status', 'Live order tracking card'], ['Search navigation', 'Search + notifications in one bar'], ['Grouped categories', 'Products & services, grouped'], ['Status pesanan', 'Order status right on Home']].map(([h, p], i) => `<div><div style="font:800 32px ${F};color:${Y}">${i + 1}</div><div style="font:800 22px ${F};color:#fff">${h}</div><div style="font:500 18px/1.35 ${F};color:#D9D4C7;margin-top:4px">${p}</div></div>`).join('')}</div>`,
						{ col: 'span 12', bg: INK }
					)
			)
	},
	{
		name: 'lofi',
		title: 'Lo-fi explorations',
		lede: 'Three layouts built from the crazy 8s and competitor patterns, discussed before hi-fi.',
		body: (b, t) =>
			b.grid(
				[
					['Lo-fi 1', ['Cari produk andalan…', 'Produk dan layanan warung', 'Kategori andalan', 'Belanja hari ini · diskon 50%']],
					['Lo-fi 2', ['Belanja yuk…', 'Promo Pintar', 'Kategori produk', 'Produk warung · digital · panas']],
					['Lo-fi 3', ['Belanja yuk…', 'Promo Pintar · lihat semua', 'Kategori produk', 'Produk panas']]
				]
					.map(([h, rows]) => b.card(b.eyebrow(h) + `<div style="height:360px;margin-top:12px;filter:grayscale(1)">${screen(t, 'Home', rows, { accent: '#8A857A' })}</div>`, { col: 'span 4' }))
					.join(''),
				{ rows: 1 }
			)
	},
	{
		name: 'revamp',
		title: 'Revamp I: hi-fi',
		lede: 'Built from CSAT, competitor analysis, crazy 8s and the lo-fi discussion.',
		body: (b, t) =>
			b.grid(
				b.card(`<div style="height:100%">${screen(t, 'Home', ['Cari produk kebutuhan warung', 'Promo Pintar · Rabu Untung', 'Kategori produk warung', 'Voucher untuk Juragan', 'Produk dan layanan warung', 'Produk Panas 🔥'], { hl: 3 })}</div>`, { col: 'span 4' }) +
					b.card(
						b.eyebrow('Eight sections') +
							`<div style="display:grid;grid-template-columns:1fr 1fr;gap:30px 30px;margin-top:22px">${[
								['Search + notifications', 'Order info behind the bell'],
								['Promo Pintar carousel', 'Flexes to the number of promos'],
								['Categories, scrolling', 'Every category in one row'],
								['Vouchers for Juragan', 'Most-requested in the CSAT survey'],
								['Products & services', 'Digital products grouped'],
								['General info banners', 'Warung news in its own slot'],
								['Produk Panas', 'Best-sellers, WPD and Grosir tagged'],
								['Four-tab navigation', 'History moved out: five tabs to four']
							]
								.map(([h, p], i) => `<div class="row" style="gap:12px;align-items:flex-start"><span style="flex:none;width:32px;height:32px;border-radius:50%;background:${Y};display:grid;place-items:center;font:800 16px ${F};color:${INK}">${i + 1}</span><div><div style="font:800 24px ${F};color:${INK}">${h}</div><div style="font:500 20px/1.35 ${F};color:#6F6A60;margin-top:4px">${p}</div></div></div>`)
								.join('')}</div>`,
						{ col: 'span 8' }
					),
				{ rows: 1 }
			)
	},
	{
		name: 'states',
		title: 'Other states',
		lede: 'The same home adapts to where each mitra is: new, verifying, shopping, waiting or reading.',
		body: (b, t) =>
			b.grid(
				[
					['First open', 'Masuk sekarang untuk mulai belanja'],
					['Verify registration', 'Lengkapi data pendaftaran Juragan'],
					['Product in cart', 'Lanjutkan checkout'],
					['Order tracking', 'Pesanan sedang dikirim']
				]
					.map(([h, card], i) => b.card(b.eyebrow(`0${i + 1} · ${h}`) + `<div style="height:300px;margin-top:12px">${screen(t, 'Home', [card, 'Promo Pintar', 'Kategori produk', 'Produk Panas'], { hl: 0 })}</div>`, { col: 'span 3' }))
					.join('') + b.card(yellow(b, 'Why it works', 'One layout, one swapped card', 'Each state is a card on the same home, which kept the build small when time got tight.'), { col: 'span 12', bg: Y, flat: true }),
				{ rows: '3fr 1fr' }
			)
	},
	{
		name: 'next',
		title: 'Metrics & next steps',
		lede: 'How the revamp is measured, and the road to an MVP in Q2.',
		body: (b) =>
			b.grid(
				b.card(b.eyebrow('Metrics') + b.chips(['CSAT score', 'Time to order', 'Conversion'], { bg: Y }) + b.p('Category clicks, search clicks, orders from category, orders from search.', 19), { col: 'span 4' }) +
					b.card(b.eyebrow('What’s next') + b.numbered(['Finalise the home screen design', 'Set the MVP for Q2', 'Align effort with engineering', 'Ship onboarding steps', 'A/B test to validate'], { size: 19 }), { col: 'span 8' }) +
					b.card(
						b.eyebrow('Timeline · week 12–27') +
							`<div style="display:grid;gap:12px;margin-top:16px">${[['Homescreen iteration', 0, 6], ['Onboarding AWP', 4, 10], ['Order status notification', 8, 13], ['Product service phase 2', 11, 16]].map(([l, s, e]) => `<div style="display:grid;grid-template-columns:260px 1fr;gap:16px;align-items:center;font:700 19px ${F};color:${INK}"><span>${l}</span><span style="position:relative;height:28px;border-radius:8px;background:#F1E8D2"><span style="position:absolute;left:${(s / 16) * 100}%;width:${((e - s) / 16) * 100}%;top:0;bottom:0;border-radius:8px;background:${Y}"></span></span></div>`).join('')}</div>`,
						{ col: 'span 12' }
					)
			)
	}
]);

/* ── Tokosmart reskin ── */
const reskin = deck('Tokosmart Reskin', 'tokosmart-reskin', 'tokosmart-reskin', [
	{
		name: 'foundation',
		title: 'Brand foundation',
		lede: 'Only the foundation changes (colour, type, copy, illustration), so engineering stays small.',
		body: (b) =>
			b.grid(
				[
					['Tokosmart', 'Bizzy product', ['#0A6C96', '#17A2C4', '#16C35A', '#EF8A00', '#E84040'], 'Roboto', 'Roboto', 'Multi-colour, mixing flat and gradient shapes.'],
					['Warung Pintar', 'Reskinned identity', [Y, INK, '#fff', '#F1E8D2'], 'Nunito Sans', "'Nunito Sans'", 'Two-tone, solid colour with a black outline.']
				]
					.map(([n, s, colors, typeName, typeFam, ill], i) =>
						b.card(
							`<div class="row" style="justify-content:space-between">${b.h(n, 34)}${tag(s, i ? Y : '#E6F2F7')}</div>` +
								b.eyebrow('Colour') +
								`<div class="row" style="gap:10px;margin-top:10px">${colors.map((c) => `<i style="width:66px;height:66px;border-radius:18px;background:${c};box-shadow:inset 0 0 0 2px rgba(0,0,0,.08)"></i>`).join('')}</div>` +
								`<div class="row" style="gap:30px;margin-top:22px;align-items:flex-end"><span style="font:800 110px/.8 ${typeFam};color:${INK}">Aa</span><div>${b.eyebrow('Type')}<div style="font:800 26px ${F};color:${INK}">${typeName}</div></div></div>` +
								b.eyebrow('Illustration') + b.p(ill, 20),
							{ col: 'span 6' }
						)
					)
					.join(''),
				{ rows: 1 }
			)
	},
	{
		name: 'home',
		title: 'Homescreen merge',
		lede: 'Tokosmart’s layout is kept and reskinned, so AWP users meet a new home.',
		body: (b, t) =>
			b.grid(
				[
					['AWP today', ['Catatan Pintar', 'Promo Pintar', 'Produk digital', 'Belanja buat warung'], '#7A746A'],
					['Tokosmart', [['Sisa kredit', 'Rp 35.000.000'], 'Produk digital', 'Produk terpopuler', 'Brand terpopuler'], '#0A6C96'],
					['Reskinned', [['Sisa kredit', 'Rp 35.000.000'], 'Produk digital', 'Produk terpopuler', 'Brand terpopuler'], INK]
				]
					.map(([h, rows, c], i) => b.card(b.eyebrow(h, i === 2 ? GREEN : AMBER) + `<div style="height:360px;margin-top:12px">${screen(t, i === 2 ? 'Warung Pintar' : h === 'Tokosmart' ? 'Tokosmart' : 'Warung Pintar', rows, { accent: c, hl: i === 2 ? 0 : -1 })}</div>`, { col: 'span 4' }))
					.join(''),
				{ rows: 1 }
			)
	},
	{
		name: 'impact',
		title: 'Impact on AWP users',
		lede: 'What existing Warung Pintar users relearn once both apps become one.',
		body: (b) =>
			b.grid(
				[
					['Registration steps', '1', '3', 'Three ways to sign up'],
					['Order tracking steps', '3', '5', 'Multi-seller orders, new statuses'],
					['Bottom navigation', '5', '4', 'Pesanan, Keranjang, Akun'],
					['Digital products on Home', '6', '3', 'The rest move deeper']
				]
					.map(([h, a, z, p]) => b.card(b.eyebrow(h) + `<div class="row" style="gap:16px;align-items:center;margin-top:14px"><span style="font:800 60px/1 ${F};color:#B9B2A3">${a}</span><span style="font:800 32px ${F};color:${AMBER}">→</span><span style="font:800 80px/1 ${F};color:${INK}">${z}</span></div>` + b.p(p, 19), { col: 'span 3' }))
					.join('') +
					b.card(b.eyebrow('Also new') + b.ticks(['Cart before checkout, a new step for AWP users', 'Bundles, buy 1 get 1, cumulative discounts', 'COD, bank transfer or digital payment'], { size: 20 }), { col: 'span 7' }) +
					b.card(dark(b, 'Concern', 'Pair the product tour with a campaign', 'So mitra from both apps aren’t lost on day one.'), { col: 'span 5', bg: INK })
			)
	},
	{
		name: 'modules',
		title: 'Delivery plan',
		lede: 'A waterfall plan: 12 modules, 594 screens, illustrations and copy in about two weeks.',
		body: (b) =>
			b.grid(
				b.card(
					b.eyebrow('Screens per module · completion') +
						`<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px 30px;margin-top:14px">${[
							['Splash, onboarding, registration', 141, 100],
							['Profile', 122, 100],
							['Cart, checkout, payment', 78, 0],
							['My order, history, tracking', 63, 100],
							['Beranda, promo, search, PDP', 44, 93],
							['Digital goods', 39, 100],
							['Digital merchandising', 25, 100],
							['AWP: vouchers, multi-seller', 21, 0],
							['Tutorial', 17, 0],
							['POS', 17, 0],
							['Mission', 15, 0],
							['Brand official page', 12, 100]
						]
							.map(([n, s, p]) => `<div style="display:grid;grid-template-columns:1fr 70px;gap:12px;align-items:center"><div><div style="font:700 18px ${F};color:${INK}">${n}</div><div style="margin-top:6px;height:12px;border-radius:6px;background:#F1E8D2"><div style="height:100%;width:${p}%;border-radius:6px;background:${p ? GREEN : 'transparent'}"></div></div></div><span style="font:800 20px ${F};color:${INK};text-align:right">${s}</span></div>`)
							.join('')}</div>`,
					{ col: 'span 8', row: 'span 2' }
				) +
					b.card(b.big('594', 'screens in total', AMBER, 90), { col: 'span 4' }) +
					b.card(dark(b, 'Part 2 · yellow alert', 'Scope grew mid-sprint', 'POS, missions and cumulative discounts were added after week one.'), { col: 'span 4', bg: INK })
			)
	}
]);

/* ── Grosir Pintar ── */
const grosir = deck('Grosir Pintar', 'grosir-pintar', 'grosir-pintar', [
	{
		name: 'landscape',
		title: 'Current condition',
		lede: 'Retailers restock from wholesalers they trust, and they choose on price first.',
		body: (b) =>
			b.grid(
				[
					['Small retailer', 'Most frequent', [['Resupply', 'up to 3× daily'], ['Order value', 'Rp 150K'], ['Monthly GMV', 'Rp 12 jt']]],
					['Medium retailer', 'Early adopters', [['Resupply', 'up to 4× weekly'], ['Order value', 'Rp 2 jt'], ['Monthly GMV', 'Rp 32 jt']]],
					['Wholesaler', 'Their “downline”', [['Monthly GMV', 'Rp 200 jt – 1.5 M'], ['Retailers', '25 – 200'], ['Repeat rate', 'up to 80%']]]
				]
					.map(([n, s, rows]) => b.card(`<div class="row" style="justify-content:space-between">${b.h(n, 26)}${tag(s)}</div>` + `<div style="display:grid;gap:8px;margin-top:12px">${rows.map(([l, v]) => `<div class="row" style="justify-content:space-between;font:600 19px ${F};color:#6F6A60"><span>${l}</span><b style="color:${INK}">${v}</b></div>`).join('')}</div>`, { col: 'span 4' }))
					.join('') +
					b.card(b.eyebrow('Supply source · deciding factors') + b.hbars([['Price', '50', 50], ['Variance', '37', 37], ['Instant delivery', '31', 31], ['Relationship', '7', 7]], { hl: [0, 2] }), { col: 'span 7' }) +
					b.card(yellow(b, 'Gap for us to solve', 'Same-day delivery to the alley', 'Small wholesalers have no logistics, so their market stops where customers can ride to.'), { col: 'span 5', bg: Y, flat: true })
			)
	},
	{
		name: 'price',
		title: 'Price fitness',
		lede: 'Our price vs the wholesalers’, then campaign 1 (27 March – 3 April) to close the gap.',
		body: (b) =>
			b.grid(
				b.card(
					`<div style="border-radius:16px;overflow:hidden;border:2px solid #F1E8D2">${[
						['SKU', 'Gap', 'Before', 'After', 'Method'],
						['Aqua 1.5L', '+3.27%', '47,400', '45,900', 'Promo + voucher'],
						['Aqua 600ml', '+1.97%', '43,848', '43,000', 'Promo + voucher'],
						['Teh Pucuk 350ml', '+8.20%', '51,000', '49,200', 'Weekly promo'],
						['Beras Rosita 5kg', '+0.43%', '59,000', '58,500', 'Weekly promo'],
						['Beras Lahap 5kg', '+2.70%', '57,000', '56,000', 'Weekly promo'],
						['Kapal Api Mix', '+0.74%', '117,864', '117,000', 'Venom voucher'],
						['Bimoli 2L', '+3.57%', '144,000', '141,120', 'Venom voucher'],
						['Fortune Refill 2L', '−8.61%', '127,944', '=', 'Already cheaper']
					]
						.map((r, i) => `<div style="display:grid;grid-template-columns:1.4fr .8fr .9fr .9fr 1.2fr;padding:11px 18px;${i ? 'border-top:2px solid #F7F1E2' : `background:${Y}`};font:${i ? 600 : 800} 18px ${F};color:${INK}"><span>${r[0]}</span><span style="color:${i && r[1].startsWith('+') ? RED : i ? GREEN : INK};font-weight:800">${r[1]}</span><span style="color:#8A857A">${r[2]}</span><span style="font-weight:800">${r[3]}</span><span style="color:#6F6A60">${r[4]}</span></div>`)
						.join('')}</div>`,
					{ col: 'span 8' }
				) + b.card(b.eyebrow('How prices were adjusted') + b.numbered(['Follow the national weekly discount promo', 'A Venom voucher on SKUs outside the promo', 'An extra Venom voucher on promo SKUs'], { size: 20 }), { col: 'span 4' }),
				{ rows: 1 }
			)
	},
	{
		name: 'campaign',
		title: 'Digital campaign',
		lede: 'Harga Spesial for Grosir Pintar agents: single SKUs or four bundles, shared on WhatsApp.',
		body: (b) =>
			b.grid(
				b.card(
					`<div style="font:800 34px ${F};color:${INK}">Harga Spesial</div><div style="font:600 19px ${F};color:#3a3630">Pilihan produk khusus Agen Grosir Pintar</div>` +
						`<div style="display:grid;gap:8px;margin-top:16px">${[['AQUA 1500ml', 'Rp 47.400', 'Rp 45.900'], ['Teh Pucuk 350ml', 'Rp 51.000', 'Rp 49.200'], ['Kapal Api Mix', 'Rp 117.864', 'Rp 117.000'], ['Beras Rosita 5kg', 'Rp 59.000', 'Rp 58.500'], ['Bimoli 2Lt', 'Rp 144.000', 'Rp 141.120']].map(([n, a, z]) => `<div class="row" style="justify-content:space-between;padding:10px 14px;border-radius:12px;background:#fff;font:700 18px ${F};color:${INK}"><span>${n}</span><span><s style="color:#9a9384;font-weight:600;margin-right:10px">${a}</s>${z}</span></div>`).join('')}</div>`,
					{ col: 'span 6', bg: Y, flat: true }
				) +
					[
						['Paket 10A', 'Rp 9.790.000'],
						['Paket 10B', 'Rp 9.824.500'],
						['Paket 7A', 'Rp 6.798.640'],
						['Paket 7B', 'Rp 6.958.200']
					]
						.map(([n, p]) => b.card(b.eyebrow('Bundle') + b.h(n, 28) + `<div style="margin-top:8px;font:800 30px ${F};color:${AMBER}">${p}</div>` + b.p('Beras, Aqua, Bimoli and Teh Pucuk by the sack and box', 17), { col: 'span 3' }))
						.join(''),
				{ rows: 2 }
			)
	},
	{
		name: 'ordering',
		title: 'Ordering methods',
		lede: 'Agents order themselves in Juragan App, or a team leader orders for them.',
		body: (b) =>
			b.grid(
				b.card(b.eyebrow('01 · Order Venom: the agent shops with a voucher') + b.flow(['WPD price list', 'Growth squad requests a % voucher', 'Team leader explains the voucher', 'Agent shops in Juragan App']), { col: 'span 12' }) +
					b.card(b.eyebrow('02 · Assisted: the team orders on the agent’s behalf', GREEN) + b.flow(['WPD price list + voucher', 'Agent asks for help', 'Agent sends the shopping list', 'Team leader places the order'], { color: GREEN }), { col: 'span 12' })
			)
	},
	{
		name: 'partnership',
		title: 'Logistics partnership',
		lede: 'Wholesalers keep their customers; Warung Pintar restocks them and delivers for them.',
		body: (b) =>
			b.grid(
				b.card(b.eyebrow('How it works') + b.flow(['Retailers order as usual', 'Wholesaler', 'Warung Pintar restocks', 'WP delivers & collects cash']) + b.p('Hypothesis: wholesalers don’t have the capacity to deliver the way retailers want.', 20), { col: 'span 12' }) +
					b.card(b.eyebrow('Wholesaler leads · two weeks earlier') + b.big('21', 'leads; 2 operational', AMBER, 60), { col: 'span 3' }) +
					b.card(b.eyebrow('Current traction') + b.hbars([['Operational', '11', 11], ['Onboarding', '10', 10], ['Rejected', '9', 9], ['Negotiation', '7', 7]], { max: 11, hl: [0] }), { col: 'span 5' }) +
					b.card(dark(b, 'Stages', 'No big-bang integration', '1 · a delivery line in store · 2 · quarterly review · 3 · the wholesaler becomes our hub'), { col: 'span 4', bg: INK })
			)
	},
	{
		name: 'pilot',
		title: 'Pilot in Surabaya',
		lede: '140 retailers heard about same-day delivery; only 12% used it. Price and guilt held them back.',
		body: (b) =>
			b.grid(
				b.card(b.eyebrow('Wholesaler 1 · onboarded 29 Feb') + b.big('15', 'orders in 3 days · Rp 250K average', AMBER, 66) + b.p('Word spread to 30 existing retailers.', 19), { col: 'span 4' }) +
					b.card(b.eyebrow('Wholesaler 2 · onboarded 2 Mar') + b.big('3', 'orders in half a shift · Rp 250K average', AMBER, 66) + b.p('110 retailers within 2 km considering it.', 19), { col: 'span 4' }) +
					b.card(`<div class="row" style="gap:22px;height:100%">${b.donut(12, '12%', { sub: 'used it', size: 170, color: RED })}<div>${b.p('of 140 retailers who heard about same-day delivery', 20)}</div></div>`, { col: 'span 4' }) +
					b.card(b.eyebrow('Medium retailers · early adopters', RED) + b.h('Our price was 2–3% higher', 26), { col: 'span 4' }) +
					b.card(b.eyebrow('Small retailers · most frequent', RED) + b.h('Felt guilty ordering Rp 100–200K deliveries', 26), { col: 'span 4' }) +
					b.card(yellow(b, 'Challenges to fix', 'Price fitness, and a separate delivery line', 'So small retailers don’t queue behind big orders.'), { col: 'span 4', bg: Y, flat: true })
			)
	},
	{
		name: 'journey',
		title: 'New retailer journey',
		lede: 'Two ways in, at the counter or by chat, and the goods arrive in under two hours.',
		body: (b) =>
			b.grid(
				b.card(b.eyebrow('At the store') + b.flow(['Visit the store', 'Go to the delivery line', 'Give & confirm the list', 'Leave the store']), { col: 'span 12' }) +
					b.card(b.eyebrow('From home', GREEN) + b.flow(['Chat the wholesaler', 'Send the order list', 'Confirm the order'], { color: GREEN }), { col: 'span 12' }) +
					b.card(yellow(b, 'Then, for both', 'Wait under 2 hours → get the goods → pay on delivery'), { col: 'span 12', bg: Y, flat: true }),
				{ rows: 3 }
			)
	},
	{
		name: 'metrics',
		title: 'Metrics & unit economics',
		lede: 'After the first weeks of the logistics partnership.',
		body: (b) =>
			b.grid(
				b.card(b.eyebrow('Active wholesalers') + stats(b, [['11', 'live'], ['Rp 170.6 jt', 'GMV via our logistics'], ['Rp 12.1 jt', 'avg GMV each']], AMBER, 36), { col: 'span 6' }) +
					b.card(b.eyebrow('Downline') + stats(b, [['146', 'retailers served'], ['13', 'per wholesaler'], ['Rp 1.3 jt', 'avg GMV each']], AMBER, 36), { col: 'span 6' }) +
					b.card(b.eyebrow('Orders') + stats(b, [['138', 'delivered'], ['Rp 958K', 'average order'], ['1.43', 'per retailer']], INK, 36), { col: 'span 6' }) +
					b.card(b.eyebrow('Costs', Y) + `<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:10px">${[['Rp 818K', 'CAC per wholesaler'], ['Rp 215K', 'per retailer acquired'], ['Rp 58K', 'per delivery']].map(([v, l]) => `<div><div style="font:800 40px ${F};color:${Y}">${v}</div><div style="font:600 18px ${F};color:#D9D4C7">${l}</div></div>`).join('')}</div>`, { col: 'span 6', bg: INK })
			)
	},
	{
		name: 'roadmap',
		title: 'Roadmap: an app for wholesalers',
		lede: 'Phasing the integration, March to August 2020.',
		body: (b, t) =>
			b.grid(
				b.card(b.eyebrow('Phase 1 · Mar–May · acquire & activate') + b.h('A selling app for wholesalers', 26) + b.p('Sales, products, customers and cash, with delivery as a toggle. Assisted orders and last-mile delivery management.', 19), { col: 'span 4' }) +
					b.card(`<div style="height:100%">${screen(t, 'Halo, Juragan', [['Transaksi hari ini', 'Rp 500.000'], 'Mulai jualan', 'Kelola produk', 'Kelola pelanggan', 'Pengiriman barang'], { hl: 4 })}</div>`, { col: 'span 4' }) +
					b.card(b.eyebrow('Phase 2 · Jun–Aug · wallet share', GREEN) + b.h('A digital downline', 26) + b.p('Agents see how active their retailers are, track memberships, and orders go to a chosen warung.', 19), { col: 'span 4' }),
				{ rows: 1 }
			)
	}
]);

/* ── Nikel: the two diagrams (the rest of the case study uses real screens) ── */
const N_BLUE = '#2C55D8';
const nikelTheme = {
	font: "'Plus Jakarta Sans'",
	bg: '#F2F5FC',
	ink: '#0A1236',
	body: '#2D3657',
	muted: '#5B6588',
	accent: N_BLUE,
	soft: '#E3E9FA',
	shadow: 'rgba(10,18,54,.25)',
	logo: 'images/clients/nikel.webp',
	project: 'Nikel · Lender Portal'
};
const nikelDeck = deckOf(nikelTheme, fonts)('nikel-lender-portal', 'nikel-lender-portal', [
	{
		name: 'experience-map',
		title: 'From checking a balance to staying in control',
		lede: 'The lender’s four questions, what each one needs, and what the portal shows.',
		body: (b) =>
			b.grid(
				[
					['Check the wallet', 'What can I use now?', 'A real-time available balance', 'Trust · readiness'],
					['Assess performance', 'How are my funds doing?', 'Funding, returns and return rate, all time', 'Context · confidence'],
					['Allocate & monitor', 'Where is my money working?', 'Loans by status: active, closed, overdue', 'Control · transparency'],
					['Reconcile movement', 'What changed this month?', 'Credits, debits and balance', 'Clarity · reassurance']
				]
					.map(([h, q, s, n], i) => b.card(`<div style="font:800 40px ${F};color:${N_BLUE}">0${i + 1}</div>` + b.h(h, 26, '#0A1236') + b.quote(q, '', N_BLUE) + b.p(s, 19) + `<div style="position:absolute;left:32px;right:32px;bottom:28px;padding:12px 14px;border-radius:14px;background:#E3E9FA;font:700 17px ${F};color:#0A1236">Needs: ${n}</div>`, { col: 'span 3' }))
					.join(''),
				{ rows: 1 }
			)
	},
	{
		name: 'metric-model',
		title: 'Make each number answer one question',
		lede: 'Every metric says which period it covers and how it is calculated.',
		body: (b) =>
			b.grid(
				[
					['Wallet · real time', 'Available balance', 'RDL balance − pending balance', 'Funding or withdrawal still in transit stays pending.'],
					['Performance · all time', 'Return value & rate', 'Interest received · interest ÷ total funded', 'The period and denominator sit beside the metric.'],
					['Reconciliation · month to date', 'Wallet movement', 'Beginning + credits − debits = ending', 'Loan state stays separate from wallet movement.']
				]
					.map(([e, h, f, p]) => b.card(b.eyebrow(e) + b.h(h, 30, '#0A1236') + `<div style="margin-top:16px;padding:16px 18px;border-radius:14px;background:#0A1236;font:600 20px/1.4 'JetBrains Mono';color:#C9D4FF">${f}</div>` + b.p(p, 19), { col: 'span 4' }))
					.join('') + b.card(b.eyebrow('Loan states, never mixed with wallet movement') + b.chips(['Active', 'Closed', 'Written off', 'Overdue'], { bg: '#E3E9FA', fg: '#0A1236', size: 22 }), { col: 'span 12' }),
				{ rows: '2.2fr 1fr' }
			)
	}
]).map((s) => ({ ...s, fonts: [...fonts, 'JetBrains+Mono:wght@600'] }));

export const warungPintar = [...mitra, ...awp, ...heuristic, ...home, ...reskin, ...grosir];
export const nikel = nikelDeck;
