// Covers rendered by scripts/covers ship as thumb.webp (1600w) with a half-size
// thumb-sm.webp twin. Small slots take the twin; responsive ones get a srcset.
const LARGE = /\/thumb\.webp$/;

/** The 800w file for small slots (pills, list thumbnails, cursor preview). */
export function coverSmall(src: string) {
	return LARGE.test(src) ? src.replace(LARGE, '/thumb-sm.webp') : src;
}

/** Both widths, so the browser picks by slot size and pixel density. */
export function coverSrcset(src: string) {
	return LARGE.test(src) ? `${coverSmall(src)} 800w, ${src} 1600w` : undefined;
}
