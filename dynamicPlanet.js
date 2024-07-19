let flatPlanet, spacecraft, renderer, scene, camera;
let pitch = 0, roll = 0;
const baseSpeed = 0.05;  // Base speed for rotation
const escapeBaseSpeed = 0.05;  // Slower initial speed for moving away from the planet
const planetRadius = 500;
const escapeThreshold = 7.5;  // Adjusted threshold for flying straight up to escape the planet
const maxDistanceFactor = 10;  // Maximum distance factor
let distanceFactor = 1;
let escapeSpeed = escapeBaseSpeed;
let escaping = false;
let escapeTimer = 0;
const escapeDuration = 4 * 1000; // 4 seconds in milliseconds
let planetTexturePath;

function init(planetTexturePath) {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Load the planet texture
  const textureLoader = new THREE.TextureLoader();
  const planetTexture = textureLoader.load(planetTexturePath);

  // Create the spherical planet
  const planetGeometry = new THREE.SphereGeometry(planetRadius, 64, 64);
  const planetMaterial = new THREE.MeshBasicMaterial({ map: planetTexture, side: THREE.DoubleSide });
  flatPlanet = new THREE.Mesh(planetGeometry, planetMaterial);
  scene.add(flatPlanet);

  // Create the player-controlled spacecraft
  const spacecraftGeometry = new THREE.SphereGeometry(0.5, 32, 32);
  const spacecraftMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
  spacecraft = new THREE.Mesh(spacecraftGeometry, spacecraftMaterial);
  spacecraft.position.set(0, planetRadius + 0.5, 0); // Static position above the surface
  scene.add(spacecraft);

  camera.position.set(0, planetRadius + 20, 20);
  camera.lookAt(spacecraft.position);

  window.addEventListener('resize', onWindowResize, false);
  window.addEventListener('deviceorientation', handleOrientation, true);

  animate();
}

function handleOrientation(event) {
  if (event.alpha !== null) {
    roll = event.beta / 10 - 4.5;  // Adjusted to fly straight when phone is upright
    pitch = event.gamma / 10;

    // Check if the phone is tilted back sharply
    if (roll > escapeThreshold) {
      escaping = true;
      escapeSpeed = Math.min(escapeSpeed * 1.05, escapeBaseSpeed * 10);  // Increase escape speed exponentially up to a limit
    } else {
      escaping = false;
      escapeSpeed = escapeBaseSpeed;  // Reset escape speed
      escapeTimer = 0;  // Reset escape timer if not escaping
    }
  }
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);

  if (escaping) {
    escapeTimer += 1000 / 60;  // Assuming 60 FPS for timer increment
    if (escapeTimer >= escapeDuration) {
      returnToMainGame();
      return;
    }
    // Increase the distance factor based on escape speed
    distanceFactor = Math.min(distanceFactor + escapeSpeed, maxDistanceFactor);
    // Move the spacecraft forward more quickly
    spacecraft.position.z -= escapeSpeed;
  } else {
    // Decrease the distance factor to simulate falling back
    distanceFactor = Math.max(distanceFactor - escapeSpeed * 0.5, 1);  // Slower decrease to simulate gradual falling back
  }

  // Adjust the spacecraft position based on distanceFactor
  spacecraft.position.y = planetRadius * distanceFactor + 0.5;

  // Rotate the planet beneath the spacecraft
  flatPlanet.rotation.y += pitch * baseSpeed * 0.1;
  flatPlanet.rotation.x += roll * baseSpeed * 0.1;

  // Adjust the camera to follow the spacecraft from above
  camera.position.set(spacecraft.position.x, spacecraft.position.y + 20, spacecraft.position.z + 20);
  camera.lookAt(spacecraft.position);

  renderer.render(scene, camera);
}

function returnToMainGame() {
  // Redirect to the main game (index.html)
  window.location.href = "index.html";
}

// Get the planet texture path from URL parameters
const urlParams = new URLSearchParams(window.location.search);
planetTexturePath = urlParams.get('texture');
init(planetTexturePath);