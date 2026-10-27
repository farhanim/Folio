<script lang="ts">
	import Icon from '#lib/components/ui/Icon.svelte';

	/** Small pill label: `new` pulses, `featured` reads "Must read", `plain` is neutral. */
	let { kind = 'plain', label }: { kind?: 'new' | 'featured' | 'plain'; label?: string } = $props();
</script>

<span class="tag {kind}">
	{#if kind === 'new'}
		<span class="dot" aria-hidden="true"></span>{label ?? 'New'}
	{:else if kind === 'featured'}
		<Icon name="star" size={11} stroke={2} />{label ?? 'Must read'}
	{:else}
		{label}
	{/if}
</span>

<style>
	.tag {
		display: inline-flex;
		align-items: center;
		gap: 5px;
		height: 22px;
		padding: 0 9px;
		border-radius: 999px;
		font-family: var(--font-mono);
		font-size: 10px;
		letter-spacing: 0.03em;
		text-transform: uppercase;
		white-space: nowrap;
		color: var(--text);
		background: color-mix(in srgb, var(--bg) 82%, transparent);
		backdrop-filter: blur(10px);
		border: 1px solid var(--hairline);
	}
	.new {
		background: var(--text);
		color: var(--bg);
		border-color: transparent;
	}
	.dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: var(--amber);
		animation: pulse 1.8s ease-in-out infinite;
	}
	.featured {
		background: var(--amber);
		color: #1a1a1a;
		border-color: transparent;
	}
	@keyframes pulse {
		50% {
			opacity: 0.35;
			transform: scale(0.8);
		}
	}
</style>
