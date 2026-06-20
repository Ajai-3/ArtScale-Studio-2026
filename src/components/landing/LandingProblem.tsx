import React from 'react';
import { Grid3x3, CheckCircle2 } from 'lucide-react';
import { PROBLEM_FEATURES, GRID_PRESETS } from '../../constants/landing';

export const LandingProblem: React.FC = () => {
  return (
    <section className="py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <div className="text-[#abf600] text-sm font-bold uppercase tracking-widest">
              The Problem
            </div>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              Stop Guessing.
              <br />
              <span className="text-[#abf600]">Start Measuring.</span>
            </h2>
            <p className="text-lg text-[#a0a0a0] leading-relaxed">
              Traditional artists constantly struggle with the gap between digital references and
              physical paper. You zoom in, you zoom out, you guess — and the proportions are never
              quite right.
            </p>
            <p className="text-lg text-[#a0a0a0] leading-relaxed">
              ArtScale Studio eliminates the guesswork. Every measurement on your screen
              corresponds to a real centimeter on your paper.
            </p>
            <ul className="space-y-3 pt-2">
              {PROBLEM_FEATURES.map((feature) => (
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
                {GRID_PRESETS.map((tag) => (
                  <div
                    key={tag}
                    className="bg-[#111111] border border-[#abf600]/15 rounded px-2 py-1.5 text-center text-xs text-[#a0a0a0]"
                  >
                    {tag}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default LandingProblem;
