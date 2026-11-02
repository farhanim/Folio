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
	 * out, no copy or cut of page content, and no save / view-source shortcuts.
	 * Form fields keep working, and the site's own Copy buttons write to the
	 * clipboard directly, so they still work too. (A determined visitor can still
	 * reach files through dev tools; this stops the casual ways.)
	 */
	$effect(() => {
		const editable = (t: EventTarget | null) =>
			t instanceof Element && !!t.closest('input, textarea, select, [contenteditable="true"]');
		const block = (e: Event) => {
			if (!editable(e.target)) e.preventDefault();
		};
		const keys = (e: KeyboardEvent) => {
			if ((e.ctrlKey || e.metaKey) && !e.altKey && ['s', 'u'].includes(e.key.toLowerCase())) {
				e.preventDefault();
			}
		};
		const events = ['contextmenu', 'dragstart', 'copy', 'cut'] as const;
		for (const name of events) document.addEventListener(name, block);
		document.addEventListener('keydown', keys);
		return () => {
			for (const name of events) document.removeEventListener(name, block);
			document.removeEventListener('keydown', keys);
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
