// Nikel and the shipped builds. Each keeps its own palette and art direction:
// - builds-classic: the original covers (Nikel, Kee, Blast Hub, ICON+, PIMS)
// - builds-studio: product scenes (Jardin, Devfartha IELTS)
// - builds-stories: covers that draw what the product does (SparQ, Pendar Cahaya,
//   Derkei, Data Room, SILMA)
// Code covers keep the bottom-left clear for the "Live preview" chip.
import { blast, iconplus, kee, nikel, pims } from './builds-classic.mjs';
import { ielts, jardin } from './builds-studio.mjs';
import { derkei, muskitnas, silma } from './builds-stories.mjs';
import { dataroom } from './builds-elegant.mjs';
import { sparq } from './builds-sparq-bento.mjs';
import { ccm, repoMuskitnas, royalMitraPersada } from './builds-archive.mjs';
import {
	cycoffee,
	artemis,
	navy,
	parsingTools,
	remoteTask,
	siteSurvey,
	svreport
} from './builds-ops.mjs';

export const builds = [
	nikel,
	kee,
	muskitnas,
	jardin,
	derkei,
	sparq,
	blast,
	iconplus,
	ielts,
	pims,
	dataroom,
	silma,
	ccm,
	repoMuskitnas,
	royalMitraPersada,
	cycoffee,
	artemis,
	navy,
	parsingTools,
	remoteTask,
	siteSurvey,
	svreport
];
