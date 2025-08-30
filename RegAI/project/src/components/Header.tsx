import React from 'react';
import { Sprout, Menu, X } from 'lucide-react';

interface HeaderProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export default function Header({ mobileMenuOpen, setMobileMenuOpen }: HeaderProps) {
  return (
    <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Sprout className="h-8 w-8 text-green-600" />
            <span className="text-xl font-bold text-gray-900">AgriAdvisor AI</span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#problem" className="text-gray-600 hover:text-green-600 transition-colors font-medium">
              Problem
            </a>
            <a href="#solution" className="text-gray-600 hover:text-green-600 transition-colors font-medium">
              Solution
            </a>
            <a href="#impact" className="text-gray-600 hover:text-green-600 transition-colors font-medium">
              Climate Impact
            </a>
            <a href="#technical" className="text-gray-600 hover:text-green-600 transition-colors font-medium">
              Technical
            </a>
            <a href="#dashboard" className="text-gray-600 hover:text-green-600 transition-colors font-medium">
              Dashboard
            </a>
            <a href="#chatbot" className="text-gray-600 hover:text-green-600 transition-colors font-medium">
              Chat Bot
            </a>
            <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium">
              Get Started
            </button>
          </nav>

          <button 
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden transition-all duration-300 ${mobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden bg-white border-b border-gray-200`}>
        <div className="px-4 py-2 space-y-2">
          <a href="#problem" className="block py-2 text-gray-600 hover:text-green-600 transition-colors">
            Problem
          </a>
          <a href="#solution" className="block py-2 text-gray-600 hover:text-green-600 transition-colors">
            Solution
          </a>
          <a href="#impact" className="block py-2 text-gray-600 hover:text-green-600 transition-colors">
            Climate Impact
          </a>
          <a href="#technical" className="block py-2 text-gray-600 hover:text-green-600 transition-colors">
            Technical
          </a>
          <a href="#dashboard" className="block py-2 text-gray-600 hover:text-green-600 transition-colors">
            Dashboard
          </a>
          <a href="#chatbot" className="block py-2 text-gray-600 hover:text-green-600 transition-colors">
            Chat Bot
          </a>
          <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors mt-4">
            Get Started
          </button>
        </div>
      </div>
    </header>
  );
}