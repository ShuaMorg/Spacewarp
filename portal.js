// portal.js

let portals = [];
const portalCoordinates = [

// Act 1 - Scene 1
  { x: 15, y: 0, z: -200, targetX: 100, targetY: 1900, targetZ: -9000 },
  { x: -15, y: 0, z: -200, targetX: 100, targetY: 1900, targetZ: -9000 },

// Scene 2
  { x: 100, y: 1900, z: -9300, targetX: 100, targetY: 1900, targetZ: -25000 },
  { x: 0, y: 0, z: -19000, targetX: 100, targetY: 1900, targetZ: -9000 },



  // Add more portals as needed
];

function createPortals(scene) {
  const textureLoader = new THREE.TextureLoader();
  const portalTexture = textureLoader.load('p1.png');  // Replace with your texture file
  const portalGeometry = new THREE.RingGeometry(5, 10, 32);  // Ring shape
  const portalMaterial = new THREE.MeshBasicMaterial({ map: portalTexture, side: THREE.DoubleSide });
  
  for (let i = 0; i < portalCoordinates.length; i++) {
    const portal = new THREE.Mesh(portalGeometry, portalMaterial);
    portal.position.set(portalCoordinates[i].x, portalCoordinates[i].y, portalCoordinates[i].z);
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