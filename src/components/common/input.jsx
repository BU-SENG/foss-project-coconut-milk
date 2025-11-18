const Input = ({ 
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  helperText,
  icon,
  required = false,
  fullWidth = true
}) => {
  const widthClass = fullWidth ? 'w-full' : ''
  
  return (
    <div className={`${widthClass}`}>
      {label && (
        <label className="block text-secondary font-medium mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary/60">
            {icon}
          </span>
        )}
        
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`
            w-full px-4 py-3 
            ${icon ? 'pl-10' : ''}
            bg-primary 
            border-2 border-secondary/30 
            rounded-lg 
            text-secondary 
            placeholder:text-secondary/50
            focus:outline-none 
            focus:border-secondary 
            focus:ring-2 
            focus:ring-secondary/20
            transition-all
            ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : ''}
          `}
        />
      </div>
      
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
      
      {helperText && !error && (
        <p className="mt-1 text-sm text-secondary/60">{helperText}</p>
      )}
    </div>
  )
}

export default Input