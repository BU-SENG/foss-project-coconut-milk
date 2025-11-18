import Card from '../common/Card'
import Badge from '../common/Badge'
import Button from '../common/Button'

const SessionCard = ({ 
  title,
  instructor,
  description,
  time,
  spotsLeft,
  category,
  imageEmoji = '📸',
  featured = false
}) => {
  return (
    <Card variant="primary" hover>
      <div className="flex items-start gap-4 mb-4">
        <div className="w-16 h-16 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0">
          <span className="text-3xl">{imageEmoji}</span>
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="text-xl font-bold text-secondary">
              {title}
            </h3>
            {featured && (
              <Badge variant="warning" size="sm">⭐ Featured</Badge>
            )}
          </div>
          
          <p className="text-secondary/70 text-sm mb-2">
            Instructor: {instructor}
          </p>
          
          <div className="flex flex-wrap gap-2 text-sm">
            <Badge icon="🕐">{time}</Badge>
            <Badge icon="👥" variant={spotsLeft < 5 ? 'danger' : 'default'}>
              {spotsLeft} spots left
            </Badge>
            {category && <Badge variant="primary">{category}</Badge>}
          </div>
        </div>
      </div>
      
      {description && (
        <p className="text-secondary/80 mb-4 text-sm">
          {description}
        </p>
      )}
      
      <Button variant="primary" fullWidth>
        Book This Session
      </Button>
    </Card>
  )
}

export default SessionCard