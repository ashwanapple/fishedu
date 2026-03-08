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
        // Read unlocked levels from registry (persists across scene restarts)
        const unlockedLevels: Record<string, boolean> = {
            sunlight: true,
            twilight: this.registry.get("unlocked_twilight") ?? false,
            midnight: this.registry.get("unlocked_midnight") ?? false,
            abyssal: this.registry.get("unlocked_abyssal") ?? false,
            trenches: this.registry.get("unlocked_trenches") ?? false,
        }

        this.add.text(330, 150, "Ocean Explorer")

        // Zone buttons
        const zones = ["sunlight", "twilight", "midnight", "abyssal", "trenches"]
        const zoneXPositions = [160, 260, 360, 460, 560]

        zones.forEach((zone, i) => {
            const isUnlocked = unlockedLevels[zone] ?? false
            this.add.text(zoneXPositions[i]!, 250, zone.charAt(0).toUpperCase() + zone.slice(1), {color: isUnlocked ? "#FFFFFF" : "#888888"})
                .setInteractive({ useHandCursor: isUnlocked})
                .on("pointerdown", () => {
                    if (isUnlocked) this.scene.start("game", { current_zone: zone })
                })
        })

        // Catalogue button
        this.add.text(330, 300, "Catalogue")
            .setInteractive()
            .on("pointerdown", () => {
                this.scene.start("catalogue")
            })

        // Cursor
        this.cursor = new Cursor(this, 300, 475, "cursor")

        // Quiz buttons
        const quizLevels = [
            { label: "Sunlight Quiz", level: "sunlight", y: 350 },
            { label: "Twilight Quiz", level: "twilight", y: 375 },
            { label: "Midnight Quiz", level: "midnight", y: 400 },
            { label: "Abyssal Quiz", level: "abyssal", y: 425 },
            { label: "Trenches Quiz", level: "trenches", y: 450 },
        ]

        quizLevels.forEach(({ label, level, y }) => {
            const isUnlocked = unlockedLevels[level] ?? false
            const btn = this.add.text(330, y, label, {
                fontSize: "20px",
                color: isUnlocked ? "#ffffff" : "#888888"
            }).setInteractive({ useHandCursor: isUnlocked })

            btn.on("pointerdown", () => {
                if (isUnlocked) this.scene.start("quiz", { level })
            })
        })
    }
}