<script lang="ts">
	import { settings } from '#lib/stores/settings.svelte.ts';
	import { Rope } from '#lib/utils/rope.ts';

	// Light theme = lamp awake and lit. Dark theme = lamp off, asleep (eyes shut, z's).
	const awake = $derived(settings.resolved === 'light');

	let bulb: SVGPathElement;
	let swinging = $state(false);
	let toggleTimer: ReturnType<typeof setTimeout> | undefined;

	function restart(set: (v: boolean) => void) {
		set(false);
		// Two frames so the class removal is painted and the animation restarts.
		requestAnimationFrame(() => requestAnimationFrame(() => set(true)));
	}

	// Eyes follow the pointer while the lamp is awake (offset in SVG units).
	let look = $state({ x: 0, y: 0 });
	let svg: SVGSVGElement;

	function onpointermove(e: PointerEvent) {
		if (!awake || e.pointerType !== 'mouse') return;
		const r = svg.getBoundingClientRect();
		const dx = e.clientX - (r.left + r.width / 2);
		const dy = e.clientY - (r.top + r.height * 0.52);
		const d = Math.hypot(dx, dy) || 1;
		const reach = Math.min(d / 240, 1) * 0.75;
		look = { x: (dx / d) * reach, y: (dy / d) * reach };
	}

	// A handwritten "pull me" note until the lamp has been pulled once.
	let hint = $state(false);
	let scrolledAway = $state(false);
	$effect(() => {
		try {
			hint = localStorage.getItem('folio:lamp-pulled') !== '1';
		} catch {
			hint = true;
		}
	});

	function onkeydown(e: KeyboardEvent) {
		const target = e.target as HTMLElement;
		if (e.key.toLowerCase() !== 'l' || e.metaKey || e.ctrlKey || e.altKey) return;
		if (target.closest('input, textarea, [contenteditable]')) return;
		pull();
	}

	// ── Pull cord: a little rope ──────────────────────────────────────
	// A Verlet rope hangs from the shade. It rests short; on hover it grows long
	// and drifts on its own along an irregular, smooth path (like a string
	// swaying in a draught). Drag it in any direction to stretch it — far enough and
	// letting go switches the theme. Units are SVG units; the cord hangs from y = 55.
	const ANCHOR = { x: 32, y: 55 };
	const REST = 7;
	const HOVER = 20;
	const PULL_AT = 20; // stretched this far past rest, releasing switches the theme
	const rope = new Rope(ANCHOR, REST);

	let cordPath = $state(rope.path());
	let knob = $state({ ...rope.end });
	let len = REST;
	let lenVelocity = 0;
	let hoverMix = 0;
	let stretched = $state(false);
	let hovered = false;
	let pointer: { x: number; y: number } | null = null;
	let drag: { x: number; y: number; active: boolean } | null = null;
	let suppressClick = false;
	let frame = 0;

	/** Client coordinates → this SVG's coordinates (follows the lamp's swing and scale). */
	function toSvg(clientX: number, clientY: number) {
		const ctm = svg?.getScreenCTM();
		if (!ctm) return null;
		const p = new DOMPoint(clientX, clientY).matrixTransform(ctm.inverse());
		return { x: p.x, y: p.y };
	}

	function targetLength() {
		if (drag?.active && pointer) {
			// Rubber band: easy at first, increasingly stiff.
			const d = Math.hypot(pointer.x - ANCHOR.x, pointer.y - ANCHOR.y);
			return REST + 40 * Math.log1p(Math.max(0, d - REST) / 40);
		}
		return hovered ? HOVER : REST;
	}

	function animate() {
		if (frame) return;
		let last = performance.now();
		const tick = (now: number) => {
			const dt = Math.min((now - last) / 1000, 1 / 30);
			last = now;
			const t = now / 1000;

			// Length eases toward its target on a critically damped spring: a soft,
			// overshoot-free glide when growing or shrinking; stiffer while dragged.
			const dragging = !!drag?.active;
			const k = dragging ? 220 : 38;
			const c = 2 * Math.sqrt(k);
			lenVelocity += (k * (targetLength() - len) - c * lenVelocity) * dt;
			len = Math.max(REST * 0.6, len + lenVelocity * dt);
			rope.length = len;

			// Fade the hover sway in and out instead of switching it on/off.
			hoverMix += ((hovered ? 1 : 0) - hoverMix) * Math.min(1, dt * 2.5);

			let target: { x: number; y: number; strength: number } | undefined;
			if (dragging && pointer) {
				target = { ...pointer, strength: 0.35 };
			} else if (hoverMix > 0.01) {
				// Hang long and drift on its own: the tip wanders around its resting
				// spot on a few out-of-phase sines, so the rope bends irregularly.
				const wx = (Math.sin(t * 1.3) * 2.6 + Math.sin(t * 2.7 + 1.2) * 1.2) * hoverMix;
				const wy = Math.cos(t * 1.6 + 0.4) * 1.1 * hoverMix;
				target = {
					x: ANCHOR.x + wx,
					y: ANCHOR.y + len * 0.9 + wy,
					strength: 0.03 * hoverMix
				};
			}

			// Two substeps per frame keeps the rope stable at low frame rates.
			for (let i = 0; i < 2; i++) rope.step({ gravity: 0.018, damping: 0.955, target });

			cordPath = rope.path();
			knob = { ...rope.end };
			stretched = !!drag?.active && len - REST > PULL_AT;

			const settled =
				!hovered &&
				!drag?.active &&
				hoverMix < 0.01 &&
				rope.energy < 0.004 &&
				Math.abs(len - REST) < 0.02 &&
				Math.abs(lenVelocity) < 0.05;
			frame = settled ? 0 : requestAnimationFrame(tick);
		};
		frame = requestAnimationFrame(tick);
	}

	/** Lengthen the cord with a spring kick, and/or flick it sideways. */
	function kick(length: number, sideways = 0) {
		lenVelocity += length;
		if (sideways) rope.impulse(sideways, 0);
		animate();
	}

	function onpointerdown(e: PointerEvent) {
		if (e.button !== 0) return;
		drag = { x: e.clientX, y: e.clientY, active: false };
		(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
	}

	function trackPointer(e: PointerEvent) {
		if (!hovered && !drag) return;
		pointer = toSvg(e.clientX, e.clientY);
		if (drag && !drag.active && Math.hypot(e.clientX - drag.x, e.clientY - drag.y) > 5) {
			drag.active = true;
		}
		animate();
	}

	function onpointerup() {
		if (!drag) return;
		const wasDragging = drag.active;
		drag = null;
		stretched = false;
		if (!wasDragging) return;
		suppressClick = true;
		if (len - REST > PULL_AT) {
			switchTheme();
			kick(-45, (Math.random() - 0.5) * 1.6); // snaps back up with a little whip
		} else {
			animate();
		}
	}

	function onclick() {
		if (suppressClick) {
			suppressClick = false;
			return;
		}
		pull();
	}

	// Theme changed elsewhere (settings, system): the cord gives a little bounce.
	let lastAwake: boolean | undefined;
	$effect(() => {
		if (lastAwake !== undefined && lastAwake !== awake) kick(40, 1);
		lastAwake = awake;
	});

	// Each time the lamp wakes, the light powers up (flicker → bright → settles soft).
	let igniting = $state(false);
	$effect(() => {
		if (awake) restart((v) => (igniting = v));
	});

	/** Click or keyboard: a quick tug down, then the theme flips as the cord bottoms out. */
	function pull() {
		kick(95, (Math.random() - 0.5) * 1.2);
		switchTheme(160);
	}

	function switchTheme(delay = 0) {
		restart((v) => (swinging = v));
		if (hint) {
			hint = false;
			try {
				localStorage.setItem('folio:lamp-pulled', '1');
			} catch {
				// ignore
			}
		}

		// Flip the theme when the cord bottoms out, revealing it from the bulb.
		clearTimeout(toggleTimer);
		toggleTimer = setTimeout(() => {
			const r = bulb.getBoundingClientRect();
			lastAwake = !awake; // our own switch: no extra bounce
			settings.toggleTheme({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
		}, delay);
	}
</script>

<svelte:window
	onpointermove={(e) => {
		onpointermove(e);
		trackPointer(e);
	}}
	onscroll={() => (scrolledAway = scrollY > 120)}
	{onkeydown}
/>

<button
	type="button"
	class="lamp"
	class:awake
	aria-label={awake ? 'Turn the lamp off (dark mode)' : 'Turn the lamp on (light mode)'}
	aria-pressed={!awake}
	class:stretched
	class:igniting
	{onclick}
	{onpointerdown}
	{onpointerup}
	onpointercancel={onpointerup}
	onpointerenter={(e) => {
		hovered = true;
		pointer = toSvg(e.clientX, e.clientY);
		animate();
	}}
	onpointerleave={() => {
		hovered = false;
		animate();
	}}
>
	<span class="hang">
		<span class="swing" class:swinging onanimationend={() => (swinging = false)}>
			<span class="beam" aria-hidden="true"></span>

			<svg bind:this={svg} viewBox="0 0 44 92" width="44" height="92" aria-hidden="true">
				<defs>
					<radialGradient id="lamp-halo">
						<stop offset="0" stop-color="var(--lamp-glow)" stop-opacity="0.9" />
						<stop offset="1" stop-color="var(--lamp-glow)" stop-opacity="0" />
					</radialGradient>
				</defs>

				<line class="cord" x1="22" y1="0" x2="22" y2="33" />
				<rect class="shade" x="19" y="31" width="6" height="6" rx="1.2" />

				<circle class="halo" cx="22" cy="58" r="15" fill="url(#lamp-halo)" />

				<!-- Pull cord -->
				<g class="pull">
					<path class="pull-cord" d={cordPath} />
					<circle class="pull-knob" cx={knob.x} cy={knob.y} r="2.2" />
				</g>

				<path
					class="shade"
					d="M17 36.5h10c.8 0 1.5.5 1.8 1.2l6.6 15.4c.4 1-.3 2-1.3 2H9.9c-1 0-1.7-1-1.3-2l6.6-15.4c.3-.7 1-1.2 1.8-1.2Z"
				/>
				<path bind:this={bulb} class="bulb" d="M17.5 55.2a4.5 4.5 0 0 0 9 0Z" />

				<!-- Face -->
				<g class="eyes eyes-open">
					<g class="pupils" transform="translate({look.x} {look.y})">
						<ellipse cx="17.6" cy="47.6" rx="1.35" ry="1.6" />
						<ellipse cx="26.4" cy="47.6" rx="1.35" ry="1.6" />
					</g>
				</g>
				<g class="eyes eyes-closed">
					<path d="M15.8 47.2q1.8 1.9 3.6 0" />
					<path d="M24.6 47.2q1.8 1.9 3.6 0" />
				</g>
				<path class="blush" d="M14.6 51h1.8M27.6 51h1.8" />
			</svg>

			<span class="zzz" aria-hidden="true">
				<span>z</span><span>z</span><span>z</span>
			</span>
		</span>
	</span>

	{#if hint}
		<span class="hint" class:away={scrolledAway} aria-hidden="true">
			<span class="hint-text">pull me!</span>
			<svg viewBox="0 0 60 40" width="46" height="31">
				<path d="M4 34C14 34 30 30 40 18c4-5 6-9 8-14" />
				<path d="m42 8 6-5 3 7" />
			</svg>
		</span>
	{/if}
</button>

<style>
	.lamp {
		position: fixed;
		top: 0;
		/* Hangs over the last grid column's right edge */
		right: calc(max(var(--pad), (100vw - var(--max)) / 2 + var(--pad)) - 6px);
		z-index: 125;
		width: 44px;
		height: 92px;
		padding: 0;
		border: 0;
		background: none;
		cursor: pointer;
		color: var(--text);
		transform: scale(1.3);
		transform-origin: top center;
		touch-action: none;
		-webkit-tap-highlight-color: transparent;
	}
	.lamp:focus-visible {
		outline: none;
	}
	.lamp:focus-visible .shade {
		stroke: var(--accent);
		stroke-width: 1;
	}

	.hang,
	.swing {
		position: absolute;
		inset: 0;
		transform-origin: 22px 0;
	}
	.hang {
		transition: transform 0.6s var(--ease-out);
	}
	.lamp:hover .hang {
		transform: rotate(-4deg);
	}

	svg {
		position: relative;
		display: block;
		overflow: visible;
	}

	/* ── Parts ── */
	.cord,
	.pull-cord {
		stroke: var(--text-secondary);
		stroke-width: 1.1;
		stroke-linecap: round;
	}
	.pull-cord {
		fill: none;
		stroke-width: 0.9;
	}
	.pull-knob {
		fill: var(--text-secondary);
		transform-box: fill-box;
		transform-origin: center;
		transition:
			fill 0.2s ease,
			transform 0.25s var(--ease-out);
	}
	.lamp:hover .pull-knob {
		fill: var(--text);
		cursor: grab;
	}
	/* Stretched far enough: the knob glows to say "let go" */
	.lamp.stretched .pull-knob {
		fill: var(--amber);
		transform: scale(1.35);
	}
	.shade {
		fill: var(--text);
		transition: fill 0.3s ease;
	}
	.bulb {
		fill: var(--text-secondary);
		opacity: 0.55;
		transition:
			fill 0.3s ease,
			opacity 0.3s ease;
	}
	.halo {
		opacity: 0;
		transition: opacity 0.4s ease;
	}
	.eyes {
		transition: opacity 0.25s ease;
	}
	.eyes-open {
		fill: var(--bg);
		transform-box: fill-box;
		transform-origin: center;
		opacity: 0;
	}
	.eyes-closed,
	.blush {
		fill: none;
		stroke: var(--bg);
		stroke-width: 1.2;
		stroke-linecap: round;
	}
	.blush {
		stroke: #e8907a;
		stroke-width: 1.4;
		opacity: 0;
		transition: opacity 0.3s ease;
	}

	/*
	 * Light under the bulb, swinging with the lamp. A soft, blurred cone that fades
	 * out sideways and downward — a gentle wash, not a hard-edged spotlight.
	 */
	.beam {
		position: absolute;
		top: 54px;
		left: 50%;
		width: 220px;
		height: 260px;
		translate: -50% 0;
		pointer-events: none;
		background: radial-gradient(
			60% 85% at 50% 0%,
			color-mix(in srgb, var(--lamp-glow) 32%, transparent),
			color-mix(in srgb, var(--lamp-glow) 7%, transparent) 40%,
			transparent 70%
		);
		clip-path: polygon(44% 0, 56% 0, 100% 100%, 0 100%);
		filter: blur(10px);
		mask-image: linear-gradient(to bottom, #000 20%, transparent 95%);
		mix-blend-mode: multiply;
		opacity: 0;
		transform-origin: 50% 0;
		transition: opacity 0.6s ease;
	}

	/* ── Awake (light theme): lit bulb, eyes open, blinking ── */
	.awake .bulb {
		fill: var(--lamp-glow);
		opacity: 1;
		animation: flicker 0.6s steps(1) both;
	}
	.awake .halo {
		opacity: 0.35;
	}
	/* Settled: a faint glow that breathes slowly */
	.awake .beam {
		opacity: 0.14;
		animation: glow 6s ease-in-out infinite;
	}
	/* Switching on: the light sputters, flares, then eases down to the dim glow */
	.awake.igniting .beam {
		animation:
			ignite 1.8s var(--ease-out) both,
			glow 6s ease-in-out 1.8s infinite;
	}
	.awake.igniting .halo {
		animation: ignite-halo 1.8s var(--ease-out) both;
	}
	@keyframes ignite {
		0% {
			opacity: 0;
			transform: scaleY(0.35) scaleX(0.6);
		}
		8% {
			opacity: 0.22;
		}
		12% {
			opacity: 0.03;
		}
		20% {
			opacity: 0.3;
			transform: scaleY(0.85) scaleX(0.9);
		}
		26% {
			opacity: 0.1;
		}
		40% {
			opacity: 0.34;
			transform: none;
		}
		100% {
			opacity: 0.14;
			transform: none;
		}
	}
	@keyframes ignite-halo {
		0%,
		12% {
			opacity: 0;
		}
		20% {
			opacity: 0.55;
		}
		26% {
			opacity: 0.15;
		}
		40% {
			opacity: 0.65;
		}
		100% {
			opacity: 0.35;
		}
	}
	@keyframes glow {
		0%,
		100% {
			opacity: 0.14;
		}
		50% {
			opacity: 0.18;
		}
	}
	.awake .eyes-open {
		opacity: 1;
		animation: blink 5s ease-in-out 1s infinite;
	}
	.awake .eyes-closed {
		opacity: 0;
	}
	.awake .blush {
		opacity: 0.8;
	}

	/* ── Asleep (dark theme): slow breathing sway + floating z's ── */
	.lamp:not(.awake) .swing:not(.swinging) {
		animation: breathe 5.5s ease-in-out infinite;
	}

	.zzz {
		position: absolute;
		top: 22px;
		left: 34px;
		width: 30px;
		height: 30px;
		pointer-events: none;
		font-size: 8px;
		font-weight: 600;
		line-height: 1;
		color: var(--text-secondary);
		opacity: 0;
		transition: opacity 0.3s ease;
	}
	.zzz span {
		position: absolute;
		left: 0;
		bottom: 0;
		opacity: 0;
	}
	.lamp:not(.awake) .zzz {
		opacity: 1;
	}
	.lamp:not(.awake) .zzz span {
		animation: snooze 3.6s ease-in-out infinite;
	}
	.zzz span:nth-child(2) {
		font-size: 10px;
		animation-delay: 1.2s !important;
	}
	.zzz span:nth-child(3) {
		font-size: 12px;
		animation-delay: 2.4s !important;
	}

	/* ── Pull interaction ── */
	.swinging {
		animation: swing 1.5s var(--ease-out);
	}
	@keyframes swing {
		0% {
			transform: rotate(0);
		}
		15% {
			transform: rotate(9deg);
		}
		35% {
			transform: rotate(-6deg);
		}
		55% {
			transform: rotate(3.5deg);
		}
		75% {
			transform: rotate(-1.5deg);
		}
		100% {
			transform: rotate(0);
		}
	}
	@keyframes breathe {
		0%,
		100% {
			transform: rotate(-1.6deg);
		}
		50% {
			transform: rotate(1.6deg);
		}
	}
	@keyframes blink {
		0%,
		92%,
		100% {
			transform: scaleY(1);
		}
		95% {
			transform: scaleY(0.1);
		}
	}
	@keyframes flicker {
		0% {
			opacity: 0.3;
		}
		15% {
			opacity: 1;
		}
		30% {
			opacity: 0.4;
		}
		45%,
		100% {
			opacity: 1;
		}
	}
	@keyframes snooze {
		0% {
			opacity: 0;
			transform: translate(0, 0) scale(0.6);
		}
		25% {
			opacity: 1;
		}
		100% {
			opacity: 0;
			transform: translate(14px, -22px) scale(1);
		}
	}

	:global([data-theme='dark']) .beam {
		mix-blend-mode: screen;
	}

	/* ── "pull me!" note ── */
	.hint {
		position: absolute;
		top: 92px;
		right: 40px;
		display: flex;
		align-items: flex-end;
		gap: 2px;
		pointer-events: none;
		color: var(--text-secondary);
		transform: scale(calc(1 / 1.3));
		transform-origin: top right;
		animation: hint-in 0.8s var(--ease-out) 1.4s both;
		transition: opacity 0.35s ease;
	}
	/* Out of the way once the page scrolls, so it never sits on content */
	.hint.away {
		opacity: 0;
	}
	.hint-text {
		font-family: var(--font-hand);
		font-size: 22px;
		font-weight: 600;
		line-height: 1;
		white-space: nowrap;
		rotate: -6deg;
		translate: 0 10px;
	}
	.hint svg {
		fill: none;
		stroke: currentColor;
		stroke-width: 1.6;
		stroke-linecap: round;
		stroke-linejoin: round;
		stroke-dasharray: 80;
		animation: draw 0.9s var(--ease-out) 1.8s both;
	}
	@keyframes hint-in {
		from {
			opacity: 0;
			translate: 6px 6px;
		}
	}
	@keyframes draw {
		from {
			stroke-dashoffset: 80;
		}
	}

	@media (max-width: 1023px) {
		.lamp {
			transform: scale(1);
		}
		.hint {
			transform: none;
		}
	}
	@media (max-width: 600px) {
		.hint {
			display: none;
		}
	}
</style>
