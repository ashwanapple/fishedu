import Phaser from "phaser"

export default class GameScene extends Phaser.Scene {

    cursor!: Phaser.GameObjects.Sprite

    constructor(){
        super("game")
    }

    preload(){

        this.load.image("fish","assets/fish/fish.png")
        this.load.image("cursor","assets/ui/cursor.png")

    }

    create(){

        this.cursor = this.add.sprite(400,300,"cursor")

        this.input.on("pointermove",(pointer: Phaser.Input.Pointer)=>{
            this.cursor.x = pointer.x
            this.cursor.y = pointer.y
        })

    }

}