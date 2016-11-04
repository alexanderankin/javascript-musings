var ctr = 0;
function iRunThreeTimes(cb) {
	ctr += 1;
	console.log(cb);
	setTimeout(function() {cb(ctr < 3)}, 1000);
}


/*iRunThreeTimes(function _this(again) {
	if (again) {
		iRunThreeTimes(_this);
	}
})*/

// buffer = new Buffer("hello");
buffer = null;

// console.log(buffer.toString())

var result = buffer && buffer.toString() || "nope";

console.log(result);
