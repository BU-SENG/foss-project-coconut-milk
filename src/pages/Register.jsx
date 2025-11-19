import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, Mail, Lock, User, FileText, Sparkles } from 'lucide-react';
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl w-full max-w-md p-8 md:p-10 border-2 border-indigo-100/50 relative z-10 hover:shadow-3xl transition-all duration-300">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl shadow-lg mb-4">
            <BookOpen className="h-8 w-8 text-white" />
          </div>
          <Link to='/' className="text-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 via-indigo-900 to-purple-900 bg-clip-text text-transparent">
              Skill Exchange Hub
            </h1>
            <p className="text-sm text-gray-600 font-medium mt-1">Curate. Teach. Learn.</p>
          </Link>
        </div>

        {/* Toggle Buttons */}
        <div className="flex bg-gray-100/80 rounded-xl p-1.5 mb-8 border-2 border-gray-200/50">
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-3 rounded-lg font-semibold transition-all duration-300 ${
              isLogin
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg scale-105'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-3 rounded-lg font-semibold transition-all duration-300 ${
              !isLogin
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg scale-105'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {!isLogin && (
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                <User className="w-4 h-4 text-indigo-600" />
                <span>Full Name</span>
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-indigo-400" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 bg-white/50 hover:border-gray-300 outline-none"
                  placeholder="John Doe"
                  required={!isLogin}
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
              <Mail className="w-4 h-4 text-indigo-600" />
              <span>Email</span>
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-indigo-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 bg-white/50 hover:border-gray-300 outline-none"
                placeholder="you@example.com"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
              <Lock className="w-4 h-4 text-indigo-600" />
              <span>Password</span>
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-indigo-400" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 bg-white/50 hover:border-gray-300 outline-none"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          {!isLogin && (
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                <FileText className="w-4 h-4 text-indigo-600" />
                <span>Short Bio (Optional)</span>
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows="3"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 bg-white/50 hover:border-gray-300 outline-none resize-none"
                placeholder="Tell us a bit about yourself..."
              />
            </div>
          )}

          {isLogin && (
            <div className="flex items-center justify-between pt-2">
              <label className="flex items-center cursor-pointer group">
                <input 
                  type="checkbox" 
                  className="w-4 h-4 text-indigo-600 border-2 border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 focus:ring-offset-0 cursor-pointer transition-all duration-300" 
                />
                <span className="ml-2 text-sm text-gray-600 group-hover:text-gray-900 font-medium transition-colors">Remember me</span>
              </label>
              <a href="#" className="text-sm text-indigo-600 hover:text-indigo-700 font-semibold transition-colors">
                Forgot password?
              </a>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3.5 rounded-xl hover:from-indigo-700 hover:to-purple-700 font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] mt-6"
          >
            {isLogin ? 'Login' : 'Create Account'}
          </button>
        </form>

        {toast && <Toast message={toast.message} type={toast.type} onClose={hideToast} />}

        {/* Divider */}
        <div className="mt-8 pt-6 border-t-2 border-gray-200/50 text-center">
          <p className="text-sm text-gray-600 mb-2">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
          </p>
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-indigo-600 hover:text-purple-600 font-bold transition-colors duration-300 inline-flex items-center space-x-1 group"
          >
            <span>{isLogin ? 'Sign up' : 'Login'}</span>
            <Sparkles className="w-4 h-4 group-hover:scale-110 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}