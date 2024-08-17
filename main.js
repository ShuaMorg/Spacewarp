document.querySelectorAll('.startButton').forEach(button => {
  button.addEventListener('click', (event) => {
    const targetIndex = event.target.getAttribute('data-target');

    // Define both portal and warp target coordinates
    const TargetCoordinates = portalCoordinates[targetIndex];
    const warpTargetCoordinates = warpCoordinates[targetIndex];

    goFullScreen();
    document.querySelectorAll('.startButton').forEach(btn => btn.style.display = 'none');

    // Use either portal or warp target coordinates depending on your game logic
    // Example: initializing with warp target coordinates
    init(warpTargetCoordinates);

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
  createPortals(scene, renderer);  // Pass renderer to create portals
  createWarps(scene, renderer);  // Pass renderer to create warps
  
  createShapes(scene);  // Call function from shapes.js to create shapes
    
  // Set the camera and player initial positions
  if (startCoordinates) {
    camera.position.set(startCoordinates.x, startCoordinates.y + 2, startCoordinates.z + 4);
    teleportPlayer(spacecraft, startCoordinates.x, startCoordinates.y, startCoordinates.z);
  } else {
    camera.position.set(0, 0, 4);  // Initial camera position if no start coordinates are provided
  }

  const textureLoader = new THREE.TextureLoader();
  bgTexture = textureLoader.load('bg1.png');

  createDust(scene); // Call function from game_objects.js to create dust
  createPlanets(scene);  // Call function from planets.js to create planets
  createMoons(scene);  // Call function from moon.js to create moons
  createWorlds(scene);  // Call function from planet.js to create worlds
  createStars(scene);  // Call function from star.js to create stars
  createAsteroids(scene);  // Call function from asteroids.js to create asteroids
  createNebulas(scene);  // Call function from asteroids.js to create nebulas
  createSmokes(scene);  // Call function from asteroids.js to create smokes
  createBgs(scene);  // Call function from backgrounds.js to create backgrounds

  window.addEventListener('resize', onWindowResize, false);
  window.addEventListener('deviceorientation', handleOrientation, true);

  animate();
}

function animate() {
  requestAnimationFrame(animate);

  // Update the portal and warp views
  updatePortals(renderer, scene);  // Call function to update the portals' render targets
  updateWarps(renderer, scene);  // Call function to update the warps' render targets

  updatePlayer(pitch, roll, speed);  // Call function from player.js to update the player-controlled object

  camera.position.x = spacecraft.position.x;
  camera.position.y = spacecraft.position.y + 2;
  camera.position.z = spacecraft.position.z + 4;  // Adjusted camera distance

  // Move the background texture to create a sense of motion
  bgTexture.offset.x -= pitch * speed * 0.01;
  bgTexture.offset.y += roll * speed * 0.01;

  updatePlanets(spacecraft, speed);  // Call function from planets.js to update planets
  checkPortalCollision(spacecraft);  // Call function from portal.js to check portal collision
  checkWarpCollision(spacecraft);  // Call function from warp.js to check warp collision
  
  checkAsteroidCollision(spacecraft);  // Call function from asteroids.js to check asteroid collision
  checkNebulaCollision(spacecraft);  // Call function from nebulas.js to check nebula collision
  checkShapeCollision(spacecraft);  // Call function from shapes.js to check shape collision
  checkProximityAndPlaySound(spacecraft.position);  // Check proximity and play sound
  updateDusts(spacecraft); // Call function from game_objects.js to update dusts

  animateShapes();  // Call the twinkling function to animate shapes

  renderer.render(scene, camera);
}