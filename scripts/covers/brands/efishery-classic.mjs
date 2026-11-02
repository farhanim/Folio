// eFishery covers kept in their original art direction. Only two kinds of change
// since: tiny labels removed or enlarged, and facts corrected against the case study.
const DEEP = '#0E2F24';
const GREEN = '#1F8A66';
const MINT = '#4FC7A0';
const PALE = '#BFE3D4';
const LEMON = '#FFE36E';

/* ── FAQ as level 0: the complaint rise and the help centre that answers first ── */
// Only the two reported points (Feb 31, Sep 671) are plotted; the curve between is a shape, not data.
const efisheryFaq = {
	slug: 'efishery-faq',
	dir: 'efishery-faq',
	fonts: ['Young+Serif', 'Inter+Tight:wght@400;500;600;700'],
	css: `
		.stage{background:radial-gradient(90% 90% at 70% 30%,#16503d 0%,${DEEP} 55%,#081e17 100%)}
		h1{font:400 80px/.98 'Young Serif';letter-spacing:-.03em;color:#fff}
		h1 em{font-style:normal;color:${LEMON}}
		.help{left:1040px;top:300px;width:460px;border-radius:26px;background:#fff;box-shadow:0 50px 90px -30px rgba(0,0,0,.7);overflow:hidden;font-family:'Inter Tight'}
		.q{display:flex;justify-content:space-between;align-items:center;padding:18px 24px;border-top:1px solid #eef2f0;font:600 19px 'Inter Tight';color:#1d2b25}
		.q i{font-style:normal;color:${GREEN};font-size:22px}`,
	html: `<div class="stage grain">
		<h1 class="abs txt" style="left:82px;top:140px;width:760px">Answer the farmer<br><em>before</em> the ticket.</h1>
		<svg class="abs art" style="left:88px;top:430px" width="880" height="420" viewBox="0 0 880 420" fill="none">
			<defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${MINT}" stop-opacity=".45"/><stop offset="1" stop-color="${MINT}" stop-opacity="0"/></linearGradient></defs>
			<path d="M20 380 C 300 370, 560 300, 840 40 L840 420 L20 420Z" fill="url(#g)"/>
			<path d="M20 380 C 300 370, 560 300, 840 40" stroke="${MINT}" stroke-width="7" stroke-linecap="round"/>
			<circle cx="20" cy="380" r="12" fill="${DEEP}" stroke="${MINT}" stroke-width="6"/>
			<circle cx="840" cy="40" r="12" fill="${DEEP}" stroke="${MINT}" stroke-width="6"/>
		</svg>
		<div class="abs" style="left:96px;top:700px;font:400 72px 'Young Serif';color:${PALE}">31</div>
		<div class="abs" style="left:700px;top:380px;font:400 84px 'Young Serif';color:${LEMON}">671</div>
		<div class="abs txt" style="left:300px;top:870px;font:600 40px 'Inter Tight';letter-spacing:-.02em;color:${PALE}">complaints a month, Feb → Sep</div>
		<div class="abs help art">
			<div style="padding:26px 24px 20px;background:${GREEN};color:#fff">
				<div style="font:700 28px/1.15 'Inter Tight'">Ada yang bisa kami bantu?</div>
				<div style="margin-top:14px;height:48px;border-radius:12px;background:#fff;color:#7d8b85;font:500 17px/48px 'Inter Tight';padding:0 16px">cancel order</div>
			</div>
			${['Cara membatalkan pesanan', 'Pakan belum sampai', 'Ganti nomor HP', 'Aplikasi eFisheryku error'].map((q) => `<div class="q">${q}<i>+</i></div>`).join('')}
		</div>
	</div>`
};

/* ── Enterprise payment: a reconciliation receipt ── */
const zig = `url("data:image/svg+xml,${encodeURIComponent("<svg xmlns='http://www.w3.org/2000/svg' width='24' height='12'><path d='M0 0 L12 12 L24 0Z' fill='%23FBF8EF'/></svg>").replace('%2523', '%23')}")`;
const enterprise = {
	slug: 'enterprise-payment',
	dir: 'enterprise-payment',
	fonts: ['Big+Shoulders+Display:wght@600;800;900', 'IBM+Plex+Mono:wght@400;500;600;700'],
	css: `
		.stage{background:${GREEN}}
		.stripe{inset:0;background:repeating-linear-gradient(90deg,rgba(255,255,255,.05) 0 2px,transparent 2px 80px)}
		.n{font:900 300px/.78 'Big Shoulders Display';letter-spacing:-.02em;color:#fff}
		.n s{color:rgba(255,255,255,.4);text-decoration-thickness:12px;text-decoration-color:${LEMON}}
		.receipt{left:1010px;top:150px;width:480px;padding:40px 38px 46px;background:#FBF8EF;font:500 19px/1.6 'IBM Plex Mono';color:#2a2a2a;transform:rotate(5deg);box-shadow:0 60px 80px -30px rgba(0,30,20,.6)}
		.receipt::after{content:'';position:absolute;left:0;right:0;bottom:-12px;height:12px;background:${zig} repeat-x;background-size:24px 12px}
		.receipt .r{display:flex;justify-content:space-between}
		.receipt hr{border:0;border-top:2px dashed #c9c3b3;margin:16px 0}
		.stamp{position:absolute;right:26px;bottom:20px;padding:10px 18px;border:5px solid #c2412d;border-radius:12px;color:#c2412d;font:900 64px/1 'Big Shoulders Display';transform:rotate(-14deg);opacity:.9}`,
	html: `<div class="stage grain">
		<div class="abs stripe"></div>
		<div class="abs txt" style="left:88px;top:165px;font:800 64px/1 'Big Shoulders Display';letter-spacing:.01em;color:${LEMON};text-transform:uppercase">Lead time to reconcile</div>
		<div class="abs n txt" style="left:80px;top:275px"><s>203h</s></div>
		<div class="abs n txt" style="left:80px;top:535px">18.91h</div>
		<div class="abs txt" style="left:88px;top:815px;font:800 64px/1 'Big Shoulders Display';color:#fff;text-transform:uppercase">−90% <span style="color:${LEMON}">vs a −50% target</span></div>
		<div class="abs receipt art">
			<div style="text-align:center;font:800 36px 'Big Shoulders Display';letter-spacing:.06em">EFISHERY · FINANCE</div>
			<hr>
			<div class="r"><span>Invoice</span><span>MATCH</span></div>
			<div class="r"><span>Virtual account</span><span>MATCH</span></div>
			<div class="r"><span>Receipt</span><span>AUTO</span></div>
			<hr>
			<div class="r"><span>Before</span><span>203 h</span></div>
			<div class="r"><span>After</span><span>18.9 h</span></div>
			<div class="r"><span>Manual steps</span><span>7 → 3</span></div>
			<hr>
			<div class="r" style="font:900 52px/1 'Big Shoulders Display'"><span>TOTAL</span><span>−90%</span></div>
			<div style="margin-top:22px;height:56px;background:repeating-linear-gradient(90deg,#2a2a2a 0 3px,transparent 3px 6px,#2a2a2a 6px 7px,transparent 7px 11px,#2a2a2a 11px 15px,transparent 15px 17px)"></div>
			<div class="stamp">PAID</div>
		</div>
	</div>`
};

/* ── CRM AR/AP survey: a form, filled in ── */
const crmArap = {
	slug: 'crm-arap-survey',
	dir: 'crm-arap',
	fonts: ['Space+Grotesk:wght@400;500;600;700'],
	css: `
		.stage{background:${PALE}}
		.blob{left:820px;top:-200px;width:1000px;height:1000px;border-radius:50%;background:${MINT};opacity:.55}
		h1{font:700 104px/.9 'Space Grotesk';letter-spacing:-.055em;color:${DEEP}}
		.f{position:absolute;border-radius:24px;background:#fff;box-shadow:0 30px 60px -28px rgba(14,47,36,.45);padding:28px 30px;font-family:'Space Grotesk';color:${DEEP}}
		.f .q{font:600 28px/1.2 'Space Grotesk'}
		.nps{display:grid;grid-template-columns:repeat(10,1fr);gap:8px;margin-top:20px}
		.nps span{height:52px;border-radius:12px;display:grid;place-items:center;font:600 20px 'Space Grotesk';background:#EEF4F1;color:#4d6a5e}
		.opt{display:flex;align-items:center;gap:14px;margin-top:16px;font:500 26px 'Space Grotesk'}
		.opt i{width:28px;height:28px;border-radius:50%;border:3px solid #b9cbc3}
		.opt.on i{border-color:${GREEN};box-shadow:inset 0 0 0 6px #fff;background:${GREEN}}`,
	html: `<div class="stage grain soft">
		<div class="abs blob"></div>
		<h1 class="abs txt" style="left:82px;top:150px">Rate the<br>tool that<br>settles<br><span style="color:${GREEN}">farmer debt.</span></h1>
		<div class="abs txt" style="left:88px;top:750px;font:600 46px 'Space Grotesk';letter-spacing:-.03em;color:#2c5546">22 sales &amp; FBDC staff</div>
		<div class="f art" style="left:780px;top:170px;width:660px;transform:rotate(-2deg)">
			<div class="q">How easy is AR/AP settlement?</div>
			<div class="nps">${Array.from({ length: 10 }, (_, i) => `<span style="${i === 7 ? `background:${DEEP};color:${LEMON};transform:translateY(-6px) scale(1.12);box-shadow:0 12px 20px -8px rgba(0,0,0,.4)` : ''}">${i + 1}</span>`).join('')}</div>
		</div>
		<div class="f art" style="left:840px;top:450px;width:380px;transform:rotate(3deg)">
			<div class="q">Overall</div>
			<div class="opt on"><i></i>Baik</div>
			<div class="opt"><i></i>Cukup</div>
			<div class="opt"><i></i>Kurang</div>
		</div>
		<div class="f art" style="left:1180px;top:420px;width:300px;height:330px;display:grid;place-items:center;transform:rotate(-4deg)">
			<div style="width:210px;height:210px;border-radius:50%;background:conic-gradient(${GREEN} 0 92.9%,#e3ece8 0);display:grid;place-items:center"><div style="width:160px;height:160px;border-radius:50%;background:#fff;display:grid;place-items:center;font:700 48px/1 'Space Grotesk'">92.9%</div></div>
		</div>
		<div class="abs art" style="left:1000px;top:770px;padding:20px 30px;border-radius:22px;background:${DEEP};color:#fff;font:700 46px 'Space Grotesk';letter-spacing:-.03em;transform:rotate(-2deg)">8<span style="color:#8fb0a3">/10</span> <span style="font-weight:500;font-size:34px;color:${PALE};letter-spacing:0">from half</span></div>
	</div>`
};

export { efisheryFaq, enterprise, crmArap };
