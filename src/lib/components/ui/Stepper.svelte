<script lang="ts">
	let {
		label,
		display,
		canDecrease,
		canIncrease,
		onstep
	}: {
		label: string;
		display: string;
		canDecrease: boolean;
		canIncrease: boolean;
		onstep: (direction: 1 | -1) => void;
	} = $props();
</script>

<div class="stepper" role="group" aria-label={label}>
	<button
		type="button"
		aria-label="Decrease {label.toLowerCase()}"
		disabled={!canDecrease}
		onclick={() => onstep(-1)}>&#8722;</button
	>
	<output aria-live="polite">{display}</output>
	<button
		type="button"
		aria-label="Increase {label.toLowerCase()}"
		disabled={!canIncrease}
		onclick={() => onstep(1)}>&#43;</button
	>
</div>

<style>
	.stepper {
		display: flex;
		align-items: center;
		gap: 6px;
	}
	button {
		width: 30px;
		height: 30px;
		flex: none;
		display: flex;
		align-items: center;
		justify-content: center;
		font: inherit;
		font-size: 15px;
		line-height: 1;
		border: 1px solid var(--hairline);
		border-radius: 6px;
		background: none;
		color: var(--text);
		cursor: pointer;
		transition:
			border-color 0.15s ease,
			color 0.15s ease;
	}
	button:hover:not(:disabled) {
		border-color: var(--accent);
		color: var(--accent);
	}
	button:disabled {
		opacity: 0.35;
		cursor: default;
	}
	/* Fixed width so the buttons don't shift as the value changes */
	output {
		flex: 1;
		min-width: 34px;
		text-align: center;
		font-size: 12px;
		color: var(--text-secondary);
		letter-spacing: -0.01em;
		font-variant-numeric: tabular-nums;
	}
</style>
