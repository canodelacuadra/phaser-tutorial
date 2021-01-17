import { Button } from '../components/Button.js';
import { ButtonInformacion} from '../components/ButtonInformacion.js';
export class Presentacion extends Phaser.Scene {
  constructor() {
    super({ key: 'presentacion' });
  }
  init() {
    this.button = new Button(this);
    this.buttonInformacion = new ButtonInformacion(this);
  
  }

  preload() {
     this.load.image('breakout', 'assets/images/breakout.png');
      this.load.image('background', 'assets/images/background.png');
   
  }
  
  create() {
    let { width, height } = this.sys.game.canvas;
    this.add.image(width/2, height/2, 'background');
    
    this.add.image(width/2, height/4, 'breakout');
    this.button.create('Iniciar Juego', 'game');
    this.buttonInformacion.create('Instrucciones / Reglas', 'Instrucciones'); 
      
  }
}