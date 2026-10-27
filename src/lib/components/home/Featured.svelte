<script lang="ts">
	import Icon from '#lib/components/ui/Icon.svelte';
	import SectionHead from '#lib/components/ui/SectionHead.svelte';
	import ClientBadge from '#lib/components/project/ClientBadge.svelte';
	import ProjectCover from '#lib/components/project/ProjectCover.svelte';
	import { readingTime } from '#lib/data/projects.ts';
	import type { Project } from '#lib/types/index.ts';
	import { reveal } from '#lib/utils/reveal.ts';

	/**
	 * "Worth a read": an editorial reading list. The first pick is the lead story
	 * (wide cover, summary and facts side by side); the rest follow as numbered
	 * entries, three to a row, so the section holds any number of picks.
	 */
	let { projects }: { projects: Project[] } = $props();

	const lead = $derived(projects[0]);
	const others = $derived(projects.slice(1));
	const num = (i: number) => String(i + 1).padStart(2, '0');
</script>

{#if lead}
	<section class="featured frame" use:reveal>
		<SectionHead eyebrow="Recommended reading" title="Worth a read" count={projects.length} />

		<a class="lead" href="/work/{lead.slug}" data-reveal>
			<span class="lead-cover">
				<ProjectCover project={lead} ratio="16 / 10" showFeatured={false} />
			</span>
			<span class="lead-text">
				<span class="kicker label">
					<span class="no">{num(0)}</span> Lead story
				</span>
				<span class="lead-title">{lead.title}</span>
				<span class="lead-tagline">{lead.tagline}</span>
				<span class="lead-summary">{lead.summary}</span>
				<dl class="facts">
					<div>
						<dt class="label">Client</dt>
						<dd><ClientBadge client={lead.client} size="sm" /> {lead.client.name}</dd>
					</div>
					<div>
						<dt class="label">Role</dt>
						<dd>{lead.role}</dd>
					</div>
					<div>
						<dt class="label">Year</dt>
						<dd>{lead.year ?? '—'}</dd>
					</div>
					<div>
						<dt class="label">Read</dt>
						<dd><Icon name="clock" size={12} /> {readingTime(lead)} min</dd>
					</div>
				</dl>
				<span class="cta">Read case study <Icon name="arrowRight" size={14} /></span>
			</span>
		</a>

		{#if others.length}
			<ol class="others" class:pair={others.length === 2}>
				{#each others as project, i (project.slug)}
					<li data-reveal>
						<a class="entry" href="/work/{project.slug}">
							<span class="entry-head">
								<span class="no label">{num(i + 1)}</span>
								<span class="label">
									{project.client.name} · {project.year ?? '—'} · {readingTime(project)} min
								</span>
							</span>
							<span class="entry-cover">
								<ProjectCover {project} ratio="16 / 10" showFeatured={false} />
							</span>
							<span class="entry-title">{project.title}</span>
							<span class="entry-tagline">{project.tagline}</span>
							<span class="entry-arrow"><Icon name="arrowUpRight" size={18} /></span>
						</a>
					</li>
				{/each}
			</ol>
		{/if}
	</section>
{/if}

<style>
	.featured {
		padding-top: 24px;
		padding-bottom: 96px;
		row-gap: 0;
	}

	/* ── Lead story: cover on cols 1–7, text on cols 8–12 ── */
	.lead {
		grid-column: 1 / -1;
		display: grid;
		grid-template-columns: subgrid;
		align-items: start;
		padding: 8px 0 48px;
		color: var(--text);
		text-decoration: none;
	}
	.lead-cover {
		grid-column: 1 / span 7;
	}
	.lead-text {
		grid-column: 8 / -1;
		display: flex;
		flex-direction: column;
		gap: 12px;
		height: 100%;
	}
	.kicker {
		display: inline-flex;
		align-items: center;
		gap: 8px;
	}
	.no {
		font-family: var(--font-mono);
		color: var(--amber);
	}
	.lead-title {
		font-size: clamp(32px, 3.6vw, 52px);
		font-weight: 450;
		letter-spacing: -0.045em;
		line-height: 1;
		transition: transform 0.5s var(--ease-out);
	}
	.lead:hover .lead-title {
		transform: translateX(8px);
	}
	.lead-tagline {
		font-size: calc(17px * var(--text-scale));
		color: var(--text);
	}
	.lead-summary {
		font-size: calc(14px * var(--text-scale));
		line-height: 1.6;
		color: var(--text-secondary);
	}
	.facts {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 14px var(--gap);
		margin: 8px 0 0;
		padding: 16px 0;
		border-top: 1px solid var(--hairline);
		border-bottom: 1px solid var(--hairline);
	}
	.facts dd {
		display: flex;
		align-items: center;
		gap: 6px;
		margin: 4px 0 0;
		font-size: 14px;
	}
	.cta {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		margin-top: auto;
		padding-bottom: 2px;
		width: fit-content;
		border-bottom: 1px solid var(--rule);
		font-size: 13px;
		transition: gap 0.4s var(--ease-out);
	}
	.lead:hover .cta {
		gap: 12px;
		border-color: var(--text);
	}

	/* ── The rest: numbered entries, three per row ── */
	.others {
		grid-column: 1 / -1;
		display: grid;
		grid-template-columns: subgrid;
		row-gap: 40px;
		margin: 0;
		padding: 0;
		list-style: none;
	}
	.others li {
		grid-column: span 4;
		min-width: 0;
	}
	/* Two picks after the lead share the row instead of leaving a gap. */
	.others.pair li {
		grid-column: span 6;
	}
	.entry {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: 10px;
		padding-top: 14px;
		border-top: 1px solid var(--text);
		color: var(--text);
		text-decoration: none;
	}
	.entry-head {
		display: flex;
		gap: 12px;
		align-items: baseline;
		padding-right: 28px;
	}
	.entry-cover {
		margin-top: 4px;
	}
	.entry-title {
		font-size: 22px;
		font-weight: 450;
		letter-spacing: -0.03em;
		transition: transform 0.5s var(--ease-out);
	}
	.entry:hover .entry-title {
		transform: translateX(6px);
	}
	.entry-tagline {
		font-size: 14px;
		color: var(--text-secondary);
	}
	.entry-arrow {
		position: absolute;
		top: 12px;
		right: 0;
		display: flex;
		color: var(--text-secondary);
		transition:
			transform 0.5s var(--ease-out),
			color 0.3s ease;
	}
	.entry:hover .entry-arrow {
		color: var(--text);
		transform: rotate(45deg);
	}

	@media (max-width: 1023px) {
		.lead-cover,
		.lead-text {
			grid-column: 1 / -1;
		}
		.lead-text {
			margin-top: 20px;
		}
		.others li {
			grid-column: span 3;
		}
	}
	@media (max-width: 600px) {
		.others li {
			grid-column: 1 / -1;
		}
	}
</style>
