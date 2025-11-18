import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import Button from '../common/Button'

const DashboardLayout = ({ children }) => {
  const location = useLocation()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const navItems = [
    { path: '/dashboard', icon: '🏠', label: 'Dashboard' },
    { path: '/explore', icon: '🔍', label: 'Explore' },
    { path: '/my-learning', icon: '📚', label: 'My Learning' },
    { path: '/my-sessions', icon: '🎓', label: 'My Sessions' },
    { path: '/messages', icon: '💬', label: 'Messages' },
    { path: '/profile', icon: '👤', label: 'Profile' },
    { path: '/settings', icon: '⚙️', label: 'Settings' }
  ]

  return (
    <div className="min-h-screen bg-primary">
      {/* Top Header */}
      <header className="bg-primary border-b-2 border-secondary/20 sticky top-0 z-30">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="lg:hidden text-secondary"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              
              <Link to="/" className="flex items-center gap-2">
                <span className="text-2xl">🎓</span>
                <h1 className="text-xl font-bold text-secondary hidden sm:block">
                  Skills Exchange
                </h1>
              </Link>
            </div>

            <div className="flex items-center gap-3">
              <Link to="/notifications">
                <button className="relative p-2 text-secondary hover:bg-secondary/10 rounded-lg transition-colors">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
              </Link>
              
              <Link to="/profile">
                <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center cursor-pointer hover:bg-secondary/20 transition-colors">
                  <span className="text-xl">👤</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`
          fixed lg:sticky top-0 left-0 z-20 h-screen
          w-64 bg-primary border-r-2 border-secondary/20
          transform transition-transform duration-300 lg:transform-none
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          <nav className="p-4 pt-20 lg:pt-4">
            <div className="space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                    ${location.pathname === item.path
                      ? 'bg-secondary text-primary font-semibold'
                      : 'text-secondary hover:bg-secondary/10'
                    }
                  `}
                >
                  <span className="text-xl">{item.icon}</span>
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-secondary/20">
              <Button variant="primary" fullWidth icon="➕">
                Create Session
              </Button>
            </div>
          </nav>
        </aside>

        {/* Overlay for mobile */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-secondary/50 z-10 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout