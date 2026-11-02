// SparQ, Data Room and SILMA, simplified on request: one idea per cover, two or
// three large elements, a title and one short line.
const DISPLAY = "'Funnel Display'";
const MONO = "'JetBrains Mono'";
const FONTS = ['Syne:wght@700;800', 'Funnel+Display:wght@500;600;700;800', 'JetBrains+Mono:wght@500;700'];

const headline = (title, line, { color = '#fff', sub = '#D3DCFF', font = DISPLAY, size = 120 } = {}) => `
	<div class="abs txt" style="left:96px;top:96px;font:800 ${size}px/.86 ${font};letter-spacing:-.06em;color:${color}">${title}</div>
	<div class="abs txt" style="left:100px;top:${96 + size * 0.95}px;width:640px;font:600 44px/1.15 ${DISPLAY};letter-spacing:-.025em;color:${sub}">${line}</div>`;

/* ── SparQ: a query that feeds a chart, on a schedule ── */
const K = (t) => `<span style="color:#7DD3FC">${t}</span>`;
export const sparq = {
	slug: 'sparq',
	dir: 'sparq',
	fonts: FONTS,
	css: `.stage{background:radial-gradient(55% 60% at 62% 62%,#2a4bff 0%,rgba(42,75,255,0) 70%),#050B2E}`,
	html: `<div class="stage grain">
		${headline('SparQ', 'Query once. Always fresh.', { font: "'Syne'" })}
		<div class="abs art" style="left:640px;top:330px;width:520px;padding:34px 36px;border-radius:28px;background:#0B1650;box-shadow:0 0 0 2px rgba(129,140,248,.55),0 0 80px rgba(99,102,241,.4);font:500 34px/1.6 ${MONO};color:#DDE3FF;transform:rotate(-3deg)">
			${K('SELECT')} region,<br>&nbsp;&nbsp;${K('SUM')}(revenue)<br>${K('FROM')} sales
		</div>
		<svg class="abs" style="left:0;top:0" width="1600" height="1000" fill="none"><path d="M1120 560 C 1200 600, 1180 680, 1180 700" stroke="#22D3EE" stroke-width="8" stroke-linecap="round" stroke-dasharray="2 22"/></svg>
		<div class="abs art row" style="left:1170px;top:300px;gap:12px;padding:16px 24px;border-radius:99px;background:#fff;font:700 36px ${DISPLAY};color:#1d2fd8;box-shadow:0 20px 40px -16px #000">⏱ Daily · 06:00</div>
		<div class="abs art" style="left:960px;top:640px;width:560px;padding:30px 34px;border-radius:28px;background:#fff;box-shadow:0 40px 70px -30px #000;transform:rotate(2deg)">
			<div class="row" style="justify-content:space-between;font:800 36px ${DISPLAY};color:#0b1a5c"><span>Revenue</span><span style="font-size:26px;color:#16A34A">● Live</span></div>
			<div class="row" style="align-items:flex-end;gap:18px;height:130px;margin-top:18px">${[60, 85, 50, 100, 72].map((h, i) => `<i style="flex:1;height:${h}%;border-radius:12px 12px 4px 4px;background:${i === 3 ? '#22D3EE' : '#C7D2FE'}"></i>`).join('')}</div>
		</div>
	</div>`
};

/* ── Data Room: one locked document, the rooms behind it ── */
const SAND = '#F4E6C4';
const AMBER = '#E0A93E';
const tab = (label, x, y, r, bg) =>
	`<div class="abs art" style="left:${x}px;top:${y}px;width:360px;height:440px;border-radius:26px;background:${bg};transform:rotate(${r}deg);box-shadow:0 30px 50px -24px #000"><div style="padding:24px 28px;font:800 36px ${DISPLAY};letter-spacing:-.02em;color:#2a2015">${label}</div></div>`;
export const dataroom = {
	slug: 'dataroom',
	dir: 'dataroom',
	fonts: FONTS,
	css: `.stage{background:radial-gradient(55% 60% at 68% 60%,#7a4f12 0%,rgba(122,79,18,0) 70%),#120C05}`,
	html: `<div class="stage grain">
		${headline('Data Room', 'Every IKN document, one secure room.', { color: SAND, sub: '#E8D3A6', size: 110 })}
		${tab('Planning', 800, 320, -12, '#C9A25E')}
		${tab('Land', 910, 270, -4, '#E2C383')}
		<div class="abs art" style="left:1040px;top:250px;width:440px;height:560px;padding:34px;border-radius:28px;background:#FBF6EA;box-shadow:0 50px 80px -30px #000;transform:rotate(4deg)">
			<div class="row" style="gap:16px"><img src="projects/dataroom/assets/pdf-BJ6KXv3j.png" style="width:60px"><span style="font:800 36px ${DISPLAY};letter-spacing:-.02em;color:#2a2015">Masterplan</span></div>
			<div style="display:grid;gap:16px;margin-top:30px">${[90, 72, 84, 60, 78].map((w) => `<i style="height:16px;width:${w}%;border-radius:8px;background:#E9DFC9"></i>`).join('')}</div>
			<div style="margin-top:28px;height:130px;border-radius:16px;background:linear-gradient(135deg,#D9C59A,#B79A62)"></div>
		</div>
		<div class="abs art row" style="left:1180px;top:760px;gap:12px;padding:18px 28px;border-radius:99px;background:${AMBER};font:800 38px ${DISPLAY};color:#1E1408;box-shadow:0 24px 40px -16px #000">🔒 View only</div>
	</div>`
};

/* ── SILMA: one state asset, labelled and approved ── */
const NAVY = '#0a1f5c';
export const silma = {
	slug: 'silma',
	dir: 'silma',
	fonts: FONTS,
	css: `.stage{background:radial-gradient(55% 60% at 68% 55%,#2f6bff 0%,rgba(47,107,255,0) 70%),#061636}`,
	html: `<div class="stage grain">
		${headline('SILMA', 'State assets, from request to handover.', { sub: '#D6E3FF' })}
		<div class="abs art" style="left:800px;top:300px;width:700px;padding:40px 44px;border-radius:32px;background:#fff;box-shadow:0 60px 90px -30px #000;transform:rotate(-4deg)">
			<div class="row" style="justify-content:space-between"><span style="font:800 34px ${DISPLAY};color:${NAVY}">Asset label</span><span style="padding:8px 18px;border-radius:12px;background:#0D47C9;color:#fff;font:700 30px ${MONO}">BMN</span></div>
			<div style="margin-top:30px;height:150px;background:repeating-linear-gradient(90deg,${NAVY} 0 6px,transparent 6px 12px,${NAVY} 12px 15px,transparent 15px 22px,${NAVY} 22px 30px,transparent 30px 34px)"></div>
			<div style="margin-top:20px;font:600 32px ${MONO};letter-spacing:.06em;color:#4a5b85">3.05.02.06.001</div>
		</div>
		<div class="abs art" style="left:1080px;top:650px;padding:14px 28px;border:8px solid #22C55E;border-radius:18px;font:900 64px ${DISPLAY};letter-spacing:.02em;color:#22C55E;background:rgba(6,22,54,.75);transform:rotate(-12deg)">APPROVED</div>
	</div>`
};
