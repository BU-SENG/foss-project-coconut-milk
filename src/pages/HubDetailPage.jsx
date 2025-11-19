import { useParams, Link } from 'react-router-dom'
import DashboardLayout from '../layout/DashboardLayout'
import Card from '../common/Card'
import Button from '../common/Button'
import Badge from '../common/Badge'
import SessionCard from '../features/SessionCard'

const HubDetailPage = () => {
  const { id } = useParams()

  const hub = {
    name: 'Lincoln High Creative Arts',
    school: 'Lincoln High School',
    description: 'Welcome to our creative arts hub! This is a space where students can explore their artistic passions, learn new techniques, and share their creative journey with peers. We offer sessions in photography, digital art, music production, and design.',
    imageEmoji: '🎨',
    memberCount: 230,
    sessionCount: 45,
    admin: 'Ms. Sarah Johnson',
    categories: ['Photography', 'Art', 'Music', 'Design', 'Film']
  }

  const sessions = [
    { 
      title: 'Photography Basics', 
      instructor: 'Sarah Johnson', 
      time: 'Mon 3:00 PM', 
      spotsLeft: 8, 
      imageEmoji: '📸',
      category: 'Photography',
      description: 'Learn fundamental photography skills'
    },
    { 
      title: 'Digital Illustration', 
      instructor: 'Mike Chen', 
      time: 'Wed 4:00 PM', 
      spotsLeft: 5, 
      imageEmoji: '🎨',
      category: 'Art',
      description: 'Create stunning digital artwork'
    },
    { 
      title: 'Music Production 101', 
      instructor: 'Emma Davis', 
      time: 'Thu 3:30 PM', 
      spotsLeft: 10, 
      imageEmoji: '🎵',
      category: 'Music',
      description: 'Start making your own music'
    }
  ]

  const members = [
    { name: 'John Doe', avatar: '👨', role: 'Instructor' },
    { name: 'Jane Smith', avatar: '👩', role: 'Member' },
    { name: 'Alex Johnson', avatar: '🧑', role: 'Member' },
    { name: 'Sam Wilson', avatar: '👤', role: 'Instructor' }
  ]

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        
        <Card variant="primary" className="mb-8">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-32 h-32 rounded-2xl bg-secondary/10 flex items-center justify-center flex-shrink-0">
              <span className="text-6xl">{hub.imageEmoji}</span>
            </div>
            
            <div className="flex-1">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-secondary mb-2">
                    {hub.name}
                  </h1>
                  <p className="text-secondary/70 mb-3">{hub.school}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {hub.categories.map((category) => (
                      <Badge key={category}>{category}</Badge>
                    ))}
                  </div>
                </div>
                
                <Button variant="primary" icon="✓">
                  Join Hub
                </Button>
              </div>
              
              <p className="text-secondary/80 mb-4">{hub.description}</p>
              
              <div className="flex flex-wrap gap-6 text-sm text-secondary/70">
                <span>👥 {hub.memberCount} members</span>
                <span>📚 {hub.sessionCount} sessions</span>
                <span>👨‍🏫 Admin: {hub.admin}</span>
              </div>
            </div>
          </div>
        </Card>

        <div className="grid lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-secondary">Active Sessions</h2>
              <Link to="/create-session">
                <Button variant="secondary" size="sm" icon="➕">
                  Create Session
                </Button>
              </Link>
            </div>
            
            <div className="space-y-6">
              {sessions.map((session, index) => (
                <SessionCard key={index} {...session} />
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <Card variant="primary">
              <h3 className="text-xl font-bold text-secondary mb-4">
                Recent Members
              </h3>
              <div className="space-y-3">
                {members.map((member, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                      <span className="text-xl">{member.avatar}</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-secondary text-sm">{member.name}</p>
                      <p className="text-xs text-secondary/60">{member.role}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="secondary" fullWidth size="sm" className="mt-4">
                View All Members
              </Button>
            </Card>

            <Card variant="accent">
              <h3 className="text-xl font-bold text-secondary mb-4">
                Hub Activity
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-secondary/80">This Week</span>
                  <span className="font-bold text-secondary">12 sessions</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary/80">New Members</span>
                  <span className="font-bold text-secondary">23</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary/80">Avg. Rating</span>
                  <span className="font-bold text-secondary">4.8 ⭐</span>
                </div>
              </div>
            </Card>

            <Card variant="primary">
              <h3 className="text-xl font-bold text-secondary mb-4">
                Community Guidelines
              </h3>
              <ul className="space-y-2 text-sm text-secondary/80">
                <li className="flex items-start gap-2">
                  <span>✓</span>
                  <span>Be respectful and supportive</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>✓</span>
                  <span>Attend sessions you've booked</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>✓</span>
                  <span>Share knowledge freely</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>✓</span>
                  <span>Give constructive feedback</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default HubDetailPage