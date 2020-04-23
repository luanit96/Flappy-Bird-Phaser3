import { constant } from  '../constant/index';
import { config } from '../config/config';

class GameScene extends Phaser.Scene {
    constructor() {
        super({key : 'GameScene'});
    }

    preload() {
        //load image
        this.load.image('title', '../../src/assets/images/flappybird/title.png');
        this.load.image('background', '../../src/assets/images/flappybird/background.jpg');
        this.load.image('bird', '../../src/assets/images/flappybird/bird.png');
        this.load.image('pipe', '../../src/assets/images/flappybird/pipe.jpg');
        //load image music
        this.load.image('music', '../../src/assets/images/music/music.png');
        this.load.image('musicOff', '../../src/assets/images/music/music_off.png');
        //load audio
        this.load.audio('audiojump', '../../src/assets/audio/jump.mp3');
    }

    create() {
        //add image
        this.add.image(0, 0, 'background').setOrigin(0,0);
        this.add.image(config.width / 2, config.height - 560, 'title');

        //add image music
        this.music = this.add.sprite(config.width - 50, config.height - 570, 'music').setInteractive();
        //set width, height image
        this.music.displayWidth = 25;
        this.music.displayHeight = 25;

        //add audio
        this.audio = this.sound.add('audiojump');

        //event pointerdown setMusic
        this.music.on('pointerdown', this.setMusic, this);

        //add text
        constant.textPoint = this.add.text(config.width - 784, config.height - 584, 'Point:' + constant.point, { fontSize : '20px', fill : '#fff' });

        constant.bird = this.physics.add.sprite(config.width - 700, config.height - 355, 'bird');
        constant.bird.body.gravity.y = 1000;

        //event pointer
        this.input.on('pointerdown', this.clickPointerDown, this);
        this.input.on('pointerup', this.clickPointerUp);

        constant.pipes = this.physics.add.group();

        //time event loop
        this.time.addEvent({
            delay: 1500,
            callback: this.addRowsPipe,
            callbackScope: this,
            loop: true
        });
        
        this.physics.add.collider(constant.bird, constant.pipes, this.hitPipes, null, this);
    }

    clickPointerDown() {
        if(this.music.texture.key == 'music') {
            this.audio.play();
        }
        constant.bird.setAngle(-50);
        constant.bird.body.setVelocityY(-400);
    }

    clickPointerUp() {
        constant.bird.setAngle(10);
    }

    setMusic() {
        if(this.music.texture.key == 'music') {
            //setTexture
            this.music.setTexture('musicOff');
            this.audio.stop();
        } else {
            //setTexture
            this.music.setTexture('music');
            this.audio.play();
        }
    }

    hitPipes(bird, pipe) {
        alert('Game Over');
        this.resetGame();
    }

    addOnePipe(x, y) {
        let pipe = this.physics.add.sprite(x, y, 'pipe');
        constant.pipes.add(pipe);

        pipe.body.setVelocityX(-200);
    }

    addRowsPipe() {
        const min = 1, max = 8;
        const hole = Phaser.Math.Between(min, max);
        for(let i = 0 ; i < 13 ; i++) {
            if(i != hole && i != hole + 1 && i != hole + 2) {
                this.addOnePipe(400, i * 50 + 10);
            }
        }
        //update point
        this.updatePoint(10);
    }

    updatePoint(point) {
        constant.point += point;
        constant.textPoint.setText('Point:' + constant.point);
    }

    resetGame() {
        constant.point = 0;
        constant.textPoint.setText('Point:' + constant.point);

        this.scene.start('GameScene');
    }

    update() {
        if(constant.bird.body.y < 0 || constant.bird.body.y > config.height) {
            this.resetGame();
        }
    }
}

export default GameScene;