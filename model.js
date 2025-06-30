import * as THREE from 'three';
import { OrbitControls } from 'OrbitControls';
import { GLTFLoader } from 'GLTFLoader';

document.addEventListener('DOMContentLoaded', () => {
  initThree();
});

// Инициализация Three.js
function initThree() {
  const model = document.querySelector('.model');

  // Сцена
  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#e1e1df');
  scene.position.set(-8, -3, 0);

  // Камера
  const width = model.clientWidth;
  const height = model.clientHeight;

  const camera = new THREE.PerspectiveCamera(55, width / height, 0.14, 3000);
  camera.position.set(0, 0, 50);

  // Рендер
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(width, height);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  model.appendChild(renderer.domElement);

  // Загрузка модели
  const loader = new GLTFLoader();
  loader.load(
    './model/iwanttodie.glb',
    function (gltf) {
      gltf.scene.traverse((child) => {
        if (child.isMesh) {
          console.log(child.name, child.material);
        }
      });
      scene.add(gltf.scene);
    },
    undefined,
    function (error) {
      console.log('Error:', error);
    }
  );

  // Свет
  const light1 = new THREE.DirectionalLight(0xeeece9, 1);
  light1.position.set(-80, 100, 0);
  light1.lookAt(0, 20, 0);
  scene.add(light1);

  const light2 = new THREE.DirectionalLight(0xeeece9, 1);
  light2.position.set(50, 100, 0);
  light2.lookAt(0, 20, 0);
  scene.add(light2);

  // Управление камерой
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.minDistance = 40;
  controls.maxDistance = 45;
  controls.maxPolarAngle = Math.PI / 2.2;
  controls.enableZoom = false;

  // Анимация
  function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener('resize', onWindowResize);

  function onWindowResize() {
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  }
}
