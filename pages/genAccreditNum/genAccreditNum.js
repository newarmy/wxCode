// pages/genAccreditNum/genAccreditNum.js
let accreditLogic = require('./logic/accreditLogic');
let constant = require('../../utils/http/constants');
let sesstion = require('../../utils/http/session');
Page({

  /**
   * 页面的初始数据
   */
  data: {
      openId: null,
      proxyId: null,
      newActiveCode: '',
  },
  setNewActiveCode(e) {
    accreditLogic.setNewActiveCode(e, this);
  },
  addNumLogic(e) {
    accreditLogic.addNumLogic(e, this);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let openId = sesstion.get(constant.WX_OPENID);
    if(openId) {
      this.setData({
        openId: openId,
        proxyId: options.proxyId
      });
    }
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