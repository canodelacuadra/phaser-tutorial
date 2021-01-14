export class Livesboard{
    constructor(scene){
        this.relatedScene = scene;
        this.lives = 10;

    }
    create() {
         this.livesText = this.relatedScene.add.text(480, 16, 'VIDAS: 10', { 
            fontSize: '20px', 
            fill: '#fff', 
            fontFamily: 'verdana, arial, sans-serif' 
        });
    }
    decrement(lives) {
        this.lives += lives;
        this.livesText.setText('VIDAS: ' + this.lives);
    }
}