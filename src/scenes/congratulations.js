import { RestartButton } from "../components/Restart-button.js";

export class Congratulations extends Phaser.Scene {
  constructor() {
    super({ key: 'congratulations' });
    this.restartButton = new RestartButton(this);
  }

  preload() {
    this.load.image('congratulations', 'assets/images/congratulations.png');
    this.restartButton.preload();
  }
  
  create() {
    this.add.image(400, 300, 'background');
    this.restartButton.create();
    this.congratsImage = this.add.image(400, 90, 'congratulations');
  }
}