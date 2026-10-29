<script lang="ts">
	import type { Snippet } from 'svelte';

	/** Section heading: an eyebrow, a title with an optional count, and an optional right-hand slot. */
	let {
		eyebrow,
		title,
		count,
		aside
	}: { eyebrow?: string; title: string; count?: number; aside?: Snippet } = $props();
</script>

<header class="head" data-reveal>
	<div>
		{#if eyebrow}<span class="label">{eyebrow}</span>{/if}
		<h2>
			{title}{#if count !== undefined}<sup>{count}</sup>{/if}
		</h2>
	</div>
	{#if aside}<div class="aside">{@render aside()}</div>{/if}
</header>

<style>
	.head {
		grid-column: 1 / -1;
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		gap: 16px;
		flex-wrap: wrap;
		padding-bottom: 16px;
		margin-bottom: 28px;
		border-bottom: 1px solid var(--rule);
	}
	h2 {
		margin: 6px 0 0;
		font-size: clamp(26px, 2.6vw, 38px);
		font-weight: 450;
		letter-spacing: -0.035em;
		line-height: 1.05;
	}
	sup {
		margin-left: 4px;
		font-family: var(--font-mono);
		font-size: 12px;
		font-weight: 400;
		letter-spacing: 0;
		color: var(--text-secondary);
		vertical-align: 1.4em;
	}
	.aside {
		display: flex;
		align-items: center;
		gap: 8px;
	}
	@media (max-width: 600px) {
		.aside {
			width: 100%;
			justify-content: space-between;
		}
	}
</style>
