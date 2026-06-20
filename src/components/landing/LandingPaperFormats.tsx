import React from 'react';
import { PAPER_FORMATS } from '../../constants/landing';

export const LandingPaperFormats: React.FC = () => {
  return (
    <section className="py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="text-[#abf600] text-sm font-bold uppercase tracking-widest mb-4">
            Paper Formats
          </div>
          <h2 className="text-4xl md:text-5xl font-bold">
            Every <span className="text-[#abf600]">A-Series</span> Format
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {PAPER_FORMATS.map((paper) => (
            <div
              key={paper.size}
              className="bg-[#1a1a1a] border border-[#abf600]/15 rounded-xl p-6 hover:border-[#abf600]/35 transition-all duration-300 group"
            >
              <div className="text-3xl font-bold text-[#abf600] mb-1 group-hover:scale-105 transition-transform inline-block">
                {paper.size}
              </div>
              <div className="text-sm font-mono text-[#f3f3f3] mb-2">{paper.dims}</div>
              <div className="text-xs text-[#a0a0a0]">{paper.desc}</div>
            </div>
          ))}
        </div>

        <div className="mt-6 bg-[#1a1a1a] border border-[#abf600]/15 rounded-xl p-6 flex items-center justify-between flex-wrap gap-4">
          <div>
            <div className="font-bold text-[#f3f3f3] mb-1">Custom Dimensions</div>
            <div className="text-sm text-[#a0a0a0]">
              Enter any width and height in centimeters for non-standard paper sizes.
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-[#111111] border border-[#abf600]/20 rounded px-4 py-2 text-sm font-mono text-[#abf600]">
              W: 30.0 cm
            </div>
            <div className="text-[#a0a0a0]">×</div>
            <div className="bg-[#111111] border border-[#abf600]/20 rounded px-4 py-2 text-sm font-mono text-[#abf600]">
              H: 40.0 cm
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default LandingPaperFormats;
