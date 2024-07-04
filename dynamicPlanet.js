let flatPlanet, spacecraft, renderer, scene, camera;
let pitch = 0, roll = 0;
const speed = 0.1;

function init(planetTexturePath) {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 
