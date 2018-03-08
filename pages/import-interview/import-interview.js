// pages/import-interview/import-interview.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userid:""
  },
  login: function () {
    var userid = this.data.userid
    wx.showLoading({
      title: '拼命加载中..'
    });
    wx.request({
      header: {'userId': userid },
      url: app.globalData.url +'/ik-wechat/zhilian/person2Login',
      data: {},
      success: (res) => {
        console.log(res.data)
        wx.hideLoading();
        if (res.data.code === '200') {
          var code = res.data.message
          wx.showToast({
            title: 'ok',
            icon: 'success',
            duration: 2000,
            success: function (res) {
              if (code === 'no_code') {
                var status = -1
                wx.navigateTo({
                  url: '../login/login?code=' + status
                })
                return
              }
              if (code === 'code') {
                var status = 1
                wx.navigateTo({
                  url: '../login/login?code=' + status
                })
                return
              }
            }
          })
          return;
        }
        wx.showToast({
          title: '登录失败',
          image: '../../images/icon/warm.png',
          duration: 1000
        })
      },
      fail: (req) => {
        wx.hideLoading();
        wx.showToast({
          title: '登录失败',
          image: '../../images/icon/warm.png',
          duration: 1000
        })
        return false;
      }
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userid = app.globalData.userId;   // 获取经验id
    this.setData({
      userid: userid      //存储id
    });
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