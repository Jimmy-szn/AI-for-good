import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Problem from './components/Problem';
import Solution from './components/Solution';
import ClimateImpact from './components/ClimateImpact';
import TechnicalRequirements from './components/TechnicalRequirements';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';
import ChatBot from './components/ChatBot';

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentView, setCurrentView] = useState('home');

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) {
      setCurrentView(hash);
    }
  }, []);

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'chatbot':
        return <ChatBot />;
      case 'home':
      default:
        return (
          <>
            <Header mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
            <Hero />
            <Problem />
            <Solution />
            <ClimateImpact />
            <TechnicalRequirements />
            <Footer />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {renderView()}
    </div>
  );
}

export default App;