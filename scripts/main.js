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

    // ---------- 5. Scroll-driven transforms (rAF-throttled) ----------
    function rafScrollEffect(callback) {
        let ticking = false;
        const handler = () => {
            if (!ticking) {
                requestAnimationFrame(() => { callback(); ticking = false; });
                ticking = true;
            }
        };
        window.addEventListener('scroll', handler, { passive: true });
        window.addEventListener('resize', handler, { passive: true });
        handler();
    }

    // 5a. Featured images — 3D pivot on scroll
    const featuredImages = document.querySelectorAll('.featured-image');
    if (featuredImages.length && !reducedMotion) {
        rafScrollEffect(() => {
            featuredImages.forEach((el) => {
                const rect = el.getBoundingClientRect();
                const wh = window.innerHeight || document.documentElement.clientHeight;
                if (rect.bottom < 0 || rect.top > wh) return;
                const center = rect.top + rect.height / 2;
                const fromCenter = (center - wh / 2) / wh;
                const rotateY = fromCenter * 14;
                const rotateX = -fromCenter * 6;
                const translateY = fromCenter * 18;
                el.style.transform = `perspective(1400px) rotateY(${rotateY.toFixed(2)}deg) rotateX(${rotateX.toFixed(2)}deg) translateY(${translateY.toFixed(1)}px)`;
            });
        });
    }

    // 5b. Featured cards — stack/retract effect (sticky + scale based on next card position)
    const featuredCards = document.querySelectorAll('.featured-list .featured-card');
    if (featuredCards.length > 1 && !reducedMotion) {
        rafScrollEffect(() => {
            const wh = window.innerHeight || document.documentElement.clientHeight;
            featuredCards.forEach((card, i) => {
                const next = featuredCards[i + 1];
                if (!next) {
                    card.style.removeProperty('--stack-scale');
                    card.style.removeProperty('--stack-opacity');
                    card.style.removeProperty('--stack-blur');
                    return;
                }
                const nextRect = next.getBoundingClientRect();
                const enter = wh * 0.85;
                const exit = wh * 0.15;
                let progress = (enter - nextRect.top) / (enter - exit);
                progress = Math.max(0, Math.min(1, progress));
                card.style.setProperty('--stack-scale', String(1 - progress * 0.08));
                card.style.setProperty('--stack-opacity', String(1 - progress * 0.5));
                card.style.setProperty('--stack-blur', `${progress * 4}px`);
            });
        });
    }

    // 5c. Hero name — letter-by-letter reveal
    const heroName = document.querySelector('.hero-name');
    if (heroName && !reducedMotion && !heroName.dataset.split) {
        heroName.dataset.split = '1';
        const splitText = (node) => {
            const newChildren = [];
            node.childNodes.forEach((child) => {
                if (child.nodeType === Node.TEXT_NODE) {
                    [...child.textContent].forEach((ch) => {
                        if (ch.trim() === '') {
                            newChildren.push(document.createTextNode(ch));
                            return;
                        }
                        const span = document.createElement('span');
                        span.className = 'letter';
                        span.textContent = ch;
                        newChildren.push(span);
                    });
                } else if (child.nodeType === Node.ELEMENT_NODE) {
                    if (child.tagName === 'BR') {
                        newChildren.push(child);
                    } else {
                        splitText(child);
                        newChildren.push(child);
                    }
                }
            });
            node.innerHTML = '';
            newChildren.forEach((c) => node.appendChild(c));
        };
        splitText(heroName);
        const letters = heroName.querySelectorAll('.letter');
        letters.forEach((l, i) => {
            l.style.transitionDelay = `${i * 35}ms`;
        });
        requestAnimationFrame(() => {
            requestAnimationFrame(() => heroName.classList.add('letters-in'));
        });
    }

    // 5d. Magnetic hover on contact buttons (subtle attraction toward cursor)
    if (isDesktop && !reducedMotion) {
        document.querySelectorAll('.contact-btn').forEach((btn) => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                btn.style.transform = `translate(${x * 0.15}px, ${y * 0.2}px)`;
            });
            btn.addEventListener('mouseleave', () => {
                btn.style.transform = '';
            });
        });
    }

})();
