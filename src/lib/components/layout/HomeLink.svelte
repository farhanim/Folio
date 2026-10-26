<!-- Fixed top-left mark: a "rock on" hand that turns into a pointing hand and slides right to reveal "Home". -->
<a href="/" class="home-link" aria-label="Home">
	<span class="hand" aria-hidden="true">
		<svg class="icon horns" viewBox="0 0 24 24" width="16" height="16">
			<path d="M18 12.5V10a2 2 0 0 0-2-2a2 2 0 0 0-2 2v1.4" />
			<path d="M14 11V9a2 2 0 1 0-4 0v2" />
			<path d="M10 10.5V5a2 2 0 1 0-4 0v9" />
			<path
				d="m7 15-1.76-1.76a2 2 0 0 0-2.83 2.82l3.6 3.6C7.5 21.14 9.2 22 12 22h2a8 8 0 0 0 8-8V7a2 2 0 1 0-4 0v5"
			/>
		</svg>
		<svg class="icon point" viewBox="0 0 24 24" width="16" height="16">
			<path d="M22 14a8 8 0 0 1-8 8" />
			<path d="M18 11v-1a2 2 0 0 0-2-2a2 2 0 0 0-2 2" />
			<path d="M14 10V9a2 2 0 0 0-2-2a2 2 0 0 0-2 2v1" />
			<path d="M10 9.5V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v10" />
			<path
				d="M18 11a2 2 0 1 1 4 0v3a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"
			/>
		</svg>
	</span>
	<span class="label">Home</span>
</a>

<style>
	.home-link {
		position: fixed;
		left: 16px;
		top: 24px;
		z-index: 120;
		display: flex;
		align-items: center;
		height: 24px;
		padding: 4px 27px 4px 4px;
		border-radius: 4px;
		color: var(--text-secondary);
		text-decoration: none;
		transition: color 0.2s ease;
	}
	.home-link:hover,
	.home-link:focus-visible {
		color: var(--accent);
		background: var(--bg);
		z-index: 130;
	}

	.hand {
		position: absolute;
		top: 4px;
		left: 4px;
		width: 16px;
		height: 16px;
		transition: left 0.3s var(--ease-out);
	}
	.home-link:hover .hand,
	.home-link:focus-visible .hand {
		left: calc(100% - 20px);
		transition: left 0.3s var(--ease-out) 0.15s;
	}

	.icon {
		position: absolute;
		inset: 0;
		fill: none;
		stroke: currentColor;
		stroke-width: 2;
		stroke-linecap: round;
		stroke-linejoin: round;
	}
	.horns {
		opacity: 1;
		transform: scaleX(-1) rotate(0deg) scale(1);
		transition:
			opacity 0.16s ease-out 0.28s,
			transform 0.3s var(--ease-out) 0.22s;
	}
	.point {
		opacity: 0;
		transform: scaleX(-1) rotate(0deg) scale(0.8);
		transition:
			opacity 0.14s ease-out 0.22s,
			transform 0.26s var(--ease-out) 0.22s;
	}
	.home-link:hover .horns,
	.home-link:focus-visible .horns {
		opacity: 0;
		transform: scaleX(-1) rotate(90deg) scale(0.8);
		transition:
			opacity 0.16s ease-out 0.06s,
			transform 0.3s var(--ease-out);
	}
	.home-link:hover .point,
	.home-link:focus-visible .point {
		opacity: 1;
		transform: scaleX(-1) rotate(90deg) scale(1);
		transition:
			opacity 0.18s ease-out 0.08s,
			transform 0.3s var(--ease-out);
	}

	.label {
		font-size: 13px;
		font-weight: 600;
		letter-spacing: -0.01em;
		line-height: 1;
		clip-path: inset(0 100% 0 0);
		transition: clip-path 0.3s var(--ease-out);
	}
	.home-link:hover .label,
	.home-link:focus-visible .label {
		clip-path: inset(0 0 0 0);
		transition: clip-path 0.3s var(--ease-out) 0.15s;
	}

	@media (pointer: coarse) {
		.home-link {
			width: 44px;
			height: 44px;
			padding: 14px;
			left: 12px;
			top: 14px;
		}
		.label {
			display: none;
		}
		.hand,
		.home-link:hover .hand {
			top: 14px;
			left: 14px;
		}
	}
	@media (max-width: 480px) {
		.home-link {
			display: none;
		}
	}
</style>
