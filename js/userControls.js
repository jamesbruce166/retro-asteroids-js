export default class UserControls {
	constructor() {
		this.rotatingLeft = false;
		this.rotatingRight = false;
		this.forward = false;

		document.onkeydown = (event) => {
			const callback = {
				ArrowLeft: () => (this.rotatingLeft = true),
				ArrowRight: () => (this.rotatingRight = true),
				ArrowUp: () => (this.forward = true),
			}[event.key];

			callback?.();
		};

		document.onkeyup = (event) => {
			const callback = {
				ArrowLeft: () => (this.rotatingLeft = false),
				ArrowRight: () => (this.rotatingRight = false),
				ArrowUp: () => (this.forward = false),
			}[event.key];

			callback?.();
		};
	}
}
