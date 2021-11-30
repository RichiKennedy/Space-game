export default class StartGameScene extends Phaser.Scene {

    constructor() {
      super({ key: "StartGameScene" });
    }
    create() {


        this.add.text(300, 250, "Click to Start!", {
            fontSize: "40px",
            fill: "#FFFFFF",
            fontFamily: "Arial"
            // fontFamily: `Press Start 2P`, cursive,
            // align:`center`
        });

        this.input.on("pointerup", () => {
         
        this.scene.stop("StartGameScene")
        this.scene.start("GameScene")
        });
    }
    update(){

    }
}