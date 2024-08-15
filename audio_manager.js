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
new AudioPoint(0, 0, 0, 'Scene1.m4a', 1220, true),
new AudioPoint(15, 0, -950, 'drum.WAV', 700),
new AudioPoint(-200, 0, -400, 'Vb3.mp3', 280),
new AudioPoint(20, -20, -400, 'bells.WAV', 280),


  new AudioPoint(326, -428, -3286, 'Vb3.mp3', 500), // Will play with distance-based volume
  new AudioPoint(602, 598, -5136, 'Ve2.mp3', 500),
  new AudioPoint(-90, -200, -5744, 'Vcs2.mp3', 500),
  new AudioPoint(-708, -588, -6084, 'Ve2.mp3', 500),
  new AudioPoint(-218, 112, -6828, 'Vgs.mp3', 500),
  new AudioPoint(452, 644, -7305, 'Ve2.mp3', 500),
  new AudioPoint(50, 790, -7689, 'Vcs2.mp3', 500),
  new AudioPoint(-480, 692, -8052, 'Vcs2.mp3', 500),
  new AudioPoint(146, -496, -8988, 'Vcs2.mp3', 500),
  new AudioPoint(502, -792, -9250, 'Vb3.mp3', 500),
  new AudioPoint(416, -708, -10616, 'Ve3.mp3', 500),
  new AudioPoint(44, 228, -10916, 'Ve2.mp3', 500, true),
  new AudioPoint(-190, -142, -11506, 'Ve3.mp3', 500),
  new AudioPoint(-544, -462, -11806, 'Vcs.mp3', 500, true),
  new AudioPoint(506, -520, -13448, 'Vb2.mp3', 500),
  new AudioPoint(-62, -618, -12886, 'Vfs.mp3', 500, true),
  new AudioPoint(776, -52, -14410, 'Vb3.mp3', 500),
  new AudioPoint(-218, 112, -14610, 'Vgs.mp3', 500, true),
  new AudioPoint(452, 644, -14910, 'Ve2.mp3', 500),
  new AudioPoint(50, 790, -15658, 'Vcs2.mp3', 500, true),
  new AudioPoint(-480, 692, -15958, 'Vcs2.mp3', 500),
  new AudioPoint(146, -496, -16218, 'Vcs2.mp3', 500, true),
  new AudioPoint(-300, 500, -16600, 'Vb3.mp3', 500),
  new AudioPoint(400, -300, -17100, 'Vcs2.mp3', 500, true),
  new AudioPoint(-600, 600, -17600, 'Vgs.mp3', 500),
  new AudioPoint(500, 200, -18100, 'Vfs.mp3', 500, true),
  new AudioPoint(-200, -500, -18600, 'Vcs2.mp3', 500),
  new AudioPoint(600, -400, -19100, 'Vb3.mp3', 500, true),
  new AudioPoint(-700, 300, -19600, 'Vgs.mp3', 500),
  new AudioPoint(800, -600, -20100, 'Ve2.mp3', 500, true),
  new AudioPoint(-400, 700, -20600, 'Vcs2.mp3', 500),

// Scene 2 - Asteroids
new AudioPoint(100, 1900, -9000, 'scene2.m4a', 1300, true),



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
new AudioPoint(0, -100000, 101500, 'Music/S5bge.wav', 800),
new AudioPoint(0, -100000, 101500, 'Music/S6e.wav', 300),
new AudioPoint(0, -100000, 101000, 'S5bge.wav', 800),
new AudioPoint(0, -100000, 100000, 'Ve3.mp3', 1000),
new AudioPoint(0, -100000, 100900, 'Music/S4e.wav', 300),
new AudioPoint(0, -100000, 100000, 'Music/S2e.wav', 600),




];

function checkProximityAndPlaySound(position) {
  points.forEach(point => {
    point.checkProximity(position);
  });
}
