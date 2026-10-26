<script lang="ts">
	import { pages, socials } from '#lib/data/site.ts';
	import SettingsControls from './SettingsControls.svelte';

	let open = $state(false);
	const close = () => (open = false);
</script>

<svelte:window
	onresize={() => innerWidth > 1023 && close()}
	onkeydown={(e) => e.key === 'Escape' && close()}
/>

<button
	type="button"
	class="toggle"
	aria-expanded={open}
	aria-controls="nav-panel"
	aria-label={open ? 'Close menu' : 'Open menu'}
	onclick={() => (open = !open)}
>
	<span class="bars" aria-hidden="true"><span></span><span></span><span></span></span>
</button>

<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_noninteractive_element_interactions -->
<nav
	class="panel"
	class:open
	id="nav-panel"
	aria-label="Site menu"
	inert={!open}
	onclick={(e) => e.target === e.currentTarget && close()}
>
	<div class="links">
		<a href="/" onclick={close}>Home</a>
		{#each pages as page (page.href)}
			<a href={page.href} onclick={close}>{page.label}</a>
		{/each}
	</div>
	<div class="socials">
		{#each socials as social (social.href)}
			<a
				href={social.href}
				target={social.external ? '_blank' : undefined}
				rel={social.external ? 'noopener' : undefined}>{social.label}</a
			>
		{/each}
	</div>
	<SettingsControls variant="rows" />
</nav>

<style>
	.toggle {
		display: none;
		position: fixed;
		top: 24px;
		right: 24px;
		z-index: 120;
		width: 24px;
		height: 24px;
		padding: 4px;
		align-items: center;
		justify-content: center;
		border: 0;
		border-radius: 4px;
		background: none;
		color: var(--text-secondary);
		cursor: pointer;
	}
	.toggle:hover {
		color: var(--accent);
	}
	.toggle:focus-visible {
		outline: 2px solid var(--accent);
		outline-offset: 2px;
	}
	.bars {
		position: relative;
		display: block;
		width: 16px;
		height: 12px;
	}
	.bars span {
		position: absolute;
		left: 0;
		right: 0;
		height: 1px;
		background: currentColor;
		transition:
			transform 0.25s ease,
			opacity 0.25s ease,
			top 0.25s ease;
	}
	.bars span:nth-child(1) {
		top: 0;
	}
	.bars span:nth-child(2) {
		top: 5.5px;
	}
	.bars span:nth-child(3) {
		top: 11px;
	}
	[aria-expanded='true'] .bars span:nth-child(1) {
		top: 5.5px;
		transform: rotate(45deg);
	}
	[aria-expanded='true'] .bars span:nth-child(2) {
		opacity: 0;
	}
	[aria-expanded='true'] .bars span:nth-child(3) {
		top: 5.5px;
		transform: rotate(-45deg);
	}

	.panel {
		--row-pad: 20px;
		position: fixed;
		top: 72px;
		left: 0;
		right: 0;
		z-index: 115;
		padding: 12px 0 6px;
		background: var(--bg);
		border-bottom: 1px solid var(--hairline);
		box-shadow: 0 28px 64px -12px rgba(0, 0, 0, 0.5);
		opacity: 0;
		visibility: hidden;
		pointer-events: none;
		transform: translateY(-8px);
		transition:
			opacity 0.2s ease,
			visibility 0.2s ease,
			transform 0.25s var(--ease-out);
	}
	.panel.open {
		opacity: 1;
		visibility: visible;
		pointer-events: auto;
		transform: none;
	}
	/* Blurred scrim over the page, plus a solid strip behind the top chrome */
	.panel::before {
		content: '';
		position: fixed;
		inset: 0;
		z-index: -1;
		background: color-mix(in srgb, var(--bg) 58%, transparent);
		backdrop-filter: blur(26px) saturate(1.1);
	}
	.panel::after {
		content: '';
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		height: 72px;
		z-index: -1;
		background: var(--bg);
	}

	.links {
		display: flex;
		flex-direction: column;
	}
	.links a {
		display: block;
		padding: 11px var(--row-pad);
		color: var(--text);
		font-size: 15px;
		letter-spacing: -0.01em;
		text-decoration: none;
		border-bottom: 1px solid var(--hairline);
	}
	.links a:last-child {
		border-bottom: none;
	}
	.socials {
		display: flex;
		align-items: center;
		gap: 18px;
		min-height: 44px;
		padding: 9px var(--row-pad);
		border-top: 1px solid var(--hairline);
	}
	.socials a {
		color: var(--text-secondary);
		font-size: 13px;
		letter-spacing: -0.01em;
		text-decoration: none;
	}
	.links a:hover,
	.socials a:hover {
		color: var(--accent);
	}

	@media (max-width: 1023px) {
		.toggle {
			display: flex;
		}
	}
	@media (pointer: coarse) {
		.toggle {
			width: 44px;
			height: 44px;
			padding: 14px;
			right: 12px;
			top: 14px;
		}
	}
	@media (max-width: 480px) {
		.toggle {
			right: calc(max(25px, env(safe-area-inset-right)) - 14px);
			top: max(10px, calc(env(safe-area-inset-top) - 10px));
		}
		.panel {
			--row-pad: max(25px, env(safe-area-inset-left));
			top: 0;
			padding-top: calc(env(safe-area-inset-top, 0px) + 62px);
		}
		.panel::after {
			height: calc(env(safe-area-inset-top, 0px) + 62px);
		}
	}
</style>
