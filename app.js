// app.js
let loginObj = require('./utils/http/login');
let util = require('./utils/util.js');
App({
  onLaunch() {
   let k = this;
   loginObj.login({
     method: 'get',
     loginUrl: util.loginUrl,
     success: function(openid) {

     },
     fail: function (err) {

     }
   });

   
  },
  globalData: {
    userInfo: null
  }
})
