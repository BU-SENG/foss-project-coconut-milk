const AuthLayout = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen bg-primary flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary rounded-full mb-4">
            <span className="text-3xl">🎓</span>
          </div>
          <h1 className="text-3xl font-bold text-secondary mb-2">
            Skills Exchange Hub
          </h1>
          <p className="text-secondary/70">
            Learn and share skills in your community
          </p>
        </div>

        {/* Auth Card */}
        <div className="bg-primary border-2 border-secondary/20 rounded-2xl shadow-xl p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-secondary mb-2">{title}</h2>
            {subtitle && (
              <p className="text-secondary/70 text-sm">{subtitle}</p>
            )}
          </div>
          
          {children}
        </div>

        {/* Footer */}
        <p className="text-center text-secondary/60 text-sm mt-6">
          © 2024 Skills Exchange Hub. Open source and community-driven.
        </p>
      </div>
    </div>
  )
}

export default AuthLayout