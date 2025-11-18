import { useState } from 'react'
import { Link } from 'react-router-dom'
import AuthLayout from './AuthLayout'
import Input from '../common/Input'
import Button from '../common/Button'

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
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
    
    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/\\S+@\\S+\\.\\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
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
      console.log('Login:', formData)
      setIsLoading(false)
      // Handle successful login here
    }, 1500)
  }

  return (
    <AuthLayout 
      title="Welcome Back" 
      subtitle="Sign in to continue your learning journey"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
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
          required
        />

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
              className="w-4 h-4 rounded border-2 border-secondary/30 text-secondary focus:ring-2 focus:ring-secondary/20"
            />
            <span className="text-sm text-secondary">Remember me</span>
          </label>

          <Link 
            to="/forgot-password" 
            className="text-sm text-secondary hover:text-secondary/80 font-medium"
          >
            Forgot password?
          </Link>
        </div>

        <Button 
          type="submit" 
          variant="primary" 
          fullWidth 
          disabled={isLoading}
        >
          {isLoading ? 'Signing in...' : 'Sign In'}
        </Button>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-secondary/20"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-primary text-secondary/60">Or continue with</span>
          </div>
        </div>

        {/* Social Login Buttons */}
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

        {/* Sign Up Link */}
        <p className="text-center text-sm text-secondary/70 mt-6">
          Don't have an account?{' '}
          <Link 
            to="/signup" 
            className="font-semibold text-secondary hover:text-secondary/80"
          >
            Sign up for free
          </Link>
        </p>
      </form>
    </AuthLayout>
  )
}

export default LoginPage