// world.js

let worlds = [];

function createWorlds(scene) {
  const textureLoader = new THREE.TextureLoader();

  // Adjusted coordinates to space them further apart on the z-axis by 100 to 400 units
  const worldData = [
    // Scene 1
    { x: -500, y: -3000, z: -500, texture: 'xtex1.jpg', size: 500, darknessLevel: 0.9 },
    { x: 400, y: -3100, z: -300, texture: 'xtex2.jpg', size: 100, darknessLevel: 0.8 },
    // After asteroid scene
    { x: 100, y: 1900, z: -25200, texture: 'xtex3.jpg', size: 5, darknessLevel: 0.9 },
    { x: 75, y: 1850, z: -25250, texture: 'xtex2.jpg', size: 5, darknessLevel: 0.9 },
    { x: 50, y: 1950, z: -25300, texture: 'xtex1.jpg', size: 5, darknessLevel: 0.9 },
    { x: 50, y: 1950, z: -25400, texture: 'xtex4.jpeg', size: 15, darknessLevel: 0.7 },
    // Scene 4 - The Planet
    { x: 0, y: -200, z: 99000, texture: 'xtex2.jpg', size: 1600, darknessLevel: 0.6 },


    // Scene X - The Surface
   
    
    { x: 5300, y: 105300, z: -15000, texture: 'tree.jpg', size: 700, darknessLevel: 0.7 },
  ];

  const wireframeMaterial = new THREE.MeshBasicMaterial({ color: 0x39ff14, wireframe: true });

  for (let i = 0; i < worldData.length; i++) {
    // Create the world mesh with the wireframe material initially
    const worldGeometry = new THREE.SphereGeometry(worldData[i].size, 32, 32);
    const world = new THREE.Mesh(worldGeometry, wireframeMaterial);
    world.position.set(worldData[i].x, worldData[i].y, worldData[i].z);
    world.renderOrder = 0;  // Render planets after stars
    scene.add(world);
    worlds.push(world);
  
    // Load the texture and update the material once it's loaded
    textureLoader.load(worldData[i].texture, (texture) => {
      const worldMaterial = new THREE.MeshStandardMaterial({
        map: texture,
        color: new THREE.Color().lerpHSL(new THREE.Color(0x000000), worldData[i].darknessLevel),
        emissive: 0x000000,
        emissiveIntensity: 0,
        roughness: 1,
        metalness: 0.1,
        depthTest: true,  // Planets should respect depth test
        depthWrite: true  // Planets should write to depth buffer
      });
      world.material = worldMaterial;
    });
  }
  
  
  // Add directional and ambient lights to the scene
  const directionalLight = new THREE.DirectionalLight(0xffffff, 12);
  directionalLight.position.set(2000, 1000, 500);
  directionalLight.castShadow = true;
  scene.add(directionalLight);
  
  const ambientLight = new THREE.AmbientLight(0x404040, 0.2);
  scene.add(ambientLight);
  
  
}

// Usage example:
// createWorlds(scene);
