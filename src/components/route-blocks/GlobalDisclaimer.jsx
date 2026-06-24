import React from 'react';
import { AlertTriangle } from 'lucide-react';

export default function GlobalDisclaimer() {
  return (
    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 my-6">
      <div className="flex gap-3">
        <AlertTriangle className="text-amber-500 shrink-0 mt-0.5" size={20} />
        <div className="text-sm text-amber-800 space-y-1">
          <p className="font-bold mb-2">Important Customer Note:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Actual distance may vary depending on exact pickup and drop location.</li>
            <li>Fuel type depends on vehicle availability.</li>
            <li>Same vehicle category is guaranteed, exact model is subject to availability.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
