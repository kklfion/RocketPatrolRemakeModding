
class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    init(data) {  //grab data from previous scene
        this.info = data;
        if(this.info.highScoreTotal == null){
            this.info.highScoreTotal = 0;
        }
        //console.log(`high score displaying from Menu: ${this.info.highScoreTotal}`)
    }

    preload() {
        //load audio
        this.load.audio('sfx_select', 'assets/blip_select12.wav');
        this.load.audio('sfx_explosion_1', 'assets/explosion1.mp3');
        this.load.audio('sfx_explosion_2', 'assets/explosion2.mp3');
        this.load.audio('sfx_explosion_3', 'assets/explosion3.mp3');
        this.load.audio('sfx_explosion_4', 'assets/explosion4.mp3');
        this.load.audio('sfx_rocket', 'assets/sfx_meow.wav');
        this.load.audio('bgm_dreamy', 'assets/dreamybgm.mp3');

        this.load.image('menu', 'assets/menuScreen.png');
        this.load.image('highScore1', 'assets/highScoreBox1.png');

        //cat
        this.load.spritesheet(
            'cat', 
            'assets/cat_tail.png', 
            {frameWidth: 78, frameHeight: 102, startFrame: 0, endFrame: 15}
        );

    }

    create() {
        
        //display menu graphics
        this.add.image(0, 0, 'menu').setOrigin(0,0);
        this.add.image(527, 9, 'highScore1').setOrigin(0,0);

        //generate the cat animation in the menu
        this.anims.create({
            key: 'cat_move',
            frames: this.anims.generateFrameNumbers('cat', {start: 0, end: 15, first: 0}),
            frameRate: 15,
            repeat: -1,
            repeatDelay: 4000
        });
        
        let catTail = this.add.sprite(435, 301, 'cat').setOrigin(0, 0);
        catTail.anims.play('cat_move');


        //check if there is a previous high score, if not create an info object
        if(this.info.highScoreTotal < 0){
            this.info = {
                highScoreTotal: 0
            }
        }

        let scoreConfig = {
            fontFamily: 'Georgia',
            fontSize: '25px',
            //backgroundColor: '#F3B141',
            color: '#843605',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        //show high score
        this.showHighScore = this.add.text(587, 24, this.info.highScoreTotal, scoreConfig);


        /*
        //show menu text
        this.add.text(game.config.width / 2, game.config.height / 2 - borderUISize -
            borderPadding, 'ROCKET PATROL', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width / 2, game.config.height / 2, 'Use <--> arrows to move & (F) to fire', 
        menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#00FF00';
        menuConfig.color = '#000';
        this.add.text(game.config.width / 2, game.config.height / 2 + borderUISize + borderPadding, 'Press <- for Novice or -> for Expert', menuConfig).setOrigin(0.5);
        
        */
        //define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            //easy mode
            game.settings = {
                spaceshipSpeed: 3,
                gameTimer: 60000
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene', this.info);
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            //hard mode
            game.settings = {
                spaceshipSpeed: 4,
                gameTimer: 45000
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene', this.info);
        }


    }

}
