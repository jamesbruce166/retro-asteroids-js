export default class UserControls {
	constructor() {
		this.rotatingLeft = false;
		this.rotatingRight = false;
		this.forward = false;
		this.shoot = false;

		this.showCollision = false;

		document.onkeydown = (event) => {
			const callback = {
				ArrowLeft: () => (this.rotatingLeft = true),
				ArrowRight: () => (this.rotatingRight = true),
				ArrowUp: () => (this.forward = true),
				' ': () => (this.shoot = true),
				c: () => (this.showCollision = !this.showCollision),
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
