const Card = ({ 
  children, 
  variant = 'primary',
  padding = 'default',
  hover = false,
  className = ''
}) => {
  const variants = {
    primary: 'bg-primary border-2 border-secondary/20 shadow-md',
    accent: 'bg-secondary/5 border-l-4 border-secondary',
    flat: 'bg-primary border border-secondary/10'
  }
  
  const paddings = {
    none: '',
    sm: 'p-4',
    default: 'p-6',
    lg: 'p-8'
  }
  
  const hoverEffect = hover ? 'hover:shadow-lg hover:border-secondary/40 transition-all duration-200' : ''
  
  return (
    <div className={`rounded-lg ${variants[variant]} ${paddings[padding]} ${hoverEffect} ${className}`}>
      {children}
    </div>
  )
}

export default Card