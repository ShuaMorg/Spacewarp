let roll = 0, pitch = 0;
const forwardSpeed = 0.5;
const turnSpeed = 0.05;
const verticalSpeed = 0.5;
let flyingUpTime = 0;
let lastUpdateTime = Date.now();

function handleOrientation(event) {
  if (event.alpha !== null) {
    roll = event.gamma / 10;
    pitch = (event.beta / 10) - 4.5;  // Adjusted to fly straight when phone is upright
  }
}

function updatePlayer() {
  if (typeof spacecraft !== 'undefined') {
    const now = Date.now();
    const deltaTime = (now - lastUpdateTime) / 1000;  // Convert to seconds
    lastUpdateTime = now;

    // Calculate the forward direction vector based on current rotation
    const forward = new THREE.Vector3(Math.sin(spacecraft.rotation.y), 0, Math.cos(spacecraft.rotation.y)).normalize();
    const up = new THREE.Vector3(0, 1, 0);

    // Move the spacecraft forward based on the pitch (forward tilt)
    if (pitch < 0) {
      spacecraft.position.add(forward.multiplyScalar(pitch * forwardSpeed));
      flyingUpTime = 0;  // Reset flying up time
    } else {
      // Move the spacecraft upward based on the positive pitch (backward tilt)
      spacecraft.position.add(up.multiplyScalar(pitch * verticalSpeed));
      flyingUpTime += deltaTime;  // Increment flying up time

      // Check if flying up time exceeds 3 seconds
      if (flyingUpTime > 3) {
        // Set the autostart flag in local storage
        localStorage.setItem('autostart', 'true');
        window.location.href = 'index.html';
      }
    }

    // Rotate the spacecraft based on the roll (left/right tilt)
    spacecraft.rotation.y -= roll * turnSpeed;

    // Position the camera behind the spacecraft
    const cameraOffset = new THREE.Vector3(0, 5, 10);  // Adjust these values as needed
    cameraOffset.applyQuaternion(spacecraft.quaternion);
    camera.position.copy(spacecraft.position.clone().add(cameraOffset));
    camera.lookAt(spacecraft.position);
  }
}

// Event listener to handle device orientation and set pitch and roll values
window.addEventListener('deviceorientation', handleOrientation, true);