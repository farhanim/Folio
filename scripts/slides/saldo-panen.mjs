// Saldo Panen (eFishery, Mar 2024): the four case-study slides, content from the deck.
import { frame, slideCss } from './kit.mjs';

const t = {
	font: 'Figtree',
	bg: '#F3F8F5',
	ink: '#0E2F24',
	body: '#2B4238',
	muted: '#4A6359',
	accent: '#1F8A66',
	shadow: 'rgba(14,47,36,.28)',
	logo: 'images/clients/efishery.webp',
	project: 'eFishery · Saldo Panen'
};
const GREEN = '#1F8A66';
const MINT = '#D7EEE4';
const LEMON = '#FFE36E';
const BLUE = '#3A6FD8';
const RED = '#D9483B';
const base = {
	slug: 'saldo-panen',
	dir: 'saldo-panen',
	fonts: ['Figtree:wght@500;600;700;800;900']
};
const css = slideCss(t);
const TOTAL = 4;

/* ── 01 Context: what Saldo Panen is, the aims, who we tested with ── */
const node = (icon, label, bg, fg = '#fff') => `
	<div style="text-align:center;width:150px">
		<div style="width:96px;height:96px;margin:0 auto;border-radius:28px;background:${bg};color:${fg};display:grid;place-items:center;font:800 40px Figtree">${icon}</div>
		<div style="margin-top:12px;font:800 22px Figtree;color:${t.ink}">${label}</div>
	</div>`;
const arrow = `<div style="flex:1;height:4px;margin-bottom:38px;border-radius:4px;background:repeating-linear-gradient(90deg,${GREEN} 0 12px,transparent 12px 20px)"></div>`;
const group = (n, color, name, desc) => `
	<div style="display:flex;gap:22px;align-items:flex-start">
		<div style="font:900 104px/.85 Figtree;letter-spacing:-.04em;color:${color}">${n}</div>
		<div>
			<div style="font:800 27px Figtree;color:${color}">${name}</div>
			<div class="body" style="font-size:21px;margin-top:6px">${desc}</div>
			<div style="display:flex;gap:8px;margin-top:16px">${`<i style="width:20px;height:20px;border-radius:50%;background:${color}"></i>`.repeat(n)}</div>
		</div>
	</div>`;
const context = {
	...base,
	name: 'context',
	css,
	html: frame(t, {
		n: 1,
		total: TOTAL,
		title: 'Context and who we tested with',
		lede: 'A balance for surplus AR/AP settlement, launched for fish farmers first.',
		content: `
		<div class="card" style="left:72px;top:290px;width:860px;height:350px">
			<div class="eyebrow">What is Saldo Panen?</div>
			<div class="body" style="margin-top:14px">Farmers receive the surplus from harvest settlement into a balance, track it and withdraw it to their bank. Withdrawals are farmer-triggered, which also shows floating money and prevents settlement fraud.</div>
			<div style="display:flex;align-items:flex-end;gap:16px;margin-top:26px">
				${node('🐟', 'Tarik Ikan', MINT, GREEN)}${arrow}${node('Rp', 'Saldo Panen', GREEN)}${arrow}${node('🏦', 'Bank', LEMON, t.ink)}
			</div>
		</div>
		<div class="card" style="left:962px;top:290px;width:566px;height:350px">
			<div class="eyebrow">Research aims</div>
			<div style="display:grid;gap:13px;margin-top:18px">
				${['Current harvest settlement behaviour', 'What drives willingness to adopt', 'What drives resistance', 'Acceptance of the MVP', 'What blocks using the MVP']
					.map((a, i) => `<div class="row" style="gap:16px"><span class="num" style="width:36px;height:36px;font-size:18px">${i + 1}</span><span class="body" style="font-size:22px">${a}</span></div>`)
					.join('')}
			</div>
		</div>
		<div class="card" style="left:72px;top:670px;width:1456px;height:270px">
			<div class="eyebrow">Participants · 7 farmers, split by tech savviness and AR/AP history</div>
			<div style="display:grid;grid-template-columns:1.15fr 1fr 1fr;gap:40px;margin-top:22px">
				${group(5, GREEN, 'Whitelist · tech-savvy', 'Surplus in their own account, no AR/AP holds, use eFisheryKu for Tarik Ikan.')}
				${group(1, BLUE, 'Whitelist · non-tech-savvy', 'No AR/AP problems, but don’t use the app for Tarik Ikan.')}
				${group(1, RED, 'Blacklisted', 'Had AR/AP problems; payment went through another holder’s account.')}
			</div>
		</div>`
	})
};

/* ── 02 Archetypes: half-hearted acceptance ── */
const archetype = (name, color, traits, x) => `
	<div class="card" style="left:${x}px;top:470px;width:465px;height:290px;border-top:8px solid ${color}">
		<div style="font:800 28px Figtree;color:${color}">${name}</div>
		<ul class="ticks" style="--dot:${color}">${traits.map((tr) => `<li>${tr}</li>`).join('')}</ul>
	</div>`;
const pin = (pct, color, label) => `
	<div class="abs" style="left:${pct}%;top:-58px;transform:translateX(-50%);text-align:center">
		<div style="padding:8px 14px;border-radius:12px;background:${color};color:#fff;font:800 19px Figtree;white-space:nowrap">${label}</div>
		<div style="width:4px;height:40px;margin:0 auto;background:${color}"></div>
		<div style="width:22px;height:22px;margin:-4px auto 0;border-radius:50%;background:#fff;border:6px solid ${color}"></div>
	</div>`;
const model = (title, text, x) => `
	<div class="card" style="left:${x}px;top:790px;width:465px;height:150px;background:${MINT};box-shadow:none">
		<div class="eyebrow">${title}</div>
		<div class="body" style="font-size:22px;margin-top:8px">${text}</div>
	</div>`;
const archetypes = {
	...base,
	name: 'archetypes',
	css,
	html: frame(t, {
		n: 2,
		total: TOTAL,
		title: 'Half-hearted acceptance',
		lede: 'Most accepted with help from the field team (FBDO), but stayed skeptical.',
		content: `
		<div class="abs" style="left:72px;right:72px;top:370px">
			<div style="position:relative;height:18px;border-radius:18px;background:linear-gradient(90deg,${RED},${LEMON} 50%,${GREEN})">
				${pin(14, RED, 'Non-tech-savvy dependent')}${pin(55, BLUE, 'Tech-savvy dependent')}${pin(86, GREEN, 'Tech-savvy independent')}
			</div>
			<div class="row" style="justify-content:space-between;margin-top:12px;font:800 22px Figtree;color:${t.muted}"><span>Resist</span><span>Accept</span></div>
		</div>
		${archetype('Tech-savvy independent', GREEN, ['Highly skilled with technology', 'Relies little on FBDO', 'Trusts banking &amp; fintech', 'Fine with the admin fee'], 72)}
		${archetype('Tech-savvy dependent', BLUE, ['Relies heavily on FBDO', 'Knows the app, doesn’t fully use it', 'Unsure about own decisions', 'Calculative about the fee'], 567)}
		${archetype('Non-tech-savvy dependent', RED, ['Lacks tech proficiency', 'Delegates tasks to FBDO', 'Doesn’t use banking apps', 'Objected to Saldo Panen'], 1063)}
		${model('Motivation', 'Keeping the FBDO relationship matters more than the app', 72)}
		${model('Ability', 'Use the app only for core tasks, for fear of mistakes', 567)}
		${model('Opportunity', 'Rarely see promos, so the app’s advantage stays invisible', 1063)}`
	})
};

/* ── 03 Concept test: four prototype screens with heatmaps ── */
const sb = `<div class="sb" style="height:50px;font-size:14px"><span>9:41</span><span>●●● ▮</span></div>`;
const row = (l, r, bold) =>
	`<div class="row" style="justify-content:space-between;padding:14px 0;border-bottom:2px solid #EEF3F0;font:${bold ? 800 : 600} 18px Figtree;color:#1d2b25"><span>${l}</span><span>${r}</span></div>`;
const btn = (label, outline) =>
	`<div style="margin-top:16px;padding:16px;border-radius:14px;text-align:center;font:800 19px Figtree;${outline ? `border:2px solid ${GREEN};color:${GREEN}` : `background:${GREEN};color:#fff`}">${label}</div>`;
const screens = [
	`${sb}<div style="padding:4px 20px">
		<div style="font:800 24px Figtree;color:#1d2b25">Selamat Pagi ✨</div>
		<div style="margin-top:14px;padding:18px;border-radius:18px;background:${GREEN};color:#fff"><div style="font:600 15px Figtree">Saldo Kabayan</div><div style="font:900 26px Figtree">Rp2.000.000.000</div></div>
		<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-top:18px">${['Tagihan', 'Riwayat', 'Beli Pakan', 'eFeeder', 'Lapak Ikan', 'PromoKu'].map((l) => `<div style="text-align:center;font:700 14px Figtree;color:#1d2b25"><div style="height:64px;border-radius:18px;background:${MINT};margin-bottom:6px"></div>${l}</div>`).join('')}</div>
		<div style="margin-top:18px;padding:16px;border-radius:16px;background:${LEMON};font:700 16px Figtree;color:#3b3200">Bagikan Kode Referral, dapat bonus spesial</div></div>`,
	`${sb}<div style="padding:4px 20px">
		<div style="font:800 24px Figtree;color:#1d2b25">Akun</div>
		<div class="row" style="gap:14px;margin-top:14px"><div style="width:58px;height:58px;border-radius:50%;background:${MINT}"></div><div><div style="font:800 19px Figtree">Kabayan Kilat</div><div style="font:600 15px Figtree;color:#6b7c75">📍 Jawa Barat</div></div></div>
		<div style="margin-top:18px;padding:18px;border-radius:18px;border:2px solid ${MINT}"><div style="font:600 15px Figtree;color:#6b7c75">Saldo Panen</div><div style="font:900 26px Figtree;color:#1d2b25">Rp3.000.000</div>${btn('Tarik Saldo')}</div>
		${row('Nomor Rekening', 'BCA · 9000•••')}${row('Nomor HP', '0896 ••••')}</div>`,
	`${sb}<div style="padding:4px 20px">
		<div style="font:800 24px Figtree;color:#1d2b25">← Saldo Panen</div>
		<div style="margin-top:14px;padding:18px;border-radius:18px;background:${GREEN};color:#fff"><div style="font:600 15px Figtree">Saldo Anda</div><div style="font:900 30px Figtree">Rp200.000</div></div>
		${btn('Tarik Saldo', true)}
		<div style="margin-top:20px;font:800 18px Figtree;color:#1d2b25">Daftar Transaksi</div>
		${row('Tarik Saldo · 7 Feb', '−Rp200.000')}${row('Top Up Saldo · 7 Feb', 'Rp200.000')}</div>`,
	`${sb}<div style="padding:4px 20px">
		<div style="font:800 22px Figtree;color:#1d2b25">← Konfirmasi Tarik Saldo</div>
		<div style="margin:16px 0 6px;font:900 34px Figtree;color:#1d2b25">Rp300.000</div>
		<div style="font:600 15px Figtree;color:#6b7c75">ke BCA · 9000•••</div>
		<div style="margin-top:14px">${row('Jumlah', 'Rp300.000')}${row('Biaya Transfer', '−Rp1.500')}${row('Total', 'Rp301.500', true)}</div>
		${btn('Tarik Saldo')}</div>`
];
const heat = (x, y, r) =>
	`<div class="abs" style="left:${x - r}px;top:${y - r}px;width:${r * 2}px;height:${r * 2}px;border-radius:50%;background:radial-gradient(circle,rgba(255,50,30,.8) 0%,rgba(255,200,0,.55) 35%,rgba(80,220,120,.28) 60%,transparent 72%);mix-blend-mode:multiply"></div>`;
const heats = [
	[heat(260, 430, 70), heat(110, 140, 60)],
	[heat(190, 300, 80)],
	[heat(190, 500, 85)],
	[heat(260, 340, 70)]
];
const tasks = [
	['Find Saldo Panen', '6.7 / 10', '4 misclicked, 2 gave up; expected it on Home or in Lapak Ikan'],
	['Onboard &amp; activate', '5 of 7', 'didn’t understand it; 70% skipped the information'],
	['Withdraw balance', '5 misclicks', 'the history list was mistaken for the button'],
	['Admin fee', 'Rp1.500', 'noticed by every farmer; wanted more bank accounts']
];
const testing = {
	...base,
	name: 'testing',
	css: `${css}
		.mini{position:absolute;top:286px;width:380px;height:800px;transform:scale(.56);transform-origin:0 0}`,
	html: frame(t, {
		n: 3,
		total: TOTAL,
		title: 'Concept test results',
		lede: 'Four tasks on the prototype; heatmaps show where farmers looked and tapped.',
		content: screens
			.map((s, i) => {
				const x = 72 + i * 372;
				return `
			<div class="mini" style="left:${x + 64}px"><div class="phone" style="position:relative;left:0;top:0">${'<div class="scr">' + s + '</div>'}</div>${heats[i].join('')}</div>
			<div class="abs" style="left:${x}px;top:752px;width:340px">
				<div class="row" style="gap:12px"><span class="num" style="width:34px;height:34px;font-size:17px">${i + 1}</span><span style="font:800 24px Figtree;color:${t.ink}">${tasks[i][0]}</span></div>
				<div style="margin-top:8px;font:900 44px/1 Figtree;letter-spacing:-.03em;color:${GREEN}">${tasks[i][1]}</div>
				<div class="body" style="font-size:19px;line-height:1.35;margin-top:6px">${tasks[i][2]}</div>
			</div>`;
			})
			.join('')
	})
};

/* ── 04 Strategy: per archetype, principles and the verdict ── */
const plan = (name, color, items, x, tag) => `
	<div class="card" style="left:${x}px;top:290px;width:465px;height:330px;${tag ? `box-shadow:0 0 0 4px ${color},0 24px 44px -28px ${t.shadow}` : ''}">
		<div class="row" style="justify-content:space-between"><span style="font:800 26px Figtree;color:${color}">${name}</span>${tag ? `<span style="padding:6px 12px;border-radius:99px;background:${color};color:#fff;font:800 16px Figtree">${tag}</span>` : ''}</div>
		<ul class="ticks" style="--dot:${color}">${items.map((i) => `<li>${i}</li>`).join('')}</ul>
	</div>`;
const strategy = {
	...base,
	name: 'strategy',
	css,
	html: frame(t, {
		n: 4,
		total: TOTAL,
		title: 'Adoption strategy &amp; next steps',
		lede: 'Pilot with tech-savvy independent farmers; make the app act like the field team.',
		content: `
		${plan('Tech-savvy independent', GREEN, ['Tutorials on concept &amp; benefit', 'Ongoing CS + FBDO support', 'Familiar m-banking patterns'], 72, 'Pilot')}
		${plan('Tech-savvy dependent', BLUE, ['FBDO socialisation before roll-out', 'Step-by-step in-app guidance', 'Payout in hours, not 3–4 days', 'Free first transfer'], 567)}
		${plan('Non-tech-savvy dependent', RED, ['Visual aids on where money comes from', 'Financial literacy sessions', 'Mentoring events', 'A much longer transition'], 1063)}
		<div class="card" style="left:72px;top:650px;width:920px;height:290px">
			<div class="eyebrow">Design principles</div>
			<div style="display:grid;grid-template-columns:1fr 1fr;gap:18px 30px;margin-top:20px">
				${['Put Saldo Panen on Home, not under Akun', 'Link every balance to its Tarik Ikan record', 'Confirmations and success / failure notices', 'Step-by-step, the way FBDO explains it']
					.map((p, i) => `<div class="row" style="gap:14px;align-items:flex-start"><span class="num">${i + 1}</span><span class="body" style="font-size:22px">${p}</span></div>`)
					.join('')}
			</div>
		</div>
		<div class="card" style="left:1022px;top:650px;width:506px;height:290px;background:${t.ink}">
			<div class="eyebrow" style="color:${LEMON}">Verdict</div>
			<div style="margin-top:14px;font:800 32px/1.15 Figtree;letter-spacing:-.02em;color:#fff">Interest didn’t become intent.</div>
			<div style="margin-top:12px;font:500 21px/1.4 Figtree;color:#CFE4DA">Run a closely monitored pilot, gather feedback, iterate and assess risk before full launch.</div>
		</div>`
	})
};

export const saldoPanen = [context, archetypes, testing, strategy];
