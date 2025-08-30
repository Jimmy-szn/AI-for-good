import React from 'react';
import { Brain, MapPin, Droplets, RotateCcw } from 'lucide-react';

export default function Solution() {
  const features = [
    {
      icon: RotateCcw,
      title: "Crop Rotation Strategies",
      description: "AI-generated rotation plans optimized for your specific soil and climate conditions"
    },
    {
      icon: MapPin,
      title: "Local Cover Crops",
      description: "Recommendations for the best cover crops available in your region"
    },
    {
      icon: Droplets,
      title: "Water & Soil Management",
      description: "Personalized techniques for improving water retention and soil health"
    }
  ];

  return (
    <section id="solution" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            💡 The Solution
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            A prototype advisory tool that generates customized, step-by-step 
            "Regenerative Farming Plans" tailored to each farm's unique conditions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-green-600 to-blue-600 p-8 rounded-2xl text-white">
              <Brain className="h-12 w-12 mb-4" />
              <h3 className="text-2xl font-bold mb-4">AI-Driven Personalization</h3>
              <p className="text-green-50 text-lg leading-relaxed">
                Our advanced AI analyzes your farm's location, soil composition, and local weather 
                patterns to create a completely customized regenerative farming strategy.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-green-50 p-6 rounded-xl border border-green-200">
                <h4 className="font-semibold text-green-900 mb-2">Location-Based</h4>
                <p className="text-green-700 text-sm">Tailored to your specific geographic region</p>
              </div>
              <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
                <h4 className="font-semibold text-blue-900 mb-2">Data-Driven</h4>
                <p className="text-blue-700 text-sm">Powered by satellite imagery and climate data</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="flex items-start space-x-4 p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group"
              >
                <div className="p-3 bg-white rounded-lg shadow-sm group-hover:shadow-md transition-shadow">
                  <feature.icon className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">Actionable, Step-by-Step Guidance</h3>
          <p className="text-green-50 text-lg max-w-2xl mx-auto">
            Every recommendation comes with clear implementation steps, timeline, and expected outcomes 
            to ensure successful adoption of regenerative practices.
          </p>
        </div>
      </div>
    </section>
  );
}