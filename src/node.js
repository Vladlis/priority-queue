class Node {
	constructor(data, priority) {
		this.data = data;
		this.priority = priority;
		this.parent = null;
		this.left = null;
		this.right = null;
	}

	appendChild(node) {
		if (this.left == null) {
			this.left = node;
			node.parent = this;
		} else if (this.right == null) {
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
			throw "This node doesn't have chindren!"
		}
	}

	remove() {
		if (this.parent != null) {
			this.parent.removeChild(this);
		}
	}

	swapWithParent() {
		if (this.parent != null) {
			var parent = this.parent;
			var left = this.left;
			var right = this.right;
			var parentRight = this.parent.right;
			var parentLeft = this.parent.left;
			var garndparent = this.parent.parent;
			
			if (garndparent != null) {
				if (garndparent.left == parent) {
					garndparent.left = this;
				} else {
					garndparent.right = this;
				}
			}
			
			if (this == this.parent.left) {
				if (parentRight != null) {
					parentRight.parent = this;
				}
				this.right = parentRight;
				this.left = parent;
			} else {
				if (parentLeft != null) {
					parentLeft.parent = this;
				}
				this.left = parentLeft;
				this.right = parent;
			}

			if (left != null) {
				left.parent = parent;
			}
			if (right != null) {
				right.parent = parent;
			}
			
			this.parent.left = left;
			this.parent.right = right;
			this.parent = garndparent;
			parent.parent = this;
		}
	}
}

module.exports = Node;
