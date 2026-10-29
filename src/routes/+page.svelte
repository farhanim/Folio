<script lang="ts">
	import Contact from '#lib/components/home/Contact.svelte';
	import Hero from '#lib/components/home/Hero.svelte';
	import ProjectIndex from '#lib/components/home/ProjectIndex.svelte';
	import { featuredProjects, projects } from '#lib/data/projects.ts';
	import { site } from '#lib/data/site.ts';
</script>

<svelte:head>
	<title>{site.name} · {site.role}</title>
	<meta name="description" content="{site.name}, {site.role.toLowerCase()} in {site.location}." />
</svelte:head>

<Hero />
<div id="work">
	<ProjectIndex {projects} picks={featuredProjects} />
</div>
<Contact />
