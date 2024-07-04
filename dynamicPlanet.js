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
  console.log('Initializing dynamic planet scene with texture:', planetTexturePath);

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const textureLoader = new THREE.TextureLoader();
  const planetTexture = textureLoader.load(planetTexturePath, onTextureLoad, undefined, onTextureError);

  function onTextureLoad(texture) {
    console.log('Planet texture loaded successfully.');

    const planetGeometry = new THREE.SphereGeometry(planetRadius, 64, 64);
    const planetMaterial = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
    flatPlanet = new THREE.Mesh(planetGeometry, planetMaterial);
    scene.add(flatPlanet);

    const spacecraftGeometry = new THREE.SphereGeometry(0.5, 32, 32);
    const spacecraftMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    spacecraft = new THREE.Mesh(spacecraftGeometry, spacecraftMaterial);
    spacecraft.position.set(0, planetRadius + 0.5, 0);
    scene.add(spacecraft);

    camera.position.set(0, planetRadius + 20, 20);
    camera.lookAt(spacecraft.position);

    window.addEventListener('resize', onWindowResize, false);
    window.addEventListener('deviceorientation', handleOrientation, true);

    animate();
  }

  function onTextureError(error) {
    console.error('Error loading texture:', error);
  }
}

function handleOrientation(event) {
  if (event.alpha !== null) {
    roll = event.beta / 10 - 4.5;
    pitch = event.gamma / 10;

    if (roll > escapeThreshold) {
      escaping = true;
      escapeSpeed = Math.min(escapeSpeed * 1.05, escapeBaseSpeed * 10);
    } else {
      escaping = false;
      escapeSpeed = escapeBaseSpeed;
      escapeTimer = 0;
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
    escapeTimer += 1000 / 60;
    if (escapeTimer >= escapeDuration) {
      returnToMainGame();
      return;
    }
    distanceFactor = Math.min(distanceFactor + escapeSpeed, maxDistanceFactor);
    spacecraft.position.z -= escapeSpeed;
  } else {
    distanceFactor = Math.max(distanceFactor - escapeSpeed * 0.5, 1);
  }

  spacecraft.position.y = planetRadius * distanceFactor + 0.5;
  flatPlanet.rotation.y += pitch * baseSpeed * 0.1;
  flatPlanet.rotation.x += roll * baseSpeed * 0.1;

  camera.position.set(spacecraft.position.x, spacecraft.position.y + 20, spacecraft.position.z + 20);
  camera.lookAt(spacecraft.position);

  renderer.render(scene, camera);
}

function returnToMainGame() {
  window.location.href = "index.html";
}

const urlParams = new URLSearchParams(window.location.search);
planetTexturePath = urlParams.get('texture');
if (planetTexturePath) {
  init(planetTexturePath);
} else {
  console.error('No texture path provided');
}
