// pages/questionList/questionList.js
let util = require('../../utils/util');
let promiseFunc = require('../../utils/http/promise');
Page({

  /**
   * 页面的初始数据
   */
  data: {
     list:  [],
     isLoadData: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      let key = options.key;
      let openId = options.openId;
      requestQuestionData(this, key, openId);
      wx.showLoading({
        title: '图片识别中...',
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

function requestQuestionData(that, imageKey, openId) {
    promiseFunc({
       url: 'https://ocr-server-1213654-1307253443.ap-shanghai.run.tcloudbase.com/analysis',
       header: util.setRequestHeader(that.data.openId),
       data: {
         openId: openId,
         picId: imageKey
       },
       method: 'POST'
    }).then(function(json) {
        if(json.data) {
           handlerAnalysis(that, formatData(json.data));
        } else {
          handlerAnalysis(that, []);
        }
    });
  }
  function handlerAnalysis(that, data) {
     that.setData({list: data, isLoadData: true});
     wx.hideLoading({
       success: (res) => {},
     })
  } 
  
  function formatData(data) {
    data.forEach(function(item) {
      item.content = item.content.replace(/(\n+)|(\r+)|(\n+\r+)|(\u000A|\u000D|\u2028|\u2029)+/g,"-");
      item.content = item.content.split('-'); 
    });
    return data;
  }