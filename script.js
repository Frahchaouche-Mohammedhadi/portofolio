// Navbar scroll effect
const navbar = document.getElementById('navbar');
const navLinks = document.getElementById('navLinks');
const navToggle = document.getElementById('navToggle');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
  highlightActiveLink();
});

// Mobile menu toggle
navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('active');
  navLinks.classList.toggle('open');
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-link').forEach((link) => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('active');
    navLinks.classList.remove('open');
  });
});

// Active link highlighting based on scroll position
function highlightActiveLink() {
  const sections = document.querySelectorAll('section[id]');
  const currentScroll = window.scrollY + 100;

  sections.forEach((section) => {
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;

    if (currentScroll >= top && currentScroll < bottom) {
      const currentId = section.getAttribute('id');
      document.querySelectorAll('.nav-link').forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
      });
    }
  });
}

// Animated counters for about section stats
const counters = document.querySelectorAll('.stat-number');
const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseInt(counter.dataset.target, 10);
        animateCounter(counter, target);
        counterObserver.unobserve(counter);
      }
    });
  },
  { threshold: 0.5 }
);

counters.forEach((counter) => counterObserver.observe(counter));

function animateCounter(element, target) {
  const duration = 1500;
  const start = performance.now();

  function update(currentTime) {
    const progress = Math.min((currentTime - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
    element.textContent = Math.floor(eased * target);
    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

// Scroll reveal animations
const revealElements = document.querySelectorAll('.skill-card, .project-card, .about-content, .contact-content');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), index * 0);
      }
    });
  },
  { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
);

revealElements.forEach((el) => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});

// Contact form submission
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!name || !email || !message) {
    showFormStatus('Please fill out all fields.', false);
    return;
  }

  const button = contactForm.querySelector('button[type="submit"]');
  const originalText = button.textContent;
  button.textContent = 'Sending...';
  button.disabled = true;

  // Simulate form submission (replace with a real endpoint)
  setTimeout(() => {
    button.textContent = originalText;
    button.disabled = false;
    contactForm.reset();
    showFormStatus("Thanks for your message! I'll get back to you soon.", true);
  }, 1200);
});

function showFormStatus(message, isSuccess) {
  const existing = document.querySelector('.form-status');
  if (existing) existing.remove();

  const status = document.createElement('p');
  status.className = 'form-status';
  status.textContent = message;
  status.style.cssText = `
    margin-top: 12px;
    padding: 12px 16px;
    border-radius: 8px;
    font-size: 0.9rem;
    color: ${isSuccess ? '#4ade80' : '#f87171'};
    background: ${isSuccess ? 'rgba(74, 222, 128, 0.1)' : 'rgba(248, 113, 113, 0.1)'};
    border: 1px solid ${isSuccess ? 'rgba(74, 222, 128, 0.3)' : 'rgba(248, 113, 113, 0.3)'};
  `;

  contactForm.appendChild(status);

  setTimeout(() => status.remove(), 5000);
}

// Smooth scroll for hero buttons (fallback for older browsers)
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      window.scrollTo({
        top: target.offsetTop - 72,
        behavior: 'smooth',
      });
    }
  });
});