//Class Audio
export default class Audio {
    constructor(scene) {
        this.audioFlap = scene.sound.add('flap');
        this.audioHit = scene.sound.add('hit');
        this.audioScore = scene.sound.add('score');
    }
}