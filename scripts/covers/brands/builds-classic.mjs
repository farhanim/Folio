// Build covers kept in their original art direction. Only two kinds of change
// since: tiny labels removed or enlarged, and facts corrected (stats that weren't
// from the project are gone; bottom-left stays clear for the "Live preview" chip).
import { browser, laptop, monitor, shot } from '../kit.mjs';

/* ── Nikel: the lender portal on a studio display ── */
export const nikel = {
	slug: 'nikel-lender-portal',
	dir: 'nikel-lender-portal',
	fonts: ['Instrument+Serif:ital@0;1', 'Geist:wght@400;500;600'],
	css: `
		.stage{background:radial-gradient(80% 90% at 70% 100%,#2c55d8 0%,#14286e 45%,#0a1236 100%)}
		.beam{left:600px;top:-200px;width:1200px;height:1400px;background:conic-gradient(from 200deg at 50% 0%,transparent 0deg,rgba(140,170,255,.18) 20deg,transparent 40deg);filter:blur(10px)}
		h1{font:400 112px/.9 'Instrument Serif';letter-spacing:-.03em;color:#fff}
		h1 i{color:#9DB4FF}
		.float{position:absolute;border-radius:18px;overflow:hidden;box-shadow:0 40px 70px -24px rgba(0,0,0,.7),0 0 0 1px rgba(255,255,255,.12)}
		.k{display:block;font:400 76px/1 'Instrument Serif';color:#fff}`,
	html: `<div class="stage grain">
		<div class="abs beam"></div>
		<h1 class="abs txt" style="left:82px;top:140px;width:fit-content">A clearer<br>view of every<br><i>lender decision.</i></h1>
		<div class="abs txt" style="left:88px;bottom:92px;display:flex;gap:48px;font:500 34px/1.15 'Geist';color:#D3DCF8">
			<span><b class="k">3</b>core pages</span>
			<span><b class="k">4</b>loan states</span>
		</div>
		${monitor('images/work/nikel-lender-portal/home-dashboard.png', 'left:700px;top:170px;width:820px')}
		<div class="float art" style="left:1240px;top:520px;width:300px;transform:rotate(3deg)"><img src="images/work/nikel-lender-portal/image6.png" style="width:100%"></div>
	</div>`
};

/* ── Kee Platforms: a SaaS launch, headline over a rising browser ── */
const chip = (text, style) =>
	`<div class="abs art row" style="gap:14px;padding:16px 24px;border-radius:18px;background:#fff;font:600 34px 'Sora';letter-spacing:-.02em;color:#17113a;box-shadow:0 20px 40px -16px rgba(60,30,160,.35);${style}"><i style="width:34px;height:34px;border-radius:10px;background:linear-gradient(135deg,#6a3df5,#b14bf4)"></i>${text}</div>`;
export const kee = {
	slug: 'kee-platforms',
	dir: 'kee-platforms',
	fonts: ['Sora:wght@300;400;600;700'],
	css: `
		.stage{background:radial-gradient(70% 60% at 50% 100%,#c9b8ff 0%,#efeaff 55%,#faf8ff 100%)}
		.gridl{inset:0;background-image:linear-gradient(rgba(91,64,220,.07) 1px,transparent 1px),linear-gradient(90deg,rgba(91,64,220,.07) 1px,transparent 1px);background-size:80px 80px;mask-image:radial-gradient(70% 70% at 50% 40%,#000,transparent)}
		h1{font:600 104px/.95 'Sora';letter-spacing:-.06em;color:#17113a;text-align:center}
		h1 span{background:linear-gradient(90deg,#6a3df5,#b14bf4);-webkit-background-clip:text;color:transparent}
		.persp{left:250px;top:450px;width:1100px;perspective:1600px}`,
	html: `<div class="stage grain soft">
		<div class="abs gridl"></div>
		<h1 class="abs txt" style="left:0;right:0;margin:0 auto;width:fit-content;top:120px">The <span>AI-native</span> credit<br>platform, in one scroll.</h1>
		<div class="abs persp">${browser(shot('kee-platforms', 2), { style: 'position:relative;transform:rotateX(18deg);transform-origin:50% 0' })}</div>
		${chip('KeeScore™', 'left:90px;top:520px;transform:rotate(-5deg)')}
		${chip('Kee2Credit™', 'left:1230px;top:560px;transform:rotate(5deg)')}
	</div>`
};

/* ── SparQ: isometric layers of the workspace ── */
export const sparq = {
	slug: 'sparq',
	dir: 'sparq',
	fonts: ['Syne:wght@600;700;800'],
	css: `
		.stage{background:radial-gradient(90% 90% at 75% 50%,#2453ff 0%,#0f2bb3 45%,#061466 100%)}
		.iso{left:960px;top:620px;transform:rotateX(55deg) rotateZ(-40deg);transform-style:preserve-3d}
		.iso .browser{width:640px}
		h1{font:800 200px/.8 'Syne';letter-spacing:-.07em;color:#fff}`,
	html: `<div class="stage grain">
		<h1 class="abs txt" style="left:70px;top:150px">SparQ</h1>
		<div class="abs txt" style="left:88px;top:380px;width:560px;font:600 46px/1.15 'Syne';letter-spacing:-.03em;color:#D3DCFF">One workspace for catalogs, workflows, notebooks and ML.</div>
		<div class="abs iso">
			${browser(shot('sparq', 4), { style: 'left:0;top:0' })}
			${browser(shot('sparq', 3), { style: 'left:0;top:0;transform:translateZ(110px)' })}
			${browser(shot('sparq', 2), { style: 'left:0;top:0;transform:translateZ(220px)' })}
		</div>
	</div>`
};

/* ── Blast Hub: messages leaving the dashboard ── */
const bubble = (text, r, accent, x, y) =>
	`<div class="abs art" style="left:${x}px;top:${y}px;padding:18px 26px;border-radius:26px 26px 26px 6px;background:${accent ? '#d7ff3a' : '#fff'};font:700 32px 'Archivo';color:#0d1a14;transform:rotate(${r}deg);box-shadow:0 20px 30px -14px rgba(0,0,0,.5);white-space:nowrap">${text}</div>`;
export const blast = {
	slug: 'blast-hub',
	dir: 'blast-hub',
	fonts: ['Archivo:wdth,wght@62..125,400..900'],
	css: `
		.stage{background:#0f5c4c}
		.rays{inset:0;background:repeating-conic-gradient(from 0deg at 72% 60%,rgba(255,255,255,.05) 0 6deg,transparent 6deg 18deg)}
		h1{font:900 128px/.82 'Archivo';font-stretch:68%;letter-spacing:-.02em;color:#fff;text-transform:uppercase}
		h1 span{color:#d7ff3a}`,
	html: `<div class="stage grain">
		<div class="abs rays"></div>
		<h1 class="abs txt" style="left:82px;top:335px">Bulk SMS,<br><span>sent &amp;</span><br>tracked.</h1>
		${laptop(shot('blast-hub', 2), 'left:700px;top:330px;width:850px')}
		${bubble('Promo 40% 🎉', -6, true, 760, 110)}
		${bubble('Pesanan dikirim ✓', 4, false, 1110, 190)}
	</div>`
};

/* ── ICON+: a coverage map behind the planner ── */
const hexes = Array.from({ length: 60 }, (_, i) => {
	const x = 700 + ((i * 137) % 900);
	const y = 60 + ((i * 89) % 860);
	const r = 30 + ((i * 53) % 110);
	return `<circle cx="${x}" cy="${y}" r="${r}" fill="rgba(0,214,255,${0.04 + (i % 4) * 0.025})" stroke="rgba(0,214,255,.35)" stroke-width="1"/><circle cx="${x}" cy="${y}" r="4" fill="#00d6ff"/>`;
}).join('');
export const iconplus = {
	slug: 'iconplus',
	dir: 'iconplus',
	fonts: ['Space+Grotesk:wght@400;500;700'],
	css: `
		.stage{background:#060c1a}
		.roads{inset:0;background-image:linear-gradient(115deg,transparent 49.6%,rgba(120,150,210,.12) 50%,transparent 50.4%),linear-gradient(25deg,transparent 49.7%,rgba(120,150,210,.1) 50%,transparent 50.3%);background-size:240px 240px,180px 180px}
		h1{font:700 98px/.92 'Space Grotesk';letter-spacing:-.05em;color:#fff}
		h1 span{color:#00d6ff}`,
	html: `<div class="stage grain">
		<div class="abs roads"></div>
		<svg class="abs" style="left:0;top:0" width="1600" height="1000">${hexes}</svg>
		<div class="abs" style="inset:0;background:linear-gradient(90deg,#060c1a 30%,rgba(6,12,26,.2) 60%,transparent)"></div>
		<h1 class="abs txt" style="left:82px;top:150px">Plan the<br>network from<br><span>one map.</span></h1>
		${browser(shot('iconplus', 3), { style: 'left:720px;top:200px;width:840px;transform:perspective(2000px) rotateY(-14deg);box-shadow:0 0 0 1px rgba(0,214,255,.3),0 60px 100px -30px rgba(0,214,255,.35)' })}
	</div>`
};

/* ── Devfartha IELTS: an editorial study sheet ── */
export const ielts = {
	slug: 'ielts-course',
	dir: 'ielts-course',
	fonts: ['Instrument+Serif:ital@0;1', 'Caveat:wght@600'],
	css: `
		.stage{background:#F4F1EA}
		.lines{inset:0;background:repeating-linear-gradient(#F4F1EA 0 47px,#d9e3f2 47px 48px)}
		.margin{left:150px;top:0;bottom:0;width:2px;background:#f1a5a5}
		.band{font:400 420px/.78 'Instrument Serif';letter-spacing:-.05em;color:#1b2cc1}
		.band i{color:#ffcc00;-webkit-text-stroke:3px #1b2cc1}`,
	html: `<div class="stage grain soft">
		<div class="abs lines"></div><div class="abs margin"></div>
		<div class="abs band txt" style="left:170px;top:150px">7<i>.</i>0</div>
		<div class="abs txt" style="left:190px;top:500px;width:480px;font:400 56px/1 'Instrument Serif';color:#111">Real Cambridge practice, <i>scored the moment</i> you finish.</div>
		<div class="abs" style="left:600px;top:110px;font:600 46px 'Caveat';color:#e04646;transform:rotate(-8deg)">Listening ✓</div>
		${browser(shot('ielts-course', 5), { style: 'left:840px;top:150px;width:700px;transform:rotate(3deg)' })}
		${browser(shot('ielts-course', 2), { style: 'left:760px;top:520px;width:560px;transform:rotate(-4deg)' })}
	</div>`
};

/* ── Pertamina PIMS: a pipeline over contour lines ── */
const contours = Array.from({ length: 16 }, (_, i) => {
	const y = 40 + i * 62;
	const a = 30 + (i % 4) * 14;
	return `<path d="M-50 ${y} C 300 ${y - a}, 500 ${y + a * 1.6}, 800 ${y} S 1300 ${y - a * 1.4}, 1700 ${y + a / 2}" stroke="rgba(255,255,255,.07)" stroke-width="2" fill="none"/>`;
}).join('');
export const pims = {
	slug: 'pims-pertamina',
	dir: 'pims-pertamina',
	fonts: ['Barlow+Condensed:wght@500;600;700;800'],
	css: `
		.stage{background:linear-gradient(140deg,#16181c 0%,#0b0c0e 100%)}
		h1{font:800 150px/.84 'Barlow Condensed';letter-spacing:-.01em;color:#fff;text-transform:uppercase}
		h1 span{color:#ed1c24}`,
	html: `<div class="stage grain">
		<svg class="abs" style="left:0;top:0" width="1600" height="1000">${contours}
			<path d="M80 960 C 400 900, 520 720, 760 760 S 1100 520, 1560 420" stroke="#ed1c24" stroke-width="6" fill="none" stroke-dasharray="2 14" stroke-linecap="round"/></svg>
		<h1 class="abs txt" style="left:82px;top:150px">Pipeline<br>integrity,<br><span>one map.</span></h1>
		<div class="abs txt" style="left:88px;top:610px;font:700 52px/1 'Barlow Condensed';letter-spacing:.02em;color:#C9CDD4;text-transform:uppercase">445 km · 15 pipelines</div>
		${monitor(shot('pims-pertamina', 2), 'left:690px;top:130px;width:860px')}
	</div>`
};

/* ── SILMA: a fan of screens over a kawung pattern ── */
export const silma = {
	slug: 'silma',
	dir: 'silma',
	fonts: ['Schibsted+Grotesk:wght@500;700;800;900'],
	css: `
		.stage{background:#0d47c9}
		.kawung{inset:0;opacity:.13;background:
			radial-gradient(ellipse 22px 34px at 50% 0,#fff 98%,transparent),radial-gradient(ellipse 22px 34px at 50% 100%,#fff 98%,transparent),
			radial-gradient(ellipse 34px 22px at 0 50%,#fff 98%,transparent),radial-gradient(ellipse 34px 22px at 100% 50%,#fff 98%,transparent);background-size:80px 80px}
		h1{font:900 168px/.8 'Schibsted Grotesk';letter-spacing:-.06em;color:#fff}
		.fan{left:680px;top:200px;perspective:2000px}
		.fan .browser{width:560px;transform-origin:50% 120%}`,
	html: `<div class="stage grain">
		<div class="abs kawung"></div>
		<h1 class="abs txt" style="left:76px;top:150px">SILMA</h1>
		<div class="abs txt" style="left:88px;top:310px;width:480px;font:500 46px/1.15 'Schibsted Grotesk';letter-spacing:-.02em;color:#DCE7FF">State-asset services for the Directorate General of Culture.</div>
		<div class="abs fan" style="width:860px;height:700px">
			${browser(shot('silma', 6), { style: 'left:40px;top:120px;transform:rotate(-12deg)' })}
			${browser(shot('silma', 3), { style: 'left:160px;top:80px;transform:rotate(-3deg)' })}
			${browser(shot('silma', 2), { style: 'left:280px;top:60px;transform:rotate(7deg)' })}
		</div>
	</div>`
};
