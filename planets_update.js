function updatePlanets(spacecraft, speed) {
  sunFrameIndex += sunFrameDirection;
  if (sunFrameIndex >= sunFrames.length * sunFrameRate || sunFrameIndex < 0) {
    sunFrameDirection *= -1;
    sunFrameIndex += sunFrameDirection;
  }
  const currentSunFrame = sunFrames[Math.floor(sunFrameIndex / sunFrameRate)];

  if (suns.length === 0) {
    addNewSun(spacecraft);
  }

  for (let sun of suns) {
    sun.material.map = currentSunFrame;
    sun.material.map.needsUpdate = true;

    const distanceToSpacecraft = sun.position.distanceTo(spacecraft.position);
    if (distanceToSpacecraft < 8000) {  // Start moving the sun smoothly when it's within a certain distance
      sun.position.z += speed * 5;  // Increase speed factor
    }
    if (distanceToSpacecraft > 2000) {  // Decrease threshold for more frequent re-spawn
      sun.position.set(
        Math.random() * 2000 - 1000 + spacecraft.position.x,  // Use a smaller range for repositioning
        Math.random() * 2000 - 1000 + spacecraft.position.y,
        Math.random() * 2000 - 1000 + spacecraft.position.z
      );
      sun.scale.set(1, 1, 1);  // Ensure sun is visible
      if (!scene.children.includes(sun)) {
        scene.add(sun);
      }
    }

    const sunRadius = 100;  // Fixed sun radius based on initial size
    if (spacecraft.position.distanceTo(sun.position) < sunRadius + 0.5) {  // Adjusted collision detection distance
      alert('Collision detected!');
      resetGame();
    }
  }

  for (let object of objects) {
    const distanceToSpacecraft = object.position.distanceTo(spacecraft.position);
    if (distanceToSpacecraft < 8000) {  // Start moving the planet smoothly when it's within a certain distance
      object.position.z += speed * 5;  // Increase speed factor
    }

    if (distanceToSpacecraft > 3000) {  // Decrease threshold for more frequent re-spawn
      object.position.set(
        Math.random() * 2000 - 1000 + spacecraft.position.x,
        Math.random() * 2000 - 1000 + spacecraft.position.y,
        Math.random() * 2000 - 1000 + spacecraft.position.z
      );
      if (!scene.children.includes(object)) {
        scene.add(object);
      }
    }

    const planetRadius = 10;  // Fixed planet radius based on initial size
    if (spacecraft.position.distanceTo(object.position) < planetRadius + 0.5) {  // Adjusted collision detection distance
      transitionToSurface(object);
    }
  }

  // Check and add new suns if necessary
  checkAndAddSuns(spacecraft);
}

function checkAndAddSuns(spacecraft) {
  const requiredSuns = 10;  // Increase the number of desired suns
  const distanceThreshold = 2000;  // Decrease distance threshold for adding new suns

  // Ensure there are enough suns in the scene
  while (suns.length < requiredSuns) {
    addNewSun(spacecraft);
  }

  // Ensure suns are spread out properly
  for (let sun of suns) {
    const distanceToSpacecraft = sun.position.distanceTo(spacecraft.position);
    if (distanceToSpacecraft > distanceThreshold) {
      sun.position.set(
        Math.random() * 2000 - 1000 + spacecraft.position.x,
        Math.random() * 2000 - 1000 + spacecraft.position.y,
        Math.random() * 2000 - 1000 + spacecraft.position.z
      );
      sun.scale.set(1, 1, 1);
      if (!scene.children.includes(sun)) {
        scene.add(sun);
      }
    }
  }
}

function addNewSun(spacecraft) {
  const sunGeometry = new THREE.SphereGeometry(100, 32, 32);  // 40 times bigger than the original
  adjustUVs(sunGeometry);  // Adjust UV mapping to focus on the central part of the texture
  const sunMaterial = new THREE.MeshBasicMaterial({ map: sunFrames[0], transparent: true });
  const sun = new THREE.Mesh(sunGeometry, sunMaterial);
  sun.position.set(
    Math.random() * 1000 - 500 + spacecraft.position.x,  // Position closer to the spacecraft
    Math.random() * 1000 - 500 + spacecraft.position.y,
    Math.random() * 1000 - 500 + spacecraft.position.z
  );
  scene.add(sun);
  suns.push(sun);
}

function transitionToSurface(planet) {
  onPlanetSurface = true;
  currentPlanet = planet;
  const normal = new THREE.Vector3().subVectors(spacecraft.position, planet.position).normalize();
  const targetPosition = planet.position.clone().add(normal.multiplyScalar(10 + 0.5));  // 10 is the planet radius, 0.5 is an offset to be slightly above the surface
  spacecraft.position.copy(targetPosition);
  spacecraft.lookAt(planet.position);
}

function updatePlayer(pitch, roll, speed) {
  if (onPlanetSurface && currentPlanet) {
    // Calculate the direction of movement along the surface
    const forward = new THREE.Vector3().subVectors(currentPlanet.position, spacecraft.position).normalize();
    const right = new THREE.Vector3().crossVectors(forward, spacecraft.up).normalize();
    const up = new THREE.Vector3().crossVectors(right, forward).normalize();

    // Update spacecraft position on the planet's surface
    spacecraft.position.add(right.multiplyScalar(pitch * speed));
    spacecraft.position.add(up.multiplyScalar(roll * speed));

    // Adjust spacecraft orientation
    spacecraft.lookAt(currentPlanet.position);
  } else {
    // Apply tilt based on user input
    spacecraft.rotation.z = pitch * 0.1;
    spacecraft.rotation.x = -roll * 0.1;

    // Update the spacecraft's position
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
      Math.random() * 4000 - 2000,
      Math.random() * 4000 - 2000,
      Math.random() * 4000 - 2000
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