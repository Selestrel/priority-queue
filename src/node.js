class Node {
	constructor(data, priority) {
	  this.data = data;
	  this.priority = priority;
	  this.parent = null;
	  this.left = null;
	  this.right = null;
	}

	appendChild(node) {
	  if (!this.left) {
	    this.left = node;
	    node.parent = this;
	  } else if (!this.right) {
	    this.right = node;
	    node.parent = this;
	  }
	}

	removeChild(node) {
	  if (this.left == node) {
	    this.left = null;
	    node.parent = null;
	  } else if (this.right == node) {
	    this.right = null;
	    node.parent = null;
	  } else {
	    throw new Error("Node is not a child for this");
	  }
	}

	remove() {
	  if (this.parent) {
	    this.parent.removeChild(this);
	  }
	}

	swapWithParent() {
	  if (this.parent) {
        let root = this.parent.parent;
        let parentNode = this.parent;
        let parentNodeLeftChild = parentNode.left;
        let parentNodeRightChild = parentNode.right;
        let leftChild = this.left;
        let rightChild = this.right;

        if (parentNodeLeftChild) {
          parentNodeLeftChild.remove();
        }
        if (parentNodeRightChild) {
          parentNodeRightChild.remove();
        }
        if (leftChild) {
          leftChild.remove();
        }
        if (rightChild) {
          rightChild.remove();
        }
	    if (root) {
	      root.removeChild(parentNode);
	      root.appendChild(this);
	    }
	    this.appendChild(parentNode);
	    if (parentNodeLeftChild && parentNodeLeftChild != this) {
	      this.left = parentNodeLeftChild;
	      parentNodeLeftChild.parent = this;
	    }
	    if (parentNodeRightChild && parentNodeRightChild != this) {
	      this.right = parentNodeRightChild;
	      parentNodeRightChild.parent = this;
	    }
	    if(leftChild) {
	      parentNode.left = leftChild;
	      leftChild.parent = parentNode;
	    }
	    if(rightChild) {
	      parentNode.right = rightChild;
	      rightChild.parent = parentNode;
	    }
	  }
	}
}

module.exports = Node;
