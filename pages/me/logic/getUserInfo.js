let promiseFunc = require('../../../utils/http/promise');
let urlConfig = require('../../../utils/urlConfig');
let util = require('../../../utils/util');
module.exports = {
  getUseNum(that) {
    let openId = that.data.openId;
    promiseFunc({
      url: urlConfig.getRestNumUrl,
      method: 'GET',
      header: util.setRequestHeader(openId)
    }).then(function(json) {
       that.setData({num: (json.data|| 0)});
    }).catch(function(err) {
          wx.showToast({
            title: err.message,
            icon: 'none'
          })
    })
  },
  useActiveCodeFunc(e, that) {
     let acode = that.data.activeCode;
     let openId = that.data.openId;
     if(util.checkEmptyString(acode)) {
       wx.showToast({
         title: '请输入激活码',
         icon: 'none'
       });
       return ;
     }

     promiseFunc({
       url: urlConfig.activeCodeUrl,
       data: acode,
       method: 'POST',
       header: util.setRequestHeader(openId)
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

