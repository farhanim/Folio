<script lang="ts">
	import { goto } from '$app/navigation';
	import Icon from '#lib/components/ui/Icon.svelte';
	import TableOfContents from '#lib/components/ui/TableOfContents.svelte';
	import BlockView from '#lib/components/project/BlockView.svelte';
	import Feedback from '#lib/components/project/Feedback.svelte';
	import ProjectCover from '#lib/components/project/ProjectCover.svelte';
	import ProjectNav from '#lib/components/project/ProjectNav.svelte';
	import Slideshow from '#lib/components/project/Slideshow.svelte';
	import Tag from '#lib/components/project/Tag.svelte';
	import { readingTime } from '#lib/data/projects.ts';
	import { site } from '#lib/data/site.ts';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	const project = $derived(data.project);

	const toc = $derived([
		...project.blocks.map((b) => ({ id: b.id, label: b.title })),
		{ id: 'feedback', label: 'Feedback' }
	]);

	const meta = $derived([
		{ label: 'Client', value: project.client.name },
		{ label: 'Role', value: project.role },
		{ label: 'Year', value: String(project.year) },
		{ label: 'Duration', value: project.duration },
		{ label: 'Team', value: project.team },
		{ label: project.type === 'code' ? 'Stack' : 'Tools', value: project.tools.join(', ') }
	]);

	let slideshow = $state(false);

	// [ and ] jump to the previous / next project.
	function onkeydown(e: KeyboardEvent) {
		if (slideshow || (e.target as HTMLElement).closest('input, textarea')) return;
		if (e.key === '[') goto(`/work/${data.prev.slug}`);
		if (e.key === ']') goto(`/work/${data.next.slug}`);
	}
</script>

<svelte:window {onkeydown} />

<svelte:head>
	<title>{project.title} — {site.name}</title>
	<meta name="description" content={project.summary} />
</svelte:head>

<article class="project frame">
	<aside class="rail">
		<TableOfContents items={toc}>
			{#snippet footer()}
				<button type="button" class="play" onclick={() => (slideshow = true)}>
					Play as slideshow <Icon name="play" size={12} stroke={2} />
				</button>
				<span class="label hint"><kbd>[</kbd> <kbd>]</kbd> prev / next project</span>
			{/snippet}
		</TableOfContents>
	</aside>

	<div class="main">
		<header class="intro">
			<nav class="crumbs label" aria-label="Breadcrumb">
				<a href="/#work">Work</a>
				<span aria-hidden="true">/</span>
				<a href={project.type === 'design' ? '/#work' : '/#code'}>
					{project.type === 'design' ? 'Design' : 'Code'}
				</a>
				<span aria-hidden="true">/</span>
				<span aria-current="page">{project.title}</span>
			</nav>

			<div class="tags">
				{#if project.isNew}<Tag kind="new" />{/if}
				{#if project.featured}<Tag kind="featured" />{/if}
				<Tag label="{readingTime(project)} min read" />
			</div>

			<h1>{project.title}</h1>
			<p class="tagline">{project.tagline}</p>
			<p class="summary">{project.summary}</p>

			<div class="actions">
				<button type="button" class="primary" onclick={() => (slideshow = true)}>
					<Icon name="play" size={13} stroke={2} /> Play slideshow
				</button>
				{#each project.links ?? [] as link (link.href + link.label)}
					<a
						class="secondary"
						href={link.href}
						target={link.href.startsWith('http') ? '_blank' : undefined}
						rel="noopener"
					>
						{link.label}
						<Icon name="arrowUpRight" size={14} />
					</a>
				{/each}
			</div>
		</header>

		<dl class="meta">
			{#each meta as m (m.label)}
				<div>
					<dt class="label">{m.label}</dt>
					<dd>{m.value}</dd>
				</div>
			{/each}
			{#if project.repo}
				<div>
					<dt class="label">Repository</dt>
					<dd>{project.repo.language} · ★ {project.repo.stars} · {project.repo.license}</dd>
				</div>
			{/if}
		</dl>

		<div class="hero-cover">
			<ProjectCover {project} ratio="16 / 9" showFeatured={false} eager />
		</div>

		{#each project.blocks as block (block.id)}
			<BlockView {block} />
		{/each}

		<Feedback {project} />
		<ProjectNav prev={data.prev} next={data.next} />
	</div>
</article>

<Slideshow {project} bind:open={slideshow} />

<style>
	.project {
		padding-top: 48px;
	}
	.rail {
		grid-column: 1 / span 2;
	}
	.main {
		grid-column: 3 / -1;
		min-width: 0;
	}

	.play {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		width: fit-content;
		padding: 0;
		border: 0;
		background: none;
		color: var(--text);
		font: inherit;
		font-size: 13px;
		font-weight: 500;
		cursor: pointer;
	}
	.play :global(svg) {
		transition: transform 0.4s var(--ease-out);
	}
	.play:hover :global(svg) {
		transform: translateX(4px);
	}
	.hint {
		text-transform: none;
	}
	kbd {
		display: inline-block;
		min-width: 16px;
		padding: 0 4px;
		border: 1px solid var(--rule);
		border-bottom-width: 2px;
		border-radius: 4px;
		font: inherit;
		text-align: center;
		color: var(--text);
	}

	.intro {
		animation: enter 0.9s var(--ease-out) both;
	}
	.crumbs {
		display: flex;
		gap: 8px;
		text-transform: none;
	}
	.crumbs a {
		color: var(--text-secondary);
		text-decoration: none;
	}
	.crumbs a:hover,
	.crumbs [aria-current] {
		color: var(--text);
	}
	.tags {
		display: flex;
		gap: 6px;
		flex-wrap: wrap;
		margin-top: 28px;
	}
	h1 {
		margin: 16px 0 0;
		font-size: clamp(48px, 7vw, 112px);
		font-weight: 400;
		letter-spacing: -0.055em;
		line-height: 0.95;
	}
	.tagline {
		margin-top: 14px;
		font-size: clamp(20px, 2vw, 28px);
		letter-spacing: -0.025em;
		color: var(--text-secondary);
	}
	.summary {
		max-width: 60ch;
		margin-top: 20px;
		font-size: calc(15px * var(--text-scale));
		line-height: 1.6;
		color: var(--text-secondary);
	}
	.actions {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		margin-top: 28px;
	}
	.primary,
	.secondary {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		height: 40px;
		padding: 0 16px;
		border-radius: 999px;
		font: inherit;
		font-size: 13px;
		text-decoration: none;
		cursor: pointer;
		transition:
			transform 0.3s var(--ease-out),
			border-color 0.2s ease;
	}
	.primary {
		border: 0;
		background: var(--text);
		color: var(--bg);
	}
	.secondary {
		border: 1px solid var(--rule);
		color: var(--text);
	}
	.primary:hover,
	.secondary:hover {
		transform: translateY(-2px);
	}
	.secondary:hover {
		border-color: var(--text);
	}

	.meta {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
		gap: 0;
		margin: 48px 0 32px;
		border-top: 1px solid var(--rule);
	}
	.meta div {
		padding: 14px 16px 14px 0;
		border-bottom: 1px solid var(--hairline);
	}
	.meta dd {
		margin: 6px 0 0;
		font-size: 14px;
	}

	.hero-cover {
		margin-bottom: 24px;
		animation: enter 1s var(--ease-out) 0.15s both;
	}

	@keyframes enter {
		from {
			opacity: 0;
			transform: translateY(16px);
		}
	}

	@media (max-width: 1023px) {
		.rail {
			display: none;
		}
		.main {
			grid-column: 1 / -1;
		}
	}
</style>
