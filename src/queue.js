const MaxHeap = require('./max-heap.js');

class PriorityQueue {
	constructor(maxSize) {
	  if (maxSize == null) {
	    this.maxSize = 30;
	  } else {
	    this.maxSize = maxSize;
	  }
	  this.heap = new MaxHeap();
	}

	push(data, priority) {
	  if (this.heap.size() == this.maxSize) {
	    throw new Error('Queue has max size');
	  } else {
	    this.heap.push(data, priority);
	  }
	}

	shift() {
	  if (this.heap.size() == 0) {
	    throw new Error("Queue is empty");
	  } else {
	    var popNode = this.heap.pop();
	    return popNode;
	  }
	}

	size() {
	  return this.heap.size();
	}

	isEmpty() {
	  return this.heap.size() == 0;
	}
}

//module.exports = PriorityQueue;
