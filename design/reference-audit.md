# Reference Audit — TechCentera & Bexon home-02

Audit completed on: **2026-08-26**  
Reference Sources:
1. `techcentera.com` (`/`, `/ai-automation/`, `/about-us/`, `/contact-us/`, `/blog/`)
2. `bexon-react.vercel.app/home-02`

---

## 1. Palette Extraction — TechCentera Only

### 1a. Elementor `:root` Global CSS Variables

Extracted directly from Elementor Global Stylesheet (`https://techcentera.com/wp-content/uploads/elementor/css/post-7.css` & `:root` DOM):

| CSS Custom Property | Raw Value | Semantic Purpose / Usage in Source | Contrast Ratio (vs #000000 / #0A0A0A) |
|---|---|---|---|
| `--e-global-color-primary` | `#000000` | Canvas base / pure black background & dark mode root | Baseline |
| `--e-global-color-secondary` | `#FFFFFF` | Primary text, heading color, button backgrounds | 21:1 (AAA) |
| `--e-global-color-text` | `#0A2540` | Deep slate/navy token (used in light mode accents / brand identity) | 1.4:1 on black (use on light surfaces only) |
| `--e-global-color-accent` | `#61CE70` | Electric mint green accent (interactive elements, highlights) | 10.7:1 on black (AAA) |
| `--e-global-color-0dae41e` | `#FFFFFF` | Card surface high-contrast text / button text | 21:1 (AAA) |
| `--e-global-color-7026c67` | `#FFFFFF42` (`rgba(255,255,255,0.26)`) | Subtle borders, dividers, subtle pill outlines | 2.5:1 (decorative border) |
| `--e-global-color-0cf417c` | `#0A0A0A` | Deep obsidian surface / card background | Baseline dark surface |

#### Additional Secondary Accent Colors Sampled Across Stylesheets:
- `#70B8FF` — Light Electric Cyan / Blue (Secondary tech accent)
- `#FFBC7D` — Warm Peach / Amber (Subtle secondary highlight)
- `#FFFFFF17` (`rgba(255,255,255,0.09)`) — Card surface subtle outline / separator

---

### 1b. Computed Element Styles & Sampling Table

Exact computed `background-color`, `color`, `border-color`, `font-family`, and `font-size` sampled from live DOM:

| Element | Selector Sampled From | Computed `background-color` | Computed `color` (Hex) | Computed `border-color` | Font Family | Size / Weight / Radius |
|---|---|---|---|---|---|---|
| **Header** | `header.elementor-location-header` | `transparent` (`#000000` via body) | `#FFFFFF` | `#FFFFFF` | `"Helvitica Now Text"` | 16px / 700 / r: 0px |
| **Header Nav Link** | `a.elementor-item` | `transparent` | `#FFFFFF` | `#FFFFFF` | `"Helvitica Now Text"` | 17px / 700 / padding: 13px 20px |
| **Hero Section** | `div.e-con.e-parent:first-of-type` | `transparent` (`#000000`) | `#FFFFFF` | `#FFFFFF` | `"Helvitica Now Text"` | 16px / 700 / max-w: 1440px |
| **Hero Heading (H1)** | `h1.elementor-heading-title` | `transparent` | `#FFFFFF` | `#FFFFFF` | `"Helvitica Now Text"` | 57px / 700 / lh: 70px |
| **Section Heading (H2)** | `h2.elementor-heading-title` | `transparent` | `#FFFFFF` | `#FFFFFF` | `"Helvitica Now Text"` | 57px / 700 / lh: 70px |
| **Body Paragraph** | `p` / `.elementor-text-editor` | `transparent` | `#FFFFFF` | `#FFFFFF` | `"Helvitica Now Text"` | 20px / 400 / lh: 30px |
| **Primary Button (Default)** | `a.elementor-button.elementor-size-sm` | `#FFFFFF` | `#000000` | `#000000` | `"Helvitica Now Text"` | 16px / 700 / r: 12px / pad: 14px 20px |
| **Primary Button (Hover)** | `a.elementor-button:hover` | `#61CE70` (accent green) or `#FFFFFF` invert | `#000000` | `#000000` | `"Helvitica Now Text"` | 16px / 700 / r: 12px |
| **Service Card** | `div.elementor-widget-icon-box` / `.e-con` | `#0A0A0A` | `#FFFFFF` | `rgba(255,255,255,0.09)` | `"Helvitica Now Text"` | 16px / 700 / r: 12px / pad: 24px |
| **Stat Counter Number** | `div.elementor-counter` | `transparent` | `#FFFFFF` | `#FFFFFF` | `"Helvitica Now Text"` | 57px / 700 / lh: 70px |
| **Stat Counter Label** | `div.elementor-counter-title` | `transparent` | `#FFFFFF` | `#FFFFFF` | `"Helvitica Now Text"` | 20px / 400 / lh: 50px |
| **Borders / Dividers** | `span.elementor-divider-separator` | `transparent` | `#FFFFFF` | `rgba(255,255,255,0.26)` | `"Helvitica Now Text"` | 1px solid `#FFFFFF42` |
| **Footer** | `footer.elementor-location-footer` | `transparent` (`#000000`) | `#FFFFFF` | `#FFFFFF` | `"Helvitica Now Text"` | 16px / 700 / r: 0px |

---

### 1c. Typography Extraction & Font Substitution

- **Extracted Live Font**: `"Helvitica Now Text"`, fallback `"Helvetica"`, `sans-serif`.
- **License Status**: *Helvetica Now Text* is a proprietary commercial typeface licensed by Monotype Imaging.
- **Google Fonts Substitution**: **Inter** (Primary) with **Outfit** or **Plus Jakarta Sans** for high-precision display headings.
  - **Proposed Font Stack**:
    - **Display / Headings (`font-display`)**: **Inter** (weights: 600, 700) with tracking `-0.025em` to exactly match Helvetica Now Text's tight neo-grotesque structural rhythm and high x-height.
    - **Body / Interface (`font-sans`)**: **Inter** (weights: 400, 500) with line-height `1.6` for clean, neutral readability.
    - **Monospace / Code / Tech badges (`font-mono`)**: **JetBrains Mono** for technical metric counters and tag badges.

---

## 2. Layout Audit — Bexon `home-02` Only

### 2a. Structural Metrics & Spacing Rhythm

| Property | Bexon home-02 Measurement | Marketing Site Adoption |
|---|---|---|
| **Max Container Width** | `1422px` (fluid breakpoints: 1200px, 992px, 768px, 576px) | `max-w-7xl` (`1280px` – `1400px` max with `px-6 md:px-12`) |
| **Section Vertical Padding** | `120px` desktop (`.section-gap`), `100px` tablet, `70px` mobile | Strict `py-24 md:py-32` (`96px` / `128px`) uniform section rhythm |
| **Asymmetric Split Ratios** | About section: `7:5` (58% left text / 42% right metric block) | Exact `7:5` asymmetric grid on About block and Hero offsets |
| **Service Rows Layout** | Generous full-width row (`py-10 px-8`, title left, bullet list middle, CTA right) | Generous 3-column row cards with hover slide indicator |
| **Card Padding & Radius** | `padding: 32px` to `48px`, `border-radius: 12px` to `16px` | `p-8 md:p-10`, `rounded-2xl` (`16px`) with `border border-border` |
| **Button Geometry** | `padding: 14px 28px`, `border-radius: 12px`, bold weight | `h-12 px-7 rounded-xl font-semibold text-sm tracking-tight` |
| **Scroll Reveal Distance** | `16px`–`24px` subtle `translateY`, opacity 0 → 1, `400ms` duration | Framer Motion with `translateY: 20px`, `duration: 0.4s`, `staggerChildren: 0.1s` |

### 2b. Reconciling Bexon into the 8-Section Marketing Site

- **Retained from Bexon**:
  - Asymmetric About block with embedded metric counters.
  - Generous full-width service rows with bullet capabilities and hover state.
  - Sequential 3-step process cards connected by clean border transitions.
  - Single weighted testimonial quote with executive avatar/credentials.
  - Calm, wide whitespace container discipline (`py-28`).
- **Eliminated from Bexon**:
  - Hero slider carousel (replaced with single static high-impact hero).
  - Brand logo marquee, portfolio carousels, pricing tables, team grid, testimonial slider.
  - Decorative SVG mesh shapes, random blob overlays, and generic template filler.

---

## 3. Screenshots Captured

All desktop (1440x900) and mobile (390x844) screenshots have been captured directly into `design/screenshots/`:
- `home_desktop.png`, `home_mobile.png`
- `ai_automation_desktop.png`, `ai_automation_mobile.png`
- `about_desktop.png`, `about_mobile.png`
- `contact_desktop.png`, `contact_mobile.png`
- `blog_desktop.png`, `blog_mobile.png`
- `bexon_desktop.png`, `bexon_mobile.png`
