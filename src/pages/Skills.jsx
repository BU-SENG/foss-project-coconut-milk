import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Search, Filter, Star, User } from 'lucide-react';
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <BookOpen className="h-8 w-8 text-indigo-600" />
            <h1 className="text-2xl font-bold text-gray-900">Skill Exchange Hub</h1>
          </div>
          <button className="text-gray-700 hover:text-indigo-600 font-medium" onClick={() => {Navigate('/dashboard')}}>
            Back to Dashboard
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
       
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Browse Skills</h2>
          <p className="text-gray-600">Discover and learn from our community</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search skills or instructors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
              />
            </div>

            {/* Category Filter */}
            <div className="md:w-64">
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none appearance-none bg-white"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat.toLowerCase()}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4">
          <p className="text-gray-600">
            Showing <span className="font-semibold">{filteredSkills.length}</span> skills
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map(skill => (
            <div
              key={skill.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <span className="text-xs font-medium px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full">
                  {skill.category}
                </span>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-semibold">{skill.rating}</span>
                    <span className="text-xs text-gray-500">({skill.reviews})</span>
                  </div>
                  {skill.isCustom && (
                    <button
                      onClick={() => handleDeleteSkill(skill)}
                      className="text-xs text-red-600 hover:text-red-700"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-2">{skill.title}</h3>
              <p className="text-sm text-gray-600 mb-4">{skill.description}</p>

              <div className="flex items-center space-x-2 mb-4">
                <div className="h-8 w-8 bg-indigo-100 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{skill.instructor}</p>
                  <p className="text-xs text-gray-500">{skill.enrolled} students</p>
                </div>
              </div>

              <button className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 font-medium transition-colors">
                View Details
              </button>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredSkills.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No skills found matching your criteria</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="mt-4 text-indigo-600 hover:text-indigo-700 font-medium"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
    {toast && <Toast message={toast.message} type={toast.type} onClose={hideToast} />}
    </>
  );
}