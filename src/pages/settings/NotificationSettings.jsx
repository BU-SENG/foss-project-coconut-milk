import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Save } from 'lucide-react';

import {
  DEFAULT_NOTIFICATION_PREFS,
  getCurrentUser,
  updateCurrentUser
} from '../../utils/userStorage';
import { SettingsFallback, SettingsHeader } from './SettingsLayout';

export default function NotificationSettingsPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => getCurrentUser());
  const [preferences, setPreferences] = useState(DEFAULT_NOTIFICATION_PREFS);
  const [status, setStatus] = useState({ type: 'info', message: '' });

  useEffect(() => {
    setPreferences({
      ...DEFAULT_NOTIFICATION_PREFS,
      ...(user?.notificationPreferences || {})
    });
  }, [user]);

  useEffect(() => {
    const handleUserEvent = () => {
      setUser(getCurrentUser());
    };

    window.addEventListener('user-login', handleUserEvent);
    window.addEventListener('user-updated', handleUserEvent);
    window.addEventListener('user-logout', handleUserEvent);

    return () => {
      window.removeEventListener('user-login', handleUserEvent);
      window.removeEventListener('user-updated', handleUserEvent);
      window.removeEventListener('user-logout', handleUserEvent);
    };
  }, []);

  if (!user) {
    return (
      <SettingsFallback
        title="Notification Preferences"
        message="Log in to customize how we keep you informed."
        onPrimary={() => navigate('/register')}
        onBack={() => navigate('/profile')}
      />
    );
  }

  const togglePreference = (key) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const updatedUser = updateCurrentUser(() => ({
      notificationPreferences: preferences
    }));

    if (!updatedUser) {
      setStatus({ type: 'error', message: 'Unable to save your changes. Please login again.' });
      return;
    }

    setStatus({ type: 'success', message: 'Notification preferences saved!' });
    setTimeout(() => navigate('/profile'), 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SettingsHeader title="Notification Preferences" onBack={() => navigate('/profile')} />

      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="bg-white rounded-xl shadow-sm p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <PreferenceToggle
              icon={<Bell className="h-5 w-5 text-indigo-600" />}
              label="Product updates"
              description="Be the first to know about new features and improvements."
              checked={preferences.productUpdates}
              onChange={() => togglePreference('productUpdates')}
            />

            <PreferenceToggle
              icon={<Bell className="h-5 w-5 text-indigo-600" />}
              label="Session reminders"
              description="Receive reminders before upcoming learning or teaching sessions."
              checked={preferences.sessionReminders}
              onChange={() => togglePreference('sessionReminders')}
            />

            <PreferenceToggle
              icon={<Bell className="h-5 w-5 text-indigo-600" />}
              label="Marketing emails"
              description="Occasional announcements, events, and curated content."
              checked={preferences.marketingEmails}
              onChange={() => togglePreference('marketingEmails')}
            />

            <PreferenceToggle
              icon={<Bell className="h-5 w-5 text-indigo-600" />}
              label="SMS alerts"
              description="Text message alerts for urgent updates (standard rates apply)."
              checked={preferences.smsAlerts}
              onChange={() => togglePreference('smsAlerts')}
            />

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 font-medium flex items-center justify-center space-x-2"
            >
              <Save className="h-5 w-5" />
              <span>Save Preferences</span>
            </button>
          </form>

          {status.message && (
            <div
              className={`mt-6 rounded-lg border px-4 py-3 text-sm ${
                status.type === 'success'
                  ? 'border-green-200 bg-green-50 text-green-700'
                  : 'border-red-200 bg-red-50 text-red-700'
              }`}
            >
              {status.message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function PreferenceToggle({ icon, label, description, checked, onChange }) {
  return (
    <div className="flex items-start justify-between border border-gray-200 rounded-lg p-4">
      <div>
        <div className="flex items-center space-x-2">
          {icon}
          <span className="font-medium text-gray-900">{label}</span>
        </div>
        <p className="text-sm text-gray-600 mt-1">{description}</p>
      </div>
      <label className="inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          className="sr-only"
          checked={checked}
          onChange={onChange}
        />
        <div
          className={`w-11 h-6 rounded-full transition-colors ${
            checked ? 'bg-indigo-600' : 'bg-gray-300'
          }`}
        >
          <div
            className={`h-5 w-5 bg-white rounded-full shadow transform transition-transform ${
              checked ? 'translate-x-5' : 'translate-x-1'
            }`}
          />
        </div>
      </label>
    </div>
  );
}

