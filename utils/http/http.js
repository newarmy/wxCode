/**
 * 请求数据 
 */
function request(options) {
  let requestOpt = {
    url: options.url,
    success: function (json) {
      if (json.statusCode === 200) {
        options.success(json.data);
      } else {
        options.fail && options.fail();
      }

    },
    fail: function (e) {
      options.fail && options.fail(e);
    }
  };
  if(options.data) {
    requestOpt.data = options.data
  }
  if(options.header) {
    requestOpt.header = options.header
  }
  wx.request(requestOpt)
}
module.exports = request;