// pages/addAdvertising/addAdvertising.js
let promiseFunc = require('../../utils/http/promise');
let urlConfig = require('../../utils/urlConfig');
let util = require('../../utils/util');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openId: '',
    position: '',
    advertising: '',
  },
  checkboxChange(e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
     
    this.setData({position: e.detail.value});
  },
  setAdvertising(e) {
    this.setData({advertising: e.detail.value});
  },
  addAdFunc(e) {
    let k = this;
    let content = k.data.advertising;
    let position = k.data.position;
    if(!content) {
      wx.showToast({
        title: '请输入广告内容',
        icon: 'none'
      })
      return;
    }
    if(!position) {
      wx.showToast({
        title: '请选择显示位置',
        icon: 'none'
      })
      return;
    }
    let url = urlConfig.setLabelUrl.replace('{{labelId}}', position);
    promiseFunc({
      url: url,
      data: content,
      method: 'POST',
      header: util.setRequestHeader(k.data.openId)
    }).then(function(json) {
       wx.showToast({
         title: json.msg,
         icon: 'none'
       })
    }).catch(function(err) {
          wx.showToast({
            title: err.message,
            icon: 'none'
          })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     this.setData({openId: options.openId});
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