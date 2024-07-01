const DFS = () => {
  return (
    <div>
      <h1>Depth First Search</h1>
      <p>
        Depth First Search is one of the main graph algorithms. Depth First
        Search finds the lexicographical first path in the graph from a source
        vertex u to each vertex. Depth First Search will also find the
        shortest paths in a tree (because there only exists one simple path),
        but on general graphs this is not the case. The algorithm works in 
        O(m + n) time where n is the number of vertices and m is
        the number of edges.
      </p>
    </div>
  );
};

export default DFS;