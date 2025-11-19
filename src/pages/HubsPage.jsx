import DashboardLayout from '../layout/DashboardLayout'
import HubCard from '../features/HubCard'
import SearchBar from '../common/SearchBar'
import Button from '../common/Button'
import Select from '../common/Select'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const HubsPage = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [filter, setFilter] = useState('all')

  const hubs = [
    {
      id: 1,
      name: 'Lincoln High Creative Arts',
      school: 'Lincoln High School',
      description: 'A hub for creative minds to explore photography, art, music, and design.',
      sessionCount: 45,
      memberCount: 230,
      categories: ['Photography', 'Art', 'Music', 'Design'],
      imageEmoji: '🎨'
    },
    {
      id: 2,
      name: 'Tech Innovation Hub',
      school: 'Jefferson Academy',
      description: 'Learn coding, web development, app design, and emerging technologies.',
      sessionCount: 67,
      memberCount: 340,
      categories: ['Coding', 'Web Dev', 'AI', 'Robotics'],
      imageEmoji: '💻'
    },
    {
      id: 3,
      name: 'Language & Culture Exchange',
      school: 'Washington Prep',
      description: 'Practice languages, explore cultures, and connect with diverse communities.',
      sessionCount: 32,
      memberCount: 180,
      categories: ['Spanish', 'French', 'Culture', 'Writing'],
      imageEmoji: '🌍'
    },
    {
      id: 4,
      name: 'Sports & Wellness Center',
      school: 'Roosevelt High',
      description: 'Stay active with fitness, yoga, martial arts, and nutrition sessions.',
      sessionCount: 28,
      memberCount: 150,
      categories: ['Fitness', 'Yoga', 'Nutrition', 'Sports'],
      imageEmoji: '⚽'
    }
  ]

  const filterOptions = [
    { value: 'all', label: 'All Hubs' },
    { value: 'arts', label: 'Arts & Creative' },
    { value: 'tech', label: 'Technology' },
    { value: 'language', label: 'Languages' },
    { value: 'sports', label: 'Sports & Wellness' }
  ]

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-secondary mb-2">
            Explore Learning Hubs
          </h1>
          <p className="text-secondary/70">
            Join school communities and discover skill sessions
          </p>
        </div>

        {/* Search and Filters */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="md:col-span-3">
            <SearchBar 
              onSearch={setSearchQuery} 
              placeholder="Search for hubs by name or category..."
            />
          </div>
          <Select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            options={filterOptions}
          />
        </div>

        {/* Create Hub Button */}
        <div className="mb-6">
          <Link to="/create-hub">
            <Button variant="primary" icon="➕">
              Create Your Hub
            </Button>
          </Link>
        </div>

        {/* Hubs Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {hubs.map((hub) => (
            <HubCard key={hub.id} {...hub} />
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}

export default HubsPage