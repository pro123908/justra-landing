# Justra — Client Design Guide

Design system reference for the Justra escrow workspace client application.

---

## Table of Contents

1. [Design Philosophy](#design-philosophy)
2. [Typography](#typography)
3. [Color Tokens](#color-tokens)
4. [Spacing & Shape](#spacing--shape)
5. [Shadows](#shadows)
6. [Layout Shell](#layout-shell)
7. [Sidebar](#sidebar)
8. [Topbar](#topbar)
9. [Buttons](#buttons)
10. [Inputs & Forms](#inputs--forms)
11. [Cards](#cards)
12. [Status Pills & Milestone Status](#status-pills--milestone-status)
13. [Tables](#tables)
14. [Tabs](#tabs)
15. [Modals](#modals)
16. [Avatars](#avatars)
17. [Progress Bar](#progress-bar)
18. [Stats / KPI Cards](#stats--kpi-cards)
19. [Project Cards](#project-cards)
20. [Milestone List Rows](#milestone-list-rows)
21. [Detail Pages](#detail-pages)
22. [Timeline](#timeline)
23. [Alert Banners](#alert-banners)
24. [Milestone Action Bands](#milestone-action-bands)
25. [Public / Marketing Pages](#public--marketing-pages)
26. [Auth Pages](#auth-pages)
27. [Icons](#icons)
28. [Themes & Density](#themes--density)
29. [Utility Classes](#utility-classes)

---

## Design Philosophy

Justra uses a **calm, trustworthy** aesthetic — sage green as the brand color (not neon), warm neutral backgrounds, and restrained use of color. The goal is to feel like a professional B2B workspace, not a crypto app.

All design tokens are CSS custom properties defined on `:root` in `src/styles.css`. Components use these tokens directly via class names — no Tailwind utility classes on custom components.

---

## Typography

### Fonts

| Role               | Family              | Source       |
| ------------------ | ------------------- | ------------ |
| Display / Headings | `Plus Jakarta Sans` | Google Fonts |
| Body               | `Plus Jakarta Sans` | Google Fonts |
| Monospace          | `JetBrains Mono`    | Google Fonts |

Weights loaded: 400, 500, 600, 700, 800 (Plus Jakarta Sans); 400 (JetBrains Mono).

```css
--display: 'Plus Jakarta Sans', system-ui, sans-serif;
--body: 'Plus Jakarta Sans', system-ui, sans-serif;
--mono: 'JetBrains Mono', ui-monospace, Menlo, monospace;
```

Base font size: **14px**, line-height: **1.5**, antialiased.

### Heading Scale

| Class             | Size | Weight | Letter-spacing |
| ----------------- | ---- | ------ | -------------- |
| `.h-display.h1`   | 32px | 700    | -0.025em       |
| `.h-display.h2`   | 24px | 700    | -0.025em       |
| `.h-display.h3`   | 18px | 700    | -0.025em       |
| `.detail-head h1` | 30px | 800    | -0.025em       |
| `.hero h1`        | 56px | 800    | -0.03em        |

### Text Utilities

| Class         | Description                                                                |
| ------------- | -------------------------------------------------------------------------- |
| `.eyebrow`    | 12px / 600 / +0.04em tracking / `--brand-600` / uppercase — section labels |
| `.muted`      | `--ink-3` — secondary body text                                            |
| `.muted-2`    | `--ink-4` — tertiary / hint text                                           |
| `.mono`       | `--mono` font, 0.92em size                                                 |
| `.stat-label` | 11px / 600 / +0.06em / `--ink-4` / uppercase — metric labels               |
| `.stat-val`   | 28px / 700 / -0.025em / display font — KPI numbers                         |

---

## Color Tokens

All colors use the **OKLCH** color space for perceptual uniformity.

### Brand — Sage Green

| Token         | Value                  | Use                                                                     |
| ------------- | ---------------------- | ----------------------------------------------------------------------- |
| `--brand-50`  | `oklch(0.97 0.02 155)` | Active nav background, focus ring, ok-bg                                |
| `--brand-100` | `oklch(0.93 0.04 155)` | Hero card gradient, highlight underline                                 |
| `--brand-200` | `oklch(0.86 0.07 155)` | Active band border                                                      |
| `--brand-300` | `oklch(0.76 0.1 155)`  | Avatar gradient start                                                   |
| `--brand-500` | `oklch(0.55 0.09 155)` | Primary button, brand mark, active left border, progress fill, badge bg |
| `--brand-600` | `oklch(0.48 0.09 155)` | Primary button hover, links, icons, eyebrow text                        |
| `--brand-700` | `oklch(0.4 0.08 155)`  | Active nav text, tab active text, ok-ink                                |
| `--brand-900` | `oklch(0.25 0.05 155)` | Dark theme hero card gradient                                           |

### Neutrals — Warm (Light Theme)

| Token         | Value                   | Use                                             |
| ------------- | ----------------------- | ----------------------------------------------- |
| `--bg`        | `oklch(0.985 0.004 85)` | Page background                                 |
| `--bg-2`      | `oklch(0.97 0.005 85)`  | Hover states, input icon backgrounds, nav hover |
| `--surface`   | `oklch(1 0 0)`          | Cards, sidebar, topbar, modals                  |
| `--surface-2` | `oklch(0.98 0.004 85)`  | Nested surface areas                            |
| `--line`      | `oklch(0.92 0.005 85)`  | Default borders                                 |
| `--line-2`    | `oklch(0.86 0.006 85)`  | Input borders, button borders                   |
| `--line-3`    | `oklch(0.78 0.007 85)`  | Hovered borders, section dividers               |

### Ink (Text) — Light Theme

| Token     | Value                   | Use                             |
| --------- | ----------------------- | ------------------------------- |
| `--ink`   | `oklch(0.22 0.015 255)` | Primary text, headings          |
| `--ink-2` | `oklch(0.32 0.013 255)` | Body text, nav items            |
| `--ink-3` | `oklch(0.5 0.011 255)`  | Secondary / muted text          |
| `--ink-4` | `oklch(0.65 0.009 255)` | Placeholders, timestamps, icons |
| `--ink-5` | `oklch(0.78 0.007 255)` | Faintest text, stat sub-labels  |

### Status Colors

| Semantic     | Background Token                   | Text Token                          | Border / Dot Token            |
| ------------ | ---------------------------------- | ----------------------------------- | ----------------------------- |
| Success / OK | `--ok-bg` → `--brand-50`           | `--ok-ink` → `--brand-700`          | `--ok` → `--brand-500`        |
| Warning      | `--warn-bg: oklch(0.97 0.04 85)`   | `--warn-ink: oklch(0.45 0.13 65)`   | `--warn: oklch(0.72 0.13 75)` |
| Danger       | `--danger-bg: oklch(0.97 0.03 25)` | `--danger-ink: oklch(0.45 0.18 25)` | `--danger: oklch(0.6 0.2 25)` |
| Info         | `--info-bg: oklch(0.97 0.03 240)`  | `--info-ink: oklch(0.4 0.13 240)`   | `--info: oklch(0.6 0.13 240)` |

### Special Colors

| Token                         | Value                                               | Use                                     |
| ----------------------------- | --------------------------------------------------- | --------------------------------------- |
| `--neon` (implicit `#00ff80`) | Bright green                                        | Loader ring fill, CSS variable fallback |
| Phantom wallet gradient       | `linear-gradient(135deg, #ab9ff2, #534bb1)`         | Wallet connect button mark              |
| Avatar gradient               | `linear-gradient(135deg, --brand-300, --brand-600)` | User avatars                            |

### Dark Theme Overrides

Applied via `[data-theme="dark"]` on `<html>`.

| Token         | Dark Value               |
| ------------- | ------------------------ |
| `--bg`        | `oklch(0.18 0.012 255)`  |
| `--bg-2`      | `oklch(0.22 0.012 255)`  |
| `--surface`   | `oklch(0.235 0.012 255)` |
| `--surface-2` | `oklch(0.27 0.012 255)`  |
| `--line`      | `oklch(0.31 0.013 255)`  |
| `--line-2`    | `oklch(0.37 0.014 255)`  |
| `--line-3`    | `oklch(0.44 0.014 255)`  |
| `--ink`       | `oklch(0.97 0.005 255)`  |
| `--ink-2`     | `oklch(0.88 0.006 255)`  |
| `--ink-3`     | `oklch(0.72 0.008 255)`  |
| `--ink-4`     | `oklch(0.58 0.01 255)`   |
| `--ink-5`     | `oklch(0.45 0.011 255)`  |

---

## Spacing & Shape

### Border Radius

| Token   | Value | Use                                            |
| ------- | ----- | ---------------------------------------------- |
| `--r-1` | 6px   | Small chips, kbd elements                      |
| `--r-2` | 10px  | Stat cards, kv-grids, alert, chips             |
| `--r-3` | 14px  | Cards, modals, section panels, milestones list |
| `--r-4` | 20px  | Hero card, large marketing components          |

### Common Spacing

| Context              | Value            |
| -------------------- | ---------------- |
| Page padding         | `28px 32px 80px` |
| Card padding         | `22px 24px`      |
| Card padding small   | `16px 18px`      |
| Sidebar padding      | `22px 16px`      |
| Topbar height        | `60px`           |
| Modal body padding   | `22px`           |
| Modal footer padding | `14px 22px`      |

---

## Shadows

| Token      | Value                                                           | Use                  |
| ---------- | --------------------------------------------------------------- | -------------------- |
| `--sh-1`   | `0 1px 2px rgba(15,23,30,.04)`                                  | Default card         |
| `--sh-2`   | `0 1px 3px rgba(15,23,30,.05), 0 1px 2px rgba(15,23,30,.04)`    | Card hover           |
| `--sh-3`   | `0 4px 12px rgba(15,23,30,.06), 0 1px 3px rgba(15,23,30,.04)`   | Auth card, dropdowns |
| `--sh-4`   | `0 12px 32px rgba(15,23,30,.08), 0 2px 6px rgba(15,23,30,.04)`  | Hero card            |
| `--sh-pop` | `0 24px 60px rgba(15,23,30,.18), 0 6px 18px rgba(15,23,30,.08)` | Modals, popovers     |

---

## Layout Shell

The app uses a two-column CSS grid:

```
┌────────────────┬─────────────────────────────────┐
│  Sidebar 240px │  Main                           │
│  (sticky)      │  ┌───────────────────────────┐  │
│                │  │  Topbar 60px (sticky)     │  │
│                │  └───────────────────────────┘  │
│                │  .page content                  │
└────────────────┴─────────────────────────────────┘
```

```css
.app {
  display: grid;
  grid-template-columns: 240px 1fr;
  min-height: 100vh;
}
.page {
  padding: 28px 32px 80px;
  max-width: 1280px;
}
```

---

## Sidebar

**Width:** 240px, `--surface` background, sticky, full viewport height.

### Structure

```
.sidebar
  .sb-brand          ← brand mark + "Justra" name + "Escrow workspace" sub
    .sb-brand-mark   ← 32×32px, --brand-500 bg, white "J", 8px radius
    .sb-brand-name   ← 17px / 700 / -0.01em
    .sb-brand-sub    ← 11px / --ink-4

  .sb-section        ← nav group
    .sb-section-label ← 11px / 600 / uppercase / +0.08em / --ink-4
    button.sb-link   ← nav item
      .sb-ico        ← 18×18px icon, --ink-3 / --brand-600 when active
      span           ← label
      span.badge     ← optional count badge (--brand-500 bg, white text)

  .sb-user           ← bottom user block
    .sb-avatar       ← 32px circle, gradient --brand-300→--brand-600
    .sb-user-name    ← 13px / 600
    .sb-user-sub     ← 11px / --ink-4 / mono (truncated wallet address)
```

### Navigation States

| State   | Background   | Text color    | Icon color    |
| ------- | ------------ | ------------- | ------------- |
| Default | transparent  | `--ink-2`     | `--ink-3`     |
| Hover   | `--bg-2`     | `--ink`       | —             |
| Active  | `--brand-50` | `--brand-700` | `--brand-600` |

Transition: `background 0.15s, color 0.15s`

### Navigation Items by Role

**Consumer:** Dashboard, Projects, Milestones, Escrow, Settings

**Provider:** My Work, Projects, Invites (with badge), Earnings, Settings

---

## Topbar

**Height:** 60px, sticky, z-index 10, `--surface` background with bottom border.

```
.topbar
  .topbar-search     ← search field (max 480px), --bg-2 background
  .topbar-actions    ← right-aligned icon buttons
    button.iconbtn   ← 36×36px, 8px radius, border
      .dot           ← 7px notification dot, --danger fill
```

**Icon button states:**

- Default: `--surface` bg, `--line` border
- Hover: `--bg-2` bg, `--line-2` border

---

## Buttons

All buttons share base class `.btn`. Modifiers stack on top.

### Variants

| Class            | Background    | Text           | Border        | Hover                               |
| ---------------- | ------------- | -------------- | ------------- | ----------------------------------- |
| `.btn` (default) | `--surface`   | `--ink`        | `--line-2`    | `--bg-2` bg, `--line-3` border      |
| `.btn-primary`   | `--brand-500` | `#fff`         | `--brand-500` | `--brand-600` bg                    |
| `.btn-ghost`     | transparent   | `--ink-2`      | transparent   | `--bg-2` bg, `--ink` text           |
| `.btn-danger`    | `--surface`   | `--danger-ink` | `--line-2`    | `--danger-bg` bg, `--danger` border |

### Sizes

| Class            | Padding     | Font size          |
| ---------------- | ----------- | ------------------ |
| `.btn-sm`        | `6px 12px`  | 13px               |
| `.btn` (default) | `9px 16px`  | 14px               |
| `.btn-lg`        | `12px 22px` | 15px               |
| `.btn-icon`      | —           | — (36×36px square) |

Base styling: `border-radius: 8px`, `font-weight: 600`, `transition: all 0.15s`, `white-space: nowrap`.

Focus: `outline: 2px solid --brand-300; outline-offset: 2px`

---

## Inputs & Forms

### Field Wrapper

```html
<div class="field">
  <label class="field-label">Label</label>
  <input class="input" />
  <span class="field-hint">Helper text</span>
</div>
```

| Class          | Description            |
| -------------- | ---------------------- |
| `.field-label` | 13px / 600 / `--ink-2` |
| `.field-hint`  | 12px / `--ink-4`       |

### Input / Textarea / Select

- Border: `1px solid --line-2`
- Background: `--surface`
- Border-radius: 8px
- Padding: `10px 12px`
- Font: 14px / `--ink`
- **Focus:** border → `--brand-500`, box-shadow → `0 0 0 3px --brand-50`

Textarea: `min-height: 90px`, `resize: vertical`, `line-height: 1.6`

### Input with Icon

```html
<div class="input-wrap">
  <SomeIcon class="input-ico" />
  <input class="input" />
</div>
```

Icon is absolutely positioned, `left: 12px`, input gets `padding-left: 36px`.

---

## Cards

```html
<div class="card card-pad">...content...</div>
```

| Class          | Description                                                         |
| -------------- | ------------------------------------------------------------------- |
| `.card`        | `--surface` bg, `--line` border, `--r-3` radius, `--sh-1` shadow    |
| `.card-pad`    | Inner padding `22px 24px`                                           |
| `.card-pad-sm` | Inner padding `16px 18px`                                           |
| `.card-head`   | Header row: flex, space-between, `18px 24px` padding, bottom border |
| `.card-title`  | 16px / 700 / display font                                           |

---

## Status Pills & Milestone Status

Pills display inline status indicators with a colored dot.

```html
<span class="pill pill-ok">
  <span class="dot dot-pulse"></span>
  In progress
</span>
```

### Pill Variants

| Class             | Background    | Text           | Border   | Use                 |
| ----------------- | ------------- | -------------- | -------- | ------------------- |
| `.pill` (default) | `--bg-2`      | `--ink-2`      | `--line` | Neutral / draft     |
| `.pill-ok`        | `--ok-bg`     | `--ok-ink`     | none     | Completed           |
| `.pill-warn`      | `--warn-bg`   | `--warn-ink`   | none     | Pending / awaiting  |
| `.pill-danger`    | `--danger-bg` | `--danger-ink` | none     | Rejected / disputed |
| `.pill-info`      | `--info-bg`   | `--info-ink`   | none     | Active / in review  |

**Dot pulse animation:** `.dot-pulse::after` — `ping` keyframe, scale 1→2.4, opacity 0.6→0, 1.6s infinite.

### Milestone Status Map

| Status key         | Label              | Pill class    | Pulse |
| ------------------ | ------------------ | ------------- | ----- |
| `pending_provider` | Pending acceptance | `pill-warn`   | yes   |
| `awaiting_deposit` | Awaiting deposit   | `pill-warn`   | yes   |
| `active`           | In progress        | `pill-info`   | yes   |
| `in_review`        | In review          | `pill-info`   | no    |
| `completed`        | Completed          | `pill-ok`     | no    |
| `rejected`         | Rejected           | `pill-danger` | no    |
| `disputed`         | Disputed           | `pill-danger` | yes   |
| `draft`            | Draft              | (default)     | no    |

The `StatusPill` component is in [src/components/app/StatusPill.tsx](src/components/app/StatusPill.tsx).

---

## Tables

```html
<table class="table">
  <thead>
    <tr>
      <th>...</th>
    </tr>
  </thead>
  <tbody>
    <tr class="clickable">
      <td>...</td>
    </tr>
  </tbody>
</table>
```

| Element               | Style                                                                      |
| --------------------- | -------------------------------------------------------------------------- |
| `th`                  | 12px / 600 / uppercase / +0.04em / `--ink-4` / `--bg-2` bg / bottom border |
| `td`                  | `14px 16px` padding / `--ink-2` / bottom border                            |
| Last row `td`         | No bottom border                                                           |
| `.clickable:hover td` | `--bg-2` background                                                        |

---

## Tabs

```html
<div class="tabs">
  <button class="tab active">Label <span class="count">3</span></button>
  <button class="tab">Other</button>
</div>
```

| State   | Color         | Bottom border       |
| ------- | ------------- | ------------------- |
| Default | `--ink-3`     | transparent         |
| Hover   | `--ink`       | transparent         |
| Active  | `--brand-700` | `--brand-500` (2px) |

`.count` badge: `--bg-2` bg / `--ink-3` text → `--brand-50` bg / `--brand-700` text when tab is active.

---

## Modals

### Standard Modal

```html
<div class="modal-mask open">
  <div class="modal">
    <div class="modal-head">
      <h3>Title</h3>
      <button class="iconbtn btn-icon">✕</button>
    </div>
    <div class="modal-body">...</div>
    <div class="modal-foot">...</div>
  </div>
</div>
```

| Part                | Style                                                                |
| ------------------- | -------------------------------------------------------------------- |
| `.modal-mask`       | Fixed, full screen, `rgba(15,23,30,0.45)` + `blur(4px)`, z-index 100 |
| `.modal`            | `min(560px, 100%)` wide, `--r-3` radius, `--sh-pop` shadow           |
| `.modal.modal-wide` | `min(820px, 100%)`, max-height 88vh, scrollable                      |
| `.modal-head`       | `18px 22px` padding, bottom border, display font title               |
| `.modal-body`       | `22px` padding                                                       |
| `.modal-foot`       | `14px 22px` padding, top border, `--bg-2` bg, space-between flex     |

**Animations:** mask fades in (`fadein 0.18s`), modal pops up (`pop 0.2s` — opacity + translateY(8px) + scale(0.98)).

### Loading Modal

Circular progress ring component with two spinning arcs (neon green `#00ff80`) and a numeric percentage in the center. Title + subtitle text below the ring.

---

## Avatars

```html
<div class="av">A</div>
<div class="av av-sm">A</div>
<div class="av av-lg">A</div>
```

| Class    | Size    | Font       |
| -------- | ------- | ---------- |
| `.av`    | 32×32px | 12px / 700 |
| `.av-sm` | 24×24px | 11px       |
| `.av-lg` | 48×48px | 17px       |

All: circular, `linear-gradient(135deg, --brand-300, --brand-600)` background, white text.

---

## Progress Bar

```html
<div class="progress">
  <i style="width: 60%"></i>
</div>
```

Track: 6px tall, `--line` background, `999px` radius.
Fill: `--brand-500`, `transition: width 0.4s ease`.

---

## Stats / KPI Cards

```html
<div class="stat-grid">
  <!-- 4-column grid -->
  <div class="stat-card">
    <div class="stat-card-top">
      <div class="stat-card-ico stat-card-ico--brand">
        <Icon />
      </div>
      <span class="pill pill-ok">...</span>
    </div>
    <div class="stat-label">Metric Name</div>
    <div class="stat-val">42</div>
    <div class="stat-sub">supporting detail</div>
  </div>
</div>
```

### Icon Tint Variants

| Class                   | Background   | Color         |
| ----------------------- | ------------ | ------------- |
| `.stat-card-ico--brand` | `--brand-50` | `--brand-600` |
| `.stat-card-ico--info`  | `--info-bg`  | `--info-ink`  |
| `.stat-card-ico--ok`    | `--ok-bg`    | `--ok-ink`    |
| `.stat-card-ico--warn`  | `--warn-bg`  | `--warn-ink`  |

Stat card hover: `--sh-2` shadow, `--line-2` border.

---

## Project Cards

```html
<div class="proj-grid">
  <button class="proj-card">
    <div class="proj-card-head">
      <div>
        <div class="proj-card-id">PRJ-001</div>
        <div class="proj-card-title">Project Name</div>
      </div>
      <span class="pill">status</span>
    </div>
    <div class="proj-card-desc">Description text...</div>
    <div class="proj-progress">
      <div class="label">...</div>
      <div class="progress"><i style="width: X%"></i></div>
    </div>
    <div class="proj-card-foot">...</div>
  </button>
</div>
```

Grid: `repeat(auto-fill, minmax(320px, 1fr))`, gap 18px.

Card hover: `--line-3` border, `--sh-3` shadow, `translateY(-2px)`.

`.proj-card-id`: mono / 11px / `--ink-4`
`.proj-card-title`: display / 700 / 17px / -0.01em
`.proj-card-desc`: 13px / `--ink-3` / 2-line clamp

---

## Milestone List Rows

```html
<div class="ms-list">
  <button class="ms-row ok">
    <div class="ms-num">1</div>
    <div>
      <div class="ms-title">Milestone name</div>
      <div class="ms-sub">Description preview</div>
      <div class="ms-meta">...</div>
    </div>
    <span class="pill pill-ok">Completed</span>
    <div class="ms-amount">
      <div>2.5 SOL</div>
      <div class="ms-amount-sub">≈ $250</div>
    </div>
  </button>
</div>
```

### Left-border accent colors

| Row class        | Left border (`inset 3px`) |
| ---------------- | ------------------------- |
| `.ms-row.ok`     | `--brand-500`             |
| `.ms-row.warn`   | `--warn`                  |
| `.ms-row.danger` | `--danger`                |
| `.ms-row.info`   | `--info`                  |
| `.ms-row.idle`   | `--line-3`                |

`.ms-num` is a 36×36px badge that changes bg/color to match the row status.

`.ms-amount`: display font / 700 / 16px, right-aligned. Sub: 11px / `--ink-4`.

---

## Detail Pages

### Breadcrumb

```html
<div class="crumb">
  <a>Projects</a>
  <span class="sep">/</span>
  <span class="now">Current Page</span>
</div>
```

### Detail Header

```html
<div class="detail-head">
  <div>
    <h1>Page Title</h1>
    <div class="meta">
      <span>Created <b>Jan 1</b></span>
    </div>
  </div>
  <div><!-- actions --></div>
</div>
```

### Hero Band (escrow summary)

Green gradient banner showing the locked SOL amount with label + value + sub.

```css
background: linear-gradient(135deg, --brand-50, --bg-2);
border: 1px solid --brand-100;
```

Amount `.val`: display / 800 / 36px / -0.025em.

### Two-Column Layout

```html
<div class="two-col">
  <div>main content</div>
  <aside>320px sidebar</aside>
</div>
```

### KV Grid (key-value pairs)

```html
<div class="kv-grid">
  <div class="kv">
    <div class="kv-label">Field</div>
    <div class="kv-val">Value</div>
  </div>
</div>
```

2-column grid, bordered, `--r-2` radius. Odd columns have a right border. Last two rows have no bottom border.

---

## Timeline

```html
<div class="timeline">
  <div class="timeline-row">
    <div class="timeline-dot ok">✓</div>
    <div class="body">
      <div class="who">Actor name</div>
      <div class="what">Action description</div>
      <div class="when">2024-01-01 12:00</div>
    </div>
  </div>
</div>
```

Vertical connector line: 2px `--line` drawn from the dot down to next row.

| Dot class | Background    | Color     |
| --------- | ------------- | --------- |
| default   | `--surface`   | `--ink-4` |
| `.ok`     | `--brand-500` | `#fff`    |
| `.warn`   | `--warn`      | `#fff`    |

`.when` uses monospace font.

---

## Alert Banners

```html
<div class="alert info">
  <Icon class="icon" />
  <div>
    <div class="title">Alert heading</div>
    <div class="body">Detail message</div>
  </div>
</div>
```

| Class           | Background    | Border / Text          |
| --------------- | ------------- | ---------------------- |
| `.alert.info`   | `--info-bg`   | `--info-ink`           |
| `.alert.ok`     | `--ok-bg`     | `--ok-ink`             |
| `.alert.warn`   | `--warn-bg`   | `--warn-ink`           |
| `.alert.danger` | `--danger-bg` | `--danger-ink`         |
| `.alert.tip`    | `--bg-2`      | `--line-2` / `--ink-2` |

---

## Milestone Action Bands

### Deposit Band (consumer must fund)

Warning-colored gradient panel. Contains: title, description, amount card (right-aligned), metadata chips, and action buttons.

```css
background: linear-gradient(135deg, --warn-bg, --bg-2);
border: 1px solid --warn;
```

`.ms-chip`: small pill for metadata (deadline, repo, etc.) — mono font for values.

### Active Milestone Band

Brand-colored gradient panel with countdown timer and progress bar. Changes to warning/danger colors when deadline is approaching or overdue.

```css
/* Normal */
background: linear-gradient(135deg, --brand-50, --bg-2);
border: 1px solid --brand-200;

/* Warning (< 3 days) */
border: --warn; background: gradient from --warn-bg

/* Overdue */
border: --danger; background: gradient from --danger-bg
```

---

## Public / Marketing Pages

The landing page uses `.public-shell` with a `.public-nav` header.

### Hero Section

```
grid-template-columns: 1fr 460px
padding: 80px 32px 40px
max-width: 1180px
```

`.hero h1`: 56px / 800 / -0.03em — emphasized words get `--brand-600` color with a `--brand-100` highlight underline via `::after` pseudo.

`.hero p.lede`: 17px / `--ink-3` / 1.6 line-height

### Feature Grid

3-column grid of `.feature` cards. Each card has a `.feature-ico` (36×36px, `--brand-50` bg, `--brand-600` icon, 9px radius) above a title and body copy.

### Role Selection Cards

Two-column grid of clickable role cards (Consumer / Provider). Cards hover with `--brand-500` border, `--sh-3` shadow, `translateY(-2px)`. Each card contains an icon, heading, description, bullet list, and a CTA row.

---

## Auth Pages

### Centered Card Layout

```
.public-shell > .center-shell > .auth-card
```

`.center-shell`: grid place-items center, `--bg-2` background.
`.auth-card`: `min(440px, 100%)` wide, `--r-3` radius, `--sh-3` shadow.

### Wallet Connect Button

```html
<button class="wallet-btn">
  <div class="wallet-mark">◎</div>
  Phantom Wallet
  <ChevronRight class="arrow" />
</button>
```

`.wallet-mark`: `linear-gradient(135deg, #ab9ff2, #534bb1)` — Phantom purple.

Hover: `--brand-500` border, `--brand-50` background.

`.auth-step`: step indicator pill — `--brand-50` bg, `--brand-700` text.

---

## Icons

All icons are custom inline SVG components in [src/components/app/Icons.tsx](src/components/app/Icons.tsx), exported under the `Ico` object.

| Key             | Description            | Default size |
| --------------- | ---------------------- | ------------ |
| `Ico.home`      | House / dashboard      | 18×18        |
| `Ico.folder`    | Folder / projects      | 18×18        |
| `Ico.inbox`     | Inbox / invites        | 18×18        |
| `Ico.wallet`    | Wallet / escrow        | 18×18        |
| `Ico.settings`  | Gear / settings        | 18×18        |
| `Ico.search`    | Magnifier              | 16×16        |
| `Ico.bell`      | Notification bell      | 18×18        |
| `Ico.plus`      | Plus / add             | 16×16        |
| `Ico.arrowR`    | Arrow right            | 16×16        |
| `Ico.check`     | Checkmark              | 14×14        |
| `Ico.copy`      | Copy to clipboard      | 14×14        |
| `Ico.x`         | Close / dismiss        | 16×16        |
| `Ico.shield`    | Shield / security      | 20×20        |
| `Ico.lock`      | Lock                   | 20×20        |
| `Ico.sparkle`   | Sparkle / AI           | 20×20        |
| `Ico.github`    | GitHub logo (filled)   | 16×16        |
| `Ico.user`      | Person / user          | 18×18        |
| `Ico.briefcase` | Briefcase / milestones | 18×18        |
| `Ico.clock`     | Clock / time           | 14×14        |
| `Ico.upload`    | Upload arrow           | 20×20        |
| `Ico.trend`     | Trend arrow up         | 14×14        |
| `Ico.calendar`  | Calendar               | 14×14        |

All icons use `stroke="currentColor"` (except `Ico.github` which is `fill="currentColor"`), so they inherit text color.

---

## Themes & Density

### Theme

Set via `data-theme` attribute on `<html>`:

| Value          | Description                    |
| -------------- | ------------------------------ |
| (none / light) | Default warm-white light theme |
| `dark`         | Dark cool-grey theme           |

Persisted in `localStorage` as `justra_prefs.theme`. Applied before first render via inline script in `index.html` to prevent flash.

### Density

Set via `data-density` attribute on `<html>`:

| Value     | `--density` multiplier |
| --------- | ---------------------- |
| `compact` | 0.85                   |
| `cozy`    | 1.0 (default)          |
| `comfy`   | 1.15                   |

Persisted in `localStorage` as `justra_prefs.density`.

---

## Utility Classes

### Layout

| Class          | Description                                  |
| -------------- | -------------------------------------------- |
| `.row`         | `flex align-center gap-12`                   |
| `.row-between` | `flex align-center justify-between gap-12`   |
| `.stack`       | `flex flex-col`                              |
| `.grow`        | `flex: 1`                                    |
| `.two-col`     | `grid 1fr 320px gap-24` (detail page layout) |

### Gap helpers (for flex/stack)

`.gap-4`, `.gap-8`, `.gap-12`, `.gap-16`, `.gap-24`

### Miscellaneous

| Class      | Description                                                   |
| ---------- | ------------------------------------------------------------- |
| `.divider` | 1px horizontal rule, `--line` color, `16px` vertical margin   |
| `.kbd`     | Keyboard shortcut badge (mono, `--bg-2`, bottom-heavy border) |

---

## Component File Index

| Component               | Path                                                                                   |
| ----------------------- | -------------------------------------------------------------------------------------- |
| App shell wrapper       | [src/components/app/AppShell.tsx](src/components/app/AppShell.tsx)                     |
| Sidebar                 | [src/components/app/Sidebar.tsx](src/components/app/Sidebar.tsx)                       |
| Topbar                  | [src/components/app/Topbar.tsx](src/components/app/Topbar.tsx)                         |
| Modal                   | [src/components/app/Modal.tsx](src/components/app/Modal.tsx)                           |
| Status pill             | [src/components/app/StatusPill.tsx](src/components/app/StatusPill.tsx)                 |
| Page head               | [src/components/app/PageHead.tsx](src/components/app/PageHead.tsx)                     |
| Icons                   | [src/components/app/Icons.tsx](src/components/app/Icons.tsx)                           |
| Create project modal    | [src/components/app/CreateProjectModal.tsx](src/components/app/CreateProjectModal.tsx) |
| Code report (AI review) | [src/components/milestone/CodeReport.tsx](src/components/milestone/CodeReport.tsx)     |
| All design tokens       | [src/styles.css](src/styles.css)                                                       |
