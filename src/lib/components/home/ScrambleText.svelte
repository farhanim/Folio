<script lang="ts">
	import { onMount } from 'svelte';

	/** Cycles through phrases, decoding each one from random glyphs left to right. */
	let { phrases, interval = 3200 }: { phrases: string[]; interval?: number } = $props();

	const GLYPHS = '!<>-_\\/[]{}=+*^?#░▒';
	// svelte-ignore state_referenced_locally
	let shown = $state(phrases[0]);
	let index = 0;

	function scramble(to: string) {
		const from = shown;
		const length = Math.max(from.length, to.length);
		const queue = Array.from({ length }, (_, i) => ({
			from: from[i] ?? '',
			to: to[i] ?? '',
			start: Math.floor(Math.random() * 12),
			end: Math.floor(Math.random() * 12) + 12 + i * 0.6
		}));
		let tick = 0;
		const step = () => {
			let done = 0;
			shown = queue
				.map((q) => {
					if (tick >= q.end) {
						done++;
						return q.to;
					}
					if (tick >= q.start) return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
					return q.from;
				})
				.join('');
			tick++;
			if (done < queue.length) requestAnimationFrame(step);
		};
		requestAnimationFrame(step);
	}

	onMount(() => {
		if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		const id = setInterval(() => {
			index = (index + 1) % phrases.length;
			scramble(phrases[index]);
		}, interval);
		return () => clearInterval(id);
	});
</script>

<span class="scramble" aria-live="polite">{shown}</span>

<style>
	.scramble {
		color: var(--text);
		white-space: nowrap;
	}
</style>
