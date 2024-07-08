let objects = [];
let suns = [];
let sunFrames = [];
let sunFrameIndex = 0;
let sunFrameDirection = 1;  // 1 for forward, -1 for backward
const sunFrameRate = 5;  // Change frame every 5 animation loops

function loadSunFrames() {
  const sunFrameCount = 52;  // 52 frames in the sun animation
  for (let i = 0; i < sunFrameCount; i++) {
    let frameNumber = i.toString().padStart(2, '0');  // Ensure the frame number is two digits
    sunFrames.push(new THREE.TextureLoader().load(`suns/frame_${frameNumber}_delay-0.07s.gif`));
  }
}

function loadPlanetTextures() {
  const planetTextures = [];
  for (let i = 1; i <= 9; i++) {  // Assuming there are now 9 planet textures
    planetTextures.push(new THREE.TextureLoader().load(`p${i}.png`));
  }
  return planetTextures;
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

function createPlanets(scene) {
  loadSunFrames();  // Preload all sun frames
  const planetTextures = loadPlanetTextures();  // Preload all planet textures

  const roguePlanets = [];

  // Create suns and group planets around them
  for (let i = 0; i < 100; i++) {  // Assume 5 suns for this example
    const sunGeometry = new THREE.SphereGeometry(100, 32, 32);  // 40 times bigger than the original
    adjustUVs(sunGeometry);  // Adjust UV mapping to focus on the central part of the texture
    const sunMaterial = new THREE.MeshBasicMaterial({ map: sunFrames[0], transparent: true });
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    sun.position.set(
      Math.random() * 40000 - 20000,  // Spread out the suns more
      Math.random() * 40000 - 20000,
      Math.random() * 40000 - 20000
    );
    scene.add(sun);
    suns.push(sun);

    // Create many more planets around the sun
    const numPlanets = (Math.floor(Math.random() * 21) + 5) * 10;  // 50 to 250 planets
    for (let j = 0; j < numPlanets; j++) {
      const objectGeometry = new THREE.SphereGeometry(10, 32, 32);  // 20 times larger than the original
      const objectMaterial = new THREE.MeshBasicMaterial({ map: planetTextures[Math.floor(Math.random() * planetTextures.length)] });
      const object = new THREE.Mesh(objectGeometry, objectMaterial);
      
      const distance = (Math.random() * 200 + 80) * 2;  // Increase distance 2 times for more spacing
      const angle = Math.random() * Math.PI * 2;  // Angle around the sun

      object.position.set(
        sun.position.x + distance * Math.cos(angle),
        sun.position.y + distance * Math.sin(angle),
        sun.position.z + (Math.random() - 0.5) * 90  // Random z position within a range
      );
      scene.add(object);
      objects.push(object);
    }
  }

  // Create many more rogue planets
  for (let i = 0; i < 400; i++) {  // Assume 400 rogue planets for this example
    const objectGeometry = new THREE.SphereGeometry(10, 32, 32);  // 20 times larger than the original
    const objectMaterial = new THREE.MeshBasicMaterial({ map: planetTextures[Math.floor(Math.random() * planetTextures.length)] });
    const object = new THREE.Mesh(objectGeometry, objectMaterial);
    object.position.set(
      Math.random() * 40000 - 20000,  // Spread out the rogue planets more
      Math.random() * 40000 - 20000,
      Math.random() * 40000 - 20000
    );
    scene.add(object);
    roguePlanets.push(object);
  }

  objects.push(...roguePlanets);
}

function updateSunFrames() {
  sunFrameIndex += sunFrameDirection;
  if (sunFrameIndex >= sunFrames.length || sunFrameIndex < 0) {
    sunFrameDirection *= -1;  // Reverse direction
    sunFrameIndex += sunFrameDirection;
  }

  for (let sun of suns) {
    sun.material.map = sunFrames[sunFrameIndex];
    sun.material.needsUpdate = true;
  }
}

// Ensure to call updateSunFrames() in your animation loop