import React from 'react';
import { FEATURES } from '../../constants/landing';

export const LandingFeatures: React.FC = () => {
  return (
    <section id="features" className="py-28 px-6 bg-[#1a1a1a] border-y border-[#abf600]/10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="text-[#abf600] text-sm font-bold uppercase tracking-widest mb-4">
            Capabilities
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Built for <span className="text-[#abf600]">Precision</span>
          </h2>
          <p className="text-[#a0a0a0] text-lg max-w-xl mx-auto">
            Every tool is designed around one goal — making your physical artwork match your digital
            reference exactly.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {FEATURES.map((feature) => (
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
  );
};
export default LandingFeatures;
