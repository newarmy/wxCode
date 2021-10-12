let promiseFunc = require('../../../utils/http/promise');
let urlConfig = require('../../../utils/urlConfig');
let util = require('../../../utils/util');
let session = require('../../../utils/http/session');
let constants = require('../../../utils/http/constants');
module.exports = {
   setProxyName: function (e, that) {
      that.setData({ proxyName: e.detail.value });
   },
   setProxyPwd: function (e, that) {
      that.setData({ proxyPwd: e.detail.value });
   },
   submitLogic(e, that) {
     //console.log(that);
     let n = that.data.proxyName;
     let p = that.data.proxyPwd;
     //console.log(n);
     if(util.checkEmptyString(n)) {
       wx.showToast({
         title: '请输入正确的用户名',
         icon: 'none'
       });
       return ;
     }
     if(util.checkEmptyString(p)) {
      wx.showToast({
        title: '请输入正确的密码',
        icon: 'none'
      });
      return ;
     }
     if(that.data.memory === 1) {
      session.set(constants.WX_PROXY_NAME, n);
      session.set(constants.WX_PROXY_PWD, p);
     }
     promiseFunc({
       url: urlConfig.proxyLoginUrl,
       data: {
         name: n,
         password: p
       },
       method: 'POST',
       header: util.setRequestHeader(that.data.openId),
     }).then(function(json) {
        let loginResult = json.data;
        that.setData({loginResult: loginResult});
     }).catch(function(err) {
           wx.showToast({
             title: err.message,
             icon: 'none'
           })
     })
   
   }
};