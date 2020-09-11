import PreloadScene from '../Scene/PreloadScene';
import GameScene from '../Scene/GameScene';

export default {
    type : Phaser.WEBGL,
    parent : 'Flappy bird phaser 3',
    width: 800,
    height: 600,
    physics : {
        default : 'arcade',
        arcade : {
            gravity : { y : 0 },
            debug : false
        }
    },
    scene : [ PreloadScene, GameScene ]
}