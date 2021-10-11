// pages/camera/camera.js

let qNUpload = require('../../utils/wxUpload');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wHeight: 1000,
    openId: ''
  },
  takePhoto() {
    let that = this;
    const ctx = wx.createCameraContext()
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        let imageKey = 'niu'+Date.now();
        qNUpload.uploadImage(that, res.tempImagePath, imageKey, 'camera')
      }
    })
  },
  error(e) {
    console.log(e.detail)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      let k = this;
      wx.getSystemInfoAsync({
        success (res) {
         k.setData({
          wHeight: res.windowHeight,
          openId: options.openId
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