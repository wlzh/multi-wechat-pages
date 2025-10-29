// 返回顶部功能
document.addEventListener('DOMContentLoaded', function() {
    const backToTopButton = document.getElementById('backToTop');
    
    // 监听滚动事件
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });
    
    // 平滑滚动到顶部
    backToTopButton.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // 导航链接平滑滚动
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // 减去导航栏高度
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 滚动监听，添加动画效果
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // 观察所有方案卡片
    const solutionCards = document.querySelectorAll('.solution-card');
    solutionCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    // FAQ项目悬停效果
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(10px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });
    
    // 添加加载动画
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// 添加键盘导航支持
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + 数字键快速导航
    if (e.ctrlKey || e.metaKey) {
        switch(e.key) {
            case '1':
                e.preventDefault();
                scrollToSection('overview');
                break;
            case '2':
                e.preventDefault();
                scrollToSection('solutions');
                break;
            case '3':
                e.preventDefault();
                scrollToSection('comparison');
                break;
            case '4':
                e.preventDefault();
                scrollToSection('faq');
                break;
            case '5':
                e.preventDefault();
                scrollToSection('tips');
                break;
        }
    }
});

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 70;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// 添加复制代码功能
document.addEventListener('DOMContentLoaded', function() {
    const codeBlocks = document.querySelectorAll('.code-block');
    
    codeBlocks.forEach(block => {
        // 创建复制按钮
        const copyBtn = document.createElement('button');
        copyBtn.className = 'copy-btn';
        copyBtn.innerHTML = '<i class="fas fa-copy"></i>';
        copyBtn.title = '复制代码';
        
        block.style.position = 'relative';
        copyBtn.style.position = 'absolute';
        copyBtn.style.top = '10px';
        copyBtn.style.right = '10px';
        copyBtn.style.padding = '5px 10px';
        copyBtn.style.backgroundColor = '#4299e1';
        copyBtn.style.color = 'white';
        copyBtn.style.border = 'none';
        copyBtn.style.borderRadius = '5px';
        copyBtn.style.cursor = 'pointer';
        copyBtn.style.fontSize = '12px';
        copyBtn.style.opacity = '0.8';
        
        copyBtn.addEventListener('mouseenter', () => {
            copyBtn.style.opacity = '1';
        });
        
        copyBtn.addEventListener('mouseleave', () => {
            copyBtn.style.opacity = '0.8';
        });
        
        block.appendChild(copyBtn);
        
        // 复制功能
        copyBtn.addEventListener('click', function() {
            const code = block.querySelector('code').innerText;
            navigator.clipboard.writeText(code).then(() => {
                // 显示复制成功提示
                copyBtn.innerHTML = '<i class="fas fa-check"></i>';
                copyBtn.style.backgroundColor = '#28a745';
                
                setTimeout(() => {
                    copyBtn.innerHTML = '<i class="fas fa-copy"></i>';
                    copyBtn.style.backgroundColor = '#4299e1';
                }, 2000);
            }).catch(err => {
                console.error('复制失败:', err);
            });
        });
    });
});

// 添加暗色模式切换（可选功能）
function addDarkModeToggle() {
    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'dark-mode-toggle';
    toggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
    toggleBtn.title = '切换暗色模式';
    
    toggleBtn.style.position = 'fixed';
    toggleBtn.style.top = '30px';
    toggleBtn.style.left = '30px';
    toggleBtn.style.width = '50px';
    toggleBtn.style.height = '50px';
    toggleBtn.style.borderRadius = '50%';
    toggleBtn.style.border = 'none';
    toggleBtn.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
    toggleBtn.style.color = '#333';
    toggleBtn.style.cursor = 'pointer';
    toggleBtn.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
    toggleBtn.style.fontSize = '1.2em';
    toggleBtn.style.zIndex = '1001';
    
    toggleBtn.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        
        if (document.body.classList.contains('dark-mode')) {
            toggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
            toggleBtn.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
            toggleBtn.style.color = 'white';
        } else {
            toggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
            toggleBtn.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
            toggleBtn.style.color = '#333';
        }
    });
    
    document.body.appendChild(toggleBtn);
}

// 添加暗色模式样式
const darkModeCSS = `
.dark-mode {
    background: linear-gradient(135deg, #2d3748 0%, #4a5568 100%);
    color: #e2e8f0;
}

.dark-mode .header,
.dark-mode .navbar,
.dark-mode .solution-card,
.dark-mode .comparison-table,
.dark-mode .faq-container,
.dark-mode .tip-category,
.dark-mode .footer-section,
.dark-mode .overview-content,
.dark-mode .pros,
.dark-mode .cons,
.dark-mode .target-users,
.dark-mode .implementation,
.dark-mode .steps,
.dark-mode .tools,
.dark-mode .faq-item,
.dark-mode .update-log,
.dark-mode .disclaimer {
    background: #2d3748;
    color: #e2e8f0;
    border-color: #4a5568;
}

.dark-mode h3,
.dark-mode h4,
.dark-mode strong {
    color: #e2e8f0;
}

.dark-mode .platform-badge {
    background: #4a5568;
    color: #e2e8f0;
}

.dark-mode .copy-btn {
    background: #4a5568;
    color: #e2e8f0;
}

.dark-mode ::-webkit-scrollbar-thumb {
    background: linear-gradient(135deg, #4a5568, #718096);
}

.dark-mode .back-to-top {
    background: linear-gradient(135deg, #4a5568, #718096);
}`;

// 添加暗色模式样式到页面
const style = document.createElement('style');
style.textContent = darkModeCSS;
document.head.appendChild(style);

// 可以通过调用 addDarkModeToggle() 来启用暗色模式切换
// addDarkModeToggle();

// 添加打印样式
const printCSS = `
@media print {
    .navbar,
    .back-to-top,
    .dark-mode-toggle {
        display: none !important;
    }
    
    body {
        background: white !important;
        color: black !important;
    }
    
    .solution-card {
        break-inside: avoid;
        margin-bottom: 20px;
    }
    
    .comparison-table {
        overflow: visible !important;
    }
    
    h2:after {
        background: #007bff !important;
    }
}`;

const printStyle = document.createElement('style');
printStyle.textContent = printCSS;
document.head.appendChild(printStyle);

// 添加页面加载完成提示
window.addEventListener('load', function() {
    console.log('🎉 微信双开方案指南页面加载完成！');
    console.log('💡 提示：按 Ctrl/Cmd + 数字键 (1-5) 可以快速导航到不同章节');
    console.log('📋 您可以复制代码块中的命令，方便实际操作');
});
