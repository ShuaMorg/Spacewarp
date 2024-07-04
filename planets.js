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
  for (let i = 0; i < 5; i++) {  // Assume 5 suns for this example
    const sunGeometry = new THREE.SphereGeometry(2.5, 32, 32);  // 5 times bigger than the planets
    adjustUVs(sunGeometry);  // Adjust UV mapping to focus on the central part of the texture
    const sunMaterial = new THREE.MeshBasicMaterial({ map: sunFrames[0], transparent: true });
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    sun.position.set(
      Math.random() * 200 - 100,
      Math.random() * 200 - 100,
      Math.random() * 200 - 100
    );
    sun.scale.set(0.01, 0.01, 0.01);  // Start very small
    sun.growthRate = 0.002;  // Set a slower growth rate
    scene.add(sun);
    suns.push(sun);

    // Create planets around the sun
    const numPlanets = Math.floor(Math.random() * 11) + 2;  // 2 to 12 planets
    for (let j = 0; j < numPlanets; j++) {
      const objectGeometry = new THREE.SphereGeometry(0.5, 32, 32);
      const objectMaterial = new THREE.MeshBasicMaterial({ map: planetTextures[Math.floor(Math.random() * planetTextures.length)] });
      const object = new THREE.Mesh(objectGeometry, objectMaterial);
      
      const distance = Math.random() * 30 + 10;  // Distance from the sun
      const angle = Math.random() * Math.PI * 2;  // Angle around the sun

      object.position.set(
        sun.position.x + distance * Math.cos(angle),
        sun.position.y + distance * Math.sin(angle),
        sun.position.z + (Math.random() - 0.5) * 10  // Random z position within a range
      );
      object.scale.set(0.01, 0.01, 0.01);  // Start very small
      object.growthRate = 0.001;  // Set a slower growth rate
      scene.add(object);
      objects.push(object);
    }
  }

  // Create rogue planets
  for (let i = 0; i < 10; i++) {  // Assume 10 rogue planets for this example
    const objectGeometry = new THREE.SphereGeometry(0.5, 32, 32);
    const objectMaterial = new THREE.MeshBasicMaterial({ map: planetTextures[Math.floor(Math.random() * planetTextures.length)] });
    const object = new THREE.Mesh(objectGeometry, objectMaterial);
    object.position.set(
      Math.random() * 200 - 100,
      Math.random() * 200 - 100,
      Math.random() * 200 - 100
    );
    object.scale.set(0.01, 0.01, 0.01);  // Start very small
    object.growthRate = 0.001;  // Set a slower growth rate
    scene.add(object);
    roguePlanets.push(object);
  }

  objects.push(...roguePlanets);
}

function updatePlanets(spacecraft, speed) {
  sunFrameIndex += sunFrameDirection;
  if (sunFrameIndex >= sunFrames.length * sunFrameRate || sunFrameIndex < 0) {
    sunFrameDirection *= -1;
    sunFrameIndex += sunFrameDirection;
  }
  const currentSunFrame = sunFrames[Math.floor(sunFrameIndex / sunFrameRate)];

  for (let sun of suns) {
    sun.material.map = currentSunFrame;
    sun.material.map.needsUpdate = true;
    sun.position.z += speed;

    if (sun.scale.x < 1) {  // Grow until full size
      sun.scale.x += sun.growthRate;
      sun.scale.y += sun.growthRate;
      sun.scale.z += sun.growthRate;
    }

    if (sun.position.distanceTo(spacecraft.position) > 100) {
      sun.position.set(
        Math.random() * 200 - 100 + spacecraft.position.x,
        Math.random() * 200 - 100 + spacecraft.position.y,
        Math.random() * 200 - 100 + spacecraft.position.z
      );
      sun.scale.set(0.01, 0.01, 0.01);  // Reset size
    }

    const sunRadius = 2.5 * sun.scale.x;  // Adjusted sun radius based on scale
    if (spacecraft.position.distanceTo(sun.position) < sunRadius + 0.5) {  // Adjusted collision detection distance
      loadDynamicPlanetScene(sun.material.map.image.src);
      return;
    }
  }

  for (let object of objects) {
    object.position.z += speed;

    if (object.scale.x < 1) {  // Grow until full size
      object.scale.x += object.growthRate;
      object.scale.y += object.growthRate;
      object.scale.z += object.growthRate;
    }

    if (object.position.distanceTo(spacecraft.position) > 100) {
      object.position.set(
        Math.random() * 200 - 100 + spacecraft.position.x,
        Math.random() * 200 - 100 + spacecraft.position.y,
        Math.random() * 200 - 100 + spacecraft.position.z
      );
      object.scale.set(0.01, 0.01, 0.01);  // Reset size
    }

    const planetRadius = 0.5 * object.scale.x;  // Adjusted planet radius based on scale
    if (spacecraft.position.distanceTo(object.position) < planetRadius + 0.5) {  // Adjusted collision detection distance
      loadDynamicPlanetScene(object.material.map.image.src);
      return;
    }
  }
}

function loadDynamicPlanetScene(texturePath) {
  const queryString = `?texture=${encodeURIComponent(texturePath)}`;
  window.location.href = `dynamicPlanet.html${queryString}`;
}
