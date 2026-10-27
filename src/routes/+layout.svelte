<script lang="ts">
	import './layout.css';
	import favicon from '#lib/assets/favicon.svg';
	import AppShell from '#lib/components/AppShell.svelte';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} type="image/svg+xml" />
	<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
	<meta name="theme-color" content="#faf9f6" media="(prefers-color-scheme: light)" />
	<meta name="theme-color" content="#0e0c0a" media="(prefers-color-scheme: dark)" />
</svelte:head>

<AppShell>
	{@render children()}
</AppShell>
