export default class EndGameScene extends Phaser.Scene {
  constructor() {
    super({ key: "EndGameScene" });
  }

  create() {
    this.add.text(300, 250, "Game over! Click to restart", {
      fontSize: "30px",
      fill: "#FFFFFF",
      fontFamily: "Arial",
    });

    this.input.on("pointerup", () => {
      this.scene.stop("GameScene");
      this.scene.start("StartGameScene");
    });
  }
  update() {}
}
