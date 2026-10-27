import { SvelteDate } from 'svelte/reactivity';

/**
 * A ticking wall clock for a given IANA time zone. Call `start()` in the browser
 * (it returns a stop function, so it can be returned straight from an effect).
 */
export function createClock(timeZone: string) {
	const now = new SvelteDate();

	const timeFmt = new Intl.DateTimeFormat('en-GB', {
		timeZone,
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit',
		hourCycle: 'h23'
	});
	const zoneFmt = new Intl.DateTimeFormat('en-US', { timeZone, timeZoneName: 'shortOffset' });

	// getTime() is what subscribes to the SvelteDate; Intl reads the raw value.
	const parts = $derived.by(() => {
		const list = timeFmt.formatToParts(now.getTime());
		const get = (type: string) => Number(list.find((p) => p.type === type)?.value ?? 0);
		return { h: get('hour'), m: get('minute'), s: get('second') };
	});

	const offset = $derived(
		zoneFmt.formatToParts(now.getTime()).find((p) => p.type === 'timeZoneName')?.value ?? 'UTC'
	);

	return {
		get h() {
			return parts.h;
		},
		get m() {
			return parts.m;
		},
		get s() {
			return parts.s;
		},
		get offset() {
			return offset;
		},
		get label() {
			const pad = (n: number) => String(n).padStart(2, '0');
			return `${pad(parts.h)}:${pad(parts.m)}`;
		},
		start() {
			now.setTime(Date.now());
			const id = setInterval(() => now.setTime(Date.now()), 1000);
			return () => clearInterval(id);
		}
	};
}
