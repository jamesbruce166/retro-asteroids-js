import UserControls from './userControls.js';
import Asteroid from './asteroid.js';
import Ship from './ship.js';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

class Game {
	constructor() {
		this.ship = new Ship();
		this.asteroid = new Asteroid();
		this.controls = new UserControls();

		this.startGame();
	}

	startGame() {}
}

new Game();
