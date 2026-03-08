import Phaser from "phaser"

import HomeScene from "./scenes/homescreen"
import GameScene from "./scenes/gamescreen"
import CatalogueScene from "./scenes/catalogue"
import Quiz from "./scenes/quiz"

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    parent: "game-container",
    backgroundColor: "#87CEEB",
    scene: [HomeScene, GameScene, CatalogueScene, Quiz],
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    }
}

new Phaser.Game(config)