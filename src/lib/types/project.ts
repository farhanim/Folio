export type ProjectType = 'design' | 'code';

export interface Client {
	name: string;
	/** Square tile, used at icon size (badges, experience rows). */
	logo: string;
	/** Transparent, trimmed logo for places shown without a tile (the Companies wall). */
	mark?: string;
	/**
	 * How the mark is lit in dark mode: `dark` marks (mostly black) are inverted;
	 * `color` marks are lightened instead so their inner details keep contrast.
	 */
	markTone?: 'dark' | 'color';
}

export interface ImageRef {
	src: string;
	alt: string;
}

/** Content blocks that make up a project page. Each one is also a slideshow slide. */
export type Block =
	| { kind: 'text'; id: string; title: string; body: string[] }
	| { kind: 'stats'; id: string; title: string; items: { value: string; label: string }[] }
	| {
			kind: 'gallery';
			id: string;
			title: string;
			caption?: string;
			layout: 'wide' | 'row';
			images: ImageRef[];
	  }
	| { kind: 'quote'; id: string; title: string; quote: string; author: string; role: string }
	| { kind: 'code'; id: string; title: string; language: string; caption?: string; code: string }
	/** Numbered feature cards: what the product does. */
	| { kind: 'features'; id: string; title: string; items: { title: string; body: string }[] }
	/** Outcome list: what changes for the people using it. */
	| { kind: 'impact'; id: string; title: string; intro?: string; items: string[] }
	/** Tech stack grouped by layer, each item with a one-line reason. */
	| {
			kind: 'stack';
			id: string;
			title: string;
			groups: { label: string; items: { name: string; why?: string }[] }[];
	  };

export interface Comment {
	id: string;
	name: string;
	body: string;
	/** ISO date */
	date: string;
}

export interface Project {
	slug: string;
	type: ProjectType;
	title: string;
	tagline: string;
	summary: string;
	client: Client;
	role: string;
	/** Leave out when unknown — shown as a dash. */
	year?: number;
	duration?: string;
	team?: string;
	tools: string[];
	cover: string;
	/** Extra facts for the details row, e.g. { label: 'Platform', value: 'Web' }. */
	facts?: { label: string; value: string }[];
	/** Screens shown beside the motion clip in the project's media stage. */
	gallery?: ImageRef[];
	/** A runnable build of the project, shown as a motion thumbnail and a live preview. */
	preview?: {
		/** The project's own page, served from static/projects. */
		url: string;
		/** Short muted loop used as the thumbnail (falls back to `cover`). */
		video: string;
		/** First frame of the loop. */
		poster: string;
		/** How to get in, if the build has a demo login. */
		note?: string;
	};
	/** Highlighted in "Worth a read". */
	featured?: boolean;
	/** Shows a "New" tag. */
	isNew?: boolean;
	links?: { label: string; href: string }[];
	/** Code projects only. */
	repo?: { language: string; stars: number; license: string };
	blocks: Block[];
	/** Starting feedback numbers until a real backend exists. */
	seed: { likes: number; dislikes: number; comments: Comment[] };
}
