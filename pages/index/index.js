
// 获取应用实例
//const app = getApp()
let constant = require('../../utils/http/constants');
let sesstion = require('../../utils/http/session');
let util = require('../../utils/util');
let urlConfig = require('../../utils/urlConfig');
let promiseFunc = require('../../utils/http/promise');

let qNUpload = require('../../utils/qiniuUpload');


Page({
  data: {
    openId: null,
    userInfo: {},
    imageObject: [],
    textWidth: '490rpx',
    textWidthPx: 0,
    animationData: null,
    advertising: ''
  },
  
  onLoad() {
    let openId = sesstion.get(constant.WX_OPENID);
    let userStr = sesstion.get(constant.WX_USERINFO);
    if(openId && userStr) {
      this.setData({
        openId: openId,
        userInfo: JSON.parse(userStr)
      });
    }
  },
  getUserProfile(e) {
    let openId = sesstion.get(constant.WX_OPENID);
    let userStr = sesstion.get(constant.WX_USERINFO);
    if(openId && userStr) {
      this.setData({
        openId: openId,
        userInfo: JSON.parse(userStr)
      });
      return;
    }
     wx.getUserProfile({
      desc: '登录后使用功能', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
       let userStr = JSON.stringify(res.userInfo);
       sesstion.set(constant.WX_USERINFO, userStr);
       let openId = sesstion.get(constant.WX_OPENID);
       if(openId) {
         this.setData({
           openId: openId,
           userInfo: res.userInfo
         })
       }
      }
    })
  },
  uploadFromAlbum() {
    let k = this;
    if(!k.data.openId) {
      wx.showToast({
        title: '请先登录后再使用服务',
        icon: "none"
      })
      return;
    }
    qNUpload.didPressChooesImage(k, 'album');
  },
  uploadFromCamera() {
    let k = this;
    if(!k.data.openId) {
      wx.showToast({
        title: '请先登录后再使用服务',
        icon: "none"
      })
      return;
    }
    wx.navigateTo({
      url: '/pages/camera/camera?openId='+this.data.openId,
    });
  },
  getBroadCastData() {
     let k = this;
     let url = urlConfig.getLabelUrl.replace('{{labelId}}', 1);
    promiseFunc({
      url: url,
      method: 'GET',
      header: util.setRequestHeader(k.data.openId|| 'home')
    }).then(function(json) {
       if(json.code == 200) {
         k.setData({advertising: json.data}, function () {
               k.setBroadCastSize();
         });
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
  onReady() {
    let k = this;
    k.getBroadCastData();
    
  },
  setBroadCastSize() {
    let k = this;
    let rectWidth = 0;
    let textHeight = 0;
    wx.createSelectorQuery().select('#broadBox').boundingClientRect(function(rect){
      rectWidth = rect.width;  // 节点的宽度
      textHeight = rect.height;
      k.setWidth(rectWidth, textHeight);
      k.setAnimation();
    }).exec();
  },
  setAnimation() {
    let k = this;
    var animation = wx.createAnimation({
      duration: 10000,
      timingFunction: 'linear',
    })
    setTimeout(function() {
      let trueWidthPx =  Number(this.data.textWidth.replace('px', ''));
      let textParentW = this.data.textWidthPx;
      let transW = trueWidthPx - textParentW;
      //console.log(transW , textParentW, trueWidthPx);
      animation.translate3d(-transW, 0, 0).step().translate3d(textParentW, 0, 0).step({duration: 0});
      this.setData({
        animationData:animation.export()
      });
     setInterval(function () {
      animation.translate3d(-transW, 0, 0).step().translate3d(textParentW, 0, 0).step({duration: 0});
        k.setData({
          animationData: animation.export()
        })
      }, 10200);
    }.bind(this), 1000)
  },
  setWidth(rW, tH) {
      let n = tH/this.rpxToPx(100);
      this.setData({textWidth: n*rW+"px", textWidthPx: rW});
  },
  rpxToPx(rpxValue) {
    let winW = wx.getSystemInfoSync().windowWidth;
    
    let px = rpxValue / 750 * winW;
    return px;
  }
})




