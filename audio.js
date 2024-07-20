// audio.js
const audioFiles = {};

function playSound(fileName) {
  if (!audioFiles[fileName]) {
    audioFiles[fileName] = new Audio(fileName);
  }
  audioFiles[fileName].play().catch(error => {
    console.log('Failed to play audio:', error);
  });
}

function checkProximityAndPlaySound(position) {
  const points = [
    { x: 0, y: 100, z: -650, audioFile: 'test.wav' },
    { x: -120, y: -30, z: -300, audioFile: 'test2.wav' }
  ];

  for (const point of points) {
    const distance = Math.sqrt(
      Math.pow(position.x - point.x, 2) +
      Math.pow(position.y - point.y, 2) +
      Math.pow(position.z - point.z, 2)
    );

    if (distance <= 200) {
      playSound(point.audioFile);
    }
  }
}
