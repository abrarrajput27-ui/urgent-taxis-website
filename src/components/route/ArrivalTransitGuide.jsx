import React from 'react';
import { Train, Bus, Activity } from 'lucide-react';

export default function ArrivalTransitGuide({ data }) {
  if (!data) return null;

  const features = [
    { icon: Train, title: "Railway Station", desc: data.railwayStation },
    { icon: Bus, title: "Bus Stand", desc: data.busStand },
    { icon: Activity, title: "Local Transport", desc: data.localTransport },
  ];

  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Railway & Bus Arrival Guide</h2>
          <p className="text-lg text-gray-600">Transit information upon reaching the city.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((item, idx) => (
            <div key={idx} className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg">{item.title}</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
