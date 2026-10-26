<script lang="ts">
	import BioLink from '#lib/components/home/BioLink.svelte';
	import PolaroidPreview from '#lib/components/home/PolaroidPreview.svelte';
	import RoleRotator from '#lib/components/home/RoleRotator.svelte';
	import SiteNav from '#lib/components/home/SiteNav.svelte';
	import WorkMarquee from '#lib/components/home/WorkMarquee.svelte';
	import { bioLinks, roles, site, work } from '#lib/data/site.ts';
</script>

<svelte:head>
	<title>{site.name}</title>
	<meta name="description" content="{site.name} — designer and engineer building interfaces." />
</svelte:head>

<section class="entrance">
	<SiteNav />

	<div class="bio">
		<p>
			I build <RoleRotator words={roles} /> for teams that are trying to do something that matters. I’ve
			shipped work at <BioLink link={bioLinks.pos} />,
			<BioLink link={bioLinks.studio} tilt="2deg" />, and&nbsp;<BioLink
				link={bioLinks.labs}
				tilt="-2.5deg"
			/>; from first sketch through&nbsp;launch, and&nbsp;beyond.
		</p>
		<p>Today I’m crafting things at <a class="hairline-link" href="/work">Folio</a>.</p>
	</div>

	<WorkMarquee items={work} />
</section>

<PolaroidPreview />

<style>
	.entrance {
		grid-column: 1 / -1;
		display: grid;
		grid-template-columns: subgrid;
		align-content: start;
		padding-top: 96px;
		padding-bottom: 44px;
	}

	.bio {
		grid-column: 1 / span 2;
		max-width: 296px;
		font-size: calc(14px * var(--text-scale));
		line-height: 1.55;
		letter-spacing: -0.01em;
		color: var(--text-secondary);
		text-wrap: pretty;
		animation: rise 0.8s var(--ease-out) both;
	}
	.bio p + p {
		margin-top: 14px;
	}

	@keyframes rise {
		from {
			opacity: 0;
			transform: translateY(8px);
		}
	}

	@media (min-width: 1024px) {
		.entrance {
			padding-bottom: 0;
		}
		.bio {
			grid-column: 2 / span 2;
			grid-row: 1;
		}
	}
	@media (min-width: 1440px) {
		.bio {
			grid-column: 3 / span 2;
		}
	}
	@media (max-width: 1023px) {
		.entrance {
			display: flex;
			flex-direction: column;
			padding-top: 78px;
			padding-bottom: 20px;
		}
		.bio {
			margin-top: auto;
			padding-top: 44px;
		}
	}
	@media (max-width: 480px) {
		.bio {
			max-width: 100%;
			font-size: calc(16px * var(--text-scale));
			line-height: 1.65;
			padding-top: 52px;
		}
	}
</style>
