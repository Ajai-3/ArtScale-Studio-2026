import {
  ArrowRight,
  Ruler,
  Grid3x3,
  Download,
  Palette,
  Layers,
  CheckCircle2,
  Shield,
  ScanLine,
  Move,
  Eye,
  Menu,
  X,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Landing = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#111111] text-[#f3f3f3] overflow-x-hidden">

      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[#abf600]/10 bg-[#111111]/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="ArtScale Studio" className="h-8 w-auto" />
            <span className="text-xl font-bold tracking-tight text-[#f3f3f3]">ArtScale Studio</span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm text-[#a0a0a0]">
            <a href="#features" className="hover:text-[#abf600] transition-colors duration-200">Features</a>
            <a href="#how-it-works" className="hover:text-[#abf600] transition-colors duration-200">How It Works</a>
            <a href="#real-sync" className="hover:text-[#abf600] transition-colors duration-200">Real-Sync</a>
            <a href="/gallery" className="hover:text-[#abf600] transition-colors duration-200">Gallery</a>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/crop')}
              className="hidden md:block bg-[#abf600] text-[#111111] font-bold text-sm px-5 py-2 rounded hover:bg-[#c5ff1a] transition-colors duration-200"
            >
              Open Studio
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-[#a0a0a0] hover:text-[#abf600] transition-colors p-1"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[#abf600]/10 bg-[#111111] px-6 py-4 flex flex-col gap-4">
            <a href="#features" onClick={() => setMobileMenuOpen(false)} className="text-[#a0a0a0] hover:text-[#abf600] transition-colors py-1">Features</a>
            <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)} className="text-[#a0a0a0] hover:text-[#abf600] transition-colors py-1">How It Works</a>
            <a href="#real-sync" onClick={() => setMobileMenuOpen(false)} className="text-[#a0a0a0] hover:text-[#abf600] transition-colors py-1">Real-Sync</a>
            <a href="/gallery" onClick={() => setMobileMenuOpen(false)} className="text-[#a0a0a0] hover:text-[#abf600] transition-colors py-1">Gallery</a>
            <button
              onClick={() => { navigate('/crop'); setMobileMenuOpen(false); }}
              className="bg-[#abf600] text-[#111111] font-bold text-sm px-5 py-2.5 rounded hover:bg-[#c5ff1a] transition-colors text-left"
            >
              Open Studio
            </button>
          </div>
        )}
      </nav>

      <section className="relative pt-40 pb-32 px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[#abf600]/5 rounded-full blur-[120px]" />
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#abf600]/3 rounded-full blur-[100px]" />
        </div>

        <div className="relative max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h1 className="text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight mb-8">
                Bridge Digital
                <br />
                <span className="text-[#abf600]">&amp; Physical Art</span>
              </h1>

              <p className="text-lg md:text-xl text-[#a0a0a0] leading-relaxed mb-10">
                Take physical measurements directly from your screen. Know exactly how your portrait fits on A1–A5 paper before you draw a single line.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 items-start">
                <button
                  onClick={() => navigate('/crop')}
                  className="flex items-center gap-2 bg-[#abf600] text-[#111111] font-bold text-base px-8 py-4 rounded hover:bg-[#c5ff1a] transition-all duration-200 hover:scale-[1.02]"
                >
                  Start Creating <ArrowRight size={18} />
                </button>
                <button
                  onClick={() => navigate('/gallery')}
                  className="flex items-center gap-2 border border-[#abf600]/30 text-[#f3f3f3] font-medium text-base px-8 py-4 rounded hover:border-[#abf600]/60 hover:bg-[#abf600]/5 transition-all duration-200"
                >
                  View Gallery
                </button>
              </div>

              <div className="mt-10 flex gap-8 flex-wrap text-sm text-[#a0a0a0]">
                {['No account needed', 'Stored locally', 'Free to use'].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-[#abf600]" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-[#abf600]/10 rounded-full blur-[80px] scale-110" />
                <img
                  src="/logo.png"
                  alt="ArtScale Studio"
                  className="relative w-full max-w-sm md:max-w-md lg:max-w-lg drop-shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-6 border-y border-[#abf600]/10 bg-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-center gap-16 flex-wrap">
            {[
              { label: 'Paper Formats', value: 'A1 – A5' },
              { label: 'Grid Types', value: '3 Layers' },
              { label: 'Storage', value: 'Local Only' },
              { label: 'Export', value: 'High-Res PNG' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-bold text-[#abf600]">{stat.value}</div>
                <div className="text-xs text-[#a0a0a0] mt-1 uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <div className="text-[#abf600] text-sm font-bold uppercase tracking-widest">The Problem</div>
              <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                Stop Guessing.
                <br />
                <span className="text-[#abf600]">Start Measuring.</span>
              </h2>
              <p className="text-lg text-[#a0a0a0] leading-relaxed">
                Traditional artists constantly struggle with the gap between digital references and physical paper. You zoom in, you zoom out, you guess — and the proportions are never quite right.
              </p>
              <p className="text-lg text-[#a0a0a0] leading-relaxed">
                ArtScale Studio eliminates the guesswork. Every measurement on your screen corresponds to a real centimeter on your paper.
              </p>
              <ul className="space-y-3 pt-2">
                {[
                  'Physical measurement accuracy down to 0.1 cm',
                  'A-series paper format support (A1 through A5)',
                  'Real-time grid overlays with cm-based spacing',
                  'Export with or without grid overlay',
                ].map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-[#f3f3f3]">
                    <div className="w-5 h-5 bg-[#abf600] rounded flex-shrink-0 mt-0.5 flex items-center justify-center">
                      <CheckCircle2 size={12} className="text-[#111111]" />
                    </div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative">
              <div className="bg-[#1a1a1a] border border-[#abf600]/20 rounded-xl p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-[#abf600]/5 rounded-full blur-3xl" />
                <div className="aspect-[4/3] bg-[#111111] rounded-lg border border-[#abf600]/15 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 opacity-20">
                    {[...Array(8)].map((_, i) => (
                      <div
                        key={`h-${i}`}
                        className="absolute w-full border-t border-[#abf600]"
                        style={{ top: `${(i + 1) * 12.5}%` }}
                      />
                    ))}
                    {[...Array(8)].map((_, i) => (
                      <div
                        key={`v-${i}`}
                        className="absolute h-full border-l border-[#abf600]"
                        style={{ left: `${(i + 1) * 12.5}%` }}
                      />
                    ))}
                  </div>
                  <div className="relative z-10 text-center">
                    <Grid3x3 size={56} className="text-[#abf600] mx-auto mb-3 opacity-80" />
                    <div className="text-sm text-[#a0a0a0]">Real-Sync Grid Engine</div>
                    <div className="text-xs text-[#abf600] mt-1">1 cell = 2.5 cm on paper</div>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-3">
                  {['A4 · 21×29.7 cm', 'Grid: 2.5 cm', 'Export Ready'].map((tag) => (
                    <div key={tag} className="bg-[#111111] border border-[#abf600]/15 rounded px-2 py-1.5 text-center text-xs text-[#a0a0a0]">
                      {tag}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="py-28 px-6 bg-[#1a1a1a] border-y border-[#abf600]/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-[#abf600] text-sm font-bold uppercase tracking-widest mb-4">Capabilities</div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Built for <span className="text-[#abf600]">Precision</span>
            </h2>
            <p className="text-[#a0a0a0] text-lg max-w-xl mx-auto">
              Every tool is designed around one goal — making your physical artwork match your digital reference exactly.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
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
            ].map((feature) => (
              <div
                key={feature.title}
                className="group bg-[#111111] border border-[#abf600]/10 rounded-xl p-7 hover:border-[#abf600]/30 hover:bg-[#161616] transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-5">
                  <div className="w-11 h-11 bg-[#abf600]/10 border border-[#abf600]/20 rounded-lg flex items-center justify-center text-[#abf600] group-hover:bg-[#abf600]/15 transition-colors">
                    {feature.icon}
                  </div>
                  <span className="text-xs text-[#abf600]/60 font-medium uppercase tracking-wider border border-[#abf600]/15 rounded px-2 py-0.5">
                    {feature.tag}
                  </span>
                </div>
                <h3 className="text-lg font-bold mb-2 text-[#f3f3f3]">{feature.title}</h3>
                <p className="text-[#a0a0a0] text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="real-sync" className="py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-[#abf600] text-sm font-bold uppercase tracking-widest mb-4">Methodology</div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              The <span className="text-[#abf600]">Real-Sync</span> System
            </h2>
            <p className="text-[#a0a0a0] text-lg max-w-2xl mx-auto">
              Real-Sync is the core methodology behind ArtScale Studio. It ensures every pixel on your screen maps to a precise physical measurement on your paper.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-[#1a1a1a] border border-[#abf600]/15 rounded-xl p-8">
              <div className="text-[#abf600] font-bold text-sm uppercase tracking-widest mb-4">Without Real-Sync</div>
              <ul className="space-y-3">
                {[
                  'Guessing proportions from a zoomed screen',
                  'Rescaling references by eye',
                  'Mismatched grid spacing on paper vs screen',
                  'Wasted paper from incorrect sizing',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-[#a0a0a0] text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#ff6b6b] flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-[#1a1a1a] border border-[#abf600]/30 rounded-xl p-8">
              <div className="text-[#abf600] font-bold text-sm uppercase tracking-widest mb-4">With Real-Sync</div>
              <ul className="space-y-3">
                {[
                  '1 cm on screen = 1 cm on your physical paper',
                  'Grid spacing calculated from real-world cm values',
                  'Diagonal lines mathematically thickness-matched',
                  'Ruler overlay for instant physical verification',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-[#f3f3f3] text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#abf600] flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-[#1a1a1a] border border-[#abf600]/15 rounded-xl p-8 text-center">
            <div className="text-5xl font-bold text-[#abf600] mb-2">37.8 px</div>
            <div className="text-[#a0a0a0]">= exactly 1 centimeter on screen at 96 PPI</div>
            <div className="text-sm text-[#a0a0a0]/60 mt-2">Calibrated per monitor using your display's PPI setting</div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-28 px-6 bg-[#1a1a1a] border-y border-[#abf600]/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-[#abf600] text-sm font-bold uppercase tracking-widest mb-4">Workflow</div>
            <h2 className="text-4xl md:text-5xl font-bold">
              How It <span className="text-[#abf600]">Works</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
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
                description: 'The crop tool locks to your paper\'s exact ratio. Frame your subject perfectly.',
                icon: <ScanLine size={20} />,
              },
              {
                step: '04',
                title: 'Enable Grid & Export',
                description: 'Toggle cm-based grid overlays, then export clean or with grid included.',
                icon: <Grid3x3 size={20} />,
              },
            ].map((item, idx) => (
              <div key={item.step} className="relative">
                {idx < 3 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-[#abf600]/30 to-transparent z-10" />
                )}
                <div className="bg-[#111111] border border-[#abf600]/15 rounded-xl p-7 hover:border-[#abf600]/30 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="text-4xl font-bold text-[#abf600]/20 leading-none">{item.step}</div>
                    <div className="w-9 h-9 bg-[#abf600]/10 border border-[#abf600]/20 rounded-lg flex items-center justify-center text-[#abf600]">
                      {item.icon}
                    </div>
                  </div>
                  <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                  <p className="text-[#a0a0a0] text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-[#abf600] text-sm font-bold uppercase tracking-widest mb-4">Paper Formats</div>
            <h2 className="text-4xl md:text-5xl font-bold">
              Every <span className="text-[#abf600]">A-Series</span> Format
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { size: 'A1', dims: '59.4 × 84.1 cm', desc: 'Large format posters & murals' },
              { size: 'A3', dims: '29.7 × 42.0 cm', desc: 'Detailed illustrations' },
              { size: 'A4', dims: '21.0 × 29.7 cm', desc: 'Standard portrait & sketches' },
              { size: 'A5', dims: '14.8 × 21.0 cm', desc: 'Compact sketchbook work' },
            ].map((paper) => (
              <div
                key={paper.size}
                className="bg-[#1a1a1a] border border-[#abf600]/15 rounded-xl p-6 hover:border-[#abf600]/35 transition-all duration-300 group"
              >
                <div className="text-3xl font-bold text-[#abf600] mb-1 group-hover:scale-105 transition-transform inline-block">{paper.size}</div>
                <div className="text-sm font-mono text-[#f3f3f3] mb-2">{paper.dims}</div>
                <div className="text-xs text-[#a0a0a0]">{paper.desc}</div>
              </div>
            ))}
          </div>

          <div className="mt-6 bg-[#1a1a1a] border border-[#abf600]/15 rounded-xl p-6 flex items-center justify-between flex-wrap gap-4">
            <div>
              <div className="font-bold text-[#f3f3f3] mb-1">Custom Dimensions</div>
              <div className="text-sm text-[#a0a0a0]">Enter any width and height in centimeters for non-standard paper sizes.</div>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-[#111111] border border-[#abf600]/20 rounded px-4 py-2 text-sm font-mono text-[#abf600]">W: 30.0 cm</div>
              <div className="text-[#a0a0a0]">×</div>
              <div className="bg-[#111111] border border-[#abf600]/20 rounded px-4 py-2 text-sm font-mono text-[#abf600]">H: 40.0 cm</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-28 px-6 bg-[#1a1a1a] border-y border-[#abf600]/10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-[#abf600] text-sm font-bold uppercase tracking-widest mb-6">Get Started</div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Ready to Scale
            <br />
            <span className="text-[#abf600]">Your Art?</span>
          </h2>
          <p className="text-xl text-[#a0a0a0] mb-10 max-w-xl mx-auto">
            No sign-up. No subscription. Open the studio and start working with precision immediately.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/crop')}
              className="flex items-center justify-center gap-2 bg-[#abf600] text-[#111111] font-bold text-base px-10 py-4 rounded hover:bg-[#c5ff1a] transition-all duration-200 hover:scale-[1.02]"
            >
              Launch Studio <ArrowRight size={18} />
            </button>
            <button
              onClick={() => navigate('/gallery')}
              className="flex items-center justify-center gap-2 border border-[#abf600]/30 text-[#f3f3f3] font-medium text-base px-10 py-4 rounded hover:border-[#abf600]/60 hover:bg-[#abf600]/5 transition-all duration-200"
            >
              Browse Gallery
            </button>
          </div>
        </div>
      </section>

      <footer className="py-16 px-6 bg-[#111111] border-t border-[#abf600]/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-10 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <img src="/logo.png" alt="ArtScale Studio" className="h-9 w-auto" />
                <span className="text-xl font-bold text-[#f3f3f3]">ArtScale Studio</span>
              </div>
              <p className="text-[#a0a0a0] text-sm leading-relaxed max-w-xs">
                A high-precision utility for traditional artists. Bridging digital references and physical paper through Real-World Scaling.
              </p>
              <div className="flex items-center gap-2 mt-5 text-xs text-[#a0a0a0]">
                <Shield size={12} className="text-[#abf600]" />
                All data stored locally. No accounts required.
              </div>
            </div>
            <div>
              <h4 className="font-bold text-sm uppercase tracking-widest text-[#a0a0a0] mb-4">Product</h4>
              <ul className="space-y-2.5 text-sm">
                <li><a href="#features" className="text-[#a0a0a0] hover:text-[#abf600] transition-colors">Features</a></li>
                <li><a href="#how-it-works" className="text-[#a0a0a0] hover:text-[#abf600] transition-colors">How It Works</a></li>
                <li><a href="/gallery" className="text-[#a0a0a0] hover:text-[#abf600] transition-colors">Gallery</a></li>
                <li><a href="/crop" className="text-[#a0a0a0] hover:text-[#abf600] transition-colors">Workspace</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-sm uppercase tracking-widest text-[#a0a0a0] mb-4">Paper Sizes</h4>
              <ul className="space-y-2.5 text-sm">
                {['A1 · 59.4 × 84.1 cm', 'A3 · 29.7 × 42.0 cm', 'A4 · 21.0 × 29.7 cm', 'A5 · 14.8 × 21.0 cm'].map((s) => (
                  <li key={s} className="text-[#a0a0a0] font-mono text-xs">{s}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-[#abf600]/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[#a0a0a0]">
            <div>© 2026 ArtScale Studio. All rights reserved.</div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-[#abf600] transition-colors">Privacy</a>
              <a href="#" className="hover:text-[#abf600] transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
