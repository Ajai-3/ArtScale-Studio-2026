import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export const LandingNavbar: React.FC = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[#abf600]/10 bg-[#111111]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="ArtScale Studio" className="h-8 w-auto" />
          <span className="text-xl font-bold tracking-tight text-[#f3f3f3]">ArtScale Studio</span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm text-[#a0a0a0]">
          <a href="#features" className="hover:text-[#abf600] transition-colors duration-200">
            Features
          </a>
          <a href="#how-it-works" className="hover:text-[#abf600] transition-colors duration-200">
            How It Works
          </a>
          <a href="#real-sync" className="hover:text-[#abf600] transition-colors duration-200">
            Real-Sync
          </a>
          <a href="/gallery" className="hover:text-[#abf600] transition-colors duration-200">
            Gallery
          </a>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/crop')}
            className="hidden md:block bg-[#abf600] text-[#111111] font-bold text-sm px-5 py-1.5 rounded hover:bg-[#c5ff1a] transition-colors duration-200"
          >
            Open Studio
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-[#a0a0a0] hover:text-[#abf600] transition-colors p-1"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#abf600]/10 bg-[#111111] px-6 py-4 flex flex-col gap-4">
          <a
            href="#features"
            onClick={() => setMobileMenuOpen(false)}
            className="text-[#a0a0a0] hover:text-[#abf600] transition-colors py-1"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            onClick={() => setMobileMenuOpen(false)}
            className="text-[#a0a0a0] hover:text-[#abf600] transition-colors py-1"
          >
            How It Works
          </a>
          <a
            href="#real-sync"
            onClick={() => setMobileMenuOpen(false)}
            className="text-[#a0a0a0] hover:text-[#abf600] transition-colors py-1"
          >
            Real-Sync
          </a>
          <a
            href="/gallery"
            onClick={() => setMobileMenuOpen(false)}
            className="text-[#a0a0a0] hover:text-[#abf600] transition-colors py-1"
          >
            Gallery
          </a>
          <button
            onClick={() => {
              navigate('/crop');
              setMobileMenuOpen(false);
            }}
            className="bg-[#abf600] text-[#111111] font-bold text-sm px-5 py-2.5 rounded hover:bg-[#c5ff1a] transition-colors text-left"
          >
            Open Studio
          </button>
        </div>
      )}
    </nav>
  );
};
export default LandingNavbar;
