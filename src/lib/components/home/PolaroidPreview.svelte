<script lang="ts">
	import { polaroid } from './polaroid.svelte.ts';

	let el: HTMLDivElement | undefined = $state();

	// Sit just off the pointer, flipping above/left when it would leave the viewport.
	const position = $derived.by(() => {
		if (typeof window === 'undefined') return 'none';
		const width = el?.offsetWidth ?? 280;
		const height = el?.offsetHeight ?? 250;
		const gap = 18;
		const edge = 22;
		let left = polaroid.x + gap;
		let top = polaroid.y + gap;
		if (left + width + edge > innerWidth) left = polaroid.x - width - gap;
		if (top + height + edge > innerHeight) top = polaroid.y - height - gap;
		left = Math.max(edge, Math.min(left, innerWidth - width - edge));
		top = Math.max(edge, Math.min(top, innerHeight - height - edge));
		return `translate3d(${Math.round(left)}px, ${Math.round(top)}px, 0)`;
	});
</script>

<svelte:window
	onscroll={() => (polaroid.visible = false)}
	onresize={() => (polaroid.visible = false)}
	onkeydown={(e) => e.key === 'Escape' && (polaroid.visible = false)}
/>

<div
	class="preview"
	class:visible={polaroid.visible && polaroid.src}
	style:transform={position}
	style:--tilt={polaroid.tilt}
	aria-hidden="true"
	bind:this={el}
>
	<div class="paper">
		<span class="photo">
			{#if polaroid.src}<img src={polaroid.src} alt="" decoding="async" />{/if}
		</span>
	</div>
</div>

<style>
	.preview {
		position: fixed;
		left: 0;
		top: 0;
		z-index: 130;
		width: clamp(260px, 23vw, 310px);
		pointer-events: none;
		visibility: hidden;
		opacity: 0;
		transition:
			opacity 140ms ease,
			visibility 140ms;
	}
	.preview.visible {
		visibility: visible;
		opacity: 1;
	}

	.paper {
		position: relative;
		padding: 10px 10px 34px;
		border: 1px solid #e4e0d7;
		border-radius: 2px;
		background: linear-gradient(125deg, #fffefa, #f6f3eb 65%, #ede9df);
		transform: translateY(5px) rotate(var(--tilt)) scale(0.98);
		transform-origin: 30% 20%;
		transition: transform 220ms cubic-bezier(0.2, 0.7, 0.2, 1);
		box-shadow:
			0 1px 1px rgb(0 0 0 / 0.22),
			2px 5px 8px -3px rgb(0 0 0 / 0.28),
			8px 20px 32px -12px rgb(0 0 0 / 0.38),
			20px 36px 60px -24px rgb(0 0 0 / 0.3),
			inset 0 1px 0 rgb(255 255 255 / 0.85);
	}
	.visible .paper {
		transform: translateY(0) rotate(var(--tilt)) scale(1);
	}
	:global([data-theme='dark']) .paper {
		box-shadow:
			0 1px 2px rgb(0 0 0 / 0.4),
			2px 6px 10px -3px rgb(0 0 0 / 0.55),
			8px 22px 36px -12px rgb(0 0 0 / 0.65),
			20px 36px 60px -24px rgb(0 0 0 / 0.5),
			inset 0 1px 0 rgb(255 255 255 / 0.85);
	}

	.photo {
		position: relative;
		display: block;
		aspect-ratio: 4 / 3;
		overflow: hidden;
		background: #d9d6cf;
	}
	.photo img {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	.photo::after {
		content: '';
		position: absolute;
		inset: 0;
		border: 1px solid rgb(0 0 0 / 0.14);
		background: linear-gradient(
			135deg,
			rgb(255 255 255 / 0.055),
			transparent 45%,
			rgb(0 0 0 / 0.035)
		);
		box-shadow: inset 0 1px 3px rgb(0 0 0 / 0.1);
	}

	@media (max-width: 1023px), (hover: none), (pointer: coarse) {
		.preview {
			display: none;
		}
	}
</style>
