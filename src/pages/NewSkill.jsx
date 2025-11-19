import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, ArrowLeft, Save, ChevronDown, User, Type, Tag, FileText, Clock, Video, Calendar, List, Target, Lightbulb } from 'lucide-react';
import Toast from '../components/Toast';
import { useToast } from '../hooks/useToast';

export default function PostSkillPage() {
    const Navigate = useNavigate()
  const CUSTOM_SKILLS_KEY = 'skill-exchange-custom-skills';
  const initialFormState = {
    title: '',
    category: '',
    description: '',
    duration: '',
    format: '',
    schedule: '',
    prerequisites: '',
    learningOutcomes: ''
  };
  const [formData, setFormData] = useState(initialFormState);
  const { toast, showToast, hideToast } = useToast();

  const categories = [
    'Technology',
    'Design',
    'Business',
    'Languages',
    'Arts',
    'Health',
    'Other'
  ];

  const formats = [
    'Online via Video Call',
    'In-Person',
    'Hybrid (Online & In-Person)',
    'Self-Paced'
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const parseMultilineField = (value) => {
    return value
      .split('\n')
      .map((item) => item.trim())
      .filter(Boolean);
  };

  const saveSkillToStorage = (skill) => {
    if (typeof window === 'undefined') return;
    const existing = localStorage.getItem(CUSTOM_SKILLS_KEY);
    const parsed = existing ? JSON.parse(existing) : [];
    parsed.push(skill);
    localStorage.setItem(CUSTOM_SKILLS_KEY, JSON.stringify(parsed));
    window.dispatchEvent(new Event('skill-added'));
  };

  const handleSubmit = () => {
    const requiredFields = ['title', 'category', 'description', 'duration', 'format', 'schedule'];
    const missingFields = requiredFields.filter((field) => !formData[field]?.trim());

    if (missingFields.length) {
      showToast({ message: 'Please complete all required fields before publishing.', type: 'error' });
      return;
    }

    const newSkill = {
      id: crypto.randomUUID(),
      title: formData.title.trim(),
      category: formData.category,
      description: formData.description.trim(),
      duration: formData.duration.trim(),
      format: formData.format,
      schedule: formData.schedule.trim(),
      prerequisites: parseMultilineField(formData.prerequisites),
      learningOutcomes: parseMultilineField(formData.learningOutcomes),
      instructor: 'You',
      rating: 5.0,
      reviews: 0,
      enrolled: 0,
      createdAt: new Date().toISOString(),
      isCustom: true
    };

    saveSkillToStorage(newSkill);
    setFormData(initialFormState);
    showToast({ message: 'Skill published! Redirecting you to Browse Skills...', type: 'success' });
    setTimeout(() => {
      Navigate('/skills');
    }, 900);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/50">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 text-white shadow-xl backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-white/10 rounded-xl backdrop-blur-sm">
              <BookOpen className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold cursor-pointer hover:text-purple-100 transition-all duration-300" onClick={() => Navigate('/dashboard')}>
                Skill Exchange Hub
              </h1>
              <p className="text-sm text-white/90 font-medium">Curate. Teach. Learn.</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            {/* <button 
              className="px-4 py-2 rounded-xl text-white hover:bg-white/10 transition-all duration-300 font-medium" 
              onClick={() => Navigate('/dashboard')}
            >
              Dashboard
            </button> */}
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white font-semibold backdrop-blur-sm border border-white/20">
              JD
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Back Button
        <button 
          className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600 mb-8 transition-all duration-300 group font-medium" 
          onClick={() => Navigate('/dashboard')}
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
          <span>Back to Dashboard</span>
        </button> */}

        {/* Page Title */}
        <div className="mb-10">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-indigo-900 to-purple-900 bg-clip-text text-transparent mb-3">
            Post a New Skill
          </h2>
          <p className="text-gray-600 font-semibold text-lg">Share your expertise with the community</p>
        </div>

        {/* Form */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-10 space-y-8 border border-indigo-100/50 hover:shadow-3xl transition-all duration-300">
          {/* Skill Title */}
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
              <Type className="w-4 h-4 text-indigo-600" />
              <span>Skill Title <span className="text-red-500">*</span></span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., React Fundamentals"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 bg-white/50 hover:border-gray-300"
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
              <Tag className="w-4 h-4 text-indigo-600" />
              <span>Category <span className="text-red-500">*</span></span>
            </label>
            <div className="relative">
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 bg-white/50 hover:border-gray-300 appearance-none cursor-pointer"
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
              <FileText className="w-4 h-4 text-indigo-600" />
              <span>Description <span className="text-red-500">*</span></span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="5"
              placeholder="Provide a detailed description of what students will learn..."
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 bg-white/50 hover:border-gray-300 resize-none"
            />
            <p className="text-sm text-gray-500 flex items-center space-x-1">
              <span>Minimum 100 characters</span>
              {formData.description.length > 0 && (
                <span className={formData.description.length >= 100 ? 'text-green-600' : 'text-orange-600'}>
                  ({formData.description.length}/100)
                </span>
              )}
            </p>
          </div>

          {/* Duration */}
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
              <Clock className="w-4 h-4 text-indigo-600" />
              <span>Duration <span className="text-red-500">*</span></span>
            </label>
            <input
              type="text"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              placeholder="e.g., 4 weeks, 10 hours, 6 sessions"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 bg-white/50 hover:border-gray-300"
            />
          </div>

          {/* Format */}
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
              <Video className="w-4 h-4 text-indigo-600" />
              <span>Session Format <span className="text-red-500">*</span></span>
            </label>
            <div className="relative">
              <select
                name="format"
                value={formData.format}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 bg-white/50 hover:border-gray-300 appearance-none cursor-pointer"
              >
                <option value="">Select format</option>
                {formats.map((format) => (
                  <option key={format} value={format}>
                    {format}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Schedule */}
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
              <Calendar className="w-4 h-4 text-indigo-600" />
              <span>Schedule <span className="text-red-500">*</span></span>
            </label>
            <input
              type="text"
              name="schedule"
              value={formData.schedule}
              onChange={handleChange}
              placeholder="e.g., Tuesdays & Thursdays, 6:00 PM - 8:00 PM"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 bg-white/50 hover:border-gray-300"
            />
          </div>

          {/* Prerequisites */}
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
              <List className="w-4 h-4 text-indigo-600" />
              <span>Prerequisites (Optional)</span>
            </label>
            <textarea
              name="prerequisites"
              value={formData.prerequisites}
              onChange={handleChange}
              rows="3"
              placeholder="List any requirements or prior knowledge needed (one per line)"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 bg-white/50 hover:border-gray-300 resize-none"
            />
          </div>

          {/* Learning Outcomes */}
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
              <Target className="w-4 h-4 text-indigo-600" />
              <span>Learning Outcomes (Optional)</span>
            </label>
            <textarea
              name="learningOutcomes"
              value={formData.learningOutcomes}
              onChange={handleChange}
              rows="4"
              placeholder="What will students be able to do after completing this skill? (one per line)"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 bg-white/50 hover:border-gray-300 resize-none"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between pt-8 border-t-2 border-gray-200/50 gap-4">
            <button 
              className="text-gray-700 hover:text-red-600 font-semibold transition-all duration-300 px-4 py-2 rounded-lg hover:bg-red-50" 
              onClick={() => Navigate('/dashboard')}
            >
              Cancel
            </button>
            <div className="flex items-center space-x-3 w-full sm:w-auto">
              <button className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 font-semibold transition-all duration-300 hover:border-gray-400 hover:shadow-md">
                Save as Draft
              </button>
              <button
                onClick={handleSubmit}
                className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 font-semibold flex items-center space-x-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <Save className="w-5 h-5" />
                <span>Publish Skill</span>
              </button>
            </div>
          </div>
        </div>

        {toast && <Toast message={toast.message} type={toast.type} onClose={hideToast} />}

        {/* Tips Section */}
        <div className="mt-8 bg-gradient-to-br from-indigo-50 via-purple-50/50 to-pink-50/50 border-2 border-indigo-200/50 rounded-2xl p-8 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-400/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
          <div className="relative">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl">
                <Lightbulb className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-indigo-900 to-purple-900 bg-clip-text text-transparent">
                Tips for a Great Skill Post
              </h3>
            </div>
            <ul className="space-y-3 text-sm text-gray-700">
              <li className="flex items-start space-x-3 p-3 bg-white/60 rounded-lg backdrop-blur-sm hover:bg-white/80 transition-all duration-300">
                <span className="text-indigo-600 font-bold mt-0.5">•</span>
                <span className="font-medium">Write a clear and descriptive title that accurately represents your skill</span>
              </li>
              <li className="flex items-start space-x-3 p-3 bg-white/60 rounded-lg backdrop-blur-sm hover:bg-white/80 transition-all duration-300">
                <span className="text-indigo-600 font-bold mt-0.5">•</span>
                <span className="font-medium">Provide detailed learning outcomes so students know what to expect</span>
              </li>
              <li className="flex items-start space-x-3 p-3 bg-white/60 rounded-lg backdrop-blur-sm hover:bg-white/80 transition-all duration-300">
                <span className="text-indigo-600 font-bold mt-0.5">•</span>
                <span className="font-medium">Be realistic about prerequisites to ensure students are prepared</span>
              </li>
              <li className="flex items-start space-x-3 p-3 bg-white/60 rounded-lg backdrop-blur-sm hover:bg-white/80 transition-all duration-300">
                <span className="text-indigo-600 font-bold mt-0.5">•</span>
                <span className="font-medium">Include specific schedule details to help students plan accordingly</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}