<script lang="ts">
	import { projects } from '#lib/data/projects.ts';
	import { now, principles, site, toolbox } from '#lib/data/site.ts';
	import Icon from '#lib/components/ui/Icon.svelte';
	import SectionHead from '#lib/components/ui/SectionHead.svelte';
	import { reveal } from '#lib/utils/reveal.ts';
	import Clock from './Clock.svelte';

	// Cards light up under the cursor: track the pointer as --x/--y on the card.
	function spotlight(e: PointerEvent) {
		const card = e.currentTarget as HTMLElement;
		const r = card.getBoundingClientRect();
		card.style.setProperty('--x', `${e.clientX - r.left}px`);
		card.style.setProperty('--y', `${e.clientY - r.top}px`);
	}

	let openPrinciple = $state(0);

	// A real case study worth opening (featured first), never one of the placeholder samples.
	const latest =
		projects.find((p) => p.featured && p.type === 'design') ??
		projects.find((p) => p.isNew && p.type === 'design') ??
		projects[0];
</script>

<section class="desk frame" id="desk" use:reveal>
	<SectionHead eyebrow="What I’m working on" title="On the desk" />

	<article class="card now" data-reveal onpointermove={spotlight}>
		<span class="label"><Icon name="sparkle" size={12} /> Now at {now.where}</span>
		<h3>{now.title}</h3>
		<p>{now.body}</p>
		<ul class="tags">
			{#each now.tags as t (t)}<li>{t}</li>{/each}
		</ul>
	</article>

	<article class="card time" data-reveal onpointermove={spotlight}>
		<span class="label"><Icon name="pin" size={12} /> {site.location}, {site.country}</span>
		<Clock timeZone={site.timeZone} />
		<p class="remote">GMT+7 · open to remote work</p>
	</article>

	<article class="card principles" data-reveal onpointermove={spotlight}>
		<span class="label">Principles</span>
		<ol>
			{#each principles as p, i (p.title)}
				<li class:open={openPrinciple === i}>
					<button
						type="button"
						aria-expanded={openPrinciple === i}
						onclick={() => (openPrinciple = i)}
						onpointerenter={() => (openPrinciple = i)}
					>
						<span class="idx label">{String(i + 1).padStart(2, '0')}</span>
						{p.title}
					</button>
					<p>{p.body}</p>
				</li>
			{/each}
		</ol>
	</article>

	<article class="card tools" data-reveal onpointermove={spotlight}>
		<span class="label">Toolbox</span>
		<div class="ticker" aria-label={toolbox.join(', ')}>
			{#each [0, 1] as row (row)}
				<div class="ticker-row" class:reverse={row === 1} aria-hidden="true">
					{#each [0, 1] as copy (copy)}
						<div class="ticker-set">
							{#each row === 0 ? toolbox : [...toolbox].reverse() as tool (tool)}
								<span class="chip">{tool}</span>
							{/each}
						</div>
					{/each}
				</div>
			{/each}
		</div>
	</article>

	<a class="card latest" href="/work/{latest.slug}" data-reveal onpointermove={spotlight}>
		<span class="label">Latest work</span>
		<span class="latest-cover"><img src={latest.cover} alt="" loading="lazy" /></span>
		<span class="latest-title">{latest.title}</span>
		<span class="latest-sub">{latest.tagline}</span>
	</a>
</section>

<style>
	.desk {
		padding-top: 72px;
		padding-bottom: 96px;
		row-gap: var(--gap);
		grid-auto-flow: row dense;
	}
	/* ── Card shell with a cursor spotlight on the border and surface ── */
	.card {
		--x: 50%;
		--y: 50%;
		position: relative;
		display: flex;
		flex-direction: column;
		gap: 14px;
		min-height: 220px;
		padding: 22px;
		border-radius: 18px;
		background: var(--card);
		border: 1px solid var(--hairline);
		overflow: hidden;
		isolation: isolate;
		transition:
			border-color 0.3s ease,
			transform 0.5s var(--ease-out);
	}
	.card::before {
		content: '';
		position: absolute;
		inset: 0;
		z-index: -1;
		background: radial-gradient(
			320px circle at var(--x) var(--y),
			color-mix(in srgb, var(--amber) 14%, transparent),
			transparent 70%
		);
		opacity: 0;
		transition: opacity 0.4s ease;
	}
	.card:hover {
		border-color: var(--rule);
	}
	.card:hover::before {
		opacity: 1;
	}
	.card > .label {
		display: flex;
		align-items: center;
		gap: 6px;
	}
	h3 {
		margin: auto 0 0;
		font-size: clamp(24px, 2.4vw, 34px);
		font-weight: 450;
		letter-spacing: -0.035em;
		line-height: 1.05;
	}
	.card p {
		margin: 0;
		color: var(--text-secondary);
		font-size: calc(14px * var(--text-scale));
		line-height: 1.5;
	}

	/* Grid placement (12 cols) */
	.now {
		grid-column: 1 / span 5;
	}
	.time {
		grid-column: 6 / span 3;
	}
	.principles {
		grid-column: 9 / span 4;
		grid-row: span 2;
	}
	.tools {
		grid-column: 1 / span 5;
	}
	.latest {
		grid-column: 6 / span 3;
	}

	/* Now: the products as chips */
	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
		margin: 4px 0 0;
		padding: 0;
		list-style: none;
	}
	.tags li {
		padding: 5px 12px;
		border: 1px solid var(--hairline);
		border-radius: 999px;
		background: var(--bg);
		font-size: 12px;
	}

	/* Clock */
	.time {
		align-items: stretch;
	}
	.time :global(.clock) {
		margin: auto;
	}
	.time .remote {
		text-align: center;
		font-size: 12px;
	}

	/* Principles accordion */
	ol {
		display: flex;
		flex-direction: column;
		margin: auto 0 0;
		padding: 0;
		list-style: none;
	}
	li {
		border-top: 1px solid var(--hairline);
	}
	li button {
		display: flex;
		align-items: baseline;
		gap: 12px;
		width: 100%;
		padding: 14px 0;
		border: 0;
		background: none;
		color: var(--text-secondary);
		font: inherit;
		font-size: clamp(18px, 1.6vw, 22px);
		letter-spacing: -0.025em;
		text-align: left;
		cursor: pointer;
		transition: color 0.3s ease;
	}
	li.open button {
		color: var(--text);
	}
	li p {
		display: grid;
		max-height: 0;
		overflow: hidden;
		opacity: 0;
		padding-left: 34px;
		transition:
			max-height 0.5s var(--ease-out),
			opacity 0.4s ease,
			padding 0.5s var(--ease-out);
	}
	li.open p {
		max-height: 80px;
		opacity: 1;
		padding-bottom: 16px;
	}

	/* Toolbox ticker */
	.ticker {
		display: grid;
		gap: 8px;
		margin: auto calc(-1 * 22px) 0;
		mask-image: linear-gradient(to right, transparent, #000 12%, #000 88%, transparent);
	}
	.ticker-row {
		display: flex;
		width: max-content;
		animation: ticker 28s linear infinite;
	}
	.ticker-row.reverse {
		animation-direction: reverse;
		animation-duration: 34s;
	}
	.tools:hover .ticker-row {
		animation-play-state: paused;
	}
	.ticker-set {
		display: flex;
		gap: 8px;
		padding-right: 8px;
	}
	.chip {
		padding: 7px 14px;
		border: 1px solid var(--hairline);
		border-radius: 999px;
		background: var(--bg);
		font-size: 13px;
		white-space: nowrap;
	}
	@keyframes ticker {
		to {
			transform: translateX(-50%);
		}
	}

	/* Latest work: the newest case study */
	.latest {
		gap: 8px;
		color: var(--text);
		text-decoration: none;
	}
	.latest-cover {
		display: block;
		overflow: hidden;
		aspect-ratio: 16 / 9;
		margin-top: 4px;
		border-radius: 10px;
		background: var(--surface);
	}
	.latest-cover img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.8s var(--ease-out);
	}
	.latest:hover .latest-cover img {
		transform: scale(1.05);
	}
	.latest-title {
		font-size: 15px;
		font-weight: 500;
		letter-spacing: -0.02em;
	}
	.latest-sub {
		overflow: hidden;
		font-size: 13px;
		color: var(--text-secondary);
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	@media (max-width: 1023px) {
		.now,
		.principles {
			grid-column: span 4;
			grid-row: auto;
		}
		.time,
		.latest {
			grid-column: span 2;
		}
		.tools {
			grid-column: 1 / -1;
		}
	}
	@media (max-width: 600px) {
		.now,
		.principles,
		.tools {
			grid-column: 1 / -1;
		}
		.card {
			min-height: 180px;
		}
	}
</style>
