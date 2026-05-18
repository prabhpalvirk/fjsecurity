// Current Year for Footer
document.getElementById('year').textContent = new Date().getFullYear();

// Sticky Navigation
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const links = document.querySelectorAll('.nav-links li a');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when a link is clicked
links.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Scroll Reveal Animations
function reveal() {
    var reveals = document.querySelectorAll(".reveal");

    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 100;

        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        }
    }
}

window.addEventListener("scroll", reveal);
reveal(); // Trigger on load

/* FAQ animation: smooth accordion behavior and accessible states */
function initFAQ() {
    const items = document.querySelectorAll('.faq-item');
    items.forEach(item => {
        const summary = item.querySelector('summary');
        const body = item.querySelector('.faq-body');
        const toggle = item.querySelector('.faq-toggle');
        // initialize aria
        summary.setAttribute('role','button');
        summary.setAttribute('aria-expanded', item.hasAttribute('open') ? 'true' : 'false');
        // if already open on load, set max-height
        if (item.hasAttribute('open')) body.style.maxHeight = body.scrollHeight + 'px';
        // initialize toggle icon
        if (toggle) {
            toggle.innerHTML = item.hasAttribute('open') ? '<i class="fa-solid fa-minus"></i>' : '<i class="fa-solid fa-plus"></i>';
        }

        summary.addEventListener('click', function(e) {
            e.preventDefault();
            const isOpen = item.hasAttribute('open');
            // close others
            document.querySelectorAll('.faq-item[open]').forEach(openItem => {
                if (openItem !== item) {
                    openItem.removeAttribute('open');
                    const ob = openItem.querySelector('.faq-body');
                    if (ob) ob.style.maxHeight = null;
                    openItem.querySelector('summary').setAttribute('aria-expanded','false');
                }
            });

            if (isOpen) {
                item.removeAttribute('open');
                body.style.maxHeight = null;
                summary.setAttribute('aria-expanded','false');
                if (toggle) toggle.innerHTML = '<i class="fa-solid fa-plus"></i>';
            } else {
                item.setAttribute('open','');
                body.style.maxHeight = body.scrollHeight + 'px';
                summary.setAttribute('aria-expanded','true');
                if (toggle) toggle.innerHTML = '<i class="fa-solid fa-minus"></i>';
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', initFAQ);

/* Smooth internal anchor scrolling (improves UX when clicking nav links) */
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href.length > 1) {
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                history.replaceState && history.replaceState(null, null, href);
            }
        }
    });
});