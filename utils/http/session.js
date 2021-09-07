var Session = {
  get: function (key) {
    return wx.getStorageSync(key) || null;
  },

  set: function (key, session) {
    wx.setStorageSync(key, session);
  },

  clear: function (key) {
    wx.removeStorageSync(key);
  },
};

module.exports = Session;