// pages/entery-interview/entery-interview.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    resumeId: ''
  },
  //基本信息
  baseInfor: function () {
    var resumeid = this.data.resumeId;
    wx.navigateTo({
      url: "../baseInfor/baseInfor?resumeid=" + resumeid  // 传递简历id
    })
  },
  // 工作经验
  expInfor: function () {
    var resumeid = this.data.resumeId;
    console.log(resumeid);
    wx.navigateTo({
      url: "../expInfor/expInfor?resumeid=" + resumeid  // 传递简历id
    })
  },
  // 教育经历
  eduInfor: function () {
    var resumeid = this.data.resumeId;
    wx.navigateTo({
      url: "../eduInfor/eduInfor?resumeid=" + resumeid  // 传递简历id
    })
  },
  // 求职意向
  workInfor: function () {
    var resumeid = this.data.resumeId;
    wx.navigateTo({
      url: "../workInfor/workInfor?resumeid=" + resumeid  // 传递简历id
    })
  },
  // 项目经验
  proInfor: function () {
    var resumeid = this.data.resumeId;
    wx.navigateTo({
      url: "../proInfor/proInfor?resumeid=" + resumeid  // 传递简历id
    })
  },
  //确认录入
  importIt: function () {
    // console.log(111)
    var obj = {
      "userId": app.globalData.userId,
      "resumeId": this.data.resumeId
    }
    console.log(obj);
    wx.request({
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',  // 默认值
        'userId': app.globalData.userId,
      },
      url: app.globalData.url + '/ik-wechat/api/resume/ok',
      data: obj,
      success: (res) => {
        console.log(res)
        if (res.data.code === '200') {
          wx.navigateTo({
            // url: '../code/code'
            // url: '../my-resume/my-resume'
            url: '../success/success'
          })
        }else{
          wx.showToast({
            title: res.data.message,
            image: '../../images/icon/warm.png',
            duration: 1000
          })
        }
      },
      fail:(req)=>{
        wx.showToast({
          title: '请求异常',
          image: '../../images/icon/warm.png',
          duration: 1000
        })
      }
    })
    // wx.navigateTo({
    //   // url: '../code/code'
    //   // url: '../my-resume/my-resume'
    //   url: '../success/success'
    // })
  },
  //验证id
  userId: function (id) {
    wx.showLoading();
    var that = this;
    wx.request({
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',// 默认值
        userId: id
      },
      url: app.globalData.url +'/ik-wechat/api/resume/tocreate',
      data: {
        userId: id
      },
      success: (res) => {
        wx.hideLoading();
        console.log(res);
        if (res.data.code === '200') {
          that.setData({
            resumeId: res.data.data.resumeId
          })
          // console.log(that.data.resumeId)
        }
      },fail:(res)=>{
        console.log(res)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // var id = app.globalData.userId
    // this.userId(id);  // 获取简历id
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var id = app.globalData.userId
    this.userId(id);  // 获取简历id
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