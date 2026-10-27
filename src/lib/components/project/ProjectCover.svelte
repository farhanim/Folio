<script lang="ts">
	import type { Project } from '#lib/types/index.ts';
	import ClientBadge from './ClientBadge.svelte';
	import Tag from './Tag.svelte';

	/** Project image with status tags top-left and the client badge top-right. */
	let {
		project,
		ratio = '16 / 10',
		showFeatured = true,
		eager = false
	}: { project: Project; ratio?: string; showFeatured?: boolean; eager?: boolean } = $props();
</script>

<span class="cover" style:aspect-ratio={ratio}>
	<img src={project.cover} alt="" loading={eager ? 'eager' : 'lazy'} decoding="async" />
	<span class="tags">
		{#if project.isNew}<Tag kind="new" />{/if}
		{#if showFeatured && project.featured}<Tag kind="featured" />{/if}
	</span>
	<span class="client"><ClientBadge client={project.client} /></span>
</span>

<style>
	.cover {
		position: relative;
		display: block;
		width: 100%;
		overflow: hidden;
		border-radius: 14px;
		background: var(--surface);
		isolation: isolate;
	}
	img {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.9s var(--ease-out);
	}
	:global(a:hover) .cover img {
		transform: scale(1.035);
	}
	.tags {
		position: absolute;
		top: 12px;
		left: 12px;
		display: flex;
		gap: 6px;
	}
	.client {
		position: absolute;
		top: 12px;
		right: 12px;
	}
</style>
