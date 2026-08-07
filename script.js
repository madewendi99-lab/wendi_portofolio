let birdInterval;

// KAMUS TERJEMAHAN (INDONESIA - ENGLISH)
const translations = {
    id: {
        nav_home: "Home",
        nav_about: "About",
        nav_skills: "Skills & Sertifikat",
        nav_contact: "Contact",
        badge_grad: "Lulusan Baru",
        hero_title: "Halo, Saya <span class=\"text-sunset\">Wendi</span>",
        hero_desc: "Made Wendi Prayogi Putra • Lulusan baru yang tertarik pada pengembangan antarmuka web interaktif dan kreatif.",
        btn_about: "Tentang Saya",
        btn_contact_hero: "Hubungi Saya",
        about_heading: "About <span>Me</span>",
        about_text: "Hallo, saya <strong>Made Wendi Prayogi Putra</strong>, biasa dipanggil <strong>Wendi</strong>. Saya adalah seorang lulusan S1 Sistem Informasi ITB STIKOM Bali yang memiliki ketertarikan mendalam pada Web Development, perancangan sistem, serta pembuatan antarmuka pengguna yang interaktif. Dalam proses pengembangan, saya terbiasa memanfaatkan teknologi Artificial Intelligence (AI) untuk mempercepat alur kerja dan menciptakan solusi digital yang efisien.",
        edu_heading: "Riwayat Pendidikan",
        edu_1_title: "ITB STIKOM Bali",
        edu_1_sub: "Pendidikan Tinggi / Kuliah",
        edu_1_desc: "Menempuh studi perkuliahan dengan fokus pada bidang teknologi informasi dan pengembangan perangkat lunak.",
        edu_2_title: "SMA Negeri 1 Manggis",
        edu_2_sub: "Pendidikan Menengah Atas",
        edu_2_desc: "Menyelesaikan pendidikan tingkat menengah atas dengan aktif di berbagai kegiatan akademik maupun ekstrakulikuler.",
        skills_heading: "Skills & <span>Sertifikat</span>",
        skill_1_title: "Web Development",
        skill_1_desc: "HTML5, CSS3, JavaScript ES6+, Bootstrap 5",
        skill_2_title: "GSAP & Motion SVG",
        skill_2_desc: "Interactive Animations & Responsive Layouts",
        skill_3_title: "UI/UX & Mobile Friendly",
        skill_3_desc: "Clean interface adapted for all devices",
        cert_heading: "Sertifikat & Penghargaan",
        cert_lsp_title: "Sertifikat Kompetensi LSP",
        cert_lsp_desc: "Halaman 1 & 2 (Klik gambar untuk memperbesar)",
        cert_pm_title: "Project Management Associate",
        cert_pm_desc: "Sertifikat Kompetensi",
        cert_sc_title: "Supply Chain Associate",
        cert_sc_desc: "Sertifikat Kompetensi",
        cert_dm_title: "Digital Marketing",
        cert_dm_desc: "Sertifikat Kompetensi",
        cert_toefl_title: "Sertifikat TOEFL",
        cert_toefl_desc: "Sertifikat Kemampuan Bahasa",
        contact_heading: "Contact <span>Me</span>",
        contact_desc: "Ingin berdiskusi, bekerja sama, atau terhubung dengan saya? Silakan hubungi melalui kontak di bawah ini:",
        footer_text: "&copy; 2026 Made Wendi Prayogi Putra. All Rights Reserved."
    },
    en: {
        nav_home: "Home",
        nav_about: "About",
        nav_skills: "Skills & Certificates",
        nav_contact: "Contact",
        badge_grad: "Fresh Graduate",
        hero_title: "Hello, I'm <span class=\"text-sunset\">Wendi</span>",
        hero_desc: "Made Wendi Prayogi Putra • Fresh graduate interested in interactive and creative web interface development.",
        btn_about: "About Me",
        btn_contact_hero: "Contact Me",
        about_heading: "About <span>Me</span>",
        about_text: "Hello, I am <strong>Made Wendi Prayogi Putra</strong>, commonly called <strong>Wendi</strong>. I am an Information Systems Bachelor graduate from ITB STIKOM Bali with a deep interest in Web Development, system design, and creating interactive user interfaces. In the development process, I am accustomed to utilizing Artificial Intelligence (AI) technology to accelerate workflow and create efficient digital solutions.",
        edu_heading: "Educational History",
        edu_1_title: "ITB STIKOM Bali",
        edu_1_sub: "Higher Education / College",
        edu_1_desc: "Pursuing college studies with a focus on information technology and software development.",
        edu_2_title: "SMA Negeri 1 Manggis",
        edu_2_sub: "Senior High School",
        edu_2_desc: "Completed senior high school education while active in various academic and extracurricular activities.",
        skills_heading: "Skills & <span>Certificates</span>",
        skill_1_title: "Web Development",
        skill_1_desc: "HTML5, CSS3, JavaScript ES6+, Bootstrap 5",
        skill_2_title: "GSAP & Motion SVG",
        skill_2_desc: "Interactive Animations & Responsive Layouts",
        skill_3_title: "UI/UX & Mobile Friendly",
        skill_3_desc: "Clean interface adapted for all devices",
        cert_heading: "Certificates & Awards",
        cert_lsp_title: "LSP Competency Certificate",
        cert_lsp_desc: "Page 1 & 2 (Click image to enlarge)",
        cert_pm_title: "Project Management Associate",
        cert_pm_desc: "Competency Certificate",
        cert_sc_title: "Supply Chain Associate",
        cert_sc_desc: "Competency Certificate",
        cert_dm_title: "Digital Marketing",
        cert_dm_desc: "Competency Certificate",
        cert_toefl_title: "TOEFL Certificate",
        cert_toefl_desc: "Language Proficiency Certificate",
        contact_heading: "Contact <span>Me</span>",
        contact_desc: "Want to discuss, collaborate, or connect with me? Please reach out through the contacts below:",
        footer_text: "&copy; 2026 Made Wendi Prayogi Putra. All Rights Reserved."
    }
};

let currentLang = 'id';

function toggleLanguage() {
    currentLang = currentLang === 'id' ? 'en' : 'id';
    document.getElementById('langText').innerText = currentLang === 'id' ? 'EN' : 'ID';
    
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[currentLang][key]) {
            el.innerHTML = translations[currentLang][key];
        }
    });
}

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
