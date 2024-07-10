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
    if (distanceToSpacecraft < 8000) {
      sun.position.z += speed * 5;
    }
    if (distanceToSpacecraft > 80000) {
      sun.position.set(
        Math.random() * 1000 - 10000 + spacecraft.position.x,
        Math.random() * 1000 - 10000 + spacecraft.position.y,
        Math.random() * 1000 - 10000 + spacecraft.position.z
      );
      sun.scale.set(1, 1, 1);
      if (!scene.children.includes(sun)) {
        scene.add(sun);
      }
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
      object.position.set(
        Math.random() * 9000 - 1000 + spacecraft.position.x,
        Math.random() * 9000 - 1000 + spacecraft.position.y,
        Math.random() * 9000 - 1000 + spacecraft.position.z
      );
      if (!scene.children.includes(object)) {
        scene.add(object);
      }
    }

    const planetRadius = 10;
    if (spacecraft.position.distanceTo(object.position) < planetRadius + 0.5) {
      transitionToSurface(object);
    }
  }

  checkAndAddSuns(spacecraft);
}

function checkAndAddSuns(spacecraft) {
  const requiredSuns = 20;
  const distanceThreshold = 8000;

  while (suns.length < requiredSuns) {
    addNewSun(spacecraft);
  }

  for (let sun of suns) {
    const distanceToSpacecraft = sun.position.distanceTo(spacecraft.position);
    if (distanceToSpacecraft > distanceThreshold) {
      sun.position.set(
        Math.random() * 20000 - 5000 + spacecraft.position.x,
        Math.random() * 20000 - 5000 + spacecraft.position.y,
        Math.random() * 20000 - 5000 + spacecraft.position.z
      );
      sun.scale.set(1, 1, 1);
      if (!scene.children.includes(sun)) {
        scene.add(sun);
      }
    }
  }
}

function addNewSun(spacecraft) {
  const sunGeometry = new THREE.SphereGeometry(100, 32, 32);
  adjustUVs(sunGeometry);
  const sunMaterial = new THREE.MeshBasicMaterial({ map: sunFrames[0], transparent: true });
  const sun = new THREE.Mesh(sunGeometry, sunMaterial);
  sun.position.set(
    Math.random() * 1000 - 50000 + spacecraft.position.x,
    Math.random() * 1000 - 50000 + spacecraft.position.y,
    Math.random() * 1000 - 50000 + spacecraft.position.z
  );
  scene.add(sun);
  suns.push(sun);
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
