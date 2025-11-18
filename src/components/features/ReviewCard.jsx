import Badge from '../common/Badge'

const ReviewCard = ({ 
  userName,
  userAvatar = '👤',
  rating,
  date,
  comment,
  sessionName
}) => {
  return (
    <div className="bg-primary border border-secondary/20 rounded-lg p-4">
      <div className="flex items-start gap-3 mb-3">
        <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
          <span className="text-xl">{userAvatar}</span>
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h4 className="font-semibold text-secondary">{userName}</h4>
            <span className="text-sm text-secondary/60">{date}</span>
          </div>
          
          <div className="flex items-center gap-2 mb-2">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={i < rating ? 'text-yellow-500' : 'text-secondary/20'}>
                  ⭐
                </span>
              ))}
            </div>
            {sessionName && (
              <Badge size="sm" variant="primary">{sessionName}</Badge>
            )}
          </div>
          
          <p className="text-secondary/80 text-sm">{comment}</p>
        </div>
      </div>
    </div>
  )
}

export default ReviewCard