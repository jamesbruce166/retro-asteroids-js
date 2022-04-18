import UserControls from './userControls.js';
import Asteroid from './asteroid.js';
import Physics from './physics.js';
import Ship from './ship.js';

const FPS = 30;

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

export default class Game {
	constructor() {
		this.controls = new UserControls();
		this.ctx = ctx;

		this.physics = new Physics();
		this.ship = new Ship(ctx, this.controls);
		this.asteroids = new Asteroid(ctx, this.controls);

		this.lives = 3;
		this.score = 0;
	}

	start() {
		this.asteroids.populate();

		const nextFrame = () => this.update();
		this.interval = setInterval(nextFrame, 1000 / FPS);
	}

	update() {
		if (this.controls.paused) return;
		this.ctx.clearRect(0, 0, canvas.width, canvas.height);

		// Display stats
		this.showLives();
		this.showScore();

		// Listen for user controls
		this.ship.registerEvents();

		// render objects
		this.ship.render();
		this.asteroids.render();

		// Run physics
		const { score, lives } = this.physics.checkCollision(
			this.ship,
			this.asteroids,
			this.lives,
			this.score
		);

		// Update stats
		this.score = score;
		this.lives = lives;

		if (lives <= 0) {
			this.resetGame();
		}
	}

	showLives() {
		this.ctx.textAlign = 'right';
		this.ctx.textBaseline = 'middle';
		this.ctx.fillStyle = 'white';
		this.ctx.font = 'normal 20px Fira Sans';
		this.ctx.fillText('Lives:', 80, 30);

		this.drawHearts();
	}

	showScore() {
		this.ctx.textAlign = 'left';
		this.ctx.textBaseline = 'middle';
		this.ctx.fillStyle = 'white';
		this.ctx.font = 'normal 20px Fira Sans';
		this.ctx.fillText(`Score: ${this.score}`, 800 - 100, 30);
	}

	resetGame() {
		this.lives = 3;
		this.score = 0;

		this.asteroids.reset();
		clearInterval(this.interval);
		this.start();
	}

	drawHearts() {
		// http://www.java2s.com/Tutorials/Javascript/Canvas_How_to/Shape/Draw_Heart_shape.htm
		const w = 30;
		const d = Math.min(w, w);
		this.ctx.fillStyle = 'rgb(0,191,255)';

		for (let i = 0; i < this.lives; i++) {
			const x = 35 * (i + 1) + 50;
			const y = 15;

			this.ctx.beginPath();
			this.ctx.moveTo(x, y + d / 4);
			this.ctx.quadraticCurveTo(x, y, x + d / 4, y);
			this.ctx.quadraticCurveTo(x + d / 2, y, x + d / 2, y + d / 4);
			this.ctx.quadraticCurveTo(x + d / 2, y, x + (d * 3) / 4, y);
			this.ctx.quadraticCurveTo(x + d, y, x + d, y + d / 4);
			this.ctx.quadraticCurveTo(
				x + d,
				y + d / 2,
				x + (d * 3) / 4,
				y + (d * 3) / 4
			);
			this.ctx.lineTo(x + d / 2, y + d);
			this.ctx.lineTo(x + d / 4, y + (d * 3) / 4);
			this.ctx.quadraticCurveTo(x, y + d / 2, x, y + d / 4);
			this.ctx.closePath();
			this.ctx.fill();
		}
	}
}
