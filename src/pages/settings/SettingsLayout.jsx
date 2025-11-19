import React from 'react';
import { ArrowLeft } from 'lucide-react';

export function SettingsHeader({ title, onBack }) {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-4xl mx-auto px-4 py-4 flex items-center space-x-4">
        <button
          className="inline-flex items-center text-gray-600 hover:text-indigo-600"
          onClick={onBack}
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Profile
        </button>
        <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
      </div>
    </header>
  );
}

export function SettingsFallback({ title, message, primaryLabel = 'Go to Login', onPrimary, onBack }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <SettingsHeader title={title} onBack={onBack} />
      <div className="flex-1 flex flex-col items-center justify-center px-4 text-center">
        <p className="text-gray-600 mb-6">{message}</p>
        <button
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 font-medium"
          onClick={onPrimary}
        >
          {primaryLabel}
        </button>
      </div>
    </div>
  );
}

