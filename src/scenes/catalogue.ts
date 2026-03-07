import Phaser from "phaser"

export default class CatalogueScene extends Phaser.Scene {

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

    }

}