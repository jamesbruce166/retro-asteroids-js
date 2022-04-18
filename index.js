import Game from './js/game.js';

class App {
	constructor() {
		this.game = new Game();
		this.game.start();
	}
}

new App();
