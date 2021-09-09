// pages/questionList/questionList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
     list:  [
      {
          "id": 1,
          "content": "1/1789 年满20周岁，可以初次申请下列哪种准驾车型？",
          "pic": '//m1.auto.itc.cn/c_fit,w_430,h_240,q_mini/auto/content/20210908/3ba1f694aa3f0142b79f42376019969e.jpg',
          "answer": "中型客车"
      }
  ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      let list = options.list;
      list = JSON.parse(list);
      this.setData({list: list});
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