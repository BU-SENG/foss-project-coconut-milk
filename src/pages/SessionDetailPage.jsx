import { useParams, Link } from 'react-router-dom'
import DashboardLayout from '../layout/DashboardLayout'
import Card from '../common/Card'
import Button from '../common/Button'
import Badge from '../common/Badge'
import ReviewCard from '../features/ReviewCard'

const SessionDetailPage = () => {
  const { id } = useParams()

  const session = {
    title: 'Photography Basics: Composition & Lighting',
    instructor: {
      name: 'Sarah Johnson',
      avatar: '👩',
      bio: 'Professional photographer with 10+ years experience',
      rating: 4.8,
      totalSessions: 45
    },
    description: "Learn the fundamentals of photography in this comprehensive beginner course. We'll cover composition rules, lighting techniques, camera settings, and practical shooting exercises. Perfect for anyone with a camera (phone cameras welcome!) who wants to take better photos.",
    imageEmoji: '📸',
    category: 'Photography',
    time: 'Monday, 3:00 PM - 4:30 PM',
    duration: '90 minutes',
    location: 'Room 204, Arts Building',
    spotsTotal: 15,
    spotsLeft: 8,
    price: 'Free',
    level: 'Beginner',
    prerequisites: 'Any camera (phone, DSLR, or point-and-shoot)',
    whatYouLearn: [
      'Rule of thirds and composition techniques',
      'Understanding natural and artificial lighting',
      'Basic camera settings (ISO, aperture, shutter speed)',
      'Practical shooting exercises',
      'Photo critique and feedback'
    ],
    materials: [
      'Camera (any type)',
      'Notebook for notes',
      'Willingness to learn!'
    ]
  }

  const reviews = [
    {
      userName: 'John Doe',
      userAvatar: '👨',
      rating: 5,
      date: '2 days ago',
      comment: 'Amazing session! Sarah explained everything so clearly and the hands-on practice was super helpful. My photos have improved so much!',
      sessionName: 'Photography Basics'
    },
    {
      userName: 'Emily Chen',
      userAvatar: '👩',
      rating: 5,
      date: '1 week ago',
      comment: "Best photography class I've taken. Sarah is patient and knowledgeable. Highly recommend for beginners!",
      sessionName: 'Photography Basics'
    },
    {
      userName: 'Mike Wilson',
      userAvatar: '🧑',
      rating: 4,
      date: '2 weeks ago',
      comment: 'Great introduction to photography. Wish it was a bit longer but learned a lot in the time we had.',
      sessionName: 'Photography Basics'
    }
  ]

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Session Header */}
            <Card variant="primary" className="mb-6">
              <div className="flex items-start gap-6 mb-6">
                <div className="w-24 h-24 rounded-xl bg-secondary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-5xl">{session.imageEmoji}</span>
                </div>
                
                <div className="flex-1">
                  <div className="flex flex-wrap gap-2 mb-3">
                    <Badge>{session.category}</Badge>
                    <Badge variant="success">{session.level}</Badge>
                  </div>
                  
                  <h1 className="text-3xl font-bold text-secondary mb-3">
                    {session.title}
                  </h1>
                  
                  <div className="flex items-center gap-4 text-sm text-secondary/70">
                    <span>🕐 {session.duration}</span>
                    <span>📍 {session.location}</span>
                    <span>💰 {session.price}</span>
                  </div>
                </div>
              </div>

              <div className="border-t border-secondary/20 pt-6">
                <h2 className="text-xl font-bold text-secondary mb-3">About This Session</h2>
                <p className="text-secondary/80 leading-relaxed">{session.description}</p>
              </div>
            </Card>

            {/* What You'll Learn */}
            <Card variant="primary" className="mb-6">
              <h2 className="text-xl font-bold text-secondary mb-4">What You'll Learn</h2>
              <ul className="space-y-3">
                {session.whatYouLearn.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-secondary/80">
                    <span className="text-green-600 mt-1">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Materials Needed */}
            <Card variant="primary" className="mb-6">
              <h2 className="text-xl font-bold text-secondary mb-4">What to Bring</h2>
              <ul className="space-y-2">
                {session.materials.map((item, index) => (
                  <li key={index} className="flex items-center gap-3 text-secondary/80">
                    <span>📦</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Prerequisites */}
            <Card variant="accent" className="mb-6">
              <h2 className="text-xl font-bold text-secondary mb-3">Prerequisites</h2>
              <p className="text-secondary/80">{session.prerequisites}</p>
            </Card>

            {/* Reviews */}
            <div>
              <h2 className="text-2xl font-bold text-secondary mb-4">
                Student Reviews ({reviews.length})
              </h2>
              <div className="space-y-4">
                {reviews.map((review, index) => (
                  <ReviewCard key={index} {...review} />
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Booking Card */}
            <Card variant="primary" className="sticky top-6">
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-secondary mb-2">
                  {session.price}
                </div>
                <p className="text-secondary/70">per session</p>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-secondary/70">Time</span>
                  <span className="font-semibold text-secondary">{session.time}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-secondary/70">Duration</span>
                  <span className="font-semibold text-secondary">{session.duration}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-secondary/70">Spots Left</span>
                  <span className="font-semibold text-secondary">{session.spotsLeft}/{session.spotsTotal}</span>
                </div>
              </div>

              <Button variant="primary" fullWidth size="lg" className="mb-3">
                Book This Session
              </Button>
              
              <Button variant="secondary" fullWidth>
                Add to Wishlist
              </Button>

              <div className="mt-6 pt-6 border-t border-secondary/20 text-center text-sm text-secondary/70">
                <p>🔒 Secure booking</p>
                <p>✓ Free cancellation up to 24h before</p>
              </div>
            </Card>

            {/* Instructor Card */}
            <Card variant="primary">
              <h3 className="text-lg font-bold text-secondary mb-4">Your Instructor</h3>
              
              <div className="flex items-start gap-3 mb-4">
                <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center">
                  <span className="text-3xl">{session.instructor.avatar}</span>
                </div>
                
                <div className="flex-1">
                  <h4 className="font-bold text-secondary mb-1">
                    {session.instructor.name}
                  </h4>
                  <div className="flex items-center gap-2 text-sm text-secondary/70 mb-2">
                    <span>⭐ {session.instructor.rating}</span>
                    <span>•</span>
                    <span>{session.instructor.totalSessions} sessions</span>
                  </div>
                </div>
              </div>
              
              <p className="text-sm text-secondary/80 mb-4">{session.instructor.bio}</p>
              <Link to={`/instructors/${encodeURIComponent(session.instructor.name)}`}>
                <Button variant="secondary" fullWidth size="sm">
                  View Profile
                </Button>
              </Link>
            </Card>

            {/* Share Card */}
            <Card variant="accent">
              <h3 className="text-lg font-bold text-secondary mb-3">Share This Session</h3>
              <div className="flex gap-2">
                <button className="flex-1 py-2 bg-primary border-2 border-secondary/20 rounded-lg hover:bg-secondary/5 transition-colors">
                  📧
                </button>
                <button className="flex-1 py-2 bg-primary border-2 border-secondary/20 rounded-lg hover:bg-secondary/5 transition-colors">
                  🔗
                </button>
                <button className="flex-1 py-2 bg-primary border-2 border-secondary/20 rounded-lg hover:bg-secondary/5 transition-colors">
                  📱
                </button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default SessionDetailPage