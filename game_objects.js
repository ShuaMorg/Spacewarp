// game_objects.js

let scene, camera, renderer;
let dusts = [];
let score = 0;
let audioContext, oscillator;
const speed = 0.1;

function createDust(scene) {
  for (let i = 0; i < 150; i++) {
    const dustGeometry = new THREE.SphereGeometry(0.3, 32, 32);
    const dustMaterial = new THREE.MeshBasicMaterial({ color: 0xD3D3D3 });
    const dust = new THREE.Mesh(dustGeometry, dustMaterial);
    dust.position.set(
      Math.random() * 9200 - 100,
      Math.random() * 9200 - 100,
      Math.random() * 9200 - 100
    );
    dust.scale.set(0.01, 0.01, 0.01);  // Start very small
    dust.growthRate = 0.001;  // Set a slower growth rate
    scene.add(dust);
    dusts.push(dust);
  }
}

function updateDusts(spacecraft) {
  for (let dust of dusts) {
    dust.position.z += speed;

    if (dust.scale.x < 1) {  // Grow until full size
      dust.scale.x += dust.growthRate;
      dust.scale.y += dust.growthRate;
      dust.scale.z += dust.growthRate;
    }

    if (dust.position.distanceTo(spacecraft.position) > 100) {
      dust.position.set(
        Math.random() * 200 - 100 + spacecraft.position.x,
        Math.random() * 200 - 100 + spacecraft.position.y,
        Math.random() * 200 - 100 + spacecraft.position.z
      );
      dust.scale.set(0.01, 0.01, 0.01);  // Reset size
    }

    if (spacecraft.position.distanceTo(dust.position) < 1) {
      score += 1;
      document.getElementById('score').textContent = 'Score: ' + score;
      playSound();
      dust.position.set(
        Math.random() * 200 - 100 + spacecraft.position.x,
        Math.random() * 200 - 100 + spacecraft.position.y,
        Math.random() * 200 - 100 + spacecraft.position.z
      );
    }
  }
}

function playSound() {
  oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
  gainNode.gain.setValueAtTime(0.5, audioContext.currentTime);

  oscillator.start();
  oscillator.stop(audioContext.currentTime + 0.1);
}

function resetGame() {
  resetPlayer();  // Call function from player.js to reset the player-controlled object
  score = 0;
  document.getElementById('score').textContent = 'Score: ' + score;
  for (let object of objects) {
    object.position.set(
      Math.random() * 200 - 100,
      Math.random() * 200 - 100,
      Math.random() * 200 - 100
    );
  }
  for (let dust of dusts) {
    dust.position.set(
      Math.random() * 200 - 100,
      Math.random() * 200 - 100,
      Math.random() * 200 - 100
    );
  }
}