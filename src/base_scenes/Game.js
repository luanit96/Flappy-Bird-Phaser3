import Config  from '../config';
import Bird from '../base_classes/Bird';
import Parameters from '../parameters';
import Audio from '../base_classes/Audio';

export default class GameScene extends Phaser.Scene {
    constructor() {
        super('Game');
    }

    create() {
        //class Audio
        this.audioObject = new Audio(this);

        let bgRandom = Phaser.Math.Between(0, 1);
        let bgDayOfNight;
        switch(bgRandom) {
            case 1: bgDayOfNight = 'background-night.jpg'; break;
            default: bgDayOfNight = 'background.jpg';
        }
        this.background = this.add.sprite(0, 0, 'spriteImage', bgDayOfNight).setOrigin(0, 0);
        this.title = this.add.sprite(Config.width / 2, Config.height - 560, 'spriteImage', 'title.png');
        this.groundSprite = this.physics.add.staticGroup();
        this.groundSprite.create(Config.width / 2, Config.height - 30, 'spriteImage', 'ground-sprite.jpg');
        this.textScore = this.add.text(Config.width - 784, Config.height - 584, 'SCORE:' + Parameters.score, Parameters.css.score);
        //Class Bird
        const bird = new Bird(this);
    }
}