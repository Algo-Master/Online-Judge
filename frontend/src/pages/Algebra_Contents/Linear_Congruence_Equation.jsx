const Linear_Congruence_Equation = () => {
  return (
    <div>
      <h1>Linear Congruence Equation</h1>
      <p>
        This equation is of the form: a.x congruent b (mod n), where 
        a, b and n are given integers and x is an unknown
        integer.<br/> It is required to find the value x from the interval 
        [0, n-1] (clearly, on the entire number line there can be infinitely
        many solutions that will differ from each other in n.k ,
        where k is any integer). If the solution is not unique, then we
        will consider how to get all the solutions.<br/>
      </p>
    </div>
  );
};

export default Linear_Congruence_Equation;
