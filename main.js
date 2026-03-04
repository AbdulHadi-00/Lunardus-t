// Counter Animation
const counters = document.querySelectorAll('.counter');
const speed = 200;

const runCounters = () => {
    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const inc = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 1);
            } else {
                counter.innerText = target + (target > 1000 ? '+' : '');
            }
        };
        updateCount();
    });
};

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('achievement-grid')) {
                runCounters();
            }
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.achievement-grid, .science-content, .founder-layout').forEach(el => {
    observer.observe(el);
});

// Parallax Effect for Anti-Gravity feel
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    
    // Header Blur
    const header = document.querySelector('.global-header');
    if (scrolled > 50) {
        header.style.background = 'rgba(10, 10, 10, 0.9)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = 'linear-gradient(to bottom, rgba(10, 10, 10, 0.8), transparent)';
        header.style.backdropFilter = 'none';
    }

    // Hero Parallax
    const heroImg = document.querySelector('.hero-bg-image');
    if (heroImg) {
        heroImg.style.transform = `scale(1.1) translateY(${scrolled * 0.3}px)`;
    }

    // Achievement Parallax
    const parallaxImg = document.querySelector('.parallax-img');
    if (parallaxImg) {
        const offset = parallaxImg.offsetTop;
        if (scrolled > offset - window.innerHeight) {
            const val = (scrolled - offset) * 0.1;
            parallaxImg.style.transform = `translateY(${val}px)`;
        }
    }
});

// Smooth Scroll for Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
