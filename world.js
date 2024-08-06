// world.js

let worlds = [];

function createWorlds(scene) {
  const textureLoader = new THREE.TextureLoader();
  
  // Adjusted coordinates to space them further apart on the z-axis by 100 to 400 units
  const worldData = [
    
    //Scene 1
    
    { x: -200, y: 0, z: -400, texture: 'p1.png', size: 80},

    //{ x: -50, y: 0, z: -800, texture: 'p1.png', size: 50},

    
    { x: 326, y: -428, z: -3286, texture: 'p1.png', size: 39 },
     { x: 602, y: 598, z: -5136, texture: 'p5.png', size: 113 },
    { x: -90, y: -200, z: -5744, texture: 'p3.png', size: 79 },
    { x: -708, y: -588, z: -6084, texture: 'p5.png', size: 129 },
    { x: -218, y: 112, z: -6828, texture: 'p9.png', size: 41 },
    { x: 452, y: 644, z: -7305, texture: 'p5.png', size: 91 },
    { x: 50, y: 790, z: -7689, texture: 'p3.png', size: 82 },
    { x: -480, y: 692, z: -8052, texture: 'p3.png', size: 103 },
    { x: 146, y: -496, z: -8988, texture: 'p3.png', size: 40 },
    { x: 502, y: -792, z: -9250, texture: 'p1.png', size: 110 },
    // Additional worlds for further coordinates
    { x: 416, y: -708, z: -10616, texture: 'p6.png', size: 67 },
    { x: 44, y: 228, z: -10916, texture: 'p5.png', size: 111 },
    { x: -190, y: -142, z: -11506, texture: 'p6.png', size: 143 },
    { x: -544, y: -462, z: -11806, texture: 'p8.png', size: 111 },
    { x: 506, y: -520, z: -13448, texture: 'p4.png', size: 56 },
    { x: -62, y: -618, z: -12886, texture: 'p2.png', size: 145 },
    { x: 776, y: -52, z: -14410, texture: 'p1.png', size: 40 },
    { x: -218, y: 112, z: -14610, texture: 'p9.png', size: 41 },
    { x: 452, y: 644, z: -14910, texture: 'p5.png', size: 91 },
    { x: 50, y: 790, z: -15658, texture: 'p3.png', size: 82 },
    { x: -480, y: 692, z: -15958, texture: 'p3.png', size: 103 },
    { x: 146, y: -496, z: -16218, texture: 'p3.png', size: 40 },
    // More planets as z increases
    { x: -300, y: 500, z: -16600, texture: 'p1.png', size: 60 },
    { x: 400, y: -300, z: -17100, texture: 'p3.png', size: 70 },
    { x: -600, y: 600, z: -17600, texture: 'p9.png', size: 90 },
    { x: 500, y: 200, z: -18100, texture: 'p2.png', size: 120 },
    { x: -200, y: -500, z: -18600, texture: 'p3.png', size: 80 },
    { x: 600, y: -400, z: -19100, texture: 'p1.png', size: 110 },
    { x: -700, y: 300, z: -19600, texture: 'p9.png', size: 100 },
    { x: 800, y: -600, z: -20100, texture: 'p5.png', size: 130 },
    
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