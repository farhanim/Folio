<script lang="ts">
	import Icon from '#lib/components/ui/Icon.svelte';
	import type { Project } from '#lib/types/index.ts';
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
		autoplay = false
	}: {
		project: Project;
		ratio?: string;
		showFeatured?: boolean;
		eager?: boolean;
		autoplay?: boolean;
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
	<img src={project.cover} alt="" loading={eager ? 'eager' : 'lazy'} decoding="async" />
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
	<span class="tags">
		{#if project.isNew}<Tag kind="new" />{/if}
		{#if showFeatured && project.featured}<Tag kind="featured" />{/if}
	</span>
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
		object-position: top center;
		transition: transform 0.9s var(--ease-out);
	}
	video {
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
