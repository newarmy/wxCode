
/***
 * @class
 * 表示登录过程中发生的异常
 * 
*/
var LoginError = (function () {
  function LoginError(type, message) {
    Error.call(this, message);
    this.type = type;
    this.message = message;
  }
  LoginError.prototype = new Error();
  LoginError.prototype.constructor = LoginError;
  return LoginError;
})();

module.exports = LoginError;