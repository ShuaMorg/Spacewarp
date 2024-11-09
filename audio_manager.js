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
new AudioPoint(100, 900, -9400, 'Scene1.ogg', 1000, true),
new AudioPoint(-500, -3000, -500, 'Scene 1 - Base.ogg', 6080),
new AudioPoint(400, -3100, -300, 'Scene 1 - Genny.ogg', 425),


// Scene 2 - Asteroids
new AudioPoint(100, 1900, -9000, 'scene2.ogg', 1300, true),
new AudioPoint(100, 1900, -9000, 'Scene 1 - Base.ogg', 1080),


//after asteroid
new AudioPoint(100, 1900, -25100, 'scene3.ogg', 75),

new AudioPoint(100, 1900, -25200, 'Vb3.ogg', 150),
  new AudioPoint(75, 1850, -25250, 'Ve2.ogg', 150),
  new AudioPoint(50, 1950, -25300, 'Vcs2.ogg', 150),
new AudioPoint(50, 1950, -25350, 'Vgs.ogg', 150),

// Scene 4

new AudioPoint(0, 0, 101400, 'Vb3.ogg', 400),
new AudioPoint(0, 50, 101352, 'Ve2.ogg', 400),
new AudioPoint(0, 100, 101305, 'Vcs2.ogg', 400),
new AudioPoint(0, 150, 101258, 'Vgs.ogg', 400),
new AudioPoint(0, 200, 101211, 'Ve3.ogg', 400),
new AudioPoint(0, 250, 101164, 'Vb2.ogg', 400),
new AudioPoint(0, 300, 101117, 'Vfs.ogg', 400),
new AudioPoint(0, 350, 101070, 'Vb.ogg', 400),
new AudioPoint(0, 400, 101023, 'Vcs.ogg', 400),
new AudioPoint(0, 450, 100976, 'Ve.ogg', 400),
new AudioPoint(0, 500, 100929, 'Vgs3.ogg', 400),
new AudioPoint(0, 550, 100882, 'Vfs3.ogg', 400),
new AudioPoint(0, 600, 100835, 'Ve2.ogg', 400),
new AudioPoint(0, 650, 100788, 'Vcs2.ogg', 400),
new AudioPoint(0, 700, 100741, 'Vgs.ogg', 400),
new AudioPoint(0, 750, 100694, 'Ve3.ogg', 400),
new AudioPoint(0, 800, 100647, 'Vb3.ogg', 400),
new AudioPoint(0, 850, 100600, 'Vcs.ogg', 400),
new AudioPoint(0, 900, 100553, 'Ve.ogg', 400),
new AudioPoint(0, 950, 100506, 'Vb2.ogg', 400),
new AudioPoint(0, 1000, 100459, 'Vfs.ogg', 400),
new AudioPoint(0, 1050, 100412, 'Vgs3.ogg', 400),
new AudioPoint(0, 1100, 100365, 'Ve2.ogg', 400),
new AudioPoint(0, 1150, 100318, 'Vcs2.ogg', 400),
new AudioPoint(0, 1200, 100271, 'Vb3.ogg', 400),
new AudioPoint(0, 1250, 100224, 'Vgs.ogg', 400),
new AudioPoint(0, 1300, 100177, 'Ve3.ogg', 400),
new AudioPoint(0, 1350, 100130, 'Vcs2.ogg', 400),
new AudioPoint(0, 1400, 100083, 'Vfs3.ogg', 400),
new AudioPoint(0, 1450, 100036, 'Ve.ogg', 400),
new AudioPoint(0, 1500, 99989, 'Vgs3.ogg', 400),
new AudioPoint(0, 1550, 99942, 'Vcs.ogg', 400),
new AudioPoint(0, 1600, 99895, 'Vfs.ogg', 400),
new AudioPoint(0, 1650, 99848, 'Vb.ogg', 400),
new AudioPoint(0, 1700, 99800, 'Vb2.ogg', 400),


// After Pyramid
//new AudioPoint(0, -100000, 101500, 'S5bge.wav', 800),
new AudioPoint(0, -100000, 101500, 'S6e.ogg', 300),
new AudioPoint(0, -100000, 101000, 'S5bge.ogg', 800),
new AudioPoint(0, -100000, 100000, 'Ve3.ogg', 1000),
new AudioPoint(0, -100000, 100900, 'S4e.ogg', 300),
new AudioPoint(0, -100000, 100000, 'S2e.ogg', 600),

new AudioPoint(100000, 101000, 96000, 'Sky Decon.ogg', 3000),
new AudioPoint(0, -100000, 100000, 'S2e.ogg', 600),


];

function checkProximityAndPlaySound(position) {
  points.forEach(point => {
    point.checkProximity(position);
  });
}
