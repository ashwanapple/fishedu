import Phaser from "phaser"

export default class Fish extends Phaser.GameObjects.Sprite {
    speed: number

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, "fish")

        scene.add.existing(this)

        this.speed = Phaser.Math.Between(30, 80)
    }

    update(delta: number) {
        this.x += this.speed * (delta / 1000)

        if (this.x > this.scene.cameras.main.width + 50) {
            this.destroy()
        }
    }
}