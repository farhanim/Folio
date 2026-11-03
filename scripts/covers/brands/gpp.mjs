// IPL Graha Pesona Pakansari: a housing community's dues app. Deep teal from the
// app's own palette, the title on the left, three phones fanned out on the right.
import { phone, statusBar } from '../kit.mjs';

const scr = (name) =>
	`${statusBar('#CFF1EA', '#26333B')}<img src="images/work/gpp/screens/${name}.webp" style="display:block;width:100%;margin-top:-6px">`;

export const gpp = {
	slug: 'gpp-ipl',
	dir: 'gpp',
	fonts: ['Plus+Jakarta+Sans:wght@500;600;700;800'],
	css: `
		.stage{background:
			radial-gradient(70% 80% at 80% 45%, #1fc7b4 0%, rgba(20,184,166,.0) 60%),
			radial-gradient(60% 70% at 0% 100%, rgba(245,166,35,.22), transparent 70%),
			linear-gradient(150deg,#0B5D57 0%,#0D7F75 45%,#0A4743 100%)}
		h1{margin-top:0;font:800 104px/.98 'Plus Jakarta Sans';letter-spacing:-.045em;color:#fff}
		h1 em{font-style:normal;color:#FFD48A}
		.sub{margin-top:30px;font:500 36px/1.3 'Plus Jakarta Sans';letter-spacing:-.015em;color:#D2F5EE;text-wrap:balance}`,
	html: `<div class="stage grain">
		<div class="abs txt" style="left:96px;top:190px;width:660px">
			<h1>Every kavling,<br><em>every month.</em></h1>
			<div class="sub">Dues, cash and the residents’ agenda, in one app.</div>
		</div>
		${phone(scr('warga'), { style: 'left:870px;top:240px;transform:rotate(-9deg);opacity:.92' })}
		${phone(scr('bayar'), { style: 'left:1180px;top:230px;transform:rotate(9deg);opacity:.92' })}
		${phone(scr('home'), { style: 'left:1000px;top:140px' })}
	</div>`
};
