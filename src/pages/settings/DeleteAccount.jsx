import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, Trash2 } from 'lucide-react';

import { deleteCurrentUser, getCurrentUser } from '../../utils/userStorage';
import { SettingsFallback, SettingsHeader } from './SettingsLayout';

// Function for deleting account page
export default function DeleteAccountPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => getCurrentUser());
  const [confirmation, setConfirmation] = useState('');
  const [status, setStatus] = useState({ type: 'info', message: '' });

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
        title="Delete Account"
        message="You need to be logged in to delete your account."
        onPrimary={() => navigate('/register')}
        onBack={() => navigate('/profile')}
      />
    );
  }

  const handleDelete = () => {
    if (confirmation !== 'DELETE') {
      setStatus({ type: 'error', message: 'Please type DELETE in all caps to confirm.' });
      return;
    }

    const success = deleteCurrentUser();
    if (!success) {
      setStatus({ type: 'error', message: 'Unable to remove your account. Please login again.' });
      return;
    }

    if (typeof window !== 'undefined') {
      localStorage.removeItem('skill-exchange-custom-skills');
      window.dispatchEvent(new Event('skill-added'));
    }

    setStatus({ type: 'success', message: 'Your account has been deleted. Redirecting...' });
    setTimeout(() => navigate('/register'), 1200);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SettingsHeader title="Delete Account" onBack={() => navigate('/profile')} />

      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="bg-white rounded-xl shadow-sm p-8 space-y-6">
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-red-100 text-red-700 rounded-full">
              <AlertTriangle className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">This action is permanent</h2>
              <p className="text-gray-600 mt-2">
                Deleting your account will remove your profile, custom skills, and learning history from Skill
                Exchange Hub. This action cannot be undone.
              </p>
            </div>
          </div>

          <div className="border border-red-200 rounded-lg p-4 bg-red-50 text-sm text-red-700">
            <ul className="list-disc pl-5 space-y-1">
              <li>Your profile will no longer appear in the community.</li>
              <li>Custom skills you shared will be removed from the browse page.</li>
              <li>You will lose access to any draft or saved information.</li>
            </ul>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Type <span className="font-semibold">DELETE</span> to confirm
            </label>
            <input
              type="text"
              value={confirmation}
              onChange={(event) => setConfirmation(event.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
              placeholder="DELETE"
            />
          </div>

          <button
            onClick={handleDelete}
            className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 font-medium flex items-center justify-center space-x-2"
          >
            <Trash2 className="h-5 w-5" />
            <span>Delete My Account</span>
          </button>

          {status.message && (
            <div
              className={`rounded-lg border px-4 py-3 text-sm ${
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

