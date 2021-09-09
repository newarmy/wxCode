// pages/me/me.js
let constant = require('../../utils/http/constants');
let sesstion = require('../../utils/http/session');
Page({

  /**
   * 页面的初始数据
   */
  data: {
     num: 0,
     openid: null,
     userInfo: {},
     
  },
  getUserProfile(e){
    wx.getUserProfile({
      desc: '用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res);
        this.setData({
          userInfo: res.userInfo
        });
       let userStr = JSON.stringify(res.userInfo);
       sesstion.set(constants.WX_USERINFO, userStr);
       let openId = sesstion.get(constants.WX_OPENID);
       if(openId) {
         this.setData({
           openid: openId
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
    // tab 点击时执行
    if('pages/me/me' === item.pagePath) {
      this.getUserProfile();
    }
  },
})