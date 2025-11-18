const NotificationItem = ({ 
  type,
  title,
  message,
  time,
  read = false,
  onMarkRead 
}) => {
  const icons = {
    session: '📚',
    message: '💬',
    badge: '🏆',
    reminder: '🔔',
    review: '⭐'
  }

  return (
    <div 
      className={`p-4 border-b border-secondary/10 hover:bg-secondary/5 transition-colors cursor-pointer ${
        !read ? 'bg-secondary/5' : ''
      }`}
      onClick={onMarkRead}
    >
      <div className="flex items-start gap-3">
        <span className="text-2xl">{icons[type] || '📬'}</span>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h4 className="font-semibold text-secondary">{title}</h4>
            <span className="text-xs text-secondary/60 whitespace-nowrap">{time}</span>
          </div>
          <p className="text-sm text-secondary/80">{message}</p>
        </div>
        
        {!read && (
          <div className="w-2 h-2 bg-secondary rounded-full flex-shrink-0 mt-2"></div>
        )}
      </div>
    </div>
  )
}

export default NotificationItem