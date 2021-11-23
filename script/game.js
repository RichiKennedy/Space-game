import Phaser, {AUTO}from 'phaser'
import playerImgSrc from '../assets/spaceShip.png';
import background from '../assets/starfield.png';
import bigStars from '../assets/stars1.png';
import smallStars from '../assets/smallStars.png';
import laser from '../assets/LaserSprites/laser3.png';
import invader1 from '../assets/drone.png';
import invader2 from '../assets/robot.png';


var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    
    physics: {
        default: 'arcade',
        arcade: {
                  gravity: false,
                  debug: false,
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);
let player1, center, playerControls, starfield, spacefield, smallStarfield,laserShot;

let alreadyClicked = false;



function preload()
{
  // what assets does the game need
  this.load.image("starfield", background);
  this.load.image("player1", playerImgSrc,);
  this.load.image("bigStars", bigStars,);
  this.load.image("smallStars", smallStars,);
  this.load.image("laserBeam", laser,);
//   this.load.image("invader1", invader1,);
//   this.load.image("invader2", invader2,);


}

function create ()
{
    center = {
        x:this.physics.world.bounds.width / 2,
        y:this.physics.world.bounds.height / 2
    }
    
    // scrolling background
    spacefield = this.add.tileSprite(800, 600, 0, 0, "starfield");
    starfield = this.add.tileSprite(800, 600, 0, 0, "bigStars");
    starfield.setScale(0.4)
    smallStarfield = this.add.tileSprite(800, 600, 0, 0, "smallStars");
    smallStarfield.setScale(0.4)
    
    
    
    //    Player spaceship
    player1 = this.physics.add.sprite(center.x, 550, "player1");
    player1.setScale(0.25);
    player1.setBodySize(350, 280)
    player1.setCollideWorldBounds(true);
    player1.setOrigin(0.5, 0.3);
    playerControls = this.input.keyboard.createCursorKeys();
    
}






// create enemy invaders







function update()  {
    
    //  moving Background scroll
    spacefield.tilePositionY -= 8;
    smallStarfield.tilePositionY -= 7;
    starfield.tilePositionY -= 5;
    
    // to move spaceship left and right
    player1.body.velocity.setTo(0, 0);
    if (playerControls.left.isDown)
    {
        player1.body.velocity.x = -200;
    }
    else if (playerControls.right.isDown)
    {
        player1.body.velocity.x = 200;
    }
    
    // to shoot laser from spachip pressing SPACE
    if (playerControls.space.isDown && alreadyClicked === false) {
        alreadyClicked = true;
        laserShot = this.physics.add.sprite(player1.x, player1.y, "laserBeam")
        laserShot.setVelocityY(-300)
        laserShot.setAngle(-90);
        laserShot.setBodySize(30, 30)
    }
    if(playerControls.space.isUp) {
        alreadyClicked = false;
    }
}



// notes below
// animation
// this.load.multiatlas('var', 'filepath', 'folder')

// sound
// spaceSound = this.sound.add('space', {volume: 0.2});







// player1.setFlipX(true); to flip 180deg or setRotation(20)

// animation
    // this.animate.create({
    //     key: 'shield',
    //     frames: [
    //         {key: 'ship', frames: 'img.png'},
    //     ],
    //     framerate:20,
    //     repeat:0,
    // })

    
     

    
    // if (playerControls.up.isDown) {
    //     player1.setVelocity(0, -200);
    //  }

    
