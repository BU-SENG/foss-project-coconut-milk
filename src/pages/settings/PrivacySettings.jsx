import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, Shield, Save } from 'lucide-react';

import {
  DEFAULT_PRIVACY_PREFS,
  getCurrentUser,
  updateCurrentUser
} from '../../utils/userStorage';
import { SettingsFallback, SettingsHeader } from './SettingsLayout';

const visibilityOptions = [
  {
    value: 'public',
    title: 'Visible to everyone',
    description: 'Your profile is discoverable by anyone browsing Skill Exchange Hub.'
  },
  {
    value: 'community',
    title: 'Community only',
    description: 'Only registered community members can see your profile.'
  },
  {
    value: 'private',
    title: 'Private',
    description: 'Only people you invite directly can view your profile.'
  }
];

export default function PrivacySettingsPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => getCurrentUser());
  const [privacy, setPrivacy] = useState(DEFAULT_PRIVACY_PREFS);
  const [status, setStatus] = useState({ type: 'info', message: '' });

  useEffect(() => {
    setPrivacy({
      ...DEFAULT_PRIVACY_PREFS,
      ...(user?.privacyPreferences || {})
    });
  }, [user]);

  useEffect(() => {
    const handleUserEvent = () => setUser(getCurrentUser());

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
        title="Privacy Settings"
        message="Log in to control how your profile appears to others."
        onPrimary={() => navigate('/register')}
        onBack={() => navigate('/profile')}
      />
    );
  }

  const handleVisibilityChange = (event) => {
    setPrivacy((prev) => ({ ...prev, profileVisibility: event.target.value }));
  };

  const handleToggle = (key) => {
    setPrivacy((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const updatedUser = updateCurrentUser(() => ({
      privacyPreferences: privacy
    }));

    if (!updatedUser) {
      setStatus({ type: 'error', message: 'Unable to save your privacy settings. Please login again.' });
      return;
    }

    setStatus({ type: 'success', message: 'Privacy settings saved!' });
    setTimeout(() => navigate('/profile'), 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SettingsHeader title="Privacy Settings" onBack={() => navigate('/profile')} />

      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="bg-white rounded-xl shadow-sm p-8">
          <form className="space-y-8" onSubmit={handleSubmit}>
            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                <Shield className="h-5 w-5 text-indigo-600" />
                <span>Profile visibility</span>
              </h2>
              <div className="space-y-4">
                {visibilityOptions.map((option) => (
                  <label
                    key={option.value}
                    className={`block border rounded-xl p-4 cursor-pointer transition-colors ${
                      privacy.profileVisibility === option.value
                        ? 'border-indigo-500 bg-indigo-50'
                        : 'border-gray-200 hover:border-indigo-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">{option.title}</p>
                        <p className="text-sm text-gray-600">{option.description}</p>
                      </div>
                      <input
                        type="radio"
                        name="profileVisibility"
                        value={option.value}
                        checked={privacy.profileVisibility === option.value}
                        onChange={handleVisibilityChange}
                        className="h-5 w-5 text-indigo-600 focus:ring-indigo-500"
                      />
                    </div>
                  </label>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                <Eye className="h-5 w-5 text-indigo-600" />
                <span>Profile information</span>
              </h2>

              <PreferenceRow
                label="Show my email address"
                description="Let community members contact you directly via email."
                checked={privacy.showEmail}
                onChange={() => handleToggle('showEmail')}
              />

              <PreferenceRow
                label="Share activity on dashboard"
                description="Display your latest learning and teaching activity to others."
                checked={privacy.shareActivity}
                onChange={() => handleToggle('shareActivity')}
              />
            </section>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 font-medium flex items-center justify-center space-x-2"
            >
              <Save className="h-5 w-5" />
              <span>Save Privacy Settings</span>
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

function PreferenceRow({ label, description, checked, onChange }) {
  return (
    <div className="flex items-start justify-between border border-gray-200 rounded-lg p-4 mb-4 last:mb-0">
      <div>
        <p className="font-medium text-gray-900">{label}</p>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
      <label className="inline-flex items-center cursor-pointer">
        <input type="checkbox" className="sr-only" checked={checked} onChange={onChange} />
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

