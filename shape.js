// This is shape.js

let shapes = [];
const shapeCoordinates = [
   // Scene 4 - The pyramid
   
   { x: 0, y: 1400, z: 99000, targetX: 0, targetY: 0, targetZ: -50, shapeType: 'pyramid', textureImage: 'p3.png', size: 100, count: 1, radius: 0, twinkle: false },



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