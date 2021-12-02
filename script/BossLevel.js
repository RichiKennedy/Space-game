import backgroundd from "../assets/NebulaRed.png";
import bigStars from "../assets/stars1.png";
import smallStars from "../assets/smallStars.png";
import playerImgSrc from "../assets/spaceShip.png";
import Laser1 from "../assets/LaserSprites/playerLaserBoss.png";
import playerBullets1 from "../assets/mp3/laserSound1.mp3";
//   declare variables
let center,
  spacefieldd,
  starfield,
  player1,
  smallStarfield,
  playerControls,
  playerSound1,
  laserS1;

let alreadyClicked = false;

export default class BossLevel extends Phaser.Scene {
  constructor() {
    super({ key: "BossLevel" });
  }

  preload() {
    this.load.image("starfieldd", backgroundd);
    this.load.image("player1", playerImgSrc);
    this.load.image("bigStars", bigStars);
    this.load.image("smallStars", smallStars);
    this.load.image("laserS1", Laser1);
    this.load.audio("playerSound1", playerBullets1);
  }

  create() {
    // center variable
    center = {
      x: this.physics.world.bounds.width / 2,
      y: this.physics.world.bounds.height / 2,
    };

    // scrolling background
    spacefieldd = this.add.tileSprite(800, 600, 0, 0, "starfieldd");
    starfield = this.add.tileSprite(800, 600, 0, 0, "bigStars");
    starfield.setScale(0.4);
    starfield.setDepth(1);
    smallStarfield = this.add.tileSprite(800, 600, 0, 0, "smallStars");
    smallStarfield.setScale(0.4);
    smallStarfield.setDepth(1);

    //    Player spaceship
    player1 = this.physics.add.sprite(center.x, 550, "player1");
    player1.setScale(0.25);
    player1.setBodySize(350, 280);
    player1.setCollideWorldBounds(true);
    player1.setOrigin(0.5, 0.3);
    player1.setDepth(3);
    // console.log(player1);
    playerControls = this.input.keyboard.createCursorKeys();

    // sounds
    playerSound1 = this.sound.add("playerLaser", { volume: 0.2 });
  }

  update() {
    //  moving Background scroll
    spacefieldd.tilePositionY -= 8;
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
      playerSound1.play();
      alreadyClicked = true;
      this.laserS1 = this.physics.add.sprite(player1.x, player1.y, "laserS1");
      this.laserS1.setVelocityY(-300);
      this.laserS1.setAngle(-90);
      this.laserS1.setBodySize(30, 30);
    }
    if (playerControls.space.isUp) {
      alreadyClicked = false;
    }
  }
}
