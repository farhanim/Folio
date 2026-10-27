<script lang="ts">
	import { settings } from '#lib/stores/settings.svelte.ts';

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

	// ── Elastic pull cord ─────────────────────────────────────────────
	// The cord rests short, grows when hovered, stretches while dragged and
	// recoils on a spring. Lengths are in SVG units below the shade (y = 55).
	const REST = 7;
	const HOVER = 17;
	const PULL_AT = 20; // drag past this and letting go switches the theme
	let cord = $state({ len: REST, sway: 0 });
	let velocity = { len: 0, sway: 0 };
	let hovered = $state(false);
	let drag: { y: number; x: number; scale: number; active: boolean } | null = null;
	let dragTarget = { len: REST, sway: 0 };
	let suppressClick = false;
	let frame = 0;

	const target = () => (drag?.active ? dragTarget : { len: hovered ? HOVER : REST, sway: 0 });

	function animate() {
		if (frame) return;
		let last = performance.now();
		const step = (now: number) => {
			const dt = Math.min((now - last) / 1000, 1 / 30);
			last = now;
			const t = target();
			// Stiff on length (snappy recoil), looser on sway (it wobbles a little).
			velocity.len += (320 * (t.len - cord.len) - 14 * velocity.len) * dt;
			velocity.sway += (180 * (t.sway - cord.sway) - 9 * velocity.sway) * dt;
			cord = { len: cord.len + velocity.len * dt, sway: cord.sway + velocity.sway * dt };
			const settled =
				Math.abs(t.len - cord.len) + Math.abs(t.sway - cord.sway) < 0.02 &&
				Math.abs(velocity.len) + Math.abs(velocity.sway) < 0.05;
			if (settled && !drag?.active) {
				cord = { ...t };
				frame = 0;
				return;
			}
			frame = requestAnimationFrame(step);
		};
		frame = requestAnimationFrame(step);
	}

	function kick(len: number, sway = 0) {
		velocity.len += len;
		velocity.sway += sway;
		animate();
	}

	function onpointerdown(e: PointerEvent) {
		if (e.button !== 0) return;
		const r = svg.getBoundingClientRect();
		drag = { y: e.clientY, x: e.clientX, scale: r.height / 92, active: false };
		(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
	}

	function onDragMove(e: PointerEvent) {
		if (!drag) return;
		const dy = (e.clientY - drag.y) / drag.scale;
		const dx = (e.clientX - drag.x) / drag.scale;
		if (!drag.active && Math.hypot(dx, dy) < 4) return;
		drag.active = true;
		// Rubber band: easy at first, then increasingly stiff.
		const stretch = Math.max(0, dy);
		dragTarget = {
			len: REST + 40 * Math.log1p(stretch / 40),
			sway: Math.max(-7, Math.min(7, dx * 0.25))
		};
		animate();
	}

	function onpointerup() {
		if (!drag) return;
		const wasDragging = drag.active;
		drag = null;
		if (!wasDragging) return;
		suppressClick = true;
		if (cord.len - REST > PULL_AT) {
			switchTheme();
			kick(-180); // the cord snaps back up when released
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
		if (lastAwake !== undefined && lastAwake !== awake) kick(120, 30);
		lastAwake = awake;
	});

	/** Click or keyboard: a quick tug down, then the theme flips as the cord bottoms out. */
	function pull() {
		kick(420);
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

	const cordPath = $derived(
		`M32 55 Q${32 + cord.sway * 0.4} ${55 + cord.len / 2} ${32 + cord.sway} ${55 + cord.len}`
	);
</script>

<svelte:window {onpointermove} {onkeydown} />

<button
	type="button"
	class="lamp"
	class:awake
	aria-label={awake ? 'Turn the lamp off (dark mode)' : 'Turn the lamp on (light mode)'}
	aria-pressed={!awake}
	title={awake ? 'Lights out — click or pull the cord' : 'Wake the lamp — click or pull the cord'}
	class:stretched={cord.len - REST > PULL_AT}
	{onclick}
	{onpointerdown}
	onpointermove={onDragMove}
	{onpointerup}
	onpointercancel={onpointerup}
	onpointerenter={() => {
		hovered = true;
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
					<circle class="pull-knob" cx={32 + cord.sway} cy={57.2 + cord.len} r="2.2" />
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
		<span class="hint" aria-hidden="true">
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

	/* Light cone under the bulb, swings with the lamp */
	.beam {
		position: absolute;
		top: 56px;
		left: 50%;
		width: 240px;
		height: 300px;
		translate: -50% 0;
		pointer-events: none;
		background: linear-gradient(
			to bottom,
			color-mix(in srgb, var(--lamp-glow) 42%, transparent),
			color-mix(in srgb, var(--lamp-glow) 8%, transparent) 55%,
			transparent
		);
		clip-path: polygon(46% 0, 54% 0, 100% 100%, 0 100%);
		mix-blend-mode: multiply;
		opacity: 0;
		transition: opacity 0.45s ease;
	}

	/* ── Awake (light theme): lit bulb, eyes open, blinking ── */
	.awake .bulb {
		fill: var(--lamp-glow);
		opacity: 1;
		animation: flicker 0.6s steps(1) both;
	}
	.awake .halo {
		opacity: 1;
	}
	.awake .beam {
		opacity: 0.55;
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
