import Phaser from "phaser"
import Cursor from "../objects/Cursor"

export default class GameScene extends Phaser.Scene {

    cursor!: Cursor

    constructor(){
        super("game")
    }

    preload(){

        this.load.image("fish","assets/fish/fish.png")
        this.load.image("cursor","assets/ui/cursor.png")

    }

    create(){
        this.cursor = new Cursor(this ,300, 400)

        const backButton = this.add.text(10,10,"Back")
            .setInteractive()

        backButton.on("pointerdown",()=>{
            this.scene.start("home")
        })

    }

}