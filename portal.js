// This is portal.js

let portals = [];
const portalCoordinates = [


{ x: 15, y: 0, z: 450, targetX: 0, targetY: 0, targetZ: 0 },



// Act 1 - Scene 1
  { x: -15, y: 0, z: -1400, targetX: 100, targetY: 1900, targetZ: -9000 },

// Scene 2
  { x: 100, y: 1900, z: -9400, targetX: 100, targetY: 1900, targetZ: -25000 },


  { x: 0, y: 0, z: -25500, targetX: 9000, targetY: 9000, targetZ: 9000 },

// Scene 3 - 3 moons
  { x: 50, y: 1950, z: -25500, targetX: 0, targetY: 0, targetZ: 101500 },

// Scene 4

{ x: 0, y: 1465, z: 99000, targetX: 0, targetY: -100000, targetZ: 101500 },


  // Add more portals as needed
];

function createPortals(scene) {
  const textureLoader = new THREE.TextureLoader();
  const portalTexture = textureLoader.load('stone.webp');  // Replace with your texture file
  const portalRadius = 5;  // Outer radius of the torus
  const tubeRadius = 2;  // Thickness of the torus tube
  const portalGeometry = new THREE.TorusGeometry(portalRadius, tubeRadius, 16, 100);  // Torus shape
  const portalMaterial = new THREE.MeshBasicMaterial({ map: portalTexture, side: THREE.DoubleSide });

  for (let i = 0; i < portalCoordinates.length; i++) {
    const portal = new THREE.Mesh(portalGeometry, portalMaterial);
    portal.position.set(portalCoordinates[i].x, portalCoordinates[i].y, portalCoordinates[i].z);
    portal.rotation.x = Math.PI / 1;  // Rotate to align the torus along the Z-axis (facing forward)
    scene.add(portal);
    portals.push(portal);
  }
}

function checkPortalCollision(player) {
  for (let i = 0; i < portals.length; i++) {
    if (player.position.distanceTo(portals[i].position) < 5) {  // Assuming 5 is the collision threshold
      teleportPlayer(player, portalCoordinates[i].targetX, portalCoordinates[i].targetY, portalCoordinates[i].targetZ);
      break;
    }
  }
}

function teleportPlayer(player, x, y, z) {
  player.position.set(x, y, z);
}
