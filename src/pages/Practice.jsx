import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { practiceCategories } from '../data/practiceData'
import { problems } from '../data/problemsData'
import useUserProgress from "../hooks/useUserProgress";
import ProblemViewer from '../components/ProblemViewer'

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
}

const slideInFromRight = {
  hidden: { opacity: 0, x: 100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
}

const slideInFromLeft = {
  hidden: { opacity: 0, x: -100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
}

const scaleUp = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
}

const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
}

const Practice = () => {
  const [selectedCategory, setSelectedCategory] = useState(practiceCategories[0])
  const [selectedTopic, setSelectedTopic] = useState(null)
  const [selectedProblem, setSelectedProblem] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const { userProgress, markProblemSolved } = useUserProgress()

  const handleTopicSelect = (topic) => {
    setSelectedTopic(topic)
  }

  const handleProblemSelect = (problem) => {
    setSelectedProblem(problem)
  }

  const handleProblemSolved = (problemId) => {
    markProblemSolved(problemId, selectedCategory.title)
  }

  const getSolvedCount = (topicId) => {
    const topicProblems = problems[topicId] || []
    return topicProblems.filter(p => userProgress.solvedProblems[p.id]).length
  }

  // Filter topics based on search query
  const filteredTopics = selectedCategory.topics.filter(topic => 
    topic.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="pt-16 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Practice & Master Skills</h1>
          <p className="text-gray-600 max-w-3xl">
            Build your expertise with our curated collection of practice problems. Track your progress and focus on areas that need improvement.
          </p>
        </motion.div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Category Selection */}
          <motion.div 
            className="lg:w-1/4"
            initial="hidden"
            animate="visible"
            variants={slideInFromLeft}
          >
            <div className="bg-white rounded-xl shadow-sm p-5 sticky top-24 border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Categories</h2>
              <div className="space-y-2">
                {practiceCategories.map((category) => (
                  <motion.button
                    key={category.id}
                    onClick={() => {
                      setSelectedCategory(category)
                      setSelectedTopic(null)
                      setSearchQuery('')
                    }}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 flex items-center ${
                      selectedCategory.id === category.id
                        ? 'bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border border-blue-200 shadow-sm'
                        : 'hover:bg-gray-50 text-gray-700 border border-transparent'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    variants={itemVariants}
                  >
                    <span className="text-xl mr-3">{category.icon}</span>
                    <span className="font-medium">{category.title}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
          
          {/* Topics and Problems */}
          <motion.div 
            className="lg:w-3/4"
            initial="hidden"
            animate="visible"
            variants={slideInFromRight}
          >
            <AnimatePresence mode="wait">
              {!selectedTopic ? (
                /* Topics in Selected Category */
                <motion.div 
                  key="topics-view"
                  className="bg-white rounded-xl shadow-sm p-6 border border-gray-200"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                    <motion.div 
                      className="flex items-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <span className="text-3xl mr-3 text-blue-600">{selectedCategory.icon}</span>
                      <div>
                        <h2 className="text-xl font-semibold text-gray-900">{selectedCategory.title}</h2>
                        <p className="text-gray-600 text-sm">{selectedCategory.description}</p>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      className="relative"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <i className="fas fa-search text-gray-400"></i>
                      </div>
                      <input
                        type="text"
                        placeholder="Search topics..."
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full sm:w-64"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </motion.div>
                  </div>
                  
                  {filteredTopics.length === 0 ? (
                    <motion.div 
                      className="text-center py-12"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      <i className="fas fa-search text-4xl text-gray-300 mb-4"></i>
                      <p className="text-gray-500">No topics found matching your search.</p>
                    </motion.div>
                  ) : (
                    <motion.div 
                      className="grid grid-cols-1 md:grid-cols-2 gap-5"
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      {filteredTopics.map((topic) => {
                        const solvedCount = getSolvedCount(topic.id)
                        const totalCount = problems[topic.id]?.length || 0
                        const progressPercentage = totalCount > 0 ? (solvedCount / totalCount) * 100 : 0
                        
                        return (
                          <motion.div 
                            key={topic.id} 
                            className="border border-gray-200 rounded-xl p-5 hover:border-blue-300 transition-all duration-200 cursor-pointer hover:shadow-md group"
                            onClick={() => handleTopicSelect(topic)}
                            variants={itemVariants}
                            whileHover={{ y: -5, scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <div className="flex justify-between items-start mb-3">
                              <h3 className="font-semibold text-gray-900">{topic.title}</h3>
                              <motion.span 
                                className={`text-xs font-medium px-2 py-1 rounded-full ${
                                  progressPercentage === 100 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-blue-100 text-blue-800'
                                }`}
                                initial={{ scale: 0.8 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.2 }}
                              >
                                {solvedCount}/{totalCount}
                              </motion.span>
                            </div>
                            
                            <p className="text-gray-600 text-sm mb-4">{topic.description}</p>
                            
                            <div className="mb-4">
                              <div className="flex justify-between text-xs text-gray-500 mb-1">
                                <span>Progress</span>
                                <span>{Math.round(progressPercentage)}%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                                <motion.div 
                                  className="h-2 rounded-full" 
                                  initial={{ width: 0 }}
                                  animate={{ width: `${progressPercentage}%` }}
                                  transition={{ duration: 1, ease: "easeOut" }}
                                  style={{ 
                                    backgroundColor: progressPercentage === 100 ? '#10B981' : '#3B82F6'
                                  }}
                                ></motion.div>
                              </div>
                            </div>
                            
                            <motion.button 
                              className="w-full bg-blue-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center"
                              whileHover={{ scale: 1.03 }}
                              whileTap={{ scale: 0.97 }}
                            >
                              <span>Practice Now</span>
                              <i className="fas fa-arrow-right ml-2 text-xs"></i>
                            </motion.button>
                          </motion.div>
                        )
                      })}
                    </motion.div>
                  )}
                </motion.div>
              ) : (
                /* Problems in Selected Topic */
                <motion.div 
                  key="problems-view"
                  className="bg-white rounded-xl shadow-sm p-6 border border-gray-200"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center mb-6">
                    <motion.button 
                      onClick={() => setSelectedTopic(null)}
                      className="flex items-center text-blue-600 hover:text-blue-800 mr-4"
                      whileHover={{ x: -3 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <i className="fas fa-arrow-left mr-2"></i> Back
                    </motion.button>
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">{selectedTopic.title}</h2>
                      <div className="flex items-center mt-1">
                        <div className="w-48 bg-gray-200 rounded-full h-2 mr-3 overflow-hidden">
                          <motion.div 
                            className="h-2 rounded-full bg-blue-600" 
                            initial={{ width: 0 }}
                            animate={{ width: `${(getSolvedCount(selectedTopic.id) / (problems[selectedTopic.id]?.length || 1)) * 100}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                          ></motion.div>
                        </div>
                        <span className="text-sm text-gray-600">
                          {getSolvedCount(selectedTopic.id)} of {problems[selectedTopic.id]?.length || 0} solved
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="overflow-hidden rounded-lg border border-gray-200 shadow-xs">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Problem
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Difficulty
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        <AnimatePresence>
                          {(problems[selectedTopic.id] || []).map((problem, index) => (
                            <motion.tr 
                              key={problem.id} 
                              className="hover:bg-gray-50 transition-colors duration-150"
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.05 }}
                              exit={{ opacity: 0 }}
                            >
                              <td className="px-6 py-4 whitespace-nowrap">
                                {userProgress.solvedProblems[problem.id] ? (
                                  <motion.span 
                                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: "spring", stiffness: 500 }}
                                  >
                                    <i className="fas fa-check-circle mr-1"></i> Solved
                                  </motion.span>
                                ) : (
                                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                    <i className="fas fa-circle mr-1 text-xs"></i> Unsolved
                                  </span>
                                )}
                              </td>
                              <td className="px-6 py-4">
                                <div className="text-sm font-medium text-gray-900">{problem.title}</div>
                                <div className="text-sm text-gray-500 truncate max-w-xs">{problem.description}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <motion.span 
                                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                    problem.difficulty === 'Easy' 
                                      ? 'bg-green-100 text-green-800'
                                      : problem.difficulty === 'Medium'
                                        ? 'bg-yellow-100 text-yellow-800'
                                        : 'bg-red-100 text-red-800'
                                  }`}
                                  whileHover={{ scale: 1.05 }}
                                >
                                  {problem.difficulty}
                                </motion.span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <motion.button
                                  onClick={() => handleProblemSelect(problem)}
                                  className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
                                  whileHover={{ x: 5 }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  <span>Solve</span>
                                  <i className="fas fa-arrow-right ml-1 text-xs"></i>
                                </motion.button>
                              </td>
                            </motion.tr>
                          ))}
                        </AnimatePresence>
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* Problem Viewer Modal */}
      <AnimatePresence>
        {selectedProblem && (
          <ProblemViewer
            problem={selectedProblem}
            onSolve={handleProblemSolved}
            onClose={() => setSelectedProblem(null)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default Practice