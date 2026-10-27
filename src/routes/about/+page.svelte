<script lang="ts">
	import { slide } from 'svelte/transition';
	import Icon from '#lib/components/ui/Icon.svelte';
	import type { IconName } from '#lib/components/ui/icons.ts';
	import SectionHead from '#lib/components/ui/SectionHead.svelte';
	import TableOfContents from '#lib/components/ui/TableOfContents.svelte';
	import { companies } from '#lib/data/clients.ts';
	import { profile } from '#lib/data/profile.ts';
	import { site } from '#lib/data/site.ts';
	import type { Achievement } from '#lib/types/index.ts';
	import { reveal } from '#lib/utils/reveal.ts';

	const toc = [
		{ id: 'summary', label: 'Summary' },
		{ id: 'experience', label: 'Experience' },
		{ id: 'education', label: 'Education' },
		{ id: 'achievements', label: 'Highlights' },
		{ id: 'capabilities', label: 'Capabilities' },
		{ id: 'companies', label: 'Companies' }
	];

	const achievementIcon: Record<Achievement['kind'], IconName> = {
		award: 'award',
		talk: 'mic',
		cert: 'check',
		press: 'news',
		mentor: 'user',
		milestone: 'sparkle'
	};

	// Everywhere I've worked (jobs, the studio, mentoring), in CV order.
	const logoWall = [
		...new Map(
			[...profile.experience.map((e) => e.company), companies.myEduSolve].map((c) => [c.name, c])
		).values()
	];

	// A transparent cut-out is used when available, otherwise the framed photo.
	const portraitSrc = profile.portraitCutout ?? profile.portrait;

	// First role open by default; one at a time.
	let openRole = $state(0);

	// Portrait leans toward the cursor.
	let tilt = $state({ x: 0, y: 0 });
	function onPortraitMove(e: PointerEvent) {
		const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
		tilt = {
			x: ((e.clientY - r.top) / r.height - 0.5) * -10,
			y: ((e.clientX - r.left) / r.width - 0.5) * 10
		};
	}
</script>

<svelte:head>
	<title>Profile — {site.name}</title>
	<meta name="description" content={profile.headline} />
</svelte:head>

<div class="profile frame">
	<aside class="rail">
		<TableOfContents items={toc}>
			{#snippet footer()}
				<a class="cv" href={profile.cv}><Icon name="download" size={13} /> Download CV</a>
			{/snippet}
		</TableOfContents>
	</aside>

	<div class="main">
		<!-- Header -->
		<section class="header" id="summary">
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div
				class="portrait"
				class:cutout={!!profile.portraitCutout}
				onpointermove={onPortraitMove}
				onpointerleave={() => (tilt = { x: 0, y: 0 })}
				style:transform="perspective(800px) rotateX({tilt.x}deg) rotateY({tilt.y}deg)"
			>
				{#if profile.portraitCutout}
					<!-- A cut-out photo stands in front of a soft arch -->
					<span class="arch" aria-hidden="true"></span>
				{/if}
				<img class="bw" src={portraitSrc} alt="Portrait of {profile.fullName}" />
				<img class="color" src={portraitSrc} alt="" aria-hidden="true" />
				<span class="hello" aria-hidden="true">hi, I’m {profile.nickname}!</span>
				<span class="status label"
					><span class="dot"></span>{site.available ? 'Available' : 'Booked'}</span
				>
			</div>

			<div class="copy">
				<span class="label">Profile</span>
				<h1>{profile.headline}</h1>
				{#each profile.summary as p, i (i)}
					<p>{p}</p>
				{/each}
				<div class="actions">
					<a class="primary" href={profile.cv}><Icon name="download" size={14} /> Download CV</a>
					<a class="secondary" href="/#contact">Get in touch <Icon name="arrowRight" size={14} /></a
					>
				</div>
			</div>

			<p class="facts-label label">At a glance</p>
			<dl class="facts">
				{#each profile.facts as f (f.label)}
					<div>
						<dt class="label">{f.label}</dt>
						<dd>{f.value}</dd>
					</div>
				{/each}
			</dl>
		</section>

		<!-- Experience -->
		<section class="block" id="experience" use:reveal>
			<SectionHead
				eyebrow="Where I’ve worked"
				title="Experience"
				count={profile.experience.length}
			/>
			<ol class="timeline">
				{#each profile.experience as job, i (job.role + job.period)}
					<li class:open={openRole === i} data-reveal>
						<button
							type="button"
							class="job"
							aria-expanded={openRole === i}
							onclick={() => (openRole = openRole === i ? -1 : i)}
						>
							<span class="period label">{job.period}</span>
							<span class="who">
								<img src={job.company.logo} alt="" />
								<span>
									<span class="role">{job.role}</span>
									<span class="company">{job.company.name} · {job.location}</span>
								</span>
							</span>
							<span class="type label">{job.type}</span>
							<span class="toggle" aria-hidden="true"></span>
						</button>
						{#if openRole === i}
							<div class="details" transition:slide={{ duration: 350 }}>
								<p class="scope">{job.scope}</p>
								<p>{job.summary}</p>
								<ul>
									{#each job.highlights as h (h)}
										<li><Icon name="check" size={13} /> {h}</li>
									{/each}
								</ul>
							</div>
						{/if}
					</li>
				{/each}
			</ol>
		</section>

		<!-- Education -->
		<section class="block" id="education" use:reveal>
			<SectionHead eyebrow="Where I learned" title="Education" />
			<div class="edu">
				{#each profile.education as e (e.school)}
					<article class="tile" data-reveal>
						<div class="tile-head">
							<span class="label">{e.period}</span>
							{#if e.logo}<img src={e.logo} alt="" />{/if}
						</div>
						<h3>{e.school}</h3>
						<p>{e.degree}</p>
						{#if e.note}<p class="note">{e.note}</p>{/if}
					</article>
				{/each}
			</div>
		</section>

		<!-- Achievements -->
		<section class="block" id="achievements" use:reveal>
			<SectionHead
				eyebrow="Mentoring & milestones"
				title="Highlights"
				count={profile.achievements.length}
			/>
			<ul class="awards">
				{#each profile.achievements as a (a.title)}
					<li data-reveal>
						<span class="mark">
							<span class="icon"><Icon name={achievementIcon[a.kind]} size={18} /></span>
							<span class="year label">{a.year}</span>
						</span>
						<span class="title">{a.title}</span>
						<span class="issuer">{a.issuer}</span>
					</li>
				{/each}
			</ul>
		</section>

		<!-- Capabilities -->
		<section class="block" id="capabilities" use:reveal>
			<SectionHead eyebrow="What I bring" title="Capabilities" />
			<div class="caps">
				{#each profile.capabilities as c (c.group)}
					<div class="cap" data-reveal>
						<span class="label">{c.group}</span>
						<ul>
							{#each c.items as item (item)}<li>{item}</li>{/each}
						</ul>
					</div>
				{/each}
				{#if profile.languages.length}
					<div class="cap" data-reveal>
						<span class="label">Languages</span>
						<ul>
							{#each profile.languages as l (l.name)}
								<li>{l.name} <span class="level">{l.level}</span></li>
							{/each}
						</ul>
					</div>
				{/if}
			</div>
		</section>

		<!-- Companies -->
		<section class="block" id="companies" use:reveal>
			<SectionHead eyebrow="Teams I’ve worked with" title="Companies" />
			<ul class="logos" data-reveal>
				{#each logoWall as c (c.name)}
					<li data-tone={c.markTone ?? 'dark'}>
						<img src={c.mark ?? c.logo} alt="" /><span>{c.name}</span>
					</li>
				{/each}
			</ul>
		</section>
	</div>
</div>

<style>
	.profile {
		padding-top: 48px;
		padding-bottom: 140px;
	}
	.rail {
		grid-column: 1 / span 2;
	}
	/*
	 * Grid rules: the content area is cols 3–12 of the page grid, and every
	 * section below is a subgrid of it — so cards, rows and columns start and end
	 * exactly on the page's column lines (local cols 1–10 on desktop).
	 */
	.main,
	.main > section,
	.header,
	.timeline,
	.timeline > li,
	.job,
	.edu,
	.awards,
	.awards > li,
	.caps,
	.logos,
	.facts {
		display: grid;
		grid-template-columns: subgrid;
		grid-column: 1 / -1;
		align-content: start;
	}
	.main {
		grid-column: 3 / -1;
		min-width: 0;
	}
	.cv {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		color: var(--text);
		font-size: 13px;
		font-weight: 500;
		text-decoration: none;
	}

	/* ── Header ── */
	/* Portrait: local cols 1–3 · copy: 5–10 (col 4 is breathing room) */
	.header {
		row-gap: 48px;
		align-items: start;
		animation: enter 0.9s var(--ease-out) both;
	}
	.portrait {
		grid-column: 1 / span 3;
		position: relative;
		transition: transform 0.4s var(--ease-out);
		will-change: transform;
	}
	.copy {
		grid-column: 5 / -1;
	}
	/*
	 * One balanced tone for both versions — a touch brighter and punchier than the
	 * original so neither the B&W nor the colour reads too dark or washed out.
	 * The colour copy sits on top and fades in on hover.
	 */
	.portrait {
		--tone: brightness(1.04) contrast(1.12);
	}
	:global([data-theme='dark']) .portrait {
		--tone: brightness(1.08) contrast(1.1);
	}
	.portrait img {
		display: block;
		width: 100%;
		aspect-ratio: 4 / 5;
		object-fit: cover;
		object-position: 50% 30%;
		border-radius: 18px;
	}
	.bw {
		position: relative;
		background: var(--surface);
		box-shadow: 0 0 0 1px var(--rule);
		filter: grayscale(1) var(--tone);
	}
	.color {
		position: absolute;
		inset: 0;
		height: 100%;
		filter: var(--tone);
		opacity: 0;
		transition: opacity 1.2s var(--ease-out);
	}
	.portrait:hover .color {
		opacity: 1;
	}
	:global([data-theme='dark']) .bw {
		box-shadow:
			0 0 0 1px rgba(255, 255, 255, 0.22),
			0 24px 60px -20px color-mix(in srgb, var(--lamp-glow) 22%, transparent);
	}

	/* Cut-out variant: no frame; the figure stands in front of an arch and its
	   head rises slightly above it. */
	.cutout .arch {
		position: absolute;
		inset: 14% 0 0;
		border-radius: 999px 999px 18px 18px;
		background: var(--surface);
		box-shadow: inset 0 0 0 1px var(--hairline);
	}
	.cutout img {
		aspect-ratio: auto;
		height: auto;
		object-fit: contain;
		object-position: 50% 100%;
		border-radius: 0 0 18px 18px;
	}
	.cutout .bw {
		background: none;
		box-shadow: none;
		filter: grayscale(1) var(--tone) drop-shadow(0 18px 24px rgba(0, 0, 0, 0.18));
	}
	:global([data-theme='dark']) .cutout .bw {
		box-shadow: none;
	}
	/* Dark mode: a lighter, warm charcoal arch so the black sweater stays distinct */
	:global([data-theme='dark']) .cutout .arch {
		background: color-mix(in srgb, var(--text) 16%, var(--bg));
		box-shadow:
			inset 0 0 0 1px rgba(255, 255, 255, 0.12),
			0 30px 70px -30px color-mix(in srgb, var(--lamp-glow) 25%, transparent);
	}
	@media (prefers-reduced-motion: reduce) {
		.portrait:hover .color {
			opacity: 0;
		}
	}
	.hello {
		position: absolute;
		right: -10px;
		bottom: 18%;
		padding: 6px 14px;
		border-radius: 14px 14px 2px 14px;
		background: var(--text);
		color: var(--bg);
		font-family: var(--font-hand);
		font-size: 22px;
		rotate: -5deg;
		box-shadow: var(--shadow-float);
		animation: wave 3.2s ease-in-out infinite;
	}
	@keyframes wave {
		50% {
			rotate: 2deg;
			translate: 0 -4px;
		}
	}
	.status {
		position: absolute;
		top: 14px;
		left: 14px;
		display: inline-flex;
		align-items: center;
		gap: 6px;
		padding: 4px 10px;
		border-radius: 999px;
		background: color-mix(in srgb, var(--bg) 85%, transparent);
		backdrop-filter: blur(8px);
		color: var(--text);
	}
	.dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: #3fb27f;
	}
	h1 {
		margin: 10px 0 20px;
		font-size: clamp(32px, 3.6vw, 56px);
		font-weight: 420;
		letter-spacing: -0.045em;
		line-height: 1.02;
	}
	.copy p {
		max-width: 56ch;
		color: var(--text-secondary);
		font-size: calc(16px * var(--text-scale));
		line-height: 1.6;
	}
	.copy p + p {
		margin-top: 12px;
	}
	.actions {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		margin-top: 28px;
	}
	.primary,
	.secondary {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		height: 40px;
		padding: 0 16px;
		border-radius: 999px;
		font-size: 13px;
		text-decoration: none;
		transition: transform 0.3s var(--ease-out);
	}
	.primary {
		background: var(--text);
		color: var(--bg);
	}
	.secondary {
		border: 1px solid var(--rule);
		color: var(--text);
	}
	.primary:hover,
	.secondary:hover {
		transform: translateY(-2px);
	}
	/* Facts: a label in cols 1–2, then four facts of two columns each (3–10) */
	.facts-label {
		grid-column: 1 / span 2;
		grid-row: 2;
		margin: 0;
		padding-top: 16px;
		border-top: 1px solid var(--hairline);
	}
	.facts {
		grid-column: 3 / -1;
		grid-row: 2;
		margin: 0;
	}
	.facts div {
		grid-column: span 2;
		padding: 16px 0;
		border-top: 1px solid var(--hairline);
	}
	.facts dd {
		margin: 6px 0 0;
		font-size: 15px;
	}

	.block {
		padding-top: 72px;
	}

	/* ── Experience ── */
	.timeline {
		margin: -28px 0 0;
		padding: 0;
		list-style: none;
	}
	.timeline > li {
		border-bottom: 1px solid var(--hairline);
	}
	/* Row: period 1–2 · role 3–7 · type 8–9 · toggle 10; details under the role (3–10) */
	.job {
		align-items: center;
		width: 100%;
		padding: 20px 0;
		border: 0;
		background: none;
		color: var(--text);
		font: inherit;
		text-align: left;
		cursor: pointer;
	}
	.period {
		grid-column: 1 / span 2;
	}
	.who {
		grid-column: 3 / span 5;
		display: flex;
		align-items: center;
		gap: 14px;
	}
	.who img {
		width: 36px;
		height: 36px;
		border-radius: 10px;
		flex: none;
		box-shadow: 0 0 0 1px var(--hairline);
		transition: transform 0.5s var(--ease-out);
	}
	.job:hover .who img {
		transform: rotate(-8deg) scale(1.08);
	}
	.role {
		display: block;
		font-size: clamp(18px, 1.8vw, 24px);
		letter-spacing: -0.025em;
	}
	.company {
		display: block;
		font-size: 13px;
		color: var(--text-secondary);
	}
	.type {
		grid-column: 8 / span 2;
		justify-self: start;
		padding: 3px 8px;
		border: 1px solid var(--hairline);
		border-radius: 999px;
	}
	/* Plus that turns into a minus */
	.toggle {
		grid-column: 10;
		justify-self: end;
		position: relative;
		width: 14px;
		height: 14px;
	}
	.toggle::before,
	.toggle::after {
		content: '';
		position: absolute;
		left: 0;
		top: 50%;
		width: 14px;
		height: 1.5px;
		background: currentColor;
		transition: transform 0.4s var(--ease-out);
	}
	.toggle::after {
		transform: rotate(90deg);
	}
	.open .toggle::after {
		transform: rotate(0);
	}
	.details {
		grid-column: 3 / span 6;
		padding: 0 0 22px;
	}
	.details p {
		color: var(--text-secondary);
		font-size: 14px;
	}
	.details .scope {
		margin-bottom: 4px;
		color: var(--text);
		font-weight: 500;
	}
	.details ul {
		display: grid;
		gap: 6px;
		margin: 12px 0 0;
		padding: 0;
		list-style: none;
		font-size: 14px;
	}
	.details li {
		display: flex;
		align-items: center;
		gap: 8px;
	}
	.details li :global(svg) {
		color: var(--amber);
	}

	/* ── Education ── */
	/* Education cards: half the content width each (5 columns) */
	.edu {
		row-gap: var(--gap);
	}
	.tile {
		grid-column: span 5;
		padding: 22px;
		border-radius: 18px;
		border: 1px solid var(--hairline);
		background: var(--card);
	}
	.tile h3 {
		margin: 18px 0 4px;
		font-size: 20px;
		font-weight: 500;
		letter-spacing: -0.02em;
	}
	.tile p {
		font-size: 14px;
		color: var(--text-secondary);
	}
	.tile .note {
		margin-top: 10px;
		font-style: italic;
	}

	/* ── Achievements ── */
	.awards {
		margin: -28px 0 0;
		padding: 0;
		list-style: none;
	}
	/* Row: icon + year 1–2 · title 3–8 · issuer 9–10 (same columns as Experience) */
	.awards li {
		align-items: center;
		padding: 16px 0;
		border-bottom: 1px solid var(--hairline);
	}
	.mark {
		grid-column: 1 / span 2;
		display: flex;
		align-items: center;
		gap: 14px;
	}
	.awards .title {
		grid-column: 3 / span 6;
		transition: transform 0.4s var(--ease-out);
	}
	.awards li:hover .title {
		transform: translateX(8px);
	}
	.issuer {
		grid-column: 9 / span 2;
		justify-self: end;
		text-align: right;
	}
	.icon {
		display: grid;
		place-items: center;
		width: 36px;
		height: 36px;
		border-radius: 50%;
		background: var(--surface);
		color: var(--amber);
	}
	.awards .title {
		font-size: 17px;
		letter-spacing: -0.02em;
	}
	.issuer {
		font-size: 13px;
		color: var(--text-secondary);
	}

	/* ── Capabilities ── */
	/* Capability groups: 3 + 3 + 4 columns (tools has the most items) */
	.caps {
		row-gap: 28px;
	}
	.cap {
		grid-column: span 3;
	}
	.cap:nth-child(3) {
		grid-column: span 4;
	}
	.cap:nth-child(n + 4) {
		grid-column: 1 / -1;
	}
	.cap ul {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
		margin: 12px 0 0;
		padding: 0;
		list-style: none;
	}
	.cap li {
		padding: 6px 12px;
		border: 1px solid var(--hairline);
		border-radius: 999px;
		font-size: 13px;
		background: var(--card);
	}
	.level {
		margin-left: 4px;
		color: var(--text-secondary);
		font-size: 11px;
	}

	/* ── Clients ── */
	/* Logos: two columns each (five per row); the page grid lines are the dividers */
	.logos {
		margin: 0;
		padding: 0;
		list-style: none;
	}
	.logos li {
		grid-column: span 2;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 10px;
		padding: 28px 0;
		font-size: 12px;
		color: var(--text-secondary);
		transition: color 0.3s ease;
	}
	.logos li:hover {
		color: var(--text);
	}
	/* Bare logo marks in black & white; colour returns on hover. In dark mode
	   they're inverted so dark logos (Nikel, Twonity…) stay visible. */
	.logos img {
		height: 40px;
		width: auto;
		max-width: 120px;
		object-fit: contain;
		filter: grayscale(1) brightness(0.78) contrast(1.3);
		opacity: 0.9;
		transition:
			filter 0.5s ease,
			opacity 0.5s ease,
			transform 0.5s var(--ease-out);
	}
	.logos li:hover img {
		filter: none;
		opacity: 1;
		transform: translateY(-3px);
	}
	/* Dark mode: black marks are inverted to light… */
	:global([data-theme='dark']) .logos [data-tone='dark'] img {
		filter: grayscale(1) brightness(0.78) contrast(1.3) invert(1);
	}
	/* …colourful marks are lifted to light grey instead, keeping their inner
	   white or dark details in contrast. */
	:global([data-theme='dark']) .logos [data-tone='color'] img {
		filter: grayscale(1) brightness(1.75) contrast(1.15);
		opacity: 1;
	}
	:global([data-theme='dark']) .logos li:hover img {
		filter: none;
	}
	.tile-head {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
	}
	.tile-head img {
		width: 44px;
		height: 44px;
		border-radius: 12px;
		box-shadow: 0 0 0 1px var(--hairline);
	}

	@keyframes enter {
		from {
			opacity: 0;
			transform: translateY(16px);
		}
	}

	/* Tablet: 6 columns, no rail */
	@media (max-width: 1023px) {
		.rail {
			display: none;
		}
		.main {
			grid-column: 1 / -1;
		}
		.portrait {
			grid-column: 1 / span 3;
		}
		.copy {
			grid-column: 4 / -1;
		}
		.facts-label {
			display: none;
		}
		.facts {
			grid-column: 1 / -1;
		}
		.facts div {
			grid-column: span 3;
		}
		.who {
			grid-column: 3 / span 3;
		}
		.type {
			display: none;
		}
		.toggle {
			grid-column: 6;
		}
		.details {
			grid-column: 3 / -1;
		}
		.tile {
			grid-column: span 3;
		}
		.awards .title {
			grid-column: 3 / -1;
		}
		.issuer {
			grid-column: 3 / -1;
			justify-self: start;
			text-align: left;
		}
		.cap,
		.cap:nth-child(3) {
			grid-column: span 3;
		}
		.cap:nth-child(3) {
			grid-column: 1 / -1;
		}
	}
	/* Phone: 4 columns, everything stacks on full-width or half-width spans */
	@media (max-width: 600px) {
		.portrait {
			grid-column: 1 / span 3;
		}
		.copy {
			grid-column: 1 / -1;
		}
		.facts div {
			grid-column: span 2;
		}
		.period {
			grid-column: 1 / -1;
			padding-bottom: 6px;
		}
		.who {
			grid-column: 1 / span 3;
		}
		.toggle {
			grid-column: 4;
		}
		.details {
			grid-column: 1 / -1;
		}
		.tile,
		.cap,
		.cap:nth-child(3) {
			grid-column: 1 / -1;
		}
		.mark {
			grid-column: 1 / -1;
		}
		.awards .title,
		.issuer {
			grid-column: 1 / -1;
		}
	}
</style>
