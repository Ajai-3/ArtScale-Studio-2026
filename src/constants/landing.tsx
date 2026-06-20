import React from 'react';
import {
  Ruler,
  Grid3x3,
  ScanLine,
  Eye,
  Download,
  Move,
  Palette,
  Layers,
  Shield,
} from 'lucide-react';

export const STATS = [
  { label: 'Paper Formats', value: 'A1 – A5' },
  { label: 'Grid Types', value: '3 Layers' },
  { label: 'Storage', value: 'Local Only' },
  { label: 'Export', value: 'High-Res PNG' },
];

export const PROBLEM_FEATURES = [
  'Physical measurement accuracy down to 0.1 cm',
  'A-series paper format support (A1 through A5)',
  'Real-time grid overlays with cm-based spacing',
  'Export with or without grid overlay',
];

export const GRID_PRESETS = ['A4 · 21×29.7 cm', 'Grid: 2.5 cm', 'Export Ready'];

export interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  tag: string;
}

export const FEATURES: Feature[] = [
  {
    icon: <Ruler size={24} />,
    title: 'Real-Size Display',
    description: 'On-screen dimensions mirror actual paper. An A4 crop measures exactly 21.0 cm wide when held against your monitor.',
    tag: 'Core',
  },
  {
    icon: <Grid3x3 size={24} />,
    title: 'Real-Sync Grid Engine',
    description: 'Independent vertical, horizontal, and diagonal grid layers. Spacing set in centimeters — not pixel counts.',
    tag: 'Core',
  },
  {
    icon: <ScanLine size={24} />,
    title: 'Physical-First Cropping',
    description: 'Native A1, A3, A4, A5 support. Crop tool locks to the exact mathematical ratio of your chosen paper format.',
    tag: 'Core',
  },
  {
    icon: <Eye size={24} />,
    title: 'Value Study Filter',
    description: 'One-click Black & White mode strips color and reveals tonal values — essential for accurate light and shadow mapping.',
    tag: 'Analysis',
  },
  {
    icon: <Download size={24} />,
    title: 'Smart Export',
    description: 'Export your cropped image with or without the grid overlay. High-res PNG output stored entirely in your browser.',
    tag: 'Export',
  },
  {
    icon: <Move size={24} />,
    title: 'Grid Numbering',
    description: 'Toggle row and column numbers on any edge independently. Show only top and left, or all four — your choice.',
    tag: 'Control',
  },
  {
    icon: <Palette size={24} />,
    title: 'Custom Grid Colors',
    description: 'Set one global color or assign individual colors to vertical, horizontal, and diagonal lines separately.',
    tag: 'Visual',
  },
  {
    icon: <Layers size={24} />,
    title: 'Layer Control',
    description: 'Toggle each grid type independently. Work with just horizontals, just diagonals, or any combination you need.',
    tag: 'Control',
  },
  {
    icon: <Shield size={24} />,
    title: 'Local-First Privacy',
    description: 'All images and project data live in your browser via IndexedDB. No uploads, no accounts, no cloud.',
    tag: 'Privacy',
  },
];

export const WITHOUT_REAL_SYNC_LIST = [
  'Guessing proportions from a zoomed screen',
  'Rescaling references by eye',
  'Mismatched grid spacing on paper vs screen',
  'Wasted paper from incorrect sizing',
];

export const WITH_REAL_SYNC_LIST = [
  '1 cm on screen = 1 cm on your physical paper',
  'Grid spacing calculated from real-world cm values',
  'Diagonal lines mathematically thickness-matched',
  'Ruler overlay for instant physical verification',
];

export interface HowItWorksStep {
  step: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export const HOW_IT_WORKS_STEPS: HowItWorksStep[] = [
  {
    step: '01',
    title: 'Upload Reference',
    description: 'Import your reference photo or digital artwork into the workspace.',
    icon: <Download size={20} />,
  },
  {
    step: '02',
    title: 'Choose Paper Size',
    description: 'Select A1 through A5, or enter custom dimensions in centimeters.',
    icon: <Layers size={20} />,
  },
  {
    step: '03',
    title: 'Crop & Frame',
    description: "The crop tool locks to your paper's exact ratio. Frame your subject perfectly.",
    icon: <ScanLine size={20} />,
  },
  {
    step: '04',
    title: 'Enable Grid & Export',
    description: 'Toggle cm-based grid overlays, then export clean or with grid included.',
    icon: <Grid3x3 size={20} />,
  },
];

export const PAPER_FORMATS = [
  { size: 'A1', dims: '59.4 × 84.1 cm', desc: 'Large format posters & murals' },
  { size: 'A3', dims: '29.7 × 42.0 cm', desc: 'Detailed illustrations' },
  { size: 'A4', dims: '21.0 × 29.7 cm', desc: 'Standard portrait & sketches' },
  { size: 'A5', dims: '14.8 × 21.0 cm', desc: 'Compact sketchbook work' },
];
