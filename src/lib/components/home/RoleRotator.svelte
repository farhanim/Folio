<script lang="ts">
	import { onMount } from 'svelte';
	import { cubicOut } from 'svelte/easing';

	/**
	 * A word that rolls up through a list, under a drop of "liquid glass".
	 * The glass can be dragged around and springs back; a click rolls the word.
	 */
	let { words, interval = 2400 }: { words: string[]; interval?: number } = $props();

	let index = $state(0);
	let width = $state(0);
	let measurer: HTMLSpanElement;

	// Pill drag + spring state
	let x = $state(0);
	let y = $state(0);
	let stretch = $state(0);
	let mx = $state(30);
	let my = $state(20);
	let dragging = $state(false);

	// Rolls in from below (dir 1) or out through the top (dir -1).
	function roll(_node: Element, { dir }: { dir: 1 | -1 }) {
		return {
			duration: 450,
			easing: cubicOut,
			css: (t: number, u: number) => `opacity: ${t}; transform: translateY(${dir * u * 100}%)`
		};
	}

	let timer: ReturnType<typeof setInterval>;
	const next = () => (index = (index + 1) % words.length);
	const restartTimer = () => {
		clearInterval(timer);
		timer = setInterval(next, interval);
	};

	onMount(() => {
		// Fix the slot to the widest word so the sentence never reflows.
		const measure = () => {
			width = Math.max(...[...measurer.children].map((el) => (el as HTMLElement).offsetWidth));
		};
		measure();
		document.fonts?.ready.then(measure);
		restartTimer();
		return () => clearInterval(timer);
	});

	// ── Spring physics (stiffness 140, damping 13: heavy return, slight overshoot) ──
	let vx = 0;
	let vy = 0;
	let frame = 0;
	let start = { px: 0, py: 0, x: 0, y: 0, moved: false };

	function springBack() {
		cancelAnimationFrame(frame);
		let last = performance.now();
		const step = (now: number) => {
			const dt = Math.min((now - last) / 1000, 1 / 30);
			last = now;
			vx += (-140 * x - 13 * vx) * dt;
			vy += (-140 * y - 13 * vy) * dt;
			x += vx * dt;
			y += vy * dt;
			stretch = Math.min(Math.hypot(vx, vy) / 3000, 0.18);
			if (Math.abs(x) + Math.abs(y) + Math.abs(vx) + Math.abs(vy) < 0.05) {
				x = y = vx = vy = stretch = 0;
				return;
			}
			frame = requestAnimationFrame(step);
		};
		frame = requestAnimationFrame(step);
	}

	function onpointerdown(e: PointerEvent) {
		cancelAnimationFrame(frame);
		(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
		dragging = true;
		start = { px: e.clientX, py: e.clientY, x, y, moved: false };
	}

	function onpointermove(e: PointerEvent) {
		const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
		mx = ((e.clientX - rect.left) / rect.width) * 100;
		my = ((e.clientY - rect.top) / rect.height) * 100;
		if (!dragging) return;
		const dx = e.clientX - start.px;
		const dy = e.clientY - start.py;
		if (Math.hypot(dx, dy) > 3) start.moved = true;
		// Rubber-band: the further it's pulled, the harder it resists.
		const band = (d: number) => Math.sign(d) * 60 * Math.log1p(Math.abs(d) / 60);
		x = start.x + band(dx);
		y = start.y + band(dy);
		stretch = Math.min(Math.hypot(dx, dy) / 900, 0.12);
	}

	function onpointerup() {
		if (!dragging) return;
		dragging = false;
		if (!start.moved) {
			next();
			restartTimer();
		}
		vx = vy = 0;
		springBack();
	}
</script>

<span class="rotator">
	<span class="words" style:width="{width + 4}px">
		{#key index}
			<span class="word" in:roll={{ dir: 1 }} out:roll={{ dir: -1 }}>{words[index]}</span>
		{/key}
	</span>
	<span
		class="pill"
		class:dragging
		role="button"
		tabindex="-1"
		aria-label="Show next role"
		style:transform="translate({x}px, {y}px) scale({1 + stretch}, {1 - stretch * 0.6})"
		style:--mx="{mx}%"
		style:--my="{my}%"
		{onpointerdown}
		{onpointermove}
		{onpointerup}
		onpointercancel={onpointerup}
	></span>
	<span class="measure" aria-hidden="true" bind:this={measurer}>
		{#each words as word (word)}<span>{word}</span>{/each}
	</span>
</span>

<style>
	.rotator {
		position: relative;
		display: inline-block;
		vertical-align: bottom;
		margin: 0 5px;
	}

	.words {
		position: relative;
		display: inline-block;
		height: 1.7em;
		overflow: hidden;
		vertical-align: bottom;
		transform: translateY(1px);
		color: var(--text);
	}

	/* Words share one slot; the old one leaves upward as the new one rises. */
	.word {
		position: absolute;
		inset: 0;
		text-align: center;
		white-space: nowrap;
	}

	/* ── Liquid glass pill ── */
	.pill {
		--rim: 0deg;
		position: absolute;
		top: -3px;
		bottom: -5px;
		left: -14px;
		right: -14px;
		z-index: 2;
		border-radius: 9999px;
		overflow: hidden;
		cursor: grab;
		user-select: none;
		touch-action: none;
		will-change: transform;
		background: linear-gradient(180deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.04));
		backdrop-filter: blur(0.6px) brightness(1.08) saturate(1.3) contrast(1.04);
		box-shadow:
			0 0 0 0.5px rgba(0, 0, 0, 0.06),
			0 2px 8px rgba(0, 0, 0, 0.1),
			inset 0 1px 6px rgba(255, 255, 255, 0.12),
			inset 0 -1px 4px rgba(0, 0, 0, 0.06);
		animation: glass-rim 14s linear infinite;
		transition: box-shadow 0.2s ease;
	}
	.pill.dragging {
		cursor: grabbing;
		box-shadow:
			0 0 0 0.5px rgba(0, 0, 0, 0.08),
			0 8px 20px rgba(0, 0, 0, 0.14),
			inset 0 1px 6px rgba(255, 255, 255, 0.14),
			inset 0 -1px 4px rgba(0, 0, 0, 0.06);
	}
	/* Rim: a bright top specular plus a slowly turning spectral fringe */
	.pill::before {
		content: '';
		position: absolute;
		inset: 0;
		padding: 1px;
		border-radius: inherit;
		background:
			linear-gradient(
				180deg,
				rgba(255, 255, 255, 0.9) 0%,
				rgba(255, 255, 255, 0.3) 16%,
				rgba(0, 0, 0, 0.1) 45%,
				rgba(0, 0, 0, 0.14) 100%
			),
			conic-gradient(
				from calc(200deg + var(--rim)),
				rgba(255, 120, 110, 0.45),
				rgba(255, 200, 120, 0.25),
				rgba(120, 220, 200, 0.3),
				rgba(110, 150, 255, 0.45),
				rgba(190, 120, 255, 0.3),
				rgba(255, 120, 110, 0.45)
			);
		mask:
			linear-gradient(#000 0 0) content-box,
			linear-gradient(#000 0 0);
		mask-composite: exclude;
		opacity: 0.85;
	}
	/* Soft highlight that follows the pointer */
	.pill::after {
		content: '';
		position: absolute;
		inset: 0;
		border-radius: inherit;
		background: radial-gradient(
			60% 90% at var(--mx) var(--my),
			rgba(255, 255, 255, 0.22) 0%,
			rgba(255, 255, 255, 0.06) 35%,
			transparent 70%
		);
	}
	@keyframes glass-rim {
		to {
			--rim: 360deg;
		}
	}

	:global([data-theme='dark']) .pill {
		background: linear-gradient(180deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.02));
		box-shadow:
			0 0 0 0.5px rgba(255, 255, 255, 0.05),
			0 2px 8px rgba(0, 0, 0, 0.25),
			inset 0 1px 6px rgba(255, 255, 255, 0.06),
			inset 0 -1px 4px rgba(0, 0, 0, 0.15);
	}
	:global([data-theme='dark']) .pill::before {
		background:
			linear-gradient(
				180deg,
				rgba(255, 255, 255, 0.55) 0%,
				rgba(255, 255, 255, 0.12) 18%,
				transparent 40%,
				transparent 60%,
				rgba(255, 255, 255, 0.22) 100%
			),
			conic-gradient(
				from calc(200deg + var(--rim)),
				rgba(255, 120, 110, 0.5),
				rgba(255, 220, 120, 0.3),
				rgba(120, 255, 200, 0.35),
				rgba(110, 170, 255, 0.5),
				rgba(200, 120, 255, 0.35),
				rgba(255, 120, 110, 0.5)
			);
		opacity: 0.8;
	}
	:global([data-theme='dark']) .pill::after {
		mix-blend-mode: screen;
	}

	.measure {
		position: absolute;
		visibility: hidden;
		pointer-events: none;
		white-space: nowrap;
	}
	.measure span {
		position: absolute;
	}
</style>
