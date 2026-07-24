/* ===================================================
   ZENIQOR — Jewellery Design Consultancy
   JavaScript Interactions
   =================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ─── Header scroll effect ───
  const header = document.getElementById('site-header');
  const backToTop = document.getElementById('back-to-top');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 60);
    backToTop.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  // ─── Hamburger / Mobile Nav ───
  const hamburger = document.getElementById('hamburger-btn');
  const mobileNav = document.getElementById('mobile-nav');
  hamburger.addEventListener('click', () => {
    const open = hamburger.classList.toggle('open');
    mobileNav.classList.toggle('open', open);
  });
  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileNav.classList.remove('open');
    });
  });

  // ─── Hero Rotating Words ───
  const words = ['Design', 'Costing', 'Craft', 'Vision', 'Art'];
  let wordIndex = 0;
  const wordEl = document.getElementById('rotating-word');
  setInterval(() => {
    wordEl.classList.add('fading');
    setTimeout(() => {
      wordIndex = (wordIndex + 1) % words.length;
      wordEl.textContent = words[wordIndex];
      wordEl.classList.remove('fading');
    }, 350);
  }, 2800);

  // ─── Sparkle Field (hero) ───
  const sparkleField = document.getElementById('sparkle-field');
  if (sparkleField) {
    for (let i = 0; i < 30; i++) {
      const spark = document.createElement('div');
      spark.className = 'sparkle';
      spark.style.left = Math.random() * 100 + '%';
      spark.style.top = Math.random() * 100 + '%';
      spark.style.setProperty('--duration', (2 + Math.random() * 4) + 's');
      spark.style.setProperty('--delay', (Math.random() * 5) + 's');
      spark.style.width = (2 + Math.random() * 3) + 'px';
      spark.style.height = spark.style.width;
      sparkleField.appendChild(spark);
    }
  }

  // ─── Testimonials Slider ───
  const testiCards = document.querySelectorAll('.testi-card');
  const testiDots = document.querySelectorAll('.testi-dot');
  let currentTesti = 0;

  function setTestimonial(idx) {
    testiCards.forEach(c => c.classList.remove('active'));
    testiDots.forEach(d => d.classList.remove('active'));
    testiCards[idx]?.classList.add('active');
    testiDots[idx]?.classList.add('active');
    currentTesti = idx;
  }

  testiDots.forEach((dot, i) => {
    dot.addEventListener('click', () => setTestimonial(i));
  });

  // Auto-rotate testimonials
  setInterval(() => {
    setTestimonial((currentTesti + 1) % testiCards.length);
  }, 5000);

  // ─── Contact Form ───
  const form = document.getElementById('contact-form');
  const formSuccess = document.getElementById('form-success');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = document.getElementById('submit-btn');
    btn.disabled = true;
    btn.innerHTML = '<span>Sending...</span>';

    try {
      const formData = new FormData(form);

      const response = await fetch('https://formsubmit.co/ajax/zeniqor.cs.pvt.ltd@gmail.com', {
        method: 'POST',
        body: formData
      });

      const result = await response.json();

      if (result.success) {
        form.style.display = 'none';
        formSuccess.style.display = 'block';
      } else {
        throw new Error(result.message || 'Submission failed');
      }
    } catch (error) {
      btn.disabled = false;
      btn.innerHTML = '<span>Send Inquiry</span><svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M2 9l14-7-7 14V9H2z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>';
      alert('Something went wrong. Please try again or email us directly at zeniqor.cs.pvt.ltd@gmail.com');
    }
  });

  // ─── Back to Top ───
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ─── Scroll Reveal Animations ───
  const animateEls = document.querySelectorAll(
    '.service-card, .stat-item, .step-card, .value-item, .about-card, .ops-card, .de-item, .web-card, .prod-step-content, .cad-visual-card'
  );
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Add stagger delay based on sibling position
        const siblings = entry.target.parentElement.children;
        const idx = Array.from(siblings).indexOf(entry.target);
        entry.target.style.transitionDelay = (idx * 0.08) + 's';
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'none';
        revealObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  animateEls.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(28px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    revealObs.observe(el);
  });

  // ─── Counter Animation ───
  const counters = document.querySelectorAll('.count-number');
  const counterObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.closest('[data-count]').dataset.count);
        const duration = 1800;
        const start = performance.now();
        const tick = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.round(eased * target);
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        counterObs.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => counterObs.observe(c));

  // ─── Cost sheet row animation ───
  const costRows = document.querySelectorAll('.cs-row');
  const costObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const rows = entry.target.querySelectorAll('.cs-row');
        rows.forEach((row, i) => {
          row.style.opacity = '0';
          row.style.transform = 'translateX(-12px)';
          row.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
          setTimeout(() => {
            row.style.opacity = '1';
            row.style.transform = 'none';
          }, i * 100);
        });
        costObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  const costSheet = document.querySelector('.cost-sheet-card');
  if (costSheet) costObs.observe(costSheet);

  // ─── Smooth anchor scrolling with offset ───
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

});
