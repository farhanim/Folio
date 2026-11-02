// SparQ, Data Room and SILMA: real screens plus a few value callouts, each in its
// own layout and title treatment (bento grid, centred hero, split editorial).
import { browser, laptop, shot } from '../kit.mjs';

const DISPLAY = "'Funnel Display'";
const MONO = "'JetBrains Mono'";
const FONTS = ['Syne:wght@700;800', 'Funnel+Display:wght@400;500;600;700;800', 'JetBrains+Mono:wght@500;700'];

const label = (text, bg, fg) =>
	`<span style="display:inline-block;padding:8px 16px;border-radius:99px;background:${bg};color:${fg};font:700 24px ${DISPLAY};letter-spacing:-.01em">${text}</span>`;

/* ── SparQ: a bento of what the workspace does ── */
const tile = (inner, style) =>
	`<div class="abs art" style="border-radius:34px;overflow:hidden;${style}">${inner}</div>`;
export const sparq = {
	slug: 'sparq',
	dir: 'sparq',
	fonts: FONTS,
	css: `.stage{background:#040A26}`,
	html: `<div class="stage grain soft">
		${tile(
			`<div style="padding:84px 56px 0">
				<div style="font:800 112px/.8 'Syne';letter-spacing:-.07em;color:#fff">SparQ</div>
				<div style="margin-top:30px;font:500 42px/1.15 ${DISPLAY};letter-spacing:-.025em;color:#C7D2FE">Catalog, SQL, workflows and ML in <b style="color:#fff;font-weight:700">one workspace.</b></div>
			</div>`,
			'left:16px;top:16px;width:652px;height:492px;background:radial-gradient(120% 120% at 0% 0%,#1E3AFF 0%,#0B1650 60%)'
		)}
		${tile(
			`<div style="position:absolute;left:44px;top:70px;z-index:2">${label('Workflows', '#0B1650', '#fff')}</div>
			<img src="${shot('sparq', 3)}" style="position:absolute;left:44px;top:136px;width:1040px;border-radius:16px;box-shadow:0 20px 50px -20px rgba(10,20,80,.5)">`,
			'left:684px;top:16px;width:900px;height:620px;background:linear-gradient(160deg,#E8ECFF,#C7D2FE)'
		)}
		${tile(
			`<div style="padding:40px 56px">${label('Experiments', 'rgba(255,255,255,.18)', '#fff')}
				<div class="row" style="align-items:flex-end;gap:16px;margin-top:22px"><b style="font:800 110px/.85 ${DISPLAY};letter-spacing:-.05em;color:#fff">0.94</b><span style="font:600 30px ${DISPLAY};color:#DCE3FF;padding-bottom:10px">accuracy</span></div>
				<svg width="540" height="120" viewBox="0 0 540 120" fill="none" style="margin-top:14px"><path d="M0 110 C 90 104, 150 70, 240 50 S 420 18, 540 12" stroke="#fff" stroke-width="7" stroke-linecap="round"/><path d="M0 116 C 120 112, 220 96, 320 84 S 460 70, 540 66" stroke="#9DB0FF" stroke-width="5" stroke-linecap="round" stroke-dasharray="2 14"/></svg>
			</div>`,
			'left:16px;top:524px;width:652px;height:460px;background:linear-gradient(160deg,#3B5BFF,#1E3AFF)'
		)}
		${tile(
			`<div style="padding:30px 34px">${label('Catalog', '#E8ECFF', '#1E3AFF')}
				<div style="margin-top:22px;display:grid;gap:12px">${['sales.orders', 'crm.customers', 'ops.inventory'].map((t, i) => `<div class="row" style="gap:14px;font:600 26px ${MONO};color:${i ? '#5B6696' : '#0B1650'}"><i style="width:18px;height:18px;border-radius:5px;background:${i ? '#C7D2FE' : '#1E3AFF'}"></i>${t}</div>`).join('')}</div>
			</div>`,
			'left:684px;top:652px;width:442px;height:332px;background:#fff'
		)}
		${tile(
			`<div style="padding:30px 34px">${label('Runs in the browser', 'rgba(255,255,255,.14)', '#fff')}
				<div class="row" style="align-items:flex-end;gap:14px;margin-top:30px"><b style="font:800 120px/.8 ${DISPLAY};letter-spacing:-.05em;color:#22D3EE">0</b><span style="font:600 32px/1.1 ${DISPLAY};color:#DCE3FF;padding-bottom:6px">servers<br>to demo</span></div>
			</div>`,
			'left:1142px;top:652px;width:442px;height:332px;background:#0B1650;box-shadow:inset 0 0 0 2px rgba(129,140,248,.35)'
		)}
	</div>`
};

/* ── Data Room: centred title, the library on a laptop, three values ── */
const SAND = '#F4E6C4';
const AMBER = '#E0A93E';
const ICON = {
	rooms: '<path d="M6 14h14l4 5h18v21H6z"/>',
	eye: '<path d="M4 24s7-13 20-13 20 13 20 13-7 13-20 13S4 24 4 24z"/><circle cx="24" cy="24" r="6"/>',
	log: '<rect x="9" y="6" width="30" height="36" rx="4"/><path d="M16 16h16M16 24h16M16 32h10"/>'
};
const value = (k, text, style) =>
	`<div class="abs txt row" style="gap:16px;padding:16px 26px 16px 16px;border-radius:99px;background:rgba(28,19,8,.82);box-shadow:inset 0 0 0 1.5px rgba(244,230,196,.3),0 24px 40px -18px #000;backdrop-filter:blur(8px);${style}">
		<span style="width:58px;height:58px;border-radius:50%;background:${AMBER};display:grid;place-items:center"><svg width="32" height="32" viewBox="0 0 48 48" fill="none" stroke="#1E1408" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">${ICON[k]}</svg></span>
		<span style="font:700 34px ${DISPLAY};letter-spacing:-.02em;color:${SAND}">${text}</span></div>`;
export const dataroom = {
	slug: 'dataroom',
	dir: 'dataroom',
	fonts: FONTS,
	css: `.stage{background:radial-gradient(60% 55% at 50% 72%,#8a5a16 0%,rgba(138,90,22,0) 70%),linear-gradient(#1a1209,#0e0904)}
		.ring{border-radius:50%;border:1.5px solid rgba(224,169,62,.18)}`,
	html: `<div class="stage grain">
		<div class="abs ring" style="left:300px;top:260px;width:1000px;height:1000px"></div>
		<div class="abs txt" style="left:0;right:0;margin:0 auto;width:fit-content;top:76px;text-align:center">
			<div style="font:300 34px ${DISPLAY};letter-spacing:.32em;text-transform:uppercase;color:${AMBER}">IKN Nusantara</div>
			<div style="margin-top:10px;font:800 120px/.9 ${DISPLAY};letter-spacing:-.05em;color:${SAND}">Data Room</div>
		</div>
		${laptop(shot('dataroom', 2), 'left:470px;top:360px;width:660px')}
		${value('rooms', '8 thematic rooms', 'left:60px;top:430px')}
		${value('eye', 'In-browser preview', 'left:1170px;top:520px')}
		${value('log', 'Every action logged', 'left:40px;top:620px')}
	</div>`
};

/* ── SILMA: split editorial, the process on the left, the product on the right ── */
const BLUE = '#0A2A8A';
const NAVY = '#0a1f5c';
const stepRow = (n, title, line) =>
	`<div class="row" style="gap:24px;align-items:flex-start;padding:22px 0;border-top:1.5px solid rgba(255,255,255,.2)">
		<span style="font:700 30px ${MONO};color:#7FB2FF;padding-top:6px">${n}</span>
		<div><div style="font:700 44px/1 ${DISPLAY};letter-spacing:-.025em;color:#fff">${title}</div><div style="margin-top:8px;font:500 28px ${DISPLAY};color:#BCD0FF">${line}</div></div>
	</div>`;
export const silma = {
	slug: 'silma',
	dir: 'silma',
	fonts: FONTS,
	css: `
		.stage{background:linear-gradient(150deg,#DCE7FF 0%,#B9CDFF 100%)}
		.left{left:0;top:0;bottom:0;width:700px;background:${BLUE}}
		.kawung{left:0;top:0;bottom:0;width:700px;opacity:.08;background:
			radial-gradient(ellipse 22px 34px at 50% 0,#fff 98%,transparent),radial-gradient(ellipse 22px 34px at 50% 100%,#fff 98%,transparent),
			radial-gradient(ellipse 34px 22px at 0 50%,#fff 98%,transparent),radial-gradient(ellipse 34px 22px at 100% 50%,#fff 98%,transparent);background-size:80px 80px}`,
	html: `<div class="stage grain soft">
		<div class="abs left"></div><div class="abs kawung"></div>
		<div class="abs txt" style="left:90px;top:90px;font:800 150px/.8 ${DISPLAY};letter-spacing:-.06em;color:#fff">SILMA</div>
		<div class="abs txt" style="left:94px;top:236px;font:500 34px ${DISPLAY};color:#BCD0FF">State-asset services, Kemendikbud</div>
		<div class="abs txt" style="left:90px;top:330px;width:540px">
			${stepRow('01', 'Request', 'Plan, procure, borrow or transfer')}
			${stepRow('02', 'Approve', 'Each service, its own workflow')}
			${stepRow('03', 'Hand over', 'Signed report, printed label')}
		</div>
		${browser(shot('silma', 3), { style: 'left:780px;top:150px;width:760px;transform:rotate(2deg)' })}
		<div class="abs art" style="left:820px;top:640px;width:470px;padding:28px 32px;border-radius:24px;background:#fff;box-shadow:0 40px 70px -24px rgba(10,30,90,.55);transform:rotate(-4deg)">
			<div class="row" style="justify-content:space-between"><span style="font:800 30px ${DISPLAY};color:${NAVY}">Asset label</span><span style="padding:6px 14px;border-radius:10px;background:#0D47C9;color:#fff;font:700 24px ${MONO}">BMN</span></div>
			<div style="margin-top:18px;height:92px;background:repeating-linear-gradient(90deg,${NAVY} 0 5px,transparent 5px 10px,${NAVY} 10px 13px,transparent 13px 19px,${NAVY} 19px 26px,transparent 26px 30px)"></div>
		</div>
	</div>`
};
