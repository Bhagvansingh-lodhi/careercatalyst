// components/TestModal.jsx
import { useState, useEffect } from "react";


const TestModal = ({ test, onClose, onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(test.duration * 60); // Convert to seconds

  // Timer effect
  useEffect(() => {
    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }
    
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleAnswerSelect = (questionIndex, answerIndex) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = answerIndex;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    // Calculate score
    const score = Math.floor(Math.random() * 40) + 60; // Random score between 60-100 for demo
    onComplete(test.id, score);
    onClose();
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-11/12 md:w-3/4 lg:w-2/3 h-3/4 overflow-hidden flex flex-col">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">{test.title}</h2>
          <div className="flex items-center">
            <span className="text-red-500 font-medium mr-4">
              Time Left: {formatTime(timeLeft)}
            </span>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              ✕
            </button>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4">
          <div className="mb-4">
            <h3 className="text-lg font-medium">Question {currentQuestion + 1} of 10</h3>
            <p className="text-gray-700 mt-2">
              This is a sample question for demonstration. In a real application, 
              you would load actual questions from your database.
            </p>
          </div>
          
          <div className="space-y-2">
            {[1, 2, 3, 4].map((option, index) => (
              <div key={index} className="flex items-center">
                <input
                  type="radio"
                  id={`option-${index}`}
                  name="answer"
                  checked={answers[currentQuestion] === index}
                  onChange={() => handleAnswerSelect(currentQuestion, index)}
                  className="mr-2"
                />
                <label htmlFor={`option-${index}`} className="text-gray-700">
                  Option {index + 1}
                </label>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-between p-4 border-t">
          <button
            onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
            disabled={currentQuestion === 0}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Previous
          </button>
          
          <div className="flex space-x-2">
            {[...Array(10)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentQuestion(i)}
                className={`w-8 h-8 rounded-full ${
                  i === currentQuestion 
                    ? 'bg-indigo-600 text-white' 
                    : answers[i] !== undefined 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-200'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
          
          {currentQuestion < 9 ? (
            <button
              onClick={() => setCurrentQuestion(prev => prev + 1)}
              className="px-4 py-2 bg-indigo-600 text-white rounded"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-green-600 text-white rounded"
            >
              Submit Test
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestModal;