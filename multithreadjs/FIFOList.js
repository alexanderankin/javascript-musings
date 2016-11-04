/** 
 * 
 * 
 * 
 * adding to front, deleting from rear
 * next points down, prev points at head.
 */

function FIFOList() {
  this.head = null;
  this.tail = null;
  this.size = 0;
}

/*FIFOList.prototype.request = function(request) {
  if (this.head) {

  }
};*/

FIFOList.prototype.insert = function(node) {
  if (!(node instanceof Node))
    node = new Node(node);
  this.size++;

  if (!this.head) {
    this.head = this.tail = node;
  }

  else {
    this.head.prev = node;
    node.next = this.head;
    this.head = node;
  }
};

FIFOList.prototype.print = function() {
  var counter = 0;
  var cursor = this.head;
  while (cursor != null) {
    // console.log("printing " + counter++ + "th elem")
    // console.log(cursor);
    counter++;
    cursor = cursor.next;
  }
};

FIFOList.prototype.remove = function() {
  if (this.size === 0)
    return null;
  this.size--;

  // handle 1 case
  if (this.head == this.tail) {
    var ret = this.tail;
    this.head = this.tail = null;
    return ret;
  }
  
  var ret = this.tail;
  this.tail = this.tail.prev;
  this.tail.next = null;
  return ret;

};

function Node(contents) {
  this.next = null;
  this.prev = null;
  this.data = contents;
}

module.exports = FIFOList;

/*var list = new FIFOList();

list.insert(new Node("hello"));
list.insert(new Node("world"));
list.insert(new Node("yes"));
// list.print();
console.log(list.remove().data);
console.log(list.remove().data);
console.log(list.remove().data);*/
