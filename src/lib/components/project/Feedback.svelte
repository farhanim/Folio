<script lang="ts">
	import { flip } from 'svelte/animate';
	import { fly, scale } from 'svelte/transition';
	import Icon from '#lib/components/ui/Icon.svelte';
	import { feedbackService, type Feedback } from '#lib/services/feedback.service.ts';
	import type { Project } from '#lib/types/index.ts';
	import { reveal } from '#lib/utils/reveal.ts';

	/** "Was this worth your time?" reactions plus a comment thread. */
	let { project }: { project: Project } = $props();

	const seeded = (p: Project): Feedback => ({ ...p.seed, vote: null });

	// Seed numbers render on the server; the visitor's own vote/comments load in the browser
	// (and reload when navigating to another project).
	// svelte-ignore state_referenced_locally
	let feedback = $state<Feedback>(seeded(project));
	let name = $state('');
	let body = $state('');
	let pop = $state<'like' | 'dislike' | null>(null);

	$effect(() => {
		feedbackService.get(project).then((f) => (feedback = f));
	});

	async function vote(v: 'like' | 'dislike') {
		feedback = await feedbackService.vote(project, v);
		pop = feedback.vote === v ? v : null;
		setTimeout(() => (pop = null), 600);
	}

	async function submit(e: SubmitEvent) {
		e.preventDefault();
		if (!body.trim()) return;
		feedback = await feedbackService.comment(project, { name, body });
		body = '';
	}

	const date = (iso: string) =>
		new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
	const initials = (n: string) =>
		n
			.split(/\s+/)
			.map((p) => p[0])
			.join('')
			.slice(0, 2)
			.toUpperCase();
</script>

<section class="feedback" id="feedback" use:reveal>
	<div class="rate" data-reveal>
		<h2>Was this worth your time?</h2>
		<div class="buttons">
			<button
				type="button"
				class:on={feedback.vote === 'like'}
				class:pop={pop === 'like'}
				aria-pressed={feedback.vote === 'like'}
				onclick={() => vote('like')}
			>
				<Icon name="thumbsUp" size={18} />
				<span class="count">{feedback.likes}</span>
				<span class="sr">likes</span>
			</button>
			<button
				type="button"
				class:on={feedback.vote === 'dislike'}
				class:pop={pop === 'dislike'}
				aria-pressed={feedback.vote === 'dislike'}
				onclick={() => vote('dislike')}
			>
				<Icon name="thumbsDown" size={18} />
				<span class="count">{feedback.dislikes}</span>
				<span class="sr">dislikes</span>
			</button>
		</div>
		{#if feedback.vote}
			<p class="thanks label" in:fly={{ y: 6 }}>
				{feedback.vote === 'like' ? 'Thanks — glad it helped!' : 'Thanks — noted for next time.'}
			</p>
		{/if}
	</div>

	<div class="thread" data-reveal>
		<h3>
			<Icon name="message" size={16} />
			Comments <sup>{feedback.comments.length}</sup>
		</h3>

		<form onsubmit={submit}>
			<input
				bind:value={name}
				placeholder="Your name (optional)"
				maxlength="40"
				aria-label="Name"
			/>
			<textarea
				bind:value={body}
				placeholder="Leave a note about this project…"
				rows="3"
				maxlength="600"
				aria-label="Comment"
				required></textarea>
			<div class="form-foot">
				<span class="label">Stored only in this browser for now</span>
				<button type="submit" disabled={!body.trim()}>Post comment</button>
			</div>
		</form>

		<ol>
			{#each [...feedback.comments].reverse() as c (c.id)}
				<li animate:flip={{ duration: 300 }} in:scale={{ start: 0.96, duration: 300 }}>
					<span class="avatar" aria-hidden="true">{initials(c.name)}</span>
					<div>
						<p class="who">
							<strong>{c.name}</strong> <time datetime={c.date}>{date(c.date)}</time>
						</p>
						<p>{c.body}</p>
					</div>
				</li>
			{:else}
				<li class="empty">No comments yet — be the first.</li>
			{/each}
		</ol>
	</div>
</section>

<style>
	.feedback {
		display: grid;
		grid-template-columns: minmax(0, 4fr) minmax(0, 6fr);
		gap: 40px;
		padding: 56px 0;
		border-top: 1px solid var(--rule);
	}
	h2 {
		font-size: clamp(24px, 2.4vw, 32px);
		font-weight: 450;
		letter-spacing: -0.03em;
		line-height: 1.1;
	}
	.buttons {
		display: flex;
		gap: 10px;
		margin-top: 20px;
	}
	.buttons button {
		position: relative;
		display: inline-flex;
		align-items: center;
		gap: 8px;
		height: 44px;
		padding: 0 16px;
		border: 1px solid var(--rule);
		border-radius: 999px;
		background: none;
		color: var(--text-secondary);
		font: inherit;
		font-size: 14px;
		cursor: pointer;
		transition:
			background-color 0.25s ease,
			color 0.25s ease,
			border-color 0.25s ease,
			transform 0.3s var(--ease-out);
	}
	.buttons button:hover {
		color: var(--text);
		border-color: var(--text);
	}
	.buttons button.on {
		background: var(--text);
		border-color: var(--text);
		color: var(--bg);
	}
	.buttons button:active {
		transform: scale(0.94);
	}
	.pop :global(svg) {
		animation: pop 0.6s var(--ease-out);
	}
	@keyframes pop {
		30% {
			transform: scale(1.5) rotate(-14deg);
		}
		60% {
			transform: scale(0.9) rotate(4deg);
		}
	}
	.count {
		font-family: var(--font-mono);
		font-size: 12px;
		font-variant-numeric: tabular-nums;
	}
	.sr {
		position: absolute;
		width: 1px;
		height: 1px;
		overflow: hidden;
		clip-path: inset(50%);
	}
	.thanks {
		margin-top: 14px;
		text-transform: none;
	}

	h3 {
		display: flex;
		align-items: center;
		gap: 8px;
		font-size: 16px;
		font-weight: 500;
	}
	sup {
		font-family: var(--font-mono);
		font-size: 10px;
		color: var(--text-secondary);
	}
	form {
		display: grid;
		gap: 8px;
		margin-top: 16px;
	}
	input,
	textarea {
		width: 100%;
		padding: 12px 14px;
		border: 1px solid var(--hairline);
		border-radius: 12px;
		background: var(--card);
		color: var(--text);
		font: inherit;
		font-size: 14px;
		resize: vertical;
		transition: border-color 0.2s ease;
	}
	input:focus,
	textarea:focus {
		outline: none;
		border-color: var(--text);
	}
	.form-foot {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 12px;
	}
	.form-foot .label {
		text-transform: none;
	}
	form button {
		padding: 9px 16px;
		border: 0;
		border-radius: 999px;
		background: var(--text);
		color: var(--bg);
		font: inherit;
		font-size: 13px;
		cursor: pointer;
		transition: opacity 0.2s ease;
	}
	form button:disabled {
		opacity: 0.35;
		cursor: default;
	}

	ol {
		display: grid;
		gap: 2px;
		margin: 24px 0 0;
		padding: 0;
		list-style: none;
	}
	li {
		display: flex;
		gap: 12px;
		padding: 14px 0;
		border-top: 1px solid var(--hairline);
		font-size: 14px;
	}
	.avatar {
		display: grid;
		place-items: center;
		flex: none;
		width: 32px;
		height: 32px;
		border-radius: 50%;
		background: var(--surface);
		font-family: var(--font-mono);
		font-size: 11px;
	}
	.who {
		margin-bottom: 2px;
	}
	.who strong {
		font-weight: 500;
	}
	time {
		margin-left: 6px;
		font-family: var(--font-mono);
		font-size: 11px;
		color: var(--text-secondary);
	}
	li p:last-child {
		color: var(--text-secondary);
	}
	.empty {
		color: var(--text-secondary);
	}

	@media (max-width: 1023px) {
		.feedback {
			grid-template-columns: 1fr;
		}
	}
</style>
