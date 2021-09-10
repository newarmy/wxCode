let promiseFunc = require('../../../utils/http/promise');
let urlConfig = require('../../../utils/urlConfig');
module.exports = {
   setProxyName: function (e, that) {
      that.setData({ proxyName: e.detail.value });
   },
   setProxyPwd: function (e, that) {
      that.setData({ proxyPwd: e.detail.value });
   },
   submitLogic(e, that) {
     console.log(that);
     let n = that.data.proxyName;
     let p = that.data.proxyPwd;
     console.log(n);
     if(checkEmptyString(n)) {
       wx.showToast({
         title: '请输入正确的用户名',
         icon: 'none'
       });
       return ;
     }
     if(checkEmptyString(p)) {
      wx.showToast({
        title: '请输入正确的密码',
        icon: 'none'
      });
      return ;
     }

     promiseFunc({
       url: urlConfig.proxyLoginUrl,
       data: {
         name: n,
         password: p
       },
       method: 'POST',
       header: {
        'X-WX-OPENID': 123456
       }
     }).then(function(json) {
        let loginResult = json.data;
        that.setData({loginResult: loginResult});
     }).catch(function(msg) {
           wx.showToast({
             title: msg,
           })
     })
   
   }
};

function checkEmptyString(content) {
    if (content === undefined || content === null || (typeof content === 'string' && content.length === 0)) {
        return true;
    }
    return false;
 }
