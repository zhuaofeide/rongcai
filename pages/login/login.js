// pages/login/login.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userName:'',
    userPwd:'',
    codeImg:'../../images/icon/code.png',
    code:'',
    status: null,
    userid:''
  },
  //账号
  userNameInput: function (e) {
    this.setData({
      userName: e.detail.value
    })
  },
  //密码
  passWdInput: function (e) {
    this.setData({
      userPwd: e.detail.value
    })
  },
  //输入验证码
  codeInput: function (e) {
    this.setData({
      code: e.detail.value
    })
  },
  //登录按钮
  login: function () {
    var that=this;
    var userid = that.data.userid
    var obj = {
      "username": that.data.userName,
      "password": that.data.userPwd,
      "code": that.data.code
    }
    if (that.data.userName===''){
      wx.showToast({
        title: '账号不能空',
        image: '../../images/icon/warm.png',
        duration: 1000
      })
      return
    }
    if (that.data.userPwd === '') {
      wx.showToast({
        title: '请输入密码',
        image: '../../images/icon/warm.png',
        duration: 1000
      })
      return
    }
    if (that.data.code === '') {
      wx.showToast({
        title: '请输入验证码',
        image: '../../images/icon/warm.png',
        duration: 1000
      })
      return
    }
    wx.showLoading({
      title: '登录中',
      mask: true
    });
    console.log(obj);
    //本地存储
    wx.setStorage({
      key: "outlink",
      data: obj
    })
    wx.request({
      header: { 'userId': userid },
      url: app.globalData.url +'/ik-wechat/zhilian/personLogin',
      data: obj,
      success: (res) => {
        console.log(res)
        wx.hideLoading();
        if (res.data.code==='200'){
          wx.navigateTo({
            url: '/pages/login-view/login-view'
          })
          return;
        }else{
          wx.showToast({
            title: '登录失败',
            image: '../../images/icon/warm.png',
            duration: 1500,
            success: function (res) {
            }
          })
        }
      },
      fail: function (req) {
        wx.showToast({
          title: '请求有误',
          image: '../../images/icon/warm.png',
          duration: 1500,
          success: function (res) {
          }
        })
        return;
      }
    })
  },
  //刷新验证码
  rereshcode:function(){
    var that=this;
    wx.showLoading({
      title:'获取验证码'
    });
    var userid = that.data.userid
    wx.request({
      header: { 'userId': userid },
      url: app.globalData.url + '/ik-wechat/zhilian/refreshCode',
      success: (res) => {
        console.log(res)
        wx.hideLoading();
        if (res.data.code === '200') {
          var code = res.data.message
          that.setData({
            codeImg: res.data.data
          })
          return;
        }else{
          wx.showToast({
            title: '获取失败',
            image: '../../images/icon/warm.png',
            duration: 1000
          })
        }
      
      },
      fail: (req) => {
        wx.hideLoading();
        wx.showToast({
          title: '获取失败',
          image: '../../images/icon/warm.png',
          duration: 1000
        })
        return false;
      }
    })
  },
  //获取验证码
  getcode:function(){
    this.rereshcode();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var codeId = options.code;
    var userid = app.globalData.userId;   // 获取经验id
    this.setData({
      status:codeId,
      userid: userid      //存储id
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
    //设置本地登录信息
    var that = this;
    wx.getStorage({
      key: 'outlink',
      success: function (res) {
        console.log(res);
        that.setData({
          userName: res.data.username,
          userPwd: res.data.password,
          code: res.data.code
        })
      }
    })
    this.rereshcode();
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