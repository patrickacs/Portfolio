// noiseEffect.js
import * as THREE from 'three';

// Setup básico para a cena, câmera e renderizador
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('noiseCanvas') });

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Criar um plano que ocupará toda a cena
const planeGeometry = new THREE.PlaneGeometry(2, 2, 1, 1);
const planeMaterial = new THREE.ShaderMaterial({
  uniforms: {
    time: { type: 'f', value: 0 }
  },
  vertexShader: `void main() {
    gl_Position = vec4(position, 1.0);
  }`,
  fragmentShader: `
  uniform float time;
  void main() {
    float x = gl_FragCoord.x / window.innerWidth;
    float y = gl_FragCoord.y / window.innerHeight;
    vec2 st = vec2(x, y);
    vec3 color = vec3(step(0.5, fract(sin(dot(st.xy, vec2(12.9898,78.233)) * 43758.5453 + time))));
    gl_FragColor = vec4(color, 1.0);
  }`
});

const plane = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(plane);

camera.position.z = 1;

// Função para atualizar a cena
function animate() {
  requestAnimationFrame(animate);
  planeMaterial.uniforms.time.value += 0.05;
  renderer.render(scene, camera);
}

animate();
