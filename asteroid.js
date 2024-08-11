// asteroid.js

let asteroids = [];
const asteroidCoordinates = [

  // Act 1 - Scene 1
{ x: 0, y: 1800, z: -9100, targetX: 100, targetY: 1900, targetZ: -9000 },
{ x: 0, y: 1800, z: -9100, targetX: 100, targetY: 1900, targetZ: -9000 },
{ x: 0, y: 1800, z: -9100, targetX: 100, targetY: 1900, targetZ: -9000 },
{ x: 0, y: 1800, z: -9200, targetX: 100, targetY: 1900, targetZ: -9000 },
{ x: 0, y: 1850, z: -9200, targetX: 100, targetY: 1900, targetZ: -9000 },
{ x: 0, y: 1850, z: -9200, targetX: 100, targetY: 1900, targetZ: -9000 },
{ x: 50, y: 1850, z: -9250, targetX: 100, targetY: 1900, targetZ: -9000 },
{ x: 50, y: 1900, z: -9250, targetX: 100, targetY: 1900, targetZ: -9000 },
{ x: 50, y: 1900, z: -9250, targetX: 100, targetY: 1900, targetZ: -9000 },
{ x: 50, y: 1900, z: -9250, targetX: 100, targetY: 1900, targetZ: -9000 },
{ x: 50, y: 1900, z: -9250, targetX: 100, targetY: 1900, targetZ: -9000 },
{ x: 50, y: 1900, z: -9250, targetX: 100, targetY: 1900, targetZ: -9000 },
{ x: 100, y: 1950, z: -9250, targetX: 100, targetY: 1900, targetZ: -9000 },
{ x: 100, y: 1950, z: -9250, targetX: 100, targetY: 1900, targetZ: -9000 },
{ x: 100, y: 1950, z: -9250, targetX: 100, targetY: 1900, targetZ: -9000 },
{ x: 100, y: 1950, z: -9100, targetX: 100, targetY: 1900, targetZ: -9000 },
{ x: 100, y: 1950, z: -9100, targetX: 100, targetY: 1900, targetZ: -9000 },
{ x: 100, y: 1950, z: -9100, targetX: 100, targetY: 1900, targetZ: -9000 },
{ x: 100, y: 2000, z: -9200, targetX: 100, targetY: 1900, targetZ: -9000 },
{ x: 100, y: 2000, z: -9200, targetX: 100, targetY: 1900, targetZ: -9000 },
{ x: 100, y: 2000, z: -9200, targetX: 100, targetY: 1900, targetZ: -9000 },
{ x: 100, y: 2000, z: -9250, targetX: 100, targetY: 1900, targetZ: -9000 },
{ x: 100, y: 1900, z: -9250, targetX: 100, targetY: 1900, targetZ: -9000 },
{ x: 100, y: 1900, z: -9250, targetX: 100, targetY: 1900, targetZ: -9000 },
{ x: 100, y: 1900, z: -9250, targetX: 100, targetY: 1900, targetZ: -9000 },
{ x: 150, y: 1900, z: -9250, targetX: 100, targetY: 1900, targetZ: -9000 },
{ x: 150, y: 1900, z: -9250, targetX: 100, targetY: 1900, targetZ: -9000 },
{ x: 150, y: 1900, z: -9250, targetX: 100, targetY: 1900, targetZ: -9000 },
{ x: 150, y: 1900, z: -9250, targetX: 100, targetY: 1900, targetZ: -9000 },
{ x: 150, y: 1900, z: -9250, targetX: 100, targetY: 1900, targetZ: -9000 },




 // { x: -15, y: 0, z: -125, targetX: 100, targetY: 1900, targetZ: -9000 },

  // Add more asteroids as needed
];

function createAsteroids(scene) {
  const textureLoader = new THREE.TextureLoader();
  textureLoader.load('moon.jpg', function (asteroidTexture) {
    const asteroidMaterials = new THREE.MeshBasicMaterial({ map: asteroidTexture });

    function getRandomAsteroidGeometry() {
      const geometries = [
        new THREE.SphereGeometry(5, 32, 32),
        new THREE.DodecahedronGeometry(5, 0),
        new THREE.TetrahedronGeometry(5, 0),
        new THREE.OctahedronGeometry(5, 0),
      ];
      return geometries[Math.floor(Math.random() * geometries.length)];
    }

    for (let i = 0; i < asteroidCoordinates.length; i++) {
      for (let j = 0; j < 20; j++) {  // Create a cluster of 10 asteroids
        const offsetX = (Math.random() - 0.5) * 200;  // Increased range for offset
        const offsetY = (Math.random() - 0.5) * 200;  // Increased range for offset
        const offsetZ = (Math.random() - 0.5) * 200;  // Increased range for offset
        const asteroidGeometry = getRandomAsteroidGeometry();
        const asteroid = new THREE.Mesh(asteroidGeometry, asteroidMaterials);
        asteroid.position.set(
          asteroidCoordinates[i].x + offsetX,
          asteroidCoordinates[i].y + offsetY,
          asteroidCoordinates[i].z + offsetZ
        );
        scene.add(asteroid);
        asteroids.push(asteroid);
      }
    }
  });
}

function checkAsteroidCollision(player) {
  for (let i = 0; i < asteroids.length; i++) {
    if (player.position.distanceTo(asteroids[i].position) < 5) {  // Assuming 5 is the collision threshold
      teleportPlayer(player, asteroidCoordinates[Math.floor(i / 10)].targetX, asteroidCoordinates[Math.floor(i / 10)].targetY, asteroidCoordinates[Math.floor(i / 10)].targetZ);
      break;
    }
  }
}

function teleportPlayer(player, x, y, z) {
  player.position.set(x, y, z);
}