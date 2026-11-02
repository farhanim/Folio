// Case-study slides, rendered with: bun scripts/covers/render.mjs --slides
import { saldoPanen } from './saldo-panen.mjs';
import { efishery } from './efishery.mjs';
import { fazz } from './fazz.mjs';
import { nikel, warungPintar } from './warung-pintar.mjs';

export const slides = [...saldoPanen, ...efishery, ...fazz, ...warungPintar, ...nikel];
