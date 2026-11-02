<script lang="ts">
	import Icon from '#lib/components/ui/Icon.svelte';
	import type { Project } from '#lib/types/index.ts';
	import { coverSrcset } from '#lib/utils/cover.ts';
	import ClientBadge from './ClientBadge.svelte';
	import Tag from './Tag.svelte';

	/**
	 * Project image with status tags top-left and the client badge top-right.
	 * Projects with a `preview` get a motion thumbnail: a short muted loop that
	 * plays on hover (or while on screen on touch devices / when `autoplay`),
	 * pauses off screen, and isn't downloaded until it's first needed.
	 */
	let {
		project,
		ratio = '16 / 10',
		showFeatured = true,
		eager = false,
		autoplay = false,
		sizes = '(max-width: 600px) 100vw, (max-width: 1023px) 50vw, 34vw',
		tags = true
	}: {
		project: Project;
		ratio?: string;
		showFeatured?: boolean;
		eager?: boolean;
		autoplay?: boolean;
		/** Rendered width of the cover, for picking from the srcset. */
		sizes?: string;
		/** Status tags on the image; cards that show them by the title turn this off. */
		tags?: boolean;
	} = $props();

	let root: HTMLSpanElement;
	let video: HTMLVideoElement | undefined = $state();
	let playing = $state(false);

	$effect(() => {
		if (!project.preview || !video) return;
		const v = video;
		const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (reduced) return;
		const touch = matchMedia('(hover: none)').matches;
		const host = root.closest('a') ?? root;
		let hovered = false;
		let visible = false;

		const sync = () => {
			const want = visible && (hovered || touch || autoplay);
			if (want && v.paused) {
				v.play().then(
					() => (playing = true),
					() => {}
				);
			} else if (!want && !v.paused) {
				v.pause();
				playing = false;
			}
		};
		const enter = () => {
			hovered = true;
			sync();
		};
		const leave = () => {
			hovered = false;
			sync();
		};
		host.addEventListener('pointerenter', enter);
		host.addEventListener('pointerleave', leave);
		host.addEventListener('focusin', enter);
		host.addEventListener('focusout', leave);
		const io = new IntersectionObserver(
			([e]) => {
				visible = e.intersectionRatio >= 0.5;
				sync();
			},
			{ threshold: [0, 0.5, 1] }
		);
		io.observe(root);
		return () => {
			io.disconnect();
			host.removeEventListener('pointerenter', enter);
			host.removeEventListener('pointerleave', leave);
			host.removeEventListener('focusin', enter);
			host.removeEventListener('focusout', leave);
		};
	});
</script>

<span class="cover" class:playing style:aspect-ratio={ratio} bind:this={root}>
	<img
		src={project.cover}
		srcset={coverSrcset(project.cover)}
		{sizes}
		alt=""
		loading={eager ? 'eager' : 'lazy'}
		decoding="async"
	/>
	{#if project.preview}
		<video
			bind:this={video}
			src={project.preview.video}
			poster={project.preview.poster}
			muted
			loop
			playsinline
			preload="none"
			aria-hidden="true"
		></video>
		<span class="motion label" aria-hidden="true">
			<Icon name="play" size={10} stroke={2.2} /> Live preview
		</span>
	{/if}
	{#if tags}
		<span class="tags">
			{#if project.isNew}<Tag kind="new" />{/if}
			{#if showFeatured && project.featured}<Tag kind="featured" />{/if}
			{#if project.special}<Tag kind="special" />{/if}
		</span>
	{/if}
	<span class="client"><ClientBadge client={project.client} /></span>
</span>

<style>
	.cover {
		position: relative;
		display: block;
		width: 100%;
		overflow: hidden;
		border-radius: 14px;
		background: var(--surface);
		isolation: isolate;
	}
	img,
	video {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.9s var(--ease-out);
	}
	/* Designed covers keep their content centred; screen recordings read from the top */
	video {
		object-position: top center;
		position: absolute;
		inset: 0;
		opacity: 0;
		transition:
			opacity 0.5s ease,
			transform 0.9s var(--ease-out);
	}
	.playing video {
		opacity: 1;
	}
	:global(a:hover) .cover img,
	:global(a:hover) .cover video {
		transform: scale(1.035);
	}
	/*
	 * A glass glint on hover: a soft band that widens as it crosses the middle of the
	 * cover and narrows again on the way out, like light passing through a pane.
	 * Movement, swell and fade are separate animations, so the band travels in one
	 * continuous ease and never pauses mid-way.
	 */
	.cover::after {
		content: '';
		position: absolute;
		top: -10%;
		bottom: -10%;
		left: 0;
		z-index: 1;
		width: 55%;
		/*
		 * Clear glass: a wide, soft wash of light with no edges of its own. It lifts what
		 * is behind it a touch, with a hair of blur for the refraction, so it reads on
		 * any cover without adding a colour.
		 */
		background: radial-gradient(
			ellipse 50% 70% at 50% 50%,
			rgba(255, 255, 255, 0.1),
			rgba(255, 255, 255, 0.04) 55%,
			transparent 80%
		);
		backdrop-filter: blur(1px) brightness(1.05);
		mask-image: linear-gradient(90deg, transparent, #000 35%, #000 65%, transparent);
		opacity: 0;
		translate: -150% 0;
		scale: 0.6 1;
		transform: skewX(-14deg);
		pointer-events: none;
	}
	:global(a:hover) .cover::after {
		animation:
			glint-move 2.4s cubic-bezier(0.37, 0, 0.63, 1),
			glint-swell 2.4s ease-in-out,
			glint-fade 2.4s linear;
	}
	@keyframes glint-move {
		from {
			translate: -150% 0;
		}
		to {
			translate: 260% 0;
		}
	}
	@keyframes glint-swell {
		0%,
		100% {
			scale: 0.6 1;
		}
		50% {
			scale: 1.7 1;
		}
	}
	@keyframes glint-fade {
		0%,
		100% {
			opacity: 0;
		}
		20%,
		80% {
			opacity: 0.6;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.cover::after {
			display: none;
		}
	}
	.tags,
	.client,
	.motion {
		z-index: 2;
	}
	.tags {
		position: absolute;
		top: 12px;
		left: 12px;
		display: flex;
		gap: 6px;
	}
	.client {
		position: absolute;
		top: 12px;
		right: 12px;
	}
	/* "Live preview" chip — fades out once the loop is running */
	.motion {
		position: absolute;
		left: 12px;
		bottom: 12px;
		display: inline-flex;
		align-items: center;
		gap: 6px;
		padding: 4px 9px;
		border-radius: 999px;
		background: color-mix(in srgb, var(--bg) 85%, transparent);
		backdrop-filter: blur(8px);
		color: var(--text);
		font-size: 10px;
		transition: opacity 0.3s ease;
	}
	.playing .motion {
		opacity: 0;
	}
</style>
