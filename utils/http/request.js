var constants = require('./constants');
var utils = require('./utils');
var Session = require('./session');
var loginLib = require('./login2');
var config = require('../../..//config.js');

let noop = function noop() { }
let buildAuthHeader = function buildAuthHeader(session) {
  let header = {};
  if (session) {
    header[constants.WX_HEADER_SKEY] = session;
  }
  return header;
};

/***
 * @class
 * 表示请求过程中发生的异常
 */
var RequestError = (function () {
  function RequestError(type, message) {
    Error.call(this, message);
    this.type = type;
    this.message = message;
  }

  RequestError.prototype = new Error();
  RequestError.prototype.constructor = RequestError;

  return RequestError;
})();

/**
 * request请求入口
 * button回调函数里调用这个方法
 * 
 * @param {Object} options 请求配置
 * @param {string} options.url 请求地址
 * @param {string} [options.method] 请求使用的 HTTP 方法，默认为 "GET"
 * @param {Function} options.success(userInfo) 请求成功后的回调函数，参数 userInfo 微信用户信息
 * @param {Function} options.fail(error) 请求失败后的回调函数，参数 error 错误信息
 * @param {Object} options.userDetail 用户信息对象（button的回调函数数据 e.detail） 
 * @param {Boolean} options.login 是否需要登录
 * 
 * 
*/
function request(options) {
  if (typeof options !== 'object') {
    let message = '请求传参应为 object 类型，但实际传了 ' + (typeof options) + ' 类型';
    throw new RequestError(constants.ERR_INVALID_PARAMS, message);
  }

  let requireLogin = options.login;
  let success = options.success || noop;
  let fail = options.fail || noop;
  let complete = options.complete || noop;
  let originHeader = options.header || {};


  // 成功回调
  var callSuccess = function () {
    success.apply(null, arguments);
    complete.apply(null, arguments);
  };

  // 失败回调
  var callFail = function (error) {
    fail.call(null, error);
    complete.call(null, error);
  };

  // 是否已经进行过重试
  let hasRetried = false;

  
  // 登录后再请求
  function doRequestWithLogin(options) {
    loginLib.login({
      url: config.loginUrl,
      userDetail: options.userDetail,
      success: doRequest,
      fail: callFail
    });
  }

  // 实际进行请求的方法
  function doRequest() {
    let authHeader = buildAuthHeader(Session.get());
    let reqConfig = utils.extends({}, options, {
      header: utils.extends({}, originHeader, authHeader),
      success:callSuccess,
      fail: callFail,
      complete: noop,
    });
    // 请求
    wx.request(reqConfig);
  }

  if (requireLogin) {
    doRequestWithLogin(options);
  } else {
    doRequest();
  }
}

module.exports = {
  request: request
};