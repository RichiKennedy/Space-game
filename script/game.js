import Phaser, {AUTO}from 'phaser'
import playerImgSrc from '../assets/spaceShip.png';
import background from '../assets/starfield.png';
import bigStars from '../assets/stars1.png';
import smallStars from '../assets/smallStars.png';
// import playerLaser from '../assets/LaserSprites/laser3.png';

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
let player1, center, playerControls, starfield, spacefield, smallStarfield,player1Laser;




function preload()
{
  // what assets does the game need
  this.load.image("starfield", background);
  this.load.image("player1", playerImgSrc,);
  this.load.image("bigStars", bigStars,);
  this.load.image("smallStars", smallStars,);
//   this.load.image("playerLaser", playerLaser,);
}

function create ()
{
    center = {
        x:this.physics.world.bounds.width / 2,
        y:this.physics.world.bounds.height / 2
    }

    spacefield = this.add.tileSprite(800, 600, 0, 0, "starfield");
    starfield = this.add.tileSprite(50, 50, 0, 0, "bigStars");
    smallStarfield = this.add.tileSprite(50, 50, 0, 0, "smallStars");
    // player1Laser = this.add.image(center.y, 550, "playerLaser");
   
    
    player1 = this.physics.add.sprite(center.x, 550, "player1");
   player1.setScale(0.3);
   player1.setCollideWorldBounds(true);
   playerControls = this.input.keyboard.createCursorKeys();
    
    
    
    
  
  
}

function update () {
    
    //  spacefield.tilePosition.y += 2;


    player1.body.velocity.setTo(0, 0);

    if (playerControls.left.isDown)
    {
        player1.body.velocity.x = -200;
    }
    else if (playerControls.right.isDown)
    {
        player1.body.velocity.x = 200;
    }
  
}


    
    
     

    
    // if (playerControls.up.isDown) {
    //     player1.setVelocity(0, -200);
    //   }
     //  Scroll the background


