import Phaser from "phaser"

export default class Cursor extends Phaser.GameObjects.Sprite {

    constructor(scene: Phaser.Scene, x: number, y: number) {

        super(scene, x, y, "cursor")

        // add sprite to scene
        scene.add.existing(this)

        // hide default mouse cursor
        scene.input.setDefaultCursor("none")

        // follow mouse
        scene.input.on("pointermove", (pointer: Phaser.Input.Pointer) => {
            this.x = pointer.x
            this.y = pointer.y
        })

        scene.input.on("pointerdown", (pointer: Phaser.Input.Pointer) => {
            console.log(pointer)
        })
    }

}