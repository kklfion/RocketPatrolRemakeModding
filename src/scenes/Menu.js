
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
        this.load.audio('sfx_rocket', 'assets/rocket_shot.wav');
        this.load.audio('bgm_dreamy', 'assets/dreamybgm.mp3');

    }

    create() {
        
        //check if there is a previous high score, if not create an info object
        if(this.info.highScoreTotal < 0){
            this.info = {
                highScoreTotal: 0
            }
        }

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

        //show high score
        this.showHighScore = this.add.text(borderUISize + borderPadding + 500 , borderUISize + borderPadding * 2, this.info.highScoreTotal, scoreConfig);

        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        //show menu text
        this.add.text(game.config.width / 2, game.config.height / 2 - borderUISize -
            borderPadding, 'ROCKET PATROL', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width / 2, game.config.height / 2, 'Use <--> arrows to move & (F) to fire', 
        menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#00FF00';
        menuConfig.color = '#000';
        this.add.text(game.config.width / 2, game.config.height / 2 + borderUISize + borderPadding, 'Press <- for Novice or -> for Expert', menuConfig).setOrigin(0.5);
        
        //define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            //easy mode
            game.settings = {
                spaceshipSpeed: 3,
                gameTimer: 10000
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
