/* // bg.js
let bgs = [];

function createBgs(scene) {
  const textureLoader = new THREE.TextureLoader();

  // Predetermined random coordinates, textures, sizes, and repeat values for bgs
  const bgData = [
    { x: 0, y: 0, z: 0, texture: 'bg1.png', size: 110000, repeat: { x: 12, y: 12 } },
    { x: 0, y: -200, z: 0, texture: 'sky.png', size: 200000, repeat: { x: 1, y: 1 } }, // Increased size to cover the whole background
    { x: 0, y: -100000, z: 101500, texture: 'bg6.png', size: 5000, repeat: { x: 1, y: 1 }  },
    { x: 100000, y: 100000, z: 100000, texture: 'skybg1.jpg', size: 8000, repeat: { x: 1, y: 1 }  },
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
 */

// bg.js
let bgs = [];

function createBgs(scene) {
  // Parameters for the starry sky
  const starCount = 10000; // Number of stars
  const starDistance = 100000; // Spread of stars

  // Geometry to hold all star positions
  const starGeometry = new THREE.BufferGeometry();
  const starPositions = new Float32Array(starCount * 3); // Each star has an x, y, z position

  for (let i = 0; i < starCount; i++) {
    // Randomly position each star within a large sphere
    const theta = Math.random() * 2 * Math.PI;
    const phi = Math.acos(2 * Math.random() - 1);
    const radius = starDistance * (0.5 + Math.random() * 0.5);

    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.sin(phi) * Math.sin(theta);
    const z = radius * Math.cos(phi);

    // Assign the position to the star
    starPositions[i * 3] = x;
    starPositions[i * 3 + 1] = y;
    starPositions[i * 3 + 2] = z;
  }

  // Set star positions in geometry
  starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));

  // Material for stars
  const starMaterial = new THREE.PointsMaterial({
    color: 0xffffff,      // White stars
    size: 1,              // Size of each star
    sizeAttenuation: true // Stars get smaller with distance
  });

  // Create the star points and add to the scene
  const stars = new THREE.Points(starGeometry, starMaterial);
  scene.add(stars);
  bgs.push(stars);
}
