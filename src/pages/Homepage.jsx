import Layout from '../layout/Layout'
import FeaturedSection from '../sections/FeaturedSection'
import Sidebar from '../sections/Sidebar'
import Button from '../common/Button'
import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary/80 border-b-4 border-secondary/20">
        <div className="container mx-auto px-6 py-20">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold text-secondary mb-6">
              Learn Skills,<br />Share Knowledge
            </h1>
            <p className="text-xl text-secondary/80 mb-8">
              Join your school's learning community. Discover new skills, teach what you know, and grow together.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/signup">
                <Button variant="primary" size="lg" icon="🚀">
                  Get Started Free
                </Button>
              </Link>
              <Link to="/explore">
                <Button variant="secondary" size="lg" icon="🔍">
                  Explore Sessions
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-secondary text-primary py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-primary/80">Active Sessions</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-primary/80">School Hubs</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">5000+</div>
              <div className="text-primary/80">Students</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">200+</div>
              <div className="text-primary/80">Instructors</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
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

      {/* Features Section */}
      <section className="bg-secondary/5 py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-secondary text-center mb-12">
            Why Skills Exchange Hub?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl mb-4">🎯</div>
              <h3 className="text-xl font-bold text-secondary mb-2">Learn Anything</h3>
              <p className="text-secondary/70">
                From photography to coding, discover skills taught by passionate peers and teachers.
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-5xl mb-4">👥</div>
              <h3 className="text-xl font-bold text-secondary mb-2">Build Community</h3>
              <p className="text-secondary/70">
                Connect with students and instructors in your school who share your interests.
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-5xl mb-4">🏆</div>
              <h3 className="text-xl font-bold text-secondary mb-2">Track Progress</h3>
              <p className="text-secondary/70">
                Earn badges, track your learning journey, and showcase your new skills.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default HomePage