import Phaser, {AUTO}from 'phaser'
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    
    physics: {
        default: 'arcade',
        arcade: {
                  gravity: false,
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);
let player1, center;


function preload()
{
  // what assets does the game need
  this.load.image("player1", "../assets/player.png");
}

function create ()
{
    center = {
        x:this.physics.world.bounds.width / 2,
        y:this.physics.world.bounds.height / 2
      }
    this.add.sprite(center.x, 550, "player1");

  
    //   ball = this.physics.add.sprite(center.x, center.y, "ball");
    //   ball.setCollideWorldBounds(true)
    //   ball.setBounce(1);
      
    //   player1 = this.physics.add.sprite(10, center.y, 'player')
    //   player1.setScale(0.5)
    //   player1.setCollideWorldBounds(true);
    //   player1.setImmovable(true);
    //   player1Controls = this.input.keyboard.createCursorKeys() 
}

function update () {
    
}


