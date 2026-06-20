import React from 'react';
import LandingNavbar from '../components/landing/LandingNavbar';
import LandingHero from '../components/landing/LandingHero';
import LandingStats from '../components/landing/LandingStats';
import LandingProblem from '../components/landing/LandingProblem';
import LandingFeatures from '../components/landing/LandingFeatures';
import LandingRealSync from '../components/landing/LandingRealSync';
import LandingHowItWorks from '../components/landing/LandingHowItWorks';
import LandingPaperFormats from '../components/landing/LandingPaperFormats';
import LandingCTA from '../components/landing/LandingCTA';
import LandingFooter from '../components/landing/LandingFooter';

const Landing = () => {
  return (
    <div className="min-h-screen bg-[#111111] text-[#f3f3f3] overflow-x-hidden">
      <LandingNavbar />
      <LandingHero />
      <LandingStats />
      <LandingProblem />
      <LandingFeatures />
      <LandingRealSync />
      <LandingHowItWorks />
      <LandingPaperFormats />
      <LandingCTA />
      <LandingFooter />
    </div>
  );
};

export default Landing;
