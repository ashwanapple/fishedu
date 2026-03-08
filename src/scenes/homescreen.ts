import Phaser from "phaser"
import Cursor from "../objects/cursor"

export default class HomeScene extends Phaser.Scene {
    cursor!: Cursor

    constructor() {
        super("home")
    }

    preload() {
        this.load.image("cursor", "assets/ui/Banana.png")
        this.load.image("home", "assets/ui/home.png")
        this.load.image("diary", "assets/ui/diarybook.png")
        this.load.image("homebanner", "assets/ui/homebanner.png")

        this.load.image("quizComplete", "assets/ui/quizComplete.png")
        this.load.image("quizUnlocked", "assets/ui/quizUnlocked.png")
        this.load.image("quizLocked", "assets/ui/quizLocked.png")

        this.load.image("sunlightzone", "assets/ui/sunlightzone.png")
        this.load.image("twilightzone", "assets/ui/twilightzone.png")
        this.load.image("midnightzone", "assets/ui/midnightzone.png")
        this.load.image("abyssalzone", "assets/ui/abysszone.png")
        this.load.image("trencheszone", "assets/ui/trencheszone.png")
    }

    create() {

        const X = this.scale.width
        const Y = this.scale.height
        this.add.image(0, 0, "home").setOrigin(0, 0).setDisplaySize(X, Y)

        const backToStartButton = this.add.image(X * 3.75 / 24, 60, "homebanner")
            .setScale(0.25)
            .setInteractive()
            .setDepth(5)

        backToStartButton.on("pointerdown", () => {
            this.scene.start("start")
        })

        backToStartButton.on("pointerover", () => backToStartButton.setScale(0.28))
        backToStartButton.on("pointerout", () => backToStartButton.setScale(0.25))

        // Read unlocked levels from registry (persists across scene restarts)
        const unlockedLevels: Record<string, boolean> = {
            sunlight: true,
            twilight: this.registry.get("unlocked_twilight") ?? false,
            midnight: this.registry.get("unlocked_midnight") ?? false,
            abyssal: this.registry.get("unlocked_abyssal") ?? false,
            trenches: this.registry.get("unlocked_trenches") ?? false,
        }

        // Zone buttons
        const zones = [
            { level: "sunlight", x: X * 4.45 / 24, y: Y * 5.5 / 15 },
            { level: "twilight", x: X * 4.45 / 24, y: Y * 7.5 / 15 },
            { level: "midnight", x: X * 4.45 / 24, y: Y * 9.5 / 15 },
            { level: "abyssal", x: X * 4.45 / 24, y: Y * 11.5 / 15 },
            { level: "trenches", x: X * 4.45 / 24, y: Y * 13.5 / 15 },
        ]

        zones.forEach(({ level, x, y }) => {
            const isUnlocked = unlockedLevels[level] ?? false

            const btn = this.add.image(x, y, `${level}zone`)
                .setScale(0.5)
                .setInteractive({ useHandCursor: isUnlocked })
                .setAlpha(isUnlocked ? 1 : 0.4)

            btn.on("pointerdown", () => {
                if (isUnlocked) this.scene.start("game", { current_zone: level })
            })

            btn.on("pointerover", () => { if (isUnlocked) btn.setScale(0.55) })
            btn.on("pointerout", () => btn.setScale(0.5))
        })

        // Catalogue button
        const catalogueButton = this.add.image(X * 20 / 24, Y * 5 / 15, "diary")
            .setScale(0.52)
            .setInteractive()
            .setDepth(5)

        catalogueButton.on("pointerdown", () => {
            this.scene.start("catalogue", {previousScene: "home"})
        })

        catalogueButton.on("pointerover", () => catalogueButton.setScale(0.57))
        catalogueButton.on("pointerout", () => catalogueButton.setScale(0.52))

        // Cursor
        this.cursor = new Cursor(this, 300, 475, "cursor")

        // Quiz buttons
        const quizLevels = [
            { label: "Sunlight Quiz", level: "sunlight", x: X * 8.5 / 24, y: Y * 5.5 / 15 },
            { label: "Twilight Quiz", level: "twilight", x: X * 8.5 / 24, y: Y * 7.5 / 15 },
            { label: "Midnight Quiz", level: "midnight", x: X * 8.5 / 24, y: Y * 9.5 / 15 },
            { label: "Abyssal Quiz", level: "abyssal", x: X * 8.5 / 24, y: Y * 11.5 / 15 },
            { label: "Trenches Quiz", level: "trenches", x: X * 8.5 / 24, y: Y * 13.5 / 15 },
        ]

        quizLevels.forEach(({ label, level, x, y }) => {
            const isUnlocked = unlockedLevels[level] ?? false
            const isCompleted = this.registry.get(`completed_${level}`) ?? false

            const imageKey = isCompleted ? "quizComplete" : isUnlocked ? "quizUnlocked" : "quizLocked"

            const btn = this.add.image(x, y, imageKey)
                .setScale(0.5)
                .setInteractive({ useHandCursor: isUnlocked })

            btn.on("pointerdown", () => {
                if (isUnlocked) this.scene.start("quiz", { level })
            })

            btn.on("pointerover", () => { if (isUnlocked) btn.setScale(0.55) })
            btn.on("pointerout", () => btn.setScale(0.5))
        })
    }
}