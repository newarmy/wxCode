let promiseFunc = require('../../../utils/http/promise');
let urlConfig = require('../../../utils/urlConfig');
module.exports = {
  setNewActiveCode(e, that) {
    that.setData({ newActiveCode: e.detail.value });
   },
   addNumLogic(e, that) {
     let newActiveCode = that.data.newActiveCode;

     if(checkEmptyString(newActiveCode)) {
       wx.showToast({
         title: '请输入激活码',
         icon: 'none'
       });
       return ;
     }

     promiseFunc({
       url: urlConfig.activeCodeUrl,
       data: newActiveCode,
       method: 'POST',
       header: {
        'X-WX-OPENID': 123456,
        'content-type': 'text/plain'
       }
     }).then(function(json) {
        wx.showToast({
          title: json.msg,
        })
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
