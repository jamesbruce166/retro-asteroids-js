export default class UserControls {
	constructor() {
		document.onkeydown = (event) => {
			const callback = {
				ArrowLeft: this.leftHandler,
				ArrowRight: this.rightHandler,
				ArrowUp: this.upHandler,
			}[event.key];

			callback?.();
		};
	}

	leftHandler() {
		console.log('Rotating Left');
	}

	rightHandler() {
		console.log('Rotating Right');
	}

	upHandler() {
		console.log('Accelerating Forward');
	}
}
