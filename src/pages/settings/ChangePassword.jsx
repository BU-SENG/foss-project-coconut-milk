import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Save } from 'lucide-react';

import { getCurrentUser, updateCurrentUser } from '../../utils/userStorage';
import { SettingsFallback, SettingsHeader } from './SettingsLayout';

const initialFormState = {
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
};

export default function ChangePasswordPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => getCurrentUser());
  const [formData, setFormData] = useState(initialFormState);
  const [status, setStatus] = useState({ type: 'info', message: '' });

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
        title="Change Password"
        message="You need to be logged in to update your password."
        onPrimary={() => navigate('/register')}
        onBack={() => navigate('/profile')}
      />
    );
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.currentPassword || !formData.newPassword || !formData.confirmPassword) {
      setStatus({ type: 'error', message: 'Please fill in all fields.' });
      return;
    }

    if (formData.currentPassword !== user.password) {
      setStatus({ type: 'error', message: 'Current password is incorrect.' });
      return;
    }

    if (formData.newPassword.length < 6) {
      setStatus({ type: 'error', message: 'New password must be at least 6 characters.' });
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setStatus({ type: 'error', message: 'New passwords do not match.' });
      return;
    }

    const updatedUser = updateCurrentUser(() => ({ password: formData.newPassword }));

    if (!updatedUser) {
      setStatus({ type: 'error', message: 'Unable to update password. Please login again.' });
      return;
    }

    setStatus({ type: 'success', message: 'Password updated successfully!' });
    setFormData(initialFormState);
    setTimeout(() => navigate('/profile'), 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SettingsHeader title="Change Password" onBack={() => navigate('/profile')} />

      <div className="max-w-2xl mx-auto px-4 py-10">
        <div className="bg-white rounded-xl shadow-sm p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="password"
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                  placeholder="Enter current password"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="password"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                  placeholder="Enter new password"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                  placeholder="Re-enter new password"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 font-medium flex items-center justify-center space-x-2"
            >
              <Save className="h-5 w-5" />
              <span>Update Password</span>
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


