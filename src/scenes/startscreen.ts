import Phaser from "phaser"
import Cursor from "../objects/cursor"

export default class Start extends Phaser.Scene {
    cursor!: Cursor

    constructor() {
        super("start")
    }

    preload() {
        this.load.image("startbg", "assets/ui/startbg.png")
        this.load.image("playbutton", "assets/ui/playbutton.png")
        this.load.image("cursor", "assets/ui/Banana.png")
    }

    create() {
        
        this.add.image(0,0, "startbg").setOrigin(0, 0).setDisplaySize(this.scale.width, this.scale.height).setDepth(0)

        const backButton = this.add.image(700, 530, "playbutton")
                    .setScale(0.1)
                    .setInteractive()
                    .setDepth(5)
        
                backButton.on("pointerdown", () => {
                    this.scene.start("home")
                })

        this.cursor = new Cursor(this, 300, 475, "cursor")
    }


}