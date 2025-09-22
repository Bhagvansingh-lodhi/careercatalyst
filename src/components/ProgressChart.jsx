// components/ProgressChart.jsx
const ProgressChart = ({ skillLevels }) => {
  return (
    <div className="w-full h-64">
      <div className="flex items-end justify-between h-48 gap-2 mt-4">
        {Object.entries(skillLevels).map(([skill, value]) => (
          <div key={skill} className="flex flex-col items-center flex-1">
            <div 
              className="w-full bg-indigo-500 rounded-t transition-all duration-500"
              style={{ height: `${value}%` }}
            ></div>
            <div className="text-xs mt-2 text-center text-gray-600 truncate w-full">
              {skill}
            </div>
            <div className="text-xs font-semibold">
              {value}%
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProgressChart