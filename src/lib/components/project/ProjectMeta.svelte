<script lang="ts">
	import Icon from '#lib/components/ui/Icon.svelte';
	import { readingTime } from '#lib/data/projects.ts';
	import type { Project } from '#lib/types/index.ts';

	/** The one meta line every project card shares: type · year · reading time. */
	let { project }: { project: Project } = $props();
</script>

<span class="meta label">
	<Icon name={project.type === 'design' ? 'layers' : 'code'} size={11} />
	{project.type === 'design' ? 'Design' : 'Code'} · {project.year ?? '—'} ·
	<Icon name="clock" size={11} />
	{readingTime(project)} min
</span>

<style>
	.meta {
		display: inline-flex;
		align-items: center;
		gap: 5px;
		white-space: nowrap;
	}
</style>
