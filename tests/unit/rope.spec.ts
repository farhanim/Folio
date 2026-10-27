import { describe, expect, it } from 'vitest';
import { Rope } from '#lib/utils/rope.ts';

const run = (rope: Rope, steps: number, opts?: Parameters<Rope['step']>[0]) => {
	for (let i = 0; i < steps; i++) rope.step(opts);
};

describe('Rope', () => {
	it('hangs straight down from its anchor and settles', () => {
		const rope = new Rope({ x: 10, y: 0 }, 8);
		rope.impulse(2, 0);
		run(rope, 600);
		expect(rope.end.x).toBeCloseTo(10, 1);
		expect(rope.end.y).toBeCloseTo(8, 0);
		expect(rope.energy).toBeLessThan(0.01);
	});

	it('bends toward a target without stretching past its length', () => {
		const rope = new Rope({ x: 0, y: 0 }, 10);
		run(rope, 300, { target: { x: 40, y: 0, strength: 0.3 } });
		expect(rope.end.x).toBeGreaterThan(5);
		expect(Math.hypot(rope.end.x, rope.end.y)).toBeLessThanOrEqual(10.5);
	});

	it('builds a smooth path that starts at the anchor', () => {
		const rope = new Rope({ x: 3, y: 4 }, 6);
		expect(rope.path().startsWith('M3.00 4.00')).toBe(true);
	});
});
