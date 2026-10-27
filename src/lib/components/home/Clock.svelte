<script lang="ts">
	import { createClock } from '#lib/utils/clock.svelte.ts';

	/** Analog clock face for a time zone, with a sweeping second hand. */
	let { timeZone }: { timeZone: string } = $props();

	// svelte-ignore state_referenced_locally
	const clock = createClock(timeZone);
	$effect(() => clock.start());

	const hour = $derived((clock.h % 12) * 30 + clock.m * 0.5);
	const minute = $derived(clock.m * 6 + clock.s * 0.1);
	const second = $derived(clock.s * 6);
</script>

<svg class="clock" viewBox="0 0 100 100" role="img" aria-label="Local time {clock.label}">
	<circle class="face" cx="50" cy="50" r="46" />
	{#each { length: 60 }, i (i)}
		<line
			class="tick"
			class:major={i % 5 === 0}
			x1="50"
			y1="7"
			x2="50"
			y2={i % 5 === 0 ? 13 : 10}
			transform="rotate({i * 6} 50 50)"
		/>
	{/each}
	<line class="hand hour" x1="50" y1="54" x2="50" y2="28" transform="rotate({hour} 50 50)" />
	<line class="hand minute" x1="50" y1="56" x2="50" y2="17" transform="rotate({minute} 50 50)" />
	<g class="second" transform="rotate({second} 50 50)">
		<line x1="50" y1="60" x2="50" y2="14" />
		<circle cx="50" cy="14" r="2" />
	</g>
	<circle class="pin" cx="50" cy="50" r="2.4" />
</svg>

<style>
	.clock {
		display: block;
		width: 100%;
		max-width: 150px;
		height: auto;
	}
	.face {
		fill: var(--bg);
		stroke: var(--hairline);
	}
	.tick {
		stroke: var(--text-secondary);
		stroke-width: 0.5;
		opacity: 0.5;
	}
	.tick.major {
		stroke-width: 1.2;
		opacity: 1;
	}
	.hand {
		stroke: var(--text);
		stroke-linecap: round;
	}
	.hour {
		stroke-width: 3.2;
	}
	.minute {
		stroke-width: 2;
	}
	.second line {
		stroke: var(--amber);
		stroke-width: 0.9;
	}
	.second circle,
	.pin {
		fill: var(--amber);
	}
</style>
