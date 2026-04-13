/**
 * 长征纪念网站 - 数据可视化脚本
 * 负责实现"长征牺牲人数统计"页面的数据可视化功能
 */

// 全局变量
let casualtiesChart;
let weatherEffect;
let currentFilter = 'all';

// 长征牺牲人数数据
const casualtiesData = {
  labels: ['瑞金出发', '湘江战役', '四渡赤水', '巧渡金沙江', '强渡大渡河', '飞夺泸定桥', '翻雪山', '过草地', '吴起镇会师'],
  datasets: [
    {
      label: '战斗牺牲',
      data: [0, 25000, 3000, 1000, 2000, 800, 2000, 3000, 0],
      backgroundColor: 'rgba(220, 38, 38, 0.7)', // 中国红
      borderColor: 'rgba(220, 38, 38, 1)',
      borderWidth: 1
    },
    {
      label: '疾病牺牲',
      data: [0, 3000, 1000, 500, 500, 200, 1500, 4000, 0],
      backgroundColor: 'rgba(59, 130, 246, 0.7)', // 蓝色
      borderColor: 'rgba(59, 130, 246, 1)',
      borderWidth: 1
    },
    {
      label: '恶劣天气牺牲',
      data: [0, 2000, 1000, 500, 500, 0, 1500, 3000, 0],
      backgroundColor: 'rgba(212, 175, 55, 0.7)', // 岁月金
      borderColor: 'rgba(212, 175, 55, 1)',
      borderWidth: 1
    }
  ]
};

// 当文档加载完成后初始化数据可视化
document.addEventListener('DOMContentLoaded', function() {
  initChart();
  initWeatherEffect();
  initFilterControls();
  initDataCardsAnimation();
});

/**
 * 初始化图表
 */
function initChart() {
  const ctx = document.getElementById('casualties-chart').getContext('2d');
  
  casualtiesChart = new Chart(ctx, {
    type: 'bar',
    data: casualtiesData,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: '人数',
            color: '#ffffff'
          },
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
          },
          ticks: {
            color: '#e5e7eb'
          }
        },
        x: {
          title: {
            display: true,
            text: '长征节点',
            color: '#ffffff'
          },
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
          },
          ticks: {
            color: '#e5e7eb'
          }
        }
      },
      plugins: {
        title: {
          display: true,
          text: '长征各阶段牺牲人数统计',
          font: {
            size: 18
          },
          color: '#ffffff'
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return `${context.dataset.label}: ${context.raw.toLocaleString()} 人`;
            },
            afterBody: function(tooltipItems) {
              const datasetIndex = tooltipItems[0].datasetIndex;
              const index = tooltipItems[0].dataIndex;
              let total = 0;
              
              // 计算当前节点的总牺牲人数
              casualtiesData.datasets.forEach(dataset => {
                total += dataset.data[index];
              });
              
              return `总计: ${total.toLocaleString()} 人`;
            }
          }
        },
        legend: {
          labels: {
            color: '#e5e7eb'
          }
        }
      },
      animation: {
        duration: 2000,
        easing: 'easeOutQuart'
      }
    }
  });
}

/**
 * 初始化天气效果
 */
function initWeatherEffect() {
  const canvas = document.getElementById('weather-overlay');
  const ctx = canvas.getContext('2d');
  
  // 设置画布尺寸
  function resizeCanvas() {
    const container = document.getElementById('data-viz-container');
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;
  }
  
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  
  // 创建粒子
  const particles = [];
  const particleCount = 200;
  
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 5 + 1,
      speedX: Math.random() * 3 - 1.5,
      speedY: Math.random() * 2 + 1,
      opacity: Math.random() * 0.8 + 0.2
    });
  }
  
  // 动画循环
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    particles.forEach(particle => {
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
      ctx.fill();
      
      // 更新位置
      particle.x += particle.speedX;
      particle.y += particle.speedY;
      
      // 重置粒子
      if (particle.y > canvas.height) {
        particle.y = 0;
        particle.x = Math.random() * canvas.width;
        particle.opacity = Math.random() * 0.8 + 0.2;
      }
      
      if (particle.x < 0 || particle.x > canvas.width) {
        particle.speedX = -particle.speedX;
      }
    });
    
    requestAnimationFrame(animate);
  }
  
  animate();
  
  // 添加鼠标交互
  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    particles.forEach(particle => {
      const dx = mouseX - particle.x;
      const dy = mouseY - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 50) {
        // 粒子被鼠标推开
        const force = (50 - distance) / 50;
        particle.x -= dx * force * 0.2;
        particle.y -= dy * force * 0.2;
        
        // 临时增加粒子大小和不透明度
        const originalSize = particle.size;
        const originalOpacity = particle.opacity;
        
        particle.size *= 1.5;
        particle.opacity = 1;
        
        // 恢复原始大小和不透明度
        setTimeout(() => {
          particle.size = originalSize;
          particle.opacity = originalOpacity;
        }, 300);
      }
    });
  });
  
  // 激活天气效果覆盖层
  canvas.classList.add('active');
  
  // 存储天气效果对象
  weatherEffect = {
    canvas,
    ctx,
    particles,
    changeType: function(type) {
      switch (type) {
        case 'snow':
          // 雪花效果
          particles.forEach(particle => {
            particle.speedX = Math.random() * 2 - 1;
            particle.speedY = Math.random() * 1 + 0.5;
            particle.size = Math.random() * 4 + 1;
            particle.opacity = Math.random() * 0.8 + 0.2;
          });
          break;
          
        case 'rain':
          // 雨滴效果
          particles.forEach(particle => {
            particle.speedX = Math.random() * 1 - 0.5;
            particle.speedY = Math.random() * 5 + 5;
            particle.size = Math.random() * 2 + 0.5;
            particle.opacity = Math.random() * 0.5 + 0.3;
          });
          break;
          
        case 'sand':
          // 风沙效果
          particles.forEach(particle => {
            particle.speedX = Math.random() * 4 + 2;
            particle.speedY = Math.random() * 2 - 1;
            particle.size = Math.random() * 6 + 2;
            particle.opacity = Math.random() * 0.6 + 0.2;
            ctx.fillStyle = `rgba(212, 175, 55, ${particle.opacity})`;
          });
          break;
          
        default:
          // 默认雪花效果
          particles.forEach(particle => {
            particle.speedX = Math.random() * 3 - 1.5;
            particle.speedY = Math.random() * 2 + 1;
            particle.size = Math.random() * 5 + 1;
            particle.opacity = Math.random() * 0.8 + 0.2;
          });
      }
    }
  };
}

/**
 * 初始化过滤控制
 */
function initFilterControls() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // 移除所有按钮的active类
      filterButtons.forEach(btn => btn.classList.remove('active'));
      
      // 添加当前按钮的active类
      button.classList.add('active');
      
      // 获取过滤类型
      currentFilter = button.getAttribute('data-filter');
      
      // 应用过滤
      applyFilter(currentFilter);
      
      // 更改天气效果类型
      changeWeatherEffectByFilter(currentFilter);
    });
  });
}

/**
 * 应用过滤
 * @param {string} filter - 过滤类型
 */
function applyFilter(filter) {
  if (!casualtiesChart) return;
  
  switch (filter) {
    case 'all':
      // 显示所有数据集
      casualtiesChart.data.datasets.forEach((dataset, index) => {
        casualtiesChart.setDatasetVisibility(index, true);
      });
      break;
      
    case 'battle':
      // 只显示战斗牺牲
      casualtiesChart.setDatasetVisibility(0, true);
      casualtiesChart.setDatasetVisibility(1, false);
      casualtiesChart.setDatasetVisibility(2, false);
      break;
      
    case 'disease':
      // 只显示疾病牺牲
      casualtiesChart.setDatasetVisibility(0, false);
      casualtiesChart.setDatasetVisibility(1, true);
      casualtiesChart.setDatasetVisibility(2, false);
      break;
      
    case 'weather':
      // 只显示恶劣天气牺牲
      casualtiesChart.setDatasetVisibility(0, false);
      casualtiesChart.setDatasetVisibility(1, false);
      casualtiesChart.setDatasetVisibility(2, true);
      break;
  }
  
  // 更新图表
  casualtiesChart.update();
}

/**
 * 根据过滤类型更改天气效果
 * @param {string} filter - 过滤类型
 */
function changeWeatherEffectByFilter(filter) {
  if (!weatherEffect) return;
  
  switch (filter) {
    case 'all':
      weatherEffect.changeType('snow');
      break;
      
    case 'battle':
      weatherEffect.changeType('rain');
      break;
      
    case 'disease':
      weatherEffect.changeType('snow');
      break;
      
    case 'weather':
      weatherEffect.changeType('sand');
      break;
  }
}

/**
 * 初始化数据卡片动画
 */
function initDataCardsAnimation() {
  const dataCards = document.querySelectorAll('.data-card');
  
  dataCards.forEach(card => {
    const delay = card.getAttribute('data-delay') || 0;
    
    gsap.to(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 80%'
      },
      opacity: 1,
      y: 0,
      duration: 0.8,
      delay: delay * 0.1,
      onComplete: () => {
        card.classList.add('visible');
      }
    });
  });
}

/**
 * 根据模式调整数据可视化效果
 * @param {string} mode - 模式名称
 */
function adjustDataVizForMode(mode) {
  if (mode === 'info') {
    // 信息模式：减少粒子数量，降低特效强度
    if (weatherEffect && weatherEffect.particles) {
      const particles = weatherEffect.particles;
      const originalLength = particles.length;
      
      // 减少粒子数量
      if (particles.length > 50) {
        particles.splice(50);
      }
      
      // 降低粒子不透明度
      particles.forEach(particle => {
        particle.opacity *= 0.5;
      });
    }
  } else {
    // 沉浸模式：恢复粒子效果
    if (weatherEffect && weatherEffect.particles) {
      const particles = weatherEffect.particles;
      
      // 恢复粒子数量
      if (particles.length < 200) {
        const canvas = weatherEffect.canvas;
        for (let i = particles.length; i < 200; i++) {
          particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 5 + 1,
            speedX: Math.random() * 3 - 1.5,
            speedY: Math.random() * 2 + 1,
            opacity: Math.random() * 0.8 + 0.2
          });
        }
      }
      
      // 恢复粒子不透明度
      particles.forEach(particle => {
        particle.opacity = Math.random() * 0.8 + 0.2;
      });
    }
  }
}

// 覆盖全局的adjustDataVizForMode函数
window.adjustDataVizForMode = adjustDataVizForMode;

// 监听模式切换事件
window.addEventListener('modeChange', function(e) {
  const mode = e.detail.mode;
  adjustDataVizForMode(mode);
});