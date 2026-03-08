import Phaser from "phaser"
import Cursor from "../objects/cursor"

interface QuizQuestion {
    id: number
    question: string
    options: string[]
    answer: string
}

const STYLES = {
    title: { fontFamily: "Caudex", fontSize: "50px", color: "#000000", stroke: "#000000", strokeThickness: 3 },
    question: { fontFamily: "Caudex", fontSize: "30px", color: "#000000", stroke: "#000000", strokeThickness: 1, align: 'center'},
    button: { fontFamily: "Caudex", fontSize: "18px", color: "#000000", stroke: "#000000" },
    feedback: { fontFamily: "Caudex", fontSize: "22px", color: "#ffffffff", stroke: "#ffffffff", strokeThickness: 1 },
    result: { fontFamily: "Caudex", fontSize: "26px", color: "#000000", stroke: "#000000", strokeThickness: 4 },
    unlock: { fontFamily: "Caudex", fontSize: "16px", color: "#ffff00", strokeThickness: 3 },
}

function textButton(
    scene: Phaser.Scene,
    x: number,
    y: number,
    text: string,
    bgColor: number = 0xc5ECf7,
    hoverColor: number = 0x2589c7,
    padding = { x: 200, y: 12 }
) {
    const label = scene.add.text(0, 0, text, STYLES.button).setOrigin(0.5)
    const width = label.width + padding.x * 2
    const height = label.height + padding.y * 2

    const bg = scene.add.rectangle(x, y, width, height, bgColor).setStrokeStyle(2, 0x000000)
    label.setPosition(x, y)

    const container = scene.add.container(0, 0, [bg, label])
    container.setInteractive(
        new Phaser.Geom.Rectangle(x - width / 2, y - height / 2, width, height),
        Phaser.Geom.Rectangle.Contains
    )

    container.on("pointerover", () => bg.setFillStyle(hoverColor))
    container.on("pointerout", () => bg.setFillStyle(bgColor))

    return { container, bg, label }
}

export default class Quiz extends Phaser.Scene {
    cursor!: Cursor
    currentLevel!: string
    currentIndex = 0
    score = 0

    questionText!: Phaser.GameObjects.Text
    optionContainers: Phaser.GameObjects.Container[] = []
    feedbackText!: Phaser.GameObjects.Text

    constructor() {
        super("quiz")
    }

    preload() {
        this.load.image("cursor", "assets/ui/Banana.png")
        this.load.image("fish", "assets/fish/fish.png")
        this.load.json("quizQuestions", "src/data/quizQuestions.json")
        this.load.image("background", "assets/ui/quizbackground.png")
    }

    create(data: { level: string }) {
        const Y = this.scale.height
        const centerX = this.scale.width / 2

        this.add.image(0, 0, "background").setOrigin(0, 0).setDisplaySize(this.scale.width, Y)

        this.currentIndex = 0
        this.score = 0
        this.optionContainers = []
        this.currentLevel = data.level
        
        this.add.text(centerX, 60, `${this.currentLevel.charAt(0).toUpperCase() + this.currentLevel.slice(1)} Quiz`, STYLES.title).setOrigin(0.5)

        this.cursor = new Cursor(this, 300, 400, "cursor")

        const allQuiz = this.cache.json.get("quizQuestions") as Record<string, QuizQuestion[]>
        const questions: QuizQuestion[] = allQuiz[this.currentLevel] ?? []

        if (questions.length === 0) {
            this.add.text(centerX, 250, "No questions found for this level.", STYLES.question).setOrigin(0.5)
            return
        }

        this.showQuestion(questions)
    }

    showQuestion(questions: QuizQuestion[]) {
        this.optionContainers.forEach(c => c.destroy())
        this.optionContainers = []

        if (this.questionText) this.questionText.destroy()
        if (this.feedbackText) this.feedbackText.destroy()

        const q = questions[this.currentIndex]
        if (!q) return

        const centerX = this.scale.width / 2
        const Y = this.scale.height

        // Progress indicator
        this.questionText = this.add.text(
            centerX, Y/3,
            `Q${this.currentIndex + 1}/${questions.length}: \n ${q.question}`,
            STYLES.question
        ).setOrigin(0.5)

        q.options.forEach((opt, i) => {
            const { container } = textButton(this, centerX, Y * 3/5 + i * 60, opt)
            container.on("pointerdown", () => this.checkAnswer(opt, questions))
            this.optionContainers.push(container)
        })
    }

    checkAnswer(selected: string, questions: QuizQuestion[]) {
        this.optionContainers.forEach(c => c.disableInteractive())

        const q = questions[this.currentIndex]
        if (!q) return

        const correct = q.answer
        const centerX = this.scale.width / 2
        const Y = this.scale.height

        if (selected === correct) {
            this.score++
            this.feedbackText = this.add.text(centerX, Y * 9.25/10, "Correct!", { ...STYLES.feedback }).setOrigin(0.5)
        } else {
            this.feedbackText = this.add.text(centerX, Y * 9.25/10, `Incorrect. Answer: ${correct}`, { ...STYLES.feedback }).setOrigin(0.5)
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
        this.optionContainers.forEach(c => c.destroy())
        this.optionContainers = []
        if (this.questionText) this.questionText.destroy()
        if (this.feedbackText) this.feedbackText.destroy()

        const centerX = this.scale.width / 2

        this.add.text(centerX, 200, "Quiz Complete!", STYLES.result).setOrigin(0.5)
        this.add.text(centerX, 260, `Score: ${this.score} / ${questions.length}`, STYLES.result).setOrigin(0.5)

        const levels = ["sunlight", "twilight", "midnight", "abyssal", "trenches"]
        const nextLevel = levels[levels.indexOf(this.currentLevel) + 1]

        if (nextLevel && this.score >= questions.length) {
            this.registry.set(`unlocked_${nextLevel}`, true)
            this.add.text(centerX, 320, `🔓 ${nextLevel.charAt(0).toUpperCase() + nextLevel.slice(1)} unlocked!`, STYLES.unlock).setOrigin(0.5)
        }

        const { container } = textButton(this, centerX, 400, "Back to Home", 0x1a6fa8, 0x2589c7)
        container.on("pointerdown", () => this.scene.start("home"))
    }
}