export default class Physics {
	constructor() {}

	checkCollision(ship, asteroid) {
		const { asteroids } = asteroid;
		this.shipHasHitAsteroid(ship, asteroids);

		const { bullets } = ship;
		this.bulletHasHitAsteroid(bullets, asteroids);
	}

	bulletHasHitAsteroid(bullets, asteroids) {
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
					continue;
				}
			}
		}
	}

	shipHasHitAsteroid(ship, asteroids) {
		const { x: shipX, y: shipY, radius: shipR } = ship;

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
				console.log('ship + asteroid');
			}
		}
	}

	collision({ x1, y1, r1, x2, y2, r2 }) {
		// ** = exponentiation operator
		return (r1 + r2) ** 2 > (x1 - x2) ** 2 + (y1 - y2) ** 2;
	}
}
