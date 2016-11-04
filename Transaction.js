/** 
 * Transaction consists of request and responder
 * 
 */
function Transaction(request, responder) {
  if (typeof responder != 'function')
    throw new TypeError();

  this.request = request;
  this.responder = responder;
}

module.exports = Transaction;
