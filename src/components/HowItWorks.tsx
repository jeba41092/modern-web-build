
import React from 'react';
import { Upload, Search, Car } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: Upload,
      title: 'Upload Photo',
      description: 'Take or upload a clear photo of the vehicle damage.',
    },
    {
      icon: Search,
      title: 'AI Analysis',
      description: 'Our AI analyzes the damage to determine severity and repair needs.',
    },
    {
      icon: Car,
      title: 'Get Assessment',
      description: 'Receive a detailed assessment with repair suggestions.',
    },
  ];

  return (
    <section className="py-10 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-2xl font-bold text-center mb-8">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-theme-lightBlue flex items-center justify-center mb-4">
                <step.icon className="h-8 w-8 text-theme-blue" />
              </div>
              <h3 className="text-xl font-medium mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
