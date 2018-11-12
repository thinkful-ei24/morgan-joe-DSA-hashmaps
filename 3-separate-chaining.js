/* 
 0, 1, 2, 3, 4, 5
[x, a, y, g, , z]
{key: x} -> {other_key: some other value}

*/

class HashMap {
  constructor(initialCapacity = 8) {
    this.length = 0;
    this._slots = [];
    this._capacity = initialCapacity;
    this._deleted = 0;
  }

  get(key) {
    const index = this._findSlot(key);
    const list = this._slots[index];
    const item = findKey(list, key);
    if (item === undefined) {
      return undefined;
    }
    return item.value;
  }

  set(key, value) {
    const loadRatio = (this.length + this._deleted + 1) / this._capacity;
    if (loadRatio > HashMap.MAX_LOAD_RATIO) {
      this._resize(this._capacity * HashMap.SIZE_RATIO);
    }

    const index = this._findSlot(key);
    // empty slot
    if (this._slots[index] === undefined) this._slots[index] = new LinkedList();
    // existing key
    const list = this._slots[index];
    list.append({ key, value, deleted: false });
    this.length++;
  }

  remove(key) {
    const index = this._findSlot(key);
    const list = this._slots[index];
    const item = findKey(list, key);
    if (slot === undefined) {
      throw new Error("Key error");
    }
    item.deleted = true;
    this.length--;
    this._deleted++;
  }

  _findSlot(key) {
    const hash = HashMap._hashString(key);
    const start = hash % this._capacity;

    return start;

    // for (let i = start; i < start + this._capacity; i++) {
    //   const index = i % this._capacity;
    //   const slot = this._slots[index];
    //   if (slot === undefined || (slot.key == key && !slot.deleted)) {
    //     return index;
    //   }
    // }
  }

  _resize(size) {
    const oldSlots = this._slots;
    this._capacity = size;
    // Reset the length - it will get rebuilt as you add the items back
    this.length = 0;
    this._deleted = 0;
    this._slots = [];

    for (const slot of oldSlots) {
      if (slot !== undefined && !slot.deleted) {
        this.set(slot.key, slot.value);
      }
    }
  }

  static _hashString(string) {
    let hash = 5381;
    for (let i = 0; i < string.length; i++) {
      hash = (hash << 5) + hash + string.charCodeAt(i);
      hash = hash & hash;
    }
    return hash >>> 0;
  }
}

HashMap.MAX_LOAD_RATIO = 0.9;
HashMap.SIZE_RATIO = 3;

function main() {
  const lor = new HashMap();

  lor.set("Hobbit", "Bilbo");
  lor.set("Hobbit", "Frodo");
  lor.set("Wizard", "Gandolf");
  lor.set("Human", "Aragon");
  lor.set("Elf", "Legolas");
  lor.set("Maiar", "The Necromancer");
  lor.set("Maiar", "Sauron");
  lor.set("RingBearer", "Gollum");
  lor.set("LadyOfLight", "Galadriel");
  lor.set("HalfElven", "Arwen");
  lor.set("Ent", "Treebeard");
  // console.log(lor.get('Hobbit'));
  console.log(lor.length);
}

// main();

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }

  append(value) {
    const n = new Node(value);
    // Special case: empty list
    if (!this.head) this.head = n;
    // Add to tail
    else {
      cursor = this.head;
      while (cursor.next) {
        cursor = cursor.next;
      }
      cursor.next = n;
    }
    // Return `this` for chainability
    return this;
  }
}

function findKey(list, key) {
  if (!list.head) return;

  let cursor = list.head;
  while (cursor) {
    if (!cursor.value.deleted && cursor.value.key === key) return cursor.value;
    cursor = cursor.next;
  }
}

module.exports = HashMap;
