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
let smoothedTurnSpeedMultiplier = 1;
let lastPitch = 0;  // Track the last pitch value for smoother transitions
let lastRoll = 0;  // Track the last roll value for smoother transitions

// Gamepad-specific variables
const gamepadTurnSpeedMultiplier = 2.0;  // Adjust this multiplier to increase/decrease turn speed
const gamepadAccelerationMultiplier = 0.3;  // Multiplier to reduce gamepad acceleration

let currentInputMethod = 'keyboard';  // Default to keyboard
let collisionCooldown = false;  // Variable to control collision cooldown

// Raycaster for collision detection
const raycaster = new THREE.Raycaster();
const rayDirection = new THREE.Vector3(0, -1, 0);  // Cast downwards

function createPlayer(scene) {
    // Load the texture
    const textureLoader = new THREE.TextureLoader();
    const wireframeMaterial = new THREE.MeshBasicMaterial({ color: 0x39ff14, wireframe: true });
    
    // Create the main body of the spacecraft as a sphere with the wireframe material initially
    const geometry = new THREE.SphereGeometry(0.5, 32, 32);
    spacecraft = new THREE.Mesh(geometry, wireframeMaterial);
    
    // Set initial position and add to scene
    spacecraft.position.set(0, 0, 0);
    scene.add(spacecraft);

    // Load the texture and update the material once it's loaded
    textureLoader.load('ship.jpg', (texture) => {
        const material = new THREE.MeshStandardMaterial({ map: texture, metalness: 0.6, roughness: 0.4 });
        spacecraft.material = material;
    });

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

    // Track key press start times for debugging
    keyPressStartTimes[event.code] = currentTime;
    console.log(`Key down: ${event.code}`);

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
        case 'KeyB':
            activateBoost(true);  // Activate boost twice as fast when 'b' is pressed
            break;
        case 'KeyR':
            resetToClosestTarget();  // Reset to the closest target when 'r' is pressed
            break;
        case 'ShiftRight': // Look behind
            targetRotationY = Math.PI;  // Set target rotation for smooth turning
            break;
        case 'PageUp': // Look to the left
            targetRotationY = Math.PI / 2;  // Set target rotation for smooth turning
            break;
        case 'PageDown': // Look to the right
            targetRotationY = -Math.PI / 2;  // Set target rotation for smooth turning
            break;
    }
}

function onKeyUp(event) {
    const currentTime = Date.now();
    const keyPressStartTime = keyPressStartTimes[event.code] || 0;
    const duration = currentTime - keyPressStartTime;

    // Determine if the key press was brief or sustained
    const isBriefTap = duration < keyTapThreshold;
    console.log(`Key up: ${event.code} - Duration: ${duration}ms - Brief Tap: ${isBriefTap}`);

    switch (event.code) {
        case 'ArrowUp':
        case 'ArrowDown':
            keyboardRoll = 0;  // Stop roll movement after releasing
            break;
        case 'ArrowLeft':
        case 'ArrowRight':
            keyboardPitch = 0;  // Stop pitch movement after releasing
            break;
        case 'Space':
        case 'KeyB':
            deactivateBoost();  // Deactivate boost when space or 'b' is released
            break;
        case 'ShiftRight': // Stop looking behind
        case 'PageUp': // Stop looking left
        case 'PageDown': // Stop looking right
            targetRotationY = 0;  // Reset target rotation to default forward view
            break;
    }

    delete keyPressStartTimes[event.code];
}

let targetRotationY = 0;
const rotationSmoothFactor = 0.05; // Adjust for smoother turning

function updateCameraRotation() {
    if (camera) {
        camera.rotation.y = THREE.MathUtils.lerp(camera.rotation.y, targetRotationY, rotationSmoothFactor);
    }
}




function activateBoost(isDouble = false) {
    if (isDouble) {
        keyboardForwardSpeedMultiplier = 420; // Increase speed twice as fast
        keyboardTurnSpeedMultiplier = 420; // Increase turn speed twice as fast
    } else {
        keyboardForwardSpeedMultiplier = 60; // Increase speed
        keyboardTurnSpeedMultiplier = 60; // Increase turn speed
    }
}

function deactivateBoost() {
    keyboardForwardSpeedMultiplier = 1; // Reset speed
    keyboardTurnSpeedMultiplier = 1; // Reset turn speed multiplier
}

function onTouchStart(event) {
    currentInputMethod = 'touch';
    activateBoost();  // Trigger the same action as space bar press
    fireProjectileOnTap(event);  // Fire projectile on tap
}

function fireProjectileOnTap(event) {
    if (event.touches.length === 1) {  // Ensure it's a single tap
        shootPlayerProjectile(scene);  // Call the function to shoot a player projectile
    }
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
    const deadZone = 0.1; // Dead zone to prevent drift

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

    // Handle 'A' button for firing
    if (gamepad.buttons[0].pressed) {
        shootPlayerProjectile(scene); // Call firing function
    }

        // Handle 'Y' button for reset (index 3 on most Xbox controllers)
        if (gamepad.buttons[3].pressed) {
            resetToClosestTarget();
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

    if (!collisionCooldown) {
        checkCollision();  // Check for collisions with surfaces and worlds if not in cooldown
    }
}

function resetToClosestTarget() {
    if (!spacecraft || typeof portalCoordinates === 'undefined') return;

    let closestTargetIndex = 0;
    let minDistance = Infinity;

    // Find the closest target coordinates based on the player position
    for (let i = 0; i < portalCoordinates.length; i++) {
        const target = portalCoordinates[i];
        const distance = spacecraft.position.distanceTo(new THREE.Vector3(target.targetX, target.targetY, target.targetZ));
        if (distance < minDistance) {
            minDistance = distance;
            closestTargetIndex = i;
        }
    }

    // Set the player position to the closest target coordinates with a slight offset
    const closestTarget = portalCoordinates[closestTargetIndex];
    const offset = 50;  // Set an offset to move the player away from the surface or world
    teleportPlayer(spacecraft, closestTarget.targetX, closestTarget.targetY + offset, closestTarget.targetZ);

    // Enable a cooldown period to avoid immediate re-collision
    collisionCooldown = true;
    setTimeout(() => {
        collisionCooldown = false;
    }, 1000);  // 1-second cooldown
}

function teleportPlayer(player, x, y, z) {
    player.position.set(x, y, z);
}

function checkCollision() {
    if (!spacecraft) return;

    // Use raycaster to cast a ray downwards from the spacecraft
    raycaster.set(spacecraft.position, rayDirection);
    const surfaceIntersects = raycaster.intersectObjects(surfaces);
    const worldIntersects = raycaster.intersectObjects(worlds);

    // If the raycaster detects an intersection with surfaces or worlds and the player is close enough
    if (surfaceIntersects.length > 0 && surfaceIntersects[0].distance < 5) {
        console.log('Collision detected with surface');
        resetToClosestTarget();  // Automatically reset player to closest target
    } else if (worldIntersects.length > 0 && worldIntersects[0].distance < 5) {
        console.log('Collision detected with world');
        resetToClosestTarget();  // Automatically reset player to closest target
    }
}
