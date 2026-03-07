import Phaser from "phaser"

export default class Cursor extends Phaser.GameObjects.Sprite {

    constructor(scene: Phaser.Scene, x: number, y: number, key: string) {

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

        // mouse down - catch fish
        scene.input.on("pointerdown", (pointer: Phaser.Input.Pointer) => {
            // catch fish
        })

        scene.input.on("pointerover", (pointer: Phaser.Input.Pointer) => {
            // optoin to catch fish? or fish eyeballs you
        })
    }

}