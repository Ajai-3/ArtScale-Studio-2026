import React from 'react';
import { Shield } from 'lucide-react';

export const LandingFooter: React.FC = () => {
  return (
    <footer className="py-16 px-6 bg-[#111111] border-t border-[#abf600]/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img src="/logo.png" alt="ArtScale Studio" className="h-9 w-auto" />
              <span className="text-xl font-bold text-[#f3f3f3]">ArtScale Studio</span>
            </div>
            <p className="text-[#a0a0a0] text-sm leading-relaxed max-w-xs">
              A high-precision utility for traditional artists. Bridging digital references and
              physical paper through Real-World Scaling.
            </p>
            <div className="flex items-center gap-2 mt-5 text-xs text-[#a0a0a0]">
              <Shield size={12} className="text-[#abf600]" />
              All data stored locally. No accounts required.
            </div>
          </div>
          <div>
            <h4 className="font-bold text-sm uppercase tracking-widest text-[#a0a0a0] mb-4">
              Product
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#features" className="text-[#a0a0a0] hover:text-[#abf600] transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#how-it-works"
                  className="text-[#a0a0a0] hover:text-[#abf600] transition-colors"
                >
                  How It Works
                </a>
              </li>
              <li>
                <a href="/gallery" className="text-[#a0a0a0] hover:text-[#abf600] transition-colors">
                  Gallery
                </a>
              </li>
              <li>
                <a href="/crop" className="text-[#a0a0a0] hover:text-[#abf600] transition-colors">
                  Workspace
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-sm uppercase tracking-widest text-[#a0a0a0] mb-4">
              Paper Sizes
            </h4>
            <ul className="space-y-2.5 text-sm">
              {[
                'A1 · 59.4 × 84.1 cm',
                'A3 · 29.7 × 42.0 cm',
                'A4 · 21.0 × 29.7 cm',
                'A5 · 14.8 × 21.0 cm',
              ].map((s) => (
                <li key={s} className="text-[#a0a0a0] font-mono text-xs">
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-[#abf600]/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[#a0a0a0]">
          <div>© 2026 ArtScale Studio. All rights reserved.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-[#abf600] transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-[#abf600] transition-colors">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default LandingFooter;
