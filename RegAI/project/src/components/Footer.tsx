import React from 'react';
import { Sprout, Github, Globe, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Sprout className="h-8 w-8 text-green-500" />
              <span className="text-xl font-bold">AgriAdvisor AI</span>
            </div>
            <p className="text-gray-400 leading-relaxed mb-6 max-w-md">
              Empowering sustainable agriculture through AI-driven insights and personalized 
              regenerative farming plans for small-scale farmers in Kenya.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                <Globe className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Project</h3>
            <ul className="space-y-2">
              <li><a href="#problem" className="text-gray-400 hover:text-white transition-colors">Problem</a></li>
              <li><a href="#solution" className="text-gray-400 hover:text-white transition-colors">Solution</a></li>
              <li><a href="#impact" className="text-gray-400 hover:text-white transition-colors">Climate Impact</a></li>
              <li><a href="#technical" className="text-gray-400 hover:text-white transition-colors">Technical</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Documentation</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">API Reference</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Examples</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Support</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400">
            © 2025 AgriAdvisor AI. A hackathon project for sustainable agriculture and climate action.
          </p>
        </div>
      </div>
    </footer>
  );
}