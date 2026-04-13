/**
 * 长征纪念网站 - 地图功能脚本
 * 负责实现"重走长征路"全景交互地图功能
 */

// 全局变量
let scene, camera, renderer, controls;
let terrain, pathLine;
let currentNode = null;
let isAudioPlaying = false;
let backgroundAudio = null;
let nodeMarkers = [];

// 长征节点数据
const nodesData = [
  {
    id: 'ruijin',
    name: '瑞金出发',
    date: '1934年10月',
    description: '1934年10月，中央红军从瑞金出发，开始了伟大的长征。这是一次为了摆脱国民党军队的包围追击，保存革命力量的战略转移。',
    position: { x: -80, y: 0, z: -60 },
    audio: '../assets/audio/ruijin.mp3',
    image: 'https://p11-doubao-search-sign.byteimg.com/labis/f02822502e26b67ee521a1f17fb243b2~tplv-be4g95zd3a-image.jpeg?lk3s=feb11e32&x-expires=1791637144&x-signature=yEvQCDGbeokHQYztH%2BlJ7fzQCBw%3D'
  },
  {
    id: 'zunyi',
    name: '遵义会议',
    date: '1935年1月',
    description: '1935年1月，遵义会议确立了毛泽东同志在党中央和红军的领导地位，挽救了党、挽救了红军、挽救了中国革命，是党的历史上一个生死攸关的转折点。',
    position: { x: -40, y: 0, z: -20 },
    audio: '../assets/audio/zunyi.mp3',
    image: 'https://p11-doubao-search-sign.byteimg.com/labis/de5ac629966f56ef4dcb2b8230bf442d~tplv-be4g95zd3a-image.jpeg?lk3s=feb11e32&x-expires=1791637144&x-signature=YzPTufuF9yaIPb7iRD40Ib%2BQh78%3D'
  },
  {
    id: 'chishui',
    name: '四渡赤水',
    date: '1935年1月-3月',
    description: '四渡赤水是毛泽东同志指挥中央红军进行的一次精彩的运动战，通过巧妙的战术机动，摆脱了国民党军队的围追堵截，取得了战略转移中具有决定意义的胜利。',
    position: { x: -30, y: 0, z: -10 },
    audio: '../assets/audio/chishui.mp3',
    image: 'https://p11-doubao-search-sign.byteimg.com/labis/060a617a93af8e982bc199ecc43de15b~tplv-be4g95zd3a-image.jpeg?lk3s=feb11e32&x-expires=1791637144&x-signature=jakbD%2BaNlY6nDdfAAKcWjPY727c%3D'
  },
  {
    id: 'jinsha',
    name: '巧渡金沙江',
    date: '1935年5月',
    description: '1935年5月，红军主力利用7只小船，在7天7夜间，全部渡过金沙江，摆脱了几十万国民党军的围追堵截，取得了战略转移中具有决定意义的胜利。',
    position: { x: 0, y: 0, z: 0 },
    audio: '../assets/audio/jinsha.mp3',
    image: 'https://p11-doubao-search-sign.byteimg.com/labis/5958a21e8cc5762c4ef49c7bcb0240b2~tplv-be4g95zd3a-image.jpeg?lk3s=feb11e32&x-expires=1791637144&x-signature=n6eM%2BUfewwjLSElvVfYsEEQF%2BQY%3D'
  },
  {
    id: 'dadu',
    name: '强渡大渡河',
    date: '1935年5月',
    description: '1935年5月，红军在安顺场强渡大渡河，十七勇士冒着敌人的枪林弹雨，乘坐一只小船，成功登上对岸，为后续部队渡河打开了通道。',
    position: { x: 20, y: 0, z: 10 },
    audio: '../assets/audio/dadu.mp3',
    image: 'https://p11-doubao-search-sign.byteimg.com/labis/5958a21e8cc5762c4ef49c7bcb0240b2~tplv-be4g95zd3a-image.jpeg?lk3s=feb11e32&x-expires=1791637144&x-signature=n6eM%2BUfewwjLSElvVfYsEEQF%2BQY%3D'
  },
  {
    id: 'luding',
    name: '飞夺泸定桥',
    date: '1935年5月',
    description: '1935年5月，红军战士在敌人拆去桥板的情况下，攀着铁索向对岸冲击，最终夺取了泸定桥，突破了敌人的最后一道封锁线。',
    position: { x: 30, y: 0, z: 20 },
    audio: '../assets/audio/luding.mp3',
    image: 'https://p11-doubao-search-sign.byteimg.com/mosaic-legacy/31d5000234902ae71574~tplv-be4g95zd3a-image.jpeg?lk3s=feb11e32&x-expires=1791637144&x-signature=S4KNxoc2yn0dZzjux0NQAjftMI4%3D'
  },
  {
    id: 'snowmountain',
    name: '翻雪山',
    date: '1935年6月-7月',
    description: '1935年6月至7月，红军战士们克服了高原缺氧、严寒等困难，成功翻越了夹金山、梦笔山等几座大雪山，展现了革命战士的钢铁意志。',
    position: { x: 50, y: 0, z: 40 },
    audio: '../assets/audio/snowmountain.mp3',
    image: 'https://p3-flow-imagex-sign.byteimg.com/tos-cn-i-a9rns2rl98/rc/pc/super_tool/cbfa1f6591f2447cac94c45a8781b879~tplv-a9rns2rl98-image.image?lk3s=8e244e95&rcl=202604132057078A798868029C4A520C54&rrcfp=f06b921b&x-expires=1778677170&x-signature=Gie5DbmvPI7KO%2FdX1QTS4Ryac1k%3D'
  },
  {
    id: 'grassland',
    name: '过草地',
    date: '1935年8月-9月',
    description: '1935年8月至9月，红军战士们在松潘草地中艰难跋涉，面对沼泽、饥饿、寒冷等困难，许多战士献出了宝贵的生命。',
    position: { x: 70, y: 0, z: 60 },
    audio: '../assets/audio/grassland.mp3',
    image: 'https://p3-flow-imagex-sign.byteimg.com/tos-cn-i-a9rns2rl98/rc/pc/super_tool/cbfa1f6591f2447cac94c45a8781b879~tplv-a9rns2rl98-image.image?lk3s=8e244e95&rcl=202604132057078A798868029C4A520C54&rrcfp=f06b921b&x-expires=1778677170&x-signature=Gie5DbmvPI7KO%2FdX1QTS4Ryac1k%3D'
  },
  {
    id: 'wuqi',
    name: '吴起镇会师',
    date: '1935年10月',
    description: '1935年10月，中央红军到达陕北吴起镇，与陕北红军胜利会师，标志着中央红军长征的胜利结束。',
    position: { x: 90, y: 0, z: 80 },
    audio: '../assets/audio/wuqi.mp3',
    image: 'https://p26-doubao-search-sign.byteimg.com/labis/351108db731f39a93b37f58f3fe29c6b~tplv-be4g95zd3a-image.jpeg?lk3s=feb11e32&x-expires=1791637144&x-signature=AZ3GR%2B3v4knxaP%2FmCM0%2Blt0FrBw%3D'
  }
];

// 当文档加载完成后初始化地图
document.addEventListener('DOMContentLoaded', function() {
  initMap();
  initEventListeners();
  loadBackgroundAudio();
});

/**
 * 初始化3D地图
 */
function initMap() {
  // 创建场景
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x1a1a2e);
  
  // 创建相机
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 50, 100);
  
  // 创建渲染器
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  document.getElementById('map-container').appendChild(renderer.domElement);
  
  // 添加轨道控制器
  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.minDistance = 30;
  controls.maxDistance = 200;
  controls.maxPolarAngle = Math.PI / 2 - 0.1;
  
  // 创建地形
  createTerrain();
  
  // 创建长征路线
  createPath();
  
  // 添加节点标记
  addNodes();
  
  // 添加光源
  addLights();
  
  // 添加天空盒
  addSkybox();
  
  // 开始动画循环
  animate();
  
  // 响应窗口大小变化
  window.addEventListener('resize', onWindowResize);
}

/**
 * 创建地形
 */
function createTerrain() {
  // 创建平面几何体作为地形基础
  const geometry = new THREE.PlaneGeometry(200, 200, 256, 256);
  
  // 创建材质
  const material = new THREE.MeshPhongMaterial({
    color: 0x8b4513,
    wireframe: false,
    flatShading: true,
    side: THREE.DoubleSide
  });
  
  // 创建地形网格
  terrain = new THREE.Mesh(geometry, material);
  terrain.rotation.x = -Math.PI / 2; // 水平放置
  terrain.position.y = -0.5;
  terrain.receiveShadow = true;
  
  // 为地形添加高度变化
  const vertices = geometry.attributes.position.array;
  for (let i = 0; i < vertices.length; i += 3) {
    const x = vertices[i];
    const z = vertices[i + 2];
    
    // 使用Perlin噪声算法创建山脉效果
    vertices[i + 1] = generateHeight(x, z);
  }
  
  // 更新地形几何体
  geometry.attributes.position.needsUpdate = true;
  geometry.computeFaceNormals();
  geometry.computeVertexNormals();
  
  // 添加地形到场景
  scene.add(terrain);
  
  // 添加地形纹理
  const textureLoader = new THREE.TextureLoader();
  const terrainTexture = textureLoader.load('https://p26-flow-imagex-sign.byteimg.com/tos-cn-i-a9rns2rl98/rc/pc/super_tool/ce2963be481b49d699ba3bef02af7fe1~tplv-a9rns2rl98-image.image?lk3s=8e244e95&rcl=202604132057078A798868029C4A520C54&rrcfp=f06b921b&x-expires=1778677173&x-signature=eIlstneuESqkbTCFtyUDpYTnwWc%3D');
  terrainTexture.wrapS = THREE.RepeatWrapping;
  terrainTexture.wrapT = THREE.RepeatWrapping;
  terrainTexture.repeat.set(5, 5);
  material.map = terrainTexture;
  material.needsUpdate = true;
}

/**
 * 生成地形高度
 * @param {number} x - X坐标
 * @param {number} z - Z坐标
 * @returns {number} 高度值
 */
function generateHeight(x, z) {
  // 基础高度
  let height = 0;
  
  // 主要山脉
  height += Math.sin(x * 0.05) * Math.sin(z * 0.05) * 10;
  
  // 次要山脉
  height += Math.sin(x * 0.1) * Math.sin(z * 0.1) * 5;
  
  // 局部细节
  height += Math.sin(x * 0.2) * Math.sin(z * 0.2) * 2;
  
  // 特殊地形 - 雪山区域
  if (x > 40 && x < 60 && z > 30 && z < 50) {
    height += 15;
  }
  
  // 特殊地形 - 草地区域
  if (x > 60 && x < 80 && z > 50 && z < 70) {
    height += Math.sin(x * 0.05) * Math.sin(z * 0.05) * 3;
  }
  
  return height;
}

/**
 * 创建长征路线
 */
function createPath() {
  // 创建路径几何体
  const pathGeometry = new THREE.BufferGeometry();
  const pathPoints = [];
  
  // 从节点数据中提取路径点
  nodesData.forEach(node => {
    pathPoints.push(new THREE.Vector3(node.position.x, node.position.y + 0.5, node.position.z));
  });
  
  pathGeometry.setFromPoints(pathPoints);
  
  // 创建路径材质
  const pathMaterial = new THREE.LineBasicMaterial({
    color: 0xff0000, // 红色路线
    linewidth: 3
  });
  
  // 创建路径线
  pathLine = new THREE.Line(pathGeometry, pathMaterial);
  scene.add(pathLine);
}

/**
 * 添加节点标记
 */
function addNodes() {
  const nodeMarkersContainer = document.getElementById('node-markers');
  
  nodesData.forEach(node => {
    // 创建3D节点标记
    const markerGeometry = new THREE.CylinderGeometry(0.5, 0, 2, 32);
    const markerMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const marker = new THREE.Mesh(markerGeometry, markerMaterial);
    
    marker.position.copy(node.position);
    marker.position.y = 1;
    marker.userData = { id: node.id, name: node.name };
    // 确保材质可修改
    marker.material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    
    scene.add(marker);
    
    // 创建HTML节点标记
    const htmlMarker = document.createElement('div');
    htmlMarker.className = 'node-marker';
    htmlMarker.dataset.nodeId = node.id;
    htmlMarker.style.left = '50%';
    htmlMarker.style.top = '50%';
    
    // 添加节点标签
    const label = document.createElement('div');
    label.className = 'node-label';
    label.textContent = node.name;
    htmlMarker.appendChild(label);
    
    // 添加点击事件
    htmlMarker.addEventListener('click', () => {
      selectNode(node.id);
    });
    
    nodeMarkersContainer.appendChild(htmlMarker);
    nodeMarkers.push({
      id: node.id,
      threeObject: marker,
      htmlElement: htmlMarker
    });
  });
  
  // 默认选中第一个节点
  selectNode(nodesData[0].id);
}

/**
 * 添加光源
 */
function addLights() {
  // 环境光
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);
  
  // 方向光（模拟太阳光）
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(50, 50, 50);
  directionalLight.castShadow = true;
  
  // 设置阴影属性
  directionalLight.shadow.mapSize.width = 2048;
  directionalLight.shadow.mapSize.height = 2048;
  directionalLight.shadow.camera.near = 0.5;
  directionalLight.shadow.camera.far = 200;
  directionalLight.shadow.camera.left = -100;
  directionalLight.shadow.camera.right = 100;
  directionalLight.shadow.camera.top = 100;
  directionalLight.shadow.camera.bottom = -100;
  
  scene.add(directionalLight);
  
  // 半球光（模拟天空光）
  const hemisphereLight = new THREE.HemisphereLight(0x0088ff, 0x004400, 0.3);
  scene.add(hemisphereLight);
}

/**
 * 添加天空盒
 */
function addSkybox() {
  const skyboxGeometry = new THREE.BoxGeometry(1000, 1000, 1000);
  const skyboxMaterial = new THREE.MeshBasicMaterial({
    color: 0x1a1a2e,
    side: THREE.BackSide
  });
  const skybox = new THREE.Mesh(skyboxGeometry, skyboxMaterial);
  scene.add(skybox);
}

/**
 * 动画循环
 */
function animate() {
  requestAnimationFrame(animate);
  
  // 更新控制器
  controls.update();
  
  // 更新节点标记位置
  updateNodeMarkers();
  
  // 渲染场景
  renderer.render(scene, camera);
}

/**
 * 更新HTML节点标记位置
 */
function updateNodeMarkers() {
  nodeMarkers.forEach(marker => {
    // 将3D位置转换为屏幕坐标
    const position = marker.threeObject.position.clone();
    position.project(camera);
    
    const x = (position.x * 0.5 + 0.5) * window.innerWidth;
    const y = (- position.y * 0.5 + 0.5) * window.innerHeight;
    
    // 更新HTML元素位置
    marker.htmlElement.style.left = `${x}px`;
    marker.htmlElement.style.top = `${y}px`;
    
    // 根据节点是否在相机前方来显示或隐藏
    if (position.z < 1) {
      marker.htmlElement.style.display = 'block';
    } else {
      marker.htmlElement.style.display = 'none';
    }
  });
}

/**
 * 窗口大小变化处理
 */
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

/**
 * 初始化事件监听器
 */
function initEventListeners() {
  // 地图控制按钮
  document.getElementById('zoom-in').addEventListener('click', () => {
    camera.position.multiplyScalar(0.8);
  });
  
  document.getElementById('zoom-out').addEventListener('click', () => {
    camera.position.multiplyScalar(1.2);
  });
  
  document.getElementById('reset-view').addEventListener('click', resetView);
  
  // 关闭节点信息面板
  document.getElementById('close-info').addEventListener('click', () => {
    document.getElementById('node-info').classList.remove('active');
  });
  
  // 下一站按钮功能
  document.getElementById('next-node').addEventListener('click', () => {
    goToNextNode();
  });
  
  // 详细了解链接更新
  document.getElementById('detail-link').addEventListener('click', (e) => {
    // 可以在这里添加额外的跟踪或日志记录
    console.log(`查看节点 ${currentNode} 的详细信息`);
  });
  
  // 音频控制按钮
  document.getElementById('audio-control').addEventListener('click', toggleAudio);
  
  // 射线检测（用于点击3D对象）
  renderer.domElement.addEventListener('click', onCanvasClick);
}

/**
 * 重置视图
 */
function resetView() {
  camera.position.set(0, 50, 100);
  camera.lookAt(0, 0, 0);
  controls.reset();
}

/**
 * 加载背景音乐
 */
function loadBackgroundAudio() {
  // 检查音频文件是否存在
  fetch('../assets/audio/background.mp3', { method: 'HEAD' })
    .then(response => {
      if (response.ok) {
        backgroundAudio = new Audio('../assets/audio/background.mp3');
        backgroundAudio.loop = true;
        backgroundAudio.volume = 0.5;
        console.log('背景音乐加载成功');
      } else {
        console.warn('背景音乐文件不存在，使用备用音频');
        // 使用备用音频（如果有）
        backgroundAudio = null;
      }
    })
    .catch(error => {
      console.warn('音频文件加载失败:', error);
      backgroundAudio = null;
    });
}

/**
 * 切换音频播放状态
 */
function toggleAudio() {
  const audioIndicator = document.getElementById('audio-control');
  const icon = audioIndicator.querySelector('i');
  
  if (!backgroundAudio) {
    console.warn('没有可用的音频文件');
    // 显示提示信息给用户
    alert('音频文件未找到，请检查网络连接或稍后再试');
    return;
  }
  
  if (isAudioPlaying) {
    backgroundAudio.pause();
    icon.classList.remove('fa-volume-up');
    icon.classList.add('fa-volume-mute');
    audioIndicator.classList.remove('playing');
  } else {
    backgroundAudio.play().catch(error => {
      console.error('音频播放失败:', error);
      alert('音频播放失败，请检查浏览器权限设置');
    });
    icon.classList.remove('fa-volume-mute');
    icon.classList.add('fa-volume-up');
    audioIndicator.classList.add('playing');
  }
  
  isAudioPlaying = !isAudioPlaying;
}

/**
 * 选择节点
 * @param {string} nodeId - 节点ID
 */
function selectNode(nodeId) {
  // 查找节点数据
  const node = nodesData.find(n => n.id === nodeId);
  if (!node) return;
  
  // 更新当前节点
  currentNode = nodeId;
  
  // 更新节点信息面板
  document.getElementById('node-title').textContent = node.name;
  document.getElementById('node-date').textContent = node.date;
  document.getElementById('node-description').textContent = node.description;
  
  // 更新详细了解链接
  const detailLink = document.getElementById('detail-link');
  if (detailLink) {
    detailLink.href = `../nodes/${node.id}.html`;
  }
  
  // 显示节点信息面板
  document.getElementById('node-info').classList.add('active');
  
  // 更新节点标记样式
  nodeMarkers.forEach(marker => {
    if (marker.id === nodeId) {
      marker.htmlElement.classList.add('active');
      // 高亮3D节点
      if (marker.threeObject) {
        marker.threeObject.material.color.set(0xd4af37); // 金色高亮
      }
    } else {
      marker.htmlElement.classList.remove('active');
      // 恢复3D节点颜色
      if (marker.threeObject) {
        marker.threeObject.material.color.set(0xff0000); // 恢复红色
      }
    }
  });
  
  // 移动相机到节点位置（从节点前方观察）
  const targetPosition = {
    x: node.position.x,
    y: 25, // 提高高度以获得更好的视角
    z: node.position.z + 40 // 增加距离避免相机穿透
  };
  
  // 先设置相机看向目标节点
  camera.lookAt(node.position.x, node.position.y, node.position.z);
  
  // 使用GSAP动画移动相机
  gsap.to(camera.position, {
    x: targetPosition.x,
    y: targetPosition.y,
    z: targetPosition.z,
    duration: 2, // 增加持续时间使动画更平滑
    ease: 'power2.inOut',
    onUpdate: () => {
      // 在动画过程中持续更新相机朝向
      camera.lookAt(node.position.x, node.position.y, node.position.z);
      controls.update();
    },
    onComplete: () => {
      // 动画完成后确保相机朝向正确
      camera.lookAt(node.position.x, node.position.y, node.position.z);
      controls.target.set(node.position.x, node.position.y, node.position.z);
      controls.update();
    }
  });
  
  // 播放节点音效（如果有）
  playNodeAudio(nodeId);
}

/**
 * 播放节点音效
 * @param {string} nodeId - 节点ID
 */
function playNodeAudio(nodeId) {
  // 这里可以根据节点ID播放对应的音效
  console.log(`播放节点 ${nodeId} 的音效`);
}

/**
 * 前往下一个节点
 */
function goToNextNode() {
  if (!currentNode) return;
  
  // 查找当前节点在数组中的索引
  const currentIndex = nodesData.findIndex(node => node.id === currentNode);
  if (currentIndex === -1) return;
  
  // 计算下一个节点的索引
  const nextIndex = (currentIndex + 1) % nodesData.length;
  const nextNode = nodesData[nextIndex];
  
  // 如果是最后一个节点，提示用户
  if (nextIndex === 0) {
    if (confirm('您已经到达长征的终点！是否重新开始长征之旅？')) {
      selectNode(nextNode.id);
    }
  } else {
    // 选择下一个节点
    selectNode(nextNode.id);
  }
}

/**
 * 画布点击事件处理
 * @param {Event} event - 点击事件
 */
function onCanvasClick(event) {
  // 计算鼠标位置
  const rect = renderer.domElement.getBoundingClientRect();
  const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  
  // 创建射线
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2(x, y);
  
  // 设置射线起点和方向
  raycaster.setFromCamera(mouse, camera);
  
  // 获取射线与场景中对象的交点
  const intersects = raycaster.intersectObjects(scene.children);
  
  // 检查是否点击了节点
  for (let i = 0; i < intersects.length; i++) {
    const object = intersects[i].object;
    if (object.userData && object.userData.id) {
      selectNode(object.userData.id);
      break;
    }
  }
}

/**
 * 根据模式调整3D效果
 * @param {string} mode - 模式名称
 */
function adjust3DEffectsForMode(mode) {
  if (mode === 'info') {
    // 信息模式：减少细节，提高性能
    if (terrain) {
      terrain.material.wireframe = true;
    }
    
    // 减少阴影质量
    if (scene.children) {
      scene.children.forEach(child => {
        if (child.isDirectionalLight) {
          child.shadow.mapSize.width = 512;
          child.shadow.mapSize.height = 512;
        }
      });
    }
  } else {
    // 沉浸模式：增加细节，提高视觉效果
    if (terrain) {
      terrain.material.wireframe = false;
    }
    
    // 提高阴影质量
    if (scene.children) {
      scene.children.forEach(child => {
        if (child.isDirectionalLight) {
          child.shadow.mapSize.width = 2048;
          child.shadow.mapSize.height = 2048;
        }
      });
    }
  }
}

// 覆盖全局的adjust3DEffectsForMode函数
window.adjust3DEffectsForMode = adjust3DEffectsForMode;