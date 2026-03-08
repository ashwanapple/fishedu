import Phaser from "phaser"
import Cursor from "../objects/cursor"
import Fish from "../objects/fish"
import fishData from "../data/fishData.json"
import { addFishToCatalogue } from "../objects/entries"

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
            this.scene.start("catalogue", {previousScene: "game", currentZone: this.currentZone})
        })

        this.time.addEvent({
            delay: 3000,
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

        const wasAdded = addFishToCatalogue({
        id: fish.fishInfo.id,
        name: fish.fishInfo.name,
        species: fish.fishInfo.species,
        zone: fish.fishInfo.zone,
        description: fish.fishInfo.description,
        image: fish.fishInfo.image
        })

        if (wasAdded) {
            this.showNotification(`${fish.fishInfo.name} added to catalogue!`)
            fish.destroy()
        } else {
            this.showNotification(`${fish.fishInfo.name} found already`)
        }

        

       
    }

    update(time: number, delta: number) {
        this.fishes = this.fishes.filter((fish) => fish.active)

        this.fishes.forEach((fish) => {
            fish.update(delta)
        })
    }

    showNotification(message: string) {
    const text = this.add.text(
        this.cameras.main.width / 2,
        50,
        message,
        {
            fontSize: "24px",
            color: "#ffffff",
            backgroundColor: "#000000",
            padding: { x: 12, y: 8 }
        }
    )

    text.setOrigin(0.5)

    this.tweens.add({
        targets: text,
        alpha: 0,
        duration: 1200,
        ease: "Linear",
        onComplete: () => {
            text.destroy()
        }
    })
}
}