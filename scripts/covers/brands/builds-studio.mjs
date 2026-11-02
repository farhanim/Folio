// Jardin Timesheet and Devfartha IELTS, redrawn on request as product scenes:
// a laptop on a ribbed stage with floating cards, and a wordmark behind a laptop.
import { laptop, shot } from '../kit.mjs';

const DISPLAY = "'Funnel Display'";
const FONTS = ['Funnel+Display:wght@500;600;700;800'];

/* ── Jardin Timesheet: time recorded, matters billed ── */
const GOLD = '#D8B56A';
const glass = (inner, style) =>
	`<div class="abs art" style="padding:24px 28px;border-radius:26px;background:rgba(255,255,255,.92);box-shadow:0 30px 60px -24px rgba(0,0,0,.6);font-family:${DISPLAY};color:#0d2a20;${style}">${inner}</div>`;
export const jardin = {
	slug: 'jardin-timesheet',
	dir: 'jardin-timesheet',
	fonts: FONTS,
	css: `
		.stage{background:radial-gradient(70% 60% at 62% 30%,#1d5c47 0%,#0d3a2c 45%,#061a13 100%)}
		.ribs{left:-400px;right:-400px;top:640px;height:900px;transform:perspective(1100px) rotateX(64deg);transform-origin:50% 0;
			background:repeating-linear-gradient(90deg,#0b2f24 0 30px,#1a6a50 30px 36px,#0e3a2d 36px 66px);
			mask-image:linear-gradient(#000 20%,transparent 90%)}
		.light{left:700px;top:420px;width:900px;height:400px;border-radius:50%;background:radial-gradient(closest-side,rgba(216,181,106,.35),transparent)}
		.lap{left:640px;top:200px;width:880px;transform:perspective(2200px) rotateY(-16deg) rotateX(6deg)}`,
	html: `<div class="stage grain">
		<div class="abs light"></div>
		<div class="abs ribs"></div>
		<div class="abs txt" style="left:96px;top:110px;font:800 108px/.92 ${DISPLAY};letter-spacing:-.045em;color:#fff">Jardin<br><span style="color:${GOLD}">Timesheet</span></div>
		<div class="abs txt" style="left:96px;top:345px;font:600 44px/1.2 ${DISPLAY};letter-spacing:-.02em;color:#E7DDC2">Time → matters → invoices</div>
		${laptop(shot('jardin-timesheet', 3), 'left:640px;top:200px;width:880px;transform:perspective(2200px) rotateY(-16deg) rotateX(6deg)')}
		${glass(`<div class="row" style="gap:14px;font:700 26px ${DISPLAY}"><i style="width:16px;height:16px;border-radius:50%;background:#E5484D;box-shadow:0 0 0 6px rgba(229,72,77,.2)"></i>Recording</div><div style="font:800 64px/1.05 ${DISPLAY};letter-spacing:-.03em;margin-top:6px">02:15:40</div>`, 'left:500px;top:560px;transform:rotate(-4deg)')}
		${glass(`<div style="display:grid;gap:12px">${['Invoice', 'Tax invoice', 'Receipt'].map((d, i) => `<div class="row" style="gap:14px;font:700 30px ${DISPLAY}"><i style="width:30px;height:36px;border-radius:6px;background:${['#0d3a2c', GOLD, '#7aa594'][i]}"></i>${d}</div>`).join('')}</div>`, 'left:1250px;top:600px;transform:rotate(4deg)')}
	</div>`
};

/* ── Devfartha IELTS: the test name, the work, the band ── */
const BLUE = '#1B2CC1';
const SUN = '#FFD400';
export const ielts = {
	slug: 'ielts-course',
	dir: 'ielts-course',
	fonts: FONTS,
	css: `
		.stage{background:radial-gradient(80% 70% at 50% 100%,#3348F0 0%,${BLUE} 55%,#101c8c 100%)}
		.word{left:0;right:0;top:110px;text-align:center;font:800 470px/.8 ${DISPLAY};letter-spacing:-.06em;color:#fff}
		.chip{position:absolute;padding:14px 26px;border-radius:99px;background:#fff;font:700 38px ${DISPLAY};letter-spacing:-.02em;color:${BLUE};box-shadow:0 20px 30px -14px rgba(0,0,30,.5)}`,
	html: `<div class="stage grain">
		<div class="abs word">IELTS</div>
		${laptop(shot('ielts-course', 5), 'left:330px;top:420px;width:940px')}
		<div class="abs art" style="left:1210px;top:470px;width:290px;padding:28px 30px;border-radius:30px;background:${SUN};color:${BLUE};font-family:${DISPLAY};box-shadow:0 40px 60px -24px rgba(0,0,40,.6);transform:rotate(5deg)">
			<div style="font:700 40px ${DISPLAY}">Band</div><div style="font:800 140px/.9 ${DISPLAY};letter-spacing:-.05em">7.0</div>
		</div>
		<div class="chip art" style="left:110px;top:520px;transform:rotate(-5deg)">Listening</div>
		<div class="chip art" style="left:150px;top:640px;transform:rotate(3deg)">Reading</div>
	</div>`
};
