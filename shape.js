// This is shape.js

let shapes = [];
const shapeCoordinates = [
  { x: 0, y: 1400, z: 99000, targetX: 0, targetY: 0, targetZ: -50, shapeType: 'pyramid', textureImage: 'p3.png', size: 100, count: 1, radius: 0, twinkle: false },

  // Scene 4 - The pyramid
{ x: 0, y: 38, z: 101358, targetX: 0, targetY: 105, targetZ: 101315, shapeType: 'tetrahedron', textureImage: 'dia.jpg', size: 0.1, count: 100, radius: 30, twinkle: true },
{ x: 0, y: 75, z: 101315, targetX: 0, targetY: 143, targetZ: 101273, shapeType: 'tetrahedron', textureImage: 'dia.jpg', size: 0.1, count: 100, radius: 30, twinkle: true },
{ x: 0, y: 113, z: 101273, targetX: 0, targetY: 180, targetZ: 101230, shapeType: 'tetrahedron', textureImage: 'dia.jpg', size: 0.1, count: 100, radius: 30, twinkle: true },
{ x: 0, y: 150, z: 101230, targetX: 0, targetY: 218, targetZ: 101188, shapeType: 'tetrahedron', textureImage: 'dia.jpg', size: 0.1, count: 100, radius: 30, twinkle: true },
{ x: 0, y: 188, z: 101188, targetX: 0, targetY: 255, targetZ: 101145, shapeType: 'tetrahedron', textureImage: 'dia.jpg', size: 0.1, count: 100, radius: 30, twinkle: true },
{ x: 0, y: 225, z: 101145, targetX: 0, targetY: 293, targetZ: 101103, shapeType: 'tetrahedron', textureImage: 'dia.jpg', size: 0.1, count: 70, radius: 30, twinkle: true },
{ x: 0, y: 263, z: 101103, targetX: 0, targetY: 331, targetZ: 101060, shapeType: 'tetrahedron', textureImage: 'dia.jpg', size: 0.1, count: 70, radius: 30, twinkle: true },
{ x: 0, y: 301, z: 101060, targetX: 0, targetY: 368, targetZ: 101018, shapeType: 'tetrahedron', textureImage: 'dia.jpg', size: 0.1, count: 50, radius: 30, twinkle: true },
{ x: 0, y: 338, z: 101018, targetX: 0, targetY: 406, targetZ: 100975, shapeType: 'tetrahedron', textureImage: 'dia.jpg', size: 1, count: 50, radius: 30, twinkle: true },
{ x: 0, y: 376, z: 100975, targetX: 0, targetY: 425, targetZ: 100902, shapeType: 'tetrahedron', textureImage: 'dia.jpg', size: 1, count: 50, radius: 30, twinkle: true },


{ x: 0, y: 413, z: 100933, targetX: 0, targetY: 481, targetZ: 100891, shapeType: 'tetrahedron', textureImage: 'dia.jpg', size: 1, count: 50, radius: 30, twinkle: true },
{ x: 0, y: 451, z: 100891, targetX: 0, targetY: 518, targetZ: 100848, shapeType: 'tetrahedron', textureImage: 'dia.jpg', size: 1, count: 50, radius: 30, twinkle: true },
{ x: 0, y: 488, z: 100848, targetX: 0, targetY: 556, targetZ: 100806, shapeType: 'tetrahedron', textureImage: 'dia.jpg', size: 1, count: 50, radius: 30, twinkle: true },
{ x: 0, y: 526, z: 100806, targetX: 0, targetY: 593, targetZ: 100763, shapeType: 'tetrahedron', textureImage: 'dia.jpg', size: 1, count: 50, radius: 30, twinkle: true },
{ x: 0, y: 563, z: 100763, targetX: 0, targetY: 631, targetZ: 100721, shapeType: 'tetrahedron', textureImage: 'dia.jpg', size: 1, count: 50, radius: 30, twinkle: true },
{ x: 0, y: 601, z: 100721, targetX: 0, targetY: 668, targetZ: 100678, shapeType: 'tetrahedron', textureImage: 'dia.jpg', size: 1, count: 50, radius: 30, twinkle: true },
{ x: 0, y: 639, z: 100678, targetX: 0, targetY: 706, targetZ: 100636, shapeType: 'tetrahedron', textureImage: 'dia.jpg', size: 1, count: 50, radius: 30, twinkle: true },
{ x: 0, y: 676, z: 100636, targetX: 0, targetY: 744, targetZ: 100593, shapeType: 'tetrahedron', textureImage: 'dia.jpg', size: 1, count: 50, radius: 30, twinkle: true },
{ x: 0, y: 714, z: 100593, targetX: 0, targetY: 781, targetZ: 100551, shapeType: 'tetrahedron', textureImage: 'dia.jpg', size: 1, count: 50, radius: 30, twinkle: true },
{ x: 0, y: 751, z: 100551, targetX: 0, targetY: 819, targetZ: 100508, shapeType: 'tetrahedron', textureImage: 'dia.jpg', size: 1, count: 50, radius: 30, twinkle: true },
{ x: 0, y: 789, z: 100508, targetX: 0, targetY: 856, targetZ: 100466, shapeType: 'tetrahedron', textureImage: 'dia.jpg', size: 1, count: 50, radius: 30, twinkle: true },
{ x: 0, y: 826, z: 100466, targetX: 0, targetY: 894, targetZ: 100424, shapeType: 'tetrahedron', textureImage: 'dia.jpg', size: 1, count: 50, radius: 30, twinkle: true },
{ x: 0, y: 864, z: 100424, targetX: 0, targetY: 931, targetZ: 100381, shapeType: 'tetrahedron', textureImage: 'dia.jpg', size: 1, count: 50, radius: 30, twinkle: true },
{ x: 0, y: 902, z: 100381, targetX: 0, targetY: 969, targetZ: 100339, shapeType: 'tetrahedron', textureImage: 'dia.jpg', size: 1, count: 50, radius: 30, twinkle: true },
{ x: 0, y: 939, z: 100339, targetX: 0, targetY: 1006, targetZ: 100296, shapeType: 'tetrahedron', textureImage: 'dia.jpg', size: 1, count: 50, radius: 30, twinkle: true },
{ x: 0, y: 977, z: 100296, targetX: 0, targetY: 1044, targetZ: 100254, shapeType: 'tetrahedron', textureImage: 'dia.jpg', size: 1, count: 50, radius: 30, twinkle: true },
{ x: 0, y: 1014, z: 100254, targetX: 0, targetY: 1082, targetZ: 100211, shapeType: 'tetrahedron', textureImage: 'dia.jpg', size: 1, count: 50, radius: 30, twinkle: true },
{ x: 0, y: 1052, z: 100211, targetX: 0, targetY: 1157, targetZ: 100126, shapeType: 'tetrahedron', textureImage: 'dia.jpg', size: 1, count: 50, radius: 30, twinkle: true },
{ x: 0, y: 1127, z: 100126, targetX: 0, targetY: 1194, targetZ: 100084, shapeType: 'tetrahedron', textureImage: 'dia.jpg', size: 1, count: 50, radius: 30, twinkle: true },
{ x: 0, y: 1164, z: 100084, targetX: 0, targetY: 1232, targetZ: 100041, shapeType: 'tetrahedron', textureImage: 'dia.jpg', size: 1, count: 50, radius: 30, twinkle: true },
{ x: 0, y: 1202, z: 100041, targetX: 0, targetY: 1269, targetZ: 99999, shapeType: 'tetrahedron', textureImage: 'dia.jpg', size: 1, count: 50, radius: 30, twinkle: true },
{ x: 0, y: 1239, z: 99999, targetX: 0, targetY: 1307, targetZ: 99999, shapeType: 'tetrahedron', textureImage: 'dia.jpg', size: 1, count: 50, radius: 30, twinkle: true },
{ x: 0, y: 1277, z: 99999, targetX: 0, targetY: 1307, targetZ: 99999, shapeType: 'tetrahedron', textureImage: 'dia.jpg', size: 1, count: 50, radius: 30, twinkle: true },

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
    for (let i = 0; i < coord.count; i++) {
      const textureLoader = new THREE.TextureLoader();
      textureLoader.load(
        coord.textureImage,
        function (shapeTexture) {
            
            const shapeMaterials = new THREE.MeshStandardMaterial({ map: shapeTexture, transparent: true, emissive: new THREE.Color(0, 0, 0) });
            
                    const shapeGeometry = getShapeGeometry(coord.shapeType, coord.size);
          const shape = new THREE.Mesh(shapeGeometry, shapeMaterials);

          // Randomly disperse shapes within the specified radius
          const randomAngle = Math.random() * 2 * Math.PI;
          const randomRadius = Math.random() * coord.radius;
          const offsetX = randomRadius * Math.cos(randomAngle);
          const offsetY = Math.random() * coord.radius - coord.radius / 2; // Randomly disperse vertically within the radius
          const offsetZ = randomRadius * Math.sin(randomAngle);

          shape.position.set(coord.x + offsetX, coord.y + offsetY, coord.z + offsetZ);
          shape.userData = { 
  targetX: coord.targetX, 
  targetY: coord.targetY, 
  targetZ: coord.targetZ, 
  twinkle: coord.twinkle // Add this line to store the twinkle property
};
            
            scene.add(shape);
          shapes.push(shape);
        },
        undefined,
        function (error) {
          console.error('Error loading texture: ', error);
        }
      );
    }
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

// Twinkle Effect
function animateShapes() {
  const time = performance.now() * 5 * Math.PI;
  shapes.forEach((shape, index) => {
    if (shape.userData.twinkle) { // Check if twinkling is enabled for this shape
      const material = shape.material;
      
      // Introduce a variation by adding a unique offset for each shape
      const oscillation = 0.5 + 0.5 * Math.sin(time + shape.position.y * 0.1 + index * 0.5); 
      
      material.opacity = oscillation;
      material.emissive.setScalar(oscillation);
    }
  });
}

function render() {
  requestAnimationFrame(render);
  animateShapes(); // Call animateShapes in the render loop
  renderer.render(scene, camera);
}

// Initialize your scene, camera, renderer, and call createShapes(scene)
// Then call the render function to start the animation loop