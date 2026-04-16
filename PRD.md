# ArtistScale Studio - Product Requirements Document

## Overview
**Purpose:** A high-precision, premium utility for traditional artists that bridges the gap between digital pixels and physical paper (A1–A5) through Real-World Scaling.

**Core Value:** Enables artists to take physical measurements directly from their screen to understand exactly how a portrait or subject will fit on actual paper.

**Tech Stack:** React, TypeScript, Tailwind CSS, Dexie.js (IndexedDB), shadcn/ui with Neubrutalism design

---

## 1. Navigation & Core Pages

### Landing Page (Premium Experience)
- Massive, deep-scroll landing page with premium dark aesthetic
- High-fidelity sections explaining "Real-Sync" methodology
- Smooth animations and detailed breakdowns of sketching accuracy improvements
- Inspired by Grass.io UI and color palette

### Gallery
- Modular "Bento-style" library for managing saved projects
- High-quality thumbnails with project previews
- Confirmation modal for deleting data from IndexedDB
- Local-first storage with no user accounts required

### Workspace
- Professional studio environment
- Clean, distraction-free interface
- Reference image and precision tools integration

---

## 2. Physical-First Cropping System

### A-Series Logic
- Native support for A1, A3, A4, and A5 dimensions
- Treats each format as distinct physical entities:
  - A4: 21.0 × 29.7 cm
  - A5: 14.8 × 21.0 cm

### Custom Dimensions
- Users can enter any specific Height and Width in cm

### Locked Precision
- Crop tool locks to exact mathematical ratio of chosen paper
- Zoom and pan functionality within "physical window"
- Perfect subject framing capability

---

## 3. The "Real-Sync" Grid Engine

### Grid Types
- Independent, toggleable layers for:
  - Vertical lines
  - Horizontal lines
  - Diagonal lines

### Physical Sizing (No Counts)
- Grid spacing set strictly in centimeters
- Artists enter value (e.g., 2.5 cm) or use slider
- System calculates lines based on real-world distance

### Grid Numbering
- **Placement:** Toggle numbering on Left, Right, Top, Bottom edges
- **Individual Control:** Selectively remove/apply numbers to specific sides
- **Example:** Numbers only on Top and Left

### Visual Accuracy
- **Diagonal Sync:** Thickness mathematically adjusted to visually match straight lines
- **Custom Colors:** Individual colors for each grid type or one global color
- **Value Study Filter:** One-click Black & White mode for tonal value analysis

---

## 4. "Real Size" Display Mode

### Physical Mirroring
- Image scales so on-screen dimensions match actual paper size
- A4 crop measures exactly 21.0 cm wide on monitor

### Ruler Accuracy
- 1 cm grid cell on screen measures exactly 1 cm with physical ruler

### Full Canvas View
- Pan around image while maintaining true-to-life physical scale
- Essential for large formats like A1

---

## 5. Technical Specifications

### Storage
- High-res image blobs stored locally via IndexedDB (Dexie.js)
- Crop coordinates, cm-spacing, and color preferences saved locally
- No user accounts - data isolated per browser/device

### Download Options
- Export processed image with toggle options:
  - Include Grid/Numbers
  - Export Clean Crop

### UI Aesthetic
- Strict Dark Theme inspired by Grass.io
- Professional, minimalist layout
- Neubrutalism UI design using shadcn/ui components

### Architecture
- Componentized and reusable code structure
- Maintainable codebase with proper separation of concerns
- No hardcoding - all configuration driven

---

## Design System

### Color Palette
- Dark theme throughout (Grass.io inspired)
- Neubrutalism styling with bold shadows and borders

### Components
- All UI elements built as reusable components
- shadcn/ui base with Neubrutalism customization
- Consistent spacing, typography, and interaction patterns

---

## Data Privacy
- All data stored locally via IndexedDB
- No cloud storage or user accounts
- Each browser/device has isolated data
- No cross-user data visibility
