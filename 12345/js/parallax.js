/**
 * 长征纪念网站 - 视差滚动脚本
 * 负责实现页面的视差滚动效果，增强沉浸感
 */

document.addEventListener('DOMContentLoaded', function() {
  // 初始化视差滚动效果
  initParallax();
});

/**
 * 初始化视差滚动效果
 */
function initParallax() {
  // 检查是否加载了GSAP和ScrollTrigger
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.error('GSAP或ScrollTrigger未加载');
    return;
  }
  
  // 注册ScrollTrigger插件
  gsap.registerPlugin(ScrollTrigger);
  
  // 背景层视差效果
  const terrainBg = document.getElementById('terrain-bg');
  if (terrainBg) {
    gsap.to(terrainBg, {
      scrollTrigger: {
        trigger: '#hero-section',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      },
      y: '30%',
      ease: 'none'
    });
  }
  
  // 首屏标题视差效果
  const heroTitle = document.getElementById('hero-title');
  if (heroTitle) {
    gsap.from(heroTitle, {
      scrollTrigger: {
        trigger: '#hero-section',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      },
      y: '-50px',
      ease: 'none'
    });
  }
  
  // 首屏副标题视差效果
  const heroSubtitle = document.getElementById('hero-subtitle');
  if (heroSubtitle) {
    gsap.from(heroSubtitle, {
      scrollTrigger: {
        trigger: '#hero-section',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      },
      y: '-30px',
      ease: 'none'
    });
  }
  
  // 首屏按钮视差效果
  const heroButtons = document.getElementById('hero-buttons');
  if (heroButtons) {
    gsap.from(heroButtons, {
      scrollTrigger: {
        trigger: '#hero-section',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      },
      y: '-20px',
      ease: 'none'
    });
  }
  
  // 数据展示区视差效果
  const dataSection = document.getElementById('data-section');
  if (dataSection) {
    gsap.from(dataSection, {
      scrollTrigger: {
        trigger: dataSection,
        start: 'top 80%',
        end: 'top 20%',
        scrub: true
      },
      y: '50px',
      opacity: 0,
      ease: 'power2.out'
    });
  }
  
  // 节点展示区视差效果
  const nodesTitle = document.getElementById('nodes-title');
  if (nodesTitle) {
    gsap.from(nodesTitle, {
      scrollTrigger: {
        trigger: nodesTitle,
        start: 'top 80%',
        end: 'top 20%',
        scrub: true
      },
      y: '50px',
      opacity: 0,
      ease: 'power2.out'
    });
  }
  
  // 长征精神区视差效果
  const spiritSection = document.getElementById('spirit-title');
  if (spiritSection) {
    gsap.from(spiritSection, {
      scrollTrigger: {
        trigger: spiritSection,
        start: 'top 80%',
        end: 'top 20%',
        scrub: true
      },
      y: '50px',
      opacity: 0,
      ease: 'power2.out'
    });
  }
  
  // 精神区图片视差效果
  const spiritImage = document.getElementById('spirit-image');
  if (spiritImage) {
    gsap.from(spiritImage, {
      scrollTrigger: {
        trigger: spiritImage,
        start: 'top 80%',
        end: 'top 20%',
        scrub: true
      },
      x: '-50px',
      opacity: 0,
      ease: 'power2.out'
    });
  }
  
  // 精神区内容视差效果
  const spiritContent = document.getElementById('spirit-content');
  if (spiritContent) {
    gsap.from(spiritContent, {
      scrollTrigger: {
        trigger: spiritContent,
        start: 'top 80%',
        end: 'top 20%',
        scrub: true
      },
      x: '50px',
      opacity: 0,
      ease: 'power2.out'
    });
  }
}

/**
 * 创建3D地形背景
 * 使用Three.js创建简单的3D地形效果
 */
function create3DTerrain() {
  // 检查是否加载了Three.js
  if (typeof THREE === 'undefined') {
    console.error('Three.js未加载');
    return;
  }
  
  // 获取容器元素
  const container = document.getElementById('terrain-bg');
  if (!container) return;
  
  // 创建场景
  const scene = new THREE.Scene();
  
  // 创建相机
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 5, 10);
  
  // 创建渲染器
  const renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000, 0); // 透明背景
  container.appendChild(renderer.domElement);
  
  // 创建地形
  const terrainGeometry = new THREE.PlaneGeometry(20, 20, 50, 50);
  const terrainMaterial = new THREE.MeshBasicMaterial({
    color: 0x8b4513,
    wireframe: false,
    transparent: true,
    opacity: 0.7
  });
  
  const terrain = new THREE.Mesh(terrainGeometry, terrainMaterial);
  terrain.rotation.x = -Math.PI / 2; // 水平放置
  scene.add(terrain);
  
  // 为地形添加高度变化
  const vertices = terrainGeometry.attributes.position.array;
  for (let i = 0; i < vertices.length; i += 3) {
    const x = vertices[i];
    const y = vertices[i + 1];
    const z = vertices[i + 2];
    
    // 使用正弦函数创建山脉效果
    vertices[i + 2] = Math.sin(x * 0.5) * Math.sin(y * 0.5) * 2;
  }
  
  // 更新地形几何体
  terrainGeometry.attributes.position.needsUpdate = true;
  
  // 添加长征路线
  const pathGeometry = new THREE.BufferGeometry();
  const pathPoints = [];
  
  // 创建一条从左到右的曲线路径
  for (let i = -8; i <= 8; i += 0.2) {
    const x = i;
    const y = Math.sin(i * 0.5) * 0.5;
    const z = Math.sin(i * 0.5) * Math.sin(i * 0.5) * 2 + 0.1; // 略高于地形
    pathPoints.push(new THREE.Vector3(x, z, y));
  }
  
  pathGeometry.setFromPoints(pathPoints);
  
  const pathMaterial = new THREE.LineBasicMaterial({
    color: 0xff0000, // 红色路线
    linewidth: 3
  });
  
  const path = new THREE.Line(pathGeometry, pathMaterial);
  scene.add(path);
  
  // 添加光源
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);
  
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(5, 10, 5);
  scene.add(directionalLight);
  
  // 动画循环
  function animate() {
    requestAnimationFrame(animate);
    
    // 缓慢旋转地形以增强3D效果
    terrain.rotation.z += 0.001;
    path.rotation.z += 0.001;
    
    renderer.render(scene, camera);
  }
  
  animate();
  
  // 响应窗口大小变化
  window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}

/**
 * 初始化高级视差效果（包含3D地形）
 */
function initAdvancedParallax() {
  // 先初始化基础视差效果
  initParallax();
  
  // 然后创建3D地形
  create3DTerrain();
}