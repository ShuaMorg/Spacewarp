let objects = [];
let suns = [];
let sunFrames = [];
let sunFrameIndex = 0;
let sunFrameDirection = 1;  // 1 for forward, -1 for backward
const sunFrameRate = 5;  // Change frame every 5 animation loops

const sunPositions = [
  { x: 500, y: 500, z: -500 },
  { x: -500, y: 500, z: 500 },
  { x: 500, y: -500, z: 500 },
  { x: 1000, y: 0, z: 0 },
  { x: -1000, y: 0, z: 0 }
];

const planetPositions = [
  { x: 200, y: 200, z: -200 },
  { x: -200, y: 200, z: 200 },
  { x: 200, y: -200, z: 200 },
  { x: 300, y: 300, z: -300 },
  { x: -300, y: 300, z: 300 },
  { x: 300, y: -300, z: 300 },
  { x: 400, y: 400, z: -400 },
  { x: -400, y: 400, z: 400 },
  { x: 400, y: -400, z: 400 },
  { x: 500, y: 500, z: -500 },
  { x: 600, y: 600, z: -600 },
  { x: -600, y: 600, z: 600 },
  { x: 600, y: -600, z: 600 },
  { x: 700, y: 700, z: -700 },
  { x: -700, y: 700, z: 700 },
  { x: 700, y: -700, z: 700 },
  { x: 800, y: 800, z: -800 },
  { x: -800, y: 800, z: 800 },
  { x: 800, y: -800, z: 800 },
  { x: 900, y: 900, z: -900 }
];

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

  // Create suns at specific positions
  for (let i = 0; i < sunPositions.length; i++) {
    const sunGeometry = new THREE.SphereGeometry(100, 32, 32);  // 40 times bigger than the original
    adjustUVs(sunGeometry);  // Adjust UV mapping to focus on the central part of the texture
    const sunMaterial = new THREE.MeshBasicMaterial({ map: sunFrames[0], transparent: true });
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    sun.position.set(sunPositions[i].x, sunPositions[i].y, sunPositions[i].z);
    scene.add(sun);
    suns.push(sun);
  }

  // Create planets at specific positions
  for (let i = 0; i < planetPositions.length; i++) {
    const objectGeometry = new THREE.SphereGeometry(10, 32, 32);  // 20 times larger than the original
    const objectMaterial = new THREE.MeshBasicMaterial({ map: planetTextures[Math.floor(Math.random() * planetTextures.length)] });
    const object = new THREE.Mesh(objectGeometry, objectMaterial);
    object.position.set(planetPositions[i].x, planetPositions[i].y, planetPositions[i].z);
    scene.add(object);
    objects.push(object);
  }
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

    const distanceToSpacecraft = sun.position.distanceTo(spacecraft.position);
    if (distanceToSpacecraft < 80000) {
      sun.position.z += speed * 5;
    }
    if (distanceToSpacecraft > 80000) {
      // Do nothing, suns remain in their predetermined positions
    }

    const sunRadius = 100;
    if (spacecraft.position.distanceTo(sun.position) < sunRadius + 0.5) {
      alert('Collision detected!');
      resetGame();
    }
  }

  for (let object of objects) {
    const distanceToSpacecraft = object.position.distanceTo(spacecraft.position);
    if (distanceToSpacecraft < 80000) {
      object.position.z += speed * 5;
    }

    if (distanceToSpacecraft > 80000) {
      // Do nothing, planets remain in their predetermined positions
    }

    const planetRadius = 10;
    if (spacecraft.position.distanceTo(object.position) < planetRadius + 0.5) {
      transitionToSurface(object);
    }
  }
}

function transitionToSurface(planet) {
  const planetTexture = planet.material.map.image.currentSrc || planet.material.map.image.src;
  const planetURL = encodeURIComponent(planetTexture);
  window.location.href = `planet_surface.html?texture=${planetURL}`;
}

function updatePlayer(pitch, roll, speed) {
  if (onPlanetSurface && currentPlanet) {
    const forward = new THREE.Vector3().subVectors(currentPlanet.position, spacecraft.position).normalize();
    const right = new THREE.Vector3().crossVectors(forward, spacecraft.up).normalize();
    const up = new THREE.Vector3().crossVectors(right, forward).normalize();

    spacecraft.position.add(right.multiplyScalar(pitch * speed));
    spacecraft.position.add(up.multiplyScalar(roll * speed));
    spacecraft.lookAt(currentPlanet.position);
  } else {
    spacecraft.rotation.z = pitch * 0.1;
    spacecraft.rotation.x = -roll * 0.1;

    spacecraft.position.x -= pitch * speed;
    spacecraft.position.y += roll * speed;
  }
}

function resetGame() {
  onPlanetSurface = false;
  currentPlanet = null;
  spacecraft.position.set(0, 0, 0);
  score = 0;
  document.getElementById('score').textContent = 'Score: ' + score;
  for (let object of objects) {
    object.position.set(
      Math.random() * 8000 - 2000,
      Math.random() * 8000 - 2000,
      Math.random() * 8000 - 2000
    );
  }
  for (let dust of dusts) {
    dust.position.set(
      Math.random() * 4000 - 2000,
      Math.random() * 4000 - 2000,
      Math.random() * 4000 - 2000
    );
  }
}