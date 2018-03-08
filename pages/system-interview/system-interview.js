// pages/system-interview/system-interview.js
const app = getApp();
var interval = null; //倒计时函数
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: '',
    code: '',
    card: '',
    time: '获取验证码', //倒计时 
    currentTime: 61,
    userid: ''
  },
  //手机号
  userPhone: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  //验证码
  userCode: function (e) {
    this.setData({
      code: e.detail.value
    })
  },
  //身份证
  userCard: function (e) {
    this.setData({
      card: e.detail.value
    })
  },
  // 倒计时
  sedCode: function () {
    var that = this;
    var currentTime = that.data.currentTime
    interval = setInterval(function () {
      currentTime--;
      that.setData({
        time: currentTime + '秒'
      })
      if (currentTime <= 0) {
        clearInterval(interval)
        that.setData({
          time: '重新发送',
          currentTime: 61,
          disabled: false
        })
      }
    }, 1000)
  },
  // /////发送验证码函数
  getCode() {
    var phone = this.data.phone;
    var userid = this.data.userid;
    var card = this.data.card;
    // 为空
    if (phone === '') {
      return false;
    }
    // 格式
    if (!(/^1[3|4|5|7|8][0-9]{9}$/.test(phone))) {
      wx.showToast({
        title: '手机号格式不正确',
        image: '../../images/icon/warm.png',
        duration: 1000
      })
      return;
    }
    // 提示
    var that = this;
    wx.request({
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'userId': userid
      },
      url: app.globalData.url + '/ik-wechat/api/commons/sms/send',
      data: {
        "mobile": phone
      },
      success: (res) => {
        console.log(res.data)
        if (res.data.code === '200') {
          wx.showToast({
            title: '发送成功',
            icon: 'success',
            duration: 1000,
            success: function (e) {
              that.sedCode();
              that.setData({
                disabled: true
              })
            }
          })
          return;
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

  //////////// 登录
  saveInfor: function () {
    var phone = this.data.phone;
    var code = this.data.code;
    var card = this.data.card;
    var userid = this.data.userid;
    //手机号
    if (phone === '') {
      wx.showToast({
        title: '请输入手机号',
        image: '../../images/icon/warm.png',
        duration: 1000
      })
      return
    }
    if (!(/^1[3|4|5|7|8][0-9]{9}$/.test(phone))) {
      wx.showToast({
        title: '手机号格式不正确',
        image: '../../images/icon/warm.png',
        duration: 1000
      })
      return;
    }
    //验证码
    if (code === '') {
      wx.showToast({
        title: '请输入验证码',
        image: '../../images/icon/warm.png',
        duration: 1000
      })
      return
    }
    //身份证
    if (card === '') {
      wx.showToast({
        title: '请输身份证',
        image: '../../images/icon/warm.png',
        duration: 1000
      })
      return
    }

    if (!(/^[1-9]{1}[0-9]{14}$|^[1-9]{1}[0-9]{16}([0-9]|[xX])$/.test(card))) {
      wx.showToast({
        title: '身份证格式有误',
        image: '../../images/icon/warm.png',
        duration: 1000
      })
      return;
    }
    //通过
    var obj = {
      "mobile": phone,
      "captcha": code,
      "idNo": card
        }
        //本地存储
    wx.setStorage({
      key: "system",
      data: obj
    })
    var that=this;
    wx.showLoading();
    wx.request({
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'userId': app.globalData.userId
      },
      url: app.globalData.url + '/ik-wechat/api/commons/sms/check',
      // url: app.globalData.url + '/ik-wechat/api/resume/resumeListFromRongCai',
      data: obj,
      success: (res) => {
        wx.hideLoading();
        if (res.data.code === '200') {
          wx.showToast({
            title: '登录成功',
            icon: 'success',
            mask: true,
            duration: 1000,
            success: function (res) {
              // console.log(that.data.phone);  // 传递手机号
              var phone = that.data.phone;
              // console.log(that.data.card);   // 传递身份证
              var id = that.data.card;
              var resumeId={
                "mobile":that.data.phone,
                "idNo":that.data.card
              }
              setTimeout(function () {
                wx.navigateTo({
                  url: "../view-resume/view-resume?id=" + JSON.stringify(resumeId)
                  // url: '../no-resume/no-resume'
                })
              }, 1500)
            }
          })
        } else {
          wx.showToast({
            title: res.data.message,
            image: '../../images/icon/warm.png',
            duration: 2000
          })
        }
      },
      fail: (req) => {
        wx.showToast({
          title: res.data.message,
          image: '../../images/icon/warm.png',
          duration: 1000
        })
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
    //设置本地登录信息
    var that=this;
    wx.getStorage({
      key: 'system',
      success: function (res) {
        that.setData({
          phone: res.data.mobile,
          code: res.data.captcha,
          card: res.data.idNo
        })
      }
    })
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