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

  // Create enemy spacecraft as a dodecahedron, 5 times larger
  const geometry = new THREE.DodecahedronGeometry(50);  // Increased size by 5 times (previously 10)
  const enemySpacecraft = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true }));

  // Set random initial position for the enemy
  const x = Math.random() * 1000 - 500;   // Adjusted for a range centered around 0
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
  const projectileGeometry = new THREE.SphereGeometry(.6, 8, 8);
  const projectileMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
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
}

function updateEnemies() {
  // Update enemy projectiles
  for (let i = 0; i < enemyProjectiles.length; i++) {
    const projectile = enemyProjectiles[i];
    projectile.position.add(projectile.userData.velocity);

    // Check if the projectile has been alive for more than 10 seconds
    if (Date.now() - projectile.userData.fireTime > 10000) {
      // Remove the projectile from the scene and the array
      projectile.geometry.dispose();
      projectile.material.dispose();
      scene.remove(projectile);
      enemyProjectiles.splice(i, 1);
      i--; // Decrement to correctly handle array indexing
      continue; // Skip the rest of the loop iteration
    }

    // Check collision with player
    if (projectile.position.distanceTo(spacecraft.position) < 5) {
      console.log('Player hit by enemy projectile!');
      playExplosionSound();  // Play explosion sound when player is hit
      resetToClosestTarget(); // Reset player as per previous behavior

      // Remove the projectile from the scene and the array
      projectile.geometry.dispose();
      projectile.material.dispose();
      scene.remove(projectile);
      enemyProjectiles.splice(i, 1);
      i--; // Decrement to correctly handle array indexing
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

    // Check if the projectile has been alive for more than 10 seconds
    if (Date.now() - projectile.userData.fireTime > 10000) {
      // Remove the projectile from the scene and the array
      projectile.geometry.dispose();
      projectile.material.dispose();
      scene.remove(projectile);
      playerProjectiles.splice(i, 1);
      i--; // Decrement to correctly handle array indexing
      continue; // Skip the rest of the loop iteration
    }

    // Check collision with enemies
    for (let j = 0; j < enemies.length; j++) {
      const enemy = enemies[j];

      // Check if the projectile hits the surface of the enemy (increased size)
      if (projectile.position.distanceTo(enemy.position) < 50) { // Adjusted to 50 for larger size
        console.log('Enemy hit by player projectile!');
        playExplosionSound();  // Play explosion sound when enemy is hit

        // Remove the enemy from the scene and the array
        enemy.geometry.dispose();
        enemy.material.dispose();
        scene.remove(enemy);
        enemies.splice(j, 1);
        currentEnemies--; // Decrease the count when an enemy is removed
        j--; // Decrement to handle array modification properly

        // Remove the projectile from the scene and the array
        projectile.geometry.dispose();
        projectile.material.dispose();
        scene.remove(projectile);
        playerProjectiles.splice(i, 1);
        i--; // Decrement to handle array modification properly

        // Increment kill count
        killCount++;
        killDisplay.innerText = `Kills: ${killCount}`; // Update the kill count display
        break; // Exit inner loop once an enemy is hit
      }
    }

    // Remove projectiles that are far away from the scene
    if (projectile.position.length() > 15000) {
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
