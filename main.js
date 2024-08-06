// This is main.js

document.querySelectorAll('.startButton').forEach(button => {
  button.addEventListener('click', (event) => {
    const targetIndex = event.target.getAttribute('data-target');
    const targetCoordinates = portalCoordinates[targetIndex];
    goFullScreen();
    document.querySelectorAll('.startButton').forEach(btn => btn.style.display = 'none');
    init(targetCoordinates);
    displayMessages(); // Start displaying messages
  });
});

function goFullScreen() {
  if (document.documentElement.requestFullscreen) {
    document.documentElement.requestFullscreen();
  } else if (document.documentElement.mozRequestFullScreen) {
    document.documentElement.mozRequestFullScreen();
  } else if (document.documentElement.webkitRequestFullscreen) {
    document.documentElement.webkitRequestFullscreen();
  } else if (document.documentElement.msRequestFullscreen) {
    document.documentElement.msRequestFullscreen();
  }
}

// Modify the init function to accept starting coordinates
function init(startCoordinates) {
  audioContext = new (window.AudioContext || window.webkitAudioContext)();

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100000);
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  createPlayer(scene);  // Call function from player.js to create the player-controlled object
  createPortals(scene);  // Call function from portal.js to create portals
createShapes(scene);  // Call function from portal.js to create portals

    
    
  // Set the camera and player initial positions
  if (startCoordinates) {
    camera.position.set(startCoordinates.x, startCoordinates.y + 2, startCoordinates.z + 4);
    teleportPlayer(spacecraft, startCoordinates.x, startCoordinates.y, startCoordinates.z);
  } else {
    camera.position.set(0, 0, 4);  // Initial camera position if no start coordinates are provided
  }

  const textureLoader = new THREE.TextureLoader();
  bgTexture = textureLoader.load('bg1.png');
//  bgTexture.wrapS = bgTexture.wrapT = THREE.RepeatWrapping;
//  bgTexture.repeat.set(10, 10);  // Increase the repeat to cover a larger area

//  const bgGeometry = new THREE.PlaneGeometry(54000, 54000);  // Make the plane larger
//  const bgMaterial = new THREE.MeshBasicMaterial({ map: bgTexture, side: THREE.DoubleSide });
//  background = new THREE.Mesh(bgGeometry, bgMaterial);
//  background.position.z = -19500;  // Position it far back
  // scene.add(background);

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
  createAsteroids(scene);  // Call function from portal.js to create portals
  createBgs(scene);  // Call function from portal.js to create portals

  window.addEventListener('resize', onWindowResize, false);
  window.addEventListener('deviceorientation', handleOrientation, true);

  animate();
}