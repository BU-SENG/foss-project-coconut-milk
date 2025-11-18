const Footer = () => {
  const footerLinks = [
    { section: 'Platform', links: ['About', 'How it Works', 'Pricing', 'FAQ'] },
    { section: 'Community', links: ['Find Hubs', 'Become Instructor', 'Blog', 'Events'] },
    { section: 'Support', links: ['Help Center', 'Contact', 'Privacy', 'Terms'] }
  ]
  
  return (
    <footer className="bg-secondary text-primary mt-16">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">Skills Exchange</h3>
            <p className="opacity-90 text-sm">
              Empowering communities through shared knowledge and collaborative learning.
            </p>
          </div>
          
          {footerLinks.map((section) => (
            <div key={section.section}>
              <h4 className="font-bold mb-4">{section.section}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="opacity-90 hover:opacity-100 text-sm transition-opacity">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="border-t border-primary/20 pt-8 text-center">
          <p className="opacity-90 text-sm">
            © 2024 Skills Exchange Hub. Open source and community-driven.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer