<script lang="ts">
	import { flip } from 'svelte/animate';
	import { fade } from 'svelte/transition';
	import Icon from '#lib/components/ui/Icon.svelte';
	import type { Project, ProjectCategory } from '#lib/types/index.ts';
	import { reveal } from '#lib/utils/reveal.ts';

	let { projects }: { projects: Project[] } = $props();

	type Filter = 'All' | ProjectCategory;
	const filters = $derived<Filter[]>([
		'All',
		...new Set(projects.map((p) => p.category))
	] as Filter[]);
	let filter = $state<Filter>('All');
	const visible = $derived(
		filter === 'All' ? projects : projects.filter((p) => p.category === filter)
	);
	const count = (f: Filter) =>
		f === 'All' ? projects.length : projects.filter((p) => p.category === f).length;

	// ── Cursor preview: eases toward the pointer and leans with horizontal speed ──
	let hovered = $state<Project | null>(null);
	let pos = $state({ x: 0, y: 0, tilt: 0 });
	let target = { x: 0, y: 0 };
	let frame = 0;

	function follow() {
		const dx = target.x - pos.x;
		const dy = target.y - pos.y;
		const tilt = Math.max(-12, Math.min(12, dx * 0.12));
		pos = { x: pos.x + dx * 0.16, y: pos.y + dy * 0.16, tilt: pos.tilt + (tilt - pos.tilt) * 0.2 };
		if (Math.abs(dx) + Math.abs(dy) + Math.abs(pos.tilt) > 0.2)
			frame = requestAnimationFrame(follow);
		else frame = 0;
	}

	function onmove(e: PointerEvent) {
		if (e.pointerType !== 'mouse') return;
		target = { x: e.clientX, y: e.clientY };
		if (!hovered) pos = { ...target, tilt: 0 };
		if (!frame) frame = requestAnimationFrame(follow);
	}
</script>

<section class="work frame" id="work" use:reveal>
	<header class="head" data-reveal>
		<span class="label">(02) Selected work</span>
		<div class="filters" role="group" aria-label="Filter projects">
			{#each filters as f (f)}
				<button type="button" aria-pressed={filter === f} onclick={() => (filter = f)}>
					{f}<sup>{count(f)}</sup>
				</button>
			{/each}
		</div>
	</header>

	<ol class="list" data-reveal onpointerleave={() => (hovered = null)}>
		<li class="row legend label" aria-hidden="true">
			<span>No.</span><span>Project</span><span>Discipline</span><span>Year</span>
		</li>
		{#each visible as project, i (project.slug)}
			<li animate:flip={{ duration: 450 }} transition:fade={{ duration: 200 }}>
				<a
					class="row"
					href="/work#{project.slug}"
					onpointerenter={(e) => {
						onmove(e);
						hovered = project;
					}}
					onpointermove={onmove}
				>
					<span class="num">{String(i + 1).padStart(2, '0')}</span>
					<span class="title">
						<img class="mini" src={project.image} alt="" loading="lazy" />
						{project.title}
					</span>
					<span class="discipline">{project.discipline}</span>
					<span class="year">{project.year}</span>
					<span class="arrow"><Icon name="arrowUpRight" size={18} /></span>
				</a>
			</li>
		{/each}
	</ol>
</section>

<div
	class="preview"
	class:show={hovered}
	style:transform="translate3d({pos.x}px, {pos.y}px, 0) rotate({pos.tilt}deg)"
	aria-hidden="true"
>
	{#each projects as p (p.slug)}
		<img src={p.image} alt="" class:active={hovered?.slug === p.slug} loading="lazy" />
	{/each}
	<span class="tag label">{hovered?.category ?? ''}</span>
</div>

<style>
	.work {
		padding-top: 72px;
		padding-bottom: 96px;
	}
	.head {
		grid-column: 1 / -1;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 16px;
		flex-wrap: wrap;
		padding-bottom: 20px;
	}

	.filters {
		display: flex;
		gap: 6px;
		flex-wrap: wrap;
	}
	.filters button {
		padding: 6px 12px;
		border: 1px solid var(--hairline);
		border-radius: 999px;
		background: none;
		color: var(--text-secondary);
		font: inherit;
		font-size: 13px;
		cursor: pointer;
		transition:
			background-color 0.25s ease,
			color 0.25s ease,
			border-color 0.25s ease;
	}
	.filters button:hover {
		border-color: var(--rule);
		color: var(--text);
	}
	.filters button[aria-pressed='true'] {
		background: var(--text);
		border-color: var(--text);
		color: var(--bg);
	}
	sup {
		margin-left: 3px;
		font-family: var(--font-mono);
		font-size: 9px;
		opacity: 0.7;
	}

	.list {
		grid-column: 1 / -1;
		margin: 0;
		padding: 0;
		list-style: none;
		border-top: 1px solid var(--rule);
	}
	.row {
		position: relative;
		display: grid;
		grid-template-columns: repeat(12, minmax(0, 1fr));
		column-gap: var(--gap);
		align-items: center;
		padding: 22px 0;
		border-bottom: 1px solid var(--hairline);
		color: var(--text);
		text-decoration: none;
	}
	.legend {
		padding: 10px 0;
	}
	.legend span:nth-child(1),
	.num {
		grid-column: 1;
	}
	.legend span:nth-child(2),
	.title {
		grid-column: 2 / span 5;
	}
	.legend span:nth-child(3),
	.discipline {
		grid-column: 7 / span 4;
	}
	.legend span:nth-child(4),
	.year {
		grid-column: 11;
	}
	.arrow {
		grid-column: 12;
		justify-self: end;
	}

	/* Hover: a fill wipes up from the baseline, the title slides, the arrow turns */
	a.row::before {
		content: '';
		position: absolute;
		inset: 0 calc(-1 * var(--pad) / 2);
		z-index: -1;
		border-radius: 10px;
		background: var(--surface);
		transform: scaleY(0);
		transform-origin: bottom;
		transition: transform 0.45s var(--ease-out);
	}
	a.row:hover::before {
		transform: scaleY(1);
	}
	.num,
	.year {
		font-family: var(--font-mono);
		font-size: 12px;
		color: var(--text-secondary);
	}
	.title {
		display: flex;
		align-items: center;
		gap: 12px;
		font-size: clamp(22px, 2.6vw, 36px);
		font-weight: 450;
		letter-spacing: -0.035em;
		line-height: 1.1;
		transition: transform 0.5s var(--ease-out);
	}
	a.row:hover .title {
		transform: translateX(14px);
	}
	.mini {
		display: none;
	}
	.discipline {
		font-size: 14px;
		color: var(--text-secondary);
	}
	.arrow {
		display: flex;
		color: var(--text-secondary);
		transition:
			transform 0.5s var(--ease-out),
			color 0.3s ease;
	}
	a.row:hover .arrow {
		color: var(--text);
		transform: rotate(45deg);
	}

	.preview {
		position: fixed;
		left: 0;
		top: 0;
		z-index: 90;
		width: 300px;
		aspect-ratio: 16 / 11;
		margin: -110px 0 0 28px;
		border-radius: 12px;
		overflow: hidden;
		pointer-events: none;
		background: var(--surface);
		box-shadow: var(--shadow-float);
		opacity: 0;
		scale: 0.85;
		transition:
			opacity 0.25s ease,
			scale 0.4s var(--ease-out);
	}
	.preview.show {
		opacity: 1;
		scale: 1;
	}
	.preview img {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		opacity: 0;
		transform: scale(1.08);
		transition:
			opacity 0.35s ease,
			transform 0.6s var(--ease-out);
	}
	.preview img.active {
		opacity: 1;
		transform: none;
	}
	.tag {
		position: absolute;
		left: 10px;
		bottom: 10px;
		padding: 3px 8px;
		border-radius: 999px;
		background: color-mix(in srgb, var(--bg) 80%, transparent);
		backdrop-filter: blur(8px);
		color: var(--text);
		font-size: 10px;
	}

	@media (max-width: 1023px), (hover: none) {
		.preview {
			display: none;
		}
		.legend {
			display: none;
		}
		.row {
			grid-template-columns: 32px 1fr auto;
			row-gap: 4px;
		}
		.num {
			grid-column: 1;
			grid-row: 1 / span 2;
			align-self: start;
			padding-top: 4px;
		}
		.title {
			grid-column: 2;
		}
		.discipline {
			grid-column: 2;
			grid-row: 2;
			font-size: 13px;
		}
		.year {
			display: none;
		}
		.arrow {
			grid-column: 3;
			grid-row: 1 / span 2;
		}
		.mini {
			display: block;
			width: 52px;
			height: 36px;
			flex: none;
			border-radius: 6px;
			object-fit: cover;
			background: var(--surface);
		}
	}
</style>
