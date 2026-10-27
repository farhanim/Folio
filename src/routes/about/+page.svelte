<script lang="ts">
	import { slide } from 'svelte/transition';
	import Icon from '#lib/components/ui/Icon.svelte';
	import type { IconName } from '#lib/components/ui/icons.ts';
	import SectionHead from '#lib/components/ui/SectionHead.svelte';
	import TableOfContents from '#lib/components/ui/TableOfContents.svelte';
	import { clients } from '#lib/data/clients.ts';
	import { profile } from '#lib/data/profile.ts';
	import { site } from '#lib/data/site.ts';
	import type { Achievement } from '#lib/types/index.ts';
	import { reveal } from '#lib/utils/reveal.ts';

	const toc = [
		{ id: 'summary', label: 'Summary' },
		{ id: 'experience', label: 'Experience' },
		{ id: 'education', label: 'Education' },
		{ id: 'achievements', label: 'Achievements' },
		{ id: 'capabilities', label: 'Capabilities' },
		{ id: 'clients', label: 'Clients' }
	];

	const achievementIcon: Record<Achievement['kind'], IconName> = {
		award: 'award',
		talk: 'mic',
		cert: 'check',
		press: 'news'
	};

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
				onpointermove={onPortraitMove}
				onpointerleave={() => (tilt = { x: 0, y: 0 })}
				style:transform="perspective(800px) rotateX({tilt.x}deg) rotateY({tilt.y}deg)"
			>
				<img src={profile.portrait} alt="Illustrated portrait of {site.name}" />
				<span class="hello" aria-hidden="true">hi, I’m {site.name}!</span>
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
						<span class="label">{e.period}</span>
						<h3>{e.school}</h3>
						<p>{e.degree}</p>
						{#if e.note}<p class="note">{e.note}</p>{/if}
					</article>
				{/each}
			</div>
		</section>

		<!-- Achievements -->
		<section class="block" id="achievements" use:reveal>
			<SectionHead eyebrow="Recognition" title="Achievements" count={profile.achievements.length} />
			<ul class="awards">
				{#each profile.achievements as a (a.title)}
					<li data-reveal>
						<span class="icon"><Icon name={achievementIcon[a.kind]} size={18} /></span>
						<span class="year label">{a.year}</span>
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
				<div class="cap" data-reveal>
					<span class="label">Languages</span>
					<ul>
						{#each profile.languages as l (l.name)}
							<li>{l.name} <span class="level">{l.level}</span></li>
						{/each}
					</ul>
				</div>
			</div>
		</section>

		<!-- Clients -->
		<section class="block" id="clients" use:reveal>
			<SectionHead eyebrow="Teams I’ve worked with" title="Clients" />
			<ul class="logos" data-reveal>
				{#each Object.values(clients).filter((c) => c.name !== 'Personal') as c (c.name)}
					<li><img src={c.logo} alt="" /><span>{c.name}</span></li>
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
	.header {
		display: grid;
		grid-template-columns: minmax(0, 4fr) minmax(0, 6fr);
		gap: 40px;
		align-items: start;
		animation: enter 0.9s var(--ease-out) both;
	}
	.portrait {
		position: relative;
		border-radius: 20px;
		overflow: visible;
		transition: transform 0.4s var(--ease-out);
		will-change: transform;
	}
	.portrait img {
		display: block;
		width: 100%;
		aspect-ratio: 4 / 5;
		object-fit: cover;
		border-radius: 20px;
		background: var(--surface);
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
	.facts {
		grid-column: 1 / -1;
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		margin: 0;
		border-top: 1px solid var(--rule);
	}
	.facts div {
		padding: 16px 16px 16px 0;
		border-bottom: 1px solid var(--hairline);
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
	.job {
		display: grid;
		grid-template-columns: 130px minmax(0, 1fr) auto 24px;
		align-items: center;
		gap: 20px;
		width: 100%;
		padding: 20px 0;
		border: 0;
		background: none;
		color: var(--text);
		font: inherit;
		text-align: left;
		cursor: pointer;
	}
	.who {
		display: flex;
		align-items: center;
		gap: 14px;
	}
	.who img {
		width: 36px;
		height: 36px;
		border-radius: 10px;
		flex: none;
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
		padding: 3px 8px;
		border: 1px solid var(--hairline);
		border-radius: 999px;
	}
	/* Plus that turns into a minus */
	.toggle {
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
		padding: 0 0 22px 150px;
	}
	.details p {
		color: var(--text-secondary);
		font-size: 14px;
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
	.edu {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
		gap: var(--gap);
	}
	.tile {
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
	.awards li {
		display: grid;
		grid-template-columns: 40px 60px minmax(0, 1fr) auto;
		align-items: center;
		gap: 16px;
		padding: 16px 0;
		border-bottom: 1px solid var(--hairline);
		transition: padding 0.4s var(--ease-out);
	}
	.awards li:hover {
		padding-left: 8px;
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
	.caps {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
		gap: 28px var(--gap);
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
	.logos {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
		margin: -28px 0 0;
		padding: 0;
		list-style: none;
		border-left: 1px solid var(--hairline);
	}
	.logos li {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 10px;
		aspect-ratio: 3 / 2;
		border-right: 1px solid var(--hairline);
		border-bottom: 1px solid var(--hairline);
		font-size: 12px;
		color: var(--text-secondary);
		filter: grayscale(1);
		opacity: 0.7;
		transition:
			filter 0.4s ease,
			opacity 0.4s ease;
	}
	.logos li:hover {
		filter: none;
		opacity: 1;
	}
	.logos img {
		width: 36px;
		height: 36px;
		transition: transform 0.5s var(--ease-out);
	}
	.logos li:hover img {
		transform: scale(1.15) rotate(-6deg);
	}

	@keyframes enter {
		from {
			opacity: 0;
			transform: translateY(16px);
		}
	}

	@media (max-width: 1023px) {
		.rail {
			display: none;
		}
		.main {
			grid-column: 1 / -1;
		}
	}
	@media (max-width: 700px) {
		.header {
			grid-template-columns: 1fr;
		}
		.portrait {
			max-width: 320px;
		}
		.facts {
			grid-template-columns: 1fr 1fr;
		}
		.job {
			grid-template-columns: minmax(0, 1fr) 20px;
			gap: 8px 12px;
		}
		.period {
			grid-column: 1 / -1;
		}
		.type {
			display: none;
		}
		.details {
			padding-left: 50px;
		}
		.awards li {
			grid-template-columns: 40px minmax(0, 1fr);
		}
		.awards .year {
			display: none;
		}
		.issuer {
			grid-column: 2;
		}
	}
</style>
