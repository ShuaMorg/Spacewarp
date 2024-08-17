let spacecraft;
const baseSpeed = 1;  // Base forward speed
const baseTurnSpeed = 1;  // Base turn speed
const briefTurnSpeedMultiplier = 0.4;  // Multiplier for brief turns
const briefTurnSpeed = baseTurnSpeed * briefTurnSpeedMultiplier;  // Separate brief turn speed
let shipAudio;

// Variables for keyboard input
let keyboardPitch = 0;
let keyboardRoll = 0;
let keyboardForwardSpeedMultiplier = 5;
let keyboardTurnSpeedMultiplier = 1;  // Multiplier for turn speed

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
let smoothedTurnSpeedMultiplier = 1;  // For smoother turn speed transitions
let lastPitch = 0;  // Track the last pitch value for smoother transitions
let lastRoll = 0;  // Track the last roll value for smoother transitions

// Gamepad-specific variables
const gamepadTurnSpeedMultiplier = 2.0;  // Adjust this multiplier to increase/decrease turn speed
const gamepadAccelerationMultiplier = 0.3;  // Multiplier to reduce gamepad acceleration

let currentInputMethod = 'keyboard';  // Default to keyboard

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

    // Add event listeners for touch input
    window.addEventListener('touchstart', onTouchStart);
    window.addEventListener('touchend', onTouchEnd);
    
    // Start the gamepad polling
    window.addEventListener("gamepadconnected", onGamepadConnected);
    window.addEventListener("gamepaddisconnected", onGamepadDisconnected);
    pollGamepads();
}

function onKeyDown(event) {
    currentInputMethod = 'keyboard';
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
            activateBoost();  // Activate boost when space is pressed
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
            deactivateBoost();  // Deactivate boost when space is released
            break;
    }

    // Remove the key press start time
    delete keyPressStartTimes[event.code];
}

function activateBoost() {
    keyboardForwardSpeedMultiplier = 20; // Increase speed
    keyboardTurnSpeedMultiplier = 20; // Increase turn speed
}

function deactivateBoost() {
    keyboardForwardSpeedMultiplier = 1; // Reset speed
    keyboardTurnSpeedMultiplier = 1; // Reset turn speed multiplier
}

function onTouchStart(event) {
    currentInputMethod = 'touch';
    activateBoost();  // Trigger the same action as space bar press
}

function onTouchEnd(event) {
    deactivateBoost();  // Trigger the same action as space bar release
}

function onGamepadConnected(event) {
    console.log("Gamepad connected:", event.gamepad);
}

function onGamepadDisconnected(event) {
    console.log("Gamepad disconnected:", event.gamepad);
}

function pollGamepads() {
    const gamepads = navigator.getGamepads ? navigator.getGamepads() : [];

    for (let i = 0; i < gamepads.length; i++) {
        const gamepad = gamepads[i];
        if (gamepad) {
            handleGamepadInput(gamepad);
        }
    }

    requestAnimationFrame(pollGamepads);
}

function handleGamepadInput(gamepad) {
    currentInputMethod = 'gamepad';
    const deadZone = 0.1;  // Dead zone to prevent drift

    // Left stick for pitch (up/down) and roll (left/right)
    let gamepadPitch = gamepad.axes[0] * gamepadTurnSpeedMultiplier;
    let gamepadRoll = gamepad.axes[1] * gamepadTurnSpeedMultiplier;

    if (Math.abs(gamepadPitch) < deadZone) gamepadPitch = 0;
    if (Math.abs(gamepadRoll) < deadZone) gamepadRoll = 0;

    // Trigger buttons for boost
    const boost = gamepad.buttons[6].pressed || gamepad.buttons[7].pressed;

    if (boost) {
        activateBoost();
    } else {
        deactivateBoost();
    }

    // Pass the gamepad input and the current multiplier to the player update function
    updatePlayer(gamepadPitch, gamepadRoll, keyboardForwardSpeedMultiplier);
}

function updatePlayer(pitch, roll, forwardSpeedMultiplier) {
    let accelerationMultiplier = 1;

    if (currentInputMethod === 'gamepad') {
        accelerationMultiplier = gamepadAccelerationMultiplier;
    }

    // Smooth keyboard input
    smoothedPitch = THREE.MathUtils.lerp(lastPitch, pitch + keyboardPitch, pitchSmoothFactor);
    smoothedRoll = THREE.MathUtils.lerp(lastRoll, roll + keyboardRoll, rollSmoothFactor);
    smoothedForwardSpeedMultiplier = THREE.MathUtils.lerp(smoothedForwardSpeedMultiplier, forwardSpeedMultiplier * keyboardForwardSpeedMultiplier, positionSmoothFactor) * accelerationMultiplier;
    smoothedTurnSpeedMultiplier = THREE.MathUtils.lerp(smoothedTurnSpeedMultiplier, keyboardTurnSpeedMultiplier, positionSmoothFactor);

    // Update last values
    lastPitch = smoothedPitch;
    lastRoll = smoothedRoll;

    // Combine external input with smoothed keyboard input
    const combinedPitch = smoothedPitch;
    const combinedRoll = smoothedRoll;
    const combinedForwardSpeedMultiplier = smoothedForwardSpeedMultiplier;
    const combinedTurnSpeedMultiplier = smoothedTurnSpeedMultiplier;

    // Apply tilt based on combined input
    spacecraft.rotation.z = combinedPitch; // Apply base turn speed directly
    spacecraft.rotation.x = -combinedRoll; // Apply base turn speed directly

    // Update the spacecraft's position along the z-axis (forward)
    const forwardSpeed = baseSpeed * combinedForwardSpeedMultiplier;  // Increase forward speed by the multiplier
    spacecraft.position.z -= forwardSpeed;
    spacecraft.position.x += combinedPitch * baseTurnSpeed * combinedTurnSpeedMultiplier;  // Apply turn speed multiplier
    spacecraft.position.y += combinedRoll * baseTurnSpeed * combinedTurnSpeedMultiplier;  // Apply turn speed multiplier

  // Rotate the camera slightly based on the pitch (left/right movement)
  const cameraBankAmount = 0.05;  // Adjust this value to control how much the screen rotates
  camera.rotation.z = combinedPitch * cameraBankAmount;
}


  function resetPlayer() {
  spacecraft.position.set(0, 0, 0);
  smoothedPitch = 0;
  smoothedRoll = 0;
  smoothedForwardSpeedMultiplier = 1;
  smoothedTurnSpeedMultiplier = 1;
  lastPitch = 0;
  lastRoll = 0;
  keyboardPitch = 0;
  keyboardRoll = 0;
}

// Initialize the game by setting up the scene, player, etc.
function init() {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Create player (spacecraft) and add to the scene
  createPlayer(scene);

  camera.position.z = 5;

  // Animation loop
  function animate() {
    requestAnimationFrame(animate);

    // Update player with current gamepad and keyboard inputs
    pollGamepads();

    renderer.render(scene, camera);
  }
  
  animate();
}

// Start the game when the window loads
window.onload = init;