<script lang="ts">
	import { settings } from '#lib/stores/settings.svelte.ts';
</script>

<!--
	The page's column grid drawn as hairlines, using the same .frame as the content so
	every edge lines up. Print-style registration marks (+) sit where the columns meet
	the top bar.
-->
<div class="overlay" class:hidden={!settings.grid} aria-hidden="true">
	<div class="frame">
		{#each { length: 12 }, i (i)}
			<span class="col"></span>
		{/each}
	</div>
</div>

<style>
	.overlay {
		position: fixed;
		inset: 0;
		z-index: 0;
		pointer-events: none;
		transition: opacity 0.4s ease;
	}
	.overlay.hidden {
		opacity: 0;
	}
	.frame {
		height: 100%;
	}
	.col {
		position: relative;
		height: 100%;
		border-inline: 1px solid var(--grid-line);
	}
	.col::before,
	.col::after {
		content: '';
		position: absolute;
		top: calc(var(--bar) - 5px);
		width: 9px;
		height: 9px;
		background:
			linear-gradient(var(--rule), var(--rule)) center / 1px 100% no-repeat,
			linear-gradient(var(--rule), var(--rule)) center / 100% 1px no-repeat;
		opacity: 0.7;
	}
	.col::before {
		left: -5px;
	}
	.col::after {
		right: -5px;
	}

	@media (max-width: 1023px) {
		.col:nth-child(n + 7) {
			display: none;
		}
	}
	@media (max-width: 600px) {
		.col:nth-child(n + 5) {
			display: none;
		}
	}
</style>
