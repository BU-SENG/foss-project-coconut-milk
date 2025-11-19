import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Plus, Calendar, Bell, User, LogOut } from 'lucide-react';

export default function Dashboard() {
    const Navigate = useNavigate()
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <BookOpen className="h-8 w-8 text-indigo-600" />
            <h1 className="text-2xl font-bold text-gray-900">Skill Exchange Hub</h1>
          </div>
          <div className="flex items-center space-x-6">
            <button className="text-gray-600 hover:text-indigo-600">
              <Bell className="h-6 w-6" />
            </button>
            <button className="text-gray-600 hover:text-indigo-600" onClick={() => {Navigate('/profile')}}>
              <User className="h-6 w-6" />
            </button>
            <button className="text-gray-600 hover:text-red-600" onClick={() => {Navigate('/')}}>
              <LogOut className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, John!</h2>
          <p className="text-gray-600">Here's what's happening with your skills today</p>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-4 mb-8">
          <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 font-medium inline-flex items-center space-x-2" onClick={() => {Navigate('/new')}}>
            <Plus className="h-5 w-5" />
            <span>Post New Skill</span>
          </button>
          <button className="bg-white text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 font-medium border border-gray-300 inline-flex items-center space-x-2" onClick={() => {Navigate('/skills')}}>
            <Calendar className="h-5 w-5" />
            <span>Available Skills</span>
          </button>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Skills */}
          <div className="lg:col-span-2 space-y-8">
            {/* Teaching Skills */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Skills You're Teaching</h3>
              <div className="space-y-4">
                {teachingSkills.map(skill => (
                  <div key={skill.id} className="border border-gray-200 rounded-lg p-4 hover:border-indigo-300 transition-colors">
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

            {/* Learning Skills */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Skills You're Learning</h3>
              <div className="space-y-4">
                {learningSkills.map(skill => (
                  <div key={skill.id} className="border border-gray-200 rounded-lg p-4 hover:border-indigo-300 transition-colors">
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
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Upcoming Sessions</h3>
              <div className="space-y-3">
                {upcomingSessions.map(session => (
                  <div key={session.id} className="border-l-4 border-indigo-600 pl-4 py-2">
                    <h4 className="font-medium text-gray-900 text-sm">{session.title}</h4>
                    <p className="text-xs text-gray-600">{session.type}</p>
                    <p className="text-xs text-indigo-600 mt-1">{session.time}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {recentActivity.map(activity => (
                  <div key={activity.id} className="pb-4 border-b border-gray-100 last:border-0">
                    <p className="text-sm text-gray-900">{activity.text}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}