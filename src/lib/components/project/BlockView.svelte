<script lang="ts">
	import type { Block } from '#lib/types/index.ts';
	import { reveal } from '#lib/utils/reveal.ts';

	/** Renders one content block of a project page. */
	let { block }: { block: Block } = $props();

	let copied = $state(false);
	async function copy(code: string) {
		try {
			await navigator.clipboard.writeText(code);
			copied = true;
			setTimeout(() => (copied = false), 1500);
		} catch {
			// clipboard unavailable
		}
	}
</script>

<section class="block kind-{block.kind}" id={block.id} use:reveal>
	<h2 class="label">{block.title}</h2>

	{#if block.kind === 'text'}
		{#each block.body as paragraph, i (i)}
			<p class:lead={i === 0}>{paragraph}</p>
		{/each}
	{:else if block.kind === 'stats'}
		<dl class="stats">
			{#each block.items as item (item.label)}
				<div>
					<dt>{item.value}</dt>
					<dd>{item.label}</dd>
				</div>
			{/each}
		</dl>
	{:else if block.kind === 'gallery'}
		<div class="gallery {block.layout}">
			{#each block.images as image (image.src)}
				<figure>
					<img src={image.src} alt={image.alt} loading="lazy" decoding="async" />
				</figure>
			{/each}
		</div>
		{#if block.caption}<p class="caption">{block.caption}</p>{/if}
	{:else if block.kind === 'quote'}
		<blockquote>
			<p>“{block.quote}”</p>
			<footer><strong>{block.author}</strong> — {block.role}</footer>
		</blockquote>
	{:else if block.kind === 'code'}
		<div class="code">
			<div class="code-bar">
				<span class="dots" aria-hidden="true"><i></i><i></i><i></i></span>
				<span class="label">{block.language}</span>
				<button type="button" onclick={() => copy(block.code)}>{copied ? 'Copied' : 'Copy'}</button>
			</div>
			<pre><code>{block.code}</code></pre>
		</div>
		{#if block.caption}<p class="caption">{block.caption}</p>{/if}
	{/if}
</section>

<style>
	.block {
		padding: 48px 0;
		border-top: 1px solid var(--hairline);
	}
	h2 {
		margin: 0 0 20px;
	}
	p {
		max-width: 62ch;
		color: var(--text-secondary);
		font-size: calc(16px * var(--text-scale));
		line-height: 1.65;
	}
	p + p {
		margin-top: 14px;
	}
	.lead {
		color: var(--text);
		font-size: calc(clamp(20px, 1.8vw, 26px) * var(--text-scale));
		line-height: 1.4;
		letter-spacing: -0.02em;
	}

	/* Stats: hairline-divided grid of big numbers */
	.stats {
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		margin: 0;
		border-top: 1px solid var(--hairline);
	}
	.stats div {
		padding: 22px 20px 22px 0;
		border-bottom: 1px solid var(--hairline);
	}
	.stats div + div {
		padding-left: 20px;
		border-left: 1px solid var(--hairline);
	}
	dt {
		font-size: clamp(30px, 3.4vw, 48px);
		font-weight: 450;
		letter-spacing: -0.04em;
		line-height: 1;
	}
	dd {
		margin: 10px 0 0;
		font-size: 13px;
		color: var(--text-secondary);
	}

	/* Gallery */
	.gallery {
		display: grid;
		gap: 16px;
	}
	.gallery.row {
		grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
	}
	figure {
		margin: 0;
		overflow: hidden;
		border-radius: 14px;
		background: var(--surface);
	}
	figure img {
		display: block;
		width: 100%;
		height: 100%;
		aspect-ratio: 16 / 10;
		object-fit: cover;
		transition: transform 0.9s var(--ease-out);
	}
	figure:hover img {
		transform: scale(1.03);
	}
	.caption {
		margin-top: 12px;
		font-size: 13px;
	}

	/* Quote */
	blockquote {
		margin: 0;
		padding-left: 24px;
		border-left: 2px solid var(--amber);
	}
	blockquote p {
		max-width: 30ch;
		color: var(--text);
		font-size: clamp(24px, 2.6vw, 38px);
		line-height: 1.2;
		letter-spacing: -0.03em;
	}
	blockquote footer {
		margin-top: 16px;
		font-size: 13px;
		color: var(--text-secondary);
	}
	blockquote strong {
		color: var(--text);
		font-weight: 500;
	}

	/* Code */
	.code {
		overflow: hidden;
		border-radius: 14px;
		background: #15130f;
		color: #e8e4df;
		border: 1px solid var(--hairline);
	}
	.code-bar {
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 10px 14px;
		background: #1f1c17;
	}
	.code-bar .label {
		color: #9a9490;
	}
	.dots {
		display: flex;
		gap: 6px;
	}
	.dots i {
		width: 9px;
		height: 9px;
		border-radius: 50%;
		background: #3c3830;
	}
	.code-bar button {
		margin-left: auto;
		padding: 3px 10px;
		border: 1px solid #3c3830;
		border-radius: 999px;
		background: none;
		color: #e8e4df;
		font: inherit;
		font-size: 11px;
		cursor: pointer;
	}
	pre {
		margin: 0;
		padding: 18px;
		overflow-x: auto;
		font-family: var(--font-mono);
		font-size: 13px;
		line-height: 1.7;
	}

	@media (max-width: 600px) {
		.stats {
			grid-template-columns: 1fr 1fr;
		}
		.stats div:nth-child(odd) {
			padding-left: 0;
			border-left: 0;
		}
	}
</style>
