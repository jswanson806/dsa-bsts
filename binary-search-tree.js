class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
  }

  /** insert(val): insert a new node into the BST with value val.
   * Returns the tree. Uses iteration. */

  insert(val) {
    const newNode = new Node(val);

    // handle empty tree
    if(!this.root){ // no root, set newNode as root and return tree
      this.root = newNode;
      return this;
    }
    
    let current = this.root;

    while(current){
      // current node value is less than newNode value
      if(current.val < newNode.val){ // go right
        if(!current.right){ // if no right node, insert newNode and return tree
          current.right = newNode;
          return this;
        }
        // otherwise, keep moving right
        current = current.right;
        // current node value is greate than newNode value 
      } else { // go left
        if(!current.left){ // if no left node, insert newNode and return tree
          current.left = newNode;
          return this;
        }
        // otherwise, keep going left
        current = current.left
      }
    }
  }


  /** insertRecursively(val): insert a new node into the BST with value val.
   * Returns the tree. Uses recursion. */

  insertRecursively(val) {
    const newNode = new Node(val);
    // base case
    if(!this.root){
      this.root = newNode;
      return this;
    }

    function _insertRecursively(currentNode){
      if(currentNode.val < newNode.val){ // go right
        if(!currentNode.right){ // if no right node, insert newNode and return tree
          currentNode.right = newNode;
          return this;
        }
        // otherwise, call recursively with right side
        return _insertRecursively(currentNode.right)
        // current node value is greate than newNode value 
      } else { // go left
        if(!currentNode.left){ // if no left node, insert newNode and return tree
          currentNode.left = newNode;
          return this;
        }
        // otherwise, call recursively with left side
        return _insertRecursively(currentNode.left)
      }
    }
    
    _insertRecursively(this.root)
    return this;
  }

  /** find(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses iteration. */

  find(val) {
    let currentNode = this.root;

    while(currentNode){
      if(currentNode.val === val){
        return currentNode;
      }

      if(currentNode.val > val){
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
    }
    
  }

  /** findRecursively(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses recursion. */

  findRecursively(val) {
    

    function _findRecursively(node){
      if(!node){
        return;
      }

      if(node.val === val){
        return node;
      }
      if(node.val > val){
        return _findRecursively(node.left)
      } else {
        return _findRecursively(node.right);
      }
    }

    return _findRecursively(this.root);
  }

  /** dfsPreOrder(): Traverse the array using pre-order DFS.
   * Return an array of visited nodes. */

  dfsPreOrder() {
    // holds values from visited nodes
    const visitedNodes = [];

    function _dfsPreOrder(node){
      // base case - reached end of tree
      if(!node){
        return;
      }
      // push current node value to array
      visitedNodes.push(node.val);
      // call recursively on left side
      _dfsPreOrder(node.left);
      // call recursively on right side
      _dfsPreOrder(node.right);
    }
    // call helper recursion function
    _dfsPreOrder(this.root)
    // return array of visited node values
    return visitedNodes;
  }

  /** dfsInOrder(): Traverse the array using in-order DFS.
   * Return an array of visited nodes. */

  dfsInOrder() {
    // holds values from visited nodes
    const visitedNodes = [];

    function _dfsInOrder(node){
      // base case - reached end of tree
      if(!node){
        return;
      }
      
      // call recursively on left side
      _dfsInOrder(node.left);
      // push current node value to array
      visitedNodes.push(node.val);
      // call recursively on right side
      _dfsInOrder(node.right);
    }
    // call helper recursion function
    _dfsInOrder(this.root)
    // return array of visited node values
    return visitedNodes;
  }

  /** dfsPostOrder(): Traverse the array using post-order DFS.
   * Return an array of visited nodes. */

  dfsPostOrder() {
    // holds values from visited nodes
    const visitedNodes = [];

    function _dfsPostOrder(node){
      // base case - reached end of tree
      if(!node){
        return;
      }

      // call recursively on left side
      _dfsPostOrder(node.left);
      // call recursively on right side
      _dfsPostOrder(node.right);
      // push current node value to array
      visitedNodes.push(node.val);
    }
    // call helper recursion function
    _dfsPostOrder(this.root)
    // return array of visited node values
    return visitedNodes;
  }

  /** bfs(): Traverse the array using BFS.
   * Return an array of visited nodes. */

  bfs() {
    // holds values from visited nodes
    const visitedNodes = [];
    // handle empty tree
    if(!this.root){
      return;
    }
    // hold queue of nodes to visit
    let toVisitQueue = [this.root];
    // while the queue has nodes in it
    while(toVisitQueue.length){
      // current is top node in queue
      let currentNode = toVisitQueue.shift();
      // push value of currentNode to visitedNodes array
      visitedNodes.push(currentNode.val);
      // left child exists, push to queue
      if(currentNode.left){
        toVisitQueue.push(currentNode.left);
      }
      // right child exists, push to queue
      if(currentNode.right){
        toVisitQueue.push(currentNode.right);
      }
    }
    // return array of visited node values
    return visitedNodes;
  }

  /** Further Study!
   * remove(val): Removes a node in the BST with the value val.
   * Returns the removed node. */

  remove(val) {
   

    function _remove(root, val){

      if(!root){
        return root;
      }
      
      if(val > root.val){
        // assign returned subtree from else condition to right child
        root.right = _remove(root.right, val);

      } else if(val < root.val){
        // assign returned subtree from else condition to left child
        root.left = _remove(root.left, val);

      } else { //found the node, handle deletion

        if(!root.left){ // one child - no left subtree, return right subtree
          return root.right;
        } else if(!root.right){ // one child - no right subtree, return left subtree
          return root.left;

          // two children
        } else {  
          // find min from right subtree
          // min val in right subtree is > all vals in left subtree and < all vals in right
          let current = root.right;
          while(current.left){ // stop at valid node, not null
            // assign min val in right subtree to current
            current = current.left;
          }
          // replace the sought node with min val of right subtree
          root.val = current.val;
          // remove duplicate val from right subtree recursively -> assign return val to root.right in case in changed
          root.right = _remove(root.right, root.val)
        }
      }
      // return sought node
      return root;
    }

    return _remove(this.root, val)
  }

  /** Further Study!
   * isBalanced(): Returns true if the BST is balanced, false otherwise. */

  isBalanced() {
    // holds count of nodes
    let leftCount = 0
    let rightCount = 0

    // helper recursion function
    function traverse(root){
      // traverse left side and incrememnt leftCount
      if(root.left) {
        traverse(root.left);
        leftCount++;
      }
      // traverse right side and increment rightCount
      if(root.right) { 
        traverse(root.right);
        rightCount++;
      }
    }
    // call recursion helper function on root
    traverse(this.root)

    // if the count of either side is > than the other by + 1, tree is unbalanced
    if(leftCount > rightCount + 1 || rightCount > leftCount + 1){
      return false;
    }
    // otherwise, tree is balanced
    return true;
  }

  /** Further Study!
   * findSecondHighest(): Find the second highest value in the BST, if it exists.
   * Otherwise return undefined. */

  findSecondHighest() {
    
  }
}

module.exports = BinarySearchTree;
