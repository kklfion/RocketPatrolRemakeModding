let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [Menu, Play]
}

let game = new Phaser.Game(config);

let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

let keyLEFT, keyRIGHT, keyF, keyR;

/*

External Asset Credits:

Explosion SFX from:
http://freesoundeffect.net/sound/8-bit-style-slip-01-sound-effect
http://freesoundeffect.net/sound/negative-game-action-hitv2-sound-effect
http://freesoundeffect.net/sound/wrong-answer-game-over-6-sound-effect
http://freesoundeffect.net/sound/arcade-app-lose-points-sound-effect


*/