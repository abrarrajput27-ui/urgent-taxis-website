import React from 'react';
import { AlertCircle, ShieldAlert } from 'lucide-react';

export default function RouteNotes({ route }) {
  if (!route.fareNotes && !route.safetyNotes) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
      {route.fareNotes && (
        <div className="bg-orange-50 rounded-2xl shadow-sm border border-orange-100 p-6 h-full">
          <h3 className="text-lg font-black text-orange-800 mb-4 flex items-center gap-2">
            <AlertCircle size={20} className="text-orange-600" /> Important Fare Notes
          </h3>
          <div className="prose prose-sm text-orange-700 leading-relaxed max-w-none" dangerouslySetInnerHTML={{ __html: route.fareNotes }} />
        </div>
      )}

      {route.safetyNotes && (
        <div className="bg-blue-50 rounded-2xl shadow-sm border border-blue-100 p-6 h-full">
          <h3 className="text-lg font-black text-blue-800 mb-4 flex items-center gap-2">
            <ShieldAlert size={20} className="text-blue-600" /> Safety & Trust
          </h3>
          <div className="prose prose-sm text-blue-800 leading-relaxed max-w-none" dangerouslySetInnerHTML={{ __html: route.safetyNotes }} />
        </div>
      )}
    </div>
  );
}
