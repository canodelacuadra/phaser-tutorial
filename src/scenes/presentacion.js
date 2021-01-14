

export class Presentacion extends Phaser.Scene {
  constructor() {
    super({ key: 'presentacion' });
  }

  preload() {
     this.load.image('breakout', 'assets/images/breakout.png');
      this.load.image('background', 'assets/images/background.png');
   
  }
  
  create() {
      this.add.image(410, 250, 'background');
     this.add.image(400, 90, 'breakout');
      this.caja = this.add.graphics();
    this.caja.fillStyle(0x777ea4, 1);
    //  32px radius on the corners 
      this.caja.fillRoundedRect(270, 240, 260, 60, 32);
 
      this.input.on('pointerdown', () => {
          console.log('soy interactivo');
      this.scene.start('game');
    });
      
       this.texto = this.add.text(360, 260, 'PLAY', { 
           fontSize: '24px', 
           fontWeight: "900",
            fill: '#00427e', 
            fontFamily: 'verdana, arial, sans-serif' 
       });
      
    
     
    

   
     
      
  }
}