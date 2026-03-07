import Phaser from "phaser";

export default class Fish extends Phaser.GameObjects.Sprite {
  speed: number;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "fish");

    scene.add.existing(this);

    this.speed = Phaser.Math.Between(30, 80);
  }

  update() {
    this.x += this.speed * 0.016;

    if (this.x > 900) {
      this.destroy();
    }
  }
}