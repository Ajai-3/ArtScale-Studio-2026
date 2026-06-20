import React from 'react';
import { HOW_IT_WORKS_STEPS } from '../../constants/landing';

export const LandingHowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-28 px-6 bg-[#1a1a1a] border-y border-[#abf600]/10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="text-[#abf600] text-sm font-bold uppercase tracking-widest mb-4">
            Workflow
          </div>
          <h2 className="text-4xl md:text-5xl font-bold">
            How It <span className="text-[#abf600]">Works</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {HOW_IT_WORKS_STEPS.map((item, idx) => (
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
  );
};
export default LandingHowItWorks;
