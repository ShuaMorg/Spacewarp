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
  new AudioPoint(-200, 0, -400, 'Vb3.mp3', 280),


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

//after asteroid

new AudioPoint(100, 1900, -25100, 'scene3.m4a', 75),


new AudioPoint(100, 1900, -25200, 'Vb3.mp3', 150),
  new AudioPoint(75, 1850, -25250, 'Ve2.mp3', 150),
  new AudioPoint(50, 1950, -25300, 'Vcs2.mp3', 150),
new AudioPoint(50, 1950, -25350, 'Vgs.mp3', 150),

// Scene 4

new AudioPoint(0, 0, 101400, 'Vb3.mp3', 100),
new AudioPoint(0, 38, 101358, 'Ve2.mp3', 100),
new AudioPoint(0, 75, 101315, 'Vcs2.mp3', 100),
new AudioPoint(0, 113, 101273, 'Vgs.mp3', 100),
new AudioPoint(0, 150, 101230, 'Ve3.mp3', 100),
new AudioPoint(0, 188, 101188, 'Vb2.mp3', 100),
new AudioPoint(0, 225, 101145, 'Vfs.mp3', 100),
new AudioPoint(0, 263, 101103, 'Vb.mp3', 100),
new AudioPoint(0, 301, 101060, 'Vcs.mp3', 100),
new AudioPoint(0, 338, 101018, 'Ve.mp3', 100),
new AudioPoint(0, 376, 100975, 'Vgs3.mp3', 100),
new AudioPoint(0, 413, 100933, 'Vfs3.mp3', 300),
new AudioPoint(0, 451, 100891, 'Ve2.mp3', 300),
new AudioPoint(0, 488, 100848, 'Vcs2.mp3', 300),
new AudioPoint(0, 526, 100806, 'Vgs.mp3', 300),
new AudioPoint(0, 563, 100763, 'Ve3.mp3', 300),
new AudioPoint(0, 601, 100721, 'Vb3.mp3', 300),
new AudioPoint(0, 639, 100678, 'Vcs.mp3', 300),
new AudioPoint(0, 676, 100636, 'Ve.mp3', 300),
new AudioPoint(0, 714, 100593, 'Vb2.mp3', 300),
new AudioPoint(0, 751, 100551, 'Vfs.mp3', 300),
new AudioPoint(0, 789, 100508, 'Vgs3.mp3', 300),
new AudioPoint(0, 826, 100466, 'Ve2.mp3', 300),
new AudioPoint(0, 864, 100424, 'Vcs2.mp3', 300),
new AudioPoint(0, 902, 100381, 'Vb3.mp3', 300),
new AudioPoint(0, 939, 100339, 'Vgs.mp3', 300),
new AudioPoint(0, 977, 100296, 'Ve3.mp3', 300),
new AudioPoint(0, 1014, 100254, 'Vcs2.mp3', 300),
new AudioPoint(0, 1052, 100211, 'Vfs3.mp3', 300),
new AudioPoint(0, 1089, 100169, 'Ve.mp3', 300),
new AudioPoint(0, 1127, 100126, 'Vgs3.mp3', 300),
new AudioPoint(0, 1164, 100084, 'Vcs.mp3', 300),
new AudioPoint(0, 1202, 100041, 'Vfs.mp3', 300),
new AudioPoint(0, 1239, 99999, 'Vb.mp3', 300),
new AudioPoint(0, 1277, 99999, 'Vb2.mp3', 300)];

function checkProximityAndPlaySound(position) {
  points.forEach(point => {
    point.checkProximity(position);
  });
}