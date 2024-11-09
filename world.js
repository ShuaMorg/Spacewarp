// world.js

let worlds = [];

function createWorlds(scene) {
  const textureLoader = new THREE.TextureLoader();
  
  // Adjusted coordinates to space them further apart on the z-axis by 100 to 400 units
  const worldData = [

    


    // Scene 1
    { x: -500, y: -3000, z: -500, texture: 'jupiter.webp', size: 500, darknessLevel: 0.9 },
    { x: 400, y: -3100, z: -300, texture: '8k_mercury.webp', size: 100, darknessLevel: 0.8 },
    // { x: -50, y: 0, z: -800, texture: 'p1.png', size: 50, darknessLevel: 0.7 },
    
    // After asteroid scene
    { x: 100, y: 1900, z: -25200, texture: 'moon.jpg', size: 5, darknessLevel: 0.9 },
    { x: 75, y: 1850, z: -25250, texture: 'moon.jpg', size: 5, darknessLevel: 0.9 },
    { x: 50, y: 1950, z: -25300, texture: 'moon.jpg', size: 5, darknessLevel: 0.9 },
    { x: 50, y: 1950, z: -25400, texture: 'p5.png', size: 15, darknessLevel: 0.7 },

    // Scene 4 - The Planet
    { x: 0, y: -200, z: 99000, texture: 'p5.png', size: 1600, darknessLevel: 0.6 },
    // { x: 50, y: 1950, z: -25400, texture: 'p5.png', size: 15, darknessLevel: 0.7 }
  ];

  for (let i = 0; i < worldData.length; i++) {
    const worldTexture = textureLoader.load(worldData[i].texture);  // Load the specific texture for this world
    const worldMaterial = new THREE.MeshStandardMaterial({ 
      map: worldTexture,
      color: new THREE.Color().lerpHSL(new THREE.Color(0x000000), worldData[i].darknessLevel), // Apply darkness by blending towards black using lerpHSL
      emissive: 0x000000,
      emissiveIntensity: 0, // Set emissive to 0 to prevent adding additional light
      roughness: 1,
      metalness: 0.1 // Set a low metalness to reduce reflections
    });
    const worldGeometry = new THREE.SphereGeometry(worldData[i].size, 32, 32);  // Use specific size for each world
    const world = new THREE.Mesh(worldGeometry, worldMaterial);
    world.position.set(worldData[i].x, worldData[i].y, worldData[i].z);
    scene.add(world);
    worlds.push(world);
  }

  // Add a directional light to create non-uniform lighting
  const directionalLight = new THREE.DirectionalLight(0xffffff, 12);
  directionalLight.position.set(2000, 1000, 500); // Position the light at a sharper angle to create more dramatic contrast
  directionalLight.castShadow = true; // Enable shadows for more realistic lighting
  directionalLight.shadow.mapSize.width = 2048;  // Increase shadow map resolution for better quality
  directionalLight.shadow.mapSize.height = 2048;
  directionalLight.shadow.camera.near = 0.5;
  directionalLight.shadow.camera.far = 5000;
  scene.add(directionalLight);

  // Add ambient light for subtle fill lighting to reduce uniformity
  const ambientLight = new THREE.AmbientLight(0x404040, 0.2); // Increase ambient light intensity to ensure bright side remains illuminated
  scene.add(ambientLight);
} 

// Usage example:
// createWorlds(scene);
