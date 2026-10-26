<script lang="ts">
	import type { Snippet } from 'svelte';
	import { site } from '#lib/data/site.ts';
	import { settings } from '#lib/stores/settings.svelte.ts';
	import HomeLink from './layout/HomeLink.svelte';
	import LampToggle from './layout/LampToggle.svelte';
	import MobileNav from './layout/MobileNav.svelte';
	import SettingsMenu from './layout/SettingsMenu.svelte';

	let { children }: { children: Snippet } = $props();

	let scrolled = $state(false);

	$effect(() => settings.init());
</script>

<svelte:window onscroll={() => (scrolled = scrollY > 8)} />

<!-- Solid bar behind the fixed chrome, revealed once the page scrolls -->
<div class="topbar" class:show={scrolled} aria-hidden="true"></div>

<HomeLink />
<a href="/" class="wordmark">{site.name}</a>
<LampToggle />
<SettingsMenu />
<MobileNav />

<main>
	{@render children()}
	<p class="page-end">© {site.year} {site.name}</p>
</main>

<style>
	.topbar {
		position: fixed;
		inset: 0 0 auto;
		z-index: 60;
		height: 72px;
		pointer-events: none;
		opacity: 0;
		background: var(--bg);
		border-bottom: 1px solid var(--grid-line);
		transition: opacity 0.25s ease;
	}
	.topbar.show {
		opacity: 1;
	}

	.wordmark {
		position: fixed;
		top: 24px;
		left: 54px;
		z-index: 120;
		display: flex;
		align-items: center;
		height: 24px;
		font-size: 14px;
		font-weight: 600;
		line-height: 1;
		letter-spacing: -0.01em;
		color: var(--text-secondary);
		text-decoration: none;
		transition: color 0.2s ease;
	}
	.wordmark:hover {
		color: var(--text);
	}

	/* Content snaps to whole 184px columns so its edges sit on the background grid lines */
	main {
		--pad: 20px;
		position: relative;
		z-index: 1;
		display: grid;
		grid-template-columns: repeat(auto-fill, 184px);
		grid-template-rows: 1fr auto;
		grid-auto-columns: 184px;
		column-gap: var(--gutter);
		min-height: 100vh;
		padding: 0 var(--pad);
	}

	.page-end {
		grid-column: 1 / -1;
		align-self: end;
		padding: 40px 0 24px;
		font-size: 12px;
		letter-spacing: -0.005em;
		color: var(--text-secondary);
		opacity: 0.45;
	}

	@media (min-width: 481px) {
		main {
			width: calc(
				max(round(down, 100vw - 2 * var(--pad) + var(--gutter), 204px), 204px) + var(--gutter)
			);
		}
	}
	@media (max-width: 1023px) {
		.topbar {
			height: 64px;
		}
	}
	@media (min-width: 1024px) {
		.wordmark {
			left: 224px;
		}
		.page-end {
			grid-column: 2 / -1;
		}
	}
	@media (min-width: 1440px) {
		.page-end {
			grid-column: 3 / -1;
		}
	}
	@media (max-width: 480px) {
		main {
			--pad: max(25px, env(safe-area-inset-left));
			grid-template-columns: repeat(2, 1fr);
			column-gap: 25px;
			min-height: 100dvh;
		}
		.wordmark {
			top: max(10px, calc(env(safe-area-inset-top) - 10px));
			left: max(25px, env(safe-area-inset-left));
			height: 44px;
			font-size: 15px;
		}
		.page-end {
			padding-bottom: max(48px, env(safe-area-inset-bottom));
		}
	}
</style>
