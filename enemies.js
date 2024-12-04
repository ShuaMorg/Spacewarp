
// enemies.js

let enemies = [];
let enemyProjectiles = [];
let playerProjectiles = [];

function createEnemies(scene) {
  setInterval(() => {
    spawnEnemy(scene);
    spawnEnemy(scene);
  }, getRandomInterval(2500, 5000)); // Spawn enemy every 5 to 10 seconds randomly
}

function spawnEnemy(scene) {
  const textureLoader = new THREE.TextureLoader();
  const wireframeMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });

  // Create enemy spacecraft
  const geometry = new THREE.SphereGeometry(1, 16, 16);
  const enemySpacecraft = new THREE.Mesh(geometry, wireframeMaterial);

  // Set random initial position for the enemy
  const x = Math.random() * 1000 - 500;
  const y = Math.random() * 1000 - 500;
  const z = Math.random() * 1000 - 500;
  enemySpacecraft.position.set(x, y, z);
  scene.add(enemySpacecraft);
  enemies.push(enemySpacecraft);

  // Load texture and update the material once it's loaded
  textureLoader.load('enemy_texture.jpg', (texture) => {
    const enemyMaterial = new THREE.MeshStandardMaterial({ map: texture, metalness: 0.6, roughness: 0.4 });
    enemySpacecraft.material = enemyMaterial;
  });

  // Make the enemy shoot at the player every 3 seconds
  setInterval(() => {
    shootAtPlayer(scene, enemySpacecraft);
    shootAtPlayer(scene, enemySpacecraft);
  }, 1500);
}

function shootAtPlayer(scene, enemy) {
  if (!spacecraft) return;

  const projectileGeometry = new THREE.SphereGeometry(0.1, 8, 8);
  const projectileMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
  const projectile = new THREE.Mesh(projectileGeometry, projectileMaterial);

  // Set the initial position of the projectile to the enemy's position
  projectile.position.copy(enemy.position);
  scene.add(projectile);
  enemyProjectiles.push(projectile);

  // Calculate direction towards the player
  const direction = new THREE.Vector3();
  direction.subVectors(spacecraft.position, enemy.position).normalize();

  // Set projectile velocity
  const velocity = direction.multiplyScalar(5);
  projectile.userData.velocity = velocity;
}

function shootPlayerProjectile(scene) {
  const projectileGeometry = new THREE.SphereGeometry(0.1, 8, 8);
  const projectileMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  const projectile = new THREE.Mesh(projectileGeometry, projectileMaterial);

  // Set the initial position of the projectile to the player's position
  projectile.position.copy(spacecraft.position);
  scene.add(projectile);
  playerProjectiles.push(projectile);

  // Calculate direction towards where the player is facing
  const direction = new THREE.Vector3(0, 0, -1).applyQuaternion(spacecraft.quaternion).normalize();

  // Set projectile velocity
  const velocity = direction.multiplyScalar(10);
  projectile.userData.velocity = velocity;
}

function updateEnemies() {
  // Update enemy projectiles
  for (let i = 0; i < enemyProjectiles.length; i++) {
    const projectile = enemyProjectiles[i];
    projectile.position.add(projectile.userData.velocity);

    // Check collision with player
    if (projectile.position.distanceTo(spacecraft.position) < 1) {
      console.log('Player hit by enemy projectile!');
      resetToClosestTarget(); // Reset player as per previous behavior

      // Remove the projectile from the scene and the array
      projectile.geometry.dispose();
      projectile.material.dispose();
      scene.remove(projectile);
      enemyProjectiles.splice(i, 1);
      i--;
    }

    // Remove projectiles that are far away from the scene
    if (projectile.position.length() > 2000) {
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

    // Check collision with enemies
    for (let j = 0; j < enemies.length; j++) {
      const enemy = enemies[j];
      if (projectile.position.distanceTo(enemy.position) < 1) {
        console.log('Enemy hit by player projectile!');

        // Remove the enemy from the scene and the array
        enemy.geometry.dispose();
        enemy.material.dispose();
        scene.remove(enemy);
        enemies.splice(j, 1);
        j--;

        // Remove the projectile from the scene and the array
        projectile.geometry.dispose();
        projectile.material.dispose();
        scene.remove(projectile);
        playerProjectiles.splice(i, 1);
        i--;
        break;
      }
    }

    // Remove projectiles that are far away from the scene
    if (projectile.position.length() > 2000) {
      projectile.geometry.dispose();
      projectile.material.dispose();
      scene.remove(projectile);
      playerProjectiles.splice(i, 1);
      i--;
    }
  }
}

function getRandomInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Event listener to shoot player projectile
window.addEventListener('keydown', (event) => {
  if ((event.code === 'ControlLeft' || event.code === 'ControlRight') && !event.repeat) {
    shootPlayerProjectile(scene);
  }
});

// Usage example:
// createEnemies(scene);
// In the animate loop, call updateEnemies();
