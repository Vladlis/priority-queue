const Node = require('./node');

class MaxHeap {
	constructor() {
		this.root = null;
		this.parentNodes = [];
		this.heapSize = 0;
	}

	push(data, priority) {
		var node = new Node(data, priority);
		this.insertNode(node);
		this.shiftNodeUp(node);
		this.heapSize++;
	}

	pop() {
		if (this.root != null) {
			var detachedRoot = this.detachRoot();
			this.restoreRootFromLastInsertedNode(detachedRoot);
			this.shiftNodeDown(this.root);
			this.heapSize--;
			return detachedRoot.data;
		}
	}

	detachRoot() {
		var root = this.root;
		var rootIndex = this.parentNodes.indexOf(root);
		if (rootIndex >= 0) {
			this.parentNodes.splice(rootIndex, 1);
		}
		root.remove();
		this.root = null;
		return root;
	}

	restoreRootFromLastInsertedNode(detached) {
		if (this.parentNodes.length > 0) {
			var last = this.parentNodes.pop();
			var lastParent = last.parent;
			last.remove();
			this.root = last;
			var left = detached.left;
			var right = detached.right;
			if (left != null) {
				last.appendChild(left);
			}
			if (right != null) {
				last.appendChild(right);
			}
			if (lastParent != null && !this.parentNodes.includes(lastParent)
				&& lastParent.parent != null
				&& lastParent.right == null) {
				this.parentNodes.unshift(lastParent);
			}
			if (left == null || right == null) {
				this.parentNodes.unshift(last);
			}
		}
	}

	size() {
		return this.heapSize;
	}

	isEmpty() {
		return this.root == null;
	}

	clear() {
		this.root = null;
		this.parentNodes = [];
		this.heapSize = 0;
	}

	insertNode(node) {
		if (this.root == null) {
			this.root = node;
			this.parentNodes.push(node);
		} else {
			var parentNode = this.parentNodes[0];
			parentNode.appendChild(node);
			if (parentNode.right != null) {
				this.parentNodes.shift();
			}
			this.parentNodes.push(node);
		}
	}

	shiftNodeUp(node) {
		const parent = node.parent;
		if (parent != null && parent.priority < node.priority) {
			if (parent == this.root) {
				this.root = node;
			}
			this.swapParentNodes(parent, node);
			node.swapWithParent();
			this.shiftNodeUp(node);
		}
	}

	shiftNodeDown(node) {
		if (this.root != null) {
			var left = node.left;
			var right = node.right;
			if (right != null && right.priority > left.priority && right.priority > node.priority) {
				if (this.root == node) {
					this.root = right;
				}
				right.swapWithParent();
				this.swapParentNodes(node, right);
				this.shiftNodeDown(node);
			} else if (left != null && left.priority > node.priority) {
				if (this.root == node) {
					this.root = left;
				}
				left.swapWithParent();
				this.swapParentNodes(node, left);
				this.shiftNodeDown(node);
			}
		}
	}

	swapParentNodes(node, child) {
		var nodeIndex = this.parentNodes.indexOf(node);
		var childIndex = this.parentNodes.indexOf(child);
		if (childIndex >= 0) {
			this.parentNodes[childIndex] = node;
		}
		if (nodeIndex >= 0) {
			this.parentNodes[nodeIndex] = child;
		}
	}
}

module.exports = MaxHeap;
