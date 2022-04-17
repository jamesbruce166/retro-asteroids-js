import UserControls from './userControls.js';

const { cos, sin, PI } = Math;

export default class Ship extends UserControls {
	constructor(ctx) {
		super();

		this.ctx = ctx;

		this.x = 400;
		this.y = 400;
		this.angle = 90;
		this.width = 30;
	}

	move() {
		this.rotatingLeft && this.rotateLeft();
		this.rotatingRight && this.rotateRight();

		if (this.forward) {
			this.x += 5 * cos(this.rads());
			this.y -= 5 * sin(this.rads());
		}
	}

	draw() {
		const radius = this.width / 2;
		this.ctx.strokeStyle = '#fff';

		this.ctx.beginPath();
		this.ctx.moveTo(
			this.x + ((radius * 4) / 3) * cos(this.rads()),
			this.y - ((radius * 4) / 3) * sin(this.rads())
		);
		this.ctx.lineTo(
			this.x - radius * ((2 / 3) * cos(this.rads()) + sin(this.rads())),
			this.y + radius * ((2 / 3) * sin(this.rads()) - cos(this.rads()))
		);
		this.ctx.lineTo(
			this.x - radius * ((2 / 3) * cos(this.rads()) - sin(this.rads())),
			this.y + radius * ((2 / 3) * sin(this.rads()) + cos(this.rads()))
		);
		this.ctx.closePath();
		this.ctx.stroke();
	}

	rads() {
		return this.angle * (PI / 180);
	}

	rotateLeft() {
		if (this.angle > 359) this.angle = 0;
		this.angle += 3;
	}

	rotateRight() {
		if (this.angle < 1) this.angle = 360;
		this.angle -= 3;
	}
}
