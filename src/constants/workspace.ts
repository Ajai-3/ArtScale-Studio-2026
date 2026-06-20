export const RULER_SIZE = 32;
export const PX_PER_CM = 37.8;

export interface TourStep {
  title: string;
  content: string;
  target: string;
}

export const TOUR_STEPS: TourStep[] = [
  {
    title: "Welcome to your Workspace! 🎨",
    content: "Here is your canvas adjusted to the exact dimensions of your selected paper. The neon grid lines help you scale and draw with absolute precision.",
    target: "canvas",
  },
  {
    title: "Centimeter Rulers 📏",
    content: "The top and left rulers align perfectly with your canvas. They dynamically scale as you zoom in or out, showing exact physical dimensions in centimeters.",
    target: "rulers",
  },
  {
    title: "Real Size Calibration 🔎",
    content: "Toggle 'Real Size' to calibrate your screen. Use the PPI slider to match 1cm on screen with a real physical ruler, making paper sizes like A5 show in their actual size!",
    target: "realsize",
  },
  {
    title: "Canvas Controls 🔒",
    content: "Lock the canvas to prevent accidental zooming/scrolling while drawing. Click 'Export' to download your grid-aligned reference image as a high-quality PNG.",
    target: "controls",
  },
  {
    title: "Custom Grid Settings ⚙️",
    content: "Use the Settings panel to change cell size (cm), toggle vertical/horizontal/diagonal grid lines, show coordinate numbers, or enable Black & White filters.",
    target: "settings",
  }
];
