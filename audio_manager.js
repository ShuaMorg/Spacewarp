class AudioPoint {
  constructor(x, y, z, audioFile, innerRange, outerRange) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.audio = new Audio(audioFile);
    this.isPlaying = false;
    this.innerRange = innerRange;
    this.outerRange = outerRange;
  }

  playAudio() {
    if (!this.isPlaying) {
      this.audio.loop = true; // Ensure the audio loops continuously
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

  adjustVolume(distance) {
    let volume = 0;
    if (distance <= this.innerRange) {
      volume = 1;
    } else if (distance <= this.outerRange) {
      volume = 1 - (distance - this.innerRange) / (this.outerRange - this.innerRange);
    }
    this.audio.volume = volume;
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
      this.adjustVolume(distance);
      this.stopAudio();
    }
  }
}

// Create instances of AudioPoint with inner and outer ranges
const points = [
  new AudioPoint(100, 1900, -9000, 'Scene2.m4a', 500, 1000),
  new AudioPoint(0, 0, -850, 'Scene1.m4a', 300, 800)
];

function checkProximityAndPlaySound(position) {
  points.forEach(point => {
    point.checkProximity(position);
  });
}

export { checkProximityAndPlaySound }; // Ensure the function is available for import