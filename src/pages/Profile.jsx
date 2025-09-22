import { useState } from 'react'
import { userData } from '../data/userData'
import useUserProgress from '../hooks/useUserProgress'
import ProgressChart from '../components/ProgressChart'
import SkillRadarChart from '../components/SkillRadarChart'

const Profile = () => {
  const { userProgress } = useUserProgress()
  const [activeTab, setActiveTab] = useState('overview')

  const solvedProblemsCount = Object.keys(userProgress.solvedProblems).length
  const completedTestsCount = Object.keys(userProgress.completedTests).length
  const averageScore = completedTestsCount > 0 
    ? Math.round(Object.values(userProgress.completedTests).reduce((a, b) => a + b, 0) / completedTestsCount)
    : 0

  // Sample recent activity data (replace with actual data from your backend)
  const recentActivities = [
    {
      id: 1,
      type: 'problem',
      title: 'Solved 5 problems in Data Structures',
      timestamp: '2 hours ago',
      icon: 'check-circle',
      color: 'blue'
    },
    {
      id: 2,
      type: 'test',
      title: 'Completed Aptitude Mock Test with 85% score',
      timestamp: '1 day ago',
      icon: 'chart-bar',
      color: 'green'
    },
    {
      id: 3,
      type: 'resource',
      title: 'Viewed interview preparation resources',
      timestamp: '2 days ago',
      icon: 'book-open',
      color: 'purple'
    }
  ]

  return (
    <div className="pt-16 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl shadow-lg p-6 text-white mb-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mb-4 md:mb-0 md:mr-6">
              <i className="fas fa-user-graduate text-4xl"></i>
            </div>
            <div className="text-center md:text-left flex-1">
              <h1 className="text-3xl font-bold mb-2">{userData.name}</h1>
              <p className="text-blue-100">{userData.college} • {userData.branch} • {userData.graduationYear}</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4">
                <div className="bg-white/20 rounded-lg px-4 py-2">
                  <span className="block text-2xl font-bold">{solvedProblemsCount}</span>
                  <span className="text-sm">Problems Solved</span>
                </div>
                <div className="bg-white/20 rounded-lg px-4 py-2">
                  <span className="block text-2xl font-bold">{completedTestsCount}</span>
                  <span className="text-sm">Tests Completed</span>
                </div>
                <div className="bg-white/20 rounded-lg px-4 py-2">
                  <span className="block text-2xl font-bold">{averageScore}%</span>
                  <span className="text-sm">Avg. Score</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="bg-white rounded-xl shadow-sm p-2 mb-8 border border-gray-200">
          <nav className="flex space-x-2 overflow-x-auto">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 whitespace-nowrap ${
                activeTab === 'overview' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <i className="fas fa-chart-pie mr-2"></i>Overview
            </button>
            <button
              onClick={() => setActiveTab('skills')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 whitespace-nowrap ${
                activeTab === 'skills' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <i className="fas fa-code mr-2"></i>Skills
            </button>
            <button
              onClick={() => setActiveTab('personal')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 whitespace-nowrap ${
                activeTab === 'personal' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <i className="fas fa-user mr-2"></i>Personal Info
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Progress Overview */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <i className="fas fa-chart-line mr-2 text-blue-600"></i>
                Progress Overview
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-5 rounded-xl text-center">
                  <div className="text-3xl font-bold text-blue-700 mb-2">{solvedProblemsCount}</div>
                  <p className="text-blue-600 font-medium">Problems Solved</p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-5 rounded-xl text-center">
                  <div className="text-3xl font-bold text-green-700 mb-2">{completedTestsCount}</div>
                  <p className="text-green-600 font-medium">Mock Tests Taken</p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-5 rounded-xl text-center">
                  <div className="text-3xl font-bold text-purple-700 mb-2">{averageScore}%</div>
                  <p className="text-purple-600 font-medium">Average Score</p>
                </div>
              </div>
              <div className="h-80">
                <ProgressChart skillLevels={userProgress.skillLevels} />
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <i className="fas fa-history mr-2 text-blue-600"></i>
                Recent Activity
              </h2>
              <div className="space-y-4">
                {recentActivities.length > 0 ? (
                  recentActivities.map(activity => (
                    <div key={activity.id} className={`flex items-center p-4 bg-${activity.color}-50 rounded-lg`}>
                      <div className={`w-10 h-10 bg-${activity.color}-100 rounded-full flex items-center justify-center mr-4`}>
                        <i className={`fas fa-${activity.icon} text-${activity.color}-600`}></i>
                      </div>
                      <div>
                        <p className="font-medium">{activity.title}</p>
                        <p className="text-sm text-gray-600">{activity.timestamp}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600 text-center py-4">No recent activity yet. Start practicing to see your progress here!</p>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'skills' && (
          <div className="space-y-6">
            {/* Skills Radar Chart */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <i className="fas fa-chart-radar mr-2 text-blue-600"></i>
                Skills Assessment
              </h2>
              <div className="h-96">
                <SkillRadarChart skillLevels={userProgress.skillLevels} />
              </div>
            </div>

            {/* Skills Progress */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <i className="fas fa-tasks mr-2 text-blue-600"></i>
                Detailed Skills Progress
              </h2>
              <div className="space-y-6">
                {Object.entries(userProgress.skillLevels).map(([skill, proficiency]) => (
                  <div key={skill}>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-700 font-medium">{skill}</span>
                      <span className="text-gray-700">{proficiency}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="h-2.5 rounded-full transition-all duration-500" 
                        style={{ 
                          width: `${proficiency}%`,
                          backgroundColor: proficiency >= 80 ? '#10B981' : proficiency >= 60 ? '#F59E0B' : '#EF4444'
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'personal' && (
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <i className="fas fa-user-circle mr-2 text-blue-600"></i>
              Personal Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-600 text-sm mb-1">Full Name</p>
                <p className="text-gray-900 font-medium">{userData.name}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-600 text-sm mb-1">Email Address</p>
                <p className="text-gray-900 font-medium">{userData.email}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-600 text-sm mb-1">College/University</p>
                <p className="text-gray-900 font-medium">{userData.college}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-600 text-sm mb-1">Branch/Department</p>
                <p className="text-gray-900 font-medium">{userData.branch}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-600 text-sm mb-1">Graduation Year</p>
                <p className="text-gray-900 font-medium">{userData.graduationYear}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-600 text-sm mb-1">Member Since</p>
                <p className="text-gray-900 font-medium">January 2023</p>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Actions</h3>
              <div className="flex flex-wrap gap-3">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200">
                  Edit Profile
                </button>
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200">
                  Change Password
                </button>
                <button className="px-4 py-2 border border-red-300 text-red-600 rounded-lg font-medium hover:bg-red-50 transition-colors duration-200">
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Profile