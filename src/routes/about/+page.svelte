<script lang="ts">
	import { slide } from 'svelte/transition';
	import Brand from '#lib/components/ui/Brand.svelte';
	import type { BrandName } from '#lib/components/ui/brands.ts';
	import Icon from '#lib/components/ui/Icon.svelte';
	import type { IconName } from '#lib/components/ui/icons.ts';
	import SectionHead from '#lib/components/ui/SectionHead.svelte';
	import TableOfContents from '#lib/components/ui/TableOfContents.svelte';
	import { companies } from '#lib/data/clients.ts';
	import { profile } from '#lib/data/profile.ts';
	import { site } from '#lib/data/site.ts';
	import type { Certification, Recognition, Skill, Visual } from '#lib/types/index.ts';
	import { reveal } from '#lib/utils/reveal.ts';

	const toc = [
		{ id: 'summary', label: 'Summary' },
		{ id: 'experience', label: 'Experience' },
		{ id: 'recognition', label: 'Recognition' },
		{ id: 'credentials', label: 'Credentials' },
		{ id: 'testimonials', label: 'What people say' },
		{ id: 'capabilities', label: 'Capabilities' },
		{ id: 'companies', label: 'Companies' }
	];

	// Everywhere I've worked (jobs, the studio, mentoring), in CV order.
	const logoWall = [
		...new Map(
			[...profile.experience.map((e) => e.company), companies.myEduSolve].map((c) => [c.name, c])
		).values()
	];

	// A transparent cut-out is used when available, otherwise the framed photo.
	const portraitSrc = profile.portraitCutout ?? profile.portrait;

	const initials = (name: string) =>
		name
			.split(' ')
			.slice(0, 2)
			.map((w) => w[0])
			.join('');

	// First role open by default; one at a time.
	let openRole = $state(0);

	// ── Recognition & Credentials: one row shape for both sections ──
	type Shown = Visual;
	type Entry = {
		key: string;
		kind: string;
		title: string;
		summary: string;
		/** The square tile at the start of the row: an icon, a logo or a brand mark. */
		tone: string;
		brand?: BrandName;
		stat: { value: string; label: string };
		from: string;
		logos: string[];
		year: string;
		visual?: Shown;
		cert?: Certification;
	};

	const kindLabel: Record<Recognition['kind'], string> = {
		award: 'Award',
		mentor: 'Mentorship',
		milestone: 'Milestone'
	};
	const recognitionEntries: Entry[] = profile.recognitions.map((r) => ({
		key: r.title,
		kind: kindLabel[r.kind],
		title: r.title,
		summary: r.summary,
		tone: r.kind,
		stat: r.stat,
		from: r.from,
		logos: r.logos,
		year: r.year,
		visual: r.visual
	}));
	// Education first, then certifications, each under its own separator.
	const credentialGroups: { label: string; entries: Entry[] }[] = [
		{
			label: 'Education',
			entries: profile.education.map((e) => ({
				key: e.school,
				kind: 'Bachelor’s degree',
				title: e.degree,
				summary: e.major,
				tone: 'edu',
				stat: { value: e.gpa, label: `GPA of ${e.gpaOf}` },
				from: e.school,
				logos: e.logo ? [e.logo] : [],
				year: e.period,
				visual: { degree: { ...e, year: e.period } }
			}))
		},
		{
			label: 'Certifications',
			entries: profile.certifications.map((c) => ({
				key: c.credentialId,
				kind: c.credential,
				title: c.title,
				summary: `Credential ID ${c.credentialId}`,
				tone: 'adobe',
				brand: 'adobe',
				stat: { value: String(c.score), label: `of ${c.maxScore} · pass ${c.required}` },
				from: 'Adobe',
				logos: [],
				year: c.date,
				visual: { src: c.image, fit: 'contain' },
				cert: c
			}))
		}
	];

	// ── Cursor preview (desktop rows): eases toward the pointer, leans with speed ──
	let hovered = $state<Entry | null>(null);
	let pos = $state({ x: 0, y: 0, tilt: 0 });
	let target = { x: 0, y: 0 };
	let frame = 0;
	function follow() {
		const dx = target.x - pos.x;
		const dy = target.y - pos.y;
		const tilt = Math.max(-12, Math.min(12, dx * 0.12));
		pos = { x: pos.x + dx * 0.16, y: pos.y + dy * 0.16, tilt: pos.tilt + (tilt - pos.tilt) * 0.2 };
		if (Math.abs(dx) + Math.abs(dy) + Math.abs(pos.tilt) > 0.2)
			frame = requestAnimationFrame(follow);
		else frame = 0;
	}
	function onmove(e: PointerEvent) {
		if (e.pointerType !== 'mouse') return;
		target = { x: e.clientX, y: e.clientY };
		if (!hovered) pos = { ...target, tilt: 0 };
		if (!frame) frame = requestAnimationFrame(follow);
	}
	function onenter(e: PointerEvent, entry: Entry) {
		if (e.pointerType !== 'mouse') return;
		onmove(e);
		hovered = entry;
	}

	// Clicking a row (or tapping a card) opens its visual, full size, in a dialog.
	let lightbox: HTMLDialogElement;
	let zoomed = $state<Entry | null>(null);
	function zoom(entry: Entry) {
		hovered = null;
		zoomed = entry;
		lightbox.showModal();
	}

	// ── What people say ──
	let quoteBox: HTMLDialogElement;
	let quoted = $state<(typeof profile.testimonials)[number] | null>(null);
	function openQuote(t: (typeof profile.testimonials)[number]) {
		quoted = t;
		quoteBox.showModal();
	}

	// The sentence that holds the highlight, so the highlight always shows without a click.
	function excerpt(quote: string, highlight: string) {
		const needle = highlight.replace(/[.!…]+$/, '').toLowerCase();
		const at = Math.max(0, quote.toLowerCase().indexOf(needle));
		const end = at + needle.length;
		const start = Math.max(quote.lastIndexOf('. ', at) + 2, quote.lastIndexOf('! ', at) + 2, 0);
		const stops = ['. ', '! '].map((p) => quote.indexOf(p, end)).filter((i) => i >= 0);
		const stop = stops.length ? Math.min(...stops) + 1 : quote.length;
		return {
			before: quote.slice(0, at),
			mark: quote.slice(at, end),
			after: quote.slice(end),
			lead: (start > 1 ? '… ' : '') + quote.slice(start > 1 ? start : 0, at),
			tail: quote.slice(end, stop),
			cut: start > 1 || stop < quote.length
		};
	}

	// ── Capabilities ──
	const toolCategories = [...new Set(profile.tools.map((t) => t.category))];

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
	<title>Profile · {site.name}</title>
	<meta name="description" content={profile.headline} />
</svelte:head>

{#snippet visualView(v: Shown)}
	{#if 'studio' in v}
		<!-- Studio: three of its builds as browser windows, with client logos underneath -->
		<span class="studio">
			<span class="st-head">
				<img src={v.studio.logo} alt="" />
				<span><b>{v.studio.name}</b><small>{v.studio.tagline}</small></span>
			</span>
			<span class="st-windows">
				{#each v.studio.shots as src, i (src)}
					<span class="win" style:--i={i}>
						<span class="bar"><i></i><i></i><i></i></span>
						<img {src} alt="" loading="lazy" />
					</span>
				{/each}
			</span>
			<span class="st-logos">
				{#each v.studio.logos as l (l)}<img src={l} alt="" loading="lazy" />{/each}
			</span>
		</span>
	{:else if 'degree' in v}
		<!-- Degree: the school, the degree and the GPA as a ring -->
		{@const d = v.degree}
		<span class="degree">
			<span class="dg-text">
				<span class="dg-school">
					{#if d.logo}<img src={d.logo} alt="" />{/if}
					<span><b>{d.school}</b><small>Bachelor’s degree · {d.year}</small></span>
				</span>
				<span class="dg-title">{d.degree}</span>
				<small class="dg-major">{d.major}</small>
			</span>
			<span class="dg-ring" style:--p={Number(d.gpa) / Number(d.gpaOf)}>
				<b>{d.gpa}</b><small>GPA of {d.gpaOf}</small>
			</span>
		</span>
	{:else}
		<img class="shot" class:contain={v.fit === 'contain'} src={v.src} alt="" loading="lazy" />
	{/if}
{/snippet}

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

				<dl class="facts">
					{#each profile.facts as f (f.label)}
						<div>
							<span class="f-icon"><Icon name={f.icon as IconName} size={15} /></span>
							<dt class="label">{f.label}</dt>
							<dd>{f.value}</dd>
						</div>
					{/each}
				</dl>

				<div class="actions">
					<a class="primary" href={profile.cv} target="_blank" rel="noopener"
						><span class="p-icon"><Icon name="download" size={16} /></span> Download CV</a
					>
					<a class="secondary" href="/#contact">Get in touch <Icon name="arrowRight" size={14} /></a
					>
				</div>
			</div>
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
									<span class="company">{job.company.name} · {job.type}</span>
								</span>
							</span>
							<span class="scope-col">{job.scope}</span>
							<span class="toggle" aria-hidden="true"></span>
						</button>
						{#if openRole === i}
							<div class="details" transition:slide={{ duration: 350 }}>
								<p class="scope">{job.scope}</p>
								<p>{job.summary}</p>
								<ul>
									{#each job.highlights as h (h)}
										<li><span class="bullet" aria-hidden="true"></span><span>{h}</span></li>
									{/each}
								</ul>
							</div>
						{/if}
					</li>
				{/each}
			</ol>
		</section>

		<!-- Recognition: rows on desktop (the visual follows the cursor), cards with the visual on touch -->

		{#snippet entryRow(e: Entry)}
			<li data-reveal>
				{#if e.visual}
					{@const visual = e.visual}
					<button
						type="button"
						class="entry"
						onclick={() => zoom(e)}
						onpointerenter={(ev) => onenter(ev, e)}
						onpointermove={onmove}
					>
						<span class="e-media">{@render visualView(visual)}</span>
						{@render entryBody(e)}
						<span class="e-arrow"><Icon name="arrowUpRight" size={16} /></span>
					</button>
				{:else}
					<!-- svelte-ignore a11y_no_static_element_interactions -->
					<div class="entry plain" onpointerenter={() => (hovered = null)}>
						{@render entryBody(e)}
					</div>
				{/if}
			</li>
		{/snippet}

		{#snippet entryBody(e: Entry)}
			<span class="tile" class:multi={e.logos.length > 1} data-tone={e.tone}>
				{#if e.brand}<Brand name={e.brand} size={20} color="#fff" />
				{:else}{#each e.logos.slice(0, 4) as l (l)}<img src={l} alt="" />{/each}{/if}
			</span>
			<span class="e-main">
				<span class="e-kind label">{e.kind}</span>
				<span class="e-title">{e.title}</span>
				<span class="e-sum">{e.summary}</span>
			</span>
			<span class="e-stat"><strong>{e.stat.value}</strong> {e.stat.label}</span>
			<span class="e-from">
				<span class="e-from-text">{[e.from, e.year].filter(Boolean).join(' · ')}</span>
			</span>
		{/snippet}

		<section class="block" id="recognition" use:reveal>
			<SectionHead
				eyebrow="Awards and milestones"
				title="Recognition"
				count={recognitionEntries.length}
			/>
			<ol class="entries" onpointerleave={() => (hovered = null)}>
				{#each recognitionEntries as e (e.key)}{@render entryRow(e)}{/each}
			</ol>
		</section>

		<!-- Credentials: education first, then certifications -->
		<section class="block" id="credentials" use:reveal>
			<SectionHead
				eyebrow="Education and certifications"
				title="Credentials"
				count={credentialGroups.reduce((n, g) => n + g.entries.length, 0)}
			/>
			{#each credentialGroups as g (g.label)}
				<p class="group-head label" data-reveal>{g.label}</p>
				<ol class="entries" onpointerleave={() => (hovered = null)}>
					{#each g.entries as e (e.key)}{@render entryRow(e)}{/each}
				</ol>
			{/each}
		</section>

		<!-- What people say: one row that drifts sideways; hovering pauses it -->
		<section class="block" id="testimonials" use:reveal>
			<SectionHead
				eyebrow="Recommendations"
				title="What people say"
				count={profile.testimonials.length}
			>
				{#snippet aside()}
					<p class="lede">From colleagues I’ve worked with.</p>
				{/snippet}
			</SectionHead>
			<div class="marquee" style:--n={profile.testimonials.length}>
				<ul class="t-track">
					<!-- The list runs twice so the loop is seamless; the copy is hidden from screen readers -->
					{#each [...profile.testimonials, ...profile.testimonials] as t, i (i)}
						{@const q = excerpt(t.quote, t.highlight)}
						{@const copy = i >= profile.testimonials.length}
						<li class="t-card" aria-hidden={copy}>
							<blockquote>{q.lead}<mark>{q.mark}</mark>{q.tail}</blockquote>
							<footer>
								{#if t.avatar}
									<img class="avatar" src={t.avatar} alt="" loading="lazy" />
								{:else}
									<span class="avatar" aria-hidden="true">{initials(t.name)}</span>
								{/if}
								<span class="t-who">
									<strong>{t.name}</strong>
									<span class="t-src"
										>{t.role} at <img src={t.company.logo} alt="" />{t.company.name}</span
									>
								</span>
								<button
									type="button"
									class="more"
									tabindex={copy ? -1 : undefined}
									onclick={() => openQuote(t)}>Read all</button
								>
							</footer>
						</li>
					{/each}
				</ul>
			</div>
		</section>

		<!-- Capabilities: a bento of skills, each with a small labelled diagram, then the tools -->
		{#snippet art(kind: Skill['art'])}
			{#if kind === 'systems'}
				<!-- Layers of a design system, from tokens up to products -->
				<svg class="dg" viewBox="0 0 240 150" aria-hidden="true">
					{#each [['Products', 22], ['Components', 52], ['Tokens', 82]] as [label, y], i (label)}
						<polygon class="p{i + 1}" points="70,{+y} 120,{+y + 22} 70,{+y + 44} 20,{+y + 22}" />
						<path class="ln" d="M120 {+y + 22} H148" />
						<rect class="pill" x="148" y={+y + 12} width="76" height="20" rx="10" />
						<text x="186" y={+y + 25.5} text-anchor="middle">{label}</text>
					{/each}
					<text class="cap" x="120" y="144" text-anchor="middle"
						>Renceng · Fazz DS · OneFish · Ulysses</text
					>
				</svg>
			{:else if kind === 'flow'}
				<!-- AI tools around a hub, used across research, design and code -->
				<span class="a-ai">
					<span class="tools-l">
						<span class="t"><Brand name="openai" size={14} /></span>
						<span class="t"><Brand name="gemini" size={14} /></span>
					</span>
					<span class="hub">AI</span>
					<span class="tools-r">
						<span class="t"><span class="ai-mono">Pa</span></span>
						<span class="t"><Brand name="claude" size={14} /></span>
					</span>
					<span class="uses">
						{#each ['Research', 'Design', 'Code'] as u (u)}<i>{u}</i>{/each}
					</span>
				</span>
			{:else if kind === 'team'}
				<!-- A skill wheel around the team -->
				<span class="a-wheel">
					<span class="wheel"><b>12+</b></span>
					<span class="legend">
						{#each [['Lead', '#e9a23b'], ['Mentor', '#6b9bff'], ['Feedback', '#3fb27f'], ['Goals', '#f08fb0']] as [l, c] (l)}
							<i style:--c={c}>{l}</i>
						{/each}
					</span>
				</span>
			{:else if kind === 'tree'}
				<!-- Information architecture: where users, context and content meet -->
				<svg class="dg" viewBox="0 0 240 100" aria-hidden="true">
					<circle class="v1" cx="103" cy="40" r="27" />
					<circle class="v2" cx="137" cy="40" r="27" />
					<circle class="v3" cx="120" cy="66" r="27" />
					<text class="strong" x="120" y="54" text-anchor="middle">IA</text>
					<text x="64" y="20" text-anchor="end">Users</text>
					<text x="176" y="20">Context</text>
					<text x="152" y="94">Content</text>
				</svg>
			{:else if kind === 'bars'}
				<!-- A funnel, measured with these tools -->
				<span class="a-stack">
					<svg class="dg funnel" viewBox="0 0 240 64" aria-hidden="true">
						{#each [['Acquire', 180], ['Activate', 136], ['Convert', 96], ['Retain', 60]] as [l, w], i (l)}
							<rect class="f{i}" x={120 - +w / 2} y={i * 16} width={w} height="12" rx="6" />
							<text x={120 + +w / 2 + 6} y={i * 16 + 9}>{l}</text>
						{/each}
					</svg>
					<span class="chips">
						<span class="chip"><Brand name="analytics" size={10} /> GA</span>
						<span class="chip"><Icon name="chart" size={10} /> CleverTap</span>
						<span class="chip"><Icon name="grid" size={10} /> BI Dash</span>
					</span>
				</span>
			{:else if kind === 'journey'}
				<!-- Double diamond -->
				<svg class="dg" viewBox="0 0 240 110" aria-hidden="true">
					<polygon class="h1" points="20,60 70,20 70,100" />
					<polygon class="h2" points="70,20 120,60 70,100" />
					<polygon class="h3" points="120,60 170,20 170,100" />
					<polygon class="h4" points="170,20 220,60 170,100" />
					<path class="edge" d="M20 60 70 20 120 60 70 100Z M120 60 170 20 220 60 170 100Z" />
					<path class="dot" d="M70 24 V96 M170 24 V96" />
					{#each [20, 120, 220] as x (x)}<circle class="node" cx={x} cy="60" r="4.5" />{/each}
					{#each [['diverge', 40, -39], ['converge', 100, 39], ['diverge', 140, -39], ['converge', 200, 39]] as [l, x, r], i (i)}
						<text class="edge-l" {x} y="34" text-anchor="middle" transform="rotate({r} {x} 34)"
							>{l}</text
						>
					{/each}
					{#each [['Discover', 45, 'c1'], ['Define', 95, 'c2'], ['Develop', 145, 'c3'], ['Deliver', 195, 'c4']] as [l, x, c] (l)}
						<text class="phase {c}" {x} y="63" text-anchor="middle">{l}</text>
					{/each}
					<path class="iter" d="M92 12 Q120 -2 148 12" marker-end="url(#dd-arrow)" />
					<text class="edge-l" x="120" y="5" text-anchor="middle">iterate</text>
					<defs>
						<marker
							id="dd-arrow"
							viewBox="0 0 10 10"
							refX="8"
							refY="5"
							markerWidth="5"
							markerHeight="5"
							orient="auto"
						>
							<path d="M0 0 10 5 0 10z" class="arrowhead" />
						</marker>
					</defs>
				</svg>
			{:else if kind === 'strategy'}
				<!-- Build, measure, learn around the objective -->
				<svg class="dg" viewBox="0 0 240 100" aria-hidden="true">
					<circle class="loop" cx="120" cy="50" r="34" />
					<circle class="core" cx="120" cy="50" r="15" />
					<text class="strong on" x="120" y="53.5" text-anchor="middle">OKR</text>
					{#each [['Ideas', 120, 16], ['Build', 168, 50], ['Measure', 120, 84], ['Learn', 72, 50]] as [l, x, y] (l)}
						<rect class="pill" x={+x - 26} y={+y - 9} width="52" height="18" rx="9" />
						<text {x} y={+y + 3.5} text-anchor="middle">{l}</text>
					{/each}
				</svg>
			{:else}
				<!-- Growth-driven design: strategy and a launch pad, then a continuous improvement loop -->
				<svg class="dg" viewBox="0 0 240 110" aria-hidden="true">
					<rect class="pill" x="4" y="22" width="66" height="22" rx="11" />
					<text x="37" y="36.5" text-anchor="middle">Strategy</text>
					<path class="ln" d="M37 44 V62" marker-end="url(#gdd-arrow)" />
					<rect class="pill solid" x="4" y="64" width="66" height="22" rx="11" />
					<text class="on" x="37" y="78.5" text-anchor="middle">Launch pad</text>
					<path class="ln" d="M70 75 C84 75 86 54 94 54" marker-end="url(#gdd-arrow)" />
					<circle class="loop" cx="164" cy="54" r="38" />
					<text class="ax" x="164" y="57" text-anchor="middle">Improve</text>
					{#each [['Plan', 164, 16, 40], ['Build', 210, 54, 40], ['Learn', 164, 92, 40], ['Transfer', 120, 54, 48]] as [l, x, y, w] (l)}
						<rect class="pill" x={+x - +w / 2} y={+y - 9} width={w} height="18" rx="9" />
						<text {x} y={+y + 3.5} text-anchor="middle">{l}</text>
					{/each}
					<defs>
						<marker
							id="gdd-arrow"
							viewBox="0 0 10 10"
							refX="8"
							refY="5"
							markerWidth="5"
							markerHeight="5"
							orient="auto"
						>
							<path d="M0 0 10 5 0 10z" class="arrowhead" />
						</marker>
					</defs>
				</svg>
			{/if}
		{/snippet}

		<section class="block" id="capabilities" use:reveal>
			<SectionHead eyebrow="What I bring" title="Capabilities" />
			<div class="bento">
				{#each profile.skills as s (s.name)}
					<article class="b-tile" data-art={s.art} data-reveal>
						<div class="art" aria-hidden="true">{@render art(s.art)}</div>
						<h3>{s.name}</h3>
						<p>{s.proof}</p>
					</article>
				{/each}
			</div>

			<div class="tools-head" data-reveal>
				<span class="label">Tools</span>
				<span class="key">
					{#each toolCategories as cat (cat)}
						<span class="label" data-cat={cat}><i></i>{cat}</span>
					{/each}
				</span>
			</div>
			<ul class="tools" data-reveal>
				{#each profile.tools as tool (tool.name)}
					<li data-cat={tool.category}>
						{#if tool.brand}
							<Brand name={tool.brand as BrandName} size={22} />
						{:else}
							<span class="mono">{tool.name.slice(0, 2)}</span>
						{/if}
						<span>{tool.name}</span>
					</li>
				{/each}
			</ul>

			{#if profile.languages.length}
				<ul class="langs" data-reveal>
					{#each profile.languages as l (l.name)}
						<li>{l.name} <span class="level">{l.level}</span></li>
					{/each}
				</ul>
			{/if}
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

<div
	class="preview"
	class:show={hovered}
	style:transform="translate3d({pos.x}px, {pos.y}px, 0) rotate({pos.tilt}deg)"
	aria-hidden="true"
>
	{#if hovered?.visual}
		{#key hovered.key}
			<div class="stage">{@render visualView(hovered.visual)}</div>
		{/key}
	{/if}
</div>

<dialog
	class="lightbox"
	bind:this={lightbox}
	onclose={() => (zoomed = null)}
	onclick={(e) => e.target === lightbox && lightbox.close()}
>
	{#if zoomed}
		{#if zoomed.visual}<div class="lb-media">{@render visualView(zoomed.visual)}</div>{/if}
		<div class="lb-body">
			<div class="lb-head">
				<span class="label">{zoomed.kind}</span>
				<strong>{zoomed.title}</strong>
				<span class="lb-meta">{[zoomed.from, zoomed.year].filter(Boolean).join(' · ')}</span>
			</div>
			{#if zoomed.cert}
				{@const c = zoomed.cert}
				<p class="lb-score">
					<strong>{c.score}</strong> / {c.maxScore}
					<span class="pass label">Pass · {c.required} required</span>
				</p>
				<ul class="lb-sections">
					{#each c.sections as s (s.name)}
						<li>
							<span>{s.name}</span>
							<span class="s-val">{s.score}%</span>
							<span class="s-bar"><span style:width="{s.score}%"></span></span>
						</li>
					{/each}
				</ul>
				<p class="lb-links">
					{#if c.file}
						<a class="hairline-link" href={c.file} target="_blank" rel="noopener"
							>Certificate (PDF)</a
						>
					{/if}
					<a class="hairline-link" href={c.verifyUrl} target="_blank" rel="noopener"
						>Verify on Certiport</a
					>
				</p>
			{:else}
				<p class="lb-sum">{zoomed.summary}</p>
			{/if}
		</div>
		<button type="button" class="close" onclick={() => lightbox.close()} aria-label="Close">
			<Icon name="x" size={18} />
		</button>
	{/if}
</dialog>

<dialog
	class="lightbox quote-box"
	bind:this={quoteBox}
	onclose={() => (quoted = null)}
	onclick={(e) => e.target === quoteBox && quoteBox.close()}
>
	{#if quoted}
		{@const q = excerpt(quoted.quote, quoted.highlight)}
		<div class="qb">
			<blockquote>{q.before}<mark>{q.mark}</mark>{q.after}</blockquote>
			<footer>
				{#if quoted.avatar}<img class="avatar" src={quoted.avatar} alt="" />{/if}
				<span class="t-who">
					<strong>{quoted.name}</strong>
					<span>{quoted.headline}</span>
					<span class="t-src"
						>{quoted.role} at <img src={quoted.company.logo} alt="" />{quoted.company.name}</span
					>
				</span>
			</footer>
		</div>
		<button type="button" class="close" onclick={() => quoteBox.close()} aria-label="Close">
			<Icon name="x" size={18} />
		</button>
	{/if}
</dialog>

<style>
	.profile {
		padding-top: 40px;
		padding-bottom: 120px;
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
	.logos {
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
	/* Portrait: local cols 1–3 · copy (with facts and actions): 4–10 */
	.header {
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
		grid-column: 4 / -1;
		padding-left: 12px;
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
		margin: 8px 0 16px;
		font-size: clamp(26px, 2.4vw, 36px);
		font-weight: 420;
		letter-spacing: -0.045em;
		line-height: 1.04;
	}
	.copy p {
		max-width: 62ch;
		color: var(--text-secondary);
		font-size: calc(15px * var(--text-scale));
		line-height: 1.6;
	}
	.copy p + p {
		margin-top: 10px;
	}
	/* Facts: four across under the summary, two by two on phones */
	.facts {
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		gap: 10px;
		margin: 28px 0 0;
	}
	/* Each fact a small card: icon on the left, label above a one-line value */
	.facts div {
		display: grid;
		grid-template-columns: auto 1fr;
		column-gap: 10px;
		align-items: center;
		padding: 12px;
		border: 1px solid var(--hairline);
		border-radius: 14px;
		background: var(--card);
		transition:
			border-color 0.3s ease,
			transform 0.4s var(--ease-out);
	}
	.facts div:hover {
		border-color: var(--rule);
		transform: translateY(-2px);
	}
	.f-icon {
		grid-row: span 2;
		display: grid;
		place-items: center;
		width: 34px;
		height: 34px;
		border-radius: 10px;
		background: color-mix(in srgb, var(--amber) 16%, transparent);
		color: var(--amber);
	}
	.facts dt {
		font-size: 10px;
	}
	.facts dd {
		margin: 0;
		overflow: hidden;
		font-size: 15px;
		font-weight: 500;
		line-height: 1.35;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.actions {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
		margin-top: 32px;
	}
	.primary,
	.secondary {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 10px;
		height: 48px;
		padding: 0 20px;
		border-radius: 999px;
		font-size: 14px;
		font-weight: 500;
		text-decoration: none;
		transition: transform 0.3s var(--ease-out);
	}
	/* Primary: the amber chip makes the CV the one thing to click */
	.primary {
		padding-left: 6px;
		background: var(--text);
		color: var(--bg);
	}
	.p-icon {
		display: grid;
		place-items: center;
		width: 36px;
		height: 36px;
		border-radius: 50%;
		background: var(--amber);
		color: #1a1a1a;
	}
	.secondary {
		border: 1px solid var(--rule);
		color: var(--text);
	}
	.primary:hover,
	.secondary:hover {
		transform: translateY(-2px);
	}

	.block {
		padding-top: 64px;
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
	/* Row: period 1–2 · role 3–6 · scope 7–9 · toggle 10; details under the role (3–9) */
	.job {
		align-items: center;
		width: 100%;
		padding: 16px 0;
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
		grid-column: 3 / span 4;
		display: flex;
		align-items: center;
		gap: 14px;
		min-width: 0;
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
		font-size: clamp(17px, 1.6vw, 22px);
		letter-spacing: -0.025em;
		line-height: 1.25;
	}
	.company {
		display: block;
		font-size: 13px;
		color: var(--text-secondary);
	}
	.scope-col {
		grid-column: 7 / span 3;
		font-size: 13px;
		line-height: 1.45;
		color: var(--text-secondary);
	}
	/* Plus that turns into a minus */
	.toggle {
		grid-column: 10;
		justify-self: end;
		position: relative;
		width: 14px;
		height: 14px;
		flex: none;
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
		grid-column: 3 / span 7;
		padding: 0 0 20px 50px;
	}
	.details p {
		color: var(--text-secondary);
		font-size: 14px;
	}
	/* The scope already shows in the row on desktop */
	.details .scope {
		display: none;
		margin-bottom: 4px;
		color: var(--text);
		font-weight: 500;
	}
	.details ul {
		display: grid;
		gap: 6px;
		margin: 10px 0 0;
		padding: 0;
		list-style: none;
		font-size: 14px;
	}
	.details li {
		display: flex;
		align-items: baseline;
		gap: 8px;
	}
	.bullet {
		flex: none;
		width: 5px;
		height: 5px;
		border-radius: 50%;
		background: var(--amber);
		translate: 0 -2px;
	}

	/* ── Recognition & Credentials ── */
	/* Desktop row: tile 1 · title 2–5 · highlight 6–7 · from 8–9 · arrow 10 */
	.entries,
	.entries > li,
	.entry {
		display: grid;
		grid-template-columns: subgrid;
		grid-column: 1 / -1;
	}
	.entries {
		margin: -28px 0 0;
		padding: 0;
		list-style: none;
	}
	.entries > li {
		border-bottom: 1px solid var(--hairline);
	}
	.entry {
		position: relative;
		align-items: center;
		width: 100%;
		padding: 14px 0;
		border: 0;
		background: none;
		color: var(--text);
		font: inherit;
		text-align: left;
		cursor: pointer;
	}
	.entry::before {
		content: '';
		position: absolute;
		inset: 0 calc(-1 * var(--pad) / 2);
		z-index: -1;
		border-radius: 10px;
		background: var(--surface);
		transform: scaleY(0);
		transform-origin: bottom;
		transition: transform 0.45s var(--ease-out);
	}
	.entry.plain {
		cursor: default;
	}
	.entry.plain::before {
		display: none;
	}
	.e-media {
		display: none;
	}
	.tile {
		grid-column: 1;
		display: grid;
		place-items: center;
		width: 40px;
		height: 40px;
		border-radius: 12px;
		color: #fff;
		overflow: hidden;
		transition: transform 0.5s var(--ease-out);
	}
	.tile {
		background: #fff;
		box-shadow: inset 0 0 0 1px var(--hairline);
	}
	.tile img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	/* Several companies: their logos stacked, each overlapping the one before */
	.tile.multi {
		display: flex;
		width: auto;
		background: none;
		box-shadow: none;
		overflow: visible;
	}
	.tile.multi img {
		flex: none;
		width: 32px;
		height: 32px;
		border-radius: 50%;
		background: #fff;
		box-shadow: 0 0 0 2px var(--bg);
	}
	.tile.multi img + img {
		margin-left: -10px;
	}
	.tile[data-tone='adobe'] {
		background: #fa0f00;
	}
	.e-main {
		grid-column: 2 / span 4;
		display: grid;
		gap: 2px;
		min-width: 0;
		transition: transform 0.5s var(--ease-out);
	}
	.e-kind {
		font-size: 10px;
	}
	.e-title {
		font-size: 16px;
		letter-spacing: -0.015em;
		line-height: 1.35;
	}
	.e-sum {
		font-size: 13px;
		line-height: 1.45;
		color: var(--text-secondary);
	}
	.e-stat {
		grid-column: 6 / span 2;
		font-size: 13px;
		color: var(--text-secondary);
	}
	.e-stat strong {
		margin-right: 2px;
		font-size: 15px;
		font-weight: 500;
		color: var(--text);
	}
	.e-from {
		grid-column: 8 / span 2;
		display: flex;
		align-items: center;
		gap: 8px;
		min-width: 0;
	}
	.e-from-text {
		font-size: 13px;
		color: var(--text-secondary);
	}
	.e-arrow {
		grid-column: 10;
		justify-self: end;
		display: flex;
		color: var(--text-secondary);
		transition:
			transform 0.5s var(--ease-out),
			color 0.3s ease;
	}
	@media (hover: hover) {
		.entry:hover::before {
			transform: scaleY(1);
		}
		.entry:hover .e-main {
			transform: translateX(8px);
		}
		.entry:hover .tile {
			transform: rotate(-6deg) scale(1.06);
		}
		.entry:hover .e-arrow {
			color: var(--text);
			transform: rotate(45deg);
		}
	}
	.group-head {
		grid-column: 1 / -1;
		margin: 0 0 28px;
	}
	.entries + .group-head {
		margin-top: 28px;
	}

	/* Visuals: an image, a studio composition or a degree card. The last two are
	   drawn in HTML and sized with container units, so they scale with their frame. */
	.shot {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
		background: #14110e;
	}
	.shot.contain {
		object-fit: contain;
		padding: 6%;
		background: var(--surface);
	}
	.studio,
	.degree {
		height: 100%;
		color: #1a1a1a;
		overflow: hidden;
	}
	.studio small,
	.degree small {
		color: #6b6b6b;
	}
	.studio {
		display: grid;
		grid-template-rows: auto 1fr auto;
		gap: 3cqi;
		padding: 5cqi;
		background:
			radial-gradient(circle at 85% 0%, #fbe3b8, transparent 55%),
			radial-gradient(circle at 0% 100%, #e3ecff, transparent 50%), #faf9f6;
	}
	.st-head {
		display: flex;
		align-items: center;
		gap: 2.5cqi;
	}
	.st-head img {
		width: 8cqi;
		height: 8cqi;
		border-radius: 2cqi;
		background: #fff;
		box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.08);
	}
	.st-head span {
		display: grid;
		line-height: 1.25;
	}
	.st-head b {
		font-size: 4cqi;
		font-weight: 600;
	}
	.st-head small {
		font-size: 2.8cqi;
	}
	/* Three windows fanned out; the middle one sits in front */
	.st-windows {
		position: relative;
	}
	.win {
		position: absolute;
		top: calc(var(--i) * 5% + 2%);
		left: calc(var(--i) * 21% + 2%);
		width: 54%;
		border-radius: 1.6cqi;
		overflow: hidden;
		background: #fff;
		box-shadow:
			0 0 0 1px rgba(0, 0, 0, 0.06),
			0 2cqi 5cqi -1cqi rgba(0, 0, 0, 0.18);
		rotate: calc((var(--i) - 1) * 3deg);
	}
	.win:nth-child(2) {
		z-index: 2;
	}
	.bar {
		display: flex;
		gap: 0.8cqi;
		padding: 1.1cqi 1.4cqi;
		background: #f1ede6;
	}
	.bar i {
		width: 1.3cqi;
		height: 1.3cqi;
		border-radius: 50%;
		background: #d6cfc4;
	}
	.win img {
		display: block;
		width: 100%;
		aspect-ratio: 16 / 10;
		object-fit: cover;
		object-position: top;
	}
	.st-logos {
		display: flex;
		gap: 1.4cqi;
	}
	.st-logos img {
		width: 5.6cqi;
		height: 5.6cqi;
		border-radius: 50%;
		background: #fff;
		object-fit: contain;
		box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.08);
	}
	.degree {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 4cqi;
		padding: 7cqi;
		background: radial-gradient(circle at 100% 0%, #d9efdd, transparent 60%), #faf9f6;
	}
	.dg-text {
		display: grid;
		gap: 1.2cqi;
		min-width: 0;
	}
	.dg-school {
		display: flex;
		align-items: center;
		gap: 2.4cqi;
		margin-bottom: 3cqi;
	}
	.dg-school img {
		width: 9cqi;
		height: 9cqi;
		border-radius: 2.2cqi;
		background: #fff;
		box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.08);
	}
	.dg-school span {
		display: grid;
		line-height: 1.25;
	}
	.dg-school b {
		font-size: 3.6cqi;
		font-weight: 600;
	}
	.dg-school small,
	.dg-major {
		font-size: 2.8cqi;
	}
	.dg-title {
		font-size: 5.4cqi;
		font-weight: 600;
		letter-spacing: -0.02em;
		line-height: 1.15;
	}
	/* GPA ring: the arc fills to GPA ÷ maximum */
	.dg-ring {
		position: relative;
		display: grid;
		place-content: center;
		justify-items: center;
		flex: none;
		width: 26cqi;
		aspect-ratio: 1;
		border-radius: 50%;
		background: conic-gradient(#1e8a4c calc(var(--p) * 360deg), #e1e8de 0);
	}
	.dg-ring::before {
		content: '';
		position: absolute;
		inset: 2.4cqi;
		border-radius: 50%;
		background: #fff;
	}
	.dg-ring b,
	.dg-ring small {
		position: relative;
	}
	.dg-ring b {
		font-size: 7cqi;
		font-weight: 600;
		line-height: 1;
	}
	.dg-ring small {
		font-size: 2.4cqi;
	}
	/* Cursor preview */
	.preview {
		position: fixed;
		left: 0;
		top: 0;
		z-index: 90;
		width: 420px;
		margin: -140px 0 0 28px;
		border-radius: 14px;
		overflow: hidden;
		pointer-events: none;
		box-shadow: var(--shadow-float);
		opacity: 0;
		scale: 0.85;
		transition:
			opacity 0.25s ease,
			scale 0.4s var(--ease-out);
	}
	.preview.show {
		opacity: 1;
		scale: 1;
	}
	.stage {
		container-type: inline-size;
		aspect-ratio: 16 / 10;
		animation: fade 0.3s ease both;
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
	}

	/* Touch screens and narrow windows: no hover, so each entry becomes a card with its
	   visual on top, in a row you swipe through. Tapping a card opens it full size. */
	@media (max-width: 1023px), (hover: none) {
		.preview {
			display: none;
		}
		.entries {
			display: flex;
			gap: 12px;
			margin: 0 calc(var(--pad) * -1);
			padding: 0 var(--pad) 4px;
			overflow-x: auto;
			scroll-snap-type: x mandatory;
			scroll-padding-inline: var(--pad);
			scrollbar-width: none;
		}
		.entries::-webkit-scrollbar {
			display: none;
		}
		.entries > li {
			display: flex;
			flex: 0 0 min(300px, 78%);
			border: 0;
			scroll-snap-align: start;
		}
		.entry {
			display: flex;
			flex-direction: column;
			align-items: stretch;
			gap: 0;
			padding: 0 0 14px;
			border: 1px solid var(--hairline);
			border-radius: 16px;
			background: var(--card);
			overflow: hidden;
		}
		.entry::before {
			display: none;
		}
		.e-media {
			display: block;
			container-type: inline-size;
			aspect-ratio: 16 / 10;
			border-bottom: 1px solid var(--hairline);
		}
		/* The tile overlaps the visual's bottom edge */
		.tile {
			margin: -20px 14px 0;
			width: 40px;
			height: 40px;
			box-shadow: 0 0 0 3px var(--card);
		}
		.e-main {
			padding: 10px 14px 0;
		}
		.e-stat {
			order: 1;
			padding: 10px 14px 0;
			margin-top: auto;
		}
		.e-from {
			order: 2;
			padding: 6px 14px 0;
		}
		.e-arrow {
			position: absolute;
			top: 10px;
			right: 10px;
			display: grid;
			place-items: center;
			width: 28px;
			height: 28px;
			border-radius: 50%;
			background: color-mix(in srgb, var(--bg) 85%, transparent);
			color: var(--text);
		}
		.group-head {
			margin-bottom: 14px;
		}
		.entries + .group-head {
			margin-top: 24px;
		}
	}

	/* ── What people say ── */
	.lede {
		font-size: 14px;
		color: var(--text-secondary);
	}
	/* Marquee: the track holds the list twice and slides left by one copy, then loops */
	.marquee {
		grid-column: 1 / -1;
		overflow: hidden;
		mask-image: linear-gradient(90deg, transparent, #000 4%, #000 96%, transparent);
	}
	.t-track {
		display: flex;
		gap: var(--gap);
		width: max-content;
		margin: 0;
		padding: 2px 0;
		list-style: none;
		animation: marquee calc(var(--n) * 8s) linear infinite;
	}
	.marquee:hover .t-track,
	.marquee:focus-within .t-track {
		animation-play-state: paused;
	}
	@keyframes marquee {
		to {
			transform: translateX(calc(-50% - var(--gap) / 2));
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.marquee {
			overflow-x: auto;
			mask-image: none;
		}
		.t-track {
			animation: none;
		}
	}
	/* Every card the same size; the quote is clamped, "Read all" opens the rest */
	.t-card {
		display: flex;
		flex-direction: column;
		gap: 12px;
		flex: none;
		width: 340px;
		height: 220px;
		padding: 16px;
		border: 1px solid var(--hairline);
		border-radius: 14px;
		background: var(--card);
	}
	.t-card blockquote {
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 5;
		line-clamp: 5;
		overflow: hidden;
		margin: 0;
		font-size: 14px;
		line-height: 1.6;
		color: var(--text-secondary);
	}
	/* The highlight: one line of each recommendation, marked where it sits */
	mark {
		background: linear-gradient(
			transparent 55%,
			color-mix(in srgb, var(--amber) 38%, transparent) 55%
		);
		color: var(--text);
		font-weight: 500;
	}
	.t-card footer {
		display: flex;
		align-items: center;
		gap: 10px;
		margin-top: auto;
		padding-top: 12px;
		border-top: 1px solid var(--hairline);
	}
	.avatar {
		display: grid;
		place-items: center;
		flex: none;
		width: 32px;
		height: 32px;
		border-radius: 50%;
		object-fit: cover;
		background: var(--text);
		color: var(--bg);
		font-family: var(--font-mono);
		font-size: 12px;
	}
	.t-who {
		display: grid;
		min-width: 0;
		line-height: 1.35;
	}
	.t-who strong {
		font-size: 13px;
		font-weight: 500;
	}
	.t-who span {
		font-size: 12px;
		color: var(--text-secondary);
	}
	/* Where we worked together: company logo and name */
	.t-who .t-src {
		display: inline-flex;
		align-items: center;
		gap: 5px;
		white-space: nowrap;
		margin-top: 1px;
	}
	.t-src img {
		width: 16px;
		height: 16px;
		border-radius: 4px;
		box-shadow: 0 0 0 1px var(--hairline);
	}
	.more {
		flex: none;
		margin-left: auto;
		padding: 0;
		border: 0;
		background: none;
		color: var(--text);
		font: inherit;
		font-size: 12px;
		font-weight: 500;
		text-decoration: underline;
		text-underline-offset: 3px;
		cursor: pointer;
	}
	/* Full recommendation */
	.lightbox.quote-box[open] {
		display: block;
		width: min(560px, calc(100vw - 32px));
	}
	.qb {
		display: grid;
		gap: 16px;
		padding: 24px;
	}
	.qb blockquote {
		padding-right: 32px;
	}
	.qb blockquote {
		margin: 0;
		font-size: 15px;
		line-height: 1.65;
		color: var(--text-secondary);
	}
	.qb footer {
		display: flex;
		align-items: center;
		gap: 10px;
	}
	@media (max-width: 600px) {
		.t-card {
			width: 280px;
			height: 244px;
			padding: 14px;
		}
		.qb {
			padding: 20px;
		}
	}

	/* ── Capabilities ── */
	/* Bento: design systems is the large tile; the rest share the grid */
	.bento {
		grid-column: 1 / -1;
		display: grid;
		grid-template-columns: subgrid;
		grid-auto-flow: dense;
		row-gap: var(--gap);
	}
	.b-tile {
		grid-column: span 3;
		display: flex;
		flex-direction: column;
		padding: 16px;
		border: 1px solid var(--hairline);
		border-radius: 14px;
		background: var(--card);
	}
	.b-tile[data-art='systems'] {
		grid-column: span 4;
		grid-row: span 2;
	}
	.b-tile[data-art='journey'] {
		grid-column: span 4;
	}
	.b-tile h3 {
		margin: 14px 0 2px;
		font-size: 15px;
		font-weight: 500;
		letter-spacing: -0.01em;
	}
	.b-tile p {
		font-size: 13px;
		line-height: 1.45;
		color: var(--text-secondary);
	}
	.art {
		display: grid;
		place-items: center;
		height: 120px;
		padding: 10px;
		padding: 0 8px;
		border-radius: 10px;
		background: var(--surface);
		overflow: hidden;
	}
	[data-art='systems'] .art {
		flex: 1;
		min-height: 160px;
	}
	/* Drawings: small labelled diagrams in SVG and CSS that follow the theme */
	.dg {
		display: block;
		width: 100%;
		height: 100%;
		min-height: 0;
	}
	/* The tall tile keeps the same type scale as the others */
	[data-art='systems'] .dg {
		max-width: 340px;
		max-height: 210px;
	}
	.dg text {
		font-family: var(--font-sans);
		font-size: 9px;
		fill: var(--text-secondary);
	}
	.dg .strong {
		font-size: 11px;
		font-weight: 600;
		fill: var(--text);
	}
	.dg .on {
		fill: #1a1a1a;
		font-size: 8.5px;
	}
	.dg .cap {
		font-size: 8.5px;
	}
	.dg .pill {
		fill: var(--card);
		stroke: var(--rule);
	}
	.dg .ln,
	.dg .axis {
		fill: none;
		stroke: var(--rule);
		stroke-width: 1.2;
	}
	/* Design system layers */
	.p1 {
		fill: color-mix(in srgb, var(--amber) 85%, transparent);
	}
	.p2 {
		fill: color-mix(in srgb, #6b9bff 55%, transparent);
	}
	.p3 {
		fill: color-mix(in srgb, var(--text) 18%, transparent);
	}
	/* Venn */
	.v1 {
		fill: color-mix(in srgb, #6b9bff 32%, transparent);
	}
	.v2 {
		fill: color-mix(in srgb, #f08fb0 32%, transparent);
	}
	.v3 {
		fill: color-mix(in srgb, var(--amber) 34%, transparent);
	}
	/* Funnel */
	.funnel {
		height: 60px;
	}
	.f0 {
		fill: color-mix(in srgb, var(--text) 14%, transparent);
	}
	.f1 {
		fill: color-mix(in srgb, var(--text) 24%, transparent);
	}
	.f2 {
		fill: color-mix(in srgb, var(--amber) 60%, transparent);
	}
	.f3 {
		fill: var(--amber);
	}
	/* Double diamond: one tint per phase, labels in the phase colour */
	.h1 {
		fill: color-mix(in srgb, #3fb27f 22%, transparent);
	}
	.h2 {
		fill: color-mix(in srgb, var(--amber) 24%, transparent);
	}
	.h3 {
		fill: color-mix(in srgb, #4a90d9 22%, transparent);
	}
	.h4 {
		fill: color-mix(in srgb, var(--text) 12%, transparent);
	}
	.edge {
		fill: none;
		stroke: var(--text);
		stroke-width: 1.2;
	}
	.node {
		fill: var(--card);
		stroke: var(--text);
		stroke-width: 1.2;
	}
	.dg .edge-l {
		font-size: 7px;
		font-style: italic;
	}
	.dg .phase {
		font-size: 8.5px;
		font-weight: 600;
	}
	.dg .c1 {
		fill: #2e9a6a;
	}
	.dg .c2 {
		fill: #c9821a;
	}
	.dg .c3 {
		fill: #3a7fc4;
	}
	.dg .c4 {
		fill: var(--text);
	}
	.iter {
		fill: none;
		stroke: var(--text-secondary);
		stroke-width: 1;
	}
	.dot {
		stroke: var(--rule);
		stroke-dasharray: 2 3;
	}
	/* Loop */
	.loop {
		fill: none;
		stroke: var(--amber);
		stroke-width: 1.5;
		stroke-dasharray: 4 4;
	}
	.core {
		fill: var(--amber);
	}
	/* Growth-driven design */
	.dg .solid {
		fill: var(--amber);
		stroke: none;
	}
	.arrowhead {
		fill: var(--text-secondary);
	}

	/* AI hub */
	.a-ai {
		display: grid;
		grid-template-columns: auto auto auto;
		align-items: center;
		justify-items: center;
		gap: 8px 14px;
	}
	.tools-l,
	.tools-r {
		display: grid;
		gap: 6px;
	}
	.a-ai .t {
		display: grid;
		place-items: center;
		width: 26px;
		height: 26px;
		border-radius: 50%;
		background: var(--card);
		box-shadow: 0 0 0 1px var(--hairline);
		color: var(--text);
	}
	.hub {
		display: grid;
		place-items: center;
		width: 44px;
		height: 44px;
		border-radius: 50%;
		background: var(--amber);
		color: #1a1a1a;
		font-size: 12px;
		font-weight: 600;
		box-shadow: 0 0 0 6px color-mix(in srgb, var(--amber) 20%, transparent);
	}
	.ai-mono {
		display: grid;
		place-items: center;
		width: 14px;
		height: 14px;
		border-radius: 4px;
		background: var(--text);
		color: var(--bg);
		font-size: 7px;
		font-weight: 600;
	}
	.uses {
		grid-column: 1 / -1;
		display: flex;
		gap: 4px;
	}
	.uses i,
	.chip {
		display: inline-flex;
		align-items: center;
		gap: 4px;
		padding: 2px 8px;
		border-radius: 999px;
		background: var(--card);
		box-shadow: 0 0 0 1px var(--hairline);
		font-size: 10px;
		font-style: normal;
		color: var(--text);
	}
	.a-stack {
		display: grid;
		justify-items: center;
		gap: 8px;
		width: 100%;
	}
	.chips {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 4px;
	}
	.chip :global(svg) {
		color: var(--text-secondary);
	}

	/* Skill wheel */
	.a-wheel {
		display: flex;
		align-items: center;
		gap: 16px;
	}
	.wheel {
		position: relative;
		display: grid;
		place-items: center;
		width: 72px;
		height: 72px;
		border-radius: 50%;
		background: conic-gradient(#e9a23b 0 25%, #6b9bff 0 50%, #3fb27f 0 75%, #f08fb0 0);
	}
	.wheel::before {
		content: '';
		position: absolute;
		inset: 14px;
		border-radius: 50%;
		background: var(--surface);
	}
	.wheel b {
		position: relative;
		font-size: 13px;
		font-weight: 600;
	}
	.legend {
		display: grid;
		gap: 3px;
	}
	.legend i {
		display: flex;
		align-items: center;
		gap: 6px;
		font-size: 10.5px;
		font-style: normal;
		color: var(--text);
	}
	.legend i::before {
		content: '';
		width: 8px;
		height: 8px;
		border-radius: 2px;
		background: var(--c);
	}

	/* Tools: brand marks in a row, a dot under each shows its category */
	[data-cat] {
		--cat: var(--amber);
	}
	[data-cat='AI'] {
		--cat: #7c6cf2;
	}
	[data-cat='Code'] {
		--cat: #3fb27f;
	}
	.tools-head {
		grid-column: 1 / -1;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 12px;
		margin: 28px 0 12px;
	}
	.key {
		display: flex;
		gap: 12px;
	}
	.key span {
		display: inline-flex;
		align-items: center;
		gap: 6px;
	}
	.key i {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: var(--cat);
	}
	.tools {
		grid-column: 1 / -1;
		display: grid;
		grid-template-columns: subgrid;
		row-gap: var(--gap);
		margin: 0;
		padding: 0;
		list-style: none;
	}
	.tools li {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 8px;
		padding: 14px 4px;
		border: 1px solid var(--hairline);
		border-radius: 12px;
		background: var(--card);
		font-size: 12px;
		color: var(--text-secondary);
		transition: transform 0.4s var(--ease-out);
	}
	.tools li::after {
		content: '';
		position: absolute;
		top: 8px;
		right: 8px;
		width: 5px;
		height: 5px;
		border-radius: 50%;
		background: var(--cat);
	}
	.tools li:hover {
		transform: translateY(-3px);
	}
	.mono {
		display: grid;
		place-items: center;
		width: 22px;
		height: 22px;
		border-radius: 6px;
		background: var(--text);
		color: var(--bg);
		font-size: 10px;
		font-weight: 600;
	}
	.langs {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
		margin: 16px 0 0;
		padding: 0;
		list-style: none;
		grid-column: 1 / -1;
	}
	.langs li {
		padding: 5px 12px;
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

	@media (max-width: 1023px) {
		.lede {
			display: none;
		}
		.b-tile,
		.b-tile[data-art='journey'] {
			grid-column: span 3;
		}
		.b-tile[data-art='systems'] {
			grid-column: 1 / -1;
			grid-row: auto;
		}
	}
	@media (max-width: 600px) {
		.b-tile,
		.b-tile[data-art='journey'] {
			grid-column: span 2;
			padding: 12px;
		}
		.b-tile[data-art='journey'] {
			grid-column: 1 / -1;
		}
		.art {
			height: auto;
			min-height: 112px;
			padding: 10px 6px;
		}
		.tools {
			grid-template-columns: repeat(5, minmax(0, 1fr));
			gap: 8px;
		}
		.tools li {
			padding: 12px 2px;
			font-size: 11px;
		}
	}

	/* ── Companies ── */
	/* Logos: two columns each (five per row); the page grid lines are the dividers */
	.logos {
		margin: -28px 0 0;
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
		padding: 24px 0;
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
		height: 36px;
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

	/* ── Lightbox: the visual on top (or left), details beside it ── */
	.lightbox {
		width: min(960px, calc(100vw - 32px));
		margin: auto;
		max-height: calc(100svh - 32px);
		padding: 0;
		border: 0;
		border-radius: 16px;
		background: var(--bg);
		color: var(--text);
		box-shadow: var(--shadow-float);
		overflow: auto;
	}
	.lightbox[open] {
		display: grid;
		grid-template-columns: 1.6fr 1fr;
		animation: enter 0.4s var(--ease-out) both;
	}
	.lightbox:focus-visible {
		outline: none;
	}
	.lightbox::backdrop {
		background: rgba(0, 0, 0, 0.7);
		backdrop-filter: blur(4px);
	}
	.lb-media {
		container-type: inline-size;
		min-height: 320px;
		background: #14110e;
	}
	.lb-media .shot,
	.lb-media .studio,
	.lb-media .degree {
		height: 100%;
	}
	.lb-body {
		display: flex;
		flex-direction: column;
		gap: 14px;
		padding: 24px 20px 20px;
	}
	.lb-head {
		display: grid;
		gap: 4px;
		padding-right: 32px;
	}
	.lb-head strong {
		font-size: 17px;
		font-weight: 500;
		line-height: 1.3;
	}
	.lb-meta,
	.lb-sum {
		font-size: 13px;
		color: var(--text-secondary);
	}
	.lb-score {
		display: flex;
		align-items: baseline;
		gap: 4px;
		font-size: 13px;
		color: var(--text-secondary);
	}
	.lb-score strong {
		font-size: 20px;
		font-weight: 500;
		color: var(--text);
	}
	.pass {
		margin-left: auto;
		padding: 1px 8px;
		border-radius: 999px;
		background: color-mix(in srgb, #3fb27f 16%, transparent);
		color: #2c8a60;
		font-size: 10px;
	}
	:global([data-theme='dark']) .pass {
		color: #6fd3a5;
	}
	.lb-sections {
		display: grid;
		gap: 10px;
		margin: 0;
		padding: 0;
		list-style: none;
	}
	.lb-sections li {
		display: grid;
		grid-template-columns: 1fr auto;
		gap: 4px 12px;
		font-size: 12px;
		color: var(--text-secondary);
	}
	.s-val {
		font-family: var(--font-mono);
		color: var(--text);
	}
	.s-bar {
		grid-column: 1 / -1;
		height: 4px;
		border-radius: 999px;
		background: var(--surface);
		overflow: hidden;
	}
	.s-bar span {
		display: block;
		height: 100%;
		background: var(--amber);
	}
	.lb-links {
		display: flex;
		flex-wrap: wrap;
		gap: 16px;
		margin-top: auto;
		font-size: 13px;
	}
	.close {
		position: absolute;
		top: 12px;
		right: 12px;
		display: grid;
		place-items: center;
		width: 32px;
		height: 32px;
		border: 0;
		border-radius: 50%;
		background: var(--surface);
		color: var(--text);
		cursor: pointer;
	}
	@media (max-width: 760px) {
		.lightbox[open] {
			grid-template-columns: 1fr;
		}
		.lb-media {
			min-height: 0;
			aspect-ratio: 16 / 10;
		}
		.close {
			background: color-mix(in srgb, var(--bg) 85%, transparent);
		}
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
			grid-column: 1 / span 2;
		}
		.copy {
			grid-column: 3 / -1;
			padding-left: 0;
		}
		.facts {
			grid-template-columns: repeat(2, minmax(0, 1fr));
			row-gap: 14px;
		}
		.who {
			grid-column: 3 / span 3;
		}
		.scope-col {
			display: none;
		}
		.details .scope {
			display: block;
		}
		.toggle {
			grid-column: 6;
		}
		.details {
			grid-column: 3 / -1;
		}
	}

	/* Phone: 4 columns; everything stacks full width with tighter rhythm */
	@media (max-width: 600px) {
		.profile {
			padding-top: 20px;
		}
		.block {
			padding-top: 48px;
		}
		.header {
			row-gap: 24px;
		}
		/* Portrait sits at a comfortable size, the sticker kept inside the frame */
		.portrait {
			grid-column: 1 / -1;
			justify-self: center;
			width: min(72%, 260px);
		}
		.hello {
			right: -8%;
			bottom: 22%;
			font-size: 19px;
		}
		.copy {
			grid-column: 1 / -1;
		}
		h1 {
			font-size: 30px;
		}
		.facts {
			margin-top: 20px;
		}
		.actions {
			margin-top: 20px;
		}
		.actions a {
			flex: 1 1 0;
			height: 44px;
		}

		/* Experience: logo + role with the toggle; the period sits under the company */
		.job {
			row-gap: 2px;
			padding: 14px 0;
		}
		.who {
			grid-column: 1 / span 3;
			grid-row: 1;
		}
		.toggle {
			grid-column: 4;
			grid-row: 1;
		}
		.period {
			grid-column: 1 / -1;
			grid-row: 2;
			padding-left: 50px;
			font-size: 10px;
		}
		.details {
			grid-column: 1 / -1;
			padding-left: 50px;
		}

		.logos li {
			padding: 20px 0;
		}
		.logos img {
			height: 30px;
		}
	}
</style>
