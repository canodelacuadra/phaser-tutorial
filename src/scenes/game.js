import { Scoreboard } from '../components/Scoreboard.js';
import { Livesboard } from '../components/Livesboard.js';
export class Game extends Phaser.Scene {

  constructor() {
    super({ key: 'game' });
  }

  init() {
    this.scoreboard = new Scoreboard(this);
    this.livesboard = new Livesboard(this);
  }


  preload() {

    this.load.image('background', 'assets/images/background.png');
    this.load.image('gameover', 'assets/images/gameover.png');
    this.load.image('platform', 'assets/images/platform.png');
    this.load.image('ball', 'assets/images/ball.png');
    this.load.image('bluebrick', 'assets/images/brickBlue.png');
    this.load.image('blackbrick', 'assets/images/brickBlack.png');
    this.load.image('greenbrick', 'assets/images/brickGreen.png');
    this.load.image('orangebrick', 'assets/images/brickOrange.png');
    this.load.image('congratulations', 'assets/images/congratulations.png');
    
    
    this.load.audio('platformimpactsample', 'assets/sounds/platform-impact.ogg');
    this.load.audio('brickimpactsample', 'assets/sounds/brick-impact.ogg');
    this.load.audio('gameoversample', 'assets/sounds/gameover.ogg');
    this.load.audio('winsample', 'assets/sounds/you_win.ogg');
    this.load.audio('startgamesample', 'assets/sounds/start-game.ogg');
  }

  create() {
    this.add.image(410, 250, 'background');
    this.bricks = this.physics.add.staticGroup({
      key: ['bluebrick', 'orangebrick', 'greenbrick', 'blackbrick'], 
      frameQuantity: 10,
      gridAlign: { 
        width: 10, 
        height: 4, 
        cellWidth: 67, 
        cellHeight: 34, 
        x: 112, 
        y: 100
      } 
    });
    this.platform = this.physics.add.image(400, 460, 'platform').setImmovable();
    this.platform.body.allowGravity = false;
    this.platform.setCollideWorldBounds(true);

    this.cursors = this.input.keyboard.createCursorKeys();

    this.ball = this.physics.add.image(400, 435, 'ball');
    this.ball.setCollideWorldBounds(true);
    this.ball.setBounce(1);//rebote de pelota
    this.ball.setData('glue', true);//datos añadidos a pelota

    this.physics.world.setBoundsCollision(true, true, true, false); 

    this.physics.add.collider(this.ball, this.platform, this.platformImpact, null, this);
    this.physics.add.collider(this.ball, this.bricks, this.brickImpact, null, this);

    this.scoreboard.create();
    this.livesboard.create();
   
 /*    this.congratsImage = this.add.image(400, 90, 'congratulations');
    this.congratsImage.visible = false; */
  
    this.platformImpactSample = this.sound.add('platformimpactsample');
    this.brickImpactSample = this.sound.add('brickimpactsample');
    this.gameOverSample = this.sound.add('gameoversample');
    this.winSample = this.sound.add('winsample');
    this.startGameSample = this.sound.add('startgamesample');

  }
  update() {
    this.iniciarBola();
    this.darBola();
    this.caerBola();
  }

  iniciarBola() {
    //  Plataforma impulsa bola
    if (this.cursors.up.isDown) {
      if (this.ball.getData('glue')) {
        this.ball.setData('glue', false);
        this.ball.setVelocity(-30, -300);
         this.startGameSample.play();
      }
    }
  }
    darBola() {
    if (this.cursors.left.isDown) {
      // velocidad del cursor 
      this.platform.setVelocityX(-500);
      if (this.ball.getData('glue')) {
        //comportamiento de inicio de la pelota donde glue =true
        this.ball.setVelocityX(-500);
      }
    }
    else if (this.cursors.right.isDown) {
      this.platform.setVelocityX(500);
      if (this.ball.getData('glue')) {
        this.ball.setVelocityX(500);
      }
    }
    else {
      this.platform.setVelocityX(0);
      if (this.ball.getData('glue')) {
        this.ball.setVelocityX(0);
      }
    }
  }

  caerBola() {
      // Bola cae bajo suelo
    if (this.ball.y > 500 /*  && this.ball.active */) {
      this.livesboard.decrement(-1);
      this.startGameSample.play();
      this.scene.pause();

      if (this.livesboard.lives > 0) {
        //reiniciamos posicion
        this.ball.x = 400;
        this.ball.y = 435;
        this.platform.x = 400;
        this.ball.setVelocity(0);
        this.scene.resume();
        this.ball.setData('glue', true);
        //console.log('tengo vidas'+this.livesboard.lives);
      }else{
      this.endGame(false);
      }  
 
    }
  }

 endGame(exito) {
    if(exito) {
      this.scene.start('congratulations');
      this.winSample.play();
    } else {
      this.scene.start('gameover');
      this.gameOverSample.play();
   }
  }
  



  platformImpact(ball,platform) {
    //this.scoreboard.increment(1);
    this.platformImpactSample.play();
    let relativeImpact = ball.x - platform.x;
    if(relativeImpact > 0) {
        //console.log('derecha!');
        ball.setVelocityX(6 * relativeImpact);
    } else if(relativeImpact < 0) {
        //console.log('izquierda!');
        ball.setVelocityX(6 * relativeImpact);
    } else {
        console.log('centro!!');
        ball.setVelocityX(Phaser.Math.Between(-10, 10))
    }
    
  }
  brickImpact(ball, brick) {
      brick.disableBody(true, true);
    this.scoreboard.increment(10);
    
      this.brickImpactSample.play();
    if (this.bricks.countActive() === 0) {
      this.endGame(true);
      
    }
  }
 

}