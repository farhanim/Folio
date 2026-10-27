<script lang="ts">
	import CodeWork from '#lib/components/home/CodeWork.svelte';
	import Contact from '#lib/components/home/Contact.svelte';
	import DesignWork from '#lib/components/home/DesignWork.svelte';
	import Desk from '#lib/components/home/Desk.svelte';
	import Featured from '#lib/components/home/Featured.svelte';
	import Hero from '#lib/components/home/Hero.svelte';
	import { codeProjects, designProjects, featuredProjects } from '#lib/data/projects.ts';
	import { site } from '#lib/data/site.ts';
</script>

<svelte:head>
	<title>{site.name} — {site.role}</title>
	<meta name="description" content="{site.name}, {site.role.toLowerCase()} in {site.location}." />
</svelte:head>

<Hero />
<div id="work">
	<Featured projects={featuredProjects} />
	<DesignWork projects={designProjects} />
</div>
<CodeWork projects={codeProjects} />
<Desk />
<Contact />
