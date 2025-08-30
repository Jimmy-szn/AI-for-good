import React from 'react';
import { Database, Brain, Monitor, Satellite } from 'lucide-react';

export default function TechnicalRequirements() {
  const requirements = [
    {
      title: "Data Sources",
      icon: Database,
      color: "blue",
      items: [
        "Geospatial Data: Google Earth Engine satellite imagery and climate datasets",
        "Local Agricultural Data: Open datasets on Kenyan crops and planting seasons",
        "Historical Weather Data: Precipitation and temperature data for AI model training"
      ]
    },
    {
      title: "AI Model",
      icon: Brain,
      color: "green",
      items: [
        "Large Language Model (LLM) for plan generation",
        "Prompt-based system for user input processing",
        "Customized text-based regenerative farming plans"
      ]
    },
    {
      title: "Prototype Interface",
      icon: Monitor,
      color: "orange",
      items: [
        "Web application built with React or Flask",
        "Intuitive input fields for farm details",
        "Clear, readable plan output with visualizations"
      ]
    }
  ];

  return (
    <section id="technical" className="py-20 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            🛠 Technical Requirements
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Build a working prototype with these key components for the hackathon
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {requirements.map((req, index) => (
            <div 
              key={index}
              className="bg-gray-800 rounded-2xl p-8 border border-gray-700 hover:border-gray-600 transition-all duration-300 group"
            >
              <div className="flex items-center mb-6">
                <div className={`p-4 bg-${req.color}-600 rounded-xl mr-4 group-hover:scale-110 transition-transform`}>
                  <req.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold">{req.title}</h3>
              </div>

              <ul className="space-y-4">
                {req.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start space-x-3">
                    <div className={`w-2 h-2 bg-${req.color}-500 rounded-full mt-2 flex-shrink-0`}></div>
                    <span className="text-gray-300 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-2xl p-8 border border-gray-600">
          <div className="flex items-start space-x-6">
            <div className="p-4 bg-green-600 rounded-xl">
              <Satellite className="h-8 w-8 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">Open-Access Data Integration</h3>
              <p className="text-gray-300 text-lg leading-relaxed mb-4">
                Leverage powerful platforms like Google Earth Engine to access satellite imagery, 
                climate datasets, and historical weather patterns for comprehensive farm analysis.
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">Satellite Imagery</span>
                <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm">Climate Data</span>
                <span className="bg-orange-600 text-white px-3 py-1 rounded-full text-sm">Weather Patterns</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}