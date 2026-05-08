# Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reconstruire le portfolio d'Aliocha Deflou en site one-pager + 3 pages projets détaillées, esthétique Alture-inspired (charbon/crème/argile, dark mode, typographie éditoriale), 100% statique (HTML/CSS/JS vanilla), déployé sur GitHub Pages dans un repo séparé `aliocha-deflou-v2`.

**Architecture:** Site statique sans build. Une feuille CSS commune (`styles/main.css`) avec variables et composants réutilisés sur les 4 pages. Un fichier JS commun (`scripts/main.js`) pour scroll reveals, nav sticky, cursor custom et marquee. Pages projets héritent du même squelette HTML.

**Tech Stack:** HTML5 sémantique, CSS3 (custom properties, clamp, prefers-reduced-motion), JavaScript vanilla (IntersectionObserver, requestAnimationFrame), Inter + Fraunces + IBM Plex Mono via Google Fonts, déploiement GitHub Pages via Actions.

**Spec de référence:** `docs/superpowers/specs/2026-05-08-portfolio-redesign-design.md`

---

## File Structure

Vue d'ensemble des fichiers à créer ou modifier :

```
aliocha-deflou-v2/
├── .github/workflows/static.yml         CRÉÉ — workflow GitHub Pages
├── .gitignore                            EXISTE — sera enrichi
├── README.md                             CRÉÉ
├── index.html                            CRÉÉ — one-pager
├── 404.html                              CRÉÉ
├── sitemap.xml                           CRÉÉ
├── robots.txt                            CRÉÉ
├── CV_Aliocha_DEFLOU.pdf                 COPIÉ depuis aliocha-deflou
├── projets/
│   ├── trading-bot.html                  CRÉÉ
│   ├── bug-of-thrones.html               CRÉÉ
│   └── cabinet-reflexologie.html         CRÉÉ
├── styles/
│   └── main.css                          CRÉÉ — toutes les règles
├── scripts/
│   └── main.js                           CRÉÉ — toutes les interactions
├── assets/
│   ├── source/                           USER DEPOSE (gitignored)
│   ├── img/                              CRÉÉ — WebP optimisé
│   └── icons/
│       ├── favicon.png                   COPIÉ
│       └── og-image.png                  COPIÉ
└── docs/
    └── superpowers/
        ├── specs/                        EXISTE
        └── plans/                        EXISTE (ce fichier)
```

**Responsabilités** :
- `index.html` : structure 11 sections, contenu textuel
- `projets/*.html` : 3 pages détaillées avec structure standardisée
- `styles/main.css` : variables, reset, composants (nav, hero, card, marquee, etc.), media queries, support `prefers-reduced-motion`
- `scripts/main.js` : 5 modules (`reveals`, `nav`, `cursor`, `marquee`, `heroReveal`), tous écrits en IIFE, pas de dépendance

---

## Phases

Le plan est découpé en 7 phases. Chaque phase doit être complète (commit pushé) avant de passer à la suivante. Validation visuelle obligatoire après chaque section de l'index.

| Phase | Tâches | Sortie |
|---|---|---|
| 1. Setup | 1-3 | Repo prêt, CSS foundation, GitHub Actions configuré |
| 2. Index sections | 4-15 | Index complet structurellement (sans interactions) |
| 3. Interactions JS | 16-19 | Animations, sticky nav, cursor, marquee actifs |
| 4. Pages projets | 20-23 | 3 pages détaillées |
| 5. Assets pipeline | 24-25 | Images optimisées, favicon, og-image |
| 6. SEO + a11y | 26-28 | Meta tags, sitemap, 404, audit a11y |
| 7. Deploy | 29-30 | Repo GitHub public, site en ligne, Lighthouse validé |

---

## PHASE 1 — Setup

### Task 1: Project structure & .gitignore

**Files:**
- Create: `aliocha-deflou-v2/index.html` (placeholder)
- Create: `aliocha-deflou-v2/styles/main.css` (vide)
- Create: `aliocha-deflou-v2/scripts/main.js` (vide)
- Create: `aliocha-deflou-v2/projets/.gitkeep`
- Create: `aliocha-deflou-v2/assets/img/.gitkeep`
- Create: `aliocha-deflou-v2/assets/icons/.gitkeep`
- Create: `aliocha-deflou-v2/README.md`
- Modify: `aliocha-deflou-v2/.gitignore` (déjà créé pendant le brainstorm)

- [ ] **Step 1: Vérifier l'état du dépôt local**

```bash
cd "C:/Users/alioc/OneDrive - JUNIA Grande école d'ingénieurs/Desktop/aliocha-deflou-v2"
git status
```

Expected: branche `main`, 1 commit existant (le spec), working tree clean.

- [ ] **Step 2: Créer la structure de dossiers et placeholders**

```bash
mkdir -p projets assets/img assets/icons styles scripts
touch projets/.gitkeep assets/img/.gitkeep assets/icons/.gitkeep
```

- [ ] **Step 3: Créer un `index.html` placeholder minimal**

Fichier `index.html` :

```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Aliocha Deflou — Portfolio v2 (en construction)</title>
</head>
<body>
    <p>En construction.</p>
</body>
</html>
```

- [ ] **Step 4: Créer `styles/main.css` et `scripts/main.js` vides avec un commentaire de tête**

`styles/main.css` :
```css
/* main.css — feuille principale du portfolio Aliocha Deflou v2 */
```

`scripts/main.js` :
```js
// main.js — interactions du portfolio Aliocha Deflou v2
```

- [ ] **Step 5: Créer un `README.md` minimal**

```markdown
# Aliocha Deflou — Portfolio v2

Refonte complète du portfolio personnel d'Aliocha Deflou. Site statique HTML/CSS/JS vanilla, dark mode minimaliste type Alture.

## Stack
HTML5 + CSS3 + JavaScript vanilla. Pas de build, pas de dépendance NPM.

## Lancer en local
Ouvrir `index.html` dans un navigateur. Pour un serveur local rapide :
```bash
python -m http.server 8000
```

## Déploiement
GitHub Pages, push sur `main` déclenche le workflow `static.yml`.

## Spec et plan
- Spec : `docs/superpowers/specs/2026-05-08-portfolio-redesign-design.md`
- Plan : `docs/superpowers/plans/2026-05-08-portfolio-redesign.md`
```

- [ ] **Step 6: Commit**

```bash
git add index.html styles scripts projets assets README.md
git commit -m "Initial scaffold: folders, placeholders, README"
git status
```

Expected: working tree clean, 2 commits sur `main`.

---

### Task 2: GitHub Actions workflow

**Files:**
- Create: `aliocha-deflou-v2/.github/workflows/static.yml`

- [ ] **Step 1: Créer le dossier de workflow**

```bash
mkdir -p .github/workflows
```

- [ ] **Step 2: Créer `static.yml` (copie de l'existant `aliocha-deflou`)**

Contenu :

```yaml
name: Deploy static content to Pages

on:
  push:
    branches: ["main"]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Setup Pages
        uses: actions/configure-pages@v4
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: '.'
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 3: Commit**

```bash
git add .github/workflows/static.yml
git commit -m "Add GitHub Pages deployment workflow"
```

---

### Task 3: CSS foundation (variables, reset, typography, utilities)

**Files:**
- Modify: `aliocha-deflou-v2/styles/main.css`

- [ ] **Step 1: Ouvrir `styles/main.css` et écrire la couche fondation**

Remplace le contenu actuel par :

```css
/* main.css — feuille principale du portfolio Aliocha Deflou v2 */

/* ---------- 1. CSS Variables ---------- */
:root {
    /* Palette */
    --bg: #1a1a1a;
    --bg-elevated: #232323;
    --bg-deep: #0f0f0f;
    --text: #f5f0e8;
    --text-muted: #8a8275;
    --text-faint: #5a5447;
    --accent: #d4a574;
    --accent-hover: #e0b889;
    --border: #2a2a2a;
    --border-strong: #3a3a3a;

    /* Typography */
    --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    --font-serif: 'Fraunces', Georgia, serif;
    --font-mono: 'IBM Plex Mono', 'Courier New', monospace;

    /* Easing */
    --ease-out: cubic-bezier(.4, 0, .2, 1);
    --ease-pop: cubic-bezier(.34, 1.56, .64, 1);

    /* Layout */
    --max-width: 1280px;
    --gutter: 2rem;
}

/* ---------- 2. Reset ---------- */
*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
html { scroll-behavior: smooth; -webkit-font-smoothing: antialiased; }
body {
    font-family: var(--font-sans);
    font-size: 16px;
    line-height: 1.6;
    font-weight: 400;
    background: var(--bg);
    color: var(--text);
    overflow-x: hidden;
}
img, svg, video { display: block; max-width: 100%; height: auto; }
button { font: inherit; border: none; background: none; cursor: pointer; color: inherit; }
a { color: inherit; text-decoration: none; }

/* ---------- 3. Typography utilities ---------- */
.label {
    font-family: var(--font-mono);
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: var(--text-faint);
}
.serif-italic {
    font-family: var(--font-serif);
    font-style: italic;
    font-weight: 300;
    color: var(--accent);
}

/* ---------- 4. Layout utilities ---------- */
.container {
    width: 100%;
    max-width: var(--max-width);
    margin: 0 auto;
    padding: 0 var(--gutter);
}
.section {
    padding: 8rem 0;
}
.section-title {
    font-size: clamp(2rem, 5vw, 3.5rem);
    font-weight: 600;
    letter-spacing: -1.5px;
    line-height: 1.05;
    margin-bottom: 3rem;
}

/* ---------- 5. Reduced motion ---------- */
@media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
    }
}

/* ---------- 6. Skip link ---------- */
.skip-link {
    position: absolute;
    top: -100px;
    left: 0;
    background: var(--accent);
    color: var(--bg);
    padding: 1rem 2rem;
    z-index: 10000;
    font-weight: 500;
    transition: top 0.3s var(--ease-out);
}
.skip-link:focus { top: 0; }
```

- [ ] **Step 2: Mettre à jour le `<head>` de `index.html` pour charger les fonts et le CSS**

Remplace le contenu d'`index.html` par un squelette plus complet :

```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Aliocha Deflou — Étudiant développeur fullstack</title>
    <meta name="description" content="Portfolio d'Aliocha Deflou, étudiant en BUT Informatique à l'IUT de Lille, à la recherche d'une alternance fullstack pour septembre 2026.">
    <meta name="theme-color" content="#1a1a1a">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Fraunces:ital,wght@0,300;0,400;1,300;1,400&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">

    <link rel="stylesheet" href="styles/main.css">
</head>
<body>
    <a href="#main" class="skip-link">Aller au contenu principal</a>
    <main id="main" class="container">
        <p class="label">En construction</p>
        <h1 style="font-size: 4rem; margin-top: 2rem;">Aliocha Deflou.</h1>
    </main>
    <script src="scripts/main.js"></script>
</body>
</html>
```

- [ ] **Step 3: Validation visuelle**

Ouvre `index.html` dans un navigateur :
- Fond charbon `#1a1a1a` ✓
- Texte crème `#f5f0e8` ✓
- Police Inter chargée (titre épais, propre) ✓
- Skip link visible quand on appuie sur Tab ✓

- [ ] **Step 4: Commit**

```bash
git add styles/main.css index.html
git commit -m "Add CSS foundation: palette, typography, utilities"
```

---

## PHASE 2 — Index sections

À chaque task de cette phase, on **ajoute** la section au `index.html` et le bloc CSS correspondant à `styles/main.css`. Validation visuelle obligatoire après chaque task. Commit après chaque task.

### Task 4: Navigation sticky

**Files:**
- Modify: `aliocha-deflou-v2/index.html` (ajout du `<nav>`)
- Modify: `aliocha-deflou-v2/styles/main.css` (bloc nav)

- [ ] **Step 1: Ajouter le bloc CSS nav à la fin de `main.css`**

```css
/* ---------- Nav ---------- */
.nav {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 100;
    background: rgba(26, 26, 26, 0);
    backdrop-filter: blur(0);
    border-bottom: 1px solid transparent;
    transition: background 0.4s var(--ease-out), backdrop-filter 0.4s var(--ease-out), border-color 0.4s var(--ease-out);
}
.nav.scrolled {
    background: rgba(26, 26, 26, 0.85);
    backdrop-filter: blur(20px);
    border-bottom-color: var(--border);
}
.nav-inner {
    max-width: var(--max-width);
    margin: 0 auto;
    padding: 0 var(--gutter);
    height: 72px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
}
.nav-logo {
    font-size: 14px;
    font-weight: 500;
    letter-spacing: -0.3px;
}
.nav-links {
    display: flex;
    gap: 2.5rem;
    list-style: none;
}
.nav-links a {
    font-family: var(--font-mono);
    font-size: 12px;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    color: var(--text-muted);
    transition: color 0.3s var(--ease-out);
}
.nav-links a:hover { color: var(--text); }
.nav-cv {
    padding: 0.65rem 1.4rem;
    background: var(--accent);
    color: var(--bg);
    border-radius: 50px;
    font-size: 13px;
    font-weight: 500;
    transition: background 0.3s var(--ease-out), transform 0.3s var(--ease-out);
}
.nav-cv:hover { background: var(--accent-hover); transform: translateY(-2px); }
.nav-hamburger { display: none; flex-direction: column; gap: 5px; }
.nav-hamburger span { display: block; width: 24px; height: 2px; background: var(--text); transition: all 0.3s var(--ease-out); }

@media (max-width: 700px) {
    .nav-links { display: none; position: fixed; top: 72px; left: 0; right: 0; flex-direction: column; padding: 2rem; gap: 1.5rem; background: rgba(26, 26, 26, 0.98); backdrop-filter: blur(20px); border-bottom: 1px solid var(--border); }
    .nav-links.open { display: flex; }
    .nav-hamburger { display: flex; }
}
```

- [ ] **Step 2: Ajouter le `<header>` avec `<nav>` dans `index.html`, juste après le skip link**

Avant le `<main>`, insère :

```html
<header>
    <nav class="nav" id="nav" role="navigation" aria-label="Navigation principale">
        <div class="nav-inner">
            <a href="#hero" class="nav-logo">Aliocha Deflou</a>
            <ul class="nav-links" id="nav-links">
                <li><a href="#projets">Projets</a></li>
                <li><a href="#stack">Stack</a></li>
                <li><a href="#why">Why</a></li>
                <li><a href="#formations">Formations</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
            <a href="CV_Aliocha_DEFLOU.pdf" class="nav-cv" download>Télécharger CV ↓</a>
            <button class="nav-hamburger" aria-label="Menu" aria-expanded="false" id="nav-hamburger">
                <span></span><span></span><span></span>
            </button>
        </div>
    </nav>
</header>
```

- [ ] **Step 3: Validation visuelle**

Recharge `index.html` :
- Nav fixe en haut, transparent au repos
- Logo à gauche, liens centrés/droite, bouton CV argile à droite
- Hover sur lien : couleur passe à crème claire
- Sur mobile (DevTools < 700px) : hamburger visible, liens cachés

- [ ] **Step 4: Commit**

```bash
git add styles/main.css index.html
git commit -m "Add sticky nav with backdrop blur on scroll"
```

---

### Task 5: Hero section (variation B avec italiques Fraunces)

**Files:**
- Modify: `aliocha-deflou-v2/index.html`
- Modify: `aliocha-deflou-v2/styles/main.css`

- [ ] **Step 1: Ajouter le bloc CSS hero à la fin de `main.css`**

```css
/* ---------- Hero ---------- */
.hero {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 8rem var(--gutter) 4rem;
    max-width: var(--max-width);
    margin: 0 auto;
    position: relative;
}
.hero-top, .hero-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: var(--text-faint);
    font-family: var(--font-mono);
    font-size: 11px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
}
.hero-bottom { padding-top: 2rem; border-top: 1px solid var(--border); }
.hero-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 2rem;
    padding: 4rem 0;
}
.hero-name {
    font-size: clamp(48px, 9vw, 120px);
    font-weight: 700;
    letter-spacing: -3px;
    line-height: 0.92;
}
.hero-name .dot { color: var(--accent); }
.hero-tagline {
    font-size: clamp(18px, 2.4vw, 28px);
    font-weight: 300;
    line-height: 1.4;
    color: var(--text);
    max-width: 720px;
}
.hero-tagline em {
    font-family: var(--font-serif);
    font-style: italic;
    font-weight: 300;
    color: var(--accent);
}
.status-pill {
    display: inline-flex;
    align-items: center;
    gap: 0.65rem;
    padding: 0.65rem 1.2rem;
    border: 1px solid var(--border-strong);
    border-radius: 50px;
    background: rgba(245, 240, 232, 0.03);
    font-family: var(--font-mono);
    font-size: 11px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: var(--text);
    width: fit-content;
}
.status-pill .pulse {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--accent);
    animation: pulse 2s ease-in-out infinite;
}
@keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.4; transform: scale(0.85); }
}
.hero-scroll {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}
.hero-scroll::after {
    content: '↓';
    animation: bounce 2s ease-in-out infinite;
}
@keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(4px); }
}
```

- [ ] **Step 2: Remplacer le contenu de `<main>` par la section hero**

Supprimer le placeholder, ajouter cette structure :

```html
<main id="main">
    <section class="hero" id="hero" aria-label="Présentation">
        <div class="hero-top">
            <span>Aliocha Deflou</span>
            <span>Portfolio · 2026</span>
        </div>
        <div class="hero-content">
            <h1 class="hero-name">Aliocha<br>Deflou<span class="dot">.</span></h1>
            <p class="hero-tagline">
                Je conçois des <em>applications web</em> fullstack — du backend Python à l'interface React.
                <em>À la recherche</em> d'une alternance pour septembre 2026.
            </p>
            <span class="status-pill"><span class="pulse"></span>Disponible · BUT3 + Master · Lille</span>
        </div>
        <div class="hero-bottom">
            <span>BUT Informatique · IUT de Lille</span>
            <span class="hero-scroll">Scroll</span>
        </div>
    </section>
</main>
```

- [ ] **Step 3: Validation visuelle**

- Hero remplit la fenêtre (100vh)
- Nom massif en haut centre, dot argile à la fin
- Tagline avec "applications web" et "À la recherche" en italique argile
- Status pill en bas avec dot pulsant
- Bordure haute et basse en mono uppercase

- [ ] **Step 4: Commit**

```bash
git add styles/main.css index.html
git commit -m "Add hero section with editorial italic accents (variation B)"
```

---

### Task 6: About section

**Files:**
- Modify: `aliocha-deflou-v2/index.html`
- Modify: `aliocha-deflou-v2/styles/main.css`

- [ ] **Step 1: Ajouter le bloc CSS about à la fin de `main.css`**

```css
/* ---------- About ---------- */
.about {
    background: var(--bg);
    padding: 6rem 0;
    border-top: 1px solid var(--border);
}
.about-inner {
    max-width: var(--max-width);
    margin: 0 auto;
    padding: 0 var(--gutter);
    display: grid;
    grid-template-columns: 320px 1fr;
    gap: 4rem;
    align-items: center;
}
.about-portrait {
    width: 320px;
    height: 320px;
    border-radius: 8px;
    overflow: hidden;
    background: var(--bg-elevated);
    position: relative;
}
.about-portrait img { width: 100%; height: 100%; object-fit: cover; }
.about-portrait::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, transparent 50%, rgba(212, 165, 116, 0.15));
    pointer-events: none;
}
.about-text { display: flex; flex-direction: column; gap: 2rem; }
.about-label { font-family: var(--font-mono); font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: var(--accent); }
.about-bio { font-size: clamp(20px, 2vw, 26px); font-weight: 300; line-height: 1.4; color: var(--text); }
.about-bio em { font-family: var(--font-serif); font-style: italic; color: var(--accent); }
.about-stats { display: flex; gap: 3rem; padding-top: 2rem; border-top: 1px solid var(--border); }
.about-stat-num { font-size: 2rem; font-weight: 600; color: var(--text); margin-bottom: 0.25rem; }
.about-stat-label { font-family: var(--font-mono); font-size: 11px; letter-spacing: 1px; text-transform: uppercase; color: var(--text-muted); }

@media (max-width: 768px) {
    .about-inner { grid-template-columns: 1fr; gap: 2rem; }
    .about-portrait { width: 100%; max-width: 320px; }
    .about-stats { flex-direction: column; gap: 1.5rem; }
}
```

- [ ] **Step 2: Ajouter la section après `</section>` du hero**

```html
<section class="about" id="about" aria-label="À propos">
    <div class="about-inner">
        <div class="about-portrait">
            <img src="assets/img/portrait.webp" alt="Portrait d'Aliocha Deflou" loading="lazy" width="320" height="320">
        </div>
        <div class="about-text">
            <span class="about-label">À propos</span>
            <p class="about-bio">
                Étudiant en <em>BUT Informatique</em> à l'IUT de Lille, j'aime construire des choses qui marchent — du backend Python rigoureux jusqu'aux interfaces React polies. <em>Curieux</em>, <em>autonome</em> et <em>livreur</em>.
            </p>
            <div class="about-stats">
                <div>
                    <div class="about-stat-num">BUT2</div>
                    <div class="about-stat-label">IUT de Lille</div>
                </div>
                <div>
                    <div class="about-stat-num">10+</div>
                    <div class="about-stat-label">Projets livrés</div>
                </div>
                <div>
                    <div class="about-stat-num">1</div>
                    <div class="about-stat-label">Client réel</div>
                </div>
            </div>
        </div>
    </div>
</section>
```

- [ ] **Step 3: Validation visuelle**

- Si aucun `assets/img/portrait.webp` n'existe : un carré 320×320 fond `--bg-elevated` (placeholder cassé OK pour cette task)
- Texte bio en gros, "BUT Informatique", "Curieux", "autonome", "livreur" en italique argile
- 3 stats sous la bio : BUT2 / 10+ / 1 client

- [ ] **Step 4: Commit**

```bash
git add styles/main.css index.html
git commit -m "Add about section with portrait and bio"
```

---

### Task 7: Featured Projects (3 cards full-width)

**Files:**
- Modify: `aliocha-deflou-v2/index.html`
- Modify: `aliocha-deflou-v2/styles/main.css`

- [ ] **Step 1: Ajouter le bloc CSS featured à la fin de `main.css`**

```css
/* ---------- Projects section ---------- */
.projects {
    padding: 8rem 0;
    background: var(--bg);
    border-top: 1px solid var(--border);
}
.projects-header {
    max-width: var(--max-width);
    margin: 0 auto 5rem;
    padding: 0 var(--gutter);
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 2rem;
}
.projects-header h2 { font-size: clamp(2rem, 5vw, 4rem); font-weight: 600; letter-spacing: -1.5px; line-height: 1; }
.projects-header h2 em { font-family: var(--font-serif); font-style: italic; font-weight: 300; color: var(--accent); }
.projects-count { font-family: var(--font-mono); font-size: 12px; letter-spacing: 1.5px; text-transform: uppercase; color: var(--text-muted); white-space: nowrap; }

/* Featured cards */
.featured-list {
    max-width: var(--max-width);
    margin: 0 auto;
    padding: 0 var(--gutter);
    display: flex;
    flex-direction: column;
    gap: 8rem;
}
.featured-card {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: center;
}
.featured-card.reverse { direction: rtl; }
.featured-card.reverse > * { direction: ltr; }
.featured-image {
    aspect-ratio: 4 / 3;
    border-radius: 12px;
    overflow: hidden;
    background: var(--bg-elevated);
    border: 1px solid var(--border-strong);
    position: relative;
}
.featured-image img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s var(--ease-out); }
.featured-card:hover .featured-image img { transform: scale(1.04); }
.featured-text { display: flex; flex-direction: column; gap: 1.5rem; }
.featured-meta { display: flex; align-items: center; gap: 1rem; font-family: var(--font-mono); font-size: 11px; letter-spacing: 1.5px; text-transform: uppercase; color: var(--text-muted); }
.featured-meta .num { color: var(--accent); }
.featured-meta .dot { width: 4px; height: 4px; background: var(--text-faint); border-radius: 50%; }
.featured-title { font-size: clamp(28px, 4vw, 48px); font-weight: 600; letter-spacing: -1px; line-height: 1.05; }
.featured-tagline { font-size: 18px; font-weight: 300; line-height: 1.5; color: var(--text-muted); }
.featured-stack { display: flex; flex-wrap: wrap; gap: 0.5rem; }
.tag {
    font-family: var(--font-mono);
    font-size: 11px;
    letter-spacing: 0.5px;
    padding: 0.4rem 0.85rem;
    border: 1px solid var(--border-strong);
    border-radius: 50px;
    color: var(--text-muted);
}
.featured-cta {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: 0.5rem;
    font-family: var(--font-mono);
    font-size: 13px;
    letter-spacing: 0.5px;
    color: var(--accent);
    text-transform: uppercase;
    transition: gap 0.3s var(--ease-out);
    width: fit-content;
}
.featured-cta::after { content: '→'; transition: transform 0.3s var(--ease-out); }
.featured-cta:hover { gap: 1rem; }
.featured-cta:hover::after { transform: translateX(4px); }

@media (max-width: 900px) {
    .featured-card, .featured-card.reverse { grid-template-columns: 1fr; gap: 2rem; direction: ltr; }
}
```

- [ ] **Step 2: Ajouter le CSS du mockup CSS Trading Bot**

À la fin de `main.css` :

```css
/* ---------- Trading Bot CSS mockup ---------- */
.tb-mockup {
    width: 100%;
    height: 100%;
    background: linear-gradient(180deg, #1f1f1f 0%, #161616 100%);
    padding: 1.5rem;
    display: grid;
    grid-template-rows: auto 1fr auto;
    gap: 1rem;
    font-family: var(--font-mono);
    font-size: 10px;
    color: var(--text-muted);
}
.tb-header { display: flex; justify-content: space-between; align-items: center; }
.tb-pair { font-size: 13px; color: var(--text); font-weight: 500; }
.tb-pair .accent { color: var(--accent); }
.tb-controls { display: flex; gap: 0.5rem; }
.tb-controls span { padding: 0.25rem 0.6rem; background: var(--bg-elevated); border-radius: 4px; }
.tb-controls span.active { background: var(--accent); color: var(--bg); }
.tb-chart { position: relative; background: rgba(245, 240, 232, 0.02); border-radius: 6px; overflow: hidden; }
.tb-chart svg { width: 100%; height: 100%; }
.tb-footer { display: flex; justify-content: space-between; }
.tb-footer .stat .num { color: var(--text); font-size: 12px; font-weight: 500; }
.tb-footer .stat .num.up { color: #7ad6a4; }
.tb-footer .stat .num.down { color: #d67a7a; }
.tb-footer .stat .lab { font-size: 9px; letter-spacing: 1px; text-transform: uppercase; }
```

- [ ] **Step 3: Ajouter la section projects avec les 3 featured cards**

Après la section `</section>` about :

```html
<section class="projects" id="projets" aria-label="Projets">
    <header class="projects-header">
        <h2>Projets <em>sélectionnés</em></h2>
        <span class="projects-count">10 projets · 2023 — 2026</span>
    </header>

    <div class="featured-list">
        <!-- Featured 1: Trading Bot -->
        <article class="featured-card">
            <a href="projets/trading-bot.html" class="featured-image" aria-label="Voir l'étude de cas Trading Bot">
                <div class="tb-mockup">
                    <div class="tb-header">
                        <span class="tb-pair">BTC/<span class="accent">USDT</span></span>
                        <div class="tb-controls">
                            <span>1H</span><span class="active">4H</span><span>1D</span>
                        </div>
                    </div>
                    <div class="tb-chart">
                        <svg viewBox="0 0 400 160" preserveAspectRatio="none">
                            <polyline fill="none" stroke="#d4a574" stroke-width="1.5" points="0,120 30,100 60,110 90,80 120,90 150,60 180,75 210,45 240,55 270,30 300,50 330,25 360,40 400,15"/>
                            <polyline fill="none" stroke="rgba(212,165,116,0.2)" stroke-width="1" points="0,140 30,135 60,138 90,125 120,130 150,115 180,120 210,108 240,112 270,98 300,105 330,92 360,100 400,88"/>
                        </svg>
                    </div>
                    <div class="tb-footer">
                        <div class="stat"><div class="num up">+12.4%</div><div class="lab">Backtest 30d</div></div>
                        <div class="stat"><div class="num">SMA 20/50</div><div class="lab">Stratégie</div></div>
                        <div class="stat"><div class="num up">63%</div><div class="lab">Win rate</div></div>
                    </div>
                </div>
            </a>
            <div class="featured-text">
                <div class="featured-meta">
                    <span class="num">01</span>
                    <span class="dot"></span>
                    <span>2026 — En cours</span>
                </div>
                <h3 class="featured-title">Trading Bot Crypto</h3>
                <p class="featured-tagline">Webapp de paper trading algorithmique : choix d'une paire, paramétrage de stratégies (SMA, RSI, Bollinger), backtest sur historique et simulation live via WebSocket. Projet de fin de BUT2 documenté en ADR.</p>
                <div class="featured-stack">
                    <span class="tag">React</span><span class="tag">TypeScript</span><span class="tag">Python</span><span class="tag">FastAPI</span><span class="tag">PostgreSQL</span><span class="tag">Docker</span>
                </div>
                <a href="projets/trading-bot.html" class="featured-cta">Lire l'étude de cas</a>
            </div>
        </article>

        <!-- Featured 2: Bug of Thrones -->
        <article class="featured-card reverse">
            <a href="projets/bug-of-thrones.html" class="featured-image" aria-label="Voir l'étude de cas Bug of Thrones">
                <img src="assets/img/bug-of-thrones-gameplay.webp" alt="Capture du jeu Bug of Thrones" loading="lazy">
            </a>
            <div class="featured-text">
                <div class="featured-meta">
                    <span class="num">02</span>
                    <span class="dot"></span>
                    <span>2025 · Projet d'équipe</span>
                </div>
                <h3 class="featured-title">Bug of Thrones</h3>
                <p class="featured-tagline">Shoot'em up multijoueur temps réel à 2 joueurs. Architecture client/serveur avec serveur autoritaire à 60 FPS via Socket.IO, leaderboard SQLite et 30 tests automatisés.</p>
                <div class="featured-stack">
                    <span class="tag">TypeScript</span><span class="tag">Socket.IO</span><span class="tag">Node.js</span><span class="tag">SQLite</span><span class="tag">Canvas</span><span class="tag">Docker</span>
                </div>
                <a href="projets/bug-of-thrones.html" class="featured-cta">Lire l'étude de cas</a>
            </div>
        </article>

        <!-- Featured 3: Cabinet de Réflexologie -->
        <article class="featured-card">
            <a href="projets/cabinet-reflexologie.html" class="featured-image" aria-label="Voir l'étude de cas Cabinet de Réflexologie">
                <img src="assets/img/reflexologie-hero.webp" alt="Site du Cabinet de Réflexologie de l'Audomarois" loading="lazy">
            </a>
            <div class="featured-text">
                <div class="featured-meta">
                    <span class="num">03</span>
                    <span class="dot"></span>
                    <span>2025 · Client réel</span>
                </div>
                <h3 class="featured-title">Cabinet de Réflexologie</h3>
                <p class="featured-tagline">Site vitrine pour Caroline Saintenoy, réflexologue à Nort-Leulinghem. Direction artistique organique (palette sauge / lin / argile), SEO local et données structurées Schema.org.</p>
                <div class="featured-stack">
                    <span class="tag">HTML5</span><span class="tag">CSS3</span><span class="tag">JavaScript</span><span class="tag">SEO</span><span class="tag">Schema.org</span>
                </div>
                <a href="projets/cabinet-reflexologie.html" class="featured-cta">Lire l'étude de cas</a>
            </div>
        </article>
    </div>
</section>
```

- [ ] **Step 4: Validation visuelle**

- 3 cards full-width empilées verticalement
- Card 1 (Trading Bot) : mockup CSS dashboard à gauche, texte à droite
- Card 2 (Bug of Thrones) : image à droite (alternance), texte à gauche
- Card 3 (Réflexologie) : image à gauche, texte à droite
- Hover sur image : léger zoom

Note : les images Bug of Thrones et Réflexologie afficheront un placeholder cassé tant que les fichiers WebP n'existent pas. Normal pour cette task.

- [ ] **Step 5: Commit**

```bash
git add styles/main.css index.html
git commit -m "Add featured projects section (3 cards) with CSS mockup for Trading Bot"
```

---

### Task 8: Projects grid (7 minor cards)

**Files:**
- Modify: `aliocha-deflou-v2/index.html`
- Modify: `aliocha-deflou-v2/styles/main.css`

- [ ] **Step 1: Ajouter le CSS de la grille à la fin de `main.css`**

```css
/* ---------- Projects grid (7 minor) ---------- */
.projects-grid-wrap {
    max-width: var(--max-width);
    margin: 8rem auto 0;
    padding: 0 var(--gutter);
}
.projects-grid-label {
    font-family: var(--font-mono);
    font-size: 11px;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 2rem;
    display: flex;
    align-items: center;
    gap: 1rem;
}
.projects-grid-label::after {
    content: '';
    flex: 1;
    height: 1px;
    background: var(--border);
}
.projects-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
}
.project-mini {
    padding: 2rem;
    background: var(--bg-elevated);
    border: 1px solid var(--border);
    border-radius: 8px;
    transition: border-color 0.3s var(--ease-out), transform 0.3s var(--ease-out);
    display: flex;
    flex-direction: column;
    gap: 1rem;
}
.project-mini:hover { border-color: var(--accent); transform: translateY(-2px); }
.project-mini-meta { display: flex; justify-content: space-between; align-items: center; font-family: var(--font-mono); font-size: 11px; letter-spacing: 1px; text-transform: uppercase; color: var(--text-muted); }
.project-mini-title { font-size: 1.3rem; font-weight: 500; }
.project-mini-tagline { font-size: 14px; color: var(--text-muted); line-height: 1.5; }
.project-mini-tags { display: flex; flex-wrap: wrap; gap: 0.4rem; }
.project-mini-tags .tag { font-size: 10px; padding: 0.3rem 0.7rem; }
.project-mini-link {
    margin-top: auto;
    font-family: var(--font-mono);
    font-size: 11px;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    color: var(--accent);
    transition: opacity 0.3s var(--ease-out);
}
.project-mini-link:hover { opacity: 0.7; }
.project-mini-link.muted { color: var(--text-faint); cursor: default; }

@media (max-width: 768px) {
    .projects-grid { grid-template-columns: 1fr; }
}
```

- [ ] **Step 2: Ajouter le bloc grid juste avant `</section>` de `projects`**

```html
<div class="projects-grid-wrap">
    <span class="projects-grid-label">Autres projets</span>
    <div class="projects-grid">

        <article class="project-mini">
            <div class="project-mini-meta"><span>2025</span><span>Projet d'équipe</span></div>
            <h3 class="project-mini-title">Labyrinthe SAÉ 3.3</h3>
            <p class="project-mini-tagline">Application JavaFX de génération et résolution de labyrinthes en équipe de 5 sur GitLab. Mode libre, mode progression, boutique d'articles, thèmes visuels.</p>
            <div class="project-mini-tags"><span class="tag">Java</span><span class="tag">JavaFX</span><span class="tag">Maven</span><span class="tag">MVC</span></div>
            <a href="https://github.com/AlioDefl/labyrinthe-sae-3-3" target="_blank" rel="noopener" class="project-mini-link">Code GitHub →</a>
        </article>

        <article class="project-mini">
            <div class="project-mini-meta"><span>2025</span><span>Backend / API</span></div>
            <h3 class="project-mini-title">API REST EcoDrop</h3>
            <p class="project-mini-tagline">API REST complète pour la collecte de déchets (batteries, textiles, électronique). 4 ressources, pattern DAO/DTO, vues SQL pour leaderboard, négociation JSON/XML.</p>
            <div class="project-mini-tags"><span class="tag">Java</span><span class="tag">Servlets</span><span class="tag">PostgreSQL</span><span class="tag">Jackson</span></div>
            <span class="project-mini-link muted">Code disponible sur demande</span>
        </article>

        <article class="project-mini">
            <div class="project-mini-meta"><span>2025</span><span>Web</span></div>
            <h3 class="project-mini-title">Portfolio Architecte</h3>
            <p class="project-mini-tagline">Site web portfolio moderne et responsive pour un architecte. Animations fluides, galerie de projets interactive, optimisation des images haute résolution.</p>
            <div class="project-mini-tags"><span class="tag">React</span><span class="tag">TypeScript</span><span class="tag">Tailwind</span><span class="tag">Vite</span></div>
            <span class="project-mini-link muted">Code privé</span>
        </article>

        <article class="project-mini">
            <div class="project-mini-meta"><span>2025</span><span>Jeu</span></div>
            <h3 class="project-mini-title">Jeu Risk</h3>
            <p class="project-mini-tagline">Implémentation Java du jeu de stratégie Risk en terminal. Mode solo contre IA et multijoueur local, architecture orientée objet avec design patterns.</p>
            <div class="project-mini-tags"><span class="tag">Java</span><span class="tag">POO</span><span class="tag">Algorithmique</span></div>
            <span class="project-mini-link muted">Code privé</span>
        </article>

        <article class="project-mini">
            <div class="project-mini-meta"><span>2025</span><span>Application desktop</span></div>
            <h3 class="project-mini-title">Séjours Linguistiques</h3>
            <p class="project-mini-tagline">Application Java Swing de gestion de séjours linguistiques avec base de données locale. Gestion des participants, destinations et génération de documents.</p>
            <div class="project-mini-tags"><span class="tag">Java</span><span class="tag">Swing</span><span class="tag">JDBC</span></div>
            <span class="project-mini-link muted">Code privé</span>
        </article>

        <article class="project-mini">
            <div class="project-mini-meta"><span>2023</span><span>Intégration web</span></div>
            <h3 class="project-mini-title">Site OpenAI</h3>
            <p class="project-mini-tagline">Reproduction fidèle pixel-perfect du site officiel d'OpenAI en HTML/CSS pur. Exercice d'intégration avec responsive design et animations CSS complexes.</p>
            <div class="project-mini-tags"><span class="tag">HTML5</span><span class="tag">CSS3</span><span class="tag">Flexbox</span></div>
            <span class="project-mini-link muted">Code privé</span>
        </article>

        <article class="project-mini">
            <div class="project-mini-meta"><span>2023</span><span>Jeu</span></div>
            <h3 class="project-mini-title">Mauscape</h3>
            <p class="project-mini-tagline">Jeu d'aventure textuel jouable dans le terminal. Création d'un moteur de jeu avec gestion de scénarios à embranchements et plusieurs fins possibles.</p>
            <div class="project-mini-tags"><span class="tag">Java</span><span class="tag">Terminal</span><span class="tag">Game Design</span></div>
            <span class="project-mini-link muted">Code privé</span>
        </article>

    </div>
</div>
```

- [ ] **Step 3: Validation visuelle**

- Sous les 3 featured, un label "Autres projets" suivi d'une grille 2 colonnes de 7 cards
- Chaque mini-card : meta (année + type), titre, tagline, tags, lien
- Hover : bordure devient argile, légère élévation
- Responsive : 1 colonne en < 768px

- [ ] **Step 4: Commit**

```bash
git add styles/main.css index.html
git commit -m "Add 7-card minor projects grid"
```

---

### Task 9: Stats marquee

**Files:**
- Modify: `aliocha-deflou-v2/index.html`
- Modify: `aliocha-deflou-v2/styles/main.css`

- [ ] **Step 1: Ajouter le CSS marquee**

```css
/* ---------- Stats marquee ---------- */
.marquee {
    background: var(--bg-elevated);
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
    overflow: hidden;
    padding: 1.5rem 0;
}
.marquee-track {
    display: flex;
    width: max-content;
    animation: marquee 60s linear infinite;
    will-change: transform;
}
.marquee:hover .marquee-track { animation-play-state: paused; }
.marquee-item {
    font-family: var(--font-mono);
    font-size: 13px;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--text-muted);
    padding: 0 2.5rem;
    white-space: nowrap;
    display: flex;
    align-items: center;
    gap: 2.5rem;
}
.marquee-item::after {
    content: '';
    width: 6px;
    height: 6px;
    background: var(--accent);
    border-radius: 50%;
    flex-shrink: 0;
}
@keyframes marquee {
    from { transform: translateX(0); }
    to { transform: translateX(-50%); }
}
```

- [ ] **Step 2: Ajouter le marquee après la section `</section>` projets**

```html
<aside class="marquee" aria-label="Statistiques en bandeau">
    <div class="marquee-track">
        <span class="marquee-item">10+ projets</span>
        <span class="marquee-item">12+ technologies</span>
        <span class="marquee-item">3 ans de code</span>
        <span class="marquee-item">1 client réel</span>
        <span class="marquee-item">5 projets d'équipe</span>
        <span class="marquee-item">BUT IUT Lille</span>
        <!-- Duplication pour boucle parfaite -->
        <span class="marquee-item" aria-hidden="true">10+ projets</span>
        <span class="marquee-item" aria-hidden="true">12+ technologies</span>
        <span class="marquee-item" aria-hidden="true">3 ans de code</span>
        <span class="marquee-item" aria-hidden="true">1 client réel</span>
        <span class="marquee-item" aria-hidden="true">5 projets d'équipe</span>
        <span class="marquee-item" aria-hidden="true">BUT IUT Lille</span>
    </div>
</aside>
```

- [ ] **Step 3: Validation visuelle**

- Bandeau horizontal qui scroll en continu de droite à gauche
- 6 items uniques + 6 dupliqués pour la boucle
- Hover : pause de l'animation
- Pas de saut visible à la fin de boucle

- [ ] **Step 4: Commit**

```bash
git add styles/main.css index.html
git commit -m "Add stats marquee with infinite horizontal scroll"
```

---

### Task 10: What I do / Stack (4 colonnes)

**Files:**
- Modify: `aliocha-deflou-v2/index.html`
- Modify: `aliocha-deflou-v2/styles/main.css`

- [ ] **Step 1: Ajouter le CSS stack**

```css
/* ---------- Stack section ---------- */
.stack {
    padding: 8rem 0;
    background: var(--bg);
}
.stack-inner { max-width: var(--max-width); margin: 0 auto; padding: 0 var(--gutter); }
.stack-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 3rem;
    margin-top: 4rem;
}
.stack-col { display: flex; flex-direction: column; gap: 1rem; }
.stack-num { font-family: var(--font-mono); font-size: 12px; letter-spacing: 1.5px; color: var(--accent); }
.stack-cat { font-size: 1.1rem; font-weight: 600; padding-bottom: 1rem; border-bottom: 1px solid var(--border); margin-bottom: 0.5rem; }
.stack-list { list-style: none; display: flex; flex-direction: column; gap: 0.5rem; }
.stack-list li { font-family: var(--font-mono); font-size: 13px; color: var(--text-muted); padding: 0.4rem 0; }

@media (max-width: 900px) { .stack-grid { grid-template-columns: repeat(2, 1fr); gap: 2rem; } }
@media (max-width: 500px) { .stack-grid { grid-template-columns: 1fr; } }
```

- [ ] **Step 2: Ajouter la section après le marquee**

```html
<section class="stack" id="stack" aria-label="Compétences techniques">
    <div class="stack-inner">
        <h2 class="section-title">Ce que je <em class="serif-italic">fais</em>.</h2>
        <div class="stack-grid">
            <div class="stack-col">
                <span class="stack-num">01.</span>
                <h3 class="stack-cat">Frontend</h3>
                <ul class="stack-list">
                    <li>React</li><li>TypeScript</li><li>HTML5 / CSS3</li><li>Tailwind</li><li>Vite</li>
                </ul>
            </div>
            <div class="stack-col">
                <span class="stack-num">02.</span>
                <h3 class="stack-cat">Backend</h3>
                <ul class="stack-list">
                    <li>Python</li><li>FastAPI</li><li>Java</li><li>Servlets</li><li>Node.js</li><li>Socket.IO</li>
                </ul>
            </div>
            <div class="stack-col">
                <span class="stack-num">03.</span>
                <h3 class="stack-cat">Data</h3>
                <ul class="stack-list">
                    <li>PostgreSQL</li><li>SQLite</li><li>SQL</li><li>Jackson</li><li>Schema.org</li>
                </ul>
            </div>
            <div class="stack-col">
                <span class="stack-num">04.</span>
                <h3 class="stack-cat">Tooling</h3>
                <ul class="stack-list">
                    <li>Git / GitHub</li><li>Docker</li><li>Maven</li><li>Vite</li><li>Bruno</li><li>IntelliJ / VS Code</li>
                </ul>
            </div>
        </div>
    </div>
</section>
```

- [ ] **Step 3: Validation visuelle**

- 4 colonnes : Frontend, Backend, Data, Tooling
- Numéro `01.` en argile au-dessus de chaque catégorie
- Liste des techs en mono, séparées par bordures fines

- [ ] **Step 4: Commit**

```bash
git add styles/main.css index.html
git commit -m "Add 'What I do' stack section (4 categories)"
```

---

### Task 11: Why hire me (3 arguments)

**Files:**
- Modify: `aliocha-deflou-v2/index.html`
- Modify: `aliocha-deflou-v2/styles/main.css`

- [ ] **Step 1: Ajouter le CSS why**

```css
/* ---------- Why hire me ---------- */
.why {
    padding: 8rem 0;
    background: var(--bg-deep);
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
}
.why-inner { max-width: var(--max-width); margin: 0 auto; padding: 0 var(--gutter); }
.why-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 4rem;
    margin-top: 4rem;
}
.why-item { display: flex; flex-direction: column; gap: 1rem; }
.why-num {
    font-family: var(--font-serif);
    font-style: italic;
    font-weight: 300;
    font-size: 4rem;
    color: var(--accent);
    line-height: 1;
}
.why-title { font-size: 1.4rem; font-weight: 600; }
.why-text { font-size: 15px; line-height: 1.6; color: var(--text-muted); }

@media (max-width: 900px) { .why-grid { grid-template-columns: 1fr; gap: 3rem; } }
```

- [ ] **Step 2: Ajouter la section**

```html
<section class="why" id="why" aria-label="Pourquoi me recruter">
    <div class="why-inner">
        <h2 class="section-title">Pourquoi me <em class="serif-italic">recruter</em>.</h2>
        <div class="why-grid">
            <div class="why-item">
                <span class="why-num">01</span>
                <h3 class="why-title">Polyvalence prouvée</h3>
                <p class="why-text">Web, jeux, backend, client réel — 10 projets livrés en 3 langages principaux (TypeScript, Python, Java). Je sais m'adapter à la stack qui sert le problème, pas l'inverse.</p>
            </div>
            <div class="why-item">
                <span class="why-num">02</span>
                <h3 class="why-title">Rodé au travail d'équipe</h3>
                <p class="why-text">5 développeurs sur Labyrinthe SAÉ 3.3, 3 sur Bug of Thrones. Gestion Git/GitLab avec rebase, résolution de merge conflicts, code reviews entre pairs.</p>
            </div>
            <div class="why-item">
                <span class="why-num">03</span>
                <h3 class="why-title">Documentation et rigueur</h3>
                <p class="why-text">ADRs sur Trading Bot, Javadoc complète sur Labyrinthe, READMEs détaillés, architecture serveur autoritaire sur Bug of Thrones avec 30 tests automatisés.</p>
            </div>
        </div>
    </div>
</section>
```

- [ ] **Step 3: Validation visuelle**

- 3 colonnes alignées
- Gros chiffre italique Fraunces en argile (01, 02, 03)
- Titre en gras en dessous
- Texte explicatif en muted

- [ ] **Step 4: Commit**

```bash
git add styles/main.css index.html
git commit -m "Add 'Why hire me' section with 3 arguments"
```

---

### Task 12: Education timeline

**Files:**
- Modify: `aliocha-deflou-v2/index.html`
- Modify: `aliocha-deflou-v2/styles/main.css`

**Note importante** : pour cette task, le concepteur (Aliocha) doit fournir la liste exacte de ses formations. Source de référence : `formations.html` du portfolio actuel `aliocha-deflou`. Les entrées ci-dessous sont des templates à remplacer.

- [ ] **Step 1: Ajouter le CSS timeline**

```css
/* ---------- Education timeline ---------- */
.education {
    padding: 8rem 0;
    background: var(--bg);
}
.education-inner { max-width: var(--max-width); margin: 0 auto; padding: 0 var(--gutter); }
.timeline {
    position: relative;
    margin-top: 4rem;
    padding-left: 2rem;
}
.timeline::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 1px;
    background: var(--border-strong);
}
.timeline-item {
    position: relative;
    padding-bottom: 3rem;
    display: grid;
    grid-template-columns: 140px 1fr;
    gap: 2rem;
}
.timeline-item:last-child { padding-bottom: 0; }
.timeline-item::before {
    content: '';
    position: absolute;
    left: -2.4rem;
    top: 0.4rem;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: var(--accent);
    border: 3px solid var(--bg);
    box-shadow: 0 0 0 1px var(--accent);
}
.timeline-date { font-family: var(--font-mono); font-size: 12px; letter-spacing: 1px; color: var(--accent); padding-top: 0.3rem; }
.timeline-content h3 { font-size: 1.25rem; font-weight: 600; margin-bottom: 0.5rem; }
.timeline-content .school { font-family: var(--font-mono); font-size: 12px; letter-spacing: 0.5px; color: var(--text-muted); margin-bottom: 0.75rem; }
.timeline-content p { font-size: 14px; line-height: 1.6; color: var(--text-muted); }

@media (max-width: 600px) {
    .timeline-item { grid-template-columns: 1fr; gap: 0.5rem; }
}
```

- [ ] **Step 2: Lire le fichier `formations.html` du portfolio actuel pour récupérer les vraies entrées**

Avant de coller le HTML ci-dessous, lis :
`C:/Users/alioc/OneDrive - JUNIA Grande école d'ingénieurs/Desktop/aliocha-deflou/formations.html`

Et adapte les `<article class="timeline-item">` ci-dessous avec les vraies formations d'Aliocha. Si le portfolio actuel n'est pas accessible, utilise comme template les 3 entrées par défaut ci-dessous, et le concepteur les corrigera lors de la review.

- [ ] **Step 3: Ajouter la section education avec template à remplacer**

```html
<section class="education" id="formations" aria-label="Formations">
    <div class="education-inner">
        <h2 class="section-title">Formations.</h2>
        <div class="timeline">

            <article class="timeline-item">
                <div class="timeline-date">2024 — 2027</div>
                <div class="timeline-content">
                    <h3>BUT Informatique</h3>
                    <p class="school">IUT de Lille · Parcours Réalisation d'Applications</p>
                    <p>Formation universitaire en 3 ans axée développement logiciel, programmation orientée objet, bases de données, web et travail en équipe via les SAÉs (Situations d'Apprentissage et d'Évaluation).</p>
                </div>
            </article>

            <article class="timeline-item">
                <div class="timeline-date">2024</div>
                <div class="timeline-content">
                    <h3>Baccalauréat Général</h3>
                    <p class="school">[Établissement à préciser par le concepteur]</p>
                    <p>Spécialités à préciser. Mention à préciser.</p>
                </div>
            </article>

            <article class="timeline-item">
                <div class="timeline-date">Certifications</div>
                <div class="timeline-content">
                    <h3>Certifications complémentaires</h3>
                    <p class="school">À compléter par le concepteur</p>
                    <p>Si le concepteur a des certifs (Pix, OpenClassrooms, Coursera, etc.), elles vont ici.</p>
                </div>
            </article>

        </div>
    </div>
</section>
```

- [ ] **Step 4: Validation visuelle**

- Timeline verticale avec ligne argile à gauche
- Marqueurs ronds argile sur la ligne pour chaque entrée
- Date à gauche, contenu à droite

- [ ] **Step 5: Commit**

```bash
git add styles/main.css index.html
git commit -m "Add education timeline section (template to be filled with real entries)"
```

---

### Task 13: Experience list

**Files:**
- Modify: `aliocha-deflou-v2/index.html`
- Modify: `aliocha-deflou-v2/styles/main.css`

**Note** : structure similaire à la timeline education, mais pour les expériences pro/stages. Le concepteur fournira les vraies entrées. Source de référence : section `#experiences` de `index.html` du portfolio actuel.

- [ ] **Step 1: Ajouter le CSS experience**

```css
/* ---------- Experience ---------- */
.experience {
    padding: 8rem 0;
    background: var(--bg-deep);
    border-top: 1px solid var(--border);
}
.experience-inner { max-width: var(--max-width); margin: 0 auto; padding: 0 var(--gutter); }
.experience-list {
    display: flex;
    flex-direction: column;
    gap: 0;
    margin-top: 4rem;
}
.experience-item {
    display: grid;
    grid-template-columns: 200px 1fr;
    gap: 3rem;
    padding: 2.5rem 0;
    border-bottom: 1px solid var(--border);
    align-items: start;
}
.experience-item:last-child { border-bottom: none; }
.experience-period { font-family: var(--font-mono); font-size: 12px; letter-spacing: 1px; color: var(--text-muted); }
.experience-content h3 { font-size: 1.3rem; font-weight: 600; margin-bottom: 0.4rem; }
.experience-content .company { font-family: var(--font-mono); font-size: 12px; color: var(--accent); margin-bottom: 1rem; }
.experience-content p { font-size: 15px; color: var(--text-muted); line-height: 1.6; margin-bottom: 1rem; }
.experience-tags { display: flex; flex-wrap: wrap; gap: 0.4rem; }

@media (max-width: 700px) {
    .experience-item { grid-template-columns: 1fr; gap: 0.5rem; }
}
```

- [ ] **Step 2: Lire le portfolio actuel pour récupérer les vraies entrées**

Lis la section `#experiences` de :
`C:/Users/alioc/OneDrive - JUNIA Grande école d'ingénieurs/Desktop/aliocha-deflou/index.html`

Et adapte le HTML ci-dessous avec les vraies expériences. Si pas accessible, garde les 2 templates ci-dessous pour que le concepteur les remplace.

- [ ] **Step 3: Ajouter la section experience**

```html
<section class="experience" id="experiences" aria-label="Expériences">
    <div class="experience-inner">
        <h2 class="section-title">Expériences.</h2>
        <div class="experience-list">

            <article class="experience-item">
                <div class="experience-period">[Période à préciser]</div>
                <div class="experience-content">
                    <h3>[Poste à préciser]</h3>
                    <p class="company">[Entreprise à préciser]</p>
                    <p>[Description courte de la mission, 2-3 lignes max. Le concepteur reprend depuis le portfolio actuel.]</p>
                    <div class="experience-tags">
                        <span class="tag">[Tech 1]</span><span class="tag">[Tech 2]</span>
                    </div>
                </div>
            </article>

            <article class="experience-item">
                <div class="experience-period">[Période à préciser]</div>
                <div class="experience-content">
                    <h3>[Poste à préciser]</h3>
                    <p class="company">[Entreprise à préciser]</p>
                    <p>[Description courte.]</p>
                    <div class="experience-tags">
                        <span class="tag">[Tech 1]</span>
                    </div>
                </div>
            </article>

        </div>
    </div>
</section>
```

- [ ] **Step 4: Validation visuelle**

- Liste verticale avec séparateurs entre items
- Période à gauche, contenu à droite
- Nom entreprise en argile sous le poste
- Tags en bas

- [ ] **Step 5: Commit**

```bash
git add styles/main.css index.html
git commit -m "Add experience section (template to be filled with real entries)"
```

---

### Task 14: Contact CTA section

**Files:**
- Modify: `aliocha-deflou-v2/index.html`
- Modify: `aliocha-deflou-v2/styles/main.css`

- [ ] **Step 1: Ajouter le CSS contact**

```css
/* ---------- Contact CTA ---------- */
.contact {
    padding: 12rem 0;
    background: var(--bg);
    border-top: 1px solid var(--border);
    text-align: center;
}
.contact-inner { max-width: 900px; margin: 0 auto; padding: 0 var(--gutter); }
.contact-title {
    font-size: clamp(3rem, 8vw, 7rem);
    font-weight: 700;
    letter-spacing: -3px;
    line-height: 0.95;
    margin-bottom: 2rem;
}
.contact-title em { font-family: var(--font-serif); font-style: italic; font-weight: 300; color: var(--accent); }
.contact-text {
    font-size: clamp(16px, 1.4vw, 20px);
    color: var(--text-muted);
    line-height: 1.6;
    max-width: 600px;
    margin: 0 auto 3rem;
}
.contact-buttons {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
}
.contact-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem 2rem;
    border: 1px solid var(--border-strong);
    border-radius: 50px;
    font-family: var(--font-mono);
    font-size: 13px;
    letter-spacing: 0.5px;
    color: var(--text);
    transition: all 0.3s var(--ease-out);
    background: rgba(245, 240, 232, 0.02);
}
.contact-btn:hover {
    background: var(--accent);
    color: var(--bg);
    border-color: var(--accent);
    transform: translateY(-2px);
}
.contact-btn.primary {
    background: var(--accent);
    color: var(--bg);
    border-color: var(--accent);
}
.contact-btn.primary:hover { background: var(--accent-hover); border-color: var(--accent-hover); }
```

- [ ] **Step 2: Ajouter la section contact**

```html
<section class="contact" id="contact" aria-label="Contact">
    <div class="contact-inner">
        <h2 class="contact-title">On en <em>discute</em> ?</h2>
        <p class="contact-text">Je suis disponible pour une alternance dès septembre 2026 à Lille (BUT3 + Master si proposé). Réponse garantie sous 24h sur l'un des canaux ci-dessous.</p>
        <div class="contact-buttons">
            <a href="mailto:aliocha.deflou@gmail.com" class="contact-btn primary">Email →</a>
            <a href="https://www.linkedin.com/in/aliocha-deflou/" target="_blank" rel="noopener" class="contact-btn">LinkedIn ↗</a>
            <a href="https://github.com/AlioDefl" target="_blank" rel="noopener" class="contact-btn">GitHub ↗</a>
            <a href="CV_Aliocha_DEFLOU.pdf" download class="contact-btn">Télécharger CV ↓</a>
        </div>
    </div>
</section>
```

**Note** : si l'URL LinkedIn n'est pas correcte, le concepteur devra la corriger. Source : portfolio actuel.

- [ ] **Step 3: Validation visuelle**

- Section centrée, padding vertical large (12rem)
- Titre énorme avec "discute" en italique argile
- 4 boutons : Email (primaire argile) + LinkedIn + GitHub + CV
- Hover : remontée + fond argile

- [ ] **Step 4: Commit**

```bash
git add styles/main.css index.html
git commit -m "Add contact CTA section with 4 action buttons"
```

---

### Task 15: Footer

**Files:**
- Modify: `aliocha-deflou-v2/index.html`
- Modify: `aliocha-deflou-v2/styles/main.css`

- [ ] **Step 1: Ajouter le CSS footer**

```css
/* ---------- Footer ---------- */
.footer {
    padding: 3rem 0 2rem;
    background: var(--bg-deep);
    border-top: 1px solid var(--border);
}
.footer-inner {
    max-width: var(--max-width);
    margin: 0 auto;
    padding: 0 var(--gutter);
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 1.5rem;
    font-family: var(--font-mono);
    font-size: 11px;
    letter-spacing: 0.5px;
    color: var(--text-faint);
}
.footer-links { display: flex; gap: 2rem; flex-wrap: wrap; }
.footer-links a { color: var(--text-muted); transition: color 0.3s var(--ease-out); }
.footer-links a:hover { color: var(--accent); }
```

- [ ] **Step 2: Ajouter le footer après la section contact**

```html
<footer class="footer" role="contentinfo">
    <div class="footer-inner">
        <span>© 2026 Aliocha Deflou · BUT Informatique IUT Lille</span>
        <div class="footer-links">
            <a href="https://github.com/AlioDefl/aliocha-deflou-v2" target="_blank" rel="noopener">Code source ↗</a>
            <a href="sitemap.xml">Sitemap</a>
        </div>
    </div>
</footer>
```

- [ ] **Step 3: Validation visuelle**

- Footer fin (3rem de padding)
- Copyright à gauche, liens à droite
- Tout en mono uppercase faint

- [ ] **Step 4: Commit final phase 2**

```bash
git add styles/main.css index.html
git commit -m "Add footer — index.html structurally complete"
```

---

## PHASE 3 — Interactions JavaScript

### Task 16: Scroll reveals (IntersectionObserver)

**Files:**
- Modify: `aliocha-deflou-v2/scripts/main.js`
- Modify: `aliocha-deflou-v2/styles/main.css`

- [ ] **Step 1: Ajouter le CSS pour l'état initial caché**

À la fin de `main.css` :

```css
/* ---------- Scroll reveals ---------- */
[data-reveal] {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.8s var(--ease-out), transform 0.8s var(--ease-out);
}
[data-reveal].is-visible {
    opacity: 1;
    transform: translateY(0);
}
@media (prefers-reduced-motion: reduce) {
    [data-reveal] { opacity: 1; transform: none; transition: none; }
}
```

- [ ] **Step 2: Écrire le module reveals dans `scripts/main.js`**

Remplace le contenu :

```js
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
        // Fallback : tout afficher sans animation
        reveals.forEach((el) => el.classList.add('is-visible'));
    }

})();
```

- [ ] **Step 3: Ajouter `data-reveal` sur les blocs principaux de `index.html`**

Modifications à appliquer dans `index.html` :
- Sur `.about-portrait` : `data-reveal`
- Sur `.about-text` : `data-reveal data-reveal-delay="100"`
- Sur chaque `.featured-card` : `data-reveal`
- Sur chaque `.project-mini` : `data-reveal`
- Sur chaque `.stack-col` : `data-reveal data-reveal-delay="N00"` (N = index 0-3)
- Sur chaque `.why-item` : `data-reveal data-reveal-delay="N00"`
- Sur chaque `.timeline-item` : `data-reveal`
- Sur `.contact-title` : `data-reveal`
- Sur `.contact-buttons` : `data-reveal data-reveal-delay="200"`

Exemple :
```html
<article class="featured-card" data-reveal>
```

- [ ] **Step 4: Validation visuelle**

- Recharger la page et scroller : chaque section apparaît en fade + translation
- En `prefers-reduced-motion: reduce` (DevTools > Rendering) : tout est visible immédiatement

- [ ] **Step 5: Commit**

```bash
git add styles/main.css scripts/main.js index.html
git commit -m "Add scroll reveals via IntersectionObserver"
```

---

### Task 17: Nav scroll state

**Files:**
- Modify: `aliocha-deflou-v2/scripts/main.js`

- [ ] **Step 1: Ajouter le module nav scroll dans `scripts/main.js`**

Avant la dernière `})()`, ajoute (à l'intérieur de l'IIFE) :

```js
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
```

- [ ] **Step 2: Validation visuelle**

- Au scroll au-delà de 50px : nav devient blur translucide avec bordure basse
- Au scroll back en haut : nav redevient transparent
- Sur mobile : clic hamburger ouvre les liens, clic sur un lien ferme le menu

- [ ] **Step 3: Commit**

```bash
git add scripts/main.js
git commit -m "Add nav scroll state and mobile hamburger toggle"
```

---

### Task 18: Custom cursor (desktop only)

**Files:**
- Modify: `aliocha-deflou-v2/scripts/main.js`
- Modify: `aliocha-deflou-v2/styles/main.css`

- [ ] **Step 1: Ajouter le CSS du cursor**

À la fin de `main.css` :

```css
/* ---------- Custom cursor ---------- */
.cursor-dot {
    position: fixed;
    top: 0; left: 0;
    width: 10px; height: 10px;
    border-radius: 50%;
    background: var(--accent);
    pointer-events: none;
    z-index: 9999;
    transform: translate(-50%, -50%);
    transition: width 0.25s var(--ease-out), height 0.25s var(--ease-out), background 0.25s var(--ease-out);
    mix-blend-mode: difference;
    will-change: transform;
}
.cursor-dot.is-hovering { width: 30px; height: 30px; }
@media (max-width: 900px), (hover: none) {
    .cursor-dot { display: none; }
}
@media (prefers-reduced-motion: reduce) {
    .cursor-dot { display: none; }
}
```

- [ ] **Step 2: Ajouter le module cursor dans `scripts/main.js`**

À l'intérieur de l'IIFE (avant la fin) :

```js
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

        // Élargir sur hover des éléments interactifs
        document.querySelectorAll('a, button, [role="button"]').forEach((el) => {
            el.addEventListener('mouseenter', () => dot.classList.add('is-hovering'));
            el.addEventListener('mouseleave', () => dot.classList.remove('is-hovering'));
        });
    }
```

- [ ] **Step 3: Validation visuelle**

- Sur desktop : un point argile suit la souris avec léger lerp
- Au hover sur un lien/bouton : le point grossit
- Sur mobile (DevTools) : pas de cursor custom
- En `prefers-reduced-motion: reduce` : pas de cursor custom

- [ ] **Step 4: Commit**

```bash
git add styles/main.css scripts/main.js
git commit -m "Add custom argile cursor with lerp follow (desktop only)"
```

---

### Task 19: Hero word reveal animation

**Files:**
- Modify: `aliocha-deflou-v2/scripts/main.js`
- Modify: `aliocha-deflou-v2/styles/main.css`

- [ ] **Step 1: Ajouter le CSS pour l'animation des mots du tagline**

À la fin de `main.css` :

```css
/* ---------- Hero word reveal ---------- */
.hero-tagline .word {
    display: inline-block;
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s var(--ease-out), transform 0.6s var(--ease-out);
}
.hero-tagline.revealed .word { opacity: 1; transform: translateY(0); }
@media (prefers-reduced-motion: reduce) {
    .hero-tagline .word { opacity: 1; transform: none; transition: none; }
}
```

- [ ] **Step 2: Ajouter le module heroReveal dans `scripts/main.js`**

À l'intérieur de l'IIFE :

```js
    // ---------- 4. Hero word reveal ----------
    const tagline = document.querySelector('.hero-tagline');
    if (tagline && !reducedMotion) {
        // Wrap chaque mot dans un span en préservant les balises <em>
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

        // Apply staggered delay
        const words = tagline.querySelectorAll('.word');
        words.forEach((w, i) => {
            w.style.transitionDelay = `${300 + i * 60}ms`;
        });

        // Trigger after small delay so transitions register
        requestAnimationFrame(() => {
            requestAnimationFrame(() => tagline.classList.add('revealed'));
        });
    } else if (tagline) {
        tagline.classList.add('revealed');
    }
```

- [ ] **Step 3: Validation visuelle**

- À l'arrivée sur la page : les mots du tagline apparaissent un par un avec ~60ms de décalage
- Le mot italique "applications web" garde son style Fraunces argile
- En `prefers-reduced-motion: reduce` : tout est visible immédiatement

- [ ] **Step 4: Commit**

```bash
git add styles/main.css scripts/main.js
git commit -m "Add hero tagline word-by-word reveal animation"
```

---

## PHASE 4 — Pages projets détaillées

### Task 20: Page template structure (création de `_template.html`)

**Files:**
- Create: `aliocha-deflou-v2/projets/_template.html`
- Modify: `aliocha-deflou-v2/styles/main.css` (ajout des styles project-detail)

- [ ] **Step 1: Ajouter le CSS pour les pages projets à la fin de `main.css`**

```css
/* ---------- Project detail pages ---------- */
.pd-nav { padding: 1.5rem var(--gutter); display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border); }
.pd-nav-back { font-family: var(--font-mono); font-size: 12px; letter-spacing: 1px; text-transform: uppercase; color: var(--accent); }
.pd-hero {
    padding: 6rem var(--gutter) 4rem;
    max-width: var(--max-width);
    margin: 0 auto;
}
.pd-meta { display: flex; gap: 1rem; margin-bottom: 2rem; font-family: var(--font-mono); font-size: 11px; letter-spacing: 1.5px; text-transform: uppercase; color: var(--text-muted); }
.pd-meta .accent { color: var(--accent); }
.pd-title {
    font-size: clamp(2.5rem, 7vw, 6rem);
    font-weight: 700;
    letter-spacing: -2.5px;
    line-height: 0.95;
    margin-bottom: 2rem;
}
.pd-tagline { font-size: clamp(18px, 2vw, 24px); font-weight: 300; line-height: 1.5; color: var(--text-muted); max-width: 780px; margin-bottom: 3rem; }
.pd-image {
    width: 100%;
    aspect-ratio: 16 / 9;
    background: var(--bg-elevated);
    border: 1px solid var(--border-strong);
    border-radius: 12px;
    overflow: hidden;
    margin-bottom: 4rem;
}
.pd-image img { width: 100%; height: 100%; object-fit: cover; }
.pd-section { padding: 4rem 0; max-width: 800px; margin: 0 auto var(--gutter); padding-left: var(--gutter); padding-right: var(--gutter); }
.pd-section h2 { font-size: 2rem; font-weight: 600; margin-bottom: 1.5rem; letter-spacing: -1px; }
.pd-section h2 em { font-family: var(--font-serif); font-style: italic; color: var(--accent); }
.pd-section p { font-size: 17px; line-height: 1.7; color: var(--text-muted); margin-bottom: 1.25rem; }
.pd-section ul { list-style: none; }
.pd-section li {
    padding: 0.75rem 0;
    border-bottom: 1px solid var(--border);
    font-size: 16px;
    color: var(--text-muted);
    display: flex;
    gap: 1rem;
}
.pd-section li::before { content: '·'; color: var(--accent); font-weight: 700; }
.pd-stack-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 1rem;
    margin: 2rem 0;
}
.pd-stack-item {
    padding: 1rem 1.25rem;
    background: var(--bg-elevated);
    border: 1px solid var(--border);
    border-radius: 8px;
    font-family: var(--font-mono);
    font-size: 13px;
    color: var(--text);
}
.pd-stack-item .lab { font-size: 10px; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1px; display: block; margin-bottom: 0.3rem; }
.pd-cta {
    display: flex;
    gap: 1rem;
    margin-top: 3rem;
    flex-wrap: wrap;
}
```

- [ ] **Step 2: Créer le template `projets/_template.html`**

```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>[TITRE PROJET] — Étude de cas | Aliocha Deflou</title>
    <meta name="description" content="[DESCRIPTION PROJET, 150 caractères max]">
    <meta name="theme-color" content="#1a1a1a">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Fraunces:ital,wght@0,300;0,400;1,300;1,400&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">

    <link rel="stylesheet" href="../styles/main.css">
</head>
<body>
    <a href="#main" class="skip-link">Aller au contenu principal</a>
    <nav class="pd-nav" role="navigation">
        <a href="../index.html#projets" class="pd-nav-back">← Tous les projets</a>
        <a href="../index.html" class="nav-logo">Aliocha Deflou</a>
    </nav>

    <main id="main">
        <article>
            <header class="pd-hero">
                <div class="pd-meta">
                    <span class="accent">[ANNÉE]</span>
                    <span>·</span>
                    <span>[TYPE]</span>
                </div>
                <h1 class="pd-title">[TITRE PROJET]</h1>
                <p class="pd-tagline">[TAGLINE EN UNE PHRASE]</p>
                <div class="pd-image">
                    <img src="../assets/img/[image-principale].webp" alt="[ALT]" loading="eager">
                </div>
            </header>

            <section class="pd-section">
                <h2>Le <em>contexte</em>.</h2>
                <p>[2-3 paragraphes : pourquoi ce projet, quel problème il résout, quelles contraintes.]</p>
            </section>

            <section class="pd-section">
                <h2>La <em>stack</em>.</h2>
                <div class="pd-stack-grid">
                    <div class="pd-stack-item"><span class="lab">Frontend</span>[ex: React + TypeScript]</div>
                    <div class="pd-stack-item"><span class="lab">Backend</span>[ex: FastAPI]</div>
                    <div class="pd-stack-item"><span class="lab">BDD</span>[ex: PostgreSQL]</div>
                </div>
                <p>[Justification rapide des choix.]</p>
            </section>

            <section class="pd-section">
                <h2>L'<em>architecture</em>.</h2>
                <p>[Description architecture, optionnellement avec diagramme SVG inline.]</p>
            </section>

            <section class="pd-section">
                <h2>Les <em>défis</em>.</h2>
                <ul>
                    <li>[Défi 1 + résolution]</li>
                    <li>[Défi 2 + résolution]</li>
                    <li>[Défi 3 + résolution]</li>
                </ul>
            </section>

            <section class="pd-section">
                <h2>Les <em>apprentissages</em>.</h2>
                <p>[Ce que j'ai appris, technique + soft skills.]</p>
            </section>

            <section class="pd-section">
                <h2>Liens.</h2>
                <div class="pd-cta">
                    <a href="[URL GITHUB OU DEMO]" target="_blank" rel="noopener" class="contact-btn primary">[Code GitHub →]</a>
                    <a href="../index.html#contact" class="contact-btn">Me contacter</a>
                </div>
            </section>
        </article>
    </main>

    <footer class="footer" role="contentinfo">
        <div class="footer-inner">
            <span>© 2026 Aliocha Deflou</span>
            <div class="footer-links">
                <a href="../index.html">Accueil</a>
                <a href="../index.html#contact">Contact</a>
            </div>
        </div>
    </footer>

    <script src="../scripts/main.js"></script>
</body>
</html>
```

- [ ] **Step 3: Validation visuelle**

Ouvre `projets/_template.html` directement : il doit s'afficher avec tous les placeholders `[XXX]`. Pas joli mais structurellement correct.

- [ ] **Step 4: Commit**

```bash
git add styles/main.css projets/_template.html
git commit -m "Add project detail page template and styles"
```

---

### Task 21: Trading Bot detail page

**Files:**
- Create: `aliocha-deflou-v2/projets/trading-bot.html`

- [ ] **Step 1: Copier `_template.html` vers `trading-bot.html`**

```bash
cp projets/_template.html projets/trading-bot.html
```

- [ ] **Step 2: Remplacer tous les placeholders avec le contenu Trading Bot**

Édite `projets/trading-bot.html` pour avoir ce contenu :

```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Trading Bot Crypto — Étude de cas | Aliocha Deflou</title>
    <meta name="description" content="Webapp de paper trading crypto algorithmique en React + FastAPI. Backtest, simulation live WebSocket, ADRs documentés.">
    <meta name="theme-color" content="#1a1a1a">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Fraunces:ital,wght@0,300;0,400;1,300;1,400&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">

    <link rel="stylesheet" href="../styles/main.css">
</head>
<body>
    <a href="#main" class="skip-link">Aller au contenu principal</a>
    <nav class="pd-nav" role="navigation">
        <a href="../index.html#projets" class="pd-nav-back">← Tous les projets</a>
        <a href="../index.html" class="nav-logo">Aliocha Deflou</a>
    </nav>

    <main id="main">
        <article>
            <header class="pd-hero">
                <div class="pd-meta">
                    <span class="accent">2026 — En cours</span>
                    <span>·</span>
                    <span>Webapp Fullstack</span>
                </div>
                <h1 class="pd-title">Trading Bot Crypto.</h1>
                <p class="pd-tagline">Webapp de paper trading crypto algorithmique : choix d'une paire, paramétrage de stratégies (SMA, RSI, Bollinger), backtest sur historique et simulation live via WebSocket. Projet de fin de BUT2 documenté en ADR.</p>

                <!-- Mockup CSS au lieu d'image (pas de fichier .webp) -->
                <div class="pd-image" style="aspect-ratio: 16/9; padding: 2rem;">
                    <div class="tb-mockup">
                        <div class="tb-header">
                            <span class="tb-pair">BTC/<span class="accent">USDT</span></span>
                            <div class="tb-controls">
                                <span>1H</span><span class="active">4H</span><span>1D</span>
                            </div>
                        </div>
                        <div class="tb-chart">
                            <svg viewBox="0 0 400 160" preserveAspectRatio="none" style="height: 100%;">
                                <polyline fill="none" stroke="#d4a574" stroke-width="1.5" points="0,120 30,100 60,110 90,80 120,90 150,60 180,75 210,45 240,55 270,30 300,50 330,25 360,40 400,15"/>
                                <polyline fill="none" stroke="rgba(212,165,116,0.2)" stroke-width="1" points="0,140 30,135 60,138 90,125 120,130 150,115 180,120 210,108 240,112 270,98 300,105 330,92 360,100 400,88"/>
                            </svg>
                        </div>
                        <div class="tb-footer">
                            <div class="stat"><div class="num up">+12.4%</div><div class="lab">Backtest 30d</div></div>
                            <div class="stat"><div class="num">SMA 20/50</div><div class="lab">Stratégie</div></div>
                            <div class="stat"><div class="num up">63%</div><div class="lab">Win rate</div></div>
                        </div>
                    </div>
                </div>
            </header>

            <section class="pd-section">
                <h2>Le <em>contexte</em>.</h2>
                <p>Projet de fin d'année BUT2 Informatique (parcours Réalisation d'Applications, IUT de Lille). L'objectif : démontrer une maîtrise fullstack complète sur un domaine métier non-trivial — le trading algorithmique — sans jamais manipuler d'argent réel (paper trading uniquement).</p>
                <p>Le projet doit montrer la capacité à : intégrer une API externe (ccxt pour les données de marché), concevoir une persistance fiable (PostgreSQL avec migrations), implémenter de la communication temps réel (WebSocket), et documenter ses choix d'architecture (ADRs).</p>
            </section>

            <section class="pd-section">
                <h2>La <em>stack</em>.</h2>
                <div class="pd-stack-grid">
                    <div class="pd-stack-item"><span class="lab">Frontend</span>React 18 + TypeScript</div>
                    <div class="pd-stack-item"><span class="lab">Styling</span>Tailwind CSS + Recharts</div>
                    <div class="pd-stack-item"><span class="lab">Backend</span>Python 3.11 + FastAPI</div>
                    <div class="pd-stack-item"><span class="lab">Trading</span>ccxt + pandas + numpy</div>
                    <div class="pd-stack-item"><span class="lab">BDD</span>PostgreSQL + SQLAlchemy + Alembic</div>
                    <div class="pd-stack-item"><span class="lab">Infra</span>Docker Compose</div>
                </div>
                <p>Stack figée par <strong>ADR-001</strong> avant le moindre commit de code. Architecture détaillée dans <strong>ADR-002</strong>.</p>
            </section>

            <section class="pd-section">
                <h2>L'<em>architecture</em>.</h2>
                <p>Backend FastAPI exposant une API REST + un endpoint WebSocket. Le frontend React consomme l'API pour les écrans de configuration (paire, stratégie, paramètres) et s'abonne au WebSocket pour la simulation live. Persistance PostgreSQL pour les configurations et l'historique des backtests.</p>
                <p>Les stratégies (SMA, RSI, Bollinger) sont implémentées en pandas/numpy côté backend, ce qui permet de réutiliser le même code pour le backtest historique et la simulation live.</p>
            </section>

            <section class="pd-section">
                <h2>Les <em>défis</em>.</h2>
                <ul>
                    <li>Concevoir un moteur de backtest qui produit les mêmes résultats que la simulation live (cohérence). Solution : code de calcul d'indicateurs unifié, alimenté par un flux de bougies (historique ou temps réel).</li>
                    <li>Gérer les rate limits de l'API ccxt sans bloquer l'UI. Solution : worker async côté backend, le frontend ne fait que lire la dernière donnée disponible.</li>
                    <li>Documenter les choix techniques pour qu'ils restent compréhensibles dans 6 mois. Solution : ADRs systématiques pour chaque décision structurelle.</li>
                </ul>
            </section>

            <section class="pd-section">
                <h2>Les <em>apprentissages</em>.</h2>
                <p>Architecture asynchrone Python (async/await), ORM avec migrations versionnées (Alembic), conteneurisation multi-services (Docker Compose), documentation par décisions architecturales (ADR), et la valeur de figer la stack avant de commencer à coder.</p>
            </section>

            <section class="pd-section">
                <h2>Liens.</h2>
                <div class="pd-cta">
                    <a href="https://github.com/AlioDefl/Trading-bot" target="_blank" rel="noopener" class="contact-btn primary">Code GitHub →</a>
                    <a href="../index.html#contact" class="contact-btn">Me contacter</a>
                </div>
            </section>
        </article>
    </main>

    <footer class="footer" role="contentinfo">
        <div class="footer-inner">
            <span>© 2026 Aliocha Deflou</span>
            <div class="footer-links">
                <a href="../index.html">Accueil</a>
                <a href="../index.html#contact">Contact</a>
            </div>
        </div>
    </footer>

    <script src="../scripts/main.js"></script>
</body>
</html>
```

- [ ] **Step 3: Validation visuelle**

- Hero avec titre `Trading Bot Crypto.` énorme
- Mockup CSS dashboard à la place de l'image
- 6 sections : Contexte, Stack, Architecture, Défis, Apprentissages, Liens
- Italiques Fraunces sur les mots-clés des h2

- [ ] **Step 4: Commit**

```bash
git add projets/trading-bot.html
git commit -m "Add Trading Bot project detail page"
```

---

### Task 22: Bug of Thrones detail page

**Files:**
- Create: `aliocha-deflou-v2/projets/bug-of-thrones.html`

- [ ] **Step 1: Copier le template**

```bash
cp projets/_template.html projets/bug-of-thrones.html
```

- [ ] **Step 2: Remplacer tout le contenu de `bug-of-thrones.html`**

```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bug of Thrones — Étude de cas | Aliocha Deflou</title>
    <meta name="description" content="Shoot'em up multijoueur temps réel TypeScript/Socket.IO. Serveur autoritaire 60 FPS, leaderboard SQLite, 30 tests automatisés. Projet d'équipe SAÉ BUT2.">
    <meta name="theme-color" content="#1a1a1a">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Fraunces:ital,wght@0,300;0,400;1,300;1,400&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">

    <link rel="stylesheet" href="../styles/main.css">
</head>
<body>
    <a href="#main" class="skip-link">Aller au contenu principal</a>
    <nav class="pd-nav" role="navigation">
        <a href="../index.html#projets" class="pd-nav-back">← Tous les projets</a>
        <a href="../index.html" class="nav-logo">Aliocha Deflou</a>
    </nav>

    <main id="main">
        <article>
            <header class="pd-hero">
                <div class="pd-meta">
                    <span class="accent">2025</span>
                    <span>·</span>
                    <span>Multijoueur Temps Réel · Projet d'équipe</span>
                </div>
                <h1 class="pd-title">Bug of Thrones.</h1>
                <p class="pd-tagline">Shoot'em up multijoueur temps réel à 2 joueurs. Architecture client/serveur strictement séparée avec serveur autoritaire à 60 FPS via Socket.IO, leaderboard SQLite et 30 tests automatisés.</p>
                <div class="pd-image">
                    <img src="../assets/img/bug-of-thrones-gameplay.webp" alt="Capture d'écran du gameplay de Bug of Thrones" loading="eager">
                </div>
            </header>

            <section class="pd-section">
                <h2>Le <em>contexte</em>.</h2>
                <p>SAÉ BUT2 Informatique, IUT de Lille, équipe de 3 (Aubin Cambier, Aliocha Deflou, Sewan Hamida). L'objectif : produire un jeu multijoueur temps réel complet en TypeScript, avec une vraie séparation client/serveur, un leaderboard persistant et une suite de tests automatisés.</p>
                <p>Contrainte forte : le serveur doit être <strong>autoritaire</strong> (toute la logique de jeu côté serveur, le client n'est qu'un rendu) pour empêcher la triche et simplifier la synchronisation à 2 joueurs.</p>
            </section>

            <section class="pd-section">
                <h2>La <em>stack</em>.</h2>
                <div class="pd-stack-grid">
                    <div class="pd-stack-item"><span class="lab">Langage</span>TypeScript</div>
                    <div class="pd-stack-item"><span class="lab">Réseau</span>Socket.IO</div>
                    <div class="pd-stack-item"><span class="lab">Backend</span>Node.js</div>
                    <div class="pd-stack-item"><span class="lab">Rendu</span>Canvas API</div>
                    <div class="pd-stack-item"><span class="lab">Persistance</span>SQLite</div>
                    <div class="pd-stack-item"><span class="lab">Build</span>Vite</div>
                    <div class="pd-stack-item"><span class="lab">Conteneur</span>Docker / Podman</div>
                </div>
            </section>

            <section class="pd-section">
                <h2>L'<em>architecture</em>.</h2>
                <p>Trois modules strictement séparés : <strong>client</strong> (TypeScript + Canvas, envoie des inputs et affiche l'état reçu), <strong>server</strong> (Node.js + Socket.IO, exécute le tick autoritaire à 60 FPS), <strong>shared</strong> (types et constantes partagés).</p>
                <p>Le client envoie ses inputs via WebSocket dans un setInterval. Le serveur stocke le dernier input par joueur, puis l'applique dans son tick à 60 FPS, et broadcaste l'état complet à tous les joueurs de la room.</p>
                <p>Le leaderboard est sauvegardé en SQLite à la mort du joueur ou à sa déconnexion. Consultable via un socket dédié depuis le menu.</p>
            </section>

            <section class="pd-section">
                <h2>Les <em>défis</em>.</h2>
                <ul>
                    <li>Synchronisation client/serveur à 60 FPS sans interpolation côté client. Solution : server tick autoritaire avec input lag accepté, qualité testée en conditions réseau dégradées.</li>
                    <li>Gestion propre de la déconnexion d'un partenaire en cours de partie. Solution : event explicite côté serveur, retour propre au lobby pour le client restant.</li>
                    <li>Architecture `shared/` introduite trop tard, types dupliqués pendant le développement. Leçon : définir les contrats d'interface en premier, dès le sprint 1.</li>
                </ul>
            </section>

            <section class="pd-section">
                <h2>Les <em>apprentissages</em>.</h2>
                <p>Programmation réseau temps réel (WebSocket, Socket.IO), simulation autoritaire à tick fixe, écriture de 30 tests automatisés (collisions, mouvement, logique serveur, intégration socket), conteneurisation avec Docker et Podman, et l'importance de l'architecture dès le sprint 1 plutôt qu'en cours de route.</p>
            </section>

            <section class="pd-section">
                <h2>Liens.</h2>
                <div class="pd-cta">
                    <a href="https://github.com/AlioDefl/bug-of-thrones" target="_blank" rel="noopener" class="contact-btn primary">Code GitHub →</a>
                    <a href="../index.html#contact" class="contact-btn">Me contacter</a>
                </div>
            </section>
        </article>
    </main>

    <footer class="footer" role="contentinfo">
        <div class="footer-inner">
            <span>© 2026 Aliocha Deflou</span>
            <div class="footer-links">
                <a href="../index.html">Accueil</a>
                <a href="../index.html#contact">Contact</a>
            </div>
        </div>
    </footer>

    <script src="../scripts/main.js"></script>
</body>
</html>
```

- [ ] **Step 3: Validation visuelle**

- Page complète avec contenu Bug of Thrones
- Image gameplay placeholder cassé (normal tant que `assets/img/bug-of-thrones-gameplay.webp` n'existe pas)

- [ ] **Step 4: Commit**

```bash
git add projets/bug-of-thrones.html
git commit -m "Add Bug of Thrones project detail page"
```

---

### Task 23: Cabinet Réflexologie detail page

**Files:**
- Create: `aliocha-deflou-v2/projets/cabinet-reflexologie.html`

- [ ] **Step 1: Copier le template**

```bash
cp projets/_template.html projets/cabinet-reflexologie.html
```

- [ ] **Step 2: Remplacer tout le contenu**

```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cabinet de Réflexologie — Étude de cas | Aliocha Deflou</title>
    <meta name="description" content="Site vitrine pour Caroline Saintenoy, réflexologue. Direction artistique organique, SEO local, données structurées Schema.org. Premier livrable client.">
    <meta name="theme-color" content="#1a1a1a">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Fraunces:ital,wght@0,300;0,400;1,300;1,400&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">

    <link rel="stylesheet" href="../styles/main.css">
</head>
<body>
    <a href="#main" class="skip-link">Aller au contenu principal</a>
    <nav class="pd-nav" role="navigation">
        <a href="../index.html#projets" class="pd-nav-back">← Tous les projets</a>
        <a href="../index.html" class="nav-logo">Aliocha Deflou</a>
    </nav>

    <main id="main">
        <article>
            <header class="pd-hero">
                <div class="pd-meta">
                    <span class="accent">2025</span>
                    <span>·</span>
                    <span>Site vitrine · Client réel</span>
                </div>
                <h1 class="pd-title">Cabinet de Réflexologie<br>de l'Audomarois.</h1>
                <p class="pd-tagline">Site vitrine pour Caroline Saintenoy, réflexologue à Nort-Leulinghem (62), spécialisée en cancérologie et handicap. Premier livrable pour un client réel.</p>
                <div class="pd-image">
                    <img src="../assets/img/reflexologie-hero.webp" alt="Site du Cabinet de Réflexologie de l'Audomarois" loading="eager">
                </div>
            </header>

            <section class="pd-section">
                <h2>Le <em>contexte</em>.</h2>
                <p>Caroline Saintenoy ouvrait son cabinet de réflexologie dans l'Audomarois (Nort-Leulinghem, près de Saint-Omer). Elle avait besoin d'un site vitrine professionnel pour son référencement local, présenter ses spécialités (réflexologie plantaire, onco-réflexologie, auriculo-réflexologie, réflexologie adaptée au handicap) et offrir un canal de prise de rendez-vous via Calendly.</p>
                <p>Mon premier livrable client réel — il fallait traduire un brief professionnel en site fini, performant et fidèle à l'univers du bien-être.</p>
            </section>

            <section class="pd-section">
                <h2>La <em>stack</em>.</h2>
                <div class="pd-stack-grid">
                    <div class="pd-stack-item"><span class="lab">HTML</span>HTML5 sémantique</div>
                    <div class="pd-stack-item"><span class="lab">CSS</span>CSS3 + custom properties</div>
                    <div class="pd-stack-item"><span class="lab">JS</span>JavaScript vanilla</div>
                    <div class="pd-stack-item"><span class="lab">SEO</span>Schema.org + Open Graph</div>
                    <div class="pd-stack-item"><span class="lab">Fonts</span>Cormorant Garamond + Nunito Sans</div>
                </div>
                <p>100 % statique, pas de framework, pas de build. Hébergement simple, déploiement direct.</p>
            </section>

            <section class="pd-section">
                <h2>La <em>direction artistique</em>.</h2>
                <p>Palette organique sur-mesure inspirée de la nature : <strong>sauge</strong> (#8B9E7C), <strong>lin</strong> (#F5F0EB), <strong>argile</strong> (#C4A882), <strong>mousse</strong> (#5C6B4F). Typographies appairées : Cormorant Garamond pour les titres (serif éditorial), Nunito Sans pour le corps (sans-serif moderne).</p>
                <p>L'objectif : un site qui respire le bien-être, sans clichés zen-zenitude bateau, avec une vraie identité visuelle qui distingue Caroline de ses concurrentes.</p>
            </section>

            <section class="pd-section">
                <h2>Les <em>défis</em>.</h2>
                <ul>
                    <li>Optimiser le référencement local sur des requêtes spécifiques ("réflexologie Saint-Omer", "onco-réflexologie", "réflexologue Audomarois"). Solution : Schema.org HealthAndBeautyBusiness avec coordonnées géographiques précises, balises locales, contenu géolocalisé.</li>
                    <li>Garantir l'accessibilité sur un site présentant des soins de santé (public potentiellement âgé, handicap). Solution : navigation clavier complète, contrastes WCAG AAA, ARIA labels partout.</li>
                    <li>Performance sur connexion lente (zone rurale). Solution : 100 % statique, single-page, preconnect Google Fonts, images optimisées.</li>
                </ul>
            </section>

            <section class="pd-section">
                <h2>Les <em>apprentissages</em>.</h2>
                <p>Direction artistique web avec palette personnalisée et typographies appairées, SEO technique avec Schema.org, gestion d'un projet client réel (brief, allers-retours, validation, livraison), et la valeur d'un site simple bien fait pour un usage professionnel ciblé.</p>
            </section>

            <section class="pd-section">
                <h2>Liens.</h2>
                <div class="pd-cta">
                    <a href="https://github.com/AlioDefl/site-reflexologie-audomarois" target="_blank" rel="noopener" class="contact-btn primary">Code GitHub →</a>
                    <a href="../index.html#contact" class="contact-btn">Me contacter</a>
                </div>
            </section>
        </article>
    </main>

    <footer class="footer" role="contentinfo">
        <div class="footer-inner">
            <span>© 2026 Aliocha Deflou</span>
            <div class="footer-links">
                <a href="../index.html">Accueil</a>
                <a href="../index.html#contact">Contact</a>
            </div>
        </div>
    </footer>

    <script src="../scripts/main.js"></script>
</body>
</html>
```

- [ ] **Step 3: Validation visuelle**

- Page complète Cabinet de Réflexologie
- Image hero placeholder cassé tant que le fichier n'existe pas

- [ ] **Step 4: Commit**

```bash
git add projets/cabinet-reflexologie.html
git commit -m "Add Cabinet de Réflexologie project detail page"
```

---

## PHASE 5 — Pipeline assets

### Task 24: Asset processing (conversion WebP)

**Files:**
- Create: `aliocha-deflou-v2/assets/img/portrait.webp`
- Create: `aliocha-deflou-v2/assets/img/bug-of-thrones-gameplay.webp` (et autres si fournis)
- Create: `aliocha-deflou-v2/assets/img/reflexologie-hero.webp`

**Pré-requis** : le concepteur a déposé les images brutes dans `assets/source/` (mentionné en fin de Task 7).

- [ ] **Step 1: Vérifier les fichiers déposés**

```bash
ls -la assets/source/
```

Liste les fichiers présents. Si rien : demander au concepteur de déposer ses images avant de continuer.

- [ ] **Step 2: Vérifier la disponibilité d'un convertisseur WebP**

```bash
cwebp -version 2>&1 || echo "cwebp non disponible — fallback sur copie sans conversion"
```

- [ ] **Step 3: Si `cwebp` disponible, convertir chaque image**

Pour chaque image dans `assets/source/`, exécuter :

```bash
# Portrait : crop carré 800x800 (à faire manuellement avant ou via outil) puis :
cwebp -q 85 assets/source/portrait.jpg -o assets/img/portrait.webp

# Bug of Thrones (conserver ratio, max 1600px de large) :
cwebp -q 85 -resize 1600 0 assets/source/bug-of-thrones-1.png -o assets/img/bug-of-thrones-gameplay.webp

# Réflexologie :
cwebp -q 85 -resize 1600 0 assets/source/reflexologie-1.png -o assets/img/reflexologie-hero.webp
```

Ajuster les noms de fichiers source en fonction de ce que le concepteur a effectivement déposé.

- [ ] **Step 4: Si `cwebp` indisponible, copier les fichiers sans conversion**

```bash
cp assets/source/portrait.jpg assets/img/portrait.webp
cp assets/source/bug-of-thrones-1.png assets/img/bug-of-thrones-gameplay.webp
cp assets/source/reflexologie-1.png assets/img/reflexologie-hero.webp
```

(Le `.webp` dans le nom est trompeur si la conversion n'a pas eu lieu, mais ça simplifie la suite. À convertir plus tard via service en ligne si nécessaire.)

- [ ] **Step 5: Vérifier les tailles**

```bash
ls -lh assets/img/
```

Cible : chaque fichier < 200 KB. Si plus gros, le concepteur doit les compresser via un outil tiers (Squoosh.app, TinyPNG, etc.).

- [ ] **Step 6: Validation visuelle**

Recharger `index.html` : les images apparaissent dans la section About et les cards Featured Projects. Recharger `projets/bug-of-thrones.html` et `projets/cabinet-reflexologie.html` : images hero présentes.

- [ ] **Step 7: Commit**

```bash
git add assets/img/
git commit -m "Add optimized project assets (portrait, screenshots)"
```

---

### Task 25: Favicon et OG image

**Files:**
- Copy: `aliocha-deflou-v2/assets/icons/favicon.png` (depuis aliocha-deflou)
- Copy: `aliocha-deflou-v2/assets/icons/og-image.png` (depuis aliocha-deflou)
- Modify: `aliocha-deflou-v2/index.html` (ajout des balises favicon + og)
- Modify: `aliocha-deflou-v2/projets/*.html` (ajout des balises favicon + og)

- [ ] **Step 1: Copier les icônes existantes**

```bash
cp "../aliocha-deflou/favicon.png" assets/icons/favicon.png
cp "../aliocha-deflou/og-image.png" assets/icons/og-image.png
```

(Si ce chemin relatif ne fonctionne pas depuis le shell, utiliser le chemin absolu Windows.)

- [ ] **Step 2: Ajouter les balises dans `<head>` de `index.html`**

Avant la balise `<link rel="stylesheet">` :

```html
<link rel="icon" type="image/png" href="assets/icons/favicon.png">
<link rel="apple-touch-icon" href="assets/icons/favicon.png">

<meta property="og:type" content="website">
<meta property="og:url" content="https://aliodefl.github.io/aliocha-deflou-v2/">
<meta property="og:title" content="Aliocha Deflou — Étudiant développeur fullstack">
<meta property="og:description" content="Portfolio d'Aliocha Deflou, étudiant en BUT Informatique à l'IUT de Lille, à la recherche d'une alternance fullstack pour septembre 2026.">
<meta property="og:image" content="https://aliodefl.github.io/aliocha-deflou-v2/assets/icons/og-image.png">
<meta property="og:locale" content="fr_FR">
<meta property="og:site_name" content="Aliocha Deflou">

<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Aliocha Deflou — Étudiant développeur fullstack">
<meta name="twitter:description" content="Portfolio fullstack — alternance septembre 2026 à Lille.">
<meta name="twitter:image" content="https://aliodefl.github.io/aliocha-deflou-v2/assets/icons/og-image.png">

<link rel="canonical" href="https://aliodefl.github.io/aliocha-deflou-v2/">
```

- [ ] **Step 3: Adapter les balises pour chaque page projet**

Pour chaque fichier dans `projets/*.html`, ajouter (après le titre) :

```html
<link rel="icon" type="image/png" href="../assets/icons/favicon.png">
<link rel="canonical" href="https://aliodefl.github.io/aliocha-deflou-v2/projets/[SLUG].html">

<meta property="og:type" content="article">
<meta property="og:title" content="[Titre projet] — Étude de cas | Aliocha Deflou">
<meta property="og:description" content="[Description courte, identique à meta description]">
<meta property="og:image" content="https://aliodefl.github.io/aliocha-deflou-v2/assets/icons/og-image.png">
<meta property="og:locale" content="fr_FR">
```

Remplacer `[SLUG]` par `trading-bot`, `bug-of-thrones`, `cabinet-reflexologie`.

- [ ] **Step 4: Validation**

- Recharger `index.html` : le favicon doit apparaître dans l'onglet
- Tester l'OG via [Open Graph Debugger](https://www.opengraph.xyz/) après déploiement (Phase 7)

- [ ] **Step 5: Commit**

```bash
git add assets/icons/ index.html projets/*.html
git commit -m "Add favicon and Open Graph meta tags on all pages"
```

---

## PHASE 6 — SEO + accessibility

### Task 26: Sitemap, robots.txt, JSON-LD

**Files:**
- Create: `aliocha-deflou-v2/sitemap.xml`
- Create: `aliocha-deflou-v2/robots.txt`
- Modify: `aliocha-deflou-v2/index.html` (ajout JSON-LD)

- [ ] **Step 1: Créer `sitemap.xml`**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>https://aliodefl.github.io/aliocha-deflou-v2/</loc>
        <lastmod>2026-05-08</lastmod>
        <changefreq>weekly</changefreq>
        <priority>1.0</priority>
    </url>
    <url>
        <loc>https://aliodefl.github.io/aliocha-deflou-v2/projets/trading-bot.html</loc>
        <lastmod>2026-05-08</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>
    <url>
        <loc>https://aliodefl.github.io/aliocha-deflou-v2/projets/bug-of-thrones.html</loc>
        <lastmod>2026-05-08</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>
    <url>
        <loc>https://aliodefl.github.io/aliocha-deflou-v2/projets/cabinet-reflexologie.html</loc>
        <lastmod>2026-05-08</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>
</urlset>
```

- [ ] **Step 2: Créer `robots.txt`**

```
User-agent: *
Allow: /

Sitemap: https://aliodefl.github.io/aliocha-deflou-v2/sitemap.xml
```

- [ ] **Step 3: Ajouter le JSON-LD Person dans `<head>` de `index.html`**

Juste avant `</head>` :

```html
<script type="application/ld+json">
{
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Aliocha Deflou",
    "givenName": "Aliocha",
    "familyName": "Deflou",
    "jobTitle": "Étudiant en BUT Informatique",
    "alumniOf": {
        "@type": "EducationalOrganization",
        "name": "IUT de Lille"
    },
    "knowsAbout": ["React", "TypeScript", "Python", "FastAPI", "Java", "PostgreSQL", "Docker"],
    "url": "https://aliodefl.github.io/aliocha-deflou-v2/",
    "sameAs": [
        "https://github.com/AlioDefl",
        "https://www.linkedin.com/in/aliocha-deflou/"
    ],
    "email": "aliocha.deflou@gmail.com",
    "seeks": {
        "@type": "JobPosting",
        "title": "Alternance fullstack",
        "datePosted": "2026-05-08",
        "validThrough": "2026-09-01",
        "jobLocation": {
            "@type": "Place",
            "address": {
                "@type": "PostalAddress",
                "addressLocality": "Lille",
                "addressCountry": "FR"
            }
        }
    }
}
</script>
```

- [ ] **Step 4: Commit**

```bash
git add sitemap.xml robots.txt index.html
git commit -m "Add sitemap, robots.txt and JSON-LD Person structured data"
```

---

### Task 27: 404 page

**Files:**
- Create: `aliocha-deflou-v2/404.html`

- [ ] **Step 1: Créer `404.html`**

```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>404 — Page introuvable | Aliocha Deflou</title>
    <meta name="theme-color" content="#1a1a1a">
    <meta name="robots" content="noindex">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Fraunces:ital,wght@0,300;0,400;1,300;1,400&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">

    <link rel="stylesheet" href="styles/main.css">
    <link rel="icon" type="image/png" href="assets/icons/favicon.png">
</head>
<body>
    <main style="min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 4rem 2rem; text-align: center; gap: 2rem;">
        <span class="label" style="color: var(--accent);">Erreur 404</span>
        <h1 style="font-size: clamp(4rem, 12vw, 10rem); font-weight: 700; letter-spacing: -4px; line-height: 0.9;">Page <em class="serif-italic">introuvable</em>.</h1>
        <p style="font-size: 1.1rem; color: var(--text-muted); max-width: 500px;">La page que tu cherches n'existe pas ou a été déplacée. Retourne à l'accueil pour explorer mes projets.</p>
        <a href="/aliocha-deflou-v2/" class="contact-btn primary">← Retour à l'accueil</a>
    </main>
</body>
</html>
```

- [ ] **Step 2: Commit**

```bash
git add 404.html
git commit -m "Add custom 404 page"
```

---

### Task 28: Accessibility & reduced-motion audit

**Files:**
- Modify: `aliocha-deflou-v2/index.html` (corrections éventuelles)
- Modify: `aliocha-deflou-v2/styles/main.css` (corrections éventuelles)

- [ ] **Step 1: Audit clavier sur `index.html`**

Ouvre `index.html`, navigue uniquement au clavier (Tab, Shift+Tab, Enter) :
- Skip link visible et fonctionnel sur première Tab ✓
- Tous les liens et boutons accessibles ✓
- Pas de focus trap ✓
- Outline visible sur focus (ajouter si manquant)

- [ ] **Step 2: Si focus invisible, ajouter dans `main.css` à la fin**

```css
/* ---------- Focus visibility ---------- */
*:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 4px;
    border-radius: 4px;
}
button:focus-visible, a:focus-visible {
    outline-color: var(--accent);
}
```

- [ ] **Step 3: Audit `prefers-reduced-motion`**

Active `prefers-reduced-motion: reduce` dans DevTools (Rendering panel) puis recharge :
- Aucune animation de scroll reveal ✓
- Pas de cursor custom ✓
- Pas de marquee qui scroll ✓
- Pas de pulsation sur status pill ✓

Si le marquee continue de bouger : ajouter à la fin de `main.css` :

```css
@media (prefers-reduced-motion: reduce) {
    .marquee-track { animation: none; }
    .status-pill .pulse { animation: none; }
    .hero-scroll::after { animation: none; }
}
```

- [ ] **Step 4: Audit alt text**

Vérifier que toutes les `<img>` ont un `alt` non-vide et descriptif. Si une image est purement décorative, utiliser `alt=""`.

- [ ] **Step 5: Audit contrastes**

Lancer un check Lighthouse local (ou utiliser [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)) :
- `--text` (#f5f0e8) sur `--bg` (#1a1a1a) : ratio attendu ≥ 14:1 ✓
- `--text-muted` (#8a8275) sur `--bg` (#1a1a1a) : ratio attendu ≥ 4.5:1 ✓
- `--accent` (#d4a574) sur `--bg` (#1a1a1a) : ratio attendu ≥ 4.5:1 ✓

Si un contraste échoue, ajuster la variable CSS dans `:root`.

- [ ] **Step 6: Commit (si modifications)**

```bash
git add styles/main.css index.html
git commit -m "Improve accessibility: focus-visible, reduced-motion, contrast"
```

---

## PHASE 7 — Déploiement

### Task 29: Création du repo GitHub et premier push

**Files:**
- Aucun fichier modifié

- [ ] **Step 1: Vérifier l'état git local**

```bash
git status
git log --oneline | head -20
```

Expected : working tree clean, ~25-30 commits sur `main`.

- [ ] **Step 2: Copier le CV PDF depuis l'ancien repo**

```bash
cp "../aliocha-deflou/CV_Aliocha_DEFLOU.pdf" CV_Aliocha_DEFLOU.pdf
git add CV_Aliocha_DEFLOU.pdf
git commit -m "Add CV PDF"
```

- [ ] **Step 3: Créer le repo GitHub via gh**

```bash
"/c/Program Files/GitHub CLI/gh.exe" repo create AlioDefl/aliocha-deflou-v2 --public --source=. --description "Refonte du portfolio d'Aliocha Deflou — dark mode minimaliste type Alture, fullstack web positioning, alternance sept. 2026" --homepage "https://aliodefl.github.io/aliocha-deflou-v2/" --push
```

Expected : URL du repo créé + push réussi.

- [ ] **Step 4: Activer GitHub Pages**

```bash
"/c/Program Files/GitHub CLI/gh.exe" api -X POST "/repos/AlioDefl/aliocha-deflou-v2/pages" -f "source[branch]=main" -f "source[path]=/" 2>&1 | tail -5
```

Si erreur "already exists", c'est OK : Pages est déjà actif. Sinon le workflow GitHub Actions s'occupera du déploiement sur le prochain push.

- [ ] **Step 5: Attendre le déploiement initial**

```bash
sleep 30
"/c/Program Files/GitHub CLI/gh.exe" run list --repo AlioDefl/aliocha-deflou-v2 --limit 3
```

Vérifier qu'un workflow `Deploy static content to Pages` est en cours ou réussi.

---

### Task 30: Verify deployment + Lighthouse audit

**Files:**
- Aucun fichier modifié (sauf si corrections nécessaires)

- [ ] **Step 1: Ouvrir le site déployé dans le navigateur**

URL : `https://aliodefl.github.io/aliocha-deflou-v2/`

Vérifier :
- Index charge sans erreur ✓
- Hero affiche le tagline avec italiques ✓
- Featured projects affichent les images ✓
- Marquee scrolle ✓
- Contact CTA s'affiche ✓
- Footer présent ✓

- [ ] **Step 2: Tester les pages projets**

Naviguer vers chaque page projet :
- `https://aliodefl.github.io/aliocha-deflou-v2/projets/trading-bot.html`
- `https://aliodefl.github.io/aliocha-deflou-v2/projets/bug-of-thrones.html`
- `https://aliodefl.github.io/aliocha-deflou-v2/projets/cabinet-reflexologie.html`

Vérifier que les chemins relatifs (CSS, JS, images) fonctionnent en production.

- [ ] **Step 3: Lancer un audit Lighthouse**

Dans Chrome DevTools > Lighthouse > Mode Mobile + Performance/Accessibility/Best Practices/SEO. Cibles spec :
- Performance ≥ 95
- Accessibility ≥ 95
- Best Practices ≥ 95
- SEO ≥ 95

Noter les scores obtenus.

- [ ] **Step 4: Si un score est < 95, lister les problèmes signalés**

Pour chaque audit échoué, identifier la cause et corriger :
- Image trop large → recompresser
- Mauvais contraste → ajuster variable
- ARIA manquant → ajouter
- Title/description trop long ou manquant → ajuster
- Heading hierarchy → corriger
- etc.

Commit chaque correction séparément :

```bash
git add [fichiers modifiés]
git commit -m "Lighthouse fix: [problème spécifique]"
git push
```

- [ ] **Step 5: Re-run Lighthouse jusqu'à atteindre les cibles**

- [ ] **Step 6: Test final visuel sur 3 résolutions**

- Desktop (1920×1080)
- Tablet (768×1024)
- Mobile (375×667)

Vérifier qu'aucun bug d'affichage ne subsiste.

- [ ] **Step 7: Annonce de fin**

Le site est en ligne, fonctionnel, audité. URL principale :
`https://aliodefl.github.io/aliocha-deflou-v2/`

À ce stade, le concepteur peut :
1. Comparer visuellement v2 et v1 et confirmer qu'il préfère v2
2. Si validation : décider de la bascule (remplacer le contenu de `aliocha-deflou` par celui de `v2`, ou rediriger le domaine principal vers v2)
3. Fournir les contenus exacts pour les sections About, Education, Experience qui contiennent encore des templates

---

## Self-review du plan

**1. Spec coverage** :

| Section spec | Couvert par | OK ? |
|---|---|---|
| 1. Contexte/objectifs | Phase 1-7 implémentent le tout | ✓ |
| 2. Architecture (sitemap, modèle, navigation) | Task 1, 4, 20-23 | ✓ |
| 3. Identité visuelle (palette, typo, animations) | Task 3, 16-19 | ✓ |
| 4. Sections du one-pager (11) | Task 4-15 | ✓ |
| 5. Pages projets | Task 20-23 | ✓ |
| 6. Tech & déploiement | Task 1, 2, 29 | ✓ |
| 7. Pipeline assets | Task 24, 25 | ✓ |
| 8. Tests/validation | Task 28, 30 | ✓ |

Aucune section non couverte.

**2. Placeholder scan** :

Le plan contient quelques `[ENTRÉE À PRÉCISER]` pour Education et Experience (Tasks 12-13). Ces placeholders sont **intentionnels** et explicitement annotés : le concepteur doit fournir le contenu réel. C'est documenté dans la task et dans la note "Le concepteur fournira X". Acceptable.

Aucun "TBD", "TODO", "à finaliser" non-annoté ailleurs.

**3. Type/naming consistency** :

- `--bg` cohérent partout
- `--accent` cohérent partout
- IDs HTML cohérents : `#hero`, `#about`, `#projets`, `#stack`, `#why`, `#formations`, `#experiences`, `#contact`, `#main`, `#nav`, `#nav-links`, `#nav-hamburger`
- Noms de fichiers WebP cohérents : `bug-of-thrones-gameplay.webp`, `reflexologie-hero.webp`, `portrait.webp`
- Slug projets cohérents : `trading-bot`, `bug-of-thrones`, `cabinet-reflexologie`

**4. Ambiguity check** :

- Task 11 mentionne "Why hire me" comme section, et l'ID HTML est `#why` — cohérent
- Task 15 footer parle de "lien repo GitHub" : URL est `https://github.com/AlioDefl/aliocha-deflou-v2`, créée plus tard en Task 29. Pas de problème : le site fonctionne sans le repo (lien donnera 404 jusqu'au push).
- Tasks 24-25 dépendent du concepteur (assets, copies). Documentées comme telles.

Plan OK.

---

**Fin du plan.**
