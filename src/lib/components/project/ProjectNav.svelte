<script lang="ts">
	import Icon from '#lib/components/ui/Icon.svelte';
	import type { Project } from '#lib/types/index.ts';

	/** Previous / next project cards at the end of a project page. Also bound to [ and ]. */
	let { prev, next }: { prev: Project; next: Project } = $props();
</script>

<nav class="pager" aria-label="More projects">
	<a class="card prev" href="/work/{prev.slug}">
		<span class="dir label"><Icon name="arrowLeft" size={13} /> Previous</span>
		<span class="body">
			<img src={prev.cover} alt="" loading="lazy" />
			<span>
				<span class="kind label"
					>{prev.type === 'design' ? 'Design' : 'Code'} · {prev.year ?? '—'}</span
				>
				<span class="title">{prev.title}</span>
			</span>
		</span>
	</a>
	<a class="card next" href="/work/{next.slug}">
		<span class="dir label">Next <Icon name="arrowRight" size={13} /></span>
		<span class="body">
			<span>
				<span class="kind label"
					>{next.type === 'design' ? 'Design' : 'Code'} · {next.year ?? '—'}</span
				>
				<span class="title">{next.title}</span>
			</span>
			<img src={next.cover} alt="" loading="lazy" />
		</span>
	</a>
</nav>

<style>
	/* On the page grid: each card takes half the content columns */
	.pager {
		grid-column: 1 / -1;
		display: grid;
		grid-template-columns: subgrid;
		row-gap: var(--gap);
		padding: 40px 0 120px;
	}
	.card {
		grid-column: span 5;
	}
	.card {
		display: flex;
		flex-direction: column;
		gap: 16px;
		padding: 22px;
		border-radius: 18px;
		border: 1px solid var(--hairline);
		background: var(--card);
		color: var(--text);
		text-decoration: none;
		overflow: hidden;
		transition:
			border-color 0.3s ease,
			transform 0.5s var(--ease-out);
	}
	.card:hover {
		border-color: var(--rule);
	}
	.next {
		align-items: flex-end;
		text-align: right;
	}
	.dir {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		transition: gap 0.4s var(--ease-out);
	}
	.card:hover .dir {
		gap: 12px;
	}
	.body {
		display: flex;
		align-items: center;
		gap: 18px;
	}
	.body img {
		width: 120px;
		aspect-ratio: 4 / 3;
		object-fit: cover;
		border-radius: 10px;
		background: var(--surface);
		transition: transform 0.6s var(--ease-out);
	}
	.prev:hover img {
		transform: translateX(6px) rotate(-3deg);
	}
	.next:hover img {
		transform: translateX(-6px) rotate(3deg);
	}
	.kind {
		display: block;
	}
	.title {
		display: block;
		margin-top: 4px;
		font-size: clamp(20px, 2.2vw, 30px);
		letter-spacing: -0.035em;
		line-height: 1.05;
	}

	@media (max-width: 1023px) {
		.card {
			grid-column: span 3;
		}
	}
	@media (max-width: 600px) {
		.card {
			grid-column: 1 / -1;
		}
		.body img {
			width: 80px;
		}
	}
</style>
