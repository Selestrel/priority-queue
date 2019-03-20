//const Node = require('./node');

class MaxHeap {
	constructor() {
		this.root = null;
		this.parentNodes = new Array();
	}

	push(data, priority) {
	  const node = new Node(data, priority);
	  this.insertNode(node);
	  if(this.root && this.root.priority <= node.priority) {
	    this.shiftNodeUp(node);
	  }
	  if (node.parent && node.parent.priority < node.priority) {
	    this.shiftNodeDown(node.parent);
	  }
	}

	pop() {
	  if (!this.isEmpty()) {
	    var detached = this.detachRoot();
	    if (this.parentNodes.length > 0) {
	      this.restoreRootFromLastInsertedNode(detached);
	      if(this.root.left || this.root.right) {
	        this.shiftNodeDown(this.root);
	      }
	    }
	    return detached.data;
	  }
	}

	detachRoot() {
	  const node = this.root;
	  var index = this.parentNodes.indexOf(this.root);
	  this.root = null;
	  if(index != -1) {
	    this.parentNodes.splice(index, 1);
	  }
	  return node;
	}

	restoreRootFromLastInsertedNode(detached) {
	  var leftDetachedChild = detached.left;
	  var rightDetachedChild = detached.right;
	  var lastInserted = this.parentNodes.pop();
	  var lastInsertedParent = lastInserted.parent != null && lastInserted.parent == detached ? null : lastInserted.parent;

	  lastInserted.remove();
	  this.root = lastInserted;
	  if(leftDetachedChild && leftDetachedChild != lastInserted) {
	    lastInserted.left = leftDetachedChild;
	    detached.left.parent = lastInserted;
	    detached.left = null;
	  }
	  if(rightDetachedChild && rightDetachedChild != lastInserted) {
	    lastInserted.right = rightDetachedChild;
	    detached.right.parent = lastInserted;
	    detached.right = null;
	  }
	  if(this.parentNodes.indexOf(lastInsertedParent) == -1 && lastInsertedParent) {
	    this.parentNodes.unshift(lastInsertedParent);
	  }
	  if(!(lastInserted.left && lastInserted.right)) {
	    this.parentNodes.unshift(lastInserted);
	  }
	}

	size() {
	  return this.parentNodes.length;
	}

	isEmpty() {
	  return this.parentNodes.length == 0;
	}

	clear() {
		this.root = null;
		this.parentNodes = [];
	}

	insertNode(node) {
	  if(!this.root) {
		this.root = node;
	  } else {
	    this.parentNodes[0].appendChild(node);
	    if (this.parentNodes[0].left && this.parentNodes[0].right) {
	      this.parentNodes.shift();
	    }
	  }
	    this.parentNodes.push(node);
	}

	shiftNodeUp(node) {
	  if (node.parent) {
	    var nodeParentIndex = this.parentNodes.indexOf(node.parent);
	    var nodeIndex = this.parentNodes.indexOf(node);
	    var parentNode = node.parent;
	    node.swapWithParent();
//	    this.parentNodes[nodeIndex] = parentNode;
//	    this.parentNodes[nodeParentIndex] = node;
	    this.swapParentNodes(parentNode, node);
	    this.shiftNodeUp(node);
	  }
	  this.root = node;
	}

	swapParentNodes(parentNode, node) {
	  var parentNodeIndex = this.parentNodes.indexOf(parentNode);
	  if (parentNodeIndex > -1) {
	    this.parentNodes[this.parentNodes.indexOf(node)] = parentNode;
	    this.parentNodes[parentNodeIndex] = node;
	  } else if (this.parentNodes.indexOf(node) > -1) {
	    this.parentNodes[this.parentNodes.indexOf(node)] = parentNode;
	  }
	}

	shiftNodeDown(node) {
	  var leftChild = node.left;
	  var rightChild = node.right;
	  var leftChildIndex = this.parentNodes.indexOf(leftChild);
	  var rightChildIndex = this.parentNodes.indexOf(rightChild);
	  var nodeIndex = this.parentNodes.indexOf(node);

	  if (leftChild && rightChild && (node.priority < leftChild.priority || node.priority < rightChild.priority)) {
	    if (leftChild.priority >= rightChild.priority) {
	      this.swapParentNodes(node, leftChild);
	      leftChild.swapWithParent();
	    } else {
	      this.swapParentNodes(node, rightChild);
	      rightChild.swapWithParent();
	    }
	  } else if (node.left) {
	    this.swapParentNodes(node, leftChild);
	    leftChild.swapWithParent();
	  } else if (node.right) {
       	    this.swapParentNodes(node, rightChild);
       	    rightChild.swapWithParent();
       	  }

	  if (this.root == node) {
	    this.root = node.parent;
	  }

	  if (leftChild != null) {
	    this.shiftNodeDown(node);
	  }
	}
}

//module.exports = MaxHeap;
