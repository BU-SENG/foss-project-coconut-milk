import { useState } from 'react'

const Navigation = () => {
  const [activeTab, setActiveTab] = useState('hubs')
  
  const tabs = [
    { id: 'hubs', label: 'Hubs', icon: '🏫' },
    { id: 'sessions', label: 'Sessions', icon: '📚' },
    { id: 'instructors', label: 'Instructors', icon: '👨‍🏫' },
    { id: 'my-learning', label: 'My Learning', icon: '🎓' }
  ]
  
  return (
    <nav className="bg-primary border-b border-secondary/20 sticky top-0 z-10">
      <div className="container mx-auto px-6">
        <div className="flex gap-2 overflow-x-auto py-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                px-6 py-2 rounded-lg font-medium transition-all duration-200
                flex items-center gap-2 whitespace-nowrap
                ${activeTab === tab.id
                  ? 'bg-secondary text-primary shadow-md'
                  : 'text-secondary hover:bg-secondary/10'
                }
              `}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}

export default Navigation