<script lang="ts">
	import CodeWork from '#lib/components/home/CodeWork.svelte';
	import DesignWork from '#lib/components/home/DesignWork.svelte';
	import Featured from '#lib/components/home/Featured.svelte';
	import { codeProjects, designProjects, featuredProjects } from '#lib/data/projects.ts';
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

<Featured projects={featuredProjects} />
<DesignWork projects={designProjects} />
<CodeWork projects={codeProjects} id="code-archive" />

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
