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

    if (sun.scale.x < 1) {
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
      sun.scale.set(0.01, 0.01, 0.01);
    }

    const sunRadius = 2.5 * sun.scale.x;
    if (spacecraft.position.distanceTo(sun.position) < sunRadius + 0.5) {
      loadDynamicPlanetScene(sun.material.map.image.src);
      return;
    }
  }

  for (let object of objects) {
    object.position.z += speed;

    if (object.scale.x < 1) {
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
      object.scale.set(0.01, 0.01, 0.01);
    }

    const planetRadius = 0.5 * object.scale.x;
    if (spacecraft.position.distanceTo(object.position) < planetRadius + 0.5) {
      loadDynamicPlanetScene(object.material.map.image.src);
      return;
    }
  }
}

function loadDynamicPlanetScene(texturePath) {
  const queryString = `?texture=${encodeURIComponent(texturePath)}`;
  window.location.href = `dynamicPlanet.html${queryString}`;
}
