let session = require('./session.js');
var LoginError = require('./loginError.js');
var constants = require('./constants.js');
/**
 * 登录流程：
 * <button opent-type="getUserInfo" > -> wx.login -> wx.request() -> 保存用户的第三方登录信息(要和第三方session时间一致)
 * 
 * button回调函数里调用这个方法；
 * @param {Object} options 登录配置
 * @param {string} options.loginUrl 登录使用的 URL，服务器应该在这个 URL 上处理登录请求
 * @param {string} [options.method] 请求使用的 HTTP 方法，默认为 "GET"
 * @param {Function} options.success(userInfo) 登录成功后的回调函数，参数 userInfo 微信用户信息
 * @param {Function} options.fail(error) 登录失败后的回调函数，参数 error 错误信息
 * @param {Object} options.userDetail 用户信息对象（button的回调函数数据 e.detail） 
 * 
 * 
*/
let login = function (options) {
  var sessionValue = session.get(constants.WX_OPENID);

  if (sessionValue) {
    wx.checkSession({
      success: function () {
        options.success(sessionValue);
      },
      fail: function () {
        session.clear();
        wxLogin(options);
      }
    })
  } else {
    wxLogin(options);
  }


   
};

// 调用wx.login获得code
let wxLogin = function (options) {
  wx.login({
    success: function (loginResult) {
      if(loginResult.code) {
        Object.assign(options, { code: loginResult.code })
        requestLogin(options)
      } else {
        var LoginObj = new LoginError('wx_login_error', loginResult.errMsg);
        options.fail(LoginObj);
      }
      
    },
    fail: function (err) {
      var LoginObj = new LoginError('wx_login_error', err);
      options.fail(LoginObj);
    }
  });
}

// 请求服务器登录地址，获得会话信息
let requestLogin = function (options) {
  
  // 请求http头部信息
  let header = configLoginHeader(options);
  
  // 登录请求参数
  var reqData = setRequestData(options);
  
  //  请求服务器登录地址，获得会话信息
  wx.request({
    url: options.loginUrl,
    //header: header,
    method: options.method || 'GET',
    data: reqData,
    success: function (result) {
      var data = result.data;
      //----------------------根据返回数据的格式来修改代码--------------------
      // success handler logic
      if (data && data.code === 200) {
        var openId = data.data;
        if (openId) {
          session.set(constants.WX_OPENID, openId);
          options.success(res.userId);
        } else {
          // 搜狐服务登录错误
          var errorMessage = '登录失败(' + data.error + ')：' + (data.msg || '未知错误');
          var noSessionError = new LoginError('wx_login_server_error', errorMessage);
          options.fail(noSessionError);
        }
        //fail handler logic
      } else {
        // 搜狐服务登录错误
        var noSessionError = new LoginError('wx_login_server_error', JSON.stringify(data));
        options.fail(noSessionError);
      }
    },
    // 响应错误
    fail: function (loginResponseError) {
      var error = new LoginError('wx_login_server_error', '登录失败，可能是网络错误或者服务器发生异常');
      options.fail(error);
    },
  })
};
  // 请求http头部信息
let configLoginHeader = function (options) {

  var header = {};
  header['content-type'] = 'application/x-www-form-urlencoded';
  return header;
};

// 登录请求参数
let setRequestData = function (options) {
  return {
    jscode: options.code
  };
}

module.exports = {
  login: login
};