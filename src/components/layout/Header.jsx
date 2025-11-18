import { Link } from 'react-router-dom'
import Button from '../common/Button'

const Header = () => {
  return (
    <header className="bg-primary border-b-4 border-secondary shadow-md">
      <div className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <Link to="/">
            <div>
              <h1 className="text-4xl font-bold text-secondary mb-2">
                Skills Exchange Hub
              </h1>
              <p className="text-secondary/70">
                Learn and share skills in your school community
              </p>
            </div>
          </Link>
          
          <div className="flex items-center gap-4">
            <Link to="/login">
              <Button variant="ghost" size="sm">
                Login
              </Button>
            </Link>
            <Link to="/signup">
              <Button variant="primary" size="sm">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header