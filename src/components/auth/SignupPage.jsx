import { useState } from 'react'
import { Link } from 'react-router-dom'
import AuthLayout from './AuthLayout'
import Input from '../common/Input'
import Button from '../common/Button'

const SignupPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'learner',
    agreeToTerms: false
  })
  
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required'
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Name must be at least 2 characters'
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/\\S+@\\S+\\.\\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, and number'
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }
    
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions'
    }
    
    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const newErrors = validateForm()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    
    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      console.log('Signup:', formData)
      setIsLoading(false)
      // Handle successful signup here
    }, 1500)
  }

  return (
    <AuthLayout 
      title="Create Account" 
      subtitle="Join our community and start learning today"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Full Name"
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="John Doe"
          icon="👤"
          error={errors.fullName}
          required
        />

        <Input
          label="Email Address"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="you@example.com"
          icon="📧"
          error={errors.email}
          required
        />

        <Input
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="••••••••"
          icon="🔒"
          error={errors.password}
          helperText="At least 8 characters with uppercase, lowercase, and number"
          required
        />

        <Input
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="••••••••"
          icon="🔒"
          error={errors.confirmPassword}
          required
        />

        {/* Role Selection */}
        <div>
          <label className="block text-secondary font-medium mb-2">
            I want to join as
          </label>
          <div className="grid grid-cols-2 gap-3">
            <label
              className={`
                flex flex-col items-center justify-center p-4 border-2 rounded-lg cursor-pointer transition-all
                ${formData.role === 'learner' 
                  ? 'border-secondary bg-secondary/5' 
                  : 'border-secondary/20 hover:border-secondary/40'
                }
              `}
            >
              <input
                type="radio"
                name="role"
                value="learner"
                checked={formData.role === 'learner'}
                onChange={handleChange}
                className="sr-only"
              />
              <span className="text-3xl mb-2">🎓</span>
              <span className="font-semibold text-secondary">Learner</span>
              <span className="text-xs text-secondary/70 text-center mt-1">
                Discover and join sessions
              </span>
            </label>

            <label
              className={`
                flex flex-col items-center justify-center p-4 border-2 rounded-lg cursor-pointer transition-all
                ${formData.role === 'instructor' 
                  ? 'border-secondary bg-secondary/5' 
                  : 'border-secondary/20 hover:border-secondary/40'
                }
              `}
            >
              <input
                type="radio"
                name="role"
                value="instructor"
                checked={formData.role === 'instructor'}
                onChange={handleChange}
                className="sr-only"
              />
              <span className="text-3xl mb-2">👨‍🏫</span>
              <span className="font-semibold text-secondary">Instructor</span>
              <span className="text-xs text-secondary/70 text-center mt-1">
                Share your skills
              </span>
            </label>
          </div>
        </div>

        {/* Terms and Conditions */}
        <div>
          <label className="flex items-start gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleChange}
              className="w-4 h-4 mt-1 rounded border-2 border-secondary/30 text-secondary focus:ring-2 focus:ring-secondary/20"
            />
            <span className="text-sm text-secondary">
              I agree to the{' '}
              <Link to="/terms" className="font-semibold hover:text-secondary/80">
                Terms of Service
              </Link>
              {' '}and{' '}
              <Link to="/privacy" className="font-semibold hover:text-secondary/80">
                Privacy Policy
              </Link>
            </span>
          </label>
          {errors.agreeToTerms && (
            <p className="mt-1 text-sm text-red-600">{errors.agreeToTerms}</p>
          )}
        </div>

        <Button 
          type="submit" 
          variant="primary" 
          fullWidth 
          disabled={isLoading}
        >
          {isLoading ? 'Creating account...' : 'Create Account'}
        </Button>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-secondary/20"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-primary text-secondary/60">Or sign up with</span>
          </div>
        </div>

        {/* Social Signup Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            className="flex items-center justify-center gap-2 px-4 py-2 border-2 border-secondary/20 rounded-lg hover:bg-secondary/5 transition-colors text-secondary font-medium"
          >
            <span>🔍</span>
            Google
          </button>
          <button
            type="button"
            className="flex items-center justify-center gap-2 px-4 py-2 border-2 border-secondary/20 rounded-lg hover:bg-secondary/5 transition-colors text-secondary font-medium"
          >
            <span>📘</span>
            Facebook
          </button>
        </div>

        {/* Login Link */}
        <p className="text-center text-sm text-secondary/70 mt-6">
          Already have an account?{' '}
          <Link 
            to="/login" 
            className="font-semibold text-secondary hover:text-secondary/80"
          >
            Sign in
          </Link>
        </p>
      </form>
    </AuthLayout>
  )
}

export default SignupPage