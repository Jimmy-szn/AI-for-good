import React from 'react';
import { AlertTriangle, TrendingDown, Users } from 'lucide-react';

export default function Problem() {
  const challenges = [
    {
      icon: TrendingDown,
      title: "Lack of Personalization",
      description: "Generic farming advice doesn't account for unique soil, climate, and crop conditions"
    },
    {
      icon: Users,
      title: "Knowledge Gap",
      description: "Farmers are aware of regenerative practices but lack implementation guidance"
    },
    {
      icon: AlertTriangle,
      title: "Implementation Barriers",
      description: "Without tailored plans, adoption rates remain low despite environmental benefits"
    }
  ];

  return (
    <section id="problem" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            🎯 The Problem
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Many Kenyan farmers are aware of regenerative agriculture but lack a personalized, 
            data-driven plan to implement it effectively.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {challenges.map((challenge, index) => (
            <div 
              key={index}
              className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 group"
            >
              <div className="flex items-center mb-4">
                <div className="p-3 bg-red-100 rounded-lg group-hover:bg-red-200 transition-colors">
                  <challenge.icon className="h-6 w-6 text-red-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {challenge.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {challenge.description}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
          <div className="text-center">
            <p className="text-lg text-gray-700 mb-6">
              <strong>What works for one farm may not work for another</strong> due to differences in 
              soil composition, local climate patterns, and crop varieties.
            </p>
            <div className="inline-flex items-center space-x-2 bg-red-50 text-red-700 px-4 py-2 rounded-lg">
              <AlertTriangle className="h-5 w-5" />
              <span className="font-medium">This lack of tailored advice is a major barrier to adoption</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}