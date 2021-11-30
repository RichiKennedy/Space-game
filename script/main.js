import Phaser, { AUTO } from "phaser";
import GameScene from "./GameScene";
import StartGameScene from "./StartGameScene";

const config = {
    type : Phaser.AUTO,
    width: 800,
    height: 600,
physics:{
    default:"arcade",
    arcade:{
        debug:true,
        gravity: false,
    },
},
scene :[StartGameScene, GameScene],
};

var game = new Phaser.Game(config);

