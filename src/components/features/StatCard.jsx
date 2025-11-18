import Card from '../common/Card'

const StatCard = ({ title, stats }) => {
  return (
    <Card variant="accent">
      <h3 className="text-lg font-bold text-secondary mb-4">{title}</h3>
      <div className="space-y-4">
        {stats.map((stat, index) => (
          <div key={index} className="flex justify-between items-center">
            <span className="text-secondary/80 text-sm">{stat.label}</span>
            <div className="flex items-center gap-2">
              {stat.icon && <span className="text-lg">{stat.icon}</span>}
              <span className="font-bold text-secondary text-2xl">{stat.value}</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}

export default StatCard