import { useState } from 'react'
import { mockTests } from '../data/mockTestsData'
import useUserProgress from '../hooks/useUserProgress'
import TestModal from '../components/TestModal'

const MockTests = () => {
  const [selectedTest, setSelectedTest] = useState(null)
  const [filter, setFilter] = useState('all') // 'all', 'attempted', 'unattempted'
  const { userProgress, completeTest } = useUserProgress()

  const handleStartTest = (test) => {
    setSelectedTest(test)
  }

  const handleTestComplete = (testId, score) => {
    completeTest(testId, score)
    setSelectedTest(null)
  }

  // Filter tests based on selection
  const filteredTests = mockTests.filter(test => {
    const isAttempted = userProgress.completedTests[test.id] !== undefined
    if (filter === 'attempted') return isAttempted
    if (filter === 'unattempted') return !isAttempted
    return true // 'all'
  })

  return (
    <div className="pt-16 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Simulated Placement Tests</h1>
          <p className="text-gray-600 max-w-3xl">
            Experience real interview conditions with our timed mock tests. Get detailed performance analysis and personalized feedback.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex space-x-4 mb-8">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
              filter === 'all' 
                ? 'bg-blue-100 text-blue-700' 
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            All Tests
          </button>
          <button
            onClick={() => setFilter('attempted')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
              filter === 'attempted' 
                ? 'bg-blue-100 text-blue-700' 
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            Attempted
          </button>
          <button
            onClick={() => setFilter('unattempted')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
              filter === 'unattempted' 
                ? 'bg-blue-100 text-blue-700' 
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            Unattempted
          </button>
        </div>
        
        {/* Tests Grid */}
        {filteredTests.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-200">
            <i className="fas fa-clipboard-list text-4xl text-gray-300 mb-4"></i>
            <h3 className="text-lg font-medium text-gray-700 mb-2">No tests found</h3>
            <p className="text-gray-500">
              {filter === 'attempted' 
                ? "You haven't attempted any tests yet." 
                : filter === 'unattempted'
                  ? "You've attempted all available tests!"
                  : "No tests available at the moment."
              }
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTests.map((test) => {
              const userScore = userProgress.completedTests[test.id]
              const isAttempted = userScore !== undefined
              const scoreColor = userScore >= 80 ? 'text-green-600' : userScore >= 60 ? 'text-yellow-600' : 'text-red-600'
              
              return (
                <div key={test.id} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-shadow duration-300">
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">{test.title}</h3>
                        <span className="inline-block mt-1 text-xs font-medium px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800">
                          {test.difficulty}
                        </span>
                      </div>
                      {isAttempted && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <i className="fas fa-check-circle mr-1"></i> Attempted
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 mb-5">{test.description}</p>
                    
                    <div className="flex justify-between text-sm text-gray-500 mb-5">
                      <span className="flex items-center">
                        <i className="fas fa-question-circle mr-2 text-blue-500"></i>
                        {test.questions} questions
                      </span>
                      <span className="flex items-center">
                        <i className="fas fa-clock mr-2 text-blue-500"></i>
                        {test.duration} minutes
                      </span>
                    </div>
                    
                    {isAttempted && (
                      <div className="mb-5">
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-600">Your performance</span>
                          <span className={`font-semibold ${scoreColor}`}>{userScore}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="h-2 rounded-full transition-all duration-500" 
                            style={{ 
                              width: `${userScore}%`,
                              backgroundColor: userScore >= 80 ? '#10B981' : userScore >= 60 ? '#F59E0B' : '#EF4444'
                            }}
                          ></div>
                        </div>
                      </div>
                    )}
                    
                    <button
                      onClick={() => handleStartTest(test)}
                      className={`w-full py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center ${
                        isAttempted
                          ? 'bg-blue-600 text-white hover:bg-blue-700'
                          : 'bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:from-blue-600 hover:to-blue-800'
                      }`}
                    >
                      <span>{isAttempted ? 'Retake Test' : 'Start Test Now'}</span>
                      <i className="fas fa-arrow-right ml-2 text-xs"></i>
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Test Modal */}
      {selectedTest && (
        <TestModal
          test={selectedTest}
          onClose={() => setSelectedTest(null)}
          onComplete={handleTestComplete}
        />
      )}
    </div>
  )
}

export default MockTests