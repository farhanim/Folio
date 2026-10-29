<script lang="ts">
	import { fly } from 'svelte/transition';
	import { page } from '$app/state';

	/**
	 * Floating sticker, bottom-right (above the dock on phones): takes a recruiter straight to
	 * the contact section, where the CV and email are. Text spins on the ring; a label beside
	 * it switches copy. Hovering speeds the ring up and holds the label. It steps aside once
	 * the contact section is on screen.
	 */
	const lines = ['Hiring? Let’s talk', 'Get my CV', 'Open to full-time roles'];
	const id = $props.id();

	let index = $state(0);
	let paused = $state(false);
	let atContact = $state(false);

	const href = $derived(page.url.pathname === '/' ? '#contact' : '/#contact');

	$effect(() => {
		void page.url.pathname;
		atContact = false;
		const target = document.getElementById('contact');
		if (!target) return;
		const io = new IntersectionObserver(([e]) => (atContact = e.isIntersecting), {
			rootMargin: '0px 0px -20% 0px'
		});
		io.observe(target);
		return () => io.disconnect();
	});

	$effect(() => {
		if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		const timer = setInterval(() => {
			if (!paused && !document.hidden) index = (index + 1) % lines.length;
		}, 3400);
		return () => clearInterval(timer);
	});
</script>

<a
	class="cta"
	{href}
	class:away={atContact}
	aria-label="Contact me or get my CV"
	onpointerenter={() => (paused = true)}
	onpointerleave={() => (paused = false)}
>
	<span class="pill" aria-hidden="true">
		{#key index}
			<span in:fly={{ y: 24, duration: 420 }} out:fly={{ y: -24, duration: 300 }}
				>{lines[index]}</span
			>
		{/key}
	</span>

	<span class="sticker" aria-hidden="true">
		<svg viewBox="0 0 120 120">
			<defs>
				<path id="cta-ring-{id}" d="M60 60m-45 0a45 45 0 1 1 90 0a45 45 0 1 1-90 0" />
			</defs>
			<circle class="disc" cx="60" cy="60" r="58" />
			<g class="ring">
				<text
					><textPath href="#cta-ring-{id}" textLength="280"
						>Hiring · Get my CV · Let’s talk ·
					</textPath></text
				>
			</g>
			<circle class="pulse" cx="60" cy="60" r="24" />
			<circle class="core" cx="60" cy="60" r="24" />
			<path
				class="spark"
				d="M60 42c1.4 9.4 4.3 14 13.6 18.8-9.3 4.8-12.2 9.4-13.6 18.8-1.4-9.4-4.3-14-13.6-18.8 9.3-4.8 12.2-9.4 13.6-18.8Z"
			/>
		</svg>
	</span>
</a>

<style>
	.cta {
		position: fixed;
		right: var(--pad);
		bottom: max(14px, env(safe-area-inset-bottom));
		z-index: 105;
		display: flex;
		align-items: center;
		color: var(--text);
		text-decoration: none;
		animation: cta-in 1s var(--ease-out) 0.8s both;
	}
	/* Label: a glass pill tucked behind the sticker */
	.pill {
		display: grid;
		overflow: hidden;
		height: 36px;
		margin-right: -18px;
		padding: 0 28px 0 14px;
		border-radius: 999px;
		background: color-mix(in srgb, var(--bg) 78%, transparent);
		backdrop-filter: blur(12px);
		box-shadow:
			var(--shadow-float),
			0 0 0 1px var(--hairline);
		font-size: 12.5px;
		font-weight: 500;
		line-height: 36px;
		white-space: nowrap;
		transition: transform 0.5s var(--ease-out);
	}
	.pill span {
		grid-area: 1 / 1;
	}
	.sticker {
		position: relative;
		display: block;
		width: 84px;
		aspect-ratio: 1;
		filter: drop-shadow(0 10px 18px rgba(0, 0, 0, 0.18));
		transition: transform 0.6s var(--ease-out);
	}
	.cta:hover .sticker {
		transform: scale(1.06) rotate(-8deg);
	}
	.cta:hover .pill {
		transform: translateX(-4px);
	}
	svg {
		display: block;
		width: 100%;
		height: 100%;
		overflow: visible;
	}
	.disc {
		fill: var(--text);
	}
	text {
		fill: var(--bg);
		font-family: var(--font-mono);
		font-size: 9.6px;
		letter-spacing: 0.12em;
		text-transform: uppercase;
	}
	.ring {
		transform-origin: 60px 60px;
		animation: spin 16s linear infinite;
	}
	.cta:hover .ring {
		animation-duration: 5s;
	}
	.core {
		fill: var(--amber);
	}
	/* Sparkle turns slowly; a ring pulses out from the core to draw the eye */
	.spark {
		fill: #1a1a1a;
		transform-origin: 60px 60px;
		animation: spin 8s linear infinite reverse;
	}
	.pulse {
		fill: none;
		stroke: var(--amber);
		stroke-width: 3;
		transform-origin: 60px 60px;
		animation: pulse 2.4s var(--ease-out) infinite;
	}
	@keyframes pulse {
		from {
			opacity: 0.9;
			transform: scale(1);
		}
		to {
			opacity: 0;
			transform: scale(1.75);
		}
	}
	.cta:hover .spark {
		animation-duration: 2.5s;
	}
	.cta {
		transition:
			opacity 0.4s ease,
			translate 0.5s var(--ease-out);
	}
	.cta.away {
		opacity: 0;
		translate: 0 24px;
		pointer-events: none;
	}
	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}
	@keyframes cta-in {
		from {
			opacity: 0;
			transform: scale(0.6) rotate(-30deg);
		}
	}

	/* Below the 1024 layout the dock is wide, so the sticker sits just above it */
	@media (max-width: 1023px) {
		.cta {
			bottom: calc(max(18px, env(safe-area-inset-bottom)) + 58px);
		}
		.sticker {
			width: 68px;
		}
		.pill {
			height: 32px;
			line-height: 32px;
			font-size: 11.5px;
		}
	}
</style>
