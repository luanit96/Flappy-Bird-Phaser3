import Config  from '../Config/config';
import Style from '../Css/style';
import Bird from '../Class/Bird/Bird';
import Options from '../Constant/options';
import Audio from '../Class/Audio/Audio';
import Key from '../Key/key';

export default class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: Key.gameScene });
    }

    create() {
        //class Audio
        this.audioObject = new Audio(this, Key.audio);

        let bgRandom = Phaser.Math.Between(0, 1);
        let bgDayOfNight;
        switch (bgRandom) {
            case 0:
                bgDayOfNight = 'background.jpg';
                break;
            case 1:
                bgDayOfNight = 'background-night.jpg';
                break;
        }
        this.background = this.add.sprite(0, 0, 'spriteImage', bgDayOfNight).setOrigin(0, 0);
        this.title = this.add.sprite(Config.width / 2, Config.height - 560, 'spriteImage', 'title.png');
        this.groundSprite = this.physics.add.staticGroup();
        this.groundSprite.create(Config.width / 2, Config.height - 30, 'spriteImage', 'ground-sprite.jpg');
        this.textScore = this.add.text(Config.width - 784, Config.height - 584, 'SCORE:' + Options.score, Style.score);
        //Class Bird
        const bird = new Bird(this, Key.bird);
    }
}