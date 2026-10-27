<script lang="ts">
	import ProjectIndex from '#lib/components/home/ProjectIndex.svelte';
	import { featuredProjects, projects } from '#lib/data/projects.ts';
	import { site } from '#lib/data/site.ts';
</script>

<svelte:head>
	<title>Work — {site.name}</title>
</svelte:head>

<header class="intro frame">
	<span class="label">Archive</span>
	<h1>All work</h1>
	<p>Case studies in design and code. Recommended reads first.</p>
</header>

<ProjectIndex {projects} picks={featuredProjects} />

<style>
	.intro {
		padding-top: 56px;
	}
	.intro > * {
		grid-column: 1 / -1;
	}
	h1 {
		margin: 10px 0 0;
		font-size: clamp(48px, 7vw, 112px);
		font-weight: 400;
		letter-spacing: -0.055em;
		line-height: 0.95;
	}
	p {
		margin-top: 16px;
		color: var(--text-secondary);
	}
</style>
