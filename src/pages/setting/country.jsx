import BackButton from '@/components/ui/BackButton';
import React from 'react';

export default function SettingCountry() {
  return (
    <div className="p-6">
       <div className="flex items-center py-5">
      
              <BackButton />
              <h2 className="text-xl font-light tracking-tight">
                Manage{" "}
                <span className="font-bold text-3xl" style={{ color: "#EC5800" }}>
                  Country
                </span>
              </h2>
            </div>
      <p className="text-sm text-gray-600 mt-2">Placeholder for country list and management.</p>
    </div>
  );
}
