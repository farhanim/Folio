<script lang="ts">
	import { fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import Icon from '#lib/components/ui/Icon.svelte';
	import type { Block, Project } from '#lib/types/index.ts';
	import { portal } from '#lib/utils/portal.ts';
	import ClientBadge from './ClientBadge.svelte';

	/**
	 * Fullscreen slideshow of a project, laid out like a deck: a cover slide, then
	 * one slide per block — a short text block shares a slide with the block after
	 * it, so no slide is a lone sentence. Every block is shown in full (the stage
	 * scrolls rather than clipping). Follows the site theme.
	 * Autoplays with a segmented progress bar; ←/→ to move, Space to pause, Esc to close.
	 */
	let {
		project,
		open = $bindable(false),
		start = 0
	}: { project: Project; open?: boolean; start?: number } = $props();

	const DURATION = 9000;
	type Slide = { id: string; title: string; blocks: Block[] };

	const isShort = (b: Block) => b.kind === 'text' && b.body.join(' ').length < 420;
	const slides = $derived.by(() => {
		const out: Slide[] = [{ id: 'cover', title: 'Cover', blocks: [] }];
		const list = project.blocks;
		for (let i = 0; i < list.length; i++) {
			const b = list[i];
			const next = list[i + 1];
			const pairs =
				next &&
				next.kind !== 'text' &&
				(isShort(b) || (b.kind === 'text' && next.kind === 'stats'));
			if (pairs) {
				out.push({ id: b.id, title: b.title, blocks: [b, next] });
				i++;
			} else out.push({ id: b.id, title: b.title, blocks: [b] });
		}
		return out;
	});

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

	const pad = (n: number) => String(n).padStart(2, '0');
	const coverFacts = $derived(
		[
			{ label: 'Role', value: project.role },
			{ label: 'Year', value: project.year ? String(project.year) : '' },
			{ label: 'Duration', value: project.duration ?? '' },
			{ label: 'Team', value: project.team ?? '' }
		].filter((f) => f.value)
	);
</script>

{#snippet body(b: Block, side = false)}
	{#if b.kind === 'text'}
		<div class="text" class:cols={!side && b.body.join(' ').length > 520}>
			{#each b.body as p, i (i)}<p class:lead={i === 0 && b.body.length === 1}>{p}</p>{/each}
		</div>
	{:else if b.kind === 'stats'}
		<dl class="stats" class:side>
			{#each b.items as item (item.label)}
				<div>
					<dt>{item.value}</dt>
					<dd>{item.label}</dd>
				</div>
			{/each}
		</dl>
	{:else if b.kind === 'features'}
		<ol class="features">
			{#each b.items as f, i (f.title)}
				<li><span class="no">{pad(i + 1)}</span><b>{f.title}</b><span>{f.body}</span></li>
			{/each}
		</ol>
	{:else if b.kind === 'impact'}
		{#if b.intro}<p class="intro">{b.intro}</p>{/if}
		<ol class="points" class:side>
			{#each b.items as item, i (item)}
				<li><span class="no">{pad(i + 1)}</span>{item}</li>
			{/each}
		</ol>
	{:else if b.kind === 'quote'}
		<blockquote>
			<p>“{b.quote}”</p>
			<footer>{b.author} — {b.role}</footer>
		</blockquote>
	{:else if b.kind === 'code'}
		<pre><code>{b.code}</code></pre>
		{#if b.caption}<p class="caption">{b.caption}</p>{/if}
	{:else if b.kind === 'stack'}
		<div class="stack">
			{#each b.groups as g (g.label)}
				<div>
					<span class="label">{g.label}</span>
					{#each g.items as item (item.name)}
						<p>
							<b>{item.name}</b>{#if item.why}<span> — {item.why}</span>{/if}
						</p>
					{/each}
				</div>
			{/each}
		</div>
	{:else if b.kind === 'gallery' && b.caption}
		<p class="caption">{b.caption}</p>
	{/if}
{/snippet}

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
			<p><strong>{project.title}</strong><span>{project.client.name}</span></p>
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
				{@const gallery = slide.blocks.find((b) => b.kind === 'gallery')}
				<article class="slide" in:slideIn out:slideOut>
					{#if slide.id === 'cover'}
						<div class="cover">
							<div class="cover-copy">
								<span class="label">
									{project.type === 'design' ? 'Design case study' : 'Code project'}
								</span>
								<h2>{project.title}</h2>
								<p class="tagline">{project.tagline}</p>
								<p class="summary">{project.summary}</p>
								<dl class="facts">
									<div>
										<dt class="label">Client</dt>
										<dd><ClientBadge client={project.client} size="sm" /> {project.client.name}</dd>
									</div>
									{#each coverFacts as f (f.label)}
										<div>
											<dt class="label">{f.label}</dt>
											<dd>{f.value}</dd>
										</div>
									{/each}
								</dl>
							</div>
							<figure class="art"><img src={project.cover} alt="" /></figure>
						</div>
					{:else}
						<header class="slide-head">
							<span class="label">{pad(index)} — {project.title}</span>
							<h2>{slide.title}</h2>
						</header>
						{#if gallery && gallery.kind === 'gallery'}
							<div class="split" class:multi={gallery.images.length > 1}>
								<div class="shots">
									{#each gallery.images as image (image.src)}
										<img src={image.src} alt={image.alt} />
									{/each}
								</div>
								<div class="aside">
									{#each slide.blocks as b (b.id)}{@render body(b, true)}{/each}
								</div>
							</div>
						{:else}
							<div class="flow">
								{#each slide.blocks as b (b.id)}
									<section>
										{#if slide.blocks.length > 1 && b.title !== slide.title}
											<span class="label sub">{b.title}</span>
										{/if}
										{@render body(b)}
									</section>
								{/each}
							</div>
						{/if}
					{/if}
				</article>
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
	/* Uses the site tokens, so the deck follows the light / dark theme. */
	.slideshow {
		--edge: clamp(20px, 4vw, 72px);
		--soft: color-mix(in srgb, var(--text) 6%, transparent);
		position: fixed;
		inset: 0;
		z-index: 300;
		display: grid;
		grid-template-rows: auto auto minmax(0, 1fr) auto;
		padding: 0 var(--edge) 20px;
		background: var(--bg);
		color: var(--text);
	}

	.progress {
		display: flex;
		gap: 4px;
		margin: 0 calc(-1 * var(--edge));
		padding: 0 4px;
	}
	.progress button {
		position: relative;
		flex: 1;
		height: 14px;
		padding: 0;
		border: 0;
		background: none;
		cursor: pointer;
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
		background: var(--rule);
	}
	.progress span {
		background: var(--text);
		transform-origin: left;
	}

	.top {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 12px 0;
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
		width: 40px;
		height: 40px;
		border-radius: 50%;
		border: 1px solid var(--rule);
		background: var(--soft);
		color: var(--text);
		cursor: pointer;
		transition:
			background-color 0.2s ease,
			transform 0.3s var(--ease-out);
	}
	.round:hover:not(:disabled) {
		background: color-mix(in srgb, var(--text) 12%, transparent);
		transform: scale(1.06);
	}
	.round:disabled {
		opacity: 0.35;
		cursor: default;
	}

	/* ── Stage: one slide at a time; scrolls instead of clipping on small screens ── */
	.stage {
		display: grid;
		min-height: 0;
		overflow: hidden;
	}
	.slide {
		grid-area: 1 / 1;
		display: flex;
		flex-direction: column;
		gap: clamp(14px, 2.4vh, 28px);
		min-height: 0;
		padding: clamp(16px, 3vh, 32px) clamp(16px, 2.4vw, 40px);
		overflow-y: auto;
		border: 1px solid var(--hairline);
		border-radius: 18px;
		background: var(--surface);
	}

	.slide-head {
		display: flex;
		flex-direction: column;
		gap: 6px;
		padding-bottom: clamp(10px, 2vh, 18px);
		border-bottom: 1px solid var(--rule);
	}
	.slide-head h2 {
		margin: 0;
		font-size: clamp(26px, min(3.2vw, 5.4vh), 46px);
		font-weight: 450;
		letter-spacing: -0.04em;
		line-height: 1.05;
	}
	.sub {
		display: block;
		margin-bottom: 10px;
	}

	/* ── Cover ── */
	.cover {
		flex: 1;
		display: grid;
		grid-template-columns: 5fr 7fr;
		align-items: center;
		gap: clamp(24px, 3vw, 48px);
		min-height: 0;
	}
	.cover-copy {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}
	.cover h2 {
		margin: 0;
		font-size: clamp(36px, min(4.6vw, 8vh), 76px);
		font-weight: 450;
		letter-spacing: -0.05em;
		line-height: 0.98;
	}
	.tagline {
		font-size: clamp(17px, 1.6vw, 22px);
	}
	.summary {
		color: var(--text-secondary);
		font-size: 15px;
		line-height: 1.55;
	}
	.facts {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 12px 20px;
		margin: 6px 0 0;
		padding-top: 14px;
		border-top: 1px solid var(--rule);
	}
	.facts dd {
		display: flex;
		align-items: center;
		gap: 6px;
		margin: 4px 0 0;
		font-size: 14px;
	}
	.art {
		margin: 0;
		min-height: 0;
	}
	.art img {
		display: block;
		width: 100%;
		max-height: calc(100vh - 220px);
		object-fit: contain;
		border-radius: 14px;
	}

	/* ── Image slides: picture on 8 columns, words on 4 ── */
	.split {
		margin-block: auto;
		flex: 1;
		display: grid;
		grid-template-columns: 8fr 4fr;
		gap: clamp(20px, 2.4vw, 40px);
		align-items: start;
		min-height: 0;
	}
	.shots {
		display: grid;
		gap: 12px;
		min-height: 0;
	}
	.split.multi .shots {
		grid-template-columns: repeat(2, minmax(0, 1fr));
	}
	.shots img {
		display: block;
		width: 100%;
		max-height: calc(100vh - 300px);
		object-fit: contain;
		object-position: top left;
		border-radius: 12px;
		background: var(--bg);
		border: 1px solid var(--hairline);
	}
	.aside {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	/* ── Text-led slides ── */
	.flow {
		margin-block: auto;
		display: flex;
		flex-direction: column;
		gap: clamp(18px, 3vh, 32px);
	}
	.text {
		display: flex;
		flex-direction: column;
		gap: 12px;
		max-width: 78ch;
	}
	.text.cols {
		display: block;
		max-width: none;
		columns: 2;
		column-gap: 40px;
	}
	.text.cols p + p {
		margin-top: 12px;
	}
	.text p {
		font-size: clamp(15px, 1.25vw, 18px);
		line-height: 1.6;
		color: var(--text-secondary);
	}
	.text p:first-child {
		color: var(--text);
	}
	.text p.lead {
		font-size: clamp(19px, min(1.8vw, 3vh), 26px);
		line-height: 1.4;
		letter-spacing: -0.015em;
	}
	.aside .text p {
		font-size: 15px;
	}
	.caption,
	.intro {
		color: var(--text-secondary);
		font-size: 15px;
		line-height: 1.55;
	}
	.aside .caption {
		color: var(--text);
		font-size: clamp(15px, 1.2vw, 18px);
	}

	.stats {
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		margin: 0;
	}
	.stats div {
		padding: 14px 18px 14px 0;
	}
	.stats div + div {
		padding-left: 18px;
		border-left: 1px solid var(--rule);
	}
	.stats.side {
		grid-template-columns: 1fr 1fr;
		row-gap: 8px;
	}
	.stats.side div:nth-child(odd) {
		padding-left: 0;
		border-left: 0;
	}
	.stats dt {
		font-size: clamp(28px, min(3.4vw, 6vh), 54px);
		letter-spacing: -0.04em;
		line-height: 1;
	}
	.stats.side dt {
		font-size: clamp(22px, 2vw, 30px);
	}
	.stats dd {
		margin: 8px 0 0;
		font-size: 13px;
		color: var(--text-secondary);
	}

	.features {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 12px;
		margin: 0;
		padding: 0;
		list-style: none;
	}
	.features li {
		display: flex;
		flex-direction: column;
		gap: 6px;
		padding: 16px;
		border-radius: 12px;
		background: var(--bg);
		border: 1px solid var(--hairline);
	}
	.features b {
		font-size: 16px;
		font-weight: 600;
	}
	.features li > span:last-child {
		font-size: 14px;
		line-height: 1.5;
		color: var(--text-secondary);
	}
	.no {
		font-family: var(--font-mono);
		font-size: 11px;
		color: var(--amber);
	}

	/* Each point is its own card, so a list fills the slide like a deck page. */
	.points {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 12px;
		margin: 0;
		padding: 0;
		list-style: none;
	}
	.points.side {
		grid-template-columns: 1fr;
		gap: 8px;
	}
	.points li {
		display: flex;
		gap: 14px;
		padding: clamp(14px, 2.4vh, 22px) 18px;
		border: 1px solid var(--hairline);
		border-radius: 12px;
		background: var(--bg);
		font-size: clamp(15px, 1.3vw, 19px);
		line-height: 1.45;
	}
	.points.side li {
		padding: 10px 14px;
		font-size: 14px;
	}
	.points .no {
		padding-top: 3px;
	}

	blockquote {
		margin: 0;
		padding-left: 24px;
		border-left: 2px solid var(--amber);
	}
	blockquote p {
		max-width: 30ch;
		font-size: clamp(24px, 3vw, 44px);
		line-height: 1.2;
		letter-spacing: -0.03em;
	}
	blockquote footer {
		margin-top: 16px;
		color: var(--text-secondary);
	}
	pre {
		margin: 0;
		padding: 20px;
		overflow: auto;
		border-radius: 12px;
		background: var(--bg);
		border: 1px solid var(--hairline);
		font-family: var(--font-mono);
		font-size: clamp(12px, 1.1vw, 15px);
		line-height: 1.7;
	}
	.stack {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 20px;
	}
	.stack p {
		margin-top: 8px;
		font-size: 15px;
	}
	.stack span {
		color: var(--text-secondary);
	}

	.controls {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 12px;
		padding-top: 14px;
	}
	.count {
		min-width: 56px;
		margin-left: 10px;
		color: var(--text-secondary);
	}

	@media (max-width: 900px) {
		.cover,
		.split {
			grid-template-columns: 1fr;
		}
		.stats,
		.features,
		.stack {
			grid-template-columns: 1fr 1fr;
		}
		.stats div:nth-child(odd) {
			padding-left: 0;
			border-left: 0;
		}
		.points,
		.text.cols {
			grid-template-columns: 1fr;
			columns: 1;
		}
		.shots img {
			max-height: none;
		}
	}
</style>
