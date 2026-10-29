import type { Client } from './project.ts';

export interface Experience {
	role: string;
	company: Client;
	period: string;
	location: string;
	type: 'Full-time' | 'Freelance' | 'Contract' | 'Side hustle';
	/** What the role covered, e.g. the products led. */
	scope: string;
	summary: string;
	highlights: string[];
}

/** What a recognition or credential shows on hover (desktop) or on its card (touch). */
export type Visual =
	| { src: string; fit?: 'cover' | 'contain' }
	| { studio: { name: string; tagline: string; logo: string; shots: string[]; logos: string[] } }
	| {
			degree: {
				logo?: string;
				school: string;
				degree: string;
				major: string;
				year: string;
				gpa: string;
				gpaOf: string;
			};
	  };

export interface Education {
	school: string;
	logo?: string;
	degree: string;
	major: string;
	period: string;
	gpa: string;
	gpaOf: string;
}

/** An award, a mentoring role or a career milestone, each with one number worth remembering. */
export interface Recognition {
	kind: 'award' | 'mentor' | 'milestone';
	title: string;
	/** One short line. */
	summary: string;
	/** Who it's from, as short text; `logos` shows their marks (several for cross-company milestones). */
	from: string;
	logos: string[];
	year: string;
	stat: { value: string; label: string };
	visual: Visual;
}

/** An exam-based certification with its score report (the "transcript"). */
export interface Certification {
	title: string;
	credential: string;
	issuer: string;
	date: string;
	credentialId: string;
	verifyUrl: string;
	file?: string;
	image: string;
	score: number;
	required: number;
	maxScore: number;
	sections: { name: string; score: number }[];
}

/** A skill with a line of proof from the CV and the small illustration drawn for it. */
export interface Skill {
	name: string;
	group: 'Design & Research' | 'Leadership & Strategy';
	proof: string;
	art: 'systems' | 'flow' | 'team' | 'tree' | 'bars' | 'journey' | 'strategy' | 'growth';
}

export interface Tool {
	name: string;
	/** Key in components/ui/brands.ts; tools without one show their initials. */
	brand?: string;
	category: 'Design' | 'AI' | 'Code';
}

export interface Testimonial {
	name: string;
	avatar?: string;
	/** Their role when we worked together. */
	role: string;
	/** Where we worked together. */
	company: Client;
	/** A line lifted word for word from the quote; it's marked inside the quote. */
	highlight: string;
	headline: string;
	/** How we worked together. */
	relation: string;
	date: string;
	quote: string;
}

export interface Profile {
	fullName: string;
	nickname: string;
	headline: string;
	summary: string[];
	portrait: string;
	/** Optional transparent PNG/WebP of the same photo with the background removed. */
	portraitCutout?: string;
	cv: string;
	/** Icon names from components/ui/icons.ts. */
	facts: { icon: string; label: string; value: string }[];
	experience: Experience[];
	education: Education[];
	recognitions: Recognition[];
	certifications: Certification[];
	testimonials: Testimonial[];
	skills: Skill[];
	tools: Tool[];
	languages: { name: string; level: string }[];
}
