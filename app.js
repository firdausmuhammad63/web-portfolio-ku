// === Mobile Menu ===
const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const closeMenuBtn = document.getElementById("close-menu");
const mobileMenu = document.getElementById("mobile-menu");

if (mobileMenuBtn && closeMenuBtn && mobileMenu) {
  mobileMenuBtn.addEventListener("click", () => {
    mobileMenu.classList.add("active");
  });
  closeMenuBtn.addEventListener("click", () => {
    mobileMenu.classList.remove("active");
  });
  document.querySelectorAll("#mobile-menu a").forEach(link => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("active");
    });
  });
}

// === Scroll Nav Active State ===
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(sec => {
    const secTop = sec.offsetTop - 100;
    if (scrollY >= secTop) {
      current = sec.getAttribute("id");
    }
  });
  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

// === Scroll Animations (fade-in) ===
const fadeElements = document.querySelectorAll(".fade-in");
if (fadeElements.length) {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );
  fadeElements.forEach(el => observer.observe(el));
}

// === Typing Effect ===
const typingEl = document.querySelector(".typing-effect");
if (typingEl) {
  const texts = ["Web Developer", "UI/UX Designer", "Freelancer"];
  let i = 0, j = 0, currentText = "", isDeleting = false;
  function type() {
    currentText = texts[i];
    typingEl.textContent = isDeleting
      ? currentText.substring(0, j--)
      : currentText.substring(0, j++);
    if (!isDeleting && j === currentText.length + 1) {
      isDeleting = true;
      setTimeout(type, 1500);
    } else if (isDeleting && j === 0) {
      isDeleting = false;
      i = (i + 1) % texts.length;
      setTimeout(type, 300);
    } else {
      setTimeout(type, isDeleting ? 50 : 100);
    }
  }
  type();
}

// === Skill Bar Animation ===
const skillBars = document.querySelectorAll(".skill-progress");
if (skillBars.length) {
  const skillObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const width = bar.dataset.width || bar.style.width;
        bar.style.width = "0";
        setTimeout(() => { bar.style.width = width; }, 200);
        skillObserver.unobserve(bar);
      }
    });
  }, { threshold: 0.5 });
  skillBars.forEach(bar => skillObserver.observe(bar));
}

// === Portfolio Filter ===
const filterBtns = document.querySelectorAll(".filter-btn");
const portfolioItems = document.querySelectorAll(".portfolio-item");

filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    filterBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const filter = btn.dataset.filter;
    portfolioItems.forEach(item => {
      if (filter === "all" || item.dataset.category === filter) {
        item.style.display = "block";
        setTimeout(() => item.classList.add("fade-in"), 100);
      } else {
        item.style.display = "none";
      }
    });
  });
});

// === Smooth Scroll Extra (Safari fix) ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// === FORM PAKET MASUK WA ===
document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".choose-package");
  
  // Add styles to document head
  const styleEl = document.createElement('style');
  styleEl.innerHTML = `
    .form-overlay {
      position: fixed;
      inset: 0;
      background-color: rgba(0, 0, 0, 0.6);
      backdrop-filter: blur(5px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    
    .form-container {
      background: white;
      border-radius: 16px;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
      padding: 2rem;
      width: 100%;
      max-width: 450px;
      transform: translateY(20px);
      transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      position: relative;
      overflow: hidden;
    }
    
    .form-container::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 6px;
      background: linear-gradient(90deg, #B5651D, #AB5F1A);
    }
    
    .form-header {
      display: flex;
      align-items: center;
      margin-bottom: 1.5rem;
    }
    
    .form-header-icon {
      background: linear-gradient(135deg, #B5651D, #AB5F1A);
      width: 48px;
      height: 48px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 1rem;
      box-shadow: 0 4px 12px rgba(255, 179, 71, 0.3);
    }
    
    .form-title {
      font-size: 1.5rem;
      font-weight: 700;
      color: #333;
      margin: 0;
    }
    
    .package-badge {
      display: inline-flex;
      background: linear-gradient(135deg, #B5651D, #AB5F1A);
      color: white;
      align-items: center;
      font-weight: 600;
      padding: 0.5rem 1rem;
      border-radius: 999px;
      font-size: 0.875rem;
      margin-bottom: 1.5rem;
      box-shadow: 0 4px 12px rgba(181, 101, 29, 0.2);
    }

    .form-group {
      margin-bottom: 1.25rem;
      position: relative;
    }
    
    .form-label {
      display: block;
      font-size: 0.875rem;
      font-weight: 500;
      color: #4B5563;
      margin-bottom: 0.5rem;
    }
    
    .form-input {
      width: 100%;
      padding: 0.75rem 1rem;
      border: 2px solid #E5E7EB;
      border-radius: 10px;
      font-size: 1rem;
      transition: all 0.2s ease;
      background: #F9FAFB;
    }
    
    .form-input:focus {
      outline: none;
      border-color: #FFB347;
      background: white;
      box-shadow: 0 0 0 4px rgba(255, 179, 71, 0.1);
    }
    
    .form-input.error {
      border-color: #EF4444;
      background: #FEF2F2;
    }
    
    .error-message {
      color: #EF4444;
      font-size: 0.75rem;
      margin-top: 0.25rem;
      display: none;
    }
    
    .submit-button {
      width: 100%;
      background: linear-gradient(135deg, #B5651D, #AB5F1A);
      color: white;
      font-weight: 600;
      padding: 0.875rem;
      border-radius: 10px;
      font-size: 1rem;
      border: none;
      cursor: pointer;
      transition: all 0.2s ease;
      position: relative;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(255, 179, 71, 0.3);
    }

    .submit-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgba(255, 179, 71, 0.4);
    }
    
    .submit-button:active {
      transform: translateY(0);
    }
    
    .submit-button .button-text {
      position: relative;
      z-index: 1;
      transition: all 0.2s ease;
    }
    
    .submit-button .loading-spinner {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 20px;
      height: 20px;
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      border-top-color: white;
      opacity: 0;
      visibility: hidden;
      transition: all 0.2s ease;
      animation: spin 0.8s linear infinite;
    }
    
    .submit-button.loading .button-text {
      opacity: 0;
    }
    
    .submit-button.loading .loading-spinner {
      opacity: 1;
      visibility: visible;
    }
    
    @keyframes spin {
      to { transform: translate(-50%, -50%) rotate(360deg); }
    }
    
    .close-button {
      position: absolute;
      top: 1rem;
      right: 1rem;
      background: #F3F4F6;
      border: none;
      width: 32px;
      height: 32px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.2s ease;
      color: #6B7280;
    }
    
    .close-button:hover {
      background: #E5E7EB;
      color: #1F2937;
    }
    
    .form-footer {
      margin-top: 1.5rem;
      text-align: center;
      font-size: 0.875rem;
      color: #6B7280;
    }
    
    .form-footer {
      display: flex;
      align-items: center;
      items-center;
      justify-content: center;
      font-size: 0.875rem;
      color: #6B7280;
      margin-top: 1.5rem;
    }

    .form-footer svg {
      margin-right: 5px; /* Sesuaikan nilai jarak sesuai kebutuhan */
    }

    .show-form {
      opacity: 1;
    }
    
    .show-form .form-container {
      transform: translateY(0);
    }
    
    .success-message {
      text-align: center;
      padding: 2rem 1rem;
    }
    
    .success-icon {
      width: 64px;
      height: 64px;
      background: linear-gradient(135deg, #34D399, #10B981);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 1.5rem;
      color: white;
      box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
    }
    
    .success-title {
      font-size: 1.5rem;
      font-weight: 700;
      color: #333;
      margin-bottom: 0.5rem;
    }
    
    .success-text {
      color: #6B7280;
      margin-bottom: 1.5rem;
    }
    
    @media (max-width: 640px) {
      .form-container {
        max-width: 90%;
        padding: 1.5rem;
      }
    }
  `;
  document.head.appendChild(styleEl);

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      const packageName = button.dataset.package;
      
      // Remove old form if exists
      const oldForm = document.getElementById("orderForm");
      if (oldForm) oldForm.remove();
      
      // Create popup form
      const formOverlay = document.createElement("div");
      formOverlay.id = "orderForm";
      formOverlay.className = "form-overlay";
      
      formOverlay.innerHTML = `
        <div class="form-container">
          <button id="closeForm" class="close-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
            </svg>
          </button>
          
          <div class="form-header">
            <div class="form-header-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" viewBox="0 0 16 16">
                <path d="M8 0c-.69 0-1.843.265-2.928.56-1.11.3-2.229.655-2.887.87a1.54 1.54 0 0 0-1.044 1.262c-.596 4.477.787 7.795 2.465 9.99a11.777 11.777 0 0 0 2.517 2.453c.386.273.744.482 1.048.625.28.132.581.24.829.24s.548-.108.829-.24a7.159 7.159 0 0 0 1.048-.625 11.775 11.775 0 0 0 2.517-2.453c1.678-2.195 3.061-5.513 2.465-9.99a1.541 1.541 0 0 0-1.044-1.263 62.467 62.467 0 0 0-2.887-.87C9.843.266 8.69 0 8 0zm0 5a1.5 1.5 0 0 1 .5 2.915l.385 1.99a.5.5 0 0 1-.491.595h-.788a.5.5 0 0 1-.49-.595l.384-1.99A1.5 1.5 0 0 1 8 5z"/>
              </svg>
            </div>
            <h2 class="form-title">Formulir Pemesanan</h2>
          </div>
          
          <div class="package-badge">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16" style="margin-right: 4px;">
              <path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5l2.404.961L10.404 2l-2.218-.887zm3.564 1.426L5.596 5 8 5.961 14.154 3.5l-2.404-.961zm3.25 1.7-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923l6.5 2.6zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464L7.443.184z"/>
            </svg> Paket ${packageName}
          </div>

          <form id="waForm">
            <div class="form-group">
              <label for="nama" class="form-label">Nama Lengkap</label>
              <input type="text" id="nama" class="form-input" required>
              <div class="error-message" id="nama-error">Mohon masukkan nama lengkap Anda</div>
            </div>
            
            <div class="form-group">
              <label for="email" class="form-label">Alamat Email</label>
              <input type="email" id="email" class="form-input" required>
              <div class="error-message" id="email-error">Mohon masukkan alamat email yang valid</div>
            </div>
            
            <div class="form-group">
              <label for="wa" class="form-label">Nomor WhatsApp</label>
              <input type="tel" id="wa" class="form-input" required>
              <div class="error-message" id="wa-error">Mohon masukkan nomor WhatsApp yang valid</div>
            </div>
            
            <button type="submit" class="submit-button">
              <span class="button-text">Kirim Sekarang</span>
              <span class="loading-spinner"></span>
            </button>
          </form>
          
          <div class="form-footer">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
            </svg>
            Data Anda aman dan terlindungi
          </div>
        </div>
      `;
      
      document.body.appendChild(formOverlay);
      
      // Show form with animation
      setTimeout(() => {
        formOverlay.classList.add("show-form");
      }, 10);
      
      // Close form
      document.getElementById("closeForm").addEventListener("click", () => {
        formOverlay.classList.remove("show-form");
        setTimeout(() => formOverlay.remove(), 300);
      });
      
      formOverlay.addEventListener("click", e => {
        if (e.target === formOverlay) {
          formOverlay.classList.remove("show-form");
          setTimeout(() => formOverlay.remove(), 300);
        }
      });
      
      // Form validation and submission
      const waForm = document.getElementById("waForm");
      const submitButton = waForm.querySelector(".submit-button");
      
      waForm.addEventListener("submit", e => {
        e.preventDefault();
        
        // Reset errors
        document.querySelectorAll(".form-input").forEach(input => {
          input.classList.remove("error");
          document.getElementById(`${input.id}-error`).style.display = "none";
        });
        
        // Validate form
        let isValid = true;
        
        const nama = document.getElementById("nama");
        const email = document.getElementById("email");
        const wa = document.getElementById("wa");
        
        if (!nama.value.trim()) {
          nama.classList.add("error");
          document.getElementById("nama-error").style.display = "block";
          isValid = false;
        }
        
        if (!email.value.trim() || !validateEmail(email.value)) {
          email.classList.add("error");
          document.getElementById("email-error").style.display = "block";
          isValid = false;
        }
        
        if (!wa.value.trim() || !validatePhone(wa.value)) {
          wa.classList.add("error");
          document.getElementById("wa-error").style.display = "block";
          isValid = false;
        }
        
        if (isValid) {
          // Show loading state
          submitButton.classList.add("loading");
          
          // Simulate processing (remove in production)
          setTimeout(() => {
            // Format WhatsApp number
            let waNumber = wa.value.replace(/\D/g, '');
            if (waNumber.startsWith('0')) {
              waNumber = '62' + waNumber.substring(1);
            } else if (!waNumber.startsWith('62')) {
              waNumber = '62' + waNumber;
            }

            const tujuan = "62895413263355"; // nomor WhatsApp tujuan

            const pesan = encodeURIComponent(`Halo, saya ingin pesan website:
          - Paket: ${packageName}
          - Nama: ${nama.value}
          - Email: ${email.value}
          - WhatsApp: ${waNumber}`);

            // Show success message before redirecting
            formOverlay.querySelector(".form-container").innerHTML = `
              <div class="success-message">
                <div class="success-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                  </svg>
                </div>
                <h3 class="success-title">Berhasil!</h3>
                <p class="success-text">Anda akan dialihkan ke WhatsApp dalam beberapa detik...</p>
              </div>
            `;

            // Redirect to WhatsApp
            setTimeout(() => {
              window.location.href = `https://wa.me/${tujuan}?text=${pesan}`;
              formOverlay.classList.remove("show-form");
              setTimeout(() => formOverlay.remove(), 300);
            }, 1500);
          }, 800);
        }
      });
      
      // Focus on first input
      setTimeout(() => {
        document.getElementById("nama").focus();
      }, 300);
    });
  });
  
  // Helper functions for validation
  function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  
  function validatePhone(phone) {
    // Basic validation - can be enhanced for specific country formats
    const re = /^[0-9+\s()-]{8,15}$/;
    return re.test(String(phone));
  }
});

// === Modal Close on Outside Click ===
function closeModal() {
  const modal = document.getElementById("successModal");
  if (modal) {
    modal.classList.add("invisible", "opacity-0");
    modal.classList.remove("visible", "opacity-100");
    document.querySelector(".modal-content").classList.add("transform", "-translate-y-4", "opacity-0");
  }
}

const successModal = document.getElementById("successModal");
if (successModal) {
  successModal.addEventListener("click", e => {
    if (e.target === e.currentTarget) closeModal();
  });
}

      // FAQ Toggle
      const faqToggles = document.querySelectorAll('.faq-toggle');
      faqToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
          const content = toggle.nextElementSibling;
          const icon = toggle.querySelector('i');
          
          if (content.classList.contains('hidden')) {
            content.classList.remove('hidden');
            icon.style.transform = 'rotate(180deg)';
          } else {
            content.classList.add('hidden');
            icon.style.transform = 'rotate(0)';
          }
        });
      });

// === PORTFOLIO LINK HANDLER ===
document.querySelectorAll(".portfolio-item a").forEach(link => {
  link.addEventListener("click", e => {
    const url = link.getAttribute("href");
    if (!url || url === "#") {
      e.preventDefault();
      alert("Halaman portfolio belum tersedia.");
    }
  });
});

// === PRELOADER ===
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  if (preloader) preloader.style.display = "none";
});

// === BACK TO TOP BUTTON ===
const backToTopBtn = document.getElementById("backToTop");
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTopBtn.classList.remove("opacity-0", "invisible");
    backToTopBtn.classList.add("opacity-100", "visible");
  } else {
    backToTopBtn.classList.add("opacity-0", "invisible");
    backToTopBtn.classList.remove("opacity-100", "visible");
  }
});
backToTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// === VIEW EXAMPLES BUTTON HANDLER ===
document.querySelectorAll(".view-examples").forEach(button => {
  button.addEventListener("click", () => {
    const packageName = button.dataset.package;
    let portfolioURL = "#";
    if (packageName === "Basic") portfolioURL = "https://website-servis-ac.netlify.app/";
    else if (packageName === "Standard") portfolioURL = "https://web-paket-standard.netlify.app/";
    else if (packageName === "Premium") portfolioURL = "https://website-toko-kue.netlify.app/";
    window.open(portfolioURL, "_blank");
  });
});