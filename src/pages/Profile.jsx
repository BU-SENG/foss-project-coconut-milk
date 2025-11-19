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
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/50 flex flex-col items-center justify-center px-4 text-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-indigo-100/50 p-10 max-w-md">
            <div className="mb-6 inline-flex p-4 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full">
              <User className="h-8 w-8 text-indigo-600" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-indigo-900 bg-clip-text text-transparent mb-3">
              Profile Unavailable
            </h2>
            <p className="text-gray-600 mb-8 text-lg">
              {statusMessage || 'Please log in from the Register page to view your profile.'}
            </p>
            <button
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3.5 rounded-xl hover:from-indigo-700 hover:to-purple-700 font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
              onClick={() => Navigate('/register')}
            >
              Go to Login
            </button>
          </div>
        </div>
        {toast && <Toast message={toast.message} type={toast.type} onClose={hideToast} />}
      </>
    );
  }

  return (
    <>
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/50">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 text-white shadow-xl backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-white/10 rounded-xl backdrop-blur-sm">
              <BookOpen className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold cursor-pointer hover:text-purple-100 transition-colors" onClick={() => Navigate('/dashboard')}>
              Skill Exchange Hub
            </h1>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Profile Header */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 md:p-10 mb-8 border border-indigo-100/50 hover:shadow-2xl transition-all duration-300">
          <div className="flex items-start justify-between mb-8">
            <div className="flex items-center space-x-6">
              <div className="h-28 w-28 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-xl border-4 border-white">
                <User className="h-14 w-14 text-white" />
              </div>
              <div>
                <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-indigo-900 bg-clip-text text-transparent mb-2">
                  {isEditing ? tempData.name : profileData.name}
                </h2>
                <p className="text-gray-600 text-lg font-medium">{profileData.email}</p>
                <div className="flex items-center space-x-4 mt-3">
                  <div className="flex items-center space-x-1.5 bg-yellow-50 px-3 py-1.5 rounded-full border border-yellow-200/50">
                    <Star className="h-5 w-5 text-yellow-500 fill-current" />
                    <span className="font-bold text-gray-900">{stats.avgRating}</span>
                  </div>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-600 font-medium">{stats.totalStudents} students taught</span>
                </div>
              </div>
            </div>
            <button
              onClick={handleEdit}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-7 py-3 rounded-xl hover:from-indigo-700 hover:to-purple-700 font-semibold flex items-center space-x-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
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
          <div className="grid grid-cols-4 gap-4 py-6 border-t border-indigo-100/50">
            <div className="text-center p-4 bg-gradient-to-br from-indigo-50/50 to-purple-50/50 rounded-2xl border border-indigo-100/50 hover:shadow-md transition-all duration-300">
              <div className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-1">{stats.skillsTaught}</div>
              <div className="text-sm text-gray-600 font-semibold">Teaching</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-purple-50/50 to-pink-50/50 rounded-2xl border border-purple-100/50 hover:shadow-md transition-all duration-300">
              <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-1">{stats.skillsLearning}</div>
              <div className="text-sm text-gray-600 font-semibold">Learning</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 rounded-2xl border border-blue-100/50 hover:shadow-md transition-all duration-300">
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-1">{stats.totalStudents}</div>
              <div className="text-sm text-gray-600 font-semibold">Students</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-yellow-50/50 to-orange-50/50 rounded-2xl border border-yellow-100/50 hover:shadow-md transition-all duration-300">
              <div className="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent mb-1">{stats.avgRating}</div>
              <div className="text-sm text-gray-600 font-semibold">Avg Rating</div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Section */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-7 border border-indigo-100/50 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl">
                  <User className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">About</h3>
              </div>
              {isEditing ? (
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={tempData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-300 bg-white/50 hover:bg-white hover:border-indigo-300 font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Bio</label>
                    <textarea
                      name="bio"
                      value={tempData.bio}
                      onChange={handleChange}
                      rows="4"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none resize-none transition-all duration-300 bg-white/50 hover:bg-white hover:border-indigo-300 font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Interests</label>
                    <input
                      type="text"
                      name="interests"
                      value={tempData.interests}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-300 bg-white/50 hover:bg-white hover:border-indigo-300 font-medium"
                    />
                  </div>
                  <button
                    onClick={handleCancel}
                    className="text-gray-600 hover:text-gray-900 font-semibold transition-colors px-4 py-2 hover:bg-gray-100 rounded-lg"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-gray-600 text-lg leading-relaxed">{profileData.bio}</p>
                  <div className="p-4 bg-gradient-to-r from-indigo-50/50 to-purple-50/50 rounded-xl border border-indigo-100/50">
                    <span className="font-bold text-gray-900">Interests: </span>
                    <span className="text-gray-700 font-medium">{profileData.interests}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Skills Teaching */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-7 border border-indigo-100/50 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl">
                  <Award className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Skills Teaching</h3>
              </div>
              <div className="space-y-4">
                {teachingSkills.map((skill) => (
                  <div key={skill.id} className="group border-2 border-gray-100 rounded-2xl p-5 hover:border-indigo-300 hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-white to-indigo-50/30 hover:from-indigo-50/50 hover:to-purple-50/30 cursor-pointer hover:scale-[1.02] active:scale-100">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-bold text-gray-900 text-lg group-hover:text-indigo-700 transition-colors">{skill.title}</h4>
                      <div className="flex items-center space-x-1.5 bg-yellow-50 px-2.5 py-1 rounded-full border border-yellow-200/50">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-bold text-gray-900">{skill.rating}</span>
                        <span className="text-xs text-gray-500">({skill.reviews})</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 font-medium">{skill.students} students enrolled</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills Learning */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-7 border border-indigo-100/50 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl">
                  <Calendar className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Skills Learning</h3>
              </div>
              <div className="space-y-4">
                {learningSkills.map((skill) => (
                  <div key={skill.id} className="group border-2 border-gray-100 rounded-2xl p-5 hover:border-purple-300 hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-white to-purple-50/30 hover:from-purple-50/50 hover:to-pink-50/30 cursor-pointer hover:scale-[1.02] active:scale-100">
                    <h4 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-purple-700 transition-colors">{skill.title}</h4>
                    <p className="text-sm text-gray-600 mb-4 font-medium">Instructor: {skill.instructor}</p>
                    <div className="w-full bg-gray-200 rounded-full h-3 mb-2 overflow-hidden">
                      <div className="bg-gradient-to-r from-purple-600 to-pink-600 h-3 rounded-full transition-all duration-500 shadow-sm" style={{ width: `${skill.progress}%` }} />
                    </div>
                    <p className="text-xs text-gray-600 font-semibold">{skill.progress}% complete</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar - Contact Info */}
          <div className="space-y-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-7 border border-indigo-100/50 hover:shadow-2xl transition-all duration-300">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h3>
              {isEditing ? (
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={tempData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-300 bg-white/50 hover:bg-white hover:border-indigo-300 font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={tempData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-300 bg-white/50 hover:bg-white hover:border-indigo-300 font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
                    <input
                      type="text"
                      name="location"
                      value={tempData.location}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-300 bg-white/50 hover:bg-white hover:border-indigo-300 font-medium"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="p-4 bg-gradient-to-r from-indigo-50/50 to-purple-50/50 rounded-xl border border-indigo-100/50">
                    <p className="text-sm font-bold text-gray-700 mb-1">Email</p>
                    <p className="text-gray-700 font-medium">{profileData.email}</p>
                  </div>
                  <div className="p-4 bg-gradient-to-r from-indigo-50/50 to-purple-50/50 rounded-xl border border-indigo-100/50">
                    <p className="text-sm font-bold text-gray-700 mb-1">Phone</p>
                    <p className="text-gray-700 font-medium">{profileData.phone || 'Add your phone number'}</p>
                  </div>
                  <div className="p-4 bg-gradient-to-r from-indigo-50/50 to-purple-50/50 rounded-xl border border-indigo-100/50">
                    <p className="text-sm font-bold text-gray-700 mb-1">Location</p>
                    <p className="text-gray-700 font-medium">{profileData.location || 'Add your location'}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Account Settings */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-7 border border-indigo-100/50 hover:shadow-2xl transition-all duration-300">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Account Settings</h3>
              <div className="space-y-2">
                <button
                  className="w-full text-left text-gray-700 hover:text-indigo-600 hover:bg-indigo-50/50 py-3 px-4 rounded-xl font-semibold transition-all duration-300 hover:scale-[1.02]"
                  onClick={() => Navigate('/settings/password')}
                >
                  Change Password
                </button>
                <button
                  className="w-full text-left text-gray-700 hover:text-indigo-600 hover:bg-indigo-50/50 py-3 px-4 rounded-xl font-semibold transition-all duration-300 hover:scale-[1.02]"
                  onClick={() => Navigate('/settings/notifications')}
                >
                  Notification Preferences
                </button>
                <button
                  className="w-full text-left text-gray-700 hover:text-indigo-600 hover:bg-indigo-50/50 py-3 px-4 rounded-xl font-semibold transition-all duration-300 hover:scale-[1.02]"
                  onClick={() => Navigate('/settings/privacy')}
                >
                  Privacy Settings
                </button>
                <div className="border-t border-gray-200 my-3"></div>
                <button
                  className="w-full text-left text-red-600 hover:text-red-700 hover:bg-red-50/50 py-3 px-4 rounded-xl font-semibold transition-all duration-300 hover:scale-[1.02]"
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
