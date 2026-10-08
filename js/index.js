document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('main .section');
    const links = document.querySelectorAll('.links a');
    const dots = document.querySelectorAll('.section-dot');

    function changeLinkState() {
        const probe = window.innerHeight * 0.34;
        let index = 0;
        sections.forEach((section, i) => {
            if (section.getBoundingClientRect().top <= probe) index = i;
        });

        links.forEach(link => link.classList.remove('active'));
        if (index >= 0 && index < links.length) {
            links[index].classList.add('active');
        }

        dots.forEach((dot, i) => {
            const on = i === index;
            dot.classList.toggle('active', on);
            if (on) dot.setAttribute('aria-current', 'true');
            else dot.removeAttribute('aria-current');
        });
    }

    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    const backToTop = document.getElementById('back-to-top');
    const themeToggle = document.getElementById('theme-toggle');

    function applyTheme(theme, persist) {
        document.documentElement.setAttribute('data-theme', theme);
        if (persist) localStorage.setItem('theme', theme);
        const light = theme === 'light';
        if (themeToggle) {
            themeToggle.setAttribute('aria-pressed', String(light));
            themeToggle.setAttribute('aria-label', light ? 'Switch to dark mode' : 'Switch to light mode');
        }
        const meta = document.querySelector('meta[name="theme-color"]');
        if (meta) meta.setAttribute('content', light ? '#f4f1ea' : '#070829');
    }

    applyTheme(document.documentElement.getAttribute('data-theme') || 'dark', false);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const next = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
            applyTheme(next, true);
        });
    }

    const emailOpen = document.getElementById('email-open');
    const contactDialog = document.getElementById('contact-dialog');
    const contactEmail = document.getElementById('contact-email');
    const contactCopy = document.getElementById('contact-copy');
    const contactClose = document.getElementById('contact-close');
    let copyTimer;

    function copyEmail() {
        if (!contactEmail || !contactCopy) return;
        const address = contactEmail.textContent.trim();
        const markCopied = () => {
            contactCopy.textContent = 'Copied';
            clearTimeout(copyTimer);
            copyTimer = setTimeout(() => {
                contactCopy.textContent = 'Copy';
            }, 1600);
        };
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(address).then(markCopied).catch(() => {});
        }
    }

    if (emailOpen && contactDialog) {
        emailOpen.addEventListener('click', () => {
            if (contactCopy) contactCopy.textContent = 'Copy';
            contactDialog.showModal();
        });
        contactClose.addEventListener('click', () => contactDialog.close());
        contactDialog.addEventListener('click', (event) => {
            if (event.target === contactDialog) contactDialog.close();
        });
        if (contactCopy) contactCopy.addEventListener('click', copyEmail);
    }

    let ticking = false;
    function onScroll() {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                changeLinkState();
                if (backToTop) {
                    backToTop.classList.toggle('show', window.scrollY > 400);
                }
                ticking = false;
            });
            ticking = true;
        }
    }

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', e => {
            const targetId = anchor.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (!target) return;
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
            if (navLinks) navLinks.classList.remove('open');
            if (hamburger) hamburger.setAttribute('aria-expanded', 'false');
        });
    });

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            const isOpen = navLinks.classList.toggle('open');
            hamburger.setAttribute('aria-expanded', String(isOpen));
        });
    }

    const typewriter = document.getElementById("typewriter");
    const texts = [
        "Aspiring Full Stack Developer",
        "Backend & UI/UX Enthusiast",
        "Coding Since 2023"
    ];

    let index = 0;
    let isDeleting = false;
    let count = 0;
    const speed = 100;
    const pause = 1500;

    function type() {
        const current = texts[count % texts.length];
        const visibleText = current.substring(0, index);

        if (typewriter) {
            typewriter.innerHTML = `<span>${visibleText}</span><span class="cursor"></span>`;
        }

        if (!isDeleting && index === current.length) {
            isDeleting = true;
            setTimeout(type, pause);
        } else if (isDeleting && index === 0) {
            isDeleting = false;
            count++;
            setTimeout(type, 300);
        } else {
            index += isDeleting ? -1 : 1;
            setTimeout(type, isDeleting ? speed / 2 : speed);
        }
    }

    type();
});

window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    preloader.classList.add('hidden');
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const reveals = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });

  reveals.forEach(reveal => {
    observer.observe(reveal);
  });
});
