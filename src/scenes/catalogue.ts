import Phaser from "phaser"
import Cursor from "../objects/cursor"
import fishData from "../data/fishData.json"
import { getCatalogue } from "../objects/entries"


export default class Catalogue extends Phaser.Scene {
    cursor!: Cursor
    previousScene: string = "home"
    currentZone?: string
    
    constructor(){
        super("catalogue")
    }

    init(data: { previousScene?: string; current_zone?: string }) {
        if (data.previousScene) {
            this.previousScene = data.previousScene
        }

        if (data.current_zone) {
            this.currentZone = data.current_zone
        }
    }

    preload() {
        this.load.image("background", "assets/ui/diaryMain.png")
        this.load.image("back", "assets/ui/backbutton.png")
        Object.values(fishData).forEach((zoneArray) => {
            zoneArray.forEach((fish) => {
                this.load.image(fish.id, fish.image)
            })
        })
    }

    create(){
        this.add.image(0,0, "background").setOrigin(0, 0).setDisplaySize(this.scale.width, this.scale.height).setDepth(0)
    
        const savedFish = getCatalogue()
        const allFish = Object.values(fishData).flat()

        const backButton = this.add.image(50,50,"back")
            .setScale(0.03)
            .setInteractive()
            .setDepth(5)

        backButton.on("pointerdown", () => {
            if (this.previousScene === "game") {
                this.scene.start("game", {
                    current_zone: this.currentZone
                })
            } else {
                this.scene.start("home")
            }
        })

        const zoneBoxes = {
            //x = 200 y= 295 -> x = 560 y = 155
            sunlight: { x: 210, y: 155, width: 350, height: 110 },
            twilight: { x: 200, y: 395, width: 350, height: 50 },
            midnight: { x: 730, y: 125, width: 320, height: 75 },
            abyssal: { x: 730, y: 310, width: 320, height: 75 },
            trenches: { x: 725, y: 500, width: 280, height: 75 }
        }

        Object.entries(fishData).forEach(([zoneName, zoneFish]) => {
            const box = zoneBoxes[zoneName as keyof typeof zoneBoxes]
            if (!box) return

            const cols = 3
            const rows = Math.ceil(zoneFish.length / cols)
            const cellW = box.width / cols
            const cellH = box.height / rows

            zoneFish.forEach((fish, fishIndex) => {
                const col = fishIndex % cols
                const row = Math.floor(fishIndex / cols)

                const x = box.x + cellW / 2 + col * cellW
                const y = box.y + cellH / 2 + row * cellH

                const isUnlocked = savedFish.some((saved) => saved.id === fish.id)

                const fishImage = this.add.image(x, y, fish.id)

                const maxW = cellW * 0.7
                const maxH = cellH * 0.7
                const scaleX = maxW / fishImage.width
                const scaleY = maxH / fishImage.height
                const fitScale = Math.min(scaleX, scaleY)

                fishImage.setScale(0.035)

                if (isUnlocked) {
                    fishImage.setInteractive()

                    fishImage.on("pointerdown", () => {
                        this.scene.start("entry", {
                            fishId: fish.id,
                            previousScene: "catalogue",
                            current_zone: this.currentZone
                        })
                    })
                } else {
                    fishImage.setTint(0x000000)
                    fishImage.setAlpha(0.95)
                }
            })
        })
        this.cursor = new Cursor(this ,300, 400, "cursor")
    }
}