const Textarea = ({ 
  label,
  name,
  placeholder,
  value,
  onChange,
  error,
  helperText,
  rows = 4,
  required = false,
  fullWidth = true,
  maxLength
}) => {
  const widthClass = fullWidth ? 'w-full' : ''
  
  return (
    <div className={`${widthClass}`}>
      {label && (
        <div className="flex items-center justify-between mb-2">
          <label className="block text-secondary font-medium">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
          {maxLength && (
            <span className="text-xs text-secondary/60">
              {value?.length || 0}/{maxLength}
            </span>
          )}
        </div>
      )}
      
      <textarea
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        rows={rows}
        maxLength={maxLength}
        className={`
          w-full px-4 py-3 
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
          resize-none
          ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : ''}
        `}
      />
      
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
      
      {helperText && !error && (
        <p className="mt-1 text-sm text-secondary/60">{helperText}</p>
      )}
    </div>
  )
}

export default Textarea