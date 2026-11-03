// Cyclone Coffee, Artemis, SIMAL, Parsing Data, Remote Task, Smart Survey and
// SignalViewer. Each cover is one idea drawn in HTML/SVG (not a screenshot pasted
// on a colour), and no two share a composition:
// - Cyclone Coffee: light and airy, the dashboard tilted on the left, text on the right
// - Artemis: occupancy turning into a forecast, a glass card where it breaches 80%
// - SIMAL: a radar on the left, text on the right
// - Parsing Data: the nightly job, feeds in, five tasks and their timeline, the result
// - Remote Task: the field box with three operator phones, a tower, and the benchmark
// - Smart Survey: the rigger's phone form beside the finished report, text bottom-right
// - SignalViewer: the map across the top with one stat, text bottom-right
import { IDN } from '../data/indonesia.mjs';
import { shot } from '../kit.mjs';

const txt = (style, inner) => `<div class="abs txt" style="${style}">${inner}</div>`;

/* ── Cyclone Coffee ───────────────────────────────────────────────────────── */
// Light and airy: Geist with an Instrument Serif italic accent, the real
// dashboard tilted in 3D on the left, glass cards floating over it, text right.
const LIME = '#D4F542';
const INK = '#14160F';
const SERIF = "'Instrument Serif'";
const SANS = "'Geist'";
const glass = (style, inner) =>
	`<div class="abs art" style="padding:26px 30px;border-radius:26px;background:rgba(255,255,255,.78);backdrop-filter:blur(18px);box-shadow:0 0 0 1.5px rgba(255,255,255,.9) inset,0 30px 60px -28px rgba(30,40,10,.45);font-family:${SANS};${style}">${inner}</div>`;
export const cycoffee = {
	slug: 'cycoffee',
	dir: 'cycoffee',
	fonts: ['Geist:wght@400;500;600;700', 'Instrument+Serif:ital@0;1'],
	css: `.stage{background:
		radial-gradient(55% 60% at 25% 40%,rgba(212,245,66,.55) 0%,rgba(212,245,66,0) 70%),
		radial-gradient(40% 50% at 100% 100%,rgba(255,214,150,.45),transparent 70%),
		#F3F2EC}
		.tilt{transform:perspective(2600px) rotateY(18deg) rotateX(8deg) rotateZ(-3deg);transform-origin:100% 50%}`,
	html: `<div class="stage grain soft">
		${txt(
			`left:930px;top:290px;width:580px;font-family:${SANS}`,
			`<div style="font-weight:600;font-size:92px;line-height:.98;letter-spacing:-.055em;color:${INK}">Orders, tasks &amp; stock,<br><span style="font:italic 400 108px/.9 ${SERIF};letter-spacing:-.02em;white-space:nowrap">in one app.</span></div>
			<div style="margin-top:34px;font-weight:400;font-size:40px;line-height:1.2;letter-spacing:-.025em;color:#5C6050;text-wrap:balance">A coffee business, run day to day.</div>`
		)}
		<div class="abs art tilt" style="left:-150px;top:120px;width:1000px;border-radius:24px;overflow:hidden;background:#fff;box-shadow:0 0 0 1.5px rgba(20,22,15,.08),0 70px 120px -50px rgba(40,50,10,.55)">
			<img src="${shot('cycoffee', 1)}" style="width:100%">
		</div>
		${glass(
			'left:540px;top:560px;width:320px;background:' + LIME,
			`<div style="font:500 24px ${SANS};color:#3A4410">Tugas aktif</div>
			<div style="display:flex;align-items:baseline;gap:14px;margin-top:6px"><span style="font:600 88px/1 ${SANS};letter-spacing:-.05em;color:${INK}">7</span><span style="font:italic 400 40px ${SERIF};color:${INK}">tasks</span></div>
			<div style="margin-top:10px;font:500 22px ${SANS};color:#3A4410">+Rp5.000 komisi each</div>`
		)}
		${glass(
			'left:70px;top:500px;width:380px',
			`<div style="display:flex;justify-content:space-between;font:500 22px ${SANS};color:#6B6F60"><span>Saldo saat ini</span><span style="color:#16A34A">▲ 88%</span></div>
			<div style="margin-top:8px;font:600 50px ${SANS};letter-spacing:-.04em;color:${INK}">Rp20.158.000</div>
			<div style="display:flex;height:10px;border-radius:99px;overflow:hidden;margin-top:16px"><i style="flex:88;background:#16A34A"></i><i style="flex:12;background:#EF4444"></i></div>`
		)}
	</div>`
};

/* ── Artemis ──────────────────────────────────────────────────────────────── */
// Dark plum, Hanken Grotesk. Occupancy grows month by month; past "today" the
// line turns into a forecast and a glass card marks where it crosses 80%.
const ART = { w: 760, h: 560, today: 360, th: 220 };
const occ = (x) => 520 - 460 * Math.pow(x / ART.w, 1.8);
const occPath = Array.from({ length: 77 }, (_, i) => {
	const x = (i / 76) * ART.w;
	return `${i ? 'L' : 'M'}${x.toFixed(1)} ${occ(x).toFixed(1)}`;
}).join(' ');
const breachX = ART.w * Math.pow((520 - ART.th) / 460, 1 / 1.8);
const domain = (name, value, color) =>
	`<span style="display:inline-flex;align-items:center;gap:12px;padding:12px 22px;border-radius:99px;background:rgba(255,255,255,.08);box-shadow:inset 0 0 0 1.5px rgba(255,255,255,.12);font:600 28px 'Hanken Grotesk';color:#fff"><i style="width:12px;height:12px;border-radius:50%;background:${color}"></i>${name}<b style="font-weight:500;color:#C8BFF0">${value}</b></span>`;
export const artemis = {
	slug: 'artemis',
	dir: 'artemis',
	fonts: ['Hanken+Grotesk:wght@500;600;700;800'],
	css: `.stage{background:
		radial-gradient(55% 65% at 80% 45%,rgba(255,77,141,.32),transparent 65%),
		radial-gradient(70% 80% at 0% 0%,#3B1E7A 0%,transparent 60%),
		#140C2E}`,
	html: `<div class="stage grain soft">
		${txt(
			`left:96px;top:110px;width:640px;font-family:'Hanken Grotesk'`,
			`<div style="font:700 30px 'Hanken Grotesk';letter-spacing:.02em;color:#FF7AAE">Capacity forecast</div>
			<div style="margin-top:28px;font-weight:800;font-size:100px;line-height:.95;letter-spacing:-.05em;color:#fff">See the breach <span style="color:#FF7AAE">before</span> it happens.</div>
			<div style="display:flex;flex-wrap:wrap;gap:14px;margin-top:44px">${domain('Core', '68%', '#8B7CFF')}${domain('Transport', '63%', '#4FC3F7')}${domain('RAN', '62%', '#FF7AAE')}</div>`
		)}
		<svg class="abs art" style="left:800px;top:290px" width="${ART.w}" height="${ART.h}" viewBox="-10 0 ${ART.w + 20} ${ART.h}">
			<defs>
				<linearGradient id="al" x1="0" x2="1"><stop offset="0" stop-color="#8B7CFF"/><stop offset="1" stop-color="#FF4D8D"/></linearGradient>
				<linearGradient id="af" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FF4D8D" stop-opacity=".32"/><stop offset="1" stop-color="#FF4D8D" stop-opacity="0"/></linearGradient>
				<clipPath id="past"><rect x="-10" y="0" width="${ART.today + 10}" height="${ART.h}"/></clipPath>
				<clipPath id="next"><rect x="${ART.today}" y="0" width="${ART.w}" height="${ART.h}"/></clipPath>
			</defs>
			<rect x="0" y="0" width="${ART.w}" height="${ART.th}" fill="#FF4D8D" opacity=".07"/>
			<path d="${occPath} L${ART.w} ${ART.h} L0 ${ART.h} Z" fill="url(#af)"/>
			<line x1="0" x2="${ART.w}" y1="${ART.th}" y2="${ART.th}" stroke="#fff" stroke-opacity=".5" stroke-width="3" stroke-dasharray="14 12"/>
			<text x="0" y="${ART.th - 18}" font-family="Hanken Grotesk" font-weight="700" font-size="26" fill="#fff" fill-opacity=".7">80%</text>
			<line x1="${ART.today}" x2="${ART.today}" y1="${ART.th + 40}" y2="${ART.h}" stroke="#fff" stroke-opacity=".25" stroke-width="2"/>
			<text x="${ART.today + 14}" y="${ART.h - 16}" font-family="Hanken Grotesk" font-weight="600" font-size="24" fill="#fff" fill-opacity=".6">today</text>
			<path d="${occPath}" clip-path="url(#past)" fill="none" stroke="url(#al)" stroke-width="10" stroke-linecap="round"/>
			<path d="${occPath}" clip-path="url(#next)" fill="none" stroke="#FF4D8D" stroke-width="10" stroke-dasharray="1 20" stroke-linecap="round"/>
			<circle cx="${ART.today}" cy="${occ(ART.today)}" r="12" fill="#fff"/>
			<circle cx="${breachX}" cy="${ART.th}" r="48" fill="#FF4D8D" opacity=".25"/>
			<circle cx="${breachX}" cy="${ART.th}" r="18" fill="#FF4D8D" stroke="#fff" stroke-width="5"/>
		</svg>
		<div class="abs art" style="left:${800 + breachX - 330}px;top:${290 + ART.th + 60}px;padding:22px 28px;border-radius:24px;background:rgba(255,255,255,.1);backdrop-filter:blur(14px);box-shadow:inset 0 0 0 1.5px rgba(255,255,255,.18),0 30px 60px -30px rgba(0,0,0,.6);font-family:'Hanken Grotesk'">
			<div style="font:600 24px 'Hanken Grotesk';color:#FFB3CF">Breach in 5 months</div>
			<div style="margin-top:6px;font:800 44px 'Hanken Grotesk';letter-spacing:-.03em;color:#fff">SGSN · 83% by May</div>
		</div>
	</div>`
};

/* ── SIMAL ────────────────────────────────────────────────────────────────── */
const R = { cx: 500, cy: 470, r: 330 };
const bases = [
	['TIFA-JKT', 0.42, 300],
	['MKB-JKU', 0.7, 228],
	['PSB-SBY', 0.35, 80],
	['PMK-MKS', 0.86, 60],
	['PBL-MDN', 0.58, 160],
	['PBT-BTG', 0.9, 260]
];
export const navy = {
	slug: 'navy',
	dir: 'navy',
	fonts: ['Sora:wght@400;600;700;800'],
	css: `.stage{background:radial-gradient(60% 70% at 72% 58%,#0F4C81 0%,#0A2540 55%,#06182B 100%)}`,
	html: `<div class="stage grain soft">
		${txt(
			`left:960px;top:300px;width:560px;font-family:Sora`,
			`<div style="display:flex;align-items:center;gap:16px;font:600 30px Sora;color:#F2C94C"><img src="images/clients/simal.webp" style="width:52px;height:52px;border-radius:12px">SIMAL</div>
			<div style="margin-top:36px;font-weight:800;font-size:92px;line-height:1;letter-spacing:-.045em;color:#fff">Six naval bases, one command view.</div>
			<div style="margin-top:32px;font-weight:400;font-size:42px;line-height:1.2;letter-spacing:-.02em;color:#9CC3E6;text-wrap:balance">Calls, personnel and facilities, live.</div>`
		)}
		<svg class="abs art" style="left:${R.cx - R.r - 20}px;top:${R.cy - R.r - 20}px" width="${R.r * 2 + 40}" height="${R.r * 2 + 40}" viewBox="${R.cx - R.r - 20} ${R.cy - R.r - 20} ${R.r * 2 + 40} ${R.r * 2 + 40}">
			<defs>
				<radialGradient id="rg"><stop offset="0" stop-color="#1E9BD7" stop-opacity=".25"/><stop offset="1" stop-color="#1E9BD7" stop-opacity="0"/></radialGradient>
				<linearGradient id="sw" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#4FC3F7" stop-opacity="0"/><stop offset="1" stop-color="#4FC3F7" stop-opacity=".55"/></linearGradient>
			</defs>
			<circle cx="${R.cx}" cy="${R.cy}" r="${R.r}" fill="url(#rg)"/>
			${[1, 0.75, 0.5, 0.25].map((k) => `<circle cx="${R.cx}" cy="${R.cy}" r="${R.r * k}" fill="none" stroke="#4FC3F7" stroke-opacity="${k === 1 ? 0.5 : 0.18}" stroke-width="2"/>`).join('')}
			<line x1="${R.cx - R.r}" x2="${R.cx + R.r}" y1="${R.cy}" y2="${R.cy}" stroke="#4FC3F7" stroke-opacity=".15" stroke-width="2"/>
			<line y1="${R.cy - R.r}" y2="${R.cy + R.r}" x1="${R.cx}" x2="${R.cx}" stroke="#4FC3F7" stroke-opacity=".15" stroke-width="2"/>
			<path d="M${R.cx} ${R.cy} L${R.cx + R.r} ${R.cy} A${R.r} ${R.r} 0 0 0 ${R.cx + R.r * Math.cos(-0.9)} ${R.cy + R.r * Math.sin(-0.9)} Z" fill="url(#sw)" transform="rotate(-20 ${R.cx} ${R.cy})"/>
			${bases
				.map(([name, k, deg]) => {
					const a = (deg * Math.PI) / 180;
					const x = R.cx + Math.cos(a) * R.r * k;
					const y = R.cy - Math.sin(a) * R.r * k;
					const left = Math.cos(a) < -0.2;
					return `<circle cx="${x}" cy="${y}" r="20" fill="#F2C94C" opacity=".22"/><circle cx="${x}" cy="${y}" r="9" fill="#F2C94C"/>
					<text x="${x + (left ? -22 : 22)}" y="${y + 9}" text-anchor="${left ? 'end' : 'start'}" font-family="Sora" font-weight="600" font-size="26" fill="#fff">${name}</text>`;
				})
				.join('')}
			<circle cx="${R.cx}" cy="${R.cy}" r="10" fill="#4FC3F7"/>
		</svg>
	</div>`
};

/* ── Parsing Data ─────────────────────────────────────────────────────────── */
// Warm white, DM Sans + DM Mono. The nightly job as the app shows it: feeds
// flowing in, five tasks from extract to load, their timeline, and the result.
const INDIGO = '#4338CA';
const PT_OK = '#16A34A';
const ptStat = (value, label) =>
	`<div><div style="font:700 60px/1 'DM Sans';letter-spacing:-.04em;color:#1C1917">${value}</div><div style="margin-top:8px;font:500 24px 'DM Sans';color:#78716C">${label}</div></div>`;
const tasks = [
	['extract', 'ok', 0, 18],
	['validate', 'ok', 18, 10],
	['parse', 'ok', 28, 26],
	['transform', 'run', 54, 22],
	['load', 'wait', 76, 20]
];
const taskNode = ([name, state], i) => {
	const bg = state === 'ok' ? PT_OK : state === 'run' ? INDIGO : '#E7E5E4';
	const mark =
		state === 'ok'
			? '<path d="M-14 0 l9 9 l18 -19" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>'
			: state === 'run'
				? '<circle r="16" fill="none" stroke="#fff" stroke-opacity=".35" stroke-width="6"/><path d="M0 -16 A16 16 0 0 1 16 0" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round"/>'
				: '<circle r="8" fill="#A8A29E"/>';
	const x = 70 + i * 150;
	return `<g transform="translate(${x} 120)">
		${i ? `<line x1="-106" x2="-46" y1="0" y2="0" stroke="${state === 'wait' ? '#E7E5E4' : INDIGO}" stroke-width="5" stroke-dasharray="${state === 'wait' ? '8 8' : '0'}"/>` : ''}
		${state === 'run' ? `<circle r="62" fill="${INDIGO}" opacity=".14"/>` : ''}
		<circle r="44" fill="${bg}"/>${mark}
		<text y="88" text-anchor="middle" font-family="DM Mono" font-weight="500" font-size="22" fill="#57534E">${name}</text>
	</g>`;
};
const gantt = tasks
	.map(([, state, start, len], i) => {
		const color = state === 'ok' ? PT_OK : state === 'run' ? INDIGO : '#D6D3D1';
		return `<rect x="${40 + start * 6.8}" y="${250 + i * 24}" width="${len * 6.8}" height="16" rx="8" fill="${color}" opacity="${state === 'wait' ? 1 : 0.9}"/>`;
	})
	.join('');
const inflow = (kind, file) =>
	`<span style="display:inline-flex;align-items:center;gap:10px;padding:10px 18px 10px 10px;border-radius:99px;background:#fff;box-shadow:0 0 0 1.5px #E7E5E4,0 12px 24px -16px rgba(28,25,23,.3);font:500 22px 'DM Mono';color:#44403C"><b style="padding:4px 10px;border-radius:99px;background:#EEF0FF;color:${INDIGO};font-weight:500">${kind}</b>${file}</span>`;
const spark = [42, 48, 45, 60, 58, 66, 62, 74, 70, 82, 78, 90]
	.map((v, i) => `${i ? 'L' : 'M'}${i * 26} ${100 - v}`)
	.join(' ');
export const parsingTools = {
	slug: 'parsing-tools',
	dir: 'parsing-tools',
	fonts: ['DM+Sans:opsz,wght@9..40,500;9..40,700', 'DM+Mono:wght@500'],
	css: `.stage{background:radial-gradient(55% 65% at 75% 50%,#E3E1FF 0%,transparent 70%),#F7F5F0;background-image:radial-gradient(55% 65% at 75% 50%,#E3E1FF 0%,transparent 70%),radial-gradient(#E2DFD8 2px,transparent 2px);background-size:auto,36px 36px}`,
	html: `<div class="stage">
		${txt(
			`left:96px;top:120px;width:620px;font-family:'DM Sans'`,
			`<div style="font:500 28px 'DM Mono';color:${INDIGO}">Parsing Data · ingestion console</div>
			<div style="margin-top:30px;font-weight:700;font-size:92px;line-height:.98;letter-spacing:-.05em;color:#1C1917">Every property feed, clean by 2&nbsp;AM.</div>
			<div style="display:flex;gap:52px;margin-top:52px">${ptStat('12', 'connections')}${ptStat('10', 'data sources')}${ptStat('8.4M', 'rows stored')}</div>`
		)}
		<div class="abs art" style="left:780px;top:168px;display:flex;gap:12px">${inflow('FTP', 'rental_*.csv')}${inflow('SFTP', 'listings.xml')}${inflow('API', 'leads')}</div>
		<div class="abs art" style="left:780px;top:250px;width:770px;height:470px;border-radius:28px;background:#fff;box-shadow:0 0 0 1.5px #E7E5E4,0 50px 90px -50px rgba(67,56,202,.45);overflow:hidden">
			<div style="display:flex;align-items:center;gap:14px;height:70px;padding:0 28px;border-bottom:1.5px solid #F0EEEA;font-family:'DM Sans'">
				<span style="font:700 26px 'DM Sans';color:#1C1917">Jakarta Listings</span>
				<span style="font:500 20px 'DM Mono';color:#A8A29E">daily 02:00</span>
				<span style="margin-left:auto;display:inline-flex;align-items:center;gap:8px;padding:6px 14px;border-radius:99px;background:#EEF0FF;font:600 20px 'DM Sans';color:${INDIGO}"><i style="width:10px;height:10px;border-radius:50%;background:${INDIGO}"></i>Running</span>
			</div>
			<svg width="770" height="400" viewBox="0 0 770 400" style="display:block">
				${tasks.map(taskNode).join('')}
				<line x1="40" x2="730" y1="232" y2="232" stroke="#F0EEEA" stroke-width="2"/>
				${gantt}
			</svg>
		</div>
		<div class="abs art" style="left:1230px;top:690px;width:330px;padding:24px 28px;border-radius:26px;background:#1C1917;box-shadow:0 30px 60px -28px rgba(28,25,23,.6);font-family:'DM Sans'">
			<div style="font:500 22px 'DM Sans';color:#A8A29E">Records today</div>
			<div style="display:flex;align-items:flex-end;justify-content:space-between;margin-top:6px">
				<span style="font:700 52px/1 'DM Sans';letter-spacing:-.04em;color:#fff">128,430</span>
				<svg width="120" height="60" viewBox="0 0 290 100"><path d="${spark}" fill="none" stroke="#86EFAC" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/></svg>
			</div>
		</div>
		<div class="abs art" style="left:820px;top:760px;padding:14px 22px;border-radius:99px;background:#fff;box-shadow:0 0 0 1.5px #E7E5E4,0 20px 40px -24px rgba(28,25,23,.4);display:flex;align-items:center;gap:10px;font:600 24px 'DM Sans';color:#1C1917"><i style="width:12px;height:12px;border-radius:50%;background:${PT_OK}"></i>93.1% jobs succeed</div>
	</div>`
};

/* ── Remote Task ──────────────────────────────────────────────────────────── */
// Deep green, Outfit. The measurement box itself: three phones, one SIM per
// operator, docked in a field box and each running a speed test.
const OPS = [
	{ name: 'Telkomsel', color: '#E4202A', mbps: '27.4', t: 0.69, state: 'Done' },
	{ name: 'Indosat', color: '#FFC20E', mbps: '19.2', t: 0.48, state: 'Testing' },
	{ name: 'XL', color: '#2F8BFF', mbps: '17.6', t: 0.44, state: 'Testing' }
];
const miniGauge = (t, color) => {
	const r = 62;
	const pt = (k) => {
		const a = Math.PI * (1 - k);
		return `${(80 + Math.cos(a) * r).toFixed(1)} ${(80 - Math.sin(a) * r).toFixed(1)}`;
	};
	return `<svg width="160" height="92" viewBox="0 0 160 92">
		<path d="M${pt(0)} A${r} ${r} 0 0 1 ${pt(1)}" fill="none" stroke="#fff" stroke-opacity=".12" stroke-width="12" stroke-linecap="round"/>
		<path d="M${pt(0)} A${r} ${r} 0 0 1 ${pt(t)}" fill="none" stroke="${color}" stroke-width="12" stroke-linecap="round"/>
	</svg>`;
};
const testPhone = ({ name, color, mbps, t, state }, x, y, rot) => `
	<div style="position:absolute;left:${x}px;top:${y}px;width:210px;height:400px;padding:9px;border-radius:38px;background:linear-gradient(145deg,#2b2c30,#0d0d0f 45%,#1c1d20);box-shadow:inset 0 0 0 2px #45464b,0 30px 50px -20px rgba(0,0,0,.6);transform:rotate(${rot}deg)">
		<div style="height:100%;border-radius:30px;background:#0E1513;padding:34px 18px 0;text-align:center;font-family:Outfit;position:relative">
			<i style="position:absolute;top:10px;left:50%;width:56px;height:16px;margin-left:-28px;border-radius:10px;background:#000"></i>
			<div style="display:inline-flex;align-items:center;gap:8px;font:700 22px Outfit;color:#fff"><b style="width:12px;height:12px;border-radius:50%;background:${color}"></b>${name}</div>
			<div style="margin-top:22px">${miniGauge(t, color)}</div>
			<div style="margin-top:-30px;font:800 52px/1 Outfit;letter-spacing:-.03em;color:#fff">${mbps}</div>
			<div style="margin-top:6px;font:400 18px Outfit;color:#8FB8A9">Mbps download</div>
			<div style="display:inline-block;margin-top:18px;padding:6px 14px;border-radius:99px;background:${state === 'Done' ? '#34D399' : 'rgba(255,255,255,.1)'};font:600 16px Outfit;color:${state === 'Done' ? '#062018' : '#CFE9DF'}">${state}</div>
		</div>
	</div>`;
const MINT = '#5EEAB5';
const rtStat = (value, label) =>
	`<div><div style="font:800 64px/1 Outfit;letter-spacing:-.04em;color:#fff">${value}</div><div style="margin-top:8px;font:400 24px Outfit;color:#9BCDBB">${label}</div></div>`;
const rtGlass = (style, inner) =>
	`<div class="abs art" style="border-radius:26px;background:rgba(10,30,24,.72);backdrop-filter:blur(16px);box-shadow:inset 0 0 0 1.5px rgba(255,255,255,.12),0 30px 60px -24px rgba(0,0,0,.7);font-family:Outfit;${style}">${inner}</div>`;
const benchRow = ({ name, color, mbps }) =>
	`<div style="display:grid;grid-template-columns:120px 1fr 64px;align-items:center;gap:14px;margin-top:14px">
		<span style="font:600 22px Outfit;color:#DDEFE8">${name}</span>
		<span style="height:14px;border-radius:7px;background:rgba(255,255,255,.08)"><i style="display:block;height:100%;width:${(+mbps / 30) * 100}%;border-radius:7px;background:${color}"></i></span>
		<span style="font:700 22px Outfit;color:#fff;text-align:right">${mbps}</span>
	</div>`;
export const remoteTask = {
	slug: 'remote-task',
	dir: 'remote-task',
	fonts: ['Outfit:wght@400;600;700;800'],
	css: `.stage{background:
		radial-gradient(50% 60% at 72% 55%,#13785C 0%,transparent 70%),
		radial-gradient(60% 70% at 0% 0%,#0B3B2F 0%,transparent 60%),
		#061B16}
		.grid{background-image:linear-gradient(rgba(255,255,255,.04) 2px,transparent 2px),linear-gradient(90deg,rgba(255,255,255,.04) 2px,transparent 2px);background-size:80px 80px;-webkit-mask-image:radial-gradient(60% 70% at 72% 60%,#000,transparent 75%)}`,
	html: `<div class="stage grain soft">
		<div class="abs grid" style="inset:0"></div>
		${txt(
			`left:96px;top:120px;width:620px;font-family:Outfit`,
			`<div style="display:inline-flex;align-items:center;gap:12px;font:600 28px Outfit;color:${MINT}"><i style="width:14px;height:14px;border-radius:50%;background:${MINT};box-shadow:0 0 0 8px rgba(94,234,181,.18)"></i>Remote Task · field testing</div>
			<div style="margin-top:30px;font-weight:800;font-size:90px;line-height:.98;letter-spacing:-.045em;color:#fff">Every operator, tested every hour.</div>
			<div style="display:flex;gap:56px;margin-top:52px">${rtStat('14', 'field boxes')}${rtStat('11', 'regions')}${rtStat('24×', 'tests a day')}</div>`
		)}
		<!-- tower with signal waves -->
		<svg class="abs art" style="left:1330px;top:250px" width="220" height="380" viewBox="0 0 220 380">
			${[46, 78, 110].map((r, i) => `<path d="M${110 - r} ${70 - r * 0.2} A${r} ${r} 0 0 1 ${110 + r} ${70 - r * 0.2}" fill="none" stroke="${MINT}" stroke-opacity="${0.7 - i * 0.2}" stroke-width="6" stroke-linecap="round"/>`).join('')}
			<circle cx="110" cy="70" r="12" fill="${MINT}"/>
			<path d="M110 80 L60 370 M110 80 L160 370 M78 260 L142 260 M92 170 L128 170 M70 320 L150 320" stroke="#9BCDBB" stroke-width="7" stroke-linecap="round" fill="none"/>
		</svg>
		<!-- the box and its phones -->
		<div class="abs art" style="left:780px;top:300px;width:800px;height:560px;transform:scale(.74);transform-origin:0 0">
			${testPhone(OPS[0], 60, 20, -6)}${testPhone(OPS[1], 295, 0, 0)}${testPhone(OPS[2], 530, 20, 6)}
			<div style="position:absolute;left:0;top:330px;width:800px;height:220px;border-radius:30px;background:linear-gradient(180deg,#3A4542,#1E2624);box-shadow:inset 0 2px 0 rgba(255,255,255,.12),0 50px 80px -30px rgba(0,0,0,.7)">
				<div style="position:absolute;left:40px;top:40px;right:40px;height:12px;border-radius:6px;background:#0B110F"></div>
				<div style="position:absolute;left:44px;bottom:44px;display:flex;align-items:center;gap:16px;font:600 26px Outfit;color:#CFE9DF">
					${['#34D399', '#34D399', '#FFC20E'].map((c) => `<i style="width:16px;height:16px;border-radius:50%;background:${c};box-shadow:0 0 14px ${c}"></i>`).join('')}
					<span style="margin-left:10px;letter-spacing:.04em">BOX CETB-03 · ONLINE</span>
				</div>
				<div style="position:absolute;right:44px;bottom:40px;display:flex;gap:10px">${'<i style="width:8px;height:44px;border-radius:4px;background:#0B110F"></i>'.repeat(8)}</div>
			</div>
		</div>
		${rtGlass(
			'left:800px;top:220px;padding:14px 22px;display:flex;align-items:center;gap:12px;border-radius:99px',
			`<i style="width:12px;height:12px;border-radius:50%;background:#34D399;box-shadow:0 0 12px #34D399"></i><span style="font:600 22px Outfit;color:#fff">Live · Jakarta – Monas · 4G LTE</span>`
		)}
		${rtGlass(
			'left:1180px;top:660px;width:380px;padding:24px 28px',
			`<div style="display:flex;justify-content:space-between;font:600 22px Outfit;color:#9BCDBB"><span>Avg download</span><span>Mbps</span></div>${OPS.map(benchRow).join('')}`
		)}
		${rtGlass(
			'left:1000px;top:780px;padding:16px 22px',
			`<div style="font:500 20px Outfit;color:#9BCDBB">Latency</div><div style="font:800 40px/1.1 Outfit;color:#fff">39 ms</div>`
		)}
	</div>`
};

/* ── Smart Survey ─────────────────────────────────────────────────────────── */
const CYAN = '#12B5EA';
const field = (label, value, tone = '#111') =>
	`<div style="margin-top:20px"><div style="font:500 18px Poppins;color:#8A94A6">${label}</div><div style="margin-top:6px;padding:12px 16px;border-radius:12px;background:#F2F6FA;font:600 22px Poppins;color:${tone}">${value}</div></div>`;
export const siteSurvey = {
	slug: 'site-survey',
	dir: 'site-survey',
	fonts: ['Poppins:wght@400;500;600;700;800'],
	css: `.stage{background:linear-gradient(135deg,#22D3F5 0%,#0EA5E9 45%,#0B6BD3 100%)}`,
	html: `<div class="stage grain soft">
		<div class="abs art" style="left:120px;top:110px;width:600px;border-radius:26px;overflow:hidden;background:#fff;box-shadow:0 50px 90px -40px rgba(4,40,90,.6);transform:rotate(-4deg)">
			<img src="${shot('site-survey', 4)}" style="width:100%">
		</div>
		<div class="abs art phone" style="left:560px;top:150px;width:340px;height:720px;border-radius:56px;padding:12px">
			<div class="scr" style="border-radius:46px;padding:70px 26px 0;font-family:Poppins">
				<div style="font:700 28px Poppins;color:#0B1B33">Tower Audit</div>
				<div style="font:500 18px Poppins;color:${CYAN}">BDG002 · Buah Batu</div>
				${field('Grounding', 'Need repair', '#DC2626')}
				${field('Corrosion level', '6 %')}
				${field('Bolt condition', 'Loose (2 pcs)', '#D97706')}
				<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:22px">${'<i style="height:62px;border-radius:10px;background:linear-gradient(135deg,#BAE6FD,#7DD3FC)"></i>'.repeat(3)}</div>
				<div style="margin-top:24px;padding:16px;border-radius:14px;background:${CYAN};text-align:center;font:700 22px Poppins;color:#fff">Submit report</div>
			</div>
		</div>
		${txt(
			`right:96px;top:470px;width:600px;text-align:right;font-family:Poppins`,
			`<div style="font:600 30px Poppins;color:#E0F7FF">Smart Survey</div>
			<div style="margin-top:22px;font-weight:800;font-size:82px;line-height:1.02;letter-spacing:-.04em;color:#fff">From tower check to signed report.</div>
			<div style="margin-top:28px;font-weight:500;font-size:40px;line-height:1.2;color:#D6F3FF;text-wrap:balance">31 sites, 36 tasks, one board.</div>`
		)}
	</div>`
};

/* ── SignalViewer ─────────────────────────────────────────────────────────── */
// Light sky blue, Urbanist. Indonesia large on the right with test pins, one
// floating stat; the headline alone on the left.
const MAP = { x: 96, y: 150, s: 0.96 };
const pins = [
	[106.85, -6.2, 3],
	[107.6, -6.9, 2],
	[112.75, -7.25, 2],
	[98.67, 3.6, 2],
	[110.4, -7.0, 1],
	[115.2, -8.65, 1],
	[119.43, -5.15, 2],
	[104.75, -2.98, 1],
	[116.1, -1.25, 1],
	[124.85, 1.48, 1],
	[109.33, -0.03, 1],
	[100.35, -0.95, 1],
	[131.25, -0.88, 1],
	[140.7, -2.55, 1]
];
export const svreport = {
	slug: 'svreport',
	dir: 'svreport',
	fonts: ['Urbanist:wght@500;700;800'],
	css: `.stage{background:radial-gradient(70% 80% at 80% 70%,#C9DCFF 0%,transparent 70%),#EEF3FF}`,
	html: `<div class="stage">
		${txt(
			`right:96px;top:540px;width:880px;text-align:right;font-family:Urbanist`,
			`<div style="font:700 30px Urbanist;color:#2F5BFF">SignalViewer</div>
			<div style="margin-top:30px;font-weight:800;font-size:96px;line-height:.98;letter-spacing:-.045em;color:#0B1640">Every network test,<br>on one map.</div>`
		)}
		<svg class="abs art" style="left:${MAP.x}px;top:${MAP.y}px" width="${IDN.width * MAP.s}" height="${IDN.height * MAP.s}" viewBox="0 0 ${IDN.width} ${IDN.height}">
			<path d="${IDN.java}${IDN.outsideJava}" fill="#fff" stroke="#B8CBF5" stroke-width="2"/>
			${pins
				.map(([lon, lat, n]) => {
					const [x, y] = IDN.project(lon, lat);
					return `<circle cx="${x}" cy="${y}" r="${10 + n * 7}" fill="#2F5BFF" opacity=".16"/><circle cx="${x}" cy="${y}" r="8" fill="#2F5BFF"/>`;
				})
				.join('')}
		</svg>
		<div class="abs art" style="left:1150px;top:290px;padding:26px 34px;border-radius:28px;background:#2F5BFF;box-shadow:0 30px 60px -24px rgba(47,91,255,.55);font-family:Urbanist">
			<div style="font:800 76px/1 Urbanist;letter-spacing:-.04em;color:#fff">97.5k</div>
			<div style="margin-top:8px;font:500 28px Urbanist;color:#DCE4FF">app installs</div>
		</div>
	</div>`
};
