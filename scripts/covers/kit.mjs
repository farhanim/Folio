// Shared cover pieces. Every cover follows the same rules so it reads at card size
// (a 1600px cover shows at ~340px, so 46px here is ~10px on screen):
// - text is a title plus at most one line or one stat; nothing smaller than 46px
// - solid, high-contrast colours, no faded text
// - top-right stays clear for the client badge, bottom-left for the "Live preview" chip
// - text never sits on the illustration: render.mjs checks .txt against .phone,
//   .browser, .laptop, .monitor and anything marked .art, and fails loudly
export const PAD = 96;

export const shot = (dir, n) => `images/work/${dir}/shot-${n}.webp`;

/**
 * Title block. `sub` is one short line. Top-left by default; pass `pos` (CSS
 * offsets) and `align` to place it anywhere, so covers don't all read the same.
 */
export const title = (
	text,
	{ color, sub, subColor, font, size = 100, top = 104, width = 720, pos, align = 'left' }
) => `
	<div class="abs txt" style="${pos ?? `left:${PAD}px;top:${top}px`};width:fit-content;max-width:${width}px;text-align:${align};font-family:${font}">
		<div style="font-weight:800;font-size:${size}px;line-height:.98;letter-spacing:-.045em;color:${color}">${text}</div>
		${sub ? `<div style="margin-top:26px;font-weight:500;font-size:46px;line-height:1.15;text-wrap:balance;letter-spacing:-.025em;color:${subColor ?? color}">${sub}</div>` : ''}
	</div>`;

/** One stat: big number, short label, on a solid pill. */
export const stat = (value, label, { bg, fg, accent, font, style = '' }) => `
	<div class="abs txt" style="display:inline-flex;align-items:center;gap:22px;padding:22px 34px 22px 26px;border-radius:999px;background:${bg};font-family:${font};${style}">
		<span style="font-weight:800;font-size:68px;line-height:1;letter-spacing:-.04em;color:${accent ?? fg}">${value}</span>
		<span style="font-weight:600;font-size:40px;line-height:1.05;letter-spacing:-.02em;color:${fg}">${label}</span>
	</div>`;

export const browser = (src, { dark = false, style = '' } = {}) =>
	`<div class="browser${dark ? ' dark' : ''}" style="${style}"><div class="bar"><i></i><i></i><i></i></div><img src="${src}"></div>`;

export const laptop = (src, style, space = true) =>
	`<div class="laptop${space ? ' space' : ''}" style="${style}"><div class="lid"><img src="${src}"></div><div class="base"></div></div>`;

export const monitor = (src, style) =>
	`<div class="monitor" style="${style}"><div class="scr"><img src="${src}"></div><div class="neck"></div><div class="foot"></div></div>`;

/** Phone frame; `inner` is the screen's HTML. */
export const phone = (inner, { style = '', silver = false, bg = '#fff' } = {}) =>
	`<div class="phone${silver ? ' silver' : ''}" style="${style}"><div class="scr" style="background:${bg}">${inner}</div></div>`;

export const statusBar = (bg = 'transparent', color = '#111') =>
	`<div class="sb" style="background:${bg};color:${color}"><span>9:41</span><span>●●● ▮</span></div>`;
