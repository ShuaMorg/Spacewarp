let portalsAndWarps = [];
let cameras = [];
let renderTargets = [];
const coordinates = {
  portal: [
    { x: 0, y: 0, z: 500, targetX: 0, targetY: 0, targetZ: 200, cameraX: 50, cameraY: 50, cameraZ: 250, lookAtX: 0, lookAtY: 0, lookAtZ: 0 },
    { x: 0, y: 0, z: -100, targetX: 0, targetY: 0, targetZ: -600, cameraX: 10, cameraY: 10, cameraZ: -150, lookAtX: 0, lookAtY: 0, lookAtZ: 100 },
    { x: -200, y: 0, z: -625, targetX: -155, targetY: 0, targetZ: -425, cameraX: -200, cameraY: 0, cameraZ: -625, lookAtX: -200, lookAtY: 0, lookAtZ: -300 },
    { x: -15, y: 0, z: -1400, targetX: 100, targetY: 1900, targetZ: -9000, cameraX: 200, cameraY: 1800, cameraZ: -8900, lookAtX: 0, lookAtY: 1900, lookAtZ: 0 },
    { x: 100, y: 1900, z: -9400, targetX: 100, targetY: 1900, targetZ: -25000, cameraX: 150, cameraY: 2000, cameraZ: -24000, lookAtX: 0, lookAtY: 0, lookAtZ: -20000 },
    { x: 0, y: 0, z: -25500, targetX: 9000, targetY: 9000, targetZ: 9000, cameraX: 8500, cameraY: 8500, cameraZ: 8500, lookAtX: 10000, lookAtY: 10000, lookAtZ: 10000 },
    { x: 50, y: 1950, z: -25500, targetX: 0, targetY: 0, targetZ: 101500, cameraX: 100, cameraY: 1950, cameraZ: -25300, lookAtX: 0, lookAtY: 0, lookAtZ: 102000 },
    { x: 0, y: 1465, z: 99000, targetX: 0, targetY: -100000, targetZ: 101500, cameraX: 0, cameraY: 1465, cameraZ: 98500, lookAtX: 0, lookAtY: -95000, lookAtZ: 102000 }
  ],
  warp: [
    { x: 0, y: 0, z: 500, targetX: 0, targetY: 0, targetZ: 200, cameraX: 50, cameraY: 50, cameraZ: 250, lookAtX: 0, lookAtY: 0, lookAtZ: 0 },
    { x: 0, y: 0, z: -150, targetX: 0, targetY: 0, targetZ: -600, cameraX: 0, cameraY: 0, cameraZ: -150, lookAtX: 0, lookAtY: 0, lookAtZ: 100 }
  ]
};

function createPortalsOrWarps(type, scene, renderer) {
  const radius = 20;  // Shared radius for the spheres
  const geometry = new THREE.SphereGeometry(radius, 32, 32);  // Sphere shape
  const coordSet = coordinates[type];

  for (let i = 0; i < coordSet.length; i++) {
    const renderTarget = new THREE.WebGLRenderTarget(2048, 2048);  // Adjust resolution as needed
    renderTargets.push(renderTarget);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(coordSet[i].cameraX, coordSet[i].cameraY, coordSet[i].cameraZ);
    camera.lookAt(coordSet[i].lookAtX, coordSet[i].lookAtY, coordSet[i].lookAtZ);

    cameras.push(camera);

    const material = new THREE.MeshBasicMaterial({ map: renderTarget.texture, side: THREE.DoubleSide });
    const sphere = new THREE.Mesh(geometry, material);
    sphere.position.set(coordSet[i].x, coordSet[i].y, coordSet[i].z);

    sphere.rotation.y = Math.PI / 0.65;  // Rotate 90 degrees around the Y-axis
    scene.add(sphere);

    portalsAndWarps.push({ sphere: sphere, type: type, target: { x: coordSet[i].targetX, y: coordSet[i].targetY, z: coordSet[i].targetZ } });
  }
}

function updatePortalsOrWarps(renderer, scene, type) {
  const coordSet = coordinates[type];
  for (let i = 0; i < coordSet.length; i++) {
    cameras[i].position.set(coordSet[i].cameraX, coordSet[i].cameraY, coordSet[i].cameraZ);
    cameras[i].lookAt(coordSet[i].lookAtX, coordSet[i].lookAtY, coordSet[i].lookAtZ);

    renderer.setRenderTarget(renderTargets[i]);
    renderer.render(scene, cameras[i]);
    renderer.setRenderTarget(null);
  }
}

function checkCollision(player, type) {
  for (let i = 0; i < portalsAndWarps.length; i++) {
    if (portalsAndWarps[i].type === type && player.position.distanceTo(portalsAndWarps[i].sphere.position) < 20) {
      teleportPlayer(player, portalsAndWarps[i].target.x, portalsAndWarps[i].target.y, portalsAndWarps[i].target.z);
      break;
    }
  }
}

function teleportPlayer(player, x, y, z) {
  player.position.set(x, y, z);
}
