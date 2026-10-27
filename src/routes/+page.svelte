<script lang="ts">
	import Contact from '#lib/components/home/Contact.svelte';
	import Desk from '#lib/components/home/Desk.svelte';
	import Hero from '#lib/components/home/Hero.svelte';
	import WorkIndex from '#lib/components/home/WorkIndex.svelte';
	import { projects, site } from '#lib/data/site.ts';
</script>

<svelte:head>
	<title>{site.name} — {site.role}</title>
	<meta name="description" content="{site.name}, {site.role.toLowerCase()} in {site.location}." />
</svelte:head>

<Hero />
<WorkIndex {projects} />
<Desk />
<Contact />
