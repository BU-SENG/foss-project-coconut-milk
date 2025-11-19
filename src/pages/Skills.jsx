import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Search, Filter, Star, User, ChevronDown } from 'lucide-react';
import Toast from '../components/Toast';
import { useToast } from '../hooks/useToast';

const CUSTOM_SKILLS_KEY = 'skill-exchange-custom-skills';

const DEFAULT_SKILLS = [
  {
    id: 'default-1',
    title: 'React Development Fundamentals',
    instructor: 'Sarah Johnson',
    category: 'Technology',
    rating: 4.8,
    reviews: 12,
    enrolled: 25,
    description: 'Learn React from scratch with hands-on projects'
  },
  {
    id: 'default-2',
    title: 'Spanish Conversation Practice',
    instructor: 'Maria Garcia',
    category: 'Languages',
    rating: 5.0,
    reviews: 8,
    enrolled: 15,
    description: 'Improve your Spanish through real conversations'
  },
  {
    id: 'default-3',
    title: 'Digital Photography Basics',
    instructor: 'John Smith',
    category: 'Arts',
    rating: 4.5,
    reviews: 20,
    enrolled: 30,
    description: 'Master your camera and composition techniques'
  },
  {
    id: 'default-4',
    title: 'Guitar for Beginners',
    instructor: 'Mike Davis',
    category: 'Music',
    rating: 4.9,
    reviews: 15,
    enrolled: 22,
    description: 'Start your musical journey with basic chords and songs'
  },
  {
    id: 'default-5',
    title: 'Python Programming',
    instructor: 'Emily Chen',
    category: 'Technology',
    rating: 4.7,
    reviews: 18,
    enrolled: 28,
    description: 'Introduction to Python for complete beginners'
  },
  {
    id: 'default-6',
    title: 'Watercolor Painting',
    instructor: 'Lisa Brown',
    category: 'Arts',
    rating: 4.6,
    reviews: 10,
    enrolled: 18,
    description: 'Explore the beautiful world of watercolor art'
  }
];

const getCustomSkills = () => {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(CUSTOM_SKILLS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Unable to load custom skills', error);
    return [];
  }
};

const removeCustomSkill = (skillId) => {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(CUSTOM_SKILLS_KEY);
  const parsed = stored ? JSON.parse(stored) : [];
  const updated = parsed.filter((skill) => skill.id !== skillId);
  localStorage.setItem(CUSTOM_SKILLS_KEY, JSON.stringify(updated));
  window.dispatchEvent(new Event('skill-added'));
  return updated;
};

export default function BrowseSkills() {
  const Navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [customSkills, setCustomSkills] = useState(() => getCustomSkills());
  const { toast, showToast, hideToast } = useToast();

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const handleSkillUpdate = () => {
      setCustomSkills(getCustomSkills());
    };

    const handleStorage = (event) => {
      if (event.key === CUSTOM_SKILLS_KEY) {
        handleSkillUpdate();
      }
    };

    window.addEventListener('skill-added', handleSkillUpdate);
    window.addEventListener('storage', handleStorage);

    return () => {
      window.removeEventListener('skill-added', handleSkillUpdate);
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  const categories = ['All', 'Technology', 'Languages', 'Arts', 'Business', 'Music', 'Sports', 'Design', 'Health', 'Other'];

  const combinedSkills = useMemo(() => [...DEFAULT_SKILLS, ...customSkills], [customSkills]);

  const handleDeleteSkill = (skill) => {
    if (!skill.isCustom) {
      showToast({ message: 'Only custom skills can be removed from your browse list.', type: 'info' });
      return;
    }
    const confirmed = window.confirm(`Delete "${skill.title}" from your published skills?`);
    if (!confirmed) return;
    const updated = removeCustomSkill(skill.id);
    setCustomSkills(updated);
    showToast({ message: 'Skill removed successfully.', type: 'success' });
  };

  const filteredSkills = combinedSkills.filter(skill => {
    const matchesSearch = skill.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         skill.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || 
                           skill.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

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
          {/* <button 
            className="px-5 py-2.5 rounded-xl text-white hover:bg-white/10 font-semibold transition-all duration-300 hover:scale-105 active:scale-95 border border-white/20 hover:border-white/30" 
            onClick={() => {Navigate('/dashboard')}}
          >
            Back to Dashboard
          </button> */}
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Page Title */}
        <div className="mb-10">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-indigo-900 to-purple-900 bg-clip-text text-transparent mb-3">
            Browse Skills
          </h2>
          <p className="text-gray-600 text-lg font-medium">Discover and learn from our community</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-7 md:p-8 mb-8 border border-indigo-100/50 hover:shadow-2xl transition-all duration-300">
          <div className="flex flex-col md:flex-row gap-5">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-indigo-400" />
              <input
                type="text"
                placeholder="Search skills or instructors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-300 bg-white/50 hover:bg-white hover:border-indigo-300 font-medium"
              />
            </div>

            {/* Category Filter */}
            <div className="md:w-64">
              <div className="relative group">
                <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-indigo-400 z-10 pointer-events-none" />
                <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-indigo-400 z-10 pointer-events-none transition-transform duration-300 group-hover:text-indigo-600 group-focus-within:rotate-180" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full pl-12 pr-12 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none appearance-none bg-white/50 hover:bg-white hover:border-indigo-300 transition-all duration-300 font-medium cursor-pointer shadow-sm hover:shadow-md focus:shadow-lg"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat.toLowerCase()} className="py-2">
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-700 font-semibold text-lg">
            Showing <span className="text-indigo-600 font-bold">{filteredSkills.length}</span> {filteredSkills.length === 1 ? 'skill' : 'skills'}
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map(skill => (
            <div
              key={skill.id}
              className="group bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-indigo-100/50 hover:border-indigo-300 hover:scale-[1.02] active:scale-100"
            >
              <div className="flex items-start justify-between mb-5">
                <span className="text-xs font-bold px-4 py-1.5 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 rounded-full border border-indigo-200/50">
                  {skill.category}
                </span>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1.5 bg-yellow-50 px-2.5 py-1 rounded-full border border-yellow-200/50">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-bold text-gray-900">{skill.rating}</span>
                    <span className="text-xs text-gray-500">({skill.reviews})</span>
                  </div>
                  {skill.isCustom && (
                    <button
                      onClick={() => handleDeleteSkill(skill)}
                      className="text-xs text-red-600 hover:text-red-700 font-semibold hover:bg-red-50 px-2 py-1 rounded-lg transition-colors"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-700 transition-colors leading-tight">
                {skill.title}
              </h3>
              <p className="text-sm text-gray-600 mb-5 leading-relaxed line-clamp-2">{skill.description}</p>

              <div className="flex items-center space-x-3 mb-5 p-3 bg-gradient-to-r from-indigo-50/50 to-purple-50/50 rounded-xl border border-indigo-100/50">
                <div className="h-10 w-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center shadow-md">
                  <User className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">{skill.instructor}</p>
                  <p className="text-xs text-gray-600 font-medium">{skill.enrolled} students enrolled</p>
                </div>
              </div>

              <button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl hover:from-indigo-700 hover:to-purple-700 font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95">
                View Details
              </button>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredSkills.length === 0 && (
          <div className="text-center py-16 bg-white/60 backdrop-blur-sm rounded-3xl shadow-xl border border-indigo-100/50">
            <div className="max-w-md mx-auto">
              <div className="mb-6 inline-flex p-4 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full">
                <Search className="h-8 w-8 text-indigo-600" />
              </div>
              <p className="text-gray-700 text-xl font-semibold mb-2">No skills found</p>
              <p className="text-gray-500 mb-6">Try adjusting your search or filter criteria</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
              >
                Clear filters
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
    {toast && <Toast message={toast.message} type={toast.type} onClose={hideToast} />}
    </>
  );
}