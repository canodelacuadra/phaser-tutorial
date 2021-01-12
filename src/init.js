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
    this.load.image("bird","./assets/bird.png");
  
}
function create(){
    //console.log(Phaser.Input.Keyboard.KeyCodes); 
    var bird = this.add.image(100,50, "bird");
    this.input.keyboard.on("keydown-RIGHT",function(event) {
      bird.x++;
    });
    this.input.keyboard.on("keydown-LEFT",function(event) {
    bird.x--;
    });
    this.input.keyboard.on("keydown-DOWN",function(event) {
    bird.y++;
    });
    this.input.keyboard.on("keydown-UP",function(event) {
    bird.y--;
    });
}
function update(time,delta){
    
}