import Pipe from '../Pipe/Pipe';
import Config from '../../Config/config';
import Options from '../../Constant/options';
import Style from '../../Css/style';
//Class Bird
export default class Bird {
    constructor(scene) {
        this.scene = scene;
        this.addBird();
    }

    addBird() {
        this.bird = this.scene.physics.add.sprite(Config.width - 650, Config.height - 500, 'spriteImage', 'bird.png').setScale(1.5);
        this.bird.body.gravity.y = 1000;
        this.pointer = this.scene.input.on('pointerdown', this.clickPointerDown, this);
        this.scene.input.on('pointerup', this.clickPointerUp, this);
        //Class Pipe
        this.pipes = new Pipe(this.scene);
        this.platformCollider = this.scene.physics.add.collider(this.bird, this.pipes.pipes, this.hitPipes, null, this);
        this.scene.physics.add.collider(this.bird, this.scene.groundSprite, this.hitGround, null, this); 
    }

    /*end function add bird*/

    clickPointerDown() {
        this.scene.audioObject.audioFlap.play();
        this.bird.setAngle(-50);
        this.bird.body.setVelocityY(-400);
        if (this.bird.body.y < 0) {
            this.restartGame();
        }
    }

    /*end function pointerdown*/

    clickPointerUp() {
        this.bird.setAngle(10);
    }

    /*end function pointerup*/

    hitPipes(bird, pipe) {
        this.scene.audioObject.audioHit.play();
        this.pipes.timer.remove();
        bird.body.x = 300;
        bird.body.y = 0;
        bird.setAngle(100);
        this.restartGame();
    }

    /*end function hit pipe*/

    hitGround(bird, ground) {
        this.pipes.timer.remove();
        bird.setAngle(100);
        this.restartGame();
    }

    /*end function hit group*/

    restartGame() {
        this.scene.title.setFrame('gameover.png');
        this.pointer.removeAllListeners();
        this.scene.physics.world.removeCollider(this.platformCollider);
        this.scene.add.sprite(Config.width / 2, Config.height / 2 - 50, 'spriteImage', 'score.png');
        this.restart = this.scene.add.sprite(Config.width / 2, Config.height - 200, 'spriteImage', 'restart.png').setInteractive();
        var width;
        if(Options.score >= 10000) 
            width = Config.width / 2 - 42;
        else if(Options.score >= 1000) 
            width = Config.width / 2 - 34;
        else if(Options.score >= 100) 
            width = Config.width / 2 - 25;
        else if(Options.score >= 10) 
            width = Config.width / 2 - 17;
        else 
            width = Config.width / 2 - 13;
        
        this.scene.add.text(width, Config.height - 350, Options.score, Style.point);
        this.restart.on('pointerdown', this.resetGame, this);
    }

    /*end function restart game*/

    resetGame() {
        this.scene.title.setFrame('title.png');
        Options.countScore = 0;
        Options.score = 0;
        this.scene.textScore.setText('SCORE:' + Options.score);
        this.scene.scene.start('GameScene');
    }

    /*end function reset game*/
}