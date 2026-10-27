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

export interface Education {
	school: string;
	logo?: string;
	degree: string;
	period: string;
	note?: string;
}

export interface Achievement {
	year: string;
	title: string;
	issuer: string;
	kind: 'award' | 'talk' | 'cert' | 'press' | 'mentor' | 'milestone';
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
	facts: { label: string; value: string }[];
	experience: Experience[];
	education: Education[];
	achievements: Achievement[];
	capabilities: { group: string; items: string[] }[];
	languages: { name: string; level: string }[];
}
