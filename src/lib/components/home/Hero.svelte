<script lang="ts">
	import { focus, site } from '#lib/data/site.ts';
	import Badge from './Badge.svelte';
	import ProximityText from './ProximityText.svelte';
	import ScrambleText from './ScrambleText.svelte';
</script>

<section class="hero frame" id="index">
	<header class="meta">
		<span class="label">(01) Index</span>
		<span class="label edition">Folio — {site.year} edition</span>
	</header>

	<h1 class="headline">
		<span class="line"><ProximityText text="Designing calm," /></span>
		<span class="line">
			<ProximityText text="useful" />
			<!-- Inline thumbnail that widens on hover -->
			<a class="thumb" href="#work" aria-label="See selected work">
				<img src="/images/work/pos.svg" alt="" />
			</a>
			<ProximityText text="software" />
		</span>
		<span class="line muted"><ProximityText text="for teams that care." /></span>
	</h1>

	<div class="intro">
		<p>
			I’m {site.name}, a {site.role.toLowerCase()} in {site.location}. I shape products end to end —
			from the first rough sketch to the last pixel that ships.
		</p>
		<p class="focus label">
			<span class="focus-key">Lately</span>
			<ScrambleText phrases={focus} />
		</p>
	</div>

	<aside class="aside">
		<div class="note">
			<span class="label">Currently</span>
			<p>Shaping the design system for <a class="hairline-link" href="#work">Cyclone POS</a>.</p>
		</div>
		<div class="note">
			<span class="label">Previously</span>
			<p>
				<a class="hairline-link" href="#work">Kala Studio</a>,
				<a class="hairline-link" href="#work">Nusa Labs</a>, freelance.
			</p>
		</div>
	</aside>

	<div class="sticker">
		<Badge text="Available for projects · Based in {site.location} · " href="#contact" />
	</div>

	<a class="scroll-cue label" href="#work">
		<span class="cue-line" aria-hidden="true"></span>
		Scroll to the work
	</a>
</section>

<style>
	.hero {
		position: relative;
		min-height: calc(100svh - var(--bar));
		align-content: start;
		row-gap: 0;
		padding-top: 28px;
		padding-bottom: 120px;
	}

	.meta {
		grid-column: 1 / -1;
		display: flex;
		justify-content: space-between;
		padding-bottom: 12px;
		border-bottom: 1px solid var(--hairline);
		animation: enter 0.8s var(--ease-out) both;
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

	.thumb {
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
	.thumb img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.9s var(--ease-out);
	}
	.thumb:hover img {
		transform: scale(1.12);
	}

	.intro {
		grid-column: 1 / span 4;
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
		grid-column: 7 / span 3;
		display: grid;
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

	.sticker {
		grid-column: 11 / span 2;
		justify-self: end;
		align-self: end;
		margin-top: 40px;
		animation: sticker-in 1.2s var(--ease-out) 0.5s both;
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
	@keyframes sticker-in {
		from {
			opacity: 0;
			transform: scale(0.6) rotate(-40deg);
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
		.intro {
			grid-column: 1 / span 4;
		}
		.aside {
			grid-column: 5 / span 2;
		}
		.sticker {
			grid-column: 5 / span 2;
		}
	}
	@media (max-width: 600px) {
		.edition {
			display: none;
		}
		.intro,
		.aside {
			grid-column: 1 / -1;
		}
		.aside {
			margin-top: 28px;
			grid-template-columns: 1fr 1fr;
		}
		.sticker {
			grid-column: 1 / -1;
			margin-top: 28px;
		}
		.sticker :global(.badge) {
			width: 96px;
		}
		.scroll-cue {
			display: none;
		}
	}
</style>
