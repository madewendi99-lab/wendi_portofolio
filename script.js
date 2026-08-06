let birdInterval;

// 1. GENERATOR KAWANAN BURUNG
function spawnBirdFlock(birdCount = 6) {
    const birdsContainer = document.getElementById('birdsContainer');
    if (!birdsContainer) return;

    const flockGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
    const startY = Math.random() * 110 + 70;
    flockGroup.setAttribute("transform", `translate(-160, ${startY})`);

    for (let i = 0; i < birdCount; i++) {
        const birdWrapper = document.createElementNS("http://www.w3.org/2000/svg", "g");
        const birdElem = document.createElementNS("http://www.w3.org/2000/svg", "g");
        
        const leftWing = document.createElementNS("http://www.w3.org/2000/svg", "path");
        leftWing.setAttribute("class", "wing-left");
        leftWing.setAttribute("fill", "#090514");
        leftWing.setAttribute("d", "M24,6 Q12,-6 0,0 Q12,12 24,6 Z");
        leftWing.style.animationDelay = `${(i * 0.12)}s`;

        const rightWing = document.createElementNS("http://www.w3.org/2000/svg", "path");
        rightWing.setAttribute("class", "wing-right");
        rightWing.setAttribute("fill", "#090514");
        rightWing.setAttribute("d", "M24,6 Q36,-6 48,0 Q36,12 24,6 Z");
        rightWing.style.animationDelay = `${(i * 0.12)}s`;

        birdElem.appendChild(leftWing);
        birdElem.appendChild(rightWing);
        birdWrapper.appendChild(birdElem);

        const offsetX = (i % 3) * -34 - (Math.random() * 14);
        const offsetY = Math.floor(i / 3) * 16 + (Math.random() * 10 - 5);
        const scale = 0.28 + Math.random() * 0.2;

        birdWrapper.setAttribute("transform", `translate(${offsetX}, ${offsetY}) scale(${scale})`);
        flockGroup.appendChild(birdWrapper);
    }

    birdsContainer.appendChild(flockGroup);

    gsap.to(flockGroup, {
        x: 1020,
        y: startY - (Math.random() * 50 + 10),
        duration: 5.5 + Math.random() * 2,
        ease: "power1.inOut",
        onComplete: () => flockGroup.remove()
    });
}

spawnBirdFlock(6);
birdInterval = setInterval(() => {
    spawnBirdFlock(Math.floor(Math.random() * 3) + 5);
}, 2800);

// 2. FUNGSI TRANSISI POV KAMERA ZOOM KE MATAHARI & KE MALAM
function enterPortfolio() {
    clearInterval(birdInterval);

    const btn = document.querySelector('.btn-enter');
    btn.style.pointerEvents = 'none';
    btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin me-2"></i>Masuk...';

    gsap.to(".splash-overlay-content", {
        opacity: 0,
        scale: 0.8,
        duration: 0.3,
        ease: "power2.in"
    });

    const tl = gsap.timeline({
        onComplete: function() {
            const splash = document.getElementById('splash-screen');
            const mainContent = document.getElementById('main-content');

            gsap.to(splash, {
                opacity: 0,
                duration: 0.9,
                onComplete: function() {
                    splash.style.display = 'none';
                    mainContent.style.display = 'block';
                    document.body.style.overflow = 'auto';
                    
                    gsap.to(mainContent, { opacity: 1, duration: 0.8 });
                    
                    ScrollTrigger.refresh();
                }
            });
        }
    });

    tl.to("#sunsetScene", {
        scale: 18,
        svgOrigin: "400 220",
        duration: 0.85,
        ease: "power2.in"
    });

    tl.to("#sunsetScene", {
        opacity: 0,
        duration: 0.2
    }, "-=0.2");

    tl.set("#nightScene", { opacity: 1 });
    tl.from("#nightScene", {
        scale: 2.5,
        svgOrigin: "400 220",
        duration: 0.7,
        ease: "power2.out"
    }, "<");

    tl.from("#nightMoon", { y: 35, scale: 0.4, opacity: 0, duration: 0.9, ease: "back.out(1.4)" }, "-=0.4");
    tl.from("#auroraGroup", { opacity: 0, duration: 0.9, ease: "power2.out" }, "-=0.7");
    tl.to({}, { duration: 1.0 }); 
}

// TOGGLE DARK / LIGHT MODE NAVBAR
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');

themeToggle.addEventListener('click', () => {
    const currentTheme = document.body.getAttribute('data-theme');
    if (currentTheme === 'dark') {
        document.body.setAttribute('data-theme', 'light');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    } else {
        document.body.setAttribute('data-theme', 'dark');
        themeIcon.classList.replace('fa-sun', 'fa-moon');
    }
});

// FUNGSI POPUP PREVIEW SERTIFIKAT
function openCertificate(imageSrc, title) {
    document.getElementById('certModalImg').src = imageSrc;
    document.getElementById('certModalTitle').textContent = title;
    const certModal = new bootstrap.Modal(document.getElementById('certModal'));
    certModal.show();
}

// 3. GSAP SCROLLTRIGGER ANIMASI BERGERAK DARI HOME SAMPAI CONTACT
document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);

    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    animatedElements.forEach((el) => {
        let animType = el.getAttribute('data-animation');
        let xVal = 0, yVal = 50;

        if (animType === 'fade-left') { xVal = -80; yVal = 0; }
        else if (animType === 'fade-right') { xVal = 80; yVal = 0; }
        else if (animType === 'fade-up') { xVal = 0; yVal = 60; }

        gsap.fromTo(el, 
            { opacity: 0, x: xVal, y: yVal },
            {
                opacity: 1,
                x: 0,
                y: 0,
                duration: 1.1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: el,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    });
});