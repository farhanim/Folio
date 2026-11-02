// AWP Order Flow and Tokosmart Reskin, redrawn on request as product scenes:
// before/after phones and a split-screen reskin, titled in Funnel Display.
import { phone, statusBar } from '../kit.mjs';

const Y = '#FFD23F';
const INK = '#141414';
const DISPLAY = "'Funnel Display'";
const NUNITO = "'Nunito Sans'";
const FONTS = ['Funnel+Display:wght@500;600;700;800', 'Nunito+Sans:wght@600;700;800;900', 'Roboto:wght@500;700'];

const pill = (text, bg, fg, style) =>
	`<div class="abs txt" style="padding:14px 30px;border-radius:99px;background:${bg};color:${fg};font:700 44px ${DISPLAY};letter-spacing:-.02em;${style}">${text}</div>`;

/* ── AWP Order Flow: the old catalog facing the new one ── */
const oldRow = (name, sku) => `
	<div class="row" style="gap:12px;padding:14px 0;border-bottom:1px solid #e6e6e6">
		<div style="width:54px;height:54px;border-radius:10px;background:#dcdcdc"></div>
		<div style="flex:1"><div style="font:700 15px ${NUNITO};color:#333">${name}</div><div style="font:600 12px ${NUNITO};color:#999">SKU ${sku}</div><div style="font:800 14px ${NUNITO};color:#333">Rp 58.000</div></div>
		<div style="padding:9px 14px;border-radius:8px;background:#9a9a9a;color:#fff;font:800 13px ${NUNITO}">Tambah</div>
	</div>`;
const before = `${statusBar('#e9e9e9')}
	<div style="background:#e9e9e9;padding:4px 22px 18px"><div style="font:900 28px ${NUNITO};color:#444">Pesan</div>
	<div style="margin-top:12px;height:44px;border-radius:10px;background:#fff"></div></div>
	<div style="padding:0 22px">${[
		['Indomie Goreng', '100234'],
		['Teh Pucuk 350ml', '100871'],
		['Kopi Kapal Api', '101552'],
		['Aqua 600ml', '102009'],
		['Rinso Cair', '102214'],
		['Gula Pasir 1kg', '103140']
	]
		.map(([n, s]) => oldRow(n, s))
		.join('')}</div>`;
const tile = (name, price, tint) => `
	<div style="border-radius:16px;border:2px solid #eee;padding:10px">
		<div style="height:92px;border-radius:12px;background:${tint}"></div>
		<div style="margin-top:8px;font:700 15px ${NUNITO};color:${INK}">${name}</div>
		<div style="font:900 16px ${NUNITO};color:${INK}">${price}</div>
		<div style="margin-top:8px;padding:7px 0;border-radius:10px;background:${Y};text-align:center;font:800 14px ${NUNITO};color:${INK}">+ Tambah</div>
	</div>`;
const seller = (name) =>
	`<div class="row" style="gap:10px;margin:16px 0 10px"><div style="width:40px;height:40px;border-radius:12px;background:${INK};color:${Y};display:grid;place-items:center;font:900 18px ${NUNITO}">G</div><div style="font:900 19px ${NUNITO};color:${INK}">${name}</div></div>`;
const after = `${statusBar(Y)}
	<div style="background:${Y};padding:4px 22px 18px"><div style="font:900 28px ${NUNITO};color:${INK}">Pesan</div>
	<div class="row" style="gap:8px;margin-top:12px">${['Terdekat', 'Termurah', 'Grid'].map((c, i) => `<span style="padding:8px 14px;border-radius:99px;font:800 13px ${NUNITO};${i ? 'background:#fff;color:#555' : `background:${INK};color:#fff`}">${c}</span>`).join('')}</div></div>
	<div style="padding:0 20px">${seller('Grosir Sinar Jaya')}
	<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">${tile('Indomie Goreng', 'Rp 112.500', '#F6B13D')}${tile('Teh Pucuk', 'Rp 58.000', '#86C06C')}</div>
	${seller('Grosir Makmur')}
	<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">${tile('Kopi Kapal Api', 'Rp 28.500', '#9B6A43')}${tile('Aqua 600ml', 'Rp 49.900', '#7CC3E6')}</div></div>`;
export const orderFlow = {
	slug: 'awp-order-flow',
	dir: 'awp-order-flow',
	fonts: FONTS,
	css: `
		.stage{background:radial-gradient(90% 80% at 50% 110%,#FFB21E 0%,${Y} 45%,#FFE58A 100%)}
		.dots{inset:0;background-image:radial-gradient(rgba(20,20,20,.12) 1.6px,transparent 1.8px);background-size:34px 34px;mask-image:radial-gradient(60% 60% at 50% 40%,transparent 30%,#000)}
		.stagep{left:0;right:0;top:250px;height:900px;perspective:1800px}
		.dial{left:50%;top:470px;width:250px;height:250px;margin-left:-125px;border-radius:50%;background:${INK};display:grid;place-items:center;text-align:center;box-shadow:0 40px 60px -24px rgba(80,50,0,.6)}`,
	html: `<div class="stage grain soft">
		<div class="abs dots"></div>
		<div class="abs txt" style="left:0;right:0;margin:0 auto;width:fit-content;top:84px;text-align:center;font:800 104px/.95 ${DISPLAY};letter-spacing:-.045em;color:${INK}">Order by seller</div>
		<div class="abs txt" style="left:0;right:0;margin:0 auto;width:fit-content;top:200px;font:600 44px ${DISPLAY};letter-spacing:-.02em;color:#3d3420">AWP catalog, 12 changes tested with 7 mitra</div>
		<div class="abs stagep">
			${phone(before, { silver: true, bg: '#fafafa', style: 'left:250px;top:40px;transform:rotateY(24deg) scale(.92);filter:saturate(.2)' })}
			${phone(after, { style: 'left:970px;top:40px;transform:rotateY(-24deg) scale(.92)' })}
		</div>
		<div class="abs dial art"><div><div style="font:800 76px/1 ${DISPLAY};letter-spacing:-.05em;color:${Y}">91</div><div style="font:600 30px ${DISPLAY};color:#bbb;margin-top:4px">from 74</div></div></div>
		${pill('Before', '#fff', INK, 'left:330px;top:300px;transform:rotate(-4deg)')}
		${pill('After', INK, Y, 'left:1100px;top:300px;transform:rotate(4deg)')}
	</div>`
};

/* ── Tokosmart reskin: one phone, split by a before/after slider ── */
const tokoScreen = `<div style="height:300px;background:linear-gradient(135deg,#0A6C96,#17A2C4 55%,#16C35A);padding:70px 24px 0;color:#fff">
		<div style="font:700 28px Roboto">Tokosmart</div>
		<div style="margin-top:20px;border-radius:16px;background:rgba(255,255,255,.22);padding:18px;font:500 16px Roboto">Saldo kredit<br><b style="font-size:30px">Rp 2.500.000</b></div></div>
	<div style="padding:22px;display:grid;grid-template-columns:repeat(4,1fr);gap:14px">${['#EF8A00', '#17A2C4', '#16C35A', '#E84040', '#8AB31F', '#0A6C96', '#F59A1F', '#D93A1A'].map((c) => `<div style="height:66px;border-radius:50%;background:radial-gradient(circle at 30% 30%,#fff8,${c})"></div>`).join('')}</div>
	<div style="margin:0 22px;height:170px;border-radius:18px;background:linear-gradient(120deg,#EF8A00,#E84040)"></div>`;
const wpScreen = `<div style="height:300px;background:${Y};padding:70px 24px 0">
		<div style="font:900 28px ${NUNITO};color:${INK}">Warung Pintar</div>
		<div style="margin-top:20px;border-radius:16px;background:${INK};padding:18px;font:700 16px ${NUNITO};color:#fff">Saldo kredit<br><b style="font-size:30px;color:${Y}">Rp 2.500.000</b></div></div>
	<div style="padding:22px;display:grid;grid-template-columns:repeat(4,1fr);gap:14px">${Array.from({ length: 8 }, (_, i) => `<div style="height:66px;border-radius:20px;border:3px solid ${INK};background:${i % 3 ? '#fff' : Y}"></div>`).join('')}</div>
	<div style="margin:0 22px;height:170px;border-radius:18px;border:3px solid ${INK};background:#FFF3C7"></div>`;
const split = `
	<div class="abs" style="inset:0;clip-path:inset(0 50% 0 0)">${tokoScreen}</div>
	<div class="abs" style="inset:0;clip-path:inset(0 0 0 50%)">${wpScreen}</div>`;
export const tokosmart = {
	slug: 'tokosmart-reskin',
	dir: 'tokosmart-reskin',
	fonts: FONTS,
	css: `
		.stage{background:${Y}}
		.left{left:0;top:0;bottom:0;width:800px;background:
			radial-gradient(40% 50% at 20% 25%,#17A2C4 0%,transparent 70%),
			radial-gradient(45% 45% at 70% 80%,#16C35A 0%,transparent 70%),
			radial-gradient(40% 40% at 30% 85%,#EF8A00 0%,transparent 70%),#0A6C96}
		.line{left:799px;top:0;bottom:0;width:4px;background:#fff;box-shadow:0 0 30px rgba(0,0,0,.25)}
		.knob{left:741px;top:440px;width:120px;height:120px;border-radius:50%;background:#fff;display:grid;place-items:center;font:800 54px ${DISPLAY};color:${INK};box-shadow:0 20px 40px -10px rgba(0,0,0,.45)}
		.spec{font:700 120px/1 var(--f);letter-spacing:-.03em}`,
	html: `<div class="stage grain soft">
		<div class="abs left"></div>
		<div class="abs txt" style="left:96px;top:96px;font:800 84px/.95 ${DISPLAY};letter-spacing:-.04em;color:#fff">Tokosmart</div>
		<div class="abs txt" style="right:96px;top:300px;font:800 72px/.95 ${DISPLAY};letter-spacing:-.04em;color:${INK}">Warung Pintar</div>
		<div class="abs txt" style="left:96px;bottom:96px;color:#fff"><div class="spec" style="--f:Roboto">Aa</div><div style="font:600 40px ${DISPLAY}">Roboto</div></div>
		<div class="abs txt" style="right:96px;bottom:96px;text-align:right;color:${INK}"><div class="spec" style="--f:${NUNITO};font-weight:900">Aa</div><div style="font:600 40px ${DISPLAY}">Nunito Sans</div></div>
		${phone(split, { style: 'left:610px;top:110px' })}
		<div class="abs line"></div>
		<div class="abs knob art">⟷</div>
		${pill('594 screens', INK, Y, 'left:96px;top:220px')}
	</div>`
};
