// audio_manager.js
class AudioPoint {
  constructor(x, y, z, audioFile) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.audio = new Audio(audioFile);
    this.isPlaying = false;
  }

  playAudio() {
    if (!this.isPlaying) {
      this.audio.play().catch(error => {
        console.log('Failed to play audio:', error);
      });
      this.isPlaying = true;
    }
  }

  stopAudio() {
    if (this.isPlaying) {
      this.audio.pause();
      this.audio.currentTime = 0;
      this.isPlaying = false;
    }
  }
}

function checkProximityAndPlaySound(position) {
  const points = [
    new AudioPoint(0, 20, -300, 'test.wav'),
    new AudioPoint(-20, -20, -400, 'test2.wav')
  ];

  points.forEach(point => {
    const distance = Math.sqrt(
      Math.pow(position.x - point.x, 2) +
      Math.pow(position.y - point.y, 2) +
      Math.pow(position.z - point.z, 2)
    );

    if (distance < 300) {
      point.playAudio();
    } else {
      point.stopAudio();
    }
  });
}
