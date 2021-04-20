/*------------------------------------------------------------------------
Name: Fion Kwok
Project: Rocket Patrol Remake Mods
Date: 4/19/2021
Time spent: about 10-13 hours
--------------------------Points Breakdown--------------------------------

60 points - redesigned the game to a dreamy theme with cats

20 points - created a new spaceship type(the witch)

20 points - created new artworks for all in-game assets

10 points - included 4 new explosion SFX and randomized them

10 points - replaced the UI borders with a tree-like frame

10 points - created a new title screen

10 points - implemented parallax scrolling

5 points - track and display a high score that persists across scenes

5 points - Included a copyright-free music to the Play scene

5 points - created a new scrolling tile sprite for the background

5 points - allow the player to control the rocket(paw) after it's fired

Total: 160 points

-------------------------External Asset Credits---------------------------

Play scene BGM: 8 Bit Chillout! by HeatleyBros
https://www.youtube.com/watch?v=8El8ZP8LMFE

Ship(Paper Plane) Explosion SFX from freesoundeffect.net:
http://freesoundeffect.net/sound/8-bit-style-slip-01-sound-effect
http://freesoundeffect.net/sound/negative-game-action-hitv2-sound-effect
http://freesoundeffect.net/sound/wrong-answer-game-over-6-sound-effect
http://freesoundeffect.net/sound/arcade-app-lose-points-sound-effect

All artwork and the meow Sound Effect were done by me.

-------------------------------------------------------------------------*/

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
