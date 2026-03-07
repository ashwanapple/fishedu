import Phaser from "phaser"

import HomeScene from "./scenes/HomeScreen"
import GameScene from "./scenes/GameScreen"
import CatalogueScene from "./scenes/Catalogue"

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: "#87CEEB",
    scene: [HomeScene, GameScene, CatalogueScene]
}

new Phaser.Game(config)