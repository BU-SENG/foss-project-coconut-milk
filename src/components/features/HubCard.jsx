import { Link } from 'react-router-dom'
import Card from '../common/Card'
import Badge from '../common/Badge'

const HubCard = ({ 
  id,
  name,
  school,
  description,
  sessionCount,
  memberCount,
  categories = [],
  imageEmoji = '🏫'
}) => {
  return (
    <Link to={`/hubs/${id}`}>
      <Card variant="primary" hover>
        <div className="flex items-start gap-4">
          <div className="w-20 h-20 rounded-xl bg-secondary/10 flex items-center justify-center flex-shrink-0">
            <span className="text-4xl">{imageEmoji}</span>
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-bold text-secondary mb-1">
              {name}
            </h3>
            <p className="text-secondary/70 text-sm mb-2">{school}</p>
            
            <p className="text-secondary/80 text-sm mb-3 line-clamp-2">
              {description}
            </p>
            
            <div className="flex flex-wrap gap-2 mb-3">
              {categories.slice(0, 3).map((category) => (
                <Badge key={category} size="sm">{category}</Badge>
              ))}
              {categories.length > 3 && (
                <Badge size="sm" variant="primary">+{categories.length - 3}</Badge>
              )}
            </div>
            
            <div className="flex items-center gap-4 text-sm text-secondary/70">
              <span>📚 {sessionCount} sessions</span>
              <span>👥 {memberCount} members</span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  )
}

export default HubCard