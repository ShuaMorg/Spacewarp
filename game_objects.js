// game_objects.js

let scene, camera, renderer;
let dusts = [];
let background;
let bgTexture;
let score = 0;
let audioContext, oscillator;
const speed = 0.1;

function init() {
  audioContext = new (window.AudioContext || window.webkitAudioContext)();

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100000);
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  createPlayer(scene);  // Call function from player.js to create the player-controlled object

  camera.position.set(0, 0, 4);  // Initial camera position

  const textureLoader = new THREE.TextureLoader();
  bgTexture = textureLoader.load('bg1.png');
  bgTexture.wrapS = bgTexture.wrapT = THREE.RepeatWrapping;
  bgTexture.repeat.set(10, 10);  // Increase the repeat to cover a larger area

  const bgGeometry = new THREE.PlaneGeometry(54000, 54000);  // Make the plane larger
  const bgMaterial = new THREE.MeshBasicMaterial({ map: bgTexture, side: THREE.DoubleSide });
  background = new THREE.Mesh(bgGeometry, bgMaterial);
  background.position.z = -19500;  // Position it far back
  scene.add(background);

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

 createPlanets(scene);  // Call function from planets.js to create planets
  createMoons(scene);  // Call function from moon.js to create moons
    createWorlds(scene);  // Call function from planet.js to create stars
    
  createStars(scene);  // Call function from star.js to create stars
    
  window.addEventListener('resize', onWindowResize, false);
  window.addEventListener('deviceorientation', handleOrientation, true);

  animate();
}

function animate() {
  requestAnimationFrame(animate);

  updatePlayer(pitch, roll, speed);  // Call function from player.js to update the player-controlled object

  camera.position.x = spacecraft.position.x;
  camera.position.y = spacecraft.position.y;
  camera.position.z = spacecraft.position.z + 4;  // Adjusted camera distance

  // Move the background texture to create a sense of motion
  bgTexture.offset.x -= pitch * speed * 0.01;
  bgTexture.offset.y += roll * speed * 0.01;

  updatePlanets(spacecraft, speed);  // Call function from planets.js to update planets

  checkProximityAndPlaySound(spacecraft.position);  // Check proximity and play sound

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

  renderer.render(scene, camera);
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

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}