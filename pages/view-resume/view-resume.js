// pages/view-resume/view-resume.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      items: [],
      codeId:'',
      src:""
  },
  radioChange: function (e) {
    // console.log(e.detail.value)
    this.setData({
      src: e.detail.value
    })
  },
// 点击预览
  viewInfor:function() {
    var that=this;
    // console.log(that.data.src);
    if (that.data.src===''){
      wx.showToast({
        mask:true,
        title: '请选择简历',
        image: '../../images/icon/warm.png',
        duration: 1000
      })
      return;
    }
//下载
    wx.downloadFile({
      url: that.data.src,
      success: function (res) {
        var filePath = res.tempFilePath
        wx.openDocument({
          filePath: filePath,
          success: function (res) {
            console.log('打开文档成功')
          }
        })
      }
    })
  },
  // 点击提交
  saveInfor:function() {
    var src = this.data.src
    if (src === '') {
      wx.showToast({
        mask: true,
        title: '请选择简历',
        image: '../../images/icon/warm.png',
        duration: 1000
      })
      return;
    }
    this.setResume(src);
  },
  //获取数据
  getData: function (codeId){
    var that=this;
    // 获取数据
    wx.showLoading({
      mask: true
    })
    wx.request({
      method: 'POST',
      url: app.globalData.url + "/ik-wechat/api/resume/resumeListFromRongCai",
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'userId': app.globalData.userId
      },
      // data: JSON.parse(codeId),
      data: {
        "mobile":"15815593192",
        "idNo":"421126199909104212",
        "captcha":"1111"
      },
      success: (res) => {
        console.log(res);
        wx.hideLoading();
        if (res.data.code === '200' && res.data.data.length!==0) {
          console.log(res.data.data);
          that.setData({
            items: res.data.data
          })
        }else{
          that.setData({
            items:null
          })
        }
      }
    })
  },
  // 发送简历
  setResume: function (src) {
    var that = this;
    console.log(src)
    wx.showLoading({
      mask: true
    })
    wx.request({
      method: 'POST',
      url: app.globalData.url + "/ik-wechat/api/resume/confirmResume",
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'userId': app.globalData.userId
      },
      data: {"resumePath": src},
      success: (res) => {
        console.log(res);
        wx.hideLoading();
        if (res.data.code === '200' ) {
          wx.showToast({
            title: '发送成功',
            icon: 'success',
            duration: 1000,
            success:function(){
              wx.reLaunch({
                url: '/pages/my-resume/my-resume'
              })
            }
          })
        } else {
          wx.showToast({
            title: '提交失败',
            image: '../../images/icon/warm.png',
            duration: 1000
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    var codeId = e.id; 
    this.setData({
      codeId: e.id
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var codeId = this.data.codeId;
    console.log(codeId)
    this.getData(codeId);
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