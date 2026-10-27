<script lang="ts">
	import type { Client } from '#lib/types/index.ts';

	/** Client logo chip for the top-right of a project image; the name slides out on hover. */
	let { client, size = 'md' }: { client: Client; size?: 'sm' | 'md' } = $props();
</script>

<span class="badge {size}" title={client.name}>
	<span class="name">{client.name}</span>
	<img src={client.logo} alt="{client.name} logo" />
</span>

<style>
	.badge {
		display: inline-flex;
		align-items: center;
		gap: 0;
		height: 32px;
		padding: 3px;
		border-radius: 999px;
		background: color-mix(in srgb, var(--bg) 85%, transparent);
		backdrop-filter: blur(10px);
		border: 1px solid var(--hairline);
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
		transition: gap 0.4s var(--ease-out);
	}
	img {
		width: 24px;
		height: 24px;
		border-radius: 999px;
		flex: none;
	}
	.name {
		max-width: 0;
		overflow: hidden;
		white-space: nowrap;
		font-size: 12px;
		color: var(--text);
		opacity: 0;
		transition:
			max-width 0.45s var(--ease-out),
			opacity 0.3s ease,
			padding 0.45s var(--ease-out);
	}
	:global(a:hover) .badge .name,
	.badge:hover .name {
		max-width: 160px;
		opacity: 1;
		padding-left: 8px;
	}
	:global(a:hover) .badge,
	.badge:hover {
		gap: 6px;
	}
	.sm {
		height: 26px;
		padding: 2px;
	}
	.sm img {
		width: 20px;
		height: 20px;
	}
</style>
