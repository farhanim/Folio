// Case-study slides, rendered with: bun scripts/covers/render.mjs --slides
import { saldoPanen } from './saldo-panen.mjs';
import { efishery } from './efishery.mjs';
import { klika2c } from './klika2c.mjs';

export const slides = [...saldoPanen, ...efishery, ...klika2c];
