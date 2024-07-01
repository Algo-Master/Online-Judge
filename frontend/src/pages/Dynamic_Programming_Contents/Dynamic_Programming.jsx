const Dynamic_Programming = () => {
  return (
    <div>
      <h1>Introduction to Dynamic Programming</h1>
      <p>
        The essence of dynamic programming is to avoid repeated calculation.
        Often, dynamic programming problems are naturally solvable by recursion.
        In such cases, it's easiest to write the recursive solution, then save
        repeated states in a lookup table. This process is known as top-down
        dynamic programming with memoization. That's read "memoization" (like we
        are writing in a memo pad) not memorization.
      </p>
    </div>
  );
};

export default Dynamic_Programming;
