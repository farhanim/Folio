// Renders project art laid out in plain HTML/CSS at 1600×1000, so fonts, device
// frames and real screenshots are baked into one image and cost nothing at runtime.
//
//   bun scripts/covers/render.mjs                 # every thumbnail
//   bun scripts/covers/render.mjs kee sparq       # only slugs containing these words
//   bun scripts/covers/render.mjs --slides saldo  # case-study slides instead
//
// Thumbnails: thumb.webp (1600w) and thumb-sm.webp (800w) per project.
// Slides: <dir>/<name>.webp at 2000w, sharp in the fullscreen slideshow.
import { chromium } from 'playwright';
import { mkdirSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { base } from './base.mjs';
import { covers } from './covers.mjs';
import { slides } from '../slides/index.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const staticDir = resolve(here, '../../static');
const W = 1600;
const H = 1000;

const args = process.argv.slice(2);
const slideMode = args.includes('--slides');
const only = args.filter((a) => !a.startsWith('--'));
const source = slideMode ? slides : covers;
const queue = source.filter((c) => !only.length || only.some((o) => c.slug.includes(o)));

// Thumbnails ship two widths; slides one, rendered at 1.25× for crisp text.
const scale = slideMode ? 1.25 : 1;
const outputs = (item) =>
	slideMode
		? [{ name: `${item.name}.webp`, w: W * scale, q: 0.86 }]
		: [
				{ name: 'thumb.webp', w: W, q: 0.84 },
				{ name: 'thumb-sm.webp', w: W / 2, q: 0.8 }
			];

function page({ fonts = [], css = '', html }) {
	const families = fonts.map((f) => `family=${f}`).join('&');
	const link = fonts.length
		? `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?${families}&display=block">`
		: '';
	return `<!doctype html><html><head><meta charset="utf-8">
<base href="${pathToFileURL(staticDir).href}/">${link}
<style>${base}${css}</style></head><body>${html}</body></html>`;
}

const browser = await chromium.launch();
const ctx = await browser.newContext({
	viewport: { width: W, height: H },
	deviceScaleFactor: scale
});
const tab = await ctx.newPage();
const encoder = await ctx.newPage();
const work = join(tmpdir(), 'folio-covers');
mkdirSync(work, { recursive: true });

for (const item of queue) {
	const id = slideMode ? `${item.slug}-${item.name}` : item.slug;
	const file = join(work, `${id}.html`);
	writeFileSync(file, page(item));
	await tab.goto(pathToFileURL(file).href, { waitUntil: 'networkidle' });
	await tab.evaluate(async () => {
		await document.fonts.ready;
		await Promise.all([...document.images].map((i) => i.decode().catch(() => {})));
	});
	// Text must never overlap the illustration (rotations included: boxes are
	// axis-aligned, so this errs on the side of more space).
	const clashes = await tab.evaluate(() => {
		const box = (e) => e.getBoundingClientRect();
		const hit = (a, b) =>
			a.left < b.right && b.left < a.right && a.top < b.bottom && b.top < a.bottom;
		const text = [...document.querySelectorAll('.txt')];
		const art = [...document.querySelectorAll('.phone, .browser, .laptop, .monitor, .art')];
		return text.flatMap((t) =>
			art
				.filter((a) => !a.contains(t) && hit(box(t), box(a)))
				.map(
					(a) =>
						`"${t.textContent.trim().slice(0, 24)}" × .${(a.getAttribute('class') ?? '').split(' ')[0]}`
				)
		);
	});
	if (clashes.length) console.warn(`  ! ${id}: ${clashes.join(', ')}`);
	const png = await tab.screenshot({ type: 'png' });

	// Chromium's own WebP encoder: no native image tooling needed.
	const sizes = outputs(item);
	const encoded = await encoder.evaluate(
		async ({ b64, sizes }) => {
			const blob = await (await fetch(`data:image/png;base64,${b64}`)).blob();
			const bitmap = await createImageBitmap(blob);
			return sizes.map(({ w, q }) => {
				const canvas = document.createElement('canvas');
				canvas.width = w;
				canvas.height = Math.round((bitmap.height / bitmap.width) * w);
				const g = canvas.getContext('2d');
				g.imageSmoothingQuality = 'high';
				g.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
				return canvas.toDataURL('image/webp', q).split(',')[1];
			});
		},
		{ b64: png.toString('base64'), sizes }
	);

	const dir = join(staticDir, 'images/work', item.dir);
	mkdirSync(dir, { recursive: true });
	const report = sizes.map(({ name }, i) => {
		const buf = Buffer.from(encoded[i], 'base64');
		writeFileSync(join(dir, name), buf);
		return `${name} ${(buf.length / 1024).toFixed(0)} kB`;
	});
	console.log(`${id.padEnd(32)} ${report.join('  ')}`);
}

await browser.close();
