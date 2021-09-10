// pages/proxyLogin/proxyLogin.js
let loginLogic = require('./logic/loginLogic');
let logicResultLogic = require('./logic/logicResultLogic');

Page({

  /**
   * 页面的初始数据
   */
  data: {
     windowH: 1334,
     proxyName: '',
     proxyPwd: '',
     loginResult: [],
     createCodeNum: '',
     acitveCode: ''
  },
  setCodeNum(e) {
    logicResultLogic.setCodeNum(e, this);
  },
  setProxyPwd(e) {
     loginLogic.setProxyPwd(e, this);
  },
  setProxyName(e) {
     loginLogic.setProxyName(e, this);
  },
 
  submitLogic(e) {
     loginLogic.submitLogic(e, this);
  },
  createCodeFunc(e) {
    logicResultLogic.createCodeLogic(e, this);
  },
  copy() {
    wx.setClipboardData({
      data: this.acitveCode,
      success (res) {
        wx.getClipboardData({
          success (res) {
            console.log(res.data) // data
          }
        })
      }
    })
  },
  showAddAccreditNumPage(e) {
    wx.navigateTo({
      url: '/pages/genAccreditNum/genAccreditNum',
    })
  },
  showCreateAccountPage(e) {
     wx.navigateTo({
       url: '/pages/createProxyAccount/createProxyAccount',
     })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let k = this;
    wx.getSystemInfoAsync({
      success (res) {
       k.setData({
         windowH: res.windowHeight
       });
        
       
      }
    })
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

  }
})