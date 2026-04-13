/**
 * 长征纪念网站 - 模式切换脚本
 * 负责实现信息型和沉浸型两种浏览模式的切换
 */

document.addEventListener('DOMContentLoaded', function() {
  // 初始化模式切换
  initModeSwitch();
});

/**
 * 初始化模式切换功能
 */
function initModeSwitch() {
  const modeToggle = document.getElementById('mode-toggle');
  const body = document.body;
  
  // 检查本地存储中的模式设置
  const savedMode = localStorage.getItem('viewMode') || 'immersive';
  setMode(savedMode);
  
  // 如果存在模式切换按钮，则添加点击事件
  if (modeToggle) {
    modeToggle.addEventListener('click', function() {
      const currentMode = body.classList.contains('info-mode') ? 'info' : 'immersive';
      const newMode = currentMode === 'info' ? 'immersive' : 'info';
      
      setMode(newMode);
      localStorage.setItem('viewMode', newMode);
    });
  }
}

/**
 * 设置浏览模式
 * @param {string} mode - 模式名称：'info'（信息型）或 'immersive'（沉浸型）
 */
function setMode(mode) {
  const body = document.body;
  const modeToggle = document.getElementById('mode-toggle');
  
  if (mode === 'info') {
    // 设置为信息模式
    body.classList.add('info-mode');
    body.classList.remove('immersive-mode');
    
    // 更新按钮图标
    if (modeToggle) {
      const icon = modeToggle.querySelector('i');
      if (icon) {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
      }
      modeToggle.title = '切换到沉浸模式';
    }
  } else {
    // 设置为沉浸模式
    body.classList.add('immersive-mode');
    body.classList.remove('info-mode');
    
    // 更新按钮图标
    if (modeToggle) {
      const icon = modeToggle.querySelector('i');
      if (icon) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
      }
      modeToggle.title = '切换到信息模式';
    }
  }
  
  // 触发模式切换事件
  const event = new CustomEvent('modeChange', { detail: { mode } });
  window.dispatchEvent(event);
}

/**
 * 监听模式切换事件
 * 当模式切换时，可以在其他脚本中监听此事件并执行相应操作
 */
window.addEventListener('modeChange', function(e) {
  const mode = e.detail.mode;
  
  // 根据模式调整UI元素
  adjustUIForMode(mode);
  
  // 根据模式调整粒子特效
  adjustParticlesForMode(mode);
  
  // 根据模式调整3D效果
  adjust3DEffectsForMode(mode);
});

/**
 * 根据模式调整UI元素
 * @param {string} mode - 模式名称
 */
function adjustUIForMode(mode) {
  const sidebar = document.getElementById('sidebar');
  const mainContent = document.getElementById('main-content');
  const particlesBg = document.getElementById('particles-bg');
  
  if (mode === 'info') {
    // 信息模式：简洁布局，清晰排版
    if (sidebar) {
      sidebar.classList.add('expanded');
    }
    
    if (mainContent) {
      mainContent.classList.add('narrow');
    }
    
    if (particlesBg) {
      particlesBg.classList.add('disabled');
    }
  } else {
    // 沉浸模式：全屏交互，强调视效
    if (sidebar) {
      sidebar.classList.remove('expanded');
    }
    
    if (mainContent) {
      mainContent.classList.remove('narrow');
    }
    
    if (particlesBg) {
      particlesBg.classList.remove('disabled');
    }
  }
}

/**
 * 根据模式调整粒子特效
 * @param {string} mode - 模式名称
 */
function adjustParticlesForMode(mode) {
  const particlesBg = document.getElementById('particles-bg');
  
  if (mode === 'info') {
    // 信息模式：减少粒子数量，降低特效强度
    if (window.pJSDom && window.pJSDom.length) {
      const pJS = window.pJSDom[0].pJS;
      pJS.particles.number.value = 50; // 减少粒子数量
      pJS.particles.opacity.value = 0.3; // 降低透明度
      pJS.fn.particlesRefresh(); // 刷新粒子
    }
  } else {
    // 沉浸模式：增加粒子数量，增强特效强度
    if (window.pJSDom && window.pJSDom.length) {
      const pJS = window.pJSDom[0].pJS;
      pJS.particles.number.value = 100; // 恢复粒子数量
      pJS.particles.opacity.value = 0.5; // 恢复透明度
      pJS.fn.particlesRefresh(); // 刷新粒子
    }
  }
}

/**
 * 根据模式调整3D效果
 * @param {string} mode - 模式名称
 */
function adjust3DEffectsForMode(mode) {
  // 此函数可以在3D相关脚本中被覆盖，以实现特定的3D效果调整
  console.log(`调整3D效果以适应${mode}模式`);
}

/**
 * 获取当前模式
 * @returns {string} 当前模式：'info' 或 'immersive'
 */
function getCurrentMode() {
  const body = document.body;
  return body.classList.contains('info-mode') ? 'info' : 'immersive';
}

/**
 * 切换到信息模式
 */
function switchToInfoMode() {
  setMode('info');
  localStorage.setItem('viewMode', 'info');
}

/**
 * 切换到沉浸模式
 */
function switchToImmersiveMode() {
  setMode('immersive');
  localStorage.setItem('viewMode', 'immersive');
}