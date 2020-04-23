import PreloadScene from '../scenes/PreloadScene';
import GameScene from '../scenes/GameScene';

export const config = {
    type : Phaser.WEBGL,
    parent : 'Flappy bird phaser 3',
    width : 800,
    height : 600,
    physics : {
        default : 'arcade',
        arcade : {
            gravity : { y : 0 },
            debug : false
        }
    },
    scene : [ PreloadScene,GameScene ]
}