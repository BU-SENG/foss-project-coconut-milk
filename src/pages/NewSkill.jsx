import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, ArrowLeft, Save } from 'lucide-react';

export default function PostSkillPage() {
    const Navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    duration: '',
    format: '',
    schedule: '',
    prerequisites: '',
    learningOutcomes: ''
  });

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

  const handleSubmit = () => {
    console.log('Skill submitted:', formData);
    // Handle submission logic
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
        {/* Back Button */}
        <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 mb-6" onClick={() => {Navigate('/dashboard')}}>
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Dashboard</span>
        </button>

        {/* Page Title */}
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
                onClick={() => {
                    handleSubmit
                    Navigate('/dashboard')
                }}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium flex items-center space-x-2"
              >
                <Save className="w-5 h-5" />
                <span>Publish Skill</span>
              </button>
            </div>
          </div>
        </div>

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