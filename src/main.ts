import Phaser from "phaser"

import HomeScene from "./scenes/homescreen"
import GameScene from "./scenes/gamescreen"
import CatalogueScene from "./scenes/catalogue"

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: "#87CEEB",
    scene: [HomeScene, GameScene, CatalogueScene]
}

new Phaser.Game(config)