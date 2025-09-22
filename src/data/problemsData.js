// data/problemsData.js
export const problems = {
  // Arrays problems
  101: [
    {
      id: 10101,
      title: "Two Sum",
      difficulty: "Easy",
      description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
      example: "Input: nums = [2,7,11,15], target = 9\nOutput: [0,1]",
      solution: "Use a hash map to store each number's index as you iterate through the array."
    },
    {
      id: 10102,
      title: "Best Time to Buy and Sell Stock",
      difficulty: "Easy",
      description: "You are given an array prices where prices[i] is the price of a given stock on the ith day. You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.",
      example: "Input: prices = [7,1,5,3,6,4]\nOutput: 5",
      solution: "Keep track of the minimum price and update the maximum profit at each step."
    },
    // More problems...
  ],
  // Linked List problems
  102: [
    {
      id: 10201,
      title: "Reverse Linked List",
      difficulty: "Easy",
      description: "Given the head of a singly linked list, reverse the list, and return the reversed list.",
      example: "Input: head = [1,2,3,4,5]\nOutput: [5,4,3,2,1]",
      solution: "Use iterative approach with three pointers: previous, current, and next."
    },
    // More problems...
  ],
  // More categories...
};

export const aptitudeProblems = {
  201: [
    {
      id: 20101,
      title: "Percentage Calculation",
      difficulty: "Easy",
      description: "If the price of a product is first increased by 20% and then decreased by 10%, what is the net percentage change?",
      options: ["8% increase", "8% decrease", "10% increase", "10% decrease"],
      answer: 0,
      solution: "Use successive percentage change formula: a + b + ab/100 = 20 - 10 - (20*10)/100 = 8% increase"
    },
    // More problems...
  ],
  // More aptitude categories...
};