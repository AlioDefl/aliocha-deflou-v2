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

    // ---------- 6. Scroll progress bar (top of viewport) ----------
    if (!reducedMotion) {
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        document.body.appendChild(progressBar);
        rafScrollEffect(() => {
            const max = document.documentElement.scrollHeight - window.innerHeight;
            const progress = max > 0 ? window.scrollY / max : 0;
            progressBar.style.transform = `scaleX(${progress})`;
        });
    }

    // ---------- 7. Section titles — masked word-by-word reveal ----------
    const titleSelectors = '.section-title, .pd-title, .contact-title, .projects-header h2';
    const splitWordsForMaskedReveal = (node) => {
        const newChildren = [];
        node.childNodes.forEach((child) => {
            if (child.nodeType === Node.TEXT_NODE) {
                const words = child.textContent.split(/(\s+)/);
                words.forEach((w) => {
                    if (w.trim()) {
                        const mask = document.createElement('span');
                        mask.className = 'word-mask';
                        const inner = document.createElement('span');
                        inner.className = 'word-inner';
                        inner.textContent = w;
                        mask.appendChild(inner);
                        newChildren.push(mask);
                    } else {
                        newChildren.push(document.createTextNode(w));
                    }
                });
            } else if (child.nodeType === Node.ELEMENT_NODE) {
                if (child.tagName === 'BR') {
                    newChildren.push(child);
                } else {
                    splitWordsForMaskedReveal(child);
                    newChildren.push(child);
                }
            }
        });
        node.innerHTML = '';
        newChildren.forEach((c) => node.appendChild(c));
    };

    document.querySelectorAll(titleSelectors).forEach((title) => {
        if (title.dataset.titleSplit) return;
        title.dataset.titleSplit = '1';
        if (!reducedMotion) {
            splitWordsForMaskedReveal(title);
            const innerWords = title.querySelectorAll('.word-inner');
            innerWords.forEach((w, i) => { w.style.transitionDelay = `${i * 80}ms`; });
        }
    });

    if ('IntersectionObserver' in window && !reducedMotion) {
        const titleObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('title-in');
                    titleObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.25, rootMargin: '0px 0px -10% 0px' });
        document.querySelectorAll(titleSelectors).forEach((t) => titleObserver.observe(t));
    } else {
        document.querySelectorAll(titleSelectors).forEach((t) => t.classList.add('title-in'));
    }

    // ---------- 8. Stat number counters ----------
    if ('IntersectionObserver' in window && !reducedMotion) {
        const statObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                const el = entry.target;
                const text = el.textContent.trim();
                const match = text.match(/^(\d+)(.*)$/);
                if (!match) {
                    statObserver.unobserve(el);
                    return;
                }
                const target = parseInt(match[1], 10);
                const suffix = match[2];
                const duration = 1400;
                const start = performance.now();
                const tick = (now) => {
                    const t = Math.min(1, (now - start) / duration);
                    const eased = 1 - Math.pow(1 - t, 3);
                    el.textContent = Math.round(target * eased) + suffix;
                    if (t < 1) requestAnimationFrame(tick);
                };
                requestAnimationFrame(tick);
                statObserver.unobserve(el);
            });
        }, { threshold: 0.5 });
        document.querySelectorAll('.about-stat-num').forEach((el) => statObserver.observe(el));
    }

    // ---------- 9. Tag wave reveal on enter ----------
    if ('IntersectionObserver' in window && !reducedMotion) {
        const tagObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                const tags = entry.target.querySelectorAll('.tag');
                tags.forEach((t, i) => { t.style.transitionDelay = `${i * 50}ms`; });
                entry.target.classList.add('tags-in');
                tagObserver.unobserve(entry.target);
            });
        }, { threshold: 0.3 });
        document.querySelectorAll('.featured-stack, .project-mini-tags, .featured-meta').forEach((el) => tagObserver.observe(el));
    }

    // ---------- 10. Project mini cards — 3D mouse tilt ----------
    if (isDesktop && !reducedMotion) {
        document.querySelectorAll('.project-mini').forEach((card) => {
            let isHover = false;
            card.addEventListener('mouseenter', () => { isHover = true; card.classList.add('tilting'); });
            card.addEventListener('mousemove', (e) => {
                if (!isHover) return;
                const rect = card.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width - 0.5;
                const y = (e.clientY - rect.top) / rect.height - 0.5;
                card.style.transform = `perspective(1000px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateZ(10px)`;
            });
            card.addEventListener('mouseleave', () => {
                isHover = false;
                card.classList.remove('tilting');
                card.style.transform = '';
            });
        });
    }

    // ---------- 11. Marquee runs at constant CSS-defined speed (velocity reactive removed — caused jumps) ----------

    // ---------- 12. Status pill — subtle parallax ----------
    const statusPill = document.querySelector('.status-pill');
    if (statusPill && !reducedMotion) {
        rafScrollEffect(() => {
            const y = window.scrollY * 0.15;
            statusPill.style.transform = `translateY(${-y}px)`;
        });
    }

    // ---------- 14. Tilt on featured-card content (without breaking stack effect) ----------
    if (isDesktop && !reducedMotion) {
        document.querySelectorAll('.featured-card .featured-text').forEach((textBlock) => {
            const card = textBlock.closest('.featured-card');
            if (!card) return;
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width - 0.5;
                const y = (e.clientY - rect.top) / rect.height - 0.5;
                textBlock.style.transform = `perspective(800px) rotateY(${x * 4}deg) rotateX(${-y * 4}deg)`;
            });
            card.addEventListener('mouseleave', () => {
                textBlock.style.transform = '';
            });
        });
    }

})();
