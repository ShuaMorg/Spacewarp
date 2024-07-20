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

  checkProximity(position) {
    const distance = Math.sqrt(
      Math.pow(position.x - this.x, 2) +
      Math.pow(position.y - this.y, 2) +
      Math.pow(position.z - this.z, 2)
    );

    if (distance < 50) {
      this.playAudio();
    }
  }
}

// Create instances of AudioPoint outside the function
const points = [
  new AudioPoint(20, -50, -500, 'test2.wav'),
  new AudioPoint(-30, 20, -300, 'test.wav')
];


function checkProximityAndPlaySound(position) {
  points.forEach(point => {
    point.checkProximity(position);
  });
}
