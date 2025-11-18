// ฟังก์ชันสำหรับเลื่อนหน้าแบบนุ่มนวลเมื่อกดเมนู
function smoothScroll() {
    // หาลิงก์ทั้งหมดที่มี attribute เริ่มต้นด้วย #
    const links = document.querySelectorAll('a[href^="#"]');
    
    // เพิ่ม event listener ให้กับแต่ละลิงก์
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            // ป้องกันพฤติกรรมเริ่มต้นของลิงก์
            e.preventDefault();
            
            // รับ id ของ section ที่ต้องการเลื่อนไป
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            // เลื่อนหน้าไปยัง section ที่ต้องการ
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80, // หัก header ออกเพื่อให้เห็น section พอดี
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ฟังก์ชันสำหรับการจัดการ mobile menu
function mobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        // สลับ class active เพื่อแสดง/ซ่อน menu
        navMenu.classList.toggle('active');
        
        // เปลี่ยนรูปร่างของ hamburger
        const bars = document.querySelectorAll('.bar');
        bars.forEach(bar => {
            bar.classList.toggle('active');
        });
    });
    
    // ซ่อน menu เมื่อคลิกที่ลิงก์
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            
            const bars = document.querySelectorAll('.bar');
            bars.forEach(bar => {
                bar.classList.remove('active');
            });
        });
    });
}

// ฟังก์ชันสำหรับ carousel ของรีวิว
function initTestimonialsCarousel() {
    const slides = document.querySelectorAll('.testimonial-slide');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let currentSlide = 0;
    
    // แสดง slide ปัจจุบัน
    function showSlide(index) {
        // ซ่อนทุก slide
        slides.forEach(slide => slide.classList.remove('active'));
        // ซ่อนทุก indicator
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        // แสดง slide ที่เลือก
        if (slides[index]) {
            slides[index].classList.add('active');
        }
        
        // เปลี่ยน indicator ที่เลือก
        if (indicators[index]) {
            indicators[index].classList.add('active');
        }
        
        currentSlide = index;
    }
    
    // เริ่มต้นแสดง slide แรก
    showSlide(currentSlide);
    
    // ปุ่มถัดไป
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            let nextSlide = currentSlide + 1;
            if (nextSlide >= slides.length) {
                nextSlide = 0; // วนกลับไป slide แรก
            }
            showSlide(nextSlide);
        });
    }
    
    // ปุ่มก่อนหน้า
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            let prevSlide = currentSlide - 1;
            if (prevSlide < 0) {
                prevSlide = slides.length - 1; // วนไป slide สุดท้าย
            }
            showSlide(prevSlide);
        });
    }
    
    // จัดการกับ indicator
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function() {
            showSlide(index);
        });
    });
    
    // เลื่อน slide อัตโนมัติทุก 5 วินาที
    setInterval(function() {
        let nextSlide = currentSlide + 1;
        if (nextSlide >= slides.length) {
            nextSlide = 0;
        }
        showSlide(nextSlide);
    }, 5000);
}

// ฟังก์ชันสำหรับ contact form
function contactForm() {
    const form = document.getElementById('contactForm');

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault(); // ป้องกันการส่งฟอร์มแบบปกติ

            // ดึงค่าจาก input ต่างๆ
            const name = document.getElementById('name').value;
            const grade = document.getElementById('grade').value;
            const message = document.getElementById('message').value;

            // แสดง success toast
            showSuccessToast(`ขอบคุณ ${name}! ครูต้าจะติดต่อกลับให้เร็วที่สุด ⚡`);

            // ล้างค่าในฟอร์มหลังจากส่ง
            form.reset();
        });
    }
}

// ฟังก์ชันสำหรับเพิ่มแอนิเมชัน on scroll
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.animation = 'float-up 0.6s ease-out forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.course-card, .review-card, .resource-category, .course-item').forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
}

// ฟังก์ชันสำหรับเพิ่มพาร์ติเคิลแอนิเมชัน
function createFloatingParticles() {
    const container = document.body;
    const particleCount = 5;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            pointer-events: none;
            z-index: -1;
        `;

        const size = Math.random() * 3 + 1;
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        const duration = Math.random() * 10 + 10;

        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.background = `hsl(${Math.random() * 60 + 200}, 80%, 60%)`;
        particle.style.borderRadius = '50%';
        particle.style.opacity = Math.random() * 0.3 + 0.1;

        container.appendChild(particle);

        // แอนิเมชันสำหรับพาร์ติเคิล
        let frame = 0;
        const animate = setInterval(() => {
            frame++;
            const progress = (frame % (duration * 60)) / (duration * 60);
            const angle = progress * Math.PI * 4;
            const distance = progress * 100;

            particle.style.left = (x + Math.cos(angle) * distance) + 'px';
            particle.style.top = (y + Math.sin(angle) * distance) + 'px';
            particle.style.opacity = Math.sin(progress * Math.PI) * 0.3;
        }, 1000 / 60);
    }
}

// ฟังก์ชันสำหรับเพิ่ม hover glow effect
function initGlowEffects() {
    const buttons = document.querySelectorAll('.btn, .course-card, .review-card');

    buttons.forEach(btn => {
        btn.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // เพิ่ม subtle glow effect
            this.style.background = `
                radial-gradient(
                    circle at ${x}px ${y}px,
                    rgba(255, 255, 255, 0.3) 0%,
                    transparent 60%
                ),
                ${window.getComputedStyle(this).background}
            `;
        });

        btn.addEventListener('mouseleave', function() {
            this.style.background = null;
        });
    });
}

// ฟังก์ชันสำหรับแสดง toast notification เมื่อส่งฟอร์ม
function showSuccessToast(message) {
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: linear-gradient(135deg, #00D9FF, #8338EC);
        color: white;
        padding: 20px 30px;
        border-radius: 12px;
        font-weight: 600;
        z-index: 10000;
        animation: float-up 0.4s ease-out, float-up 0.4s ease-in 3.6s reverse;
        box-shadow: 0 10px 30px rgba(0, 217, 255, 0.3);
    `;
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => toast.remove(), 4000);
}

// ฟังก์ชันที่จะทำงานเมื่อหน้าเว็บโหลดเสร็จ
document.addEventListener('DOMContentLoaded', function() {
    smoothScroll(); // เปิดใช้งานการเลื่อนหน้าแบบนุ่มนวล
    mobileMenu(); // เปิดใช้งาน mobile menu
    initTestimonialsCarousel(); // เปิดใช้งาน carousel ของรีวิว
    contactForm(); // เปิดใช้งาน contact form
    initScrollAnimations(); // เปิดใช้งานแอนิเมชัน on scroll
    initGlowEffects(); // เปิดใช้งาน glow effects
    // createFloatingParticles(); // เปิดใช้งาน floating particles (optional - uncomment if desired)
});

// เพิ่ม event listener สำหรับการเลื่อนหน้าจอเพื่อซ่อน mobile menu
window.addEventListener('scroll', function() {
    const navMenu = document.querySelector('.nav-menu');
    if (window.scrollY > 100 && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        
        const bars = document.querySelectorAll('.bar');
        bars.forEach(bar => {
            bar.classList.remove('active');
        });
    }
});