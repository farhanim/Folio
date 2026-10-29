<script lang="ts">
	import { untrack } from 'svelte';
	import { page } from '$app/state';
	import { dock } from '#lib/data/site.ts';
	import Icon from '#lib/components/ui/Icon.svelte';
	import SettingsControls from './SettingsControls.svelte';

	/**
	 * Floating glass dock at the bottom of the screen. On the home page it tracks the
	 * section in view (scroll-spy) with a sliding highlight; it also hosts settings.
	 */
	let active = $state(dock[0].id);
	let settingsOpen = $state(false);
	let root: HTMLElement;
	let list: HTMLElement;
	let indicator = $state({ x: 0, w: 0, ready: false });

	const isHome = $derived(page.url.pathname === '/');

	// Which item is lit: a page item on its page, Work on project pages, else the scroll-spy.
	const current = $derived.by(() => {
		const path = page.url.pathname;
		const pageItem = dock.find((item) => item.href && path.startsWith(item.href));
		if (pageItem) return pageItem.id;
		if (path.startsWith('/work')) return 'work';
		return isHome ? active : null;
	});
	const hrefOf = (item: (typeof dock)[number]) =>
		item.href ?? (isHome ? `#${item.id}` : `/#${item.id}`);

	// Scroll-spy: a section is "current" while it crosses the middle of the viewport.
	$effect(() => {
		if (!isHome) return;
		const sections = dock
			.map((item) => document.getElementById(item.id))
			.filter((el): el is HTMLElement => !!el);
		const io = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) if (entry.isIntersecting) active = entry.target.id;
			},
			{ rootMargin: '-45% 0px -50% 0px' }
		);
		sections.forEach((s) => io.observe(s));
		return () => io.disconnect();
	});

	// Slide the highlight under the active item.
	$effect(() => {
		const el = current && list.querySelector<HTMLElement>(`[data-id="${current}"]`);
		if (!el) {
			untrack(() => (indicator = { ...indicator, ready: false }));
			return;
		}
		const measure = () => {
			indicator = { x: el.offsetLeft, w: el.offsetWidth, ready: true };
		};
		measure();
		// Neighbours' labels collapse as this one expands, shifting its position, so watch every item.
		const ro = new ResizeObserver(measure);
		list.querySelectorAll('li[data-id]').forEach((li) => ro.observe(li));
		return () => ro.disconnect();
	});

	function onDocumentPointer(e: PointerEvent) {
		if (settingsOpen && !root.contains(e.target as Node)) settingsOpen = false;
	}
</script>

<svelte:document
	onpointerdown={onDocumentPointer}
	onkeydown={(e) => e.key === 'Escape' && (settingsOpen = false)}
/>

<nav class="dock" aria-label="Sections" bind:this={root}>
	<div class="popover" class:open={settingsOpen} id="dock-settings" inert={!settingsOpen}>
		<SettingsControls />
		<p class="hint label">Tip: press <kbd>L</kbd> to pull the lamp</p>
	</div>

	<div class="pill">
		<ul bind:this={list}>
			<li
				class="indicator"
				class:ready={indicator.ready}
				style:transform="translateX({indicator.x}px)"
				style:width="{indicator.w}px"
				aria-hidden="true"
			></li>
			{#each dock as item (item.id)}
				<li data-id={item.id}>
					<a
						href={hrefOf(item)}
						class:active={current === item.id}
						aria-current={current === item.id ? (item.href ? 'page' : 'true') : undefined}
						onclick={() => !item.href && (active = item.id)}
					>
						<Icon name={item.icon} size={16} />
						<span class="text">{item.label}</span>
					</a>
				</li>
			{/each}
		</ul>
		<span class="sep" aria-hidden="true"></span>
		<button
			type="button"
			class="settings"
			class:open={settingsOpen}
			aria-label="Settings"
			aria-expanded={settingsOpen}
			aria-controls="dock-settings"
			onclick={() => (settingsOpen = !settingsOpen)}
		>
			<Icon name="sliders" size={16} />
		</button>
	</div>
</nav>

<style>
	.dock {
		position: fixed;
		left: 50%;
		bottom: max(18px, env(safe-area-inset-bottom));
		z-index: 110;
		translate: -50% 0;
		animation: dock-in 0.9s var(--ease-out) 0.4s both;
	}
	@keyframes dock-in {
		from {
			opacity: 0;
			transform: translateY(24px) scale(0.96);
		}
	}

	.pill {
		display: flex;
		align-items: center;
		gap: 4px;
		padding: 5px;
		border-radius: 999px;
		background: color-mix(in srgb, var(--bg) 72%, transparent);
		backdrop-filter: blur(18px) saturate(1.4);
		border: 1px solid var(--hairline);
		box-shadow:
			var(--shadow-float),
			inset 0 1px 0 rgba(255, 255, 255, 0.35);
	}

	ul {
		position: relative;
		display: flex;
		gap: 2px;
		margin: 0;
		padding: 0;
		list-style: none;
	}
	.indicator {
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		border-radius: 999px;
		background: var(--text);
		opacity: 0;
		transition:
			transform 0.5s var(--ease-out),
			width 0.5s var(--ease-out),
			opacity 0.3s ease;
	}
	.indicator.ready {
		opacity: 1;
	}

	a,
	.settings {
		position: relative;
		display: flex;
		align-items: center;
		gap: 7px;
		height: 36px;
		padding: 0 12px;
		border: 0;
		border-radius: 999px;
		background: none;
		color: var(--text-secondary);
		font: inherit;
		font-size: 13px;
		letter-spacing: -0.01em;
		text-decoration: none;
		cursor: pointer;
		transition: color 0.25s ease;
	}
	a:hover,
	.settings:hover,
	.settings.open {
		color: var(--text);
	}
	a.active {
		color: var(--bg);
	}

	/* Labels only show for the active item (and on hover), keeping the dock compact */
	.text {
		display: inline-block;
		max-width: 0;
		overflow: hidden;
		white-space: nowrap;
		opacity: 0;
		transition:
			max-width 0.5s var(--ease-out),
			opacity 0.3s ease;
	}
	a.active .text,
	a:hover .text {
		max-width: 80px;
		opacity: 1;
	}

	.sep {
		width: 1px;
		height: 20px;
		margin: 0 2px;
		background: var(--hairline);
	}
	.settings {
		width: 36px;
		padding: 0;
		justify-content: center;
	}
	.settings :global(svg) {
		transition: transform 0.5s var(--ease-out);
	}
	.settings.open :global(svg) {
		transform: rotate(90deg);
	}

	.popover {
		position: absolute;
		right: 0;
		bottom: calc(100% + 10px);
		width: 248px;
		padding: 14px;
		border-radius: 14px;
		background: var(--bg);
		border: 1px solid var(--rule);
		box-shadow: var(--shadow-float);
		opacity: 0;
		visibility: hidden;
		transform: translateY(8px) scale(0.98);
		transform-origin: bottom right;
		transition:
			opacity 0.2s ease,
			transform 0.3s var(--ease-out),
			visibility 0.2s;
	}
	.popover.open {
		opacity: 1;
		visibility: visible;
		transform: none;
	}
	.hint {
		margin: 14px 0 0;
		padding-top: 12px;
		border-top: 1px solid var(--hairline);
		text-transform: none;
		font-size: 10.5px;
	}
	kbd {
		display: inline-block;
		min-width: 18px;
		padding: 1px 5px;
		border: 1px solid var(--rule);
		border-bottom-width: 2px;
		border-radius: 4px;
		font: inherit;
		text-align: center;
		color: var(--text);
	}

	@media (max-width: 600px) {
		a {
			padding: 0 11px;
		}
		a:hover:not(.active) .text {
			max-width: 0;
			opacity: 0;
		}
	}
</style>
