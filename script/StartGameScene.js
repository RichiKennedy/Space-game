export default class StartGameScene extends Phaser.Scene {
    constructor() {
      super({ key: "StartGameScene" });
    }
    create() {
        this.add.text(95, 250, "Click to Start!", { fontSize: "30px", fill: "#000000" , fontFamily: "Press Start 2P"});
        this.input.on("pointerup", () => {
         
        this.scene.stop("StartGameScene")
        this.scene.start("GameScene")
        });
    }
}

