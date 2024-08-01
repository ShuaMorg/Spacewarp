// world.js

let worlds = [];

function createWorlds(scene) {
  const textureLoader = new THREE.TextureLoader();
  
  // Predetermined random coordinates for worlds
  const worldData = [
    { x: 500, y: 0, z: -1650, texture: 'planet.jpg' },

    { x: -500, y: 0, z: -1650, texture: 'planet.jpg' },

    { x: -50, y: 200, z: -950, texture: 'p7.png' },
    { x: -50, y: 200, z: -250, texture: 'brown.jpg' },

    // Scene 3
    
    { x: 100, y: 1900, z: -25500, texture: 'brown.jpg' }

    
    
    // Add more coordinates and corresponding textures as needed
  ];

  for (let i = 0; i < worldData.length; i++) {
    const worldTexture = textureLoader.load(worldData[i].texture);  // Load the specific texture for this world
    const worldMaterial = new THREE.MeshPhongMaterial({ map: worldTexture }); // Use MeshPhongMaterial to enable shading
    const worldGeometry = new THREE.SphereGeometry(30, 32, 32);  // Increased size of worlds
    const world = new THREE.Mesh(worldGeometry, worldMaterial);
    world.position.set(worldData[i].x, worldData[i].y, worldData[i].z);
    scene.add(world);
    worlds.push(world);
  }
}