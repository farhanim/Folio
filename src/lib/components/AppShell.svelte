<script lang="ts">
	import type { Snippet } from 'svelte';
	import { settings } from '#lib/stores/settings.svelte.ts';
	import Dock from './layout/Dock.svelte';
	import GridOverlay from './layout/GridOverlay.svelte';
	import LampToggle from './layout/LampToggle.svelte';
	import TopBar from './layout/TopBar.svelte';

	let { children }: { children: Snippet } = $props();

	$effect(() => settings.init());
</script>

<GridOverlay />
<TopBar />
<LampToggle />

<main>
	{@render children()}
</main>

<Dock />

<style>
	main {
		position: relative;
		z-index: 1;
		min-height: 100vh;
		padding-top: var(--bar);
	}
</style>
