import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Problem from './components/Problem';
import Solution from './components/Solution';
import ClimateImpact from './components/ClimateImpact';
import TechnicalRequirements from './components/TechnicalRequirements';
import Footer from './components/Footer';

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <Header mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
      <Hero />
      <Problem />
      <Solution />
      <ClimateImpact />
      <TechnicalRequirements />
      <Footer />
    </div>
  );
}

export default App;