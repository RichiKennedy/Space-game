import Phaser, { AUTO } from "phaser";
import playerImgSrc from "../assets/spaceShip.png";
import background from "../assets/starfield.png";
import bigStars from "../assets/stars1.png";
import smallStars from "../assets/smallStars.png";
import laser from "../assets/LaserSprites/laser3.png";

import heartEmpty from "../assets/heartEmpty.png";
import heartFilled from "../assets/heartFilled.png";
import invader1 from "../assets/73x73.png";
import invader2 from "../assets/90x90.png";


var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,

  physics: {
    default: "arcade",
    arcade: {
      gravity: false,
      debug: false,
    },
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

var game = new Phaser.Game(config);

let heartOutLines = [];
let hearts = [];
let maxHearts = 3;
let vulnerableTime = 1000;



// added invader variable declaration
let player1,
  center,
  playerControls,
  starfield,
  spacefield,
  smallStarfield,
  laserShot,
  invader,
  strongInvader;

let alreadyClicked = false;


function preload() {
  // what assets does the game need
  this.load.image("starfield", background);
  this.load.image("player1", playerImgSrc);
  this.load.image("bigStars", bigStars);
  this.load.image("smallStars", smallStars);
  this.load.image("laserBeam", laser);

  this.load.image("heartEmpty", heartEmpty);
  this.load.image("heartFilled", heartFilled);

  // changed invader1 to invader
  this.load.image("invader", invader1);
  //   this.load.image("invader2", invader2,);
  this.load.image("strongInvader", invader2);
}

function create() {
  center = {
    x: this.physics.world.bounds.width / 2,
    y: this.physics.world.bounds.height / 2,
  };

  // scrolling background
  spacefield = this.add.tileSprite(800, 600, 0, 0, "starfield");
  starfield = this.add.tileSprite(800, 600, 0, 0, "bigStars");
  starfield.setScale(0.4);
  smallStarfield = this.add.tileSprite(800, 600, 0, 0, "smallStars");
  smallStarfield.setScale(0.4);

  //    Player spaceship
  player1 = this.physics.add.sprite(center.x, 550, "player1");
  player1.setScale(0.25);
  player1.setBodySize(350, 280);
  player1.setCollideWorldBounds(true);
  player1.setOrigin(0.5, 0.3);
  playerControls = this.input.keyboard.createCursorKeys();


  //create and set an invulnerable flag for after the player has been hit
  player1.invulnerable = false;
  //set no lives / hearts
  player1.hearts = maxHearts;

  //create three heart outlines...
  var heartOutline1 = this.add.sprite(760, 38, "heartEmpty"),
    heartOutline2 = this.add.sprite(720, 38, "heartEmpty"),
    heartOutline3 = this.add.sprite(680, 38, "heartEmpty");

  //and store in an array for easy access later
  heartOutlines = [heartOutline1, heartOutline2, heartOutline3];

  //create three heart fills...
  heart1 = this.add.sprite(760, 38, "heartFilled");
  heart2 = this.add.sprite(720, 38, "heartFilled");
  heart3 = this.add.sprite(680, 38, "heartFilled");
  //and store in an array for easy access later
  hearts = [heart1, heart2, heart3];
}
  // adding invader and making it move
  // invader = this.physics.add.sprite(center.x, 20, "invader");
  // invader.body.setVelocityY(50);

  // generating a group of invaders and strongInvader
  const invaders = this.physics.add.group();

  const strongInvaders = this.physics.add.group();

  // create a variable to use it as an index for entries array
  let i = 0;

  function generateInvaders() {
    // console.log("i at first", i);
    const xCoordinate = Math.random() * 1500;
    invaders.create(xCoordinate, -30, "invader");
    // console.log("invaders object", invaders);

    // accessing elements of entries' body and giving them velocity
    invaders.children.entries[i].body.setVelocityY(300);
    // increasing index variable to access the next element of array when we run the function again
    i++;
    // console.log("i after", i);
  }
    const generateInvadersLoop = this.time.addEvent({
      delay: 500,
      callback: generateInvaders,
      callbackScope: this,
      loop: true,
    });
  
  // create a variable to use it as an index for entries array
  let x=0;

    function generateStrongInvaders() {
      // console.log("x at first", x);
      const xCoordinate = Math.random() * 1000;
      strongInvaders.create(xCoordinate, -20, "strongInvader");
      // console.log("strongInvader object", strongInvader);
  
      // accessing elements of entries' body and giving them velocity
      strongInvaders.children.entries[x].body.setVelocityY(380);
      // increasing index variable to access the next element of array when we run the function again
      x++;

    // const invadersArray = invaders.children.entries;
    // invadersArray.forEach((invader) => invader.body.setVelocityY(50));
    // console.log("entries are", invaders.children.entries);
  
    }
 
  const generateStrongInvadersLoop = this.time.addEvent({
    delay: 1000,
    callback: generateStrongInvaders,
    callbackScope: this,
    loop: true,
  });
}
  // console.log("entries are", invaders.children.entries);
  // const invadersArray = invaders.children.entries;
  // invadersArray.forEach((invader) => invader.body.setVelocityY(50));



// create enemy invaders

function update() {
  //  moving Background scroll
  spacefield.tilePositionY -= 8;
  smallStarfield.tilePositionY -= 7;
  starfield.tilePositionY -= 5;

  // to move spaceship left and right
  player1.body.velocity.setTo(0, 0);
  if (playerControls.left.isDown) {
    player1.body.velocity.x = -200;
  } else if (playerControls.right.isDown) {
    player1.body.velocity.x = 200;
  }
  else if (playerControls.up.isDown) {
    player1.body.velocity.y = -200;
  } else if (playerControls.down.isDown) {
    player1.body.velocity.y = 200;
  }


  // to shoot laser from spachip pressing SPACE
  if (playerControls.space.isDown && alreadyClicked === false) {
    alreadyClicked = true;
    laserShot = this.physics.add.sprite(player1.x, player1.y, "laserBeam");
    laserShot.setVelocityY(-300);
    laserShot.setAngle(-90);
    laserShot.setBodySize(30, 30);
  }
  if (playerControls.space.isUp) {
    alreadyClicked = false;
  }
}

function hitBaddie(player1, invader1) {
  //baddie was hit on the head and hasn't already been hit
  if (invader1.body.touching.up && !invader1.hit) {
    // set baddie as being hit and remove physics
    invader1.disableBody(false, false);
    player1.setVelocityY(jumpVelocity);

    //play baddies death animation
    var tween = this.tweens.add({
      targets: baddie,
      alpha: 0.3,
      scaleX: 1.5,
      scaleY: 1.5,
      ease: "Linear",
      duration: 200,
      onComplete: function () {
        destroyGameObject(invader1);
      },
    });
  }
  //otherwise you've hit baddie, BUT not on the head. This makes you die
  else {
    //if you are not already invulnerable
    if (!player1.invulnerable) {
      //set player as invulnerable
      player1.invulnerable = true;
      //get the heart sprites from our arrays we set up earlier
      var currentHeartCount = player1.hearts,
        currentHeart = hearts[currentHeartCount - 1],
        currentHeartOutline = heartOutlines[currentHeartCount - 1];

      //fade out the heart fill
      var heartFade = this.tweens.add({
        targets: currentHeart,
        alpha: 0,
        scaleX: 0,
        scaleY: 0,
        ease: "Linear",
        duration: 200,
      });

      //create a timeline of tweens for the heart outline so it shrinks then grows back
      var heartsTimeline = this.tweens.createTimeline();

      //this is the heart outline scaling down
      heartsTimeline.add({
        targets: currentHeartOutline,
        scaleX: 0.5,
        scaleY: 0.5,
        ease: "Power1",
        duration: 200,
      });

      //and then back
      heartsTimeline.add({
        targets: currentHeartOutline,
        scaleX: 1,
        scaleY: 1,
        ease: "Power1",
        duration: 200,
      });
      //play the timeline straight away
      heartsTimeline.play();

      //remove a heart from out count stored on the player object
      player1.hearts -= 1;

      //if hearts is 0 or less you're dead as you are out of lives
      if (player1.hearts <= 0) {
        //remove physics from player
        player1.disableBody(false, false);
        //and play death animation
        var tween = this.tweens.add({
          targets: player1,
          alpha: 0.3,
          scaleX: 1.1,
          scaleY: 1.1,
          angle: 90,
          x: player1.x - 20,
          y: player1.y - 20,
          ease: "Linear",
          duration: 200,
          onComplete: function () {
            restartGame(this);
          },
          onCompleteScope: this,
        });
      }
      //otherwise you're not dead you've just lost a life so...
      else {
        //make the player stop in their tracks and jump up
        player1.body.velocity.x = 0;
        player1.body.velocity.y = -220;
        //tween the players alpha to 30%
        var tween = this.tweens.add({
          targets: player1,
          alpha: 0.3,
          ease: "Linear",
          duration: 200,
          onCompleteScope: this,
        });

        //set a timer for 1 second. When this is up we tween player back to normal and make then vulnerable again
        var timer = this.time.delayedCall(vulnerableTime, playerVulnerable, [
          this,
        ]);
      }
    }
  }
}
function playerVulnerable(game) {
  //tween player back to 100% opacity and reset invulnerability flag
  var death = game.tweens.add({
    targets: player1,
    alpha: 1,
    ease: "Linear",
    duration: 200,
    onComplete: function () {
      player1.invulnerable = false;
    },
    onCompleteScope: this,
  });
}



// TODO create a second group of invaders with different velocity and time delay

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


// Maybe delete invaders when they out of bounds

