<script lang="ts">
	import Icon from '#lib/components/ui/Icon.svelte';
	import SegmentedControl from '#lib/components/ui/SegmentedControl.svelte';
	import type { Project } from '#lib/types/index.ts';

	/**
	 * The project's own build in a browser frame. Only a still shows until the
	 * visitor asks for it; then the site mounts at a real device width, scaled to fit.
	 */
	let { project, loaded = $bindable(false) }: { project: Project; loaded?: boolean } = $props();
	const preview = $derived(project.preview!);

	type Device = 'desktop' | 'mobile';
	const sizes: Record<Device, [number, number]> = { desktop: [1280, 800], mobile: [390, 760] };
	let device = $state<Device>('desktop');
	let frameKey = $state(0);
	let stageW = $state(0);

	const viewW = $derived(sizes[device][0]);
	const viewH = $derived(sizes[device][1]);
	// Desktop fills the frame width; mobile is scaled to the frame height.
	const frameH = $derived(stageW ? stageW * 0.625 : 0);
	const scale = $derived(
		!stageW ? 1 : device === 'desktop' ? stageW / viewW : Math.min(1, frameH / viewH)
	);
</script>

<section class="live" id="live">
	<h2 class="label">Live demo</h2>

	<div class="content">
		<div class="browser">
			<div class="bar">
				<span class="dots" aria-hidden="true"><i></i><i></i><i></i></span>
				<span class="url label">{project.title}</span>
				{#if loaded}
					<div class="devices">
						<SegmentedControl
							label="Device"
							options={[
								{ value: 'desktop', label: 'Desktop' },
								{ value: 'mobile', label: 'Mobile' }
							]}
							value={device}
							onchange={(v) => (device = v)}
						/>
					</div>
					<button
						type="button"
						class="icon-btn"
						aria-label="Reload demo"
						onclick={() => frameKey++}
					>
						<Icon name="refresh" size={14} />
					</button>
				{/if}
				<a
					class="icon-btn"
					href={preview.url}
					target="_blank"
					rel="noopener"
					aria-label="Open in a new tab"
				>
					<Icon name="arrowUpRight" size={14} />
				</a>
			</div>

			<div class="stage" bind:clientWidth={stageW} style:height="{frameH}px">
				{#if loaded}
					{#key frameKey}
						<iframe
							title="{project.title} live demo"
							src={preview.url}
							style:width="{viewW}px"
							style:height="{viewH}px"
							style:transform="translateX(-50%) scale({scale})"
						></iframe>
					{/key}
				{:else}
					<button type="button" class="start" onclick={() => (loaded = true)}>
						<img src={project.gallery?.[0]?.src ?? preview.poster} alt="" loading="lazy" />
						<span class="start-cta">
							<span class="play"><Icon name="play" size={15} stroke={2} /></span>
							Launch live demo
						</span>
					</button>
				{/if}
			</div>
		</div>
		{#if preview.note}
			<p class="note"><Icon name="sparkle" size={12} /> {preview.note}</p>
		{/if}
	</div>
</section>

<style>
	/* On the page grid: label in cols 1–2, frame in 3–10 */
	.live,
	.content {
		display: grid;
		grid-template-columns: subgrid;
		align-content: start;
	}
	.live {
		grid-column: 1 / -1;
		padding: 40px 0 32px;
		border-top: 1px solid var(--hairline);
	}
	h2 {
		grid-column: 1 / span 2;
		margin: 0 0 16px;
	}
	.content {
		grid-column: 3 / -1;
	}
	.content > * {
		grid-column: 1 / -1;
	}

	.browser {
		overflow: hidden;
		border-radius: 14px;
		border: 1px solid var(--rule);
		background: var(--card);
		box-shadow: var(--shadow-float);
	}
	.bar {
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 8px 10px 8px 14px;
		border-bottom: 1px solid var(--hairline);
	}
	.dots {
		display: flex;
		gap: 6px;
	}
	.dots i {
		width: 9px;
		height: 9px;
		border-radius: 50%;
		background: var(--rule);
	}
	.url {
		flex: 1;
		min-width: 0;
		overflow: hidden;
		padding: 5px 10px;
		border-radius: 8px;
		background: var(--bg);
		text-overflow: ellipsis;
		white-space: nowrap;
		text-transform: none;
	}
	.devices {
		width: 160px;
	}
	.icon-btn {
		display: grid;
		place-items: center;
		flex: none;
		width: 30px;
		height: 30px;
		border: 1px solid var(--hairline);
		border-radius: 8px;
		background: var(--bg);
		color: var(--text);
		cursor: pointer;
	}
	.icon-btn:hover {
		border-color: var(--rule);
	}

	.stage {
		position: relative;
		overflow: hidden;
		background: var(--surface);
	}
	iframe {
		position: absolute;
		top: 0;
		left: 50%;
		border: 0;
		background: #fff;
		transform-origin: top center;
	}
	.start {
		position: absolute;
		inset: 0;
		padding: 0;
		border: 0;
		background: none;
		cursor: pointer;
	}
	.start img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: top center;
		filter: saturate(0.85) brightness(0.92);
		transition:
			filter 0.4s ease,
			transform 0.9s var(--ease-out);
	}
	.start:hover img {
		filter: none;
		transform: scale(1.02);
	}
	.start-cta {
		position: absolute;
		left: 50%;
		top: 50%;
		display: inline-flex;
		align-items: center;
		gap: 10px;
		padding: 8px 18px 8px 8px;
		border-radius: 999px;
		background: var(--text);
		color: var(--bg);
		font-size: 14px;
		translate: -50% -50%;
		box-shadow: var(--shadow-float);
		transition: transform 0.4s var(--ease-out);
	}
	.start:hover .start-cta {
		transform: scale(1.05);
	}
	.play {
		display: grid;
		place-items: center;
		width: 32px;
		height: 32px;
		border-radius: 50%;
		background: var(--amber);
		color: #1a1a1a;
	}
	.note {
		display: flex;
		align-items: center;
		gap: 6px;
		margin-top: 12px;
		font-size: 13px;
		color: var(--text-secondary);
	}

	@media (max-width: 1023px) {
		h2,
		.content {
			grid-column: 1 / -1;
		}
	}
	@media (max-width: 600px) {
		.devices {
			display: none;
		}
	}
</style>
