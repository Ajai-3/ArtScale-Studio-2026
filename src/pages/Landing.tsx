import {
  ArrowRight,
  Ruler,
  Grid3x3,
  Download,
  Palette,
  Layers,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';

const Landing = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-primary">ArtScale Studio</div>
          <div className="hidden md:flex gap-8">
            <a
              href="#features"
              className="hover:text-primary transition-colors"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="hover:text-primary transition-colors"
            >
              How It Works
            </a>
            <a href="/gallery" className="hover:text-primary transition-colors">
              Gallery
            </a>
          </div>
          <Button onClick={() => navigate('/crop')}>Get Started</Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Bridge Digital &{' '}
              <span className="text-primary">Physical Art</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Real-World Scaling for traditional artists. Take physical
              measurements directly from your screen to understand exactly how
              your art fits on actual paper (A1–A5).
            </p>
            <div className="flex gap-4">
              <Button
                onClick={() => navigate('/crop')}
                size="lg"
                className="gap-2"
              >
                Start Creating <ArrowRight size={20} />
              </Button>
              <Button
                onClick={() => navigate('/crop')}
                variant="outline"
                size="lg"
              >
                Watch Demo
              </Button>
            </div>
          </div>
          <div className="bg-card border p-8 rounded-lg">
            <img
              src="/src/assets/hero.png"
              alt="ArtScale Studio Interface"
              className="w-full rounded"
            />
          </div>
        </div>
      </section>

      {/* Trusted By */}
      <section className="py-12 border-y bg-card/50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-muted-foreground mb-8">
            Trusted by artists worldwide for precise scaling
          </p>
          <div className="flex justify-center gap-12 flex-wrap">
            {[
              'Digital Artists',
              'Traditional Painters',
              'Portrait Artists',
              'Sketch Artists',
            ].map((item) => (
              <div key={item} className="text-xl font-semibold text-primary">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why It Matters */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="bg-card border p-8 rounded-lg">
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/10 rounded border-2 border-dashed border-primary flex items-center justify-center">
                <Grid3x3 size={80} className="text-primary" />
              </div>
            </div>
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold">
                Stop Guessing.
                <br />
                <span className="text-primary">Start Measuring.</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                ArtScale Studio puts precision tools at your fingertips, turning
                digital references into physical reality.
              </p>
              <ul className="space-y-4">
                {[
                  'Physical measurement accuracy',
                  'A-series paper format support',
                  'Real-time grid overlays',
                  'Export with precision',
                ].map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-primary rounded flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 px-6 bg-card/50 border-y">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Built for <span className="text-primary">Precision</span>
          </h2>
          <p className="text-center text-muted-foreground mb-16 text-lg">
            Every tool you need for accurate scaling
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Ruler size={40} />,
                title: 'Real-Size Display',
                description:
                  'On-screen dimensions match actual paper size. A4 crop measures exactly 21.0 cm wide.',
              },
              {
                icon: <Grid3x3 size={40} />,
                title: 'Real-Sync Grid Engine',
                description:
                  'Independent vertical, horizontal, and diagonal grid layers with cm-based spacing.',
              },
              {
                icon: <Layers size={40} />,
                title: 'Physical-First Cropping',
                description:
                  'Native support for A1, A3, A4, A5. Lock to exact mathematical ratios.',
              },
              {
                icon: <Palette size={40} />,
                title: 'Value Study Filter',
                description:
                  'One-click Black & White mode for tonal value analysis.',
              },
              {
                icon: <Download size={40} />,
                title: 'Smart Export',
                description:
                  'Export with grid/numbers or clean crop. High-res image blobs stored locally.',
              },
              {
                icon: <Grid3x3 size={40} />,
                title: 'Grid Numbering',
                description:
                  'Toggle numbering on any edge. Individual control for each side.',
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="bg-card border p-8 rounded-lg hover:shadow-lg transition-shadow"
              >
                <div className="w-16 h-16 bg-primary text-primary-foreground flex items-center justify-center rounded-lg mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            How It <span className="text-primary">Works</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                title: 'Upload Reference',
                description: 'Import your reference image into the workspace',
              },
              {
                step: '2',
                title: 'Set Paper Size',
                description:
                  'Choose A-series format or custom dimensions in cm',
              },
              {
                step: '3',
                title: 'Enable Grids',
                description: 'Toggle grid overlays with cm-based spacing',
              },
            ].map((item) => (
              <div key={item.step} className="bg-card border p-8 rounded-lg">
                <div className="w-16 h-16 bg-primary text-primary-foreground flex items-center justify-center rounded-lg text-3xl font-bold mb-6">
                  {item.step}
                </div>
                <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Scale Your Art?
          </h2>
          <p className="text-xl mb-8">
            Join thousands of artists using ArtScale Studio for precise physical
            scaling
          </p>
          <Button
            onClick={() => navigate('/crop')}
            variant="secondary"
            size="lg"
          >
            Launch Workspace
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-background border-t">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="text-2xl font-bold text-primary mb-4">
                ArtScale Studio
              </div>
              <p className="text-muted-foreground">
                Bridging digital and physical art through precision scaling.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Workspace
                  </a>
                </li>
                <li>
                  <a
                    href="/gallery"
                    className="hover:text-primary transition-colors"
                  >
                    Gallery
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Resources</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Tutorial
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Terms
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t text-center text-muted-foreground">
            © 2026 ArtScale Studio. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
