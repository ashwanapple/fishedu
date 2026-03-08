import Phaser from "phaser"
import Cursor from "../objects/cursor"
import fishData from "../data/fishData.json"

export default class CatalogueEntry extends Phaser.Scene {
    cursor!: Cursor
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
        this.load.image("entryPagebg", "assets/ui/entryPage.png")
        this.load.image("back", "assets/ui/backbutton.png")
        Object.values(fishData).forEach((zoneArray) => {
            zoneArray.forEach((fish) => {
                this.load.image(fish.id, fish.image)
            })
        })
    }

    create() {
        const allFish = Object.values(fishData).flat()
        const fish = allFish.find((f) => f.id === this.fishId)
        this.add.image(0,0, "entryPagebg").setOrigin(0, 0).setDisplaySize(this.scale.width, this.scale.height).setDepth(0)

        this.cursor = new Cursor(this, 300, 400, "cursor")
        
                const backButton = this.add.image(80, 60, "back")
                    .setScale(0.06)
                    .setInteractive()
                    .setDepth(5)
        
                backButton.on("pointerdown", () => {
                    this.scene.start("catalogue")
                })
        if (!fish) {
            this.add.text(300, 200, "Fish not found", {
                fontSize: "24px",
                color: "#ffffff"
            })
            return
        }

        this.add.text(410, 150, fish.name, {
            fontSize: "30px",
            color: "#ffffff"
        }).setOrigin(0.5, 0)

        this.add.image(435, 340, fish.id).setScale(0.05)

        this.add.text(780, 185, `This is a ${fish.species}`, {
            fontSize: "20px",
            color: "#ffffff"
        })

        this.add.text(300, 210, `${fish.zone}`, {
            fontSize: "20px",
            color: "#ffffff"
        })

        this.add.text(780, 360, fish.description ?? "No description available.", {
            fontSize: "18px",
            color: "#cccccc",
            wordWrap: { width: 400 }
        })

        
    }
}