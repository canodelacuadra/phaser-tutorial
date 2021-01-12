export class Game extends Phaser.Scene {

  constructor() {
    super({ key: 'game' });
  }

  preload() {
    this.load.image('background', 'assets/background.png');
      this.load.image('gameover', 'assets/gameover.png');
        this.load.image('platform', 'assets/platform.png');
  }

  create() {
    this.add.image(400, 250, 'background');
      this.gameoverImage = this.add.image(400, 90, 'gameover');
      this.gameoverImage.visible = false;
      this.platform = this.physics.add.image(400, 460, 'platform');
      this.platform.body.allowGravity = false;
      this.cursors = this.input.keyboard.createCursorKeys();
  }
  update() {
    if (this.cursors.left.isDown) {
      this.platform.setVelocityX(-500);
    }
    else if (this.cursors.right.isDown) {
      this.platform.setVelocityX(500);
    }
    else {
      this.platform.setVelocityX(0);
    }
  }

}