import type { Comment, Project } from '#lib/types/index.ts';

/**
 * Project feedback: reactions and comments.
 *
 * There is no backend yet, so this stores the visitor's own vote and comments in
 * localStorage on top of the project's seed numbers. The async signatures match
 * what an API-backed version (via `#lib/api/client.ts`) would look like, so the
 * components won't need to change when one exists.
 */
export type Vote = 'like' | 'dislike' | null;

export interface Feedback {
	likes: number;
	dislikes: number;
	vote: Vote;
	comments: Comment[];
}

interface LocalState {
	vote: Vote;
	comments: Comment[];
}

const key = (slug: string) => `folio:feedback:${slug}`;

function readLocal(slug: string): LocalState {
	try {
		const raw = localStorage.getItem(key(slug));
		if (raw) return JSON.parse(raw) as LocalState;
	} catch {
		// unreadable or blocked storage
	}
	return { vote: null, comments: [] };
}

function writeLocal(slug: string, state: LocalState) {
	try {
		localStorage.setItem(key(slug), JSON.stringify(state));
	} catch {
		// storage blocked — feedback just won't persist
	}
}

function compose(project: Project, local: LocalState): Feedback {
	return {
		likes: project.seed.likes + (local.vote === 'like' ? 1 : 0),
		dislikes: project.seed.dislikes + (local.vote === 'dislike' ? 1 : 0),
		vote: local.vote,
		comments: [...project.seed.comments, ...local.comments]
	};
}

export const feedbackService = {
	async get(project: Project): Promise<Feedback> {
		return compose(project, readLocal(project.slug));
	},

	/** Casting the same vote again removes it. */
	async vote(project: Project, vote: Exclude<Vote, null>): Promise<Feedback> {
		const local = readLocal(project.slug);
		local.vote = local.vote === vote ? null : vote;
		writeLocal(project.slug, local);
		return compose(project, local);
	},

	async comment(project: Project, input: { name: string; body: string }): Promise<Feedback> {
		const local = readLocal(project.slug);
		local.comments.push({
			id: crypto.randomUUID(),
			name: input.name.trim() || 'Anonymous',
			body: input.body.trim(),
			date: new Date().toISOString()
		});
		writeLocal(project.slug, local);
		return compose(project, local);
	}
};
