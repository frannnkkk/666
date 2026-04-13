/**
 * 长征纪念网站 - 粒子特效脚本
 * 负责实现首屏的粒子特效背景，模拟风雪、风沙等效果
 */

document.addEventListener('DOMContentLoaded', function() {
  // 初始化粒子特效
  initParticles();
});

/**
 * 初始化粒子特效
 */
function initParticles() {
  // 检查是否存在粒子容器
  const particlesContainer = document.getElementById('particles-bg');
  if (!particlesContainer) return;
  
  // 检查 particlesJS 是否加载成功
  if (typeof window.particlesJS === 'undefined') {
    console.warn('粒子特效库加载失败，使用备用方案');
    createFallbackParticles();
    return;
  }
  
  // 配置粒子特效
  particlesJS('particles-bg', {
    particles: {
      number: {
        value: 100,
        density: {
          enable: true,
          value_area: 800
        }
      },
      color: {
        value: "#ffffff"
      },
      shape: {
        type: "circle",
        stroke: {
          width: 0,
          color: "#000000"
        },
        polygon: {
          nb_sides: 5
        }
      },
      opacity: {
        value: 0.5,
        random: true,
        anim: {
          enable: true,
          speed: 1,
          opacity_min: 0.1,
          sync: false
        }
      },
      size: {
        value: 3,
        random: true,
        anim: {
          enable: true,
          speed: 2,
          size_min: 0.1,
          sync: false
        }
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: "#ffffff",
        opacity: 0.2,
        width: 1
      },
      move: {
        enable: true,
        speed: 2,
        direction: "bottom",
        random: true,
        straight: false,
        out_mode: "out",
        bounce: false,
        attract: {
          enable: false,
          rotateX: 600,
          rotateY: 1200
        }
      }
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: {
          enable: true,
          mode: "grab"
        },
        onclick: {
          enable: true,
          mode: "push"
        },
        resize: true
      },
      modes: {
        grab: {
          distance: 140,
          line_linked: {
            opacity: 0.5
          }
        },
        bubble: {
          distance: 400,
          size: 40,
          duration: 2,
          opacity: 8,
          speed: 3
        },
        repulse: {
          distance: 200,
          duration: 0.4
        },
        push: {
          particles_nb: 4
        },
        remove: {
          particles_nb: 2
        }
      }
    },
    retina_detect: true
  });
}

/**
 * 切换粒子特效类型
 * @param {string} type - 特效类型：'snow'（雪）, 'sand'（沙）, 'rain'（雨）
 */
function changeParticleEffect(type) {
  const particlesJS = window.particlesJS;
  if (!particlesJS) return;
  
  // 销毁当前粒子实例
  if (window.pJSDom && window.pJSDom.length) {
    window.pJSDom[0].pJS.fn.vendors.destroypJS();
  }
  
  // 根据类型配置不同的粒子效果
  let config;
  
  switch (type) {
    case 'snow':
      config = {
        particles: {
          number: {
            value: 100,
            density: {
              enable: true,
              value_area: 800
            }
          },
          color: {
            value: "#ffffff"
          },
          shape: {
            type: "circle"
          },
          opacity: {
            value: 0.8,
            random: true
          },
          size: {
            value: 5,
            random: true
          },
          line_linked: {
            enable: false
          },
          move: {
            enable: true,
            speed: 1,
            direction: "bottom",
            random: true,
            straight: false,
            out_mode: "out",
            bounce: false
          }
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: {
              enable: true,
              mode: "grab"
            },
            onclick: {
              enable: true,
              mode: "push"
            }
          },
          modes: {
            grab: {
              distance: 140,
              line_linked: {
                opacity: 0.5
              }
            },
            push: {
              particles_nb: 4
            }
          }
        },
        retina_detect: true
      };
      break;
      
    case 'sand':
      config = {
        particles: {
          number: {
            value: 150,
            density: {
              enable: true,
              value_area: 800
            }
          },
          color: {
            value: "#d4af37" // 岁月金
          },
          shape: {
            type: "circle"
          },
          opacity: {
            value: 0.6,
            random: true
          },
          size: {
            value: 4,
            random: true
          },
          line_linked: {
            enable: false
          },
          move: {
            enable: true,
            speed: 3,
            direction: "right",
            random: true,
            straight: false,
            out_mode: "out",
            bounce: false
          }
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: {
              enable: true,
              mode: "grab"
            },
            onclick: {
              enable: true,
              mode: "push"
            }
          },
          modes: {
            grab: {
              distance: 140,
              line_linked: {
                opacity: 0.5
              }
            },
            push: {
              particles_nb: 4
            }
          }
        },
        retina_detect: true
      };
      break;
      
    case 'rain':
      config = {
        particles: {
          number: {
            value: 200,
            density: {
              enable: true,
              value_area: 800
            }
          },
          color: {
            value: "#4fc3f7" // 浅蓝色
          },
          shape: {
            type: "line"
          },
          opacity: {
            value: 0.5,
            random: true
          },
          size: {
            value: 3,
            random: true,
            anim: {
              enable: true,
              speed: 2,
              size_min: 0.1,
              sync: false
            }
          },
          line_linked: {
            enable: false
          },
          move: {
            enable: true,
            speed: 10,
            direction: "bottom",
            random: false,
            straight: true,
            out_mode: "out",
            bounce: false
          }
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: {
              enable: true,
              mode: "grab"
            },
            onclick: {
              enable: true,
              mode: "push"
            }
          },
          modes: {
            grab: {
              distance: 140,
              line_linked: {
                opacity: 0.5
              }
            },
            push: {
              particles_nb: 4
            }
          }
        },
        retina_detect: true
      };
      break;
      
    default:
      // 默认配置（雪花效果）
      config = {
        particles: {
          number: {
            value: 100,
            density: {
              enable: true,
              value_area: 800
            }
          },
          color: {
            value: "#ffffff"
          },
          shape: {
            type: "circle"
          },
          opacity: {
            value: 0.5,
            random: true
          },
          size: {
            value: 3,
            random: true
          },
          line_linked: {
            enable: true,
            distance: 150,
            color: "#ffffff",
            opacity: 0.2,
            width: 1
          },
          move: {
            enable: true,
            speed: 2,
            direction: "bottom",
            random: true,
            straight: false,
            out_mode: "out",
            bounce: false
          }
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: {
              enable: true,
              mode: "grab"
            },
            onclick: {
              enable: true,
              mode: "push"
            }
          },
          modes: {
            grab: {
              distance: 140,
              line_linked: {
                opacity: 0.5
              }
            },
            push: {
              particles_nb: 4
            }
          }
        },
        retina_detect: true
      };
  }
  
  // 重新初始化粒子特效
  if (typeof window.particlesJS !== 'undefined') {
    particlesJS('particles-bg', config);
  } else {
    console.warn('粒子特效库加载失败，无法切换效果');
  }
}

/**
 * 创建备用粒子效果
 */
function createFallbackParticles() {
  const container = document.getElementById('particles-bg');
  if (!container) return;
  
  // 清空容器
  container.innerHTML = '';
  
  // 创建 canvas 元素
  const canvas = document.createElement('canvas');
  canvas.width = container.offsetWidth;
  canvas.height = container.offsetHeight;
  container.appendChild(canvas);
  
  const ctx = canvas.getContext('2d');
  const particles = [];
  const particleCount = 50;
  
  // 创建粒子
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2 + 1,
      color: 'rgba(255, 255, 255, 0.5)',
      speedX: Math.random() * 0.5 - 0.25,
      speedY: Math.random() * 0.5 + 0.25
    });
  }
  
  // 动画循环
  function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(particle => {
      // 更新位置
      particle.x += particle.speedX;
      particle.y += particle.speedY;
      
      // 边界检查
      if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
      if (particle.y > canvas.height) particle.y = 0;
      
      // 绘制粒子
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      ctx.fillStyle = particle.color;
      ctx.fill();
    });
  }
  
  animate();
  
  // 响应窗口大小变化
  window.addEventListener('resize', () => {
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;
  });
}

/**
 * 根据长征节点切换相应的粒子效果
 * @param {string} node - 节点名称
 */
function setParticleEffectByNode(node) {
  switch (node.toLowerCase()) {
    case 'ruijin': // 瑞金
      changeParticleEffect('rain');
      break;
    case 'zunyi': // 遵义
      changeParticleEffect('rain');
      break;
    case 'chishui': // 赤水
      changeParticleEffect('rain');
      break;
    case 'jinsha': // 金沙江
      changeParticleEffect('rain');
      break;
    case 'dadu': // 大渡河
      changeParticleEffect('rain');
      break;
    case 'luding': // 泸定桥
      changeParticleEffect('rain');
      break;
    case 'snowmountain': // 雪山
      changeParticleEffect('snow');
      break;
    case 'grassland': // 草地
      changeParticleEffect('rain');
      break;
    case 'wuqi': // 吴起镇
      changeParticleEffect('sand');
      break;
    default:
      changeParticleEffect('snow');
  }
}