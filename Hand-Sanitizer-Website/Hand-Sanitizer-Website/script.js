/* =========================================================
   PREPARATION OF HAND SANITIZER — SCRIPT.JS
   Handles: loader, typing effect, nav, scroll reveal,
   progress bar, lightbox, gallery slideshow, ripple, etc.
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- LOADING SCREEN ---------- */
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => {
    setTimeout(() => loader.classList.add('hidden'), 600);
  });
  // Fallback in case 'load' fires slowly on GitHub Pages assets
  setTimeout(() => loader.classList.add('hidden'), 2500);

  /* ---------- TYPING EFFECT (HERO TITLE) ---------- */
  const typedTitleEl = document.getElementById('typedTitle');
  const fullTitle = 'Preparation of Hand Sanitizer';
  let typeIndex = 0;

  function typeTitle() {
    if (typeIndex <= fullTitle.length) {
      typedTitleEl.textContent = fullTitle.slice(0, typeIndex);
      typeIndex++;
      setTimeout(typeTitle, 65);
    }
  }
  setTimeout(typeTitle, 900);

  /* ---------- NAVBAR SCROLL STATE ---------- */
  const navbar = document.getElementById('navbar');
  const progressBar = document.getElementById('progressBar');
  const backToTop = document.getElementById('backToTop');
  const timelineProgress = document.getElementById('timelineProgress');
  const timelineEl = document.querySelector('.timeline');

  function onScroll() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    navbar.classList.toggle('scrolled', scrollTop > 40);
    progressBar.style.width = scrollPercent + '%';
    backToTop.classList.toggle('show', scrollTop > 500);

    // Timeline progress line
    if (timelineEl) {
      const rect = timelineEl.getBoundingClientRect();
      const viewportH = window.innerHeight;
      const total = rect.height;
      let filled = viewportH * 0.75 - rect.top;
      filled = Math.max(0, Math.min(filled, total));
      timelineProgress.style.height = (filled / total) * 100 + '%';
    }

    updateActiveNavLink();
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- MOBILE NAV TOGGLE ---------- */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('open');
    navLinks.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });

  /* ---------- ACTIVE NAV LINK ON SCROLL ---------- */
  const sections = document.querySelectorAll('section[id], header[id]');
  const navAnchors = document.querySelectorAll('.nav-link');

  function updateActiveNavLink() {
    let currentId = sections[0] ? sections[0].id : '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 120;
      if (window.scrollY >= top) currentId = sec.id;
    });
    navAnchors.forEach(a => {
      a.classList.toggle('active-link', a.getAttribute('href') === '#' + currentId);
    });
  }

  /* ---------- BACK TO TOP ---------- */
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------- CURSOR GLOW ---------- */
  const cursorGlow = document.getElementById('cursorGlow');
  window.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
  });

  /* ---------- RIPPLE BUTTON EFFECT ---------- */
  document.querySelectorAll('.ripple-btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
      const rect = this.getBoundingClientRect();
      const ripple = document.createElement('span');
      const size = Math.max(rect.width, rect.height);
      ripple.className = 'ripple';
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 700);
    });
  });

  /* ---------- SCROLL REVEAL (INTERSECTION OBSERVER) ---------- */
  const revealTargets = document.querySelectorAll(
    '.reveal-fade, .reveal-up, .reveal-left, .reveal-right, ' +
    '.team-card, .tilt-card, .material-card, .gallery-item, ' +
    '.flip-card, .pc-card, .thank-you, .slide-left, .slide-right'
  );

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

  revealTargets.forEach(el => revealObserver.observe(el));

  /* ---------- SMOOTH SCROLL FOR NAV LINKS ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const offset = 70;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ---------- LIGHTBOX ---------- */
  const lightbox = document.getElementById('lightbox');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');

  document.querySelectorAll('.lightbox-trigger').forEach(item => {
    item.addEventListener('click', () => {
      const caption = item.getAttribute('data-caption') || 'Add Image';
      lightboxCaption.textContent = caption;
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }
  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });

  /* ---------- GALLERY AUTO SLIDESHOW ---------- */
  const slideCount = 5;
  const track = document.getElementById('slideshowTrack');
  const dotsWrap = document.getElementById('slideDots');
  let currentSlide = 0;
  let slideTimer;

  if (track) {
    for (let i = 0; i < slideCount; i++) {
      const slide = document.createElement('div');
      slide.className = 'slide';
      slide.innerHTML = `<i class="fa-solid fa-camera-retro"></i><span>Insert Experiment Photo ${i + 1}</span>`;
      track.appendChild(slide);

      const dot = document.createElement('span');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(i));
      dotsWrap.appendChild(dot);
    }

    function goToSlide(index) {
      currentSlide = (index + slideCount) % slideCount;
      track.style.transform = `translateX(-${currentSlide * 100}%)`;
      dotsWrap.querySelectorAll('span').forEach((d, i) => {
        d.classList.toggle('active', i === currentSlide);
      });
    }

    document.getElementById('nextSlide').addEventListener('click', () => {
      goToSlide(currentSlide + 1);
      resetTimer();
    });
    document.getElementById('prevSlide').addEventListener('click', () => {
      goToSlide(currentSlide - 1);
      resetTimer();
    });

    function startTimer() {
      slideTimer = setInterval(() => goToSlide(currentSlide + 1), 4000);
    }
    function resetTimer() {
      clearInterval(slideTimer);
      startTimer();
    }
    startTimer();
  }

  /* ---------- 3D TILT FOR TEAM CARDS ---------- */
  document.querySelectorAll('.tilt-card').forEach(card => {
    const inner = card.querySelector('.tilt-inner');
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rotateX = ((y / rect.height) - 0.5) * -14;
      const rotateY = ((x / rect.width) - 0.5) * 14;
      inner.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });
    card.addEventListener('mouseleave', () => {
      inner.style.transform = 'rotateX(0) rotateY(0) translateY(0)';
    });
  });

});
