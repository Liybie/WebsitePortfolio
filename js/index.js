document.addEventListener('DOMContentLoaded', () => {
    // === Section highlighting on scroll ===
    const sections = document.querySelectorAll('.section');
    const links = document.querySelectorAll('.links a');

    // Updates active link based on scroll position
    function changeLinkState() {
        let index = sections.length;
        // Loop backwards through sections to find the one currently in view
        while (--index && window.scrollY + 100 < sections[index].offsetTop);
        
        // Remove 'active' class from all links
        links.forEach(link => link.classList.remove('active'));
        
        // Add 'active' class to the current link
        if (index >= 0 && index < links.length) {
            links[index].classList.add('active');
        }
    }

    // === Navigation elements ===
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');

    // === Back to top button ===
    const backToTop = document.getElementById('back-to-top');

    // Combined scroll handler, throttled with requestAnimationFrame
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

    // Initialize on page load and listen for scroll
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // === Smooth scroll for anchor links ===
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', e => {
            const targetId = anchor.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (!target) return;
            e.preventDefault();
            // Scroll smoothly to the section
            target.scrollIntoView({ behavior: 'smooth' });
            // Close the mobile menu after navigating
            navLinks.classList.remove('open');
            hamburger.setAttribute('aria-expanded', 'false');
        });
    });

    // === Hamburger menu toggle for mobile navigation ===
    // Toggle mobile nav visibility on hamburger click
    hamburger.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('open');
        hamburger.setAttribute('aria-expanded', String(isOpen));
    });

    // === Typewriter effect for dynamic text ===
    const typewriter = document.getElementById("typewriter");
    const texts = [
        "Aspiring Full Stack Developer",
        "Backend & UI/UX Enthusiast",
        "Coding Since 2023"
    ];

    let index = 0;          // Position in the current text
    let isDeleting = false; // Flag for deleting state
    let count = 0;          // Index of current phrase
    const speed = 100;      // Typing speed
    const pause = 1500;     // Pause after full text is typed

    // Function to handle typing and deleting animation
    function type() {
        const current = texts[count % texts.length]; // Get current phrase
        const visibleText = current.substring(0, index); // Get visible part

        if (typewriter) {
            typewriter.innerHTML = `<span>${visibleText}</span><span class="cursor"></span>`;
        }

        // When text is fully typed, pause then start deleting
        if (!isDeleting && index === current.length) {
            isDeleting = true;
            setTimeout(type, pause);
        } 
        // When text is fully deleted, move to next phrase
        else if (isDeleting && index === 0) {
            isDeleting = false;
            count++;
            setTimeout(type, 300);
        } 
        // Typing or deleting characters
        else {
            index += isDeleting ? -1 : 1;
            setTimeout(type, isDeleting ? speed / 2 : speed);
        }
    }

    // Start the typewriter animation
    type();
});
// === Hide preloader after page load ===
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    preloader.classList.add('hidden');
  }
});
// ==== Scroll Reveal Animation ====
document.addEventListener("DOMContentLoaded", () => {
  const reveals = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target); // optional: remove if you want repeat on scroll
      }
    });
  }, {
    threshold: 0.1
  });

  reveals.forEach(reveal => {
    observer.observe(reveal);
  });
});
