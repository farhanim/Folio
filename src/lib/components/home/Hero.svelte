<script lang="ts">
	import { fade } from 'svelte/transition';
	import Tag from '#lib/components/project/Tag.svelte';
	import { companies, showcaseClients } from '#lib/data/clients.ts';
	import { projects } from '#lib/data/projects.ts';
	import { focus, site } from '#lib/data/site.ts';
	import ProximityText from './ProximityText.svelte';
	import ScrambleText from './ScrambleText.svelte';

	// The headline thumbnail cycles through the projects worth opening first:
	// must-reads, then new ones. Each switch shows a small label; hovering pauses it.
	const picks = [
		...projects.filter((p) => p.featured),
		...projects.filter((p) => p.isNew && !p.featured)
	].slice(0, 6);

	// Everyone I've designed for: employers first, then studio clients. Shown twice so the
	// sliding row loops without a seam.
	// The university is left out: this row is about work.
	const logos = [...Object.values(companies), ...Object.values(showcaseClients)]
		.filter((c) => c.name !== companies.unas.name)
		.map((c) => ({
			name: c.name,
			src: c.logo
		}));

	let index = $state(0);
	let paused = $state(false);
	let showTip = $state(false);
	const current = $derived(picks[index]);

	let tipTimer: ReturnType<typeof setTimeout>;
	function flashTip() {
		showTip = true;
		clearTimeout(tipTimer);
		tipTimer = setTimeout(() => (showTip = paused), 2200);
	}
	function hold(on: boolean) {
		paused = on;
		showTip = on;
	}

	$effect(() => {
		if (picks.length < 2 || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		const timer = setInterval(() => {
			if (paused || document.hidden) return;
			index = (index + 1) % picks.length;
			flashTip();
		}, 3600);
		return () => {
			clearInterval(timer);
			clearTimeout(tipTimer);
		};
	});
</script>

<section class="hero frame" id="index">
	<h1 class="headline">
		<span class="line"><ProximityText text="Designing products" /></span>
		<span class="line">
			<ProximityText text="and" />
			<!-- Inline thumbnail: cycles through highlighted projects, with a label on each switch -->
			<span class="thumb-wrap">
				<a
					class="thumb"
					href={current ? `/work/${current.slug}` : '#work'}
					aria-label={current ? `Open ${current.title}` : 'See selected work'}
					onpointerenter={() => hold(true)}
					onpointerleave={() => hold(false)}
					onfocus={() => hold(true)}
					onblur={() => hold(false)}
				>
					{#each picks as p, i (p.slug)}
						<img src={p.cover} alt="" class:active={i === index} loading={i ? 'lazy' : 'eager'} />
					{/each}
				</a>
				{#if showTip && current}
					<span class="tip" transition:fade={{ duration: 200 }}>
						<Tag kind={current.featured ? 'featured' : 'new'} />
						<span class="tip-title">{current.title}</span>
					</span>
				{/if}
			</span>
			<ProximityText text="systems" />
		</span>
		<span class="line muted"><ProximityText text="that ship as code." /></span>
	</h1>

	<div class="intro">
		<p>
			I’m {site.name} (Hans), based in {site.location}, {site.country}. 9+ years leading design for
			lending, aquaculture and retail products, from design systems to prototypes shipped with AI.
		</p>
		<p class="focus label">
			<span class="focus-key">Lately</span>
			<ScrambleText phrases={focus} />
		</p>
	</div>

	<aside class="aside">
		<div class="note">
			<span class="label">Currently</span>
			<p>
				UX Designer at <a class="hairline-link" href="/about#experience">Nikel</a>, designing the
				LMS, Borrower and Lender Portal.
			</p>
		</div>
		<div class="note">
			<span class="label">Previously</span>
			<p>
				<a class="hairline-link" href="/about#experience">eFishery</a>,
				<a class="hairline-link" href="/about#experience">Fazz</a>,
				<a class="hairline-link" href="/about#experience">Warung Pintar</a> and my studio,
				<a class="hairline-link" href="/about#experience">Twonity</a>.
			</p>
		</div>
	</aside>

	<div class="clients" style:--n={logos.length}>
		<span class="label clients-label">Experience &amp; clients</span>
		<div class="clients-viewport">
			<ul class="clients-track">
				{#each [...logos, ...logos] as l, i (i)}
					<li aria-hidden={i >= logos.length}>
						<img src={l.src} alt="" loading="lazy" />
						<span>{l.name}</span>
					</li>
				{/each}
			</ul>
		</div>
	</div>

	<a class="scroll-cue label" href="#work">
		<span class="cue-line" aria-hidden="true"></span>
		<span class="cue-text">Scroll to the work</span>
	</a>
</section>

<style>
	.hero {
		position: relative;
		min-height: calc(100svh - var(--bar));
		grid-template-rows: auto auto 1fr;
		align-content: start;
		row-gap: 0;
		padding-top: 28px;
		padding-bottom: 120px;
	}

	.headline {
		grid-column: 1 / -1;
		margin: clamp(40px, 9vh, 96px) 0 0;
		font-size: clamp(44px, 7.4vw, 124px);
		font-weight: 380;
		line-height: 0.98;
		letter-spacing: -0.045em;
		color: var(--text);
	}
	.line {
		display: block;
		animation: enter 1s var(--ease-out) both;
	}
	.line:nth-child(2) {
		animation-delay: 0.08s;
		padding-left: calc((100% + var(--gap)) / 12 * 2);
	}
	.line:nth-child(3) {
		animation-delay: 0.16s;
	}
	.muted {
		color: var(--text-secondary);
	}

	.thumb-wrap {
		position: relative;
		display: inline-block;
		vertical-align: 0.02em;
	}
	.thumb {
		position: relative;
		display: inline-block;
		width: 1.5em;
		height: 0.72em;
		margin: 0 0.06em 0 -0.02em;
		vertical-align: 0.02em;
		border-radius: 999px;
		overflow: hidden;
		background: var(--surface);
		box-shadow: inset 0 0 0 1px var(--hairline);
		transition: width 0.7s var(--ease-out);
	}
	.thumb:hover {
		width: 2.6em;
	}
	/* Covers stack; the active one fades and settles in */
	.thumb img {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		opacity: 0;
		transform: scale(1.12);
		transition:
			opacity 0.6s ease,
			transform 1.2s var(--ease-out);
	}
	.thumb img.active {
		opacity: 1;
		transform: none;
	}
	.thumb:hover img.active {
		transform: scale(1.06);
	}
	/* Label above the thumbnail: what the project is, and why to open it */
	.tip {
		position: absolute;
		bottom: calc(100% + 10px);
		left: 50%;
		translate: -50% 0;
		z-index: 2;
		display: flex;
		align-items: center;
		gap: 8px;
		max-width: min(320px, 80vw);
		padding: 6px 12px 6px 6px;
		border-radius: 999px;
		background: var(--card);
		box-shadow:
			var(--shadow-float),
			0 0 0 1px var(--hairline);
		font-family: var(--font-sans);
		font-size: 13px;
		font-weight: 500;
		letter-spacing: -0.01em;
		line-height: 1.2;
		color: var(--text);
		white-space: nowrap;
		pointer-events: none;
	}
	.tip::after {
		content: '';
		position: absolute;
		top: 100%;
		left: 50%;
		margin-left: -5px;
		border: 5px solid transparent;
		border-top-color: var(--card);
	}
	.tip-title {
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.intro {
		grid-column: 1 / span 5;
		margin-top: clamp(40px, 8vh, 80px);
		font-size: calc(15px * var(--text-scale));
		line-height: 1.55;
		color: var(--text-secondary);
		letter-spacing: -0.01em;
		animation: enter 1s var(--ease-out) 0.25s both;
	}
	.focus {
		display: flex;
		gap: 10px;
		margin-top: 18px;
		text-transform: none;
		font-size: 12px;
	}
	.focus-key {
		padding: 1px 6px;
		border: 1px solid var(--rule);
		border-radius: 999px;
		font-size: 10px;
		text-transform: uppercase;
	}

	.aside {
		grid-column: 7 / -1;
		display: grid;
		grid-template-columns: 1fr 1fr;
		column-gap: var(--gap);
		gap: 18px;
		margin-top: clamp(40px, 8vh, 80px);
		font-size: calc(14px * var(--text-scale));
		line-height: 1.5;
		color: var(--text-secondary);
		animation: enter 1s var(--ease-out) 0.32s both;
	}
	.note p {
		margin-top: 4px;
	}

	/* Client logos: one sliding row along the bottom of the hero */
	.clients {
		grid-column: 1 / -1;
		align-self: end;
		display: flex;
		align-items: center;
		gap: 24px;
		margin-top: 56px;
		padding-top: 20px;
		border-top: 1px solid var(--hairline);
		animation: enter 1s var(--ease-out) 0.4s both;
	}
	.clients-label {
		flex: none;
	}
	.clients-viewport {
		flex: 1;
		min-width: 0;
		overflow: hidden;
		mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
	}
	.clients-track {
		display: flex;
		align-items: center;
		gap: 36px;
		width: max-content;
		margin: 0;
		padding: 0;
		list-style: none;
		animation: clients-slide calc(var(--n) * 2.6s) linear infinite;
	}
	.clients:hover .clients-track {
		animation-play-state: paused;
	}
	@keyframes clients-slide {
		to {
			transform: translateX(calc(-50% - 18px));
		}
	}
	.clients-track li {
		flex: none;
		display: flex;
		align-items: center;
		gap: 10px;
		font-size: 13px;
		color: var(--text-secondary);
		white-space: nowrap;
		transition: color 0.3s ease;
	}
	/* Every logo in the same square tile, so wordmarks and icons read at one size */
	.clients-track img {
		width: 32px;
		height: 32px;
		border-radius: 9px;
		object-fit: cover;
		background: #fff;
		box-shadow: 0 0 0 1px var(--hairline);
		filter: grayscale(1);
		opacity: 0.85;
		transition:
			filter 0.4s ease,
			opacity 0.4s ease;
	}
	.clients-track li:hover {
		color: var(--text);
	}
	.clients-track li:hover img {
		filter: none;
		opacity: 1;
	}
	@media (prefers-reduced-motion: reduce) {
		.clients-viewport {
			overflow-x: auto;
		}
		.clients-track {
			animation: none;
		}
	}

	.scroll-cue {
		position: absolute;
		left: var(--pad);
		bottom: 40px;
		display: flex;
		align-items: center;
		gap: 10px;
		text-decoration: none;
		transition: color 0.2s ease;
	}
	.scroll-cue:hover {
		color: var(--text);
	}
	.cue-line {
		position: relative;
		width: 1px;
		height: 32px;
		overflow: hidden;
		background: var(--hairline);
	}
	.cue-line::after {
		content: '';
		position: absolute;
		left: 0;
		width: 1px;
		height: 12px;
		background: var(--text);
		animation: drip 2s var(--ease-swap) infinite;
	}

	@keyframes enter {
		from {
			opacity: 0;
			transform: translateY(18px);
		}
	}
	/* The label fades in and out with the line, on the same beat */
	.cue-text {
		animation: cue-fade 2s var(--ease-swap) infinite;
	}
	.scroll-cue:hover .cue-text {
		animation-play-state: paused;
		opacity: 1;
	}
	@keyframes cue-fade {
		0%,
		100% {
			opacity: 0.15;
		}
		45% {
			opacity: 1;
		}
	}
	@keyframes drip {
		from {
			top: -12px;
		}
		to {
			top: 32px;
		}
	}

	@media (max-width: 1023px) {
		.line:nth-child(2) {
			padding-left: 0;
		}
		.intro,
		.aside {
			grid-column: 1 / -1;
		}
		.aside {
			margin-top: 28px;
		}
	}
	@media (max-width: 600px) {
		.tip {
			padding: 4px 10px 4px 4px;
			font-size: 12px;
		}
		.intro,
		.aside {
			grid-column: 1 / -1;
		}
		.aside {
			margin-top: 28px;
			grid-template-columns: 1fr 1fr;
		}
		.scroll-cue {
			display: none;
		}
		.clients {
			flex-direction: column;
			align-items: stretch;
			gap: 12px;
			margin-top: 40px;
		}
		.clients-track {
			gap: 32px;
		}
		.clients-track img {
			width: 28px;
			height: 28px;
		}
		.clients-track li {
			font-size: 12px;
		}
	}
</style>
