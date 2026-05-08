# Portfolio Redesign — Design Spec

**Date** : 2026-05-08
**Auteur** : Aliocha Deflou (concepteur), assisté par Claude
**Projet** : Refonte complète du portfolio personnel
**Statut** : Validé par le concepteur, prêt pour planification d'implémentation
**Repo cible** : `aliocha-deflou-v2` (séparé de `aliocha-deflou` pour permettre une comparaison)

---

## 1. Contexte et objectifs

### 1.1 Public cible

Recruteurs alternance (RH, lead techs, responsables d'équipe) à la recherche d'un alternant développeur. Le portfolio doit communiquer en moins de 10 secondes :
- Le nom et la spécialisation
- Le statut "disponible alternance"
- La période et le lieu visés
- 3 projets phares qui prouvent les compétences

### 1.2 Positionnement

Développeur **technique rigoureux**, spécialisation **fullstack web** (React/TypeScript côté frontend, Python/Java côté backend). Esthétique inspirée du template **Alture** (alture-template.webflow.io) : dark mode minimaliste, typographie éditoriale, focus sur les projets.

### 1.3 Détails alternance (à exposer dans le hero)

- **Type** : BUT3 (1 an) puis Master si proposé
- **Période** : à partir de septembre 2026
- **Rythme** : 1 semaine entreprise / 1 semaine IUT
- **Lieu** : Lille
- **Type d'entreprise** : indifférent (éditeur, agence, scale-up, grand groupe — tous OK)

### 1.4 Pourquoi un nouveau repo

Refonte complète, identité visuelle nouvelle. Garder l'actuel `aliocha-deflou` intact permet :
- de comparer les deux sites côte à côte
- de revenir en arrière sans peur si le nouveau ne plaît pas
- de prendre le temps de polir avant de switcher le domaine principal

---

## 2. Architecture

### 2.1 Site map

```
aliocha-deflou-v2/
├── index.html                          # one-pager scrollable (homepage)
├── projets/
│   ├── trading-bot.html                # page détaillée projet
│   ├── bug-of-thrones.html             # page détaillée projet
│   └── cabinet-reflexologie.html       # page détaillée projet
├── 404.html                            # page d'erreur custom
├── assets/
│   ├── source/                         # screenshots bruts (non commit, .gitignore)
│   ├── img/                            # assets optimisés WebP (commit)
│   │   ├── portrait.webp
│   │   ├── bug-of-thrones-*.webp
│   │   └── reflexologie-*.webp
│   └── icons/
│       ├── favicon.png
│       └── og-image.png
├── styles/
│   └── main.css                        # variables + reset + composants + sections
├── scripts/
│   └── main.js                         # scroll reveals + nav + cursor + marquee
├── sitemap.xml
├── robots.txt
├── CV_Aliocha_DEFLOU.pdf
├── .github/workflows/static.yml        # déploiement GitHub Pages
├── .gitignore
└── README.md
```

### 2.2 Modèle de page

**Homepage (`index.html`)** : one-pager scrollable, 11 sections empilées verticalement.

**Pages projets (`projets/*.html`)** : structure standardisée par projet pour permettre la lecture comparative entre projets :
1. Hero projet (titre + tagline + image principale)
2. Contexte et problème
3. Stack technique détaillée
4. Architecture (diagramme Mermaid ou SVG)
5. Défis techniques rencontrés
6. Apprentissages
7. Liens (démo / GitHub / CTA contact)

Chaque page projet ≈ 1 écran 1.5x de scroll. But : un recruteur curieux qui veut creuser y passe 2-3 minutes.

### 2.3 Navigation

- **Nav principale** sticky en scroll, fond `--bg` avec `backdrop-filter: blur(20px)` une fois scrollé
- **Liens** : Projets · Stack · Why · Formations · Contact (ancres dans la page)
- **Bouton CV** à droite, style argile contrasté
- Sur mobile : hamburger ouvrant un drawer plein écran

---

## 3. Identité visuelle

### 3.1 Palette (validée — variation B)

| Variable CSS | Valeur | Usage |
|---|---|---|
| `--bg` | `#1a1a1a` | Fond principal (charbon) |
| `--bg-elevated` | `#232323` | Panneaux remontés (cards, modal) |
| `--bg-deep` | `#0f0f0f` | Footer, sections "deep" |
| `--text` | `#f5f0e8` | Texte principal (crème) |
| `--text-muted` | `#8a8275` | Texte secondaire (crème désaturée) |
| `--text-faint` | `#5a5447` | Labels, meta info |
| `--accent` | `#d4a574` | CTA, dots, hovers, italic Fraunces |
| `--accent-hover` | `#e0b889` | Accent hover |
| `--border` | `#2a2a2a` | Séparateurs subtils |
| `--border-strong` | `#3a3a3a` | Cards, encadrés |

Contraste vérifié WCAG AAA pour `--text` sur `--bg` (ratio 14.8:1).

### 3.2 Typographie (validée)

| Famille | Poids | Usage |
|---|---|---|
| **Inter** | 300, 400, 500, 600, 700, 800 | UI, hero name, body, headings |
| **Fraunces** | 300 italic, 400 italic | Accents éditoriaux dans tagline et titres de section |
| **IBM Plex Mono** | 400, 500 | Labels, meta, status pills, monospace |

Toutes via Google Fonts avec `preconnect` pour minimiser le FOUT.

**Échelle typographique** :
- Hero name : `clamp(48px, 8vw, 96px)` weight 700 letter-spacing -3px
- H2 sections : `clamp(32px, 5vw, 56px)` weight 600
- H3 cards : `20-24px` weight 500
- Body : `15-16px` weight 400 line-height 1.6
- Meta/labels : `11px` mono uppercase letter-spacing 1.5px

### 3.3 Animations

| Effet | Comportement | Implémentation |
|---|---|---|
| **Scroll reveals** | fade + translateY(30px) à 0, 600ms cubic-bezier(.4,0,.2,1), staggered 80ms entre éléments | IntersectionObserver |
| **Parallax léger** | images projets featured se déplacent à 0.85x du scroll | requestAnimationFrame + transform |
| **Cursor custom** | petit point argile 8px qui suit la souris, lerp 0.15, masqué sur mobile | MouseMove listener |
| **Marquee infini** | bandeau stats glisse en continu, pause au hover | CSS keyframe + duplication du contenu |
| **Hero text reveal** | mots du tagline apparaissent un par un, 60ms d'écart, à l'arrivée sur la page | JS split + CSS transitions |
| **Project card hover** | image scale(1.05) + voile sombre + titre s'élève | CSS transitions sur :hover |
| **Nav scroll state** | nav devient `backdrop-filter: blur(20px)` après 50px de scroll | scroll listener throttled |

**Principes** :
- Toutes les animations respectent `prefers-reduced-motion: reduce` → désactivées si l'utilisateur le demande
- Pas de splash screen, pas de loader (site statique, doit être instant)
- Easing systématique en `cubic-bezier(.4, 0, .2, 1)` pour cohérence

---

## 4. Sections du one-pager

Onze sections, dans l'ordre d'apparition au scroll.

### 4.1 Section 1 — Navigation

- Sticky, position fixed top
- Logo `Aliocha Deflou` à gauche (Inter 500, 13px)
- Liens centrés ou à droite : `Projets · Stack · Why · Formations · Contact`
- Bouton `Télécharger CV` à droite (style argile)
- Hauteur 60px, padding horizontal `2rem`
- Sur mobile (<500px) : hamburger qui ouvre un drawer plein écran

### 4.2 Section 2 — Hero (variation B validée)

```
[Nav]                                              [CV →]

ALIOCHA
DEFLOU.

Je conçois des *applications web* fullstack —
du backend Python à l'interface React.
*À la recherche* d'une alternance pour septembre 2026.

[● Disponible · BUT3 + Master · Lille]

BUT Informatique · IUT de Lille                ↓ Scroll
```

- Hauteur min 100vh
- Italiques Fraunces sur "applications web", "À la recherche"
- Status pill avec dot argile pulsant 2s
- Animation : reveal des mots du tagline un par un à l'arrivée

### 4.3 Section 3 — About

- Layout 2 colonnes : portrait à gauche (cadré carré 400×400), texte à droite
- Bio en 2-3 phrases (le concepteur fournira la copie exacte au moment de l'implémentation de cette section)
- Sous le bio : 3 stats en ligne (`BUT2 IUT Lille` · `10+ projets livrés` · `1 client réel — Cabinet de Réflexologie`)
- Sur mobile : portrait au-dessus, texte en dessous

### 4.4 Section 4 — Projets (fusionnée)

**Hiérarchie en deux niveaux** :

**Niveau 1 — Featured (3 cards full-width empilées verticalement)**

Chaque card :
- Layout 2 colonnes asymétrique : image à gauche (60%), texte à droite (40%) — alternance gauche/droite à chaque card
- Image projet (mockup CSS pour Trading Bot, screenshots WebP pour les autres) avec léger parallax au scroll
- Titre + année + tagline + stack tags + CTA `Lire l'étude de cas →` (lien vers `/projets/<slug>.html`)
- Hover : image scale, titre se relève, tag d'étude de cas apparait

Liste :
1. **Trading Bot Crypto** (2026, en cours, fullstack) — mockup CSS dashboard candlestick
2. **Bug of Thrones** (2025, multijoueur temps réel, projet équipe) — screenshots utilisateur
3. **Cabinet de Réflexologie** (2025, client réel) — screenshots utilisateur

**Niveau 2 — Grille 2 colonnes minimaliste**

Les 7 projets restants en cards compactes :
- Padding `2rem`, border `1px solid var(--border)`
- Titre + année + tagline 2 lignes max + stack en chips
- Lien GitHub direct si dispo, sinon mention "Code sur demande"
- Hover : border devient `--accent`, légère élévation

Liste :
4. Labyrinthe SAÉ 3.3
5. API REST EcoDrop
6. Portfolio Architecte
7. Jeu Risk
8. Séjours Linguistiques
9. Site OpenAI
10. Mauscape

(Le projet "CV Numérique" / ce site lui-même n'est pas inclus puisque c'est le portfolio courant.)

### 4.5 Section 5 — Stats marquee

Bandeau scrolling horizontal infini, hauteur 80px, fond `--bg-elevated`. Contenu dupliqué deux fois pour boucle parfaite :

```
10+ PROJETS  ·  12+ TECHNOLOGIES  ·  3 ANS DE CODE  ·  1 CLIENT RÉEL  ·  5 PROJETS D'ÉQUIPE  ·  BUT IUT LILLE  ·
```

- Texte mono uppercase, color `--text-muted`
- Vitesse : 60s par boucle complète
- Pause au hover sur le bandeau
- Séparateurs entre items : un point typographique avec `--accent`

### 4.6 Section 6 — What I do / Stack

Layout 4 colonnes (responsive : 2 col tablet, 1 col mobile). Chaque colonne :
- Numéro `01.` `02.` `03.` `04.` en mono
- Titre catégorie
- Liste des techs avec icônes minimalistes (SVG inline, pas de bibliothèque externe)

```
01. FRONTEND          02. BACKEND          03. DATA            04. TOOLING
React                 Python               PostgreSQL          Git / GitHub
TypeScript            FastAPI              SQLite              Docker
HTML5 / CSS3          Java                 SQL                 Maven
Tailwind              Servlets             Jackson             Vite
Vite                  Node.js              Schema.org          Bruno
                      Socket.IO                                IntelliJ / VS Code
```

### 4.7 Section 7 — Why hire me

3 arguments sur une ligne (3 colonnes), avec gros chiffre `01` `02` `03` en argile :

1. **Polyvalence prouvée** — Web, jeux, backend, client réel. 10 projets livrés en 3 langues principales (TypeScript, Python, Java).
2. **Rodé au travail d'équipe** — 5 développeurs sur Labyrinthe, 3 sur Bug of Thrones, gestion Git/GitLab avec rebase, merge conflicts résolus, code reviews entre pairs.
3. **Documentation et rigueur** — ADRs sur Trading Bot, Javadoc complète sur Labyrinthe, READMEs détaillés, architecture autoritaire serveur sur Bug of Thrones avec 30 tests automatisés.

### 4.8 Section 8 — Formations

Timeline verticale avec ligne argile centrale. Chaque entrée :
- Date à gauche (mono)
- Titre + établissement + description courte à droite
- Marqueur rond `--accent` sur la ligne

Le concepteur fournira la liste exacte des entrées à remplir lors de l'implémentation. Source de référence : la page `formations.html` du portfolio actuel `aliocha-deflou`. À minima :
- 2024-2027 : BUT Informatique, parcours Réalisation d'Applications, IUT de Lille
- Établissement et année du baccalauréat
- Certifications éventuelles (le concepteur précisera)

### 4.9 Section 9 — Expériences

Liste verticale type CV. Pour chaque entrée :
- Période + entreprise + poste
- 2-3 lignes de description
- Tech stack utilisée

Contenu à reprendre du portfolio actuel (`index.html` section #experiences).

### 4.10 Section 10 — Contact CTA

Section finale, full-width, fond `--bg-deep`. Texte massif type :

```
On en discute ?

Je suis disponible pour une alternance dès septembre 2026 à Lille.
Réponse garantie sous 24h.

[email]    [LinkedIn]    [GitHub]    [Télécharger CV →]
```

- Titre 80-96px Inter weight 700
- 4 boutons en ligne (responsive : stack en mobile)
- Effet hover sur chaque bouton : background `--accent`, texte `--bg`

### 4.11 Section 11 — Footer

- Layout simple 2 colonnes
- Gauche : `© 2026 Aliocha Deflou · BUT Informatique IUT Lille`
- Droite : liens `Mentions légales` · `Code source de ce site →` (lien repo GitHub) · `Sitemap`
- Padding vertical `4rem`, fond `--bg-deep`, texte `--text-faint`

---

## 5. Pages projets détaillées

### 5.1 Structure type (`projets/<slug>.html`)

1. **Nav minimal** : logo + lien retour `← Tous les projets`
2. **Hero projet** : titre 72px + tagline + image principale full-width
3. **Contexte / Problème** : 2-3 paragraphes sur le pourquoi
4. **Stack** : grille de tech tags avec brève justification de chaque choix
5. **Architecture** : diagramme (Mermaid ou SVG inline) + texte explicatif
6. **Défis techniques** : 2-3 difficultés rencontrées et résolutions
7. **Apprentissages** : ce que le projet a appris (technique + soft skills)
8. **Liens** : GitHub, démo (si applicable), CTA contact

### 5.2 Pages à produire

- `projets/trading-bot.html` — fullstack en cours, ADRs, mockup dashboard
- `projets/bug-of-thrones.html` — temps réel multijoueur, archi serveur autoritaire, screenshots
- `projets/cabinet-reflexologie.html` — site client, identité organique, SEO local

---

## 6. Tech et déploiement

### 6.1 Stack

- **HTML5** sémantique (semantic landmarks, ARIA)
- **CSS3** avec custom properties (variables), `clamp()` pour responsive, `prefers-reduced-motion` respecté
- **JavaScript vanilla** (~150-200 lignes au total, modulaire dans `scripts/main.js`)
- **Aucun framework, aucun build, aucune dépendance NPM**
- Google Fonts pour Inter, Fraunces, IBM Plex Mono (via `<link>` avec preconnect)

### 6.2 Déploiement

- **Repo** : `AlioDefl/aliocha-deflou-v2` (à créer en public sur GitHub via `gh`)
- **Hosting** : GitHub Pages (workflow `static.yml` identique à l'actuel)
- **URL** : `aliodefl.github.io/aliocha-deflou-v2/` pendant la phase de validation
- **Bascule finale** : quand le concepteur valide, on remplace le contenu de `aliocha-deflou` par celui de `v2` (ou on switch le domaine principal — décision finale au moment du go-live)

### 6.3 Performances cibles

- Lighthouse ≥ 95 sur les 4 axes (Performance, Accessibility, Best Practices, SEO)
- LCP < 1.5s sur connexion 4G simulée
- CLS < 0.05 (layout stable, dimensions explicites sur images)
- Total transfer < 500 KB (HTML + CSS + JS + 5 images WebP)

### 6.4 Accessibilité

- Skip link "Aller au contenu principal"
- Tous les liens et boutons avec `aria-label` explicite
- Navigation clavier complète (Tab, Enter, Escape)
- Contrastes WCAG AAA en dark mode (déjà vérifié pour la palette)
- `prefers-reduced-motion` désactive scroll reveals, parallax, cursor custom, marquee
- Focus states visibles (outline `--accent` 2px)

### 6.5 SEO

- Meta tags : title, description, keywords, author
- Open Graph + Twitter card
- JSON-LD `Person` avec name, jobTitle, alumniOf, knowsAbout (technologies)
- `sitemap.xml` listant les 4 pages
- `robots.txt` autorisant tous les bots
- URL canoniques sur chaque page
- Lang `fr` partout, contenu en français

---

## 7. Pipeline assets

### 7.1 Origine des assets

| Asset | Origine | Action |
|---|---|---|
| Portrait Aliocha | Concepteur dépose dans `assets/source/` | Crop carré 800×800 + conversion WebP |
| Screenshots Bug of Thrones | Concepteur dépose | Resize ≤1600px largeur + WebP |
| Screenshots Cabinet Réflexologie | Concepteur dépose | Resize ≤1600px largeur + WebP |
| Mockup Trading Bot | Construit en CSS/SVG dans le HTML | Aucun fichier image |
| Favicon, og-image | Réutilisation de l'actuel `aliocha-deflou` | Copie dans `assets/icons/` |

### 7.2 Optimisation

- Conversion WebP via `cwebp` ou outil équivalent disponible sur la machine
- Si `cwebp` indisponible : conversion manuelle via service en ligne ou conservation PNG/JPG (acceptable, mais sous-optimal)
- Toute image non-WebP doit être < 200 KB

### 7.3 Naming convention

- `<projet>-<usage>.webp` — ex : `bug-of-thrones-gameplay.webp`, `bug-of-thrones-leaderboard.webp`, `reflexologie-hero.webp`
- Portrait : `portrait.webp`
- Tout en kebab-case, ASCII, sans accents

### 7.4 Crédits Nano Banana

Aucun crédit Nano Banana / higgsfield-generate utilisé. Toutes les images proviennent du concepteur ou sont construites en CSS/SVG. Cette contrainte est explicite (le concepteur a peu de crédits restants).

---

## 8. Tests et validation

### 8.1 Tests visuels

- Vérifier le rendu sur Chrome, Firefox, Edge (Windows)
- Vérifier sur mobile (DevTools responsive : iPhone SE, iPhone 14, Galaxy S20)
- Vérifier sur tablet (iPad, iPad Pro)
- Vérifier en `prefers-reduced-motion` (tout doit être lisible sans animations)
- Vérifier en mode contraste élevé Windows

### 8.2 Tests automatisés

- Lighthouse CI sur chaque commit (workflow GitHub Actions à ajouter)
- Vérification HTML W3C
- Vérification CSS W3C
- Validation accessibilité avec `pa11y` ou équivalent

### 8.3 Validation par le concepteur

À chaque jalon (hero implémenté, section projets implémentée, etc.), le concepteur valide visuellement avant de passer au suivant. Le brainstorming a déjà validé toutes les décisions de design — il reste à valider l'implémentation à mesure qu'elle progresse.

---

## 9. Décisions explicites

Pour mémoire, voici les choix arrêtés pendant le brainstorming, dans l'ordre :

1. **Public** : recruteurs alternance (option A)
2. **Positionnement** : développeur technique rigoureux (option A) avec esthétique Alture
3. **Structure** : hybride one-pager + pages projets détaillées (option C)
4. **Spécialisation** : fullstack web (option A)
5. **Sections** : structure initiale à 12 sections proposée, puis fusionnée à 11 sur demande du concepteur (les sections "Featured Projects" et "All Projects" deviennent une seule section "Projets" avec hiérarchie interne 3 + 7)
6. **Stack tech** : vanilla HTML/CSS/JS (option A)
7. **Palette** : variation B (charbon `#1a1a1a` + crème `#f5f0e8` + accent argile `#d4a574`)
8. **Typographie** : Inter + Fraunces italic + IBM Plex Mono
9. **Featured** : 3 projets (Trading Bot, Bug of Thrones, Cabinet Réflexologie), Labyrinthe descend dans la grille
10. **Hero** : variation B (éditorial avec italiques Fraunces)
11. **Détails alternance** : BUT3 + Master, septembre 2026, 1 sem/1 sem, Lille, type d'entreprise indifférent
12. **Crédits Nano Banana** : zéro utilisé (mockup Trading Bot en CSS, autres en screenshots utilisateur)
13. **Repo** : nouveau repo `aliocha-deflou-v2` séparé de l'actuel

---

## 10. Hors-scope

Pour cadrer le périmètre du premier livrable, sont **explicitement exclus** :

- Mode clair (light mode) — le site est exclusivement en dark
- Internationalisation (anglais) — site en français uniquement
- Blog — sera ajouté plus tard si besoin
- Newsletter — non pertinent pour un portfolio étudiant
- Témoignages clients — pas de matière pour un étudiant
- Tarification / services freelance — public visé est alternance
- CMS / backend dynamique — site 100% statique
- Bascule du domaine principal — décision reportée après validation visuelle complète du v2

---

## 11. Prochaines étapes

1. Le concepteur relit ce document et valide ou demande des ajustements
2. Une fois validé, on passe à la phase **plan d'implémentation** (skill `writing-plans`) qui découpe la construction en tâches concrètes ordonnancées
3. Le concepteur dépose les screenshots dans `assets/source/` au plus tôt pour ne pas bloquer
4. Création du repo GitHub `aliocha-deflou-v2` et mise en place du workflow de déploiement
5. Implémentation par sections, validation visuelle à chaque jalon

---

**Fin du document**.
