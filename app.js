// app.js
let loginObj = require('./utils/http/login');
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
     env: 'cloud1-0gas06v534a943cf'
   })
   
  },
  globalData: {
    userInfo: null,
    openid: null,
  }
})
