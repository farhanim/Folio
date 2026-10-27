<script lang="ts">
	import Icon from '#lib/components/ui/Icon.svelte';
	import SectionHead from '#lib/components/ui/SectionHead.svelte';
	import ProjectCover from '#lib/components/project/ProjectCover.svelte';
	import type { Project } from '#lib/types/index.ts';
	import { reveal } from '#lib/utils/reveal.ts';

	/** Code projects as repository-style cards: language, stars, license. */
	let { projects, id = 'code' }: { projects: Project[]; id?: string } = $props();

	const languageColor: Record<string, string> = {
		TypeScript: '#3178c6',
		Svelte: '#ff3e00',
		JavaScript: '#f1e05a'
	};
</script>

<section class="code frame" {id} use:reveal>
	<SectionHead eyebrow="Built & shipped" title="Code projects" count={projects.length}>
		{#snippet aside()}
			<span class="prompt label"><span class="caret">$</span> ls ~/projects</span>
		{/snippet}
	</SectionHead>

	{#each projects as project (project.slug)}
		<a class="card" href="/work/{project.slug}" data-reveal>
			<ProjectCover {project} ratio="16 / 9" />
			<div class="body">
				<div class="path label">~/{project.slug}</div>
				<h3>{project.title}</h3>
				<p>{project.summary}</p>
				<div class="repo">
					{#if project.repo}
						<span>
							<i style:background={languageColor[project.repo.language] ?? 'var(--text-secondary)'}
							></i>
							{project.repo.language}
						</span>
						{#if project.repo.stars > 0}
							<span><Icon name="star" size={12} /> {project.repo.stars}</span>
						{/if}
						<span>{project.repo.license}</span>
					{/if}
					<span class="go"><Icon name="arrowUpRight" size={16} /></span>
				</div>
			</div>
		</a>
	{/each}
</section>

<style>
	.code {
		padding-top: 72px;
		padding-bottom: 96px;
		row-gap: var(--gap);
	}
	.prompt {
		text-transform: none;
	}
	.caret {
		color: var(--amber);
	}

	.card {
		grid-column: span 4;
		display: flex;
		flex-direction: column;
		padding: 8px;
		border-radius: 20px;
		border: 1px solid var(--hairline);
		background: var(--card);
		color: var(--text);
		text-decoration: none;
		transition:
			transform 0.5s var(--ease-out),
			border-color 0.3s ease,
			box-shadow 0.5s var(--ease-out);
	}
	.card:hover {
		transform: translateY(-4px);
		border-color: var(--rule);
		box-shadow: var(--shadow-float);
	}
	.body {
		display: flex;
		flex-direction: column;
		flex: 1;
		padding: 14px 10px 8px;
	}
	.path {
		text-transform: none;
	}
	h3 {
		margin: 6px 0;
		font-size: 22px;
		font-weight: 500;
		letter-spacing: -0.03em;
	}
	p {
		color: var(--text-secondary);
		font-size: calc(14px * var(--text-scale));
		line-height: 1.5;
	}
	.repo {
		display: flex;
		align-items: center;
		gap: 14px;
		margin-top: auto;
		padding-top: 18px;
		font-family: var(--font-mono);
		font-size: 11px;
		color: var(--text-secondary);
	}
	.repo span {
		display: inline-flex;
		align-items: center;
		gap: 5px;
	}
	.repo i {
		width: 9px;
		height: 9px;
		border-radius: 50%;
	}
	.go {
		margin-left: auto;
		color: var(--text);
		transition: transform 0.5s var(--ease-out);
	}
	.card:hover .go {
		transform: rotate(45deg);
	}

	@media (max-width: 1023px) {
		.card {
			grid-column: span 3;
		}
	}
	@media (max-width: 600px) {
		.card {
			grid-column: 1 / -1;
		}
	}
</style>
