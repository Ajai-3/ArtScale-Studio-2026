import React from 'react';
import { STATS } from '../../constants/landing';

export const LandingStats: React.FC = () => {
  return (
    <section className="py-6 border-y border-[#abf600]/10 bg-[#1a1a1a]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-center gap-16 flex-wrap">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-bold text-[#abf600]">{stat.value}</div>
              <div className="text-xs text-[#a0a0a0] mt-1 uppercase tracking-widest">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default LandingStats;
