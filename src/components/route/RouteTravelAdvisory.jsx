import React from 'react';
import { AlertTriangle, Calendar, CloudRain, Users } from 'lucide-react';

export default function RouteTravelAdvisory({ data }) {
  if (!data) return null;

  const alerts = [
    { icon: Users, title: "Weekend Rush", desc: data.weekendRush },
    { icon: AlertTriangle, title: "Kanwar Yatra Season", desc: data.kanwarYatra },
    { icon: Calendar, title: "Major Festivals", desc: data.festivals },
    { icon: CloudRain, title: "Monsoon Advisory", desc: data.monsoon },
  ];

  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 border-l-4 border-red-500 pl-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center">
            <AlertTriangle className="h-6 w-6 text-red-500 mr-2" />
            Route Travel Advisory
          </h2>
          <p className="text-gray-600">Important alerts and seasonal conditions for this route.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {alerts.map((item, idx) => (
            <div key={idx} className="flex items-start space-x-4 p-4 rounded-lg bg-red-50">
              <div className="flex-shrink-0">
                <item.icon className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">{item.title}</h4>
                <p className="text-sm text-gray-700 mt-1">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
