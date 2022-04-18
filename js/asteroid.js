export default class Asteroid {
	constructor(ctx, controls) {
		this.controls = controls;
		this.ctx = ctx;

		this.asteroids = [];
	}

	populate() {
		for (let i = 0; i < 4; i++) {
			this.asteroids.push(
				this.generateAsteriod({
					x: this.ran(100, 700),
					y: this.ran(100, 700),
					hits: 0,
					r: 40,
					points: 10,
				})
			);
		}

		for (let i = 0; i < 3; i++) {
			this.asteroids.push(
				this.generateAsteriod({
					x: this.ran(100, 700),
					y: this.ran(100, 700),
					hits: 1,
					r: 30,
					points: 8,
				})
			);
		}

		for (let i = 0; i < 2; i++) {
			this.asteroids.push(
				this.generateAsteriod({
					x: this.ran(100, 700),
					y: this.ran(100, 700),
					hits: 2,
					r: 20,
					points: 6,
				})
			);
		}
	}

	render() {
		for (let idx = 0; idx < this.asteroids.length; idx++) {
			const { x, y, r } = this.asteroids[idx];

			this.move(this.asteroids[idx]);
			this.handleBounds(this.asteroids[idx]);
			this.draw(this.asteroids[idx]);

			if (this.controls.showCollision) {
				this.ctx.strokeStyle = 'green';
				this.ctx.beginPath();
				this.ctx.arc(x, y, r, 0, Math.PI * 2);
				this.ctx.stroke();
			}
		}
	}

	draw({ points, x, y, r, xNoise, yNoise }) {
		this.ctx.strokeStyle = '#fff';
		this.ctx.beginPath();

		const a = (2 * Math.PI) / points;
		for (let i = 0; i < points; i++) {
			this.ctx.lineTo(
				x + r * Math.cos(a * i) + xNoise[i],
				y + r * Math.sin(a * i) + yNoise[i]
			);
		}

		this.ctx.closePath();
		this.ctx.stroke();
	}

	generateAsteriod({ x, y, r, hits, points }) {
		const hitCaller = (a) => this.splitAsteroid(a);
		const asteroid = {
			x,
			y,
			hits,
			r,
			points,
			direction: this.ran(0, Math.PI * 2),
			speed: this.ran(1, 3),
			xNoise: [],
			yNoise: [],
			registerHit: function () {
				hitCaller(this);
			},
		};

		for (let i = 0; i < asteroid.points; i++) {
			asteroid.xNoise.push(this.ran(-5, 5));
			asteroid.yNoise.push(this.ran(-5, 5));
		}

		return asteroid;
	}

	splitAsteroid(asteroid) {
		const idx = this.asteroids.indexOf(asteroid);
		if (asteroid.hits == 2) {
			this.killAsteroid(idx);
			return;
		}

		this.asteroids.splice(idx, 1);

		for (let i = 0; i < 2; i++) {
			this.asteroids.push(
				this.generateAsteriod({
					x: asteroid.x,
					y: asteroid.y,
					hits: asteroid.hits + 1,
					r: asteroid.r - 10,
					points: asteroid.points - 2,
				})
			);
		}
	}

	reset() {
		this.asteroids = [];
	}

	handleBounds(asteroid) {
		if (asteroid.x < 0 - asteroid.r) {
			asteroid.x = 800 + asteroid.r;
		} else if (asteroid.x > 800 + asteroid.r) {
			asteroid.x = 0 - asteroid.r;
		}
		if (asteroid.y < 0 - asteroid.r) {
			asteroid.y = 800 + asteroid.r;
		} else if (asteroid.y > 800 + asteroid.r) {
			asteroid.y = 0 - asteroid.r;
		}
	}

	move(asteroid) {
		asteroid.x += asteroid.speed * Math.cos(asteroid.direction);
		asteroid.y -= asteroid.speed * Math.sin(asteroid.direction);
	}

	killAsteroid(idx) {
		this.asteroids.splice(idx, 1);
	}

	ran(min, max) {
		return Math.random() * (max - min) + min;
	}
}
