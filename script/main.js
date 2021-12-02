import Phaser, { AUTO } from "phaser";
import GameScene from "./GameScene";
import StartGameScene from "./StartGameScene";
import EndGameScene from "./EndGameScene";
import BossLevel from "./BossLevel";

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      debug: true,
      gravity: false,
    },
  },
  scene: [StartGameScene, GameScene, BossLevel, EndGameScene],
};

var game = new Phaser.Game(config);
