/**
 * E-PORTFOLIO — MAIN JAVASCRIPT
 * Geodetic Engineering Student Portfolio
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
  initScrollEffects();
  initModal();
  initDocumentHandlers();
  initDynamicYear();
  initFilterTabs();
});

/* ---------- Navbar Scroll & Active Link ---------- */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelectorAll('.nav-links a');
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';

  // Highlight current page in navbar
  navLinks.forEach(link => {
    const linkHref = link.getAttribute('href');
    if (linkHref === currentPath || (currentPath === '' && linkHref === 'index.html')) {
      link.classList.add('active');
      const parentDropdown = link.closest('.nav-dropdown');
      if (parentDropdown) {
        const toggle = parentDropdown.querySelector('.nav-dropdown-toggle');
        if (toggle) toggle.classList.add('active');
      }
    } else {
      link.classList.remove('active');
    }
  });

  // If current page is certificates.html or trainings.html, ensure parent toggle is active
  if (currentPath === 'certificates.html' || currentPath === 'trainings.html') {
    const parentToggle = document.querySelector('.nav-dropdown-toggle');
    if (parentToggle) parentToggle.classList.add('active');
  }

  // Scroll effect on navbar
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  });
}

/* ---------- Mobile Menu Toggle ---------- */
function initMobileMenu() {
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (!navToggle || !navLinks) return;

  navToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = navLinks.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close when clicking any nav link
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('open');
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // Close when clicking outside menu
  document.addEventListener('click', (e) => {
    if (navLinks.classList.contains('open') && !navLinks.contains(e.target) && !navToggle.contains(e.target)) {
      navToggle.classList.remove('open');
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });

  // Reset state on window resize past mobile breakpoint
  window.addEventListener('resize', () => {
    if (window.innerWidth > 1180 && navLinks.classList.contains('open')) {
      navToggle.classList.remove('open');
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });

  // Dropdown outside-click & mouseleave handlers
  const navDropdown = document.querySelector('.nav-dropdown');
  if (navDropdown) {
    document.addEventListener('click', (e) => {
      if (!navDropdown.contains(e.target)) {
        navDropdown.classList.remove('open');
      }
    });
    navDropdown.addEventListener('mouseleave', () => {
      navDropdown.classList.remove('open');
    });
  }
}

/* ---------- Scroll Reveal & Back to Top ---------- */
function initScrollEffects() {
  // Intersection Observer for scroll animations
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Animate progress bars if present
          const bars = entry.target.querySelectorAll('.skill-bar-fill');
          bars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            if (width) bar.style.width = width;
          });
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    reveals.forEach(el => observer.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('visible'));
  }

  // Back to Top Button
  const backToTopBtn = document.querySelector('.back-to-top');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

/* ---------- Lightbox Modal for Certificates & Images ---------- */
function initModal() {
  const modal = document.getElementById('previewModal');
  if (!modal) return;

  const modalImg = modal.querySelector('#modalImage');
  const modalTitle = modal.querySelector('#modalTitle');
  const modalIssuer = modal.querySelector('#modalIssuer');
  const modalDate = modal.querySelector('#modalDate');
  const modalDesc = modal.querySelector('#modalDesc');
  const modalDownload = modal.querySelector('#modalDownload');
  const closeBtn = modal.querySelector('.modal-close');

  function openModal(data) {
    if (modalImg) modalImg.src = data.image || '';
    if (modalImg) modalImg.alt = data.title || 'Document Preview';
    if (modalTitle) modalTitle.textContent = data.title || 'Document Preview';
    if (modalIssuer) modalIssuer.textContent = data.issuer ? `Issued by: ${data.issuer}` : '';
    if (modalDate) modalDate.textContent = data.date ? `Date: ${data.date}` : '';
    if (modalDesc) modalDesc.textContent = data.desc || '';

    const isDoc = (data.title && data.title.toLowerCase().includes('documentation')) || 
                  (data.file && data.file.toLowerCase().includes('geostem'));

    const modalHeaderIcon = modal.querySelector('.modal-header-title i');
    if (modalHeaderIcon) {
      modalHeaderIcon.className = isDoc ? 'fa-solid fa-image' : 'fa-solid fa-award';
      modalHeaderIcon.style.color = 'var(--color-gold)';
    }

    if (modalDownload) {
      if (data.file) {
        modalDownload.href = data.file;
        modalDownload.setAttribute('download', data.downloadName || '');
        modalDownload.innerHTML = `<i class="fa-solid fa-download"></i> ${isDoc ? 'Download Documentation' : 'Download Certificate'}`;
        modalDownload.style.display = 'inline-flex';
      } else {
        modalDownload.href = '#';
        modalDownload.onclick = (e) => {
          e.preventDefault();
          alert('Placeholder: You can link your actual PDF or certificate file here once uploaded.');
        };
      }
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Triggers
  document.querySelectorAll('[data-modal-target]').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const card = trigger.closest('.card') || trigger.closest('.timeline-item') || trigger;
      const data = {
        title: trigger.getAttribute('data-title') || card.querySelector('.card-title')?.textContent || 'Document',
        issuer: trigger.getAttribute('data-issuer') || card.querySelector('.card-issuer')?.textContent || '',
        date: trigger.getAttribute('data-date') || card.querySelector('.card-date')?.textContent || '',
        desc: trigger.getAttribute('data-desc') || card.querySelector('.card-text')?.textContent || '',
        image: trigger.getAttribute('data-image') || card.querySelector('img')?.src || '',
        file: trigger.getAttribute('data-file') || '',
        downloadName: trigger.getAttribute('data-download-name') || ''
      };
      openModal(data);
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ---------- Document Download & Preview Placeholders ---------- */
function initDocumentHandlers() {
  document.querySelectorAll('.btn-download-placeholder').forEach(btn => {
    btn.addEventListener('click', (e) => {
      if (!btn.getAttribute('href') || btn.getAttribute('href') === '#' || btn.getAttribute('href').startsWith('javascript')) {
        e.preventDefault();
        const docName = btn.getAttribute('data-doc-name') || 'document';
        alert(`Document Placeholder: Replace this link with your actual file in the "docs/" folder (e.g., docs/${docName.toLowerCase().replace(/\\s+/g, '_')}.pdf).`);
      }
    });
  });
}

/* ---------- Dynamic Year in Footer ---------- */
function initDynamicYear() {
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

/* ---------- Filter Tabs (Categories) ---------- */
function initFilterTabs() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const filterCards = document.querySelectorAll('[data-category]');

  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      filterCards.forEach(card => {
        const categories = card.getAttribute('data-category')?.split(' ') || [];
        if (filter === 'all' || categories.includes(filter)) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}
