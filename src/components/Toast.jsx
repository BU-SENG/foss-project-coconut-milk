import React from 'react';

const typeStyles = {
  success: 'bg-green-600 text-white',
  error: 'bg-red-600 text-white',
  info: 'bg-indigo-600 text-white',
  warning: 'bg-yellow-500 text-gray-900'
};

export default function Toast({ message, type = 'info', onClose }) {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-slide-up">
      <div
        className={`min-w-[260px] max-w-sm rounded-xl shadow-2xl px-4 py-3 flex items-start gap-3 ${typeStyles[type]}`}
      >
        <span className="flex-1 text-sm font-medium">{message}</span>
        <button
          aria-label="Dismiss notification"
          className="text-sm font-bold opacity-80 hover:opacity-100"
          onClick={onClose}
        >
          ×
        </button>
      </div>
    </div>
  );
}

