import Options from '../Constant/options';
import Config from '../Config/config';

export default class Pipe extends Phaser.Scene {
    constructor(scene) {
        super(scene);
        scene.add.existing(this);
        this.scene = scene;
        this.pipe();
    }

    pipe() {
        //sound add
        this.audioScore = this.scene.sound.add('score');
        this.pipes = this.scene.physics.add.group();
        //loop event
        this.timer = this.scene.time.addEvent({
            delay: Options.delay,
            callback: this.addRowsPipe,
            callbackScope: this,
            paused: false,
            loop: true
        });
    }

    addRowsPipe() {
        const min = 1, max = 7;
        const hole = Phaser.Math.Between(min, max);
        for (let i = 0; i < 11; i++) {
            if (i != hole && i != hole + 1 && i != hole + 2) {
                this.addOnePipe(Config.width - 100, i * 50 + 10);
            }
        }
        Options.countScore++;
        if (Options.countScore >= 3) {
            this.updatePoint(Options.point);
        }
    }

    addOnePipe(x, y) {
        let pipeColor = this.scene.background.frame.name === 'background.jpg' ? 'pipe.jpg' : 'pipe-red.jpg';
        let pipe = this.scene.physics.add.sprite(x, y, 'spriteImage', pipeColor);
        this.pipes.add(pipe);
        pipe.body.setVelocityX(-200);
        pipe.setImmovable();
    }

    updatePoint(score) {
        this.audioScore.play();
        Options.score += score;
        this.scene.textScore.setText('SCORE:' + Options.score);
    }
}