import Phaser from "phaser"
import Cursor from "../objects/cursor"
import Fish from "../objects/fish"
import fishData from "../data/fishData.json"
import { addFishToCatalogue } from "../objects/entries"

export default class GameScene extends Phaser.Scene {

    cursor!: Cursor
    fishes: Fish[] = []
    currentZone: string = ""
    currentSub: string = ""
    currentSea: string = ""
    

    constructor() {
        super("game")
    }

    init(data: { current_zone?: string }) {
        if (data.current_zone) {
            this.currentZone = data.current_zone.toLowerCase()
            this.currentSub = data.current_zone.toLowerCase() + "sub"
            this.currentSea = data.current_zone.toLowerCase() + "sea"
        }
    }

    preload() {
        this.load.image("sunlightsea", "assets/ui/sunlightsea.png")
        this.load.image("twilightsea", "assets/ui/twilightsea.png")
        this.load.image("midnightsea", "assets/ui/midnightsea.png")
        this.load.image("abyssalsea", "assets/ui/abyssalsea.png")
        this.load.image("trenchessea", "assets/ui/trenchessea.png")

        this.load.image("sunlightsub", "assets/ui/sunlightsub.png")
        this.load.image("twilightsub", "assets/ui/twilightsub.png")
        this.load.image("midnightsub", "assets/ui/midnightsub.png")
        this.load.image("abyssalsub", "assets/ui/abyssalsub.png")
        this.load.image("trenchessub", "assets/ui/trenchessub.png")

        this.load.image("cursor", "assets/ui/Banana.png")
        this.load.image("bubble", "assets/ui/bubble.png")
        this.load.image("diary", "assets/ui/diarybook.png")
        this.load.image("back", "assets/ui/backbutton.png")

        Object.values(fishData).forEach((zoneArray) => {
            zoneArray.forEach((fish) => {
                this.load.image(fish.id, fish.image)
            })
        })

        
    }

    create() {
        this.add.image(0, 0, this.currentSea)
            .setOrigin(0, 0)
            .setDisplaySize(this.scale.width, this.scale.height)
            .setDepth(0)

        this.add.image(0, 0, this.currentSub)
            .setOrigin(0, 0)
            .setDisplaySize(this.scale.width, this.scale.height)
            .setDepth(3)

        this.cursor = new Cursor(this, 300, 400, "cursor")

        const backButton = this.add.image(80, 60, "back")
            .setScale(0.06)
            .setInteractive()
            .setDepth(5)

        backButton.on("pointerdown", () => {
            this.scene.start("home")
        })

        backButton.on("pointerover", () => backButton.setScale(0.07))
        backButton.on("pointerout", () => backButton.setScale(0.065))
        

        const catalogueButton = this.add.image(190,740,"diary")
            .setScale(0.52)
            .setInteractive()
            .setDepth(5)

        catalogueButton.on("pointerdown", () => {
            this.scene.start("catalogue", {previousScene: "game", currentZone: this.currentZone})
        })

        catalogueButton.on("pointerover", () => catalogueButton.setScale(0.6))
        catalogueButton.on("pointerout", () => catalogueButton.setScale(0.55))

        this.time.addEvent({
            delay: 3000,
            callback: this.spawnFish,
            callbackScope: this,
            loop: true
        })

        // preload a small circle or star image first
// this.load.image("particle", "assets/ui/particle.png")

const particles = this.add.particles(0, 0, "bubble", {
    speed: { min: 10, max: 50 },
    angle: { min: 240, max: 300 },      // wider spread
    scale: { min: 0.01, max: 0.025 },
    alpha: { start: 0.8, end: 0 },
    lifespan: { min: 800, max: 2000 },  // more varied lifespans
    frequency: 150,
    gravityY: -50,
    accelerationX: { min: -20, max: 20 }, // random left/right drift
    rotate: { min: 0, max: 360 },         // spin slightly
    bounce: 0.2,                          // subtle wobble
})

// follow the cursor every frame
this.input.on("pointermove", (pointer: Phaser.Input.Pointer) => {
    particles.setPosition(pointer.x, pointer.y)
})
    }

    spawnFish() {
        const x = -50
        const y = Phaser.Math.Between(50, this.cameras.main.height - 50)
        const zoneCreatures = fishData[this.currentZone as keyof typeof fishData]

        if (!zoneCreatures || zoneCreatures.length === 0) return

        const randomFishData = Phaser.Utils.Array.GetRandom(zoneCreatures)
        const fish = new Fish(this, x, y, randomFishData)
        fish.setDepth(1)

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
        speciesFact1: fish.fishInfo.speciesFact1,
        zone: fish.fishInfo.zone,
        fact2: fish.fishInfo.fact2,
        fact3:fish.fishInfo.fact3,
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