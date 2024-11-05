function createLights(scene) {
    // Create a directional light to simulate sunlight
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(100, 100, 100); // Position the light
    directionalLight.castShadow = true; // Enable shadows
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);
  
    // Create an ambient light to illuminate the scene globally
    const ambientLight = new THREE.AmbientLight(0x404040, 0.5); // Soft white light
    scene.add(ambientLight);
  
    // Optional: Add a point light for additional illumination in specific areas
    const pointLight = new THREE.PointLight(0xffffff, 0.5, 1000);
    pointLight.position.set(0, 200, 0);
    pointLight.castShadow = true;
    scene.add(pointLight);
  }
  
  export { createLights };
  