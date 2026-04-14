# 🌻 Positivity App — Frontend

A React single-page application that lets users transform negative thoughts into positive ones. Built with warm, encouraging design inspired by positive colour psychology.

---

## 📁 File Structure

| File | Purpose |
|------|---------|
| `index.html` | Entry HTML with Google Fonts and SEO meta tags |
| `src/main.jsx` | React entry point |
| `src/App.jsx` | Main component — Hero, Form, Loading Animation, Result, Testimonials |
| `src/App.css` | All component styles, animations, and responsive design |
| `src/index.css` | Global reset, CSS variables, and design tokens |

---

## ⚙️ Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Start the dev server

```bash
npm run dev
```

The app will be available at **http://localhost:5173**.

> **Note:** Make sure the backend is running at `http://localhost:8000` for the API calls to work.

---

## 🖥️ Page Sections

### 1. Hero
- Floating sunflower emoji with bounce animation
- Gradient headline: *"Transform Negativity into **Positivity**"*
- Encouraging subtitle

### 2. Thought Conversion Form
- **Name** input
- **Negative Thought** textarea
- Golden gradient submit button with hover lift effect

### 3. Loading Animation (while AI processes)
- 🌟 Pulsing golden orb with expanding ring waves
- 12 floating emoji particles rising across the card
- Cycling motivational messages every ~2 seconds:
  - *"🌱 Planting seeds of positivity..."*
  - *"☀️ Finding the sunshine in your words..."*
  - *"🦋 Transforming your perspective..."*
  - ...and more
- Shimmer progress bar
- Auto-scrolls into view

### 4. Result Card
- Green-tinted gradient card with sparkle animation
- Displays the AI-generated positive thought
- Original negative thought shown crossed-out below

### 5. Community Positivity Wall
- Fetches `GET /showable` from the backend on page load
- Displays each transformation as a testimonial card
- Avatar with user initials, name, date
- Negative thought (struck-through) → Positive thought (green, with accent bar)
- Staggered fade-in animation on cards

---

## 🎨 Design System

### Colour Palette (Positive Psychology)

| Token | Hex | Usage |
|-------|-----|-------|
| `--gold` | `#F59E0B` | Primary accent, buttons, orb |
| `--gold-light` | `#FBBF24` | Hover states, borders |
| `--green` | `#10B981` | Success, positive text |
| `--coral` | `#FB7185` | Warm accents |
| `--cream` | `#FFFBEB` | Background gradient start |
| `--peach` | `#FFF7ED` | Background gradient end |

### Typography
- **Font:** Inter (Google Fonts) — weights 300–800
- **Heading:** 800 weight, clamp-based fluid sizing
- **Body:** 400 weight, `#44403C`

### Animations
- `fadeInUp` — Cards and sections entrance
- `float` — Hero emoji bob
- `floatUp` — Loading emoji particles rise
- `orbPulse` — Central loading orb glow
- `ringExpand` — Ripple rings from orb
- `messageSwap` — Motivational text fade in/out
- `gentlePulse` — Result card entrance
- `sparkle` — Result card decorative sparkle

---

## 🛠️ Tech Stack

- **React 19** — UI library
- **Vite 8** — Build tool and dev server
- **Vanilla CSS** — No frameworks, full control over design
- **Google Fonts (Inter)** — Clean, friendly typography

---

## 📦 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
