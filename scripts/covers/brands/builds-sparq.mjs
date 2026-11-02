// SparQ: one process told across three windows, the way the modules work
// together. A query from the SQL editor becomes a scheduled workflow task, and
// the dashboard built on it refreshes by itself.
const DISPLAY = "'Funnel Display'";
const MONO = "'JetBrains Mono'";
const FONTS = ['Syne:wght@700;800', 'Funnel+Display:wght@500;600;700;800', 'JetBrains+Mono:wght@500;700'];

const win = (title, inner, style) =>
	`<div class="abs art" style="border-radius:24px;overflow:hidden;background:#0B1650;box-shadow:0 0 0 2px rgba(129,140,248,.55),0 0 70px rgba(99,102,241,.35),0 40px 70px -30px #000;${style}">
		<div class="row" style="gap:9px;padding:14px 20px;background:#111E6B"><i style="width:12px;height:12px;border-radius:50%;background:#FF5F57"></i><i style="width:12px;height:12px;border-radius:50%;background:#FEBC2E"></i><i style="width:12px;height:12px;border-radius:50%;background:#28C840"></i><span style="margin-left:12px;font:700 23px ${DISPLAY};color:#DDE3FF">${title}</span></div>
		<div style="padding:20px 22px">${inner}</div>
	</div>`;
/** Step label above a window: number + what happens. */
const step = (n, text, style) =>
	`<div class="abs txt row" style="gap:14px;${style}"><span style="width:52px;height:52px;border-radius:50%;background:#fff;color:#1d2fd8;display:grid;place-items:center;font:800 28px ${DISPLAY}">${n}</span><span style="font:700 36px ${DISPLAY};letter-spacing:-.02em;color:#fff">${text}</span></div>`;
const K = (t) => `<span style="color:#7DD3FC">${t}</span>`;
const S = (t) => `<span style="color:#FDE68A">${t}</span>`;

const sqlEditor = `
	<div style="font:500 24px/1.55 ${MONO};color:#C9D4FF">${K('SELECT')} region, ${K('SUM')}(revenue)<br>${K('FROM')} sales.orders<br>${K('GROUP BY')} region</div>
	<div style="margin-top:14px;border-radius:12px;overflow:hidden;font:600 20px ${DISPLAY};color:#DDE3FF">${[
		['Java', 'Rp 4.2B'],
		['Sumatra', 'Rp 2.9B'],
		['Kalimantan', 'Rp 1.6B']
	]
		.map(([r, v], i) => `<div class="row" style="justify-content:space-between;padding:9px 14px;background:${i % 2 ? '#0F1C5E' : '#132270'}"><span>${r}</span><b>${v}</b></div>`)
		.join('')}</div>
	<div class="row" style="gap:10px;margin-top:16px;width:fit-content;padding:12px 18px;border-radius:12px;background:#4F46E5;box-shadow:0 0 24px rgba(99,102,241,.8);font:700 22px ${DISPLAY};color:#fff">＋ Add to workflow</div>`;

const task = (label, color, glow) =>
	`<div class="row" style="gap:10px;padding:12px 16px;border-radius:14px;background:${glow ? 'rgba(99,102,241,.35)' : 'rgba(255,255,255,.08)'};box-shadow:inset 0 0 0 2px ${glow ? '#A5B4FC' : 'rgba(255,255,255,.14)'};font:700 21px ${DISPLAY};color:#fff;white-space:nowrap"><i style="width:14px;height:14px;border-radius:50%;background:${color}"></i>${label}</div>`;
const workflow = `
	<div class="row" style="gap:12px;align-items:center">
		${task('load_orders', '#22C55E')}<b style="color:#818CF8;font-size:26px">→</b>${task('revenue_by_region', '#22C55E', true)}<b style="color:#818CF8;font-size:26px">→</b>${task('refresh', '#F5B70A')}
	</div>
	<div class="row" style="gap:12px;margin-top:18px">
		<span style="padding:10px 16px;border-radius:99px;background:rgba(255,255,255,.1);font:700 21px ${DISPLAY};color:#DDE3FF">⏱ Daily · 06:00</span>
		<span style="padding:10px 16px;border-radius:99px;background:rgba(34,197,94,.18);font:700 21px ${DISPLAY};color:#86EFAC">✓ Last run · 2m 14s</span>
	</div>`;

const dashboard = `
	<div class="row" style="justify-content:space-between;font:700 24px ${DISPLAY};color:#fff"><span>Revenue by region</span><span style="padding:5px 12px;border-radius:99px;background:rgba(34,197,94,.2);color:#86EFAC;font-size:18px">● Live</span></div>
	<div class="row" style="align-items:flex-end;gap:16px;height:170px;margin-top:18px">${[
		['Java', 100],
		['Sumatra', 69],
		['Kalimantan', 38]
	]
		.map(([l, h], i) => `<div style="flex:1;text-align:center"><div style="height:${h * 1.3}px;border-radius:10px 10px 4px 4px;background:${i ? '#6366F1' : 'linear-gradient(#67E8F9,#22D3EE)'}"></div><div style="margin-top:8px;font:600 18px ${DISPLAY};color:#C9D4FF">${l}</div></div>`)
		.join('')}</div>
	<div style="margin-top:12px;font:600 19px ${DISPLAY};color:#A5B4FC">Updated 06:02 by the workflow</div>`;

export const sparq = {
	slug: 'sparq',
	dir: 'sparq',
	fonts: FONTS,
	css: `
		.stage{background:radial-gradient(55% 60% at 55% 62%,#2a4bff 0%,rgba(42,75,255,0) 70%),radial-gradient(40% 50% at 92% 18%,#7c3aed55 0%,transparent 70%),#050B2E}
		.gridl{inset:0;background-image:linear-gradient(rgba(255,255,255,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.05) 1px,transparent 1px);background-size:64px 64px;mask-image:radial-gradient(70% 70% at 55% 60%,#000,transparent)}`,
	html: `<div class="stage grain">
		<div class="abs gridl"></div>
		<div class="abs txt" style="left:84px;top:84px;font:800 120px/.8 'Syne';letter-spacing:-.07em;color:#fff">SparQ</div>
		<div class="abs txt" style="left:90px;top:190px;width:640px;font:700 38px/1.15 'Syne';letter-spacing:-.03em;color:#D3DCFF">One query, scheduled, and the dashboard keeps itself fresh.</div>
		<svg class="abs" style="left:0;top:0" width="1600" height="1000" fill="none" stroke-linecap="round">
			<defs><linearGradient id="g1" x1="0" x2="1"><stop offset="0" stop-color="#818CF8"/><stop offset="1" stop-color="#22D3EE"/></linearGradient></defs>
			<path d="M1150 660 C 1230 620, 1250 560, 1250 520" stroke="url(#g1)" stroke-width="6"/>
			<path d="M1240 532 l10 -14 9 14" stroke="#22D3EE" stroke-width="6"/>
		</svg>
		${step(1, 'Write the query', 'left:96px;top:330px')}
		${win('SQL editor', sqlEditor, 'left:96px;top:400px;width:500px')}
		${step(2, 'Schedule it', 'left:600px;top:600px')}
		${win('Workflow · daily_revenue', workflow, 'left:600px;top:670px;width:700px')}
		${step(3, 'Dashboard refreshes', 'left:1020px;top:120px')}
		${win('Dashboard', dashboard, 'left:1020px;top:190px;width:500px')}
	</div>`
};
