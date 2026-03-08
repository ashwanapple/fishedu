import Phaser from "phaser"
import fishData from "../data/fishData.json"

export default class CatalogueEntry extends Phaser.Scene {
    fishId: string = ""
    previousScene: string = "catalogue"
    currentZone?: string

    constructor() {
        super("entry")
    }

    init(data: { fishId?: string; previousScene?: string; current_zone?: string }) {
        if (data.fishId) {
            this.fishId = data.fishId
        }

        if (data.previousScene) {
            this.previousScene = data.previousScene
        }

        if (data.current_zone) {
            this.currentZone = data.current_zone
        }
    }

    preload() {
        Object.values(fishData).forEach((zoneArray) => {
            zoneArray.forEach((fish) => {
                this.load.image(fish.id, fish.image)
            })
        })
    }

    create() {
        const allFish = Object.values(fishData).flat()
        const fish = allFish.find((f) => f.id === this.fishId)

        if (!fish) {
            this.add.text(300, 200, "Fish not found", {
                fontSize: "24px",
                color: "#ffffff"
            })
            return
        }

        this.add.text(300, 40, fish.name, {
            fontSize: "30px",
            color: "#ffffff"
        }).setOrigin(0.5, 0)

        this.add.image(300, 180, fish.id).setScale(fish.scale * 2)

        this.add.text(120, 280, `Species: ${fish.species}`, {
            fontSize: "20px",
            color: "#ffffff"
        })

        this.add.text(120, 320, `Zone: ${fish.zone}`, {
            fontSize: "20px",
            color: "#ffffff"
        })

        this.add.text(120, 360, fish.description ?? "No description available.", {
            fontSize: "18px",
            color: "#cccccc",
            wordWrap: { width: 400 }
        })

        const backButton = this.add.text(30, 30, "Back")
            .setInteractive()

        backButton.on("pointerdown", () => {
            this.scene.start("catalogue", {
                previousScene: this.previousScene,
                current_zone: this.currentZone
            })
        })
    }
}