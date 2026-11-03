<script lang="ts">
	import Icon from '#lib/components/ui/Icon.svelte';
	import type { Project } from '#lib/types/index.ts';
	import { coverSmall } from '#lib/utils/cover.ts';

	/** Previous / next project cards at the end of a project page. Also bound to [ and ]. */
	let { prev, next }: { prev: Project; next: Project } = $props();
</script>

<nav class="pager" aria-labelledby="pager-title">
	<!-- A divider and a heading close the case study and open the next one -->
	<header class="pager-head">
		<div>
			<span class="eyebrow label">Before you go</span>
			<h2 id="pager-title">There’s more to see</h2>
		</div>
		<p class="hint">
			Jump with <kbd>[</kbd> <kbd>]</kbd>
		</p>
	</header>
	<a class="card prev" href="/work/{prev.slug}">
		<span class="dir label"><Icon name="arrowLeft" size={13} /> Previous</span>
		<span class="body">
			<img src={coverSmall(prev.cover)} alt="" loading="lazy" />
			<span>
				<span class="kind label"
					>{prev.type === 'design' ? 'Design' : 'Code'} · {prev.year ?? '-'}</span
				>
				<span class="title" title={prev.title}>{prev.title}</span>
			</span>
		</span>
	</a>
	<a class="card next" href="/work/{next.slug}">
		<span class="dir label">Next <Icon name="arrowRight" size={13} /></span>
		<span class="body">
			<span>
				<span class="kind label"
					>{next.type === 'design' ? 'Design' : 'Code'} · {next.year ?? '-'}</span
				>
				<span class="title" title={next.title}>{next.title}</span>
			</span>
			<img src={coverSmall(next.cover)} alt="" loading="lazy" />
		</span>
	</a>
</nav>

<style>
	/* On the page grid: each card takes half the content columns */
	.pager {
		grid-column: 1 / -1;
		display: grid;
		grid-template-columns: subgrid;
		row-gap: var(--gap);
		padding: 40px 0 40px;
	}
	/* Closing heading: a small eyebrow over a title in the page's display voice */
	.pager-head {
		grid-column: 1 / -1;
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		gap: 16px;
		margin-bottom: 8px;
	}
	.eyebrow {
		display: block;
		color: var(--text-secondary);
	}
	.pager-head h2 {
		margin: 8px 0 0;
		font-size: clamp(26px, 2.8vw, 40px);
		font-weight: 450;
		letter-spacing: -0.04em;
		line-height: 1.05;
	}
	.hint {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		margin: 0 0 4px;
		font-family: var(--font-mono);
		font-size: 11px;
		color: var(--text-secondary);
	}
	.hint kbd {
		display: inline-grid;
		place-items: center;
		min-width: 20px;
		height: 20px;
		padding: 0 5px;
		border: 1px solid var(--hairline);
		border-bottom-width: 2px;
		border-radius: 6px;
		background: var(--card);
		font: inherit;
		color: var(--text);
	}
	.card {
		grid-column: span 5;
	}
	.card {
		display: flex;
		flex-direction: column;
		gap: 16px;
		padding: 22px;
		border-radius: 18px;
		border: 1px solid var(--hairline);
		background: var(--card);
		color: var(--text);
		text-decoration: none;
		overflow: hidden;
		transition:
			border-color 0.3s ease,
			transform 0.5s var(--ease-out);
	}
	.card:hover {
		border-color: var(--rule);
	}
	.next {
		align-items: flex-end;
		text-align: right;
	}
	.dir {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		transition: gap 0.4s var(--ease-out);
	}
	.card:hover .dir {
		gap: 12px;
	}
	.body {
		display: flex;
		align-items: center;
		gap: 18px;
	}
	.body img {
		width: 120px;
		aspect-ratio: 4 / 3;
		object-fit: cover;
		border-radius: 10px;
		background: var(--surface);
		transition: transform 0.6s var(--ease-out);
	}
	.prev:hover img {
		transform: translateX(6px) rotate(-3deg);
	}
	.next:hover img {
		transform: translateX(-6px) rotate(3deg);
	}
	.kind {
		display: block;
	}
	/* One line; longer titles end in an ellipsis (full name in the tooltip) */
	.body > span {
		min-width: 0;
	}
	.title {
		display: block;
		overflow: hidden;
		margin-top: 4px;
		font-size: clamp(20px, 2.2vw, 30px);
		white-space: nowrap;
		text-overflow: ellipsis;
		letter-spacing: -0.035em;
		line-height: 1.05;
	}

	@media (max-width: 1023px) {
		.card {
			grid-column: span 3;
		}
	}
	/* Phones: two compact cards side by side, text only */
	@media (max-width: 600px) {
		/* Room at the bottom so the cards clear the floating CTA and the dock */
		.pager {
			padding: 28px 0 24px;
		}
		/* No keyboard on phones, so no shortcut hint */
		.hint {
			display: none;
		}
		.pager-head h2 {
			font-size: 24px;
		}
		.card {
			grid-column: span 2;
			gap: 8px;
			padding: 12px 14px 14px;
			border-radius: 14px;
		}
		.body {
			gap: 0;
			width: 100%;
			min-width: 0;
		}
		.body > span {
			min-width: 0;
			max-width: 100%;
		}
		.next .body {
			justify-content: flex-end;
		}
		.body img {
			display: none;
		}
		.dir {
			font-size: 10px;
		}
		.kind {
			font-size: 9px;
		}
		/* One line only; longer titles end in an ellipsis */
		.title {
			max-width: 100%;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			font-size: 15px;
			line-height: 1.2;
			letter-spacing: -0.02em;
		}
	}
</style>
