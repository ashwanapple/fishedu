import Phaser from "phaser"
import Cursor from "../objects/cursor"
import type HomeScene from "./homescreen"

interface QuizQuestion {
    id: number
    question: string
    options: string[]
    answer: string
}

export default class Quiz extends Phaser.Scene {
    cursor!: Cursor
    questions: QuizQuestion[] = []
    currentIndex = 0
    score = 0

    questionText!: Phaser.GameObjects.Text
    optionButtons: Phaser.GameObjects.Text[] = []
    feedbackText!: Phaser.GameObjects.Text

    constructor() {
        super("quiz")
    }

    preload() {
        this.load.image("cursor", "assets/ui/Banana.png")
        this.load.image("fish", "assets/fish/fish.png")
        this.load.json("quizQuestions", "src/data/quizQuestions.json")
    }

    create(data: { level: string }) {

        this.add.text(300, 200, "Fish Quiz")

        const backButton = this.add.text(360, 400, "Back")
            .setInteractive()

        backButton.on("pointerdown", () => {
            this.scene.start("home")
        })

        this.cursor = new Cursor(this, 300, 400, "cursor")

        // Access JSON
        const allQuiz = this.cache.json.get("quizQuestions")
        this.questions = allQuiz[data.level]

        this.showQuestion();


    }

    showQuestion() {
        if (!this.questions || !this.questions[this.currentIndex]) {
            console.log("No question to display")
            return
        }

        this.optionButtons.forEach(btn => btn.destroy())
        this.optionButtons = []

        if (this.questionText) {
            this.questionText.destroy()
        }
        if (this.feedbackText) {
            this.feedbackText.destroy()
        }

        const q = this.questions[this.currentIndex]!
        this.questionText = this.add.text(300, 250, q.question)

        q.options.forEach((opt, i) => {
            const btn = this.add.text(350, 320 + i * 50, opt, { fontSize: "20px" })
                .setInteractive()
                .on("pointerdown", () => this.checkAnswer(opt))
            this.optionButtons.push(btn)
        })
    }

    checkAnswer(selected: string) {
        const q = this.questions[this.currentIndex]!
        const correct = q.answer
        if (!q) return

        if (selected == correct) {
            this.score++
            this.feedbackText = this.add.text(300, 420, "Correct!")

        } else {
            this.feedbackText = this.add.text(300, 420, "Incorrect...")
        }

        this.time.delayedCall(1000, () => {
            this.currentIndex++
            this.feedbackText.destroy()
            if (this.currentIndex < this.questions.length) {
                this.showQuestion()
            } else {
                this.add.text(300, 450, "Quiz Complete!")
                this.add.text(300, 475, ` Score: ${this.score}/${this.questions.length}`)

                const levels = ["sunlight", "twilight", "midnight", "abyssal", "trenches"]
                const data = this.scene.settings.data as {level:string}
                const currentLevelIndex = levels.indexOf(data.level)
                const nextLevel = levels[currentLevelIndex + 1 ]
                if(nextLevel) {
                    const home = this.scene.get("home") as HomeScene
                    home.unlockedLevels[nextLevel] = true
                }
            }
        })
    }

}