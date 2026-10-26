<script lang="ts">
	import { page } from '$app/state';
</script>

<svelte:head>
	<title>{page.status === 404 ? 'Coming soon' : 'Error'}</title>
</svelte:head>

<section class="error">
	<p class="code">{page.status}</p>
	<h1>{page.status === 404 ? 'This page is still being written.' : page.error?.message}</h1>
	<p><a class="hairline-link" href="/">Back home</a></p>
</section>

<style>
	.error {
		grid-column: 1 / -1;
		padding-top: 96px;
		max-width: 296px;
		font-size: calc(14px * var(--text-scale));
		line-height: 1.55;
		letter-spacing: -0.01em;
		color: var(--text-secondary);
	}
	.code {
		font-size: 12px;
		opacity: 0.6;
	}
	h1 {
		margin: 6px 0 14px;
		font: inherit;
		color: var(--text);
	}
	@media (min-width: 1024px) {
		.error {
			grid-column: 2 / span 2;
		}
	}
	@media (min-width: 1440px) {
		.error {
			grid-column: 3 / span 2;
		}
	}
</style>
