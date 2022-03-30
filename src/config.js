import Preload from './base_scenes/Preload';
import Game from './base_scenes/Game';

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
    scene : [ Preload, Game ]
}