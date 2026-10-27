<script lang="ts">
	import { now, principles, site, toolbox } from '#lib/data/site.ts';
	import Icon from '#lib/components/ui/Icon.svelte';
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
</script>

<section class="desk frame" id="desk" use:reveal>
	<header class="head" data-reveal>
		<span class="label">(03) On the desk</span>
		<p class="label sub">A peek at what’s going on</p>
	</header>

	<article class="card now" data-reveal onpointermove={spotlight}>
		<span class="label"><Icon name="sparkle" size={12} /> Now</span>
		<h3>{now.title}</h3>
		<p>{now.body}</p>
		<div class="progress" style:--p={now.progress}>
			<span class="bar"><span class="fill"></span></span>
			<span class="label">{Math.round(now.progress * 100)}%</span>
		</div>
	</article>

	<article class="card time" data-reveal onpointermove={spotlight}>
		<span class="label"><Icon name="pin" size={12} /> {site.location}</span>
		<Clock timeZone={site.timeZone} />
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

	<article class="card playing" data-reveal onpointermove={spotlight}>
		<span class="label">On repeat</span>
		<div class="track">
			<span class="eq" aria-hidden="true"><i></i><i></i><i></i><i></i></span>
			<div>
				<p class="song">Rain on a tin roof</p>
				<p class="artist">Lo-fi focus mix</p>
			</div>
		</div>
	</article>
</section>

<style>
	.desk {
		padding-top: 72px;
		padding-bottom: 96px;
		row-gap: var(--gap);
		grid-auto-flow: row dense;
	}
	.head {
		grid-column: 1 / -1;
		display: flex;
		justify-content: space-between;
		padding-bottom: 12px;
		border-bottom: 1px solid var(--rule);
	}
	.sub {
		margin: 0;
		text-transform: none;
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
	.playing {
		grid-column: 6 / span 3;
	}

	/* Progress */
	.progress {
		display: flex;
		align-items: center;
		gap: 12px;
	}
	.bar {
		flex: 1;
		height: 4px;
		border-radius: 4px;
		background: var(--hairline);
		overflow: hidden;
	}
	.fill {
		display: block;
		height: 100%;
		width: calc(var(--p) * 100%);
		border-radius: inherit;
		background: var(--text);
		transform-origin: left;
		transform: scaleX(0);
		transition: transform 1.6s var(--ease-out) 0.4s;
	}
	:global(.revealed) .fill {
		transform: scaleX(1);
	}

	/* Clock */
	.time {
		align-items: stretch;
	}
	.time :global(.clock) {
		margin: auto;
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

	/* Now playing */
	.track {
		display: flex;
		align-items: center;
		gap: 14px;
		margin-top: auto;
	}
	.song {
		color: var(--text) !important;
	}
	.eq {
		display: flex;
		align-items: flex-end;
		gap: 3px;
		width: 44px;
		height: 44px;
		padding: 10px;
		border-radius: 10px;
		background: var(--text);
	}
	.eq i {
		flex: 1;
		height: 100%;
		border-radius: 2px;
		background: var(--amber);
		transform-origin: bottom;
		animation: eq 1.1s ease-in-out infinite alternate;
	}
	.eq i:nth-child(2) {
		animation-delay: -0.4s;
	}
	.eq i:nth-child(3) {
		animation-delay: -0.8s;
	}
	.eq i:nth-child(4) {
		animation-delay: -0.2s;
	}
	@keyframes eq {
		from {
			transform: scaleY(0.2);
		}
		to {
			transform: scaleY(1);
		}
	}

	@media (max-width: 1023px) {
		.now,
		.principles {
			grid-column: span 4;
			grid-row: auto;
		}
		.time,
		.playing {
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
		.sub {
			display: none;
		}
	}
</style>
