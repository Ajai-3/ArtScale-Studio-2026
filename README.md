# ArtScale Studio 2026

A high-precision utility for traditional artists that bridges the gap between digital pixels and physical paper dimensions.

---

## Overview

ArtScale Studio 2026 helps artists achieve perfect precision when scaling reference images to physical paper sizes (A1 through A5 formats). Upload an image, set your paper dimensions, and get pixel-perfect framing with an advanced grid system that works with real-world centimeter measurements.

**Perfect for:** Illustrators, portrait artists, and traditional art practitioners who want digital precision tools without sacrificing artistic freedom.

---

## Tech Stack

![React](https://img.shields.io/badge/React-19.2.4-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-6.0.2-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8.0.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4.3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)

![React Router](https://img.shields.io/badge/React%20Router-7.14.1-F15025?style=for-the-badge&logo=react-router&logoColor=white)
![Dexie](https://img.shields.io/badge/Dexie.js-4.4.2-4AC3FF?style=for-the-badge&logo=indexeddb&logoColor=white)
![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-4.2.0-000000?style=for-the-badge)
![ESLint](https://img.shields.io/badge/ESLint-9.39.4-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)

---

## Key Features

- **Physical-First Cropping** - Support for A-series paper (A1, A3, A4, A5) with custom dimension support in centimeters
- **Real-Sync Grid Engine** - Independent grid layers (vertical, horizontal, diagonal) with real-world centimeter spacing
- **Grid Customization** - Adjust spacing, colors, and edge numbering (left, right, top, bottom)
- **Real Size Display Mode** - View images at true-to-life physical scale on your monitor
- **Gallery & Projects** - Save and organize multiple reference setups locally
- **Value Study Filter** - One-click black and white conversion for tonal analysis
- **Export & Download** - Export processed images with or without grid overlays
- **Local Storage** - All projects saved locally using IndexedDB (no cloud, no accounts)

---

## Project Structure

```
ArtScale-Studio-2026/
├── public/               # Static assets
├── src/
│   ├── pages/           # Page components (Landing, Gallery, Workspace, CropPage)
│   ├── components/      # Reusable UI components
│   ├── lib/
│   │   ├── db.ts       # Database configuration
│   │   └── utils.ts    # Utility functions
│   ├── assets/         # Images and resources
│   ├── App.tsx         # Root component
│   └── main.tsx        # Application entry point
├── tailwind.config.js  # Tailwind configuration
├── vite.config.ts      # Vite configuration
└── package.json        # Dependencies
```

---

## Installation

### Prerequisites

- Node.js 16+
- npm or yarn

### Setup

```bash
# Clone the repository
git clone <repository-url>
cd ArtScale-Studio-2026

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

---

## Quick Start

1. **Upload Image** - Open Workspace and upload your reference image
2. **Set Paper Size** - Choose A-series format (A1-A5) or enter custom dimensions
3. **Crop & Frame** - Use the crop tool to compose your shot perfectly
4. **Add Grid** - Enable grid layers and set spacing in centimeters
5. **Customize** - Adjust colors, numbering, and grid styles
6. **Export** - Download your reference sheet for studio use
7. **Save** - All projects auto-save to your local gallery

---

## Browser Support

- Chrome/Chromium 90+
- Firefox 88+
- Safari 14+
- Edge 90+

---

## License

ArtScale Studio 2026 - All rights reserved.
