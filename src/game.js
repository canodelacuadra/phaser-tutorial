export class Game extends Phaser.Scene {

  constructor() {
    super({ key: 'game' });
  }

  preload() {
    this.load.image('background', '/assets/background.png');
    this.load.image('gameover', '/assets/gameover.png');
  }

  create() {
    this.add.image(400, 250, 'background');
    this.gameoverImage = this.add.image(400, 90, 'gameover');
  }

}