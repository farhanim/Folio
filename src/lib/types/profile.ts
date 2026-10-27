import type { Client } from './project.ts';

export interface Experience {
	role: string;
	company: Client;
	period: string;
	location: string;
	type: 'Full-time' | 'Freelance' | 'Contract';
	summary: string;
	highlights: string[];
}

export interface Education {
	school: string;
	degree: string;
	period: string;
	note?: string;
}

export interface Achievement {
	year: number;
	title: string;
	issuer: string;
	kind: 'award' | 'talk' | 'cert' | 'press';
}

export interface Profile {
	headline: string;
	summary: string[];
	portrait: string;
	cv: string;
	facts: { label: string; value: string }[];
	experience: Experience[];
	education: Education[];
	achievements: Achievement[];
	capabilities: { group: string; items: string[] }[];
	languages: { name: string; level: string }[];
}
