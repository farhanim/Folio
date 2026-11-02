// Fazz Agen: navy, electric blue and a warm yellow, in Manrope.
import { IDN } from '../data/indonesia.mjs';
import { PAD, phone, stat, statusBar, title } from '../kit.mjs';

const NAVY = '#0F2550';
const ELECTRIC = '#1534E0';
const Y = '#F2C400';
const PALE = '#DCE5F6';
const FONT = 'Manrope';
const FONTS = ['Manrope:wght@500;600;700;800'];

/* ── Catat Utang: the paper debt book vs the table agents asked for (original design) ── */
const ledgerRows = [
	['12/06', 'Bu Ani', '45.000', true],
	['12/06', 'Pak Joko (rokok)', '28.000'],
	['13/06', 'Mbak Rina', '120.000', true],
	['14/06', 'Bu Tuti — pulsa', '25.000'],
	['15/06', 'Mas Dodi', '60.500'],
	['15/06', 'Pak RT', '15.000', true],
	['16/06', 'Bu Ani', '32.000']
];
const tableRows = [
	['Mbak Rina', 'Rp 120.000', '#E5484D'],
	['Mas Dodi', 'Rp 60.500', Y],
	['Bu Ani', 'Rp 77.000', '#2BB673'],
	['Pak Joko', 'Rp 28.000', Y],
	['Bu Tuti', 'Rp 25.000', '#2BB673']
];
const catatUtang = {
	slug: 'catat-utang-report',
	dir: 'catat-utang',
	fonts: ['Gloock', 'Caveat:wght@500;700', 'Inter+Tight:wght@400;500;600;700'],
	css: `
		.stage{background:radial-gradient(110% 90% at 80% 60%,#1d3f80 0%,${NAVY} 60%,#0a1838 100%)}
		h1{font:400 84px/.98 'Gloock';letter-spacing:-.02em;color:#fff}
		h1 s{text-decoration-thickness:6px;text-decoration-color:${Y};color:#8ea3cc}
		.big{font:400 230px/.8 'Gloock';letter-spacing:-.04em;color:${Y}}
		.book{left:760px;top:150px;width:560px;height:720px;transform:rotate(-9deg);border-radius:8px 18px 18px 8px;background:#f4ecd8;box-shadow:-14px 0 0 #b7442f inset,0 50px 80px -20px rgba(0,0,0,.6);padding:58px 48px 0 70px;background-image:linear-gradient(#f4ecd8 56px,transparent 56px),repeating-linear-gradient(#f4ecd8 0 49px,#c9d3e6 49px 50px)}
		.book .r{display:grid;grid-template-columns:70px 1fr 110px;align-items:end;height:50px;font:500 30px/1 'Caveat';color:#28324a}
		.book .r b{font-weight:700;text-align:right}
		.table{left:1010px;top:330px;width:520px;border-radius:24px;background:#fff;box-shadow:0 50px 90px -20px rgba(0,0,0,.6);overflow:hidden;transform:rotate(3deg)}
		.table .t{display:flex;justify-content:space-between;align-items:center;padding:18px 28px;border-top:1px solid #edf0f5;font:600 24px 'Inter Tight';color:#334}
		.table .t b{color:${NAVY}}`,
	html: `<div class="stage grain">
		<h1 class="abs txt" style="left:82px;top:150px;width:fit-content">We assumed<br>agents wanted<br><s>charts.</s></h1>
		<div class="abs big txt" style="left:76px;top:480px">79.5%</div>
		<div class="abs txt" style="left:88px;top:700px;width:560px;font:500 46px/1.15 'Inter Tight';letter-spacing:-.02em;color:#DCE5F6">asked for a table instead.</div>
		<div class="abs book art">
			<div class="abs" style="left:70px;top:16px;font:700 34px 'Caveat';color:#28324a">Buku Utang — Juni</div>
			${ledgerRows.map(([d, n, v]) => `<div class="r"><span>${d}</span><span>${n}</span><b>${v}</b></div>`).join('')}
		</div>
		<div class="abs table art">
			<div style="padding:24px 28px 16px;font:700 30px 'Inter Tight';color:${NAVY}">Laporan Utang</div>
			${tableRows.map(([n, v, c]) => `<div class="t"><span class="row" style="gap:12px"><i style="width:12px;height:12px;border-radius:50%;background:${c}"></i>${n}</span><b>${v}</b></div>`).join('')}
			<div class="row" style="justify-content:space-between;padding:20px 28px;background:${NAVY};color:#fff;font:700 24px 'Inter Tight'"><span style="font-weight:500">Total</span>Rp 310.500</div>
		</div>
	</div>`
};

/* ── Terms of Modal: two finance words, renamed by the agents ── */
const swap = (from, to, pct, style) => `
	<div class="abs art" style="width:640px;padding:34px 38px;border-radius:30px;background:#fff;box-shadow:0 40px 70px -30px rgba(0,0,40,.6);${style}">
		<div style="font:700 44px ${FONT};color:#8A96B3;text-decoration:line-through;text-decoration-thickness:4px;text-decoration-color:#E5484D">${from}</div>
		<div class="row" style="justify-content:space-between;margin-top:10px">
			<span style="font:800 60px/1.05 ${FONT};letter-spacing:-.035em;color:${NAVY}">${to}</span>
			<span style="padding:12px 20px;border-radius:99px;background:${Y};font:800 36px ${FONT};color:${NAVY}">${pct}</span>
		</div>
	</div>`;
const modalTerms = {
	slug: 'modal-terms',
	dir: 'modal-terms',
	fonts: FONTS,
	css: `.stage{background:linear-gradient(150deg,#2448F0 0%,${ELECTRIC} 50%,#0E22A8 100%)}`,
	html: `<div class="stage grain">
		${title('Terms of<br>Modal', { color: '#fff', font: FONT, sub: 'Loan jargon, renamed by the agents who use it', subColor: '#D5DEFF', width: 560, align: 'right', pos: 'right:96px;top:250px' })}
		${stat('816', 'agents<br>answered', { bg: '#fff', fg: NAVY, accent: ELECTRIC, font: FONT, style: 'right:96px;bottom:96px' })}
		${swap('Tenor', 'Jangka Waktu', '40.9%', 'left:96px;top:220px;transform:rotate(-3deg)')}
		${swap('Sisa Plafon', 'Limit Modal', '44.5%', 'left:150px;top:560px;transform:rotate(2deg)')}
	</div>`
};

/* ── Top loyal users: most of them live outside Java ── */
const MAP = { x: 110, y: 150, s: 1.38 };
const loyalUsers = {
	slug: 'loyal-users',
	dir: 'loyal-users',
	fonts: FONTS,
	css: `.stage{background:linear-gradient(180deg,#EEF3FB 0%,${PALE} 100%)}`,
	html: `<div class="stage grain soft">
		<svg class="abs art" style="left:${MAP.x}px;top:${MAP.y}px" width="${IDN.width * MAP.s}" height="${IDN.height * MAP.s}" viewBox="0 0 ${IDN.width} ${IDN.height}">
			<path d="${IDN.neighbours}" fill="#C8D3E8"/>
			<path d="${IDN.outsideJava}" fill="${ELECTRIC}"/>
			<path d="${IDN.java}" fill="${NAVY}"/>
		</svg>
		${title('Top Loyal Users', { color: NAVY, font: FONT, sub: 'Profitable agents who never use a coupon', subColor: '#33446B', width: 900, pos: `left:${PAD}px;bottom:86px` })}
		${stat('54.55%', 'live outside<br>Java', { bg: ELECTRIC, fg: '#fff', font: FONT, style: 'right:96px;bottom:96px' })}
	</div>`
};

/* ── Data & Pulsa: sorted the way customers ask ── */
const pkg = (name, days, price) => `
	<div class="row" style="justify-content:space-between;padding:18px 0;border-bottom:2px solid #F0F1F5">
		<div><div style="font:700 21px ${FONT};color:#151a2e">${name}</div><div style="font:600 17px ${FONT};color:#7b8196;margin-top:4px">${days}</div></div>
		<b style="font:800 21px ${FONT};color:${ELECTRIC}">${price}</b>
	</div>`;
const tabs = ['Harga', 'Kuota', 'Paket Data', 'Masa Aktif'];
const pulsaApp = `${statusBar()}
	<div style="padding:4px 24px">
		<div style="font:800 32px ${FONT};color:#151a2e">Paket Data</div>
		<div class="row" style="gap:8px;margin:18px 0 6px;flex-wrap:wrap">${tabs.map((t, i) => `<span style="padding:9px 14px;border-radius:99px;font:700 16px ${FONT};${i ? 'background:#F0F2F8;color:#4a5068' : `background:${ELECTRIC};color:#fff`}">${t}</span>`).join('')}</div>
		${pkg('Ketengan 2GB', '1 hari', 'Rp 5.500')}
		${pkg('Flash 4.5GB', '7 hari', 'Rp 24.500')}
		${pkg('Kuota Malam 10GB', '30 hari', 'Rp 31.000')}
		${pkg('Combo Sakti 12GB', '30 hari', 'Rp 62.000')}
		${pkg('OMG! 25GB', '30 hari', 'Rp 98.000')}
	</div>`;
const tag = (label, pct, bg, style) =>
	`<div class="abs row art" style="gap:16px;padding:20px 28px;border-radius:24px;background:${bg};box-shadow:0 30px 50px -24px rgba(0,0,0,.5);font:800 50px ${FONT};letter-spacing:-.03em;color:#151a2e;${style}">${label}<span style="font-weight:700;font-size:40px">${pct}</span></div>`;
const dataPulsa = {
	slug: 'data-pulsa-improvements',
	dir: 'data-pulsa',
	fonts: FONTS,
	css: `.stage{background:radial-gradient(100% 100% at 80% 70%,#22305f 0%,#141a33 60%,#0c1022 100%)}`,
	html: `<div class="stage grain">
		${title('Data &amp; Pulsa', { color: '#fff', font: FONT, sub: '170 packages, sorted the way customers ask', subColor: '#C7CEE6', width: 1100, align: 'center', pos: 'left:0;right:0;margin:0 auto;top:96px' })}
		${phone(pulsaApp, { silver: true, style: 'left:610px;top:350px' })}
		${tag('Harga', '42.7%', Y, 'left:250px;top:520px;transform:rotate(-5deg)')}
		${tag('Kuota', '38.3%', '#A9B8FF', 'left:1070px;top:640px;transform:rotate(4deg)')}
	</div>`
};

export const fazz = [catatUtang, modalTerms, loyalUsers, dataPulsa];
