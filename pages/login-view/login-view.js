// pages/view-resume/view-resume.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [
      // { name: '我的简历', value: '1', checked: 'true' },
      // { name: '我的简历1', value: '2' },
      // { name: '我的简历2', value: '3' },
    ],
    src:'',
    url:''
  },
  radioChange: function (e) {
    console.log(e.detail.value)
    this.setData({
      src: e.detail.value
    })
  },
  // 点击预览
  viewInfor: function () {
    wx.showLoading({
      title: '读取中',
      mask:true
    })
    var that = this;
    wx.request({
      header: { 'userId': app.globalData.userId },
      url: app.globalData.url + '/ik-wechat/zhilian/resumePreview',
      data: {
        path: that.data.src
      },
      success: (res) => {
        wx.hideLoading();
        console.log(res);
        var src = JSON.stringify(res.data.data) 
        wx.navigateTo({
          url: src
        })
        // wx.navigateTo({
        //   url: '/pages/login-view-detail/view-detail?srcId='+src
        // })

      },
      fail: function (req) {
        wx.showToast({
          title: '请求有误',
          image: '../../images/icon/warm.png',
          duration: 2000,
          success: function (res) {
          }
        })
        return;
      }
    })
  },

  // 点击导入

  saveInfor: function () {
    wx.showLoading({
      title: '导入中',
      mask: true
    })
    var that = this;
    // 预览地址
    wx.request({
      header: { 'userId': app.globalData.userId },
      url: app.globalData.url + '/ik-wechat/zhilian/resumePreview',
      data: {
        path: that.data.src
      },
      success: (res) => {
        wx.hideLoading();
        console.log(res);
        var src = JSON.stringify(res.data.data)
        // 导入预览后的地址i
        wx.request({
          header: { 'userId': app.globalData.userId },
          url: app.globalData.url + '/ik-wechat/zhilian/downloadResume',
          data: {
            path: src
          },
          success: (res) => {
            wx.hideLoading();
            console.log(res);
            if (res.data.code === '200') {
              wx.showToast({
                title: res.data.message,
                icon: "success",
                duration: 1000,
                success: function (res) {
                  wx.reLaunch({
                    url: '/pages/upload/index',
                  })
                }
              })
            } else {
              wx.showToast({
                title: '导入失败',
                image: '../../images/icon/warm.png',
                duration: 1000,
                success: function (res) {
                }
              })
            }
          },
          fail: function (req) {
            wx.showToast({
              title: '请求有误',
              image: '../../images/icon/warm.png',
              duration: 2000,
              success: function (res) {
              }
            })
            return;
          }
        })

      },
      fail: function (req) {
        wx.showToast({
          title: '请求有误',
          image: '../../images/icon/warm.png',
          duration: 2000,
          success: function (res) {
          }
        })
        return;
      }
    })

  
  },
  // 获取数据
  getList(){
    var that = this;
    wx.showLoading({
      mask: true
    })
    wx.request({
      header: { 'userId': app.globalData.userId },
      url: app.globalData.url + '/ik-wechat/zhilian/getDownloadInfo',
      data: {
      },
      success: (res) => {
        console.log(res);
        wx.hideLoading();
        if (res.data.code === '200' && res.data.data.length !== 0) {
          console.log(res.data.data);
          that.setData({
            items: res.data.data
          })
        } else {
          that.setData({
            items: null
          })
        }
      },
      fail: function (req) {
        wx.showToast({
          title: '请求有误',
          image: '../../images/icon/warm.png',
          duration: 2000,
          success: function (res) {
          }
        })
        return;
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList();
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