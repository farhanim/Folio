<script lang="ts">
	import type { Snippet } from 'svelte';
	import { settings } from '#lib/stores/settings.svelte.ts';
	import Dock from './layout/Dock.svelte';
	import FloatingCta from './layout/FloatingCta.svelte';
	import GridOverlay from './layout/GridOverlay.svelte';
	import LampToggle from './layout/LampToggle.svelte';
	import SiteFooter from './layout/SiteFooter.svelte';
	import TopBar from './layout/TopBar.svelte';

	let { children }: { children: Snippet } = $props();

	$effect(() => settings.init());

	/*
	 * Asset protection, site-wide: no right-click menu, no dragging images or video
	 * out, no copy or cut of page content, and no save / view-source / dev-tools
	 * shortcuts (F12, Ctrl+Shift+I/J/C/K, Cmd+Option+I/J/C/U).
	 * Form fields keep working, and the site's own Copy buttons write to the
	 * clipboard directly, so they still work too. (A page can't fully stop dev
	 * tools: the browser menu still opens them. This stops the casual ways.)
	 */
	$effect(() => {
		const editable = (t: EventTarget | null) =>
			t instanceof Element && !!t.closest('input, textarea, select, [contenteditable="true"]');
		const block = (e: Event) => {
			if (!editable(e.target)) e.preventDefault();
		};
		const keys = (e: KeyboardEvent) => {
			// Physical key: on Mac, Option changes e.key (Cmd+Option+I reports "ˆ")
			const key = e.code.replace(/^Key/, '').toLowerCase();
			const mod = e.ctrlKey || e.metaKey;
			const blocked =
				// Save page / view source
				(mod && !e.altKey && !e.shiftKey && ['s', 'u'].includes(key)) ||
				// Developer tools: F12, Ctrl+Shift+I/J/C (Windows, Linux), Cmd+Option+I/J/C/U (Mac)
				e.key === 'F12' ||
				(mod && e.shiftKey && ['i', 'j', 'c', 'k'].includes(key)) ||
				(e.metaKey && e.altKey && ['i', 'j', 'c', 'u'].includes(key));
			if (blocked) {
				e.preventDefault();
				e.stopPropagation();
			}
		};
		const events = ['contextmenu', 'dragstart', 'copy', 'cut'] as const;
		for (const name of events) document.addEventListener(name, block);
		// Capture phase on window, so this runs before any other key handler
		window.addEventListener('keydown', keys, { capture: true });
		return () => {
			for (const name of events) document.removeEventListener(name, block);
			window.removeEventListener('keydown', keys, { capture: true });
		};
	});
</script>

<GridOverlay />
<TopBar />
<LampToggle />

<main id="top" tabindex="-1">
	{@render children()}
	<SiteFooter />
</main>

<Dock />
<FloatingCta />

<style>
	main {
		position: relative;
		z-index: 1;
		min-height: 100vh;
		padding-top: var(--bar);
		outline: none;
	}
</style>
