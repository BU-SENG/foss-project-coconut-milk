import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, ArrowLeft, Save } from 'lucide-react';
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <BookOpen className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">Skill Exchange Hub</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-gray-700 hover:text-blue-600 font-medium" onClick={() => {Navigate('/dashboard')}}>Dashboard</button>
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
              JD
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 mb-6" onClick={() => {Navigate('/dashboard')}}>
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Dashboard</span>
        </button>

        
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Post a New Skill</h2>
          <p className="text-gray-600">Share your expertise with the community</p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl shadow-sm p-8 space-y-6">
          {/* Skill Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Skill Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., React Fundamentals"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="5"
              placeholder="Provide a detailed description of what students will learn..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
            <p className="text-sm text-gray-500 mt-1">Minimum 100 characters</p>
          </div>

          {/* Duration */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Duration <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              placeholder="e.g., 4 weeks, 10 hours, 6 sessions"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Format */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Session Format <span className="text-red-500">*</span>
            </label>
            <select
              name="format"
              value={formData.format}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select format</option>
              {formats.map((format) => (
                <option key={format} value={format}>
                  {format}
                </option>
              ))}
            </select>
          </div>

          {/* Schedule */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Schedule <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="schedule"
              value={formData.schedule}
              onChange={handleChange}
              placeholder="e.g., Tuesdays & Thursdays, 6:00 PM - 8:00 PM"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Prerequisites */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Prerequisites (Optional)
            </label>
            <textarea
              name="prerequisites"
              value={formData.prerequisites}
              onChange={handleChange}
              rows="3"
              placeholder="List any requirements or prior knowledge needed (one per line)"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>

          {/* Learning Outcomes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Learning Outcomes (Optional)
            </label>
            <textarea
              name="learningOutcomes"
              value={formData.learningOutcomes}
              onChange={handleChange}
              rows="4"
              placeholder="What will students be able to do after completing this skill? (one per line)"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-6 border-t border-gray-200">
            <button className="text-gray-700 hover:text-red-600 font-medium" onClick={() => {Navigate('/dashboard')}}>
              Cancel
            </button>
            <div className="flex items-center space-x-3">
              <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium">
                Save as Draft
              </button>
              <button
                onClick={handleSubmit}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium flex items-center space-x-2"
              >
                <Save className="w-5 h-5" />
                <span>Publish Skill</span>
              </button>
            </div>
          </div>
        </div>

        {toast && <Toast message={toast.message} type={toast.type} onClose={hideToast} />}

        {/* Tips Section */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="font-semibold text-blue-900 mb-3">Tips for a Great Skill Post</h3>
          <ul className="space-y-2 text-sm text-blue-800">
            <li className="flex items-start space-x-2">
              <span>•</span>
              <span>Write a clear and descriptive title that accurately represents your skill</span>
            </li>
            <li className="flex items-start space-x-2">
              <span>•</span>
              <span>Provide detailed learning outcomes so students know what to expect</span>
            </li>
            <li className="flex items-start space-x-2">
              <span>•</span>
              <span>Be realistic about prerequisites to ensure students are prepared</span>
            </li>
            <li className="flex items-start space-x-2">
              <span>•</span>
              <span>Include specific schedule details to help students plan accordingly</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}