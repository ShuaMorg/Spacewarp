// world.js

let worlds = [];

function createWorlds(scene) {
  const textureLoader = new THREE.TextureLoader();
  
  // Predetermined random coordinates, textures, and sizes for worlds
  const worldData = [
    { x: -50, y: -50, z: -850, texture: 'planet.jpg', size: 40 },
    { x: -100, y: 0, z: -450, texture: 'planet.jpg', size: 40},
    { x: 50, y: 100, z: -650, texture: 'p7.png', size: 40 },
    
    
    { x: -50, y: 200, z: -25250, texture: 'sun.jpg', size: 1500 },
 //   { x: -50, y: 200, z: -25250, texture: 'planet.jpg', size: 1000 },

    
    { x: 100, y: 1900, z: -25500, texture: 'brown.jpg', size: 60 }
    // Add more coordinates, textures, and sizes as needed
  ];

  for (let i = 0; i < worldData.length; i++) {
    const worldTexture = textureLoader.load(worldData[i].texture);  // Load the specific texture for this world
    const worldMaterial = new THREE.MeshPhongMaterial({ map: worldTexture }); // Use MeshPhongMaterial to enable shading
    const worldGeometry = new THREE.SphereGeometry(worldData[i].size, 32, 32);  // Use specific size for each world
    const world = new THREE.Mesh(worldGeometry, worldMaterial);
    world.position.set(worldData[i].x, worldData[i].y, worldData[i].z);
    scene.add(world);
    worlds.push(world);
  }
}