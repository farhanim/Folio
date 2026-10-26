<script lang="ts">
	import type { WorkItem } from '#lib/types/index.ts';

	let { item, hidden = false }: { item: WorkItem; hidden?: boolean } = $props();
</script>

<a
	class="item"
	href={item.href}
	tabindex={hidden ? -1 : undefined}
	aria-label="{item.title} · {item.subtitle}"
>
	{#if item.art.kind === 'image'}
		<span class="art" class:contain={item.art.fit === 'contain'}>
			<img src={item.art.src} alt="" loading="lazy" decoding="async" />
		</span>
	{:else}
		<!-- Wordmark plate: the word types on behind a block caret, holds, then clears -->
		<span class="art plate">
			<span class="typed">
				<span class="letters">{item.art.word}</span><span class="caret"></span>
			</span>
		</span>
	{/if}
	<span class="caption"><b>{item.title}</b><span>{item.subtitle}</span></span>
</a>

<style>
	.item {
		display: block;
		flex: none;
		width: 100%;
		color: var(--text);
		text-decoration: none;
	}
	.item:focus-visible {
		outline-offset: -2px;
	}

	.art {
		position: relative;
		display: block;
		width: 100%;
		aspect-ratio: 16 / 10;
		overflow: hidden;
		background: var(--surface);
		transition: background-color 0.3s ease;
	}
	.art img {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
		pointer-events: none;
		transition: transform 0.8s var(--ease-out);
	}
	.art.contain img {
		object-fit: contain;
	}
	.item:hover .art img {
		transform: scale(1.025);
	}

	.plate {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.typed {
		position: relative;
		display: inline-block;
		font-size: clamp(48px, 7vw, 120px);
		font-weight: 600;
		letter-spacing: -0.05em;
		line-height: 1;
		color: var(--text);
	}
	.letters {
		display: inline-block;
		animation: type 6s steps(1) infinite;
	}
	.caret {
		position: absolute;
		bottom: 0.02em;
		left: 100%;
		width: 0.42em;
		height: 0.09em;
		margin-left: 0.06em;
		background: currentColor;
		animation:
			caret-move 6s infinite,
			caret-blink 1.2s ease-in-out infinite;
	}
	/* Revealed in five even steps (tuned for a ~5 letter word); the caret rides the leading edge. */
	@keyframes type {
		0% {
			clip-path: inset(0 100% 0 0);
		}
		6% {
			clip-path: inset(0 80% 0 0);
		}
		10% {
			clip-path: inset(0 60% 0 0);
		}
		14% {
			clip-path: inset(0 40% 0 0);
		}
		18% {
			clip-path: inset(0 20% 0 0);
		}
		23%,
		88% {
			clip-path: inset(0 0 0 0);
		}
		92%,
		100% {
			clip-path: inset(0 100% 0 0);
		}
	}
	@keyframes caret-move {
		0% {
			left: 0;
			animation-timing-function: steps(1);
		}
		6% {
			left: 20%;
			animation-timing-function: steps(1);
		}
		10% {
			left: 40%;
			animation-timing-function: steps(1);
		}
		14% {
			left: 60%;
			animation-timing-function: steps(1);
		}
		18% {
			left: 80%;
			animation-timing-function: steps(1);
		}
		23%,
		88% {
			left: 100%;
			animation-timing-function: steps(1);
		}
		92%,
		100% {
			left: 0;
		}
	}
	@keyframes caret-blink {
		0%,
		49% {
			opacity: 1;
		}
		50%,
		100% {
			opacity: 0;
		}
	}

	.caption {
		display: flex;
		align-items: baseline;
		gap: 10px;
		padding: 10px 2px 0;
		font-size: 12px;
		line-height: 1.35;
		letter-spacing: -0.01em;
	}
	.caption b {
		font-weight: 500;
	}
	.caption span {
		color: var(--text-secondary);
		font-weight: 400;
	}

	@media (max-width: 1023px) {
		.item {
			width: clamp(260px, 78vw, 560px);
		}
		.art {
			aspect-ratio: 4 / 3;
		}
		.caption {
			gap: 8px;
		}
	}
</style>
