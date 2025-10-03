import useLocalStorage from './useLocalStorage';

const initialProgress = {
  solvedProblems: {},
  completedTests: {},
  skillLevels: {
    'Data Structures': 0,
    'Algorithms': 0,
    'Aptitude': 0,
    'Programming': 0,
    'Problem Solving': 0
  }
};

const useUserProgress = () => {
  const [userProgress, setUserProgress] = useLocalStorage('userProgress', initialProgress);

  const safeSetUserProgress = (updater) => {
    setUserProgress((prev) => {
      // ensure prev never becomes undefined
      const safePrev = prev ?? initialProgress;
      return typeof updater === "function" ? updater(safePrev) : updater;
    });
  };

  const markProblemSolved = (problemId, category) => {
    safeSetUserProgress(prev => ({
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
    safeSetUserProgress(prev => ({
      ...prev,
      completedTests: {
        ...prev.completedTests,
        [testId]: score
      }
    }));
  };

  return {
    userProgress: userProgress ?? initialProgress,
    markProblemSolved,
    completeTest
  };
};

export default useUserProgress;
