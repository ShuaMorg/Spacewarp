// player.js

let spacecraft;
const baseSpeed = 1;  // Base forward speed
const baseTurnSpeed = 1;  // Base turn speed
const briefTurnSpeedMultiplier = 0.4;  // Multiplier for brief turns
const briefTurnSpeed = baseTurnSpeed * briefTurnSpeedMultiplier;  // Separate brief turn speed
let shipAudio;

// Variables for keyboard input
let keyboardPitch = 0;
let keyboardRoll = 0;
let keyboardForwardSpeedMultiplier = 1;

// Timing variables
const keyTapThreshold = 100;  // Time in milliseconds to consider a key press as a light tap
const keyPressStartTimes = {};  // Object to track start times of key presses

// Smoothing factors
const pitchSmoothFactor = 0.02;  // Adjust for smoother transitions
const rollSmoothFactor = 0.02;
const positionSmoothFactor = 0.02;  // For smoothing position updates

// State variables for smoothed values
let smoothedPitch = 0;
let smoothedRoll = 0;
let smoothedForwardSpeedMultiplier = 1;
let lastPitch = 0;  // Track the last pitch value for smoother transitions
let lastRoll = 0;  // Track the last roll value for smoother transitions

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
  const currentTime = Date.now();
  if (event.code === 'ArrowUp' || event.code === 'ArrowDown' || event.code === 'ArrowLeft' || event.code === 'ArrowRight' || event.code === 'Space') {
    keyPressStartTimes[event.code] = currentTime;
    console.log(`Key down: ${event.code}`);  // Debugging line
  }

  switch (event.code) {
    case 'ArrowUp':
      keyboardRoll = briefTurnSpeed;  // Apply brief turn speed
      break;
    case 'ArrowDown':
      keyboardRoll = -briefTurnSpeed;  // Apply brief turn speed
      break;
    case 'ArrowLeft':
      keyboardPitch = -briefTurnSpeed;  // Apply brief turn speed
      break;
    case 'ArrowRight':
      keyboardPitch = briefTurnSpeed;  // Apply brief turn speed
      break;
    case 'Space':
      keyboardForwardSpeedMultiplier = 20; // Increase speed when space is pressed
      break;
  }
}

function onKeyUp(event) {
  const currentTime = Date.now();
  const keyPressStartTime = keyPressStartTimes[event.code] || 0;
  const duration = currentTime - keyPressStartTime;

  // Determine if the key press was brief or sustained
  const isBriefTap = duration < keyTapThreshold;
  console.log(`Key up: ${event.code} - Duration: ${duration}ms - Brief Tap: ${isBriefTap}`);  // Debugging line

  switch (event.code) {
    case 'ArrowUp':
    case 'ArrowDown':
      // Stop roll movement after releasing
      keyboardRoll = 0;
      break;
    case 'ArrowLeft':
    case 'ArrowRight':
      // Stop pitch movement after releasing
      keyboardPitch = 0;
      break;
    case 'Space':
      keyboardForwardSpeedMultiplier = 1; // Reset speed when space is released
      break;
  }

  // Remove the key press start time
  delete keyPressStartTimes[event.code];
}

function updatePlayer(pitch, roll, forwardSpeedMultiplier) {
  // Smooth keyboard input
  smoothedPitch = THREE.MathUtils.lerp(lastPitch, pitch + keyboardPitch, pitchSmoothFactor);
  smoothedRoll = THREE.MathUtils.lerp(lastRoll, roll + keyboardRoll, rollSmoothFactor);
  smoothedForwardSpeedMultiplier = THREE.MathUtils.lerp(smoothedForwardSpeedMultiplier, forwardSpeedMultiplier * keyboardForwardSpeedMultiplier, positionSmoothFactor);

  // Update last values
  lastPitch = smoothedPitch;
  lastRoll = smoothedRoll;

  // Combine external input with smoothed keyboard input
  const combinedPitch = smoothedPitch;
  const combinedRoll = smoothedRoll;
  const combinedForwardSpeedMultiplier = smoothedForwardSpeedMultiplier;

  // Apply tilt based on combined input
  spacecraft.rotation.z = combinedPitch; // Apply base turn speed directly
  spacecraft.rotation.x = -combinedRoll; // Apply base turn speed directly

  // Update the spacecraft's position along the z-axis (forward)
  const forwardSpeed = baseSpeed * combinedForwardSpeedMultiplier;  // Increase forward speed by the multiplier
  spacecraft.position.z -= forwardSpeed;
  spacecraft.position.x += combinedPitch * baseTurnSpeed;  // Apply base turn speed directly
  spacecraft.position.y += combinedRoll * baseTurnSpeed;  // Apply base turn speed directly

  // Rotate the camera slightly based on the pitch (left/right movement)
  const cameraBankAmount = 0.05;  // Adjust this value to control how much the screen rotates
  camera.rotation.z = combinedPitch * cameraBankAmount;
}

function resetPlayer() {
  spacecraft.position.set(0, 0, 0);
  smoothedPitch = 0;
  smoothedRoll = 0;
  smoothedForwardSpeedMultiplier = 1;
  lastPitch = 0;
  lastRoll = 0;
  keyboardPitch = 0;
  keyboardRoll = 0;
}
