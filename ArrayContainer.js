/**
 * 
 * 
 * This class holds an internal array and exposes
 * * push
 * * shift
 * * length (as a method instead of a property)
 * * 
 * 
 * and adds
 * * peek (push without side effects)
 * 
 */
function ArrayContainer(type) {
  this._array = [];

  if (typeof type != 'function')
    throw new TypeError();
  this.typeConstructor = type;
}

ArrayContainer.prototype._check = function(thing) {
  if (!(thing instanceof this.typeConstructor))
    throw new TypeError();
};

ArrayContainer.prototype.push = function(obj) {
  this._check(obj);
  return this._array.push(obj);
};

ArrayContainer.prototype.shift = function() {
  return this._array.shift();
};

ArrayContainer.prototype.length = function() {
  return this._array.length;
};

ArrayContainer.prototype.peek = function() {
  var returnValue = this._array.shift();
  this._array.unshift(returnValue);
  return returnValue;
};

module.exports = ArrayContainer;
