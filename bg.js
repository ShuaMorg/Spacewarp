// bg.js
let bgs = [];

function createBgs(scene) {
  const textureLoader = new THREE.TextureLoader();

  // Predetermined random coordinates, textures, sizes, and repeat values for bgs
  const bgData = [
    { x: 0, y: 0, z: 0, texture: 'bg1.png', size: 100000, repeat: { x: 12, y: 12 } },
    { x: 0, y: -200, z: 0, texture: 'sky.png', size: 200000, repeat: { x: 1, y: 1 } }, // Increased size to cover the whole background
    { x: 0, y: -100000, z: 101500, texture: 'bg1.png', size: 5000, repeat: { x: 12, y: 12 }  },
  ];

  for (let i = 0; i < bgData.length; i++) {
    const bgTexture = textureLoader.load(bgData[i].texture);  // Load the specific texture for this bg
    bgTexture.wrapS = THREE.RepeatWrapping;  // Enable repeating in the horizontal direction
    bgTexture.wrapT = THREE.RepeatWrapping;  // Enable repeating in the vertical direction
    bgTexture.repeat.set(bgData[i].repeat.x, bgData[i].repeat.y); // Set the repeat values

    const bgMaterial = new THREE.MeshBasicMaterial({ 
      map: bgTexture,
      side: THREE.BackSide // Render the inside faces of the sphere
    }); 
    const bgGeometry = new THREE.SphereGeometry(bgData[i].size, 32, 32);  // Use specific size for each bg
    const bg = new THREE.Mesh(bgGeometry, bgMaterial);
    bg.position.set(bgData[i].x, bgData[i].y, bgData[i].z);
    scene.add(bg);
    bgs.push(bg);
  }
}
