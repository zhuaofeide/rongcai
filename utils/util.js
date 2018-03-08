const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
const app = getApp();
// 数据请求

function http(url, obj, callBack) {
  var that = this;

  wx.showLoading();
  wx.request({
    url: url,
    method: 'POST',
    data: obj,
    header: {
      'content-type': 'application/x-www-form-urlencoded', // 默认值
      'userId': app.globalData.userId,
    },
    success: function (res) {
      wx.hideLoading();
      console.log(res);
      callBack(res);
    },
    fail: function (error) {
      wx.hideLoading();
      console.log(error)
    }
  })
}

module.exports = {
  formatTime: formatTime,
  http: http
}
