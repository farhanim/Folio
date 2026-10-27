<script lang="ts">
	import { flip } from 'svelte/animate';
	import { fade } from 'svelte/transition';
	import Icon from '#lib/components/ui/Icon.svelte';
	import SectionHead from '#lib/components/ui/SectionHead.svelte';
	import ClientBadge from '#lib/components/project/ClientBadge.svelte';
	import ProjectCover from '#lib/components/project/ProjectCover.svelte';
	import Tag from '#lib/components/project/Tag.svelte';
	import type { Project } from '#lib/types/index.ts';
	import { reveal } from '#lib/utils/reveal.ts';

	/**
	 * Every project — design and code — in one index, shown as a numbered list
	 * (with a cursor-trailing preview on desktop) or as a card grid.
	 */
	let { projects, id = 'projects' }: { projects: Project[]; id?: string } = $props();

	// ── Filters ──
	type Filter = 'All' | 'Design' | 'Code' | 'New';
	const filters: Filter[] = ['All', 'Design', 'Code', 'New'];
	let filter = $state<Filter>('All');
	const matches = (p: Project, f: Filter) =>
		f === 'All' ||
		(f === 'New' ? !!p.isNew : f === 'Design' ? p.type === 'design' : p.type === 'code');
	const visible = $derived(projects.filter((p) => matches(p, filter)));

	// ── View (remembered per visitor) ──
	type View = 'list' | 'grid';
	const VIEW_KEY = 'folio:project-view';
	let view = $state<View>('list');
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
					<button type="button" aria-pressed={filter === f} onclick={() => (filter = f)}>
						{f}<sup>{projects.filter((p) => matches(p, f)).length}</sup>
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

	<div class="views-body" data-reveal>
		{#key view}
			<div class="view" in:fade={{ duration: 280, delay: 120 }} out:fade={{ duration: 120 }}>
				{#if view === 'list'}
					<ol class="list" onpointerleave={() => (hovered = null)}>
						<li class="row legend label" aria-hidden="true">
							<span>No.</span><span>Project</span><span>Type</span><span>Client</span><span
								>Year</span
							>
						</li>
						{#each visible as project, i (project.slug)}
							<li animate:flip={{ duration: 450 }} transition:fade={{ duration: 200 }}>
								<a
									class="row"
									href="/work/{project.slug}"
									onpointerenter={(e) => {
										onmove(e);
										hovered = project;
									}}
									onpointermove={onmove}
								>
									<span class="num">{String(i + 1).padStart(2, '0')}</span>
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
									</span>
									<span class="client">
										<img src={project.client.logo} alt="" />{project.client.name}
									</span>
									<span class="year">{project.year}</span>
									<span class="arrow"><Icon name="arrowUpRight" size={18} /></span>
								</a>
							</li>
						{/each}
					</ol>
				{:else}
					<ul class="grid">
						{#each visible as project (project.slug)}
							<li animate:flip={{ duration: 450 }} transition:fade={{ duration: 200 }}>
								<a class="card" href="/work/{project.slug}">
									<ProjectCover {project} ratio="16 / 10" />
									<span class="card-body">
										<span class="card-meta label">
											<Icon name={project.type === 'design' ? 'layers' : 'code'} size={11} />
											{typeLabel(project)} · {project.year}
										</span>
										<span class="card-title">{project.title}</span>
										<span class="card-sub">{project.tagline}</span>
									</span>
								</a>
							</li>
						{/each}
					</ul>
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
		padding-top: 56px;
		padding-bottom: 96px;
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
		padding: 22px 0;
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
		font-size: clamp(22px, 2.6vw, 36px);
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
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 36px var(--gap);
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
		padding-top: 14px;
	}
	.card-meta {
		display: inline-flex;
		align-items: center;
		gap: 5px;
	}
	.card-title {
		font-size: 22px;
		font-weight: 450;
		letter-spacing: -0.03em;
		transition: transform 0.5s var(--ease-out);
	}
	.card:hover .card-title {
		transform: translateX(6px);
	}
	.card-sub {
		font-size: 14px;
		color: var(--text-secondary);
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
	}
	@media (max-width: 1023px), (hover: none) {
		.preview,
		.legend {
			display: none;
		}
		.list {
			margin-top: -12px;
		}
		.row {
			grid-template-columns: 32px 1fr auto;
			row-gap: 4px;
		}
		.num {
			grid-column: 1;
			grid-row: 1 / span 2;
			align-self: start;
			padding-top: 6px;
		}
		.title {
			grid-column: 2;
			flex-wrap: wrap;
		}
		.type {
			grid-column: 2;
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
	@media (max-width: 600px) {
		.grid {
			grid-template-columns: 1fr;
		}
		.views {
			margin-left: 0;
		}
	}
</style>
