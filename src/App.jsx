import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './components/auth/LoginPage'
import SignupPage from './components/auth/SignupPage'
import Layout from './components/layout/Layout'
import FeaturedSection from './components/sections/FeaturedSection'
import Sidebar from './components/sections/Sidebar'

function HomePage() {
  return (
    <Layout>
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <FeaturedSection />
          </div>
          <div>
            <Sidebar />
          </div>
        </div>
      </div>
    </Layout>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

export default App