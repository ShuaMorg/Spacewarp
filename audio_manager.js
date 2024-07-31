class AudioPoint {
  constructor(x, y, z, audioFile, innerRange, outerRange) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.audio = new Audio(audioFile);
    this.innerRange = innerRange;
    this.outerRange = outerRange;
    this.isPlaying = false;
  }

  playAudio() {
    if (!this.isPlaying) {
      this.audio.loop = true; // Ensure the audio loops
      this.audio.play().catch(error => {
        console.log('Failed to play audio:', error);
      });
      this.isPlaying = true;
    }
  }

  adjustVolume(distance) {
    if (distance <= this.innerRange) {
      this.audio.volume = 1; // 100% volume
    } else if (distance <= this.outerRange) {
      const volume = 1 - (distance - this.innerRange) / (this.outerRange - this.innerRange);
      this.audio.volume = volume;
    } else {
      this.audio.volume = 0; // 0% volume
    }
  }

  stopAudio() {
    if (this.isPlaying) {
      this.audio.pause();
      this.isPlaying = false;
    }
  }

  checkProximity(position) {
    const distance = Math.sqrt(
      Math.pow(position.x - this.x, 2) +
      Math.pow(position.y - this.y, 2) +
      Math.pow(position.z - this.z, 2)
    );

    if (distance <= this.outerRange) {
      this.playAudio();
      this.adjustVolume(distance);
    } else {
      this.stopAudio();
    }
  }
}

// Create instances of AudioPoint with inner and outer ranges
const points = [
  new AudioPoint(100, 1900, -9000, 'Scene2.m4a', 100, 300),
  new AudioPoint(0, 0, -250, 'Scene1.m4a', 50, 175)
];

function checkProximityAndPlaySound(position) {
  points.forEach(point => {
    point.checkProximity(position);
  });
}

// Example usage: Update user position and check proximity
let userPosition = { x: 0, y: 0, z: 0 };
setInterval(() => {
  checkProximityAndPlaySound(userPosition);
}, 100);