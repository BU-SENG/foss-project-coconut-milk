import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, BookOpen, Star, ArrowRight } from 'lucide-react';

export default function LandingPage() {
  const Navigate = useNavigate()
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <BookOpen className="h-8 w-8 text-indigo-600" />
            <h1 className="text-2xl font-bold text-gray-900">Skill Exchange Hub</h1>
          </div>
          <div className="space-x-4">
            <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 font-medium" onClick={() => {Navigate('/register')}}>
              Register
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Learn Anything, Teach Everything
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Connect with peers to share knowledge and skills. A collaborative community where everyone is both a teacher and a learner.
          </p>
          <button className="bg-indigo-600 text-white px-8 py-4 rounded-lg hover:bg-indigo-700 font-medium text-lg inline-flex items-center space-x-2" onClick={() => {Navigate('/register')}}>
            <span>Get Started</span>
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
          How It Works
        </h3>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-md text-center">
            <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-indigo-600" />
            </div>
            <h4 className="text-xl font-semibold mb-3">Create Your Profile</h4>
            <p className="text-gray-600">
              Sign up and list the skills you can teach or want to learn
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-md text-center">
            <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="h-8 w-8 text-indigo-600" />
            </div>
            <h4 className="text-xl font-semibold mb-3">Browse & Enroll</h4>
            <p className="text-gray-600">
              Discover skills offered by others and enroll in sessions that interest you
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-md text-center">
            <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="h-8 w-8 text-indigo-600" />
            </div>
            <h4 className="text-xl font-semibold mb-3">Learn & Review</h4>
            <p className="text-gray-600">
              Attend sessions, connect with instructors, and share your feedback
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-indigo-600 py-16 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center text-white">
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-indigo-200">Active Users</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">150+</div>
              <div className="text-indigo-200">Skills Offered</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">1,200+</div>
              <div className="text-indigo-200">Sessions Completed</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-600">
          <p>&copy; 2025 Skill Exchange Hub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}