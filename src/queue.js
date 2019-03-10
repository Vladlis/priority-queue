const MaxHeap = require('./max-heap.js');

class PriorityQueue {
	
	constructor(maxSize) {
		if (maxSize == undefined) {
			this.maxSize = 30;
		} else {
			this.maxSize = maxSize;
		}
		this.heap = new MaxHeap();
	}

	push(data, priority) {
		if (data == this.maxSize) {
			throw "Max size is heat!";
		}
		this.heap.push(data, priority);
	}

	shift() {
		if (this.heap.size() == 0) {
			throw "Queue is empty"
		}
		return this.heap.pop();
	}

	size() {
    return this.heap.size();
	}

	isEmpty() {
		return this.heap.size() == 0;
	}

}

module.exports = PriorityQueue;
