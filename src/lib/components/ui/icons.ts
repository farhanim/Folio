// 24×24 stroke icons (Lucide-style geometry). Each entry is one or more path strings.
export const icons = {
	home: ['M3 10.5 12 3l9 7.5', 'M5 9.5V20a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V9.5'],
	grid: ['M4 4h7v7H4z', 'M13 4h7v7h-7z', 'M4 13h7v7H4z', 'M13 13h7v7h-7z'],
	desk: [
		'M3 10h18',
		'M5 10v10',
		'M19 10v10',
		'M8 10V6a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v4',
		'M5 15h14'
	],
	mail: ['M3 6h18v12H3z', 'm3 7 9 6 9-6'],
	sliders: ['M4 7h9', 'M17 7h3', 'M4 17h3', 'M11 17h9', 'M15 5v4', 'M9 15v4'],
	arrowUpRight: ['M7 17 17 7', 'M8 7h9v9'],
	arrowUp: ['M12 19V5', 'm5 12 7-7 7 7'],
	copy: ['M9 9h11v11H9z', 'M5 15H4V4h11v1'],
	check: ['m5 12 5 5 9-10'],
	sparkle: [
		'M12 3v4',
		'M12 17v4',
		'M3 12h4',
		'M17 12h4',
		'm6 6 2.5 2.5',
		'm15.5 15.5 2.5 2.5',
		'm18 6-2.5 2.5',
		'm8.5 15.5-2.5 2.5'
	],
	pin: [
		'M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z',
		'M12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z'
	]
} as const;

export type IconName = keyof typeof icons;
