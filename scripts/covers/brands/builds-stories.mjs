// SparQ, Pendar Cahaya, Data Room and SILMA, redrawn on request to show what each
// product does (its objects and flows), not just its screens.
import { shot } from '../kit.mjs';

const DISPLAY = "'Funnel Display'";
const MONO = "'JetBrains Mono'";
const FONTS = ['Funnel+Display:wght@500;600;700;800', 'JetBrains+Mono:wght@500;700'];

/* ── SparQ: data in, orchestrated, value out — a product hero, not a feature list ── */
const glass = (inner, style) =>
	`<div class="abs art" style="border-radius:26px;background:linear-gradient(160deg,rgba(255,255,255,.16),rgba(255,255,255,.06));box-shadow:inset 0 0 0 1.5px rgba(255,255,255,.22),0 30px 60px -30px rgba(0,0,0,.7);backdrop-filter:blur(10px);${style}">${inner}</div>`;
const SRC = {
	db: '<ellipse cx="24" cy="11" rx="15" ry="6"/><path d="M9 11v26c0 3.3 6.7 6 15 6s15-2.7 15-6V11M9 24c0 3.3 6.7 6 15 6s15-2.7 15-6"/>',
	cloud: '<path d="M14 38h22a9 9 0 0 0 0-18 12 12 0 0 0-23-2A10 10 0 0 0 14 38z"/>',
	stream: '<path d="M4 16c6-6 10 6 16 0s10-6 16 0 8 4 8 4M4 28c6-6 10 6 16 0s10-6 16 0 8 4 8 4"/>'
};
const source = (k, name, y, c) =>
	glass(
		`<div class="row" style="gap:16px;padding:18px 22px"><span style="flex:none;width:58px;height:58px;border-radius:16px;background:${c};display:grid;place-items:center"><svg width="36" height="36" viewBox="0 0 48 48" fill="none" stroke="#fff" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">${SRC[k]}</svg></span><span style="font:700 30px ${DISPLAY};color:#fff;letter-spacing:-.02em">${name}</span></div>`,
		`left:70px;top:${y}px;width:330px`
	);
const step = (label, state) => {
	const c = { done: '#22C55E', run: '#F5B70A', wait: 'rgba(255,255,255,.35)' }[state];
	return `<div style="position:relative;text-align:center"><i style="display:block;width:44px;height:44px;margin:0 auto;border-radius:50%;background:${c};box-shadow:0 0 18px ${c}"></i><div style="margin-top:10px;font:700 22px ${DISPLAY};color:#fff">${label}</div></div>`;
};
const beam = (x1, y1, x2, y2) => {
	const mx = (x1 + x2) / 2;
	const d = `M${x1} ${y1} C ${mx} ${y1}, ${mx} ${y2}, ${x2} ${y2}`;
	return `<path d="${d}" stroke="url(#beam)" stroke-width="5" fill="none" stroke-linecap="round"/><path d="${d}" stroke="#fff" stroke-width="5" fill="none" stroke-linecap="round" stroke-dasharray="2 40" opacity=".9"/>`;
};
export const sparq = {
	slug: 'sparq',
	dir: 'sparq',
	fonts: ['Syne:wght@600;700;800', ...FONTS],
	css: `
		.stage{background:radial-gradient(50% 60% at 52% 60%,#2a4bff 0%,rgba(42,75,255,0) 70%),radial-gradient(40% 50% at 90% 20%,#7c3aed55 0%,transparent 70%),#050B2E}
		.gridl{inset:0;background-image:linear-gradient(rgba(255,255,255,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.05) 1px,transparent 1px);background-size:64px 64px;mask-image:radial-gradient(70% 70% at 55% 60%,#000,transparent)}
		h1{font:800 130px/.8 'Syne';letter-spacing:-.07em;color:#fff}`,
	html: `<div class="stage grain">
		<div class="abs gridl"></div>
		<h1 class="abs txt" style="left:84px;top:90px">SparQ</h1>
		<div class="abs txt" style="left:90px;top:212px;width:900px;font:600 42px/1.15 'Syne';letter-spacing:-.03em;color:#D3DCFF">Turn your data into your next big idea.</div>
		<svg class="abs" style="left:0;top:0" width="1600" height="1000">
			<defs><linearGradient id="beam" x1="0" x2="1"><stop offset="0" stop-color="#22D3EE"/><stop offset="1" stop-color="#6366F1"/></linearGradient></defs>
			${beam(390, 512, 540, 580)}${beam(390, 642, 540, 600)}${beam(390, 772, 540, 620)}
			${beam(1080, 560, 1150, 380)}${beam(1080, 600, 1150, 590)}${beam(1080, 640, 1150, 800)}
		</svg>
		${source('db', 'PostgreSQL', 470, '#2563EB')}${source('cloud', 'S3 bucket', 600, '#0EA5E9')}${source('stream', 'Kafka stream', 730, '#7C3AED')}
		<div class="abs art" style="left:520px;top:330px;width:560px;border-radius:28px;overflow:hidden;background:#0B1650;box-shadow:0 0 0 2px rgba(99,102,241,.6),0 0 80px rgba(99,102,241,.45),0 40px 80px -30px #000">
			<div class="row" style="gap:10px;padding:16px 22px;background:#101E66"><i style="width:13px;height:13px;border-radius:50%;background:#FF5F57"></i><i style="width:13px;height:13px;border-radius:50%;background:#FEBC2E"></i><i style="width:13px;height:13px;border-radius:50%;background:#28C840"></i><span style="margin-left:14px;font:700 24px ${MONO};color:#C9D4FF">workflow · daily_revenue</span></div>
			<div style="padding:24px">
				<div style="position:relative;display:grid;grid-template-columns:repeat(4,1fr);gap:8px">
					<div class="abs" style="left:12%;right:12%;top:20px;height:4px;background:linear-gradient(90deg,#22C55E 60%,#F5B70A 60% 80%,rgba(255,255,255,.25) 80%)"></div>
					${step('Extract', 'done')}${step('Transform', 'done')}${step('Train', 'run')}${step('Publish', 'wait')}
				</div>
				<div style="margin-top:20px;padding:16px 18px;border-radius:14px;background:#060D36;font:500 23px/1.5 ${MONO};color:#C9D4FF"><span style="color:#7DD3FC">df</span> = spark.table(<span style="color:#FDE68A">"sales.orders"</span>)<br>df.groupBy(<span style="color:#FDE68A">"region"</span>).sum(<span style="color:#FDE68A">"revenue"</span>)</div>
				<div class="row" style="gap:12px;margin-top:18px;padding:14px 18px;border-radius:14px;background:rgba(34,197,94,.15);font:700 24px ${DISPLAY};color:#86EFAC"><i style="width:14px;height:14px;border-radius:50%;background:#22C55E"></i>Run succeeded · 2m 14s</div>
			</div>
		</div>
		${glass(`<div style="padding:20px 24px"><div style="font:700 28px ${DISPLAY};color:#fff">Revenue by region</div><div class="row" style="align-items:flex-end;gap:12px;height:90px;margin-top:14px">${[50, 72, 44, 90, 66, 100].map((h, i) => `<i style="flex:1;height:${h}%;border-radius:8px 8px 3px 3px;background:${i === 5 ? '#22D3EE' : 'rgba(255,255,255,.3)'}"></i>`).join('')}</div></div>`, 'left:1150px;top:270px;width:380px')}
		${glass(`<div style="padding:20px 24px"><div class="row" style="justify-content:space-between;font:700 28px ${DISPLAY};color:#fff"><span>churn_model v3</span><span style="padding:4px 12px;border-radius:99px;background:#22C55E;color:#04210f;font-size:20px">Prod</span></div><svg width="332" height="64" viewBox="0 0 332 64" fill="none" style="margin-top:10px"><path d="M0 58 C 60 54, 100 30, 160 22 S 260 10, 332 6" stroke="#A5B4FC" stroke-width="5" stroke-linecap="round"/></svg></div>`, 'left:1150px;top:500px;width:380px')}
		${glass(`<div class="row" style="gap:16px;padding:20px 24px"><span style="width:16px;height:16px;border-radius:50%;background:#22C55E;box-shadow:0 0 14px #22C55E"></span><span style="font:700 28px ${DISPLAY};color:#fff">Feature table · fresh</span></div>`, 'left:1150px;top:760px;width:380px')}
	</div>`
};

/* ── Pendar Cahaya: a museum wall, hung salon-style ── */
const CREAM = '#F3E7CC';
const GOLD = '#C9A35A';
const frame = (inner, style, pad = 18) =>
	`<div class="abs art" style="padding:${pad}px;background:linear-gradient(145deg,#3a2f1c,#120e07);box-shadow:0 40px 60px -26px #000,inset 0 0 0 2px #5a4828;${style}">${inner}</div>`;
const portrait = (x, y, w, tilt) => `
	<div class="abs art" style="left:${x}px;top:${y}px;width:${w}px;height:${w * 1.28}px;border-radius:50%;padding:12px;background:linear-gradient(145deg,#E2C27A,#8a6a2c);box-shadow:0 30px 40px -20px #000;transform:rotate(${tilt}deg)">
		<div style="position:relative;width:100%;height:100%;border-radius:50%;overflow:hidden;background:radial-gradient(circle at 50% 40%,#E9D3A6,#B48A55 75%)">
			<div class="abs" style="left:50%;bottom:-18%;width:78%;height:46%;margin-left:-39%;border-radius:50% 50% 0 0;background:#4a3420"></div>
			<div class="abs" style="left:50%;top:30%;width:34%;height:30%;margin-left:-17%;border-radius:46%;background:#5a3f26"></div>
			<div class="abs" style="left:50%;top:22%;width:38%;height:14%;margin-left:-19%;border-radius:8px 8px 3px 3px;background:#2b1d10"></div>
		</div>
	</div>`;
const plaque = (text, style) =>
	`<div class="abs txt" style="padding:12px 22px;background:${CREAM};font:700 36px ${DISPLAY};letter-spacing:-.02em;color:#2b2212;box-shadow:0 14px 20px -10px #000;${style}">${text}</div>`;
export const muskitnas = {
	slug: 'muskitnas',
	dir: 'muskitnas',
	fonts: FONTS,
	css: `
		.stage{background:radial-gradient(70% 80% at 65% 30%,#3a2f22 0%,#1d1710 50%,#0d0a07 100%)}
		.cone{background:radial-gradient(50% 100% at 50% 0%,rgba(255,232,180,.22),transparent 70%);clip-path:polygon(44% 0,56% 0,100% 100%,0 100%)}
		.rail{left:0;right:0;top:880px;height:3px;background:rgba(201,163,90,.3)}`,
	html: `<div class="stage grain">
		<div class="abs cone" style="left:720px;top:-40px;width:860px;height:760px"></div>
		<div class="abs cone" style="left:60px;top:200px;width:620px;height:700px;opacity:.7"></div>
		<div class="abs rail"></div>
		<div class="abs txt" style="left:96px;top:96px;font:800 100px/.92 ${DISPLAY};letter-spacing:-.045em;color:${CREAM}">Pendar<br>Cahaya</div>
		<div class="abs txt" style="left:100px;top:300px;width:540px;font:600 38px/1.2 ${DISPLAY};color:#D8C9A8">An online exhibition on Indonesia’s mental-health history</div>
		${portrait(110, 470, 150, -4)}${portrait(290, 450, 170, 2)}${portrait(490, 480, 140, 5)}
		${plaque('7 STOVIA doctors', 'left:150px;top:720px')}
		${frame(`<img src="${shot('muskitnas', 1)}" style="width:620px">`, 'left:800px;top:120px')}
		${frame(`<div style="position:relative"><img src="${shot('muskitnas', 2)}" style="width:380px"><div class="abs" style="left:50%;top:50%;width:96px;height:96px;margin:-48px 0 0 -48px;border-radius:50%;background:rgba(243,231,204,.95);display:grid;place-items:center;font:800 40px ${DISPLAY};color:#2b2212">▶</div></div>`, 'left:760px;top:560px', 14)}
		${frame(`<img src="${shot('muskitnas', 3)}" style="width:300px">`, 'left:1210px;top:560px', 14)}
		${plaque('5 documentary films', 'left:800px;top:830px')}
	</div>`
};

/* ── Data Room: eight thematic rooms, one locked preview, every move logged ── */
const ROOMS = [
	['🗺️', 'Planning'],
	['📐', 'Land'],
	['🏗️', 'Infrastructure'],
	['💼', 'Investment'],
	['🌳', 'Environment'],
	['💰', 'Finance'],
	['⚖️', 'Legal'],
	['📁', 'General']
];
const SAND = '#F4E6C4';
const AMBER = '#D9A441';
export const dataroom = {
	slug: 'dataroom',
	dir: 'dataroom',
	fonts: FONTS,
	css: `
		.stage{background:#1a130a}
		.photo{inset:0;background:url(${shot('dataroom', 1)}) 0 50%/175% auto no-repeat;filter:saturate(.7) brightness(.55)}
		.shade{inset:0;background:linear-gradient(90deg,rgba(20,14,6,.96) 30%,rgba(20,14,6,.7) 60%,rgba(20,14,6,.55))}
		.room{display:flex;flex-direction:column;justify-content:space-between;height:150px;padding:20px 20px;border-radius:22px;background:rgba(255,255,255,.1);box-shadow:inset 0 0 0 2px rgba(244,230,196,.18);font:700 27px ${DISPLAY};letter-spacing:-.02em;color:${SAND}}
		.room b{font-size:44px;line-height:1}`,
	html: `<div class="stage grain">
		<div class="abs photo"></div><div class="abs shade"></div>
		<div class="abs txt" style="left:96px;top:96px;font:800 104px/.92 ${DISPLAY};letter-spacing:-.045em;color:${SAND}">Data Room</div>
		<div class="abs txt" style="left:100px;top:210px;width:560px;font:600 40px/1.2 ${DISPLAY};color:#E3CFA2">Every document of IKN Nusantara, in eight rooms</div>
		<div class="abs art" style="left:96px;top:420px;width:560px;padding:24px 28px;border-radius:26px;background:rgba(0,0,0,.35);box-shadow:inset 0 0 0 2px rgba(244,230,196,.15);font:600 26px/1.6 ${DISPLAY};color:${SAND}">
			<div style="font:700 22px ${MONO};letter-spacing:.08em;color:${AMBER};margin-bottom:6px">ACTIVITY LOG</div>
			<div><span style="color:${AMBER}">Uploaded</span> · Masterplan Rev3.pdf</div>
			<div><span style="color:${AMBER}">Shared</span> · Anggaran Tahap II.xlsx</div>
			<div><span style="color:${AMBER}">Moved</span> · Kajian Lingkungan.docx</div>
		</div>
		<div class="abs art" style="left:700px;top:300px;width:800px;display:grid;grid-template-columns:repeat(4,1fr);gap:14px">
			${ROOMS.map(([i, n]) => `<div class="room"><b>${i}</b>${n}</div>`).join('')}
		</div>
		<div class="abs art" style="left:1000px;top:640px;width:420px;border-radius:24px;background:#fff;overflow:hidden;box-shadow:0 40px 70px -24px #000;transform:rotate(-3deg)">
			<div class="row" style="gap:14px;padding:18px 22px;background:${SAND}"><img src="projects/dataroom/assets/pdf-BJ6KXv3j.png" style="width:44px"><span style="font:700 26px ${DISPLAY};color:#2a2015">Masterplan.pdf</span><span style="margin-left:auto;font-size:28px">🔒</span></div>
			<div style="padding:20px 22px;display:grid;gap:10px">${[90, 70, 84, 56].map((w) => `<i style="height:12px;width:${w}%;border-radius:6px;background:#E9DFC9"></i>`).join('')}</div>
			<div class="row" style="gap:8px;padding:0 22px 20px">${['Admin', 'Editor', 'Viewer'].map((r, i) => `<span style="padding:7px 14px;border-radius:99px;font:700 20px ${DISPLAY};${i ? 'background:#F4EEE0;color:#6b5a3a' : `background:${AMBER};color:#2a2015`}">${r}</span>`).join('')}</div>
		</div>
	</div>`
};

/* ── SILMA: a state asset, its label and its approval trail ── */
const BLUE = '#0D47C9';
const steps = ['Diajukan', 'Diverifikasi', 'Disetujui', 'Serah terima'];
export const silma = {
	slug: 'silma',
	dir: 'silma',
	fonts: FONTS,
	css: `
		.stage{background:radial-gradient(90% 90% at 70% 40%,#2b6bff 0%,${BLUE} 50%,#08318f 100%)}
		.kawung{inset:0;opacity:.12;background:
			radial-gradient(ellipse 22px 34px at 50% 0,#fff 98%,transparent),radial-gradient(ellipse 22px 34px at 50% 100%,#fff 98%,transparent),
			radial-gradient(ellipse 34px 22px at 0 50%,#fff 98%,transparent),radial-gradient(ellipse 34px 22px at 100% 50%,#fff 98%,transparent);background-size:80px 80px}
		.svc{padding:16px 24px;border-radius:99px;background:rgba(255,255,255,.14);box-shadow:inset 0 0 0 2px rgba(255,255,255,.25);font:700 32px ${DISPLAY};color:#fff}`,
	html: `<div class="stage grain">
		<div class="abs kawung"></div>
		<div class="abs txt" style="left:96px;top:96px;font:800 150px/.85 ${DISPLAY};letter-spacing:-.05em;color:#fff">SILMA</div>
		<div class="abs txt" style="left:100px;top:250px;width:560px;font:600 40px/1.2 ${DISPLAY};color:#D6E3FF">State-asset services for the Directorate General of Culture</div>
		<div class="abs art" style="left:96px;top:450px;width:560px;display:flex;flex-wrap:wrap;gap:14px">
			${['Perencanaan', 'Pengadaan', 'Peminjaman', 'Pemindahtanganan'].map((s) => `<span class="svc">${s}</span>`).join('')}
		</div>
		<div class="abs art" style="left:800px;top:150px;width:660px;padding:34px 38px;border-radius:28px;background:#fff;box-shadow:0 50px 80px -30px rgba(0,10,60,.7);transform:rotate(-3deg)">
			<div class="row" style="justify-content:space-between"><span style="font:700 24px ${MONO};letter-spacing:.1em;color:${BLUE}">BARANG MILIK NEGARA</span><span style="padding:6px 14px;border-radius:10px;background:${BLUE};color:#fff;font:700 22px ${MONO}">BMN</span></div>
			<div style="margin-top:16px;font:800 52px/1 ${DISPLAY};letter-spacing:-.03em;color:#0a1f5c">Gamelan Jawa, 1 set</div>
			<div style="margin-top:10px;font:600 28px ${MONO};color:#4a5b85">3.05.02.06.001 · 2023</div>
			<div class="row" style="gap:24px;margin-top:22px;align-items:flex-end">
				<div style="flex:1;height:96px;background:repeating-linear-gradient(90deg,#0a1f5c 0 4px,transparent 4px 8px,#0a1f5c 8px 10px,transparent 10px 15px,#0a1f5c 15px 20px,transparent 20px 23px)"></div>
				<div style="width:96px;height:96px;background:conic-gradient(#0a1f5c 25%,#fff 0 50%,#0a1f5c 0 75%,#fff 0) 0 0/24px 24px;border:6px solid #0a1f5c"></div>
			</div>
		</div>
		<div class="abs art" style="left:820px;top:610px;width:680px;padding:30px 34px;border-radius:28px;background:#071d5e;box-shadow:inset 0 0 0 2px rgba(255,255,255,.12)">
			<div class="row" style="gap:0;align-items:flex-start">
				${steps
					.map(
						(s, i) => `<div style="flex:1;text-align:center;position:relative">
					${i ? `<div class="abs" style="left:-50%;right:50%;top:26px;height:5px;background:${i < 3 ? '#4ADE80' : 'rgba(255,255,255,.25)'}"></div>` : ''}
					<div style="position:relative;width:56px;height:56px;margin:0 auto;border-radius:50%;background:${i < 3 ? '#4ADE80' : '#FFD54A'};color:#06204f;display:grid;place-items:center;font:800 28px ${DISPLAY}">${i < 3 ? '✓' : '4'}</div>
					<div style="margin-top:14px;font:700 28px/1.1 ${DISPLAY};color:#fff">${s}</div></div>`
					)
					.join('')}
			</div>
		</div>
	</div>`
};

/* ── Derkei Security: the guard, the services, the back office behind them ── */
const NAVY = '#0B1A3D';
const RED = '#E23B3B';
const service = (label, style) =>
	`<div class="abs art" style="padding:16px 26px;border-radius:99px;background:#fff;font:700 34px ${DISPLAY};letter-spacing:-.02em;color:${NAVY};box-shadow:0 20px 34px -16px rgba(0,0,0,.6);${style}">${label}</div>`;
export const derkei = {
	slug: 'derkei',
	dir: 'derkei',
	fonts: FONTS,
	css: `
		.stage{background:radial-gradient(80% 90% at 72% 45%,#22397e 0%,#0f2152 50%,#070f26 100%)}
		.rings{left:760px;top:60px;width:820px;height:820px;border-radius:50%;background:repeating-radial-gradient(circle,rgba(255,255,255,.08) 0 2px,transparent 2px 70px)}`,
	html: `<div class="stage grain">
		<div class="abs rings"></div>
		<div class="abs txt" style="left:96px;top:96px;font:800 104px/.92 ${DISPLAY};letter-spacing:-.045em;color:#fff">Derkei<br>Security</div>
		<div class="abs txt" style="left:100px;top:320px;width:540px;font:600 40px/1.2 ${DISPLAY};color:#C9D3F2">A security firm’s website and the back office behind its guards</div>
		<svg class="abs art" style="left:1000px;top:120px" width="300" height="340" viewBox="0 0 300 340"><path d="M150 10 L280 60 V170 C280 250 220 305 150 330 C80 305 20 250 20 170 V60 Z" fill="${RED}" opacity=".9"/><path d="M150 60 L235 95 V170 C235 225 195 262 150 280 C105 262 65 225 65 170 V95 Z" fill="none" stroke="#fff" stroke-width="10"/></svg>
		<div class="abs" style="left:1146px;top:0;width:8px;height:420px;background:linear-gradient(${RED},#8f1d1d)"></div>
		<div class="abs art" style="left:960px;top:360px;width:380px;padding:26px;border-radius:28px;background:#fff;box-shadow:0 50px 80px -30px #000;transform:rotate(-4deg)">
			<div style="width:70px;height:12px;margin:-6px auto 18px;border-radius:6px;background:#D5DAE6"></div>
			<div class="row" style="gap:20px">
				<div style="position:relative;width:120px;height:140px;border-radius:18px;background:#DCE3F2;overflow:hidden"><div class="abs" style="left:50%;bottom:-24px;width:110px;height:80px;margin-left:-55px;border-radius:50px 50px 0 0;background:${NAVY}"></div><div class="abs" style="left:50%;top:26px;width:54px;height:60px;margin-left:-27px;border-radius:26px;background:#B98B62"></div><div class="abs" style="left:50%;top:16px;width:70px;height:24px;margin-left:-35px;border-radius:12px 12px 4px 4px;background:${NAVY}"></div></div>
				<div><div style="font:700 22px ${MONO};letter-spacing:.08em;color:${RED}">ANGGOTA</div><div style="font:800 38px/1.05 ${DISPLAY};color:${NAVY};margin-top:6px">Satpam</div><div style="font:600 24px ${DISPLAY};color:#5a6788;margin-top:6px">Guarding division</div></div>
			</div>
			<div style="margin-top:18px;padding:12px 16px;border-radius:14px;background:#EEF2FA;font:700 24px ${DISPLAY};color:${NAVY}">Posted · Client site 12</div>
		</div>
		${service('Guarding', 'left:740px;top:520px;transform:rotate(-5deg)')}
		${service('Bodyguards', 'left:1330px;top:330px;transform:rotate(5deg)')}
		${service('K9 units', 'left:1350px;top:600px;transform:rotate(-3deg)')}
		${service('Training', 'left:780px;top:700px;transform:rotate(3deg)')}
		${service('Escort', 'left:1180px;top:810px;transform:rotate(-2deg)')}
	</div>`
};
