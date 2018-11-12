class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  append(value) {
    const n = new Node(value);
    // Special case: empty list
    if (!this.head) {
      this.head = n;
      this.tail = n;
    }
    // Add to tail
    else {
      this.tail.next = n;
      this.tail = n;
    }
    // Return `this` for chainability
    return this;
  }

  // pop item off front of list
  // returns that item
  shift() {
    if (!this.head) return;
    if (this.head === this.tail) this.tail = null;

    const item = this.head.value;
    this.head = this.head.next;
    return item;
  }
}

module.exports = LinkedList;
