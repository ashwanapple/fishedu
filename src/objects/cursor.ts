import Phaser from "phaser"

export default class Cursor extends Phaser.GameObjects.Sprite {
    
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {

        super(scene, x, y, "cursor")
        
        this.setScale(0.035)

        this.setDepth(30)

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
            // adds little click
            this.setScale(0.04)
            scene.time.delayedCall(100, () => {
                this.setScale(0.035)
            })
        })

        scene.input.on("pointerover", (pointer: Phaser.Input.Pointer) => {
            // optoin to catch fish? or fish eyeballs you
        })

        
    }

}