
let promiseFunc = require('./http/promise');

// 图片上传（从相册）方法
function didPressChooesImage(that, imageFromType) {
  // 云端图片名称
  let imageKey = 'niu'+Date.now();
  
  // 微信 API 选择图片（从相册）
  wx.chooseImage({
      // 最多可以选择的图片张数。目前本sdk只支持单图上传，若选择多图，只会上传第一张图
      count: 1,
      sourceType: [imageFromType],
      success: function (res) {
        wx.showLoading({
          title: '图片识别中....',
        })
          var filePath = res.tempFilePaths[0];
          // wx.chooseImage 目前微信官方尚未开放获取原图片名功能(2020.4.22)
          // 上传
          uploadImage(that, filePath, imageKey, imageFromType);
      }
  });
}
function uploadImage(that, filePath, imageKey, imageFromType) {
        

        wx.cloud.uploadFile({
          cloudPath: imageKey+'.png', // 上传至云端的路径
          filePath: filePath, // 小程序临时文件路径
          success: res => {
            // 返回文件 ID
            console.log(res.fileID)
            requestQuestionData(that, res.fileID, imageFromType);
          },
          fail: console.error
        })
        
}


function requestQuestionData(that, fileID, imageFromType) {

  wx.hideLoading({
    success: (res) => {},
  })
  wx.navigateTo({
    url: '/pages/questionList/questionList?key='+fileID+'&openId='+that.data.openId+'&imageFromType='+imageFromType,
  });
  
}

module.exports = {
  didPressChooesImage,
  uploadImage
}