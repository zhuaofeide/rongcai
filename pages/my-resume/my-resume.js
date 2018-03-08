// pages/my-resume/my-resume.js
var postData = require('../../data/data.js')
const app = getApp();
const avatarPath = "http://www.romcai.com:80/static/attached"
Page({
  /**
   * 页面的初始数据
   */
  data: {
    page: 1,      //页数
    path: '../../images/icon/default.png',
    avatar: 'http://www.romcai.com:80/static/attached',
    size: 100,   //  数量
    total: '',
    post_key: []
  },
  //删除
  clear: function (e) {
    var Id = e.currentTarget.dataset.id;
    console.log(Id);
    var that=this;
    wx.showModal({
      // title: '提示',
      cancelColor: '#666',
      confirmColor: '#1c95ec',
      content: '确定删除这份简历么',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          console.log(Id);
          wx.request({
            method: 'POST',
            header: {
              'content-type': 'application/x-www-form-urlencoded',
              'userId': app.globalData.userId
            },
            url: app.globalData.url + "/ik-wechat/api/resume/remove",        
            data: {"id":Id},
            success: (res) => {
              wx.hideLoading();
              
              if (res.data.code === '200') {
                console.log(res);
                that.getList();
              }
            }
          })
        } else if (res.cancel) {
        }
      }
    })
  },
  show: function (e) {
    var resumeId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: "../code/code?id=" + resumeId
    })
  },
  //导入
  reImport: function () {
    wx.showModal({
      // title: '提示',
      cancelColor: '#666',
      confirmColor: '#1c95ec',
      content: '重新上传会覆盖原有简历确定重新上传吗？',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.reLaunch({
            url: '/pages/upload/index'
          })
        } else if (res.cancel) {
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {

  },
  // 获取列表itemexp
  getList: function () {
    // wx.showLoading();
    var obj = {
      "size": this.data.size,
      "page": this.data.page,
      "userId": app.globalData.userId
    };
    wx.request({
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        'userId': app.globalData.userId,
      },
      url: app.globalData.url + '/ik-wechat/api/resume/getresume',
      data: obj,
      success: (res) => {
        // wx.hideLoading();
        console.log(res)
        if (res.data.code === '200' && res.data.data.length !== 0) {
          // console.log(res.data.data.records.length);
          console.log(res.data.data);
          console.log(res.data.data);
          this.setData({
            post_key: res.data.data
            // avatar: avatarPath + res.data.data.avatar
          })
        }else{
          wx.navigateBack({
            delta: 1
          })
        }
      },
      fail: function (req) {
        // wx.hideLoading();
        wx.navigateBack({
          delta: 1
        })
      }
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
    this.getList();
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