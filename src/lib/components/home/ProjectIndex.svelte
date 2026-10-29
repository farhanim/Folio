<script lang="ts">
	import { flip } from 'svelte/animate';
	import { fade } from 'svelte/transition';
	import Icon from '#lib/components/ui/Icon.svelte';
	import SectionHead from '#lib/components/ui/SectionHead.svelte';
	import ClientBadge from '#lib/components/project/ClientBadge.svelte';
	import ProjectCover from '#lib/components/project/ProjectCover.svelte';
	import ProjectMeta from '#lib/components/project/ProjectMeta.svelte';
	import Tag from '#lib/components/project/Tag.svelte';
	import Featured from './Featured.svelte';
	import type { Project } from '#lib/types/index.ts';
	import { readingTime } from '#lib/data/projects.ts';
	import { reveal } from '#lib/utils/reveal.ts';

	/**
	 * Every project — design and code — in one index, shown as a numbered list
	 * (with a cursor-trailing preview on desktop) or as a card grid.
	 */
	let {
		projects,
		picks = [],
		id = 'projects'
	}: { projects: Project[]; picks?: Project[]; id?: string } = $props();

	// ── Filters ──
	type Filter = 'All' | 'Design' | 'Code' | 'New';
	const filters: Filter[] = ['All', 'Design', 'Code', 'New'];
	let filter = $state<Filter>('All');
	const matches = (p: Project, f: Filter) =>
		f === 'All' ||
		(f === 'New' ? !!p.isNew : f === 'Design' ? p.type === 'design' : p.type === 'code');
	// Projects already shown in "Worth a read" aren't repeated in the list or grid.
	const pool = $derived(projects.filter((p) => !picks.some((k) => k.slug === p.slug)));
	const visible = $derived(pool.filter((p) => matches(p, filter)));

	// ── List: ten rows a page ──
	const PAGE_SIZE = 10;
	let page = $state(0);
	const pages = $derived(Math.max(1, Math.ceil(visible.length / PAGE_SIZE)));
	const pageRows = $derived(visible.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE));
	function setFilter(f: Filter) {
		filter = f;
		page = 0;
	}

	// Paging swaps the rows in place, then brings the top of the list back into
	// view (below the sticky bar) instead of leaving the reader at the pager.
	let listEl: HTMLOListElement | undefined = $state();
	function goPage(to: number) {
		page = Math.max(0, Math.min(pages - 1, to));
		hovered = null;
		if (!listEl) return;
		const bar =
			parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--bar')) || 64;
		const top = listEl.getBoundingClientRect().top + scrollY - bar - 16;
		if (top < scrollY) {
			const smooth = !matchMedia('(prefers-reduced-motion: reduce)').matches;
			scrollTo({ top, behavior: smooth ? 'smooth' : 'auto' });
		}
	}

	// ── Grid: the newest few as large cards, the rest in a slider row ──
	const FEATURE_COUNT = 8;
	const lead = $derived(visible.slice(0, FEATURE_COUNT));
	const rest = $derived(visible.slice(FEATURE_COUNT));

	let rail: HTMLUListElement | undefined = $state();
	let atStart = $state(true);
	let atEnd = $state(false);
	function syncRail() {
		if (!rail) return;
		atStart = rail.scrollLeft <= 2;
		atEnd = rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 2;
	}
	function slide(dir: 1 | -1) {
		rail?.scrollBy({ left: dir * rail.clientWidth * 0.8, behavior: 'smooth' });
	}
	// Back to the start whenever the filter changes what's in the rail.
	$effect(() => {
		if (!rail || !rest.length) return;
		rail.scrollLeft = 0;
		syncRail();
		const ro = new ResizeObserver(syncRail);
		ro.observe(rail);
		return () => ro.disconnect();
	});

	// ── View (remembered per visitor) ──
	type View = 'list' | 'grid';
	const VIEW_KEY = 'folio:project-view';
	let view = $state<View>('grid');
	$effect(() => {
		try {
			const saved = localStorage.getItem(VIEW_KEY);
			if (saved === 'list' || saved === 'grid') view = saved;
		} catch {
			// storage blocked — keep the default
		}
	});
	function setView(v: View) {
		view = v;
		hovered = null;
		try {
			localStorage.setItem(VIEW_KEY, v);
		} catch {
			// ignore
		}
	}

	const typeLabel = (p: Project) => (p.type === 'design' ? 'Design' : 'Code');

	// ── Cursor preview (list view): eases toward the pointer, leans with speed ──
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

<section class="index frame" {id} use:reveal>
	<SectionHead eyebrow="Selected work" title="Projects" count={projects.length}>
		{#snippet aside()}
			<div class="filters" role="group" aria-label="Filter projects">
				{#each filters as f (f)}
					<button type="button" aria-pressed={filter === f} onclick={() => setFilter(f)}>
						{f}<sup>{pool.filter((p) => matches(p, f)).length}</sup>
					</button>
				{/each}
			</div>
			<div class="views" role="group" aria-label="Layout">
				<span class="views-thumb" class:right={view === 'grid'} aria-hidden="true"></span>
				<button
					type="button"
					aria-pressed={view === 'list'}
					aria-label="List view"
					onclick={() => setView('list')}
				>
					<Icon name="list" size={15} />
				</button>
				<button
					type="button"
					aria-pressed={view === 'grid'}
					aria-label="Grid view"
					onclick={() => setView('grid')}
				>
					<Icon name="grid" size={15} />
				</button>
			</div>
		{/snippet}
	</SectionHead>

	<Featured projects={picks} />

	<div class="views-body" data-reveal>
		{#key view}
			<div class="view" in:fade={{ duration: 280, delay: 120 }} out:fade={{ duration: 120 }}>
				{#if view === 'list'}
					<ol class="list" bind:this={listEl} onpointerleave={() => (hovered = null)}>
						<li class="row legend label" aria-hidden="true">
							<span>No.</span><span>Project</span><span>Type</span><span>Client</span><span
								>Year</span
							>
						</li>
						{#each pageRows as project, i (project.slug)}
							<li in:fade={{ duration: 200 }}>
								<a
									class="row"
									href="/work/{project.slug}"
									onpointerenter={(e) => {
										onmove(e);
										hovered = project;
									}}
									onpointermove={onmove}
								>
									<span class="num">{String(page * PAGE_SIZE + i + 1).padStart(2, '0')}</span>
									<span class="title">
										<img class="mini" src={project.cover} alt="" loading="lazy" />
										<span class="name">{project.title}</span>
										{#if project.isNew}<Tag kind="new" />{/if}
										{#if project.featured}<Tag kind="featured" />{/if}
									</span>
									<span class="type">
										<span class="kind" class:code={project.type === 'code'}>
											<Icon name={project.type === 'design' ? 'layers' : 'code'} size={12} />
											{typeLabel(project)}
										</span>
										<span class="role">{project.role}</span>
										<span class="read label"
											><Icon name="clock" size={11} /> {readingTime(project)} min read</span
										>
									</span>
									<span class="client">
										<img src={project.client.logo} alt="" />{project.client.name}
									</span>
									<span class="year">{project.year ?? '—'}</span>
									<span class="arrow"><Icon name="arrowUpRight" size={18} /></span>
								</a>
							</li>
						{/each}
					</ol>
					{#if pages > 1}
						<nav class="pager" aria-label="Project pages">
							<span class="label">
								{page * PAGE_SIZE + 1}–{Math.min((page + 1) * PAGE_SIZE, visible.length)} of {visible.length}
							</span>
							<span class="more-nav">
								<button
									type="button"
									aria-label="Previous page"
									disabled={page === 0}
									onclick={() => goPage(page - 1)}
								>
									<Icon name="arrowLeft" size={15} />
								</button>
								<button
									type="button"
									aria-label="Next page"
									disabled={page >= pages - 1}
									onclick={() => goPage(page + 1)}
								>
									<Icon name="arrowRight" size={15} />
								</button>
							</span>
						</nav>
					{/if}
				{:else}
					<p class="grid-head label">More projects <sup>{visible.length}</sup></p>
					<ul class="grid">
						{#each lead as project (project.slug)}
							<li animate:flip={{ duration: 450 }} transition:fade={{ duration: 200 }}>
								<a class="card" href="/work/{project.slug}">
									<ProjectCover {project} ratio="16 / 9" />
									<span class="card-body">
										<ProjectMeta {project} />
										<span class="card-title">{project.title}</span>
										<span class="card-sub">{project.tagline}</span>
									</span>
								</a>
							</li>
						{/each}
					</ul>

					{#if rest.length}
						<div class="more">
							<div class="more-head">
								<span class="more-nav">
									<button
										type="button"
										aria-label="Previous projects"
										disabled={atStart}
										onclick={() => slide(-1)}
									>
										<Icon name="arrowLeft" size={15} />
									</button>
									<button
										type="button"
										aria-label="Next projects"
										disabled={atEnd}
										onclick={() => slide(1)}
									>
										<Icon name="arrowRight" size={15} />
									</button>
								</span>
							</div>
							<ul class="rail" bind:this={rail} onscroll={syncRail}>
								{#each rest as project (project.slug)}
									<li>
										<a class="card small" href="/work/{project.slug}">
											<ProjectCover {project} ratio="16 / 9" />
											<span class="card-body">
												<ProjectMeta {project} />
												<span class="card-title">{project.title}</span>
											</span>
										</a>
									</li>
								{/each}
							</ul>
						</div>
					{/if}
				{/if}
			</div>
		{/key}
	</div>
</section>

{#if view === 'list'}
	<div
		class="preview"
		class:show={hovered}
		style:transform="translate3d({pos.x}px, {pos.y}px, 0) rotate({pos.tilt}deg)"
		aria-hidden="true"
	>
		{#each projects as p (p.slug)}
			<img src={p.cover} alt="" class:active={hovered?.slug === p.slug} loading="lazy" />
		{/each}
		{#if hovered}
			<span class="preview-badge"><ClientBadge client={hovered.client} size="sm" /></span>
			<span class="preview-tag label">{hovered.tagline}</span>
		{/if}
	</div>
{/if}

<style>
	.index {
		padding-top: 40px;
		padding-bottom: 64px;
	}

	/* ── Controls ── */
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

	.views {
		position: relative;
		display: flex;
		margin-left: 6px;
		padding: 3px;
		border-radius: 999px;
		border: 1px solid var(--hairline);
	}
	.views-thumb {
		position: absolute;
		top: 3px;
		left: 3px;
		width: 30px;
		height: 30px;
		border-radius: 999px;
		background: var(--text);
		transition: transform 0.45s var(--ease-out);
	}
	.views-thumb.right {
		transform: translateX(30px);
	}
	.views button {
		position: relative;
		display: grid;
		place-items: center;
		width: 30px;
		height: 30px;
		border: 0;
		border-radius: 999px;
		background: none;
		color: var(--text-secondary);
		cursor: pointer;
		transition: color 0.3s ease;
	}
	.views button[aria-pressed='true'] {
		color: var(--bg);
	}

	.views-body {
		grid-column: 1 / -1;
		display: grid;
	}
	.view {
		grid-area: 1 / 1;
		min-width: 0;
	}

	/* ── List ── */
	.list {
		margin: -28px 0 0;
		padding: 0;
		list-style: none;
	}
	.row {
		position: relative;
		display: grid;
		grid-template-columns: repeat(12, minmax(0, 1fr));
		column-gap: var(--gap);
		align-items: center;
		padding: 12px 0;
		border-bottom: 1px solid var(--hairline);
		color: var(--text);
		text-decoration: none;
	}
	.legend {
		padding: 12px 0;
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
	.type {
		grid-column: 7 / span 2;
	}
	.legend span:nth-child(4),
	.client {
		grid-column: 9 / span 2;
	}
	.legend span:nth-child(5),
	.year {
		grid-column: 11;
	}
	.arrow {
		grid-column: 12;
		justify-self: end;
	}

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
		transition: transform 0.5s var(--ease-out);
	}
	.name {
		font-size: clamp(17px, 1.5vw, 21px);
		font-weight: 450;
		letter-spacing: -0.035em;
		line-height: 1.1;
	}
	a.row:hover .title {
		transform: translateX(14px);
	}
	.mini {
		display: none;
	}
	.type {
		display: flex;
		flex-direction: column;
		gap: 2px;
	}
	.kind {
		display: inline-flex;
		align-items: center;
		gap: 5px;
		width: fit-content;
		font-family: var(--font-mono);
		font-size: 10px;
		letter-spacing: 0.03em;
		text-transform: uppercase;
		color: var(--text);
	}
	.kind.code :global(svg) {
		color: var(--amber);
	}
	.read {
		display: inline-flex;
		align-items: center;
		gap: 4px;
	}
	.role,
	.client {
		font-size: 14px;
		color: var(--text-secondary);
	}
	.client {
		display: flex;
		align-items: center;
		gap: 8px;
	}
	.client img {
		width: 20px;
		height: 20px;
		border-radius: 6px;
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

	/* ── Grid ── */
	.grid {
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		gap: 20px var(--gap);
		margin: 0;
		padding: 0;
		list-style: none;
	}
	.card {
		display: flex;
		flex-direction: column;
		color: var(--text);
		text-decoration: none;
	}
	.card-body {
		display: flex;
		flex-direction: column;
		gap: 4px;
		padding-top: 10px;
	}
	.card-title {
		font-size: 15px;
		font-weight: 450;
		letter-spacing: -0.03em;
		transition: transform 0.5s var(--ease-out);
	}
	.card:hover .card-title {
		transform: translateX(6px);
	}
	.card-sub {
		font-size: 13px;
		color: var(--text-secondary);
	}

	.pager {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-top: 20px;
	}

	/* ── More projects: one row of small cards that slides sideways ── */
	/* Label for the whole collection: the grid, then the slider that continues it. */
	.grid-head {
		margin: 0 0 12px;
	}
	.more {
		margin-top: 16px;
	}
	.more-head {
		display: flex;
		justify-content: flex-end;
		margin-bottom: 10px;
	}
	.more-nav {
		display: flex;
		gap: 6px;
	}
	.more-nav button {
		display: grid;
		place-items: center;
		width: 34px;
		height: 34px;
		border: 1px solid var(--hairline);
		border-radius: 999px;
		background: none;
		color: var(--text);
		cursor: pointer;
		transition:
			background-color 0.25s ease,
			color 0.25s ease,
			opacity 0.25s ease;
	}
	.more-nav button:hover:not(:disabled) {
		background: var(--text);
		color: var(--bg);
	}
	.more-nav button:disabled {
		opacity: 0.3;
		cursor: default;
	}
	.rail {
		display: grid;
		grid-auto-flow: column;
		grid-auto-columns: calc((100% - 5 * var(--gap)) / 6);
		gap: var(--gap);
		margin: 0;
		padding: 0;
		list-style: none;
		overflow-x: auto;
		overscroll-behavior-x: contain;
		scroll-snap-type: x mandatory;
		/* No scrollbar: the arrow buttons, swipe and trackpad scroll still work. */
		scrollbar-width: none;
	}
	.rail::-webkit-scrollbar {
		display: none;
	}
	.rail li {
		scroll-snap-align: start;
		min-width: 0;
	}
	.small .card-body {
		padding-top: 8px;
	}
	.small .card-title {
		font-size: 14px;
	}
	.small :global(.client) {
		scale: 0.85;
		transform-origin: top right;
	}

	/* ── Preview ── */
	.preview {
		position: fixed;
		left: 0;
		top: 0;
		z-index: 90;
		width: 320px;
		aspect-ratio: 16 / 11;
		margin: -120px 0 0 28px;
		border-radius: 14px;
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
	.preview-badge {
		position: absolute;
		top: 10px;
		right: 10px;
	}
	.preview-tag {
		position: absolute;
		left: 10px;
		right: 10px;
		bottom: 10px;
		padding: 6px 10px;
		border-radius: 8px;
		background: color-mix(in srgb, var(--bg) 82%, transparent);
		backdrop-filter: blur(8px);
		color: var(--text);
		font-size: 10px;
		text-transform: none;
	}

	@media (max-width: 1023px) {
		.grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
		.rail {
			grid-auto-columns: calc((100% - 2 * var(--gap)) / 2.5);
		}
	}
	@media (max-width: 1023px), (hover: none) {
		.preview,
		.legend {
			display: none;
		}
		.list {
			margin-top: -12px;
		}
		/* Still on the page columns: number in the first, arrow in the last,
		   project in between (works for 12, 6 or 4 columns) */
		.row {
			grid-template-columns: repeat(var(--cols), minmax(0, 1fr));
			row-gap: 4px;
		}
		.num {
			grid-column: 1;
			grid-row: 1 / span 2;
			align-self: start;
			padding-top: 6px;
		}
		.title {
			grid-column: 2 / -2;
			flex-wrap: wrap;
		}
		.type {
			grid-column: 2 / -2;
			grid-row: 2;
			flex-direction: row;
			align-items: center;
			gap: 10px;
		}
		.role {
			font-size: 13px;
		}
		.client,
		.year {
			display: none;
		}
		.arrow {
			grid-column: -2 / -1;
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
	@media (max-width: 600px) {
		.grid {
			grid-template-columns: 1fr;
		}
		.rail {
			grid-auto-columns: 70%;
		}
		.views {
			margin-left: 0;
		}
	}
</style>
