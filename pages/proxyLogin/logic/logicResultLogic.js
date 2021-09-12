let promiseFunc = require('../../../utils/http/promise');
let urlConfig = require('../../../utils/urlConfig');
let util = require('../../../utils/util');
module.exports = {
   setCodeNum(e, that) {
    that.setData({ createCodeNum: e.detail.value });
   },
   createCodeLogic(e, that) {
     let num = that.data.createCodeNum;

     if(util.checkEmptyString(num)) {
       wx.showToast({
         title: '请输入授权次数',
         icon: 'none'
       });
       return ;
     }
     let url =  urlConfig.createActiveCodeUrl.replace('{{proxyId}}', that.data.loginResult.id);
     promiseFunc({
       url:url,
       data: num,
       method: 'POST',
       header: util.setRequestHeader(that.data.openId)
     }).then(function(json) {
        let activeCode = json.data;
        if(activeCode) {
          that.setData({acitveCode: activeCode});
        } else {
          wx.showToast({
            title: json.msg,
            icon: 'none'
          })
        }
        
     }).catch(function(err) {
           //console.log(err);
           wx.showToast({
             title: err.message,
             icon: 'none'
           })
     })
   
   }
};
