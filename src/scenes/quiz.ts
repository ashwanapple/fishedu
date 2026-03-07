import Phaser from "phaser"
import Cursor from "../objects/Cursor"


export default class quiz extends Phaser.Scene {
    cursor!: Cursor

    constructor(){
        super("quiz")
    }

    preload() {
        this.load.image("cursor", "assets/ui/Banana.png")
        this.load.image("fish", "assets/fish/fish.png")
        this.load.json("quizQuestions", "src/data/quizQuestions.json")
    }

    create(data: {level: string}){

        this.add.text(300,200,"Fish Quiz")

        const backButton = this.add.text(360,400,"Back")
            .setInteractive()

        backButton.on("pointerdown",()=>{
            this.scene.start("home")
        })

        this.cursor = new Cursor(this ,300, 400, "cursor")


        // Access JSON
        const allQuiz = this.cache.json.get("quizData")
        const questions = allQuiz[data.level]

        questions.forEach((q: any, i: number) => {
            this.add.text(100, 100 + i * 60, q.question)
            q.options.forEach((opt: string, j: number) => {
                this.add.text(120, 130 + i * 60 + j * 20, `- ${opt}`)
            })
        })

    }

}