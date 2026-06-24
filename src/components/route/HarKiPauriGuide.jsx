import React from 'react';
import { Sun, Clock, Users, Shield, Car, Navigation } from 'lucide-react';

export default function HarKiPauriGuide({ data }) {
  if (!data) return null;

  const features = [
    { icon: Sun, title: "Best Time", desc: data.bestTime },
    { icon: Clock, title: "Aarti Timings", desc: data.aartiTimings },
    { icon: Users, title: "Crowd Level", desc: data.crowdLevel },
    { icon: Shield, title: "Footwear Rules", desc: data.footwear },
    { icon: Car, title: "Parking", desc: data.parking },
    { icon: Navigation, title: "Walking Distance", desc: data.walkingDistance },
  ];

  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Har Ki Pauri Dedicated Guide</h2>
          <p className="text-lg text-gray-600">Essential information for your visit to the sacred Brahmakund.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((item, idx) => (
            <div key={idx} className="bg-orange-50 rounded-xl p-6 border border-orange-100 hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 bg-orange-100 rounded-lg text-orange-600">
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
