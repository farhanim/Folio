<script lang="ts">
	import { fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import Icon from '#lib/components/ui/Icon.svelte';
	import type { Project } from '#lib/types/index.ts';
	import { portal } from '#lib/utils/portal.ts';
	import ClientBadge from './ClientBadge.svelte';

	/**
	 * Fullscreen slideshow of a project: a cover slide, then one slide per block.
	 * Autoplays with a segmented progress bar; ←/→ to move, Space to pause, Esc to close.
	 */
	let {
		project,
		open = $bindable(false),
		start = 0
	}: { project: Project; open?: boolean; start?: number } = $props();

	const DURATION = 7000;
	const slides = $derived([
		{ kind: 'cover' as const, id: 'cover', title: 'Cover' },
		...project.blocks
	]);

	let index = $state(0);
	let direction = $state(1);
	let playing = $state(true);
	let progress = $state(0);
	let closeButton: HTMLButtonElement | undefined = $state();

	function go(to: number) {
		if (to < 0 || to >= slides.length) return;
		direction = to > index ? 1 : -1;
		index = to;
		progress = 0;
	}
	const next = () => (index === slides.length - 1 ? (playing = false) : go(index + 1));
	const prev = () => go(index - 1);

	// Open: jump to the requested slide, lock page scroll, focus the close button.
	$effect(() => {
		if (!open) return;
		index = Math.min(start, slides.length - 1);
		progress = 0;
		playing = !matchMedia('(prefers-reduced-motion: reduce)').matches;
		const overflow = document.documentElement.style.overflow;
		document.documentElement.style.overflow = 'hidden';
		queueMicrotask(() => closeButton?.focus());
		return () => (document.documentElement.style.overflow = overflow);
	});

	// Autoplay timer driving the progress bar.
	$effect(() => {
		if (!open || !playing) return;
		let last = performance.now();
		let frame = requestAnimationFrame(function tick(now) {
			progress += (now - last) / DURATION;
			last = now;
			if (progress >= 1) next();
			frame = requestAnimationFrame(tick);
		});
		return () => cancelAnimationFrame(frame);
	});

	function onkeydown(e: KeyboardEvent) {
		if (!open) return;
		if (e.key === 'Escape') open = false;
		else if (e.key === 'ArrowRight') next();
		else if (e.key === 'ArrowLeft') prev();
		else if (e.key === ' ') {
			e.preventDefault();
			playing = !playing;
		} else return;
		e.stopPropagation();
	}

	const slideIn = (node: Element) =>
		fly(node, { x: 60 * direction, duration: 500, easing: cubicOut });
	const slideOut = (node: Element) =>
		fly(node, { x: -60 * direction, duration: 300, easing: cubicOut });
</script>

<svelte:window {onkeydown} />

{#if open}
	<div
		class="slideshow"
		role="dialog"
		aria-modal="true"
		aria-label="{project.title} slideshow"
		use:portal
		transition:fly={{ y: 24, duration: 400, easing: cubicOut }}
	>
		<div class="progress" aria-hidden="true">
			{#each slides as slide, i (slide.id)}
				<button type="button" tabindex="-1" onclick={() => go(i)} aria-label="Go to {slide.title}">
					<span style:transform="scaleX({i < index ? 1 : i === index ? Math.min(progress, 1) : 0})"
					></span>
				</button>
			{/each}
		</div>

		<header class="top">
			<p><strong>{slides[index].title}</strong><span>{project.title}</span></p>
			<button
				type="button"
				class="round"
				bind:this={closeButton}
				onclick={() => (open = false)}
				aria-label="Close slideshow"
			>
				<Icon name="x" size={16} />
			</button>
		</header>

		<div class="stage">
			{#key index}
				{@const slide = slides[index]}
				<div class="slide kind-{slide.kind}" in:slideIn out:slideOut>
					{#if slide.kind === 'cover'}
						<div class="cover-copy">
							<span class="label"
								>{project.type === 'design' ? 'Design' : 'Code'} · {project.year ?? '—'}</span
							>
							<h2>{project.title}</h2>
							<p>{project.tagline}</p>
						</div>
						<div class="cover-art">
							<img src={project.cover} alt="" />
							<span class="badge"><ClientBadge client={project.client} /></span>
						</div>
					{:else if slide.kind === 'text'}
						<p class="big">{slide.body[0]}</p>
						{#if slide.body.length > 1}<p class="rest">{slide.body.slice(1).join(' ')}</p>{/if}
					{:else if slide.kind === 'stats'}
						<dl class="stats">
							{#each slide.items as item (item.label)}
								<div>
									<dt>{item.value}</dt>
									<dd>{item.label}</dd>
								</div>
							{/each}
						</dl>
					{:else if slide.kind === 'gallery'}
						<div class="gallery" style:--n={slide.images.length}>
							{#each slide.images as image (image.src)}
								<img src={image.src} alt={image.alt} />
							{/each}
						</div>
						{#if slide.caption}<p class="rest">{slide.caption}</p>{/if}
					{:else if slide.kind === 'quote'}
						<blockquote>
							<p>“{slide.quote}”</p>
							<footer>{slide.author} — {slide.role}</footer>
						</blockquote>
					{:else if slide.kind === 'code'}
						<pre><code>{slide.code}</code></pre>
						{#if slide.caption}<p class="rest">{slide.caption}</p>{/if}
					{:else if slide.kind === 'features'}
						<p class="big">{slide.items.map((f) => f.title).join(' · ')}</p>
					{:else if slide.kind === 'impact'}
						<p class="big">{slide.items[0]}</p>
					{:else if slide.kind === 'stack'}
						<p class="big">{slide.groups.flatMap((g) => g.items.map((i) => i.name)).join(' · ')}</p>
					{/if}
				</div>
			{/key}
		</div>

		<footer class="controls">
			<button
				type="button"
				class="round"
				onclick={prev}
				disabled={index === 0}
				aria-label="Previous slide"
			>
				<Icon name="chevronLeft" size={16} />
			</button>
			<button
				type="button"
				class="round"
				onclick={() => (playing = !playing)}
				aria-label={playing ? 'Pause' : 'Play'}
			>
				<Icon name={playing ? 'pause' : 'play'} size={14} stroke={2} />
			</button>
			<button
				type="button"
				class="round"
				onclick={next}
				disabled={index === slides.length - 1}
				aria-label="Next slide"
			>
				<Icon name="chevronRight" size={16} />
			</button>
			<span class="count label">{index + 1} / {slides.length}</span>
		</footer>
	</div>
{/if}

<style>
	/* Always dark, like a projector room */
	.slideshow {
		--bg: #0e0c0a;
		--text: #e8e4df;
		--text-secondary: #9a9490;
		--hairline: rgba(255, 255, 255, 0.09);
		--rule: rgba(255, 255, 255, 0.16);
		position: fixed;
		inset: 0;
		z-index: 300;
		display: grid;
		grid-template-rows: auto auto 1fr auto;
		padding: 0 clamp(20px, 5vw, 90px) 28px;
		background: var(--bg);
		color: var(--text);
		background-image: repeating-linear-gradient(
			to right,
			transparent 0 calc(100% / 12 - 1px),
			rgba(255, 255, 255, 0.03) calc(100% / 12 - 1px) calc(100% / 12)
		);
	}

	.progress {
		display: flex;
		gap: 4px;
		margin: 0 calc(-1 * clamp(20px, 5vw, 90px));
		padding: 0 4px;
	}
	.progress button {
		flex: 1;
		height: 14px;
		padding: 0;
		border: 0;
		background: none;
		cursor: pointer;
		position: relative;
	}
	.progress button::before,
	.progress span {
		content: '';
		position: absolute;
		left: 0;
		right: 0;
		top: 4px;
		height: 2px;
		border-radius: 2px;
		background: rgba(255, 255, 255, 0.14);
	}
	.progress span {
		background: var(--text);
		transform-origin: left;
	}

	.top {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 18px 0;
	}
	.top p {
		display: flex;
		gap: 12px;
		font-size: 13px;
	}
	.top strong {
		font-weight: 600;
	}
	.top span {
		color: var(--text-secondary);
	}

	.round {
		display: grid;
		place-items: center;
		width: 42px;
		height: 42px;
		border-radius: 50%;
		border: 1px solid var(--rule);
		background: rgba(255, 255, 255, 0.04);
		color: var(--text);
		cursor: pointer;
		transition:
			background-color 0.2s ease,
			transform 0.3s var(--ease-out);
	}
	.round:hover:not(:disabled) {
		background: rgba(255, 255, 255, 0.1);
		transform: scale(1.06);
	}
	.round:disabled {
		opacity: 0.35;
		cursor: default;
	}

	.stage {
		position: relative;
		display: grid;
		min-height: 0;
		overflow: hidden;
	}
	.slide {
		grid-area: 1 / 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 24px;
		min-height: 0;
	}

	.kind-cover {
		display: grid;
		grid-template-columns: 5fr 7fr;
		align-items: center;
		gap: 48px;
	}
	.kind-cover h2 {
		margin: 12px 0;
		font-size: clamp(44px, 6vw, 96px);
		font-weight: 420;
		letter-spacing: -0.05em;
		line-height: 0.95;
	}
	.kind-cover p {
		color: var(--text-secondary);
		font-size: 18px;
	}
	.cover-art {
		position: relative;
	}
	.cover-art img {
		width: 100%;
		border-radius: 16px;
	}
	.badge {
		position: absolute;
		top: 14px;
		right: 14px;
	}

	.big {
		max-width: 26ch;
		font-size: clamp(30px, 3.8vw, 58px);
		line-height: 1.12;
		letter-spacing: -0.035em;
	}
	.rest {
		max-width: 62ch;
		color: var(--text-secondary);
		font-size: 15px;
	}

	.stats {
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		margin: 0;
	}
	.stats div {
		padding: 24px 24px 24px 0;
		border-bottom: 1px solid var(--hairline);
	}
	.stats div + div {
		padding-left: 24px;
		border-left: 1px solid var(--hairline);
	}
	dt {
		font-size: clamp(34px, 4vw, 64px);
		letter-spacing: -0.04em;
		line-height: 1;
	}
	dd {
		margin: 12px 0 0;
		font-size: 13px;
		color: var(--text-secondary);
	}

	.gallery {
		display: grid;
		grid-template-columns: repeat(var(--n), minmax(0, 1fr));
		gap: 16px;
		max-height: 62vh;
	}
	.gallery img {
		width: 100%;
		height: 100%;
		max-height: 62vh;
		object-fit: contain;
		border-radius: 14px;
	}

	blockquote {
		margin: 0;
		padding-left: 28px;
		border-left: 2px solid #f2b84b;
	}
	blockquote p {
		max-width: 24ch;
		font-size: clamp(30px, 3.6vw, 54px);
		line-height: 1.15;
		letter-spacing: -0.035em;
	}
	blockquote footer {
		margin-top: 20px;
		color: var(--text-secondary);
	}

	pre {
		max-width: 900px;
		margin: 0;
		padding: 28px;
		overflow: auto;
		border-radius: 16px;
		background: #1a1712;
		border: 1px solid var(--hairline);
		font-family: var(--font-mono);
		font-size: clamp(13px, 1.2vw, 17px);
		line-height: 1.7;
	}

	.controls {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 14px;
		padding-top: 20px;
	}
	.count {
		min-width: 56px;
		margin-left: 10px;
		color: var(--text-secondary);
	}

	@media (max-width: 800px) {
		.kind-cover {
			grid-template-columns: 1fr;
			gap: 24px;
		}
		.stats {
			grid-template-columns: 1fr 1fr;
		}
		.stats div:nth-child(odd) {
			padding-left: 0;
			border-left: 0;
		}
		.gallery {
			grid-template-columns: 1fr;
			overflow-y: auto;
		}
	}
</style>
