// main.js — interactions du portfolio Aliocha Deflou v2

(function () {
    'use strict';

    // ---------- 1. Scroll reveals ----------
    const reveals = document.querySelectorAll('[data-reveal]');
    if (reveals.length && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const delay = entry.target.dataset.revealDelay || 0;
                    setTimeout(() => entry.target.classList.add('is-visible'), Number(delay));
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });
        reveals.forEach((el) => observer.observe(el));
    } else {
        reveals.forEach((el) => el.classList.add('is-visible'));
    }

    // ---------- 2. Nav scroll state + hamburger ----------
    const nav = document.getElementById('nav');
    const navHamburger = document.getElementById('nav-hamburger');
    const navLinks = document.getElementById('nav-links');

    if (nav) {
        let ticking = false;
        const updateNav = () => {
            if (window.scrollY > 50) nav.classList.add('scrolled');
            else nav.classList.remove('scrolled');
            ticking = false;
        };
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateNav);
                ticking = true;
            }
        }, { passive: true });
    }

    if (navHamburger && navLinks) {
        navHamburger.addEventListener('click', () => {
            const isOpen = navLinks.classList.toggle('open');
            navHamburger.setAttribute('aria-expanded', String(isOpen));
        });
        navLinks.querySelectorAll('a').forEach((a) => {
            a.addEventListener('click', () => {
                navLinks.classList.remove('open');
                navHamburger.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // ---------- 3. Custom cursor (desktop only) ----------
    const isDesktop = window.matchMedia('(hover: hover) and (min-width: 900px)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isDesktop && !reducedMotion) {
        const dot = document.createElement('div');
        dot.className = 'cursor-dot';
        document.body.appendChild(dot);

        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let dotX = mouseX;
        let dotY = mouseY;
        const lerp = 0.18;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        const animate = () => {
            dotX += (mouseX - dotX) * lerp;
            dotY += (mouseY - dotY) * lerp;
            dot.style.transform = `translate(${dotX}px, ${dotY}px) translate(-50%, -50%)`;
            requestAnimationFrame(animate);
        };
        animate();

        document.querySelectorAll('a, button, [role="button"]').forEach((el) => {
            el.addEventListener('mouseenter', () => dot.classList.add('is-hovering'));
            el.addEventListener('mouseleave', () => dot.classList.remove('is-hovering'));
        });
    }

    // ---------- 4. Hero word reveal ----------
    const tagline = document.querySelector('.hero-tagline');
    if (tagline && !reducedMotion) {
        const wrapWords = (node) => {
            const newChildren = [];
            node.childNodes.forEach((child) => {
                if (child.nodeType === Node.TEXT_NODE) {
                    const words = child.textContent.split(/(\s+)/);
                    words.forEach((w) => {
                        if (w.trim()) {
                            const span = document.createElement('span');
                            span.className = 'word';
                            span.textContent = w;
                            newChildren.push(span);
                        } else {
                            newChildren.push(document.createTextNode(w));
                        }
                    });
                } else if (child.nodeType === Node.ELEMENT_NODE) {
                    wrapWords(child);
                    newChildren.push(child);
                }
            });
            node.innerHTML = '';
            newChildren.forEach((c) => node.appendChild(c));
        };
        wrapWords(tagline);

        const words = tagline.querySelectorAll('.word');
        words.forEach((w, i) => {
            w.style.transitionDelay = `${300 + i * 60}ms`;
        });

        requestAnimationFrame(() => {
            requestAnimationFrame(() => tagline.classList.add('revealed'));
        });
    } else if (tagline) {
        tagline.classList.add('revealed');
    }

})();
