const centerX = 400;
const centerY = 400;
export default class Ship {
	constructor(ctx) {
		this.ctx = ctx;

		this.x = centerX;
		this.y = centerY;

		this.width = 35;
		this.height = 50;
	}

	// Here we want to rotate the ship without rotating the entire canvas
	draw(x, y, angle) {
		// Reverse x and y layout to bottom left origin
		x *= -1;
		y *= -1;

		const radians = (angle * Math.PI) / 180;
		const radius = this.width / 2;
		this.ctx.strokeStyle = '#fff';

		// First translate origin to center of the screen
		this.ctx.translate(centerX, centerY);

		// Rotate on the new origin at a given angle
		this.ctx.rotate(radians);

		// Now we can draw the ship
		this.ctx.beginPath();
		this.ctx.moveTo(x, y - this.height / 2);
		this.ctx.lineTo(x + -radius, y + this.height / 2);
		this.ctx.lineTo(x + radius, y + this.height / 2);
		this.ctx.closePath();
		this.ctx.stroke();

		// Then, bring the canvas back to its original point
		this.ctx.rotate(-radians);
		this.ctx.translate(-centerX, -centerY);
	}
}
