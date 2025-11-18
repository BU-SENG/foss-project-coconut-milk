import SessionCard from '../features/SessionCard'

const FeaturedSection = () => {
  const featuredSession = {
    title: 'Beginner Photography Basics',
    instructor: 'Sarah Johnson',
    description: 'Learn the fundamentals of photography including composition, lighting, and camera settings. Perfect for beginners with any camera!',
    time: 'Monday 3:00 PM',
    spotsLeft: 8,
    category: 'Photography',
    imageEmoji: '📸',
    featured: true
  }
  
  const upcomingSessions = [
    { title: 'Web Design Fundamentals', instructor: 'Mike Chen', time: 'Tue 4:00 PM', spotsLeft: 12, imageEmoji: '💻', category: 'Design' },
    { title: 'Guitar for Beginners', instructor: 'Emma Davis', time: 'Wed 3:30 PM', spotsLeft: 6, imageEmoji: '🎸', category: 'Music' },
    { title: 'Creative Writing Workshop', instructor: 'James Wilson', time: 'Thu 4:00 PM', spotsLeft: 15, imageEmoji: '✍️', category: 'Writing' },
    { title: 'Digital Illustration', instructor: 'Lisa Park', time: 'Fri 3:00 PM', spotsLeft: 10, imageEmoji: '🎨', category: 'Art' }
  ]
  
  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-2xl font-bold text-secondary mb-4">
          Featured Session
        </h2>
        <SessionCard {...featuredSession} />
      </section>
      
      <section>
        <h2 className="text-2xl font-bold text-secondary mb-4">
          Upcoming Sessions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {upcomingSessions.map((session, index) => (
            <SessionCard key={index} {...session} />
          ))}
        </div>
      </section>
    </div>
  )
}

export default FeaturedSection