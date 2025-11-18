const Select = ({ 
  label,
  name,
  value,
  onChange,
  options = [],
  error,
  helperText,
  required = false,
  fullWidth = true,
  placeholder = "Select an option"
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
      
      <select
        name={name}
        value={value}
        onChange={onChange}
        className={`
          w-full px-4 py-3 
          bg-primary 
          border-2 border-secondary/30 
          rounded-lg 
          text-secondary 
          focus:outline-none 
          focus:border-secondary 
          focus:ring-2 
          focus:ring-secondary/20
          transition-all
          ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : ''}
        `}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
      
      {helperText && !error && (
        <p className="mt-1 text-sm text-secondary/60">{helperText}</p>
      )}
    </div>
  )
}

export default Select