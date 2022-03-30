import Pipe from './Pipe';
import Config from '../config';
import Parameters from '../parameters';

//Class Bird
export default class Bird {
    constructor(scene) {
        this.scene = scene;
        this.renderBird();
    }

    renderBird() {
        this.bird = this.scene.physics.add.sprite(Config.width - 650, Config.height - 500, 'spriteImage', 'bird.png').setScale(1.5);
        this.bird.body.gravity.y = 1000;
        //Event click bird
        this.pointer = this.scene.input.on('pointerdown', () => {
            this.scene.audioObject.audioFlap.play();
            this.bird.setAngle(-50);
            this.bird.body.setVelocityY(-400);
            if (this.bird.body.y < 0) {
                this.restartGame();
            }
        }, this);
        this.scene.input.on('pointerup', () => this.bird.setAngle(10), this);
        //Class Pipe
        this.pipes = new Pipe(this.scene);
        this.platformCollider = this.scene.physics.add.collider(this.bird, this.pipes.pipes, this.hitPipes, null, this);
        this.scene.physics.add.collider(this.bird, this.scene.groundSprite, this.hitGround, null, this); 
    }

    hitPipes(bird, pipe) {
        this.scene.audioObject.audioHit.play();
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
        this.restart = this.scene.add.sprite(Config.width / 2, Config.height - 200, 'spriteImage', 'restart.png').setInteractive();
        var width;
        if(Parameters.score >= 10000) 
            width = Config.width / 2 - 42;
        else if(Parameters.score >= 1000) 
            width = Config.width / 2 - 34;
        else if(Parameters.score >= 100) 
            width = Config.width / 2 - 25;
        else if(Parameters.score >= 10) 
            width = Config.width / 2 - 17;
        else 
            width = Config.width / 2 - 13;
        
        this.scene.add.text(width, Config.height - 350, Parameters.score, Parameters.css.point);
        this.restart.on('pointerdown', this.resetDefault, this);
    }

    resetDefault() {
        this.scene.title.setFrame('title.png');
        Parameters.countScore = 0;
        Parameters.score = 0;
        this.scene.textScore.setText('SCORE:' + Parameters.score);
        this.scene.scene.start('Game');
    }
}