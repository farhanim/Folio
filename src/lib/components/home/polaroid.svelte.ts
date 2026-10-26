// Shared state for the single polaroid preview that follows the pointer over bio links.
export const polaroid = $state({
	src: '',
	tilt: '-3deg',
	x: 0,
	y: 0,
	visible: false
});
