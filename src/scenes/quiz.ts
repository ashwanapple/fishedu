import Phaser from "phaser"
import Cursor from "../objects/cursor"

interface QuizQuestion {
    id: number
    question: string
    options: string[]
    answer: string
}

export default class Quiz extends Phaser.Scene {
    cursor!: Cursor
    currentLevel!: string
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
        this.currentIndex = 0
        this.score = 0
        this.optionButtons = []
        this.currentLevel = data.level

        this.add.text(300, 200, "Fish Quiz")
        this.cursor = new Cursor(this, 300, 400, "cursor")

        const allQuiz = this.cache.json.get("quizQuestions") as Record<string, QuizQuestion[]>
        const questions: QuizQuestion[] = allQuiz[this.currentLevel] ?? []

        if (questions.length === 0) {
            this.add.text(300, 250, "No questions found for this level.")
            return
        }

        this.showQuestion(questions)
    }

    showQuestion(questions: QuizQuestion[]) {
        this.optionButtons.forEach(btn => btn.destroy())
        this.optionButtons = []

        if (this.questionText) this.questionText.destroy()
        if (this.feedbackText) this.feedbackText.destroy()

        const q = questions[this.currentIndex]

        if (!q) {
            console.log("No question at index", this.currentIndex)
            return
        }

        this.questionText = this.add.text(300, 250, q.question)

        q.options.forEach((opt, i) => {
            const btn = this.add.text(350, 320 + i * 50, opt, { fontSize: "20px" })
                .setInteractive()
                .on("pointerdown", () => this.checkAnswer(opt, questions))
            this.optionButtons.push(btn)
        })
    }

    checkAnswer(selected: string, questions: QuizQuestion[]) {
        // Disable all buttons to prevent double clicking
        this.optionButtons.forEach(btn => btn.disableInteractive())

        const q = questions[this.currentIndex]
        if (!q) return

        const correct = q.answer

        if (selected === correct) {
            this.score++
            this.feedbackText = this.add.text(300, 420, "Correct!", { color: "#00ff00" })
        } else {
            this.feedbackText = this.add.text(300, 420, `Incorrect! Answer: ${correct}`, { color: "#ff0000" })
        }

        this.time.delayedCall(1000, () => {
            this.currentIndex++
            if (this.feedbackText) this.feedbackText.destroy()

            if (this.currentIndex < questions.length) {
                this.showQuestion(questions)
            } else {
                this.showResults(questions)
            }
        })
    }

    showResults(questions: QuizQuestion[]) {
        this.optionButtons.forEach(btn => btn.destroy())
        this.optionButtons = []
        if (this.questionText) this.questionText.destroy()

        this.add.text(300, 350, "Quiz Complete!", { fontSize: "24px" })
        this.add.text(300, 380, `Score: ${this.score}/${questions.length}`, { fontSize: "20px" })

        const levels = ["sunlight", "twilight", "midnight", "abyssal", "trenches"]
        const currentLevelIndex = levels.indexOf(this.currentLevel)
        const nextLevel = levels[currentLevelIndex + 1]

        if (nextLevel && this.score >= questions.length) {
            this.registry.set(`unlocked_${nextLevel}`, true)
            this.add.text(300, 410, `${nextLevel} quiz unlocked!`, { fontSize: "16px", color: "#ffff00" })
        }

        this.add.text(300, 450, "Back to Home", { fontSize: "20px", color: "#ffffff" })
            .setInteractive({ useHandCursor: true })
            .on("pointerdown", () => {
                this.scene.start("home")
            })
    }
}