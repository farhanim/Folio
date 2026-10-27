export type ProjectType = 'design' | 'code';

export interface Client {
	name: string;
	logo: string;
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
	| { kind: 'code'; id: string; title: string; language: string; caption?: string; code: string };

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
	year: number;
	duration: string;
	team: string;
	tools: string[];
	cover: string;
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
