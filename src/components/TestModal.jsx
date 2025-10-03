import { useState, useEffect } from "react";

const TestModal = ({ test, onClose, onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(test.duration * 60);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize answers array
  useEffect(() => {
    setAnswers(Array(test.questionsData.length).fill(null));
  }, [test]);

  // Timer effect
  useEffect(() => {
    if (timeLeft <= 0 && !isSubmitting) {
      handleSubmit();
      return;
    }
    
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    
    return () => clearInterval(timer);
  }, [timeLeft, isSubmitting]);

  const handleAnswerSelect = (questionIndex, answerIndex) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = answerIndex;
    setAnswers(newAnswers);
  };

  const calculateScore = () => {
    let correctAnswers = 0;
    test.questionsData.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        correctAnswers++;
      }
    });
    return Math.round((correctAnswers / test.questionsData.length) * 100);
  };

  const handleSubmit = () => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    const score = calculateScore();
    setTimeout(() => {
      onComplete(test.id, score);
      onClose();
    }, 1000);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const getProgressPercentage = () => {
    const answered = answers.filter(answer => answer !== null).length;
    return (answered / test.questionsData.length) * 100;
  };

  const currentQuestionData = test.questionsData[currentQuestion];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b bg-gray-50">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{test.title}</h2>
            <p className="text-sm text-gray-600">Difficulty: {test.difficulty}</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <span className="text-red-500 font-medium text-lg">
                {formatTime(timeLeft)}
              </span>
              <div className="text-xs text-gray-500">Time Left</div>
            </div>
            <button 
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded-full transition-colors"
            >
              ✕
            </button>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="bg-blue-50 px-4 py-2 border-b">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Progress: {answers.filter(a => a !== null).length}/{test.questionsData.length} answered</span>
            <span>{Math.round(getProgressPercentage())}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="h-2 rounded-full bg-blue-600 transition-all duration-300"
              style={{ width: `${getProgressPercentage()}%` }}
            ></div>
          </div>
        </div>
        
        {/* Question Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-3xl mx-auto">
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Question {currentQuestion + 1} of {test.questionsData.length}
              </h3>
              <p className="text-gray-700 text-lg leading-relaxed bg-gray-50 p-4 rounded-lg border">
                {currentQuestionData.question}
              </p>
            </div>
            
            <div className="space-y-3">
              {currentQuestionData.options.map((option, index) => (
                <div 
                  key={index}
                  onClick={() => handleAnswerSelect(currentQuestion, index)}
                  className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                    answers[currentQuestion] === index
                      ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`w-6 h-6 rounded-full border flex items-center justify-center mr-3 ${
                      answers[currentQuestion] === index
                        ? 'border-blue-500 bg-blue-500 text-white'
                        : 'border-gray-400'
                    }`}>
                      {answers[currentQuestion] === index && '✓'}
                    </div>
                    <span className="text-gray-700">{option}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Navigation */}
        <div className="flex justify-between items-center p-4 border-t bg-gray-50">
          <button
            onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
            disabled={currentQuestion === 0}
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition-colors"
          >
            Previous
          </button>
          
          {/* Question Indicators */}
          <div className="flex space-x-2 flex-wrap justify-center max-w-md">
            {test.questionsData.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentQuestion(index)}
                className={`w-8 h-8 rounded-full text-sm font-medium transition-all ${
                  index === currentQuestion 
                    ? 'bg-indigo-600 text-white ring-2 ring-indigo-300' 
                    : answers[index] !== null 
                      ? 'bg-green-500 text-white' 
                      : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
          
          {currentQuestion < test.questionsData.length - 1 ? (
            <button
              onClick={() => setCurrentQuestion(prev => prev + 1)}
              disabled={answers[currentQuestion] === null}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-700 transition-colors"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-6 py-2 bg-green-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-green-700 transition-colors flex items-center"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Submitting...
                </>
              ) : (
                'Submit Test'
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestModal;