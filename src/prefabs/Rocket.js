class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.isFiring = false;
        this.movementSpeed = 2;
        this.sfxRocket = scene.sound.add('sfx_rocket'); //add rocket sfx
    }

    update() {

        //left or right movement - can only move when you are not firing
        if(!this.isFiring) {
            if(keyLEFT.isDown && this.x >= borderUISize + this.width) {
                this.x -= this.movementSpeed;
            } else if (keyRIGHT.isDown && this.x <= game.config.width -
                borderUISize - this.width) {
                    this.x += this.movementSpeed
            }
        }

        //fire button
        if(Phaser.Input.Keyboard.JustDown(keyF) && !this.isFiring) {
            this.isFiring = true;
            this.sfxRocket.play(); //play sfx
        }

        //if fired, rocket moves up
        if(this.isFiring && this.y >= borderUISize * 3 + borderPadding) {
            this.y -= this.movementSpeed;
        }

        //reset if miss
        if(this.y <= borderUISize * 3 +borderPadding) {
            this.reset();
        }
    }

    reset() {
        this.isFiring = false;
        this.y = game.config.height - borderUISize - borderPadding;
    }

}