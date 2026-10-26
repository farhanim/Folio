import type { ResolvedTheme, ThemePreference } from '#lib/types/index.ts';

const KEYS = {
	theme: 'folio:theme',
	grid: 'folio:grid',
	textScale: 'folio:text-scale'
} as const;

export const TEXT_SCALE = { min: 0.9, max: 1.4, step: 0.1 } as const;

function read(key: string): string | null {
	try {
		return localStorage.getItem(key);
	} catch {
		return null;
	}
}

function write(key: string, value: string) {
	try {
		localStorage.setItem(key, value);
	} catch {
		// Storage can be blocked (private mode); settings still apply for this visit.
	}
}

class Settings {
	theme = $state<ThemePreference>('system');
	resolved = $state<ResolvedTheme>('light');
	grid = $state(true);
	textScale = $state(1);

	#media: MediaQueryList | null = null;

	/** Sync from storage + the attributes the inline script in app.html already set. */
	init() {
		const root = document.documentElement;
		this.theme = (read(KEYS.theme) as ThemePreference) ?? 'system';
		this.resolved = root.dataset.theme === 'dark' ? 'dark' : 'light';
		this.grid = read(KEYS.grid) !== 'off';
		this.textScale = Number(read(KEYS.textScale)) || 1;

		this.#media = matchMedia('(prefers-color-scheme: dark)');
		this.#media.addEventListener('change', () => {
			if (this.theme === 'system') this.#apply();
		});
	}

	/**
	 * Change the theme. When an origin point is given, the new theme is revealed
	 * as a circle growing out of it (View Transitions), e.g. from the lamp bulb.
	 */
	setTheme(pref: ThemePreference, origin?: { x: number; y: number }) {
		this.theme = pref;
		write(KEYS.theme, pref);

		const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (!origin || reduce || !document.startViewTransition) {
			this.#apply();
			return;
		}

		const transition = document.startViewTransition(() => this.#apply());
		transition.ready.then(() => {
			const radius = Math.hypot(
				Math.max(origin.x, innerWidth - origin.x),
				Math.max(origin.y, innerHeight - origin.y)
			);
			document.documentElement.animate(
				{
					clipPath: [
						`circle(0px at ${origin.x}px ${origin.y}px)`,
						`circle(${radius}px at ${origin.x}px ${origin.y}px)`
					]
				},
				{
					duration: 700,
					easing: 'cubic-bezier(0.4, 0, 0.15, 1)',
					pseudoElement: '::view-transition-new(root)'
				}
			);
		});
	}

	toggleTheme(origin?: { x: number; y: number }) {
		this.setTheme(this.resolved === 'dark' ? 'light' : 'dark', origin);
	}

	setGrid(on: boolean) {
		this.grid = on;
		write(KEYS.grid, on ? 'on' : 'off');
		if (on) delete document.documentElement.dataset.grid;
		else document.documentElement.dataset.grid = 'off';
	}

	stepText(direction: 1 | -1) {
		const next = Math.round((this.textScale + direction * TEXT_SCALE.step) * 10) / 10;
		this.textScale = Math.min(TEXT_SCALE.max, Math.max(TEXT_SCALE.min, next));
		write(KEYS.textScale, String(this.textScale));
		document.documentElement.style.setProperty('--text-scale', String(this.textScale));
	}

	#apply() {
		const dark =
			this.theme === 'dark' || (this.theme === 'system' && (this.#media?.matches ?? false));
		this.resolved = dark ? 'dark' : 'light';
		document.documentElement.dataset.theme = this.resolved;
	}
}

export const settings = new Settings();
