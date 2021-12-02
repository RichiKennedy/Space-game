import background from "../assets/starfield.png";
import bigStars from "../assets/stars1.png";
import smallStars from "../assets/smallStars.png";
import endScreenImg from "../assets/end-screen.png";

let starfield, spacefield, smallStarfield, endImg, center;

export default class EndGameScene extends Phaser.Scene {
  constructor() {
    super({ key: "EndGameScene" });
  }

  init(data) {
    this.backgroundmusic = data.backgroundmusic;
  }

  preload() {
    this.load.image("starfield", background);
    this.load.image("bigStars", bigStars);
    this.load.image("smallStars", smallStars);
    this.load.image("endScreenImg", endScreenImg);
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

    endImg = this.add.sprite(center.x, center.y, "endScreenImg");
    endImg.setScale(0.7);

    this.input.on("pointerup", () => {
      this.scene.stop("GameScene");
      this.backgroundmusic.stop();
      this.scene.start("StartGameScene");
    });
  }

  update() {
    //  moving Background scroll
    spacefield.tilePositionY -= 8;
    smallStarfield.tilePositionY -= 7;
    starfield.tilePositionY -= 5;
  }
}
