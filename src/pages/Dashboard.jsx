import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Plus, Calendar, Bell, User, LogOut, Sparkles, Zap, Palette } from 'lucide-react';
import { getCurrentUserId } from '../utils/userStorage';

const inspirationImages = [
  'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80'
];

export default function Dashboard() {
  const Navigate = useNavigate();
  const teachingSkills = [
    { id: 1, title: 'React Development', enrolled: 5, nextSession: '2025-11-20' },
    { id: 2, title: 'Guitar Basics', enrolled: 3, nextSession: '2025-11-22' }
  ];

  const learningSkills = [
    { id: 3, title: 'Spanish Conversation', instructor: 'Maria Garcia', nextSession: '2025-11-21' },
    { id: 4, title: 'Digital Photography', instructor: 'John Smith', nextSession: '2025-11-23' }
  ];

  const upcomingSessions = [
    { id: 1, title: 'React Development', type: 'Teaching', time: 'Tomorrow, 2:00 PM' },
    { id: 2, title: 'Spanish Conversation', type: 'Learning', time: 'Tomorrow, 4:00 PM' },
    { id: 3, title: 'Guitar Basics', type: 'Teaching', time: 'Nov 22, 10:00 AM' }
  ];

  const recentActivity = [
    { id: 1, text: 'Sarah Johnson enrolled in React Development', time: '2 hours ago' },
    { id: 2, text: 'You completed Spanish Conversation session', time: '5 hours ago' },
    { id: 3, text: 'New review on Guitar Basics (5 stars)', time: '1 day ago' }
  ];

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
              <h1 
                className="text-2xl font-bold cursor-pointer hover:text-purple-100 transition-all duration-300"
                onClick={() => {
                  const userId = getCurrentUserId();
                  if (userId) {
                    Navigate('/dashboard');
                  } else {
                    Navigate('/');
                  }
                }}
              >
                Skill Exchange Hub
              </h1>
              <p className="text-sm text-white/90 font-medium">Curate. Teach. Learn.</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button className="p-2.5 rounded-xl text-white hover:bg-white/10 transition-all duration-300 hover:scale-110 active:scale-95">
              <Bell className="h-6 w-6" />
            </button>
            <button className="p-2.5 rounded-xl text-white hover:bg-white/10 transition-all duration-300 hover:scale-110 active:scale-95" onClick={() => Navigate('/profile')}>
              <User className="h-6 w-6" />
            </button>
            <button className="p-2.5 rounded-xl text-white hover:bg-red-500/20 transition-all duration-300 hover:scale-110 active:scale-95" onClick={() => Navigate('/')}>
              <LogOut className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
          <div className="bg-gradient-to-br from-white via-indigo-50/50 to-purple-50/50 rounded-3xl p-8 md:p-10 shadow-2xl border border-indigo-100/50 relative overflow-hidden backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="relative">
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-indigo-900 to-purple-900 bg-clip-text text-transparent">
                Welcome back
              </h2>
              <p className="text-gray-600 mt-2 text-lg">Here&apos;s what&apos;s happening with your skills today.</p>
              <div className="grid md:grid-cols-3 gap-5 mt-8">
                <HighlightCard icon={<Sparkles className="h-6 w-6 text-indigo-600" />} label="Teaching sessions" value="08" />
                <HighlightCard icon={<Zap className="h-6 w-6 text-yellow-500" />} label="Learning sessions" value="05" />
                <HighlightCard icon={<Palette className="h-6 w-6 text-pink-500" />} label="New enrollments" value="+12" />
              </div>
            </div>
          </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-4">
          <button
            className="group bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-7 py-3.5 rounded-xl hover:shadow-2xl hover:shadow-purple-500/50 font-semibold inline-flex items-center space-x-2 shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 hover:from-purple-700 hover:to-indigo-700"
            onClick={() => {
              Navigate('/new');
            }}
          >
            <Plus className="h-5 w-5 group-hover:rotate-90 transition-transform duration-300" />
            <span>Post New Skill</span>
          </button>
          <button
            className="group bg-white/80 backdrop-blur-sm text-indigo-700 px-7 py-3.5 rounded-xl hover:bg-white font-semibold border-2 border-indigo-200/50 hover:border-indigo-300 inline-flex items-center space-x-2 shadow-md transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-lg"
            onClick={() => {
              Navigate('/skills');
            }}
          >
            <Calendar className="h-5 w-5 group-hover:text-indigo-600 transition-colors" />
            <span>Available Skills</span>
          </button>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Skills */}
          <div className="lg:col-span-2 space-y-8">
            {/* Teaching Skills */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-7 border border-indigo-100/50 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Skills You&apos;re Teaching</h3>
              </div>
              <div className="space-y-4">
                {teachingSkills.map((skill) => (
                  <div
                    key={skill.id}
                    className="group border-2 border-gray-100 rounded-2xl p-5 hover:border-indigo-300 hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-white to-indigo-50/30 hover:from-indigo-50/50 hover:to-purple-50/30 cursor-pointer hover:scale-[1.02] active:scale-100"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900 mb-2 text-lg group-hover:text-indigo-700 transition-colors">{skill.title}</h4>
                        <p className="text-sm text-gray-600 font-medium">{skill.enrolled} students enrolled</p>
                      </div>
                      <div className="ml-4 px-4 py-2 bg-indigo-100/50 rounded-xl group-hover:bg-indigo-200/50 transition-colors">
                        <span className="text-sm text-indigo-700 font-semibold">
                          {new Date(skill.nextSession).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Learning Skills */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-7 border border-indigo-100/50 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl">
                  <Zap className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Skills You&apos;re Learning</h3>
              </div>
              <div className="space-y-4">
                {learningSkills.map((skill) => (
                  <div
                    key={skill.id}
                    className="group border-2 border-gray-100 rounded-2xl p-5 hover:border-purple-300 hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-white to-purple-50/30 hover:from-purple-50/50 hover:to-pink-50/30 cursor-pointer hover:scale-[1.02] active:scale-100"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900 mb-2 text-lg group-hover:text-purple-700 transition-colors">{skill.title}</h4>
                        <p className="text-sm text-gray-600 font-medium">Instructor: {skill.instructor}</p>
                      </div>
                      <div className="ml-4 px-4 py-2 bg-purple-100/50 rounded-xl group-hover:bg-purple-200/50 transition-colors">
                        <span className="text-sm text-purple-700 font-semibold">
                          {new Date(skill.nextSession).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Upcoming & Activity */}
          <div className="space-y-8">
            {/* Upcoming Sessions */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-7 border border-indigo-100/50 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl">
                  <Calendar className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Upcoming Sessions</h3>
              </div>
              <div className="space-y-3">
                {upcomingSessions.map((session) => (
                  <div 
                    key={session.id} 
                    className="group border-l-4 border-indigo-500 pl-5 py-4 bg-gradient-to-r from-indigo-50/50 to-transparent rounded-xl hover:from-indigo-100/70 hover:shadow-md transition-all duration-300 cursor-pointer hover:scale-[1.02]"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900 text-sm mb-1 group-hover:text-indigo-700 transition-colors">{session.title}</h4>
                        <span className="inline-block px-2.5 py-1 text-xs font-semibold rounded-full bg-indigo-100 text-indigo-700 mb-2">
                          {session.type}
                        </span>
                        <p className="text-xs text-indigo-600 font-medium mt-2">{session.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-7 border border-indigo-100/50 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl">
                  <Bell className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Recent Activity</h3>
              </div>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div 
                    key={activity.id} 
                    className="pb-4 border-b border-gray-100 last:border-0 group hover:bg-gray-50/50 rounded-lg p-3 -m-3 transition-all duration-300"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="mt-1 w-2 h-2 rounded-full bg-indigo-500 group-hover:bg-indigo-600 transition-colors flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-sm text-gray-900 font-medium leading-relaxed">{activity.text}</p>
                        <p className="text-xs text-gray-500 mt-2 font-medium">{activity.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Inspiration Gallery */}
        <section className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-indigo-100/50 p-8 md:p-10 hover:shadow-3xl transition-all duration-300">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10">
            <div>
              <p className="text-sm uppercase tracking-wider text-indigo-600 font-bold mb-2">Spotlight</p>
              <h3 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-indigo-900 bg-clip-text text-transparent">
                Session Inspiration
              </h3>
              <p className="text-gray-600 mt-2 text-lg">Fresh energy for your next live class.</p>
            </div>
            <button
              className="mt-4 md:mt-0 px-6 py-3 rounded-full border-2 border-indigo-300 text-indigo-700 font-semibold hover:bg-indigo-50 hover:border-indigo-400 hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
              onClick={() => Navigate('/skills')}
            >
              Explore More Ideas
            </button>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {inspirationImages.map((src, index) => (
              <div 
                key={src} 
                className="relative rounded-3xl overflow-hidden shadow-xl group cursor-pointer hover:shadow-2xl transition-all duration-500 hover:scale-[1.03]"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
                <img
                  src={src}
                  alt="Inspiration"
                  className="h-56 w-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 z-20 flex items-end p-6">
                  <div className="transform group-hover:translate-y-0 translate-y-2 transition-transform duration-300">
                    <p className="text-white font-bold text-lg mb-1">Creative lab #{index + 1}</p>
                    <p className="text-white/80 text-sm">Get inspired</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function HighlightCard({ icon, label, value }) {
  return (
    <div className="group bg-white/90 backdrop-blur-sm rounded-2xl px-6 py-5 shadow-lg border border-indigo-100/50 flex items-center space-x-4 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer">
      <div className="p-3.5 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl group-hover:from-indigo-100 group-hover:to-purple-100 transition-all duration-300 shadow-sm">
        {icon}
      </div>
      <div>
        <p className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-indigo-900 bg-clip-text text-transparent">{value}</p>
        <p className="text-gray-600 text-sm font-semibold mt-1">{label}</p>
      </div>
    </div>
  );
}