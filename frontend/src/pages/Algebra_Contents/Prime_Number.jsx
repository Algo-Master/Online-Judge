const Prime_Number = () => {
  return (
    <div>
      <h1>Sieve of Eratosthenes</h1>
      <p>
        Sieve of Eratosthenes is an algorithm for finding all the prime numbers
        in a segment [1;n] using O(n \log \log n) operations.<br/> The
        algorithm is very simple: at the beginning we write down all numbers
        between 2 and n. We mark all proper multiples of 2 (since 2 is the
        smallest prime number) as composite. A proper multiple of a number 
        x, is a number greater than x and divisible by x. Then we
        find the next number that hasn't been marked as composite, in this case
        it is 3. Which means 3 is prime, and we mark all proper multiples of 3
        as composite. The next unmarked number is 5, which is the next prime
        number, and we mark all proper multiples of it. And we continue this
        procedure until we have processed all numbers in the row.<br/> In the
        following image you can see a visualization of the algorithm for
        computing all prime numbers in the range [1; 16]. It can be seen,
        that quite often we mark numbers as composite multiple times.<br/>
      </p>
    </div>
  );
};

export default Prime_Number;
