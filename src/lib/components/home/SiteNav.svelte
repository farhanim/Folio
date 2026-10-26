<script lang="ts">
	import { pages, socials } from '#lib/data/site.ts';
</script>

<!-- Desktop: sticky rail left of the copy. Below 1024px the mobile menu takes over. -->
<nav class="site-nav" aria-label="Site">
	<div class="pages">
		{#each pages as page (page.href)}
			<a href={page.href}>{page.label}</a>
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
</nav>

<style>
	.site-nav {
		display: none;
	}

	@media (min-width: 1024px) {
		.site-nav {
			grid-column: 1 / span 1;
			grid-row: 1;
			align-self: start;
			position: sticky;
			top: 96px;
			z-index: 90;
			display: flex;
			flex-direction: column;
			gap: 22px;
		}
		.pages,
		.socials {
			display: flex;
			flex-direction: column;
		}
		a {
			display: block;
			padding: 5px 0;
			font-size: 13px;
			font-weight: 400;
			letter-spacing: -0.01em;
			color: var(--text-secondary);
			opacity: 0.6;
			text-decoration: none;
			transition:
				color 0.15s ease,
				opacity 0.15s ease;
		}
		.pages a:first-child {
			padding-top: 0;
		}
		a:hover {
			color: var(--text);
			opacity: 1;
		}
	}
	@media (min-width: 1440px) {
		.site-nav {
			grid-column: 2 / span 1;
		}
	}
</style>
