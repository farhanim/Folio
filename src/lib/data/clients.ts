import type { Client } from '#lib/types/index.ts';

// Companies and organisations from the CV: a square tile (`logo`) for icon sizes
// and a transparent mark (`mark`) for the Companies wall.
export const companies = {
	nikel: {
		name: 'Nikel',
		logo: '/images/clients/nikel.webp',
		mark: '/images/clients/marks/nikel.webp'
	},
	efishery: {
		name: 'eFishery',
		logo: '/images/clients/efishery.webp',
		mark: '/images/clients/marks/efishery.webp'
	},
	fazz: {
		name: 'Fazz',
		logo: '/images/clients/fazz.webp',
		mark: '/images/clients/marks/fazz.webp'
	},
	warungPintar: {
		name: 'Warung Pintar',
		logo: '/images/clients/warung-pintar.webp',
		mark: '/images/clients/marks/warung-pintar.webp'
	},
	immobi: {
		name: 'Immobi',
		logo: '/images/clients/immobi.webp',
		mark: '/images/clients/marks/immobi.webp'
	},
	twonity: {
		name: 'Twonity',
		logo: '/images/clients/twonity.webp',
		mark: '/images/clients/marks/twonity.webp'
	},
	myEduSolve: {
		name: 'MyEduSolve',
		logo: '/images/clients/myedusolve.webp',
		mark: '/images/clients/marks/myedusolve.webp'
	},
	unas: { name: 'Universitas Nasional', logo: '/images/clients/unas.webp' }
} satisfies Record<string, Client>;

// Sample clients used by the placeholder projects — remove once real projects are in.
export const clients = {
	cyclone: { name: 'Cyclone Retail', logo: '/images/clients/cyclone.svg' },
	kala: { name: 'Kala Studio', logo: '/images/clients/kala.svg' },
	nusa: { name: 'Nusa Labs', logo: '/images/clients/nusa.svg' },
	arunika: { name: 'Arunika', logo: '/images/clients/arunika.svg' },
	pasar: { name: 'Pasar.id', logo: '/images/clients/pasar.svg' },
	folio: { name: 'Personal', logo: '/images/clients/folio.svg' }
} satisfies Record<string, Client>;
