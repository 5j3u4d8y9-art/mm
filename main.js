document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('main-header');
    const sections = document.querySelectorAll('section');
    
    // Header Scroll Effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Scroll Reveal Animation
    const revealOnScroll = () => {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight * 0.85) {
                section.classList.add('visible');
            }
        });
    };

    // Initial check and event listener
    revealOnScroll();
    window.addEventListener('scroll', revealOnScroll);

    // Smooth Scroll for Nav Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80, // Adjust for header height
                    behavior: 'smooth'
                });
            }
        });
    });

    // Hero Parallax Effect (Simple)
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroBg = document.querySelector('.hero-bg');
        if (heroBg) {
            heroBg.style.transform = `translateY(${scrolled * 0.4}px)`;
        }
    });

    // Ant Factory: Spawn many ants!
    const setupAntInteraction = (ant) => {
        ant.addEventListener('mouseenter', () => {
            ant.style.opacity = '1';
            ant.style.transition = 'opacity 0.1s ease, transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            ant.style.transform += ' scale(2.5) rotate(20deg)';
            setTimeout(() => {
                ant.style.opacity = '0.3';
                ant.style.transform = ant.style.transform.replace(' scale(2.5) rotate(20deg)', '');
            }, 800);
        });
    };

    const spawnAnts = (count) => {
        const sections = document.querySelectorAll('section');
        const animations = ['ant-animation-1', 'ant-animation-2', 'ant-animation-diagonal', 'ant-animation-wiggle'];
        
        for (let i = 0; i < count; i++) {
            const ant = document.createElement('div');
            ant.className = `ant-trail ${animations[Math.floor(Math.random() * animations.length)]}`;
            if (Math.random() > 0.5) ant.classList.add('ant-small');
            if (Math.random() > 0.7) ant.classList.add('ant-fast');
            if (Math.random() > 0.7) ant.classList.add('ant-slow');
            
            ant.innerHTML = '<span class="material-symbols-outlined">bug_report</span>';
            
            const targetSection = sections[Math.floor(Math.random() * sections.length)];
            ant.style.top = `${Math.random() * 100}%`;
            ant.style.left = `${Math.random() * 100}%`;
            ant.style.opacity = (0.1 + Math.random() * 0.2).toString();
            
            setupAntInteraction(ant);
            
            targetSection.style.position = 'relative';
            targetSection.appendChild(ant);
        }
    };

    // Setup for static ants already in HTML
    document.querySelectorAll('.ant-trail').forEach(setupAntInteraction);

    spawnAnts(45); // Spawn 45 additional ants
});
