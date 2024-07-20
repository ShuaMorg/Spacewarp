// moon.js

let moons = [];
let moonSound; // Add a variable to hold the audio element

function createMoons(scene) {
  const textureLoader = new THREE.TextureLoader();
  const moonTexture = textureLoader.load('moon.jpg');  // Load the moon texture

  // Use MeshPhongMaterial to enable shading
  const moonMaterial = new THREE.MeshPhongMaterial({ map: moonTexture });

  // Predetermined random coordinates for moons
  const moonCoordinates = [
    { x: -10, y: 0, z: -300 },
    
    { x: 20, y: -20, z: -320 },
    
    { x: -200, y: -200, z: -600 }
  ];

  for (let i = 0; i < moonCoordinates.length; i++) {
    const moonGeometry = new THREE.SphereGeometry(5, 32, 32);  // Increased size of moons
    const moon = new THREE.Mesh(moonGeometry, moonMaterial);
    moon.position.set(moonCoordinates[i].x, moonCoordinates[i].y, moonCoordinates[i].z);
    scene.add(moon);
    moons.push(moon);
  }

  // Load the audio
  moonSound = new Audio('test.wav');

  console.log('Moons created:', moons);
}

function playMoonSound() {
  if (moonSound) {
    moonSound.play().catch(error => {
      console.log('Failed to play moon sound:', error);
    });
  }
}
