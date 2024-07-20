// audio_manager.js
const audioFiles = {};

function playAudio(fileName) {
  if (!audioFiles[fileName]) {
    audioFiles[fileName] = new Audio(fileName);
  }
  audioFiles[fileName].play().catch(error => {
    console.log('Failed to play audio:', error);
  });
}

function checkProximityAndPlaySound(position) {
  const points = [
    { x: 0, y: 20, z: -300, audioFile: 'test.wav' },
    { x: -20, y: -20, z: -400, audioFile: 'test2.wav' }
  ];

  points.forEach(point => {
    const distance = Math.sqrt(
      Math.pow(position.x - point.x, 2) +
      Math.pow(position.y - point.y, 2) +
      Math.pow(position.z - point.z, 2)
    );

    if (distance < 200) {
      playAudio(point.audioFile);
    }
  });
}
