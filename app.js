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
       k.openid = openid;
     },
     fail: function (err) {

     }
   });

   
  },
  globalData: {
    userInfo: null
  }
})
