import playerImgSrc from "../assets/spaceShip.png";
import background from "../assets/starfield.png";
import bigStars from "../assets/stars1.png";
import smallStars from "../assets/smallStars.png";
import laser from "../assets/LaserSprites/laser3.png";

import invader1 from "../assets/73x73.png";
import invader2 from "../assets/90x90.png";
import boss from "../assets/PH.png";

import healthbar1 from "../assets/health1.png";
import healthbar2 from "../assets/health2.png";
import healthbar3 from "../assets/health3.png";
import enemyBullets from "../assets/LaserSprites/enemyLaser.png";

import playerBullets from "../assets/mp3/laserSound1.mp3";
import enemyGunSound from "../assets/mp3/laser.mp3";
import backgroundmusic from "../assets/mp3/background.mp3";
import backgroundd from "../assets/NebulaRed.png";
import explosion from "../assets/mp3/explosion.mp3";

// var config = {
//   type: Phaser.AUTO,
//   width: 800,
//   height: 600,

//   physics: {
//     default: "arcade",
//     arcade: {
//       gravity: false,
//       debug: false,
//     },
//   },
//   scene: [GameScene],
// };
// scoreboard variable
let score = 0;
let scoreBoard;

let isOverlapping = false;

let overlapCollider;

// let vulnerableTime = 1000;

// added invader variable declaration
let player1,
  center,
  playerControls,
  starfield,
  spacefield,
  smallStarfield,
  laserShot,
  playerSound,
  enemySound,
  lifeBar1,
  lifeBar2,
  backgroundSound,
  bossLevel,
  lifeBar3,
  explosionMusic,
  spacefieldd,
  cam;

// xposition = 0;
// changeVariable = 1;

// invader,
// strongInvader;

let alreadyClicked = false;
let healthCounter = 3;

export default class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: "GameScene" });
  }

  preload() {
    // console.log("dfgdfgs");
    // what assets does the game need
    this.load.image("starfield", background);
    this.load.image("starfieldd", backgroundd);
    this.load.image("player1", playerImgSrc);
    this.load.image("bigStars", bigStars);
    this.load.image("smallStars", smallStars);
    this.load.image("laserBeam", laser);
    this.load.image("healthbar1", healthbar1);
    this.load.image("healthbar2", healthbar2);
    this.load.image("healthbar3", healthbar3);
    this.load.image("bossLevel", boss);

    // changed invader1 to invader
    this.load.image("invader", invader1);
    //   this.load.image("invader2", invader2,);
    this.load.image("strongInvader", invader2);
    this.load.image("enemyLaser", enemyBullets);
    this.load.audio("playerLaser", playerBullets);
    this.load.audio("enemySound", enemyGunSound);
    this.load.audio("backgroundMusic", backgroundmusic);
    this.load.audio("explosionMusic", explosion);
  }

  create() {
    // center variable
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

    lifeBar1 = this.add.image(700, 30, "healthbar1").setVisible(false);
    lifeBar2 = this.add.image(700, 30, "healthbar2").setVisible(false);
    lifeBar3 = this.add.image(720, 30, "healthbar3").setVisible(false);

    //    Player spaceship
    player1 = this.physics.add.sprite(center.x, 550, "player1");
    player1.setScale(0.25);
    player1.setBodySize(350, 280);
    player1.setCollideWorldBounds(true);
    player1.setOrigin(0.5, 0.3);
    player1.setDepth(3);
    // console.log(player1);
    playerControls = this.input.keyboard.createCursorKeys();

    // bossLevel = this.physics.add.sprite(center.x, -160, "bossLevel");

    // bossLevel.setScale(1);
    // bossLevel.setDepth(10);

    // if (xposition == 100 || xposition == -100) changeVariable * -1;
    // xposition += changeVariable;

    //create and set an invulnerable flag for after the player has been hit
    // player1.invulnerable = false;

    // adding invader and making it move
    // invader = this.physics.add.sprite(center.x, 20, "invader");
    // invader.body.setVelocityY(50);

    // generating a group of invaders and strongInvader
    this.invaders = this.physics.add.group();

    this.strongInvaders = this.physics.add.group();

    // create a variable to use it as an index for entries array

    // let i = 0;

    // function sendInBoss() {}

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
      // i++;
      // console.log("i after", i);
    }
    const generateInvadersLoop = this.time.addEvent({
      delay: 1500,
      callback: generateInvaders,
      callbackScope: this,
      loop: true,
    });

    // create a variable to use it as an index for entries array
    // let x = 0;

    function generateStrongInvaders() {
      // console.log("x at first", x);
      const xCoordinate = Math.random() * 750;
      this.strongInvaders.create(xCoordinate, -20, "strongInvader");
      // console.log("strongInvader object", strongInvader);
      this.strongInvaders.setDepth(3);

      // accessing elements of entries' body and giving them velocity

      // adding enemy laser to invaders
      // strongInvaders.children.entries[x].body.setVelocityY(150);
      this.strongInvaders.setVelocityY(250);

      let position = this.strongInvaders;
      // let position = this.strongInvaders.body.center;
      // strongInvaders.body.setPosition(240, 180);
      this.enemyShoot = this.physics.add.sprite(xCoordinate, -20, "enemyLaser");
      // let enemyShoot = this.physics.add.sprite(
      //   position.x,
      //   position.y,
      //   "enemyLaser"
      // );

      this.enemyShoot
        .setAngle(90)
        .setVelocityY(620)
        .setScale(0.4)
        .setBodySize(30, 120);
      enemySound.play();

      this.enemyShoot.setDepth(3);

      // increasing index variable to access the next element of array when we run the function again
      // x++;

      // const invadersArray = invaders.children.entries;
      // invadersArray.forEach((invader) => invader.body.setVelocityY(50));
      // console.log("entries are", invaders.children.entries);
    }

    const generateStrongInvadersLoop = this.time.addEvent({
      delay: 3000,
      callback: generateStrongInvaders,
      callbackScope: this,
      loop: true,
    });
    cam = this.cameras.main.setBounds(0, 0, 600, 650);
    function shake() {
      cam.shake(500, 0.03);
    }

    // scoreboard
    scoreBoard = this.add.text(10, 10, `Score: ${score}`, {
      fontSize: "32px",
      fill: "#fff",
    });

    //ALL SOUNDS
    playerSound = this.sound.add("playerLaser", { volume: 0.2 });
    enemySound = this.sound.add("enemySound", { volume: 0.7 });
    backgroundSound = this.sound.add("backgroundMusic", { volume: 0.2 });

    explosionMusic = this.sound.add("explosionMusic", { volume: 0.2 });

    backgroundSound.loop = true;

    backgroundSound.play();
  }

  updateScore() {
    score++;
    scoreBoard.setText(`Score: ${score}`);
  }
  updateJScore() {
    score += 5;
    scoreBoard.setText(`Score: ${score}`);
  }

  update() {
    this.checkHealth();

    function shake() {
      cam.shake(500, 0.03);
    }

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
      playerSound.play();
      alreadyClicked = true;
      this.laserShot = this.physics.add.sprite(
        player1.x,
        player1.y,
        "laserBeam"
      );
      this.laserShot.setVelocityY(-300);
      this.laserShot.setAngle(-90);
      this.laserShot.setBodySize(30, 30);

    }
    if (playerControls.space.isUp) {
      alreadyClicked = false;
    }

    function shake() {
      cam.shake(500, 0.03);
    }

    this.physics.add.collider(player1, this.enemyShoot, (player, laser) => {
      laser.destroy();
      shake();
      this.checkHealth();
      healthCounter--;
      this.tweens.add({
        targets: player1,
        alpha: 0,
        duration: 100,
        repeat: 1,
        yoyo: true,
        callbackScope: this,
        onComplete: function () {},
      });
    });

    // player laser kill invader
    this.physics.add.collider(
      this.invaders,
      this.laserShot,
      (invader, laser) => {
        invader.destroy();
        laser.destroy();
        explosionMusic.play();
        this.updateScore();

        this.tweens.add({
          targets: invader,
          alpha: 0,
          duration: 100,
          repeat: 1,
          yoyo: true,
          callbackScope: this,
          onComplete: function () {},
        });
      }
    );

    // player laser kill joseph
    this.physics.add.collider(
      this.strongInvaders,
      this.laserShot,
      (joseph, laser) => {
        joseph.destroy();
        laser.destroy();
        this.updateJScore();

        this.tweens.add({
          targets: joseph,
          alpha: 0,
          duration: 100,
          repeat: 1,
          yoyo: true,
          callbackScope: this,
          onComplete: function () {},
        });
      }
    );

    this.physics.add.overlap(
      player1,

      this.strongInvaders,
      function (player, strongInvader) {
        console.log("one invader is", invader1);
        this.strongInvaders.killAndHide(strongInvader);
        this.strongInvaders.remove(strongInvader);

        this.checkHealth();
        healthCounter--;
        this.tweens.add({
          targets: player,
          alpha: 0,
          duration: 100,
          repeat: 1,
          yoyo: true,
          callbackScope: this,
          onComplete: function () {},
        });
      },
      null,
      this
    );
    this.physics.add.overlap(
      player1,
      this.invaders,
      function (player, invader) {
        console.log("one invader is", invader);
        this.invaders.killAndHide(invader);
        this.invaders.remove(invader);
        this.checkHealth();
        healthCounter--;
        // this.updateScore();
        this.tweens.add({
          targets: player,
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

    if (score >= 25) {
      console.log("boss level");
      this.bossLevelStart();
    }

    // //  level up

    // //  level up 2
    // if (score > 20) {
    //   this.invaders.setVelocityY(550);
    //   this.strongInvaders.setVelocityY(550);
    //   this.enemyShoot.setVelocityY(820);
    // }

    // this.checkHealth();
    //   if (this.player1.y > game.config.height) {
    //     this.gameover();
    //   }
  }

  bossLevelStart() {
    this.finalScore = score;
    this.finalLives = healthCounter;
    score = 0;
    healthCounter = 3;

    // console.log("final score in game scene", this.finalScore)
    this.scoreBoard = scoreBoard;
    // this.healthCounter = healthCounter;
    this.scene.start("BossLevel", {
      score: this.finalScore,
      scoreBoard: this.scoreBoard,
      healthCounter: this.finalLives,
      backgroundmusic: backgroundSound,
    });
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
      case 0:
        console.log("dead");
        this.gameover();
        break;
    }
  }

  gameover() {
    // this.finalScore = score;
    // this.scoreBoard = scoreBoard;
    score = 0;
    healthCounter = 3;
    // healthCounter = 3;
    console.log("inside gameover");
    // overlapTriggered = false;
    this.scene.start("EndGameScene", {
      backgroundmusic: backgroundSound,
      // score: this.finalScore,
      // scoreBoard: this.scoreBoard,
      center: this.center,

      // fullScreen: this.fullScreen,
      // background: this.background,
      // frames: this.framesEnd,
      // key: this.backgroundKey,
    });
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
