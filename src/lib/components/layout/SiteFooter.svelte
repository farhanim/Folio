<script lang="ts">
	import { page } from '$app/state';
	import Icon from '#lib/components/ui/Icon.svelte';
	import { site } from '#lib/data/site.ts';

	/**
	 * Closing line on every page except home (home's contact section has its own):
	 * the copyright on the left and a "Back to top" link on the right. It also
	 * leaves room at the bottom so nothing sits under the dock.
	 */
	const show = $derived(page.url.pathname !== '/');

	function toTop(e: MouseEvent) {
		e.preventDefault();
		const smooth = !matchMedia('(prefers-reduced-motion: reduce)').matches;
		scrollTo({ top: 0, behavior: smooth ? 'smooth' : 'auto' });
		// Hand focus back to the top of the page for keyboard users
		document.querySelector<HTMLElement>('main')?.focus({ preventScroll: true });
	}
</script>

{#if show}
	<footer class="site-footer frame">
		<div class="colophon">
			<span>© {site.year} {site.name}</span>
			<a href="#top" class="top" onclick={toTop}>
				Back to top <Icon name="arrowUp" size={12} />
			</a>
		</div>
	</footer>
{/if}

<style>
	.site-footer {
		position: relative;
		z-index: 1;
		padding-bottom: 120px;
	}
	.colophon {
		grid-column: 1 / -1;
		display: flex;
		align-items: center;
		gap: 24px;
		padding-top: 20px;
		border-top: 1px solid var(--hairline);
		font-family: var(--font-mono);
		font-size: 11px;
		color: var(--text-secondary);
	}
	.top {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		margin-left: auto;
		color: var(--text-secondary);
		text-decoration: none;
		transition: color 0.2s ease;
	}
	.top:hover {
		color: var(--text);
	}
	.top :global(svg) {
		transition: transform 0.3s var(--ease-out);
	}
	.top:hover :global(svg) {
		transform: translateY(-2px);
	}
	/* Phones: clear the floating CTA and the dock */
	@media (max-width: 600px) {
		.site-footer {
			padding-bottom: 190px;
		}
		.colophon {
			gap: 12px;
		}
	}
</style>
