let spacecraft;

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
}

function updatePlayer(pitch, roll, speed) {
  // Apply tilt based on user input
  spacecraft.rotation.z = pitch * 0.1;
  spacecraft.rotation.x = -roll * 0.1;

  // Update the spacecraft's position
  spacecraft.position.x -= pitch * speed;
  spacecraft.position.y += roll * speed;
}

function resetPlayer() {
  spacecraft.position.set(0, 0, 0);
}