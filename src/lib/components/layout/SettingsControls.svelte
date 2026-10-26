<script lang="ts">
	import SegmentedControl from '#lib/components/ui/SegmentedControl.svelte';
	import Stepper from '#lib/components/ui/Stepper.svelte';
	import { settings, TEXT_SCALE } from '#lib/stores/settings.svelte.ts';
	import type { ThemePreference } from '#lib/types/index.ts';

	/** `panel` = stacked groups (desktop menu), `rows` = label/control rows (mobile sheet). */
	let { variant = 'panel' }: { variant?: 'panel' | 'rows' } = $props();

	const themeOptions: { value: ThemePreference; label: string }[] = [
		{ value: 'light', label: 'Light' },
		{ value: 'dark', label: 'Dark' },
		{ value: 'system', label: 'Auto' }
	];
	const gridOptions: { value: 'on' | 'off'; label: string }[] = [
		{ value: 'on', label: 'Show' },
		{ value: 'off', label: 'Hide' }
	];
</script>

<div class="controls {variant}">
	<div class="group">
		<span class="label">Appearance</span>
		<SegmentedControl
			label="Appearance"
			options={themeOptions}
			value={settings.theme}
			onchange={(v) => settings.setTheme(v)}
		/>
	</div>
	<div class="group">
		<span class="label">Text size</span>
		<Stepper
			label="Text size"
			display="{Math.round(settings.textScale * 100)}%"
			canDecrease={settings.textScale > TEXT_SCALE.min}
			canIncrease={settings.textScale < TEXT_SCALE.max}
			onstep={(d) => settings.stepText(d)}
		/>
	</div>
	<div class="group">
		<span class="label">Grid</span>
		<SegmentedControl
			label="Grid"
			options={gridOptions}
			value={settings.grid ? 'on' : 'off'}
			onchange={(v) => settings.setGrid(v === 'on')}
		/>
	</div>
</div>

<style>
	.panel .group + .group {
		margin-top: 14px;
		padding-top: 14px;
		border-top: 1px solid var(--hairline);
	}
	.panel .label {
		display: block;
		margin: 0 0 8px;
		font-size: 11.5px;
		font-weight: 500;
		letter-spacing: 0.01em;
		color: var(--text-secondary);
		opacity: 0.75;
	}

	.rows .group {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 12px;
		min-height: 44px;
		padding: 9px var(--row-pad, 20px);
		border-top: 1px solid var(--hairline);
		color: var(--text-secondary);
		font-size: 13px;
		letter-spacing: -0.01em;
	}
	.rows .label {
		line-height: 1;
	}
</style>
