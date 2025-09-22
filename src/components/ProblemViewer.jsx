// components/ProblemViewer.jsx
import { useState } from 'react';

const ProblemViewer = ({ problem, onSolve, onClose }) => {
  const [showSolution, setShowSolution] = useState(false);
  const [userCode, setUserCode] = useState('// Write your solution here\nfunction solve() {\n  \n}');

  const handleSolve = () => {
    onSolve(problem.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl h-3/4 overflow-hidden flex flex-col">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">{problem.title} - {problem.difficulty}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <h3 className="text-lg font-medium mb-2">Problem Description</h3>
            <div className="whitespace-pre-line text-gray-700 mb-4">
              {problem.description}
            </div>
            
            <h3 className="text-lg font-medium mb-2">Example</h3>
            <div className="bg-gray-100 p-3 rounded whitespace-pre-line font-mono text-sm">
              {problem.example}
            </div>
            
            {!showSolution ? (
              <button
                onClick={() => setShowSolution(true)}
                className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded"
              >
                Show Solution
              </button>
            ) : (
              <div className="mt-4">
                <h3 className="text-lg font-medium mb-2">Solution</h3>
                <div className="bg-gray-100 p-3 rounded whitespace-pre-line">
                  {problem.solution}
                </div>
              </div>
            )}
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-2">Code Editor</h3>
            <textarea
              value={userCode}
              onChange={(e) => setUserCode(e.target.value)}
              className="w-full h-48 font-mono text-sm p-2 border rounded"
              spellCheck="false"
            />
            
            <div className="mt-4 flex space-x-2">
              <button
                onClick={handleSolve}
                className="px-4 py-2 bg-green-600 text-white rounded"
              >
                Mark as Solved
              </button>
              <button
                onClick={() => setUserCode('// Write your solution here\nfunction solve() {\n  \n}')}
                className="px-4 py-2 bg-gray-200 rounded"
              >
                Reset Code
              </button>
              <button
                onClick={() => alert('Code executed successfully!')}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Run Code
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemViewer;