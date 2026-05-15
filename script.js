
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    const navLinks = document.querySelectorAll('.nav-links a');
    const indicator = document.querySelector('.nav-indicator');
    const downloadBtn = document.getElementById('downloadCV');
    const revealElements = document.querySelectorAll('.reveal, .reveal-card');
    const backToTopBtn = document.querySelector('.back-to-top');
    const scrollProgress = document.querySelector('.scroll-progress');
    const skillBars = document.querySelectorAll('.skill-bar-fill');
    const projectCount = document.getElementById('projectCount');
    const skillCount = document.getElementById('skillCount');
    const typedElement = document.getElementById('typed');
    const particlesContainer = document.getElementById('particles');

    // Typing animation text
    const typedStrings = [
        'AI & Data Science Student',
        'Problem Solver',
        'Tech Enthusiast',
        'Future Innovator'
    ];

    // Theme Toggle
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark');
        themeToggle.textContent = '☀️';
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark');
        
        if (body.classList.contains('dark')) {
            themeToggle.textContent = '☀️';
            localStorage.setItem('theme', 'dark');
        } else {
            themeToggle.textContent = '🌙';
            localStorage.setItem('theme', 'light');
        }
        
        // Add click effect
        themeToggle.style.transform = 'rotate(360deg) scale(1.2)';
        setTimeout(() => {
            themeToggle.style.transform = '';
        }, 300);
    });

    // Smooth scrolling for navbar links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            targetSection.scrollIntoView({
                behavior: 'smooth'
            });
            
            // Update active link
            navLinks.forEach(link => link.classList.remove('active'));
            this.classList.add('active');
            
            // Move indicator
            moveIndicator(this);
        });
    });

    // Move navbar indicator
    function moveIndicator(element) {
        const rect = element.getBoundingClientRect();
        const parentRect = element.closest('.navbar').getBoundingClientRect();
        
        indicator.style.width = rect.width + 'px';
        indicator.style.left = (rect.left - parentRect.left) + 'px';
    }

    // Set initial indicator position
    window.addEventListener('load', () => {
        const active = document.querySelector('.nav-links a.active') || navLinks[0];
        moveIndicator(active);
        
        // Initialize counters
        startCounters();
        
        // Initialize skill bars
        setTimeout(() => {
            animateSkillBars();
        }, 500);
        
        // Initialize typing animation
        startTypingAnimation();
        
        // Initialize particles
        createParticles();
    });

    // Update active link on scroll
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - sectionHeight / 3) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
                moveIndicator(link);
            }
        });
        
        // Scroll progress
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        scrollProgress.style.width = scrolled + '%';
        
        // Back to top button
        if (window.pageYOffset > 500) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
        
        // Reveal animations
        revealOnScroll();
    });

    // Download CV
    downloadBtn.addEventListener('click', () => {
        // Create a simulated download experience
        downloadBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Downloading...';
        downloadBtn.disabled = true;
        
        setTimeout(() => {
            window.open('files/Dharshni_CV.pdf', '_blank');
            downloadBtn.innerHTML = '<i class="fas fa-download"></i> Download CV';
            downloadBtn.disabled = false;
            
            // Show success message
            showNotification('CV downloaded successfully!');
        }, 1500);
    });

    // Back to top
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Reveal animations on scroll
    function revealOnScroll() {
        const windowHeight = window.innerHeight;
        
        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - 120) {
                el.classList.add('show');
            }
        });
    }

    // Initialize counters
    function startCounters() {
        let projectCounter = 0;
        let skillCounter = 0;
        
        const projectInterval = setInterval(() => {
            projectCounter += 1;
            projectCount.textContent = projectCounter;
            
            if (projectCounter >= 8) {
                clearInterval(projectInterval);
            }
        }, 100);
        
        const skillInterval = setInterval(() => {
            skillCounter += 1;
            skillCount.textContent = skillCounter;
            
            if (skillCounter >= 12) {
                clearInterval(skillInterval);
            }
        }, 80);
    }

    // Animate skill bars
    function animateSkillBars() {
        skillBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            bar.style.width = width + '%';
        });
    }

    // Typing animation
    function startTypingAnimation() {
        let stringIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;
        
        function type() {
            const currentString = typedStrings[stringIndex];
            
            if (isDeleting) {
                // Deleting characters
                typedElement.textContent = currentString.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50;
            } else {
                // Typing characters
                typedElement.textContent = currentString.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 100;
            }
            
            // Check if word is complete
            if (!isDeleting && charIndex === currentString.length) {
                // Pause at end of word
                typingSpeed = 1500;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                // Move to next word
                isDeleting = false;
                stringIndex = (stringIndex + 1) % typedStrings.length;
                typingSpeed = 500;
            }
            
            setTimeout(type, typingSpeed);
        }
        
        // Start typing animation after a delay
        setTimeout(type, 1000);
    }

    // Create particles for background
    function createParticles() {
        const particleCount = 50;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            // Random size
            const size = Math.random() * 10 + 5;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            
            // Random position
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            
            // Random animation
            const duration = Math.random() * 20 + 10;
            const delay = Math.random() * 5;
            particle.style.animationDuration = duration + 's';
            particle.style.animationDelay = delay + 's';
            
            particlesContainer.appendChild(particle);
        }
    }

    // Notification system
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: linear-gradient(135deg, var(--primary), var(--secondary));
            color: white;
            padding: 15px 25px;
            border-radius: 10px;
            z-index: 9999;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            transform: translateX(120%);
            transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            font-weight: 600;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 10);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(120%)';
            setTimeout(() => {
                notification.remove();
            }, 500);
        }, 3000);
    }

    // Interactive skill card hover effects
    const skillCards = document.querySelectorAll('.skill-card');
    
    skillCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-12px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            if (!card.classList.contains('show')) {
                card.style.transform = '';
            } else {
                card.style.transform = 'translateY(-12px) scale(1.02)';
            }
        });
    });

    // Initialize reveal on load
    window.addEventListener('load', revealOnScroll);