import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const LandingCTA: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="py-28 px-6 bg-[#1a1a1a] border-y border-[#abf600]/10">
      <div className="max-w-4xl mx-auto text-center">
        <div className="text-[#abf600] text-sm font-bold uppercase tracking-widest mb-6">
          Get Started
        </div>
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
            className="flex items-center justify-center gap-2 bg-[#abf600] text-[#111111] font-bold text-base px-10 py-3 rounded hover:bg-[#c5ff1a] transition-all duration-200 hover:scale-[1.02]"
          >
            Launch Studio <ArrowRight size={18} />
          </button>
          <button
            onClick={() => navigate('/gallery')}
            className="flex items-center justify-center gap-2 border border-[#abf600]/30 text-[#f3f3f3] font-medium text-base px-10 py-3 rounded hover:border-[#abf600]/60 hover:bg-[#abf600]/5 transition-all duration-200"
          >
            Browse Gallery
          </button>
        </div>
      </div>
    </section>
  );
};
export default LandingCTA;
