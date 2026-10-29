<script lang="ts">
	import ScrambleText from '#lib/components/home/ScrambleText.svelte';
	import { site } from '#lib/data/site.ts';
	import { createClock } from '#lib/utils/clock.svelte.ts';

	const clock = createClock(site.timeZone);
	let scrolled = $state(false);

	$effect(() => clock.start());
</script>

<svelte:window onscroll={() => (scrolled = scrollY > 8)} />

<header class="bar" class:scrolled>
	<div class="frame">
		<a href="/" class="brand" aria-label="{site.name}, home">
			<!-- Monogram: four petals that turn a quarter on hover -->
			<svg class="mark" viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
				<path d="M12 2c1.9 3.4 1.9 6.6 0 10-1.9-3.4-1.9-6.6 0-10Z" />
				<path d="M22 12c-3.4 1.9-6.6 1.9-10 0 3.4-1.9 6.6-1.9 10 0Z" />
				<path d="M12 22c-1.9-3.4-1.9-6.6 0-10 1.9 3.4 1.9 6.6 0 10Z" />
				<path d="M2 12c3.4-1.9 6.6-1.9 10 0-3.4 1.9-6.6 1.9-10 0Z" />
			</svg>
			<span class="name">{site.name}</span>
			<span class="sub"
				>/ {site.role},
				<span class="also"><ScrambleText phrases={site.roles} interval={3600} /></span></span
			>
		</a>

		<p class="clock label" aria-label="Local time in {site.location}, {site.country}">
			<!-- Indonesian flag, drawn so it shows on every platform (Windows has no flag emoji) -->
			<svg class="flag" viewBox="0 0 3 2" width="15" height="10" aria-hidden="true"
				><rect width="3" height="1" fill="#ce1126" /><rect
					y="1"
					width="3"
					height="1"
					fill="#fff"
				/></svg
			>
			{site.location}, {site.country}
			<span class="time">
				{clock.label.slice(0, 2)}<span class="colon">:</span>{clock.label.slice(3)}
			</span>
			<span class="offset">{clock.offset}</span>
		</p>

		<p class="status">
			<span class="dot" class:off={!site.available}></span>
			{site.available ? 'Open to new opportunities' : 'Not taking new work right now'}
		</p>
	</div>
</header>

<style>
	.bar {
		position: fixed;
		inset: 0 0 auto;
		z-index: 100;
		height: var(--bar);
		transition:
			background-color 0.3s ease,
			border-color 0.3s ease;
		border-bottom: 1px solid transparent;
	}
	.bar.scrolled {
		background: color-mix(in srgb, var(--bg) 78%, transparent);
		backdrop-filter: blur(14px) saturate(1.2);
		border-bottom-color: var(--hairline);
	}
	.frame {
		height: 100%;
		align-items: center;
	}

	.brand {
		grid-column: 1 / span 4;
		display: flex;
		align-items: center;
		gap: 10px;
		width: fit-content;
		color: var(--text);
		text-decoration: none;
		font-size: 14px;
		font-weight: 600;
		letter-spacing: -0.01em;
	}
	.mark {
		fill: currentColor;
		transition: transform 0.8s var(--ease-out);
	}
	.mark path:nth-child(odd) {
		opacity: 0.85;
	}
	.brand:hover .mark {
		transform: rotate(90deg) scale(0.9);
	}
	.flag {
		display: inline-block;
		margin-right: 6px;
		vertical-align: -1px;
		border-radius: 2px;
		box-shadow: 0 0 0 1px var(--hairline);
	}
	.also {
		opacity: 0.7;
	}
	.sub {
		color: var(--text-secondary);
		font-weight: 450;
		clip-path: inset(0 0 0 0);
		transition:
			clip-path 0.4s var(--ease-out),
			opacity 0.3s ease;
	}

	.clock {
		grid-column: 5 / span 4;
		justify-self: center;
		display: flex;
		align-items: baseline;
		gap: 8px;
		margin: 0;
	}
	.time {
		color: var(--text);
		font-variant-numeric: tabular-nums;
	}
	.colon {
		animation: blink 2s steps(1) infinite;
	}
	.offset {
		opacity: 0.6;
	}

	/* Status sits left of the lamp, which hangs from the bar's right edge */
	.status {
		grid-column: 9 / -1;
		justify-self: end;
		display: flex;
		align-items: center;
		gap: 8px;
		margin: 0 72px 0 0;
		font-size: 12px;
		color: var(--text-secondary);
	}
	.dot {
		position: relative;
		width: 7px;
		height: 7px;
		border-radius: 50%;
		background: #3fb27f;
	}
	.dot::after {
		content: '';
		position: absolute;
		inset: 0;
		border-radius: inherit;
		background: inherit;
		animation: ping 2.4s var(--ease-out) infinite;
	}
	.dot.off {
		background: var(--amber);
	}

	@keyframes blink {
		50% {
			opacity: 0.2;
		}
	}
	@keyframes ping {
		0% {
			transform: scale(1);
			opacity: 0.6;
		}
		80%,
		100% {
			transform: scale(3);
			opacity: 0;
		}
	}

	@media (max-width: 1023px) {
		.clock {
			display: none;
		}
		.brand {
			grid-column: 1 / span 3;
		}
		.status {
			grid-column: 4 / -1;
		}
	}
	@media (max-width: 600px) {
		.sub,
		.status {
			display: none;
		}
	}
</style>
