import Phaser from "phaser"
import Cursor from "../objects/cursor"
import fishData from "../data/fishData.json"
import { getCatalogue } from "../objects/entries"


export default class CatalogueScene extends Phaser.Scene {
    cursor!: Cursor
    previousScene: string = "home"
    currentZone?: string
    

    constructor(){
        super("catalogue")
    }

    init(data: { previousScene?: string; current_zone?: string }) {
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

    create(){

        this.add.text(300,50,"Fish Catalogue")

        const savedFish = getCatalogue()

        const backButton = this.add.text(360,500,"Back")
            .setInteractive()

        backButton.on("pointerdown", () => {
            if (this.previousScene === "game") {
                this.scene.start("game", {
                    current_zone: this.currentZone
                })
            } else {
                this.scene.start("home")
            }
        })

        savedFish.forEach((fish, index) => {
            const y = 100 + index * 100

            this.add.image(80, y, fish.id).setScale(0.04)

            this.add.text(140, y - 20, fish.name, {
                fontSize: "20px",
                color: "#ffffff"
            })

            this.add.text(140, y + 10, `Species: ${fish.species} | Zone: ${fish.zone}`, {
                fontSize: "16px",
                color: "#cccccc"
            })

            this.add.text(140, y + 30, `${fish.description}`, {
                fontSize: "16px",
                color: "#cccccc"
            })

        })

        this.cursor = new Cursor(this ,300, 400, "cursor")

    }

}