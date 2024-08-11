// this is player.js

let spacecraft;
const baseSpeed = 1;  // Base forward speed
const baseTurnSpeed = .5;  // Base turn speed
let shipAudio;

// Variables for keyboard input
let keyboardPitch = 0;
let keyboardRoll = 0;
let keyboardForwardSpeedMultiplier = 1;

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

  // Add event listeners for keyboard input
  window.addEventListener('keydown', onKeyDown);
  window.addEventListener('keyup', onKeyUp);
}

function onKeyDown(event) {
  switch (event.code) {
    case 'ArrowUp':
      keyboardRoll = 1;
      break;
    case 'ArrowDown':
      keyboardRoll = -1;
      break;
    case 'ArrowLeft':
      keyboardPitch = -1;
      break;
    case 'ArrowRight':
      keyboardPitch = 1;
      break;
    case 'Space':
      keyboardForwardSpeedMultiplier = 2; // Increase speed when space is pressed
      break;
  }
}

function onKeyUp(event) {
  switch (event.code) {
    case 'ArrowUp':
    case 'ArrowDown':
      keyboardRoll = 0;
      break;
    case 'ArrowLeft':
    case 'ArrowRight':
      keyboardPitch = 0;
      break;
    case 'Space':
      keyboardForwardSpeedMultiplier = 1; // Reset speed when space is released
      break;
  }
}

function updatePlayer(pitch, roll, forwardSpeedMultiplier) {
  // Combine external input with keyboard input
  const combinedPitch = pitch + keyboardPitch;
  const combinedRoll = roll + keyboardRoll;
  const combinedForwardSpeedMultiplier = forwardSpeedMultiplier * keyboardForwardSpeedMultiplier;

  // Apply tilt based on combined input
  spacecraft.rotation.z = combinedPitch * baseTurnSpeed;
  spacecraft.rotation.x = -combinedRoll * baseTurnSpeed;

  // Update the spacecraft's position along the z-axis (forward)
  const forwardSpeed = baseSpeed * combinedForwardSpeedMultiplier;  // Increase forward speed by the multiplier
  spacecraft.position.z -= forwardSpeed;
  spacecraft.position.x += combinedPitch * baseTurnSpeed;
  spacecraft.position.y += combinedRoll * baseTurnSpeed;

  // Rotate the camera slightly based on the pitch (left/right movement)
  const cameraBankAmount = 0.05;  // Adjust this value to control how much the screen rotates
  camera.rotation.z = combinedPitch * cameraBankAmount;
}

function resetPlayer() {
  spacecraft.position.set(0, 0, 0);
  keyboardPitch = 0;
  keyboardRoll = 0;
  keyboardForwardSpeedMultiplier = 1;
}