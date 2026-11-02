<script lang="ts">
	import type { PlatformTour } from '#lib/types/index.ts';

	/**
	 * Tabs over a set of walkthrough clips. Each clip plays through its chapters
	 * (captioned on the clip and listed beside it) and hands over to the next tab
	 * when it ends. On wide screens the tour also pins while the reader scrolls
	 * past it, and moving into a new stretch of the scroll picks that tab.
	 */
	let { items, label }: { items: PlatformTour[]; label: string } = $props();

	let active = $state(0);
	/** Playback position of the active clip, in seconds, and its length. */
	let time = $state(0);
	let duration = $state(0);
	let playing = $state(false);
	let pinned = $state(false);
	let near = $state(false);
	let inView = $state(false);
	let reduced = $state(false);
	let track: HTMLDivElement | undefined = $state();
	const videos: HTMLVideoElement[] = $state([]);

	const item = $derived(items[active]);
	const chapters = $derived(item.chapters ?? []);
	const chapter = $derived(chapters.findLastIndex((c) => c.at <= time + 0.05));
	const progress = $derived(duration ? Math.min(time / duration, 1) : 0);
	/** 0–1 through the current chapter, for the line under the caption. */
	const stepProgress = $derived.by(() => {
		if (chapter < 0) return 0;
		const from = chapters[chapter].at;
		const to = chapters[chapter + 1]?.at ?? duration;
		return to > from ? Math.min(Math.max((time - from) / (to - from), 0), 1) : 0;
	});

	// Each caption reads in full, then folds to its step number so the screen stays clear.
	let captionOpen = $state(true);
	let hovering = $state(false);
	$effect(() => {
		void chapter;
		void active;
		captionOpen = true;
		const timer = setTimeout(() => (captionOpen = false), 3200);
		return () => clearTimeout(timer);
	});

	// Pin (scroll-driven) only where there is room for it.
	$effect(() => {
		const wide = matchMedia('(min-width: 1024px) and (min-height: 700px)');
		const motion = matchMedia('(prefers-reduced-motion: reduce)');
		const update = () => {
			reduced = motion.matches;
			pinned = wide.matches && !motion.matches;
		};
		update();
		wide.addEventListener('change', update);
		motion.addEventListener('change', update);
		return () => {
			wide.removeEventListener('change', update);
			motion.removeEventListener('change', update);
		};
	});

	// Load clips once the tour is close; play only while it is on screen.
	$effect(() => {
		if (!track) return;
		const io = new IntersectionObserver(([e]) => e.isIntersecting && (near = true), {
			rootMargin: '600px 0px'
		});
		const seen = new IntersectionObserver(([e]) => (inView = e.isIntersecting), { threshold: 0.2 });
		io.observe(track);
		seen.observe(track.firstElementChild as Element);
		return () => {
			io.disconnect();
			seen.disconnect();
		};
	});

	// Scrolling into a new stretch of the track picks that tab. Only changes of
	// stretch count, so a clip that advanced on its own isn't pulled back.
	$effect(() => {
		if (!pinned || !track) return;
		const el = track;
		let frame = 0;
		let zone = -1;
		const measure = () => {
			frame = 0;
			const pin = el.firstElementChild as HTMLElement;
			const r = el.getBoundingClientRect();
			const top = parseFloat(getComputedStyle(pin).top) || 0;
			const p = Math.min(Math.max((top - r.top) / (r.height - pin.offsetHeight), 0), 0.9999);
			const z = Math.floor(p * items.length);
			if (z !== zone) {
				if (zone !== -1) active = z;
				zone = z;
			}
		};
		const onscroll = () => (frame ||= requestAnimationFrame(measure));
		measure();
		addEventListener('scroll', onscroll, { passive: true });
		addEventListener('resize', onscroll);
		return () => {
			removeEventListener('scroll', onscroll);
			removeEventListener('resize', onscroll);
			cancelAnimationFrame(frame);
		};
	});

	// The active clip starts from the top each time it comes in; others pause.
	$effect(() => {
		const i = active;
		if (!near) return;
		time = 0;
		videos.forEach((v, j) => {
			if (!v) return;
			if (j === i) {
				v.currentTime = 0;
				duration = v.duration || 0;
			} else v.pause();
		});
	});
	$effect(() => {
		const v = videos[active];
		if (!v || !near) return;
		if (inView && !reduced) v.play().catch(() => {});
		else v.pause();
	});

	// Smooth progress: read the clock every frame while playing.
	$effect(() => {
		if (!playing) return;
		const v = videos[active];
		let frame = requestAnimationFrame(function tick() {
			time = v.currentTime;
			duration = v.duration || duration;
			frame = requestAnimationFrame(tick);
		});
		return () => cancelAnimationFrame(frame);
	});

	function select(i: number) {
		active = i;
	}
	function seek(at: number) {
		const v = videos[active];
		if (!v) return;
		v.currentTime = at;
		time = at;
		v.play().catch(() => {});
	}
	function toggle() {
		const v = videos[active];
		if (!v) return;
		if (v.paused) v.play().catch(() => {});
		else v.pause();
	}
	// A finished clip hands over to the next tab.
	function ended(i: number) {
		if (i === active) active = (i + 1) % items.length;
	}

	function onkeydown(e: KeyboardEvent) {
		const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
		if (!d) return;
		e.preventDefault();
		const i = (active + d + items.length) % items.length;
		select(i);
		(e.currentTarget as HTMLElement).querySelectorAll<HTMLElement>('[role=tab]')[i]?.focus();
	}
	const pad = (n: number) => String(n).padStart(2, '0');
</script>

<div class="tour" class:pinned bind:this={track} style:--n={items.length}>
	<div class="pin">
		<!-- svelte-ignore a11y_interactive_supports_focus -->
		<div class="tabs" role="tablist" aria-label={label} {onkeydown} style:--i={active}>
			<span class="indicator" aria-hidden="true"></span>
			{#each items as it, i (it.id)}
				<button
					type="button"
					role="tab"
					id="tab-{it.id}"
					aria-selected={i === active}
					aria-controls="panel-{it.id}"
					tabindex={i === active ? 0 : -1}
					onclick={() => select(i)}
				>
					<span class="no">{pad(i + 1)}</span>
					<span class="name">{it.label}</span>
					<span class="meter" aria-hidden="true">
						<i style:transform="scaleX({i < active ? 1 : i === active ? progress : 0})"></i>
					</span>
				</button>
			{/each}
		</div>

		<div class="stage">
			<div class="screen">
				<div class="chrome" aria-hidden="true">
					<span class="dots"><i></i><i></i><i></i></span>
					<span class="url">{item.name}</span>
				</div>
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<div class="clips" onpointerenter={() => (hovering = true)} onpointerleave={() => (hovering = false)}>
					{#each items as it, i (it.id)}
						<video
							bind:this={videos[i]}
							class:on={i === active}
							src={near ? it.video : undefined}
							poster={it.poster}
							muted
							playsinline
							preload={i === 0 ? 'auto' : 'metadata'}
							onplay={() => i === active && (playing = true)}
							onpause={() => i === active && (playing = false)}
							onloadedmetadata={(e) => i === active && (duration = e.currentTarget.duration)}
							onended={() => ended(i)}
							aria-label="{it.name} walkthrough"
						></video>
					{/each}

					<!-- Chapter caption, on the clip -->
					{#if chapter >= 0}
						{#key `${active}-${chapter}`}
							<p class="caption" class:open={captionOpen || hovering} aria-live="polite">
								<span class="step">{pad(chapter + 1)}/{pad(chapters.length)}</span>
								<span class="label-text"><span>{chapters[chapter].label}</span></span>
								<span class="line" aria-hidden="true"><i style:transform="scaleX({stepProgress})"></i></span>
							</p>
						{/key}
					{/if}
					<button
						type="button"
						class="toggle"
						onclick={toggle}
						aria-label={playing ? 'Pause walkthrough' : 'Play walkthrough'}
					>
						{#if playing}
							<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 3h3v10H4zM9 3h3v10H9z" /></svg>
						{:else}
							<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 2.5v11l9-5.5z" /></svg>
						{/if}
					</button>
				</div>
			</div>

			{#each items as it, i (it.id)}
				<div
					class="copy"
					class:on={i === active}
					inert={i !== active}
					aria-hidden={i !== active}
					role="tabpanel"
					id="panel-{it.id}"
					aria-labelledby="tab-{it.id}"
				>
					<h3>{it.name}</h3>
					<p>{it.summary}</p>
					{#if it.chapters?.length}
						<ol class="chapters">
							{#each it.chapters as c, k (c.at)}
								<li class:done={i === active && k < chapter} class:now={i === active && k === chapter}>
									<button type="button" onclick={() => seek(c.at)}>
										<span class="mark" aria-hidden="true"></span>{c.label}
									</button>
								</li>
							{/each}
						</ol>
					{:else}
						<ul class="features">
							{#each it.features as f (f)}
								<li>{f}</li>
							{/each}
						</ul>
					{/if}
				</div>
			{/each}
		</div>
	</div>
</div>

<style>
	/* Pinned: the track is as tall as one viewport per tab; the stage sticks inside it */
	.tour.pinned {
		height: calc(var(--n) * 85vh + 40vh);
	}
	.pinned .pin {
		position: sticky;
		top: calc(var(--bar) + 20px);
	}
	.tabs {
		position: relative;
		display: grid;
		grid-template-columns: repeat(var(--n), minmax(0, 1fr));
		gap: 8px;
		margin-bottom: 16px;
	}
	[role='tab'] {
		position: relative;
		z-index: 1;
		display: grid;
		grid-template-columns: auto 1fr;
		gap: 4px 10px;
		align-items: baseline;
		padding: 12px 14px 0;
		border: 0;
		border-radius: 12px;
		background: transparent;
		color: var(--text-secondary);
		font: inherit;
		text-align: left;
		cursor: pointer;
		transition: color 0.4s ease;
	}
	[role='tab']:hover,
	[role='tab'][aria-selected='true'] {
		color: var(--text);
	}
	/* One highlight that glides to the active tab instead of jumping */
	.indicator {
		position: absolute;
		left: 0;
		top: 0;
		bottom: 0;
		width: calc((100% - 8px * (var(--n) - 1)) / var(--n));
		border-radius: 12px;
		background: var(--surface);
		transform: translateX(calc(var(--i) * (100% + 8px)));
		transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
		pointer-events: none;
	}
	.no {
		font-family: var(--font-mono);
		font-size: 12px;
		color: var(--text-secondary);
	}
	.name {
		font-size: 16px;
		font-weight: 500;
		letter-spacing: -0.01em;
	}
	/* Each tab's line fills with its clip's playback */
	.meter {
		grid-column: 1 / -1;
		height: 2px;
		margin: 10px -14px 0;
		background: var(--hairline);
		overflow: hidden;
	}
	.meter i {
		display: block;
		height: 100%;
		background: var(--text);
		transform-origin: left;
	}

	.stage {
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(260px, 0.42fr);
		gap: 28px;
		align-items: start;
	}
	.screen {
		overflow: hidden;
		border-radius: 14px;
		background: var(--surface);
		box-shadow:
			0 0 0 1px var(--hairline),
			0 24px 48px -32px rgba(0, 0, 0, 0.35);
	}
	.chrome {
		display: flex;
		align-items: center;
		gap: 12px;
		height: 34px;
		padding: 0 12px;
		border-bottom: 1px solid var(--hairline);
	}
	.dots {
		display: flex;
		gap: 6px;
	}
	.dots i {
		width: 9px;
		height: 9px;
		border-radius: 50%;
		background: var(--hairline);
	}
	.url {
		flex: 1;
		max-width: 260px;
		margin: 0 auto;
		padding: 3px 10px;
		border-radius: 6px;
		background: var(--bg);
		color: var(--text-secondary);
		font-size: 12px;
		text-align: center;
	}
	.clips {
		position: relative;
		aspect-ratio: 16 / 10;
		background: #f5f7fb;
	}
	/* Clips crossfade with a slight settle, so a switch reads as one motion */
	video {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		opacity: 0;
		scale: 1.025;
		transition:
			opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1),
			scale 0.9s cubic-bezier(0.22, 1, 0.36, 1);
	}
	video.on {
		opacity: 1;
		scale: 1;
		z-index: 1;
	}
	/*
	 * The chapter caption: a dark glass chip that rises in with each step, reads in
	 * full, then folds down to its step number. A thin line fills as the step plays.
	 */
	.caption {
		position: absolute;
		left: 16px;
		bottom: 16px;
		z-index: 2;
		display: flex;
		align-items: center;
		max-width: calc(100% - 88px);
		margin: 0;
		padding: 8px;
		overflow: hidden;
		border-radius: 12px;
		background: rgba(13, 20, 40, 0.8);
		backdrop-filter: blur(10px);
		color: #fff;
		font-size: 15px;
		font-weight: 500;
		line-height: 1.35;
		box-shadow: 0 12px 30px -12px rgba(0, 0, 0, 0.5);
		animation: caption-in 0.6s cubic-bezier(0.22, 1, 0.36, 1) both;
	}
	@keyframes caption-in {
		from {
			opacity: 0;
			translate: 0 14px;
			scale: 0.96;
		}
	}
	/* The label opens and folds with a grid-row trick on the column, so it eases smoothly */
	.label-text {
		display: grid;
		grid-template-columns: 0fr;
		transition: grid-template-columns 0.55s cubic-bezier(0.22, 1, 0.36, 1);
	}
	.label-text span {
		min-width: 0;
		overflow: hidden;
		white-space: nowrap;
		opacity: 0;
		transition: opacity 0.3s ease;
	}
	.caption.open .label-text {
		grid-template-columns: 1fr;
	}
	.caption.open .label-text span {
		padding: 0 8px 0 10px;
		opacity: 1;
		transition: opacity 0.4s ease 0.12s;
	}
	.line {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		height: 2px;
		background: rgba(255, 255, 255, 0.12);
	}
	.line i {
		display: block;
		height: 100%;
		background: #ffbd00;
		transform-origin: left;
	}
	.step {
		flex: none;
		padding: 4px 8px;
		border-radius: 7px;
		background: #ffbd00;
		color: #1a1300;
		font-family: var(--font-mono);
		font-size: 12px;
		font-weight: 600;
	}
	.toggle {
		position: absolute;
		right: 16px;
		bottom: 16px;
		z-index: 2;
		display: grid;
		place-items: center;
		width: 40px;
		height: 40px;
		border: 0;
		border-radius: 50%;
		background: rgba(13, 20, 40, 0.78);
		backdrop-filter: blur(10px);
		color: #fff;
		cursor: pointer;
		transition: transform 0.2s ease;
	}
	.toggle:hover {
		transform: scale(1.06);
	}
	.toggle svg {
		width: 14px;
		height: 14px;
		fill: currentColor;
	}

	/* All panels share one cell; the outgoing one fades away as the next settles in */
	.copy {
		grid-column: 2;
		grid-row: 1;
		padding-top: 4px;
		opacity: 0;
		translate: 0 14px;
		visibility: hidden;
		transition:
			opacity 0.35s ease,
			translate 0.5s cubic-bezier(0.22, 1, 0.36, 1),
			visibility 0s linear 0.35s;
	}
	.copy.on {
		opacity: 1;
		translate: 0 0;
		visibility: visible;
		transition:
			opacity 0.55s ease 0.15s,
			translate 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.15s,
			visibility 0s;
	}
	h3 {
		margin: 0;
		font-size: calc(clamp(22px, 2vw, 28px) * var(--text-scale, 1));
		font-weight: 500;
		letter-spacing: -0.03em;
	}
	p {
		margin: 10px 0 0;
		color: var(--text-secondary);
		font-size: calc(15px * var(--text-scale, 1));
		line-height: 1.6;
	}
	ol,
	ul {
		display: grid;
		gap: 2px;
		margin: 16px 0 0;
		padding: 12px 0 0;
		border-top: 1px solid var(--hairline);
		list-style: none;
	}
	/* Chapters: the current step is lit, finished ones are ticked, any can be replayed */
	.chapters button {
		display: flex;
		align-items: flex-start;
		gap: 12px;
		width: 100%;
		padding: 7px 8px;
		border: 0;
		border-radius: 8px;
		background: transparent;
		color: var(--text-secondary);
		font: inherit;
		font-size: calc(14px * var(--text-scale, 1));
		line-height: 1.4;
		text-align: left;
		cursor: pointer;
		transition:
			background 0.3s ease,
			color 0.3s ease;
	}
	.chapters button:hover {
		background: var(--surface);
		color: var(--text);
	}
	.mark {
		flex: none;
		width: 8px;
		height: 8px;
		margin-top: 0.4em;
		border-radius: 50%;
		box-shadow: inset 0 0 0 1.5px currentColor;
		transition:
			background 0.3s ease,
			transform 0.3s ease;
	}
	.done button {
		color: var(--text);
	}
	.done .mark {
		background: currentColor;
	}
	.now button {
		background: var(--surface);
		color: var(--text);
		font-weight: 500;
	}
	.now .mark {
		background: #ffbd00;
		box-shadow: none;
		transform: scale(1.3);
	}
	.features li {
		position: relative;
		padding: 4px 0 4px 18px;
		font-size: calc(14px * var(--text-scale, 1));
		line-height: 1.45;
	}
	.features li::before {
		content: '';
		position: absolute;
		left: 2px;
		top: 0.85em;
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: var(--amber, currentColor);
	}

	@media (max-width: 1023px) {
		.stage {
			grid-template-columns: 1fr;
		}
		.copy {
			grid-column: 1;
			grid-row: 2;
		}
	}
	@media (max-width: 600px) {
		[role='tab'] {
			padding: 10px 10px 0;
		}
		.no {
			display: none;
		}
		.meter {
			margin: 8px -10px 0;
		}
		.caption {
			left: 10px;
			bottom: 10px;
			font-size: 13px;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.copy,
		.copy.on,
		.indicator,
		video,
		.caption {
			transition: none;
			animation: none;
		}
	}
</style>
