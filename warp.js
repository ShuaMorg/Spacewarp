let warps = [];
let warpCameras = [];
let warpRenderTargets = [];
const warpCoordinates = [
  { x: 0, y: -100000, z: 99700, targetX: 100000, targetY: 100000, targetZ: 100000, cameraX: 0, cameraY: -100000, cameraZ: 99730, lookAtX: 0, lookAtY: -100000, lookAtZ: 99900 },
  

// The Sky

//{ x: 100000, y: 100000, z: 99000, targetX: 100000, targetY: 100000, targetZ: 100000, cameraX: 100000, cameraY: 100000, cameraZ: 100000, lookAtX: 100000, lookAtY: 100000, lookAtZ: 00000 },
  

 ];

function createWarps(scene, renderer) {
  const warpRadius = 20;  // Increased size for the spheres
  const warpGeometry = new THREE.SphereGeometry(warpRadius, 132, 132);  // Sphere shape

  for (let i = 0; i < warpCoordinates.length; i++) {
    // Create a new render target for the warp
    const renderTarget = new THREE.WebGLRenderTarget(2048, 2048);  // Adjust resolution as needed
    warpRenderTargets.push(renderTarget);

    // Create a camera for each warp that will render the scene from the camera position
    const warpCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    warpCamera.position.set(warpCoordinates[i].cameraX, warpCoordinates[i].cameraY, warpCoordinates[i].cameraZ);

    // Set the camera to look at the specified lookAt coordinates
    warpCamera.lookAt(
      warpCoordinates[i].lookAtX,
      warpCoordinates[i].lookAtY,
      warpCoordinates[i].lookAtZ
    );

    warpCameras.push(warpCamera);

    // Create the material using the render target texture from the camera
    const warpMaterial = new THREE.MeshBasicMaterial({ map: renderTarget.texture, side: THREE.DoubleSide });

    // Create the warp mesh (sphere) and add it to the scene
    const warpSphere = new THREE.Mesh(warpGeometry, warpMaterial);
    warpSphere.position.set(warpCoordinates[i].x, warpCoordinates[i].y, warpCoordinates[i].z);

    // Rotate the sphere to ensure the texture is centered towards the positive Z axis
    
    warpSphere.rotation.y = Math.PI / 0.65;  // Rotate 90 degrees around the Y-axis
    
    // Add the sphere to the scene
    scene.add(warpSphere);

    warps.push({ sphere: warpSphere });
  }
}

function updateWarps(renderer, scene) {
  for (let i = 0; i < warps.length; i++) {
    
    
    // Position the camera at the camera coordinates
    warpCameras[i].position.set(
      warpCoordinates[i].cameraX,
      warpCoordinates[i].cameraY,
      warpCoordinates[i].cameraZ
    );

    // Update the camera to look at the specified direction
    warpCameras[i].lookAt(
      warpCoordinates[i].lookAtX,
      warpCoordinates[i].lookAtY,
      warpCoordinates[i].lookAtZ
    );

    // Render the scene from the perspective of the warp camera into the render target
    renderer.setRenderTarget(warpRenderTargets[i]);
    renderer.render(scene, warpCameras[i]);
    renderer.setRenderTarget(null);  // Go back to rendering the main scene
  }
}

function checkWarpCollision(player) {
  for (let i = 0; i < warps.length; i++) {
    if (player.position.distanceTo(warps[i].sphere.position) < 20) {  // Adjust collision threshold for larger warps
      teleportPlayer(player, warpCoordinates[i].targetX, warpCoordinates[i].targetY, warpCoordinates[i].targetZ);
      break;
    }
  }
}

function teleportPlayer(player, x, y, z) {
  player.position.set(x, y, z);
}