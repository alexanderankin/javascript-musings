var FIFOList = require('./FIFOList');

function ListMonitor(list, action) {
  if (!(list instanceof FIFOList))
    throw new TypeError("'list' must be FIFOList");

  if (typeof action != 'function')
    throw new TypeError("'action' must be function");
  if (action.length < 2)
    throw new TypeError("'action' must take argument and callback");

  this.list = list;
  this.action = action;

  this.run();
}

ListMonitor.prototype.run = function() {
  var _run = this.run;
  var that = this;

  if (this.list.size === 0) {

    /*return process.nextTick(function() {
      _run.call(that);
      console.log("empty que");
    })*/
    return setTimeout(function() {
      _run.call(that);
    }, 200)
  }


  var r = this.list.remove();
  this.action(r.data.data, function (err, result) {
    if (err) {
      r.data.emit("error", err);
    } else {
      r.data.emit("success", result);
    }
  });
  
/*  process.nextTick(function() {
    _run.call(that);
  });*/
  setTimeout(function() {
    _run.call(that);
  }, 10);
};

//////////////////////

var list = new FIFOList();

// list.insert(new Node("hello"));
// list.insert(new Node("world"));
// list.insert(new Node("yes"));
// list.print();

var lm = new ListMonitor(list, function (request, done) {
  function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

  setTimeout(function() {done(null, "request data was " + request);}, getRandomArbitrary(1, 5));
});


var events = require('events');
function wtf(request, done) {
  var sampleEE = new events.EventEmitter();
  sampleEE.once("success", done);
  sampleEE.data = request;
  list.insert(sampleEE);
}

wtf("wtf", function(result) {
  console.log("wtf", result);
});


wtf("yes", function(result) {
  console.log("yes", result);
});

setTimeout(function() {
  wtf("noope", function(result) {
    console.log("noope", result);
  });
}, 7);

setTimeout(function() {
  wtf("nope", function(result) {
    console.log("nope", result);
  });
}, 10);
