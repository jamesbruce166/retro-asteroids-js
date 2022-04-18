export default class Explosion {
	constructor(ctx, x, y) {
		this.ctx = ctx;

		this.x = x;
		this.y = y;
		this.r = 30;
	}

	draw() {
		const grd = this.ctx.createRadialGradient(
			this.x,
			this.y,
			5,
			this.x,
			this.y,
			30
		);
		grd.addColorStop(0, 'red');
		grd.addColorStop(1, 'orange');

		this.ctx.beginPath();
		this.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
		this.ctx.closePath();
		this.ctx.fillStyle = grd;
		this.ctx.fill();
	}
}
