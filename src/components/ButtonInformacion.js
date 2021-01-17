export class ButtonInformacion {
  constructor(scene) {
    this.relatedScene = scene;
    }
    init() {
        
    }

    preload() {
    
    
  }
    create(texto, escena) {
      // Para posicionarnos relativamente otenemos el ancho y el alto   
        let { width, height } = this.relatedScene.sys.game.canvas;


  // escribimos  un texto: x, y , text y style
        
        
    this.texto = this.relatedScene.add.text(width/2, height/1.5, texto, { 
        fontSize: '24px', 
        fontWeight: "900",
        fill: '#00427e', 
        backgroundColor: '#98b6b8',
        align: 'center',
        fixedWidth: 300,
        fixedHeight: 50,
        baselineY:2.2,
       
        fontFamily: 'verdana, arial, sans-serif' 
    });
       this.texto.setShadow(3, 3, 'rgba(244,244,244,0.5)', 2);
        this.texto.setOrigin(0.5);
 
    this.texto.setInteractive();
 
    this.texto.on('pointerdown', () => {
        this.relatedScene.scene.start(escena); 
    });
    this.texto.on('pointerover', () => { this.texto.setStyle({ fill: '#517fac' }) });
    this.texto.on('pointerout', () => { this.texto.setStyle({ fill: '#5e3f6b'}) });
    
}
    }
   