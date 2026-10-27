<script lang="ts">
	import { fade, scale } from 'svelte/transition';
	import Icon from '#lib/components/ui/Icon.svelte';
	import type { Project } from '#lib/types/index.ts';
	import { portal } from '#lib/utils/portal.ts';

	/**
	 * A compact "Motion & screens" group: the motion clip beside a small grid of
	 * screenshots. Anything can be opened full screen.
	 */
	let { project }: { project: Project } = $props();

	type Item = { kind: 'motion' | 'shot'; src: string; poster?: string; label: string };
	const items = $derived<Item[]>([
		...(project.preview
			? [
					{
						kind: 'motion' as const,
						src: project.preview.video,
						poster: project.preview.poster,
						label: 'Motion overview'
					}
				]
			: []),
		...(project.gallery ?? []).map((g) => ({ kind: 'shot' as const, src: g.src, label: g.alt }))
	]);
	const motion = $derived(items.find((i) => i.kind === 'motion'));
	const shots = $derived(items.filter((i) => i.kind === 'shot'));

	// Lightbox
	let open = $state<number | null>(null);
	const show = (item: Item) => (open = items.indexOf(item));
	const step = (d: 1 | -1) => open !== null && (open = (open + d + items.length) % items.length);
	function onkeydown(e: KeyboardEvent) {
		if (open === null) return;
		if (e.key === 'Escape') open = null;
		else if (e.key === 'ArrowRight') step(1);
		else if (e.key === 'ArrowLeft') step(-1);
	}

	// The inline motion clip plays only while it's on screen.
	let clip: HTMLVideoElement | undefined = $state();
	$effect(() => {
		if (!clip || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		const v = clip;
		const io = new IntersectionObserver(
			([e]) => (e.isIntersecting ? v.play().catch(() => {}) : v.pause()),
			{
				threshold: 0.4
			}
		);
		io.observe(v);
		return () => io.disconnect();
	});
</script>

<svelte:window {onkeydown} />

<section class="strip" id="media">
	<h2 class="label">Motion &amp; screens</h2>

	<div class="content">
		{#if motion}
			<button
				type="button"
				class="tile motion"
				onclick={() => show(motion)}
				aria-label="Play motion overview full screen"
			>
				<video
					bind:this={clip}
					src={motion.src}
					poster={motion.poster}
					muted
					loop
					playsinline
					preload="none"
				></video>
				<span class="tag"><Icon name="play" size={9} stroke={2.4} /> Motion</span>
				<span class="expand" aria-hidden="true"><Icon name="arrowUpRight" size={12} /></span>
			</button>
		{/if}
		<div class="shots" class:full={!motion}>
			{#each shots as shot (shot.src)}
				<button
					type="button"
					class="tile"
					onclick={() => show(shot)}
					aria-label="View {shot.label}"
				>
					<img src={shot.src} alt="" loading="lazy" />
					<span class="caption">{shot.label}</span>
				</button>
			{/each}
		</div>
	</div>
</section>

{#if open !== null}
	{@const item = items[open]}
	<div
		class="lightbox"
		use:portal
		role="dialog"
		aria-modal="true"
		aria-label={item.label}
		transition:fade={{ duration: 200 }}
	>
		<button type="button" class="backdrop" aria-label="Close" onclick={() => (open = null)}
		></button>
		{#key open}
			<figure in:scale={{ start: 0.96, duration: 250 }}>
				{#if item.kind === 'motion'}
					<video src={item.src} poster={item.poster} autoplay muted loop playsinline controls
					></video>
				{:else}
					<img src={item.src} alt={item.label} />
				{/if}
				<figcaption>
					<span>{item.label}</span><span class="label">{open + 1} / {items.length}</span>
				</figcaption>
			</figure>
		{/key}
		<button type="button" class="nav prev" aria-label="Previous" onclick={() => step(-1)}
			><Icon name="chevronLeft" size={18} /></button
		>
		<button type="button" class="nav next" aria-label="Next" onclick={() => step(1)}
			><Icon name="chevronRight" size={18} /></button
		>
		<button type="button" class="nav close" aria-label="Close" onclick={() => (open = null)}
			><Icon name="x" size={16} /></button
		>
	</div>
{/if}

<style>
	/* On the page grid: label 1–2 · motion 3–6 · screens 7–10 (2 × 2) */
	.strip,
	.content {
		display: grid;
		grid-template-columns: subgrid;
		align-content: start;
	}
	.strip {
		grid-column: 1 / -1;
		padding: 32px 0 40px;
		border-top: 1px solid var(--hairline);
	}
	h2 {
		grid-column: 1 / span 2;
		margin: 0 0 16px;
	}
	.content {
		grid-column: 3 / -1;
		align-items: start;
		row-gap: var(--gap);
	}
	.motion {
		grid-column: span 4;
	}
	.shots {
		grid-column: span 4;
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--gap);
	}
	.shots.full {
		grid-column: 1 / -1;
		grid-template-columns: repeat(4, 1fr);
	}

	.tile {
		position: relative;
		display: block;
		width: 100%;
		aspect-ratio: 16 / 10;
		padding: 0;
		overflow: hidden;
		border: 0;
		border-radius: 12px;
		background: var(--surface);
		box-shadow: 0 0 0 1px var(--hairline);
		cursor: zoom-in;
		transition:
			transform 0.5s var(--ease-out),
			box-shadow 0.3s ease;
	}
	.tile:hover {
		transform: translateY(-3px);
		box-shadow:
			0 0 0 1px var(--rule),
			var(--shadow-float);
	}
	/* Screens fill the same height as the motion clip: a 2 × 2 grid */
	.shots:not(.full) {
		aspect-ratio: 16 / 10;
		grid-template-rows: 1fr 1fr;
	}
	.shots:not(.full) .tile {
		aspect-ratio: auto;
		height: 100%;
	}
	.tile img,
	.tile video {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: top center;
		transition: transform 0.8s var(--ease-out);
	}
	.tile:hover img {
		transform: scale(1.04);
	}
	.tag,
	.caption {
		position: absolute;
		left: 8px;
		bottom: 8px;
		display: inline-flex;
		align-items: center;
		gap: 5px;
		max-width: calc(100% - 16px);
		padding: 3px 9px;
		overflow: hidden;
		border-radius: 999px;
		background: color-mix(in srgb, var(--bg) 85%, transparent);
		backdrop-filter: blur(8px);
		color: var(--text);
		font-size: 11px;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.tag {
		background: var(--text);
		color: var(--bg);
		font-family: var(--font-mono);
		font-size: 9px;
		letter-spacing: 0.04em;
		text-transform: uppercase;
	}
	.caption {
		opacity: 0;
		transform: translateY(4px);
		transition:
			opacity 0.25s ease,
			transform 0.3s var(--ease-out);
	}
	.tile:hover .caption {
		opacity: 1;
		transform: none;
	}
	.expand {
		position: absolute;
		top: 8px;
		right: 8px;
		display: grid;
		place-items: center;
		width: 26px;
		height: 26px;
		border-radius: 50%;
		background: color-mix(in srgb, var(--bg) 85%, transparent);
		color: var(--text);
	}

	/* Lightbox */
	.lightbox {
		position: fixed;
		inset: 0;
		z-index: 300;
		display: grid;
		place-items: center;
		padding: 64px clamp(16px, 6vw, 96px);
	}
	.backdrop {
		position: absolute;
		inset: 0;
		border: 0;
		background: rgba(10, 9, 8, 0.86);
		backdrop-filter: blur(6px);
		cursor: zoom-out;
	}
	figure {
		position: relative;
		margin: 0;
		max-width: min(1200px, 100%);
	}
	figure img,
	figure video {
		display: block;
		max-width: 100%;
		max-height: calc(100vh - 160px);
		border-radius: 12px;
	}
	figcaption {
		display: flex;
		justify-content: space-between;
		gap: 12px;
		margin-top: 12px;
		color: #e8e4df;
		font-size: 13px;
	}
	figcaption .label {
		color: #9a9490;
	}
	.nav {
		position: absolute;
		display: grid;
		place-items: center;
		width: 44px;
		height: 44px;
		border: 1px solid rgba(255, 255, 255, 0.16);
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.06);
		color: #e8e4df;
		cursor: pointer;
	}
	.nav:hover {
		background: rgba(255, 255, 255, 0.14);
	}
	.prev {
		left: 16px;
		top: 50%;
	}
	.next {
		right: 16px;
		top: 50%;
	}
	.close {
		top: 16px;
		right: 16px;
	}

	@media (max-width: 1023px) {
		h2,
		.content {
			grid-column: 1 / -1;
		}
		.motion,
		.shots {
			grid-column: span 3;
		}
	}
	@media (max-width: 600px) {
		.motion,
		.shots {
			grid-column: 1 / -1;
		}
	}
</style>
