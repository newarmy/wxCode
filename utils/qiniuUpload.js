
let promiseFunc = require('./http/promise');
const qiniuUploader = require("./sdk/qiniuUploader");

// 图片上传（从相册）方法
function didPressChooesImage(that, imageFromType) {
  // 初始化七牛云配置
  initQiniu();
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
          // 向七牛云上传
          uploadImage(that, filePath, imageKey);
      }
  });
}
function uploadImage(that, filePath, imageKey) {
        qiniuUploader.upload(filePath, that.data.openId, (res) => {
         
            requestQuestionData(that, imageKey);
            //console.log('提示: wx.chooseImage 目前微信官方尚未开放获取原图片名功能(2020.4.22)');
            //console.log('file url is: ' + res.fileURL);
        }, (error) => {
            console.error('error: ' + JSON.stringify(error));
        },
        // 此项为qiniuUploader.upload的第四个参数options。若想在单个方法中变更七牛云相关配置，可以使用上述参数。如果不需要在单个方法中变更七牛云相关配置，则可使用 null 作为参数占位符。推荐填写initQiniu()中的七牛云相关参数，然后此处使用null做占位符。
        // 若想自定义上传key，请把自定义key写入此处options的key值。如果在使用自定义key后，其它七牛云配置参数想维持全局配置，请把此处options除key以外的属性值置空。
        // 启用options参数请记得删除null占位符
        {
          region: 'SCN', // 华北区
          uptokenURL: 'https://ocr-server-1213654-1307253443.ap-shanghai.run.tcloudbase.com/pic/uploadtoken',
          domain: 'http://[yourBucketId].bkt.clouddn.com',
          shouldUseQiniuFileName: false,
          key: imageKey,
        },
        (progress) => {
            // that.setData({
            //     'imageProgress': progress
            // });
            // console.log('上传进度', progress.progress);
            // console.log('已经上传的数据长度', progress.totalBytesSent);
            // console.log('预期需要上传的数据总长度', progress.totalBytesExpectedToSend);
        }, cancelTask => that.setData({ cancelTask })
        );
}
// 初始化七牛云相关配置
function initQiniu() {
  var options = {
      // bucket所在区域，这里是华北区。ECN, SCN, NCN, NA, ASG，分别对应七牛云的：华东，华南，华北，北美，新加坡 5 个区域
      region: 'SCN',

      // 获取uptoken方法三选一即可，执行优先级为：uptoken > uptokenURL > uptokenFunc。三选一，剩下两个置空。推荐使用uptokenURL，详情请见 README.md
      // 由其他程序生成七牛云uptoken，然后直接写入uptoken
      uptoken: '',
      // 从指定 url 通过 HTTP GET 获取 uptoken，返回的格式必须是 json 且包含 uptoken 字段，例如： {"uptoken": "0MLvWPnyy..."}
      uptokenURL: 'https://ocr-server-1213654-1307253443.ap-shanghai.run.tcloudbase.com/pic/uploadtoken',
      // uptokenFunc 这个属性的值可以是一个用来生成uptoken的函数，详情请见 README.md
      uptokenFunc: function () { },

      // bucket 外链域名，下载资源时用到。如果设置，会在 success callback 的 res 参数加上可以直接使用的 fileURL 字段。否则需要自己拼接
      domain: 'http://[yourBucketId].bkt.clouddn.com',
      // qiniuShouldUseQiniuFileName 如果是 true，则文件的 key 由 qiniu 服务器分配（全局去重）。如果是 false，则文件的 key 使用微信自动生成的 filename。出于初代sdk用户升级后兼容问题的考虑，默认是 false。
      // 微信自动生成的 filename较长，导致fileURL较长。推荐使用{qiniuShouldUseQiniuFileName: true} + "通过fileURL下载文件时，自定义下载名" 的组合方式。
      // 自定义上传key 需要两个条件：1. 此处shouldUseQiniuFileName值为false。 2. 通过修改qiniuUploader.upload方法传入的options参数，可以进行自定义key。（请不要直接在sdk中修改options参数，修改方法请见demo的index.js）
      // 通过fileURL下载文件时，自定义下载名，请参考：七牛云“对象存储 > 产品手册 > 下载资源 > 下载设置 > 自定义资源下载名”（https://developer.qiniu.com/kodo/manual/1659/download-setting）。本sdk在README.md的"常见问题"板块中，有"通过fileURL下载文件时，自定义下载名"使用样例。
      shouldUseQiniuFileName: false
  };
  // 将七牛云相关配置初始化进本sdk
  qiniuUploader.init(options);
}

function requestQuestionData(that, imageKey) {

  wx.hideLoading({
    success: (res) => {},
  })
  wx.navigateTo({
    url: '/pages/questionList/questionList?key='+imageKey+'&openId='+that.data.openId,
  });
  
}

module.exports = {
  didPressChooesImage,
  uploadImage
}