let flatPlanet, spacecraft, renderer, scene, camera;
let pitch = 0, roll = 0;
const speed = 0.1;

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Load the flat planet texture
  const textureLoader = new THREE.TextureLoader();
  const planetTexture = textureLoader.load('p7.png');

  // Create the flat planet
  const planetGeometry = new THREE.PlaneGeometry(100, 100);
  const planetMaterial = new THREE.MeshBasicMaterial({ map: planetTexture, side: THREE.DoubleSide });
  flatPlanet = new THREE.Mesh(planetGeometry, planetMaterial);
  flatPlanet.rotation.x = -Math.PI / 2;
  scene.add(flatPlanet);

  // Create the player-controlled spacecraft
  const spacecraftGeometry = new THREE.SphereGeometry(0.5, 32, 32);
  const spacecraftMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
  spacecraft = new THREE.Mesh(spacecraftGeometry, spacecraftMaterial);
  spacecraft.position.set(0, 0.5, 0); // Start above the surface
  scene.add(spacecraft);

  camera.position.set(0, 20, 20);
  camera.lookAt(spacecraft.position);

  window.addEventListener('resize', onWindowResize, false);
  window.addEventListener('deviceorientation', handleOrientation, true);

  animate();
}

function handleOrientation(event) {
  if (event.alpha !== null) {
    roll = event.beta / 10 - 4.5;  // Adjusted to fly straight when phone is upright
    pitch = event.gamma / 10;
  }
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);

  spacecraft.position.x -= pitch * speed;
  spacecraft.position.z += roll * speed;

  camera.position.set(spacecraft.position.x, 20, spacecraft.position.z + 20);
  camera.lookAt(spacecraft.position);

  renderer.render(scene, camera);
}

init();

