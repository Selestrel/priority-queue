const Node = require('./node');

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
	}

	pop() {
	  if (!this.isEmpty()) {

	  }
	}

	detachRoot() {
	  const node = this.root;
	  var index = this.parentNodes.indexOf(this.root);
	  this.root = null;
	  if(index != null) {
	    this.parentNodes.splice(index, 1);
	  }
	  return node;
	}

	restoreRootFromLastInsertedNode(detached) {
		
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
	    this.parentNodes[nodeIndex] = parentNode;
	    this.parentNodes[nodeParentIndex] = node;
	    this.shiftNodeUp(node);
	  }
	  this.root = node;
	}

	shiftNodeDown(node) {
		
	}
}

module.exports = MaxHeap;
