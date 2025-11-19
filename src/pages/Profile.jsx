import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, User, Edit2, Save, Star, Award, Calendar } from 'lucide-react';
import { addDefaultPreferences, getCurrentUser, getCurrentUserId, updateCurrentUser } from '../utils/userStorage';
import Toast from '../components/Toast';
import { useToast } from '../hooks/useToast';

const DEFAULT_PROFILE = {
  id: '',
  name: '',
  email: '',
  bio:
    'Passionate about learning and teaching. Love technology, music, and languages. Always excited to share knowledge with others!',
  interests: 'Web Development, Guitar, Spanish',
  phone: '',
  location: '',
  password: ''
};

const teachingSkills = [
  { id: 1, title: 'React Development', students: 25, rating: 4.8, reviews: 12 },
  { id: 2, title: 'Guitar Basics', students: 18, rating: 4.9, reviews: 10 }
];

const learningSkills = [
  { id: 3, title: 'Spanish Conversation', instructor: 'Maria Garcia', progress: 60 },
  { id: 4, title: 'Digital Photography', instructor: 'John Smith', progress: 40 }
];

const stats = {
  totalStudents: 43,
  skillsTaught: 2,
  skillsLearning: 2,
  avgRating: 4.85
};

export default function ProfilePage() {
  const Navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [tempData, setTempData] = useState(DEFAULT_PROFILE);
  const [currentUserId, setCurrentUserId] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const { toast, showToast, hideToast } = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const hydrateProfile = () => {
    const user = getCurrentUser();
    const userId = getCurrentUserId();
    setCurrentUserId(userId);

    if (!user) {
      setProfileData(null);
      setStatusMessage('Please login to view and edit your profile.');
      return;
    }

    const merged = addDefaultPreferences({ ...DEFAULT_PROFILE, ...user });
    setProfileData(merged);
    setTempData(merged);
    setStatusMessage('');
  };

  useEffect(() => {
    hydrateProfile();

    const handleUserEvent = () => {
      hydrateProfile();
    };

    window.addEventListener('user-login', handleUserEvent);
    window.addEventListener('user-updated', handleUserEvent);
    window.addEventListener('user-logout', handleUserEvent);
    window.addEventListener('user-deleted', handleUserEvent);
    window.addEventListener('storage', handleUserEvent);

    return () => {
      window.removeEventListener('user-login', handleUserEvent);
      window.removeEventListener('user-updated', handleUserEvent);
      window.removeEventListener('user-logout', handleUserEvent);
      window.removeEventListener('user-deleted', handleUserEvent);
      window.removeEventListener('storage', handleUserEvent);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSave = () => {
    if (!currentUserId) {
      showToast({ message: 'No user selected.', type: 'error' });
      return false;
    }

    const updatedUser = updateCurrentUser(() => ({
      name: tempData.name.trim(),
      email: tempData.email.trim(),
      bio: tempData.bio,
      interests: tempData.interests,
      phone: tempData.phone,
      location: tempData.location
    }));

    if (!updatedUser) {
      showToast({ message: 'Unable to save changes. Please login again.', type: 'error' });
      return false;
    }

    setProfileData(updatedUser);
    setTempData(updatedUser);
    showToast({ message: 'Profile updated successfully.', type: 'success' });
    return true;
  };

  const handleEdit = () => {
    if (!profileData) return;
    if (isEditing) {
      const saved = handleSave();
      if (!saved) return;
    }
    setIsEditing(!isEditing);
  };

  const handleCancel = () => {
    setTempData(profileData);
    setIsEditing(false);
  };

  if (!profileData) {
    return (
      <>
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Profile Unavailable</h2>
          <p className="text-gray-600 mb-6">
            {statusMessage || 'Please log in from the Register page to view your profile.'}
          </p>
          <button
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 font-medium"
            onClick={() => Navigate('/register')}
          >
            Go to Login
          </button>
        </div>
        {toast && <Toast message={toast.message} type={toast.type} onClose={hideToast} />}
      </>
    );
  }

  return (
    <>
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <BookOpen className="h-8 w-8 text-indigo-600" />
            <h1 className="text-2xl font-bold text-gray-900">Skill Exchange Hub</h1>
          </div>
          <button className="text-gray-700 hover:text-indigo-600 font-medium" onClick={() => Navigate('/dashboard')}>
            Back to Dashboard
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center space-x-6">
              <div className="h-24 w-24 bg-linear-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                <User className="h-12 w-12 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-1">
                  {isEditing ? tempData.name : profileData.name}
                </h2>
                <p className="text-gray-600">{profileData.email}</p>
                <div className="flex items-center space-x-4 mt-2">
                  <div className="flex items-center space-x-1">
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <span className="font-semibold">{stats.avgRating}</span>
                  </div>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-600">{stats.totalStudents} students taught</span>
                </div>
              </div>
            </div>
            <button
              onClick={handleEdit}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 font-medium flex items-center space-x-2"
            >
              {isEditing ? (
                <>
                  <Save className="h-5 w-5" />
                  <span>Save</span>
                </>
              ) : (
                <>
                  <Edit2 className="h-5 w-5" />
                  <span>Edit Profile</span>
                </>
              )}
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-4 gap-4 py-6 border-t border-gray-200">
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-600 mb-1">{stats.skillsTaught}</div>
              <div className="text-sm text-gray-600">Teaching</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-600 mb-1">{stats.skillsLearning}</div>
              <div className="text-sm text-gray-600">Learning</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-600 mb-1">{stats.totalStudents}</div>
              <div className="text-sm text-gray-600">Students</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-600 mb-1">{stats.avgRating}</div>
              <div className="text-sm text-gray-600">Avg Rating</div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Section */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">About</h3>
              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={tempData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                    <textarea
                      name="bio"
                      value={tempData.bio}
                      onChange={handleChange}
                      rows="4"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Interests</label>
                    <input
                      type="text"
                      name="interests"
                      value={tempData.interests}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                    />
                  </div>
                  <button
                    onClick={handleCancel}
                    className="text-gray-600 hover:text-gray-900 font-medium"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-gray-600">{profileData.bio}</p>
                  <div>
                    <span className="font-medium text-gray-900">Interests: </span>
                    <span className="text-gray-600">{profileData.interests}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Skills Teaching */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900">Skills Teaching</h3>
                <Award className="h-6 w-6 text-indigo-600" />
              </div>
              <div className="space-y-4">
                {teachingSkills.map((skill) => (
                  <div key={skill.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-gray-900">{skill.title}</h4>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium">{skill.rating}</span>
                        <span className="text-xs text-gray-500">({skill.reviews})</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">{skill.students} students</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills Learning */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900">Skills Learning</h3>
                <Calendar className="h-6 w-6 text-indigo-600" />
              </div>
              <div className="space-y-4">
                {learningSkills.map((skill) => (
                  <div key={skill.id} className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-1">{skill.title}</h4>
                    <p className="text-sm text-gray-600 mb-3">Instructor: {skill.instructor}</p>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-indigo-600 h-2 rounded-full" style={{ width: `${skill.progress}%` }} />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{skill.progress}% complete</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar - Contact Info */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h3>
              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={tempData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={tempData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                    <input
                      type="text"
                      name="location"
                      value={tempData.location}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Email</p>
                    <p className="text-gray-600">{profileData.email}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Phone</p>
                    <p className="text-gray-600">{profileData.phone || 'Add your phone number'}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Location</p>
                    <p className="text-gray-600">{profileData.location || 'Add your location'}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Account Settings */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Account Settings</h3>
              <div className="space-y-3">
                <button
                  className="w-full text-left text-gray-700 hover:text-indigo-600 py-2"
                  onClick={() => Navigate('/settings/password')}
                >
                  Change Password
                </button>
                <button
                  className="w-full text-left text-gray-700 hover:text-indigo-600 py-2"
                  onClick={() => Navigate('/settings/notifications')}
                >
                  Notification Preferences
                </button>
                <button
                  className="w-full text-left text-gray-700 hover:text-indigo-600 py-2"
                  onClick={() => Navigate('/settings/privacy')}
                >
                  Privacy Settings
                </button>
                <button
                  className="w-full text-left text-red-600 hover:text-red-700 py-2 border-t border-gray-200 mt-2 pt-4"
                  onClick={() => Navigate('/settings/delete-account')}
                >
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
    {toast && <Toast message={toast.message} type={toast.type} onClose={hideToast} />}
    </>
  );
}
