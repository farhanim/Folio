<script lang="ts">
	/**
	 * Headline text whose letters thicken as the cursor approaches, using the
	 * variable weight axis. Words stay intact for wrapping and screen readers.
	 */
	let {
		text,
		min = 380,
		max = 780,
		radius = 160
	}: { text: string; min?: number; max?: number; radius?: number } = $props();

	const SPACE = ' ';
	const words = $derived(text.split(SPACE));
	let root: HTMLSpanElement;
	let frame = 0;

	function update(x: number, y: number) {
		for (const el of root.querySelectorAll<HTMLElement>('.ch')) {
			const r = el.getBoundingClientRect();
			const d = Math.hypot(x - (r.left + r.width / 2), y - (r.top + r.height / 2));
			const t = Math.max(0, 1 - d / radius);
			el.style.fontWeight = String(Math.round(min + (max - min) * t * t));
		}
	}

	function onpointermove(e: PointerEvent) {
		if (e.pointerType !== 'mouse') return;
		cancelAnimationFrame(frame);
		frame = requestAnimationFrame(() => update(e.clientX, e.clientY));
	}

	function onpointerleave() {
		cancelAnimationFrame(frame);
		for (const el of root.querySelectorAll<HTMLElement>('.ch')) el.style.fontWeight = String(min);
	}
</script>

<span class="proximity" bind:this={root}>
	<span class="sr-only">{text}</span>
	{#each words as word, w (w)}
		<span class="word" aria-hidden="true">
			{#each word as char, c (c)}<span class="ch" style:font-weight={min}>{char}</span>{/each}
		</span>{SPACE}
	{/each}
</span>

<svelte:window {onpointermove} onblur={onpointerleave} />

<style>
	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		overflow: hidden;
		clip-path: inset(50%);
		white-space: nowrap;
	}
	.word {
		display: inline-block;
		white-space: nowrap;
	}
	.ch {
		display: inline-block;
		transition: font-weight 0.35s var(--ease-out);
	}
</style>
