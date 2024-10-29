class AudioPoint {
  constructor(x, y, z, audioFile, maxDistance = 2000, playFullVolumeInRange = false) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.audio = new Audio(audioFile);
    this.isPlaying = false;
    this.maxDistance = maxDistance;
    this.playFullVolumeInRange = playFullVolumeInRange;
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

    if (distance < this.maxDistance) {
      if (this.playFullVolumeInRange) {
        this.setVolume(1); // Set to full volume
      } else {
        const volume = 1 - (distance / this.maxDistance);
        this.setVolume(volume);
      }
      this.playAudio();
    } else {
      this.setVolume(0);
    }
  }
}

// Create instances of AudioPoint with the new parameter
const points = [

// Scene 1
new AudioPoint(0, 0, -1400, 'Scene1.m4a', 1000, true),
new AudioPoint(-10, 0, -300, 'Scene 1 - Genny.wav', 125),
new AudioPoint(20, -20, -400, 'Scene 1 - Genny.wav', 125),
new AudioPoint(-20, 50, -900, 'Scene 1 - Genny.wav', 125),

new AudioPoint(-200, 0, -400, 'Scene 1 - Base.wav', 6080),
//new AudioPoint(20, -20, -400, 'bells.WAV', 280),



// Scene 2 - Asteroids
new AudioPoint(100, 1900, -9000, 'scene2.m4a', 1300, true),
new AudioPoint(100, 1900, -9000, 'Scene 1 - Base.wav', 1080),


//after asteroid

new AudioPoint(100, 1900, -25100, 'scene3.m4a', 75),


new AudioPoint(100, 1900, -25200, 'Vb3.mp3', 150),
  new AudioPoint(75, 1850, -25250, 'Ve2.mp3', 150),
  new AudioPoint(50, 1950, -25300, 'Vcs2.mp3', 150),
new AudioPoint(50, 1950, -25350, 'Vgs.mp3', 150),

// Scene 4

new AudioPoint(0, 0, 101400, 'Vb3.mp3', 400),
new AudioPoint(0, 50, 101352, 'Ve2.mp3', 400),
new AudioPoint(0, 100, 101305, 'Vcs2.mp3', 400),
new AudioPoint(0, 150, 101258, 'Vgs.mp3', 400),
new AudioPoint(0, 200, 101211, 'Ve3.mp3', 400),
new AudioPoint(0, 250, 101164, 'Vb2.mp3', 400),
new AudioPoint(0, 300, 101117, 'Vfs.mp3', 400),
new AudioPoint(0, 350, 101070, 'Vb.mp3', 400),
new AudioPoint(0, 400, 101023, 'Vcs.mp3', 400),
new AudioPoint(0, 450, 100976, 'Ve.mp3', 400),
new AudioPoint(0, 500, 100929, 'Vgs3.mp3', 400),
new AudioPoint(0, 550, 100882, 'Vfs3.mp3', 400),
new AudioPoint(0, 600, 100835, 'Ve2.mp3', 400),
new AudioPoint(0, 650, 100788, 'Vcs2.mp3', 400),
new AudioPoint(0, 700, 100741, 'Vgs.mp3', 400),
new AudioPoint(0, 750, 100694, 'Ve3.mp3', 400),
new AudioPoint(0, 800, 100647, 'Vb3.mp3', 400),
new AudioPoint(0, 850, 100600, 'Vcs.mp3', 400),
new AudioPoint(0, 900, 100553, 'Ve.mp3', 400),
new AudioPoint(0, 950, 100506, 'Vb2.mp3', 400),
new AudioPoint(0, 1000, 100459, 'Vfs.mp3', 400),
new AudioPoint(0, 1050, 100412, 'Vgs3.mp3', 400),
new AudioPoint(0, 1100, 100365, 'Ve2.mp3', 400),
new AudioPoint(0, 1150, 100318, 'Vcs2.mp3', 400),
new AudioPoint(0, 1200, 100271, 'Vb3.mp3', 400),
new AudioPoint(0, 1250, 100224, 'Vgs.mp3', 400),
new AudioPoint(0, 1300, 100177, 'Ve3.mp3', 400),
new AudioPoint(0, 1350, 100130, 'Vcs2.mp3', 400),
new AudioPoint(0, 1400, 100083, 'Vfs3.mp3', 400),
new AudioPoint(0, 1450, 100036, 'Ve.mp3', 400),
new AudioPoint(0, 1500, 99989, 'Vgs3.mp3', 400),
new AudioPoint(0, 1550, 99942, 'Vcs.mp3', 400),
new AudioPoint(0, 1600, 99895, 'Vfs.mp3', 400),
new AudioPoint(0, 1650, 99848, 'Vb.mp3', 400),
new AudioPoint(0, 1700, 99800, 'Vb2.mp3', 400),


// After Pyramid
//new AudioPoint(0, -100000, 101500, 'S5bge.wav', 800),
new AudioPoint(0, -100000, 101500, 'S6e.wav', 300),
new AudioPoint(0, -100000, 101000, 'S5bge.wav', 800),
new AudioPoint(0, -100000, 100000, 'Ve3.mp3', 1000),
new AudioPoint(0, -100000, 100900, 'S4e.wav', 300),
new AudioPoint(0, -100000, 100000, 'S2e.wav', 600),

new AudioPoint(100000, 101000, 96000, 'Sky Decon.wav', 3000),
new AudioPoint(0, -100000, 100000, 'S2e.wav', 600),


];

function checkProximityAndPlaySound(position) {
  points.forEach(point => {
    point.checkProximity(position);
  });
}
