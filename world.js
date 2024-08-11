// world.js

let worlds = [];

function createWorlds(scene) {
  const textureLoader = new THREE.TextureLoader();
  
  // Adjusted coordinates to space them further apart on the z-axis by 100 to 400 units
  const worldData = [
    
    //Scene 1
    
    { x: -200, y: 0, z: -400, texture: 'p1.png', size: 80},

    //{ x: -50, y: 0, z: -800, texture: 'p1.png', size: 50},

    
        
    //after asteroid scene
    { x: 100, y: 1900, z: -25200, texture: 'moon.jpg', size: 5 },
    { x: 75, y: 1850, z: -25250, texture: 'moon.jpg', size: 5 },
{ x: 50, y: 1950, z: -25300, texture: 'moon.jpg', size: 5 },
{ x: 50, y: 1950, z: -25400, texture: 'p5.png', size: 15 },

    // Scene 4 - The Planet
    { x: 0, y: -200, z: 99000, texture: 'p5.png', size: 1600 },
//{ x: 50, y: 1950, z: -25400, texture: 'p5.png', size: 15 }

    
    
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