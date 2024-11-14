// surface.js

let surfaces = [];

function createSurfaces(scene) {
  const textureLoader = new THREE.TextureLoader();

  // Adjusted coordinates to space them further apart on the z-axis by 100 to 400 units
  const surfaceData = [
    { x: 0, y: 100200, z: 0, texture: 'p5.png', size: 15000, darknessLevel: 0.9, heightVariation: 1000, heightDistribution: 0.001, textureRepeat: 14 },
    { x: 0, y: 100000, z: 0, texture: 'sea.jpg', size: 16000, darknessLevel: 0.9, heightVariation: 0, heightDistribution: 0.002, textureRepeat: 26 },
  ];

  const wireframeMaterial = new THREE.MeshBasicMaterial({ color: 0x39ff14, wireframe: true });

  for (let i = 0; i < surfaceData.length; i++) {
    // Create a surface with mountains and valleys
    const surfaceGeometry = new THREE.PlaneGeometry(surfaceData[i].size * 2, surfaceData[i].size * 2, 64, 64);
    
    // Add height variation for mountains and valleys
    const positionAttribute = surfaceGeometry.attributes.position;
    for (let j = 0; j < positionAttribute.count; j++) {
      const vertex = new THREE.Vector3().fromBufferAttribute(positionAttribute, j);
      vertex.z = Math.sin(vertex.x * surfaceData[i].heightDistribution) * Math.cos(vertex.y * surfaceData[i].heightDistribution) * surfaceData[i].heightVariation; // Use heightVariation and heightDistribution from surfaceData
      positionAttribute.setXYZ(j, vertex.x, vertex.y, vertex.z);
    }
    positionAttribute.needsUpdate = true;

    const surface = new THREE.Mesh(surfaceGeometry, wireframeMaterial);
    surface.position.set(surfaceData[i].x, surfaceData[i].y, surfaceData[i].z);
    surface.rotation.x = -Math.PI / 2; // Rotate to make it horizontal
    scene.add(surface);
    surfaces.push(surface);

    // Load the texture and update the material once it's loaded
    textureLoader.load(surfaceData[i].texture, (texture) => {
      texture.repeat.set(surfaceData[i].textureRepeat, surfaceData[i].textureRepeat);
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;

      const surfaceMaterial = new THREE.MeshStandardMaterial({
        map: texture,
        color: new THREE.Color().lerpHSL(new THREE.Color(0x000000), surfaceData[i].darknessLevel),
        emissive: 0x000000,
        emissiveIntensity: 0,
        roughness: 1,
        metalness: 0.1,
      });
      surface.material = surfaceMaterial;
    });
  }

  // Add a directional light to create non-uniform lighting
  const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
  directionalLight.position.set(2000, 1000, 500);
  directionalLight.castShadow = true;
  directionalLight.shadow.mapSize.width = 2048;
  directionalLight.shadow.mapSize.height = 2048;
  directionalLight.shadow.camera.near = 0.5;
  directionalLight.shadow.camera.far = 5000;
  scene.add(directionalLight);

  // Add ambient light for subtle fill lighting to reduce uniformity
  const ambientLight = new THREE.AmbientLight(0x404040, 0.2);
  scene.add(ambientLight);
}

// Usage example:
// createSurfaces(scene);
