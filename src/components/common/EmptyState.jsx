import Button from './Button'

const EmptyState = ({ 
  icon = "📭", 
  title, 
  description, 
  action,
  actionLabel 
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="text-6xl mb-4">{icon}</div>
      <h3 className="text-2xl font-bold text-secondary mb-2">{title}</h3>
      <p className="text-secondary/70 mb-6 max-w-md">{description}</p>
      {action && actionLabel && (
        <Button onClick={action} variant="primary">
          {actionLabel}
        </Button>
      )}
    </div>
  )
}

export default EmptyState