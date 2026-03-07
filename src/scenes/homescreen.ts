import Phaser from "phaser"

export default class HomeScene extends Phaser.Scene {

    constructor() {
        super("home")
    }

    create() {

        this.add.text(330,150,"Fish Catcher")

        const playButton = this.add.text(360,250,"Play")
            .setInteractive()

        playButton.on("pointerdown", () => {
            this.scene.start("game")
        })

        const catalogueButton = this.add.text(330,300,"Catalogue")
            .setInteractive()

        catalogueButton.on("pointerdown", () => {
            this.scene.start("catalogue")
        })

    }
}