// audio.js
let audio;

function playTestSound() {
  if (!audio) {
    audio = new Audio('test.wav');
  }
  audio.play().catch(error => {
    console.log('Failed to play audio:', error);
  });
}

function checkProximityAndPlaySound(position) {
  const points = [
    { x: 0, y: 200, z: -300 },
    { x: -200, y: -200, z: -600 }
  ];

  for (const point of points) {
    const distance = Math.sqrt(
      Math.pow(position.x - point.x, 2) +
      Math.pow(position.y - point.y, 2) +
      Math.pow(position.z - point.z, 2)
    );

    if (distance <= 200) {
      playTestSound();
      break;
    }
  }
}