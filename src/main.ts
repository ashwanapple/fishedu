import Phaser from "phaser"
import Start from "./scenes/startscreen"
import HomeScene from "./scenes/homescreen"
import GameScene from "./scenes/gamescreen"
import Catalogue from "./scenes/catalogue"
import Quiz from "./scenes/quiz"
import Entry from "./scenes/catalogueentry"

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 1400,
    height: 720,
    parent: "game-container",
    backgroundColor: "#87CEEB",
    scene: [Start, HomeScene, GameScene, Catalogue, Quiz, Entry],
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    }
}

declare const WebFont: any

WebFont.load({
    google: {
        families: ["PT Sans Narrow"]
    },
    active: () => {
        new Phaser.Game(config)
    },
    inactive: () => {
        // font failed to load, start anyway
        new Phaser.Game(config)
    }
})

new Phaser.Game(config)