import { config } from '../config/config';

class PreloadScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PreloadScene' });
    }

    preload() {
        //load image
        this.load.image('bgLoading', '../../src/assets/images/loading/bg_loading.jpg');
    }

    create() {
        //add background image
        this.add.image(config.width / 2, config.height / 2, 'bgLoading');

        this.count = 10;
        //add text
        this.textTimeEvents = this.add.text(config.width - 440, config.height - 370, this.count + '%', { fontSize: '40px', fill: 'red' });
        //time events loop
        this.time.addEvent({
            delay: 1000,
            callback: this.timeEventsLoop,
            callbackScope: this,
            loop: true
        });
    }

    timeEventsLoop() {
        this.count += 10;
        if (this.count == 100) {
            this.scene.start('GameScene');
        }
        this.textTimeEvents.setText(this.count + '%');
    }
}

export default PreloadScene;