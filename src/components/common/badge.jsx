const Badge = ({ 
  children, 
  variant = 'default',
  size = 'md',
  icon = null
}) => {
  const variants = {
    default: 'bg-secondary/10 text-secondary',
    primary: 'bg-primary text-secondary border border-secondary/30',
    success: 'bg-green-100 text-green-800 border border-green-300',
    warning: 'bg-yellow-100 text-yellow-800 border border-yellow-300',
    danger: 'bg-red-100 text-red-800 border border-red-300'
  }
  
  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base'
  }
  
  return (
    <span className={`inline-flex items-center gap-1 rounded-full font-medium ${variants[variant]} ${sizes[size]}`}>
      {icon && <span className="text-xs">{icon}</span>}
      {children}
    </span>
  )
}

export default Badge