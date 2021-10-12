// pages/proxyLogin/proxyLogin.js
let loginLogic = require('./logic/loginLogic');
let logicResultLogic = require('./logic/logicResultLogic');
let constant = require('../../utils/http/constants');
let sesstion = require('../../utils/http/session');
let util = require('../../utils/util');
let urlConfig = require('../../utils/urlConfig');
let promiseFunc = require('../../utils/http/promise');
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
     acitveCode: '',
     openId: null,
     advertising: '',
     memory: 0
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
  setMemory(e) {
    this.setData({memory: e.detail.value.length});
  },
 
  submitLogic(e) {
     loginLogic.submitLogic(e, this);
  },
  createCodeFunc(e) {
    logicResultLogic.createCodeLogic(e, this);
  },
  copy() {
    let k = this;
    wx.setClipboardData({
      data: k.data.acitveCode,
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
     loginResult: [],
     url: '/pages/genAccreditNum/genAccreditNum?proxyId='+this.data.loginResult.id,
    })
  },
  showCreateAccountPage(e) {
     wx.navigateTo({
       url: '/pages/createProxyAccount/createProxyAccount',
     })
  },
  showBroadcastPage(e) {
    wx.navigateTo({
      url: '/pages/addAdvertising/addAdvertising?openId=' + this.data.openId,
    })
  },
  getBroadCastData() {
    let k = this;
    let url = urlConfig.getLabelUrl.replace('{{labelId}}', 2);
   promiseFunc({
     url: url,
     method: 'GET',
     header: util.setRequestHeader(k.data.openId)
   }).then(function(json) {
      if(json.code == 200) {
        k.setData({advertising: json.data});
      } else {
       wx.showToast({
         title: err.msg,
         icon: 'none'
       })
      }
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
    let k = this;
    let openId = sesstion.get(constant.WX_OPENID);
    if(openId) {
      this.setData({
        openId: openId,
      });
    }
    let pn = sesstion.get(constant.WX_PROXY_NAME);
    let pp = sesstion.get(constant.WX_PROXY_PWD);
    if(pn && pp) {
      this.setData({
        proxyName: pn,
        proxyPwd: pp
      });
    }
    wx.getSystemInfoAsync({
      success (res) {
       k.setData({
         windowH: res.windowHeight
       });
        
       
      }
    });
    k.getBroadCastData();
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