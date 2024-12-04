// main.js

// Assuming enemies.js has been included as a script before this file

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
    init(TargetCoordinates);
  });
});

function goFullScreen() {
  if (document.documentElement.requestFullscreen) {
    document.documentElement.requestFullscreen().then(() => onWindowResize());
  } else if (document.documentElement.mozRequestFullScreen) {
    document.documentElement.mozRequestFullScreen().then(() => onWindowResize());
  } else if (document.documentElement.webkitRequestFullscreen) {
    document.documentElement.webkitRequestFullscreen().then(() => onWindowResize());
  } else if (document.documentElement.msRequestFullscreen) {
    document.documentElement.msRequestFullscreen().then(() => onWindowResize());
  }
}

// Update the renderer and camera on window resize
function onWindowResize() {
  const width = window.innerWidth;
  const height = window.innerHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  renderer.setSize(width, height);
  renderer.setPixelRatio(window.devicePixelRatio);  // Ensures the resolution matches the display
}

// Attach resize event listener
window.addEventListener('resize', onWindowResize, false);

// Modify the init function to accept starting coordinates
function init(startCoordinates) {
  audioContext = new (window.AudioContext || window.webkitAudioContext)();

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 50000000); // Increased far clipping plane to include distant stars
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  createPlayer(scene);  // Call function from player.js to create the player-controlled object
  createPortals(scene, renderer);  // Pass renderer to create portals
  createWarps(scene, renderer);  // Pass renderer to create warps
  
  createShapes(scene);  // Call function from shapes.js to create shapes
  
  createEnemies(scene);  // Start spawning enemies from enemies.js

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
  createMoons(scene);  // Call function from moon.js to create moons
  createWorlds(scene);  // Call function from planet.js to create worlds
  createSurfaces(scene);  // Call function from planet.js to create surfaces
  createStars(scene);  // Call function from star.js to create stars
  createAsteroids(scene);  // Call function from asteroids.js to create asteroids
  createNebulas(scene);  // Call function from asteroids.js to create nebulas
  createSmokes(scene);  // Call function from asteroids.js to create smokes
  createBgs(scene);  // Call function from backgrounds.js to create backgrounds

  window.addEventListener('resize', onWindowResize, false);
  window.addEventListener('deviceorientation', handleOrientation, true);

  // Create the HUD for displaying player coordinates
  createHUD();

  animate();
}

function createHUD() {
  const hud = document.createElement('div');
  hud.id = 'hud';
  hud.style.position = 'absolute';
  hud.style.top = '10px';
  hud.style.left = '10px';
  hud.style.color = 'neon green';
  hud.style.fontSize = '8px';
  hud.style.fontFamily = "'Press Start 2P', cursive";
  hud.style.zIndex = '100';
  document.body.appendChild(hud);
}

function updateHUD() {
  const hud = document.getElementById('hud');
  if (hud && spacecraft) {
    hud.innerHTML = `X: ${spacecraft.position.x.toFixed(2)}, Y: ${spacecraft.position.y.toFixed(2)}, Z: ${spacecraft.position.z.toFixed(2)}`;
  }
}

function animate() {
  requestAnimationFrame(animate);

  // Update the portal and warp views, pass the player (spacecraft) to the updatePortals function
  updatePortals(renderer, scene, spacecraft);  // Now we pass the player object to update portals
  
  updatePlayer(pitch, roll, speed);  // Update the player-controlled object

  camera.position.x = spacecraft.position.x;
  camera.position.y = spacecraft.position.y + 2;
  camera.position.z = spacecraft.position.z + 4;  // Adjusted camera distance

  // Move the background texture to create a sense of motion
  if (bgTexture) {
    bgTexture.offset.x -= pitch * speed * 0.01;
    bgTexture.offset.y += roll * speed * 0.01;
  }

  checkPortalCollision(spacecraft);  // Check portal collision
  checkWarpCollision(spacecraft);  // Check warp collision
  
  checkAsteroidCollision(spacecraft);  // Check asteroid collision
  checkNebulaCollision(spacecraft);  // Check nebula collision
  checkShapeCollision(spacecraft);  // Check shape collision
  checkProximityAndPlaySound(spacecraft.position);  // Check proximity and play sound
  updateDusts(spacecraft);  // Update dusts

  updateEnemies();  // Update enemies and their projectiles

  animateShapes();  // Animate shapes

  updateHUD();  // Update HUD with current coordinates

  renderer.render(scene, camera);
}
