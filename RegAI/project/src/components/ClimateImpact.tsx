import React from 'react';
import { Shield, Leaf, TrendingUp, Droplets } from 'lucide-react';

export default function ClimateImpact() {
  const impacts = [
    {
      category: "Adaptation",
      icon: Shield,
      color: "blue",
      benefits: [
        {
          icon: Droplets,
          title: "Enhanced Water Retention",
          description: "Improved soil health holds more moisture, increasing drought resilience"
        },
        {
          icon: Shield,
          title: "Flood Resistance",
          description: "Better soil structure reduces erosion and improves flood management"
        }
      ]
    },
    {
      category: "Mitigation",
      icon: Leaf,
      color: "green",
      benefits: [
        {
          icon: Leaf,
          title: "Carbon Sequestration",
          description: "Healthy soil captures and stores significant amounts of atmospheric carbon"
        },
        {
          icon: TrendingUp,
          title: "Reduced Emissions",
          description: "Less synthetic fertilizer use means lower greenhouse gas emissions"
        }
      ]
    }
  ];

  return (
    <section id="impact" className="py-20 bg-gradient-to-br from-blue-50 via-green-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            🌍 How It Fights Climate Change
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            This project is a powerful solution for both climate adaptation and mitigation, 
            creating resilient farming systems while reducing atmospheric carbon.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {impacts.map((impact, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center mb-6">
                <div className={`p-4 bg-${impact.color}-100 rounded-xl mr-4`}>
                  <impact.icon className={`h-8 w-8 text-${impact.color}-600`} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">{impact.category}</h3>
              </div>

              <div className="space-y-6">
                {impact.benefits.map((benefit, benefitIndex) => (
                  <div key={benefitIndex} className="flex items-start space-x-4">
                    <div className={`p-2 bg-${impact.color}-50 rounded-lg mt-1`}>
                      <benefit.icon className={`h-5 w-5 text-${impact.color}-600`} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">{benefit.title}</h4>
                      <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Large-Scale Environmental Impact</h3>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
              By helping farmers adopt regenerative practices at scale, this project contributes to 
              significant atmospheric carbon reduction while building agricultural resilience against 
              climate change impacts like droughts and extreme weather events.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}