<script lang="ts">
	import { site, socials } from '#lib/data/site.ts';
	import Icon from '#lib/components/ui/Icon.svelte';
	import { reveal } from '#lib/utils/reveal.ts';

	const headline = "Let's make something good.";
	const SPACE = ' ';

	let copied = $state(false);
	let timer: ReturnType<typeof setTimeout>;

	async function copyEmail() {
		try {
			await navigator.clipboard.writeText(site.email);
			copied = true;
			clearTimeout(timer);
			timer = setTimeout(() => (copied = false), 1800);
		} catch {
			location.href = `mailto:${site.email}`;
		}
	}
</script>

<footer class="contact frame" id="contact" use:reveal>
	<span class="label head" data-reveal>Contact</span>

	<h2 class="big" data-reveal aria-label={headline}>
		{#each headline.split(' ') as word, w (w)}
			<span class="word" aria-hidden="true">
				{#each word as char, c (c)}<span class="ch" style:--i={c}>{char}</span>{/each}
			</span>{SPACE}
		{/each}
	</h2>

	<div class="actions" data-reveal>
		<a class="mail" href="mailto:{site.email}">
			<span>{site.email}</span>
			<Icon name="arrowUpRight" size={20} />
		</a>
		<button type="button" class="copy" class:copied onclick={copyEmail}>
			<Icon name={copied ? 'check' : 'copy'} size={14} />
			<span aria-live="polite">{copied ? 'Copied' : 'Copy'}</span>
		</button>
	</div>

	<ul class="socials" data-reveal>
		{#each socials as s (s.href)}
			<li>
				<a href={s.href} target="_blank" rel="noopener">
					{s.label}
					<Icon name="arrowUpRight" size={14} />
				</a>
			</li>
		{/each}
	</ul>

	<div class="colophon" data-reveal>
		<span>© {site.year} {site.name}</span>
		<span>Set in Inter Tight &amp; JetBrains Mono</span>
		<span>Built with SvelteKit + Bun</span>
		<a href="#index" class="top">
			Back to top <Icon name="arrowUp" size={12} />
		</a>
	</div>
</footer>

<style>
	.contact {
		padding-top: 72px;
		padding-bottom: 120px;
		border-top: 1px solid var(--rule);
	}
	.head {
		grid-column: 1 / -1;
	}

	.big {
		grid-column: 1 / -1;
		margin: 40px 0 0;
		font-size: clamp(48px, 9vw, 160px);
		font-weight: 420;
		letter-spacing: -0.055em;
		line-height: 0.92;
	}
	.word {
		display: inline-block;
		white-space: nowrap;
	}
	/* Letters hop in a wave as the pointer passes over the line */
	.ch {
		display: inline-block;
		transition:
			transform 0.5s var(--ease-out),
			color 0.4s ease;
		transition-delay: calc(var(--i) * 18ms);
	}
	.big:hover .ch {
		transform: translateY(-0.06em);
	}
	.word:hover .ch {
		color: var(--amber);
		transform: translateY(-0.12em) rotate(-3deg);
	}

	.actions {
		grid-column: 1 / span 7;
		display: flex;
		align-items: center;
		gap: 12px;
		flex-wrap: wrap;
		margin-top: 48px;
	}
	.mail {
		display: inline-flex;
		align-items: center;
		gap: 10px;
		padding-bottom: 4px;
		border-bottom: 1px solid var(--rule);
		color: var(--text);
		font-size: clamp(20px, 2.2vw, 30px);
		letter-spacing: -0.03em;
		text-decoration: none;
		transition: border-color 0.3s ease;
	}
	.mail :global(svg) {
		transition: transform 0.5s var(--ease-out);
	}
	.mail:hover {
		border-color: var(--text);
	}
	.mail:hover :global(svg) {
		transform: rotate(45deg);
	}
	.copy {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		padding: 7px 12px;
		border: 1px solid var(--hairline);
		border-radius: 999px;
		background: none;
		color: var(--text-secondary);
		font: inherit;
		font-size: 12px;
		cursor: pointer;
		transition:
			color 0.2s ease,
			border-color 0.2s ease,
			background-color 0.3s ease;
	}
	.copy:hover {
		color: var(--text);
		border-color: var(--rule);
	}
	.copy.copied {
		background: var(--text);
		border-color: var(--text);
		color: var(--bg);
	}

	.socials {
		grid-column: 9 / -1;
		align-self: end;
		display: grid;
		margin: 48px 0 0;
		padding: 0;
		list-style: none;
	}
	.socials a {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 10px 0;
		border-bottom: 1px solid var(--hairline);
		color: var(--text-secondary);
		font-size: 14px;
		text-decoration: none;
		transition:
			color 0.2s ease,
			padding 0.4s var(--ease-out);
	}
	.socials a:hover {
		color: var(--text);
		padding-left: 8px;
	}

	.colophon {
		grid-column: 1 / -1;
		display: flex;
		gap: 24px;
		flex-wrap: wrap;
		margin-top: 80px;
		font-family: var(--font-mono);
		font-size: 11px;
		color: var(--text-secondary);
	}
	.top {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		margin-left: auto;
		color: var(--text-secondary);
		text-decoration: none;
	}
	.top:hover {
		color: var(--text);
	}

	@media (max-width: 1023px) {
		.actions,
		.socials {
			grid-column: 1 / -1;
		}
	}
	@media (max-width: 600px) {
		.colophon {
			flex-direction: column;
			gap: 6px;
		}
		.top {
			margin-left: 0;
		}
	}
</style>
