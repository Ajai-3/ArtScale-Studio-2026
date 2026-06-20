import React from 'react';
import { WITHOUT_REAL_SYNC_LIST, WITH_REAL_SYNC_LIST } from '../../constants/landing';

export const LandingRealSync: React.FC = () => {
  return (
    <section id="real-sync" className="py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="text-[#abf600] text-sm font-bold uppercase tracking-widest mb-4">
            Methodology
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            The <span className="text-[#abf600]">Real-Sync</span> System
          </h2>
          <p className="text-[#a0a0a0] text-lg max-w-2xl mx-auto">
            Real-Sync is the core methodology behind ArtScale Studio. It ensures every pixel on your
            screen maps to a precise physical measurement on your paper.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-[#1a1a1a] border border-[#abf600]/15 rounded-xl p-8">
            <div className="text-[#abf600] font-bold text-sm uppercase tracking-widest mb-4">
              Without Real-Sync
            </div>
            <ul className="space-y-3">
              {WITHOUT_REAL_SYNC_LIST.map((item) => (
                <li key={item} className="flex items-center gap-3 text-[#a0a0a0] text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#ff6b6b] flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-[#1a1a1a] border border-[#abf600]/30 rounded-xl p-8">
            <div className="text-[#abf600] font-bold text-sm uppercase tracking-widest mb-4">
              With Real-Sync
            </div>
            <ul className="space-y-3">
              {WITH_REAL_SYNC_LIST.map((item) => (
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
          <div className="text-sm text-[#a0a0a0]/60 mt-2">
            Calibrated per monitor using your display's PPI setting
          </div>
        </div>
      </div>
    </section>
  );
};
export default LandingRealSync;
