// Warung Pintar: signal yellow, ink and warm paper. Mitra persona and the home
// revamp were redesigned on request; the rest keep their original direction.
import { phone, statusBar, title } from '../kit.mjs';
import { grosir, heuristic } from './warung-pintar-classic.mjs';
import { orderFlow, tokosmart } from './warung-pintar-studio.mjs';

const Y = '#FFD23F';
const INK = '#141414';
const PAPER = '#F5F0E4';
const FONT = "'Plus Jakarta Sans'";
const FONTS = ['Plus+Jakarta+Sans:wght@500;600;700;800', 'Nunito+Sans:wght@600;700;800;900'];
const NUNITO = "'Nunito Sans'";

/* ── Mitra user persona: the four learner archetypes, title underneath ── */
const avatar = (skin, hair, shirt, bg) => `
	<div style="position:relative;height:200px;border-radius:24px;background:${bg};overflow:hidden">
		<div class="abs" style="left:50%;bottom:-70px;width:210px;height:170px;margin-left:-105px;border-radius:105px 105px 0 0;background:${shirt}"></div>
		<div class="abs" style="left:50%;top:44px;width:104px;height:116px;margin-left:-52px;border-radius:50px 50px 46px 46px;background:${skin}"></div>
		<div class="abs" style="left:50%;top:30px;width:120px;height:58px;margin-left:-60px;border-radius:60px 60px 18px 18px;background:${hair}"></div>
		<div class="abs" style="left:50%;top:104px;width:46px;margin-left:-23px;display:flex;justify-content:space-between"><i style="width:9px;height:9px;border-radius:50%;background:${INK}"></i><i style="width:9px;height:9px;border-radius:50%;background:${INK}"></i></div>
		<div class="abs" style="left:50%;top:128px;width:26px;height:12px;margin-left:-13px;border-radius:0 0 14px 14px;background:${INK}"></div>
	</div>`;
const persona = (name, look, { x, y, rot, dark }) => `
	<div class="abs art" style="left:${x}px;top:${y}px;width:330px;padding:16px 16px 22px;border-radius:30px;background:${dark ? INK : '#fff'};transform:rotate(${rot}deg);box-shadow:0 40px 60px -28px rgba(80,55,0,.55)">
		${avatar(...look)}
		<div style="margin-top:18px;padding-left:6px;font:800 48px/1 ${FONT};letter-spacing:-.04em;color:${dark ? Y : INK}">${name}</div>
	</div>`;
const mitraPersona = {
	slug: 'mitra-persona',
	dir: 'mitra-persona',
	fonts: FONTS,
	css: `.stage{background:linear-gradient(180deg,#FFE27A 0%,${Y} 50%,#F7C21A 100%)}`,
	html: `<div class="stage grain soft">
		${persona('Busy Bee', ['#E9B48A', '#2b1d14', '#E8743B', '#FFF1C4'], { x: 110, y: 250, rot: -5 })}
		${persona('Diva', ['#D79D74', '#3b2418', '#C94F7C', '#F6E7D2'], { x: 460, y: 210, rot: 2 })}
		${persona('Sustainer', ['#C98B62', '#1d1410', '#3E8E5E', '#FFF1C4'], { x: 810, y: 240, rot: -2 })}
		${persona('Builder', ['#B87A52', '#16100c', '#3D6FD6', '#2a2a2a'], { x: 1160, y: 270, rot: 5, dark: true })}
		${title('Mitra User Persona', { color: INK, font: FONT, sub: 'Who runs the warung, in four archetypes', width: 1200, align: 'center', pos: 'left:0;right:0;margin:0 auto;top:660px' })}
	</div>`
};

/* ── Home screen revamp: the real lo-fi layout and the Revamp I home ── */
const N = (w, size, c = INK) => `font:${w} ${size}px ${NUNITO};color:${c}`;
const lofi = `<div style="padding:66px 20px 0;display:grid;gap:12px;filter:grayscale(1)">
	<div style="height:44px;border-radius:12px;border:2px solid #cfcfcf;${N(700, 15, '#999')};line-height:40px;padding:0 14px">Belanja Yuk . . .</div>
	<div style="height:130px;border-radius:16px;background:#e3e3e3;padding:14px;${N(800, 16, '#888')}">PROMO PINTAR</div>
	<div style="${N(800, 16, '#777')}">Kategori Produk</div>
	<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px">${[1, 2, 3, 4].map((k) => `<div style="text-align:center;${N(700, 12, '#999')}"><div style="height:56px;border-radius:14px;background:#e6e6e6;margin-bottom:4px"></div>Kat ${k}</div>`).join('')}</div>
	<div class="row" style="gap:8px">${['Produk Warung', 'Produk Digital'].map((t) => `<span style="padding:8px 12px;border-radius:99px;border:2px solid #d5d5d5;${N(700, 12, '#888')}">${t}</span>`).join('')}</div>
	<div style="${N(800, 16, '#777')}">Produk Panas</div>
	<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px">${'<div style="height:110px;border-radius:14px;background:#ececec"></div>'.repeat(3)}</div></div>`;
const section = (title, more) =>
	`<div class="row" style="justify-content:space-between;margin:16px 0 10px"><span style="${N(900, 17)}">${title}</span>${more ? `<span style="${N(800, 13, '#B07C00')}">Lihat semua</span>` : ''}</div>`;
const hot = (tag, name, price, tint) =>
	`<div style="border-radius:14px;border:2px solid #eee;padding:8px"><div style="position:relative;height:74px;border-radius:10px;background:${tint}"><span style="position:absolute;left:6px;top:6px;padding:2px 7px;border-radius:6px;background:${INK};color:${Y};${N(900, 10, Y)}">${tag}</span></div><div style="margin-top:6px;${N(700, 12)}">${name}</div><div style="${N(900, 13)}">${price}</div></div>`;
const hifi = `${statusBar(Y)}
	<div style="background:${Y};padding:2px 20px 16px">
		<div class="row" style="gap:10px"><div style="flex:1;height:44px;border-radius:12px;background:#fff;${N(700, 14, '#9a958a')};line-height:44px;padding:0 14px">Cari produk kebutuhan warung</div><div style="width:44px;height:44px;border-radius:12px;background:${INK};color:${Y};display:grid;place-items:center;font-size:20px">🔔</div></div>
		<div style="margin-top:12px;height:96px;border-radius:16px;background:${INK};padding:14px 16px;position:relative;overflow:hidden">
			<div style="${N(800, 12, Y)}">PROMO PINTAR</div><div style="${N(900, 24, '#fff')}">Rabu Untung</div><div style="${N(700, 13, '#ccc')}">Diskon hingga 50%</div>
			<div class="abs" style="right:-20px;top:-20px;width:120px;height:120px;border-radius:50%;background:${Y}"></div></div>
	</div>
	<div style="padding:0 20px">
		${section('Kategori Produk Warung')}
		<div class="row" style="gap:8px">${['Sembako', 'Makanan', 'Minuman', 'Sachet'].map((c, i) => `<span style="padding:9px 12px;border-radius:12px;background:${['#FFE9C2', '#FFD9D0', '#D9ECFF', '#DDF3E2'][i]};${N(800, 13)}">${c}</span>`).join('')}</div>
		${section('Voucher untuk Juragan', true)}
		<div style="padding:12px 14px;border-radius:14px;border:2px dashed ${INK};background:#FFF6D6;${N(900, 15)}">Diskon Ramadhan hingga 50%</div>
		${section('Produk dan Layanan Warung')}
		<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px">${['Pulsa', 'Paket Data', 'Listrik', 'BPJS'].map((l, i) => `<div style="text-align:center;${N(700, 11)}"><div style="height:46px;border-radius:14px;background:${['#FF8A3D', '#3DA9FF', '#FFB21E', '#18B8A6'][i]}26;margin-bottom:4px;display:grid;place-items:center"><i style="width:20px;height:20px;border-radius:7px;background:${['#FF8A3D', '#3DA9FF', '#FFB21E', '#18B8A6'][i]}"></i></div>${l}</div>`).join('')}</div>
		${section('Produk Panas 🔥')}
		<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px">${hot('WPD', 'ABC Kopi Susu', 'Rp 2.500', '#C99A6B')}${hot('GROSIR', 'Indomie Goreng', 'Rp 5.000', '#F6B13D')}${hot('WPD', 'Teh Pucuk', 'Rp 3.500', '#86C06C')}</div>
	</div>
	<div class="abs row" style="left:0;right:0;bottom:0;height:70px;background:#fff;border-top:2px solid #eee;justify-content:space-around">${['Home', 'Pesan', 'Lacak', 'Warungku'].map((t, i) => `<div style="text-align:center;${N(800, 12, i ? '#999' : INK)}"><div style="width:22px;height:22px;margin:0 auto 4px;border-radius:7px;background:${i ? '#ddd' : Y}"></div>${t}</div>`).join('')}</div>`;
const note = (n, text, style) =>
	`<div class="abs row" style="gap:16px;padding:14px 26px 14px 14px;border-radius:99px;background:#fff;box-shadow:0 20px 34px -18px rgba(80,55,0,.45);${N(800, 38)};letter-spacing:-.02em;white-space:nowrap;${style}"><span style="width:52px;height:52px;border-radius:50%;background:${INK};color:${Y};display:grid;place-items:center;${N(900, 26, Y)}">${n}</span>${text}</div>`;
const homeRevamp = {
	slug: 'home-screen-revamp',
	dir: 'home-revamp',
	fonts: FONTS,
	css: `.stage{background:${PAPER}}
		.sun{left:520px;top:80px;width:840px;height:840px;border-radius:50%;background:${Y}}`,
	html: `<div class="stage grain soft">
		<div class="abs sun"></div>
		${phone(lofi, { silver: true, bg: '#f7f7f7', style: 'left:150px;top:200px;transform:rotate(-7deg) scale(.82)' })}
		<div class="abs" style="left:560px;top:520px;${N(900, 80)}">→</div>
		${phone(hifi, { style: 'left:700px;top:96px;transform:scale(1.04)' })}
		${note(1, 'Search first', 'left:1130px;top:200px')}
		${note(4, 'Juragan vouchers', 'left:1130px;top:430px')}
		${note(8, 'Four tabs', 'left:1130px;top:780px')}
	</div>`
};

export const warungPintar = [mitraPersona, heuristic, orderFlow, homeRevamp, tokosmart, grosir];
