import { Presentacion } from './scenes/presentacion.js';
import { Game } from './scenes/game.js';
import { Congratulations } from './scenes/congratulations.js';
import { Gameover } from './scenes/gameover.js';
import { Instrucciones } from './scenes/instrucciones.js';

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: [Presentacion,Game,Gameover, Congratulations,Instrucciones],
  physics: {
    default: 'arcade',
    arcade: {
      // gravity: { y: 70 },
      debug: false
    }
  }
}

var game = new Phaser.Game(config);