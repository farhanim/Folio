// Sample clients — fictional names and marks. Replace logos in static/images/clients.
import type { Client } from '#lib/types/index.ts';

export const clients = {
	cyclone: { name: 'Cyclone Retail', logo: '/images/clients/cyclone.svg' },
	kala: { name: 'Kala Studio', logo: '/images/clients/kala.svg' },
	nusa: { name: 'Nusa Labs', logo: '/images/clients/nusa.svg' },
	arunika: { name: 'Arunika', logo: '/images/clients/arunika.svg' },
	pasar: { name: 'Pasar.id', logo: '/images/clients/pasar.svg' },
	folio: { name: 'Personal', logo: '/images/clients/folio.svg' }
} satisfies Record<string, Client>;
