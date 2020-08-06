import Config from '../Config/config';
import Style from '../Css/style';
import Options from '../Constant/options';
import GameScene from '../Scene/GameScene';
import Pipe from './Pipe';

export default class Bird extends Phaser.Scene {
    constructor(scene) {
        super(scene);
        scene.add.existing(this);
        this.scene = scene;
        this.addBird();
    }

    addBird() {
        //sound add
        this.audioFlap = this.scene.sound.add('flap');
        this.audioHit = this.scene.sound.add('hit');
        this.bird = this.scene.physics.add.sprite(Config.width - 650, Config.height - 500, 'spriteImage', 'bird.png').setScale(1.5);
        this.bird.body.gravity.y = 1000;
        this.pointer = this.scene.input.on('pointerdown', this.clickPointerDown, this);
        this.scene.input.on('pointerup', this.clickPointerUp, this);
        //Class Pipe
        this.pipes = new Pipe(this.scene);
        this.platformCollider = this.scene.physics.add.collider(this.bird, this.pipes.pipes, this.hitPipes, null, this);
        this.scene.physics.add.collider(this.bird, this.scene.groundSprite, this.hitGround, null, this); 
    }

    clickPointerDown() {
        this.audioFlap.play();
        this.bird.setAngle(-50);
        this.bird.body.setVelocityY(-400);
        if (this.bird.body.y < 0) {
            this.restartGame();
        }
    }

    clickPointerUp() {
        this.bird.setAngle(10);
    }

    hitPipes(bird, pipe) {
        this.audioHit.play();
        this.pipes.timer.remove();
        bird.body.x = 300;
        bird.body.y = 0;
        bird.setAngle(100);
        this.restartGame();
    }

    hitGround(bird, ground) {
        this.pipes.timer.remove();
        bird.setAngle(100);
        this.restartGame();
    }

    restartGame() {
        this.scene.title.setFrame('gameover.png');
        this.pointer.removeAllListeners();
        this.scene.physics.world.removeCollider(this.platformCollider);
        this.scene.add.sprite(Config.width / 2, Config.height / 2 - 50, 'spriteImage', 'score.png');
        this.scene.add.sprite(Config.width / 2, Config.height - 200, 'spriteImage', 'restart.png').setInteractive();
        var width;
        if(Options.score >= 10000) {
            width = Config.width / 2 - 42;
        } else if(Options.score >= 1000) {
            width = Config.width / 2 - 34;
        } else if(Options.score >= 100) {
            width = Config.width / 2 - 25;
        } else if(Options.score >= 10) {
            width = Config.width / 2 - 17;
        } else {
            width = Config.width / 2 - 13;
        }
        this.scene.add.text(width, Config.height - 350, Options.score, Style.point);
        this.scene.input.on('pointerdown', () => this.resetGame(), this);
    }

    resetGame() {
        this.scene.title.setFrame('title.png');
        Options.countScore = 0;
        Options.score = 0;
        this.scene.textScore.setText('SCORE:' + Options.score);
        this.scene.scene.start('GameScene');
    }
}