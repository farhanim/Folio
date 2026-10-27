import type { Action } from 'svelte/action';

/** Moves an element to the end of <body>, so fixed overlays escape any parent stacking context. */
export const portal: Action<HTMLElement> = (node) => {
	document.body.appendChild(node);
	return { destroy: () => node.remove() };
};
