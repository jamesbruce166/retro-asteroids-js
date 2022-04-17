import Asteroid from './asteroid.js';
import Ship from './ship.js';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const FPS = 30;
class Game {
	constructor() {
		this.ship = new Ship(ctx);
		this.asteroid = new Asteroid();

		this.startGame();
	}

	startGame() {
		const nextFrame = () => this.update();
		//setInterval(nextFrame, 1000 / FPS);
		nextFrame();
	}

	update() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		this.ship.move();
		this.ship.draw();

		console.log({
			x: this.ship.x,
			y: this.ship.y,
			a: this.ship.angle,
		});
	}
}

new Game();
