<script lang="ts">
	/** A rotating circular sticker with text on a ring and a spinning sparkle in the middle. */
	let { text, href }: { text: string; href: string } = $props();
	const id = $props.id();
</script>

<a class="badge" {href} aria-label={text}>
	<svg viewBox="0 0 120 120" aria-hidden="true">
		<defs>
			<path id="ring-{id}" d="M60 60m-46 0a46 46 0 1 1 92 0a46 46 0 1 1-92 0" />
		</defs>
		<circle class="disc" cx="60" cy="60" r="58" />
		<g class="ring">
			<text>
				<textPath href="#ring-{id}" textLength="286">{text}</textPath>
			</text>
		</g>
		<g class="star">
			<path
				d="M60 38c1.6 11 5 16.4 16 22-11 5.6-14.4 11-16 22-1.6-11-5-16.4-16-22 11-5.6 14.4-11 16-22Z"
			/>
		</g>
	</svg>
</a>

<style>
	.badge {
		display: block;
		width: 132px;
		aspect-ratio: 1;
		color: var(--text);
		transition: transform 0.6s var(--ease-out);
	}
	.badge:hover {
		transform: scale(1.06) rotate(-8deg);
	}
	svg {
		display: block;
		width: 100%;
		height: 100%;
		overflow: visible;
	}
	.disc {
		fill: var(--card);
		stroke: var(--rule);
		stroke-width: 0.8;
	}
	text {
		fill: currentColor;
		font-family: var(--font-mono);
		font-size: 9.2px;
		letter-spacing: 0.12em;
		text-transform: uppercase;
	}
	.ring,
	.star {
		transform-origin: 60px 60px;
	}
	.ring {
		animation: spin 18s linear infinite;
	}
	.badge:hover .ring {
		animation-duration: 6s;
	}
	.star {
		fill: var(--amber);
		animation: spin 9s linear infinite reverse;
	}
	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}
</style>
