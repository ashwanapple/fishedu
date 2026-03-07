import Phaser from "phaser"
import Cursor from "../objects/cursor"


export default class CatalogueScene extends Phaser.Scene {
    cursor!: Cursor

    constructor(){
        super("catalogue")
    }

    preload() {
        this.load.image("cursor", "assets/ui/Banana.png")
        this.load.image("fish", "assets/fish/fish.png")
    }

    create(){

        this.add.text(300,200,"Fish Catalogue")

        const backButton = this.add.text(360,400,"Back")
            .setInteractive()

        backButton.on("pointerdown",()=>{
            this.scene.start("home")
        })

        this.cursor = new Cursor(this ,300, 400, "cursor")

    }

}