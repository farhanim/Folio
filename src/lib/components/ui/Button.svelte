<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';

	type Props = HTMLButtonAttributes & { variant?: 'primary' | 'ghost' };

	let { variant = 'primary', class: className, children, ...rest }: Props = $props();

	const variants = {
		primary: 'bg-slate-900 text-white hover:bg-slate-700',
		ghost: 'bg-transparent text-slate-900 hover:bg-slate-100'
	};
</script>

<button
	class={[
		'rounded-lg px-4 py-2 text-sm font-medium transition-colors disabled:opacity-50',
		variants[variant],
		className
	]}
	{...rest}
>
	{@render children?.()}
</button>
