// pages/me/me.js
let constant = require('../../utils/http/constants');
let sesstion = require('../../utils/http/session');
let getUserInfo = require('./logic/getUserInfo');
Page({

  /**
   * 页面的初始数据
   */
  data: {
     num: 0,
     openId: null,
     userInfo: {},
     activeCode: ''
     
  },
  setActiveCode(e) {
     this.setData({activeCode: e.detail.value});
  },
  useActiveCodeFunc(e) {
    getUserInfo.useActiveCodeFunc(e, this);
  },
  getUserProfile(e){
    let k = this;
    wx.getUserProfile({
      desc: '用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
       let userStr = JSON.stringify(res.userInfo);
       sesstion.set(constant.WX_USERINFO, userStr);
       let openId = sesstion.get(constant.WX_OPENID);
       if(openId) {
         k.setData({
           openid: openId,
           userInfo: res.userInfo
         }, function() {
          getUserInfo.getUseNum(k);
         })
       }
       
      }
    })
  },
  handleContact (e) {
    console.log(e.detail.path)
    console.log(e.detail.query)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  onTabItemTap(item) {
    let k = this;
    // tab 点击时执行
    //if('pages/me/me' === item.pagePath) {
      let openId = sesstion.get(constant.WX_OPENID);
      let userStr = sesstion.get(constant.WX_USERINFO);
      if(openId && userStr) {
        this.setData({
          openId: openId,
          userInfo: JSON.parse(userStr)
        }, function() {
          getUserInfo.getUseNum(k);
        });
        return;
      }
      this.getUserProfile();
    //}
  },
})