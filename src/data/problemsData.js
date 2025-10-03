export const problems = {
  // Arrays problems
  'arrays': [
    {
      id: 1,
      title: 'Two Sum',
      description: 'Find two numbers that add up to a specific target',
      difficulty: 'Easy',
      category: 'Data Structures',
      problemStatement: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.`,
      constraints: [
        '2 <= nums.length <= 10^4',
        '-10^9 <= nums[i] <= 10^9',
        '-10^9 <= target <= 10^9',
        'Only one valid answer exists.'
      ],
      examples: [
        {
          input: 'nums = [2,7,11,15], target = 9',
          output: '[0,1]',
          explanation: 'Because nums[0] + nums[1] == 9'
        }
      ],
      starterCode: {
        javascript: `function twoSum(nums, target) {
    // Write your code here
    
}`,
        python: `def two_sum(nums, target):
    # Write your code here
    pass`,
        java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Write your code here
        
    }
}`
      },
      solution: {
        javascript: `function twoSum(nums, target) {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        map.set(nums[i], i);
    }
    return [];
}`,
        python: `def two_sum(nums, target):
    num_map = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in num_map:
            return [num_map[complement], i]
        num_map[num] = i
    return []`,
        java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (map.containsKey(complement)) {
                return new int[] { map.get(complement), i };
            }
            map.put(nums[i], i);
        }
        return new int[0];
    }
}`
      }
    }
  ],

  // Strings problems
  'strings': [
    {
      id: 2,
      title: 'Reverse String',
      description: 'Reverse a string in-place',
      difficulty: 'Easy',
      category: 'Data Structures',
      problemStatement: `Write a function that reverses a string. The input string is given as an array of characters s. You must do this by modifying the input array in-place with O(1) extra memory.`,
      constraints: [
        '1 <= s.length <= 10^5',
        's[i] is a printable ascii character'
      ],
      examples: [
        {
          input: 's = ["h","e","l","l","o"]',
          output: '["o","l","l","e","h"]',
          explanation: 'String reversed in-place'
        }
      ],
      starterCode: {
        javascript: `function reverseString(s) {
    // Write your code here
    
}`,
        python: `def reverse_string(s):
    # Write your code here
    pass`,
        java: `class Solution {
    public void reverseString(char[] s) {
        // Write your code here
        
    }
}`
      },
      solution: {
        javascript: `function reverseString(s) {
    let left = 0, right = s.length - 1;
    while (left < right) {
        [s[left], s[right]] = [s[right], s[left]];
        left++;
        right--;
    }
    return s;
}`,
        python: `def reverse_string(s):
    left, right = 0, len(s) - 1
    while left < right:
        s[left], s[right] = s[right], s[left]
        left += 1
        right -= 1
    return s`,
        java: `class Solution {
    public void reverseString(char[] s) {
        int left = 0, right = s.length - 1;
        while (left < right) {
            char temp = s[left];
            s[left] = s[right];
            s[right] = temp;
            left++;
            right--;
        }
    }
}`
      }
    }
  ],

  // Linked Lists problems
  'linked-lists': [
    {
      id: 3,
      title: 'Reverse Linked List',
      description: 'Reverse a singly linked list',
      difficulty: 'Easy',
      category: 'Data Structures',
      problemStatement: `Given the head of a singly linked list, reverse the list, and return the reversed list.`,
      constraints: [
        'The number of nodes in the list is the range [0, 5000]',
        '-5000 <= Node.val <= 5000'
      ],
      examples: [
        {
          input: 'head = [1,2,3,4,5]',
          output: '[5,4,3,2,1]',
          explanation: 'The list is reversed'
        }
      ],
      starterCode: {
        javascript: `function reverseList(head) {
    // Write your code here
    
}`,
        python: `def reverse_list(head):
    # Write your code here
    pass`,
        java: `class Solution {
    public ListNode reverseList(ListNode head) {
        // Write your code here
        
    }
}`
      },
      solution: {
        javascript: `function reverseList(head) {
    let prev = null;
    let current = head;
    
    while (current !== null) {
        const nextTemp = current.next;
        current.next = prev;
        prev = current;
        current = nextTemp;
    }
    
    return prev;
}`,
        python: `def reverse_list(head):
    prev = None
    current = head
    
    while current:
        next_temp = current.next
        current.next = prev
        prev = current
        current = next_temp
    
    return prev`,
        java: `class Solution {
    public ListNode reverseList(ListNode head) {
        ListNode prev = null;
        ListNode current = head;
        
        while (current != null) {
            ListNode nextTemp = current.next;
            current.next = prev;
            prev = current;
            current = nextTemp;
        }
        
        return prev;
    }
}`
      }
    }
  ],

  // Stacks problems
  'stacks': [
    {
      id: 4,
      title: 'Valid Parentheses',
      description: 'Check if parentheses in string are valid',
      difficulty: 'Easy',
      category: 'Data Structures',
      problemStatement: `Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.`,
      constraints: [
        '1 <= s.length <= 10^4',
        's consists of parentheses only'
      ],
      examples: [
        {
          input: 's = "()[]{}"',
          output: 'true',
          explanation: 'All brackets are properly closed'
        }
      ],
      starterCode: {
        javascript: `function isValid(s) {
    // Write your code here
    
}`,
        python: `def is_valid(s):
    # Write your code here
    pass`,
        java: `class Solution {
    public boolean isValid(String s) {
        // Write your code here
        
    }
}`
      },
      solution: {
        javascript: `function isValid(s) {
    const stack = [];
    const map = {
        ')': '(',
        '}': '{',
        ']': '['
    };
    
    for (let char of s) {
        if (char === '(' || char === '{' || char === '[') {
            stack.push(char);
        } else {
            if (stack.length === 0 || stack.pop() !== map[char]) {
                return false;
            }
        }
    }
    
    return stack.length === 0;
}`,
        python: `def is_valid(s):
    stack = []
    mapping = {')': '(', '}': '{', ']': '['}
    
    for char in s:
        if char in mapping.values():
            stack.append(char)
        elif char in mapping:
            if not stack or stack.pop() != mapping[char]:
                return False
        else:
            return False
    
    return len(stack) == 0`,
        java: `class Solution {
    public boolean isValid(String s) {
        Stack<Character> stack = new Stack<>();
        Map<Character, Character> map = Map.of(
            ')', '(',
            '}', '{',
            ']', '['
        );
        
        for (char c : s.toCharArray()) {
            if (c == '(' || c == '{' || c == '[') {
                stack.push(c);
            } else {
                if (stack.isEmpty() || stack.pop() != map.get(c)) {
                    return false;
                }
            }
        }
        
        return stack.isEmpty();
    }
}`
      }
    }
  ],

  // Queues problems
  'queues': [
    {
      id: 5,
      title: 'Implement Queue using Stacks',
      description: 'Implement a queue using two stacks',
      difficulty: 'Easy',
      category: 'Data Structures',
      problemStatement: `Implement a first in first out (FIFO) queue using only two stacks. The implemented queue should support all the functions of a normal queue (push, peek, pop, and empty).`,
      constraints: [
        '1 <= x <= 9',
        'At most 100 calls will be made to push, pop, peek, and empty',
        'All the calls to pop and peek are valid'
      ],
      examples: [
        {
          input: 'push(1), push(2), peek(), pop(), empty()',
          output: '1, 2, 1, false',
          explanation: 'Queue operations performed successfully'
        }
      ],
      starterCode: {
        javascript: `class MyQueue {
    constructor() {
        // Write your code here
    }
    
    push(x) {
        // Write your code here
    }
    
    pop() {
        // Write your code here
    }
    
    peek() {
        // Write your code here
    }
    
    empty() {
        // Write your code here
    }
}`,
        python: `class MyQueue:

    def __init__(self):
        # Write your code here
        pass

    def push(self, x: int) -> None:
        # Write your code here
        pass

    def pop(self) -> int:
        # Write your code here
        pass

    def peek(self) -> int:
        # Write your code here
        pass

    def empty(self) -> bool:
        # Write your code here
        pass`,
        java: `class MyQueue {

    public MyQueue() {
        // Write your code here
    }
    
    public void push(int x) {
        // Write your code here
    }
    
    public int pop() {
        // Write your code here
    }
    
    public int peek() {
        // Write your code here
    }
    
    public boolean empty() {
        // Write your code here
    }
}`
      },
      solution: {
        javascript: `class MyQueue {
    constructor() {
        this.stack1 = [];
        this.stack2 = [];
    }
    
    push(x) {
        this.stack1.push(x);
    }
    
    pop() {
        if (this.stack2.length === 0) {
            while (this.stack1.length > 0) {
                this.stack2.push(this.stack1.pop());
            }
        }
        return this.stack2.pop();
    }
    
    peek() {
        if (this.stack2.length === 0) {
            while (this.stack1.length > 0) {
                this.stack2.push(this.stack1.pop());
            }
        }
        return this.stack2[this.stack2.length - 1];
    }
    
    empty() {
        return this.stack1.length === 0 && this.stack2.length === 0;
    }
}`,
        python: `class MyQueue:

    def __init__(self):
        self.stack1 = []
        self.stack2 = []

    def push(self, x: int) -> None:
        self.stack1.append(x)

    def pop(self) -> int:
        if not self.stack2:
            while self.stack1:
                self.stack2.append(self.stack1.pop())
        return self.stack2.pop()

    def peek(self) -> int:
        if not self.stack2:
            while self.stack1:
                self.stack2.append(self.stack1.pop())
        return self.stack2[-1]

    def empty(self) -> bool:
        return not self.stack1 and not self.stack2`,
        java: `class MyQueue {
    private Stack<Integer> stack1;
    private Stack<Integer> stack2;

    public MyQueue() {
        stack1 = new Stack<>();
        stack2 = new Stack<>();
    }
    
    public void push(int x) {
        stack1.push(x);
    }
    
    public int pop() {
        if (stack2.isEmpty()) {
            while (!stack1.isEmpty()) {
                stack2.push(stack1.pop());
            }
        }
        return stack2.pop();
    }
    
    public int peek() {
        if (stack2.isEmpty()) {
            while (!stack1.isEmpty()) {
                stack2.push(stack1.pop());
            }
        }
        return stack2.peek();
    }
    
    public boolean empty() {
        return stack1.isEmpty() && stack2.isEmpty();
    }
}`
      }
    }
  ],

  // Quantitative problems
  'quantitative': [
    {
      id: 6,
      title: 'Percentage Calculation',
      description: 'Solve percentage-based word problems',
      difficulty: 'Easy',
      category: 'Aptitude',
      problemStatement: `A student scored 85% marks in an exam. If the total marks were 500, how many marks did the student score?`,
      solution: `Current marks = 85% of 500 = (85/100) * 500 = 425 marks`
    }
  ],

  // Logical problems
  'logical': [
    {
      id: 7,
      title: 'Number Series',
      description: 'Find the next number in the sequence',
      difficulty: 'Easy',
      category: 'Aptitude',
      problemStatement: `What comes next in the sequence: 2, 6, 12, 20, 30, ?`,
      solution: `The pattern is:
2 = 1 * 2
6 = 2 * 3
12 = 3 * 4
20 = 4 * 5
30 = 5 * 6
Next number = 6 * 7 = 42`
    }
  ],

  // Verbal problems
  'verbal': [
    {
      id: 8,
      title: 'Synonyms',
      description: 'Find the word with similar meaning',
      difficulty: 'Easy',
      category: 'Aptitude',
      problemStatement: `Which of the following is a synonym for "Benevolent"?`,
      options: [
        'A) Cruel',
        'B) Kind',
        'C) Selfish',
        'D) Greedy'
      ],
      solution: `B) Kind - Benevolent means well-meaning and kindly, so "Kind" is the correct synonym.`
    }
  ]
};