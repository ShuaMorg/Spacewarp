// bg.js
let bgs = [];

function createBgs(scene) {
  // Parameters for the starry sky
  const starCount = 4000000; // Further increased number of stars to make spirals even thicker and add more stars in between
  const starDistance = 100000; // Spread of stars
  const galacticThickness = 20000; // Thickness of the galactic plane (z-axis)
  const spiralArms = 5; // Number of spiral arms in the galaxy
  const armSpread = 8000; // Increased spread of stars around each arm to make spirals even thicker
  const armTwistFactor = 6; // Controls how tightly the arms twist
  const galaxyOffset = { x: 50000, y: 50000, z: 0 }; // Offset to move the galaxy away from the center

  // Geometry to hold all star positions
  const starGeometry = new THREE.BufferGeometry();
  const starPositions = new Float32Array(starCount * 3); // Each star has an x, y, z position
  const starSizes = new Float32Array(starCount); // Each star has a size

  for (let i = 0; i < starCount; i++) {
    // Randomly decide if the star should be part of a spiral arm or in between
    const isInSpiralArm = Math.random() < 0.8; // 80% chance to be in a spiral arm, 20% chance to be in between

    let x, y, z;
    if (isInSpiralArm) {
      // Position star within a spiral arm
      const armIndex = Math.floor(Math.random() * spiralArms); // Choose a spiral arm
      const angleOffset = (armIndex / spiralArms) * 2 * Math.PI; // Offset angle for arm position

      const radius = starDistance * Math.sqrt(Math.random()); // Stars concentrated towards center
      const theta = armTwistFactor * radius / starDistance + angleOffset; // Spiral angle with tighter twist
      z = galacticThickness * (Math.random() - 0.5); // Spread stars within galactic plane

      // Convert to Cartesian coordinates for x, y, z
      x = radius * Math.cos(theta);
      y = radius * Math.sin(theta);

      // Add some random offset to make the spiral arms thicker
      const offsetX = (Math.random() - 0.5) * armSpread;
      const offsetY = (Math.random() - 0.5) * armSpread;

      x += offsetX;
      y += offsetY;
    } else {
      // Position star randomly in between the spiral arms
      x = (Math.random() - 0.5) * starDistance * 2;
      y = (Math.random() - 0.5) * starDistance * 2;
      z = galacticThickness * (Math.random() - 0.5); // Spread stars within galactic plane
    }

    // Assign the position to the star, including the galaxy offset
    starPositions[i * 3] = x + galaxyOffset.x;
    starPositions[i * 3 + 1] = y + galaxyOffset.y;
    starPositions[i * 3 + 2] = z + galaxyOffset.z;

    // Assign a random size to the star
    starSizes[i] = (Math.random() * 7.5) + 2.5; // Vary size between 10.0 and 40.0 for greater variation
  }

  // Set star positions and sizes in geometry
  starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
  starGeometry.setAttribute('size', new THREE.BufferAttribute(starSizes, 1));

  // Custom shader material for stars that ensures background remains static
  const starMaterial = new THREE.ShaderMaterial({
    uniforms: {
      color: { value: new THREE.Color(0xffffff) }
    },
    vertexShader: `
      attribute float size;
      varying vec3 vColor;
      void main() {
        vColor = vec3(1.0, 1.0, 1.0);
        vec4 worldPosition = vec4(position, 1.0);
        worldPosition.xyz += cameraPosition; // Keep stars static relative to the camera
        vec4 mvPosition = modelViewMatrix * worldPosition;
        gl_PointSize = size * (1000.0 / -mvPosition.z);
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      varying vec3 vColor;
      void main() {
        float distanceToCenter = length(gl_PointCoord - vec2(0.5));
        if (distanceToCenter > 0.5) {
          discard;
        }
        gl_FragColor = vec4(vColor, 1.0);
      }
    `,
    transparent: true
  });

  // Create the star points and add to the scene
  const stars = new THREE.Points(starGeometry, starMaterial);
  scene.add(stars);
  bgs.push(stars);
}
