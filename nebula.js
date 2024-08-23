let nebulas = [];
const nebulaCoordinates = [
  { x: 0, y: 0, z: 100, texture: 'nebula2.png', count: 100, maxDistance: 300, opacity: 0.3 },
  { x: -150, y: 40, z: 400, texture: 'nebula2.png', count: 200, maxDistance: 350, opacity: 0.5 },
  { x: -50, y: -50, z: 500, texture: 'nebula.png', count: 150, maxDistance: 400, opacity: 0.4 },

//eye
  { x: 0, y: 0, z: -9000, texture: 'nebula.png', count: 250, maxDistance: 250, opacity: 0.7 },
  { x: 150, y: 150, z: -9000, texture: 'nebula2.png', count: 150, maxDistance: 500, opacity: 0.5 },
{ x: -150, y: -180, z: -9000, texture: 'nebula2.png', count: 250, maxDistance: 600, opacity: 0.5 },
{ x: 180, y: -150, z: -9000, texture: 'nebula2.png', count: 150, maxDistance: 300, opacity: 0.5 },
{ x: -150, y: 150, z: -9000, texture: 'nebula2.png', count: 150, maxDistance: 400, opacity: 0.5 },
{ x: -150, y: 0, z: -9000, texture: 'nebula2.png', count: 150, maxDistance: 400, opacity: 0.5 },
{ x: 150, y: 0, z: -9000, texture: 'nebula2.png', count: 150, maxDistance: 400, opacity: 0.5 },

// Asteroids
//{ x: 100, y: 1900, z: -9200, texture: 'nebula.png', count: 1150, maxDistance: 200, opacity: 0.5 },
//{ x: 100, y: 1900, z: -9100, texture: 'smoke.png', count: 150, maxDistance: 100, opacity: 0.5 },



// Pyramid Nebula
  { x: -136, y: 74, z: 101444, texture: 'nebula2.png', count: 250, maxDistance: 375, opacity: 0.6 },
  { x: 45, y: -56, z: 101431, texture: 'nebula.png', count: 100, maxDistance: 300, opacity: 0.6 },
  { x: 176, y: 137, z: 101509, texture: 'nebula2.png', count: 580, maxDistance: 320, opacity: 0.6 },
{ x: 127, y: 257, z: 101037, texture: 'nebula.png', count: 400, maxDistance: 400, opacity: 0.6 },
{ x: -52, y: 314, z: 101045, texture: 'nebula2.png', count: 340, maxDistance: 500, opacity: 0.6 },
{ x: -48, y: 49, z: 100899, texture: 'nebula.png', count: 310, maxDistance: 320, opacity: 0.5 },
{ x: -110, y: 292, z: 101177, texture: 'nebula2.png', count: 130, maxDistance: 430, opacity: 0.3 },
{ x: 74, y: 331, z: 101186, texture: 'nebula.png', count: 300, maxDistance: 310, opacity: 0.25 },
{ x: -119, y: 417, z: 101136, texture: 'nebula2.png', count: 350, maxDistance: 560, opacity: 0.45 },
{ x: -54, y: 559, z: 101016, texture: 'nebula.png', count: 380, maxDistance: 640, opacity: 0.35 },
{ x: 98, y: 324, z: 100844, texture: 'nebula2.png', count: 340, maxDistance: 475, opacity: 0.4 },
{ x: -57, y: 391, z: 100994, texture: 'nebula.png', count: 360, maxDistance: 455, opacity: 0.3 },
{ x: 54, y: 477, z: 101045, texture: 'nebula2.png', count: 320, maxDistance: 500, opacity: 0.4 },
{ x: -88, y: 640, z: 100511, texture: 'nebula.png', count: 330, maxDistance: 325, opacity: 0.35 },
{ x: 84, y: 689, z: 100870, texture: 'nebula2.png', count: 250, maxDistance: 350, o1pacity: 0.45 },
{ x: 79, y: 824, z: 100837, texture: 'nebula.png', count: 270, maxDistance: 880, opacity: 0.5 },
{ x: -31, y: 616, z: 100494, texture: 'nebula2.png', count: 200, maxDistance: 800, opacity: 0.3 },
{ x: -91, y: 730, z: 100609, texture: 'nebula.png', count: 230, maxDistance: 840, opacity: 0.35 },
{ x: 39, y: 837, z: 100462, texture: 'nebula2.png', count: 240, maxDistance: 850, opacity: 0.4 },
{ x: -133, y: 751, z: 100419, texture: 'nebula.png', count: 250, maxDistance: 860, opacity: 0.45 },
{ x: -98, y: 850, z: 100388, texture: 'nebula2.png', count: 260, maxDistance: 870, opacity: 0.3 },
{ x: -55, y: 904, z: 100447, texture: 'nebula.png', count: 270, maxDistance: 880, opacity: 0.35 },
{ x: 146, y: 881, z: 100408, texture: 'nebula2.png', count: 220, maxDistance: 810, opacity: 0.25 },
{ x: -142, y: 1015, z: 100175, texture: 'nebula.png', count: 280, maxDistance: 850, opacity: 0.45 },
{ x: 67, y: 882, z: 100146, texture: 'nebula2.png', count: 240, maxDistance: 875, opacity: 0.4 },
{ x: -104, y: 899, z: 100109, texture: 'nebula.png', count: 260, maxDistance: 855, opacity: 0.3 },
{ x: -136, y: 1232, z: 100154, texture: 'nebula2.png', count: 220, maxDistance: 800, opacity: 0.4 },
{ x: -119, y: 1191, z: 100269, texture: 'nebula.png', count: 230, maxDistance: 825, opacity: 0.35 },
{ x: 44, y: 1002, z: 100007, texture: 'nebula2.png', count: 250, maxDistance: 750, opacity: 0.45 },
{ x: 82, y: 1273, z: 99928, texture: 'nebula.png', count: 270, maxDistance: 780, opacity: 0.5 },
{ x: -108, y: 1246, z: 100062, texture: 'nebula2.png', count: 240, maxDistance: 700, opacity: 0.3 },
{ x: 74, y: 1334, z: 100012, texture: 'nebula.png', count: 130, maxDistance: 740, opacity: 0.35 },


// after pyramid endX: 0, endY: -100000, endZ: 90000
{ x: 0, y: -100000, z: 100000, texture: 'nebula.png', count: 1200, maxDistance: 400, opacity: 0.7 },
{ x: 300, y: -100300, z: 100000, texture: 'nebula2.png', count: 400, maxDistance: 300, opacity: 0.5 },
{ x: -300, y: -90300, z: 100000, texture: 'nebula2.png', count: 400, maxDistance: 300, opacity: 0.5 },
{ x: 180, y: -100180, z: 100000, texture: 'nebula2.png', count: 400, maxDistance: 300, opacity: 0.5 },
{ x: 300, y: -100000, z: 100000, texture: 'nebula2.png', count: 400, maxDistance: 300, opacity: 0.5 },
{ x: 0, y: -100300, z: 100000, texture: 'nebula2.png', count: 400, maxDistance: 300, opacity: 0.5 },
{ x: -180, y: -100000, z: 100000, texture: 'nebula2.png', count: 400, maxDistance: 300, opacity: 0.5 },

// sky
{ x: 98500, y: 100000, z: 98000, texture: 'cloud.png', count: 10, maxDistance: 10, opacity: 0.5 },
{ x: 99000, y: 100000, z: 98000, texture: 'cloud.png', count: 50, maxDistance: 50, opacity: 0.5 },
{ x: 99500, y: 100000, z: 98000, texture: 'cloud.png', count: 100, maxDistance: 100, opacity: 0.5 },
{ x: 100000, y: 100000, z: 98000, texture: 'cloud.png', count: 200, maxDistance: 200, opacity: 0.5 },
{ x: 100500, y: 100000, z: 98000, texture: 'cloud.png', count: 300, maxDistance: 300, opacity: 0.5 },
{ x: 101000, y: 100000, z: 98000, texture: 'cloud.png', count: 400, maxDistance: 400, opacity: 0.5 },
{ x: 101500, y: 100000, z: 98000, texture: 'cloud.png', count: 500, maxDistance: 500, opacity: 0.5 },


{ x: 98500, y: 100600, z: 98000, texture: 'cloud.png', count: 10, maxDistance: 500, opacity: 0.5 },
{ x: 99000, y: 100600, z: 98000, texture: 'cloud.png', count: 50, maxDistance: 400, opacity: 0.5 },
{ x: 99500, y: 100600, z: 98000, texture: 'cloud.png', count: 100, maxDistance: 300, opacity: 0.5 },
{ x: 100000, y: 100600, z: 98000, texture: 'cloud.png', count: 200, maxDistance: 200, opacity: 0.5 },
{ x: 100500, y: 100600, z: 98000, texture: 'cloud.png', count: 300, maxDistance: 100, opacity: 0.5 },
{ x: 101000, y: 100600, z: 98000, texture: 'cloud.png', count: 400, maxDistance: 50, opacity: 0.5 },
{ x: 101500, y: 100600, z: 98000, texture: 'cloud.png', count: 500, maxDistance: 10, opacity: 0.5 },

{ x: 98500, y: 99400, z: 98000, texture: 'cloud.png', count: 500, maxDistance: 10, opacity: 0.5 },
{ x: 99000, y: 99400, z: 98000, texture: 'cloud.png', count: 400, maxDistance: 50, opacity: 0.5 },
{ x: 99500, y: 99400, z: 98000, texture: 'cloud.png', count: 300, maxDistance: 100, opacity: 0.5 },
{ x: 100000, y: 99400, z: 98000, texture: 'cloud.png', count: 200, maxDistance: 200, opacity: 0.5 },
{ x: 100500, y: 99400, z: 98000, texture: 'cloud.png', count: 100, maxDistance: 300, opacity: 0.5 },
{ x: 101000, y: 99400, z: 98000, texture: 'cloud.png', count: 50, maxDistance: 400, opacity: 0.5 },
{ x: 101500, y: 99400, z: 98000, texture: 'cloud.png', count: 10, maxDistance: 500, opacity: 0.5 },

];


function createNebulas(scene) {
  const textureLoader = new THREE.TextureLoader();
  const textureCache = {};

  for (let i = 0; i < nebulaCoordinates.length; i++) {
    const coord = nebulaCoordinates[i];

    // Cache textures to avoid reloading the same texture multiple times
    if (!textureCache[coord.texture]) {
      textureCache[coord.texture] = textureLoader.load(coord.texture);
    }

    const nebulaTexture = textureCache[coord.texture];
    nebulaTexture.needsUpdate = true;

    const nebulaMaterial = new THREE.SpriteMaterial({
      map: nebulaTexture,
      blending: THREE.NormalBlending,
      transparent: true,
      opacity: coord.opacity,
      depthWrite: false,
      depthTest: true
    });

    for (let j = 0; j < coord.count; j++) {
      const distanceFactor = Math.random();
      const offsetX = (Math.random() - 0.5) * coord.maxDistance * distanceFactor;
      const offsetY = (Math.random() - 0.5) * coord.maxDistance * distanceFactor;
      const offsetZ = (Math.random() - 0.5) * coord.maxDistance * distanceFactor;

      const nebula = new THREE.Sprite(nebulaMaterial);

      if (coord.texture === 'smoke.png') {
        nebula.scale.set(10 * (1 + distanceFactor), 10 * (1 + distanceFactor), 1);
      } else {
        nebula.scale.set(40 * (1 + distanceFactor), 40 * (1 + distanceFactor), 1);
      }

      nebula.position.set(
        coord.x + offsetX,
        coord.y + offsetY,
        coord.z + offsetZ
      );

      nebula.material.opacity = coord.opacity * (1 - distanceFactor);

      scene.add(nebula);
      nebulas.push(nebula);
    }
  }
}


function checkNebulaCollision(player) {
  for (let i = 0; i < nebulas.length; i++) {
    if (player.position.distanceTo(nebulas[i].position) < 100) {
      // Implement any effects or interactions here
    }
  }
}

function teleportPlayer(player, x, y, z) {
  player.position.set(x, y, z);
}

// Initialize the nebulas in your game scene
createNebulas(scene);