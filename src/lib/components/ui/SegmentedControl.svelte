<script lang="ts" generics="T extends string">
	interface Option {
		value: T;
		label: string;
	}

	let {
		options,
		value,
		label,
		onchange
	}: { options: Option[]; value: T; label: string; onchange: (value: T) => void } = $props();
</script>

<div class="seg" role="group" aria-label={label}>
	{#each options as option (option.value)}
		<button
			type="button"
			aria-pressed={value === option.value}
			onclick={() => onchange(option.value)}
		>
			{option.label}
		</button>
	{/each}
</div>

<style>
	.seg {
		display: flex;
		gap: 2px;
		padding: 2px;
		border-radius: 7px;
		background: var(--hairline);
	}
	button {
		flex: 1;
		font: inherit;
		font-size: 12px;
		font-weight: 500;
		letter-spacing: -0.01em;
		padding: 5px 8px;
		border: 0;
		border-radius: 5px;
		background: none;
		color: var(--text-secondary);
		cursor: pointer;
		transition:
			background-color 0.18s ease,
			color 0.18s ease,
			box-shadow 0.18s ease;
	}
	button:hover {
		color: var(--text);
	}
	button[aria-pressed='true'] {
		background: var(--bg);
		color: var(--text);
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
	}
</style>
