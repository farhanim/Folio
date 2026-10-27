export interface Vec {
	x: number;
	y: number;
}

/**
 * A tiny Verlet rope: a chain of points hanging from a fixed anchor.
 * Each `step` integrates motion (gravity + inertia), optionally pulls the free
 * end toward a target, then relaxes the segment lengths so the rope bends
 * instead of stretching. Units are whatever the caller draws in (SVG units here).
 */
export class Rope {
	points: Vec[];
	private prev: Vec[];

	constructor(
		public anchor: Vec,
		public length: number,
		count = 9
	) {
		const seg = length / (count - 1);
		this.points = Array.from({ length: count }, (_, i) => ({ x: anchor.x, y: anchor.y + seg * i }));
		this.prev = this.points.map((p) => ({ ...p }));
	}

	get end(): Vec {
		return this.points[this.points.length - 1];
	}

	/** Sum of point speeds — near zero once the rope has come to rest. */
	get energy(): number {
		let e = 0;
		for (let i = 1; i < this.points.length; i++) {
			e +=
				Math.abs(this.points[i].x - this.prev[i].x) + Math.abs(this.points[i].y - this.prev[i].y);
		}
		return e;
	}

	step({
		gravity = 0.02,
		damping = 0.97,
		target,
		iterations = 8
	}: {
		gravity?: number;
		damping?: number;
		/** Pull the free end toward a point; strength 0–1 per step. */
		target?: Vec & { strength: number };
		iterations?: number;
	} = {}) {
		const { points, prev } = this;
		points[0] = { ...this.anchor };

		for (let i = 1; i < points.length; i++) {
			const p = points[i];
			const vx = (p.x - prev[i].x) * damping;
			const vy = (p.y - prev[i].y) * damping;
			prev[i] = { ...p };
			p.x += vx;
			p.y += vy + gravity;
		}

		if (target) {
			const end = this.end;
			end.x += (target.x - end.x) * target.strength;
			end.y += (target.y - end.y) * target.strength;
		}

		const seg = this.length / (points.length - 1);
		for (let k = 0; k < iterations; k++) {
			for (let i = 0; i < points.length - 1; i++) {
				const a = points[i];
				const b = points[i + 1];
				const dx = b.x - a.x;
				const dy = b.y - a.y;
				const d = Math.hypot(dx, dy) || 1e-6;
				const diff = (d - seg) / d;
				if (i === 0) {
					// The anchor never moves; the neighbour takes the whole correction.
					b.x -= dx * diff;
					b.y -= dy * diff;
				} else {
					a.x += dx * diff * 0.5;
					a.y += dy * diff * 0.5;
					b.x -= dx * diff * 0.5;
					b.y -= dy * diff * 0.5;
				}
			}
		}

		// Final pass from the anchor outward: no segment may end up longer than its
		// rest length, so a strong pull bends the rope but never stretches it.
		for (let i = 0; i < points.length - 1; i++) {
			const a = points[i];
			const b = points[i + 1];
			const dx = b.x - a.x;
			const dy = b.y - a.y;
			const d = Math.hypot(dx, dy);
			if (d > seg) {
				b.x = a.x + (dx / d) * seg;
				b.y = a.y + (dy / d) * seg;
			}
		}
	}

	/** Give every free point a velocity, e.g. a flick when the theme changes. */
	impulse(dx: number, dy: number) {
		for (let i = 1; i < this.points.length; i++) {
			const weight = i / (this.points.length - 1); // the tip moves most
			this.prev[i].x -= dx * weight;
			this.prev[i].y -= dy * weight;
		}
	}

	/** A smooth SVG path through the points (quadratic curves via midpoints). */
	path(): string {
		const p = this.points;
		let d = `M${p[0].x.toFixed(2)} ${p[0].y.toFixed(2)}`;
		for (let i = 1; i < p.length - 1; i++) {
			const mx = (p[i].x + p[i + 1].x) / 2;
			const my = (p[i].y + p[i + 1].y) / 2;
			d += ` Q${p[i].x.toFixed(2)} ${p[i].y.toFixed(2)} ${mx.toFixed(2)} ${my.toFixed(2)}`;
		}
		const last = p[p.length - 1];
		return `${d} L${last.x.toFixed(2)} ${last.y.toFixed(2)}`;
	}
}
