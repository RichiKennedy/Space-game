import playerImgSrc from "../assets/spaceShip.png";
import background from "../assets/starfield.png";
import bigStars from "../assets/stars1.png";
import smallStars from "../assets/smallStars.png";
import laser from "../assets/LaserSprites/laser3.png";

import invader1 from "../assets/73x73.png";
import invader2 from "../assets/90x90.png";

import healthbar1 from "../assets/health1.png";
import healthbar2 from "../assets/health2.png";
import healthbar3 from "../assets/health3.png";
import enemyBullets from "../assets/LaserSprites/enemyLaser.png";

// let vulnerableTime = 1000;

// added invader variable declaration
let player1,
  center,
  playerControls,
  starfield,
  spacefield,
  smallStarfield,
  laserShot,
  lifeBar1,
  lifeBar2,
  lifeBar3;
// invader,
// strongInvader;

let alreadyClicked = false;
let healthCounter = 3;
// laserShot.setDepth(3);

export default class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: "GameScene" });
  }

  preload() {
    console.log("dfgdfgs");
    // what assets does the game need
    this.load.image("starfield", background);
    this.load.image("player1", playerImgSrc);
    this.load.image("bigStars", bigStars);
    this.load.image("smallStars", smallStars);
    this.load.image("laserBeam", laser);
    this.load.image("healthbar1", healthbar1);
    this.load.image("healthbar2", healthbar2);
    this.load.image("healthbar3", healthbar3);

    // changed invader1 to invader
    this.load.image("invader", invader1);
    //   this.load.image("invader2", invader2,);
    this.load.image("strongInvader", invader2);
    this.load.image("enemyLaser", enemyBullets);
  }

  create() {
    center = {
      x: this.physics.world.bounds.width / 2,
      y: this.physics.world.bounds.height / 2,
    };

    // scrolling background
    spacefield = this.add.tileSprite(800, 600, 0, 0, "starfield");
    starfield = this.add.tileSprite(800, 600, 0, 0, "bigStars");
    starfield.setScale(0.4);
    starfield.setDepth(1);
    smallStarfield = this.add.tileSprite(800, 600, 0, 0, "smallStars");
    smallStarfield.setScale(0.4);
    smallStarfield.setDepth(1);

    lifeBar1 = this.add.image(700, 50, "healthbar1").setVisible(false);
    lifeBar2 = this.add.image(700, 50, "healthbar2").setVisible(false);
    lifeBar3 = this.add.image(700, 50, "healthbar3").setVisible(false);

    //    Player spaceship
    player1 = this.physics.add.sprite(center.x, 550, "player1");
    player1.setScale(0.25);
    player1.setBodySize(350, 280);
    player1.setCollideWorldBounds(true);
    player1.setOrigin(0.5, 0.3);
    player1.setDepth(3);
    console.log(player1);
    playerControls = this.input.keyboard.createCursorKeys();

    //create and set an invulnerable flag for after the player has been hit
    // player1.invulnerable = false;

    // adding invader and making it move
    // invader = this.physics.add.sprite(center.x, 20, "invader");
    // invader.body.setVelocityY(50);

    // generating a group of invaders and strongInvader
    this.invaders = this.physics.add.group();

    const strongInvaders = this.physics.add.group();

    // create a variable to use it as an index for entries array
    let i = 0;

    function generateInvaders() {
      // console.log("invaders are", invaders);

      // console.log("i at first", i);
      const xCoordinate = Math.random() * 750;
      this.invaders.create(xCoordinate, -30, "invader");
      // this.invaders.children.entries[i].setDepth(3);
      this.invaders.setDepth(3);
      // console.log(invaders.children.entries[i]);

      // console.log("invaders object", invaders);

      // accessing elements of entries' body and giving them velocity
      // this.invaders.children.entries[i].body.setVelocityY(300);
      this.invaders.setVelocityY(300);
      // increasing index variable to access the next element of array when we run the function again
      i++;
      // console.log("i after", i);
    }
    const generateInvadersLoop = this.time.addEvent({
      delay: 1500,
      callback: generateInvaders,
      callbackScope: this,
      loop: true,
    });

    // create a variable to use it as an index for entries array
    let x = 0;

    function generateStrongInvaders() {
      // console.log("x at first", x);
      const xCoordinate = Math.random() * 750;
      strongInvaders.create(xCoordinate, -20, "strongInvader");
      // console.log("strongInvader object", strongInvader);

      // accessing elements of entries' body and giving them velocity

      strongInvaders.children.entries[x].body.setVelocityY(150);
      let strongInvader = strongInvaders.children.entries[x];
      strongInvader.setDepth(3);
      let position = strongInvader.body.center;
      // adding enemy laser to invaders
      let enemyShoot = this.physics.add.sprite(
        position.x,
        position.y,
        "enemyLaser"
      );
      enemyShoot.setAngle(90).setVelocityY(420).setScale(0.3);
      enemyShoot.setDepth(3);

      // increasing index variable to access the next element of array when we run the function again
      x++;

      // const invadersArray = invaders.children.entries;
      // invadersArray.forEach((invader) => invader.body.setVelocityY(50));
      // console.log("entries are", invaders.children.entries);
    }

    const generateStrongInvadersLoop = this.time.addEvent({
      delay: 4000,
      callback: generateStrongInvaders,
      callbackScope: this,
      loop: true,
    });
  }

  update() {
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
    } else if (playerControls.up.isDown) {
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
    this.physics.add.overlap(
      player1,
      this.invaders,
      function (player1, invader1) {
        console.log("one invader is", invader1);
        this.invaders.killAndHide(invader1);
        this.invaders.remove(invader1);
        this.checkHealth();
        healthCounter--;
        this.tweens.add({
          targets: player1,
          alpha: 0,
          duration: 100,
          repeat: 3,
          yoyo: true,
          callbackScope: this,
          onComplete: function () {},
        });
      },
      null,
      this
    );
    // this.checkHealth();
    //   if (this.player1.y > game.config.height) {
    //     this.gameover();
    //   }
  }

  checkHealth() {
    switch (healthCounter) {
      case 3:
        lifeBar3.visible = true;
        break;
      case 2:
        lifeBar3.visible = false;
        lifeBar2.visible = true;
        break;
      case 1:
        lifeBar3.visible = false;
        lifeBar2.visible = false;
        lifeBar1.visible = true;
        break;
      // case 0:
      //   this.gameover();
      //   break;
    }
  }
}

// console.log("entries are", invaders.children.entries);
// const invadersArray = invaders.children.entries;
// invadersArray.forEach((invader) => invader.body.setVelocityY(50));

// create enemy invaders

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
