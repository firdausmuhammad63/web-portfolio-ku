
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

  // Tutup menu otomatis setelah klik link
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

// === PILIH PAKET BUTTON ===
document.querySelectorAll(".choose-package").forEach(button => {
  button.addEventListener("click", function () {
    const packageName = this.getAttribute("data-package");
    const packageSelect = document.querySelector("select[name='package']");

    // otomatis pilih paket sesuai tombol
    if (packageSelect) {
      packageSelect.value = packageName.toLowerCase();
    }

    // scroll ke judul form pemesanan
    const title = document.getElementById("formPemesananTitle");
    if (title) {
      const yOffset = -40; // lebih kecil biar judul makin nempel
      const y =
        title.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({ top: y, behavior: "smooth" });
    }
  });
});

// === FORM SUBMIT + RESET + MODAL (EmailJS) ===
const form = document.getElementById("contactForm");
if (form) {
  form.addEventListener("submit", async e => {
    e.preventDefault();

    const submitBtn = e.target.querySelector('button[type="submit"]');
    const submitText = submitBtn?.querySelector(".submit-text");

    if (submitText) {
      submitText.textContent = "Mengirim...";
      submitBtn.disabled = true;
    }

    try {
      // Ambil paket & nominal
      const packageSelect = document.getElementById("package-select");
      const paketInput = document.getElementById("paket-input");
      const nominalInput = document.getElementById("nominal-input");

      if (packageSelect && paketInput && nominalInput) {
        paketInput.value = packageSelect.options[packageSelect.selectedIndex].text;

        let harga = "";
        switch (packageSelect.value.toLowerCase()) {
          case "basic": harga = "Rp 1.500.000"; break;
          case "standard": harga = "Rp 2.500.000"; break;
          case "premium": harga = "Rp 4.000.000"; break;
          case "custom": harga = "-"; break;
        }
        nominalInput.value = harga;
      }

      // Kirim ke EmailJS
      await emailjs.sendForm(
        "service_hq07lgq",
        "template_byo0ofd",
        "#contactForm",
        "p7xNVreuIYAZ4wiJf"
      );

      form.reset();
      paketInput.value = "";
      nominalInput.value = "";

      // Modal sukses
      const modal = document.getElementById("successModal");
      if (modal) {
        modal.classList.remove("invisible", "opacity-0");
        modal.classList.add("visible", "opacity-100");
      }
    } catch (err) {
      console.error("Gagal mengirim:", err);
      alert("Gagal mengirim pesan. Silakan coba lagi.");
    } finally {
      if (submitText) {
        submitText.textContent = "Kirim Pesan";
        submitBtn.disabled = false;
      }
    }
  });
}

function closeModal() {
  const modal = document.getElementById("successModal");
  if (modal) {
    modal.classList.add("invisible", "opacity-0");
    modal.classList.remove("visible", "opacity-100");
  }
}
const successModal = document.getElementById("successModal");
if (successModal) {
  successModal.addEventListener("click", e => {
    if (e.target === e.currentTarget) closeModal();
  });
}

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
