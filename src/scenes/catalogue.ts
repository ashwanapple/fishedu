import Phaser from "phaser"
import Cursor from "../objects/Cursor"


export default class CatalogueScene extends Phaser.Scene {
    cursor!: Cursor

    constructor(){
        super("catalogue")
    }

    create(){

        this.add.text(300,200,"Fish Catalogue")

        const backButton = this.add.text(360,400,"Back")
            .setInteractive()

        backButton.on("pointerdown",()=>{
            this.scene.start("home")
        })

        this.cursor = new Cursor(this ,300, 400)

    }

}