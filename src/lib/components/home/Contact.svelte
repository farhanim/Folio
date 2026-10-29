<script lang="ts">
	import { site, socials } from '#lib/data/site.ts';
	import Icon from '#lib/components/ui/Icon.svelte';
	import { profile } from '#lib/data/profile.ts';
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

	<!-- Email and CV actions share the same compact card format. -->
	<div class="actions" data-reveal>
		<div class="act">
			<a class="act-main" href="mailto:{site.email}">
				<span class="act-icon"><Icon name="mail" size={18} /></span>
				<span class="act-text">
					<span class="act-label">Send an email</span>
					<span class="act-value">{site.email}</span>
				</span>
			</a>
			<button
				type="button"
				class="act-end"
				class:copied
				onclick={copyEmail}
				aria-label={copied ? 'Email copied' : 'Copy email'}
			>
				<Icon name={copied ? 'check' : 'copy'} size={16} />
				<span class="tip" aria-live="polite">{copied ? 'Copied' : 'Copy'}</span>
			</button>
		</div>

		<a class="act cv" href={profile.cv} target="_blank" rel="noopener" aria-label="Download Hans Curriculum Vitae">
			<span class="act-main">
				<span class="act-icon"><Icon name="download" size={18} /></span>
				<span class="act-text">
					<span class="act-label">Or download a curriculum vitae</span>
					<span class="act-value">Hire me, Get a CV</span>
				</span>
			</span>
			<span class="act-end" aria-hidden="true"><Icon name="arrowUpRight" size={16} /></span>
		</a>
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
		grid-column: 1 / span 6;
		align-self: end;
		display: grid;
		gap: 10px;
		margin-top: 32px;
	}
	/* One card shape for both actions: icon chip, label over value, end action */
	.act {
		display: flex;
		align-items: center;
		gap: 12px;
		min-width: 0;
		height: 76px;
		padding: 0 12px 0 14px;
		border: 0;
		border-radius: 20px;
		background: var(--card);
		color: var(--text);
		text-decoration: none;
		transition:
			border-color 0.3s ease,
			transform 0.4s var(--ease-out);
	}
	.act:hover {
		transform: translateY(-2px);
	}
	.act:first-child {
		background: transparent;
		padding-left: 0;
	}
	.act.cv {
		position: relative;
		background: transparent;
		border: 0;
		padding-left: 0;
	}
	.act.cv::before {
		position: absolute;
		top: -5px;
		left: 0;
		right: 0;
		height: 1px;
		background: var(--hairline);
		content: '';
	}
	.act-main {
		display: flex;
		align-items: center;
		gap: 12px;
		flex: 1;
		min-width: 0;
		color: inherit;
		text-decoration: none;
	}
	.act-icon {
		display: grid;
		place-items: center;
		flex: none;
		width: 46px;
		height: 46px;
		border-radius: 14px;
		background: var(--surface);
		color: var(--text);
	}
	.act-icon {
		background: color-mix(in srgb, var(--amber) 6%, var(--card));
		color: var(--text);
		border: 1px solid var(--hairline);
	}
	.act-text {
		display: grid;
		min-width: 0;
		line-height: 1.25;
	}
	.act-label {
		font-family: var(--font-mono);
		font-size: 10px;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		color: var(--text-secondary);
	}
	.act-value {
		overflow: hidden;
		font-size: clamp(16px, 1.4vw, 19px);
		font-weight: 500;
		letter-spacing: -0.02em;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.act-end {
		position: relative;
		display: grid;
		place-items: center;
		flex: none;
		width: 40px;
		height: 40px;
		padding: 0;
		border: 0;
		border-radius: 50%;
		background: none;
		color: var(--text-secondary);
		cursor: pointer;
		transition:
			color 0.2s ease,
			background-color 0.3s ease,
			transform 0.5s var(--ease-out);
	}
	button.act-end:hover {
		color: var(--text);
	}
	.act-end.copied {
		background: var(--text);
		border-color: var(--text);
		color: var(--bg);
	}
	/* Small label that appears above the copy button */
	.tip {
		position: absolute;
		bottom: calc(100% + 6px);
		padding: 2px 8px;
		border-radius: 999px;
		background: var(--text);
		color: var(--bg);
		font-size: 11px;
		white-space: nowrap;
		opacity: 0;
		translate: 0 4px;
		pointer-events: none;
		transition:
			opacity 0.2s ease,
			translate 0.3s var(--ease-out);
	}
	.act-end:hover .tip,
	.act-end.copied .tip {
		opacity: 1;
		translate: 0 0;
	}
	.act:hover .act-end {
		transform: rotate(45deg);
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
		.actions {
			grid-template-columns: 1fr;
			gap: 10px;
		}
		.act {
			height: 68px;
		}
		.colophon {
			flex-direction: column;
			gap: 6px;
		}
		.top {
			margin-left: 0;
		}
	}
</style>

