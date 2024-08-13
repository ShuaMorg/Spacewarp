let nebulas = [];
const nebulaCoordinates = [
  { x: 0, y: 0, z: -100, texture: 'nebula2.png', count: 100, maxDistance: 300, opacity: 0.3 },
  { x: -150, y: 40, z: -400, texture: 'nebula2.png', count: 200, maxDistance: 350, opacity: 0.5 },
  { x: -50, y: -50, z: -500, texture: 'nebula.png', count: 150, maxDistance: 400, opacity: 0.4 },

//eye
  { x: 0, y: 0, z: -9000, texture: 'nebula.png', count: 250, maxDistance: 250, opacity: 0.7 },
  { x: 150, y: 150, z: -9000, texture: 'nebula2.png', count: 150, maxDistance: 500, opacity: 0.5 },
{ x: -150, y: -180, z: -9000, texture: 'nebula2.png', count: 250, maxDistance: 600, opacity: 0.5 },
{ x: 180, y: -150, z: -9000, texture: 'nebula2.png', count: 150, maxDistance: 300, opacity: 0.5 },
{ x: -150, y: 150, z: -9000, texture: 'nebula2.png', count: 150, maxDistance: 400, opacity: 0.5 },
{ x: -150, y: 0, z: -9000, texture: 'nebula2.png', count: 150, maxDistance: 400, opacity: 0.5 },
{ x: 150, y: 0, z: -9000, texture: 'nebula2.png', count: 150, maxDistance: 400, opacity: 0.5 },


  { x: -136, y: 74, z: 101444, texture: 'nebula2.png', count: 250, maxDistance: 375, opacity: 0.3 },
  { x: 45, y: -56, z: 101431, texture: 'nebula.png', count: 100, maxDistance: 300, opacity: 0.2 },
  { x: 76, y: 137, z: 101509, texture: 'nebula2.png', count: 180, maxDistance: 320, opacity: 0.4 },
{ x: 127, y: 257, z: 101037, texture: 'nebula.png', count: 120, maxDistance: 350, opacity: 0.4 },
{ x: -52, y: 314, z: 101045, texture: 'nebula2.png', count: 140, maxDistance: 300, opacity: 0.35 },
{ x: -48, y: 49, z: 100899, texture: 'nebula.png', count: 110, maxDistance: 320, opacity: 0.5 },
{ x: -110, y: 292, z: 101177, texture: 'nebula2.png', count: 130, maxDistance: 330, opacity: 0.3 },
{ x: 74, y: 331, z: 101186, texture: 'nebula.png', count: 100, maxDistance: 310, opacity: 0.25 },
{ x: -119, y: 417, z: 101136, texture: 'nebula2.png', count: 150, maxDistance: 360, opacity: 0.45 },
{ x: -54, y: 559, z: 101016, texture: 'nebula.png', count: 180, maxDistance: 340, opacity: 0.35 },
{ x: 98, y: 324, z: 100844, texture: 'nebula2.png', count: 140, maxDistance: 375, opacity: 0.4 },
{ x: -57, y: 391, z: 100994, texture: 'nebula.png', count: 160, maxDistance: 355, opacity: 0.3 },
{ x: 54, y: 477, z: 101045, texture: 'nebula2.png', count: 120, maxDistance: 300, opacity: 0.4 },
{ x: -88, y: 640, z: 100511, texture: 'nebula.png', count: 130, maxDistance: 325, opacity: 0.35 },
{ x: 84, y: 689, z: 100870, texture: 'nebula2.png', count: 150, maxDistance: 350, opacity: 0.45 },
{ x: 79, y: 824, z: 100837, texture: 'nebula.png', count: 170, maxDistance: 380, opacity: 0.5 },
{ x: -31, y: 616, z: 100494, texture: 'nebula2.png', count: 200, maxDistance: 400, opacity: 0.3 },
{ x: -91, y: 730, z: 100609, texture: 'nebula.png', count: 130, maxDistance: 340, opacity: 0.35 },
{ x: 39, y: 837, z: 100462, texture: 'nebula2.png', count: 140, maxDistance: 350, opacity: 0.4 },
{ x: -133, y: 751, z: 100419, texture: 'nebula.png', count: 150, maxDistance: 360, opacity: 0.45 },
{ x: -98, y: 850, z: 100388, texture: 'nebula2.png', count: 160, maxDistance: 370, opacity: 0.3 },
{ x: -55, y: 904, z: 100447, texture: 'nebula.png', count: 170, maxDistance: 380, opacity: 0.35 },
{ x: 146, y: 881, z: 100408, texture: 'nebula2.png', count: 120, maxDistance: 310, opacity: 0.25 },
{ x: -142, y: 1015, z: 100175, texture: 'nebula.png', count: 180, maxDistance: 350, opacity: 0.45 },
{ x: 67, y: 882, z: 100146, texture: 'nebula2.png', count: 140, maxDistance: 375, opacity: 0.4 },
{ x: -104, y: 899, z: 100109, texture: 'nebula.png', count: 160, maxDistance: 355, opacity: 0.3 },
{ x: -136, y: 1232, z: 100154, texture: 'nebula2.png', count: 120, maxDistance: 300, opacity: 0.4 },
{ x: -119, y: 1191, z: 100269, texture: 'nebula.png', count: 130, maxDistance: 325, opacity: 0.35 },
{ x: 44, y: 1002, z: 100007, texture: 'nebula2.png', count: 150, maxDistance: 350, opacity: 0.45 },
{ x: 82, y: 1273, z: 99928, texture: 'nebula.png', count: 170, maxDistance: 380, opacity: 0.5 },
{ x: -108, y: 1246, z: 100062, texture: 'nebula2.png', count: 140, maxDistance: 400, opacity: 0.3 },
{ x: 74, y: 1334, z: 100012, texture: 'nebula.png', count: 130, maxDistance: 340, opacity: 0.35 },
];

function createNebulas(scene) {
  const textureLoader = new THREE.TextureLoader();

  for (let i = 0; i < nebulaCoordinates.length; i++) {
    const coord = nebulaCoordinates[i];
    textureLoader.load(coord.texture, function (nebulaTexture) {
      nebulaTexture.needsUpdate = true;
      const nebulaMaterial = new THREE.SpriteMaterial({
        map: nebulaTexture,
        blending: THREE.NormalBlending,
        transparent: true,
        opacity: coord.opacity, // Use the specified opacity
        depthWrite: false,
        depthTest: true
      });

      for (let j = 0; j < coord.count; j++) { // Use the specified number of sprites in the cluster
        const distanceFactor = Math.random();
        const offsetX = (Math.random() - 0.5) * coord.maxDistance * distanceFactor; // Use the specified max distance
        const offsetY = (Math.random() - 0.5) * coord.maxDistance * distanceFactor;
        const offsetZ = (Math.random() - 0.5) * coord.maxDistance * distanceFactor;

        const nebula = new THREE.Sprite(nebulaMaterial);
        nebula.scale.set(40 * (1 + distanceFactor), 40 * (1 + distanceFactor), 1);
        nebula.position.set(
          coord.x + offsetX,
          coord.y + offsetY,
          coord.z + offsetZ
        );

        // Optional: Adjust opacity based on distanceFactor if needed
        nebula.material.opacity = coord.opacity * (1 - distanceFactor);

        scene.add(nebula);
        nebulas.push(nebula);
      }
    });
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