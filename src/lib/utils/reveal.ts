import type { Action } from 'svelte/action';

/**
 * Fades/lifts an element in the first time it scrolls into view.
 * Children with `data-reveal` are staggered in order. Styles live in layout.css.
 */
export const reveal: Action<HTMLElement, { delay?: number } | undefined> = (node, options) => {
	node.classList.add('reveal');
	node.style.setProperty('--reveal-delay', `${options?.delay ?? 0}ms`);
	node.querySelectorAll<HTMLElement>('[data-reveal]').forEach((child, i) => {
		child.style.setProperty('--reveal-index', String(i));
	});

	const io = new IntersectionObserver(
		([entry]) => {
			if (!entry.isIntersecting) return;
			node.classList.add('revealed');
			io.disconnect();
		},
		{ rootMargin: '0px 0px -10% 0px' }
	);
	io.observe(node);

	return { destroy: () => io.disconnect() };
};
