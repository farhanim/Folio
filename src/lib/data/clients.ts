import type { Client } from '#lib/types/index.ts';

// Companies and organisations from the CV: a square tile (`logo`) for icon sizes
// and a transparent mark (`mark`) for the Companies wall.
export const companies = {
	nikel: {
		name: 'Nikel',
		logo: '/images/clients/nikel.webp',
		mark: '/images/clients/marks/nikel.webp',
		markTone: 'dark'
	},
	efishery: {
		name: 'eFishery',
		logo: '/images/clients/efishery.webp',
		mark: '/images/clients/marks/efishery.webp',
		markTone: 'color'
	},
	fazz: {
		name: 'Fazz',
		logo: '/images/clients/fazz.webp',
		mark: '/images/clients/marks/fazz.webp',
		markTone: 'color'
	},
	warungPintar: {
		name: 'Warung Pintar',
		logo: '/images/clients/warung-pintar.webp',
		mark: '/images/clients/marks/warung-pintar.webp',
		markTone: 'color'
	},
	immobi: {
		name: 'Immobi',
		logo: '/images/clients/immobi.webp',
		mark: '/images/clients/marks/immobi.webp',
		markTone: 'dark'
	},
	twonity: {
		name: 'Twonity',
		logo: '/images/clients/twonity.webp',
		mark: '/images/clients/marks/twonity.webp',
		markTone: 'dark'
	},
	myEduSolve: {
		name: 'MyEduSolve',
		logo: '/images/clients/myedusolve.webp',
		mark: '/images/clients/marks/myedusolve.webp',
		markTone: 'color'
	},
	unas: { name: 'Universitas Nasional', logo: '/images/clients/unas.webp' }
} satisfies Record<string, Client>;

// Clients of the showcase builds in static/projects (logos taken from each build).
export const showcaseClients = {
	derkei: { name: 'PT. Wajracyena Derkei Sekuriti', logo: '/images/clients/derkei.webp' },
	jardin: { name: 'Jardin Legal', logo: '/images/clients/jardin.webp' },
	kee: { name: 'Kee Platforms', logo: '/images/clients/kee.webp' },
	muskitnas: { name: 'Museum Kebangkitan Nasional', logo: '/images/clients/muskitnas.webp' },
	sparq: { name: 'SparQ', logo: '/images/clients/sparq.webp' },
	blastHub: { name: 'Blast Hub', logo: '/images/clients/blast-hub.webp' },
	iconplus: { name: 'ICON+ (PLN Icon Plus)', logo: '/images/clients/iconplus.webp' },
	devfartha: { name: 'Devfartha', logo: '/images/clients/devfartha.webp' },
	pertamina: { name: 'Pertamina Hulu Kalimantan Timur', logo: '/images/clients/pertamina.webp' },
	dataroom: { name: 'Dataroom · IKN Nusantara', logo: '/images/clients/dataroom.webp' },
	kemendikbud: {
		name: 'Ditjen Kebudayaan, Kemendikbud',
		logo: '/images/clients/kemendikbud.webp'
	}
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
