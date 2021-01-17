import { Button } from '../components/Button.js';
export class Instrucciones extends Phaser.Scene {
  constructor() {
    super({ key: 'Instrucciones' });
  }
  init() {
    this.button = new Button(this);
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
    // this.buttonInformacion.create('Instrucciones del Juego', 'congratulations'); 

  // escribimos  un texto: x, y , text y style
    let instrucciones = `
    Para arrancar el juego debemos lanzar la bola.
    Podemos hacerlo a) con la barra espaciadora o b) con el cursor  'up'. 
    Podemos mover la  pala del jugador con cursor  < (left) y > (right)del teclado. 
    Podemos mover la pala para variar el saque inicial
    Debemos eliminar todos los bloques  con las vidas que tenemos.
    Cada bloque son diez puntos
    `;
        
    this.texto = this.add.text(20, height/1.8, instrucciones, { 
        fontSize: '18px', 
        fill: '#000000', 
        backgroundColor: '#98b6b8',
      align: 'left',
        baselineX:1.4,
        fontFamily: 'verdana, arial, sans-serif' 
    });
       
      
  }
}