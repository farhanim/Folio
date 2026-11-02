// Shared frame for case-study slides: 1600×1000 (rendered at 2000w), a brand
// header, a title and a content area of cards. Slides are read large (page and
// fullscreen slideshow), so body text is 21–24px and labels never go below 18px.
export const slideCss = (t) => `
	.stage{background:${t.bg};font-family:${t.font};color:${t.ink}}
	.hd{position:absolute;left:72px;right:72px;top:52px;display:flex;justify-content:space-between;align-items:center;font:700 22px ${t.font};color:${t.muted}}
	.hd img{width:44px;height:44px;border-radius:12px;margin-right:14px}
	.hd .n{font-variant-numeric:tabular-nums}
	h2{position:absolute;left:72px;top:124px;font:800 62px/1.02 ${t.font};letter-spacing:-.035em;color:${t.ink}}
	.lede{position:absolute;left:72px;top:206px;font:500 27px/1.35 ${t.font};color:${t.muted}}
	.card{position:absolute;border-radius:28px;background:#fff;padding:34px 36px;box-shadow:0 1px 0 rgba(0,0,0,.03),0 24px 44px -28px ${t.shadow}}
	.eyebrow{font:800 18px ${t.font};letter-spacing:.09em;text-transform:uppercase;color:${t.accent}}
	.body{font:500 23px/1.45 ${t.font};color:${t.body}}
	.num{display:inline-grid;place-items:center;flex:none;width:40px;height:40px;border-radius:50%;background:${t.accent};color:#fff;font:800 20px ${t.font}}
	.foot{position:absolute;left:0;right:0;bottom:0;height:14px;background:${t.accent}}
	ul.ticks{list-style:none;display:grid;gap:12px;margin-top:18px}
	ul.ticks li{position:relative;padding-left:30px;font:500 22px/1.35 ${t.font};color:${t.body}}
	ul.ticks li::before{content:'';position:absolute;left:4px;top:11px;width:11px;height:11px;border-radius:50%;background:var(--dot,${t.accent})}`;

/** Slide shell: header (logo · project, n / total), title, lede, then content. */
export const frame = (t, { n, total, title, lede, content }) => `
	<div class="stage">
		<div class="hd"><span class="row"><img src="${t.logo}">${t.project}</span><span class="n">${String(n).padStart(2, '0')} / ${String(total).padStart(2, '0')}</span></div>
		<h2>${title}</h2>
		<div class="lede">${lede}</div>
		${content}
		<div class="foot"></div>
	</div>`;

/* ── Grid blocks. A slide body is a 12-column grid under the title; blocks
   take `col`/`row` spans so layouts stay quick to write and consistent. ── */
export const blocks = (t) => {
	const F = t.font;
	const card = (inner, { col = 'span 6', row = 'span 1', bg = '#fff', fg = t.ink, flat = false, pad = '30px 32px', style = '' } = {}) =>
		`<div style="grid-column:${col};grid-row:${row};position:relative;min-height:0;overflow:hidden;border-radius:26px;padding:${pad};background:${bg};color:${fg};${flat ? '' : `box-shadow:0 1px 0 rgba(0,0,0,.03),0 22px 40px -28px ${t.shadow};`}${style}">${inner}</div>`;
	const grid = (inner, { top = 286, rows = 2, cols = 12 } = {}) =>
		`<div class="abs" style="left:72px;right:72px;top:${top}px;bottom:44px;display:grid;grid-template-columns:repeat(${cols},minmax(0,1fr));grid-template-rows:${typeof rows === "string" ? rows : `repeat(${rows},minmax(0,1fr))`};gap:22px">${inner}</div>`;
	const eyebrow = (text, color = t.accent) =>
		`<div style="font:800 17px ${F};letter-spacing:.09em;text-transform:uppercase;color:${color}">${text}</div>`;
	const big = (value, label, color = t.accent, size = 76) =>
		`<div style="font:900 ${size}px/.95 ${F};letter-spacing:-.04em;color:${color}">${value}</div><div style="margin-top:8px;font:600 21px/1.35 ${F};color:${t.body}">${label}</div>`;
	const hbars = (items, { color = t.accent, soft = t.soft, max, hl = [] } = {}) => {
		const m = max ?? Math.max(...items.map((i) => i[2]));
		return `<div style="display:grid;gap:12px;margin-top:16px">${items
			.map(
				([label, value, n], i) => `<div style="display:grid;grid-template-columns:minmax(150px,auto) 1fr auto;gap:14px;align-items:center;font:700 20px ${F};color:${t.ink}">
				<span>${label}</span><span style="height:26px;border-radius:8px;background:${soft}"><span style="display:block;height:100%;width:${(n / m) * 100}%;border-radius:8px;background:${hl.length && !hl.includes(i) ? t.muted + '66' : color}"></span></span><span style="min-width:70px;text-align:right;font-weight:800">${value}</span></div>`
			)
			.join('')}</div>`;
	};
	const vbars = (items, { color = t.accent, hl = [], height = 190 } = {}) => {
		const m = Math.max(...items.map((i) => i[2]));
		return `<div style="display:flex;align-items:flex-end;gap:14px;height:${height + 60}px;margin-top:14px">${items
			.map(
				([label, value, n], i) => `<div style="flex:1;text-align:center;font:700 17px ${F};color:${t.body}">
				<div style="font:800 19px ${F};color:${t.ink};margin-bottom:6px">${value}</div>
				<div style="height:${Math.max(6, (n / m) * height)}px;border-radius:10px 10px 4px 4px;background:${hl.includes(i) ? color : t.soft}"></div>
				<div style="margin-top:8px">${label}</div></div>`
			)
			.join('')}</div>`;
	};
	const donut = (pct, center, { color = t.accent, size = 190, sub = '' } = {}) =>
		`<div style="width:${size}px;height:${size}px;border-radius:50%;background:conic-gradient(${color} 0 ${pct}%,${t.soft} 0);display:grid;place-items:center;flex:none"><div style="width:${size * 0.72}px;height:${size * 0.72}px;border-radius:50%;background:#fff;display:grid;place-items:center;text-align:center"><div><div style="font:900 ${size * 0.2}px/1 ${F};color:${t.ink}">${center}</div>${sub ? `<div style="font:700 15px ${F};color:${t.muted};margin-top:4px">${sub}</div>` : ''}</div></div></div>`;
	const numbered = (items, { color = t.accent, size = 21 } = {}) =>
		`<div style="display:grid;gap:14px;margin-top:16px">${items
			.map(
				(it, i) => `<div style="display:flex;gap:14px;align-items:flex-start"><span style="flex:none;width:36px;height:36px;border-radius:50%;background:${color};color:#fff;display:grid;place-items:center;font:800 17px ${F}">${i + 1}</span><span style="font:600 ${size}px/1.35 ${F};color:${t.body};padding-top:5px">${it}</span></div>`
			)
			.join('')}</div>`;
	const ticks = (items, { color = t.accent, size = 21 } = {}) =>
		`<div style="display:grid;gap:11px;margin-top:14px">${items
			.map(
				(it) => `<div style="display:flex;gap:12px;align-items:flex-start;font:600 ${size}px/1.35 ${F};color:${t.body}"><i style="flex:none;width:11px;height:11px;margin-top:9px;border-radius:50%;background:${color}"></i><span>${it}</span></div>`
			)
			.join('')}</div>`;
	const quote = (text, who, color = t.accent) =>
		`<div style="font:800 54px/.6 ${F};color:${color}">“</div><div style="font:700 23px/1.35 ${F};color:${t.ink}">${text}</div>${who ? `<div style="margin-top:12px;font:700 17px ${F};letter-spacing:.06em;text-transform:uppercase;color:${t.muted}">${who}</div>` : ''}`;
	const flow = (steps, { color = t.accent, size = 19 } = {}) =>
		`<div style="display:flex;align-items:stretch;gap:10px;margin-top:16px">${steps
			.map(
				(s, i) =>
					`${i ? `<div style="flex:none;align-self:center;font:900 26px ${F};color:${color}">→</div>` : ''}<div style="flex:1;padding:16px;border-radius:16px;background:${t.soft};font:700 ${size}px/1.3 ${F};color:${t.ink}">${s}</div>`
			)
			.join('')}</div>`;
	const chips = (items, { bg = t.soft, fg = t.ink, size = 20 } = {}) =>
		`<div style="display:flex;flex-wrap:wrap;gap:10px;margin-top:14px">${items.map((c) => `<span style="padding:9px 16px;border-radius:99px;background:${bg};color:${fg};font:700 ${size}px ${F}">${c}</span>`).join('')}</div>`;
	const h = (text, size = 27, color = t.ink) =>
		`<div style="font:800 ${size}px/1.15 ${F};letter-spacing:-.02em;color:${color};margin-top:8px">${text}</div>`;
	const p = (text, size = 21, color = t.body) =>
		`<div style="font:500 ${size}px/1.42 ${F};color:${color};margin-top:10px">${text}</div>`;
	return { card, grid, eyebrow, big, hbars, vbars, donut, numbered, ticks, quote, flow, chips, h, p };
};

/** Build a deck for one project: slides are { name, title, lede, body(b, t) }. */
export const deckOf = (t, fonts) => (slug, dir, slides) => {
	const b = blocks(t);
	const css = slideCss(t);
	return slides.map((s, i) => ({
		slug,
		dir,
		name: s.name,
		fonts,
		css,
		html: frame(t, { n: i + 1, total: slides.length, title: s.title, lede: s.lede, content: s.body(b, t) })
	}));
};

/** An app screen drawn as a card: coloured header, then rows. */
export const appScreen = (t, title, rows, { accent = t.accent, foot = '', hl = -1 } = {}) => `
	<div style="border-radius:22px;border:3px solid ${t.soft};overflow:hidden;background:#fff;height:100%">
		<div style="padding:14px 18px;background:${accent};color:#fff;font:800 19px ${t.font}">${title}</div>
		<div style="padding:4px 18px">${rows
			.map(
				(r, i) =>
					`<div style="display:flex;justify-content:space-between;gap:10px;padding:11px 8px;margin:0 -8px;border-radius:10px;border-bottom:2px solid #F0F2F6;${i === hl ? `background:${t.soft};` : ''}font:${i === hl ? 800 : 600} 16px/1.3 ${t.font};color:${t.ink}">${Array.isArray(r) ? `<span>${r[0]}</span><b>${r[1]}</b>` : `<span>${r}</span><span style="color:${accent}">›</span>`}</div>`
			)
			.join('')}</div>
		${foot}
	</div>`;
