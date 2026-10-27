<script lang="ts">
	import { icons, type IconName } from './icons.ts';

	let {
		name,
		size = 16,
		stroke = 1.6,
		class: className
	}: { name: IconName; size?: number; stroke?: number; class?: string } = $props();
</script>

<svg
	class={className}
	width={size}
	height={size}
	viewBox="0 0 24 24"
	fill="none"
	stroke="currentColor"
	stroke-width={stroke}
	stroke-linecap="round"
	stroke-linejoin="round"
	aria-hidden="true"
>
	{#each icons[name] as d, i (i)}
		<path {d} />
	{/each}
</svg>
