import Card from '../common/Card'

const SkillList = ({ title, skills }) => {
  return (
    <Card variant="primary">
      <h3 className="text-lg font-bold text-secondary mb-4">{title}</h3>
      <div className="space-y-2">
        {skills.map((skill) => (
          <button
            key={skill.name}
            className="w-full flex items-center justify-between p-3 hover:bg-secondary/5 rounded-lg transition-colors text-left group"
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">{skill.icon}</span>
              <div>
                <span className="text-secondary font-medium block">{skill.name}</span>
                {skill.count && (
                  <span className="text-xs text-secondary/60">{skill.count} sessions</span>
                )}
              </div>
            </div>
            <span className="text-secondary/60 group-hover:text-secondary transition-colors">→</span>
          </button>
        ))}
      </div>
    </Card>
  )
}

export default SkillList