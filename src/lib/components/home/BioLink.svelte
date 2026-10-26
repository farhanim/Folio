<script lang="ts">
	import type { BioLink } from '#lib/types/index.ts';
	import { polaroid } from './polaroid.svelte.ts';

	let { link, tilt = '-3deg' }: { link: BioLink; tilt?: string } = $props();

	let hideTimer: ReturnType<typeof setTimeout> | undefined;

	function show(e: PointerEvent) {
		if (e.pointerType !== 'mouse' && e.pointerType !== 'pen') return;
		clearTimeout(hideTimer);
		polaroid.src = link.image;
		polaroid.tilt = tilt;
		polaroid.x = e.clientX;
		polaroid.y = e.clientY;
		polaroid.visible = true;
	}

	function move(e: PointerEvent) {
		polaroid.x = e.clientX;
		polaroid.y = e.clientY;
	}

	function hide() {
		hideTimer = setTimeout(() => (polaroid.visible = false), 70);
	}
</script>

<a
	class="hairline-link"
	href={link.href}
	onpointerenter={show}
	onpointermove={move}
	onpointerleave={hide}
	onclick={() => (polaroid.visible = false)}>{link.label}</a
>
