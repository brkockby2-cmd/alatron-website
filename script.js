/* ═══════════════════════════════════════════════════════════════════════ */
/* JAVASCRIPT - SITEYI İNTERAKTİF YAPMA                                   */
/* ═══════════════════════════════════════════════════════════════════════ */

console.log('JavaScript yüklendi!');

/* ═══════════════════════════════════════════════════════════════════════ */
/* ÖZELLIK 1: HAMBURGER MENÜ (Mobil)                                     */
/* ═══════════════════════════════════════════════════════════════════════ */

const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

/* ─────────────────────────────────────────────────────────────────────── */
/* MENÜ LİNKLERİ TIKLANDI - MENÜ KAPA                                     */
/* ─────────────────────────────────────────────────────────────────────── */

const navItems = document.querySelectorAll('.nav-links li a');

navItems.forEach(item => {
    item.addEventListener('click', function() {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

/* ═══════════════════════════════════════════════════════════════════════ */
/* ÖZELLIK 2: YUMUŞAK KAYDIRMA (Smooth Scroll)                            */
/* ═══════════════════════════════════════════════════════════════════════ */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

/* ─────────────────────────────────────────────────────────────────────── */
/* SCROLL EVENT - Navbar'a Gölge Ekle                                      */
/* ─────────────────────────────────────────────────────────────────────── */

const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', function() {
    let scrollTop = window.scrollY;

    if (scrollTop > 50) {
        navbar.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
        navbar.style.background = 'linear-gradient(135deg, rgba(26,71,42,0.95) 0%, rgba(13,40,24,0.95) 100%)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        navbar.style.background = 'linear-gradient(135deg, #1a472a 0%, #0d2818 100%)';
    }
});

/* ═══════════════════════════════════════════════════════════════════════ */
/* ÖZELLIK 3: FORM GÖNDERIMI VE DOĞRULAMA                                 */
/* ═══════════════════════════════════════════════════════════════════════ */

const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Form alanlarını al
        const nameInput = this.querySelector('input[name="name"]');
        const emailInput = this.querySelector('input[name="email"]');
        const phoneInput = this.querySelector('input[name="phone"]');
        const subjectInput = this.querySelector('input[name="subject"]');
        const messageInput = this.querySelector('textarea[name="message"]');

        // Email regex doğrulaması
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!nameInput.value.trim()) {
            alert('Lütfen adınız ve soyadınızı girin!');
            nameInput.focus();
            return;
        }

        if (!emailRegex.test(emailInput.value)) {
            alert('Lütfen geçerli bir email adresi girin!');
            emailInput.focus();
            return;
        }

        if (!subjectInput.value.trim()) {
            alert('Lütfen konu girin!');
            subjectInput.focus();
            return;
        }

        if (!messageInput.value.trim()) {
            alert('Lütfen mesajınızı yazın!');
            messageInput.focus();
            return;
        }

        // Formu gönder (Formspree)
        fetch('https://formspree.io/f/xyzabc123', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: nameInput.value,
                email: emailInput.value,
                phone: phoneInput.value,
                subject: subjectInput.value,
                message: messageInput.value,
                _subject: `Yeni İletişim Formu: ${subjectInput.value}`
            })
        })
        .then(response => {
            if (response.ok) {
                // Başarı mesajını göster
                showSuccessMessage();
                
                // Formu sıfırla
                contactForm.reset();
                
                console.log('Form başarıyla gönderildi!');
            } else {
                throw new Error('Form gönderilemedi');
            }
        })
        .catch(error => {
            console.error('Hata:', error);
            alert('Mesaj gönderirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
        });
    });
}

/* ─────────────────────────────────────────────────────────────────────── */
/* BAŞARI MESAJI GÖSTER                                                   */
/* ─────────────────────────────────────────────────────────────────────── */

function showSuccessMessage() {
    // Başarı mesajı elemanı oluştur
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.innerHTML = `
        <div class="success-content">
            <i class="fas fa-check-circle"></i>
            <h3>Başarılı!</h3>
            <p>Mesajınız başarıyla gönderildi. En kısa zamanda sizinle iletişime geçeceğiz.</p>
        </div>
    `;

    // Sayfaya ekle
    document.body.appendChild(successDiv);

    // 5 saniye sonra kaybol
    setTimeout(() => {
        successDiv.classList.add('fade-out');
        setTimeout(() => {
            successDiv.remove();
        }, 500);
    }, 5000);
}

/* ═══════════════════════════════════════════════════════════════════════ */
/* ÖZELLIK 4: FOOTER LİNKLERİ                                             */
/* ═══════════════════════════════════════════════════════════════════════ */

// Footer yasal linkleri güncelle
const legalLinks = {
    'Gizlilik Politikası': '/privacy.html',
    'Kullanım Şartları': '/terms.html',
    'Çerez Politikası': '/cookies.html',
    'İletişim': '#iletisim',
    'Harita': '/sitemap.html'
};

// Footer linklerini güncelle (opsiyonel)
const footerLinks = document.querySelectorAll('.footer-links a');
footerLinks.forEach(link => {
    const linkText = link.textContent.trim();
    if (legalLinks[linkText]) {
        link.href = legalLinks[linkText];
        link.title = linkText;
    }
});

/* ═══════════════════════════════════════════════════════════════════════ */
/* ÖZELLIK 5: GALERİ LIGHTBOX (Fotoğraf Büyütme)                          */
/* ═══════════════════════════════════════════════════════════════════════ */

const galleryItems = document.querySelectorAll('.gallery-item');

galleryItems.forEach(item => {
    item.addEventListener('click', function() {
        const imgSrc = this.querySelector('img').src;
        const imgAlt = this.querySelector('img').alt;
        
        // Lightbox aç
        openLightbox(imgSrc, imgAlt);
    });
});

function openLightbox(src, alt) {
    // Lightbox container oluştur
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox-overlay';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <button class="lightbox-close">&times;</button>
            <img src="${src}" alt="${alt}" class="lightbox-image">
            <p class="lightbox-caption">${alt}</p>
        </div>
    `;

    document.body.appendChild(lightbox);

    // Kapat butonuna tıkla
    lightbox.querySelector('.lightbox-close').addEventListener('click', () => {
        lightbox.remove();
    });

    // Overlay'e tıkla (dış alan)
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.remove();
        }
    });

    // ESC tuşu ile kapat
    const handleEscape = (e) => {
        if (e.key === 'Escape') {
            lightbox.remove();
            document.removeEventListener('keydown', handleEscape);
        }
    };
    document.addEventListener('keydown', handleEscape);
}

/* ═══════════════════════════════════════════════════════════════════════ */
/* ÖZELLIK 6: SCROLL ANIMASYON (İntersection Observer)                    */
/* ═══════════════════════════════════════════════════════════════════════ */

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

/* ═══════════════════════════════════════════════════════════════════════ */
/* ÖZELLIK 7: SAYFA YÜKLEME                                               */
/* ═══════════════════════════════════════════════════════════════════════ */

window.addEventListener('load', function() {
    console.log('Sayfa tamamen yüklendi!');
    
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.display = 'none';
    }

    document.body.style.opacity = '1';
});

/* ═══════════════════════════════════════════════════════════════════════ */
/* ÖZELLIK 8: SMOOTH SCROLL FONKSİYON                                     */
/* ═══════════════════════════════════════════════════════════════════════ */

function smoothScrollToElement(selector) {
    const element = document.querySelector(selector);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

/* ═══════════════════════════════════════════════════════════════════════ */
/* SONLANDIŞ                                                              */
/* ═══════════════════════════════════════════════════════════════════════ */

console.log('=== JAVASCRIPT YÜKLEMESI TAMAMLANDI ===');
