// BonusTarget prefab
class BonusTarget extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.points = pointValue;
        this.movementSpeed = game.settings.spaceshipSpeed * 1.5;
    }
  
    update() {
        this.x -= this.movementSpeed;
  
        if(this.x <= 0 - this.width) {
            this.reset();
        }
    }
  
    //resets the position of the ship
    reset() {
        this.x = game.config.width;
    }
  }
  