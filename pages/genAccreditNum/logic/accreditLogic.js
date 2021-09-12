let promiseFunc = require('../../../utils/http/promise');
let urlConfig = require('../../../utils/urlConfig');
let util = require('../../../utils/util');
module.exports = {
  setNewActiveCode(e, that) {
    that.setData({ newActiveCode: e.detail.value });
   },
   addNumLogic(e, that) {
     let newActiveCode = that.data.newActiveCode;

     if(util.checkEmptyString(newActiveCode)) {
       wx.showToast({
         title: '请输入授权码',
         icon: 'none'
       });
       return ;
     }
     let url = urlConfig.proxyActiveCodeUrl.replace('{{proxyId}}', that.data.proxyId);
     promiseFunc({
       url: url,
       data: newActiveCode,
       method: 'POST',
       header: util.setRequestHeader(that.data.openId)
     }).then(function(json) {
        wx.showToast({
          title: json.msg,
          icon: 'none'
        })
     }).catch(function(err) {
           wx.showToast({
             title: err.message,
             icon: 'none'
           })
     })
   
   }
};


