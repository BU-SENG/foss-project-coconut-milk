const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  fullWidth = false,
  icon = null,
  onClick,
  disabled = false,
  type = 'button'
}) => {
  const baseStyles = 'rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center gap-2'
  
  const variants = {
    primary: 'bg-secondary text-primary hover:bg-secondary/90 disabled:bg-secondary/50',
    secondary: 'bg-primary text-secondary border-2 border-secondary hover:bg-primary/80 disabled:border-secondary/50 disabled:text-secondary/50',
    outline: 'bg-transparent text-secondary border-2 border-secondary hover:bg-secondary/10 disabled:border-secondary/50 disabled:text-secondary/50',
    ghost: 'bg-transparent text-secondary hover:bg-secondary/10 disabled:text-secondary/50'
  }
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  }
  
  const widthClass = fullWidth ? 'w-full' : ''
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthClass}`}
    >
      {icon && <span>{icon}</span>}
      {children}
    </button>
  )
}

export default Button