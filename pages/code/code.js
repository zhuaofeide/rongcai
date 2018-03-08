// pages/code/code.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    codeid:'',
    path:'../../images/icon/default.png',
    codepath:'../../images/icon/erweima.png'
  },
//生成二维码
  code: function (codeId){
    wx.showLoading();
  var obj = {
    "content": app.globalData.url+"/ik-wechat/api/resume/list?resumeId=93",
    "length":200
    }
  var that=this;
  wx.request({
    method: 'POST',
    header: {
      'content-type': 'application/x-www-form-urlencoded',
      'userId': app.globalData.userId,
    },
    url: app.globalData.url + '/ik-wechat/api/commons/qrcode/createqrcode',
    data: obj,
    success: (res) => {
      wx.hideLoading();
      console.log(res);
      that.setData({
        codepath: res.data.data
      })
    },
    fail: function (req) {
      wx.hideLoading();
    }
  })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    var codeId = e.id;
    console.log(codeId);
    this.setData({
      codeid: codeId
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
    var codeId=this.data.codeid;
    this.code(codeId);
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