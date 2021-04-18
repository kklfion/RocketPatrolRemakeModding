

class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.image('starfield', 'assets/starfield.png');
        this.load.image('rocket', 'assets/rocket.png');
        this.load.image('spaceship', 'assets/spaceship.png');
        this.load.image('bonusTarget', 'assets/bonus1.png');
        
        //load spritesheet
        this.load.spritesheet(
            'explosion', 
            'assets/explosion.png', 
            {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9}
        );
    }

    create() {

        this.starfield = this.add.tileSprite(
            0,0,640,480, 'starfield'
        ).setOrigin(0,0);

        this.p1Rocket = new Rocket(
            this, 
            game.config.width / 2,
            game.config.height - borderUISize - borderPadding,
            'rocket'
        ).setOrigin(0.5, 0);

        this.bonusTarget = new BonusTarget (
            this,
            game.config.width + borderUISize * 9,
            borderUISize * 4,
            'bonusTarget',
            0,
            40
        ).setOrigin(0, 0);

        this.ship1 = new Ship (
            this,
            game.config.width + borderUISize * 6,
            borderUISize * 4 + borderPadding * 4,
            'spaceship',
            0,
            30
        ).setOrigin(0, 0);

        this.ship2 = new Ship (
            this,
            game.config.width + borderUISize * 3,
            borderUISize * 5 + borderPadding * 6,
            'spaceship',
            0,
            20
        ).setOrigin(0, 0);

        this.ship3 = new Ship (
            this,
            game.config.width,
            borderUISize * 6 + borderPadding * 8,
            'spaceship',
            0,
            10
        ).setOrigin(0, 0);

        // green UI background
        this.add.rectangle(0, 
            borderUISize + borderPadding, 
            game.config.width, borderUISize*2,
            0x00FF00,
            ).setOrigin(0.0);

        // white borders
    	this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0 ,0);
	    this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0 ,0);
	    this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0 ,0);
	    this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0 ,0);
    
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
      
        //animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', {start: 0, end: 9, first: 0}),
            frameRate: 30
        });
      
        //initialize score
        this.p1Score = 0;

        //display score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }

        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding * 2, this.p1Score, scoreConfig);
    
        /*
        //initialize and display timer
        this.p1Timer = 0;

        let p1TimerConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }

        this.timeLeft = this.add.text(borderUISize + borderPadding + 200, borderUISize + borderPadding * 2, this.p1Timer, p1TimerConfig);

        */

        //GAME OVER flag
        this.gameOver = false;

        //60-second play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width / 2, game.config.height / 2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width / 2, game.config.height / 2 + 64, 'Press (R) to Restart or <- for Menu',
            scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);
    
    }

    update() {

        //console.log(timer.getElapsedSeconds());

        //check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }

        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }

        this.starfield.tilePositionX -= 4;

        if (!this.gameOver) {
            this.p1Rocket.update();
            this.ship1.update();
            this.ship2.update();
            this.ship3.update();
            this.bonusTarget.update();
        }


        //check collisions
        if(this.checkCollision(this.p1Rocket, this.ship1)){
            this.p1Rocket.reset();
            this.targetExplode(this.ship1);
        }

        if(this.checkCollision(this.p1Rocket, this.ship2)){
            this.p1Rocket.reset();
            this.targetExplode(this.ship2);
        }

        if(this.checkCollision(this.p1Rocket, this.ship3)){
            this.p1Rocket.reset();
            this.targetExplode(this.ship3);
        }

        if(this.checkCollision(this.p1Rocket, this.bonusTarget)){
            this.p1Rocket.reset();
            this.targetExplode(this.bonusTarget);
        }
    }

    checkCollision(rocket, ship) {
        if(rocket.x + rocket.width > ship.x && 
            rocket.x < ship.x + ship.width &&
            rocket.y + rocket.height > ship.y &&
            rocket.y < ship.y + ship.height) {
                return true;
        } else {
            return false;
        }
    }

    targetExplode(target) {
        //temporaily hide the target
        target.alpha = 0;
        //create explosion sprite at the target's position
        let boom = this.add.sprite(target.x, target.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');
        boom.on('animationcomplete', () => {
            target.reset();
            target.alpha = 1;
            boom.destroy();
        });
        //score add and repaint
        this.p1Score += target.points;
        this.scoreLeft.text = this.p1Score;

        this.sound.play('sfx_explosion');
    }

}
