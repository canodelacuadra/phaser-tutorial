const config = {
    width: 320*2,
    height: 180*2,
    parent:"container",
    type: Phaser.AUTO,
    scene:{
        preload:preload,
        create:create,
        update:update
    },
    physics:{
        default:"arcade",
        arcade:{
            gravity:{
                y:500
            }
        }
    }

}
var game = new Phaser.Game(config)
// se encarga de precargar assets
function preload(){
    this.load.image("bird","./assets/bird.png")
  
}
function create(){
    this.bird = this.physics.add.image(50,100, "bird");
   this.bird.setCollideWorldBounds(true);
   this.bird.setBounce(0.2);
   this.bird.setVelocity(50,0)
}
function update(time,delta){
    console.log('soy update');
}