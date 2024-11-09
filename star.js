let stars = [];
let starFrameRate = 5;  // Keeping this in case you want to add any animation logic in the future

function createStars(scene) {
  // Create a basic white material for the stars
  const starMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, emissive: 0xffffff, emissiveIntensity: 1, transparent: true });

  // Predetermined random coordinates for stars
  const starCoordinates = [
    { x: 10080, y: -380, z: -5500 },
      { x: -52350, y: 29000, z: -47500 },
      { x: 59750, y: -23850, z: -47500 },
      { x: -61150, y: 21100, z: -47500 },
      { x: 94150, y: -21300, z: -47500 },
    
    
    
  ];

  for (let i = 0; i < starCoordinates.length; i++) {
    const starGeometry = new THREE.SphereGeometry(800, 32, 32);  // Star size
    const star = new THREE.Mesh(starGeometry, starMaterial.clone());  // Clone the material for each star
    star.position.set(starCoordinates[i].x, starCoordinates[i].y, starCoordinates[i].z);
    scene.add(star);
    stars.push(star);
  }

  console.log('stars created:', stars);

  // Log positions of the stars to verify they are created
  stars.forEach(star => {
    console.log(`star position: x=${star.position.x}, y=${star.position.y}, z=${star.position.z}`);
  });

  // Start the animation loop after stars are created
  animate();
}

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  // Other animation code...

  renderer.render(scene, camera);
}

// Initialize and start the animation
function start() {
  createStars(scene);
}

start();
