// Shared stage, device frames and texture for every cover.
const noise = `url("data:image/svg+xml,${encodeURIComponent(
	`<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 .55 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>`
)}")`;

export const base = `
*{box-sizing:border-box;margin:0;padding:0}
html,body{width:1600px;height:1000px;overflow:hidden;background:#000;-webkit-font-smoothing:antialiased;text-rendering:geometricPrecision}
.stage{position:relative;width:1600px;height:1000px;overflow:hidden;isolation:isolate}
.abs{position:absolute}
img{display:block}

/* Film grain on top of everything */
.grain::after{content:'';position:absolute;inset:0;z-index:50;pointer-events:none;background-image:${noise};opacity:.16;mix-blend-mode:overlay}
.grain.soft::after{opacity:.09}

/* Browser window */
.browser{position:absolute;border-radius:16px;overflow:hidden;background:#fff;box-shadow:0 1px 0 rgba(255,255,255,.5) inset,0 40px 80px -20px rgba(0,0,0,.45),0 18px 36px -18px rgba(0,0,0,.35)}
.browser .bar{height:38px;display:flex;align-items:center;gap:8px;padding:0 16px;background:#f3f3f1;border-bottom:1px solid rgba(0,0,0,.06)}
.browser .bar i{width:11px;height:11px;border-radius:50%;background:#d9d9d6}
.browser .bar i:nth-child(1){background:#ff5f57}.browser .bar i:nth-child(2){background:#febc2e}.browser .bar i:nth-child(3){background:#28c840}
.browser .bar b{margin-left:18px;flex:1;max-width:360px;height:22px;border-radius:7px;background:#e6e6e3;font:500 11px/22px system-ui;color:#888;text-align:center}
.browser.dark{background:#16181d}.browser.dark .bar{background:#202329;border-color:rgba(255,255,255,.06)}.browser.dark .bar b{background:#2b2f36;color:#8a8f98}
.browser img{width:100%}

/* Laptop: screen + base */
.laptop{position:absolute}
.laptop .lid{position:relative;padding:14px 14px 18px;border-radius:22px 22px 6px 6px;background:linear-gradient(#1d1e21,#0c0c0e);box-shadow:inset 0 0 0 1.5px #3a3b40,0 50px 80px -30px rgba(0,0,0,.6)}
.laptop .lid img{width:100%;border-radius:6px}
.laptop .lid::before{content:'';position:absolute;top:5px;left:50%;width:6px;height:6px;margin-left:-3px;border-radius:50%;background:#2a2b30}
.laptop .base{position:relative;height:22px;margin:0 -9%;border-radius:2px 2px 18px 18px;background:linear-gradient(#d4d5d9,#9fa1a6 60%,#6e7075);box-shadow:0 30px 40px -12px rgba(0,0,0,.55)}
.laptop .base::before{content:'';position:absolute;top:0;left:50%;width:18%;height:9px;transform:translateX(-50%);border-radius:0 0 10px 10px;background:linear-gradient(#a5a7ac,#c8c9cd)}
.laptop.space .base{background:linear-gradient(#5b5d63,#36383c 60%,#1e1f22)}
.laptop.space .base::before{background:linear-gradient(#2c2d31,#45474c)}

/* Phone */
.phone{position:absolute;width:380px;height:800px;padding:13px;border-radius:62px;background:linear-gradient(145deg,#2b2c30,#0d0d0f 40%,#1c1d20);box-shadow:inset 0 0 0 2px #45464b,inset 0 0 0 5px #111,0 60px 90px -30px rgba(0,0,0,.55)}
.phone .scr{position:relative;width:100%;height:100%;border-radius:50px;overflow:hidden;background:#fff}
.phone .scr::before{content:'';position:absolute;z-index:5;top:12px;left:50%;width:112px;height:32px;margin-left:-56px;border-radius:20px;background:#000}
.phone.silver{background:linear-gradient(145deg,#f4f4f2,#b9babd 45%,#e8e8e6);box-shadow:inset 0 0 0 2px #fff,inset 0 0 0 5px #8d8e92,0 60px 90px -30px rgba(0,0,0,.45)}
.sb{display:flex;justify-content:space-between;align-items:center;height:56px;padding:6px 34px 0;font:700 15px/1 system-ui}

/* Studio monitor */
.monitor{position:absolute}
.monitor .scr{padding:12px;border-radius:18px;background:#d9dadc;box-shadow:inset 0 0 0 1.5px #f4f4f4,0 50px 80px -30px rgba(0,0,0,.55)}
.monitor .scr img{width:100%;border-radius:6px}
.monitor .neck{width:22%;height:120px;margin:0 auto;background:linear-gradient(90deg,#a9abaf,#e6e7e9 50%,#a9abaf)}
.monitor .foot{width:34%;height:16px;margin:0 auto;border-radius:6px 6px 3px 3px;background:linear-gradient(#e2e3e5,#9c9ea2);box-shadow:0 20px 30px -10px rgba(0,0,0,.5)}

.mono{font-family:'JetBrains Mono',ui-monospace,monospace}
.up{text-transform:uppercase}
.row{display:flex;align-items:center}
`;
