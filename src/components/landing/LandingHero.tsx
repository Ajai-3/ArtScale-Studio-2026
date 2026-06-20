import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export const LandingHero: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="relative pt-40 pb-32 px-6 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[#abf600]/5 rounded-full blur-[120px]" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#abf600]/3 rounded-full blur-[100px]" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h1 className="text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight mb-8">
              Bridge Digital
              <br />
              <span className="text-[#abf600]">&amp; Physical Art</span>
            </h1>

            <p className="text-lg md:text-xl text-[#a0a0a0] leading-relaxed mb-10">
              Take physical measurements directly from your screen. Know exactly how your portrait
              fits on A1–A5 paper before you draw a single line.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <button
                onClick={() => navigate('/crop')}
                className="flex items-center gap-2 bg-[#abf600] text-[#111111] font-bold text-base px-8 py-3 rounded hover:bg-[#c5ff1a] transition-all duration-200 hover:scale-[1.02]"
              >
                Start Creating <ArrowRight size={18} />
              </button>
              <button
                onClick={() => navigate('/gallery')}
                className="flex items-center gap-2 border border-[#abf600]/30 text-[#f3f3f3] font-medium text-base px-8 py-3 rounded hover:border-[#abf600]/60 hover:bg-[#abf600]/5 transition-all duration-200"
              >
                View Gallery
              </button>
            </div>

            <div className="mt-10 flex gap-8 flex-wrap text-sm text-[#a0a0a0]">
              {['No account needed', 'Stored locally', 'Free to use'].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-[#abf600]" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-[#abf600]/10 rounded-full blur-[80px] scale-110" />
              <img
                src="/logo.png"
                alt="ArtScale Studio"
                className="relative w-full max-w-sm md:max-w-md lg:max-w-lg drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default LandingHero;
