import Card from '../common/Card'
import Badge from '../common/Badge'
import Button from '../common/Button'

const InstructorProfile = ({ 
  name, 
  avatar = '👤',
  bio,
  skills = [],
  rating = 0,
  totalSessions = 0,
  compact = false
}) => {
  return (
    <Card variant="primary" hover>
      <div className="flex items-start gap-4">
        <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center text-3xl flex-shrink-0">
          {avatar}
        </div>
        
        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-secondary text-lg mb-1">{name}</h4>
          
          <div className="flex items-center gap-3 mb-2 text-sm">
            <span className="text-secondary/70">⭐ {rating.toFixed(1)}</span>
            <span className="text-secondary/70">• {totalSessions} sessions</span>
          </div>
          
          {!compact && bio && (
            <p className="text-secondary/80 text-sm mb-3">{bio}</p>
          )}
          
          <div className="flex flex-wrap gap-2 mb-3">
            {skills.slice(0, compact ? 2 : 5).map((skill) => (
              <Badge key={skill} size="sm">{skill}</Badge>
            ))}
            {skills.length > (compact ? 2 : 5) && (
              <Badge size="sm" variant="primary">+{skills.length - (compact ? 2 : 5)}</Badge>
            )}
          </div>
          
          {!compact && (
            <Button variant="secondary" size="sm" fullWidth>
              View Profile
            </Button>
          )}
        </div>
      </div>
    </Card>
  )
}

export default InstructorProfile