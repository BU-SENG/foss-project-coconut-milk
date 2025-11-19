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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/50">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 text-white shadow-xl backdrop-blur-sm border-b border-white/10 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-white/10 rounded-xl backdrop-blur-sm">
              <BookOpen className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold cursor-pointer hover:text-purple-100 transition-all duration-300" onClick={() => Navigate('/')}>
                Skill Exchange Hub
              </h1>
              <p className="text-sm text-white/90 font-medium">Curate. Teach. Learn.</p>
            </div>
          </div>
          <div className="space-x-3">
            <button
              className="bg-white/20 backdrop-blur-sm text-white px-6 py-2.5 rounded-xl hover:bg-white/30 font-semibold shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 border border-white/20"
              onClick={() => Navigate('/register')}
            >
              Register
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-indigo-600 font-bold uppercase tracking-wide mb-4 flex items-center space-x-2">
            <Sparkles className="w-4 h-4" />
            <span>A community-first learning hub</span>
          </p>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-indigo-900 to-purple-900 bg-clip-text text-transparent mb-6 leading-tight">
            Learn anything. Teach everything. Grow together.
          </h2>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Join a vibrant peer-to-peer learning marketplace where designers teach developers, musicians teach marketers,
            and everyone levels up together.
          </p>
          <div className="flex flex-wrap gap-4">
            <button
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl hover:from-indigo-700 hover:to-purple-700 font-semibold text-lg inline-flex items-center space-x-2 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95"
              onClick={() => Navigate('/register')}
            >
              <span>Start for Free</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          <div className="mt-12 grid grid-cols-3 gap-4 text-center">
            <div className="p-5 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-indigo-100/50 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <p className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">12k+</p>
              <p className="text-sm text-gray-600 font-medium mt-1">Peer connections</p>
            </div>
            <div className="p-5 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-indigo-100/50 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <p className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">380</p>
              <p className="text-sm text-gray-600 font-medium mt-1">Live weekly sessions</p>
            </div>
            <div className="p-5 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-indigo-100/50 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <p className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">48</p>
              <p className="text-sm text-gray-600 font-medium mt-1">Countries represented</p>
            </div>
          </div>
        </div>
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-indigo-200 to-purple-200 blur-3xl opacity-40" />
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-white/60 hover:shadow-3xl transition-all duration-300">
            <img
              src="https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=1200&q=80"
              alt="Learning together"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-md px-5 py-4 rounded-xl shadow-xl border border-white/50">
              <div className="flex items-center space-x-2 mb-1">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide">Live now</p>
              </div>
              <p className="font-bold text-gray-900">Storytelling for Product Designers</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h3 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-indigo-900 to-purple-900 bg-clip-text text-transparent mb-4">
            How It Works
          </h3>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Get started in three simple steps</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl border-2 border-indigo-100/50 text-center hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:border-indigo-200 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-400/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-indigo-400/20 transition-all duration-300" />
            <div className="relative">
              <div className="bg-gradient-to-br from-indigo-500 to-purple-500 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Users className="h-10 w-10 text-white" />
              </div>
              <h4 className="text-xl font-bold mb-3 text-gray-900">Create Your Profile</h4>
              <p className="text-gray-600 leading-relaxed">Share your expertise, learning goals, and availability.</p>
            </div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl border-2 border-indigo-100/50 text-center hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:border-indigo-200 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-400/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-purple-400/20 transition-all duration-300" />
            <div className="relative">
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <BookOpen className="h-10 w-10 text-white" />
              </div>
              <h4 className="text-xl font-bold mb-3 text-gray-900">Match & Enroll</h4>
              <p className="text-gray-600 leading-relaxed">Discover curated skills and barter sessions with peers.</p>
            </div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl border-2 border-indigo-100/50 text-center hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:border-indigo-200 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-pink-400/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-pink-400/20 transition-all duration-300" />
            <div className="relative">
              <div className="bg-gradient-to-br from-pink-500 to-rose-500 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Star className="h-10 w-10 text-white" />
              </div>
              <h4 className="text-xl font-bold mb-3 text-gray-900">Learn & Celebrate</h4>
              <p className="text-gray-600 leading-relaxed">Host live sessions, swap feedback, and collect reviews.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Community Stories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid lg:grid-cols-2 gap-12 items-center">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-200 to-purple-200 blur-3xl opacity-30 rounded-3xl" />
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-white/70 hover:shadow-3xl transition-all duration-300">
            <img
              src="https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=1200&q=80"
              alt="Community session"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div>
          <p className="text-indigo-600 font-bold uppercase tracking-wide mb-3 flex items-center space-x-2">
            <Sparkles className="w-4 h-4" />
            <span>Community stories</span>
          </p>
          <h3 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-indigo-900 to-purple-900 bg-clip-text text-transparent mb-4">
            Trade one skill for another
          </h3>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
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
      <section className="bg-gradient-to-br from-indigo-700 via-purple-700 to-indigo-800 py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-white relative">
          <div className="text-center mb-16">
            <p className="text-indigo-200 uppercase tracking-wider text-sm mb-4 font-semibold">Loved by creators</p>
            <h3 className="text-4xl md:text-5xl font-bold mb-4">Testimonials from the community</h3>
            <p className="text-indigo-200 text-lg">See what our members are saying</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((item, index) => (
              <div 
                key={item.name} 
                className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border-2 border-white/20 hover:bg-white/15 hover:border-white/30 transition-all duration-300 hover:scale-105 shadow-xl"
              >
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-lg leading-relaxed mb-6">"{item.quote}"</p>
                <div className="pt-6 border-t border-white/20">
                  <p className="font-bold text-lg">{item.name}</p>
                  <p className="text-indigo-200 text-sm mt-1">{item.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/30 via-purple-500/30 to-pink-500/30" />
        <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid md:grid-cols-4 gap-8 text-center text-white">
            <StatCard number="500+" label="Active Mentors" />
            <StatCard number="150+" label="Skills Offered" />
            <StatCard number="1,200+" label="Sessions Completed" />
            <StatCard number="97%" label="Learner Satisfaction" />
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-br from-white via-indigo-50/50 to-purple-50/50 rounded-3xl shadow-2xl p-10 md:p-16 text-center border-2 border-indigo-100/50 relative overflow-hidden hover:shadow-3xl transition-all duration-300">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="relative">
            <p className="text-indigo-600 font-bold uppercase tracking-wide mb-4 flex items-center justify-center space-x-2">
              <Sparkles className="w-4 h-4" />
              <span>Ready when you are</span>
            </p>
            <h3 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-indigo-900 to-purple-900 bg-clip-text text-transparent mb-4">
              Bring your skills. Leave inspired.
            </h3>
            <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              Publish a skill, enroll in a live cohort, or simply explore what others are teaching. Your next breakthrough
              is one session away.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-10 py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 inline-flex items-center space-x-2"
                onClick={() => Navigate('/register')}
              >
                <span>Join the Community</span>
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-50 to-indigo-50/30 py-12 mt-10 border-t-2 border-indigo-100/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <BookOpen className="h-6 w-6 text-indigo-600" />
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Skill Exchange Hub
            </span>
          </div>
          <p className="text-gray-600 font-medium">&copy; {new Date().getFullYear()} Skill Exchange Hub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function StoryCard({ icon, title, description }) {
  return (
    <div className="flex items-start space-x-4 bg-white/80 backdrop-blur-sm rounded-2xl p-5 shadow-lg border-2 border-indigo-100/50 max-w-sm hover:shadow-xl hover:scale-105 transition-all duration-300 hover:border-indigo-200 group">
      <div className="p-3 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-md">
        {icon}
      </div>
      <div className="flex-1">
        <p className="font-bold text-gray-900 mb-1">{title}</p>
        <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

function StatCard({ number, label }) {
  return (
    <div className="p-6 bg-white/10 backdrop-blur-md rounded-2xl border-2 border-white/20 hover:bg-white/15 hover:scale-105 transition-all duration-300">
      <div className="text-5xl font-bold mb-3 bg-gradient-to-r from-white to-indigo-100 bg-clip-text text-transparent">{number}</div>
      <div className="text-indigo-100 font-semibold text-sm uppercase tracking-wide">{label}</div>
    </div>
  );
}