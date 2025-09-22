// hooks/useUserProgress.js
import { useState, useEffect } from 'react';
import useLocalStorage from './useLocalStorage';

const useUserProgress = () => {
  const [userProgress, setUserProgress] = useLocalStorage('userProgress', {
    solvedProblems: {},
    completedTests: {},
    skillLevels: {
      'Data Structures': 0,
      'Algorithms': 0,
      'Aptitude': 0,
      'Programming': 0,
      'Problem Solving': 0
    }
  });

  const markProblemSolved = (problemId, category) => {
    setUserProgress(prev => ({
      ...prev,
      solvedProblems: {
        ...prev.solvedProblems,
        [problemId]: true
      },
      skillLevels: {
        ...prev.skillLevels,
        [category]: Math.min(100, prev.skillLevels[category] + 2)
      }
    }));
  };

  const completeTest = (testId, score) => {
    setUserProgress(prev => ({
      ...prev,
      completedTests: {
        ...prev.completedTests,
        [testId]: score
      }
    }));
  };

  return {
    userProgress,
    markProblemSolved,
    completeTest
  };
};

export default useUserProgress;
