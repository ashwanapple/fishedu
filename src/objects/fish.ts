import Phaser from "phaser"

export type FishInfo = {
    id: string
    name: string
    species: string
    zone: string
    image: string
    speedMin: number
    speedMax: number
    scale: number
}

export default class Fish extends Phaser.GameObjects.Sprite {
    speed: number
    fishInfo: FishInfo

    constructor(scene: Phaser.Scene, x: number, y: number, fishInfo: FishInfo) {
        super(scene, x, y, fishInfo.id)

        this.fishInfo = fishInfo
        scene.add.existing(this)

        this.setScale(fishInfo.scale)
        this.speed = Phaser.Math.Between(fishInfo.speedMin, fishInfo.speedMax)

        this.setInteractive();
    }

    update(delta: number) {
        this.x += this.speed * (delta / 1000)

        if (this.x > this.scene.cameras.main.width + 50) {
            this.destroy()
        }
    }
}