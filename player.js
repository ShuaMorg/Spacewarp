// player.js

let spacecraft;
const baseSpeed = 0.9;  // Base forward speed
const baseTurnSpeed = 0.1;  // Base turn speed
let shipAudio;

function createPlayer(scene) {
  // Load the texture
  const textureLoader = new THREE.TextureLoader();
  const texture = textureLoader.load('ship.jpg');
  
  // Create the main body of the spacecraft as a sphere with the texture
  const geometry = new THREE.SphereGeometry(0.5, 32, 32);
  const material = new THREE.MeshStandardMaterial({ map: texture, metalness: 0.6, roughness: 0.4 });
  spacecraft = new THREE.Mesh(geometry, material);
  
  // Set initial position and add to scene
  spacecraft.position.set(0, 0, 0);
  scene.add(spacecraft);

  // Add lights to the scene for better shading
  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(5, 5, 5).normalize();
  scene.add(light);
  
  const ambientLight = new THREE.AmbientLight(0x404040); // soft white light
  scene.add(ambientLight);

  // Load and play the audio in a loop
  shipAudio = new Audio('ship.mp3');
  shipAudio.loop = true;
  shipAudio.play().catch(error => {
    console.log('Failed to play audio:', error);
  });
}

function updatePlayer(pitch, roll, forwardSpeedMultiplier) {
  // Apply tilt based on user input
  spacecraft.rotation.z = pitch * baseTurnSpeed;
  spacecraft.rotation.x = -roll * baseTurnSpeed;

  // Update the spacecraft's position along the z-axis (forward)
  const forwardSpeed = baseSpeed * forwardSpeedMultiplier;  // Increase forward speed by the multiplier
  spacecraft.position.z -= forwardSpeed;
  spacecraft.position.x -= pitch * baseTurnSpeed;
  spacecraft.position.y += roll * baseTurnSpeed;
}

function resetPlayer() {
  spacecraft.position.set(0, 0, 0);
}