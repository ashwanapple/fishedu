import Phaser from "phaser"
import Cursor from "../objects/Cursor"


export default class HomeScene extends Phaser.Scene {
    cursor!: Cursor

    constructor() {
        super("home")
    }

    create() {

        this.add.text(330,150,"Ocean Explorer")

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

        this.cursor = new Cursor(this ,300, 400, "cursor")

    }
}