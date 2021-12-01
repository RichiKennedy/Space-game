import Phaser, { AUTO } from "phaser";
import GameScene from "./GameScene";
import StartGameScene from "./StartGameScene";
import EndGameScene from "./EndGameScene";

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
      gravity: false,
    },
  },
  scene: [StartGameScene, GameScene, EndGameScene],
};

var game = new Phaser.Game(config);
