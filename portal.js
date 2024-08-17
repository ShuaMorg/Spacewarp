let portals = [];
let portalCameras = [];
let portalRenderTargets = [];
const portalCoordinates = [
  { x: 55, y: 0, z: 250, targetX: 0, targetY: 0, targetZ: 0 },

  { x: -155, y: 0, z: -250, targetX: -155, targetY: 0, targetZ: -200 },

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

function createPortals(scene, renderer) {
  const textureLoader = new THREE.TextureLoader();
  const portalTexture = textureLoader.load('stone.webp');  // Replace with your texture file
  
  // Increase the size by 400%
  const portalRadius = 20;  // Increased from 5 to 20
  const tubeRadius = 8;  // Increased from 2 to 8

  const portalGeometry = new THREE.TorusGeometry(portalRadius, tubeRadius, 16, 100);  // Torus shape
  const portalMaterial = new THREE.MeshBasicMaterial({ map: portalTexture, side: THREE.DoubleSide });

  for (let i = 0; i < portalCoordinates.length; i++) {
    // Create a new render target for the portal
    const renderTarget = new THREE.WebGLRenderTarget(512, 512);  // Adjust resolution as needed
    portalRenderTargets.push(renderTarget);

    // Create a camera for each portal that will render the scene from the target location
    const portalCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    portalCamera.position.set(portalCoordinates[i].targetX, portalCoordinates[i].targetY, portalCoordinates[i].targetZ);
    portalCameras.push(portalCamera);

    // Create a plane geometry for the portal "view" in the center of the torus
    const planeGeometry = new THREE.PlaneGeometry(portalRadius * 1.8, portalRadius * 1.8);  // Increased to match the new size
    const planeMaterial = new THREE.MeshBasicMaterial({ map: renderTarget.texture });

    const portalPlane = new THREE.Mesh(planeGeometry, planeMaterial);

    // Position the plane in the center of the torus
    portalPlane.position.set(portalCoordinates[i].x, portalCoordinates[i].y, portalCoordinates[i].z);

    // Create the portal mesh (torus) and add it to the scene
    const portalTorus = new THREE.Mesh(portalGeometry, portalMaterial);
    portalTorus.position.set(portalCoordinates[i].x, portalCoordinates[i].y, portalCoordinates[i].z);

    // Add both the torus and the plane (portal "window") to the scene
    scene.add(portalTorus);
    scene.add(portalPlane);

    portals.push({ torus: portalTorus, plane: portalPlane });
  }
}

function updatePortals(renderer, scene) {
  for (let i = 0; i < portals.length; i++) {
    // Position the camera at the target coordinates
    portalCameras[i].position.set(
      portalCoordinates[i].targetX,
      portalCoordinates[i].targetY,
      portalCoordinates[i].targetZ
    );

    // Render the scene from the perspective of the portal camera into the render target
    renderer.setRenderTarget(portalRenderTargets[i]);
    renderer.render(scene, portalCameras[i]);
    renderer.setRenderTarget(null);  // Go back to rendering the main scene
  }
}

function checkPortalCollision(player) {
  for (let i = 0; i < portals.length; i++) {
    if (player.position.distanceTo(portals[i].torus.position) < 20) {  // Adjust collision threshold for larger portals
      teleportPlayer(player, portalCoordinates[i].targetX, portalCoordinates[i].targetY, portalCoordinates[i].targetZ);
      break;
    }
  }
}

function teleportPlayer(player, x, y, z) {
  player.position.set(x, y, z);
}
