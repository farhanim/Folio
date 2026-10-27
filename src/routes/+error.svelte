<script lang="ts">
	import { page } from '$app/state';
</script>

<svelte:head>
	<title>{page.status === 404 ? 'Coming soon' : 'Error'}</title>
</svelte:head>

<section class="error frame">
	<span class="label">({page.status})</span>
	<h1>{page.status === 404 ? 'This page is still being written.' : page.error?.message}</h1>
	<p><a class="hairline-link" href="/">Back to the index</a></p>
</section>

<style>
	.error {
		align-content: start;
		min-height: calc(100svh - var(--bar));
		padding-top: 72px;
	}
	.label,
	h1,
	p {
		grid-column: 1 / span 8;
	}
	h1 {
		margin: 16px 0 24px;
		font-size: clamp(36px, 5vw, 72px);
		font-weight: 400;
		letter-spacing: -0.045em;
		line-height: 1;
	}
	p {
		color: var(--text-secondary);
	}
	@media (max-width: 1023px) {
		.label,
		h1,
		p {
			grid-column: 1 / -1;
		}
	}
</style>
