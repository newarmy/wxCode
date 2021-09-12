let promiseFunc = require('../../../utils/http/promise');
let urlConfig = require('../../../utils/urlConfig');
let util = require('../../../utils/util');
module.exports = {
   setProxyName: function (e, that) {
      that.setData({ proxyName: e.detail.value });
   },
   setProxyPwd: function (e, that) {
      that.setData({ proxyPwd: e.detail.value });
   },
   createProxyAccountLogic(e, that) {
     let n = that.data.proxyName;
     let p = that.data.proxyPwd;
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

     promiseFunc({
       url: urlConfig.createAccountUrl,
       data: {
         name: n,
         password: p
       },
       method: 'POST',
       header: util.setRequestHeader(that.data.openId)
     }).then(function(json) {
        wx.showToast({
          title: json.msg,
        })
     }).catch(function(err) {
           wx.showToast({
             title: err.message,
           })
     })
   
   }
};