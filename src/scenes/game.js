import { Scoreboard } from '../components/Scoreboard.js';
export class Game extends Phaser.Scene {

  constructor() {
    super({ key: 'game' });
  }

  init() {
    this.scoreboard = new Scoreboard(this);
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

    this.ball = this.physics.add.image(385, 430, 'ball');
    this.ball.setCollideWorldBounds(true);
    this.ball.setBounce(1);
    this.ball.setData('glue', true);

    this.physics.world.setBoundsCollision(true, true, true, false); 

    this.physics.add.collider(this.ball, this.platform, this.platformImpact, null, this);
    this.physics.add.collider(this.ball, this.bricks, this.brickImpact, null, this);

    this.scoreboard.create();
   
 /*    this.congratsImage = this.add.image(400, 90, 'congratulations');
    this.congratsImage.visible = false; */
  
    this.platformImpactSample = this.sound.add('platformimpactsample');
    this.brickImpactSample = this.sound.add('brickimpactsample');
    this.gameOverSample = this.sound.add('gameoversample');
    this.winSample = this.sound.add('winsample');
    this.startGameSample = this.sound.add('startgamesample');

  }
  


  update() {
  
    if (this.cursors.left.isDown) {
      // velocidad del cursor 
      this.platform.setVelocityX(-500);
      if (this.ball.getData('glue')) {
        
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
    
  // Bola supera la plataforma
    if (this.ball.y > 500  && this.ball.active) {
      this.endGame();
      this.gameOverSample.play();
 
    }
//  Plataforma impulsa pelota
    if (this.cursors.up.isDown) {
      if (this.ball.getData('glue')) {
        this.startGameSample.play();
        this.ball.setVelocity(-60, -300);
        this.ball.setData('glue', false);
      }
    }

  }
  platformImpact(ball,platform) {
    //this.scoreboard.increment(1);
    this.platformImpactSample.play();
    let relativeImpact = ball.x - platform.x;
    if(relativeImpact > 0) {
        //console.log('derecha!');
        ball.setVelocityX(8 * relativeImpact);
    } else if(relativeImpact < 0) {
        //console.log('izquierda!');
        ball.setVelocityX(8 * relativeImpact);
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
      this.endGame();
      this.winSample.play();
    }
  }
  endGame(completed = false) {
    this.scene.pause();
    if(! completed) {
    this.scene.start('gameover');
    } else {
    this.scene.start('congratulations');
   }
  }

}