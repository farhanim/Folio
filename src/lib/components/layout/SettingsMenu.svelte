<script lang="ts">
	import SettingsControls from './SettingsControls.svelte';

	let open = $state(false);
	let root: HTMLDivElement;

	function onDocumentPointer(e: PointerEvent) {
		if (open && !root.contains(e.target as Node)) open = false;
	}
</script>

<svelte:document
	onpointerdown={onDocumentPointer}
	onkeydown={(e) => e.key === 'Escape' && (open = false)}
/>

<div class="settings" class:open bind:this={root}>
	<button
		type="button"
		class="trigger"
		aria-label="Settings"
		aria-expanded={open}
		aria-controls="settings-panel"
		onclick={() => (open = !open)}
	>
		<svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
			<path d="M2 4.5h5M11 4.5h3M2 11.5h3M9 11.5h5" />
			<circle cx="9" cy="4.5" r="1.9" />
			<circle cx="7" cy="11.5" r="1.9" />
		</svg>
	</button>
	<div class="panel" id="settings-panel" role="group" aria-label="Reading settings" inert={!open}>
		<SettingsControls />
	</div>
</div>

<style>
	.settings {
		position: fixed;
		top: 24px;
		right: 24px;
		z-index: 130;
	}
	.trigger {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 24px;
		height: 24px;
		padding: 4px;
		border: 0;
		border-radius: 4px;
		background: none;
		color: var(--text-secondary);
		cursor: pointer;
		transition: color 0.15s ease;
	}
	.trigger:hover,
	.open .trigger {
		color: var(--accent);
	}
	.trigger:focus-visible {
		outline: 2px solid var(--accent);
		outline-offset: 2px;
	}
	svg {
		fill: none;
		stroke: currentColor;
		stroke-width: 1.4;
		stroke-linecap: round;
	}
	svg circle {
		transition: transform 0.35s var(--ease-out);
	}
	.trigger:hover circle:first-of-type,
	.open circle:first-of-type {
		transform: translateX(-3px);
	}
	.trigger:hover circle:last-of-type,
	.open circle:last-of-type {
		transform: translateX(3px);
	}

	.panel {
		position: absolute;
		top: 34px;
		right: 0;
		min-width: 232px;
		padding: 14px;
		background: var(--bg);
		border: 1px solid var(--rule);
		border-radius: 10px;
		box-shadow: 0 12px 32px rgba(0, 0, 0, 0.16);
		opacity: 0;
		visibility: hidden;
		transform: translateY(-6px);
		transition:
			opacity 0.18s ease,
			transform 0.18s ease,
			visibility 0.18s;
	}
	.open .panel {
		opacity: 1;
		visibility: visible;
		transform: none;
	}

	@media (max-width: 1023px) {
		.settings {
			display: none;
		}
	}
</style>
