const { cos, sin, PI } = Math;

export default class Ship {
	constructor(ctx, controls) {
		this.controls = controls;
		this.ctx = ctx;

		this.x = 400;
		this.y = 400;
		this.angle = 90;
		this.radius = 15;

		this.bullets = [];
	}

	registerEvents() {
		this.controls.rotatingLeft && this.rotateLeft();
		this.controls.rotatingRight && this.rotateRight();
		this.controls.forward && this.moveForward();
		this.controls.shoot && this.fireBullet();
	}

	render() {
		this.drawShip();
		this.drawBullets();
		this.handleBounds();

		if (this.controls.showCollision) {
			this.ctx.strokeStyle = 'green';
			this.ctx.beginPath();
			this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
			this.ctx.stroke();
		}
	}

	drawShip() {
		this.ctx.strokeStyle = '#fff';

		this.ctx.beginPath();
		this.ctx.moveTo(
			this.x + ((this.radius * 4) / 3) * cos(this.rads()),
			this.y - ((this.radius * 4) / 3) * sin(this.rads())
		);
		this.ctx.lineTo(
			this.x -
				this.radius * ((2 / 3) * cos(this.rads()) + sin(this.rads())),
			this.y +
				this.radius * ((2 / 3) * sin(this.rads()) - cos(this.rads()))
		);
		this.ctx.lineTo(
			this.x - this.radius * cos(this.rads()),
			this.y + this.radius * sin(this.rads())
		);
		this.ctx.lineTo(
			this.x -
				this.radius * ((2 / 3) * cos(this.rads()) - sin(this.rads())),
			this.y +
				this.radius * ((2 / 3) * sin(this.rads()) + cos(this.rads()))
		);
		this.ctx.closePath();
		this.ctx.stroke();
	}

	drawBullets() {
		for (let idx = 0; idx < this.bullets.length; idx++) {
			// move bullets
			this.bullets[idx].x += this.bullets[idx].xv;
			this.bullets[idx].y -= this.bullets[idx].yv;

			// render
			const { x, y, r } = this.bullets[idx];
			this.ctx.fillStyle = 'rgb(255, 30, 60)';
			this.ctx.beginPath();
			this.ctx.ellipse(x, y, r, r, 0, 0, PI * 2);
			this.ctx.fill();

			// delete out of bounds bullets
			if (
				this.bullets[idx].x < 0 || // left
				this.bullets[idx].x > 800 || // right
				this.bullets[idx].y < 0 || // top
				this.bullets[idx].y > 800 // bottom
			) {
				this.bullets.splice(idx, 1);
			}
		}
	}

	fireBullet() {
		this.bullets.push({
			r: 2,
			x: this.x + (4 / 3) * this.radius * cos(this.rads()),
			y: this.y - (4 / 3) * this.radius * sin(this.rads()),
			xv: 8 * cos(this.rads()),
			yv: 8 * sin(this.rads()),
		});

		this.controls.shoot = false;
	}

	respawn() {
		this.x = 400;
		this.y = 400;
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

	moveForward() {
		this.x += 5 * cos(this.rads());
		this.y -= 5 * sin(this.rads());
	}

	handleBounds() {
		if (this.x < 0 - this.radius) {
			this.x = 800 + this.radius;
		} else if (this.x > 800 + this.radius) {
			this.x = 0 - this.radius;
		}
		if (this.y < 0 - this.radius) {
			this.y = 800 + this.radius;
		} else if (this.y > 800 + this.radius) {
			this.y = 0 - this.radius;
		}
	}
}
