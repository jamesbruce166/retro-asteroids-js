import UserControls from './userControls.js';
import Asteroid from './asteroid.js';
import Physics from './physics.js';
import Ship from './ship.js';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const FPS = 30;
class Game {
	constructor() {
		const controls = new UserControls();

		this.physics = new Physics();
		this.ship = new Ship(ctx, controls);
		this.asteroids = new Asteroid(ctx, controls);

		this.startGame();
	}

	startGame() {
		this.asteroids.populateAsteroids();

		const nextFrame = () => this.update();
		setInterval(nextFrame, 1000 / FPS);
	}

	update() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		this.ship.registerEvents();

		this.ship.render();
		this.asteroids.render();

		this.physics.checkCollision(this.ship, this.asteroids);
	}
}

new Game();
