let portals = [];
let portalCameras = [];
let portalRenderTargets = [];
const portalCoordinates = [
  { x: 400, y: -3100, z: -300, targetX: -0, targetY: -3000, targetZ: 15000 },
  { x: 400, y: 100, z: -350, targetX: 0, targetY: 0, targetZ: 0 },
  { x: -15, y: -3000, z: -2400, targetX: 100, targetY: 1900, targetZ: -9000 },
  { x: 100, y: 1900, z: -9400, targetX: 100, targetY: 1900, targetZ: -25000 },
  { x: 0, y: 0, z: -25500, targetX: 9000, targetY: 9000, targetZ: 9000 },
  { x: 50, y: 1950, z: -25500, targetX: 0, targetY: 0, targetZ: 101500 },
  { x: 0, y: 1465, z: 99000, targetX: 0, targetY: -100000, targetZ: 101500 },
  { x: 100000, y: 100000, z: 100100, targetX: 100000, targetY: 100000, targetZ: 100000 },
  { x: 100000, y: 100000, z: 98000, targetX: 0, targetY: 0, targetZ: 0 },
  { x: -0, y: -3100, z: 14000, targetX: -200, targetY: -3000, targetZ: 9000 },
  { x: -0, y: -3100, z: 8000, targetX: -200, targetY: -3000, targetZ: 3000 },
  { x: 0, y: -3000, z: 2500, targetX: -200, targetY: -3000, targetZ: 1900 },
];

function createPortals(scene, renderer) {
  const textureLoader = new THREE.TextureLoader();
  const portalRadius = 20;
  const tubeRadius = 5;

  const portalGeometry = new THREE.TorusGeometry(portalRadius, tubeRadius, 16, 100);
  const wireframeMaterial = new THREE.MeshBasicMaterial({ color: 0x39ff14, wireframe: true });

  for (let i = 0; i < portalCoordinates.length; i++) {
    // Create a new render target for the portal
    const renderTarget = new THREE.WebGLRenderTarget(1048, 1048);
    portalRenderTargets.push(renderTarget);

    // Create a camera for each portal that will render the scene from the target location
    const portalCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    portalCamera.position.set(portalCoordinates[i].targetX, portalCoordinates[i].targetY, portalCoordinates[i].targetZ);
    portalCameras.push(portalCamera);

    // Create a plane geometry for the portal "view" in the center of the torus
    const planeGeometry = new THREE.PlaneGeometry(portalRadius * 1.8, portalRadius * 1.8);
    const planeMaterial = new THREE.MeshBasicMaterial({ map: renderTarget.texture });
    const portalPlane = new THREE.Mesh(planeGeometry, planeMaterial);
    portalPlane.position.set(portalCoordinates[i].x, portalCoordinates[i].y, portalCoordinates[i].z);

    // Create the portal mesh (torus) with the wireframe material initially
    const portalTorus = new THREE.Mesh(portalGeometry, wireframeMaterial);
    portalTorus.position.set(portalCoordinates[i].x, portalCoordinates[i].y, portalCoordinates[i].z);

    // Add both the torus and the plane (portal "window") to the scene
    scene.add(portalTorus);
    scene.add(portalPlane);

    portals.push({ torus: portalTorus, plane: portalPlane });

    // Load the texture and update the material once it's loaded
    textureLoader.load('stone.webp', (texture) => {
      const portalMaterial = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
      portalTorus.material = portalMaterial;
    });
  }
}

function updatePortals(renderer, scene, player) {
  for (let i = 0; i < portals.length; i++) {
    const distance = player.position.distanceTo(portals[i].torus.position);

    // Skip rendering if the portal is farther than 800 units away
    if (distance > 800) {
      continue;
    }

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
