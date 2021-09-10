let promiseFunc = require('../../../utils/http/promise');
let urlConfig = require('../../../utils/urlConfig');
module.exports = {
   setCodeNum(e, that) {
    that.setData({ createCodeNum: e.detail.value });
   },
   createCodeLogic(e, that) {
     let num = that.data.createCodeNum;

     if(checkEmptyString(num)) {
       wx.showToast({
         title: '请输入授权次数',
         icon: 'none'
       });
       return ;
     }

     promiseFunc({
       url: urlConfig.createActiveCodeUrl+that.data.loginResult.id,
       data: num,
       method: 'POST',
       header: {
        'X-WX-OPENID': 123456,
        'content-type': 'text/plain'
       }
     }).then(function(json) {
        let activeCode = json.data;
        that.setData({acitveCode: activeCode});
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
