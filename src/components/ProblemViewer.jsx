import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ProblemViewer = ({ problem, onSolve, onClose }) => {
  const [activeTab, setActiveTab] = useState('problem');
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [userCode, setUserCode] = useState('');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [isSolved, setIsSolved] = useState(false);

  useEffect(() => {
    if (problem && problem.starterCode) {
      setUserCode(problem.starterCode[selectedLanguage] || '// Write your code here');
    }
  }, [problem, selectedLanguage]);

  const handleRunCode = () => {
    if (!userCode.trim()) return;
    
    setIsRunning(true);
    setOutput('Running your code...');
    
    // Simulate code execution
    setTimeout(() => {
      let testResults = '';
      
      if (problem.id === 1) { // Two Sum
        testResults = `Test Case 1: PASSED\nInput: nums = [2,7,11,15], target = 9\nExpected: [0,1]\nGot: [0,1]\n\nTest Case 2: PASSED\nInput: nums = [3,2,4], target = 6\nExpected: [1,2]\nGot: [1,2]\n\nAll test cases passed!`;
      } else if (problem.id === 2) { // Stock Profit
        testResults = `Test Case 1: PASSED\nInput: prices = [7,1,5,3,6,4]\nExpected: 5\nGot: 5\n\nTest Case 2: PASSED\nInput: prices = [7,6,4,3,1]\nExpected: 0\nGot: 0\n\nAll test cases passed!`;
      } else {
        testResults = 'Code executed successfully!\nNote: This is a demo. In a real application, your code would be executed against test cases.';
      }
      
      setOutput(testResults);
      setIsRunning(false);
    }, 2000);
  };

  const handleSubmit = () => {
    setIsRunning(true);
    setOutput('Submitting your solution...');
    
    // Simulate submission and testing
    setTimeout(() => {
      const passed = Math.random() > 0.3; // 70% chance of passing for demo
      
      if (passed) {
        setOutput('✅ All test cases passed! Congratulations!');
        setIsSolved(true);
        if (onSolve) {
          onSolve(problem.id);
        }
      } else {
        setOutput('❌ Some test cases failed. Try again!');
      }
      setIsRunning(false);
    }, 3000);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (!problem) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-xl w-full max-w-6xl h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b bg-gray-50">
          <div className="flex items-center space-x-4">
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded-full transition-colors"
            >
              ✕
            </button>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{problem.title}</h2>
              <div className="flex items-center space-x-2 mt-1">
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getDifficultyColor(problem.difficulty)}`}>
                  {problem.difficulty}
                </span>
                <span className="text-sm text-gray-600">{problem.category}</span>
              </div>
            </div>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={handleRunCode}
              disabled={isRunning}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium disabled:opacity-50 hover:bg-blue-700 transition-colors"
            >
              Run Code
            </button>
            <button
              onClick={handleSubmit}
              disabled={isRunning || isSolved}
              className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium disabled:opacity-50 hover:bg-green-700 transition-colors"
            >
              {isSolved ? 'Solved' : 'Submit'}
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b">
          <div className="flex space-x-1 px-6">
            {['problem', 'code', 'solution'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-3 font-medium text-sm capitalize border-b-2 transition-colors ${
                  activeTab === tab
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden flex">
          <AnimatePresence mode="wait">
            {activeTab === 'problem' && (
              <motion.div
                key="problem"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex-1 overflow-y-auto p-6"
              >
                <div className="max-w-4xl">
                  <p className="text-gray-700 mb-6 leading-relaxed">{problem.description}</p>
                  
                  <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <h3 className="font-semibold text-gray-900 mb-3">Problem Statement</h3>
                    <pre className="text-gray-700 whitespace-pre-wrap text-sm leading-relaxed">
                      {problem.problemStatement}
                    </pre>
                  </div>

                  {problem.examples && problem.examples.length > 0 && (
                    <div className="mb-6">
                      <h3 className="font-semibold text-gray-900 mb-3">Examples</h3>
                      {problem.examples.map((example, index) => (
                        <div key={index} className="bg-gray-50 p-4 rounded-lg mb-3">
                          <div className="mb-2">
                            <strong>Input:</strong> 
                            <code className="ml-2 bg-gray-200 px-2 py-1 rounded text-sm">{example.input}</code>
                          </div>
                          <div className="mb-2">
                            <strong>Output:</strong> 
                            <code className="ml-2 bg-gray-200 px-2 py-1 rounded text-sm">{example.output}</code>
                          </div>
                          {example.explanation && (
                            <div>
                              <strong>Explanation:</strong> 
                              <span className="ml-2 text-gray-700">{example.explanation}</span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {problem.constraints && (
                    <div className="mb-6">
                      <h3 className="font-semibold text-gray-900 mb-3">Constraints</h3>
                      <ul className="list-disc list-inside space-y-1 text-gray-700">
                        {problem.constraints.map((constraint, index) => (
                          <li key={index} className="text-sm">{constraint}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {activeTab === 'code' && (
              <motion.div
                key="code"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex-1 flex flex-col"
              >
                {/* Language Selector */}
                <div className="flex justify-between items-center p-4 border-b bg-gray-50">
                  <div className="flex space-x-2">
                    {['javascript', 'python', 'java'].map((lang) => (
                      <button
                        key={lang}
                        onClick={() => setSelectedLanguage(lang)}
                        className={`px-3 py-1 rounded text-sm font-medium capitalize ${
                          selectedLanguage === lang
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                  <div className="text-sm text-gray-600">
                    Language: {selectedLanguage}
                  </div>
                </div>

                {/* Code Editor Area */}
                <div className="flex-1 overflow-hidden">
                  <div className="h-full border">
                    <textarea
                      value={userCode}
                      onChange={(e) => setUserCode(e.target.value)}
                      className="w-full h-full font-mono text-sm p-4 resize-none focus:outline-none bg-gray-50"
                      spellCheck="false"
                      placeholder="Write your code here..."
                    />
                  </div>
                </div>

                {/* Output */}
                <div className="border-t h-48 flex flex-col">
                  <div className="p-3 border-b bg-gray-50">
                    <h3 className="font-semibold text-gray-900">Output</h3>
                  </div>
                  <div className="flex-1 p-4 overflow-y-auto bg-gray-900 text-green-400">
                    <pre className="text-sm whitespace-pre-wrap font-mono">
                      {output || 'Run your code to see output here...'}
                    </pre>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'solution' && (
              <motion.div
                key="solution"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex-1 overflow-y-auto p-6"
              >
                <div className="max-w-4xl">
                  <h3 className="font-semibold text-gray-900 mb-4">Solution</h3>
                  
                  {problem.solution ? (
                    <div className="space-y-6">
                      {typeof problem.solution === 'string' ? (
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <pre className="text-gray-700 whitespace-pre-wrap text-sm leading-relaxed">
                            {problem.solution}
                          </pre>
                        </div>
                      ) : (
                        Object.entries(problem.solution).map(([lang, code]) => (
                          <div key={lang}>
                            <h4 className="font-medium text-gray-900 mb-2 capitalize">{lang}</h4>
                            <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                              <pre className="text-green-400 text-sm whitespace-pre-wrap font-mono">
                                {code}
                              </pre>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      Solution will be available after you solve the problem.
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProblemViewer;