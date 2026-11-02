// Data Room and SILMA as product heroes, like SparQ: what goes in, how the product
// handles it, and what comes out.
const DISPLAY = "'Funnel Display'";
const MONO = "'JetBrains Mono'";
const FONTS = ['Funnel+Display:wght@500;600;700;800', 'JetBrains+Mono:wght@500;700'];

const glass = (inner, style) =>
	`<div class="abs art" style="border-radius:26px;background:linear-gradient(160deg,rgba(255,255,255,.16),rgba(255,255,255,.06));box-shadow:inset 0 0 0 1.5px rgba(255,255,255,.22),0 30px 60px -30px rgba(0,0,0,.7);${style}">${inner}</div>`;
const beamPath = (x1, y1, x2, y2) => {
	const mx = (x1 + x2) / 2;
	const d = `M${x1} ${y1} C ${mx} ${y1}, ${mx} ${y2}, ${x2} ${y2}`;
	return `<path d="${d}" stroke="url(#hb)" stroke-width="5" fill="none" stroke-linecap="round"/><path d="${d}" stroke="#fff" stroke-width="5" fill="none" stroke-linecap="round" stroke-dasharray="2 40" opacity=".85"/>`;
};
/** Beams from the input chips into the centre window, and from it to the outputs. */
const beams = (ins, outs, [from, to]) =>
	`<svg class="abs" style="left:0;top:0" width="1600" height="1000"><defs><linearGradient id="hb" x1="0" x2="1"><stop offset="0" stop-color="${from}"/><stop offset="1" stop-color="${to}"/></linearGradient></defs>${ins.map((y) => beamPath(400, y, 520, 600)).join('')}${outs.map((y) => beamPath(1080, 600, 1150, y)).join('')}</svg>`;
const winBar = (label, bg, fg) =>
	`<div class="row" style="gap:10px;padding:16px 22px;background:${bg}"><i style="width:13px;height:13px;border-radius:50%;background:#FF5F57"></i><i style="width:13px;height:13px;border-radius:50%;background:#FEBC2E"></i><i style="width:13px;height:13px;border-radius:50%;background:#28C840"></i><span style="margin-left:14px;font:700 24px ${MONO};color:${fg}">${label}</span></div>`;
const chipIn = (inner, y) =>
	glass(`<div class="row" style="gap:16px;padding:16px 20px">${inner}</div>`, `left:70px;top:${y}px;width:330px`);
const out = (inner, top) => glass(inner, `left:1150px;top:${top}px;width:380px`);
const dot = (c) =>
	`<span style="flex:none;width:16px;height:16px;border-radius:50%;background:${c};box-shadow:0 0 14px ${c}"></span>`;

/* ── Data Room: files in → rooms and a locked preview → shared by role, logged, versioned ── */
const SAND = '#F4E6C4';
const AMBER = '#E0A93E';
const file = (icon, name, y) =>
	chipIn(`<img src="projects/dataroom/assets/${icon}" style="width:50px"><span style="font:700 30px ${DISPLAY};letter-spacing:-.02em;color:#fff">${name}</span>`, y);
const rooms = ['Planning', 'Land', 'Infrastructure', 'Investment', 'Environment', 'Finance', 'Legal', 'General'];
export const dataroom = {
	slug: 'dataroom',
	dir: 'dataroom',
	fonts: FONTS,
	css: `
		.stage{background:radial-gradient(50% 60% at 52% 60%,#7a4f12 0%,rgba(122,79,18,0) 70%),radial-gradient(40% 50% at 90% 15%,#b4782455 0%,transparent 70%),#120C05}
		.gridl{inset:0;background-image:linear-gradient(rgba(244,230,196,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(244,230,196,.05) 1px,transparent 1px);background-size:64px 64px;mask-image:radial-gradient(70% 70% at 55% 60%,#000,transparent)}`,
	html: `<div class="stage grain">
		<div class="abs gridl"></div>
		<div class="abs txt" style="left:84px;top:84px;font:800 110px/.9 ${DISPLAY};letter-spacing:-.05em;color:${SAND}">Data Room</div>
		<div class="abs txt" style="left:88px;top:200px;width:900px;font:600 40px/1.2 ${DISPLAY};color:#E3CFA2">One secure home for every IKN document.</div>
		${beams([502, 622, 742], [370, 590, 800], ['#F5C76B', AMBER])}
		${file('pdf-BJ6KXv3j.png', 'Masterplan', 460)}${file('xlsx-D-29AXMT.png', 'Budget', 580)}${file('ppt-ClVdMca5.png', 'Briefing', 700)}
		<div class="abs art" style="left:520px;top:330px;width:560px;border-radius:28px;overflow:hidden;background:#1E1408;box-shadow:0 0 0 2px rgba(224,169,62,.6),0 0 80px rgba(224,169,62,.35),0 40px 80px -30px #000">
			${winBar('dataroom · IKN Nusantara', '#2A1C0B', SAND)}
			<div style="display:grid;grid-template-columns:190px 1fr;gap:16px;padding:20px">
				<div style="display:grid;gap:4px;font:700 20px ${DISPLAY};color:#CDB78A">${rooms.map((r, i) => `<div style="padding:6px 12px;border-radius:10px;${i ? '' : `background:${AMBER};color:#1E1408`}">${r}</div>`).join('')}</div>
				<div style="position:relative;border-radius:16px;background:#FBF6EA;padding:20px">
					<div style="font:800 22px ${DISPLAY};color:#2a2015">Masterplan Rev3.pdf</div>
					<div style="display:grid;gap:10px;margin-top:16px">${[92, 76, 88, 60, 84].map((w) => `<i style="height:12px;width:${w}%;border-radius:6px;background:#E9DFC9"></i>`).join('')}</div>
					<div style="margin-top:18px;height:96px;border-radius:12px;background:linear-gradient(135deg,#D9C59A,#B79A62)"></div>
					<div class="abs row" style="right:14px;bottom:14px;gap:8px;padding:8px 14px;border-radius:99px;background:#1E1408;font:700 18px ${DISPLAY};color:${SAND}">🔒 View only</div>
				</div>
			</div>
		</div>
		${out(`<div style="padding:20px 24px"><div style="font:700 28px ${DISPLAY};color:#fff">Shared by role</div><div class="row" style="gap:10px;margin-top:14px">${['Admin', 'Editor', 'Viewer'].map((r, i) => `<span style="padding:8px 16px;border-radius:99px;font:700 22px ${DISPLAY};${i ? 'background:rgba(255,255,255,.14);color:#fff' : `background:${AMBER};color:#1E1408`}">${r}</span>`).join('')}</div></div>`, 280)}
		${out(`<div style="padding:20px 24px;font:600 22px/1.6 ${DISPLAY};color:#E8DAB8"><div style="font:700 28px ${DISPLAY};color:#fff;margin-bottom:6px">Audit trail</div><div><b style="color:${AMBER}">Uploaded</b> · Masterplan</div><div><b style="color:${AMBER}">Shared</b> · Budget</div></div>`, 500)}
		${out(`<div class="row" style="gap:16px;padding:20px 24px">${dot('#22C55E')}<span style="font:700 28px ${DISPLAY};color:#fff">Latest version · v3</span></div>`, 760)}
	</div>`
};

/* ── SILMA: a request in → approved step by step → handover report, asset label, inventory ── */
const BLUE = '#0D47C9';
const SVC = {
	plan: '<rect x="8" y="6" width="32" height="36" rx="4"/><path d="M16 18h16M16 26h16M16 34h10"/>',
	cart: '<path d="M6 8h6l5 24h20l4-16H14"/><circle cx="20" cy="40" r="3"/><circle cx="34" cy="40" r="3"/>',
	swap: '<path d="M8 16h28l-7-7M40 32H12l7 7"/>',
	box: '<path d="M24 4 42 14v20L24 44 6 34V14zM6 14l18 10 18-10M24 24v20"/>'
};
const svc = (k, name, y, c) =>
	chipIn(
		`<span style="flex:none;width:56px;height:56px;border-radius:16px;background:${c};display:grid;place-items:center"><svg width="34" height="34" viewBox="0 0 48 48" fill="none" stroke="#fff" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">${SVC[k]}</svg></span><span style="font:700 28px ${DISPLAY};letter-spacing:-.02em;color:#fff">${name}</span>`,
		y
	);
const approval = (label, state) => {
	const c = { done: '#4ADE80', run: '#FFD54A' }[state];
	return `<div style="text-align:center"><span style="display:grid;place-items:center;width:46px;height:46px;margin:0 auto;border-radius:50%;background:${c};box-shadow:0 0 18px ${c};font:800 24px ${DISPLAY};color:#06204f">${state === 'done' ? '✓' : ''}</span><div style="margin-top:10px;font:700 21px/1.1 ${DISPLAY};color:#fff">${label}</div></div>`;
};
export const silma = {
	slug: 'silma',
	dir: 'silma',
	fonts: FONTS,
	css: `
		.stage{background:radial-gradient(50% 60% at 52% 60%,#2f6bff 0%,rgba(47,107,255,0) 70%),radial-gradient(40% 50% at 90% 15%,#38bdf855 0%,transparent 70%),#061636}
		.kawung{inset:0;opacity:.07;background:
			radial-gradient(ellipse 22px 34px at 50% 0,#fff 98%,transparent),radial-gradient(ellipse 22px 34px at 50% 100%,#fff 98%,transparent),
			radial-gradient(ellipse 34px 22px at 0 50%,#fff 98%,transparent),radial-gradient(ellipse 34px 22px at 100% 50%,#fff 98%,transparent);background-size:80px 80px}`,
	html: `<div class="stage grain">
		<div class="abs kawung"></div>
		<div class="abs txt" style="left:84px;top:84px;font:800 120px/.88 ${DISPLAY};letter-spacing:-.05em;color:#fff">SILMA</div>
		<div class="abs txt" style="left:88px;top:208px;width:900px;font:600 40px/1.2 ${DISPLAY};color:#D6E3FF">State assets, from request to handover.</div>
		${beams([428, 536, 644, 752], [370, 590, 800], ['#7DD3FC', '#3B82F6'])}
		${svc('plan', 'Perencanaan', 388, '#2563EB')}${svc('cart', 'Pengadaan', 496, '#0EA5E9')}${svc('swap', 'Peminjaman', 604, '#7C3AED')}${svc('box', 'Pemindahan', 712, '#0F766E')}
		<div class="abs art" style="left:520px;top:330px;width:560px;border-radius:28px;overflow:hidden;background:#0A1E52;box-shadow:0 0 0 2px rgba(59,130,246,.6),0 0 80px rgba(59,130,246,.4),0 40px 80px -30px #000">
			${winBar('silma · peminjaman', '#0E2766', '#C9DAFF')}
			<div style="padding:24px">
				<div style="position:relative;display:grid;grid-template-columns:repeat(4,1fr);gap:6px">
					<div class="abs" style="left:12%;right:12%;top:21px;height:4px;background:linear-gradient(90deg,#4ADE80 66%,#FFD54A 66%)"></div>
					${approval('Diajukan', 'done')}${approval('Verifikasi', 'done')}${approval('Disetujui', 'done')}${approval('Serah terima', 'run')}
				</div>
				<div style="margin-top:22px;padding:16px 18px;border-radius:14px;background:#06143A;display:grid;gap:8px;font:600 22px ${DISPLAY};color:#C9DAFF">
					<div class="row" style="justify-content:space-between"><span>Jenis</span><b style="color:#fff">Barang Milik Negara</b></div>
					<div class="row" style="justify-content:space-between"><span>Jumlah</span><b style="color:#fff">2 unit</b></div>
				</div>
				<div class="row" style="gap:12px;margin-top:16px;padding:14px 18px;border-radius:14px;background:rgba(74,222,128,.15);font:700 24px ${DISPLAY};color:#86EFAC">${dot('#4ADE80')}Approved, ready for handover</div>
			</div>
		</div>
		${out(`<div class="row" style="gap:16px;padding:20px 24px"><div style="flex:none;width:58px;height:72px;border-radius:8px;background:#fff;padding:10px 8px;display:grid;gap:6px">${'<i style="height:5px;border-radius:3px;background:#BFD0F5"></i>'.repeat(5)}</div><div><div style="font:700 28px/1.1 ${DISPLAY};color:#fff">Berita Acara</div><div style="font:600 22px ${DISPLAY};color:#C9DAFF;margin-top:4px">Handover, signed</div></div></div>`, 290)}
		${out(`<div style="padding:20px 24px"><div class="row" style="justify-content:space-between;font:700 28px ${DISPLAY};color:#fff"><span>Asset label</span><span style="padding:4px 12px;border-radius:8px;background:#fff;color:${BLUE};font:700 20px ${MONO}">BMN</span></div><div style="margin-top:12px;height:56px;background:repeating-linear-gradient(90deg,#fff 0 4px,transparent 4px 8px,#fff 8px 10px,transparent 10px 15px,#fff 15px 20px,transparent 20px 23px)"></div></div>`, 500)}
		${out(`<div class="row" style="gap:16px;padding:20px 24px">${dot('#4ADE80')}<span style="font:700 28px ${DISPLAY};color:#fff">Inventory updated</span></div>`, 760)}
	</div>`
};
