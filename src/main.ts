import Pyramid, { GameEntity } from 'pyramid-game-lib';
import { Color } from 'three';
const { Game, Stage, Entity, Util } = Pyramid;
const { Box, Actor } = Entity;
import idle from './actors/idle.fbx?url';

const { Vector3 } = Util;

@Box({
	fixed: true,
	position: new Vector3(0, 0, 0),
	size: new Vector3(10, 0.2, 10),
	color: 0xFAEBD7,
})
export class SimpleBox { }

@Stage({
	name: 'level 1',
	backgroundColor: new Color('#87CEEB')
})
class Level1 implements GameEntity<typeof Entity> {
	async setup({ create }: any) {
		create(SimpleBox);
	}
	loop() { }
}

@Actor({
	files: [idle]
})
class Player {
	setup() { }
	loop() { }
}

@Game({
	app: '#game',
	stages: [Level1]
})
class MyGame implements GameEntity<typeof Entity> {

	async setup({ create, camera }: any) {
		const player = await create(Player);
		camera.followEntity(player);
	}

	loop() { }
}

export default MyGame;

new MyGame();