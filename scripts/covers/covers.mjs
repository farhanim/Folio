// One entry per project thumbnail. Each company keeps an identity (palette, voice)
// while every project gets its own composition and display face.
// Keep key content inside y 60–940: 16:9 cards crop 50px off the top and bottom.
import { warungPintar } from './brands/warung-pintar.mjs';
import { fazz } from './brands/fazz.mjs';
import { efishery } from './brands/efishery.mjs';
import { builds } from './brands/builds.mjs';
import { klika2c } from './brands/nikel.mjs';
import { gpp } from './brands/gpp.mjs';

export const covers = [...warungPintar, ...fazz, ...efishery, ...builds, klika2c, gpp];
