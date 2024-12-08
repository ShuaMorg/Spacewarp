let enemies = [];
let enemyProjectiles = [];
let playerProjectiles = [];
let killCount = 0; // Variable to track the number of enemy kills
let maxEnemies = 50; // Maximum number of enemies allowed in the game
let currentEnemies = 0; // Variable to track the current number of enemies

// Create an HTML element to display the kill count
const killDisplay = document.createElement('div');
killDisplay.style.position = 'absolute';
killDisplay.style.top = '10px';
killDisplay.style.right = '10px';
killDisplay.style.fontSize = '24px';
killDisplay.style.color = 'white';
killDisplay.style.zIndex = '10';
killDisplay.innerText = `Kills: ${killCount}`;
document.body.appendChild(killDisplay);

// Load the laser sound
const laserSound = new Audio('laser.ogg');
laserSound.loop = false;  // Ensures the sound does not loop, so it can play each time the player shoots.

// Load the explosion sound
const explosionSound = new Audio('explosion.ogg');
explosionSound.loop = false;  // Ensures the sound does not loop

// Function to play the laser sound
function playLaserSound() {
  const laser = new Audio('laser.ogg'); // Create a new Audio object to play the sound each time a shot is fired
  laser.play();
}

// Function to play the explosion sound
function playExplosionSound() {
  const explosion = new Audio('explosion.ogg'); // Create a new Audio object to play the sound when an explosion occurs
  explosion.play();
}

function createEnemies(scene) {
  // Spawn all 50 enemies immediately
  for (let i = 0; i < maxEnemies; i++) {
    spawnEnemy(scene);
  }
}

function spawnEnemy(scene) {
  const textureLoader = new THREE.TextureLoader();

  // Define an array of random geometries
  const geometries = [
    () => new THREE.BoxGeometry(50, 50, 50),
    () => new THREE.SphereGeometry(40, 46, 46),
    () => new THREE.ConeGeometry(60, 30, 16),
    () => new THREE.DodecahedronGeometry(50),
    () => new THREE.IcosahedronGeometry(50),
    () => new THREE.TorusGeometry(40, 8, 46, 200)
  ];

  // Select a random geometry and scale
  const randomGeometry = geometries[Math.floor(Math.random() * geometries.length)]();
  const scaleFactor = Math.random() * 3 + 1; // Random scale between 1 and 4
  randomGeometry.scale(scaleFactor, scaleFactor, scaleFactor);

  // Create enemy spacecraft with random geometry
  const enemySpacecraft = new THREE.Mesh(
    randomGeometry,
    new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true })
  );

  // Set random initial position for the enemy
  const x = Math.random() * 2000 - 2000;   // Adjusted for a range centered around 0
  const y = Math.random() * 3000 - 3000;  // Adjusted for a range centered around -3000
  const z = Math.random() * 14000 + 500; // Adjusted for a range centered around 14000
  enemySpacecraft.position.set(x, y, z);
  scene.add(enemySpacecraft);
  enemies.push(enemySpacecraft);

  // Load the ship texture and apply it to the enemy spacecraft
  textureLoader.load('ship2.png', (texture) => {
    const enemyMaterial = new THREE.MeshBasicMaterial({
      map: texture,           // Apply ship.jpg texture
      wireframe: false         // Ensure the texture is visible without wireframe
    });
    enemySpacecraft.material = enemyMaterial;
  });

  // Increment the count of current enemies
  currentEnemies++;

  // Make the enemy shoot at the player every 3 seconds
  setInterval(() => {
    shootAtPlayer(scene, enemySpacecraft);
  }, 1500);
}


function shootAtPlayer(scene, enemy) {
  if (!spacecraft) return;

  const projectileGeometry = new THREE.SphereGeometry(2, 8, 8);
  const projectileMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
  const projectile = new THREE.Mesh(projectileGeometry, projectileMaterial);

  // Set the initial position of the projectile to the enemy's position
  projectile.position.copy(enemy.position);
  scene.add(projectile);
  enemyProjectiles.push(projectile);

  // Store the time when the projectile was fired (in milliseconds)
  projectile.userData.fireTime = Date.now();

  // Calculate direction towards the player
  const direction = new THREE.Vector3();
  direction.subVectors(spacecraft.position, enemy.position).normalize();

  // Set projectile velocity
  const velocity = direction.multiplyScalar(5);
  projectile.userData.velocity = velocity;
}

function shootPlayerProjectile(scene) {
  const textureLoader = new THREE.TextureLoader();

  textureLoader.load('plasma.jpg', (texture) => {
    const projectileGeometry = new THREE.SphereGeometry(3.6, 8, 8);
    const projectileMaterial = new THREE.MeshBasicMaterial({ map: texture });

    const projectile = new THREE.Mesh(projectileGeometry, projectileMaterial);

    // Set the initial position of the projectile to be nearer the bottom of the spacecraft
    const projectilePosition = spacecraft.position.clone();
    projectilePosition.y -= 5; // Adjust this value to move the projectile lower

    projectile.position.copy(projectilePosition);
    scene.add(projectile);
    playerProjectiles.push(projectile);

    // Store the time when the projectile was fired (in milliseconds)
    projectile.userData.fireTime = Date.now();

    // Calculate direction towards where the player is facing
    const direction = new THREE.Vector3(0, 0, -1).applyQuaternion(spacecraft.quaternion).normalize();

    // Set projectile velocity
    const velocity = direction.multiplyScalar(10);
    projectile.userData.velocity = velocity;

    // Play the laser sound each time a projectile is shot
    playLaserSound();
  });
}


function createExplosion(scene, position, enemySize) {
  // Load a texture for the explosion particles
  const textureLoader = new THREE.TextureLoader();
  const particleTexture = textureLoader.load('particle2.png'); // Replace 'particle.png' with your texture path

  // Adjust the number of particles based on the enemy size
  const particleCount = Math.floor(1500 * enemySize);

  // Create a BufferGeometry for particles
  const particleGeometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const velocities = new Float32Array(particleCount * 3);

  // Populate positions and velocities for particles
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = position.x + Math.random() * 75 * enemySize - 37.5 * enemySize; // Halve range for explosion size
    positions[i * 3 + 1] = position.y + Math.random() * 75 * enemySize - 37.5 * enemySize; // Halve range for explosion size
    positions[i * 3 + 2] = position.z + Math.random() * 75 * enemySize - 37.5 * enemySize; // Halve range for explosion size

    velocities[i * 3] = (Math.random() - 0.5) * 100 * enemySize; // Increase velocity for larger explosion
    velocities[i * 3 + 1] = (Math.random() - 0.5) * 100 * enemySize; // Increase velocity for larger explosion
    velocities[i * 3 + 2] = (Math.random() - 0.5) * 100 * enemySize; // Increase velocity for larger explosion
  }

  particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  particleGeometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));

  // Create a PointsMaterial with the texture
  const particleMaterial = new THREE.SpriteMaterial({
    map: particleTexture,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending
  });

  // Create sprites for each particle
  const particles = new THREE.Group(); // Use a group to manage individual particles
  for (let i = 0; i < particleCount; i++) {
    const particle = new THREE.Sprite(particleMaterial);
    particle.scale.set(55, 55, 55); // Scale each particle 5 times bigger
    particle.position.set(
      positions[i * 3],
      positions[i * 3 + 1],
      positions[i * 3 + 2]
    );
    particles.add(particle);
  }

  scene.add(particles);

  // Animate particles
  const startTime = Date.now();
  const animationDuration = 2000;
  function animateParticles() {
    const elapsed = Date.now() - startTime;
    if (elapsed > animationDuration) {
      particles.children.forEach(sprite => scene.remove(sprite));
      scene.remove(particles);
      return;
    }

    // Update particle positions
    particles.children.forEach((sprite, i) => {
      sprite.position.x += velocities[i * 3] * 0.1;
      sprite.position.y += velocities[i * 3 + 1] * 0.1;
      sprite.position.z += velocities[i * 3 + 2] * 0.1;

      // Apply damping to velocities
      velocities[i * 3] *= 0.98;
      velocities[i * 3 + 1] *= 0.98;
      velocities[i * 3 + 2] *= 0.98;

      // Fade out particles
      sprite.material.opacity = (1 - elapsed / animationDuration) * 0.8;
    });

    // Continue animating
    requestAnimationFrame(animateParticles);
  }

  animateParticles();
}



function updateEnemies() {
  // Update enemy projectiles
  for (let i = 0; i < enemyProjectiles.length; i++) {
    const projectile = enemyProjectiles[i];
    projectile.position.add(projectile.userData.velocity);

    // Check if the projectile has been alive for more than 10 seconds
    if (Date.now() - projectile.userData.fireTime > 10000) {
      projectile.geometry.dispose();
      projectile.material.dispose();
      scene.remove(projectile);
      enemyProjectiles.splice(i, 1);
      i--;
      continue;
    }

    // Check collision with player
    const playerBoundingBox = new THREE.Box3().setFromObject(spacecraft);
    const projectileBoundingBox = new THREE.Box3().setFromObject(projectile);

    if (playerBoundingBox.intersectsBox(projectileBoundingBox)) {
      console.log('Player hit by enemy projectile!');
      playExplosionSound();
      resetToClosestTarget();

      projectile.geometry.dispose();
      projectile.material.dispose();
      scene.remove(projectile);
      enemyProjectiles.splice(i, 1);
      i--;
    }

    // Remove projectiles that are far away from the scene
    if (projectile.position.length() > 15000) {
      projectile.geometry.dispose();
      projectile.material.dispose();
      scene.remove(projectile);
      enemyProjectiles.splice(i, 1);
      i--;
    }
  }

  // Update player projectiles
  for (let i = 0; i < playerProjectiles.length; i++) {
    const projectile = playerProjectiles[i];
    projectile.position.add(projectile.userData.velocity);

    if (Date.now() - projectile.userData.fireTime > 10000) {
      projectile.geometry.dispose();
      projectile.material.dispose();
      scene.remove(projectile);
      playerProjectiles.splice(i, 1);
      i--;
      continue;
    }

    // Check collision with enemies
    const projectileBoundingBox = new THREE.Box3().setFromObject(projectile);

    for (let j = 0; j < enemies.length; j++) {
      const enemy = enemies[j];
      const enemyBoundingBox = new THREE.Box3().setFromObject(enemy);

      if (projectileBoundingBox.intersectsBox(enemyBoundingBox)) {
        console.log('Enemy hit by player projectile!');
        playExplosionSound();
        // Calculate enemy size as the average scale of its geometry
        const enemySize = (enemy.geometry.boundingBox.max.x - enemy.geometry.boundingBox.min.x) / 50;
        createExplosion(scene, enemy.position, enemySize);

        enemy.geometry.dispose();
        enemy.material.dispose();
        scene.remove(enemy);
        enemies.splice(j, 1);
        currentEnemies--;
        j--;

        projectile.geometry.dispose();
        projectile.material.dispose();
        scene.remove(projectile);
        playerProjectiles.splice(i, 1);
        i--;

        killCount++;
        killDisplay.innerText = `Kills: ${killCount}`;
        break;
      }
    }

    if (projectile.position.length() > 25000) {
      projectile.geometry.dispose();
      projectile.material.dispose();
      scene.remove(projectile);
      playerProjectiles.splice(i, 1);
      i--;
    }
  }
}


// Event listener to shoot player projectile
window.addEventListener('keydown', (event) => {
  if ((event.code === 'ControlLeft' || event.code === 'ControlRight') && !event.repeat) {
    shootPlayerProjectile(scene);
  }
});
