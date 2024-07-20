let stars = [];
let starFrames = [];
let starFrameIndex = 0;
let starFrameRate = 5;  // Change frame every 5 animation loops
let starFrameDirection = 1;  // 1 for forward, -1 for backward

function loadStarFrames(callback) {
  const starFrameCount = 52;  // 52 frames in the sun animation
  let loadedFrames = 0;

  for (let i = 0; i < starFrameCount; i++) {
    let frameNumber = i.toString().padStart(2, '0');  // Ensure the frame number is two digits
    new THREE.TextureLoader().load(`suns/frame_${frameNumber}_delay-0.07s.gif`, function(texture) {
      starFrames.push(texture);
      loadedFrames++;
      if (loadedFrames === starFrameCount) {
        callback();
      }
    });
  }
}

function adjustUVs(geometry) {
  const uvAttribute = geometry.attributes.uv;
  for (let i = 0; i < uvAttribute.count; i++) {
    const u = uvAttribute.getX(i);
    const v = uvAttribute.getY(i);
    uvAttribute.setXY(i, u * 0.5 + 0.25, v * 0.5 + 0.25);  // Focus on the central part of the texture
  }
  uvAttribute.needsUpdate = true;
}

function createStars(scene) {
  loadStarFrames(() => {
    const starMaterial = new THREE.MeshBasicMaterial({ map: starFrames[0], transparent: true });  // Use the first sun frame initially

    // Predetermined random coordinates for stars
    const starCoordinates = [
      { x: 100, y: 1900, z: -8500 },
      { x: -120, y: -30, z: -100 }
    ];

    for (let i = 0; i < starCoordinates.length; i++) {
      const starGeometry = new THREE.SphereGeometry(100, 32, 32);  // Increased size of stars
      adjustUVs(starGeometry);  // Adjust UV mapping to focus on the central part of the texture
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
  });
}

function updateStarFrames() {
  starFrameIndex += starFrameDirection;
  if (starFrameIndex >= starFrames.length * starFrameRate || starFrameIndex < 0) {
    starFrameDirection *= -1;
    starFrameIndex += starFrameDirection;
  }
  const currentStarFrame = starFrames[Math.floor(starFrameIndex / starFrameRate)];

  for (let star of stars) {
    star.material.map = currentStarFrame;
    star.material.needsUpdate = true;
  }
}

// Ensure to call updateStarFrames() in your animation loop
function animate() {
  requestAnimationFrame(animate);

  updateStarFrames();  // Update the star frames for animation
  // Other animation code...

  renderer.render(scene, camera);
}

// Example of how to start the animation loop
function start() {
  createStars(scene);
}

// Call start to initialize and start the animation
start();