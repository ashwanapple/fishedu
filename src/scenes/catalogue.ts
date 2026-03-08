import Phaser from "phaser"
import Cursor from "../objects/cursor"
import fishData from "../data/fishData.json"


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

        this.add.text(300,200,"Fish Catalogue")

        const backButton = this.add.text(360,400,"Back")
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

        this.cursor = new Cursor(this ,300, 400, "cursor")

    }

}