<<<<<<< HEAD
import Layout from '../layout/Layout'
import FeaturedSection from '../sections/FeaturedSection'
import Sidebar from '../sections/Sidebar'
import Button from '../common/Button'
import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary/80 border-b-4 border-secondary/20">
        <div className="container mx-auto px-6 py-20">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold text-secondary mb-6">
              Learn Skills,<br />Share Knowledge
            </h1>
            <p className="text-xl text-secondary/80 mb-8">
              Join your school's learning community. Discover new skills, teach what you know, and grow together.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/signup">
                <Button variant="primary" size="lg" icon="🚀">
                  Get Started Free
                </Button>
              </Link>
              <Link to="/explore">
                <Button variant="secondary" size="lg" icon="🔍">
                  Explore Sessions
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-secondary text-primary py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-primary/80">Active Sessions</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-primary/80">School Hubs</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">5000+</div>
              <div className="text-primary/80">Students</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">200+</div>
              <div className="text-primary/80">Instructors</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <FeaturedSection />
          </div>
          <div>
            <Sidebar />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="bg-secondary/5 py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-secondary text-center mb-12">
            Why Skills Exchange Hub?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl mb-4">🎯</div>
              <h3 className="text-xl font-bold text-secondary mb-2">Learn Anything</h3>
              <p className="text-secondary/70">
                From photography to coding, discover skills taught by passionate peers and teachers.
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-5xl mb-4">👥</div>
              <h3 className="text-xl font-bold text-secondary mb-2">Build Community</h3>
              <p className="text-secondary/70">
                Connect with students and instructors in your school who share your interests.
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-5xl mb-4">🏆</div>
              <h3 className="text-xl font-bold text-secondary mb-2">Track Progress</h3>
              <p className="text-secondary/70">
                Earn badges, track your learning journey, and showcase your new skills.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default HomePage
=======
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
>>>>>>> 306b8b83545d0dcb0f79c1ed5d00a0aba630427d
