

// shape.js

let shapes = [];
const shapeCoordinates = [
  // Act 1 - Scene 1
  { x: 0, y: 0, z: -200, targetX: 0, targetY: 0, targetZ: -200, shapeType: 'sphere', textureImage: 'moon.jpg', size: 5 },
  { x: -15, y: 0, z: -125, targetX: 100, targetY: 1900, targetZ: -9000, shapeType: 'dodecahedron', textureImage: 'earth.jpg', size: 7 },
  { x: 0, y: 1400, z: 99000, targetX: 0, targetY: 0, targetZ: -50, shapeType: 'pyramid', textureImage: 'p3.png', size: 100 },

// Additional scattered coordinates between (0,0,101400) and (0,1465,99999)
{ x: 0, y: 0, z: 101400, targetX: 0, targetY: 0, targetZ: 101400, shapeType: 'sphere', textureImage: 'p2.png', size: 1 },
{ x: 0, y: 38, z: 101358, targetX: 0, targetY: 0, targetZ: 101400, shapeType: 'sphere', textureImage: 'p2.png', size: 1 },
{ x: 0, y: 75, z: 101315, targetX: 0, targetY: 0, targetZ: 101400, shapeType: 'sphere', textureImage: 'p2.png', size: 1 },
{ x: 0, y: 113, z: 101273, targetX: 0, targetY: 0, targetZ: 101400, shapeType: 'sphere', textureImage: 'p2.png', size: 1 },
{ x: 0, y: 150, z: 101230, targetX: 0, targetY: 0, targetZ: 101400, shapeType: 'sphere', textureImage: 'p2.png', size: 1 },
{ x: 0, y: 188, z: 101188, targetX: 0, targetY: 0, targetZ: 101400, shapeType: 'sphere', textureImage: 'p2.png', size: 1 },
{ x: 0, y: 225, z: 101145, targetX: 0, targetY: 0, targetZ: 101400, shapeType: 'sphere', textureImage: 'p2.png', size: 1 },
{ x: 0, y: 263, z: 101103, targetX: 0, targetY: 0, targetZ: 101400, shapeType: 'sphere', textureImage: 'p2.png', size: 1 },
{ x: 0, y: 301, z: 101060, targetX: 0, targetY: 0, targetZ: 101400, shapeType: 'sphere', textureImage: 'p2.png', size: 1 },
{ x: 0, y: 338, z: 101018, targetX: 0, targetY: 0, targetZ: 101400, shapeType: 'sphere', textureImage: 'p2.png', size: 1 },
{ x: 0, y: 376, z: 100975, targetX: 0, targetY: 0, targetZ: 101400, shapeType: 'sphere', textureImage: 'p2.png', size: 1 },
{ x: 0, y: 413, z: 100933, targetX: 0, targetY: 0, targetZ: 101400, shapeType: 'sphere', textureImage: 'p2.png', size: 1 },
{ x: 0, y: 451, z: 100891, targetX: 0, targetY: 0, targetZ: 101400, shapeType: 'sphere', textureImage: 'p2.png', size: 1 },
{ x: 0, y: 488, z: 100848, targetX: 0, targetY: 0, targetZ: 101400, shapeType: 'sphere', textureImage: 'p2.png', size: 1 },
{ x: 0, y: 526, z: 100806, targetX: 0, targetY: 0, targetZ: 101400, shapeType: 'sphere', textureImage: 'p2.png', size: 1 },
{ x: 0, y: 563, z: 100763, targetX: 0, targetY: 0, targetZ: 101400, shapeType: 'sphere', textureImage: 'p2.png', size: 1 },
{ x: 0, y: 601, z: 100721, targetX: 0, targetY: 0, targetZ: 101400, shapeType: 'sphere', textureImage: 'p2.png', size: 1 },
{ x: 0, y: 639, z: 100678, targetX: 0, targetY: 0, targetZ: 101400, shapeType: 'sphere', textureImage: 'p2.png', size: 1 },
{ x: 0, y: 676, z: 100636, targetX: 0, targetY: 0, targetZ: 101400, shapeType: 'sphere', textureImage: 'p2.png', size: 1 },
{ x: 0, y: 714, z: 100593, targetX: 0, targetY: 0, targetZ: 101400, shapeType: 'sphere', textureImage: 'p2.png', size: 1 },
{ x: 0, y: 751, z: 100551, targetX: 0, targetY: 0, targetZ: 101400, shapeType: 'sphere', textureImage: 'p2.png', size: 1 },
{ x: 0, y: 789, z: 100508, targetX: 0, targetY: 0, targetZ: 101400, shapeType: 'sphere', textureImage: 'p2.png', size: 1 },
{ x: 0, y: 826, z: 100466, targetX: 0, targetY: 0, targetZ: 101400, shapeType: 'sphere', textureImage: 'p2.png', size: 1 },
{ x: 0, y: 864, z: 100424, targetX: 0, targetY: 0, targetZ: 101400, shapeType: 'sphere', textureImage: 'p2.png', size: 1 },
{ x: 0, y: 902, z: 100381, targetX: 0, targetY: 0, targetZ: 101400, shapeType: 'sphere', textureImage: 'p2.png', size: 1 },
{ x: 0, y: 939, z: 100339, targetX: 0, targetY: 0, targetZ: 101400, shapeType: 'sphere', textureImage: 'p2.png', size: 1 },
{ x: 0, y: 977, z: 100296, targetX: 0, targetY: 0, targetZ: 101400, shapeType: 'sphere', textureImage: 'p2.png', size: 1 },
{ x: 0, y: 1014, z: 100254, targetX: 0, targetY: 0, targetZ: 101400, shapeType: 'sphere', textureImage: 'p2.png', size: 1 },
{ x: 0, y: 1052, z: 100211, targetX: 0, targetY: 0, targetZ: 101400, shapeType: 'sphere', textureImage: 'p2.png', size: 1 },
{ x: 0, y: 1089, z: 100169, targetX: 0, targetY: 0, targetZ: 101400, shapeType: 'sphere', textureImage: 'p2.png', size: 1 },
{ x: 0, y: 1127, z: 100126, targetX: 0, targetY: 0, targetZ: 101400, shapeType: 'sphere', textureImage: 'p2.png', size: 1 },
{ x: 0, y: 1164, z: 100084, targetX: 0, targetY: 0, targetZ: 101400, shapeType: 'sphere', textureImage: 'p2.png', size: 1 },
{ x: 0, y: 1202, z: 100041, targetX: 0, targetY: 0, targetZ: 101400, shapeType: 'sphere', textureImage: 'p2.png', size: 1 },
{ x: 0, y: 1239, z: 99999, targetX: 0, targetY: 0, targetZ: 101400, shapeType: 'sphere', textureImage: 'p2.png', size: 1 },
{ x: 0, y: 1277, z: 99999, targetX: 0, targetY: 0, targetZ: 101400, shapeType: 'sphere', textureImage: 'p2.png', size: 1 },

  // Add more shapes as needed
];

function createShapes(scene) {
  function getShapeGeometry(shapeType, size) {
    switch (shapeType) {
      case 'sphere':
        return new THREE.SphereGeometry(size, 32, 32);
      case 'dodecahedron':
        return new THREE.DodecahedronGeometry(size, 0);
      case 'tetrahedron':
        return new THREE.TetrahedronGeometry(size, 0);
      case 'octahedron':
        return new THREE.OctahedronGeometry(size, 0);
      case 'pyramid':
        return new THREE.ConeGeometry(size, size, 4); // Radius and Height as size, 4 segments (pyramid)
      default:
        return new THREE.SphereGeometry(size, 32, 32); // Default shape
    }
  }

  shapeCoordinates.forEach((coord, index) => {
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(
      coord.textureImage,
      function (shapeTexture) {
        const shapeMaterials = new THREE.MeshBasicMaterial({ map: shapeTexture });
        const shapeGeometry = getShapeGeometry(coord.shapeType, coord.size);
        const shape = new THREE.Mesh(shapeGeometry, shapeMaterials);
        shape.position.set(coord.x, coord.y, coord.z);
        shape.userData = { targetX: coord.targetX, targetY: coord.targetY, targetZ: coord.targetZ };
        scene.add(shape);
        shapes.push(shape);
      },
      undefined,
      function (error) {
        console.error('Error loading texture: ', error);
      }
    );
  });
}

function checkShapeCollision(player) {
  for (let i = 0; i < shapes.length; i++) {
    if (player.position.distanceTo(shapes[i].position) < 5) {  // Assuming 5 is the collision threshold
      const targetCoords = shapes[i].userData;
      teleportPlayer(player, targetCoords.targetX, targetCoords.targetY, targetCoords.targetZ);
      break;
    }
  }
}

function teleportPlayer(player, x, y, z) {
  player.position.set(x, y, z);
}
