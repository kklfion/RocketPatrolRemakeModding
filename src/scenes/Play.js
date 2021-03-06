

class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    init(data) {
        this.info = data;
        //console.log(`high score from Play init: ${this.info.highScoreTotal}`)
    }

    preload() {
        this.load.image('starfield', 'assets/background.png');
        this.load.image('scroll4', 'assets/scroll4.png');
        this.load.image('scroll3', 'assets/scroll3.png');
        this.load.image('scroll2', 'assets/scroll2.png');
        this.load.image('scroll1', 'assets/scroll1.png');
        this.load.image('rocket', 'assets/paw.png');
        this.load.image('spaceship', 'assets/plane.png');
        this.load.image('bonusTarget', 'assets/witch.png');
        this.load.image('frame', 'assets/frame.png');
        this.load.image('score', 'assets/scoreBox.png');
        this.load.image('highScore2', 'assets/highScoreBox2.png');
        this.load.image('gameOver', 'assets/gameOver.png');
        
        //load spritesheets
        this.load.spritesheet(
            'explosion', 
            'assets/plane_explosion.png', 
            {frameWidth: 70, frameHeight: 38, startFrame: 0, endFrame: 9}
        );
            
        this.load.spritesheet(
            'witch_explosion', 
            'assets/witch_explosion.png', 
            {frameWidth: 58, frameHeight: 31, startFrame: 0, endFrame: 12}
        );
        
    }

    create() {

        this.sound.play('bgm_dreamy');

        //parallax scrolling
        this.starfield = this.add.tileSprite(
            0,0,640,480, 'starfield'
        ).setOrigin(0,0);
        
        this.scroll4 = this.add.tileSprite(
            0,0,640,480, 'scroll4'
        ).setOrigin(0,0);

        this.scroll3 = this.add.tileSprite(
            0,0,640,480, 'scroll3'
        ).setOrigin(0,0);

        this.scroll2 = this.add.tileSprite(
            0,0,640,480, 'scroll2'
        ).setOrigin(0,0);

        this.scroll1 = this.add.tileSprite(
            0,0,640,480, 'scroll1'
        ).setOrigin(0,0);

        this.p1Rocket = new Rocket(
            this, 
            game.config.width / 2,
            game.config.height - borderUISize - borderPadding,
            'rocket'
        ).setOrigin(0.5, 0);

        this.bonusTarget = new BonusTarget (
            this,
            game.config.width + borderUISize * 9 + 100,
            borderUISize * 3,
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

        /*
        // green UI background
        this.add.rectangle(0, 
            borderUISize + borderPadding, 
            game.config.width, borderUISize*2,
            0x00FF00,
            ).setOrigin(0.0);
        */

        // invisible borders
    	this.add.rectangle(0, 0, game.config.width, borderUISize).setOrigin(0 ,0); //top
	    this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize).setOrigin(0 ,0); //bottom
	    this.add.rectangle(0, 0, borderUISize, game.config.height).setOrigin(0 ,0); //left
	    this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height).setOrigin(0 ,0); //right
    
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
      
        //explosion animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', {start: 0, end: 9, first: 0}),
            frameRate: 30
        });

        this.anims.create({
            key: 'witch_explode',
            frames: this.anims.generateFrameNumbers('witch_explosion', {start: 0, end: 12, first: 0}),
            frameRate: 30
        });
      
        //initialize score
        this.p1Score = 0;

        //display game frame
        this.frame = this.add.tileSprite(
            0,0,640,480, 'frame'
        ).setOrigin(0,0);
        
        //display score boxes
        this.add.image(9, 13, 'score').setOrigin(0,0);
        this.add.image(510, 13, 'highScore2').setOrigin(0,0);

        //display score
        let scoreConfig = {
            fontFamily: 'Georgia',
            fontSize: '25px',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5
            },
            fixedWidth: 0
        }

        this.scoreLeft = this.add.text(22, 24, this.p1Score, scoreConfig);
    
        //display high score
        this.showHighScore = this.add.text(595, 24, this.info.highScoreTotal, scoreConfig);
        //console.log(`added ${this.info.highScoreTotal} as the new highScore`)
        
        
        //GAME OVER flag
        this.gameOver = false;

        //60-second play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            //this.add.text(game.config.width / 2, game.config.height / 2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            //this.add.text(game.config.width / 2, game.config.height / 2 + 64, 'Press (R) to Restart or <- for Menu', scoreConfig).setOrigin(0.5);
            this.add.image(game.config.width / 2, game.config.height / 2, 'gameOver');
            this.sound.stopAll();
            this.gameOver = true;
        }, null, this);
    
    }

    update() {

        //update highscore when game over
        if (this.gameOver) {
            if(this.p1Score > this.info.highScoreTotal) {
                this.info.highScoreTotal = this.p1Score;
            }
            this.showHighScore.text = this.info.highScoreTotal;
            //console.log(this.highScore);
        }

        //check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart(this.info);
        }

        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene", this.info);
        }

        //scrolling background
        this.starfield.tilePositionX -= 2;
        this.scroll4.tilePositionX -= 2.2;
        this.scroll3.tilePositionX -= 2.6;
        this.scroll2.tilePositionX -= 3;
        this.scroll1.tilePositionX -= 3.2;

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
            this.witchDisappear(this.bonusTarget);
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

        //
        var decideSound = Phaser.Math.Between(0, 3);
        if(decideSound == 0){
            this.sound.play('sfx_explosion_1');
        } else if (decideSound == 1){
            this.sound.play('sfx_explosion_2');
        } else if (decideSound == 2){
            this.sound.play('sfx_explosion_3');
        } else {
            this.sound.play('sfx_explosion_4');
        }
        
    }

    witchDisappear(witch) {
        witch.alpha = 0;
        let witchBoom = this.add.sprite(witch.x, witch.y, 'witch_explosion').setOrigin(0, 0);
        witchBoom.anims.play('witch_explode');
        witchBoom.on('animationcomplete', () => {
            witch.reset();
            witch.alpha = 1;
            witchBoom.destroy();
        });

        this.p1Score += witch.points;
        this.scoreLeft.text = this.p1Score;

        //
        var decideSound = Phaser.Math.Between(0, 3);
        if(decideSound == 0){
            this.sound.play('sfx_explosion_1');
        } else if (decideSound == 1){
            this.sound.play('sfx_explosion_2');
        } else if (decideSound == 2){
            this.sound.play('sfx_explosion_3');
        } else {
            this.sound.play('sfx_explosion_4');
        }
    }
}
