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

        // QUIZ BUTTONS
        const quizSurface = this.add.text(330, 350, "Surface")
            .setInteractive()

        quizSurface.on("pointerdown", () => {
            this.scene.start("quiz", {level: "surface"})
        })

        const quizTwilight = this.add.text(330, 375, "Twilight")
            .setInteractive()

        quizTwilight.on("pointerdown", () => {
            this.scene.start("quiz", {level: "twilight"})
        })

        const quizMidnight = this.add.text(330, 400, "Midnight")
            .setInteractive()

        quizMidnight.on("pointerdown", () => {
            this.scene.start("quiz", {level: "midnight"})
        })

        const quizAbyssal = this.add.text(330, 425, "Abyssal")
            .setInteractive()

        quizAbyssal.on("pointerdown", () => {
            this.scene.start("quiz", {level: "abyssal"})
        })

        const quizTrenches = this.add.text(330, 450, "Trenches")
            .setInteractive()

        quizTrenches.on("pointerdown", () => {
            this.scene.start("quiz", {level: "trenches"})
        })
        
        this.cursor = new Cursor(this, 300, 475, "cursor")

    }
}