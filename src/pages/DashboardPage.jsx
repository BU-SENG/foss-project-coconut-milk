import DashboardLayout from '../layout/DashboardLayout'
import Card from '../common/Card'
import Button from '../common/Button'
import SessionCard from '../features/SessionCard'
import StatCard from '../features/StatCard'
import { Link } from 'react-router-dom'

const DashboardPage = () => {
  const upcomingSessions = [
    { 
      title: 'Photography Basics', 
      instructor: 'Sarah Johnson', 
      time: 'Today 3:00 PM', 
      spotsLeft: 8, 
      imageEmoji: '📸',
      category: 'Photography'
    },
    { 
      title: 'Web Design', 
      instructor: 'Mike Chen', 
      time: 'Tomorrow 4:00 PM', 
      spotsLeft: 5, 
      imageEmoji: '💻',
      category: 'Design'
    }
  ]

  const stats = [
    { label: 'Sessions This Week', value: 3, icon: '📚' },
    { label: 'Hours Learned', value: 12, icon: '⏱️' },
    { label: 'Streak Days', value: 7, icon: '🔥' }
  ]

  const recentActivity = [
    { action: 'Completed', item: 'Advanced React Patterns', time: '2 hours ago', icon: '✅' },
    { action: 'Joined', item: 'Photography Basics', time: '1 day ago', icon: '🎯' },
    { action: 'Earned', item: 'Quick Learner Badge', time: '3 days ago', icon: '🏆' }
  ]

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-secondary mb-2">
            Welcome back! 👋
          </h1>
          <p className="text-secondary/70">
            Here's what's happening with your learning journey
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <StatCard title="Your Progress" stats={stats} />
          
          <Card variant="accent">
            <h3 className="text-lg font-bold text-secondary mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <Link to="/explore">
                <Button variant="secondary" fullWidth size="sm">
                  Browse Sessions
                </Button>
              </Link>
              <Link to="/create-session">
                <Button variant="secondary" fullWidth size="sm">
                  Create Session
                </Button>
              </Link>
              <Link to="/hubs">
                <Button variant="secondary" fullWidth size="sm">
                  Explore Hubs
                </Button>
              </Link>
            </div>
          </Card>

          <Card variant="primary">
            <h3 className="text-lg font-bold text-secondary mb-4">Achievement</h3>
            <div className="text-center">
              <div className="text-6xl mb-3">🏆</div>
              <p className="text-secondary font-semibold mb-1">Level 5 Learner</p>
              <p className="text-sm text-secondary/70">2 more badges to Level 6</p>
            </div>
          </Card>
        </div>

        {/* Upcoming Sessions */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-secondary">Upcoming Sessions</h2>
            <Link to="/my-learning">
             <Button variant="ghost" size="sm">
                View All →
              </Button>
            </Link>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {upcomingSessions.map((session, index) => (
              <SessionCard key={index} {...session} />
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <Card variant="primary">
          <h2 className="text-2xl font-bold text-secondary mb-4">Recent Activity</h2>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center gap-4 p-3 hover:bg-secondary/5 rounded-lg transition-colors">
                <span className="text-2xl">{activity.icon}</span>
                <div className="flex-1">
                  <p className="text-secondary">
                    <span className="font-semibold">{activity.action}</span> {activity.item}
                  </p>
                  <p className="text-sm text-secondary/60">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  )
}

export default DashboardPage