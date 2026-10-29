<script lang="ts">
	import Icon from '#lib/components/ui/Icon.svelte';
	import ClientBadge from '#lib/components/project/ClientBadge.svelte';
	import ProjectCover from '#lib/components/project/ProjectCover.svelte';
	import ProjectMeta from '#lib/components/project/ProjectMeta.svelte';
	import type { Project } from '#lib/types/index.ts';

	/**
	 * "Worth a read": recommended case studies inside the project index, under its
	 * heading. Laid on the page's 12-column grid (a subgrid of the section): the lead
	 * cover spans 4 columns, its story 4 more, and the other two picks the last 4 —
	 * so it lines up with the 3-column grid cards and 2-column slider cards below.
	 */
	let { projects }: { projects: Project[] } = $props();

	// Three picks at most: a lead and two beside it.
	const picks = $derived(projects.slice(0, 3));
	const lead = $derived(picks[0]);
	const others = $derived(picks.slice(1));
	const pad = (n: number) => String(n).padStart(2, '0');
</script>

{#if lead}
	<aside class="picks" aria-labelledby="picks-title" data-reveal>
		<p class="head">
			<span class="label" id="picks-title"><Icon name="star" size={11} /> Worth a read</span>
			<span class="label">{pad(picks.length)} recommended</span>
		</p>

		<a class="lead" class:solo={!others.length} href="/work/{lead.slug}">
			<ProjectCover project={lead} ratio="16 / 10" showFeatured={false} />
			<span class="story">
				<ProjectMeta project={lead} />
				<span class="title">{lead.title}</span>
				<span class="tagline">{lead.tagline}</span>
				<span class="summary">{lead.summary}</span>
				<span class="facts">
					<span><span class="label">Role</span><span class="v">{lead.role}</span></span>
					<span>
						<span class="label">Timeline</span><span class="v"
							>{lead.duration ?? lead.year ?? '-'}</span
						>
					</span>
					{#if lead.facts?.[0]}
						<span
							><span class="label">{lead.facts[0].label}</span><span
								class="v"
								title={lead.facts[0].value}>{lead.facts[0].value}</span
							></span
						>
					{/if}
				</span>
				<span class="cta">
					Read case study <Icon name="arrowRight" size={14} />
				</span>
			</span>
		</a>

		{#if others.length}
			<ol class="more">
				{#each others as project (project.slug)}
					<li>
						<a href="/work/{project.slug}">
							<span class="thumb">
								<img src={project.cover} alt="" loading="lazy" />
								<span class="badge"><ClientBadge client={project.client} size="sm" /></span>
							</span>
							<span class="text">
								<ProjectMeta {project} />
								<span class="name">{project.title}</span>
								<span class="sub">{project.tagline}</span>
							</span>
							<span class="arrow"><Icon name="arrowUpRight" size={16} /></span>
						</a>
					</li>
				{/each}
			</ol>
		{/if}
	</aside>
{/if}

<style>
	.picks {
		grid-column: 1 / -1;
		display: grid;
		grid-template-columns: subgrid;
		row-gap: 16px;
		align-items: start;
		margin-bottom: 96px;
		padding-top: 4px;
	}
	.head {
		grid-column: 1 / -1;
		display: flex;
		justify-content: space-between;
	}
	.head .label:first-child {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		color: var(--text);
	}
	.head :global(svg) {
		color: var(--amber);
		fill: var(--amber);
	}

	/* ── Lead: the standard cover beside its story ── */
	.lead {
		grid-column: span 8;
		display: grid;
		grid-template-columns: subgrid;
		color: var(--text);
		text-decoration: none;
	}
	.lead.solo {
		grid-column: 1 / -1;
	}
	.lead > :global(.cover) {
		grid-column: span 4;
	}
	.story {
		grid-column: span 4;
		align-self: stretch;
		display: flex;
		flex-direction: column;
		gap: 6px;
		min-width: 0;
	}
	.title {
		font-size: clamp(22px, 2vw, 30px);
		font-weight: 450;
		letter-spacing: -0.035em;
		line-height: 1.08;
		transition: transform 0.5s var(--ease-out);
	}
	.lead:hover .title {
		transform: translateX(6px);
	}
	.tagline {
		overflow: hidden;
		font-size: 15px;
		line-height: 1.5;
		color: var(--text-secondary);
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	.summary {
		display: -webkit-box;
		overflow: hidden;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		font-size: 14px;
		line-height: 1.55;
		color: var(--text-secondary);
	}
	.facts {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 12px;
		margin-top: 4px;
		padding: 10px 0;
		border-top: 1px solid var(--hairline);
		border-bottom: 1px solid var(--hairline);
		font-size: 13px;
		line-height: 1.4;
	}
	/* One line per value, so the facts row never grows past the cover. */
	.facts .v {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	.facts > span {
		display: flex;
		flex-direction: column;
		gap: 4px;
		min-width: 0;
	}
	.cta {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		width: fit-content;
		margin-top: auto;
		padding-bottom: 2px;
		border-bottom: 1px solid var(--rule);
		font-size: 13px;
		transition:
			gap 0.4s var(--ease-out),
			border-color 0.3s ease;
	}
	.lead:hover .cta {
		gap: 12px;
		border-color: var(--text);
	}

	/* ── The other two: stacked rows that share the lead's height ── */
	/* Starts exactly on the column-9 grid line. */
	.more {
		grid-column: span 4;
		align-self: stretch;
		display: flex;
		flex-direction: column;
		gap: var(--gap);
		margin: 0;
		padding: 0;
		list-style: none;
	}
	.more li {
		flex: 1;
		display: flex;
	}
	.more a {
		flex: 1;
		display: flex;
		align-items: center;
		gap: 16px;
		color: var(--text);
		text-decoration: none;
	}
	.thumb {
		position: relative;
		flex: 0 0 42%;
		display: flex;
	}
	.thumb img {
		width: 100%;
	}
	.badge {
		position: absolute;
		top: 6px;
		right: 6px;
	}
	.more img {
		flex: none;
		width: 100%;
		aspect-ratio: 16 / 10;
		border-radius: 8px;
		object-fit: cover;
		background: var(--surface);
	}
	.text {
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 3px;
		min-width: 0;
	}
	.name {
		font-size: 18px;
		letter-spacing: -0.02em;
		transition: transform 0.4s var(--ease-out);
	}
	.more a:hover .name {
		transform: translateX(4px);
	}
	.sub {
		overflow: hidden;
		font-size: 13px;
		color: var(--text-secondary);
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	.arrow {
		display: flex;
		margin-left: auto;
		color: var(--text-secondary);
		transition:
			transform 0.4s var(--ease-out),
			color 0.25s ease;
	}
	.more a:hover .arrow {
		color: var(--text);
		transform: rotate(45deg);
	}

	/* Tablet (6 columns): cover and story share the row; the picks pair up below. */
	@media (max-width: 1023px) {
		.lead,
		.more {
			grid-column: 1 / -1;
		}
		.lead > :global(.cover),
		.story {
			grid-column: span 3;
		}
		.more {
			display: grid;
			grid-template-columns: subgrid;
			margin-top: 8px;
		}
		.more li {
			grid-column: span 3;
		}
	}
	/* Mobile (4 columns): everything stacks across the full width. */
	@media (max-width: 600px) {
		.lead > :global(.cover),
		.story,
		.more li {
			grid-column: 1 / -1;
		}
		/* Same scale as the project list below, and a short gap before it */
		.picks {
			row-gap: 12px;
			margin-bottom: 32px;
		}
		.story {
			margin-top: 10px;
			gap: 4px;
		}
		.title {
			font-size: 20px;
		}
		.tagline {
			overflow: hidden;
			font-size: 13px;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
		.summary,
		.facts {
			display: none;
		}
		.cta {
			margin-top: 6px;
		}
		.name {
			font-size: 15px;
		}
		.sub {
			font-size: 12px;
		}
	}
</style>
