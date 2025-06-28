/* ===== Space Background with Three.js ===== */
function initSpaceBackground() {
    const canvas = document.getElementById('space-bg');
    const renderer = new THREE.WebGLRenderer({ 
        canvas, 
        alpha: true,
        antialias: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    
    // Create stars with more variety
    const starsGeometry = new THREE.BufferGeometry();
    const starCount = 10000;
    const positions = new Float32Array(starCount * 3);
    const sizes = new Float32Array(starCount);
    const colors = new Float32Array(starCount * 3);
    
    for (let i = 0; i < starCount; i++) {
        const i3 = i * 3;
        // Spread stars in a larger space
        positions[i3] = (Math.random() - 0.5) * 3000;
        positions[i3 + 1] = (Math.random() - 0.5) * 3000;
        positions[i3 + 2] = (Math.random() - 0.5) * 3000;
        
        sizes[i] = Math.random() * 1.5;
        
        // Add some color variation
        colors[i3] = 0.9 + Math.random() * 0.1;
        colors[i3 + 1] = 0.9 + Math.random() * 0.1;
        colors[i3 + 2] = 0.9 + Math.random() * 0.1;
    }
    
    starsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    starsGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    starsGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    const starsMaterial = new THREE.PointsMaterial({
        size: 0.2,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        sizeAttenuation: true,
        blending: THREE.AdditiveBlending
    });
    
    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);
    
    // Add some distant stars for depth
    const distantStarsGeometry = new THREE.BufferGeometry();
    const distantStarsPositions = new Float32Array(2000 * 3);
    
    for (let i = 0; i < 2000; i++) {
        const i3 = i * 3;
        distantStarsPositions[i3] = (Math.random() - 0.5) * 5000;
        distantStarsPositions[i3 + 1] = (Math.random() - 0.5) * 5000;
        distantStarsPositions[i3 + 2] = (Math.random() - 0.5) * 5000;
    }
    
    distantStarsGeometry.setAttribute('position', new THREE.BufferAttribute(distantStarsPositions, 3));
    
    const distantStars = new THREE.Points(
        distantStarsGeometry,
        new THREE.PointsMaterial({
            size: 0.1,
            color: 0x555555,
            transparent: true,
            opacity: 0.5
        })
    );
    scene.add(distantStars);
    
    // Animation with more dynamic movement
    function animate() {
        requestAnimationFrame(animate);
        
        // Stars move in parallax effect
        stars.rotation.x += 0.0002;
        stars.rotation.y += 0.0003;
        stars.rotation.z += 0.0001;
        
        // Distant stars move slower for depth effect
        distantStars.rotation.x += 0.0001;
        distantStars.rotation.y += 0.00015;
        
        renderer.render(scene, camera);
    }
    
    animate();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

/* ===== Spaceship Cursor ===== */
function initSpaceshipCursor() {
    const cursor = document.querySelector('.spaceship-cursor');
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    
    // Change cursor near interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .skill-item, .project-card, .stat-card, .contact-card');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-active');
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-active');
        });
    });
}

/* ===== Typewriter Effect ===== */
function initTypewriter() {
    const strings = ['Data Science Enthusiast', 'Full Stack Developer', 'Problem Solver', 'Tech Explorer'];
    const typewriter = new Typed('.typewriter', {
        strings: strings,
        typeSpeed: 50,
        backSpeed: 30,
        loop: true,
        showCursor: true,
        cursorChar: '|'
    });
}

/* ===== Navigation Scroll Effect ===== */
function initNavScroll() {
    const nav = document.querySelector('.cosmic-nav');
    const navHeight = nav.offsetHeight;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > navHeight) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
}

/* ===== Mobile Navigation Toggle ===== */
function initMobileNav() {
    const hamburger = document.querySelector('.nav-hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
    
    // Close menu when clicking a link
    const navItems = document.querySelectorAll('.nav-link');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

/* ===== Skill Tabs ===== */
function initSkillTabs() {
    const tabs = document.querySelectorAll('.category-tab');
    const categories = document.querySelectorAll('.skill-category');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs and categories
            tabs.forEach(t => t.classList.remove('active'));
            categories.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding category
            tab.classList.add('active');
            const categoryId = tab.getAttribute('data-category');
            document.getElementById(categoryId).classList.add('active');
        });
    });
}

/* ===== Form Submission ===== */
function initContactForm() {
    const form = document.querySelector('.contact-form form');
    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form values
            const name = form.elements['name'].value;
            const email = form.elements['email'].value;
            const subject = form.elements['subject'].value;
            const message = form.elements['message'].value;
            
            // Here you would typically send the form data to a server
            console.log('Form submitted:', { name, email, subject, message });
            
            // Show success message
            alert('Thank you for your message! I will get back to you soon.');
            form.reset();
        });
    }
}

/* ===== Smooth Scrolling ===== */
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ===== Planet Hover Effects ===== */
function initPlanetEffects() {
    const planets = document.querySelectorAll('.skill-planet');
    
    planets.forEach(planet => {
        planet.addEventListener('mouseenter', () => {
            const planetCore = planet.querySelector('.planet-core');
            planetCore.style.animation = 'pulse 1s infinite alternate';
        });
        
        planet.addEventListener('mouseleave', () => {
            const planetCore = planet.querySelector('.planet-core');
            planetCore.style.animation = 'none';
        });
    });
}

/* ===== Voice Command Easter Egg ===== */
function initVoiceCommand() {
    const recognition = new webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    
    document.addEventListener('keypress', (e) => {
        if (e.key === 'v') {
            recognition.start();
            console.log('Voice command activated. Say "explore"');
        }
    });
    
    recognition.onresult = (e) => {
        const transcript = e.results[0][0].transcript.toLowerCase();
        if (transcript.includes('explore')) {
            document.body.classList.add('easter-egg-active');
            setTimeout(() => {
                document.body.classList.remove('easter-egg-active');
            }, 5000);
        }
    };
}

/* ===== Initialize Everything When DOM Loads ===== */
document.addEventListener('DOMContentLoaded', () => {
    // Core functionality
    initSpaceBackground();
    initSpaceshipCursor();
    initTypewriter();
    initNavScroll();
    initMobileNav();
    
    // Section-specific initializations
    initSkillTabs();
    initContactForm();
    initPlanetEffects();
    
    // General utilities
    initSmoothScrolling();
    
    // Scroll animations
    const animateOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.section, .project-card, .stat-card, .contact-card, .skill-item').forEach(el => {
        animateOnScroll.observe(el);
    });

    // Easter egg (only if supported)
    if ('webkitSpeechRecognition' in window) {
        initVoiceCommand();
    }
});

/* ===== Handle Window Resize ===== */
window.addEventListener('resize', () => {
    // Recalculate any layout-dependent values if needed
});