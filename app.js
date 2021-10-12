// app.js
let loginObj = require('./utils/http/login');
let constant = require('./utils/http/constants');
let util = require('./utils/urlConfig.js');
App({
  onLaunch() {
   let k = this;
   loginObj.login({
     method: 'get',
     loginUrl: util.getOpenIdUrl,
     success: function(openid) {
       k.globalData.openid = openid;
     },
     fail: function (err) {

     }
   });
   wx.cloud.init({
     env: constant.WX_CLOUD_ENV
   })
   
  },
  globalData: {
    userInfo: null,
    openid: null,
  }
})
