<script lang="ts">
	import Icon from '#lib/components/ui/Icon.svelte';

	/**
	 * Small pill label: `new` pulses, `featured` reads "Must read", `special` is a verified seal
	 * (named "Special project" for screen readers and on hover), `plain` is neutral.
	 */
	let { kind = 'plain', label }: { kind?: 'new' | 'featured' | 'special' | 'plain'; label?: string } =
		$props();
</script>

<span
	class="tag {kind}"
	role={kind === 'special' ? 'img' : undefined}
	aria-label={kind === 'special' ? (label ?? 'Special project') : undefined}
	data-tip={kind === 'special' ? (label ?? 'Special project') : undefined}
>
	{#if kind === 'new'}
		<span class="dot" aria-hidden="true"></span>{label ?? 'New'}
	{:else if kind === 'featured'}
		<Icon name="star" size={11} stroke={2} />{label ?? 'Must read'}
	{:else if kind === 'special'}
		<Icon name="verified" size={14} stroke={2.2} />
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
	/*
	 * Special: a glossy verified mark. Electric blue into violet, a white seal, a top
	 * highlight and a soft coloured glow; it lifts and tilts a little on hover.
	 */
	.special {
		position: relative;
		flex: none;
		justify-content: center;
		width: 22px;
		padding: 0;
		border: 0;
		border-radius: 50%;
		background:
			radial-gradient(120% 90% at 30% 15%, rgba(255, 255, 255, 0.55), transparent 55%),
			linear-gradient(140deg, #3b82f6 0%, #6366f1 55%, #a855f7 100%);
		color: #fff;
		box-shadow:
			inset 0 0 0 1px rgba(255, 255, 255, 0.28),
			0 4px 12px -4px rgba(99, 102, 241, 0.7);
		backdrop-filter: none;
		cursor: help;
		transition:
			transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1),
			box-shadow 0.35s ease;
	}
	.special :global(svg) {
		filter: drop-shadow(0 1px 1px rgba(30, 27, 75, 0.35));
		transition: rotate 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	.special:hover :global(svg) {
		rotate: -12deg;
	}
	.special:hover {
		transform: translateY(-1px) scale(1.08);
		box-shadow:
			inset 0 0 0 1px rgba(255, 255, 255, 0.35),
			0 6px 16px -4px rgba(139, 92, 246, 0.75);
	}
	@media (prefers-reduced-motion: reduce) {
		.special,
		.special:hover {
			transition: none;
			transform: none;
		}
	}
	/* Tooltip: a small dark label that rises in above the badge */
	.special::after {
		content: attr(data-tip);
		position: absolute;
		left: 50%;
		bottom: calc(100% + 8px);
		z-index: 20;
		padding: 6px 10px;
		border-radius: 8px;
		background: var(--text);
		color: var(--bg);
		font-family: var(--font-mono);
		font-size: 10px;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		white-space: nowrap;
		box-shadow: 0 8px 20px -8px rgba(0, 0, 0, 0.4);
		opacity: 0;
		translate: -50% 4px;
		pointer-events: none;
		transition:
			opacity 0.2s ease,
			translate 0.25s cubic-bezier(0.22, 1, 0.36, 1);
	}
	.special::before {
		content: '';
		position: absolute;
		left: 50%;
		bottom: calc(100% + 3px);
		z-index: 20;
		width: 8px;
		height: 8px;
		background: var(--text);
		opacity: 0;
		translate: -50% 4px;
		rotate: 45deg;
		pointer-events: none;
		transition:
			opacity 0.2s ease,
			translate 0.25s cubic-bezier(0.22, 1, 0.36, 1);
	}
	.special:hover::after,
	.special:hover::before,
	:global(a:focus-visible) .special::after,
	:global(a:focus-visible) .special::before {
		opacity: 1;
		translate: -50% 0;
	}
	@keyframes pulse {
		50% {
			opacity: 0.35;
			transform: scale(0.8);
		}
	}
</style>
