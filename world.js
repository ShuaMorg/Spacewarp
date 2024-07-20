// worlds.js

let worlds = [];

function createWorlds(scene) {
  const textureLoader = new THREE.TextureLoader();
  const worldTexture = textureLoader.load('planet.jpg');  // Load the world texture

  // Use MeshPhongMaterial to enable shading
  const worldMaterial = new THREE.MeshPhongMaterial({ map: worldTexture });

  // Predetermined random coordinates for worlds
  const worldCoordinates = [
    { x: 0, y: 100, z: -650 }
    // Add more coordinates as needed
  ];

  for (let i = 0; i < worldCoordinates.length; i++) {
    const worldGeometry = new THREE.SphereGeometry(30, 32, 32);  // Increased size of worlds
    const world = new THREE.Mesh(worldGeometry, worldMaterial);
    world.position.set(worldCoordinates[i].x, worldCoordinates[i].y, worldCoordinates[i].z);
    scene.add(world);
    worlds.push(world);
  }
}  // Closing brace added here