import Key from '../../Key/key';
//Class Audio
export default class Audio {
    constructor(scene, keyAudio = Key.audio) {
        this.scene = scene;
        this.keyAudio = keyAudio;
        this.audioFlap = scene.sound.add('flap');
        this.audioHit = scene.sound.add('hit');
        this.audioScore = scene.sound.add('score');
    }
}