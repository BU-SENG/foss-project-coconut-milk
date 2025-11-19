import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, BookOpen, Star, ArrowRight, Sparkles, HeartHandshake, Camera, Mountain } from 'lucide-react';

const mentors = [
  {
    name: 'Sarah Johnson',
    role: 'React Engineer',
    specialty: 'Front-end development',
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=640&q=80'
  },
  {
    name: 'Maria Garcia',
    role: 'Language Coach',
    specialty: 'Spanish & Portuguese',
    image: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=640&q=80'
  },
  {
    name: 'Aiden Clarke',
    role: 'Creative Director',
    specialty: 'Photography & Storytelling',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=640&q=80'
  }
];

const testimonials = [
  {
    quote:
      'I picked up conversational Spanish in less than 8 weeks thanks to the Skill Exchange community. The accountability is unmatched.',
    name: 'Jamal Thompson',
    role: 'Product Designer'
  },
  {
    quote: 'Teaching watercolor classes here reminded me why I love art. The built-in learners keep me inspired.',
    name: 'Lisa Brown',
    role: 'Freelance Illustrator'
  },
  {
    quote:
      'I swapped guitar lessons for advanced Python coaching. Bartering knowledge saved me thousands of dollars this year.',
    name: 'Emily Chen',
    role: 'Data Scientist'
  }
];

export default function LandingPage() {
  const Navigate = useNavigate();
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-indigo-50 to-purple-100">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur border-b border-indigo-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <BookOpen className="h-8 w-8 text-indigo-600" />
            <h1 className="text-2xl font-bold text-gray-900">Skill Exchange Hub</h1>
          </div>
          <div className="space-x-3">
            <button
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 font-medium shadow-md"
              onClick={() => Navigate('/register')}
            >
              Register
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-indigo-600 font-semibold uppercase tracking-wide mb-4">A community-first learning hub</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Learn anything. Teach everything. Grow together.
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join a vibrant peer-to-peer learning marketplace where designers teach developers, musicians teach marketers,
            and everyone levels up together.
          </p>
          <div className="flex flex-wrap gap-4">
            <button
              className="bg-indigo-600 text-white px-8 py-4 rounded-xl hover:bg-indigo-700 font-semibold text-lg inline-flex items-center space-x-2 shadow-lg shadow-indigo-300/60"
              onClick={() => Navigate('/register')}
            >
              <span>Start for Free</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
          <div className="mt-10 grid grid-cols-3 gap-6 text-center">
            <div className="p-4 bg-white/70 rounded-2xl shadow">
              <p className="text-3xl font-bold text-indigo-700">12k+</p>
              <p className="text-sm text-gray-500">Peer connections</p>
            </div>
            <div className="p-4 bg-white/70 rounded-2xl shadow">
              <p className="text-3xl font-bold text-indigo-700">380</p>
              <p className="text-sm text-gray-500">Live weekly sessions</p>
            </div>
            <div className="p-4 bg-white/70 rounded-2xl shadow">
              <p className="text-3xl font-bold text-indigo-700">48</p>
              <p className="text-sm text-gray-500">Countries represented</p>
            </div>
          </div>
        </div>
        <div className="relative">
          <div className="absolute inset-0 bg-linear-to-tr from-indigo-200 to-purple-200 blur-3xl opacity-40" />
          <div className="relative rounded-4xl overflow-hidden shadow-2xl border border-white/60">
            <img
              src="https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=1200&q=80"
              alt="Learning together"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur px-4 py-3 rounded-xl shadow">
              <p className="text-sm text-gray-500">Live now</p>
              <p className="font-semibold text-gray-900">Storytelling for Product Designers</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">How It Works</h3>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-indigo-100 text-center">
            <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-indigo-600" />
            </div>
            <h4 className="text-xl font-semibold mb-3">Create Your Profile</h4>
            <p className="text-gray-600">Share your expertise, learning goals, and availability.</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-indigo-100 text-center">
            <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="h-8 w-8 text-indigo-600" />
            </div>
            <h4 className="text-xl font-semibold mb-3">Match & Enroll</h4>
            <p className="text-gray-600">Discover curated skills and barter sessions with peers.</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-indigo-100 text-center">
            <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="h-8 w-8 text-indigo-600" />
            </div>
            <h4 className="text-xl font-semibold mb-3">Learn & Celebrate</h4>
            <p className="text-gray-600">Host live sessions, swap feedback, and collect reviews.</p>
          </div>
        </div>
      </section>

      {/* Community Stories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid lg:grid-cols-2 gap-12 items-center">
        <div className="rounded-4xl overflow-hidden shadow-2xl border border-white/70">
          <img
            src="https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=1200&q=80"
            alt="Community session"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <p className="text-indigo-600 font-semibold uppercase tracking-wide mb-3">Community stories</p>
          <h3 className="text-3xl font-bold text-gray-900 mb-4">Trade one skill for another</h3>
          <p className="text-gray-600 mb-6">
            Swapping value is more fun than swiping credit cards. Exchange marketing expertise for violin lessons, or
            swap UI critiques for cooking classes. Every session is a chance to grow your craft and your circle.
          </p>
          <div className="flex flex-wrap gap-4">
            <StoryCard
              icon={<HeartHandshake className="h-5 w-5 text-rose-500" />}
              title="Barter-based sessions"
              description="Trade time or credits for any skill in our marketplace."
            />
            <StoryCard
              icon={<Camera className="h-5 w-5 text-purple-500" />}
              title="Creative showcases"
              description="Weekly gallery nights celebrate community projects."
            />
            <StoryCard
              icon={<Mountain className="h-5 w-5 text-indigo-500" />}
              title="Retreat experiences"
              description="Meet offline during seasonal learning retreats."
            />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-indigo-700 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <p className="text-indigo-200 uppercase tracking-wider text-sm mb-4 text-center">Loved by creators</p>
          <h3 className="text-3xl font-bold text-center mb-12">Testimonials from the community</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((item) => (
              <div key={item.name} className="bg-white/10 rounded-3xl p-6 backdrop-blur border border-white/20">
                <p className="text-lg leading-relaxed">“{item.quote}”</p>
                <div className="mt-6">
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-indigo-200 text-sm">{item.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-linear-to-r from-indigo-600 to-purple-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center text-white">
            <StatCard number="500+" label="Active Mentors" />
            <StatCard number="150+" label="Skills Offered" />
            <StatCard number="1,200+" label="Sessions Completed" />
            <StatCard number="97%" label="Learner Satisfaction" />
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-3xl shadow-2xl p-10 md:p-14 text-center border border-indigo-50">
          <p className="text-indigo-600 font-semibold uppercase tracking-wide mb-4">Ready when you are</p>
          <h3 className="text-3xl font-bold text-gray-900 mb-4">Bring your skills. Leave inspired.</h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Publish a skill, enroll in a live cohort, or simply explore what others are teaching. Your next breakthrough
            is one session away.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              className="text-white border border-indigo-200 px-8 py-3 rounded-xl font-semibold bg-indigo-600 hover:bg-indigo-700"
              onClick={() => Navigate('/register')}
            >
              Join the Community
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-10 mt-10 border-t border-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} Skill Exchange Hub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function StoryCard({ icon, title, description }) {
  return (
    <div className="flex items-start space-x-3 bg-white rounded-2xl p-4 shadow border border-indigo-50 max-w-sm">
      <div className="p-3 bg-indigo-50 rounded-full">{icon}</div>
      <div>
        <p className="font-semibold text-gray-900">{title}</p>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
}

function StatCard({ number, label }) {
  return (
    <div>
      <div className="text-4xl font-bold mb-2">{number}</div>
      <div className="text-indigo-200">{label}</div>
    </div>
  );
}