import StatCard from '../features/StatCard'
import SkillList from '../features/SkillList'
import Button from '../common/Button'

const Sidebar = () => {
  const userStats = [
    { label: 'Sessions Attended', value: 12, icon: '📚' },
    { label: 'Skills Learned', value: 5, icon: '🎯' },
    { label: 'Badges Earned', value: 3, icon: '🏆' }
  ]
  
  const popularSkills = [
    { name: 'Photography', icon: '📸', count: 24 },
    { name: 'Web Design', icon: '💻', count: 18 },
    { name: 'Music Production', icon: '🎵', count: 15 },
    { name: 'Creative Writing', icon: '✍️', count: 12 }
  ]
  
  return (
    <aside className="space-y-6">
      <StatCard title="Your Stats" stats={userStats} />
      
      <SkillList title="Popular Skills" skills={popularSkills} />
      
      <Button variant="primary" fullWidth icon="🎓">
        Become an Instructor
      </Button>
      
      <Button variant="secondary" fullWidth icon="➕">
        Create a Hub
      </Button>
    </aside>
  )
}

export default Sidebar