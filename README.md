# ArtScale Studio

A high-precision utility for traditional artists that bridges the gap between digital references and physical paper through Real-World Scaling.

---

## What It Does

ArtScale Studio lets you take a digital reference image, crop it to an exact A-series paper ratio, overlay a centimeter-accurate grid, and export it — so every measurement on your screen maps directly to your physical paper.

The core idea is called **Real-Sync**: 1 cm on screen equals 1 cm on your paper. No guessing, no rescaling by eye.

---

## Features

- Physical-first cropping locked to A1, A3, A4, A5 ratios or custom dimensions
- Real-Sync Grid Engine with independent vertical, horizontal, and diagonal layers
- Grid spacing set in centimeters, not pixel counts
- Grid numbering toggleable per edge (top, bottom, left, right)
- Real Size display mode — calibrated to your monitor's PPI
- Value Study filter — one-click Black & White mode for tonal analysis
- Custom grid colors per layer or a single global color
- Ruler overlay with 1 cm tick accuracy
- Export as high-res PNG with or without grid overlay
- Local-first storage via IndexedDB — no accounts, no cloud, no uploads
- Bento-style Gallery for managing saved projects

---

## Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| ![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white&labelColor=20232a) | 19.2.4 | UI framework |
| ![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript&logoColor=white&labelColor=1e293b) | 6.0.2 | Type safety |
| ![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white&labelColor=1e1e2e) | 8.0.4 | Build tool & dev server |
| ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss&logoColor=white&labelColor=0f172a) | 3.4.3 | Utility-first styling |
| ![React Router](https://img.shields.io/badge/React_Router-7-CA4245?logo=reactrouter&logoColor=white&labelColor=1e1e2e) | 7.14.1 | Client-side routing |
| ![Dexie.js](https://img.shields.io/badge/Dexie.js-4-FF6B35?logoColor=white&labelColor=1e1e2e) | 4.4.2 | IndexedDB wrapper for local storage |
| ![react-easy-crop](https://img.shields.io/badge/react--easy--crop-5-abf600?logoColor=black&labelColor=1e1e2e) | 5.5.7 | Image cropping with aspect ratio lock |
| ![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-4-f3f3f3?logoColor=black&labelColor=1e1e2e) | 4.2.0 | Base UI component system |
| ![Lucide React](https://img.shields.io/badge/Lucide_React-1-f97316?logo=lucide&logoColor=white&labelColor=1e1e2e) | 1.8.0 | Icon library |

---

## Project Structure

```
src/
  pages/
    Landing.tsx       — Marketing landing page
    CropPage.tsx      — Image upload and crop tool
    Workspace.tsx     — Studio with grid engine and ruler
    Gallery.tsx       — Saved projects browser
    NotFound.tsx      — 404 page
  components/
    ui/
      button.tsx      — shadcn/ui button component
  lib/
    db.ts             — Dexie.js IndexedDB schema and instance
    utils.ts          — Utility helpers
  index.css           — Global styles and CSS variables
  main.tsx            — App entry point
  App.tsx             — Route definitions
public/
  favicon.ico
  logo.png
```

---

## Getting Started

**Install dependencies**

```bash
npm install
```

**Start the development server**

```bash
npm run dev
```

**Build for production**

```bash
npm run build
```

**Preview the production build**

```bash
npm run preview
```

---

## How It Works

1. Go to the studio and upload a reference image
2. Select your paper size (A1 through A5) or enter custom dimensions in cm
3. Crop and frame your subject — the crop locks to the exact paper ratio
4. Open the workspace to overlay a cm-based grid
5. Toggle vertical, horizontal, and diagonal layers independently
6. Enable Real Size mode to match on-screen dimensions to physical paper
7. Export as PNG with or without the grid

---

## Data & Privacy

All project data — images, crop coordinates, grid settings — is stored locally in your browser via IndexedDB. Nothing is uploaded to any server. Each browser and device has its own isolated data store.

---

## Paper Format Reference

| Format | Dimensions |
|--------|------------|
| A1 | 59.4 x 84.1 cm |
| A2 | 42.0 x 59.4 cm |
| A3 | 29.7 x 42.0 cm |
| A4 | 21.0 x 29.7 cm |
| A5 | 14.8 x 21.0 cm |

---

© 2026 ArtScale Studio
