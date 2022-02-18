import background from "../assets/starfield.png";
import bigStars from "../assets/stars1.png";
import smallStars from "../assets/smallStars.png";
import startScreenImg from "../assets/start-screen.png";

let starfield, spacefield, smallStarfield, startImg, center;

export default class StartGameScene extends Phaser.Scene {
  constructor() {
    super({ key: "StartGameScene" });
  }

  preload() {
    this.load.image("starfield", background);
    this.load.image("bigStars", bigStars);
    this.load.image("smallStars", smallStars);
    this.load.image("startScreenImg", startScreenImg);
  }

  create() {
    // scrolling background
    spacefield = this.add.tileSprite(800, 600, 0, 0, "starfield");
    starfield = this.add.tileSprite(800, 600, 0, 0, "bigStars");
    starfield.setScale(0.4);
    starfield.setDepth(1);
    smallStarfield = this.add.tileSprite(800, 600, 0, 0, "smallStars");
    smallStarfield.setScale(0.4);
    smallStarfield.setDepth(1);

    center = {
      x: this.physics.world.bounds.width / 2,
      y: this.physics.world.bounds.height / 2,
    };

    startImg = this.add.sprite(center.x, center.y, "startScreenImg");
    startImg.setScale(0.7);

    this.input.on("pointerup", () => {
      this.scene.stop("StartGameScene");
      this.scene.start("GameScene");
    });
  }
  update() {
    //  moving Background scroll
    spacefield.tilePositionY -= 8;
    smallStarfield.tilePositionY -= 7;
    starfield.tilePositionY -= 5;
  }
}
