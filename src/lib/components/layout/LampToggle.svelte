<script lang="ts">
	import { settings } from '#lib/stores/settings.svelte.ts';

	// Light theme = lamp awake and lit. Dark theme = lamp off, asleep (eyes shut, z's).
	const awake = $derived(settings.resolved === 'light');

	let bulb: SVGPathElement;
	let pulling = $state(false);
	let swinging = $state(false);
	let toggleTimer: ReturnType<typeof setTimeout> | undefined;

	function restart(set: (v: boolean) => void) {
		set(false);
		// Two frames so the class removal is painted and the animation restarts.
		requestAnimationFrame(() => requestAnimationFrame(() => set(true)));
	}

	function pull() {
		restart((v) => (pulling = v));
		restart((v) => (swinging = v));

		// Flip the theme when the cord bottoms out, revealing it from the bulb.
		clearTimeout(toggleTimer);
		toggleTimer = setTimeout(() => {
			const r = bulb.getBoundingClientRect();
			settings.toggleTheme({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
		}, 160);
	}
</script>

<button
	type="button"
	class="lamp"
	class:awake
	aria-label={awake ? 'Turn the lamp off (dark mode)' : 'Turn the lamp on (light mode)'}
	aria-pressed={!awake}
	title={awake ? 'Lights out' : 'Wake the lamp'}
	onclick={pull}
>
	<span class="hang">
		<span class="swing" class:swinging onanimationend={() => (swinging = false)}>
			<span class="beam" aria-hidden="true"></span>

			<svg viewBox="0 0 44 92" width="44" height="92" aria-hidden="true">
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
				<g class="pull" class:pulling onanimationend={() => (pulling = false)}>
					<line class="pull-cord" x1="32" y1="55" x2="32" y2="74" />
					<circle class="pull-knob" cx="32" cy="76" r="2.2" />
				</g>

				<path
					class="shade"
					d="M17 36.5h10c.8 0 1.5.5 1.8 1.2l6.6 15.4c.4 1-.3 2-1.3 2H9.9c-1 0-1.7-1-1.3-2l6.6-15.4c.3-.7 1-1.2 1.8-1.2Z"
				/>
				<path bind:this={bulb} class="bulb" d="M17.5 55.2a4.5 4.5 0 0 0 9 0Z" />

				<!-- Face -->
				<g class="eyes eyes-open">
					<ellipse cx="17.6" cy="47.6" rx="1.35" ry="1.6" />
					<ellipse cx="26.4" cy="47.6" rx="1.35" ry="1.6" />
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
</button>

<style>
	.lamp {
		position: fixed;
		top: 0;
		right: 58px;
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
		stroke-width: 0.9;
	}
	.pull-knob {
		fill: var(--text-secondary);
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
	.pulling {
		animation: tug 0.42s cubic-bezier(0.3, 0, 0.2, 1);
	}

	@keyframes tug {
		0% {
			transform: translateY(0);
		}
		40% {
			transform: translateY(8px);
		}
		70% {
			transform: translateY(-1.5px);
		}
		100% {
			transform: translateY(0);
		}
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

	@media (max-width: 1023px) {
		.lamp {
			right: 56px;
			transform: scale(1);
		}
	}
	@media (max-width: 480px) {
		.lamp {
			right: max(62px, calc(env(safe-area-inset-right) + 50px));
		}
	}
</style>
