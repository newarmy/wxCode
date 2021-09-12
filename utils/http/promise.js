module.exports = function (opt) {
  return  new Promise(function (resolve, reject) {
     wx.request({
       url: opt.url,
       data: opt.data || {},
       header: opt.header || {},
       method: opt.method || 'GET',
       dataType: opt.dataType|| 'json',
       success: function (json) {
         if(json.statusCode === 200) {
           resolve(json.data);
         } else {
           let err = new Error(json.data.msg);
           reject(err);
         }
         
       },
       fail: function () {
        let err = new Error('网络错误');
         reject(err)
       }
     })
  });
}