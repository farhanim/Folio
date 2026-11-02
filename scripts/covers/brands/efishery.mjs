// eFishery: deep pond green, fresh mint and a lemon accent. Saldo Panen and
// Growth & CRM were redesigned on request; the rest keep their original direction.
import { phone, stat, statusBar, title } from '../kit.mjs';
import { crmArap, efisheryFaq, enterprise } from './efishery-classic.mjs';

const DEEP = '#0E2F24';
const GREEN = '#1F8A66';
const MINT = '#4FC7A0';
const PALE = '#D7EEE4';
const LEMON = '#FFE36E';
const FONT = 'Figtree';
const FONTS = ['Figtree:wght@500;600;700;800;900'];

/* ── Saldo Panen: the harvest balance in eFisheryKu, concept-tested ── */
const tx = (label, sub, amount, positive) => `
	<div class="row" style="justify-content:space-between;padding:16px 0;border-bottom:2px solid #EEF3F0">
		<div><div style="font:700 19px ${FONT};color:#1d2b25">${label}</div><div style="font:600 15px ${FONT};color:#7b8a84;margin-top:3px">${sub}</div></div>
		<b style="font:800 19px ${FONT};color:${positive ? GREEN : '#1d2b25'}">${amount}</b>
	</div>`;
const saldoApp = `${statusBar()}
	<div style="padding:4px 24px">
		<div style="font:800 28px ${FONT};color:#1d2b25">Saldo Panen</div>
		<div style="margin-top:16px;padding:22px;border-radius:22px;background:${GREEN};color:#fff">
			<div style="font:600 16px ${FONT};opacity:.9">Saldo tersedia</div>
			<div style="font:900 36px ${FONT};letter-spacing:-.02em;margin-top:4px">Rp 4.250.000</div>
			<div style="margin-top:16px;padding:14px;border-radius:14px;background:#fff;color:${GREEN};text-align:center;font:800 18px ${FONT}">Tarik ke Rekening</div>
		</div>
		<div style="margin:22px 0 4px;font:800 19px ${FONT};color:#1d2b25">Riwayat</div>
		${tx('Hasil Tarik Ikan', 'Kolam 2 · 14 Mar', '+Rp 1.850.000', true)}
		${tx('Hasil Tarik Ikan', 'Kolam 1 · 2 Mar', '+Rp 2.400.000', true)}
		${tx('Tarik ke BRI', 'Biaya admin Rp1.500', '−Rp 1.001.500')}
	</div>`;
const heat = (x, y, r) =>
	`<div class="abs" style="left:${x - r}px;top:${y - r}px;width:${r * 2}px;height:${r * 2}px;border-radius:50%;background:radial-gradient(circle,rgba(255,60,40,.75) 0%,rgba(255,200,0,.5) 35%,rgba(80,220,120,.25) 60%,transparent 72%);mix-blend-mode:multiply"></div>`;
// Where the money moves: harvest settlement → Saldo Panen → the farmer's bank.
const node = (icon, label, bg, fg) => `
	<div style="text-align:center;width:190px">
		<div style="width:130px;height:130px;margin:0 auto;border-radius:36px;background:${bg};color:${fg};display:grid;place-items:center;font:900 56px ${FONT};box-shadow:0 24px 40px -20px rgba(0,0,0,.5)">${icon}</div>
		<div style="margin-top:16px;font:800 38px ${FONT};letter-spacing:-.02em;color:#fff">${label}</div>
	</div>`;
const dash = `<div style="flex:1;height:6px;margin-bottom:70px;border-radius:6px;background:repeating-linear-gradient(90deg,${LEMON} 0 16px,transparent 16px 28px)"></div>`;
const finding = (value, label) =>
	`<div style="padding:20px 28px;border-radius:24px;background:rgba(255,255,255,.1);box-shadow:inset 0 0 0 2px rgba(255,255,255,.16)"><div style="font:900 64px/1 ${FONT};letter-spacing:-.04em;color:${LEMON}">${value}</div><div style="margin-top:8px;font:700 32px/1.1 ${FONT};color:#E3F3EC">${label}</div></div>`;
const saldoPanen = {
	slug: 'saldo-panen',
	dir: 'saldo-panen',
	fonts: FONTS,
	css: `.stage{background:radial-gradient(80% 90% at 20% 30%,#2BB384 0%,${GREEN} 30%,#0E4A37 70%,#082A1F 100%)}
		.ring{border-radius:50%;border:2px solid rgba(255,227,110,.25)}`,
	html: `<div class="stage grain">
		<div class="abs ring" style="left:-120px;top:-40px;width:760px;height:760px"></div>
		<div class="abs art" style="left:130px;top:120px;transform:rotate(-5deg)">
			${phone(saldoApp, { style: 'position:relative' })}
			${heat(190, 330, 90)}${heat(150, 560, 70)}
		</div>
		<div class="abs txt" style="left:660px;top:120px;font:900 112px/.92 ${FONT};letter-spacing:-.05em;color:#fff">Saldo Panen</div>
		<div class="abs txt" style="left:664px;top:250px;font:600 44px/1.2 ${FONT};letter-spacing:-.02em;color:#CFEBDD">Harvest money, kept in eFisheryKu</div>
		<div class="abs art row" style="left:640px;top:380px;width:880px;align-items:flex-end;gap:6px">
			${node('🐟', 'Tarik Ikan', '#fff', GREEN)}${dash}${node('Rp', 'Saldo', LEMON, DEEP)}${dash}${node('🏦', 'Bank', '#fff', DEEP)}
		</div>
		<div class="abs txt row" style="left:660px;top:700px;gap:22px;align-items:stretch">
			${finding('6.7/10', 'to find it')}${finding('Rp1.500', 'fee every farmer saw')}
		</div>
	</div>`
};

/* ── Martech & CRM: three results, each drawn as what it measures ── */
const panel = (value, label, bg, fg, left, art) => `
	<div class="abs art" style="left:${left}px;top:150px;width:440px;height:520px;border-radius:34px;padding:34px 36px;background:${bg};color:${fg};font-family:${FONT};overflow:hidden;box-shadow:0 40px 60px -30px rgba(0,0,0,.6)">
		<div style="height:240px">${art}</div>
		<div class="abs" style="left:36px;bottom:34px">
			<div style="font:900 118px/.9 ${FONT};letter-spacing:-.05em">${value}</div>
			<div style="margin-top:12px;font:800 46px/1.05 ${FONT};letter-spacing:-.02em">${label}</div>
		</div>
	</div>`;
// Before/after bars with their real values
const pair = (a, b, la, lb, ink, soft) => `
	<div class="row" style="height:100%;align-items:flex-end;gap:24px">
		${[[a, la, soft], [b, lb, ink]].map(([h, l, c]) => `<div style="flex:1;text-align:center"><div style="font:800 36px ${FONT};margin-bottom:8px">${l}</div><div style="height:${h}px;border-radius:16px 16px 6px 6px;background:${c}"></div></div>`).join('')}
	</div>`;
const person = (c) =>
	`<div style="display:grid;justify-items:center;gap:3px"><i style="width:22px;height:22px;border-radius:50%;background:${c}"></i><i style="width:40px;height:22px;border-radius:20px 20px 4px 4px;background:${c}"></i></div>`;
const crowd = `<div style="display:grid;grid-template-columns:repeat(7,1fr);gap:16px 6px;padding-top:6px">${Array.from({ length: 28 }, (_, i) => person(i % 9 === 4 ? GREEN : DEEP)).join('')}</div>`;
const martech = {
	slug: 'martech-crm',
	dir: 'martech-crm',
	fonts: FONTS,
	css: `.stage{background:radial-gradient(90% 80% at 50% 20%,#17543f 0%,${DEEP} 55%,#071a13 100%)}`,
	html: `<div class="stage grain">
		${panel('+9.7%', 'visit success', '#5BE0B3', DEEP, 96, pair(118, 174, '20.4%', '30%', DEEP, 'rgba(14,47,36,.28)'))}
		${panel('2×', 'app visits', LEMON, DEEP, 580, pair(87, 174, 'Q1', 'Q2', DEEP, 'rgba(14,47,36,.28)'))}
		${panel('800+', 'field staff', '#fff', DEEP, 1064, crowd)}
		${title('Marketing Tech &amp; Growth', { color: '#fff', font: FONT, size: 84, sub: 'One CRM for campaigns, calls and visits', subColor: '#D4EBE1', width: 1400, pos: 'left:96px;bottom:70px' })}
	</div>`
};

export const efishery = [efisheryFaq, saldoPanen, martech, enterprise, crmArap];
