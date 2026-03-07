import Phaser from "phaser"
import Cursor from "../objects/cursor"
import Fish from "../objects/fish"
import fishData from "../data/fishData.json"

export default class GameScene extends Phaser.Scene {

    cursor!: Cursor
    fishes: Fish[] = []
    currentZone: string = ""
    

    constructor() {
        super("game")
    }

    init(data: { current_zone?: string }) {
        if (data.current_zone) {
            this.currentZone = data.current_zone.toLowerCase()
        }
    }


    preload() {
        //this.load.image("fish", "assets/fish/single cup.png")
        // load every png in the JSON
        Object.values(fishData).forEach((zoneArray) => {
            zoneArray.forEach((fish) => {
                this.load.image(fish.id, fish.image)
            })
        })

        this.load.image("cursor", "assets/ui/Banana.png")
    }

    create() {
        this.cursor = new Cursor(this, 300, 400, "cursor")

        const backButton = this.add.text(10, 10, "Back")
            .setInteractive()

        backButton.on("pointerdown", () => {
            this.scene.start("home")
        })

        const catalogueButton = this.add.text(700,10,"Catalogue")
            .setInteractive()

        catalogueButton.on("pointerdown", () => {
            this.scene.start("catalogue")
        })

        this.time.addEvent({
            delay: 4000,
            callback: this.spawnFish,
            callbackScope: this,
            loop: true
        })
    }

    spawnFish() {
        const x = -50
        const y = Phaser.Math.Between(50, this.cameras.main.height - 50)

        const zoneCreatures = fishData[this.currentZone as keyof typeof fishData]

        if (!zoneCreatures || zoneCreatures.length === 0) return

        const randomFishData = Phaser.Utils.Array.GetRandom(zoneCreatures)

        const fish = new Fish(this, x, y, randomFishData)

        fish.on("pointerdown", () => {
            this.catchFish(fish)
        })

        this.fishes.push(fish)
    }

    catchFish(fish: Fish) {
        if (!fish.active) return

        console.log("Caught:", fish.fishInfo.name)
        console.log("Type:", fish.fishInfo.species)
        console.log("Zone:", fish.fishInfo.zone)
        console.log("Fish caught!")

        fish.destroy()

       
    }

    update(time: number, delta: number) {
        this.fishes = this.fishes.filter((fish) => fish.active)

        this.fishes.forEach((fish) => {
            fish.update(delta)
        })
    }
}