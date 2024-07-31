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

      // Ensure the isPlaying flag is reset when the audio ends
      this.audio.onended = () => {
        this.isPlaying = false;
      };
    }
  }

  setVolume(volume) {
    this.audio.volume = volume;
  }

  checkProximity(position) {
    const distance = Math.sqrt(
      Math.pow(position.x - this.x, 2) +
      Math.pow(position.y - this.y, 2) +
      Math.pow(position.z - this.z, 2)
    );

    // Set a maximum distance at which the audio can be heard
    const maxDistance = 100; 

    if (distance < maxDistance) {
      const volume = 1 - (distance / maxDistance);
      this.setVolume(volume);
      this.playAudio();
    } else {
      this.setVolume(0);
    }
  }
}

// Create instances of AudioPoint outside the function
const points = [
  new AudioPoint(100, 1900, -9000, 'Scene2.m4a'),
  new AudioPoint(0, 0, -300, 'Scene1.m4a')
];

function checkProximityAndPlaySound(position) {
  points.forEach(point => {
    point.checkProximity(position);
  });
}