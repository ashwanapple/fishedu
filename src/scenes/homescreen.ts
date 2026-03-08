import Phaser from "phaser"
import Cursor from "../objects/cursor"

export default class HomeScene extends Phaser.Scene {
    unlockedLevels: Record<string, boolean> = {
            sunlight: true,
            twilight: false,
            midnight: false,
            abyssal: false,
            trenches: false
        }
    cursor!: Cursor

    constructor() {
        super("home")
    }

    preload() {
        this.load.image("cursor", "assets/ui/Banana.png")

    }

    create() {

        this.add.text(330, 150, "Ocean Explorer")

        //zone buttons
        const sunlightButton = this.add.text(160, 250, "Sunlight")
            .setInteractive()

        sunlightButton.on("pointerdown", () => {
            this.scene.start("game", { current_zone: "sunlight" })
        })

        const twilightButton = this.add.text(260, 250, "Twilight")
            .setInteractive()

        twilightButton.on("pointerdown", () => {
            this.scene.start("game", { current_zone: "twilight" })
        })

        const midnightButton = this.add.text(360, 250, "Midnight")
            .setInteractive()

        midnightButton.on("pointerdown", () => {
            this.scene.start("game", { current_zone: "midnight" })
        })

        const abyssalButton = this.add.text(460, 250, "Abyssal")
            .setInteractive()

        abyssalButton.on("pointerdown", () => {
            this.scene.start("game", { current_zone: "abyssal" })
        })

        const trenchesButton = this.add.text(560, 250, "Trenches")
            .setInteractive()

        trenchesButton.on("pointerdown", () => {
            this.scene.start("game", { current_zone: "trenches" })
        })

        //catelogue button
        const catalogueButton = this.add.text(330, 300, "Catalogue")
            .setInteractive()

        catalogueButton.on("pointerdown", () => {
            this.scene.start("catalogue", {previousScene: "home"})
        })


        // CURSOR
        this.cursor = new Cursor(this, 300, 475, "cursor")

        // QUIZ BUTTONS
        const addQuizButton = (x: number, y: number, label: string, level: string) => {
            const isUnlocked = this.unlockedLevels[level] ?? false
            const btn = this.add.text(x, y, label, { fontSize: "20px", color: isUnlocked ? "#FFFFFF" : "#888888" })
                .setInteractive({ useHandCursor: isUnlocked })

            btn.on("pointerdown", () => {
                if (isUnlocked) this.scene.start("quiz", { level })
            })

            return btn
        }

        addQuizButton(330, 350, "Sunlight Quiz", "sunlight")
        addQuizButton(330, 375, "Twilight Quiz", "twilight")
        addQuizButton(330, 400, "Midnight Quiz", "midnight")
        addQuizButton(330, 425, "Abyssal Quiz", "abyssal")
        addQuizButton(330, 450, "Trenches Quiz", "trenches")

    }


}