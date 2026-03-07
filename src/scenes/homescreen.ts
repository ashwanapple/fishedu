import Phaser from "phaser"
import Cursor from "../objects/cursor"


export default class HomeScene extends Phaser.Scene {
    cursor!: Cursor

    constructor() {
        super("home")
    }

    preload() {
        this.load.image("cursor", "assets/ui/Banana.png")

    }

    create() {

        this.add.text(330,150,"Ocean Explorer")

        const sunlightButton = this.add.text(160,250,"Sunlight")
            .setInteractive()

        sunlightButton.on("pointerdown", () => {
            this.scene.start("game")
        })

        const twilightButton = this.add.text(260,250,"Twilight")
            .setInteractive()

        twilightButton.on("pointerdown", () => {
            this.scene.start("game")
        })

        const midnightButton = this.add.text(360,250,"Midnight")
            .setInteractive()

        midnightButton.on("pointerdown", () => {
            this.scene.start("game")
        })

        const abyssalButton = this.add.text(460,250,"Abyssal")
            .setInteractive()

        abyssalButton.on("pointerdown", () => {
            this.scene.start("game")
        })

        const trenchesButton = this.add.text(560,250,"Trenches")
            .setInteractive()

        trenchesButton.on("pointerdown", () => {
            this.scene.start("game")
        })
        

        const catalogueButton = this.add.text(330,300,"Catalogue")
            .setInteractive()

        catalogueButton.on("pointerdown", () => {
            this.scene.start("catalogue")
        })

        const quizButton = this.add.text(330, 350, "Quiz")
            .setInteractive()

        quizButton.on("pointerdown", () => {
            this.scene.start("quiz", {level: "surface"})
        })

        this.cursor = new Cursor(this ,300, 400, "cursor")

    }
}