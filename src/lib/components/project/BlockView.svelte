<script lang="ts">
	import type { Block } from '#lib/types/index.ts';
	import { reveal } from '#lib/utils/reveal.ts';

	/** Renders one content block of a project page. */
	let { block }: { block: Block } = $props();

	// Gallery images take whole-column spans: one image fills the content width,
	// two sit side by side, three become one wide + two halves (and so on).
	const wide = (i: number, n: number) => n === 1 || (n % 2 === 1 && i === 0);

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

	<div class="content">
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
			<div class="gallery">
				{#each block.images as image, i (image.src)}
					<figure class:wide={wide(i, block.images.length)}>
						<img src={image.src} alt={image.alt} loading="lazy" decoding="async" />
					</figure>
				{/each}
			</div>
			{#if block.caption}<p class="caption">{block.caption}</p>{/if}
		{:else if block.kind === 'quote'}
			<blockquote>
				<p>“{block.quote}”</p>
				<footer><strong>{block.author}</strong>, {block.role}</footer>
			</blockquote>
		{:else if block.kind === 'code'}
			<div class="code">
				<div class="code-bar">
					<span class="dots" aria-hidden="true"><i></i><i></i><i></i></span>
					<span class="label">{block.language}</span>
					<button type="button" onclick={() => copy(block.code)}
						>{copied ? 'Copied' : 'Copy'}</button
					>
				</div>
				<pre><code>{block.code}</code></pre>
			</div>
			{#if block.caption}<p class="caption">{block.caption}</p>{/if}
		{:else if block.kind === 'features'}
			<ol class="features">
				{#each block.items as f, i (f.title)}
					<li>
						<span class="num label">{String(i + 1).padStart(2, '0')}</span>
						<b>{f.title}</b>
						<span>{f.body}</span>
					</li>
				{/each}
			</ol>
		{:else if block.kind === 'impact'}
			{#if block.intro}<p class="lead">{block.intro}</p>{/if}
			<ul class="impact">
				{#each block.items as item (item)}
					<li><span class="tick" aria-hidden="true"></span>{item}</li>
				{/each}
			</ul>
		{:else if block.kind === 'stack'}
			<div class="stack">
				{#each block.groups as g (g.label)}
					<div class="layer">
						<span class="label">{g.label}</span>
						<ul>
							{#each g.items as item (item.name)}
								<li>
									<b>{item.name}</b>{#if item.why}<span>{item.why}</span>{/if}
								</li>
							{/each}
						</ul>
					</div>
				{/each}
			</div>
		{/if}
	</div>
</section>

<style>
	/*
	 * On the page grid (the block is a subgrid of the 10-column content area):
	 * label in cols 1–2, content in cols 3–10 — itself a subgrid, so text,
	 * stats and images use whole columns.
	 */
	.block,
	.content,
	.stats,
	.gallery {
		display: grid;
		grid-template-columns: subgrid;
		align-content: start;
	}
	.block {
		grid-column: 1 / -1;
		padding: 32px 0;
		border-top: 1px solid var(--hairline);
	}
	h2 {
		grid-column: 1 / span 2;
		margin: 0 0 20px;
	}
	.content {
		grid-column: 3 / -1;
	}
	.content > :global(*) {
		grid-column: 1 / -1;
	}
	.content > p,
	.content > .caption {
		grid-column: 1 / span 6;
	}
	p {
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
	/* Stats: two columns per figure; the page's column lines are the dividers */
	.stats {
		margin: 0;
	}
	.stats div {
		grid-column: span 2;
		padding: 22px 0;
		border-top: 1px solid var(--hairline);
	}
	dt {
		font-size: clamp(26px, 2.6vw, 38px);
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
		row-gap: var(--gap);
	}
	figure {
		grid-column: span 4;
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
	figure.wide {
		grid-column: 1 / -1;
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
		font-size: clamp(22px, 2.2vw, 30px);
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

	/* Features: two per row on the grid (4 columns each), numbered */
	.features,
	.impact,
	.stack {
		display: grid;
		grid-template-columns: subgrid;
		margin: 0;
		padding: 0;
		list-style: none;
	}
	.features {
		row-gap: 0;
	}
	.features li {
		grid-column: span 4;
		display: grid;
		grid-template-columns: 34px 1fr;
		column-gap: 10px;
		row-gap: 6px;
		padding: 20px 0;
		border-top: 1px solid var(--hairline);
	}
	.features .num {
		grid-row: span 2;
		padding-top: 3px;
	}
	.features b {
		font-size: 17px;
		font-weight: 500;
		letter-spacing: -0.02em;
	}
	.features span:last-child {
		font-size: 14px;
		line-height: 1.55;
		color: var(--text-secondary);
	}

	/* Impact: a checked list, two columns */
	.impact {
		row-gap: 0;
		margin-top: 8px;
	}
	.impact li {
		grid-column: span 4;
		display: flex;
		gap: 12px;
		padding: 14px 0;
		border-top: 1px solid var(--hairline);
		font-size: 15px;
		line-height: 1.5;
	}
	.tick {
		position: relative;
		flex: none;
		width: 18px;
		height: 18px;
		margin-top: 2px;
		border-radius: 50%;
		background: color-mix(in srgb, var(--amber) 22%, transparent);
	}
	.tick::after {
		content: '';
		position: absolute;
		left: 6px;
		top: 3px;
		width: 4px;
		height: 8px;
		border: solid var(--amber);
		border-width: 0 2px 2px 0;
		transform: rotate(45deg);
	}

	/* Stack: one row per layer — label in 2 columns, items 2 columns each */
	.layer,
	.layer ul {
		display: grid;
		grid-template-columns: subgrid;
	}
	.layer {
		grid-column: 1 / -1;
		padding: 16px 0;
		border-top: 1px solid var(--hairline);
	}
	.layer > .label {
		grid-column: 1 / span 2;
		padding-top: 3px;
	}
	.layer ul {
		grid-column: 3 / -1;
		row-gap: 14px;
		margin: 0;
		padding: 0;
		list-style: none;
	}
	.layer li {
		grid-column: span 2;
		display: flex;
		flex-direction: column;
		gap: 2px;
	}
	.layer b {
		font-size: 15px;
		font-weight: 500;
	}
	.layer li span {
		font-size: 13px;
		color: var(--text-secondary);
	}

	/* Tablet (6 cols): label on its own row, content full width */
	@media (max-width: 1023px) {
		h2,
		.content {
			grid-column: 1 / -1;
		}
		.content > p,
		.content > .caption {
			grid-column: 1 / span 5;
		}
		.stats div,
		figure,
		.features li,
		.impact li {
			grid-column: span 3;
		}
	}
	/* Phone (4 cols) */
	@media (max-width: 600px) {
		.content > p,
		.content > .caption,
		figure,
		.features li,
		.impact li,
		.layer > .label,
		.layer ul {
			grid-column: 1 / -1;
		}
		.stats div {
			grid-column: span 2;
		}
	}
</style>
