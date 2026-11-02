// Nikel · KlikA2C lending platform: the story in one line, and an illustration of
// the moments that build trust: a loan worth funding, a balance, an OTP to approve.
export const klika2c = {
	slug: 'klika2c-platform',
	dir: 'klika2c-platform',
	fonts: ['Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700;12..96,800', 'Geist:wght@500;600;700'],
	css: `
		.stage{background:#EEF1FB}
		.blob{border-radius:50%;filter:blur(70px)}
		h1{font:800 104px/.94 'Bricolage Grotesque';letter-spacing:-.045em;color:#0D1B4C}
		h1 mark{background:linear-gradient(transparent 62%,#FFCB2E 62%,#FFCB2E 92%,transparent 92%);color:inherit;padding:0 4px}
		.sub{margin-top:30px;font:500 38px/1.25 'Geist';letter-spacing:-.02em;color:#3A4770;text-wrap:balance}
		.ui{position:absolute;background:#fff;border-radius:30px;box-shadow:0 1px 0 rgba(255,255,255,.8) inset,0 40px 80px -30px rgba(13,27,76,.35),0 0 0 1px rgba(13,27,76,.06);font-family:'Geist'}
		.cap{font:600 24px 'Geist';color:#5B6474}
		.fig{font:700 52px/1 'Geist';letter-spacing:-.03em;color:#274B9C}
		.grade{display:inline-flex;align-items:center;gap:10px;padding:8px 16px 8px 8px;border-radius:0 14px 0 14px;background:#E3F4EA;font:600 24px 'Geist';color:#1F7A45}
		.grade b{display:grid;place-items:center;width:36px;height:36px;border-radius:8px;background:#2E8B57;color:#fff;font:800 22px 'Geist'}
		.otp{display:flex;gap:10px;margin-top:18px}
		.otp i{flex:1;height:64px;border-radius:12px;background:#F1F4FB;box-shadow:0 0 0 2px #D5DDF0 inset;display:grid;place-items:center;font:700 32px 'Geist';font-style:normal;color:#0D1B4C}
		.otp i.on{box-shadow:0 0 0 3px #274B9C inset}
		.tile{position:absolute;top:56px;width:112px;height:112px;border-radius:34px;background:#fff;display:grid;place-items:center;box-shadow:0 1px 0 #fff inset,0 26px 44px -20px rgba(13,27,76,.45),0 0 0 1px rgba(13,27,76,.06)}
		.tile svg{width:84px;height:84px;overflow:visible}
		.who{position:absolute;top:184px;width:200px;text-align:center;font:700 24px 'Geist';color:#0D1B4C}
		.step{position:absolute;display:flex;align-items:center;gap:8px;padding:7px 14px 7px 8px;border-radius:99px;background:#fff;box-shadow:0 12px 24px -14px rgba(13,27,76,.45),0 0 0 1px rgba(13,27,76,.06);font:700 20px 'Geist';color:#0D1B4C;white-space:nowrap}
		.step b{display:grid;place-items:center;width:26px;height:26px;border-radius:50%;background:#274B9C;color:#fff;font:800 14px 'Geist'}
		.tag{position:absolute;padding:2px 14px;background:#E8EEF9;border-radius:99px;font:600 21px 'Geist';color:#4A5578;white-space:nowrap}
		.btn{margin-top:20px;height:64px;border-radius:14px;background:#274B9C;color:#fff;display:grid;place-items:center;font:700 28px 'Geist'}`,
	html: `<div class="stage grain">
		<div class="abs blob" style="left:820px;top:80px;width:760px;height:620px;background:#B9C8F5"></div>
		<div class="abs blob" style="left:1000px;top:560px;width:520px;height:420px;background:#FFE08A;opacity:.8"></div>
		<div class="abs blob" style="left:-160px;top:620px;width:620px;height:520px;background:#CFE9F6"></div>

		<div class="abs txt" style="left:96px;top:118px;width:650px">
			<h1>Designing<br>digital lending,<br><mark>end to end.</mark></h1>
			<div class="sub">From a borrower’s first application to a lender’s last repayment.</div>
		</div>

		<!-- Loan flow: apply and approve across the top, funds return to the borrower underneath -->
		<div class="abs art" style="left:96px;top:580px;width:624px;height:320px">
			<svg class="abs" style="left:0;top:0" width="624" height="320" viewBox="0 0 624 320" fill="none">
				<defs><marker id="ah" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10Z" fill="#274B9C"/></marker></defs>
				<path d="M116 110C164 40 210 40 252 110" stroke="#274B9C" stroke-width="4" marker-end="url(#ah)"/>
				<path d="M372 110C420 40 466 40 508 110" stroke="#274B9C" stroke-width="4" marker-end="url(#ah)"/>
				<path d="M568 244C520 316 104 316 56 248" stroke="#9AA6C8" stroke-width="3" stroke-dasharray="9 9" marker-end="url(#ah)"/>
			</svg>
			<div class="tile" style="left:0"><svg viewBox="0 0 64 64">
	<rect x="33" y="9" width="22" height="28" rx="4" fill="#C8F1F1" transform="rotate(14 44 23)"/>
	<path d="M40 17h9M39.5 21.5h9M39 26h6" stroke="#7FD3D3" stroke-width="2" stroke-linecap="round" transform="rotate(14 44 23)"/>
	<rect x="12" y="6" width="28" height="50" rx="7" fill="#0A8E8D"/>
	<rect x="15" y="11" width="22" height="39" rx="4" fill="#ECFBFB"/>
	<circle cx="26" cy="19.5" r="4.5" fill="#25D0CF"/>
	<rect x="19" y="27.5" width="14" height="3" rx="1.5" fill="#A6E3E3"/>
	<rect x="19" y="33" width="10" height="3" rx="1.5" fill="#A6E3E3"/>
	<rect x="19" y="40" width="14" height="6" rx="3" fill="#0A8E8D"/>
	<circle cx="46" cy="46" r="10" fill="#FFCB2E" stroke="#fff" stroke-width="2.5"/>
	<text x="46" y="49.6" text-anchor="middle" font-family="Geist" font-weight="800" font-size="9.5" fill="#6B4A00">Rp</text>
</svg></div>
			<div class="tile" style="left:256px"><svg viewBox="0 0 64 64">
	<rect x="5" y="9" width="46" height="33" rx="5" fill="#1F7A45"/>
	<rect x="8.5" y="12.5" width="39" height="26" rx="3" fill="#EEF8F2"/>
	<circle cx="15" cy="19" r="2.6" fill="#4CC07F"/><rect x="20" y="17.5" width="20" height="3" rx="1.5" fill="#B9E2C9"/>
	<circle cx="15" cy="25.5" r="2.6" fill="#4CC07F"/><rect x="20" y="24" width="16" height="3" rx="1.5" fill="#B9E2C9"/>
	<circle cx="15" cy="32" r="2.6" fill="#F2B233"/><rect x="20" y="30.5" width="12" height="3" rx="1.5" fill="#B9E2C9"/>
	<rect x="24" y="42" width="8" height="6" fill="#17603A"/><rect x="17" y="47" width="22" height="4" rx="2" fill="#17603A"/>
	<path d="M48 31l9 3.6v6.2c0 5.6-3.8 9.8-9 11.7-5.2-1.9-9-6.1-9-11.7v-6.2z" fill="#4CC07F" stroke="#fff" stroke-width="2.5" stroke-linejoin="round"/>
	<path d="M44.2 41.6l2.7 2.7 5-5.2" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>
</svg></div>
			<div class="tile" style="left:512px"><svg viewBox="0 0 64 64">
	<ellipse cx="46" cy="22" rx="11" ry="4" fill="#FFCB2E" stroke="#E09B00" stroke-width="1.6"/>
	<path d="M35 22v5c0 2.2 4.9 4 11 4s11-1.8 11-4v-5" fill="#FFD95C" stroke="#E09B00" stroke-width="1.6"/>
	<path d="M35 27v5c0 2.2 4.9 4 11 4s11-1.8 11-4v-5" fill="#FFCB2E" stroke="#E09B00" stroke-width="1.6"/>
	<path d="M38 10l6-5 4 3 6-5" fill="none" stroke="#2E8B57" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
	<path d="M51 3h3v3" fill="none" stroke="#2E8B57" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
	<path d="M8 24a5 5 0 0 1 5-5h22l3 5z" fill="#F5C04A"/>
	<rect x="6" y="23" width="40" height="30" rx="6" fill="#E09B00"/>
	<rect x="6" y="23" width="40" height="7" rx="3.5" fill="#F0B020"/>
	<rect x="32" y="33" width="16" height="11" rx="5.5" fill="#FFD95C" stroke="#fff" stroke-width="2"/>
	<circle cx="38.5" cy="38.5" r="2.2" fill="#B57A00"/>
</svg></div>
			<div class="who" style="left:-44px">Borrower</div>
			<div class="who" style="left:212px">Back Office</div>
			<div class="who" style="left:468px">Lender</div>
			<div class="step" style="left:128px;top:20px"><b>1</b>Apply</div>
			<div class="step" style="left:374px;top:20px"><b>2</b>Approve</div>
			<div class="tag" style="left:216px;top:281px">Funds disbursed</div>
		</div>

		<div class="ui art" style="left:830px;top:120px;width:640px;padding:36px 40px 38px">
			<div style="display:flex;justify-content:space-between;align-items:flex-start">
				<div><div class="cap">Car Dealer · Traveloka</div><div style="margin-top:8px;font:700 34px 'Geist';letter-spacing:-.02em;color:#0D1B4C">17% p.a. · 12 months</div></div>
				<span class="grade"><b>A</b>Very low risk</span>
			</div>
			<div style="display:flex;justify-content:space-between;align-items:baseline;margin-top:34px"><span class="cap">Remaining</span><span class="fig">IDR 30.000.000</span></div>
			<div style="height:16px;border-radius:8px;background:#EEF0F7;margin-top:22px"><div style="width:76%;height:100%;border-radius:8px;background:#0BC6C5"></div></div>
			<div style="display:flex;justify-content:space-between;margin-top:14px" class="cap"><span>Funded 76%</span><span>7 days left</span></div>
		</div>

		<div class="ui art" style="left:760px;top:540px;width:440px;padding:32px 36px;background:#274B9C;color:#fff">
			<div style="font:600 24px 'Geist';color:#C9D5F5">Balance</div>
			<div style="margin-top:10px;font:700 46px/1 'Geist';letter-spacing:-.03em;white-space:nowrap">IDR 200.000.000</div>
			<div style="display:flex;gap:12px;margin-top:26px">
				<span style="flex:1;height:58px;border-radius:12px;background:#fff;color:#274B9C;display:grid;place-items:center;font:700 26px 'Geist'">+ Top Up</span>
				<span style="flex:1;height:58px;border-radius:12px;box-shadow:0 0 0 2px rgba(255,255,255,.6) inset;display:grid;place-items:center;font:700 26px 'Geist'">Withdraw</span>
			</div>
		</div>

		<div class="ui art" style="left:1230px;top:470px;width:320px;padding:30px 30px 30px">
			<div class="cap" style="color:#0D1B4C;font-weight:700">Enter OTP</div>
			<div class="otp"><i>4</i><i>8</i><i>2</i><i class="on">1</i></div>
			<div class="btn">Approve</div>
		</div>
	</div>`
};
