import { ArrowRight, Ruler, Grid3x3, Download, Palette, Layers } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-dark-950 text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-dark-950/90 backdrop-blur-sm border-b-3 border-white shadow-neubrutal">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-grass-400">ArtistScale Studio</div>
          <div className="hidden md:flex gap-8">
            <a href="#features" className="hover:text-grass-400 transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-grass-400 transition-colors">How It Works</a>
            <a href="#pricing" className="hover:text-grass-400 transition-colors">Pricing</a>
          </div>
          <button onClick={() => navigate('/crop')} className="bg-grass-500 text-dark-950 px-6 py-3 font-bold border-3 border-white shadow-neubrutal hover:shadow-neubrutal-md hover:translate-x-1 hover:translate-y-1 transition-all">
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Bridge Digital &{' '}
              <span className="text-grass-400">Physical Art</span>
            </h1>
            <p className="text-xl text-gray-300">
              Real-World Scaling for traditional artists. Take physical measurements directly from your screen to understand exactly how your art fits on actual paper (A1–A5).
            </p>
            <div className="flex gap-4">
              <button onClick={() => navigate('/crop')} className="bg-grass-500 text-dark-950 px-8 py-4 font-bold border-3 border-white shadow-neubrutal hover:shadow-neubrutal-lg hover:translate-x-1.5 hover:translate-y-1.5 transition-all flex items-center gap-2">
                Start Creating <ArrowRight size={20} />
              </button>
              <button className="bg-dark-800 text-white px-8 py-4 font-bold border-3 border-white shadow-neubrutal hover:shadow-neubrutal-md hover:translate-x-1 hover:translate-y-1 transition-all">
                Watch Demo
              </button>
            </div>
          </div>
          <div className="bg-dark-800 border-3 border-white shadow-neubrutal-lg p-8 rounded-lg">
            <img src="/src/assets/hero.png" alt="ArtistScale Studio Interface" className="w-full rounded border-2 border-dark-600" />
          </div>
        </div>
      </section>

      {/* Trusted By */}
      <section className="py-12 border-y-3 border-white bg-dark-900">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gray-400 mb-8">Trusted by artists worldwide for precise scaling</p>
          <div className="flex justify-center gap-12 flex-wrap">
            {['Digital Artists', 'Traditional Painters', 'Portrait Artists', 'Sketch Artists'].map((item) => (
              <div key={item} className="text-xl font-semibold text-grass-400">{item}</div>
            ))}
          </div>
        </div>
      </section>

      {/* Why It Matters */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="bg-dark-800 border-3 border-white shadow-neubrutal-xl p-8">
              <div className="aspect-video bg-gradient-to-br from-grass-500/20 to-grass-700/20 rounded border-2 border-dashed border-grass-400 flex items-center justify-center">
                <Grid3x3 size={80} className="text-grass-400" />
              </div>
            </div>
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold">
                Stop Guessing.<br />
                <span className="text-grass-400">Start Measuring.</span>
              </h2>
              <p className="text-lg text-gray-300">
                ArtistScale Studio puts precision tools at your fingertips, turning digital references into physical reality.
              </p>
              <ul className="space-y-4">
                {[
                  'Physical measurement accuracy',
                  'A-series paper format support',
                  'Real-time grid overlays',
                  'Export with precision'
                ].map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-grass-500 border-2 border-white flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 px-6 bg-dark-900 border-y-3 border-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Built for <span className="text-grass-400">Precision</span>
          </h2>
          <p className="text-center text-gray-400 mb-16 text-lg">Every tool you need for accurate scaling</p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Ruler size={40} />,
                title: 'Real-Size Display',
                description: 'On-screen dimensions match actual paper size. A4 crop measures exactly 21.0 cm wide.'
              },
              {
                icon: <Grid3x3 size={40} />,
                title: 'Real-Sync Grid Engine',
                description: 'Independent vertical, horizontal, and diagonal grid layers with cm-based spacing.'
              },
              {
                icon: <Layers size={40} />,
                title: 'Physical-First Cropping',
                description: 'Native support for A1, A3, A4, A5. Lock to exact mathematical ratios.'
              },
              {
                icon: <Palette size={40} />,
                title: 'Value Study Filter',
                description: 'One-click Black & White mode for tonal value analysis.'
              },
              {
                icon: <Download size={40} />,
                title: 'Smart Export',
                description: 'Export with grid/numbers or clean crop. High-res image blobs stored locally.'
              },
              {
                icon: <Grid3x3 size={40} />,
                title: 'Grid Numbering',
                description: 'Toggle numbering on any edge. Individual control for each side.'
              }
            ].map((feature, idx) => (
              <div key={idx} className="bg-dark-800 border-3 border-white p-8 shadow-neubrutal hover:shadow-neubrutal-md hover:-translate-y-1 transition-all group">
                <div className="w-16 h-16 bg-grass-500 border-3 border-white flex items-center justify-center mb-6 shadow-neubrutal group-hover:shadow-neubrutal-md transition-all">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            How It <span className="text-grass-400">Works</span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                title: 'Upload Reference',
                description: 'Import your reference image into the workspace'
              },
              {
                step: '2',
                title: 'Set Paper Size',
                description: 'Choose A-series format or custom dimensions in cm'
              },
              {
                step: '3',
                title: 'Enable Grids',
                description: 'Toggle grid overlays with cm-based spacing'
              }
            ].map((item) => (
              <div key={item.step} className="relative">
                <div className="bg-dark-800 border-3 border-white p-8 shadow-neubrutal-lg">
                  <div className="w-16 h-16 bg-grass-500 border-3 border-white flex items-center justify-center text-3xl font-bold mb-6 shadow-neubrutal">
                    {item.step}
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                  <p className="text-gray-400">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-grass-600 border-y-3 border-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-dark-950 mb-6">
            Ready to Scale Your Art?
          </h2>
          <p className="text-xl text-dark-800 mb-8">
            Join thousands of artists using ArtistScale Studio for precise physical scaling
          </p>
          <button onClick={() => navigate('/crop')} className="bg-dark-950 text-white px-10 py-5 font-bold border-3 border-white shadow-neubrutal-xl hover:shadow-neubrutal hover:translate-x-1 hover:translate-y-1 transition-all text-lg">
            Launch Workspace
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-dark-950 border-t-3 border-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="text-2xl font-bold text-grass-400 mb-4">ArtistScale Studio</div>
              <p className="text-gray-400">Bridging digital and physical art through precision scaling.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-grass-400">Features</a></li>
                <li><a href="#" className="hover:text-grass-400">Workspace</a></li>
                <li><a href="#" className="hover:text-grass-400">Gallery</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-grass-400">Documentation</a></li>
                <li><a href="#" className="hover:text-grass-400">Tutorial</a></li>
                <li><a href="#" className="hover:text-grass-400">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-grass-400">Privacy</a></li>
                <li><a href="#" className="hover:text-grass-400">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t-2 border-dark-700 text-center text-gray-500">
            © 2026 ArtistScale Studio. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
