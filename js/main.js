/**
 * 长征纪念网站 - 主脚本文件
 * 负责页面初始化、导航交互等核心功能
 */

document.addEventListener('DOMContentLoaded', function() {
  // 初始化导航栏滚动效果
  initNavbarScroll();
  
  // 初始化移动端菜单
  initMobileMenu();
  
  // 初始化页面元素动画
  initElementAnimations();
  
  // 初始化平滑滚动
  initSmoothScroll();
});

/**
 * 导航栏滚动效果
 */
function initNavbarScroll() {
  const navbar = document.getElementById('main-nav');
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

/**
 * 移动端菜单交互
 */
function initMobileMenu() {
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  
  menuToggle.addEventListener('click', function() {
    mobileMenu.classList.toggle('hidden');
    
    // 切换图标
    const icon = menuToggle.querySelector('i');
    if (mobileMenu.classList.contains('hidden')) {
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    } else {
      icon.classList.remove('fa-bars');
      icon.classList.add('fa-times');
    }
  });
  
  // 点击菜单项后关闭菜单
  const mobileMenuItems = mobileMenu.querySelectorAll('a');
  mobileMenuItems.forEach(item => {
    item.addEventListener('click', function() {
      mobileMenu.classList.add('hidden');
      const icon = menuToggle.querySelector('i');
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    });
  });
}

/**
 * 页面元素动画
 */
function initElementAnimations() {
  // 首屏元素动画
  gsap.to('#hero-title', {
    opacity: 1,
    y: 0,
    duration: 1,
    delay: 0.5
  });
  
  gsap.to('#hero-subtitle', {
    opacity: 1,
    y: 0,
    duration: 1,
    delay: 0.8
  });
  
  gsap.to('#hero-buttons', {
    opacity: 1,
    y: 0,
    duration: 1,
    delay: 1.1
  });
  
  // 数据展示区动画
  const dataCards = document.querySelectorAll('#data-section [data-delay]');
  dataCards.forEach(card => {
    const delay = card.getAttribute('data-delay');
    gsap.to(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 80%'
      },
      opacity: 1,
      y: 0,
      duration: 0.8,
      delay: delay * 0.2
    });
  });
  
  // 节点卡片动画
  const nodeCards = document.querySelectorAll('#nodes-title ~ div [data-delay]');
  nodeCards.forEach(card => {
    const delay = card.getAttribute('data-delay');
    gsap.to(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 80%'
      },
      opacity: 1,
      y: 0,
      duration: 0.8,
      delay: delay * 0.2
    });
  });
  
  // 长征精神区动画
  gsap.to('#spirit-title', {
    scrollTrigger: {
      trigger: '#spirit-title',
      start: 'top 80%'
    },
    opacity: 1,
    y: 0,
    duration: 1
  });
  
  gsap.to('#spirit-image', {
    scrollTrigger: {
      trigger: '#spirit-image',
      start: 'top 80%'
    },
    opacity: 1,
    x: 0,
    duration: 1,
    delay: 0.3
  });
  
  gsap.to('#spirit-content', {
    scrollTrigger: {
      trigger: '#spirit-content',
      start: 'top 80%'
    },
    opacity: 1,
    x: 0,
    duration: 1,
    delay: 0.6
  });
  
  // 查看全部节点按钮动画
  gsap.to('#view-all-nodes', {
    scrollTrigger: {
      trigger: '#view-all-nodes',
      start: 'top 80%'
    },
    opacity: 1,
    y: 0,
    duration: 0.8
  });
}

/**
 * 平滑滚动
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80, // 考虑导航栏高度
          behavior: 'smooth'
        });
      }
    });
  });
}

/**
 * 时光滤镜动画
 * @param {Function} callback - 动画结束后的回调函数
 */
function showTimeFilterAnimation(callback) {
  // 创建时间滤镜元素
  const timeFilter = document.createElement('div');
  timeFilter.className = 'time-filter';
  timeFilter.innerHTML = '<div class="countdown">3</div>';
  document.body.appendChild(timeFilter);
  
  // 显示时间滤镜
  setTimeout(() => {
    timeFilter.classList.add('active');
    
    // 倒计时动画
    setTimeout(() => {
      timeFilter.querySelector('.countdown').textContent = '2';
      setTimeout(() => {
        timeFilter.querySelector('.countdown').textContent = '1';
        setTimeout(() => {
          timeFilter.querySelector('.countdown').textContent = '0';
          setTimeout(() => {
            // 隐藏时间滤镜
            timeFilter.classList.remove('active');
            setTimeout(() => {
              document.body.removeChild(timeFilter);
              if (callback && typeof callback === 'function') {
                callback();
              }
            }, 500);
          }, 1000);
        }, 1000);
      }, 1000);
    }, 1000);
  }, 100);
}

/**
 * 播放音频
 * @param {string} src - 音频文件路径
 * @returns {HTMLAudioElement} - 音频元素
 */
function playAudio(src) {
  const audio = new Audio(src);
  audio.play().catch(error => {
    console.error('音频播放失败:', error);
  });
  return audio;
}

/**
 * 停止音频
 * @param {HTMLAudioElement} audio - 音频元素
 */
function stopAudio(audio) {
  if (audio) {
    audio.pause();
    audio.currentTime = 0;
  }
}

/**
 * 加载图像资源
 * @param {string} src - 图像路径
 * @returns {Promise} - 加载完成的Promise
 */
function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

/**
 * 加载音频资源
 * @param {string} src - 音频路径
 * @returns {Promise} - 加载完成的Promise
 */
function loadAudio(src) {
  return new Promise((resolve, reject) => {
    const audio = new Audio();
    audio.oncanplaythrough = () => resolve(audio);
    audio.onerror = reject;
    audio.src = src;
  });
}