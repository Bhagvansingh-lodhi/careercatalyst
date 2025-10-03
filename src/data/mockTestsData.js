export const mockTests = [
  {
    id: 1,
    title: 'DSA Mock Test - Easy',
    description: 'Basic data structures and algorithms questions to build your foundation.',
    duration: 30,
    questions: 5,
    difficulty: 'Easy',
    questionsData: [
      {
        id: 1,
        question: "What is the time complexity of accessing an element in an array by index?",
        options: [
          "O(1)",
          "O(n)",
          "O(log n)",
          "O(n²)"
        ],
        correctAnswer: 0
      },
      {
        id: 2,
        question: "Which data structure follows the LIFO (Last In First Out) principle?",
        options: [
          "Queue",
          "Stack",
          "Linked List",
          "Tree"
        ],
        correctAnswer: 1
      },
      {
        id: 3,
        question: "What is the worst-case time complexity of Quick Sort?",
        options: [
          "O(n log n)",
          "O(n)",
          "O(n²)",
          "O(log n)"
        ],
        correctAnswer: 2
      },
      {
        id: 4,
        question: "Which of the following is NOT a linear data structure?",
        options: [
          "Array",
          "Linked List",
          "Stack",
          "Binary Tree"
        ],
        correctAnswer: 3
      },
      {
        id: 5,
        question: "What does DFS stand for in graph traversal?",
        options: [
          "Depth First Search",
          "Breadth First Search",
          "Dynamic First Search",
          "Direct First Search"
        ],
        correctAnswer: 0
      }
    ]
  },
  {
    id: 2,
    title: 'DSA Mock Test - Medium',
    description: 'Intermediate level problems to test your problem-solving skills.',
    duration: 45,
    questions: 5,
    difficulty: 'Medium',
    questionsData: [
      {
        id: 1,
        question: "What is the time complexity of binary search on a sorted array?",
        options: [
          "O(1)",
          "O(n)",
          "O(log n)",
          "O(n log n)"
        ],
        correctAnswer: 2
      },
      {
        id: 2,
        question: "Which algorithm uses divide and conquer strategy?",
        options: [
          "Bubble Sort",
          "Merge Sort",
          "Insertion Sort",
          "Selection Sort"
        ],
        correctAnswer: 1
      },
      {
        id: 3,
        question: "What is the space complexity of recursive Fibonacci without memoization?",
        options: [
          "O(1)",
          "O(n)",
          "O(log n)",
          "O(2^n)"
        ],
        correctAnswer: 1
      },
      {
        id: 4,
        question: "Which data structure is best for implementing a LRU Cache?",
        options: [
          "Array",
          "Linked List",
          "Hash Map + Doubly Linked List",
          "Stack"
        ],
        correctAnswer: 2
      },
      {
        id: 5,
        question: "What is the height of a balanced binary tree with n nodes?",
        options: [
          "O(1)",
          "O(log n)",
          "O(n)",
          "O(n log n)"
        ],
        correctAnswer: 1
      }
    ]
  },
  {
    id: 3,
    title: 'DSA Mock Test - Hard',
    description: 'Advanced problems similar to those asked in top tech companies.',
    duration: 60,
    questions: 5,
    difficulty: 'Hard',
    questionsData: [
      {
        id: 1,
        question: "What is the time complexity of Dijkstra's algorithm with Fibonacci heap?",
        options: [
          "O(V + E)",
          "O(V log V + E)",
          "O(V²)",
          "O(E log V)"
        ],
        correctAnswer: 1
      },
      {
        id: 2,
        question: "Which problem can be solved using dynamic programming?",
        options: [
          "Quick Sort",
          "Merge Sort",
          "0/1 Knapsack",
          "Binary Search"
        ],
        correctAnswer: 2
      },
      {
        id: 3,
        question: "What is the time complexity of detecting a cycle in a directed graph?",
        options: [
          "O(V)",
          "O(V + E)",
          "O(V²)",
          "O(E)"
        ],
        correctAnswer: 1
      },
      {
        id: 4,
        question: "Which algorithm has the best average-case time complexity for sorting?",
        options: [
          "Bubble Sort",
          "Quick Sort",
          "Insertion Sort",
          "Selection Sort"
        ],
        correctAnswer: 1
      },
      {
        id: 5,
        question: "What is the space complexity of in-order traversal of a binary tree?",
        options: [
          "O(1)",
          "O(log n)",
          "O(n)",
          "O(n log n)"
        ],
        correctAnswer: 1
      }
    ]
  },
  {
    id: 4,
    title: 'Aptitude Test - Complete',
    description: 'Full-length aptitude test covering quantitative, logical, and verbal sections.',
    duration: 60,
    questions: 5,
    difficulty: 'Medium',
    questionsData: [
      {
        id: 1,
        question: "If a train travels 300 km in 5 hours, what is its average speed?",
        options: [
          "50 km/h",
          "60 km/h",
          "70 km/h",
          "80 km/h"
        ],
        correctAnswer: 1
      },
      {
        id: 2,
        question: "What comes next in the sequence: 2, 6, 12, 20, 30, ?",
        options: [
          "40",
          "42",
          "44",
          "46"
        ],
        correctAnswer: 1
      },
      {
        id: 3,
        question: "If x + y = 15 and x - y = 5, what is the value of x?",
        options: [
          "5",
          "10",
          "15",
          "20"
        ],
        correctAnswer: 1
      },
      {
        id: 4,
        question: "Which number is different from others?",
        options: [
          "121",
          "144",
          "169",
          "196"
        ],
        correctAnswer: 0
      },
      {
        id: 5,
        question: "A shirt costs $40 after 20% discount. What was the original price?",
        options: [
          "$45",
          "$48",
          "$50",
          "$52"
        ],
        correctAnswer: 2
      }
    ]
  }
];