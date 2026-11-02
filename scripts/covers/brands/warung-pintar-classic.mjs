// Warung Pintar covers kept in their original art direction. Only two kinds of
// change since: tiny labels removed or enlarged to read at card size, and facts
// corrected against the case study.
const Y = '#FFD23F';
const INK = '#141414';
const PAPER = '#F5F0E4';
const MONO = 'JetBrains+Mono:wght@400;500;700';

/* ── Heuristic evaluation: an isometric severity map ── */
const sev = [
	'0102300100',
	'0010200030',
	'2003100100',
	'0100040020',
	'0030010200',
	'1002000310',
	'0200130000',
	'0010002040',
	'3001020001',
	'0100300200',
	'0020010030',
	'1000200100'
];
const sevColor = ['#262626', '#6b5512', '#C9A021', Y, '#FF6A3D'];
export const heuristic = {
	slug: 'awp-heuristic-evaluation',
	dir: 'awp-heuristic',
	fonts: ['Archivo:wdth,wght@62..125,100..900'],
	css: `
		.stage{background:radial-gradient(90% 80% at 72% 55%,#2a2510 0%,#121212 55%,#0b0b0b 100%)}
		.iso{left:880px;top:220px;width:620px;height:744px;transform:rotateX(56deg) rotateZ(-38deg);transform-style:preserve-3d}
		.cell{position:absolute;width:56px;height:56px;border-radius:7px}
		.big{font:900 400px/.78 'Archivo';font-stretch:125%;letter-spacing:-.06em;color:${Y}}
		.t{font:800 66px/.92 'Archivo';font-stretch:112%;letter-spacing:-.035em;color:#fff}`,
	html: `<div class="stage grain">
		<div class="abs big txt" style="left:70px;top:150px">46</div>
		<div class="abs t txt" style="left:88px;top:500px">Findings<br>across the<br><span style="color:${Y}">order flow.</span></div>
		<div class="abs iso art">
			${sev
				.map((r, y) =>
					[...r]
						.map((s, x) => {
							const v = +s;
							return `<div class="cell" style="left:${x * 62}px;top:${y * 62}px;background:${sevColor[v]};transform:translateZ(${v * 16}px);box-shadow:${v ? `0 0 ${10 + v * 8}px ${sevColor[v]}55` : 'none'}"></div>`;
						})
						.join('')
				)
				.join('')}
		</div>
	</div>`
};

/* ── Order flow: hero product shot with type behind it ── */
const product = (name, price, tint, qty = 0) => `
	<div class="row" style="gap:14px;padding:14px 0;border-bottom:1px solid #eee">
		<div style="width:62px;height:62px;border-radius:14px;background:${tint};display:grid;place-items:center">
			<div style="width:26px;height:34px;border-radius:6px;background:rgba(255,255,255,.7)"></div>
		</div>
		<div style="flex:1">
			<div style="font:700 15px/1.2 'Nunito Sans',system-ui;color:${INK}">${name}</div>
			<div style="font:500 12px/1.6 'Nunito Sans',system-ui;color:#8a857a">Grosir · min. 2 dus</div>
			<div style="font:800 15px/1.3 'Nunito Sans',system-ui;color:${INK}">${price}</div>
		</div>
		${
			qty
				? `<div class="row" style="gap:10px;font:800 14px 'Nunito Sans';color:${INK}"><span style="width:28px;height:28px;border-radius:9px;border:2px solid ${INK};display:grid;place-items:center">–</span>${qty}<span style="width:28px;height:28px;border-radius:9px;background:${INK};color:${Y};display:grid;place-items:center">+</span></div>`
				: `<div style="padding:8px 14px;border-radius:10px;background:${Y};font:800 13px 'Nunito Sans';color:${INK}">+ Tambah</div>`
		}
	</div>`;
const orderApp = `
	<div class="sb" style="background:${Y}"><span>9:41</span><span>●●● ▮</span></div>
	<div style="background:${Y};padding:6px 24px 22px">
		<div style="font:900 30px/1.1 'Nunito Sans';color:${INK}">Pesan</div>
		<div style="margin-top:14px;height:46px;border-radius:14px;background:#fff;display:flex;align-items:center;padding:0 16px;font:600 14px 'Nunito Sans';color:#9a958a">⌕&nbsp;&nbsp;Cari produk grosir…</div>
	</div>
	<div class="row" style="gap:8px;padding:16px 24px 6px">
		${['Semua', 'Minuman', 'Mie', 'Rokok', 'Sabun']
			.map(
				(c, i) =>
					`<span style="padding:8px 14px;border-radius:99px;font:700 13px 'Nunito Sans';${i ? `border:1.5px solid #e4e0d6;color:#555` : `background:${INK};color:#fff`}">${c}</span>`
			)
			.join('')}
	</div>
	<div style="padding:0 24px">
		${product('Indomie Goreng 40 pcs', 'Rp 112.500', '#f6b13d', 2)}
		${product('Teh Pucuk 350ml', 'Rp 58.000', '#86c06c')}
		${product('Kopi Kapal Api 10s', 'Rp 28.500', '#9b6a43', 1)}
		${product('Rinso Cair 750ml', 'Rp 46.200', '#5b8de0')}
		${product('Aqua 600ml · 24', 'Rp 49.900', '#7cc3e6')}
	</div>
	<div class="abs row" style="left:18px;right:18px;bottom:22px;height:66px;border-radius:20px;background:${INK};padding:0 10px 0 20px;justify-content:space-between">
		<div style="color:#fff;font:600 13px/1.3 'Nunito Sans'">3 barang<br><b style="font-size:17px;color:${Y}">Rp 253.500</b></div>
		<div style="padding:13px 22px;border-radius:14px;background:${Y};font:900 15px 'Nunito Sans';color:${INK}">Checkout →</div>
	</div>`;
export const orderFlow = {
	slug: 'awp-order-flow',
	dir: 'awp-order-flow',
	fonts: ['Unbounded:wght@400..900', 'Nunito+Sans:wght@500;600;700;800;900'],
	css: `
		.stage{background:linear-gradient(160deg,#FFE27A 0%,${Y} 40%,#FFB21E 100%)}
		.word{left:-20px;top:120px;font:900 380px/.8 'Unbounded';letter-spacing:-.07em;color:${INK}}
		.podium{left:530px;top:770px;width:600px;height:150px;border-radius:50%;background:radial-gradient(60% 60% at 50% 35%,#2a2a2a,#0d0d0d);box-shadow:0 40px 60px -10px rgba(120,70,0,.5)}
		.card{border-radius:26px;background:#fff;box-shadow:0 30px 60px -20px rgba(100,60,0,.45)}
		.lab{font:700 30px 'Unbounded';letter-spacing:-.02em}
		.dial{width:120px;height:120px;border-radius:50%;background:conic-gradient(${INK} 0 91%,#eee 0);display:grid;place-items:center}
		.dial span{width:94px;height:94px;border-radius:50%;background:#fff;display:grid;place-items:center;font:800 34px 'Unbounded';color:${INK}}`,
	html: `<div class="stage grain soft">
		<div class="abs word">Pesan.</div>
		<div class="abs txt" style="left:88px;bottom:110px;width:460px;font:600 46px/1.1 'Unbounded';letter-spacing:-.035em;color:${INK}">Tested, not guessed.</div>
		<div class="abs podium"></div>
		<div class="phone" style="left:640px;top:96px;transform:rotate(-6deg)"><div class="scr" style="background:#fff">${orderApp}</div></div>
		<div class="abs card row" style="left:1080px;top:250px;gap:22px;padding:22px 30px 22px 22px;transform:rotate(4deg)">
			<div class="dial"><span>91</span></div>
			<div><div class="lab" style="color:#777">Usability</div><div style="font:800 48px/1.1 'Unbounded';color:${INK};letter-spacing:-.04em"><span style="color:#bbb">74</span> → 91</div></div>
		</div>
		<div class="abs card" style="left:1130px;top:500px;padding:24px 30px;background:${INK};transform:rotate(-3deg)">
			<div class="lab" style="color:#bbb">Time to add</div>
			<div style="font:800 56px/1.1 'Unbounded';color:${Y};letter-spacing:-.05em">8.1s<span style="color:#666"> → </span>4.1s</div>
		</div>
	</div>`
};

/* ── Tokosmart reskin: a wall of 594 screens ── */
const tiles = Array.from({ length: 84 }, (_, i) => {
	const kind = (i * 7 + (i % 5)) % 6;
	const bg = kind === 0 ? Y : kind === 1 ? '#232323' : '#fff';
	const fg = kind === 1 ? '#3a3a3a' : kind === 0 ? '#e9b81f' : '#ececec';
	return `<div style="width:120px;height:250px;border-radius:16px;background:${bg};padding:14px 12px;display:grid;gap:8px;align-content:start;box-shadow:0 10px 20px -8px rgba(0,0,0,.4)">
		<div style="height:12px;width:50%;border-radius:4px;background:${fg}"></div>
		<div style="height:${50 + (i % 3) * 18}px;border-radius:10px;background:${fg}"></div>
		<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px">${`<div style="height:24px;border-radius:7px;background:${fg}"></div>`.repeat(3)}</div>
		<div style="height:30px;border-radius:8px;background:${fg}"></div>
		<div style="height:30px;border-radius:8px;background:${fg};opacity:.7"></div></div>`;
}).join('');
export const tokosmart = {
	slug: 'tokosmart-reskin',
	dir: 'tokosmart-reskin',
	fonts: ['Big+Shoulders+Display:wght@500;700;900'],
	css: `
		.stage{background:#0e0e0e}
		.wall{left:430px;top:-260px;width:1500px;display:grid;grid-template-columns:repeat(12,120px);gap:18px;transform:rotateX(38deg) rotateZ(-24deg);transform-origin:50% 50%}
		.fade{inset:0;background:linear-gradient(90deg,#0e0e0e 18%,rgba(14,14,14,.6) 45%,rgba(14,14,14,0) 70%)}
		.n{font:900 520px/.76 'Big Shoulders Display';letter-spacing:-.03em;color:${Y}}
		.s{font:700 64px/.9 'Big Shoulders Display';letter-spacing:.01em;color:#fff;text-transform:uppercase}
		.sw{width:44px;height:44px;border-radius:50%;box-shadow:0 0 0 4px #0e0e0e}`,
	html: `<div class="stage grain">
		<div class="abs wall">${tiles}</div>
		<div class="abs fade"></div>
		<div class="abs n" style="left:72px;top:110px">594</div>
		<div class="abs s" style="left:88px;top:540px">Screens<br>reskinned<br><span style="color:${Y}">12 modules</span></div>
		<div class="abs row" style="left:88px;bottom:96px;gap:26px;color:#ddd;font:700 46px 'Big Shoulders Display';letter-spacing:.02em">
			<span class="row"><i class="sw" style="background:#17A2C4"></i><i class="sw" style="background:#EF8A00;margin-left:-10px"></i><i class="sw" style="background:#16C35A;margin-left:-10px"></i><span style="margin-left:14px">TOKOSMART</span></span>
			<span style="color:${Y}">→</span>
			<span class="row"><i class="sw" style="background:${Y}"></i><i class="sw" style="background:#fff;margin-left:-10px"></i><span style="margin-left:14px;color:#fff">WARUNG PINTAR</span></span>
		</div>
	</div>`
};

/* ── Grosir Pintar: a transit-map poster ── */
// Stops are roles, not real shops: the case study names no locations beyond south Surabaya.
const station = (x, y, label, big, dark, up) =>
	`<div class="abs" style="left:${x - (big ? 22 : 15)}px;top:${y - (big ? 22 : 15)}px;width:${big ? 44 : 30}px;height:${big ? 44 : 30}px;border-radius:50%;background:${dark ? INK : '#fff'};border:${big ? 8 : 6}px solid ${INK}"></div>
	${label ? `<div class="abs" style="left:${up ? x - 24 : x + 30}px;top:${up ? y - 62 : y - 20}px;font:800 34px 'Syne';letter-spacing:-.02em;color:${INK};white-space:nowrap">${label}</div>` : ''}`;
export const grosir = {
	slug: 'grosir-pintar',
	dir: 'grosir-pintar',
	fonts: ['Syne:wght@500;700;800'],
	css: `
		.stage{background:${PAPER}}
		.grid{inset:0;background-image:linear-gradient(rgba(20,20,20,.06) 1px,transparent 1px),linear-gradient(90deg,rgba(20,20,20,.06) 1px,transparent 1px);background-size:50px 50px}
		svg{position:absolute;left:0;top:0}
		.block{left:88px;top:170px;padding:26px 30px 30px;background:${Y};box-shadow:12px 12px 0 ${INK}}
		h1{font:800 132px/.84 'Syne';letter-spacing:-.06em;color:${INK}}
		.k{font:800 64px/1 'Syne';letter-spacing:-.04em;color:${INK}}
		.l{margin-top:6px;font:700 30px/1.1 'Syne';letter-spacing:-.01em;color:#4d4738}`,
	html: `<div class="stage grain soft">
		<div class="abs grid"></div>
		<svg width="1600" height="1000" viewBox="0 0 1600 1000" fill="none" stroke-linecap="round" stroke-linejoin="round">
			<path d="M840 880 L940 880 Q980 880 995 843 L1090 540 Q1102 500 1142 500 L1420 500" stroke="${Y}" stroke-width="30"/>
			<path d="M820 260 L960 260 Q1000 260 1020 300 L1100 460 Q1120 500 1160 500 L1180 500 Q1220 500 1240 540 L1320 700 Q1340 740 1380 740 L1500 740" stroke="${INK}" stroke-width="30"/>
			<path d="M820 640 L980 640 Q1020 640 1050 610 L1150 510" stroke="#E8743B" stroke-width="30"/>
			<path d="M1320 200 L1320 380 Q1320 420 1285 440 L1175 495" stroke="#E8743B" stroke-width="30"/>
		</svg>
		${station(820, 260, 'Wholesaler', false, false, true)}
		${station(1320, 200, '', false)}
		${station(1160, 500, '', true, true)}
		${station(1040, 700, 'Retailer', false)}
		${station(820, 640, 'Retailer', false, false, true)}
		${station(840, 880, '', false)}
		${station(1420, 500, '', false)}
		${station(1500, 740, '', false)}
		<div class="abs" style="left:1350px;top:580px;width:96px;height:56px;border-radius:12px;background:${INK};box-shadow:0 12px 20px -8px rgba(0,0,0,.4)">
			<div class="abs" style="right:-30px;top:16px;width:36px;height:40px;border-radius:0 12px 12px 0;background:${INK}"></div>
			<div class="abs" style="left:12px;bottom:-14px;width:26px;height:26px;border-radius:50%;background:${PAPER};border:7px solid ${INK}"></div>
			<div class="abs" style="right:-18px;bottom:-14px;width:26px;height:26px;border-radius:50%;background:${PAPER};border:7px solid ${INK}"></div>
		</div>
		<div class="abs block"><h1>Grosir<br>Pintar</h1></div>
		<div class="abs" style="left:88px;bottom:92px;display:grid;grid-template-columns:repeat(2,auto);gap:56px">
			<div><div class="k">11</div><div class="l">wholesalers<br>as hubs</div></div>
			<div><div class="k">146</div><div class="l">retailers<br>served</div></div>
		</div>
	</div>`
};
