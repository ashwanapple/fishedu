import Phaser from "phaser"
import Cursor from "../objects/cursor"
import fishData from "../data/fishData.json"

const STYLES = {
    fishname: { fontFamily: "PT Sans Narrow", fontSize: "35px", color: "#000000", stroke: "#000000", strokeThickness: 1, align: 'center' },
    facts: { fontFamily: "PT Sans Narrow", fontSize: "25px", color: "#000000", stroke: "#000000" },
}


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
        this.add.image(0, 0, "entryPagebg").setOrigin(0, 0).setDisplaySize(this.scale.width, this.scale.height).setDepth(0)

        this.cursor = new Cursor(this, 300, 400, "cursor")

        const backButton = this.add.image(80, 60, "back")
            .setScale(0.06)
            .setInteractive()
            .setDepth(5)

        backButton.on("pointerdown", () => {
            this.scene.start("catalogue")
        })

        backButton.on("pointerover", () => backButton.setScale(0.07))
        backButton.on("pointerout", () => backButton.setScale(0.065))

        if (!fish) {
            this.add.text(300, 200, "Fish not found", {
                fontSize: "24px",
                color: "#ffffff"
            })
            return
        }

        

        this.add.text(410, 150, fish.name, STYLES.fishname).setOrigin(0.5, 0)
        this.add.image(435, 340, fish.id).setScale(0.05)
        this.add.image(350, 230, `${fish.zone}zone`).setScale(0.3)
        this.add.text(780, 190, `This is a ${fish.speciesFact1}`, STYLES.facts)
        this.add.text(780, 350, fish.fact2 ?? "No description available.", STYLES.facts)
        this.add.text(780, 510, fish.fact3 ?? "No description available.", STYLES.facts)
    }
}