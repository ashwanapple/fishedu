import Phaser from "phaser"
import Cursor from "../objects/Cursor"
import Fish from "../objects/fish"

export default class GameScene extends Phaser.Scene {

    cursor!: Cursor
    fishes: Fish[] = []

    constructor() {
        super("game")
    }

    preload() {
        this.load.image("fish", "assets/fish/fish.png")
        this.load.image("cursor", "assets/ui/cursor.png")
    }

    create() {
        this.cursor = new Cursor(this, 300, 400)

        const backButton = this.add.text(10, 10, "Back")
            .setInteractive()

        backButton.on("pointerdown", () => {
            this.scene.start("home")
        })

        this.time.addEvent({
            delay: 2000,
            callback: this.spawnFish,
            callbackScope: this,
            loop: true
        })
    }

    spawnFish() {
        const x = -50
        const y = Phaser.Math.Between(50, this.cameras.main.height - 50)

        const fish = new Fish(this, x, y)
        this.fishes.push(fish)
    }

    update(time: number, delta: number) {
        this.fishes = this.fishes.filter((fish) => fish.active)

        this.fishes.forEach((fish) => {
            fish.update(delta)
        })
    }
}