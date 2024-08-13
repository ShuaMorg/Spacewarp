let smokes = [];
const smokeCoordinates = [
  {
    startX: 0, startY: -500, startZ: 101600, // Start coordinates
    middleX: 500, middleY: 1300, middleZ: 100209, // Middle coordinates
    endX: 0, endY: 1465, endZ: 99000, // End coordinates
    texture: 'smoke.png',
    count: 1000,
    maxDistanceX: 1,
    maxDistanceY: 1,
    maxDistanceZ: 20,
    opacity: 0.5
  },

  // Portal is at x: 0, y: 1465, z: 99000

  // Add more coordinate sets as needed
];

function createSmokes(scene) {
  const textureLoader = new THREE.TextureLoader();

  for (let i = 0; i < smokeCoordinates.length; i++) {
    const coord = smokeCoordinates[i];
    textureLoader.load(coord.texture, function (smokeTexture) {
      smokeTexture.needsUpdate = true;
      const smokeMaterial = new THREE.SpriteMaterial({
        map: smokeTexture,
        blending: THREE.NormalBlending,
        transparent: true,
        opacity: coord.opacity,
        depthWrite: false,
        depthTest: true
      });

      for (let j = 0; j < coord.count; j++) {
        const t = Math.random(); // Parameter t for interpolation along the curve
        const distanceFactor = Math.random();
        const offsetX = (Math.random() - 0.5) * coord.maxDistanceX * distanceFactor;
        const offsetY = (Math.random() - 0.5) * coord.maxDistanceY * distanceFactor;
        const offsetZ = (Math.random() - 0.5) * coord.maxDistanceZ * distanceFactor;

        const smoke = new THREE.Sprite(smokeMaterial);

        // Quadratic Bézier curve interpolation
        const interpolatedX = (1 - t) * (1 - t) * coord.startX + 2 * (1 - t) * t * coord.middleX + t * t * coord.endX;
        const interpolatedY = (1 - t) * (1 - t) * coord.startY + 2 * (1 - t) * t * coord.middleY + t * t * coord.endY;
        const interpolatedZ = (1 - t) * (1 - t) * coord.startZ + 2 * (1 - t) * t * coord.middleZ + t * t * coord.endZ;

        smoke.position.set(
          interpolatedX + offsetX,
          interpolatedY + offsetY,
          interpolatedZ + offsetZ
        );

        if (coord.texture === 'smoke.png') {
          smoke.scale.set(10 * (1 + distanceFactor), 10 * (1 + distanceFactor), 1);
        } else {
          smoke.scale.set(40 * (1 + distanceFactor), 40 * (1 + distanceFactor), 1);
        }

        smoke.material.opacity = coord.opacity * (1 - distanceFactor);

        scene.add(smoke);
        smokes.push(smoke);
      }
    });
  }
}

function checkSmokeCollision(player) {
  for (let i = 0; i < smokes.length; i++) {
    if (player.position.distanceTo(smokes[i].position) < 100) {
      // Implement any effects or interactions here
    }
  }
}

function teleportPlayer(player, x, y, z) {
  player.position.set(x, y, z);
}

// Initialize the smokes in your game scene
createSmokes(scene);
