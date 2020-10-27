import Config from '../Config/config';

export default class PreloadScene extends Phaser.Scene {
    constructor() {
        super('PreloadScene');
    }

    preload() {
        //load image file json
        this.load.path = '../../assets/';
        this.load.atlas('spriteImage', 'image/spriteImage.png', 'image/spriteImage.json');
        this.load.audio('flap', 'audio/flap.mp3');
        this.load.audio('hit', 'audio/hit.mp3');
        this.load.audio('score', 'audio/score.mp3');
    }

    create() {
        //add background
        this.add.sprite(0, 0, 'spriteImage', 'background.jpg').setOrigin(0, 0);
        this.add.sprite(Config.width / 2, Config.height / 2 - 100, 'spriteImage', 'message.png');
        this.play = this.add.sprite(Config.width / 2, Config.height - 200, 'spriteImage', 'play.png').setScale(1.2).setInteractive();
        //play game
        this.play.on('pointerdown', () => {
            this.play.setScale(0.8);
            this.scene.start('GameScene');
        }, this);
        this.play.on('pointerup', () => this.play.setScale(1.2), this);
    }
}
