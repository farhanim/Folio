<script lang="ts">
	import { untrack, type Snippet } from 'svelte';

	/**
	 * Sticky "Contents" rail. Highlights the section crossing the upper third of the
	 * viewport, with a marker that slides between entries.
	 */
	let {
		items,
		title = 'Contents',
		footer
	}: { items: { id: string; label: string }[]; title?: string; footer?: Snippet } = $props();

	let active = $state('');
	let list: HTMLOListElement;
	let marker = $state({ y: 0, h: 0 });

	$effect(() => {
		const els = items
			.map((i) => document.getElementById(i.id))
			.filter((el): el is HTMLElement => !!el);
		const io = new IntersectionObserver(
			(entries) => {
				for (const e of entries) if (e.isIntersecting) active = e.target.id;
			},
			{ rootMargin: '-30% 0px -60% 0px' }
		);
		els.forEach((el) => io.observe(el));
		untrack(() => {
			if (!active && items[0]) active = items[0].id;
		});

		// The last sections may be too short to ever reach the trigger band, so once
		// the page is scrolled to the bottom the final entry becomes current.
		const atBottom = () => {
			if (innerHeight + scrollY >= document.documentElement.scrollHeight - 4) {
				active = items[items.length - 1].id;
			}
		};
		addEventListener('scroll', atBottom, { passive: true });
		return () => {
			io.disconnect();
			removeEventListener('scroll', atBottom);
		};
	});

	$effect(() => {
		const el = list.querySelector<HTMLElement>(`[data-id="${active}"]`);
		if (el) marker = { y: el.offsetTop, h: el.offsetHeight };
	});
</script>

<nav class="toc" aria-label={title}>
	<span class="label">{title}</span>
	<ol bind:this={list}>
		<li
			class="marker"
			aria-hidden="true"
			style:transform="translateY({marker.y}px)"
			style:height="{marker.h}px"
		></li>
		{#each items as item (item.id)}
			<li data-id={item.id}>
				<a
					href="#{item.id}"
					onclick={() => (active = item.id)}
					class:active={active === item.id}
					aria-current={active === item.id ? 'location' : undefined}>{item.label}</a
				>
			</li>
		{/each}
	</ol>
	{#if footer}<div class="footer">{@render footer()}</div>{/if}
</nav>

<style>
	.toc {
		position: sticky;
		top: calc(var(--bar) + 32px);
		display: flex;
		flex-direction: column;
		gap: 14px;
	}
	ol {
		position: relative;
		display: flex;
		flex-direction: column;
		margin: 0;
		padding: 0 0 0 12px;
		list-style: none;
		border-left: 1px solid var(--hairline);
	}
	.marker {
		position: absolute;
		left: -1px;
		top: 0;
		width: 1px;
		background: var(--text);
		transition:
			transform 0.45s var(--ease-out),
			height 0.45s var(--ease-out);
	}
	a {
		display: block;
		padding: 5px 0;
		font-size: 13px;
		color: var(--text-secondary);
		opacity: 0.7;
		text-decoration: none;
		transition:
			color 0.2s ease,
			opacity 0.2s ease,
			transform 0.4s var(--ease-out);
	}
	a:hover {
		color: var(--text);
		opacity: 1;
	}
	a.active {
		color: var(--text);
		opacity: 1;
		transform: translateX(4px);
	}
	.footer {
		display: flex;
		flex-direction: column;
		gap: 10px;
		padding-top: 6px;
	}
</style>
