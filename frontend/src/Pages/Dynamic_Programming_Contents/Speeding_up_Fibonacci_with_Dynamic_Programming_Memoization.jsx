const Speeding_up_Fibonacci_with_Dynamic_Programming_Memoization = () => {
  return (
    <div>
      <h1>Speeding up Fibonacci with Dynamic Programming (Memoization)</h1>
      <p>
        Our recursive function currently solves fibonacci in exponential time.
        This means that we can only handle small input values before the problem
        becomes too difficult. For instance, f(29) results in over 1
        million function calls!<br/> To increase the speed, we recognize that the
        number of subproblems is only O(n). That is, in order to calculate
         f(n) we only need to know f(n-1),f(n-2) ,f(0).
        Therefore, instead of recalculating these subproblems, we solve them
        once and then save the result in a lookup table. Subsequent calls will
        use this lookup table and immediately return a result, thus eliminating
        exponential work!<br/> Each recursive call will check against a lookup table
        to see if the value has been calculated. This is done is O(1) time.
        If we have previously calcuated it, return the result, otherwise, we
        calculate the function normally. The overall runtime is O(n)! This
        is an enormous improvement over our previous exponential time algorithm!<br/>
      </p>
    </div>
  );
};

export default Speeding_up_Fibonacci_with_Dynamic_Programming_Memoization;
