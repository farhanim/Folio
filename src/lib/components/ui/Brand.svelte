<script lang="ts">
	import { brands, type BrandName } from './brands.ts';

	/** A brand mark from brands.ts, in its own colour unless `color` overrides it. */
	let {
		name,
		size = 20,
		color,
		class: className
	}: { name: BrandName; size?: number; color?: string; class?: string } = $props();

	const fill = $derived(color ?? brands[name].color ?? 'currentColor');
</script>

<svg class={className} width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
	<path d={brands[name].path} {fill} />
</svg>
