import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, Mail, Lock, User } from 'lucide-react';
import { addDefaultPreferences, getStoredUsers, saveUsers, setCurrentUserId } from '../utils/userStorage';
import Toast from '../components/Toast';
import { useToast } from '../hooks/useToast';

export default function AuthPage() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [users, setUsers] = useState(() => getStoredUsers());
  const { toast, showToast, hideToast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    bio: ''
  });

  useEffect(() => {
    saveUsers(users);
  }, [users]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = formData.email.trim().toLowerCase();

    if (isLogin) {
      const existingUser = users.find((user) => user.email === email);
      if (!existingUser) {
        showToast({ message: 'No account found for that email. Please sign up first.', type: 'error' });
        return;
      }
      if (existingUser.password !== formData.password) {
        showToast({ message: 'Incorrect password. Please try again.', type: 'error' });
        return;
      }
      showToast({ message: 'Welcome back! Taking you to the dashboard...', type: 'success', duration: 2000 });
      setCurrentUserId(existingUser.id);
      setTimeout(() => navigate('/dashboard'), 800);
      return;
    }

    if (users.some((user) => user.email === email)) {
      showToast({ message: 'Email already registered. Please login instead.', type: 'error' });
      return;
    }

    const newUser = addDefaultPreferences({
      id: crypto.randomUUID(),
      name: formData.name.trim(),
      email,
      password: formData.password,
      bio: formData.bio
    });

    setUsers((prev) => [...prev, newUser]);
    showToast({ message: 'Account created! Please login with your new credentials.', type: 'success' });
    setIsLogin(true);
    setFormData({
      name: '',
      email: '',
      password: '',
      bio: ''
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        {/* Logo */}
        <div className="flex items-center justify-center space-x-2 mb-8">
          <BookOpen className="h-10 w-10 text-indigo-600" />
          <Link to='/'>
             <h1 className="text-2xl font-bold text-gray-900">Skill Exchange Hub</h1>
          </Link>
        </div>

        
        <div className="flex bg-gray-100 rounded-lg p-1 mb-8">
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-2 rounded-md font-medium transition-colors ${
              isLogin
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-2 rounded-md font-medium transition-colors ${
              !isLogin
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Sign Up
          </button>
        </div>

        
        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                  placeholder="John Doe"
                  required={!isLogin}
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                placeholder="you@example.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Short Bio (Optional)
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows="3"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none resize-none"
                placeholder="Tell us a bit about yourself..."
              />
            </div>
          )}

          {isLogin && (
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <a href="#" className="text-sm text-indigo-600 hover:text-indigo-700">
                Forgot password?
              </a>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 font-medium transition-colors"
          >
            {isLogin ? 'Login' : 'Create Account'}
          </button>
        </form>

        {toast && <Toast message={toast.message} type={toast.type} onClose={hideToast} />}

       
        <div className="mt-6 text-center text-sm text-gray-600">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-indigo-600 hover:text-indigo-700 font-medium"
          >
            {isLogin ? 'Sign up' : 'Login'}
          </button>
        </div>
      </div>
    </div>
  );
}