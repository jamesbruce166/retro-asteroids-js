export default class Physics {
	constructor() {}

	checkCollision(ship, asteroid, lives, score) {
		const { asteroids } = asteroid;
		lives = this.shipHasHitAsteroid(ship, asteroids, lives);

		const { bullets } = ship;
		score = this.bulletHasHitAsteroid(bullets, asteroids, score);

		return { score, lives };
	}

	bulletHasHitAsteroid(bullets, asteroids, score) {
		for (let i = 0; i < bullets.length; i++) {
			const bullet = bullets[i];
			const { x: bulletX, y: bulletY, r: bulletR } = bullet;

			for (let j = 0; j < asteroids.length; j++) {
				const asteroid = asteroids[j];
				const { x: asteroidX, y: asteroidY, r: asteroidR } = asteroid;

				if (
					this.collision({
						x1: bulletX,
						y1: bulletY,
						r1: bulletR,
						x2: asteroidX,
						y2: asteroidY,
						r2: asteroidR,
					})
				) {
					asteroid.registerHit();
					bullets.splice(i, 1);
					score += 15;
					continue;
				}
			}
		}

		return score;
	}

	shipHasHitAsteroid(ship, asteroids, lives) {
		const { x: shipX, y: shipY, radius: shipR } = ship;

		let shouldRespawn = false;
		for (let j = 0; j < asteroids.length; j++) {
			const asteroid = asteroids[j];
			const { x: asteroidX, y: asteroidY, r: asteroidR } = asteroid;

			if (
				this.collision({
					x1: shipX,
					y1: shipY,
					r1: shipR,
					x2: asteroidX,
					y2: asteroidY,
					r2: asteroidR,
				})
			) {
				lives--;
				shouldRespawn = true;
				ship.explode();
				break;
			}
		}

		if (shouldRespawn) {
			let safe = false;
			do {
				for (let i = 0; i < asteroids.length; i++) {
					const asteroid = asteroids[i];
					const {
						x: asteroidX,
						y: asteroidY,
						r: asteroidR,
					} = asteroid;
					if (
						this.collision({
							x1: 400,
							y1: 400,
							r1: shipR,
							x2: asteroidX,
							y2: asteroidY,
							r2: asteroidR,
						})
					) {
						return;
					}

					safe = true;
				}
			} while (!safe);
			ship.respawn();
			shouldRespawn = false;
		}

		return lives;
	}

	collision({ x1, y1, r1, x2, y2, r2 }) {
		// ** = exponentiation operator
		return (r1 + r2) ** 2 > (x1 - x2) ** 2 + (y1 - y2) ** 2;
	}
}
