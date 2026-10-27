<script lang="ts">
	import Icon from '#lib/components/ui/Icon.svelte';
	import SectionHead from '#lib/components/ui/SectionHead.svelte';
	import ProjectCover from '#lib/components/project/ProjectCover.svelte';
	import { readingTime } from '#lib/data/projects.ts';
	import type { Project } from '#lib/types/index.ts';
	import { reveal } from '#lib/utils/reveal.ts';

	/** "Worth a read": the recommended case studies, in an asymmetric 7/5 split. */
	let { projects }: { projects: Project[] } = $props();
</script>

<section class="featured frame" use:reveal>
	<SectionHead eyebrow="Recommended" title="Worth a read" />

	{#each projects as project, i (project.slug)}
		<a class="card" class:wide={i % 2 === 0} href="/work/{project.slug}" data-reveal>
			<ProjectCover {project} ratio={i % 2 === 0 ? '16 / 10' : '4 / 3.6'} eager />
			<div class="meta label">
				<span>{project.type === 'design' ? 'Design' : 'Code'}</span>
				<span aria-hidden="true">·</span>
				<span>{project.year}</span>
				<span aria-hidden="true">·</span>
				<span><Icon name="clock" size={11} /> {readingTime(project)} min read</span>
			</div>
			<h3>{project.title}</h3>
			<p>{project.tagline}</p>
			<span class="cta">Read case study <Icon name="arrowRight" size={14} /></span>
		</a>
	{/each}
</section>

<style>
	.featured {
		padding-top: 72px;
		padding-bottom: 40px;
		row-gap: 40px;
	}
	.card {
		grid-column: span 5;
		display: flex;
		flex-direction: column;
		color: var(--text);
		text-decoration: none;
	}
	.card.wide {
		grid-column: span 7;
	}
	.meta {
		display: flex;
		align-items: center;
		gap: 8px;
		margin-top: 18px;
	}
	.meta span {
		display: inline-flex;
		align-items: center;
		gap: 4px;
	}
	h3 {
		margin: 10px 0 6px;
		font-size: clamp(26px, 2.8vw, 40px);
		font-weight: 450;
		letter-spacing: -0.04em;
		line-height: 1.05;
	}
	p {
		max-width: 46ch;
		color: var(--text-secondary);
		font-size: calc(15px * var(--text-scale));
		line-height: 1.5;
	}
	.cta {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		margin-top: 14px;
		font-size: 13px;
		color: var(--text);
		width: fit-content;
		border-bottom: 1px solid var(--rule);
		padding-bottom: 2px;
		transition: gap 0.4s var(--ease-out);
	}
	.card:hover .cta {
		gap: 12px;
		border-color: var(--text);
	}

	@media (max-width: 1023px) {
		.card,
		.card.wide {
			grid-column: 1 / -1;
		}
	}
</style>
