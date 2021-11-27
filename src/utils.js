export const tagsData = [
  "Array",
  "Backtracking", "Bruteforce", "Breadth - First Search", " Binary Search", " Binary Tree", "Binary Search Tree", " Bit Manipulation", "Binary Indexed Tree",
  "Counting",
  "Database", " Design", "Depth - First Search", "Dynamic Programming", "Divide and Conquer",
  "Greedy", "Graph",
  "Hash Table", " Heap(Priority Queue)",
  "Linked List",
  "Math", " Matrix", "Memoization","Minimum Spanning Tree",
  "Number Theory",
  "Prefix Sum", "Probability and Statistics",
  "Queue", 
  "Recursion", 
  "String", "Sorting", " Stack", "Sliding Window", "Segment Tree", "String Matching", "Shortest Path", "Suffix Array", "Strongly Connected Component",
  "Tree", "Trie", "Two Pointers",
  "Union Find",
];

export const getDifficulty = (problem) => {
  if (problem.countTotal === 0) {
    return "Hard";
  } else {
    let ratio = problem.countAC / problem.countTotal;
    if (ratio > 0.7) return "Easy";
    else if (ratio > 0.3) return "Medium";
    else return "Medium";
  }
};

export const getDateTime = (value) => {
  const date =
    new Date(value).toLocaleString("default", {
      month: "short",
    }) +
    " " +
    new Date(value).getDate() +
    ", " +
    new Date(value).getFullYear();
  const time = new Date(value).toLocaleTimeString();
  return date + " " + time;
};
