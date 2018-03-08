//app.js
// const APP_ID = 'wxad34b755d564c888';//输入小程序appid  
// const APP_SECRET = '59bca40c38ff0a7cd216d41de71c402a';//输入小程序app_secret  
// var OPEN_ID = ''//储存获取到openid  
// var SESSION_KEY = ''//储存获取到session_key  
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    this.getUserInfo();
    wx.checkSession({

      success: function (res) {
        console.log(res)
        //session 未过期，并且在本生命周期一直有效
      },
      fail: function () {
        //登录态过期
        // wx.login() //重新登录
      }
    })


  

  },

  //获取用户信息
  getUserInfo: function (cb) {
    var that = this;
    if (this.globalData.personInfo) {
      typeof cb == "function" && cb(this.globalData.personInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function (res) {

          var code = res.code;

          //获取信息
          wx.getUserInfo({
            success: function (res) {

              //获取id
              that.getOpenid(code);
              that.globalData.personInfo = res.userInfo;
              typeof cb == "function" && cb(that.globalData.personInfo);
              // console.log(that.globalData.personInfo);
            },
            fail: function () {
       
              wx.openSetting({
                success: function (res) {
                  console.log(res)
                  if (!res.authSetting["scope.userInfo"] || !res.authSetting["scope.userLocation"]) {
                    //这里是授权成功之后 填写你重新获取数据的js
                    that.getOpenid(code);
                    that.globalData.personInfo = res.userInfo;
                    typeof cb == "function" && cb(that.globalData.personInfo);
                  }
                }
              })
                 
              // wx.showModal({
              //   title: '警告',
              //   content: '您点击了拒绝授权
              //   success: function (res) {
              //     if (res.confirm) {
              //       console.log('用户点击确定')
              //     }
              //   }
              // })
              // wx.reLaunch({
              //   url: ''
              // })
            }
          })

        }
      })
    }
  },

  //验证id
  getOpenid: function (code) {

    var that = this;
    wx.showLoading({
      title:'加载中',
      mask: true
    })
    wx.request({
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      url: 'https://www.romcai.com/ik-wechat/api/user/not/getOpenid',
      data: {
        jsCode: code
      },
      success: function (res) {
        wx.hideLoading();
        console.log('用户唯一uersid：' + res.data.data.user.id);
        // console.log(res.data.data.resumeCount);
        that.globalData.userId = res.data.data.user.id;
        if (res.data.data.resumeCount !== 0) {
          wx.navigateTo({
            url: "/pages/my-resume/my-resume"
          })
        } else {
          console.log(res.data.data.resumeCount);
        }
      },fail:function(){
         wx.hideLoading();
      }
    })
  },
  globalData: {
    personInfo: null,
    userId: null,
    url: "https://www.romcai.com",
    resumeId: null
  }
})