import Phaser from "phaser"

export default class Fish extends Phaser.GameObjects.Sprite {

    constructor(scene: Phaser.Scene, x: number, y: number){

        super(scene, x, y, "fish")

        scene.add.existing(this)

    }

}