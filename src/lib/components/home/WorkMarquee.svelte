<script lang="ts">
	import { onMount } from 'svelte';
	import type { WorkItem } from '#lib/types/index.ts';
	import WorkCard from './WorkCard.svelte';

	/**
	 * Selected work: a column drifting upward on desktop, a sideways strip on mobile.
	 * The list is rendered twice so the scroll position can wrap seamlessly.
	 * Pauses on hover/focus/touch; after a manual scroll it resumes from there.
	 */
	let { items }: { items: WorkItem[] } = $props();

	let viewport: HTMLDivElement;
	let group: HTMLDivElement;

	onMount(() => {
		const mobile = matchMedia('(max-width: 1023px)');
		const reduced = matchMedia('(prefers-reduced-motion: reduce)');
		const finePointer = matchMedia('(hover: hover) and (pointer: fine)');

		let hovering = false;
		let focused = false;
		let onScreen = true;
		let pointerDown = false;
		let resumeAt = 0;
		let frame = 0;
		let previous = 0;
		let position = 0;
		let distance = 0;
		let axis: 'scrollTop' | 'scrollLeft' = mobile.matches ? 'scrollLeft' : 'scrollTop';
		let resumeTimer: ReturnType<typeof setTimeout>;

		const paused = () =>
			reduced.matches ||
			document.hidden ||
			!onScreen ||
			hovering ||
			focused ||
			pointerDown ||
			performance.now() < resumeAt;

		function stop() {
			cancelAnimationFrame(frame);
			frame = 0;
			previous = 0;
		}
		function tick(now: number) {
			frame = 0;
			if (paused() || distance <= 0) return stop();
			const elapsed = previous ? Math.min(now - previous, 48) : 0;
			previous = now;
			position = (position + elapsed * (mobile.matches ? 0.032 : 0.027)) % distance;
			viewport[axis] = position;
			frame = requestAnimationFrame(tick);
		}
		function start() {
			if (paused() || frame || distance <= 0) return;
			position = viewport[axis] % distance;
			previous = 0;
			frame = requestAnimationFrame(tick);
		}
		function measure() {
			const nextAxis = mobile.matches ? 'scrollLeft' : 'scrollTop';
			if (axis !== nextAxis) {
				viewport.scrollLeft = viewport.scrollTop = position = 0;
				axis = nextAxis;
			}
			const box = group.getBoundingClientRect();
			distance = mobile.matches ? box.width : box.height;
			start();
		}
		function manualScroll() {
			resumeAt = performance.now() + 2200;
			stop();
			clearTimeout(resumeTimer);
			resumeTimer = setTimeout(start, 2250);
		}

		const on = <K extends keyof HTMLElementEventMap>(
			type: K,
			fn: (e: HTMLElementEventMap[K]) => void
		) => viewport.addEventListener(type, fn, { passive: true });

		on('pointerenter', () => {
			if (finePointer.matches) {
				hovering = true;
				stop();
			}
		});
		on('pointerleave', () => {
			hovering = false;
			start();
		});
		on('focusin', (e) => {
			focused = (e.target as HTMLElement).matches(':focus-visible');
			if (focused) stop();
		});
		on('focusout', () =>
			queueMicrotask(() => {
				focused =
					viewport.contains(document.activeElement) &&
					!!document.activeElement?.matches(':focus-visible');
				if (!focused) start();
			})
		);
		on('wheel', manualScroll);
		on('pointerdown', () => {
			pointerDown = true;
			stop();
		});
		const release = () => {
			if (!pointerDown) return;
			pointerDown = false;
			manualScroll();
		};
		addEventListener('pointerup', release);
		addEventListener('pointercancel', release);

		const io = new IntersectionObserver(([entry]) => {
			onScreen = entry.isIntersecting;
			if (onScreen) start();
			else stop();
		});
		io.observe(viewport);
		const ro = new ResizeObserver(measure);
		ro.observe(group);
		const onVisibility = () => (document.hidden ? stop() : start());
		document.addEventListener('visibilitychange', onVisibility);
		mobile.addEventListener('change', measure);

		return () => {
			stop();
			clearTimeout(resumeTimer);
			io.disconnect();
			ro.disconnect();
			removeEventListener('pointerup', release);
			removeEventListener('pointercancel', release);
			document.removeEventListener('visibilitychange', onVisibility);
			mobile.removeEventListener('change', measure);
		};
	});
</script>

<figure class="marquee" aria-label="Selected work">
	<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
	<div
		class="window"
		tabindex="0"
		role="region"
		aria-label="Browse selected work"
		bind:this={viewport}
	>
		<div class="track">
			<div class="group" bind:this={group}>
				{#each items as item (item.title + item.subtitle)}
					<WorkCard {item} />
				{/each}
			</div>
			<div class="group" aria-hidden="true">
				{#each items as item (item.title + item.subtitle)}
					<WorkCard {item} hidden />
				{/each}
			</div>
		</div>
	</div>
	<span class="fade fade-start" aria-hidden="true"></span>
	<span class="fade fade-end" aria-hidden="true"></span>
</figure>

<style>
	.marquee {
		position: relative;
		grid-column: 1 / -1;
		min-width: 0;
		margin: 0;
	}

	.window {
		width: 100%;
		height: max(360px, calc(100svh - 164px));
		overflow: hidden auto;
		scrollbar-width: none;
		overflow-anchor: none;
	}
	.window::-webkit-scrollbar {
		display: none;
	}
	.window:focus-visible {
		outline: 2px solid var(--accent);
		outline-offset: 3px;
	}

	.track,
	.group {
		display: flex;
		flex-direction: column;
		width: 100%;
	}
	.group {
		flex: none;
		gap: 28px;
		padding-bottom: 28px;
	}

	/* Frosted edges: the work dissolves into the page as it enters and leaves */
	.fade {
		position: absolute;
		left: -24px;
		right: 0;
		z-index: 2;
		height: clamp(96px, 14svh, 144px);
		pointer-events: none;
		backdrop-filter: blur(6px);
	}
	.fade-start {
		top: 0;
		background: linear-gradient(
			to bottom,
			var(--bg),
			color-mix(in srgb, var(--bg) 68%, transparent) 12%,
			color-mix(in srgb, var(--bg) 18%, transparent) 42%,
			transparent 85%
		);
		mask-image: linear-gradient(to bottom, #000 30%, transparent);
	}
	.fade-end {
		bottom: 0;
		background: linear-gradient(
			to top,
			var(--bg),
			color-mix(in srgb, var(--bg) 68%, transparent) 12%,
			color-mix(in srgb, var(--bg) 18%, transparent) 42%,
			transparent 85%
		);
		mask-image: linear-gradient(to top, #000 30%, transparent);
	}

	/* Desktop: fixed image field from the module-4 grid line, bleeding off the right edge */
	@media (min-width: 1024px) {
		.marquee {
			position: fixed;
			inset: 0 0 0 632px;
			height: 100dvh;
		}
		.window {
			height: 100%;
		}
	}
	@media (min-width: 1440px) {
		.marquee {
			left: 836px;
		}
	}

	/* Mobile: full-bleed horizontal strip above the copy */
	@media (max-width: 1023px) {
		.marquee {
			order: -1;
			width: 100vw;
			margin-left: calc(-1 * var(--pad));
		}
		.window {
			height: auto;
			overflow: auto hidden;
			mask-image: linear-gradient(to right, #000, #000 calc(100% - 30px), transparent);
		}
		.track,
		.group {
			flex-direction: row;
			width: max-content;
		}
		.group {
			gap: 20px;
			padding: 0 20px 8px 0;
		}
		.fade {
			display: none;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.group[aria-hidden='true'] {
			display: none;
		}
	}
</style>
