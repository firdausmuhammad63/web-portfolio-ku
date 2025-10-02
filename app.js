// ============================================
// FIRDAUS WEB DEVELOPER - MAIN JAVASCRIPT
// ============================================

// ============================================
// 1. PRELOADER
// ============================================
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  if(preloader){
    preloader.style.opacity = '0'; // fade-out
    setTimeout(() => preloader.style.display = 'none', 500); // setelah fade-out selesai
  }

  // Trigger fade-in konten
  document.querySelectorAll('.fade-in').forEach(el => el.classList.add('show'));
});


// ============================================
// 2. MOBILE MENU TOGGLE
// ============================================
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const closeMenuBtn = document.getElementById('close-menu');
const mobileMenuLinks = mobileMenu?.querySelectorAll('a');

// Open mobile menu
if (mobileMenuBtn && mobileMenu) {
  mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.add('active');
  });
}

// Close mobile menu
if (closeMenuBtn && mobileMenu) {
  closeMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
  });
}

// Close menu when clicking on a link
if (mobileMenuLinks) {
  mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('active');
    });
  });
}

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (mobileMenu && 
      !mobileMenu.contains(e.target) && 
      !mobileMenuBtn?.contains(e.target) &&
      mobileMenu.classList.contains('active')) {
    mobileMenu.classList.remove('active');
  }
});

// ============================================
// 3. SMOOTH SCROLLING & ACTIVE NAVIGATION
// ============================================
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

// Smooth scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetSection = document.querySelector(targetId);
    if (targetSection) {
      const offsetTop = targetSection.offsetTop - 80; // Account for fixed nav
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// Update active navigation on scroll
function updateActiveNav() {
  const scrollY = window.pageYOffset;

  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute('id');
    
    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

window.addEventListener('scroll', updateActiveNav);

// ============================================
// 4. NAVBAR BACKGROUND ON SCROLL
// ============================================
const navbar = document.querySelector('nav');

function updateNavbar() {
  if (window.scrollY > 50) {
    navbar?.classList.add('scrolled'); // cuma tambah kelas style
  } else {
    navbar?.classList.remove('scrolled');
  }
}

window.addEventListener('scroll', updateNavbar);


window.addEventListener('scroll', updateNavbar);

// ============================================
// 5. SCROLL PROGRESS BAR
// ============================================
function updateScrollProgress() {
  const scrollProgress = document.createElement('div');
  scrollProgress.className = 'scroll-progress';
  document.body.appendChild(scrollProgress);

  window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    scrollProgress.style.width = scrolled + '%';
  });
}

updateScrollProgress();

// ============================================
// 6. TYPING EFFECT FOR HERO SECTION
// ============================================
const typingElement = document.querySelector('.typing-effect');

if (typingElement) {
  const texts = [
    'Website Profesional',
    'Solusi Web UMKM',
    'Coding Kustom',
    'Peningkat Penjualan'
  ];
  
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function typeText() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
      typingElement.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      typingElement.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentText.length) {
      // Pause at end of text
      typingSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      typingSpeed = 500;
    }

    setTimeout(typeText, typingSpeed);
  }

  // Start typing effect after page load
  setTimeout(typeText, 1000);
}

// ============================================
// 7. FADE-IN ANIMATION ON SCROLL
// ============================================
const fadeElements = document.querySelectorAll('.fade-in');

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
      // Optional: stop observing after animation
      fadeObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

fadeElements.forEach(element => {
  fadeObserver.observe(element);
});

// ============================================
// 8. SKILL BAR ANIMATION
// ============================================
const skillBars = document.querySelectorAll('.skill-progress');

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const bar = entry.target;
      const width = bar.getAttribute('data-width');
      setTimeout(() => {
        bar.style.width = width;
      }, 200);
      skillObserver.unobserve(bar);
    }
  });
}, { threshold: 0.5 });

skillBars.forEach(bar => {
  bar.style.width = '0%';
  skillObserver.observe(bar);
});

// ============================================
// 9. PORTFOLIO FILTER
// ============================================
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Remove active class from all buttons
    filterButtons.forEach(btn => btn.classList.remove('active'));
    // Add active class to clicked button
    button.classList.add('active');

    const filterValue = button.getAttribute('data-filter');

    portfolioItems.forEach(item => {
      // Hide all items first
      item.style.display = 'none';
      item.style.opacity = '0';

      // Show items based on filter
      if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
        setTimeout(() => {
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
          }, 10);
        }, 100);
      }
    });
  });
});

// ============================================
// 10. FAQ TOGGLE
// ============================================
const faqToggles = document.querySelectorAll('.faq-toggle');

faqToggles.forEach(toggle => {
  toggle.addEventListener('click', () => {
    const content = toggle.nextElementSibling;
    const icon = toggle.querySelector('i');
    
    // Close all other FAQs
    faqToggles.forEach(otherToggle => {
      if (otherToggle !== toggle) {
        const otherContent = otherToggle.nextElementSibling;
        const otherIcon = otherToggle.querySelector('i');
        otherContent.classList.add('hidden');
        otherIcon.style.transform = 'rotate(0deg)';
      }
    });

    // Toggle current FAQ
    content.classList.toggle('hidden');
    
    if (content.classList.contains('hidden')) {
      icon.style.transform = 'rotate(0deg)';
    } else {
      icon.style.transform = 'rotate(180deg)';
    }
  });
});

// ============================================
// 11. PACKAGE SELECTION BUTTONS
// ============================================
const choosePackageButtons = document.querySelectorAll('.choose-package');
const viewExamplesButtons = document.querySelectorAll('.view-examples');

// Handle "Pilih Paket" buttons
choosePackageButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    e.preventDefault();
    const phoneNumber = '62895413263355'; // Ganti dengan nomor WhatsApp Anda
    const packageName = button.getAttribute('data-package');
    
    // Pesan yang lebih interaktif
    const message = `Halo! Saya tertarik dengan Paket ${packageName} yang ada di website Anda. Kapan kita bisa diskusikan prosesnya?`;
    
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  });
});


// Handle "Lihat Contoh" buttons
viewExamplesButtons.forEach(button => {
  button.addEventListener('click', () => {
    const packageName = button.getAttribute('data-package');
    
    // Scroll to portfolio section
    const portfolioSection = document.getElementById('portfolio');
    if (portfolioSection) {
      portfolioSection.scrollIntoView({ behavior: 'smooth' });
      
      // After scrolling, filter portfolio based on package
      setTimeout(() => {
        const filterMap = {
          'Ready': 'ready',
          'Grow': 'grow',
          'E-Commerce': 'ecommerce'
        };
        
        const filterValue = filterMap[packageName];
        const filterBtn = document.querySelector(`[data-filter="${filterValue}"]`);
        
        if (filterBtn) {
          filterBtn.click();
        }
      }, 800);
    }
  });
});

// ============================================
// 12. CONTACT FORM HANDLER
// ============================================
const contactForm = document.getElementById('contactForm');
const successModal = document.getElementById('successModal');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');

    // Create WhatsApp message
    const whatsappMessage = `*Pesan Baru dari Website*\n\n*Nama:* ${name}\n*Email:* ${email}\n*Pesan:*\n${message}`;
    const whatsappUrl = `https://wa.me/62895413263355?text=${encodeURIComponent(whatsappMessage)}`;

    // Open WhatsApp
    window.open(whatsappUrl, '_blank');

    // Show success modal
    showModal();

    // Reset form
    contactForm.reset();
  });
}

// ============================================
// 13. MODAL FUNCTIONS
// ============================================
function showModal() {
  if (successModal) {
    successModal.classList.remove('invisible', 'opacity-0');
    successModal.classList.add('visible', 'opacity-100');
  }
}

function closeModal() {
  if (successModal) {
    successModal.classList.add('invisible', 'opacity-0');
    successModal.classList.remove('visible', 'opacity-100');
  }
}

// Close modal when clicking outside
if (successModal) {
  successModal.addEventListener('click', (e) => {
    if (e.target === successModal) {
      closeModal();
    }
  });
}

// Make closeModal available globally
window.closeModal = closeModal;

// ============================================
// 14. BACK TO TOP BUTTON
// ============================================
const backToTopBtn = document.getElementById('backToTop');

function updateBackToTop() {
  if (window.scrollY > 300) {
    backToTopBtn?.classList.remove('invisible', 'opacity-0');
    backToTopBtn?.classList.add('visible', 'opacity-100');
  } else {
    backToTopBtn?.classList.add('invisible', 'opacity-0');
    backToTopBtn?.classList.remove('visible', 'opacity-100');
  }
}

window.addEventListener('scroll', updateBackToTop);

if (backToTopBtn) {
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// ============================================
// 15. LAZY LOADING IMAGES
// ============================================
const images = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.getAttribute('data-src');
      img.removeAttribute('data-src');
      imageObserver.unobserve(img);
    }
  });
});

images.forEach(img => imageObserver.observe(img));

// ============================================
// 16. PERFORMANCE OPTIMIZATION
// ============================================
// Debounce function for scroll events
function debounce(func, wait = 10) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Apply debounce to scroll handlers
const debouncedScrollHandler = debounce(() => {
  updateActiveNav();
  updateNavbar();
  updateBackToTop();
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// ============================================
// 17. CONSOLE MESSAGE
// ============================================
console.log('%c🚀 Firdaus Web Developer', 'color: #facc15; font-size: 20px; font-weight: bold;');
console.log('%cWebsite ini dibuat dengan ❤️ untuk UMKM Indonesia', 'color: #6b4226; font-size: 14px;');
console.log('%cHubungi: +62 895-4132-63355', 'color: #25D366; font-size: 14px;');

// ============================================
// 18. INITIALIZE ON DOM READY
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  // Initial calls
  updateActiveNav();
  updateNavbar();
  updateBackToTop();
  
  // Add loaded class to body
  document.body.classList.add('loaded');
  
  console.log('✅ Website loaded successfully!');
});