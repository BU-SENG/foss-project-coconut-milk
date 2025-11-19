import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Plus, Calendar, Bell, User, LogOut, Sparkles, Zap, Palette } from 'lucide-react';

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
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-indigo-50 to-purple-50">
     
      <header className="bg-purple-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <BookOpen className="h-9 w-9 text-white" />
            <div>
              <h1 className="text-2xl font-bold">Skill Exchange Hub</h1>
              <p className="text-sm text-white/80">Curate. Teach. Learn.</p>
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <button className="text-white hover:text-yellow-200 transition-colors">
              <Bell className="h-6 w-6" />
            </button>
            <button className="text-white hover:text-yellow-200 transition-colors" onClick={() => Navigate('/profile')}>
              <User className="h-6 w-6" />
            </button>
            <button className="text-white hover:text-red-200 transition-colors" onClick={() => Navigate('/')}>
              <LogOut className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-indigo-50 relative overflow-hidden">
            <div className="absolute inset-0 bg-rose-50 opacity-80" />
            <div className="relative">
              <h2 className="text-3xl font-bold text-gray-900 mt-2">Welcome back</h2>
              <p className="text-gray-600 mt-1">Here&apos;s what&apos;s happening with your skills today.</p>
              <div className="grid md:grid-cols-3 gap-4 mt-6">
                <HighlightCard icon={<Sparkles className="text-indigo-600" />} label="Teaching sessions" value="08" />
                <HighlightCard icon={<Zap className="text-yellow-500" />} label="Learning sessions" value="05" />
                <HighlightCard icon={<Palette className="text-pink-500" />} label="New enrollments" value="+12" />
              </div>
            </div>
          </div>

       
        <div className="flex flex-wrap gap-4">
          <button
            className="bg-purple-600 text-white px-6 py-3 rounded-xl hover:opacity-90 font-medium inline-flex items-center space-x-2 shadow-lg"
            onClick={() => {
              Navigate('/new');
            }}
          >
            <Plus className="h-5 w-5" />
            <span>Post New Skill</span>
          </button>
          <button
            className="bg-white text-indigo-700 px-6 py-3 rounded-xl hover:bg-indigo-50 font-medium border border-indigo-200 inline-flex items-center space-x-2 shadow-sm"
            onClick={() => {
              Navigate('/skills');
            }}
          >
            <Calendar className="h-5 w-5" />
            <span>Available Skills</span>
          </button>
        </div>

        
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Skills */}
          <div className="lg:col-span-2 space-y-8">
            {/* Teaching Skills */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-indigo-50">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Skills You&apos;re Teaching</h3>
              <div className="space-y-4">
                {teachingSkills.map((skill) => (
                  <div
                    key={skill.id}
                    className="border border-gray-200 rounded-lg p-4 hover:border-indigo-300 transition-colors bg-linear-to-r from-white to-indigo-50/40"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">{skill.title}</h4>
                        <p className="text-sm text-gray-600">{skill.enrolled} students enrolled</p>
                      </div>
                      <span className="text-sm text-indigo-600 font-medium">
                        Next: {new Date(skill.nextSession).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

           
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-indigo-50">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Skills You&apos;re Learning</h3>
              <div className="space-y-4">
                {learningSkills.map((skill) => (
                  <div
                    key={skill.id}
                    className="border border-gray-200 rounded-lg p-4 hover:border-indigo-300 transition-colors bg-linear-to-r from-white to-purple-50/40"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">{skill.title}</h4>
                        <p className="text-sm text-gray-600">Instructor: {skill.instructor}</p>
                      </div>
                      <span className="text-sm text-indigo-600 font-medium">
                        Next: {new Date(skill.nextSession).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Upcoming & Activity */}
          <div className="space-y-8">
            {/* Upcoming Sessions */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-indigo-50">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Upcoming Sessions</h3>
              <div className="space-y-3">
                {upcomingSessions.map((session) => (
                  <div key={session.id} className="border-l-4 border-indigo-600 pl-4 py-2 bg-indigo-50/40 rounded">
                    <h4 className="font-medium text-gray-900 text-sm">{session.title}</h4>
                    <p className="text-xs text-gray-600">{session.type}</p>
                    <p className="text-xs text-indigo-600 mt-1">{session.time}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-indigo-50">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="pb-4 border-b border-gray-100 last:border-0">
                    <p className="text-sm text-gray-900">{activity.text}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Inspiration Gallery */}
        <section className="bg-white rounded-3xl shadow-2xl border border-indigo-50 p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <p className="text-sm uppercase tracking-wide text-indigo-500 font-semibold">Spotlight</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">Session Inspiration</h3>
              <p className="text-gray-600 mt-1">Fresh energy for your next live class.</p>
            </div>
            <button
              className="mt-4 md:mt-0 px-5 py-2 rounded-full border border-indigo-200 text-indigo-700 hover:bg-indigo-50"
              onClick={() => Navigate('/skills')}
            >
              Explore More Ideas
            </button>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {inspirationImages.map((src, index) => (
              <div key={src} className="relative rounded-2xl overflow-hidden shadow-lg group">
                <img
                  src={src}
                  alt="Inspiration"
                  className="h-48 w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-linear-to-t from-gray-900/70 to-transparent flex items-end p-4">
                  <p className="text-white font-semibold">Creative lab #{index + 1}</p>
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
    <div className="bg-white rounded-2xl px-5 py-4 shadow border border-indigo-100 flex items-center space-x-3">
      <div className="p-3 bg-indigo-50 rounded-full">{icon}</div>
      <div>
        <p className="text-2xl font-semibold text-gray-900">{value}</p>
        <p className="text-gray-500 text-sm">{label}</p>
      </div>
    </div>
  );
}