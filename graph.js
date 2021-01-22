class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
    let graph = this.nodes;
    graph.add(vertex)
    return graph;
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    for (let node of vertexArray)
    {this.nodes.add(node);}
    return this.nodes;
  }

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1)
  }

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
    this.nodes.delete(vertex)
  }

  // this function returns an array of Node values using DFS
  depthFirstSearch(start) {
    // let toVisitStack = [start];
    // let seen = new Set(toVisitStack);

    // while(toVisitStack.length > 0){
    //   let currNode = toVisitStack.pop();
    //   if (currNode === end) return toVisitStack();

    //   for (let node of currNode.adjacent){
    //     if (!seen.has(node)){
    //       toVisitStack.push(node);
    //       seen.add(node)
    //     }
    //   }
    // }
    const visited = new Set();
    const result = [];

    function traverse(vertex) {
      // base case
      if (!vertex) {
        return null;
      }
      // visit node
      visited.add(vertex);
      result.push(vertex.value);

      // visit neighbors
      vertex.adjacent.forEach(neighbor => {
        if (!visited.has(neighbor)) {
          return traverse(neighbor);
        }
      });
    }

    traverse(start);

    return result;
  }

  // this function returns an array of Node values using BFS
  breadthFirstSearch(start) {
        // Create an empty queue
        const queue = [start];
        const result = []; //empty array for result
        const visited = new Set(); //new set to keep track of visited
        let currentVertex; //currentVert var
    
        // visit node
        visited.add(start);
    
        // While there is still remaining vertices in queue
        while (queue.length) {
          currentVertex = queue.shift(); //shifting b/c we're BFS!
          result.push(currentVertex.value); //tracking nodes into result each time
    
          // visit neighbors
          currentVertex.adjacent.forEach(neighbor => {
            if (!visited.has(neighbor)) { //checking for neight
              visited.add(neighbor); //keeping track of visited
              queue.push(neighbor); //top of queue
            }
          });
        }
        return result;
  }
}

module.exports = {Graph, Node}