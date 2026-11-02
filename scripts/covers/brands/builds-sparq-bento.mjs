// SparQ as a full-bleed bento: tiles meet the canvas edges with thin gutters.
// Left column: the title, centred. Right: the Workflows screen on top, then
// Experiments and Catalog. Badge corner and "Live preview" corner stay calm.
import { shot } from '../kit.mjs';

const DISPLAY = "'Funnel Display'";
const MONO = "'JetBrains Mono'";
const G = 14; // gutter

const tile = (inner, { x, y, w, h, bg, style = '' }) =>
	`<div class="abs art" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px;border-radius:30px;overflow:hidden;background:${bg};${style}">${inner}</div>`;
const label = (text, bg, fg) =>
	`<span style="display:inline-block;padding:9px 18px;border-radius:99px;background:${bg};color:${fg};font:700 26px ${DISPLAY};letter-spacing:-.01em">${text}</span>`;

const LEFT = 660;
const RX = LEFT + G;
const RW = 1600 - RX;
const TOP_H = 600;
const BY = TOP_H + G;
const BW = (RW - G) / 2;

export const sparq = {
	slug: 'sparq',
	dir: 'sparq',
	fonts: ['Syne:wght@700;800', 'Funnel+Display:wght@500;600;700;800', 'JetBrains+Mono:wght@500;700'],
	css: `.stage{background:#040A26}`,
	html: `<div class="stage grain soft">
		${tile(
			`<div class="abs txt" style="left:70px;top:310px;width:540px">
				<div style="font:800 108px/.8 'Syne';letter-spacing:-.07em;color:#fff">SparQ</div>
				<div style="margin-top:34px;font:500 44px/1.15 ${DISPLAY};letter-spacing:-.025em;color:#C7D2FE">Catalog, SQL, workflows and ML in <b style="color:#fff;font-weight:700">one workspace.</b></div>
				<div class="row" style="gap:12px;margin-top:34px;width:fit-content;padding:14px 22px;border-radius:99px;background:rgba(255,255,255,.12);box-shadow:inset 0 0 0 1.5px rgba(255,255,255,.2);font:600 28px ${DISPLAY};color:#E0E7FF"><i style="width:12px;height:12px;border-radius:50%;background:#22D3EE"></i>Runs in the browser</div>
			</div>`,
			{ x: 0, y: 0, w: LEFT, h: 1000, bg: 'radial-gradient(120% 90% at 0% 30%,#1E3AFF 0%,#0B1650 65%)' }
		)}
		${tile(
			`<div style="position:absolute;left:46px;top:84px">${label('Workflows', '#0B1650', '#fff')}</div>
			<img src="${shot('sparq', 3)}" style="position:absolute;left:46px;top:150px;width:1060px;border-radius:18px;box-shadow:0 24px 50px -20px rgba(10,20,80,.5)">`,
			{ x: RX, y: 0, w: RW, h: TOP_H, bg: 'linear-gradient(160deg,#EEF1FF,#C7D2FE)' }
		)}
		${tile(
			`<div style="padding:40px 44px">${label('Experiments', 'rgba(255,255,255,.18)', '#fff')}
				<div class="row" style="align-items:flex-end;gap:14px;margin-top:20px"><b style="font:800 100px/.85 ${DISPLAY};letter-spacing:-.05em;color:#fff">0.94</b><span style="font:600 28px ${DISPLAY};color:#DCE3FF;padding-bottom:10px">accuracy</span></div>
				<svg width="370" height="90" viewBox="0 0 370 90" fill="none" style="margin-top:14px"><path d="M0 82 C 60 78, 100 50, 160 36 S 290 12, 370 8" stroke="#fff" stroke-width="7" stroke-linecap="round"/></svg>
			</div>`,
			{ x: RX, y: BY, w: BW, h: 1000 - BY, bg: 'linear-gradient(160deg,#3B5BFF,#1E3AFF)' }
		)}
		${tile(
			`<div style="padding:40px 44px">${label('Catalog', '#E8ECFF', '#1E3AFF')}
				<div style="margin-top:24px;display:grid;gap:14px">${['sales.orders', 'crm.customers', 'ops.inventory'].map((t, i) => `<div class="row" style="gap:14px;font:600 28px ${MONO};color:${i ? '#5B6696' : '#0B1650'}"><i style="width:18px;height:18px;border-radius:5px;background:${i ? '#C7D2FE' : '#1E3AFF'}"></i>${t}</div>`).join('')}</div>
			</div>`,
			{ x: RX + BW + G, y: BY, w: BW, h: 1000 - BY, bg: '#fff' }
		)}
	</div>`
};
