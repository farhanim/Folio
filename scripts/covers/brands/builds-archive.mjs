// Telkomsel CCM, Repositori Arsip Digital and Royal Mitra Persada. Quiet and
// neutral, one headline about what the product does for its users, but each
// composed differently:
// - CCM: dark, the dashboard cropped off the left edge, text and figures on the right
// - Repositori: light, no screenshot; the search and the records it returns
// - Royal Mitra Persada: website off the top-left corner, CMS editor over it,
//   text bottom-right
import { shot } from '../kit.mjs';

const SANS = "'Geist'";
const MONO = "'Geist Mono'";
const FONTS = ['Geist:wght@400;500;600', 'Geist+Mono:wght@500'];

const label = (text, dot, color) =>
	`<div class="txt" style="display:flex;align-items:center;gap:16px;font:500 30px ${MONO};letter-spacing:.02em;color:${color}"><i style="width:16px;height:16px;border-radius:4px;background:${dot}"></i>${text}</div>`;
const frame = (src, style, { dark = false } = {}) =>
	`<div class="abs art" style="border-radius:16px;overflow:hidden;background:${dark ? '#0f1724' : '#fff'};box-shadow:0 0 0 1.5px ${dark ? 'rgba(255,255,255,.12)' : '#D9DCE1'},0 40px 80px -40px rgba(0,0,0,.35);${style}"><img src="${src}" style="display:block;width:100%"></div>`;

/* ── CCM: dark, the figures that matter, the dashboard ── */
const figure = (n, text) =>
	`<div style="display:flex;align-items:baseline;gap:24px;padding:20px 0;border-top:1.5px solid rgba(255,255,255,.14)"><span style="width:96px;font:500 52px ${MONO};letter-spacing:-.04em;color:#fff">${n}</span><span style="font:400 40px ${SANS};letter-spacing:-.02em;color:#A3A3A3">${text}</span></div>`;
export const ccm = {
	slug: 'ccm',
	dir: 'ccm',
	fonts: FONTS,
	css: '.stage{background:#161616}',
	html: `<div class="stage">
		<div class="abs txt" style="left:920px;top:250px;width:580px;display:flex;flex-direction:column;gap:36px">
			${label('Complaint analytics', '#E4202A', '#A3A3A3')}
			<div style="font:600 78px/1 ${SANS};letter-spacing:-.045em;color:#fff;text-wrap:balance">Spot SLA slips, from nationwide to city.</div>
		</div>
		<div class="abs txt" style="left:920px;top:590px;width:560px">
			${figure('11', 'regions')}${figure('5', 'drill-down levels')}${figure('12', 'weeks of trends')}
		</div>
		${frame(shot('ccm', 1), 'left:-200px;top:150px;width:1000px', { dark: true })}
	</div>`
};

/* ── Repositori: the search, and the records it finds ── */
const NAVY = '#1A1B4B';
const row = (code, title, unit, date, hit = false) =>
	`<div style="display:grid;grid-template-columns:1fr auto;gap:10px 20px;padding:28px 34px;border-top:1.5px solid #ECEAE4;${hit ? 'background:#F7F5F0' : ''}">
		<span style="font:500 26px ${MONO};color:#8A877F">${code}</span><span style="font:500 26px ${MONO};color:#8A877F">${date}</span>
		<span style="font:500 36px ${SANS};letter-spacing:-.02em;color:#151515">${title}</span><span style="align-self:center;padding:6px 16px;border-radius:99px;box-shadow:inset 0 0 0 1.5px #DEDBD3;font:500 24px ${SANS};color:#55524B">${unit}</span>
	</div>`;
export const repoMuskitnas = {
	slug: 'repo-muskitnas',
	dir: 'repo-muskitnas',
	fonts: FONTS,
	css: '.stage{background:#F4F2EE}',
	html: `<div class="stage">
		<div class="abs txt" style="left:96px;top:120px;width:560px;display:flex;flex-direction:column;gap:40px">
			${label('Archive management', NAVY, '#6B6A66')}
			<div style="font:600 80px/1 ${SANS};letter-spacing:-.045em;color:#151515;text-wrap:balance">Any museum record, found in seconds.</div>
			<div style="font:400 46px/1.2 ${SANS};letter-spacing:-.025em;color:#6B6A66;text-wrap:balance">One searchable archive for 14 work units.</div>
		</div>
		<div class="abs art" style="left:760px;top:200px;width:760px;border-radius:24px;overflow:hidden;background:#fff;box-shadow:0 0 0 1.5px #E2DFD8,0 40px 80px -44px rgba(20,20,20,.3)">
			<div style="display:flex;align-items:center;gap:20px;padding:30px 34px">
				<svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="${NAVY}" stroke-width="2.2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/></svg>
				<span style="font:500 36px ${MONO};color:#151515">SK/MKN/2026</span><span style="width:3px;height:42px;background:${NAVY}"></span>
				<span style="margin-left:auto;font:500 26px ${SANS};color:#8A877F">3 results</span>
			</div>
			${row('1-TU-20260304-001', 'SK Kepala Museum 2026', 'Tata Usaha', '04 Mar 2026', true)}
			${row('1-HUM-20250612-012', 'Materi Publikasi Hari Museum', 'Humas', '12 Jun 2025')}
			${row('1-KOL-20250721-010', 'Laporan Kondisi Koleksi', 'Koleksi', '21 Jul 2025')}
		</div>
	</div>`
};

/* ── Royal Mitra Persada: the website, and the CMS editing it ── */
export const royalMitraPersada = {
	slug: 'royalmitrapersada',
	dir: 'royalmitrapersada',
	fonts: FONTS,
	css: '.stage{background:#E8EBEF}',
	html: `<div class="stage">
		${frame(shot('royalmitrapersada', 1), 'left:-60px;top:-16px;width:980px;border-radius:0 0 18px 0')}
		${frame(shot('royalmitrapersada', 5), 'left:560px;top:440px;width:560px')}
		<div class="abs txt" style="left:1180px;top:430px;width:360px;display:flex;flex-direction:column;gap:30px">
			${label('Website + CMS', '#0F62C9', '#5E6672')}
			<div style="font:600 64px/1 ${SANS};letter-spacing:-.045em;color:#14171C;text-wrap:balance">A catalogue the team runs itself.</div>
			<div style="font:400 40px/1.2 ${SANS};letter-spacing:-.025em;color:#5E6672;text-wrap:balance">Products, promos and enquiries in one CMS.</div>
		</div>
	</div>`
};
